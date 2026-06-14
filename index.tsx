import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Stethoscope,
  Siren,
  HeartPulse,
  Brain,
  Users,
  Search,
  PhoneCall,
  MessageCircle,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Activity,
  Hand,
  Pill,
  FlaskConical,
  Mic,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t, lang } = useI18n();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowLeft;

  const sections = [
    { to: "/diseases", icon: Stethoscope, title: t.nav.diseases, desc: t.sections.diseasesDesc, color: "text-primary", bg: "bg-primary-soft" },
    { to: "/emergency", icon: Siren, title: t.nav.emergency, desc: t.sections.emergencyDesc, color: "text-emergency", bg: "bg-emergency/10" },
    { to: "/first-aid", icon: HeartPulse, title: t.nav.firstAid, desc: t.sections.firstAidDesc, color: "text-success", bg: "bg-success/10" },
    { to: "/mental-health", icon: Brain, title: t.nav.mental, desc: t.sections.mentalDesc, color: "text-accent", bg: "bg-accent/10" },
    { to: "/parents", icon: Users, title: t.nav.parents, desc: t.sections.parentsDesc, color: "text-primary", bg: "bg-primary-soft" },
    { to: "/symptom-checker", icon: Search, title: t.nav.symptoms, desc: t.sections.symptomsDesc, color: "text-warning-foreground", bg: "bg-warning/20" },
    { to: "/doctors", icon: PhoneCall, title: t.nav.doctors, desc: t.sections.doctorsDesc, color: "text-emergency", bg: "bg-emergency/10" },
    { to: "/chat", icon: MessageCircle, title: t.nav.chat, desc: t.sections.chatDesc, color: "text-primary", bg: "bg-primary-soft" },
    { to: "/psych-chat", icon: Sparkles, title: t.nav.psychChat, desc: t.sections.psychDesc, color: "text-accent", bg: "bg-accent/10" },
    { to: "/sign-language", icon: Hand, title: lang === "ar" ? "لغة الإشارة" : "Sign Language", desc: lang === "ar" ? "قاموس مصور للإشارات الطبية" : "Medical sign-language dictionary", color: "text-primary", bg: "bg-primary-soft" },
    { to: "/reminders", icon: Pill, title: lang === "ar" ? "منبّه الأدوية" : "Medication Reminders", desc: lang === "ar" ? "اضبط مواعيد جرعاتك واحصل على تنبيهات" : "Schedule doses and get notifications", color: "text-success", bg: "bg-success/10" },
    { to: "/assistant", icon: Sparkles, title: lang === "ar" ? "مساعد ذكي عام" : "General AI Assistant", desc: lang === "ar" ? "اسأل عن أي حاجة — مثل ChatGPT" : "Ask anything — like ChatGPT", color: "text-primary", bg: "bg-primary-soft" },
    { to: "/therapists", icon: Brain, title: lang === "ar" ? "معالجون نفسيون" : "Therapists", desc: lang === "ar" ? "أرقام دعم رسمية ومنصات حجز موثوقة" : "Official hotlines & trusted booking", color: "text-accent", bg: "bg-accent/10" },
    { to: "/research", icon: FlaskConical, title: lang === "ar" ? "مراكز البحوث" : "Research Centers", desc: lang === "ar" ? "المركز القومي، 57357، مجدي يعقوب وكيف تُحوَّل" : "NRC, 57357, Magdi Yacoub & how to refer", color: "text-primary", bg: "bg-primary-soft" },
    { to: "/voice-chat", icon: Mic, title: lang === "ar" ? "شات صوتي" : "Voice Chat", desc: lang === "ar" ? "تكلّم واحصل على رد صوتي بنفس لغتك" : "Speak and get a voice reply in your language", color: "text-emergency", bg: "bg-emergency/10" },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_20%,oklch(0.62_0.12_215/0.15),transparent_50%),radial-gradient(circle_at_80%_80%,oklch(0.32_0.08_240/0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 border border-border text-xs font-semibold text-primary backdrop-blur shadow-soft">
            <Sparkles className="h-3.5 w-3.5" />
            {t.home.heroBadge}
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
            {t.home.heroTitle}
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.home.heroDesc}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-elevated hover:opacity-95">
              <Link to="/diseases">
                {t.cta.explore} <Arrow className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-emergency/40 text-emergency hover:bg-emergency/10 hover:text-emergency">
              <Link to="/emergency">
                <Siren className="me-2 h-4 w-4" /> {t.cta.emergency}
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/chat">
                <MessageCircle className="me-2 h-4 w-4" /> {t.cta.askAI}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { n: "30+", l: t.home.stat1 },
              { n: "20+", l: t.home.stat2 },
              { n: "AR/EN", l: t.home.stat3 },
              { n: "24/7", l: t.home.stat4 },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl bg-card/70 backdrop-blur border border-border/50 p-4 shadow-soft">
                <div className="text-2xl md:text-3xl font-bold text-primary">{s.n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold mb-2">
            <Activity className="h-3.5 w-3.5" /> {t.home.sectionsDesc}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold">{t.home.sectionsTitle}</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${s.bg} ${s.color} mb-4 group-hover:scale-110 transition-transform`}>
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-4 inline-flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {t.cta.learnMore} <Arrow className="ms-1 h-3 w-3 rtl:rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, t: lang === "ar" ? "مصادر موثوقة" : "Trusted sources", d: lang === "ar" ? "ICD-11, Orphanet, WHO" : "ICD-11, Orphanet, WHO" },
            { icon: Sparkles, t: lang === "ar" ? "ذكاء اصطناعي آمن" : "Safe AI", d: lang === "ar" ? "تنبيهات سلامة في كل رد" : "Safety prompts on every reply" },
            { icon: Siren, t: lang === "ar" ? "أرقام طوارئ رسمية" : "Official emergency numbers", d: lang === "ar" ? "+35 دولة" : "35+ countries" },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{f.t}</div>
                <div className="text-sm text-muted-foreground">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
