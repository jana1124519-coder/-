import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Brain, RefreshCw, Save, History } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PHQ9, GAD7, PCL5, MBTI_QUESTIONS, MBTI_DESCRIPTIONS, scoreMBTI, type ScaleTest } from "@/lib/psychTests";

export const Route = createFileRoute("/psych-tests")({
  head: () => ({ meta: [
    { title: "اختبارات نفسية معتمدة — صحّتك" },
    { name: "description", content: "اختبارات PHQ-9, GAD-7, PCL-5 و MBTI بنتائج تلقائية." },
  ]}),
  component: TestsPage,
});

type Past = { id: string; test_id: string; score: number | null; level: string | null; result_type: string | null; created_at: string };

function TestsPage() {
  const { lang } = useI18n();
  const { user } = useAuth();
  const ar = lang === "ar";
  const [tab, setTab] = useState<"phq9" | "gad7" | "pcl5" | "mbti" | "history">("phq9");
  const [past, setPast] = useState<Past[]>([]);

  const loadPast = async () => {
    if (!user) { setPast([]); return; }
    const { data } = await supabase.from("psych_results").select("*").order("created_at", { ascending: false }).limit(30);
    setPast((data as Past[]) ?? []);
  };
  useEffect(() => { void loadPast(); }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center"><Brain className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{ar ? "اختبارات نفسية معتمدة" : "Validated Mental-Health Screens"}</h1>
        </div>
        <p className="text-muted-foreground mb-6 text-sm">
          {ar ? "هذه أدوات فحص للتعليم وليست تشخيصاً نهائياً. التشخيص يتطلب مختصاً مرخّصاً." : "Screening tools for education only — not a clinical diagnosis."}
        </p>

        <div className="flex gap-1 mb-6 border-b border-border overflow-x-auto">
          {[
            { id: "phq9", label: ar ? "PHQ-9 اكتئاب" : "PHQ-9 Depression" },
            { id: "gad7", label: ar ? "GAD-7 قلق" : "GAD-7 Anxiety" },
            { id: "pcl5", label: ar ? "PCL-5 صدمة" : "PCL-5 PTSD" },
            { id: "mbti", label: ar ? "MBTI شخصية" : "MBTI Personality" },
            { id: "history", label: ar ? "سجلي" : "My History" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "phq9" && <ScaleRunner test={PHQ9} ar={ar} onSaved={loadPast} />}
        {tab === "gad7" && <ScaleRunner test={GAD7} ar={ar} onSaved={loadPast} />}
        {tab === "pcl5" && <ScaleRunner test={PCL5} ar={ar} onSaved={loadPast} />}
        {tab === "mbti" && <MBTIRunner ar={ar} onSaved={loadPast} />}
        {tab === "history" && <HistoryView ar={ar} past={past} loggedIn={!!user} />}
      </main>
      <Footer />
    </div>
  );
}

function HistoryView({ ar, past, loggedIn }: { ar: boolean; past: Past[]; loggedIn: boolean }) {
  if (!loggedIn) return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
      {ar ? "سجّل الدخول لحفظ ومراجعة نتائجك." : "Sign in to save and review your results."}
    </div>
  );
  if (past.length === 0) return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
      {ar ? "لا توجد نتائج محفوظة بعد." : "No saved results yet."}
    </div>
  );
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2"><History className="h-4 w-4" /> {ar ? "آخر النتائج" : "Recent results"}</div>
      {past.map((r) => (
        <div key={r.id} className="rounded-xl border border-border bg-card p-3 flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-sm uppercase">{r.test_id}</div>
            <div className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString(ar ? "ar-EG" : "en-US")}</div>
          </div>
          <div className="text-end">
            {r.score !== null && <div className="text-xl font-bold text-primary">{r.score}</div>}
            <div className="text-xs">{r.level || r.result_type}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


function ScaleRunner({ test, ar, onSaved }: { test: ScaleTest; ar: boolean; onSaved: () => void }) {
  const { user } = useAuth();
  const c = ar ? test.ar : test.en;
  const [ans, setAns] = useState<number[]>(Array(c.items.length).fill(-1));
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);
  const complete = ans.every((a) => a >= 0);
  const total = ans.filter((a) => a >= 0).reduce((s, v) => s + v, 0);
  const interp = done ? test.interpret(total, ar ? "ar" : "en") : null;

  const save = async () => {
    if (!user) { toast.error(ar ? "سجّل الدخول لحفظ النتيجة" : "Sign in to save"); return; }
    if (!interp) return;
    const { error } = await supabase.from("psych_results").insert({
      user_id: user.id, test_id: test.id, score: total, level: interp.level,
      details: { answers: ans, advice: interp.advice },
    });
    if (error) toast.error(error.message);
    else { setSaved(true); toast.success(ar ? "تم الحفظ" : "Saved"); onSaved(); }
  };

  if (done && interp) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-xl font-bold mb-2">{c.name}</h2>
        <div className="rounded-xl bg-primary-soft p-4 mb-4">
          <div className="text-xs text-muted-foreground">{ar ? "نتيجتك" : "Your score"}</div>
          <div className="text-3xl font-bold text-primary">{total} <span className="text-sm font-normal text-muted-foreground">/ {test.maxPerItem * c.items.length}</span></div>
          <div className="text-lg font-semibold mt-1">{interp.level}</div>
          <p className="text-sm text-foreground/80 mt-2">{interp.advice}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => { setAns(Array(c.items.length).fill(-1)); setDone(false); setSaved(false); }} variant="outline">
            <RefreshCw className="me-2 h-4 w-4" /> {ar ? "أعد الاختبار" : "Retake"}
          </Button>
          <Button onClick={save} disabled={saved} className="bg-gradient-primary">
            <Save className="me-2 h-4 w-4" /> {saved ? (ar ? "محفوظة" : "Saved") : (ar ? "احفظ النتيجة" : "Save result")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-xl font-bold mb-1">{c.name}</h2>
      <p className="text-sm text-muted-foreground mb-5">{c.description}</p>
      <div className="space-y-4">
        {c.items.map((item, i) => (
          <div key={i} className="border-b border-border pb-3">
            <div className="font-medium text-sm mb-2">{i + 1}. {item}</div>
            <div className="flex flex-wrap gap-1.5">
              {c.scale.map((s, v) => (
                <button key={v} onClick={() => setAns((p) => p.map((x, idx) => (idx === i ? v : x)))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${ans[i] === v ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => setDone(true)} disabled={!complete} className="mt-5 bg-gradient-primary">
        {ar ? "احسب النتيجة" : "Calculate"}
      </Button>
    </div>
  );
}

function MBTIRunner({ ar, onSaved }: { ar: boolean; onSaved: () => void }) {
  const { user } = useAuth();
  const [ans, setAns] = useState<("A" | "B" | null)[]>(Array(MBTI_QUESTIONS.length).fill(null));
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);
  const complete = ans.every((a) => a !== null);
  const type = done ? scoreMBTI(ans as ("A" | "B")[]) : "";
  const desc = type ? (ar ? MBTI_DESCRIPTIONS[type]?.ar : MBTI_DESCRIPTIONS[type]?.en) : "";

  const save = async () => {
    if (!user) { toast.error(ar ? "سجّل الدخول لحفظ النتيجة" : "Sign in to save"); return; }
    const { error } = await supabase.from("psych_results").insert({
      user_id: user.id, test_id: "mbti", result_type: type, level: type, details: { description: desc, answers: ans },
    });
    if (error) toast.error(error.message);
    else { setSaved(true); toast.success(ar ? "تم الحفظ" : "Saved"); onSaved(); }
  };

  if (done) return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-xl font-bold mb-3">{ar ? "نتيجة MBTI" : "Your MBTI Result"}</h2>
      <div className="rounded-xl bg-primary-soft p-6 text-center">
        <div className="text-5xl font-bold text-primary">{type}</div>
        <p className="mt-3 text-sm">{desc}</p>
      </div>
      <div className="flex gap-2 flex-wrap mt-4">
        <Button onClick={() => { setAns(Array(MBTI_QUESTIONS.length).fill(null)); setDone(false); setSaved(false); }} variant="outline">
          <RefreshCw className="me-2 h-4 w-4" /> {ar ? "أعد الاختبار" : "Retake"}
        </Button>
        <Button onClick={save} disabled={saved} className="bg-gradient-primary">
          <Save className="me-2 h-4 w-4" /> {saved ? (ar ? "محفوظة" : "Saved") : (ar ? "احفظ النتيجة" : "Save result")}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-xl font-bold mb-1">{ar ? "اختبار شخصية MBTI" : "MBTI Personality"}</h2>
      <p className="text-sm text-muted-foreground mb-5">{ar ? "اختر مدى انطباق العبارة عليك." : "Pick whether each statement applies."}</p>
      <div className="space-y-4">
        {MBTI_QUESTIONS.map((q, i) => (
          <div key={i} className="border-b border-border pb-3">
            <div className="text-sm font-medium mb-2">{i + 1}. {ar ? q.ar : q.en}</div>
            <div className="flex gap-2">
              <button onClick={() => setAns((p) => p.map((x, idx) => (idx === i ? "A" : x)))}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border ${ans[i] === "A" ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
                {ar ? "تنطبق عليّ" : "Agree"}
              </button>
              <button onClick={() => setAns((p) => p.map((x, idx) => (idx === i ? "B" : x)))}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border ${ans[i] === "B" ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
                {ar ? "لا تنطبق" : "Disagree"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => setDone(true)} disabled={!complete} className="mt-5 bg-gradient-primary">
        {ar ? "احسب نوعي" : "See my type"}
      </Button>
    </div>
  );
}
