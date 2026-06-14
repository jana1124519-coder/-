// Iframe-safe service worker registration. Skipped in Lovable preview/iframe.
export function registerPWA() {
  if (typeof window === "undefined") return;
  const inIframe = (() => {
    try { return window.self !== window.top; } catch { return true; }
  })();
  const host = window.location.hostname;
  const isPreview =
    host.includes("id-preview--") ||
    host.includes("lovableproject.com") ||
    host.includes("lovable.dev");

  if (inIframe || isPreview) {
    // Clean up any prior SW registrations in preview/iframe contexts
    navigator.serviceWorker?.getRegistrations().then((rs) => rs.forEach((r) => r.unregister()));
    return;
  }
  if (!("serviceWorker" in navigator)) return;
  // vite-plugin-pwa generates /sw.js in production builds
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
