import { useRef, useState, useEffect } from "react";
import { Send, Loader2, MessageCircle, Sparkles, X, Mic, MicOff, Volume2, VolumeX, Hand, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatWithAI } from "@/lib/aiChat";
import { useVoice } from "@/hooks/useVoice";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { ChatHistory } from "@/components/ChatHistory";

interface Msg { role: "user" | "assistant"; content: string }

interface Props {
  /** Section identifier — shown in header & added to context */
  section: "diseases" | "mental" | "first-aid" | "parents" | "emergency" | "doctors" | "research" | "symptoms" | "medications";
  /** Title shown in chatbot header */
  title?: string;
  /** Floating mode = bottom-right bubble; inline = inside the page */
  variant?: "floating" | "inline";
}

const SECTION_PROMPTS: Record<Props["section"], { ar: string; en: string }> = {
  diseases: {
    ar: "أنت مساعد متخصص في تثقيف المستخدم عن الأمراض المختلفة (شائعة، نادرة، وراثية). اشرح بإيجاز وأرشد للتخصص المناسب.",
    en: "You are an assistant specialized in educating users about various diseases (common, rare, genetic). Explain briefly and direct to the appropriate specialty.",
  },
  mental: {
    ar: "أنت مساعد دعم نفسي متعاطف. استمع، وأعطِ تقنيات CBT بسيطة، ووجّه لطبيب نفسي عند الحاجة.",
    en: "You are an empathetic mental support assistant. Listen, offer simple CBT techniques, and refer to a psychiatrist/psychologist when needed.",
  },
  "first-aid": {
    ar: "أنت مساعد إسعافات أولية. أعطِ خطوات واضحة سريعة لكل حالة مع تنبيه متى يجب طلب الإسعاف فوراً.",
    en: "You are a first-aid assistant. Provide clear quick steps for each situation with a warning when EMS must be called.",
  },
  parents: {
    ar: "أنت مستشار متخصص في تربية الأطفال ودعم الأهالي. ركّز على: مواقف يومية (نوبات غضب، رفض دواء، خوف من المدرسة، ضرب الأخوات، كذب، صعوبات أكل، نوم، شاشات)، أمراض الطفولة (سكري، ربو، صرع، حساسية، توحد، فرط حركة)، تواصل عاطفي، حدود حازمة بمحبة. أعطِ خطوات عملية، جمل محددة يقولها الأهل، ومتى تطلب أخصائي.",
    en: "You are a specialized parenting & child-support advisor. Focus on: daily situations (tantrums, refusing medicine, school fear, sibling hitting, lying, picky eating, sleep, screens), childhood illnesses (diabetes, asthma, epilepsy, allergy, autism, ADHD), emotional connection, firm-but-loving boundaries. Give concrete steps, exact phrases parents can say, and when to seek a specialist.",
  },
  emergency: {
    ar: "أنت مساعد فرز للطوارئ. حدّد إذا كانت الحالة طارئة فعلاً وأعطِ تعليمات فورية، واطلب الاتصال بالإسعاف عند أي شك.",
    en: "You are a triage emergency assistant. Identify if it's truly an emergency, give immediate instructions, and instruct to call EMS at any doubt.",
  },
  doctors: {
    ar: "أنت مساعد لاقتراح التخصص الطبي المناسب. لا تعطِ أرقاماً شخصية. أرشد لمنصات الحجز الرسمية ونقابات الأطباء.",
    en: "You are an assistant suggesting the appropriate medical specialty. Do not give personal numbers. Direct to official booking platforms and councils.",
  },
  research: {
    ar: "أنت مساعد متخصص فقط في مراكز البحوث والتحاليل المتقدمة (المركز القومي للبحوث، فاكسيرا، 57357، مجدي يعقوب، KFSH، KHCC). جاوب على: أي مركز يناسب حالتي، طريقة التحويل والمستندات المطلوبة، وقت النتائج، الرسوم، وكيف أرسل العينة. لا تخترع أرقاماً أو إيميلات؛ استخدم فقط البيانات الموجودة في صفحة /research وارجع المستخدم إليها.",
    en: "You are an assistant focused ONLY on medical research centers and advanced labs (NRC, VACSERA, 57357, Magdi Yacoub, KFSH, KHCC). Answer: which center fits a given case, how to refer with required papers, result timing, fees, and sample shipment. Never invent numbers/emails — use only the data on /research and direct users to it.",
  },
  symptoms: {
    ar: "أنت مساعد متخصص في تحليل الأعراض. اسأل أسئلة موجّهة (المدة، الشدة، عوامل تحفيز، أعراض مصاحبة، الجنس، السن)، ثم أعطِ احتمالات أولية مرتّبة وأرشد لتخصص الطبيب. لا تشخّص نهائياً.",
    en: "You are a symptom-triage assistant. Ask focused questions (duration, severity, triggers, associated symptoms, age, sex), then give a ranked tentative differential and refer to the right specialty. Never give a final diagnosis.",
  },
  medications: {
    ar: "أنت صيدلي مساعد. أجب عن استخدامات الدواء، الجرعات المعتادة للبالغين والأطفال، الآثار الجانبية الشائعة والخطيرة، التفاعلات مع أدوية/أطعمة أخرى، الحمل والرضاعة، والبدائل. حذّر دائماً من بدء/تغيير الدواء دون استشارة الطبيب أو الصيدلي.",
    en: "You are a pharmacist assistant. Explain uses, typical adult/pediatric dosing, common and serious side effects, interactions with other drugs/food, pregnancy & breastfeeding, and alternatives. Always warn to consult a doctor/pharmacist before starting or changing any drug.",
  },
};

export function SectionChatbot({ section, title, variant = "floating" }: Props) {
  const { lang } = useI18n();
  const { user } = useAuth();
  const [open, setOpen] = useState(variant === "inline");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [convId, setConvId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const isAr = lang === "ar";
  const { listening, speaking, transcript, supportedSTT, supportedTTS, start, stop, speak, stopSpeak, setTranscript } = useVoice(lang);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { if (listening && transcript) setInput(transcript); }, [transcript, listening]);

  const loadConversation = async (id: string) => {
    setConvId(id);
    const { data: msgs } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });
    if (!msgs) return;
    setMessages(msgs.filter((m) => m.role === "user" || m.role === "assistant").map((m) => ({ role: m.role as "user" | "assistant", content: m.content })));
  };

  // Auto-load most recent conversation for this section if user signed in
  useEffect(() => {
    if (!user) { setConvId(null); return; }
    let cancelled = false;
    (async () => {
      const { data: convs } = await supabase
        .from("chat_conversations")
        .select("id")
        .eq("user_id", user.id)
        .eq("section", section)
        .order("updated_at", { ascending: false })
        .limit(1);
      const id = convs?.[0]?.id ?? null;
      if (cancelled || !id) return;
      await loadConversation(id);
    })();
    return () => { cancelled = true; };
  }, [user, section]);

  const ensureConv = async (): Promise<string | null> => {
    if (!user) return null;
    if (convId) return convId;
    const { data: created } = await supabase
      .from("chat_conversations")
      .insert({ user_id: user.id, section })
      .select("id")
      .single();
    const id = created?.id ?? null;
    if (id) setConvId(id);
    return id;
  };

  const persist = async (m: Msg, id: string | null) => {
    if (!id) return;
    await supabase.from("chat_messages").insert({ conversation_id: id, role: m.role, content: m.content });
  };

  const newChat = () => {
    stopSpeak(); if (listening) stop();
    setMessages([]); setInput(""); setTranscript(""); setConvId(null);
    toast.success(isAr ? "شات جديد" : "New chat");
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (listening) stop();

    const sectionPrefix = SECTION_PROMPTS[section][isAr ? "ar" : "en"];
    const augmented = `[Section context: ${section}. ${sectionPrefix}]\n\nUser: ${text}`;

    const userMsg: Msg = { role: "user", content: text };
    const next: Msg[] = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setTranscript("");
    setLoading(true);
    const id = await ensureConv();
    void persist(userMsg, id);
    try {
      const apiMessages = [
        ...next.slice(0, -1).map(({ role, content }) => ({ role, content })),
        { role: "user" as const, content: augmented },
      ];
      const mode = section === "mental" ? "psych" : "medical";
      const res = await chatWithAI({ data: { messages: apiMessages, mode, lang: contentLangFor(lang), uiLang: lang } });
      const aiMsg: Msg = { role: "assistant", content: res.reply };
      setMessages([...next, aiMsg]);
      void persist(aiMsg, id);
      if (autoSpeak) speak(res.reply);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "error";
      if (msg.includes("RATE_LIMIT")) toast.error(isAr ? "كثرة الطلبات، حاول لاحقاً" : "Rate limit");
      else if (msg.includes("PAYMENT_REQUIRED")) toast.error(isAr ? "نفد رصيد الذكاء الاصطناعي" : "AI credits exhausted");
      else toast.error(isAr ? "حدث خطأ" : "Error");
    } finally { setLoading(false); }
  };

  const headerLabel = title ?? (isAr ? "اسأل المساعد الذكي" : "Ask the AI Assistant");

  const chatPanel = (
    <div className={`flex flex-col bg-card border border-border rounded-2xl shadow-elevated overflow-hidden ${variant === "floating" ? "h-[500px] w-[360px] max-w-[calc(100vw-2rem)]" : "h-[460px] w-full"}`}>
      <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-gradient-primary text-primary-foreground gap-2">
        <div className="flex items-center gap-2 font-semibold text-sm flex-1 min-w-0">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="truncate">{headerLabel}</span>
        </div>
        <ChatHistory section={section} currentId={convId} onSelect={loadConversation} />
        <button
          onClick={newChat}
          className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-white/15 hover:bg-white/25 transition"
          title={isAr ? "بدء شات جديد" : "Start new chat"}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <Link to="/sign-language" className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-white/15 hover:bg-white/25 transition" title={isAr ? "لغة الإشارة" : "Sign language"}>
          <Hand className="h-3.5 w-3.5" />
        </Link>
        {supportedTTS && (
          <button
            onClick={() => { setAutoSpeak((v) => !v); if (autoSpeak) stopSpeak(); }}
            className={`inline-flex items-center justify-center h-7 w-7 rounded-md transition ${autoSpeak ? "bg-white text-primary" : "bg-white/15 hover:bg-white/25"}`}
            title={isAr ? "قراءة بصوت عالٍ" : "Read aloud"}
          >
            {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>
        )}
        {variant === "floating" && (
          <button onClick={() => setOpen(false)} className="hover:opacity-80"><X className="h-4 w-4" /></button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground py-6 text-xs">
            {isAr ? "اكتب سؤالك أو استخدم الميكروفون 🎤" : "Type your question or use the mic 🎤"}
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 whitespace-pre-wrap ${
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            }`}>
              {m.content}
              {m.role === "assistant" && supportedTTS && (
                <button onClick={() => (speaking ? stopSpeak() : speak(m.content))} className="ms-2 inline-flex items-center text-muted-foreground hover:text-primary align-middle" title={isAr ? "استمع" : "Listen"}>
                  {speaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl px-3 py-2"><Loader2 className="h-3.5 w-3.5 animate-spin" /></div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="border-t border-border p-2 flex gap-2">
        {supportedSTT && (
          <Button
            type="button"
            size="icon"
            variant={listening ? "default" : "outline"}
            onClick={() => (listening ? stop() : start())}
            className={`h-9 w-9 ${listening ? "bg-emergency text-emergency-foreground animate-pulse" : ""}`}
            title={isAr ? "تحدّث" : "Speak"}
          >
            {listening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
          </Button>
        )}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); send(); } }}
          placeholder={listening ? (isAr ? "أنا أستمع..." : "Listening...") : (isAr ? "اكتب سؤالك..." : "Type your question...")}
          className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm"
        />
        <Button onClick={send} disabled={loading || !input.trim()} size="sm" className="bg-gradient-primary">
          <Send className="h-3.5 w-3.5 rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );

  if (variant === "inline") {
    return (
      <div className="my-8">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-lg">{headerLabel}</h2>
        </div>
        {chatPanel}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 end-4 z-40">
      {open ? chatPanel : (
        <button
          onClick={() => setOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-105 transition-transform"
          aria-label={headerLabel}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
