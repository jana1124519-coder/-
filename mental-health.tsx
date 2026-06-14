import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, ArrowLeft, Sparkles } from "lucide-react";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionChatbot } from "@/components/SectionChatbot";
import { allDiseases as diseases } from "@/lib/diseases";

export const Route = createFileRoute("/mental-health")({
  head: () => ({ meta: [{ title: "الصحة النفسية — صحّتك" }] }),
  component: MentalPage,
});

function MentalPage() {
  const { t, lang } = useI18n();
  const cl = contentLangFor(lang);
  const items = diseases.filter((d) => d.category === "mental");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center"><Brain className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{t.nav.mental}</h1>
        </div>
        <p className="text-muted-foreground mb-6">{t.sections.mentalDesc}</p>

        <Link to="/psych-chat" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 mb-8">
          <Sparkles className="h-4 w-4" /> {t.nav.psychChat} <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        </Link>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((d) => {
            const i = d[cl];
            return (
              <Link key={d.id} to="/diseases/$id" params={{ id: d.id }} className="rounded-2xl border border-border bg-card p-5 hover:border-accent/50 hover:shadow-elevated transition-all">
                <h2 className="font-bold text-lg mb-2">{i.name}</h2>
                <p className="text-sm text-muted-foreground line-clamp-3">{i.shortDesc}</p>
              </Link>
            );
          })}
        </div>
      </main>
      <SectionChatbot section="mental" />
      <Footer />
    </div>
  );
}
