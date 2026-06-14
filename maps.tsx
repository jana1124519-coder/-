import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MapPin, Hospital, Pill, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

declare global { interface Window { google?: any; initGmaps?: () => void } }

export const Route = createFileRoute("/maps")({
  head: () => ({ meta: [
    { title: "أقرب مستشفى وصيدلية — صحّتك" },
    { name: "description", content: "خرائط المستشفيات والصيدليات القريبة منك." },
  ]}),
  component: MapsPage,
});

function MapsPage() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"hospital" | "pharmacy">("hospital");
  const mapObj = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const userLoc = useRef<{ lat: number; lng: number } | null>(null);
  const [places, setPlaces] = useState<any[]>([]);

  // Load Google Maps JS
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.google?.maps) { setLoaded(true); return; }
    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
    if (!key) { toast.error(ar ? "مفتاح الخرائط غير متوفر" : "Maps key not available"); return; }
    window.initGmaps = () => setLoaded(true);
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=initGmaps${channel ? `&channel=${channel}` : ""}`;
    s.async = true;
    document.head.appendChild(s);
  }, [ar]);

  // Init map on load
  useEffect(() => {
    if (!loaded || !mapRef.current || mapObj.current) return;
    mapObj.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 30.0444, lng: 31.2357 }, // Cairo default
      zoom: 12,
    });
  }, [loaded]);

  // Auto-locate once when map ready
  useEffect(() => {
    if (loaded && mapObj.current && !userLoc.current) {
      findNearby();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const findNearby = async () => {
    setLoading(true);
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 10000 });
      });
      userLoc.current = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      mapObj.current.setCenter(userLoc.current);
      mapObj.current.setZoom(14);
      new window.google.maps.Marker({ position: userLoc.current, map: mapObj.current, title: ar ? "أنت هنا" : "You" });

      // Places API (New) via gateway
      const lovableKey = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
      const res = await fetch("https://connector-gateway.lovable.dev/google_maps/places/v1/places:searchNearby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Connection-Api-Key": lovableKey,
          "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.regularOpeningHours.openNow,places.nationalPhoneNumber,places.websiteUri",
        } as any,
        body: JSON.stringify({
          includedTypes: [mode],
          maxResultCount: 20,
          rankPreference: "DISTANCE",
          locationRestriction: { circle: { center: userLoc.current, radius: 8000 } },
        }),
      });
      if (!res.ok) throw new Error("places fetch failed");
      const data = await res.json();
      const list = data.places ?? [];
      setPlaces(list);
      markers.current.forEach((m) => m.setMap(null));
      markers.current = list.map((p: any) => new window.google.maps.Marker({
        position: { lat: p.location.latitude, lng: p.location.longitude },
        map: mapObj.current,
        title: p.displayName?.text,
      }));
    } catch (e) {
      toast.error(ar ? "تعذّر تحديد الموقع" : "Could not locate");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center"><MapPin className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{ar ? "أقرب مستشفى وصيدلية" : "Nearby Hospitals & Pharmacies"}</h1>
        </div>
        <p className="text-muted-foreground mb-4">{ar ? "اضغط على زرّ لتحديد موقعك وعرض أقرب الأماكن." : "Tap a button to locate yourself and find nearby places."}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant={mode === "hospital" ? "default" : "outline"} onClick={() => setMode("hospital")}>
            <Hospital className="me-2 h-4 w-4" /> {ar ? "مستشفيات" : "Hospitals"}
          </Button>
          <Button variant={mode === "pharmacy" ? "default" : "outline"} onClick={() => setMode("pharmacy")}>
            <Pill className="me-2 h-4 w-4" /> {ar ? "صيدليات" : "Pharmacies"}
          </Button>
          <Button onClick={findNearby} disabled={!loaded || loading} className="bg-gradient-primary">
            {loading ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <MapPin className="me-2 h-4 w-4" />}
            {ar ? "بحث حولي" : "Search near me"}
          </Button>
        </div>

        <div ref={mapRef} className="w-full h-[420px] rounded-2xl border border-border bg-muted" />

        {places.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="font-bold">{ar ? "النتائج" : "Results"} ({places.length})</h2>
            {places.map((p) => {
              const dest = `${p.location.latitude},${p.location.longitude}`;
              const origin = userLoc.current ? `${userLoc.current.lat},${userLoc.current.lng}` : "";
              const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}&destination_place_id=${p.id}${origin ? `&origin=${origin}` : ""}&travelmode=driving`;
              const placeUrl = `https://www.google.com/maps/search/?api=1&query=${dest}&query_place_id=${p.id}`;
              return (
                <div key={p.id} className="rounded-xl border border-border bg-card p-3 hover:border-primary/50">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="font-semibold">{p.displayName?.text}</div>
                    <div className="flex items-center gap-2 text-xs">
                      {typeof p.rating === "number" && (
                        <span className="px-2 py-0.5 rounded-full bg-primary-soft text-primary font-bold">★ {p.rating} {p.userRatingCount ? `(${p.userRatingCount})` : ""}</span>
                      )}
                      {p.regularOpeningHours?.openNow !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full font-bold ${p.regularOpeningHours.openNow ? "bg-accent/15 text-accent" : "bg-emergency/15 text-emergency"}`}>
                          {p.regularOpeningHours.openNow ? (ar ? "مفتوح الآن" : "Open now") : (ar ? "مغلق" : "Closed")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{p.formattedAddress}</div>
                  <div className="text-xs mt-2 flex gap-2 flex-wrap items-center">
                    <a href={dirUrl} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-bold inline-flex items-center gap-1 hover:opacity-90">
                      🧭 {ar ? "اتجاهات" : "Directions"}
                    </a>
                    <a href={placeUrl} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-border hover:border-primary/40">
                      {ar ? "تفاصيل" : "Details"}
                    </a>
                    {p.nationalPhoneNumber && <a href={`tel:${p.nationalPhoneNumber}`} className="px-3 py-1.5 rounded-full border border-border text-primary hover:border-primary/40">📞 {p.nationalPhoneNumber}</a>}
                    {p.websiteUri && <a href={p.websiteUri} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-border text-primary hover:border-primary/40">{ar ? "الموقع" : "Website"}</a>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
