import { useEffect, useState, type ReactNode } from "react";
import { I18nContext, SUPPORTED_LANGS, translations, type Lang } from "@/lib/i18n";
import { toast } from "sonner";

const STORAGE_KEY = "sehetak-lang";
const RTL_LANGS: Lang[] = ["ar"];

// Map navigator lang codes (including region) to our supported langs.
function detectLang(): Lang | null {
  if (typeof navigator === "undefined") return null;
  const langs = (navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || "en"]) as string[];
  const map: Record<string, Lang> = {
    ar: "ar", en: "en", fr: "fr", de: "de", it: "it", es: "es",
    ja: "ja", zh: "zh", ko: "ko", hi: "hi", ru: "ru", tr: "tr",
    el: "el", tl: "fil", fil: "fil",
    "pt": "es", // Portuguese → fall back to Spanish (closest supported)
  };
  for (const raw of langs) {
    const norm = raw.toLowerCase();
    const base = norm.split(/[-_]/)[0];
    if (map[norm]) return map[norm];
    if (map[base]) return map[base];
    if (SUPPORTED_LANGS.some((l) => l.code === base)) return base as Lang;
  }
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && SUPPORTED_LANGS.some((l) => l.code === stored)) {
      setLangState(stored);
      return;
    }
    const detected = detectLang();
    if (detected && detected !== "ar") {
      setLangState(detected);
      const info = SUPPORTED_LANGS.find((l) => l.code === detected);
      // notify on first visit only
      setTimeout(() => {
        toast.success(
          `${info?.flag ?? ""} ${info?.native ?? detected}`,
          { description: "Auto-detected from your device.", duration: 4000 },
        );
      }, 800);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}
