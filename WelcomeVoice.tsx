import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { WELCOME_GREETING, bcpFor } from "@/lib/voiceLang";
import { speakText, ensureVoicesLoaded, type SpeakHandle } from "@/lib/tts";

const KEY = "sehetak.welcomeSpoken.v2";

export function WelcomeVoice() {
  const { lang } = useI18n();
  const tried = useRef(false);
  const handle = useRef<SpeakHandle | null>(null);

  useEffect(() => {
    if (tried.current) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;

    const text = WELCOME_GREETING[lang] ?? WELCOME_GREETING.en;
    const bcp = bcpFor(lang);

    const speak = async () => {
      try {
        await ensureVoicesLoaded();
        handle.current = speakText(text, bcp);
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* noop */
      }
    };

    tried.current = true;
    const t = setTimeout(speak, 600);
    const onGesture = () => {
      if (!sessionStorage.getItem(KEY)) speak();
    };
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      handle.current?.stop();
    };
  }, [lang]);

  return null;
}
