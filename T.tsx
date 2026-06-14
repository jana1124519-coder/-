import { useEffect, useState } from "react";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { getCached, translateText } from "@/lib/translate";

// Source lang for the content stored in diseases/medications libs.
// Most data is bilingual ar/en; we translate from the active content lang
// (the closest of ar/en) into the user's UI lang.

interface Props {
  children: string;
  /** Source lang of the text. Defaults to active content lang (ar or en). */
  from?: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

export function T({ children, from, as: Tag = "span", className }: Props) {
  const { lang } = useI18n();
  const source = from ?? contentLangFor(lang);
  const skip = !children || lang === "ar" || lang === "en" || source === lang;
  const [text, setText] = useState<string>(() =>
    skip ? children : (getCached(children, source, lang) ?? children),
  );

  useEffect(() => {
    if (skip) {
      setText(children);
      return;
    }
    const cached = getCached(children, source, lang);
    if (cached) {
      setText(cached);
      return;
    }
    let alive = true;
    translateText(children, lang, source).then((t) => {
      if (alive) setText(t);
    });
    return () => {
      alive = false;
    };
  }, [children, source, lang, skip]);

  return <Tag className={className}>{text}</Tag>;
}
