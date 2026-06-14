import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { I18nProvider } from "@/components/I18nProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { WelcomeVoice } from "@/components/WelcomeVoice";
import { ReadAloud } from "@/components/ReadAloud";
import { OfflineBadge } from "@/components/OfflineBadge";
import { useEffect } from "react";
import { registerPWA } from "@/lib/pwa";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "صحّتك — مرجعك الطبي الشامل" },
      { name: "description", content: "قاعدة بيانات شاملة للأمراض، الإسعافات الأولية، أرقام الطوارئ، ومساعد طبي ونفسي بالذكاء الاصطناعي." },
      { name: "author", content: "Sehetak" },
      { property: "og:title", content: "صحّتك — مرجعك الطبي الشامل" },
      { property: "og:description", content: "قاعدة بيانات شاملة للأمراض، الإسعافات الأولية، أرقام الطوارئ، ومساعد طبي ونفسي بالذكاء الاصطناعي." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "صحّتك — مرجعك الطبي الشامل" },
      { name: "twitter:description", content: "قاعدة بيانات شاملة للأمراض، الإسعافات الأولية، أرقام الطوارئ، ومساعد طبي ونفسي بالذكاء الاصطناعي." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => { registerPWA(); }, []);
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <Outlet />
          <WelcomeVoice />
          <ReadAloud />
          <OfflineBadge />
          <Toaster richColors position="top-center" />
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
