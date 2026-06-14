// Validated screening tools.
// IMPORTANT: These are educational screening tools, NOT diagnostic instruments.
// Final diagnosis requires a licensed mental-health professional.

export type Lang = "ar" | "en";

export interface ScaleTest {
  id: "phq9" | "gad7" | "pcl5";
  ar: { name: string; description: string; items: string[]; scale: string[] };
  en: { name: string; description: string; items: string[]; scale: string[] };
  interpret: (total: number, lang: Lang) => { level: string; advice: string };
  maxPerItem: number;
}

const phq9scale = {
  ar: ["أبدا", "عدة أيام", "أكثر من نصف الأيام", "تقريبا كل يوم"],
  en: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
};

export const PHQ9: ScaleTest = {
  id: "phq9", maxPerItem: 3,
  ar: {
    name: "PHQ-9 — استبيان اكتئاب",
    description: "خلال آخر أسبوعين، كم مرة أزعجتك أي من المشاكل التالية؟",
    items: [
      "قلة الاهتمام أو المتعة بفعل الأشياء",
      "الشعور بالحزن أو الاكتئاب أو فقدان الأمل",
      "صعوبة في النوم أو البقاء نائماً، أو النوم كثيراً",
      "الشعور بالتعب أو قلة الطاقة",
      "ضعف الشهية أو الأكل بإفراط",
      "الشعور بسوء تجاه نفسك — أنك فاشل أو خذلت نفسك أو عائلتك",
      "صعوبة التركيز في القراءة أو مشاهدة التلفاز",
      "بطء في الحركة/الكلام لاحظه الآخرون، أو على العكس عصبية وحركة مفرطة",
      "أفكار بأنك ستكون أفضل لو متّ أو إيذاء نفسك بطريقة ما",
    ],
    scale: phq9scale.ar,
  },
  en: {
    name: "PHQ-9 — Depression Screen",
    description: "Over the last 2 weeks, how often have you been bothered by any of the following?",
    items: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling/staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself — that you are a failure or have let yourself or your family down",
      "Trouble concentrating on things like reading or watching TV",
      "Moving/speaking slowly enough that others noticed, or being fidgety/restless",
      "Thoughts that you would be better off dead, or of hurting yourself",
    ],
    scale: phq9scale.en,
  },
  interpret(total, lang) {
    const ar = lang === "ar";
    if (total <= 4) return { level: ar ? "بسيط جداً / لا اكتئاب" : "Minimal / none", advice: ar ? "لا حاجة لتدخل طبي. حافظ على النوم والرياضة والتواصل." : "No intervention needed. Maintain sleep, exercise, social connection." };
    if (total <= 9) return { level: ar ? "خفيف" : "Mild", advice: ar ? "راقب الأعراض، جرّب تقنيات CBT الذاتية وتمارين التنفس." : "Watchful waiting. Try self-guided CBT and breathing exercises." };
    if (total <= 14) return { level: ar ? "متوسط" : "Moderate", advice: ar ? "يُنصح بزيارة طبيب نفسي للتقييم — قد تستفيد من علاج نفسي." : "Recommend evaluation by a clinician — psychotherapy may help." };
    if (total <= 19) return { level: ar ? "شديد متوسط" : "Moderately severe", advice: ar ? "زيارة طبيب نفسي مهمة — الأرجح أن العلاج النفسي + دواء سيكونان مفيدين." : "See a psychiatrist — psychotherapy + medication likely beneficial." };
    return { level: ar ? "شديد" : "Severe", advice: ar ? "تقييم فوري من مختص. لو فيه أفكار انتحار، اتصل بخط الأزمات الآن." : "Immediate clinician evaluation. If suicidal thoughts, call a crisis line now." };
  },
};

const freqScale = {
  ar: ["أبدا", "عدة أيام", "أكثر من نصف الأيام", "تقريبا كل يوم"],
  en: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
};

export const GAD7: ScaleTest = {
  id: "gad7", maxPerItem: 3,
  ar: {
    name: "GAD-7 — استبيان القلق",
    description: "خلال آخر أسبوعين، كم مرة أزعجتك المشاكل التالية؟",
    items: [
      "الشعور بالعصبية أو القلق أو التوتر",
      "عدم القدرة على إيقاف القلق أو السيطرة عليه",
      "القلق المفرط حول أشياء كثيرة",
      "صعوبة الاسترخاء",
      "التململ بحيث يصعب الجلوس بهدوء",
      "الانزعاج أو الانفعال بسهولة",
      "الشعور بالخوف كأن شيئاً سيئاً سيحدث",
    ],
    scale: freqScale.ar,
  },
  en: {
    name: "GAD-7 — Anxiety Screen",
    description: "Over the last 2 weeks, how often have you been bothered by the following?",
    items: [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless it's hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid as if something awful might happen",
    ],
    scale: freqScale.en,
  },
  interpret(total, lang) {
    const ar = lang === "ar";
    if (total <= 4) return { level: ar ? "بسيط" : "Minimal", advice: ar ? "لا قلق سريري." : "No clinical anxiety." };
    if (total <= 9) return { level: ar ? "خفيف" : "Mild", advice: ar ? "جرّب تقنيات الاسترخاء والتأمل." : "Try relaxation and mindfulness techniques." };
    if (total <= 14) return { level: ar ? "متوسط" : "Moderate", advice: ar ? "زيارة مختص للتقييم." : "Clinician evaluation recommended." };
    return { level: ar ? "شديد" : "Severe", advice: ar ? "تقييم فوري — العلاج النفسي/الدوائي قد يكون لازم." : "Prompt evaluation — therapy/medication may be needed." };
  },
};

export const PCL5: ScaleTest = {
  id: "pcl5", maxPerItem: 4,
  ar: {
    name: "PCL-5 — اضطراب ما بعد الصدمة (مختصر)",
    description: "خلال الشهر الماضي، كم تأثرت بكل مما يلي بسبب حادث صادم؟",
    items: [
      "ذكريات متكررة ومزعجة للحدث",
      "كوابيس مزعجة عن الحدث",
      "الشعور وكأن الحدث يحدث من جديد",
      "ضيق عند ما يذكّرك بالحدث",
      "ردود فعل جسدية قوية (تعرق، خفقان) عند التذكير",
      "تجنّب الأفكار والمشاعر المتعلقة بالحدث",
      "تجنّب الأشخاص أو الأماكن المتعلقة بالحدث",
      "مشاكل في تذكّر تفاصيل مهمة عن الحدث",
      "آراء سلبية قوية عن نفسك أو العالم",
      "لوم النفس أو الآخرين بشكل مفرط",
      "مشاعر سلبية شديدة (خوف، غضب، عار)",
      "فقدان الاهتمام بالنشاطات",
      "الانعزال عن الناس",
      "صعوبة في الشعور بمشاعر إيجابية",
      "نوبات غضب أو سلوك عدواني",
      "سلوك متهور أو مخاطر",
      "اليقظة المفرطة (دائم التحفّز)",
      "الإجفال بسهولة",
      "صعوبة التركيز",
      "صعوبة في النوم",
    ],
    scale: ["لا شيء", "قليلاً", "متوسط", "كثيراً", "شديد جداً"],
  },
  en: {
    name: "PCL-5 — PTSD Checklist",
    description: "In the past month, how much were you bothered by each below in relation to a traumatic event?",
    items: [
      "Repeated, disturbing memories of the event",
      "Disturbing dreams of the event",
      "Feeling as if the event were happening again",
      "Feeling upset when reminded of it",
      "Strong physical reactions (sweating, pounding heart) when reminded",
      "Avoiding thoughts/feelings related to the event",
      "Avoiding people/places related to it",
      "Trouble remembering important parts of it",
      "Strong negative beliefs about self or world",
      "Blaming yourself or others excessively",
      "Strong negative emotions (fear, anger, shame)",
      "Loss of interest in activities",
      "Feeling distant from others",
      "Trouble experiencing positive feelings",
      "Irritable behavior or angry outbursts",
      "Risky or reckless behavior",
      "Being 'super-alert' or watchful",
      "Feeling jumpy / easily startled",
      "Difficulty concentrating",
      "Trouble sleeping",
    ],
    scale: ["Not at all", "A little", "Moderately", "Quite a bit", "Extremely"],
  },
  interpret(total, lang) {
    const ar = lang === "ar";
    if (total < 33) return { level: ar ? "تحت الحد التشخيصي" : "Below clinical threshold", advice: ar ? "أعراض موجودة لكن أقل من حد PTSD المحتمل." : "Symptoms present but below probable-PTSD threshold." };
    return { level: ar ? "محتمل PTSD" : "Probable PTSD", advice: ar ? "يُنصح بشدة بمراجعة مختص في الصدمات — EMDR/CBT-TF." : "Strongly recommend trauma specialist — EMDR/TF-CBT." };
  },
};

// MBTI screening (short, indicative — not the licensed instrument).
export interface MBTIQuestion { ar: string; en: string; dim: "EI" | "SN" | "TF" | "JP"; A: string /* first letter favors */ }
export const MBTI_QUESTIONS: MBTIQuestion[] = [
  { dim: "EI", A: "E", ar: "تكتسب طاقتك من الجلوس مع الناس أكثر من الوحدة.", en: "I get energy from being around people more than alone." },
  { dim: "EI", A: "E", ar: "تتكلم عادة قبل أن تفكر بشكل كامل.", en: "I tend to speak before fully thinking it through." },
  { dim: "EI", A: "I", ar: "تحتاج وقتاً وحدك لإعادة شحن طاقتك.", en: "I need alone time to recharge." },
  { dim: "SN", A: "S", ar: "تثق في التفاصيل والحقائق أكثر من الحدس.", en: "I trust details and facts more than intuition." },
  { dim: "SN", A: "N", ar: "تفضّل الأفكار الكبيرة والاحتمالات على التفاصيل.", en: "I prefer big ideas and possibilities over specifics." },
  { dim: "SN", A: "N", ar: "تركّز على المستقبل أكثر من الحاضر.", en: "I focus on the future more than the present." },
  { dim: "TF", A: "T", ar: "تأخذ قراراتك بناءً على المنطق أكثر من المشاعر.", en: "I decide based on logic more than feelings." },
  { dim: "TF", A: "F", ar: "تنحاز لما يحافظ على مشاعر الناس.", en: "I lean toward what protects people's feelings." },
  { dim: "TF", A: "F", ar: "تتأثر بسهولة عندما يحزن من حولك.", en: "I'm easily affected when others are upset." },
  { dim: "JP", A: "J", ar: "تفضّل التخطيط على المرونة.", en: "I prefer planning over flexibility." },
  { dim: "JP", A: "P", ar: "تتأقلم بسهولة مع تغيير الخطط.", en: "I adapt easily to plan changes." },
  { dim: "JP", A: "J", ar: "تشعر بالراحة بعد إغلاق المهام.", en: "I feel relief after closing tasks." },
];

export function scoreMBTI(answers: ("A" | "B")[]): string {
  const tally: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  MBTI_QUESTIONS.forEach((q, i) => {
    const ans = answers[i];
    if (!ans) return;
    const opp = q.dim === "EI" ? (q.A === "E" ? "I" : "E") : q.dim === "SN" ? (q.A === "S" ? "N" : "S") : q.dim === "TF" ? (q.A === "T" ? "F" : "T") : (q.A === "J" ? "P" : "J");
    tally[ans === "A" ? q.A : opp] += 1;
  });
  return (tally.E >= tally.I ? "E" : "I") + (tally.S >= tally.N ? "S" : "N") + (tally.T >= tally.F ? "T" : "F") + (tally.J >= tally.P ? "J" : "P");
}

export const MBTI_DESCRIPTIONS: Record<string, { ar: string; en: string }> = {
  INTJ: { ar: "المعماري — استراتيجي ومستقل.", en: "The Architect — strategic and independent." },
  INTP: { ar: "المفكر — تحليلي ومبتكر.", en: "The Thinker — analytical and inventive." },
  ENTJ: { ar: "القائد — جريء وقيادي.", en: "The Commander — bold and decisive leader." },
  ENTP: { ar: "المناظر — مبدع وفضولي.", en: "The Debater — creative and curious." },
  INFJ: { ar: "المُحامي — هادئ ومثالي.", en: "The Advocate — quiet idealist." },
  INFP: { ar: "الوسيط — حالم ومتعاطف.", en: "The Mediator — dreamer and empathetic." },
  ENFJ: { ar: "البطل — ملهم وحساس للناس.", en: "The Protagonist — inspiring and people-aware." },
  ENFP: { ar: "الناشط — حماسي ومتحمس.", en: "The Campaigner — enthusiastic free spirit." },
  ISTJ: { ar: "اللوجيستي — موثوق ومنظم.", en: "The Logistician — reliable and orderly." },
  ISFJ: { ar: "المدافع — دافئ ومخلص.", en: "The Defender — warm and devoted." },
  ESTJ: { ar: "المنفذ — حازم ومنظم.", en: "The Executive — firm and organized." },
  ESFJ: { ar: "القنصل — اجتماعي ومسؤول.", en: "The Consul — sociable and responsible." },
  ISTP: { ar: "الحرفي — عملي ومستكشف.", en: "The Virtuoso — practical and exploratory." },
  ISFP: { ar: "المغامر — فنان ولطيف.", en: "The Adventurer — artist and gentle." },
  ESTP: { ar: "المُقدام — نشط ومحب للمخاطرة.", en: "The Entrepreneur — energetic risk-taker." },
  ESFP: { ar: "المؤدي — مرح واجتماعي.", en: "The Entertainer — fun and sociable." },
};
