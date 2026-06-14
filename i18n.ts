import { createContext, useContext } from "react";

export type Lang = "ar" | "en" | "fr" | "de" | "it" | "es" | "ja" | "zh" | "ko" | "hi" | "fil" | "el" | "ru" | "tr";

export const SUPPORTED_LANGS: { code: Lang; native: string; flag: string; rtl?: boolean }[] = [
  { code: "ar", native: "العربية", flag: "🇸🇦", rtl: true },
  { code: "en", native: "English", flag: "🇬🇧" },
  { code: "fr", native: "Français", flag: "🇫🇷" },
  { code: "de", native: "Deutsch", flag: "🇩🇪" },
  { code: "it", native: "Italiano", flag: "🇮🇹" },
  { code: "es", native: "Español", flag: "🇪🇸" },
  { code: "ru", native: "Русский", flag: "🇷🇺" },
  { code: "tr", native: "Türkçe", flag: "🇹🇷" },
  { code: "ja", native: "日本語", flag: "🇯🇵" },
  { code: "zh", native: "中文", flag: "🇨🇳" },
  { code: "ko", native: "한국어", flag: "🇰🇷" },
  { code: "hi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "fil", native: "Filipino", flag: "🇵🇭" },
  { code: "el", native: "Ελληνικά", flag: "🇬🇷" },
];

type Dict = {
  appName: string;
  tagline: string;
  nav: Record<"home" | "diseases" | "emergency" | "firstAid" | "mental" | "parents" | "symptoms" | "doctors" | "chat" | "psychChat", string>;
  cta: Record<"explore" | "emergency" | "askAI" | "learnMore" | "callNow" | "back", string>;
  home: Record<"heroBadge" | "heroTitle" | "heroDesc" | "sectionsTitle" | "sectionsDesc" | "stat1" | "stat2" | "stat3" | "stat4" | "disclaimerTitle" | "disclaimer", string>;
  sections: Record<"diseasesDesc" | "emergencyDesc" | "firstAidDesc" | "mentalDesc" | "parentsDesc" | "symptomsDesc" | "doctorsDesc" | "chatDesc" | "psychDesc", string>;
  common: Record<"symptoms" | "causes" | "treatments" | "research" | "whatToDo" | "severity" | "category" | "search" | "noResults" | "genetic" | "rare" | "common" | "mental" | "emergency" | "mild" | "moderate" | "severe" | "critical" | "translateAi" | "translating", string>;
};

const ar: Dict = {
  appName: "صحّتك",
  tagline: "مرجعك الطبي الشامل — أمراض، إسعافات، وذكاء صناعي للمساعدة",
  nav: { home: "الرئيسية", diseases: "الأمراض", emergency: "الطوارئ", firstAid: "الإسعافات الأولية", mental: "الصحة النفسية", parents: "الأهالي", symptoms: "فحص الأعراض", doctors: "أرقام الأطباء", chat: "استشارة طبية", psychChat: "دعم نفسي" },
  cta: { explore: "ابدأ الاستكشاف", emergency: "حالات الطوارئ", askAI: "اسأل المساعد الذكي", learnMore: "تعرف أكثر", callNow: "اتصل الآن", back: "رجوع" },
  home: {
    heroBadge: "مدعوم بالذكاء الاصطناعي",
    heroTitle: "كل ما تحتاج معرفته عن صحتك في مكان واحد",
    heroDesc: "قاعدة بيانات شاملة للأمراض الشائعة والنادرة، إرشادات الطوارئ والإسعافات الأولية، ومساعد ذكي للإجابة على أسئلتك الطبية والنفسية على مدار الساعة.",
    sectionsTitle: "أقسام التطبيق", sectionsDesc: "اختر القسم الذي تحتاجه",
    stat1: "مرض موثّق", stat2: "حالة طارئة", stat3: "لغة مدعومة", stat4: "مساعد ذكي",
    disclaimerTitle: "تنبيه طبي مهم",
    disclaimer: "المعلومات في هذا التطبيق للتثقيف فقط ولا تُغني عن استشارة الطبيب المختص. في الحالات الطارئة اتصل بالإسعاف فوراً.",
  },
  sections: {
    diseasesDesc: "تصفّح الأمراض الشائعة والنادرة والجينية",
    emergencyDesc: "إرشادات سريعة لأخطر الحالات الطارئة",
    firstAidDesc: "خطوات الإسعافات الأولية المصورة",
    mentalDesc: "الأمراض النفسية وأعراضها وعلاجاتها",
    parentsDesc: "نصائح للأهالي للتعامل مع أطفال المرضى",
    symptomsDesc: "أدخل أعراضك واحصل على احتمالات أولية",
    doctorsDesc: "أرقام طوارئ ونقابات أطباء ومنصات حجز حول العالم",
    chatDesc: "تحدث مع مساعد طبي ذكي",
    psychDesc: "مساحة آمنة للحديث والدعم النفسي",
  },
  common: {
    symptoms: "الأعراض", causes: "الأسباب", treatments: "العلاجات", research: "أبحاث جارية",
    whatToDo: "ماذا تفعل", severity: "مستوى الخطورة", category: "التصنيف",
    search: "ابحث عن مرض...", noResults: "لا توجد نتائج",
    genetic: "وراثي", rare: "نادر", common: "شائع", mental: "نفسي", emergency: "طارئ",
    mild: "خفيف", moderate: "متوسط", severe: "شديد", critical: "حرج",
    translateAi: "ترجم بالذكاء الاصطناعي", translating: "جارٍ الترجمة...",
  },
};

const en: Dict = {
  appName: "Sehetak",
  tagline: "Your comprehensive medical reference — diseases, first aid, and AI assistance",
  nav: { home: "Home", diseases: "Diseases", emergency: "Emergency", firstAid: "First Aid", mental: "Mental Health", parents: "For Parents", symptoms: "Symptom Checker", doctors: "Doctor Directory", chat: "Medical Chat", psychChat: "Mental Support" },
  cta: { explore: "Start Exploring", emergency: "Emergency Cases", askAI: "Ask AI Assistant", learnMore: "Learn more", callNow: "Call now", back: "Back" },
  home: {
    heroBadge: "Powered by AI",
    heroTitle: "Everything you need to know about your health, in one place",
    heroDesc: "A comprehensive database of common and rare diseases, emergency and first-aid guidance, and an AI assistant available 24/7 to answer your medical and mental-health questions.",
    sectionsTitle: "App Sections", sectionsDesc: "Pick the section you need",
    stat1: "documented diseases", stat2: "emergency cases", stat3: "supported languages", stat4: "AI assistant",
    disclaimerTitle: "Important medical notice",
    disclaimer: "Information here is for education only and is not a substitute for professional medical advice. In emergencies, call your local emergency number immediately.",
  },
  sections: {
    diseasesDesc: "Browse common, rare and genetic diseases",
    emergencyDesc: "Quick guidance for the most critical cases",
    firstAidDesc: "Step-by-step illustrated first aid",
    mentalDesc: "Mental disorders, symptoms and treatments",
    parentsDesc: "Guidance for parents of sick children",
    symptomsDesc: "Enter symptoms, get probable conditions",
    doctorsDesc: "Emergency numbers, medical councils & booking platforms worldwide",
    chatDesc: "Chat with a smart medical assistant",
    psychDesc: "A safe space for emotional support",
  },
  common: {
    symptoms: "Symptoms", causes: "Causes", treatments: "Treatments", research: "Ongoing research",
    whatToDo: "What to do", severity: "Severity", category: "Category",
    search: "Search a disease...", noResults: "No results",
    genetic: "Genetic", rare: "Rare", common: "Common", mental: "Mental", emergency: "Emergency",
    mild: "Mild", moderate: "Moderate", severe: "Severe", critical: "Critical",
    translateAi: "Translate with AI", translating: "Translating...",
  },
};

const makeDict = (
  appName: string,
  tagline: string,
  nav: Dict["nav"],
  cta: Dict["cta"],
  home: Dict["home"],
  sections: Dict["sections"],
  common: Dict["common"],
): Dict => ({ appName, tagline, nav, cta, home, sections, common });

const fr: Dict = makeDict(
  "Sehetak", "Votre référence médicale complète — maladies, premiers secours et IA",
  { home: "Accueil", diseases: "Maladies", emergency: "Urgence", firstAid: "Premiers secours", mental: "Santé mentale", parents: "Parents", symptoms: "Vérif. symptômes", doctors: "Annuaire médecins", chat: "Chat médical", psychChat: "Soutien psy" },
  { explore: "Explorer", emergency: "Urgences", askAI: "Assistant IA", learnMore: "En savoir plus", callNow: "Appeler", back: "Retour" },
  {
    heroBadge: "Propulsé par l'IA",
    heroTitle: "Tout sur votre santé, en un seul endroit",
    heroDesc: "Base de données complète des maladies courantes et rares, conseils d'urgence et de premiers secours, et un assistant IA disponible 24/7 pour répondre à vos questions médicales et psychologiques.",
    sectionsTitle: "Sections de l'application", sectionsDesc: "Choisissez la section dont vous avez besoin",
    stat1: "maladies documentées", stat2: "cas d'urgence", stat3: "langues prises en charge", stat4: "assistant IA",
    disclaimerTitle: "Avis médical important",
    disclaimer: "Les informations ici sont à but éducatif uniquement et ne remplacent pas l'avis d'un médecin. En cas d'urgence, appelez immédiatement les secours.",
  },
  {
    diseasesDesc: "Parcourez les maladies courantes, rares et génétiques",
    emergencyDesc: "Conseils rapides pour les cas les plus critiques",
    firstAidDesc: "Premiers secours illustrés étape par étape",
    mentalDesc: "Troubles mentaux, symptômes et traitements",
    parentsDesc: "Conseils aux parents d'enfants malades",
    symptomsDesc: "Entrez vos symptômes, obtenez les diagnostics probables",
    doctorsDesc: "Numéros d'urgence, ordres des médecins et plateformes de rendez-vous dans le monde",
    chatDesc: "Discutez avec un assistant médical intelligent",
    psychDesc: "Un espace sûr pour le soutien émotionnel",
  },
  {
    symptoms: "Symptômes", causes: "Causes", treatments: "Traitements", research: "Recherche en cours",
    whatToDo: "Que faire", severity: "Gravité", category: "Catégorie",
    search: "Rechercher une maladie...", noResults: "Aucun résultat",
    genetic: "Génétique", rare: "Rare", common: "Courant", mental: "Mental", emergency: "Urgence",
    mild: "Léger", moderate: "Modéré", severe: "Sévère", critical: "Critique",
    translateAi: "Traduire avec l'IA", translating: "Traduction...",
  },
);

const de: Dict = makeDict(
  "Sehetak", "Ihre umfassende medizinische Referenz",
  { home: "Start", diseases: "Krankheiten", emergency: "Notfall", firstAid: "Erste Hilfe", mental: "Psyche", parents: "Eltern", symptoms: "Symptom-Check", doctors: "Ärzteverzeichnis", chat: "Med. Chat", psychChat: "Psych. Hilfe" },
  { explore: "Erkunden", emergency: "Notfälle", askAI: "KI-Assistent", learnMore: "Mehr erfahren", callNow: "Anrufen", back: "Zurück" },
  {
    heroBadge: "KI-gestützt",
    heroTitle: "Alles über Ihre Gesundheit an einem Ort",
    heroDesc: "Umfassende Datenbank für häufige und seltene Krankheiten, Notfall- und Erste-Hilfe-Anleitungen sowie ein KI-Assistent rund um die Uhr für medizinische und psychische Fragen.",
    sectionsTitle: "App-Bereiche", sectionsDesc: "Wählen Sie den gewünschten Bereich",
    stat1: "dokumentierte Krankheiten", stat2: "Notfälle", stat3: "unterstützte Sprachen", stat4: "KI-Assistent",
    disclaimerTitle: "Wichtiger medizinischer Hinweis",
    disclaimer: "Die Informationen dienen nur der Aufklärung und ersetzen keinen Arztbesuch. Rufen Sie im Notfall sofort den Notruf.",
  },
  {
    diseasesDesc: "Häufige, seltene und genetische Krankheiten durchsuchen",
    emergencyDesc: "Schnelle Hinweise für die kritischsten Fälle",
    firstAidDesc: "Schritt-für-Schritt Erste-Hilfe mit Bildern",
    mentalDesc: "Psychische Erkrankungen, Symptome und Behandlungen",
    parentsDesc: "Hilfe für Eltern kranker Kinder",
    symptomsDesc: "Symptome eingeben, mögliche Diagnosen erhalten",
    doctorsDesc: "Notrufnummern, Ärztekammern und Buchungsplattformen weltweit",
    chatDesc: "Mit einem intelligenten medizinischen Assistenten chatten",
    psychDesc: "Ein sicherer Raum für emotionale Unterstützung",
  },
  {
    symptoms: "Symptome", causes: "Ursachen", treatments: "Behandlungen", research: "Laufende Forschung",
    whatToDo: "Was tun", severity: "Schweregrad", category: "Kategorie",
    search: "Krankheit suchen...", noResults: "Keine Ergebnisse",
    genetic: "Genetisch", rare: "Selten", common: "Häufig", mental: "Psychisch", emergency: "Notfall",
    mild: "Leicht", moderate: "Mäßig", severe: "Schwer", critical: "Kritisch",
    translateAi: "Mit KI übersetzen", translating: "Übersetzen...",
  },
);

const it: Dict = makeDict(
  "Sehetak", "Il tuo riferimento medico completo",
  { home: "Home", diseases: "Malattie", emergency: "Emergenza", firstAid: "Primo soccorso", mental: "Salute mentale", parents: "Genitori", symptoms: "Sintomi", doctors: "Medici", chat: "Chat medica", psychChat: "Supporto psic." },
  { explore: "Esplora", emergency: "Emergenze", askAI: "Assistente IA", learnMore: "Scopri di più", callNow: "Chiama", back: "Indietro" },
  {
    heroBadge: "Basato su IA",
    heroTitle: "Tutto sulla tua salute in un unico posto",
    heroDesc: "Database completo di malattie comuni e rare, indicazioni di emergenza e primo soccorso e un assistente IA disponibile 24/7 per domande mediche e psicologiche.",
    sectionsTitle: "Sezioni dell'app", sectionsDesc: "Scegli la sezione di cui hai bisogno",
    stat1: "malattie documentate", stat2: "casi di emergenza", stat3: "lingue supportate", stat4: "assistente IA",
    disclaimerTitle: "Avviso medico importante",
    disclaimer: "Le informazioni sono solo a scopo educativo e non sostituiscono il parere di un medico. In emergenza chiama subito i soccorsi.",
  },
  {
    diseasesDesc: "Esplora malattie comuni, rare e genetiche",
    emergencyDesc: "Indicazioni rapide per i casi più critici",
    firstAidDesc: "Primo soccorso illustrato passo dopo passo",
    mentalDesc: "Disturbi mentali, sintomi e trattamenti",
    parentsDesc: "Consigli per genitori di bambini malati",
    symptomsDesc: "Inserisci i sintomi e ottieni le possibili diagnosi",
    doctorsDesc: "Numeri di emergenza, ordini dei medici e piattaforme di prenotazione nel mondo",
    chatDesc: "Chatta con un assistente medico intelligente",
    psychDesc: "Uno spazio sicuro per il supporto emotivo",
  },
  {
    symptoms: "Sintomi", causes: "Cause", treatments: "Trattamenti", research: "Ricerca in corso",
    whatToDo: "Cosa fare", severity: "Gravità", category: "Categoria",
    search: "Cerca una malattia...", noResults: "Nessun risultato",
    genetic: "Genetico", rare: "Raro", common: "Comune", mental: "Mentale", emergency: "Emergenza",
    mild: "Lieve", moderate: "Moderato", severe: "Grave", critical: "Critico",
    translateAi: "Traduci con IA", translating: "Traduzione...",
  },
);

const es: Dict = makeDict(
  "Sehetak", "Tu referencia médica integral",
  { home: "Inicio", diseases: "Enfermedades", emergency: "Emergencia", firstAid: "Primeros auxilios", mental: "Salud mental", parents: "Padres", symptoms: "Síntomas", doctors: "Médicos", chat: "Chat médico", psychChat: "Apoyo psic." },
  { explore: "Explorar", emergency: "Emergencias", askAI: "Asistente IA", learnMore: "Más info", callNow: "Llamar", back: "Volver" },
  {
    heroBadge: "Con IA",
    heroTitle: "Todo sobre tu salud en un solo lugar",
    heroDesc: "Base de datos completa de enfermedades comunes y raras, guía de emergencias y primeros auxilios, y un asistente con IA 24/7 para tus dudas médicas y psicológicas.",
    sectionsTitle: "Secciones de la app", sectionsDesc: "Elige la sección que necesitas",
    stat1: "enfermedades documentadas", stat2: "casos de emergencia", stat3: "idiomas compatibles", stat4: "asistente IA",
    disclaimerTitle: "Aviso médico importante",
    disclaimer: "La información es solo educativa y no sustituye la consulta médica. En emergencias llama de inmediato al servicio local.",
  },
  {
    diseasesDesc: "Explora enfermedades comunes, raras y genéticas",
    emergencyDesc: "Guía rápida para los casos más críticos",
    firstAidDesc: "Primeros auxilios ilustrados paso a paso",
    mentalDesc: "Trastornos mentales, síntomas y tratamientos",
    parentsDesc: "Consejos para padres de niños enfermos",
    symptomsDesc: "Ingresa tus síntomas y obtén posibles diagnósticos",
    doctorsDesc: "Números de emergencia, colegios médicos y plataformas de citas en el mundo",
    chatDesc: "Chatea con un asistente médico inteligente",
    psychDesc: "Un espacio seguro para apoyo emocional",
  },
  {
    symptoms: "Síntomas", causes: "Causas", treatments: "Tratamientos", research: "Investigación en curso",
    whatToDo: "Qué hacer", severity: "Gravedad", category: "Categoría",
    search: "Buscar una enfermedad...", noResults: "Sin resultados",
    genetic: "Genético", rare: "Raro", common: "Común", mental: "Mental", emergency: "Emergencia",
    mild: "Leve", moderate: "Moderado", severe: "Grave", critical: "Crítico",
    translateAi: "Traducir con IA", translating: "Traduciendo...",
  },
);

const ja: Dict = makeDict(
  "Sehetak", "総合医療リファレンス",
  { home: "ホーム", diseases: "病気", emergency: "緊急", firstAid: "応急処置", mental: "メンタル", parents: "保護者", symptoms: "症状チェック", doctors: "医師一覧", chat: "医療チャット", psychChat: "心のサポート" },
  { explore: "探索する", emergency: "緊急事態", askAI: "AIに聞く", learnMore: "詳細", callNow: "今すぐ電話", back: "戻る" },
  {
    heroBadge: "AI搭載",
    heroTitle: "あなたの健康のすべてを一箇所に",
    heroDesc: "一般的な病気から希少疾患までを網羅したデータベース、緊急時と応急処置のガイド、24時間対応のAIアシスタントで医療や心の相談ができます。",
    sectionsTitle: "アプリのセクション", sectionsDesc: "必要なセクションを選んでください",
    stat1: "登録された病気", stat2: "緊急ケース", stat3: "対応言語", stat4: "AIアシスタント",
    disclaimerTitle: "重要な医療注意",
    disclaimer: "本アプリの情報は教育目的のみであり、医師の診察に代わるものではありません。緊急時はすぐに救急に連絡してください。",
  },
  {
    diseasesDesc: "一般的・希少・遺伝性の病気を閲覧",
    emergencyDesc: "最も重大な事態への迅速なガイド",
    firstAidDesc: "写真付きステップバイステップの応急処置",
    mentalDesc: "精神疾患、症状、治療法",
    parentsDesc: "病気の子どもを持つ保護者向けアドバイス",
    symptomsDesc: "症状を入力して考えられる疾患を表示",
    doctorsDesc: "世界中の緊急番号、医師会、予約プラットフォーム",
    chatDesc: "スマート医療アシスタントとチャット",
    psychDesc: "心のサポートのための安全な場所",
  },
  {
    symptoms: "症状", causes: "原因", treatments: "治療法", research: "進行中の研究",
    whatToDo: "対処法", severity: "重症度", category: "カテゴリ",
    search: "病気を検索...", noResults: "結果なし",
    genetic: "遺伝性", rare: "希少", common: "一般的", mental: "精神", emergency: "緊急",
    mild: "軽度", moderate: "中等度", severe: "重度", critical: "重篤",
    translateAi: "AIで翻訳", translating: "翻訳中...",
  },
);

const zh: Dict = makeDict(
  "Sehetak", "您的综合医疗参考",
  { home: "首页", diseases: "疾病", emergency: "急救", firstAid: "急救措施", mental: "心理健康", parents: "家长", symptoms: "症状检查", doctors: "医生名录", chat: "医疗聊天", psychChat: "心理支持" },
  { explore: "开始探索", emergency: "紧急情况", askAI: "AI助手", learnMore: "了解更多", callNow: "立即拨打", back: "返回" },
  {
    heroBadge: "AI 驱动",
    heroTitle: "您健康的一切信息，尽在一处",
    heroDesc: "涵盖常见与罕见疾病的综合数据库、紧急情况和急救指南，以及全天候 AI 助手解答您的医疗与心理问题。",
    sectionsTitle: "应用版块", sectionsDesc: "选择您需要的版块",
    stat1: "已收录疾病", stat2: "紧急情况", stat3: "支持语言", stat4: "AI 助手",
    disclaimerTitle: "重要医疗提示",
    disclaimer: "本应用信息仅供教育参考，不能替代医生诊断。紧急情况请立即拨打当地急救电话。",
  },
  {
    diseasesDesc: "浏览常见、罕见和遗传性疾病",
    emergencyDesc: "最危急情况的快速指南",
    firstAidDesc: "图文并茂的逐步急救指引",
    mentalDesc: "心理疾病、症状与治疗",
    parentsDesc: "面向病儿家长的指导",
    symptomsDesc: "输入症状获取可能的诊断",
    doctorsDesc: "全球急救电话、医师协会与预约平台",
    chatDesc: "与智能医疗助手对话",
    psychDesc: "提供情感支持的安全空间",
  },
  {
    symptoms: "症状", causes: "病因", treatments: "治疗", research: "在研项目",
    whatToDo: "如何处理", severity: "严重程度", category: "类别",
    search: "搜索疾病...", noResults: "无结果",
    genetic: "遗传性", rare: "罕见", common: "常见", mental: "心理", emergency: "紧急",
    mild: "轻度", moderate: "中度", severe: "重度", critical: "危急",
    translateAi: "用AI翻译", translating: "翻译中...",
  },
);

const ko: Dict = makeDict(
  "Sehetak", "종합 의료 레퍼런스",
  { home: "홈", diseases: "질병", emergency: "응급", firstAid: "응급처치", mental: "정신건강", parents: "보호자", symptoms: "증상 확인", doctors: "의사 명부", chat: "의료 채팅", psychChat: "심리 지원" },
  { explore: "둘러보기", emergency: "응급상황", askAI: "AI에게 묻기", learnMore: "더 알아보기", callNow: "지금 전화", back: "뒤로" },
  {
    heroBadge: "AI 지원",
    heroTitle: "당신의 건강에 관한 모든 것",
    heroDesc: "흔한 질병과 희귀 질환을 망라한 데이터베이스, 응급 및 응급처치 가이드, 24시간 의료·심리 질문에 답하는 AI 어시스턴트를 제공합니다.",
    sectionsTitle: "앱 섹션", sectionsDesc: "필요한 섹션을 선택하세요",
    stat1: "등록된 질병", stat2: "응급 사례", stat3: "지원 언어", stat4: "AI 어시스턴트",
    disclaimerTitle: "중요한 의료 안내",
    disclaimer: "본 앱 정보는 교육용일 뿐 의료 자문을 대체하지 않습니다. 응급 시 즉시 응급 번호로 전화하세요.",
  },
  {
    diseasesDesc: "일반·희귀·유전성 질환 탐색",
    emergencyDesc: "가장 위급한 상황에 대한 빠른 안내",
    firstAidDesc: "이미지로 보는 단계별 응급처치",
    mentalDesc: "정신 질환의 증상과 치료",
    parentsDesc: "아픈 자녀를 둔 부모를 위한 안내",
    symptomsDesc: "증상을 입력해 가능한 진단 확인",
    doctorsDesc: "전 세계 응급 번호, 의사회, 예약 플랫폼",
    chatDesc: "스마트 의료 어시스턴트와 채팅",
    psychDesc: "정서적 지지를 위한 안전한 공간",
  },
  {
    symptoms: "증상", causes: "원인", treatments: "치료", research: "진행 중인 연구",
    whatToDo: "대처 방법", severity: "심각도", category: "분류",
    search: "질병 검색...", noResults: "결과 없음",
    genetic: "유전성", rare: "희귀", common: "흔함", mental: "정신", emergency: "응급",
    mild: "경증", moderate: "중등도", severe: "중증", critical: "위중",
    translateAi: "AI로 번역", translating: "번역 중...",
  },
);

const hi: Dict = makeDict(
  "Sehetak", "आपका व्यापक चिकित्सा संदर्भ",
  { home: "होम", diseases: "रोग", emergency: "आपातकाल", firstAid: "प्राथमिक उपचार", mental: "मानसिक स्वास्थ्य", parents: "अभिभावक", symptoms: "लक्षण जाँच", doctors: "डॉक्टर निर्देशिका", chat: "मेडिकल चैट", psychChat: "मानसिक सहायता" },
  { explore: "एक्सप्लोर करें", emergency: "आपातकालीन", askAI: "AI सहायक", learnMore: "और जानें", callNow: "अभी कॉल करें", back: "वापस" },
  {
    heroBadge: "AI द्वारा संचालित",
    heroTitle: "आपके स्वास्थ्य की हर जानकारी एक जगह",
    heroDesc: "सामान्य और दुर्लभ रोगों का व्यापक डेटाबेस, आपातकालीन और प्राथमिक उपचार मार्गदर्शिका, और चिकित्सा व मानसिक प्रश्नों के लिए 24/7 AI सहायक।",
    sectionsTitle: "ऐप के अनुभाग", sectionsDesc: "अपनी ज़रूरत का अनुभाग चुनें",
    stat1: "दर्ज रोग", stat2: "आपातकालीन मामले", stat3: "समर्थित भाषाएँ", stat4: "AI सहायक",
    disclaimerTitle: "महत्वपूर्ण चिकित्सा सूचना",
    disclaimer: "यहाँ दी गई जानकारी केवल शैक्षिक उद्देश्य से है और डॉक्टर की सलाह का विकल्प नहीं है। आपातकाल में तुरंत आपातकालीन सेवा को फोन करें।",
  },
  {
    diseasesDesc: "सामान्य, दुर्लभ और आनुवंशिक रोग देखें",
    emergencyDesc: "सबसे गंभीर मामलों के लिए त्वरित मार्गदर्शन",
    firstAidDesc: "चित्रों के साथ चरण-दर-चरण प्राथमिक उपचार",
    mentalDesc: "मानसिक विकार, लक्षण और उपचार",
    parentsDesc: "बीमार बच्चों के अभिभावकों के लिए सलाह",
    symptomsDesc: "लक्षण दर्ज करें, संभावित निदान पाएं",
    doctorsDesc: "विश्वभर के आपातकालीन नंबर, चिकित्सा परिषद और बुकिंग प्लेटफ़ॉर्म",
    chatDesc: "स्मार्ट मेडिकल सहायक से चैट करें",
    psychDesc: "भावनात्मक सहयोग के लिए सुरक्षित स्थान",
  },
  {
    symptoms: "लक्षण", causes: "कारण", treatments: "उपचार", research: "जारी अनुसंधान",
    whatToDo: "क्या करें", severity: "गंभीरता", category: "श्रेणी",
    search: "रोग खोजें...", noResults: "कोई परिणाम नहीं",
    genetic: "आनुवंशिक", rare: "दुर्लभ", common: "सामान्य", mental: "मानसिक", emergency: "आपातकाल",
    mild: "हल्का", moderate: "मध्यम", severe: "गंभीर", critical: "अत्यंत गंभीर",
    translateAi: "AI से अनुवाद करें", translating: "अनुवाद हो रहा है...",
  },
);

const fil: Dict = makeDict(
  "Sehetak", "Komprehensibong medikal na sanggunian",
  { home: "Home", diseases: "Mga Sakit", emergency: "Emergency", firstAid: "First Aid", mental: "Kalusugang Mental", parents: "Mga Magulang", symptoms: "Pagsusuri ng Sintomas", doctors: "Direktoryo ng Doktor", chat: "Medikal na Chat", psychChat: "Suportang Sikolohikal" },
  { explore: "Mag-explore", emergency: "Emergency", askAI: "Tanungin ang AI", learnMore: "Alamin pa", callNow: "Tumawag", back: "Bumalik" },
  {
    heroBadge: "Pinapagana ng AI",
    heroTitle: "Lahat tungkol sa iyong kalusugan, sa iisang lugar",
    heroDesc: "Komprehensibong database ng mga karaniwan at bihirang sakit, gabay sa emergency at first aid, at AI assistant na 24/7 para sa mga medikal at sikolohikal na tanong.",
    sectionsTitle: "Mga Seksyon ng App", sectionsDesc: "Piliin ang seksyong kailangan mo",
    stat1: "naitalang sakit", stat2: "kaso ng emergency", stat3: "sinusuportahang wika", stat4: "AI assistant",
    disclaimerTitle: "Mahalagang medikal na paalala",
    disclaimer: "Ang impormasyon dito ay para lamang sa edukasyon at hindi kapalit ng konsulta sa doktor. Sa emergency, tumawag agad sa lokal na emergency number.",
  },
  {
    diseasesDesc: "Tingnan ang karaniwan, bihira at minanang sakit",
    emergencyDesc: "Mabilis na gabay para sa pinakakritikal na kaso",
    firstAidDesc: "Hakbang-hakbang na may larawang first aid",
    mentalDesc: "Mga sakit pangkaisipan, sintomas at lunas",
    parentsDesc: "Gabay sa mga magulang ng may sakit na anak",
    symptomsDesc: "Ilagay ang sintomas, makita ang posibleng diagnosis",
    doctorsDesc: "Emergency numbers, medical councils at booking platforms sa mundo",
    chatDesc: "Mag-chat sa matalinong medikal assistant",
    psychDesc: "Ligtas na espasyo para sa emosyonal na suporta",
  },
  {
    symptoms: "Sintomas", causes: "Sanhi", treatments: "Mga Lunas", research: "Kasalukuyang pananaliksik",
    whatToDo: "Ano ang gagawin", severity: "Kalubhaan", category: "Kategorya",
    search: "Maghanap ng sakit...", noResults: "Walang resulta",
    genetic: "Minana", rare: "Bihira", common: "Karaniwan", mental: "Pangkaisipan", emergency: "Emergency",
    mild: "Banayad", moderate: "Katamtaman", severe: "Malubha", critical: "Kritikal",
    translateAi: "Isalin gamit ang AI", translating: "Isinasalin...",
  },
);

const el: Dict = makeDict(
  "Sehetak", "Η ολοκληρωμένη ιατρική σας αναφορά",
  { home: "Αρχική", diseases: "Ασθένειες", emergency: "Έκτακτο", firstAid: "Πρώτες βοήθειες", mental: "Ψυχική υγεία", parents: "Γονείς", symptoms: "Έλεγχος συμπτωμάτων", doctors: "Κατάλογος γιατρών", chat: "Ιατρικό chat", psychChat: "Ψυχ. υποστήριξη" },
  { explore: "Εξερευνήστε", emergency: "Έκτακτα", askAI: "Βοηθός AI", learnMore: "Μάθετε περισσότερα", callNow: "Κλήση τώρα", back: "Πίσω" },
  {
    heroBadge: "Με AI",
    heroTitle: "Όλα για την υγεία σας σε ένα μέρος",
    heroDesc: "Πλήρης βάση δεδομένων κοινών και σπάνιων ασθενειών, οδηγίες έκτακτης ανάγκης και πρώτων βοηθειών και βοηθός AI 24/7 για ιατρικές και ψυχικές ερωτήσεις.",
    sectionsTitle: "Ενότητες εφαρμογής", sectionsDesc: "Επιλέξτε την ενότητα που χρειάζεστε",
    stat1: "καταγεγραμμένες ασθένειες", stat2: "περιστατικά έκτακτης ανάγκης", stat3: "υποστηριζόμενες γλώσσες", stat4: "βοηθός AI",
    disclaimerTitle: "Σημαντική ιατρική σημείωση",
    disclaimer: "Οι πληροφορίες είναι μόνο εκπαιδευτικές και δεν αντικαθιστούν τον γιατρό. Σε έκτακτη ανάγκη καλέστε αμέσως την τοπική υπηρεσία.",
  },
  {
    diseasesDesc: "Περιηγηθείτε σε κοινές, σπάνιες και γενετικές ασθένειες",
    emergencyDesc: "Γρήγορες οδηγίες για τα πιο κρίσιμα περιστατικά",
    firstAidDesc: "Πρώτες βοήθειες βήμα-βήμα με εικόνες",
    mentalDesc: "Ψυχικές διαταραχές, συμπτώματα και θεραπείες",
    parentsDesc: "Συμβουλές για γονείς άρρωστων παιδιών",
    symptomsDesc: "Εισαγάγετε συμπτώματα, δείτε πιθανές διαγνώσεις",
    doctorsDesc: "Τηλέφωνα έκτακτης ανάγκης, ιατρικοί σύλλογοι και πλατφόρμες ραντεβού παγκοσμίως",
    chatDesc: "Συνομιλήστε με έξυπνο ιατρικό βοηθό",
    psychDesc: "Ένας ασφαλής χώρος για συναισθηματική στήριξη",
  },
  {
    symptoms: "Συμπτώματα", causes: "Αίτια", treatments: "Θεραπείες", research: "Τρέχουσα έρευνα",
    whatToDo: "Τι να κάνετε", severity: "Σοβαρότητα", category: "Κατηγορία",
    search: "Αναζήτηση ασθένειας...", noResults: "Κανένα αποτέλεσμα",
    genetic: "Γενετικό", rare: "Σπάνιο", common: "Κοινό", mental: "Ψυχικό", emergency: "Έκτακτο",
    mild: "Ήπιο", moderate: "Μέτριο", severe: "Σοβαρό", critical: "Κρίσιμο",
    translateAi: "Μετάφραση με AI", translating: "Μετάφραση...",
  },
);

const ru: Dict = makeDict(
  "Sehetak", "Ваш универсальный медицинский справочник",
  { home: "Главная", diseases: "Болезни", emergency: "Скорая", firstAid: "Первая помощь", mental: "Психика", parents: "Родители", symptoms: "Проверка симптомов", doctors: "Врачи", chat: "Мед. чат", psychChat: "Псих. поддержка" },
  { explore: "Исследовать", emergency: "Экстренные случаи", askAI: "Спросить ИИ", learnMore: "Подробнее", callNow: "Позвонить", back: "Назад" },
  {
    heroBadge: "На базе ИИ",
    heroTitle: "Всё о вашем здоровье в одном месте",
    heroDesc: "Полная база распространённых и редких заболеваний, рекомендации по экстренной и первой помощи, а также ИИ-помощник 24/7 для медицинских и психологических вопросов.",
    sectionsTitle: "Разделы приложения", sectionsDesc: "Выберите нужный раздел",
    stat1: "задокументированных болезней", stat2: "экстренных случаев", stat3: "поддерживаемых языков", stat4: "ИИ-помощник",
    disclaimerTitle: "Важное медицинское уведомление",
    disclaimer: "Информация в приложении носит образовательный характер и не заменяет консультацию врача. В экстренной ситуации немедленно вызовите скорую.",
  },
  {
    diseasesDesc: "Распространённые, редкие и генетические заболевания",
    emergencyDesc: "Быстрые рекомендации для самых критических случаев",
    firstAidDesc: "Пошаговая первая помощь с иллюстрациями",
    mentalDesc: "Психические расстройства, симптомы и лечение",
    parentsDesc: "Советы родителям больных детей",
    symptomsDesc: "Введите симптомы — получите вероятные диагнозы",
    doctorsDesc: "Экстренные номера, врачебные палаты и платформы записи по всему миру",
    chatDesc: "Чат с умным медицинским помощником",
    psychDesc: "Безопасное пространство для эмоциональной поддержки",
  },
  {
    symptoms: "Симптомы", causes: "Причины", treatments: "Лечение", research: "Текущие исследования",
    whatToDo: "Что делать", severity: "Тяжесть", category: "Категория",
    search: "Поиск заболевания...", noResults: "Ничего не найдено",
    genetic: "Генетическое", rare: "Редкое", common: "Распространённое", mental: "Психическое", emergency: "Экстренное",
    mild: "Лёгкое", moderate: "Умеренное", severe: "Тяжёлое", critical: "Критическое",
    translateAi: "Перевести с ИИ", translating: "Перевод...",
  },
);

const tr: Dict = makeDict(
  "Sehetak", "Kapsamlı tıbbi referansınız",
  { home: "Ana Sayfa", diseases: "Hastalıklar", emergency: "Acil", firstAid: "İlk Yardım", mental: "Ruh Sağlığı", parents: "Ebeveynler", symptoms: "Belirti Kontrol", doctors: "Doktor Rehberi", chat: "Tıbbi Sohbet", psychChat: "Psikolojik Destek" },
  { explore: "Keşfet", emergency: "Acil Durumlar", askAI: "AI'ya Sor", learnMore: "Daha fazla", callNow: "Şimdi Ara", back: "Geri" },
  {
    heroBadge: "AI destekli",
    heroTitle: "Sağlığınızla ilgili her şey tek yerde",
    heroDesc: "Yaygın ve nadir hastalıkların kapsamlı veritabanı, acil ve ilk yardım rehberleri ile 7/24 tıbbi ve psikolojik sorularınızı yanıtlayan AI asistanı.",
    sectionsTitle: "Uygulama Bölümleri", sectionsDesc: "İhtiyacınız olan bölümü seçin",
    stat1: "kayıtlı hastalık", stat2: "acil durum vakası", stat3: "desteklenen dil", stat4: "AI asistanı",
    disclaimerTitle: "Önemli tıbbi uyarı",
    disclaimer: "Buradaki bilgiler yalnızca eğitim amaçlıdır ve doktor muayenesinin yerine geçmez. Acil durumda hemen yerel acil numarayı arayın.",
  },
  {
    diseasesDesc: "Yaygın, nadir ve genetik hastalıklara göz atın",
    emergencyDesc: "En kritik vakalar için hızlı rehber",
    firstAidDesc: "Resimli adım adım ilk yardım",
    mentalDesc: "Ruhsal hastalıklar, belirtiler ve tedaviler",
    parentsDesc: "Hasta çocuğu olan ebeveynlere rehber",
    symptomsDesc: "Belirtileri girin, olası teşhisleri görün",
    doctorsDesc: "Dünya çapında acil numaralar, tabip odaları ve randevu platformları",
    chatDesc: "Akıllı tıbbi asistanla sohbet",
    psychDesc: "Duygusal destek için güvenli bir alan",
  },
  {
    symptoms: "Belirtiler", causes: "Nedenler", treatments: "Tedaviler", research: "Devam eden araştırma",
    whatToDo: "Ne yapmalı", severity: "Şiddet", category: "Kategori",
    search: "Hastalık ara...", noResults: "Sonuç yok",
    genetic: "Genetik", rare: "Nadir", common: "Yaygın", mental: "Ruhsal", emergency: "Acil",
    mild: "Hafif", moderate: "Orta", severe: "Şiddetli", critical: "Kritik",
    translateAi: "AI ile çevir", translating: "Çevriliyor...",
  },
);

export const translations: Record<Lang, Dict> = { ar, en, fr, de, it, es, ja, zh, ko, hi, fil, el, ru, tr };

export type { Dict };

export const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({
  lang: "ar",
  setLang: () => {},
  t: translations.ar,
});

export const useI18n = () => useContext(I18nContext);

// Returns the best disease/content language to display given the current UI lang.
// Diseases are authored only in ar/en — others fall back to en (with optional AI translate).
export function contentLangFor(lang: Lang): "ar" | "en" {
  return lang === "ar" ? "ar" : "en";
}
