import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeartPulse, PlayCircle } from "lucide-react";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionChatbot } from "@/components/SectionChatbot";
import { firstAidGuides } from "@/lib/firstAid";

export const Route = createFileRoute("/first-aid")({
  head: () => ({ meta: [{ title: "الإسعافات الأولية — صحّتك" }] }),
  component: FirstAidPage,
});

function FirstAidPage() {
  const { t, lang } = useI18n();
  const cl = contentLangFor(lang);
  const [active, setActive] = useState(firstAidGuides[0].id);
  const guide = firstAidGuides.find((g) => g.id === active)!;
  const i = guide[cl];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-success/15 text-success flex items-center justify-center"><HeartPulse className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{t.nav.firstAid}</h1>
        </div>
        <p className="text-muted-foreground mb-8">{t.sections.firstAidDesc}</p>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className="space-y-2">
            {firstAidGuides.map((g) => {
              const gi = g[cl];
              return (
                <button key={g.id} onClick={() => setActive(g.id)} className={`w-full text-start rounded-xl border p-3 transition-all ${
                  active === g.id ? "border-primary bg-primary-soft" : "border-border bg-card hover:border-primary/40"
                }`}>
                  <div className="font-semibold text-sm">{gi.title}</div>
                </button>
              );
            })}
          </aside>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-2xl font-bold mb-2">{i.title}</h2>
            <p className="text-muted-foreground mb-5">{i.intro}</p>

            <ol className="space-y-3 mb-6">
              {guide.steps.map((s, idx) => (
                <li key={idx} className="flex gap-3 rounded-xl border border-border bg-background p-4">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-primary text-primary-foreground font-bold flex items-center justify-center text-sm">{idx + 1}</div>
                  <p className="text-sm leading-relaxed pt-1">{s[cl]}</p>
                </li>
              ))}
            </ol>

            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(guide.videoQuery)}`} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90">
              <PlayCircle className="h-5 w-5" /> {lang === "ar" ? "شاهد فيديوهات تعليمية" : "Watch tutorial videos"}
            </a>
          </div>
        </div>
      </main>
      <SectionChatbot section="first-aid" />
      <Footer />
    </div>
  );
}
