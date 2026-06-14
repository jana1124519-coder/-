// Browser TTS helper with a same-origin fallback route for languages
// where no local SpeechSynthesisVoice is installed (e.g. Arabic on Chrome/Windows).

export type SpeakHandle = { stop: () => void };

const FALLBACK_FIRST_LANGS = new Set(["ar"]);
let activeUnlockAudio: HTMLAudioElement | null = null;

export function canSpeakText(): boolean {
  if (typeof window === "undefined") return false;
  return "Audio" in window || "speechSynthesis" in window;
}

function pickVoice(bcp: string): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;
  const target = bcp.toLowerCase();
  const prefix = target.split("-")[0];

  const NAME_HINT: Record<string, string[]> = {
    ar: ["arabic", "عرب", "saudi", "gulf", "maged", "majed", "tarik", "google"],
    en: ["english", "natural", "neural", "enhanced", "google", "microsoft"],
    fr: ["french", "français", "natural", "neural"],
    de: ["german", "deutsch", "natural", "neural"],
    es: ["spanish", "español", "natural", "neural"],
    it: ["italian", "italiano", "natural", "neural"],
    hi: ["hindi", "हिन"],
    fil: ["filipino", "tagalog"],
    el: ["greek", "ελλ"],
  };

  const hints = NAME_HINT[prefix] ?? [prefix];

  const scored = voices
    .map((voice) => {
      const lang = (voice.lang || "").toLowerCase();
      const name = (voice.name || "").toLowerCase();
      let score = 0;
      if (lang === target) score += 100;
      else if (lang.startsWith(`${target}-`)) score += 90;
      else if (lang.startsWith(`${prefix}-`)) score += 70;
      else if (lang === prefix) score += 65;
      if (voice.default) score += 4;
      if (/(natural|neural|premium|enhanced|wavenet|google|microsoft)/i.test(name)) score += 6;
      if (hints.some((hint) => name.includes(hint))) score += 8;
      return { voice, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.score > 0 ? scored[0].voice : null;
}

export function hasLocalVoice(bcp: string): boolean {
  return !!pickVoice(bcp);
}

export function ensureVoicesLoaded(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    const synth = window.speechSynthesis;
    if (synth.getVoices().length > 0) {
      resolve();
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    synth.onvoiceschanged = finish;
    setTimeout(finish, 1000);
  });
}

export function chunkText(text: string, max = 180): string[] {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return [];
  if (t.length <= max) return [t];
  const parts: string[] = [];
  const sentences = t.split(/(?<=[.!?؟。！？])\s+|(?<=[،,;:])\s+/);
  let buf = "";
  for (const s of sentences) {
    if ((buf + " " + s).trim().length > max && buf) {
      parts.push(buf.trim());
      buf = s;
    } else buf = (buf ? buf + " " : "") + s;
  }
  if (buf.trim()) parts.push(buf.trim());
  const out: string[] = [];
  for (const p of parts) {
    if (p.length <= max) {
      out.push(p);
      continue;
    }
    for (let i = 0; i < p.length; i += max) out.push(p.slice(i, i + max));
  }
  return out;
}

export async function primeAudioPlayback(): Promise<void> {
  if (typeof window === "undefined" || !("Audio" in window)) return;
  try {
    if (!activeUnlockAudio) {
      activeUnlockAudio = new Audio(
        "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA" +
          "gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA"
      );
      activeUnlockAudio.preload = "auto";
      activeUnlockAudio.volume = 0.01;
    }
    activeUnlockAudio.currentTime = 0;
    await activeUnlockAudio.play().catch(() => undefined);
    activeUnlockAudio.pause();
  } catch {
    /* noop */
  }
}

function fallbackTtsUrl(text: string, lang: string) {
  const params = new URLSearchParams({ q: text, lang });
  return `/api/public/tts?${params.toString()}`;
}

// Speak `text` in `bcp` language. Uses Web Speech if a matching voice exists,
// otherwise falls back to the app's own TTS proxy route.
export function speakText(text: string, bcp: string, onEnd?: () => void): SpeakHandle {
  const clean = (text || "").trim();
  if (!clean) {
    onEnd?.();
    return { stop: () => {} };
  }
  if (typeof window === "undefined") {
    onEnd?.();
    return { stop: () => {} };
  }
  const lang2 = bcp.toLowerCase().split("-")[0];
  const chunks = chunkText(clean, 180);
  let stopped = false;
  let currentAudio: HTMLAudioElement | null = null;
  let currentUtterance: SpeechSynthesisUtterance | null = null;

  const preferredVoice = pickVoice(bcp);
  const useNative = !!preferredVoice && !FALLBACK_FIRST_LANGS.has(lang2);

  const playNative = () => {
    const synth = window.speechSynthesis;
    const v = preferredVoice;
    let i = 0;
    const next = () => {
      if (stopped || i >= chunks.length) {
        if (!stopped) onEnd?.();
        return;
      }
      const u = new SpeechSynthesisUtterance(chunks[i++]);
      currentUtterance = u;
      u.lang = bcp;
      if (v) u.voice = v;
      u.rate = 0.9;
      u.pitch = 1;
      u.onend = next;
      u.onerror = next;
      synth.speak(u);
    };
    next();
  };

  const playFallback = () => {
    let i = 0;
    const next = () => {
      if (stopped || i >= chunks.length) {
        if (!stopped) onEnd?.();
        return;
      }
      const chunk = chunks[i++];
      const url = fallbackTtsUrl(chunk, lang2);
      const audio = new Audio(url);
      audio.preload = "auto";
      audio.playbackRate = lang2 === "ar" ? 0.92 : 0.96;
      currentAudio = audio;
      audio.onended = next;
      audio.onerror = () => {
        // If the fallback route fails, attempt native synth for the same chunk.
        try {
          const u = new SpeechSynthesisUtterance(chunk);
          currentUtterance = u;
          u.lang = bcp;
          if (preferredVoice) u.voice = preferredVoice;
          u.rate = 0.9;
          u.onend = next;
          u.onerror = next;
          window.speechSynthesis.speak(u);
        } catch {
          next();
        }
      };
      audio.play().catch(() => next());
    };
    next();
  };

  if (useNative) playNative();
  else playFallback();

  return {
    stop: () => {
      stopped = true;
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* noop */
      }
      if (currentAudio) {
        try {
          currentAudio.pause();
        } catch {
          /* noop */
        }
        currentAudio = null;
      }
      currentUtterance = null;
    },
  };
}
