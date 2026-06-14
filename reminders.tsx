import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, BellOff, Pill, Plus, Trash2, AlertTriangle, Volume2, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { useVoice } from "@/hooks/useVoice";
import { toast } from "sonner";

export const Route = createFileRoute("/reminders")({
  head: () => ({ meta: [{ title: "منبّه الأدوية — صحّتك" }] }),
  component: RemindersPage,
});

interface Reminder {
  id: string;
  name: string;
  dose: string;
  /** HH:MM 24h, repeating daily */
  times: string[];
  notes?: string;
}

const STORAGE_KEY = "sehetak.reminders";

function loadReminders(): Reminder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Reminder[]) : [];
  } catch { return []; }
}
function saveReminders(rs: Reminder[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rs));
}

function RemindersPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [times, setTimes] = useState<string[]>(["08:00"]);
  const [notes, setNotes] = useState("");
  const [notifPerm, setNotifPerm] = useState<NotificationPermission>("default");
  const [soundOn, setSoundOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(true);
  const { speak, supportedTTS } = useVoice(lang);
  const firedRef = useRef<Set<string>>(new Set()); // "id|HH:MM|YYYY-MM-DD"
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setReminders(loadReminders());
    if (typeof Notification !== "undefined") setNotifPerm(Notification.permission);
  }, []);

  // Beep using WebAudio (no asset needed)
  const beep = () => {
    if (!soundOn) return;
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      audioCtxRef.current ??= new Ctx();
      const ctx = audioCtxRef.current;
      const playTone = (freq: number, start: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
        osc.connect(gain).connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      };
      playTone(880, 0, 0.25);
      playTone(660, 0.3, 0.25);
      playTone(880, 0.6, 0.4);
    } catch { /* noop */ }
  };

  // Tick every 30s checking for due reminders
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const cur = `${hh}:${mm}`;
      const dateKey = now.toISOString().slice(0, 10);
      reminders.forEach((r) => {
        r.times.forEach((t) => {
          if (t !== cur) return;
          const fireKey = `${r.id}|${t}|${dateKey}`;
          if (firedRef.current.has(fireKey)) return;
          firedRef.current.add(fireKey);
          const title = isAr ? `وقت دواء: ${r.name}` : `Medication time: ${r.name}`;
          const body = `${r.dose}${r.notes ? " — " + r.notes : ""}`;
          toast(title, { description: body, duration: 15000 });
          beep();
          if (voiceOn && supportedTTS) {
            const phrase = isAr
              ? `تذكير: حان وقت دواء ${r.name}، ${r.dose}`
              : `Reminder: time for ${r.name}, ${r.dose}`;
            setTimeout(() => speak(phrase), 900);
          }
          if (notifPerm === "granted" && typeof Notification !== "undefined") {
            try { new Notification(title, { body, tag: fireKey }); } catch { /* noop */ }
          }
        });
      });
    };
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminders, notifPerm, soundOn, voiceOn, isAr, supportedTTS]);

  const askPerm = async () => {
    if (typeof Notification === "undefined") {
      toast.error(isAr ? "متصفحك ما يدعمش الإشعارات" : "Your browser doesn't support notifications");
      return;
    }
    const p = await Notification.requestPermission();
    setNotifPerm(p);
    if (p === "granted") toast.success(isAr ? "تم تفعيل الإشعارات" : "Notifications enabled");
  };

  const addReminder = () => {
    if (!name.trim() || times.length === 0) {
      toast.error(isAr ? "اكتب اسم الدواء ووقت واحد على الأقل" : "Enter a name and at least one time");
      return;
    }
    const r: Reminder = {
      id: crypto.randomUUID(),
      name: name.trim(),
      dose: dose.trim() || (isAr ? "جرعة واحدة" : "1 dose"),
      times: times.filter(Boolean),
      notes: notes.trim() || undefined,
    };
    const next = [...reminders, r];
    setReminders(next); saveReminders(next);
    setName(""); setDose(""); setNotes(""); setTimes(["08:00"]);
    toast.success(isAr ? "تمت الإضافة" : "Added");
  };

  const removeReminder = (id: string) => {
    const next = reminders.filter((r) => r.id !== id);
    setReminders(next); saveReminders(next);
  };

  const upcoming = useMemo(() => {
    const now = new Date();
    const items: { reminder: Reminder; time: string; mins: number }[] = [];
    reminders.forEach((r) => r.times.forEach((t) => {
      const [h, m] = t.split(":").map(Number);
      const dt = new Date(now);
      dt.setHours(h, m, 0, 0);
      let mins = Math.round((dt.getTime() - now.getTime()) / 60000);
      if (mins < 0) mins += 24 * 60;
      items.push({ reminder: r, time: t, mins });
    }));
    return items.sort((a, b) => a.mins - b.mins).slice(0, 5);
  }, [reminders]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-4xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
            <Pill className="h-6 w-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {isAr ? "منبّه الأدوية" : "Medication Reminders"}
          </h1>
        </div>
        <p className="text-muted-foreground mb-6">
          {isAr
            ? "أضف أدويتك ومواعيدها، وستحصل على إشعار في المتصفح وتنبيه صوتي داخل التطبيق في الموعد المحدد."
            : "Add your medications and times. You'll get a browser notification and an in-app sound at the scheduled time."}
        </p>

        {/* Permission + sound */}
        <div className="flex flex-wrap gap-3 mb-6">
          {notifPerm !== "granted" ? (
            <Button onClick={askPerm} className="gap-2">
              <Bell className="h-4 w-4" />
              {isAr ? "فعّل إشعارات المتصفح" : "Enable browser notifications"}
            </Button>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-xl bg-success/15 text-success px-3 py-2 text-sm font-bold">
              <Bell className="h-4 w-4" /> {isAr ? "الإشعارات مفعّلة" : "Notifications on"}
            </span>
          )}
          <Button variant="outline" onClick={() => setSoundOn((s) => !s)} className="gap-2">
            {soundOn ? <Volume2 className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            {soundOn ? (isAr ? "الصوت: مفعّل" : "Sound: on") : (isAr ? "الصوت: مكتوم" : "Sound: off")}
          </Button>
          {supportedTTS && (
            <Button variant="outline" onClick={() => setVoiceOn((v) => !v)} className="gap-2">
              <Volume2 className="h-4 w-4" />
              {voiceOn ? (isAr ? "النطق الصوتي: مفعّل" : "Voice: on") : (isAr ? "النطق الصوتي: مكتوم" : "Voice: off")}
            </Button>
          )}
          <Button variant="outline" onClick={beep} className="gap-2">
            <Volume2 className="h-4 w-4" />
            {isAr ? "اختبار النغمة" : "Test sound"}
          </Button>
          {supportedTTS && (
            <Button
              variant="outline"
              onClick={() => speak(isAr ? "هذا اختبار للنطق الصوتي. سيتم تذكيرك بأدويتك بصوت واضح." : "This is a voice test. You'll be reminded of your medications by voice.")}
              className="gap-2"
            >
              <Volume2 className="h-4 w-4" />
              {isAr ? "اختبار النطق" : "Test voice"}
            </Button>
          )}
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-8 rounded-2xl border border-primary/30 bg-primary-soft/40 p-4">
            <div className="flex items-center gap-2 font-bold text-primary mb-3">
              <Clock className="h-4 w-4" /> {isAr ? "الجرعات القادمة" : "Upcoming doses"}
            </div>
            <ul className="space-y-2 text-sm">
              {upcoming.map((u, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg bg-card border border-border px-3 py-2">
                  <span className="font-semibold">{u.reminder.name} <span className="text-muted-foreground font-normal">— {u.reminder.dose}</span></span>
                  <span className="text-xs text-primary font-bold">{u.time} {isAr ? "(بعد" : "(in"} {Math.floor(u.mins / 60)}h {u.mins % 60}m{isAr ? ")" : ")"}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Add form */}
        <section className="rounded-2xl border border-border bg-card p-5 mb-8 shadow-soft">
          <h2 className="font-bold mb-3 flex items-center gap-2"><Plus className="h-4 w-4" /> {isAr ? "إضافة دواء جديد" : "Add medication"}</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">{isAr ? "اسم الدواء" : "Name"}</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={isAr ? "مثال: ميتفورمين" : "e.g. Metformin"} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">{isAr ? "الجرعة" : "Dose"}</label>
              <Input value={dose} onChange={(e) => setDose(e.target.value)} placeholder={isAr ? "مثال: 500 ملغ، قرص واحد" : "e.g. 500mg, 1 tablet"} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">{isAr ? "المواعيد اليومية" : "Daily times"}</label>
              <div className="flex flex-wrap gap-2">
                {times.map((t, i) => (
                  <div key={i} className="inline-flex items-center gap-1 rounded-lg border border-input bg-background px-2 py-1">
                    <input
                      type="time"
                      value={t}
                      onChange={(e) => { const next = [...times]; next[i] = e.target.value; setTimes(next); }}
                      className="bg-transparent text-sm outline-none"
                    />
                    {times.length > 1 && (
                      <button onClick={() => setTimes(times.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-emergency">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setTimes([...times, "12:00"])} className="gap-1">
                  <Plus className="h-3.5 w-3.5" /> {isAr ? "وقت" : "Time"}
                </Button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">{isAr ? "ملاحظات (اختياري)" : "Notes (optional)"}</label>
              <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={isAr ? "مثال: مع الأكل" : "e.g. with food"} />
            </div>
          </div>
          <Button onClick={addReminder} className="mt-4 bg-gradient-primary gap-2">
            <Plus className="h-4 w-4" /> {isAr ? "أضف الدواء" : "Add medication"}
          </Button>
        </section>

        {/* List */}
        <section>
          <h2 className="font-bold mb-3">{isAr ? "أدويتي" : "My medications"} ({reminders.length})</h2>
          {reminders.length === 0 ? (
            <p className="text-sm text-muted-foreground rounded-xl border border-dashed border-border p-6 text-center">
              {isAr ? "ما أضفت أي دواء بعد." : "You haven't added any medication yet."}
            </p>
          ) : (
            <ul className="space-y-3">
              {reminders.map((r) => (
                <li key={r.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold flex items-center gap-2">
                      <Pill className="h-4 w-4 text-primary" /> {r.name}
                      <span className="text-xs font-normal text-muted-foreground">— {r.dose}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {r.times.map((t) => (
                        <span key={t} className="inline-flex items-center gap-1 rounded-md bg-primary-soft text-primary px-2 py-0.5 text-xs font-semibold">
                          <Clock className="h-3 w-3" /> {t}
                        </span>
                      ))}
                    </div>
                    {r.notes && <p className="text-xs text-muted-foreground mt-1.5">{r.notes}</p>}
                  </div>
                  <button onClick={() => removeReminder(r.id)} className="text-muted-foreground hover:text-emergency p-1" title={isAr ? "حذف" : "Delete"}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="mt-8 rounded-xl border border-warning/30 bg-warning/10 p-4 flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-warning-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            {isAr
              ? "التذكير يعمل فقط أثناء فتح الصفحة في المتصفح. لتذكير دائم، اطلب من طبيبك أو الصيدلي خطة جرعات مكتوبة، ولا توقف أي دواء بدون استشارة."
              : "Reminders only fire while this page is open in your browser. For 24/7 reliability, ask your doctor/pharmacist for a written schedule, and never stop a medication without medical advice."}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
