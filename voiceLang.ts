// Shared BCP47 mapping + greetings for ALL supported app languages.
import type { Lang } from "./i18n";

export const BCP47_FOR: Record<Lang, string> = {
  ar: "ar-SA",
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  es: "es-ES",
  ja: "ja-JP",
  zh: "zh-CN",
  ko: "ko-KR",
  hi: "hi-IN",
  fil: "fil-PH",
  el: "el-GR",
  ru: "ru-RU",
  tr: "tr-TR",
};

export const WELCOME_GREETING: Record<Lang, string> = {
  ar: "أهلاً بك في صحّتك. مرجعك الطبي الشامل. استكشف الأمراض، الإسعافات، أو اسأل المساعد الذكي.",
  en: "Welcome to Sehetak, your comprehensive medical companion. Browse diseases, first aid, or ask the AI assistant.",
  fr: "Bienvenue sur Sehetak, votre compagnon médical complet. Parcourez les maladies, les premiers secours, ou demandez à l'assistant IA.",
  de: "Willkommen bei Sehetak, Ihrem medizinischen Begleiter. Durchsuchen Sie Krankheiten, Erste Hilfe oder fragen Sie den KI-Assistenten.",
  es: "Bienvenido a Sehetak, tu compañero médico integral. Explora enfermedades, primeros auxilios o pregunta al asistente de IA.",
  it: "Benvenuto in Sehetak, il tuo compagno medico completo. Esplora malattie, primo soccorso o chiedi all'assistente AI.",
  ja: "セヘタックへようこそ。病気の情報、応急処置、AIアシスタントをご利用ください。",
  zh: "欢迎使用 Sehetak，您全面的医疗助手。浏览疾病、急救信息，或询问 AI 助手。",
  ko: "Sehetak에 오신 것을 환영합니다. 질병 정보, 응급 처치를 살펴보거나 AI 어시스턴트에게 물어보세요.",
  hi: "सेहतक में आपका स्वागत है। रोग, प्राथमिक चिकित्सा देखें या AI सहायक से पूछें।",
  fil: "Maligayang pagdating sa Sehetak, ang iyong komprehensibong medikal na kasama.",
  el: "Καλώς ήρθατε στο Sehetak, τον ολοκληρωμένο ιατρικό σας σύντροφο.",
  ru: "Добро пожаловать в Sehetak — ваш медицинский помощник. Изучайте болезни, первую помощь или спросите ИИ-ассистента.",
  tr: "Sehetak'a hoş geldiniz. Kapsamlı tıbbi rehberiniz. Hastalıklara göz atın, ilk yardım veya AI asistanına sorun.",
};

export function bcpFor(lang: string): string {
  return (BCP47_FOR as Record<string, string>)[lang] ?? lang;
}
