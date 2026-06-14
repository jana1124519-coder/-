import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function OfflineBadge() {
  const { lang } = useI18n();
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (online) return null;
  return (
    <div className="fixed bottom-4 start-4 z-50 inline-flex items-center gap-2 rounded-full bg-warning text-warning-foreground px-3 py-1.5 text-xs font-bold shadow-elevated">
      <WifiOff className="h-3.5 w-3.5" />
      {lang === "ar" ? "وضع عدم الاتصال — تتصفح من الذاكرة" : "Offline — browsing from cache"}
    </div>
  );
}
