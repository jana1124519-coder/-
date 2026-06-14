// Sample directory of mental-health professionals & booking lines.
// NEVER fabricate private numbers — these are official hotlines & public clinic lines.
// User can extend `THERAPISTS` with the doctor numbers they will provide.

export interface Therapist {
  id: string;
  name: { ar: string; en: string };
  specialty: { ar: string; en: string };
  city: { ar: string; en: string };
  country: string;
  phone?: string;
  whatsapp?: string;
  bookingUrl?: string;
  languages: string[];
  fee?: string;
  online: boolean;
}

export const THERAPISTS: Therapist[] = [
  // (Add real doctor entries here when provided)
];

export interface MentalHotline {
  country: string;
  countryAr: string;
  name: { ar: string; en: string };
  phone: string;
  hours: { ar: string; en: string };
  url?: string;
}

export const MENTAL_HOTLINES: MentalHotline[] = [
  { country: "Egypt", countryAr: "مصر",
    name: { ar: "خط نجدة الصحة النفسية — وزارة الصحة", en: "Mental Health Hotline — MoH" },
    phone: "08008880700", hours: { ar: "24/7 مجاناً", en: "24/7 free" } },
  { country: "Saudi Arabia", countryAr: "السعودية",
    name: { ar: "مركز الأمل للصحة النفسية", en: "Al Amal Mental Health Center" },
    phone: "920033360", hours: { ar: "8ص - 10م", en: "8am - 10pm" } },
  { country: "UAE", countryAr: "الإمارات",
    name: { ar: "خط الأمل النفسي", en: "Estijaba Mental Support" },
    phone: "8004673", hours: { ar: "24/7", en: "24/7" } },
  { country: "Jordan", countryAr: "الأردن",
    name: { ar: "خط الدعم النفسي — وزارة الصحة", en: "MoH Psychological Support" },
    phone: "110", hours: { ar: "24/7", en: "24/7" } },
  { country: "Morocco", countryAr: "المغرب",
    name: { ar: "SOS Détresse Maroc", en: "SOS Détresse Maroc" },
    phone: "0801007010", hours: { ar: "10ص - 10م", en: "10am - 10pm" } },
  { country: "USA", countryAr: "الولايات المتحدة",
    name: { ar: "خط منع الانتحار", en: "988 Suicide & Crisis Lifeline" },
    phone: "988", hours: { ar: "24/7", en: "24/7" }, url: "https://988lifeline.org" },
  { country: "UK", countryAr: "بريطانيا",
    name: { ar: "Samaritans", en: "Samaritans" },
    phone: "116123", hours: { ar: "24/7", en: "24/7" }, url: "https://www.samaritans.org" },
  { country: "Canada", countryAr: "كندا",
    name: { ar: "Talk Suicide Canada", en: "Talk Suicide Canada" },
    phone: "1-833-456-4566", hours: { ar: "24/7", en: "24/7" } },
  { country: "Germany", countryAr: "ألمانيا",
    name: { ar: "Telefonseelsorge", en: "Telefonseelsorge" },
    phone: "08001110111", hours: { ar: "24/7", en: "24/7" } },
];

export const ONLINE_BOOKING = [
  { name: "Shezlong (شيزلونج)", url: "https://shezlong.com", desc: { ar: "حجز معالج نفسي عبر الإنترنت بالعربية", en: "Online Arabic therapy booking" }, regions: ["MENA"] },
  { name: "Labayh (لبيه)", url: "https://labayh.net", desc: { ar: "استشارات نفسية عربية عن بُعد", en: "Arabic remote counseling" }, regions: ["MENA"] },
  { name: "O7 Therapy", url: "https://o7therapy.com", desc: { ar: "معالجين معتمدين بمصر والخليج", en: "Licensed therapists Egypt & Gulf" }, regions: ["MENA"] },
  { name: "BetterHelp", url: "https://www.betterhelp.com", desc: { ar: "أكبر منصة علاج نفسي عالمياً", en: "Largest global online therapy platform" }, regions: ["Global"] },
  { name: "Talkspace", url: "https://www.talkspace.com", desc: { ar: "علاج نفسي بالنص والفيديو", en: "Text & video therapy" }, regions: ["US", "Global"] },
];
