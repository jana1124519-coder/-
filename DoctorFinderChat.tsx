import { useRef, useState, useEffect } from "react";
import { Send, Loader2, Stethoscope, ExternalLink } from "lucide-react";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatWithAI } from "@/lib/aiChat";
import { SPECIALTY_LABELS, type SpecialtyToken } from "@/lib/medicalCouncils";

interface Msg { role: "user" | "assistant"; content: string; specialty?: string | null }

const PLATFORMS = [
  { name: "Vezeeta", url: "https://www.vezeeta.com", region: "MENA" },
  { name: "Doctolib", url: "https://www.doctolib.fr", region: "EU" },
  { name: "Zocdoc", url: "https://www.zocdoc.com", region: "US" },
  { name: "Practo", url: "https://www.practo.com", region: "India" },
  { name: "Halodoc", url: "https://www.halodoc.com", region: "Asia" },
  { name: "WebMD Care", url: "https://doctor.webmd.com", region: "US" },
];

export function DoctorFinderChat() {
  const { lang } = useI18n();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const isAr = lang === "ar";

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const augmented = `[Context: User is asking about which doctor or specialist to see. Suggest the appropriate medical SPECIALTY token at the end. Do NOT invent doctor names or phone numbers. Recommend official booking platforms instead.]\n\n${text}`;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = [
        ...next.slice(0, -1).map(({ role, content }) => ({ role, content })),
        { role: "user" as const, content: augmented },
      ];
      const res = await chatWithAI({ data: { messages: apiMessages, mode: "medical", lang: contentLangFor(lang), uiLang: lang } });
      setMessages([...next, { role: "assistant", content: res.reply, specialty: res.specialty }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "error";
      if (msg.includes("RATE_LIMIT")) toast.error(isAr ? "كثرة الطلبات" : "Rate limit");
      else if (msg.includes("PAYMENT_REQUIRED")) toast.error(isAr ? "نفد الرصيد" : "Credits exhausted");
      else toast.error(isAr ? "حدث خطأ" : "Error");
    } finally { setLoading(false); }
  };

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-primary-soft flex items-center gap-2">
        <Stethoscope className="h-5 w-5 text-primary" />
        <div className="font-bold">{isAr ? "اسأل عن الطبيب المناسب" : "Find the Right Doctor"}</div>
      </div>
      <div className="h-[400px] overflow-y-auto p-4 space-y-3 text-sm">
        {messages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-2 font-medium">{isAr ? "صف حالتك أو أعراضك" : "Describe your condition or symptoms"}</p>
            <p className="text-xs">{isAr ? "وسأقترح التخصص المناسب ومنصات الحجز الرسمية." : "I'll suggest the right specialty and official booking platforms."}</p>
          </div>
        )}
        {messages.map((m, i) => {
          const spec = m.specialty as SpecialtyToken | null | undefined;
          const specLabel = spec && SPECIALTY_LABELS[spec] ? SPECIALTY_LABELS[spec] : null;
          return (
            <div key={i} className={`flex flex-col gap-2 ${m.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[85%] rounded-xl px-3 py-2 whitespace-pre-wrap ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>{m.content}</div>
              {m.role === "assistant" && specLabel && (
                <div className="max-w-[85%] w-full space-y-2">
                  <div className="rounded-xl border border-primary/30 bg-primary-soft text-primary px-3 py-2 text-xs font-semibold">
                    {isAr ? `التخصص الموصى به: ${specLabel.ar}` : `Recommended specialty: ${specLabel.en}`}
                  </div>
                  <div className="text-[11px] text-muted-foreground font-semibold">{isAr ? "منصات حجز موثوقة:" : "Trusted booking platforms:"}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {PLATFORMS.map((p) => (
                      <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[11px] hover:border-primary transition">
                        {p.name} <span className="text-muted-foreground">· {p.region}</span> <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl px-3 py-2"><Loader2 className="h-4 w-4 animate-spin" /></div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="border-t border-border p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); send(); } }}
          placeholder={isAr ? "مثال: ألم في الصدر منذ يومين..." : "e.g.: chest pain for 2 days..."}
          className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
        />
        <Button onClick={send} disabled={loading || !input.trim()} className="bg-gradient-primary">
          <Send className="h-4 w-4 rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}
