import { useState } from "react";
import { Sparkles, Loader2, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { chatWithAI } from "@/lib/aiChat";
import { toast } from "sonner";

interface Props {
  diseaseName: string;
  sectionTitle: string;
  sectionContent: string;
  className?: string;
}

export function AskAiAboutSection({ diseaseName, sectionTitle, sectionContent, className }: Props) {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);

  const ask = async (qOverride?: string) => {
    const q = (qOverride ?? question).trim();
    if (!q || busy) return;
    setBusy(true);
    setReply("");
    try {
      const ctx = isAr
        ? `أنت طبيب يشرح بالتفصيل. المرض: "${diseaseName}". القسم: "${sectionTitle}". محتوى مرجعي: ${sectionContent}\n\nسؤال المستخدم: ${q}\n\nأجب بالعربية بإيجاز وعمق.`
        : `You are a doctor explaining in depth. Disease: "${diseaseName}". Section: "${sectionTitle}". Reference: ${sectionContent}\n\nUser question: ${q}\n\nAnswer in English concisely and in depth.`;
      const res = await chatWithAI({
        data: { messages: [{ role: "user", content: ctx }], mode: "medical", lang: contentLangFor(lang), uiLang: lang },
      });
      setReply(res.reply);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "error";
      if (msg.includes("RATE_LIMIT")) toast.error(isAr ? "كثرة الطلبات" : "Rate limit");
      else if (msg.includes("PAYMENT_REQUIRED")) toast.error(isAr ? "نفد الرصيد" : "Credits exhausted");
      else toast.error(isAr ? "خطأ" : "Error");
    } finally { setBusy(false); }
  };

  const presets = isAr
    ? ["اشرحلي بالتفصيل أكتر", "إيه أحدث الأبحاث؟", "إيه المضاعفات المحتملة؟", "إزاي أتعامل معاه يومياً؟"]
    : ["Explain in more depth", "Latest research?", "Possible complications?", "Daily management tips?"];

  return (
    <>
      <Button variant="outline" size="sm" className={`gap-1.5 text-xs ${className ?? ""}`} onClick={() => setOpen(true)}>
        <Sparkles className="h-3.5 w-3.5 text-primary" /> {isAr ? "اسأل AI لأعمق" : "Ask AI deeper"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {isAr ? `تعمق في: ${sectionTitle}` : `Deep dive: ${sectionTitle}`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button key={p} onClick={() => { setQuestion(p); void ask(p); }} disabled={busy}
                  className="px-2.5 py-1 rounded-full text-[11px] bg-primary-soft text-primary hover:bg-primary/10 transition disabled:opacity-50">
                  {p}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void ask(); } }}
                placeholder={isAr ? "اكتب سؤالك..." : "Type your question..."}
                className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
              />
              <Button onClick={() => ask()} disabled={busy || !question.trim()} className="bg-gradient-primary">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 rtl:rotate-180" />}
              </Button>
            </div>

            {reply && (
              <div className="rounded-xl bg-muted p-3 text-sm whitespace-pre-wrap leading-relaxed">{reply}</div>
            )}
            {!reply && !busy && (
              <p className="text-xs text-muted-foreground text-center py-4">
                {isAr ? "اختر سؤال جاهز أو اكتب سؤالك الخاص." : "Pick a preset or type your own question."}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
