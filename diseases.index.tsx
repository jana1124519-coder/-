import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowLeft, X } from "lucide-react";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionChatbot } from "@/components/SectionChatbot";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { allDiseases as diseases, type Category } from "@/lib/diseases";
import { T } from "@/components/T";

export const Route = createFileRoute("/diseases/")({
  head: () => ({ meta: [{ title: "الأمراض — صحّتك" }, { name: "description", content: "قائمة الأمراض الشائعة والنادرة والوراثية." }] }),
  component: DiseasesPage,
});

const CATS: { id: Category | "all"; ar: string; en: string }[] = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "common", ar: "شائعة", en: "Common" },
  { id: "rare", ar: "نادرة", en: "Rare" },
  { id: "genetic", ar: "وراثية", en: "Genetic" },
  { id: "mental", ar: "نفسية", en: "Mental" },
  { id: "emergency", ar: "طارئة", en: "Emergency" },
];

const sevColor: Record<string, string> = {
  mild: "bg-success/15 text-success border-success/30",
  moderate: "bg-warning/20 text-warning-foreground border-warning/30",
  severe: "bg-destructive/15 text-destructive border-destructive/30",
  critical: "bg-emergency/15 text-emergency border-emergency/30",
};

// Curated common symptom tags for quick filtering
const SYMPTOM_TAGS: { ar: string; en: string }[] = [
  { ar: "حمى", en: "fever" },
  { ar: "صداع", en: "headache" },
  { ar: "سعال", en: "cough" },
  { ar: "ضيق تنفس", en: "shortness of breath" },
  { ar: "ألم صدر", en: "chest pain" },
  { ar: "ألم بطن", en: "abdominal pain" },
  { ar: "غثيان", en: "nausea" },
  { ar: "إسهال", en: "diarrhea" },
  { ar: "دوخة", en: "dizziness" },
  { ar: "إرهاق", en: "fatigue" },
  { ar: "طفح", en: "rash" },
  { ar: "قلق", en: "anxiety" },
  { ar: "اكتئاب", en: "depression" },
];

function DiseasesPage() {
  const { t, lang } = useI18n();
  const cl = contentLangFor(lang);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [tags, setTags] = useState<string[]>([]);
  const isAr = lang === "ar";

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const filtered = useMemo(() => {
    return diseases.filter((d) => {
      if (cat !== "all" && d.category !== cat) return false;
      const i18n = d[cl];
      if (tags.length > 0) {
        const hay = [
          ...i18n.symptoms,
          i18n.shortDesc,
          i18n.name,
        ].join(" ").toLowerCase();
        const ok = tags.every((tag) => hay.includes(tag.toLowerCase()));
        if (!ok) return false;
      }
      if (!q.trim()) return true;
      const tx = q.toLowerCase();
      return (
        i18n.name.toLowerCase().includes(tx) ||
        i18n.shortDesc.toLowerCase().includes(tx) ||
        i18n.symptoms.some((s: string) => s.toLowerCase().includes(tx))
      );
    });
  }, [q, cat, cl, tags]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-10 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.nav.diseases}</h1>
        <p className="text-muted-foreground mb-6">{t.sections.diseasesDesc}</p>

        <div className="relative mb-4">
          <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={isAr ? "ابحث باسم المرض أو بعرض (مثلاً: صداع، حمى)..." : "Search by disease name or symptom (e.g. headache, fever)..."}
            className="ps-10 h-12"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                cat === c.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"
              }`}
            >
              {isAr ? c.ar : c.en}
            </button>
          ))}
        </div>

        <div className="mb-6 rounded-2xl border border-border bg-muted/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-bold text-muted-foreground">
              {isAr ? "🩺 تصفية بالأعراض (اضغط أكثر من عرض)" : "🩺 Filter by symptoms (tap multiple)"}
            </div>
            {tags.length > 0 && (
              <button onClick={() => setTags([])} className="text-[11px] inline-flex items-center gap-1 text-emergency hover:underline">
                <X className="h-3 w-3" /> {isAr ? "مسح" : "Clear"}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SYMPTOM_TAGS.map((s) => {
              const label = isAr ? s.ar : s.en;
              const active = tags.includes(label);
              return (
                <button
                  key={s.en}
                  onClick={() => toggleTag(label)}
                  className={`px-2.5 py-1 rounded-full text-xs border transition ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">{t.common.noResults}</div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-3">
              {isAr ? `${filtered.length} نتيجة` : `${filtered.length} results`}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((d) => {
                const i = d[cl];
                return (
                  <Link
                    key={d.id}
                    to="/diseases/$id"
                    params={{ id: d.id }}
                    className="group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        <T from={cl}>{i.name}</T>
                      </h3>
                      <Badge variant="outline" className={`shrink-0 text-[10px] ${sevColor[d.severity]}`}>{t.common[d.severity]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3"><T from={cl}>{i.shortDesc}</T></p>
                    <div className="mt-3 inline-flex items-center text-xs font-semibold text-primary">
                      {t.cta.learnMore} <ArrowLeft className="ms-1 h-3 w-3 rtl:rotate-180" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>
      <SectionChatbot section="diseases" />
      <Footer />
    </div>
  );
}

