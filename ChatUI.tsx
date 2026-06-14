import { useRef, useState, useEffect } from "react";
import { Send, Loader2, MessageCircle, Sparkles, AlertTriangle, Stethoscope, ExternalLink, Mic, MicOff, Volume2, VolumeX, Hand, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatWithAI } from "@/lib/aiChat";
import { SPECIALTY_LABELS, type SpecialtyToken } from "@/lib/medicalCouncils";
import { useVoice } from "@/hooks/useVoice";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { ChatHistory } from "@/components/ChatHistory";

interface Msg { role: "user" | "assistant"; content: string; specialty?: string | null }

export function ChatUI({ mode }: { mode: "medical" | "psych" | "general" }) {
  const { lang } = useI18n();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const { listening, speaking, transcript, supportedSTT, supportedTTS, start, stop, speak, stopSpeak, setTranscript } = useVoice(lang);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  // Sync mic transcript into input
  useEffect(() => { if (listening && transcript) setInput(transcript); }, [transcript, listening]);

  // Load latest chat for signed-in users
  const section = mode === "psych" ? "psych" : mode === "general" ? "general" : "medical";
  const loadConversation = async (id: string) => {
    setConvId(id);
    const { data: msgs } = await supabase
      .from("chat_messages")
      .select("role, content, metadata")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });
    if (!msgs) return;
    setMessages(
      msgs
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
          specialty: (m.metadata as { specialty?: string } | null)?.specialty ?? null,
        }))
    );
  };

  useEffect(() => {
    if (!user) { setMessages([]); setConvId(null); return; }
    let cancelled = false;
    (async () => {
      const { data: convs } = await supabase
        .from("chat_conversations")
        .select("id")
        .eq("user_id", user.id)
        .eq("section", section)
        .order("updated_at", { ascending: false })
        .limit(1);
      let id = convs?.[0]?.id ?? null;
      if (!id) {
        const { data: created } = await supabase
          .from("chat_conversations")
          .insert({ user_id: user.id, section })
          .select("id")
          .single();
        id = created?.id ?? null;
      }
      if (cancelled || !id) return;
      await loadConversation(id);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, section]);

  const persistMessage = async (m: Msg) => {
    if (!user || !convId) return;
    await supabase.from("chat_messages").insert({
      conversation_id: convId,
      role: m.role,
      content: m.content,
      metadata: m.specialty ? { specialty: m.specialty } : null,
    });
  };

  const newChat = async () => {
    stopSpeak();
    if (listening) stop();
    setMessages([]);
    setInput("");
    setTranscript("");
    if (!user) { setConvId(null); return; }
    const { data: created } = await supabase
      .from("chat_conversations")
      .insert({ user_id: user.id, section })
      .select("id")
      .single();
    if (created?.id) setConvId(created.id);
    toast.success(lang === "ar" ? "بدأ شات جديد" : "New chat started");
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (listening) stop();
    const userMsg: Msg = { role: "user", content: text };
    const next: Msg[] = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setTranscript("");
    setLoading(true);
    void persistMessage(userMsg);
    try {
      const apiMessages = next.map(({ role, content }) => ({ role, content }));
      const res = await chatWithAI({ data: { messages: apiMessages, mode, lang: contentLangFor(lang), uiLang: lang } });
      const aiMsg: Msg = { role: "assistant", content: res.reply, specialty: res.specialty };
      setMessages([...next, aiMsg]);
      void persistMessage(aiMsg);
      if (autoSpeak) speak(res.reply);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "error";
      if (msg.includes("RATE_LIMIT")) toast.error(lang === "ar" ? "كثرة الطلبات، حاول لاحقاً" : "Rate limit, try later");
      else if (msg.includes("PAYMENT_REQUIRED")) toast.error(lang === "ar" ? "نفد رصيد الذكاء الاصطناعي" : "AI credits exhausted");
      else toast.error(lang === "ar" ? "حدث خطأ" : "Error occurred");
    } finally { setLoading(false); }
  };

  const isP = mode === "psych";
  const isG = mode === "general";
  const Icon = isP ? Sparkles : isG ? MessageCircle : MessageCircle;
  const placeholder = isP
    ? (lang === "ar" ? "احكي اللي بقلبك..." : "Share what's on your mind...")
    : isG
    ? (lang === "ar" ? "اسأل عن أي حاجة..." : "Ask anything...")
    : (lang === "ar" ? "اكتب عرضك أو سؤالك..." : "Describe your symptom or question...");

  const intro = isP
    ? (lang === "ar" ? "مساحة آمنة للحديث. أنا هنا للاستماع." : "A safe space to talk. I'm here to listen.")
    : isG
    ? (lang === "ar" ? "اسأل عن أي شيء — معلومات عامة، كتابة، رياضيات، نصائح، برمجة..." : "Ask anything — general knowledge, writing, math, advice, coding...")
    : (lang === "ar" ? "اسألني عن أي عرض أو حالة." : "Ask me about any symptom or condition.");

  const isAr = lang === "ar";

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[700px] rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      <div className={`px-4 py-3 border-b border-border flex items-center gap-2 ${isP ? "bg-accent/10" : "bg-primary-soft"}`}>
        <Icon className={`h-5 w-5 ${isP ? "text-accent" : "text-primary"}`} />
        <div className="font-bold flex-1">{isP ? (isAr ? "دعم نفسي" : "Mental Support") : isG ? (isAr ? "مساعد عام" : "General Assistant") : (isAr ? "مساعد طبي" : "Medical Assistant")}</div>
        {user && convId && (
          <span className="text-[10px] rounded-full bg-success/15 text-success px-2 py-0.5 font-bold">
            {isAr ? "ذاكرة مفعّلة" : "Memory on"}
          </span>
        )}
        <ChatHistory section={section} currentId={convId} onSelect={loadConversation} />
        <button
          onClick={newChat}
          className="text-xs inline-flex items-center gap-1 rounded-lg bg-primary text-primary-foreground px-2 py-1 hover:opacity-90 transition"
          title={isAr ? "بدء شات جديد" : "Start new chat"}
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{isAr ? "جديد" : "New"}</span>
        </button>
        <Link to="/sign-language" className="text-xs inline-flex items-center gap-1 rounded-lg bg-primary/10 text-primary px-2 py-1 hover:bg-primary/20 transition" title={isAr ? "لغة الإشارة" : "Sign language"}>
          <Hand className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{isAr ? "إشارة" : "Sign"}</span>
        </Link>
        {supportedTTS && (
          <button
            onClick={() => { setAutoSpeak((v) => !v); if (autoSpeak) stopSpeak(); }}
            className={`text-xs inline-flex items-center gap-1 rounded-lg px-2 py-1 transition ${autoSpeak ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
            title={isAr ? "قراءة الردود بصوت عالٍ" : "Read replies aloud"}
          >
            {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <div className={`mx-auto h-14 w-14 rounded-2xl flex items-center justify-center mb-3 ${isP ? "bg-accent/15 text-accent" : "bg-primary-soft text-primary"}`}>
              <Icon className="h-7 w-7" />
            </div>
            <p className="text-muted-foreground">{intro}</p>
            {!user && (
              <p className="mt-3 text-xs text-muted-foreground">
                <Link to="/auth" className="text-primary underline">
                  {isAr ? "سجّل الدخول" : "Sign in"}
                </Link>{" "}
                {isAr ? "ليتذكّر المساعد محادثاتك." : "to keep your conversation history."}
              </p>
            )}
          </div>
        )}
        {messages.map((m, i) => {
          const spec = m.specialty as SpecialtyToken | null | undefined;
          const specLabel = spec && SPECIALTY_LABELS[spec] ? SPECIALTY_LABELS[spec] : null;
          return (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} flex-col ${m.role === "user" ? "items-end" : "items-start"} gap-2`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>
                {m.content}
                {m.role === "assistant" && supportedTTS && (
                  <button
                    onClick={() => (speaking ? stopSpeak() : speak(m.content))}
                    className="ms-2 inline-flex items-center text-muted-foreground hover:text-primary align-middle"
                    title={isAr ? "استمع" : "Listen"}
                  >
                    {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>
              {m.role === "assistant" && specLabel && (
                <Link to="/doctors" className="max-w-[85%] inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary-soft text-primary px-3 py-2 text-xs font-semibold hover:bg-primary-soft/80 transition-colors">
                  <Stethoscope className="h-4 w-4" />
                  <span>
                    {isAr
                      ? `الموصى به: ${specLabel.ar} — اعثر على طبيب`
                      : `Recommended: ${specLabel.en} — Find a doctor`}
                  </span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-3"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /></div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-start gap-2 mb-2 text-[11px] text-muted-foreground">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>{isAr ? "ليس بديلاً عن طبيب. للطوارئ اتصل بالإسعاف. لا نشارك أرقام أطباء شخصية لأسباب الخصوصية." : "Not a substitute for a doctor. For emergencies, call EMS. We don't share private doctor phone numbers for privacy reasons."}</span>
        </div>
        <div className="flex gap-2">
          {supportedSTT && (
            <Button
              type="button"
              variant={listening ? "default" : "outline"}
              size="icon"
              onClick={() => (listening ? stop() : start())}
              className={listening ? "bg-emergency text-emergency-foreground animate-pulse" : ""}
              title={isAr ? "تحدّث بدلاً من الكتابة" : "Speak instead of typing"}
            >
              {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                 placeholder={listening ? (isAr ? "أنا أستمع..." : "Listening...") : placeholder} className="flex-1 h-11 rounded-lg border border-input bg-background px-3 text-sm" />
          <Button onClick={send} disabled={loading || !input.trim()} className={isP ? "bg-accent text-accent-foreground" : "bg-gradient-primary"}>
            <Send className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}
