import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Loader2, Volume2, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { useVoice } from "@/hooks/useVoice";
import { bcpFor } from "@/lib/voiceLang";
import { chatWithAI } from "@/lib/aiChat";
import { speakText, canSpeakText, type SpeakHandle } from "@/lib/tts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/voice-chat")({
  head: () => ({
    meta: [
      { title: "شات صوتي — صحّتك" },
      { name: "description", content: "تحدث صوتياً مع المساعد الذكي وستحصل على رد صوتي بنفس لغتك." },
    ],
  }),
  component: VoiceChat,
});

type Turn = { role: "user" | "assistant"; text: string };
const LS_KEY = "voice-chat-memory";

function VoiceChat() {
  const { lang } = useI18n();
  const { user } = useAuth();
  const ar = lang === "ar";
  const voice = useVoice(lang);
  const bcp = bcpFor(lang);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [thinking, setThinking] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const lastSent = useRef("");
  const speakHandle = useRef<SpeakHandle | null>(null);

  const speak = (text: string) => {
    if (!canSpeakText()) return;
    speakHandle.current?.stop();
    setSpeaking(true);
    speakHandle.current = speakText(text.slice(0, 4500), bcp, () => {
      speakHandle.current = null;
      setSpeaking(false);
    });
  };

  const stopSpeak = () => {
    speakHandle.current?.stop();
    speakHandle.current = null;
    setSpeaking(false);
  };

  useEffect(() => () => stopSpeak(), []);

  // Load memory: from DB if signed in, otherwise from localStorage
  useEffect(() => {
    (async () => {
      if (user) {
        const { data } = await supabase
          .from("voice_memory")
          .select("role, content")
          .eq("channel", "voice-chat")
          .order("created_at", { ascending: true })
          .limit(50);
        if (data && data.length) {
          setTurns(data.map((r) => ({ role: r.role as "user" | "assistant", text: r.content })));
          return;
        }
      }
      const raw = localStorage.getItem(LS_KEY);
      if (raw) try { setTurns(JSON.parse(raw)); } catch { /* */ }
    })();
  }, [user]);

  // Persist
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(turns.slice(-50)));
  }, [turns]);

  const persistTurn = async (t: Turn) => {
    if (!user) return;
    await supabase.from("voice_memory").insert([{
      user_id: user.id, channel: "voice-chat", role: t.role, content: t.text, lang,
    }]);
  };

  const clearMemory = async () => {
    setTurns([]);
    localStorage.removeItem(LS_KEY);
    if (user) await supabase.from("voice_memory").delete().eq("channel", "voice-chat").eq("user_id", user.id);
    toast.success(ar ? "تم مسح الذاكرة" : "Memory cleared");
  };

  useEffect(() => {
    const text = voice.transcript.trim();
    if (voice.listening) return;
    if (!text || text === lastSent.current) return;
    lastSent.current = text;
    const userTurn: Turn = { role: "user", text };
    const newTurns: Turn[] = [...turns, userTurn];
    setTurns(newTurns);
    void persistTurn(userTurn);
    (async () => {
      try {
        setThinking(true);
        const res = await chatWithAI({
          data: {
            messages: newTurns.map((tn) => ({ role: tn.role, content: tn.text })),
            mode: "general",
            lang: contentLangFor(lang),
            uiLang: lang,
          },
        });
        const aiTurn: Turn = { role: "assistant", text: res.reply };
        setTurns((p) => [...p, aiTurn]);
        void persistTurn(aiTurn);
        speak(res.reply);
      } catch {
        toast.error(ar ? "تعذّر الرد" : "Reply failed");
      } finally {
        setThinking(false);
        voice.setTranscript("");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voice.listening, voice.transcript]);

  const toggle = () => {
    if (speaking) stopSpeak();
    if (voice.listening) voice.stop();
    else voice.start();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-2xl w-full px-4 py-10 flex-1 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          {ar ? "شات صوتي مباشر" : "Live Voice Chat"}
        </h1>
        <p className="text-center text-muted-foreground mb-4 text-sm">
          {ar
            ? "اضغط الميكروفون وتحدّث — سأرد عليك صوتياً بنفس لغتك. أحفظ المحادثات تلقائياً."
            : "Press the mic and talk — I'll reply by voice. Conversations are remembered."}
        </p>
        {turns.length > 0 && (
          <div className="flex justify-center mb-4">
            <Button variant="ghost" size="sm" onClick={clearMemory} className="text-xs">
              <Trash2 className="me-2 h-3 w-3" />{ar ? "مسح الذاكرة" : "Clear memory"}
            </Button>
          </div>
        )}

        <div className="flex flex-col items-center gap-4 mb-8">
          <button
            onClick={toggle}
            disabled={!voice.supportedSTT || thinking}
            className={`h-32 w-32 rounded-full shadow-elevated flex items-center justify-center transition-all text-primary-foreground ${
              voice.listening
                ? "bg-emergency animate-pulse scale-110"
                : thinking
                  ? "bg-accent"
                  : speaking
                    ? "bg-primary"
                    : "bg-gradient-primary hover:scale-105"
            }`}
            aria-label={ar ? "تحدّث" : "Speak"}
          >
            {thinking ? (
              <Loader2 className="h-12 w-12 animate-spin" />
            ) : speaking ? (
              <Volume2 className="h-12 w-12 animate-pulse" />
            ) : voice.listening ? (
              <MicOff className="h-12 w-12" />
            ) : (
              <Mic className="h-12 w-12" />
            )}
          </button>
          <div className="text-sm font-medium text-muted-foreground min-h-5">
            {voice.listening
              ? ar
                ? "أستمع إليك..."
                : "Listening..."
              : thinking
                ? ar
                  ? "أفكر..."
                  : "Thinking..."
                : speaking
                  ? ar
                    ? "أتحدث..."
                    : "Speaking..."
                  : ar
                    ? "اضغط للتحدث"
                    : "Tap to speak"}
          </div>
          {voice.transcript && voice.listening && (
            <div className="text-sm text-foreground italic max-w-md text-center">
              "{voice.transcript}"
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto max-h-[40vh] pe-2">
          {turns
            .slice()
            .reverse()
            .map((tn, i) => (
              <div
                key={i}
                className={`rounded-2xl p-3 text-sm ${tn.role === "user" ? "bg-primary-soft" : "bg-card border border-border"}`}
              >
                <div className="text-xs text-muted-foreground mb-1">
                  {tn.role === "user" ? (ar ? "أنت" : "You") : ar ? "المساعد" : "Assistant"}
                </div>
                <div className="whitespace-pre-wrap">{tn.text}</div>
                {tn.role === "assistant" && (
                  <button
                    onClick={() => speak(tn.text)}
                    className="mt-2 text-xs text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    <Volume2 className="h-3 w-3" /> {ar ? "إعادة الاستماع" : "Replay"}
                  </button>
                )}
              </div>
            ))}
        </div>

        {!voice.supportedSTT && (
          <p className="text-center text-xs text-emergency mt-4">
            {ar
              ? "متصفّحك لا يدعم التعرف على الصوت — جرّب Chrome."
              : "Your browser doesn't support speech recognition — try Chrome."}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
