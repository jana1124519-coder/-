import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Siren, PhoneCall, MapPin, Volume2, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { speakText } from "@/lib/tts";
import { bcpFor } from "@/lib/voiceLang";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/emergency-plan")({
  head: () => ({
    meta: [
      { title: "خطة طوارئ موجهة — صحّتك" },
      { name: "description", content: "خطوات موجهة لكل حالة طوارئ مع أرقام النجدة وأقرب مستشفى." },
      { property: "og:title", content: "خطة طوارئ موجهة — صحّتك" },
      { property: "og:description", content: "خطوات موجهة لكل حالة طوارئ." },
    ],
  }),
  component: EmergencyPlanPage,
});

type Scenario = {
  id: string;
  ar: { name: string; steps: string[] };
  en: { name: string; steps: string[] };
  icon: string;
  call: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "choking", icon: "😮", call: "tel:123",
    ar: { name: "اختناق", steps: [
      "اطلب من المصاب أن يسعل بقوة إذا كان قادراً.",
      "قف خلفه وضع قبضتك فوق السرة وامسكها باليد الأخرى.",
      "اضغط بشدة للداخل والأعلى (مناورة هايمليك) 5 مرات.",
      "كرر حتى يخرج الجسم الغريب أو يصل الإسعاف.",
      "اتصل بالإسعاف فوراً إذا فقد الوعي.",
    ]},
    en: { name: "Choking", steps: [
      "Encourage strong coughing if the person can.",
      "Stand behind, place a fist above the navel, grip with the other hand.",
      "Perform Heimlich: quick inward and upward thrusts × 5.",
      "Repeat until the object is expelled or help arrives.",
      "Call emergency immediately if they lose consciousness.",
    ]},
  },
  {
    id: "bleeding", icon: "🩸", call: "tel:123",
    ar: { name: "نزيف شديد", steps: [
      "اضغط مباشرة على مكان النزيف بقماش نظيف.",
      "ارفع الطرف المصاب أعلى من مستوى القلب إن أمكن.",
      "لا تنزع القماش — أضف فوقه إذا اشتبع بالدم.",
      "اربط بضمادة محكمة دون قطع الدورة الدموية.",
      "اتصل بالإسعاف فوراً.",
    ]},
    en: { name: "Severe bleeding", steps: [
      "Apply direct pressure on the wound with clean cloth.",
      "Raise the injured limb above heart level if possible.",
      "Do not remove soaked cloth — add more on top.",
      "Wrap firmly without cutting circulation.",
      "Call emergency immediately.",
    ]},
  },
  {
    id: "heart-attack", icon: "❤️", call: "tel:123",
    ar: { name: "نوبة قلبية", steps: [
      "اتصل بالإسعاف فوراً.",
      "اجعل المصاب يجلس مرتاحاً ويفك ملابسه الضيقة.",
      "إن كان واعياً وغير حساس للأسبرين، أعطه أسبرين 300 مجم يمضغ.",
      "راقب التنفس — جهز للإنعاش القلبي إن فقد الوعي.",
    ]},
    en: { name: "Heart attack", steps: [
      "Call emergency right away.",
      "Sit them down comfortably, loosen tight clothing.",
      "If conscious and not allergic, give chewable aspirin 300 mg.",
      "Monitor breathing — prepare CPR if unconscious.",
    ]},
  },
  {
    id: "burn", icon: "🔥", call: "tel:123",
    ar: { name: "حروق", steps: [
      "أبعد المصاب عن مصدر الحرارة فوراً.",
      "اغمر الحرق بماء جارٍ بارد (لا مثلج) لمدة 20 دقيقة.",
      "انزع الإكسسوارات قبل تورم المنطقة.",
      "غطِّ بقماش نظيف غير لاصق — لا تضع زيوت أو معجون أسنان.",
      "اطلب المستشفى إذا الحرق أكبر من راحة اليد.",
    ]},
    en: { name: "Burn", steps: [
      "Move the person away from the heat source.",
      "Cool with running cool (not icy) water for 20 minutes.",
      "Remove jewelry before swelling.",
      "Cover with clean non-stick cloth — no oil/toothpaste.",
      "Seek hospital if larger than the palm.",
    ]},
  },
  {
    id: "seizure", icon: "🧠", call: "tel:123",
    ar: { name: "نوبة صرع", steps: [
      "أبعد الأشياء الحادة من حول المصاب.",
      "ضع شيئاً ليناً تحت رأسه.",
      "أدره على جنبه عند توقف النوبة لتأمين التنفس.",
      "لا تضع شيئاً في فمه ولا تكبل حركته.",
      "اتصل بالإسعاف إذا استمرت أكثر من 5 دقائق.",
    ]},
    en: { name: "Seizure", steps: [
      "Move sharp objects away.",
      "Cushion the head.",
      "Turn on the side when it stops to keep the airway open.",
      "Don't put anything in the mouth or restrain.",
      "Call emergency if it lasts more than 5 minutes.",
    ]},
  },
  {
    id: "stroke", icon: "🧬", call: "tel:123",
    ar: { name: "سكتة دماغية (FAST)", steps: [
      "الوجه (Face): هل تظهر بسمة منحرفة؟",
      "الذراع (Arm): هل يسقط ذراع عند رفعهما معاً؟",
      "الكلام (Speech): هل الكلام متلعثم؟",
      "الوقت (Time): اتصل بالإسعاف فوراً واذكر وقت بدء الأعراض.",
    ]},
    en: { name: "Stroke (FAST)", steps: [
      "Face: is the smile uneven?",
      "Arm: does one arm drift down when both are raised?",
      "Speech: is speech slurred?",
      "Time: call emergency NOW and tell them when symptoms started.",
    ]},
  },
  {
    id: "fire", icon: "🔥", call: "tel:180",
    ar: { name: "حريق فى المكان", steps: [
      "نبّه الجميع واخرج فوراً من أقرب مخرج.",
      "انحنِ تحت الدخان (الهواء أنظف بالأسفل).",
      "اغلق الأبواب خلفك لحصر النار.",
      "لا تستخدم المصعد.",
      "اتصل بالدفاع المدنى من خارج المبنى.",
    ]},
    en: { name: "Fire in building", steps: [
      "Alert everyone and exit by the nearest route.",
      "Crouch below smoke (cleaner air below).",
      "Close doors behind you to contain fire.",
      "Never use the elevator.",
      "Call fire services from outside.",
    ]},
  },
  {
    id: "earthquake", icon: "🌍", call: "tel:123",
    ar: { name: "زلزال", steps: [
      "انبطح، احتمِ تحت طاولة قوية، تمسك بها.",
      "ابتعد عن النوافذ والأرفف.",
      "إن كنت بالخارج، ابتعد عن المبانى والأسلاك.",
      "بعد الهزة، توقع الهزات الارتدادية واخرج بهدوء.",
    ]},
    en: { name: "Earthquake", steps: [
      "Drop, cover under a sturdy table, hold on.",
      "Stay away from windows and shelves.",
      "If outside, move away from buildings and wires.",
      "After the shake, expect aftershocks; exit calmly.",
    ]},
  },
];

function EmergencyPlanPage() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const bcp = bcpFor(lang);
  const [active, setActive] = useState<Scenario | null>(null);
  const tr = useMemo(() => (s: Scenario) => (ar ? s.ar : s.en), [ar]);

  const readSteps = () => {
    if (!active) return;
    const t = tr(active);
    const all = `${t.name}. ` + t.steps.map((s, i) => `${i + 1}. ${s}`).join(" ");
    speakText(all, bcp);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-emergency/10 text-emergency flex items-center justify-center"><Siren className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{ar ? "خطة طوارئ موجهة" : "Guided Emergency Plan"}</h1>
        </div>
        <p className="text-muted-foreground mb-6">{ar ? "اختر الحالة واتبع الخطوات بصوت أو نص." : "Pick the situation and follow guided steps by voice or text."}</p>

        {!active ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SCENARIOS.map((s) => {
              const t = tr(s);
              return (
                <button key={s.id} onClick={() => setActive(s)} className="text-start rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-all">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.steps[0]}</div>
                  <div className="mt-3 inline-flex items-center text-xs text-primary font-semibold">
                    {ar ? "افتح الخطة" : "Open plan"} <ChevronRight className="h-3 w-3 ms-1 rtl:rotate-180" />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{active.icon}</div>
                <h2 className="text-2xl font-bold">{tr(active).name}</h2>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={readSteps}><Volume2 className="me-2 h-4 w-4" />{ar ? "اقرأ" : "Read"}</Button>
                <Button size="sm" asChild className="bg-emergency hover:bg-emergency/90 text-emergency-foreground">
                  <a href={active.call}><PhoneCall className="me-2 h-4 w-4" />{ar ? "اتصال" : "Call"}</a>
                </Button>
                <Button size="sm" asChild variant="outline">
                  <Link to="/maps"><MapPin className="me-2 h-4 w-4" />{ar ? "أقرب مستشفى" : "Nearest hospital"}</Link>
                </Button>
              </div>
            </div>
            <ol className="space-y-3">
              {tr(active).steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary-soft text-primary font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                  <p className="text-foreground leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
            <Button variant="ghost" className="mt-4" onClick={() => setActive(null)}>← {ar ? "رجوع" : "Back"}</Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
