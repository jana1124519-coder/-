import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Phone, ExternalLink, Building2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DoctorFinderChat } from "@/components/DoctorFinderChat";
import { Input } from "@/components/ui/input";
import { emergencyNumbers, REGIONS, type EmergencyContact } from "@/lib/emergencyNumbers";
import { medicalCouncils, BOOKING_PLATFORMS } from "@/lib/medicalCouncils";

export const Route = createFileRoute("/doctors")({
  head: () => ({ meta: [{ title: "أرقام الطوارئ والأطباء — صحّتك" }] }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<EmergencyContact["region"] | "all">("all");

  const isAr = lang === "ar";

  const list = useMemo(() => {
    const tx = q.trim().toLowerCase();
    return emergencyNumbers.filter((c) => {
      if (region !== "all" && c.region !== region) return false;
      if (!tx) return true;
      return c.country.toLowerCase().includes(tx) || c.countryAr.includes(q);
    });
  }, [q, region]);

  const councilsList = useMemo(() => {
    const tx = q.trim().toLowerCase();
    return medicalCouncils.filter((c) => {
      if (region !== "all" && c.region !== region) return false;
      if (!tx) return true;
      return c.country.toLowerCase().includes(tx) || c.countryAr.includes(q) || c.name.toLowerCase().includes(tx);
    });
  }, [q, region]);

  const bookingList = BOOKING_PLATFORMS.filter((b) => region === "all" || (b.regions as readonly string[]).includes(region));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-10 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.nav.doctors}</h1>
        <p className="text-muted-foreground mb-2">{t.sections.doctorsDesc}</p>
        <p className="text-xs text-muted-foreground mb-6">
          {isAr
            ? `أرقام طوارئ رسمية لـ ${emergencyNumbers.length} دولة + ${medicalCouncils.length} نقابة طبية رسمية + منصات حجز موثوقة. لا نشارك أرقام أطباء شخصية احتراماً للخصوصية.`
            : `Official emergency numbers for ${emergencyNumbers.length} countries + ${medicalCouncils.length} official medical councils + trusted booking platforms. We don't share private doctor numbers for privacy.`}
        </p>

        <div className="relative mb-4">
          <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={isAr ? "ابحث عن دولة..." : "Search country..."} className="ps-10 h-12" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setRegion("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${region === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"}`}
          >
            {isAr ? "الكل" : "All"} ({emergencyNumbers.length})
          </button>
          {REGIONS.map((r) => {
            const count = emergencyNumbers.filter((c) => c.region === r.id).length;
            return (
              <button
                key={r.id}
                onClick={() => setRegion(r.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${region === r.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"}`}
              >
                {isAr ? r.ar : r.en} ({count})
              </button>
            );
          })}
        </div>

        {/* Booking platforms */}
        {bookingList.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              {isAr ? "منصات حجز الأطباء الموثوقة" : "Trusted Doctor Booking Platforms"}
            </h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {bookingList.map((b) => (
                <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer"
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary/50 hover:shadow-elevated transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">{b.name}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{isAr ? b.desc.ar : b.desc.en}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Medical councils */}
        {councilsList.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-accent" />
              {isAr ? "نقابات الأطباء الرسمية" : "Official Medical Councils"}
              <span className="text-sm text-muted-foreground font-normal">({councilsList.length})</span>
            </h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {councilsList.map((c) => (
                <a key={c.country} href={c.url} target="_blank" rel="noopener noreferrer"
                  className="rounded-xl border border-border bg-card p-4 hover:border-accent/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">{c.flag}</span>
                    <h3 className="font-bold text-sm">{isAr ? c.countryAr : c.country}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{c.name}</p>
                  <span className="text-xs text-accent font-semibold inline-flex items-center gap-1 mt-2">
                    {isAr ? "زيارة الموقع" : "Visit site"} <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Emergency numbers */}
        <section>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Phone className="h-5 w-5 text-emergency" />
            {isAr ? "أرقام الطوارئ الرسمية" : "Official Emergency Numbers"}
          </h2>
          {list.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">{t.common.noResults}</div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <div key={c.country} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{c.flag}</span>
                    <h3 className="font-bold">{isAr ? c.countryAr : c.country}</h3>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    {[
                      { l: isAr ? "طوارئ عام" : "Emergency", v: c.emergency, primary: true },
                      c.ambulance && { l: isAr ? "إسعاف" : "Ambulance", v: c.ambulance },
                      c.police && { l: isAr ? "شرطة" : "Police", v: c.police },
                      c.fire && { l: isAr ? "إطفاء" : "Fire", v: c.fire },
                      c.poison && { l: isAr ? "تسمم" : "Poison", v: c.poison },
                      c.mentalCrisis && { l: isAr ? "أزمة نفسية" : "Mental crisis", v: c.mentalCrisis },
                    ].filter(Boolean).map((row, idx) => {
                      const r = row as { l: string; v: string; primary?: boolean };
                      return (
                        <a key={idx} href={`tel:${r.v}`} className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 ${r.primary ? "bg-emergency/10 text-emergency hover:bg-emergency/15" : "bg-muted hover:bg-muted/70"}`}>
                          <span className="text-xs font-medium">{r.l}</span>
                          <span className="font-bold flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{r.v}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <DoctorFinderChat />
        </section>
      </main>
      <Footer />
    </div>
  );
}
