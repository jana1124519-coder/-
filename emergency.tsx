import { createFileRoute, Link } from "@tanstack/react-router";
import { Siren, ArrowLeft } from "lucide-react";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionChatbot } from "@/components/SectionChatbot";
import { allDiseases as diseases } from "@/lib/diseases";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [{ title: "الطوارئ — صحّتك" }] }),
  component: EmergencyPage,
});

function EmergencyPage() {
  const { t, lang } = useI18n();
  const cl = contentLangFor(lang);
  const items = diseases.filter((d) => d.category === "emergency");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-10 flex-1">
        <div className="rounded-2xl bg-gradient-emergency p-6 md:p-8 text-emergency-foreground shadow-elevated mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Siren className="h-7 w-7" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.nav.emergency}</h1>
          </div>
          <p className="opacity-90">{t.sections.emergencyDesc}</p>
          <Link to="/doctors" className="inline-flex items-center gap-1 mt-4 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-sm font-semibold backdrop-blur">
            {lang === "ar" ? "أرقام الإسعاف حول العالم" : "Worldwide emergency numbers"} <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((d) => {
            const i = d[cl];
            return (
              <Link key={d.id} to="/diseases/$id" params={{ id: d.id }} className="rounded-2xl border-2 border-emergency/30 bg-card p-5 hover:border-emergency hover:shadow-elevated transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Siren className="h-5 w-5 text-emergency" />
                  <h2 className="font-bold text-lg">{i.name}</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{i.shortDesc}</p>
                {i.whatToDo && (
                  <div className="rounded-lg bg-emergency/5 border border-emergency/20 p-3 text-sm">
                    <div className="font-semibold text-emergency mb-1">{t.common.whatToDo}</div>
                    <p className="text-foreground/90 line-clamp-3">{i.whatToDo}</p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </main>
      <SectionChatbot section="emergency" />
      <Footer />
    </div>
  );
}
