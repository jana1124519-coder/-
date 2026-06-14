import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ExternalLink, Brain, Globe, MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { THERAPISTS, MENTAL_HOTLINES, ONLINE_BOOKING } from "@/lib/therapists";

export const Route = createFileRoute("/therapists")({
  head: () => ({ meta: [
    { title: "معالجين نفسيين وخطوط الدعم — صحّتك" },
    { name: "description", content: "خطوط الدعم النفسي الرسمية ومنصات حجز معالج نفسي معتمد بالعربية." },
  ]}),
  component: TherapistsPage,
});

function TherapistsPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center"><Brain className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{isAr ? "معالجون نفسيون ودعم" : "Therapists & Support"}</h1>
        </div>
        <p className="text-muted-foreground mb-2">{isAr ? "خطوط دعم رسمية مجانية + منصات حجز معتمدة." : "Official free crisis lines + verified booking platforms."}</p>
        <p className="text-xs text-muted-foreground mb-8">
          {isAr ? "لا نشارك أرقام أطباء شخصية — استخدم المنصات الموثوقة أدناه." : "We don't share private numbers — use the trusted platforms below."}
        </p>

        <section className="mb-10">
          <h2 className="font-bold text-xl mb-3 flex items-center gap-2"><Phone className="h-5 w-5 text-emergency" /> {isAr ? "خطوط الأزمات النفسية (مجانية ٢٤/٧)" : "Mental crisis hotlines (free 24/7)"}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {MENTAL_HOTLINES.map((h) => (
              <a key={h.country} href={`tel:${h.phone}`} className="rounded-2xl border border-border bg-card p-4 hover:border-emergency/50 hover:shadow-elevated transition" data-speak={`${isAr ? h.countryAr : h.country} — ${(isAr ? h.name.ar : h.name.en)} — ${h.phone}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold">{isAr ? h.countryAr : h.country}</div>
                  <span className="text-[10px] rounded-full bg-success/15 text-success px-2 py-0.5 font-bold">{isAr ? h.hours.ar : h.hours.en}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{isAr ? h.name.ar : h.name.en}</div>
                <div className="mt-2 inline-flex items-center gap-2 text-emergency font-bold text-lg">
                  <Phone className="h-4 w-4" /> {h.phone}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-bold text-xl mb-3 flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> {isAr ? "منصات حجز معالج معتمد" : "Online booking platforms"}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {ONLINE_BOOKING.map((b) => (
              <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-border bg-card p-4 hover:border-primary/50 hover:shadow-elevated transition" data-speak={`${b.name} — ${isAr ? b.desc.ar : b.desc.en}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold">{b.name}</div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{isAr ? b.desc.ar : b.desc.en}</p>
              </a>
            ))}
          </div>
        </section>

        {THERAPISTS.length > 0 && (
          <section className="mb-10">
            <h2 className="font-bold text-xl mb-3">{isAr ? "أطباء/معالجون موصى بهم" : "Recommended therapists"}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {THERAPISTS.map((d) => (
                <div key={d.id} className="rounded-2xl border border-border bg-card p-4">
                  <div className="font-bold">{isAr ? d.name.ar : d.name.en}</div>
                  <div className="text-xs text-muted-foreground">{isAr ? d.specialty.ar : d.specialty.en} — {isAr ? d.city.ar : d.city.en} ({d.country})</div>
                  {d.phone && <a href={`tel:${d.phone}`} className="mt-2 inline-flex items-center gap-2 text-primary font-bold"><Phone className="h-4 w-4" />{d.phone}</a>}
                  {d.bookingUrl && <a href={d.bookingUrl} target="_blank" rel="noopener noreferrer" className="ms-3 inline-flex items-center gap-1 text-primary text-sm"><ExternalLink className="h-3 w-3" />{isAr ? "حجز" : "Book"}</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        <Link to="/psych-chat" className="inline-flex items-center gap-2 rounded-xl bg-accent text-accent-foreground px-4 py-2.5 font-semibold text-sm hover:opacity-90">
          <MessageCircle className="h-4 w-4" /> {isAr ? "تحدّث الآن مع المساعد النفسي" : "Talk to the mental support assistant"}
        </Link>
      </main>
      <Footer />
    </div>
  );
}
