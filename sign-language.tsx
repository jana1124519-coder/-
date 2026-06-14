import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Hand, Search, Loader2, ExternalLink, Sparkles, Send } from "lucide-react";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SIGN_VOCAB, type SignEntry } from "@/lib/signLanguage";
import { chatWithAI } from "@/lib/aiChat";
import { toast } from "sonner";

export const Route = createFileRoute("/sign-language")({
  head: () => ({ meta: [{ title: "لغة الإشارة الطبية — صحّتك" }] }),
  component: SignLangPage,
});

const CATEGORIES: { id: SignEntry["category"] | "all"; ar: string; en: string }[] = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "general", ar: "عام", en: "General" },
  { id: "symptoms", ar: "أعراض", en: "Symptoms" },
  { id: "emergency", ar: "طوارئ", en: "Emergency" },
  { id: "body", ar: "أعضاء الجسم", en: "Body" },
  { id: "feelings", ar: "مشاعر", en: "Feelings" },
];

function SignLangPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<SignEntry["category"] | "all">("all");
  const [aiInput, setAiInput] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SIGN_VOCAB.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      if (!q) return true;
      return e.ar.includes(q) || e.en.toLowerCase().includes(q);
    });
  }, [search, cat]);

  const askAi = async () => {
    const text = aiInput.trim();
    if (!text || aiLoading) return;
    setAiLoading(true);
    setAiReply("");
    try {
      const prompt = isAr
        ? `أنت خبير في لغة الإشارة الطبية (ASL ولغة الإشارة العربية). المستخدم يكتب لك جملة أو كلمة طبية ويريد معرفة كيف يعبّر عنها بلغة الإشارة. اشرح خطوة بخطوة بإيجاز ووضوح بالعربية. الجملة: "${text}"`
        : `You are a medical sign language expert (ASL + Arabic Sign Language). The user wrote a medical word/phrase. Describe step-by-step how to sign it clearly and briefly. Phrase: "${text}"`;
      const res = await chatWithAI({
        data: {
          messages: [{ role: "user", content: prompt }],
          mode: "medical",
          lang: contentLangFor(lang),
          uiLang: lang,
        },
      });
      setAiReply(res.reply);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "error";
      if (msg.includes("RATE_LIMIT")) toast.error(isAr ? "كثرة الطلبات" : "Rate limit");
      else if (msg.includes("PAYMENT_REQUIRED")) toast.error(isAr ? "نفد الرصيد" : "Credits exhausted");
      else toast.error(isAr ? "خطأ" : "Error");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
            <Hand className="h-6 w-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{isAr ? "لغة الإشارة الطبية" : "Medical Sign Language"}</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          {isAr
            ? "قاموس مصور للكلمات الطبية الشائعة بلغة الإشارة الأمريكية والعربية، مع مساعد ذكي يشرح أي جملة."
            : "Pictorial dictionary of common medical words in ASL & Arabic Sign Language, plus an AI helper for any phrase."}
        </p>

        {/* AI helper */}
        <section className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary-soft/40 to-card p-5 mb-8 shadow-soft">
          <div className="flex items-center gap-2 mb-3 font-bold text-primary">
            <Sparkles className="h-5 w-5" /> {isAr ? "مساعد ذكي للإشارة" : "AI Sign Helper"}
          </div>
          <div className="flex gap-2">
            <Input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void askAi(); } }}
              placeholder={isAr ? "اكتب جملة أو كلمة طبية..." : "Type a medical phrase or word..."}
              className="flex-1"
            />
            <Button onClick={askAi} disabled={aiLoading || !aiInput.trim()} className="bg-gradient-primary">
              {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 rtl:rotate-180" />}
            </Button>
          </div>
          {aiReply && (
            <div className="mt-3 p-3 rounded-xl bg-card border border-border whitespace-pre-wrap text-sm">
              {aiReply}
              {aiInput && (
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`sign language ${aiInput}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" /> {isAr ? "ابحث في YouTube" : "Search YouTube"}
                </a>
              )}
            </div>
          )}
        </section>

        {/* Search & categories */}
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? "ابحث..." : "Search..."}
              className="ps-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  cat === c.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {isAr ? c.ar : c.en}
              </button>
            ))}
          </div>
        </div>

        {/* Dictionary grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <article key={e.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-bold text-lg">{isAr ? e.ar : e.en}</h3>
                  <p className="text-xs text-muted-foreground">{isAr ? e.en : e.ar}</p>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {CATEGORIES.find((c) => c.id === e.category)?.[isAr ? "ar" : "en"]}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="text-[11px] font-bold text-primary uppercase mb-0.5">ASL</div>
                  <p className="text-foreground/85 leading-relaxed">{e.asl}</p>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-accent uppercase mb-0.5">{isAr ? "إشارة عربية" : "Arabic Sign"}</div>
                  <p className="text-foreground/85 leading-relaxed">{e.arSign}</p>
                </div>
              </div>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(e.videoSearch)}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" /> {isAr ? "شاهد فيديو" : "Watch video"}
              </a>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">{isAr ? "لا توجد نتائج" : "No results"}</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
