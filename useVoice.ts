// Web Speech API hook — speech-to-text (mic) + text-to-speech (speak).
// Pure browser, free, no API key.
import { useEffect, useRef, useState, useCallback } from "react";

type SR = typeof window extends { SpeechRecognition: infer T } ? T : unknown;

interface SpeechRecognitionEventLike {
  results: { 0: { transcript: string }; isFinal: boolean }[] & {
    length: number;
    [i: number]: { 0: { transcript: string }; isFinal: boolean };
  };
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

function getSR(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const BCP47: Record<string, string> = {
  ar: "ar-SA", en: "en-US", fr: "fr-FR", de: "de-DE", it: "it-IT", es: "es-ES",
  ja: "ja-JP", zh: "zh-CN", ko: "ko-KR", hi: "hi-IN", fil: "fil-PH",
  el: "el-GR", ru: "ru-RU", tr: "tr-TR",
};

export function useVoice(lang: string) {
  const bcp = BCP47[lang] ?? lang;
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const supportedSTT = typeof window !== "undefined" && !!getSR();
  const supportedTTS = typeof window !== "undefined" && "speechSynthesis" in window;

  const start = useCallback(() => {
    const Ctor = getSR();
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = bcp;
    r.continuous = false;
    r.interimResults = true;
    let finalText = "";
    r.onresult = (e) => {
      let interim = "";
      for (let i = 0; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText += res[0].transcript;
        else interim += res[0].transcript;
      }
      setTranscript(finalText + interim);
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    recRef.current = r;
    setTranscript("");
    setListening(true);
    try { r.start(); } catch { setListening(false); }
  }, [bcp]);

  const stop = useCallback(() => {
    try { recRef.current?.stop(); } catch { /* noop */ }
    setListening(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (!supportedTTS || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = bcp;
    u.rate = 1; u.pitch = 1;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }, [bcp, supportedTTS]);

  const stopSpeak = useCallback(() => {
    if (!supportedTTS) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supportedTTS]);

  useEffect(() => () => { stop(); stopSpeak(); }, [stop, stopSpeak]);

  return { listening, speaking, transcript, supportedSTT, supportedTTS, start, stop, speak, stopSpeak, setTranscript };
}
