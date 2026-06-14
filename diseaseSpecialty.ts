// Maps disease id → recommended doctor specialty + suggested lab/diagnostic tests.
// Used in the disease detail page to show users which doctor to see and which tests to do.
import type { SpecialtyToken } from "./medicalCouncils";
import type { Category } from "./diseases";

export const DISEASE_SPECIALTY: Record<string, SpecialtyToken> = {
  "diabetes-type-2": "endocrinology",
  "diabetes-type-1": "endocrinology",
  hypertension: "cardiology",
  asthma: "pulmonology",
  migraine: "neurology",
  gastritis: "gastroenterology",
  "anemia-iron": "hematology",
  "epilepsy-seizure": "neurology",
  "heart-attack": "cardiology",
  stroke: "neurology",
  anaphylaxis: "allergy_immunology",
  choking: "emergency_medicine",
  "severe-bleeding": "emergency_medicine",
  burns: "emergency_medicine",
  "down-syndrome": "pediatrics",
  "cystic-fibrosis": "pulmonology",
  autism: "psychiatry",
  adhd: "psychiatry",
  schizophrenia: "psychiatry",
  depression: "psychiatry",
  anxiety: "psychiatry",
  ptsd: "psychiatry",
  ocd: "psychiatry",
  bipolar: "psychiatry",
};

const CATEGORY_FALLBACK: Record<Category, SpecialtyToken> = {
  common: "general_practitioner",
  rare: "internal_medicine",
  genetic: "pediatrics",
  mental: "psychiatry",
  emergency: "emergency_medicine",
};

export function specialtyFor(id: string, category: Category): SpecialtyToken {
  return DISEASE_SPECIALTY[id] ?? CATEGORY_FALLBACK[category];
}

// Generic diagnostic tests fallback by specialty when disease has no `diagnosis` field.
export const SPECIALTY_TESTS: Partial<Record<SpecialtyToken, { ar: string[]; en: string[] }>> = {
  endocrinology: {
    ar: ["سكر صائم", "HbA1c", "وظائف الغدة الدرقية TSH", "بروفايل دهون"],
    en: ["Fasting glucose", "HbA1c", "TSH thyroid panel", "Lipid profile"],
  },
  cardiology: {
    ar: ["رسم قلب ECG", "إيكو قلب", "بروفايل دهون", "تروبونين عند الألم", "اختبار جهد"],
    en: ["ECG", "Echocardiogram", "Lipid profile", "Troponin (if pain)", "Stress test"],
  },
  pulmonology: {
    ar: ["وظائف رئة Spirometry", "أشعة صدر", "غازات الدم", "مسحة بصاق عند العدوى"],
    en: ["Spirometry", "Chest X-ray", "Arterial blood gases", "Sputum culture if infection"],
  },
  neurology: {
    ar: ["رنين مغناطيسي للمخ MRI", "رسم مخ EEG", "تحاليل دم شاملة", "فحص عصبي إكلينيكي"],
    en: ["Brain MRI", "EEG", "Complete blood panel", "Clinical neuro exam"],
  },
  gastroenterology: {
    ar: ["تحليل جرثومة المعدة H. pylori", "منظار معدة", "وظائف كبد", "صورة دم كاملة"],
    en: ["H. pylori test", "Upper endoscopy", "Liver function", "CBC"],
  },
  hematology: {
    ar: ["صورة دم كاملة CBC", "فيريتين وحديد", "فيتامين B12 وحمض فوليك", "تحليل ترسيب"],
    en: ["CBC", "Ferritin & serum iron", "B12 & folate", "ESR"],
  },
  psychiatry: {
    ar: ["تقييم نفسي إكلينيكي", "PHQ-9 للاكتئاب", "GAD-7 للقلق", "استبعاد سبب عضوي (TSH، B12)"],
    en: ["Clinical psych assessment", "PHQ-9 depression", "GAD-7 anxiety", "Rule out organic (TSH, B12)"],
  },
  pediatrics: {
    ar: ["فحص نمو شامل", "كاريوتايب للوراثيات", "سمع وبصر", "متابعة منحنيات النمو"],
    en: ["Developmental screening", "Karyotype if genetic", "Hearing & vision", "Growth charts"],
  },
  allergy_immunology: {
    ar: ["اختبار وخز الجلد Skin prick", "IgE نوعي بالدم", "اختبار إثارة طبي مراقب"],
    en: ["Skin prick test", "Specific IgE blood test", "Supervised challenge test"],
  },
  emergency_medicine: {
    ar: ["تقييم سريع ABCDE", "علامات حيوية", "أشعة/CT حسب الإصابة"],
    en: ["Rapid ABCDE assessment", "Vital signs", "Imaging per injury"],
  },
  general_practitioner: {
    ar: ["فحص سريري", "صورة دم كاملة", "تحاليل أساسية حسب الأعراض"],
    en: ["Clinical exam", "CBC", "Basic labs per symptoms"],
  },
  internal_medicine: {
    ar: ["باقة تحاليل شاملة", "فحوصات وظيفية للأعضاء", "تصوير حسب الحاجة"],
    en: ["Comprehensive metabolic panel", "Organ function tests", "Imaging as needed"],
  },
};
