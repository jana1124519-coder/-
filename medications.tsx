import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Pill, Search, AlertTriangle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionChatbot } from "@/components/SectionChatbot";
import { useI18n } from "@/lib/i18n";
import { MEDICATIONS } from "@/lib/medications";

export const Route = createFileRoute("/medications")({
  head: () => ({ meta: [
    { title: "قاعدة بيانات الأدوية — صحّتك" },
    { name: "description", content: "الاستخدامات، الآثار الجانبية، التفاعلات الدوائية لأشهر الأدوية." },
  ]}),
  component: MedsPage,
});

function MedsPage() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const ql = q.toLowerCase();
    return MEDICATIONS.filter((m) => {
      const c = ar ? m.ar : m.en;
      return c.name.toLowerCase().includes(ql) || c.uses.some((u) => u.toLowerCase().includes(ql));
    });
  }, [q, ar]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center"><Pill className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{ar ? "قاعدة بيانات الأدوية" : "Medications Database"}</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          {ar ? "ابحث عن دواء لمعرفة استخداماته، آثاره الجانبية، وتفاعلاته." : "Search for a drug to see uses, side effects, and interactions."}
        </p>

        <div className="rounded-2xl border border-warning/30 bg-warning/10 p-3 mb-6 text-sm">
          {ar ? "للتثقيف فقط. لا تبدأ/تغيّر أي دواء دون استشارة الصيدلي أو الطبيب." : "Educational only. Don't start/change any drug without your pharmacist or doctor."}
        </div>

        <div className="relative mb-6">
          <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={ar ? "ابحث عن دواء..." : "Search a drug..."} className="w-full ps-10 h-11 rounded-lg border border-input bg-background px-3" />
        </div>

        <div className="space-y-4">
          {list.map((m) => {
            const c = ar ? m.ar : m.en;
            return (
              <article key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h2 className="text-xl font-bold mb-3">{c.name}</h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <Block title={ar ? "الاستخدامات" : "Uses"} items={c.uses} color="primary" />
                  <Block title={ar ? "الآثار الجانبية" : "Side effects"} items={c.sideEffects} color="accent" />
                  <Block title={ar ? "التفاعلات الدوائية" : "Drug interactions"} items={c.interactions} color="warning" />
                  <Block title={ar ? "تحذيرات" : "Warnings"} items={c.warnings} color="emergency" />
                </div>
              </article>
            );
          })}
          {list.length === 0 && <p className="text-center text-muted-foreground py-6">{ar ? "لا نتائج" : "No results"}</p>}
        </div>
      </main>
      <SectionChatbot section="medications" title={ar ? "اسأل صيدلي AI عن دواء" : "Ask the AI pharmacist"} />
      <Footer />
    </div>
  );
}

function Block({ title, items, color }: { title: string; items: string[]; color: "primary" | "accent" | "warning" | "emergency" }) {
  const bg = color === "primary" ? "bg-primary-soft" : color === "accent" ? "bg-accent/10 border-accent/30" : color === "warning" ? "bg-warning/10 border-warning/30" : "bg-emergency/10 border-emergency/30";
  return (
    <div className={`rounded-xl border p-3 ${bg}`}>
      <div className="flex items-center gap-1.5 font-bold mb-2 text-sm"><AlertTriangle className="h-3.5 w-3.5" />{title}</div>
      <ul className="space-y-1 list-disc list-inside">
        {items.map((i, k) => <li key={k}>{i}</li>)}
      </ul>
    </div>
  );
}
