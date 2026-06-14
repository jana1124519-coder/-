import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import { Volume2, VolumeX, Mic, MicOff, Loader2, Play, Square } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useVoice } from "@/hooks/useVoice";
import { bcpFor } from "@/lib/voiceLang";
import { speakText, ensureVoicesLoaded, canSpeakText, primeAudioPlayback, type SpeakHandle } from "@/lib/tts";
import { toast } from "sonner";
import { matchRoute, detectAction } from "@/lib/voiceNav";

const READ_SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,li,button,a,label,blockquote,figcaption,summary,td,th,dt,dd,span,div";
const HL_CLASS = "speaking-now-hl";

export function ReadAloud() {
  const { lang } = useI18n();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [reading, setReading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const queue = useRef<HTMLElement[]>([]);
  const idx = useRef(0);
  const readingRef = useRef(false);
  const currentEl = useRef<HTMLElement | null>(null);
  const currentSpeak = useRef<SpeakHandle | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  const bcp = bcpFor(lang);
  const isAr = lang === "ar";
  const supportedTTS = mounted && canSpeakText();
  const voice = useVoice(lang);

  // Warm up the browser voices list (Chrome lazy-loads voices).
  useEffect(() => {
    if (!supportedTTS) return;
    void ensureVoicesLoaded();
  }, [supportedTTS]);

  const clearHL = () => {
    if (currentEl.current) currentEl.current.classList.remove(HL_CLASS);
    currentEl.current = null;
  };

  const stopAll = useCallback(() => {
    if (currentSpeak.current) {
      currentSpeak.current.stop();
      currentSpeak.current = null;
    }
    if (supportedTTS) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* noop */
      }
    }
    queue.current = [];
    idx.current = 0;
    readingRef.current = false;
    clearHL();
    setReading(false);
  }, [supportedTTS]);

  const speakOne = useCallback(
    (el: HTMLElement, onDone: () => void) => {
      const text = (el.innerText || el.textContent || "").trim();
      if (!text || text.length < 2) {
        onDone();
        return;
      }
      clearHL();
      el.classList.add(HL_CLASS);
      currentEl.current = el;
      try {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch {
        /* noop */
      }
      currentSpeak.current = speakText(text, bcp, () => {
        currentSpeak.current = null;
        onDone();
      });
    },
    [bcp],
  );

  const playNext = useCallback(() => {
    if (idx.current >= queue.current.length) {
      stopAll();
      return;
    }
    const el = queue.current[idx.current++];
    if (!el || !el.isConnected) {
      playNext();
      return;
    }
    speakOne(el, () => {
      if (readingRef.current && queue.current.length > 0) playNext();
    });
  }, [speakOne, stopAll]);

  const startReading = useCallback(async () => {
    if (!supportedTTS) return;
    await primeAudioPlayback();
    currentSpeak.current?.stop();
    currentSpeak.current = null;
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* noop */
    }
    const root = document.querySelector("main") ?? document.body;
    // Collect only LEAF elements (no element descendants matching the selector) with real text.
    const all = Array.from(root.querySelectorAll<HTMLElement>(READ_SELECTOR));
    const seenText = new Set<string>();
    const els = all.filter((el) => {
      if (el.closest("[data-no-read]")) return false;
      // skip if any descendant also matches → only read leaves
      if (el.querySelector(READ_SELECTOR)) return false;
      const txt = (el.innerText || "").replace(/\s+/g, " ").trim();
      if (txt.length < 2) return false;
      // skip pure icon/aria-hidden or invisible
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return false;
      // dedupe exact duplicates (icons / sr-only labels)
      const key = txt.slice(0, 120);
      if (seenText.has(key)) return false;
      seenText.add(key);
      return true;
    });
    if (els.length === 0) return;
    queue.current = els;
    idx.current = 0;
    readingRef.current = true;
    setReading(true);
    playNext();
  }, [supportedTTS, playNext]);

  useEffect(() => {
    readingRef.current = reading;
  }, [reading]);

  // Mic press while reading → pause speech, listen
  const handleMic = () => {
    if (voice.listening) {
      voice.stop();
      return;
    }
    if (reading && supportedTTS) {
      currentSpeak.current?.stop();
      currentSpeak.current = null;
      try {
        window.speechSynthesis.pause();
      } catch {
        /* noop */
      }
    }
    voice.start();
  };

  // When mic finishes, handle command
  const lastTranscript = useRef("");
  useEffect(() => {
    const text = voice.transcript.trim();
    if (voice.listening) return;
    if (!text || text === lastTranscript.current) return;
    lastTranscript.current = text;
    (async () => {
      setThinking(true);
      try {
        // 1) action commands (stop/back/read/menu/replay)
        const action = detectAction(text);
        if (action === "stop") { stopAll(); return; }
        if (action === "back") { stopAll(); window.history.back(); return; }
        if (action === "read") { stopAll(); void startReading(); return; }
        if (action === "menu") {
          stopAll();
          const btn = document.querySelector<HTMLButtonElement>('button[aria-label="menu"]');
          btn?.click();
          return;
        }

        // 2) flexible route matching via multilingual synonym map
        const path = matchRoute(text);
        if (path) {
          stopAll();
          await router.navigate({ to: path as never });
          speakText(text.slice(0, 80), bcp);
          return;
        }

        // 3) fallback: fuzzy match against on-page links
        const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"));
        const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
        const t = norm(text);
        const words = t.split(" ").filter((w) => w.length >= 2);
        let best: { el: HTMLAnchorElement; score: number } | null = null;
        for (const a of links) {
          const label = norm(a.innerText || a.textContent || "");
          if (!label) continue;
          let score = 0;
          for (const w of words) if (label.includes(w)) score += w.length;
          if (label.includes(t)) score += 10;
          if (score > 0 && (!best || score > best.score)) best = { el: a, score };
        }
        if (best && best.score >= 3) {
          const href = best.el.getAttribute("href") || "";
          if (href.startsWith("/")) {
            stopAll();
            await router.navigate({ to: href as never });
            speakText(best.el.innerText.trim().slice(0, 120), bcp);
          } else if (href) {
            window.open(href, "_blank");
          }
        } else if (supportedTTS) {
          speakText((isAr ? "لم أفهم: " : "Didn't catch: ") + text, bcp);
        }
      } catch {
        toast.error(isAr ? "تعذّر تنفيذ الأمر" : "Command failed");
      } finally {
        setThinking(false);
        voice.setTranscript("");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voice.listening, voice.transcript]);

  // Cleanup on route change
  useEffect(() => {
    const unsub = router.subscribe("onBeforeNavigate", () => stopAll());
    return () => unsub();
  }, [router, stopAll]);

  if (!mounted || !supportedTTS) return null;

  return (
    <div data-no-read className="fixed bottom-4 start-4 z-40 flex flex-col gap-2">
      {/* Read page / Stop */}
      {!reading ? (
        <button
          onClick={startReading}
          className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:opacity-90"
          aria-label={isAr ? "اقرأ الصفحة" : "Read page"}
          title={isAr ? "اقرأ الصفحة كلها" : "Read the whole page"}
        >
          <Play className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={stopAll}
          className="h-12 w-12 rounded-full bg-emergency text-emergency-foreground shadow-elevated flex items-center justify-center animate-pulse"
          aria-label={isAr ? "إيقاف" : "Stop"}
          title={isAr ? "إيقاف القراءة" : "Stop reading"}
        >
          <Square className="h-5 w-5" />
        </button>
      )}

      {/* Mic for voice commands */}
      {voice.supportedSTT && (
        <button
          onClick={handleMic}
          className={`h-12 w-12 rounded-full shadow-elevated flex items-center justify-center transition ${
            voice.listening
              ? "bg-emergency text-emergency-foreground animate-pulse"
              : thinking
                ? "bg-accent text-accent-foreground"
                : "bg-card border border-border hover:bg-muted"
          }`}
          aria-label={isAr ? "أمر صوتي" : "Voice command"}
          title={isAr ? "قل اسم قسم لأنقلك له" : "Say a section name to navigate"}
        >
          {thinking ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : voice.listening ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </button>
      )}

      {reading && (
        <div className="text-[10px] text-center text-muted-foreground bg-card/80 rounded-md px-1 py-0.5 border border-border">
          <Volume2 className="inline h-3 w-3" />
        </div>
      )}
      {!reading && voice.listening && (
        <div className="text-[10px] text-center text-emergency bg-card/80 rounded-md px-1 py-0.5 border border-border">
          <VolumeX className="inline h-3 w-3" />
        </div>
      )}
    </div>
  );
}
