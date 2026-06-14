import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Menu, X, Languages, ChevronDown, LogIn, LogOut, Shield, User as UserIcon } from "lucide-react";
import { useI18n, SUPPORTED_LANGS, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/diseases", label: t.nav.diseases },
    { to: "/emergency", label: t.nav.emergency },
    { to: "/emergency-plan", label: lang === "ar" ? "خطة طوارئ" : "Emergency Plan" },
    { to: "/first-aid", label: t.nav.firstAid },
    { to: "/mental-health", label: t.nav.mental },
    { to: "/parents", label: t.nav.parents },
    { to: "/symptom-checker", label: t.nav.symptoms },
    { to: "/doctors", label: t.nav.doctors },
    { to: "/sign-language", label: lang === "ar" ? "لغة الإشارة" : "Sign Language" },
    { to: "/reminders", label: lang === "ar" ? "منبّه الأدوية" : "Reminders" },
    { to: "/assistant", label: lang === "ar" ? "مساعد عام" : "AI Assistant" },
    { to: "/therapists", label: lang === "ar" ? "معالجون نفسيون" : "Therapists" },
    { to: "/research", label: lang === "ar" ? "مراكز البحوث" : "Research Centers" },
    { to: "/calculators", label: lang === "ar" ? "حاسبات طبية" : "Calculators" },
    { to: "/medications", label: lang === "ar" ? "الأدوية" : "Medications" },
    { to: "/maps", label: lang === "ar" ? "خرائط طبية" : "Medical Maps" },
    { to: "/psych-tests", label: lang === "ar" ? "اختبارات نفسية" : "Psych Tests" },
    { to: "/voice-chat", label: lang === "ar" ? "شات صوتي" : "Voice Chat" },
    { to: "/forum", label: lang === "ar" ? "المجتمع" : "Community" },
  ] as const;

  const current = SUPPORTED_LANGS.find((l) => l.code === lang) ?? SUPPORTED_LANGS[0];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
            <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="text-foreground">{t.appName}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-primary-soft text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="relative" ref={langRef}>
            <Button variant="ghost" size="sm" onClick={() => setLangOpen((o) => !o)} className="gap-1">
              <Languages className="h-4 w-4" />
              <span className="text-xs font-semibold hidden sm:inline">{current.flag} {current.native}</span>
              <span className="text-xs font-semibold sm:hidden">{current.flag}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
            {langOpen && (
              <div className="absolute end-0 mt-1 w-48 max-h-80 overflow-y-auto rounded-xl border border-border bg-popover shadow-elevated p-1 z-50">
                {SUPPORTED_LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code as Lang); setLangOpen(false); }}
                    className={`w-full text-start px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      lang === l.code ? "bg-primary-soft text-primary font-semibold" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {user ? (
            <div className="relative" ref={userRef}>
              <Button variant="ghost" size="sm" onClick={() => setUserOpen((o) => !o)} className="gap-1">
                <UserIcon className="h-4 w-4" />
                <ChevronDown className="h-3 w-3" />
              </Button>
              {userOpen && (
                <div className="absolute end-0 mt-1 w-56 rounded-xl border border-border bg-popover shadow-elevated p-1 z-50">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    {isAdmin && <span className="text-[10px] inline-flex items-center gap-1 mt-1 text-primary font-bold"><Shield className="h-3 w-3" /> Admin</span>}
                  </div>
                  {isAdmin && (
                    <Link to="/admin/doctors" onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted">
                      <Shield className="h-4 w-4" /> {lang === "ar" ? "إدارة الأطباء" : "Manage Doctors"}
                    </Link>
                  )}
                  <button onClick={() => { void signOut(); setUserOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted text-start">
                    <LogOut className="h-4 w-4" /> {lang === "ar" ? "تسجيل خروج" : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="gap-1">
                <LogIn className="h-4 w-4" />
                <span className="text-xs font-semibold">{lang === "ar" ? "دخول" : "Sign in"}</span>
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active ? "bg-primary-soft text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
