import { createFileRoute } from "@tanstack/react-router";
import { Phone, Globe, FlaskConical, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionChatbot } from "@/components/SectionChatbot";
import { useI18n } from "@/lib/i18n";
import { RESEARCH_CENTERS } from "@/lib/researchCenters";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [
    { title: "مراكز البحوث الطبية وكيفية التحويل — صحّتك" },
    { name: "description", content: "المركز القومي للبحوث، فاكسيرا، 57357، مجدي يعقوب وغيرها — كيف ومتى تُحوَّل." },
  ]}),
  component: ResearchPage,
});

function ResearchPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center"><FlaskConical className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{isAr ? "مراكز البحوث والتحاليل المتخصصة" : "Research Centers & Specialized Labs"}</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          {isAr ? "جهات حكومية وأكاديمية موثوقة لتشخيص وعلاج الحالات النادرة، والتحاليل المتقدمة، وكيفية التحويل لها." : "Trusted public/academic centers for rare-disease diagnosis, advanced labs, and how to refer."}
        </p>

        <div className="space-y-6">
          {RESEARCH_CENTERS.map((c) => (
            <article key={c.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition" data-speak={`${isAr ? c.name.ar : c.name.en} في ${isAr ? c.city.ar : c.city.en}`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-xl font-bold">{isAr ? c.name.ar : c.name.en}</h2>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {isAr ? c.city.ar : c.city.en} — {c.country}</div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {c.phone && <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1 rounded-lg bg-primary-soft text-primary px-3 py-1.5 text-sm font-bold"><Phone className="h-3.5 w-3.5" />{c.phone}</a>}
                  {c.website && <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm"><Globe className="h-3.5 w-3.5" />{isAr ? "الموقع" : "Website"}</a>}
                  {c.email && <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm"><Mail className="h-3.5 w-3.5" />{c.email}</a>}
                </div>
              </div>

              {c.address && <p className="text-sm text-foreground/80 mb-3">{isAr ? c.address.ar : c.address.en}</p>}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase font-bold text-primary mb-1.5">{isAr ? "الخدمات" : "Services"}</div>
                  <ul className="space-y-1 text-sm">
                    {(isAr ? c.services.ar : c.services.en).map((s, i) => (
                      <li key={i} className="flex gap-2 items-start"><ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 rtl:rotate-180 shrink-0" /><span>{s}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-accent mb-1.5">{isAr ? "كيف ومتى تُحوَّل" : "How & when to refer"}</div>
                  <p className="text-sm text-foreground/85 leading-relaxed">{isAr ? c.howToRefer.ar : c.howToRefer.en}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {isAr ? c.hours.ar : c.hours.en}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SectionChatbot section="research" title={isAr ? "اسأل عن مراكز البحوث" : "Ask about research centers"} />
      <Footer />
    </div>
  );
}
