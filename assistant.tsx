import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatUI } from "@/components/ChatUI";
import { useI18n } from "@/lib/i18n";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [
    { title: "المساعد الذكي العام — صحّتك" },
    { name: "description", content: "اسأل المساعد الذكي عن أي شيء: معلومات عامة، كتابة، رياضيات، نصائح، برمجة، علاج، أو أي موضوع." },
  ]}),
  component: AssistantPage,
});

function AssistantPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-8 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center"><Sparkles className="h-6 w-6" /></div>
          <h1 className="text-2xl md:text-3xl font-bold">{isAr ? "المساعد الذكي العام" : "General AI Assistant"}</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-6">
          {isAr ? "اسأل عن أي شيء، تماماً مثل ChatGPT — معلومات، كتابة، علاج، نصائح، برمجة، رياضيات، لغات، وأكثر." : "Ask anything — like ChatGPT — info, writing, advice, coding, math, languages, and more."}
        </p>
        <ChatUI mode="general" />
      </main>
      <Footer />
    </div>
  );
}
