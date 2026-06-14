import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { useI18n } from "@/lib/i18n";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label={isDark ? (lang === "ar" ? "الوضع النهاري" : "Light mode") : (lang === "ar" ? "الوضع الليلي" : "Dark mode")}
      title={isDark ? (lang === "ar" ? "نهاري" : "Light") : (lang === "ar" ? "ليلي" : "Dark")}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
