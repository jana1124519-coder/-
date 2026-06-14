import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatUI } from "@/components/ChatUI";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/psych-chat")({
  head: () => ({ meta: [{ title: "دعم نفسي — صحّتك" }] }),
  component: PsychChatPage,
});

function PsychChatPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-8 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{t.nav.psychChat}</h1>
        <p className="text-muted-foreground text-sm mb-6">{t.sections.psychDesc}</p>
        <ChatUI mode="psych" />
      </main>
      <Footer />
    </div>
  );
}
