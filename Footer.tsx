import { Heart, AlertCircle, ExternalLink, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  return (
    <footer className="mt-20 border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-bold mb-2">
            <Heart className="h-5 w-5 text-primary" fill="currentColor" />
            {t.appName}
          </div>
          <p className="text-sm text-muted-foreground">{t.tagline}</p>
        </div>
        <div className="md:col-span-2 rounded-xl border border-warning/30 bg-warning/10 p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-warning-foreground mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-sm mb-1">{t.home.disclaimerTitle}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.home.disclaimer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured WHO partner band */}
      <div className="border-t border-border/60 bg-primary-soft/40">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-soft">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm">
                {isAr ? "مدعوم بمصادر منظمة الصحة العالمية" : "Backed by World Health Organization sources"}
              </div>
              <p className="text-xs text-muted-foreground">
                {isAr
                  ? "كل المعلومات الطبية مرجعها WHO و ICD-11 و MedlinePlus."
                  : "All medical content is sourced from WHO, ICD-11 and MedlinePlus."}
              </p>
            </div>
          </div>
          <a
            href="https://www.who.int"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-bold hover:opacity-90 transition shadow-soft"
          >
            {isAr ? "زيارة WHO" : "Visit WHO"} <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-border/60 px-4 py-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
          {isAr ? "منظمة الصحة العالمية" : "World Health Organization"} <ExternalLink className="h-3 w-3" />
        </a>
        <a href="https://icd.who.int/en" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
          ICD-11 <ExternalLink className="h-3 w-3" />
        </a>
        <a href="https://www.orpha.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
          Orphanet <ExternalLink className="h-3 w-3" />
        </a>
        <a href="https://medlineplus.gov" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
          MedlinePlus <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t.appName}
      </div>
    </footer>
  );
}
