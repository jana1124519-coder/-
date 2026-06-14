import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatUI } from "@/components/ChatUI";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "استشارة طبية — صحّتك" }] }),
  component: ChatPage,
});

function ChatPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-8 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{t.nav.chat}</h1>
        <p className="text-muted-foreground text-sm mb-6">{t.sections.chatDesc}</p>
        <ChatUI mode="medical" />
      </main>
      <Footer />
    </div>
  );
}
