import { createFileRoute } from "@tanstack/react-router";
import { Users, AlertCircle, MessageSquareQuote, CheckCircle2, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionChatbot } from "@/components/SectionChatbot";
import { PARENT_SCENARIOS } from "@/lib/parentScenarios";

export const Route = createFileRoute("/parents")({
  head: () => ({ meta: [{ title: "ركن الأهالي — صحّتك" }] }),
  component: ParentsPage,
});

function ParentsPage() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center"><Users className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{t.nav.parents}</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          {isAr
            ? "مواقف عملية تواجهك كأهل، مع خطوات محددة وجمل تقدر تقولها لطفلك."
            : "Practical scenarios you face as a parent, with specific steps and exact phrases you can say."}
        </p>

        <div className="space-y-6">
          {PARENT_SCENARIOS.map((s) => {
            const c = isAr ? s.ar : s.en;
            return (
              <article key={s.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition">
                <h2 className="text-xl font-bold mb-2">{c.title}</h2>
                <div className="rounded-xl bg-warning/10 border border-warning/30 p-3 mb-4 flex gap-2 items-start">
                  <AlertCircle className="h-4 w-4 text-warning-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/85">{c.problem}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-primary text-sm mb-2">
                      <CheckCircle2 className="h-4 w-4" /> {isAr ? "خطوات عملية" : "Practical steps"}
                    </div>
                    <ol className="space-y-1.5 list-decimal list-inside text-sm text-foreground/90">
                      {c.steps.map((step, i) => <li key={i} className="leading-relaxed">{step}</li>)}
                    </ol>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 font-bold text-accent text-sm mb-2">
                        <MessageSquareQuote className="h-4 w-4" /> {isAr ? "جمل تقدر تقولها" : "Things you can say"}
                      </div>
                      <ul className="space-y-1.5 text-sm">
                        {c.phrases.map((p, i) => (
                          <li key={i} className="rounded-lg bg-accent/5 border border-accent/20 px-3 py-2 text-foreground/85 italic">{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-emergency/10 border border-emergency/30 p-3 flex gap-2 items-start">
                      <Phone className="h-4 w-4 text-emergency shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] uppercase font-bold text-emergency mb-0.5">{isAr ? "متى تطلب مساعدة" : "When to seek help"}</div>
                        <p className="text-xs text-foreground/85 leading-relaxed">{c.whenAsk}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <SectionChatbot section="parents" />
      <Footer />
    </div>
  );
}
