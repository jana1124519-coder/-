import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, AlertTriangle, Activity, FlaskConical, Pill, Lightbulb, Shield, Languages, Loader2, BookOpen, TrendingUp, AlertOctagon, Heart, ShieldCheck, HelpCircle, Stethoscope, ChevronDown, Globe, ExternalLink, Phone, FlaskRound } from "lucide-react";
import { useI18n, contentLangFor, SUPPORTED_LANGS } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDisease } from "@/lib/diseases";
import { enhanceDisease } from "@/lib/diseaseDetails";
import { specialtyFor, SPECIALTY_TESTS } from "@/lib/diseaseSpecialty";
import { SPECIALTY_LABELS } from "@/lib/medicalCouncils";
import { translateMedical } from "@/lib/aiChat";
import { AskAiAboutSection } from "@/components/AskAiAboutSection";
import { SectionChatbot } from "@/components/SectionChatbot";
import { toast } from "sonner";

export const Route = createFileRoute("/diseases/$id")({
  loader: ({ params }) => {
    const d = getDisease(params.id);
    if (!d) throw notFound();
    return { disease: enhanceDisease(d) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.disease.ar.name} — صحّتك` }, { name: "description", content: loaderData.disease.ar.shortDesc }] : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="mb-4">المرض غير موجود</p>
        <Link to="/diseases" className="text-primary underline">الرجوع للقائمة</Link>
      </div>
    </div>
  ),
  component: DetailPage,
});

interface I18nContent {
  name: string; shortDesc: string; fullDesc?: string;
  symptoms: string[]; causes: string[]; treatments: string[];
  treatmentDetails?: { title: string; body: string }[];
  stages?: { name: string; desc: string }[];
  complications?: string[]; lifestyle?: string[]; prevention?: string[];
  faq?: { q: string; a: string }[]; redFlags?: string[]; diagnosis?: string[];
  research?: string; whatToDo?: string;
}

function DetailPage() {
  const { disease } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const cl = contentLangFor(lang);
  const base: I18nContent = disease[cl];
  const [translated, setTranslated] = useState<I18nContent | null>(null);
  const [tLoading, setTLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const needsTranslate = lang !== "ar" && lang !== "en";
  const i = translated ?? base;
  const isAr = lang === "ar";
  const spec = specialtyFor(disease.id, disease.category);
  const specLabel = SPECIALTY_LABELS[spec];
  const fallbackTests = SPECIALTY_TESTS[spec];
  const tests: string[] = i.diagnosis && i.diagnosis.length > 0
    ? i.diagnosis
    : (isAr ? fallbackTests?.ar : fallbackTests?.en) ?? [];
  const isEmergency = disease.category === "emergency" || disease.severity === "critical";

  const doTranslate = async () => {
    if (tLoading) return;
    setTLoading(true);
    try {
      const blob = JSON.stringify({
        name: base.name, shortDesc: base.shortDesc,
        symptoms: base.symptoms, causes: base.causes, treatments: base.treatments,
        research: base.research ?? "", whatToDo: base.whatToDo ?? "",
      });
      const res = await translateMedical({ data: { text: blob, targetLang: lang, sourceLang: cl } });
      try {
        const parsed = JSON.parse(res.translated.replace(/^```json|```$/g, "").trim()) as I18nContent;
        setTranslated(parsed);
      } catch {
        toast.error("Translation parse failed");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "error";
      if (msg.includes("RATE_LIMIT")) toast.error("Rate limit, try later");
      else if (msg.includes("PAYMENT_REQUIRED")) toast.error("AI credits exhausted");
      else toast.error("Translation failed");
    } finally { setTLoading(false); }
  };

  const Section = ({ icon: Icon, title, items, accent }: { icon: typeof Activity; title: string; items: string[]; accent: string }) => (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2 mb-3">
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${accent}`}><Icon className="h-4 w-4" /></div>
        <h2 className="font-bold">{title}</h2>
      </div>
      <ul className="space-y-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-2 text-sm text-foreground/90"><span className="text-primary mt-1">•</span>{it}</li>
        ))}
      </ul>
    </div>
  );

  const langName = SUPPORTED_LANGS.find((l) => l.code === lang)?.native ?? lang;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl w-full px-4 py-10 flex-1">
        <Link to="/diseases" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowRight className="h-4 w-4 rtl:rotate-180" /> {t.cta.back}
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="outline">{t.common[disease.category as keyof typeof t.common]}</Badge>
          <Badge variant="outline" className="border-primary/40 text-primary">{t.common[disease.severity as keyof typeof t.common]}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{i.name}</h1>
        <p className="text-lg text-muted-foreground mb-4">{i.shortDesc}</p>

        {disease.whoUrl && (
          <a
            href={disease.whoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-5 inline-flex items-center gap-2 rounded-xl border-2 border-primary/40 bg-primary-soft px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition shadow-soft"
          >
            <Globe className="h-4 w-4" />
            {lang === "ar" ? "المصدر الرسمي — منظمة الصحة العالمية / MedlinePlus" : "Official source — WHO / MedlinePlus"}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}

        {/* Emergency call + specialty quick-actions */}
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          <Link
            to="/emergency"
            className={`rounded-2xl border-2 p-4 flex items-center gap-3 transition shadow-soft ${
              isEmergency
                ? "border-emergency bg-emergency text-emergency-foreground hover:opacity-90 animate-pulse"
                : "border-emergency/40 bg-emergency/10 text-emergency hover:bg-emergency hover:text-emergency-foreground"
            }`}
          >
            <Phone className="h-6 w-6 shrink-0" />
            <div className="text-start">
              <div className="font-bold text-sm">{isAr ? "زر الطوارئ" : "Emergency"}</div>
              <div className="text-xs opacity-90">{isAr ? "اتصل بالإسعاف فوراً" : "Call EMS now"}</div>
            </div>
          </Link>
          <Link
            to="/doctors"
            className="rounded-2xl border-2 border-primary/40 bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground p-4 flex items-center gap-3 transition shadow-soft"
          >
            <Stethoscope className="h-6 w-6 shrink-0" />
            <div className="text-start">
              <div className="font-bold text-sm">{isAr ? "الطبيب الموصى به" : "Recommended doctor"}</div>
              <div className="text-xs opacity-90">{isAr ? specLabel.ar : specLabel.en}</div>
            </div>
          </Link>
        </div>

        {/* Big "Learn more" toggle */}
        <div className="mb-6">
          <Button
            onClick={() => setExpanded((v) => !v)}
            className="w-full h-14 text-base font-bold gap-2 bg-gradient-primary"
          >
            <BookOpen className="h-5 w-5" />
            {expanded
              ? (isAr ? "إخفاء التفاصيل" : "Hide details")
              : (isAr ? "تعرّف أكثر — كل تفاصيل المرض" : "Learn more — full disease details")}
            <ChevronDown className={`h-5 w-5 transition ${expanded ? "rotate-180" : ""}`} />
          </Button>
          {!expanded && (
            <p className="mt-2 text-xs text-muted-foreground text-center">
              {isAr
                ? "يشمل: الأعراض، الأسباب، العلاج، التحاليل، الطبيب المناسب، المضاعفات، الوقاية، وأسئلة شائعة."
                : "Includes: symptoms, causes, treatment, tests, the right doctor, complications, prevention, FAQ."}
            </p>
          )}
        </div>

        {expanded && (<>

        {needsTranslate && (
          <div className="mb-6">
            <Button variant="outline" size="sm" onClick={doTranslate} disabled={tLoading || !!translated} className="gap-2">
              {tLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
              {tLoading ? t.common.translating : translated ? `✓ ${langName}` : `${t.common.translateAi} → ${langName}`}
            </Button>
          </div>
        )}

        {i.whatToDo && (
          <div className="rounded-2xl border-2 border-emergency/40 bg-emergency/10 p-5 mb-6">
            <div className="flex items-center gap-2 font-bold text-emergency mb-2"><AlertTriangle className="h-5 w-5" /> {t.common.whatToDo}</div>
            <p className="text-sm leading-relaxed">{i.whatToDo}</p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <Section icon={Activity} title={t.common.symptoms} items={i.symptoms} accent="bg-primary-soft text-primary" />
          <Section icon={Lightbulb} title={t.common.causes} items={i.causes} accent="bg-warning/20 text-warning-foreground" />
          <Section icon={Pill} title={t.common.treatments} items={i.treatments} accent="bg-success/15 text-success" />
          {i.research && (
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-9 w-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center"><FlaskConical className="h-4 w-4" /></div>
                <h2 className="font-bold">{t.common.research}</h2>
              </div>
              <p className="text-sm leading-relaxed">{i.research}</p>
            </div>
          )}
        </div>

        {i.fullDesc && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center"><BookOpen className="h-4 w-4" /></div>
              <h2 className="font-bold">{lang === "ar" ? "نظرة عامة مفصّلة" : "Detailed overview"}</h2>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">{i.fullDesc}</p>
          </div>
        )}

        {i.treatmentDetails && i.treatmentDetails.length > 0 && (
          <div className="mt-6 rounded-2xl border border-success/30 bg-success/5 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-success/15 text-success flex items-center justify-center"><Pill className="h-4 w-4" /></div>
              <h2 className="font-bold">{lang === "ar" ? "تفاصيل العلاج" : "Treatment details"}</h2>
              <AskAiAboutSection diseaseName={i.name} sectionTitle={lang === "ar" ? "العلاج" : "Treatment"} sectionContent={i.treatmentDetails.map(td => `${td.title}: ${td.body}`).join("\n")} className="ms-auto" />
            </div>
            <div className="space-y-3">
              {i.treatmentDetails.map((td, idx) => (
                <div key={idx} className="rounded-xl bg-card border border-border p-3">
                  <h3 className="font-bold text-sm text-success mb-1">{td.title}</h3>
                  <p className="text-sm text-foreground/85 leading-relaxed">{td.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {i.stages && i.stages.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center"><TrendingUp className="h-4 w-4" /></div>
              <h2 className="font-bold">{lang === "ar" ? "مراحل المرض" : "Disease stages"}</h2>
            </div>
            <div className="space-y-2">
              {i.stages.map((s, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</div>
                  <div>
                    <h3 className="font-bold text-sm">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          {i.complications && i.complications.length > 0 && (
            <Section icon={AlertOctagon} title={lang === "ar" ? "المضاعفات المحتملة" : "Possible complications"} items={i.complications} accent="bg-emergency/15 text-emergency" />
          )}
          {i.lifestyle && i.lifestyle.length > 0 && (
            <Section icon={Heart} title={lang === "ar" ? "نصائح للحياة اليومية" : "Daily lifestyle tips"} items={i.lifestyle} accent="bg-primary-soft text-primary" />
          )}
          {i.prevention && i.prevention.length > 0 && (
            <Section icon={ShieldCheck} title={lang === "ar" ? "الوقاية" : "Prevention"} items={i.prevention} accent="bg-success/15 text-success" />
          )}
          {tests.length > 0 && (
            <Section icon={FlaskRound} title={isAr ? "التحاليل والفحوصات اللازمة" : "Recommended tests"} items={tests} accent="bg-accent/15 text-accent" />
          )}
        </div>

        {i.redFlags && i.redFlags.length > 0 && (
          <div className="mt-6 rounded-2xl border-2 border-emergency/40 bg-emergency/5 p-5">
            <div className="flex items-center gap-2 mb-3 text-emergency font-bold">
              <AlertTriangle className="h-5 w-5" />
              {lang === "ar" ? "علامات تستدعي الطوارئ" : "Red flags — seek emergency care"}
            </div>
            <ul className="space-y-1.5">
              {i.redFlags.map((rf, idx) => (
                <li key={idx} className="text-sm flex gap-2"><span className="text-emergency">•</span>{rf}</li>
              ))}
            </ul>
          </div>
        )}

        {i.faq && i.faq.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center"><HelpCircle className="h-4 w-4" /></div>
              <h2 className="font-bold">{lang === "ar" ? "أسئلة شائعة" : "Frequently asked questions"}</h2>
            </div>
            <div className="space-y-2">
              {i.faq.map((f, idx) => (
                <details key={idx} className="rounded-xl bg-muted/50 border border-border group">
                  <summary className="cursor-pointer p-3 font-semibold text-sm flex items-center justify-between gap-2">
                    <span>{f.q}</span>
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180 shrink-0" />
                  </summary>
                  <p className="px-3 pb-3 text-sm text-foreground/85 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        </>)}

        <SectionChatbot section={disease.category === "mental" ? "mental" : "diseases"} variant="inline" title={lang === "ar" ? `اسأل عن ${i.name}` : `Ask about ${i.name}`} />

        <div className="mt-8 rounded-xl border border-warning/30 bg-warning/10 p-4 flex items-start gap-2">
          <Shield className="h-5 w-5 text-warning-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">{t.home.disclaimer}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
