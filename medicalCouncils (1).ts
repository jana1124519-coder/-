// Mapping from AI-suggested specialty tokens to localized names + recommended action.
// Used by ChatUI to render a CTA when the AI suggests a doctor specialty.

export type SpecialtyToken =
  | "general_practitioner" | "internal_medicine" | "cardiology" | "neurology"
  | "pulmonology" | "gastroenterology" | "endocrinology" | "nephrology"
  | "rheumatology" | "hematology" | "oncology" | "infectious_disease"
  | "dermatology" | "ophthalmology" | "ent" | "orthopedics" | "urology"
  | "gynecology" | "obstetrics" | "pediatrics" | "psychiatry" | "psychology"
  | "emergency_medicine" | "general_surgery" | "neurosurgery" | "plastic_surgery"
  | "dentistry" | "allergy_immunology" | "geriatrics" | "physical_medicine";

export const SPECIALTY_LABELS: Record<SpecialtyToken, { ar: string; en: string }> = {
  general_practitioner: { ar: "طبيب عام", en: "General Practitioner" },
  internal_medicine: { ar: "باطنة", en: "Internal Medicine" },
  cardiology: { ar: "قلب وأوعية", en: "Cardiology" },
  neurology: { ar: "أعصاب", en: "Neurology" },
  pulmonology: { ar: "صدرية", en: "Pulmonology" },
  gastroenterology: { ar: "جهاز هضمي", en: "Gastroenterology" },
  endocrinology: { ar: "غدد صماء", en: "Endocrinology" },
  nephrology: { ar: "كلى", en: "Nephrology" },
  rheumatology: { ar: "روماتيزم", en: "Rheumatology" },
  hematology: { ar: "أمراض الدم", en: "Hematology" },
  oncology: { ar: "أورام", en: "Oncology" },
  infectious_disease: { ar: "أمراض معدية", en: "Infectious Diseases" },
  dermatology: { ar: "جلدية", en: "Dermatology" },
  ophthalmology: { ar: "عيون", en: "Ophthalmology" },
  ent: { ar: "أنف وأذن وحنجرة", en: "ENT" },
  orthopedics: { ar: "عظام", en: "Orthopedics" },
  urology: { ar: "مسالك بولية", en: "Urology" },
  gynecology: { ar: "نساء", en: "Gynecology" },
  obstetrics: { ar: "توليد", en: "Obstetrics" },
  pediatrics: { ar: "أطفال", en: "Pediatrics" },
  psychiatry: { ar: "طب نفسي", en: "Psychiatry" },
  psychology: { ar: "أخصائي نفسي", en: "Psychology" },
  emergency_medicine: { ar: "طوارئ", en: "Emergency Medicine" },
  general_surgery: { ar: "جراحة عامة", en: "General Surgery" },
  neurosurgery: { ar: "جراحة مخ وأعصاب", en: "Neurosurgery" },
  plastic_surgery: { ar: "جراحة تجميل", en: "Plastic Surgery" },
  dentistry: { ar: "أسنان", en: "Dentistry" },
  allergy_immunology: { ar: "حساسية ومناعة", en: "Allergy & Immunology" },
  geriatrics: { ar: "كبار السن", en: "Geriatrics" },
  physical_medicine: { ar: "علاج طبيعي", en: "Physical Medicine" },
};

// Trusted booking/directory platforms by region.
export const BOOKING_PLATFORMS = [
  { name: "Vezeeta", url: "https://www.vezeeta.com", regions: ["arab"] as const, desc: { ar: "حجز أطباء — مصر، السعودية، الأردن، لبنان", en: "Book doctors — Egypt, Saudi, Jordan, Lebanon" } },
  { name: "Altibbi", url: "https://altibbi.com", regions: ["arab"] as const, desc: { ar: "استشارات طبية أونلاين عربية", en: "Arabic online medical consultations" } },
  { name: "Doctolib", url: "https://www.doctolib.fr", regions: ["europe"] as const, desc: { ar: "حجز أطباء — فرنسا، ألمانيا، إيطاليا", en: "Book doctors — France, Germany, Italy" } },
  { name: "Zocdoc", url: "https://www.zocdoc.com", regions: ["americas"] as const, desc: { ar: "حجز أطباء — الولايات المتحدة", en: "Book doctors — United States" } },
  { name: "Practo", url: "https://www.practo.com", regions: ["asia"] as const, desc: { ar: "حجز أطباء — الهند والمنطقة", en: "Book doctors — India & region" } },
  { name: "Halodoc", url: "https://www.halodoc.com", regions: ["asia"] as const, desc: { ar: "تطبيب عن بُعد — إندونيسيا", en: "Telemedicine — Indonesia" } },
  { name: "MyDoc.com.ph", url: "https://mydoc.com.ph", regions: ["asia"] as const, desc: { ar: "حجز أطباء — الفلبين", en: "Book doctors — Philippines" } },
  { name: "Goodoc", url: "https://www.goodoc.co.kr", regions: ["asia"] as const, desc: { ar: "حجز أطباء — كوريا الجنوبية", en: "Book doctors — South Korea" } },
  { name: "Caloo", url: "https://caloo.jp", regions: ["asia"] as const, desc: { ar: "حجز أطباء — اليابان", en: "Book doctors — Japan" } },
  { name: "HealthEngine", url: "https://healthengine.com.au", regions: ["oceania"] as const, desc: { ar: "حجز أطباء — أستراليا", en: "Book doctors — Australia" } },
  { name: "Babylon Health", url: "https://www.babylonhealth.com", regions: ["europe", "africa"] as const, desc: { ar: "تطبيب عن بُعد — المملكة المتحدة وأفريقيا", en: "Telemedicine — UK & Africa" } },
];

// Official medical councils per country (the verified, public regulator/syndicate).
// Selected list — the most commonly searched. Doctors verify their license here.
export interface MedicalCouncil {
  country: string;
  countryAr: string;
  flag: string;
  name: string;
  url: string;
  region: "arab" | "africa" | "asia" | "europe" | "americas" | "oceania";
}

export const medicalCouncils: MedicalCouncil[] = [
  // Arab
  { country: "Egypt", countryAr: "مصر", flag: "🇪🇬", name: "Egyptian Medical Syndicate", url: "https://www.ems.org.eg", region: "arab" },
  { country: "Saudi Arabia", countryAr: "السعودية", flag: "🇸🇦", name: "Saudi Commission for Health Specialties", url: "https://www.scfhs.org.sa", region: "arab" },
  { country: "United Arab Emirates", countryAr: "الإمارات", flag: "🇦🇪", name: "UAE Ministry of Health", url: "https://mohap.gov.ae", region: "arab" },
  { country: "Kuwait", countryAr: "الكويت", flag: "🇰🇼", name: "Kuwait Medical Association", url: "https://kma.org.kw", region: "arab" },
  { country: "Qatar", countryAr: "قطر", flag: "🇶🇦", name: "Qatar Council for Healthcare Practitioners", url: "https://www.qchp.org.qa", region: "arab" },
  { country: "Bahrain", countryAr: "البحرين", flag: "🇧🇭", name: "NHRA Bahrain", url: "https://www.nhra.bh", region: "arab" },
  { country: "Oman", countryAr: "عُمان", flag: "🇴🇲", name: "Oman Medical Specialty Board", url: "https://omsb.gov.om", region: "arab" },
  { country: "Jordan", countryAr: "الأردن", flag: "🇯🇴", name: "Jordan Medical Association", url: "https://www.jma.org.jo", region: "arab" },
  { country: "Lebanon", countryAr: "لبنان", flag: "🇱🇧", name: "Lebanese Order of Physicians", url: "https://www.lop.org.lb", region: "arab" },
  { country: "Iraq", countryAr: "العراق", flag: "🇮🇶", name: "Iraqi Medical Association", url: "https://www.iraqimedicalassoc.org", region: "arab" },
  { country: "Morocco", countryAr: "المغرب", flag: "🇲🇦", name: "Conseil National de l'Ordre des Médecins", url: "https://www.ordredesmedecins.ma", region: "arab" },
  { country: "Algeria", countryAr: "الجزائر", flag: "🇩🇿", name: "Conseil National de l'Ordre des Médecins", url: "https://www.cnom-dz.org", region: "arab" },
  { country: "Tunisia", countryAr: "تونس", flag: "🇹🇳", name: "Conseil National de l'Ordre des Médecins", url: "https://www.ordre-medecins.org.tn", region: "arab" },
  { country: "Sudan", countryAr: "السودان", flag: "🇸🇩", name: "Sudan Medical Council", url: "https://smcsud.com", region: "arab" },
  // Europe
  { country: "United Kingdom", countryAr: "المملكة المتحدة", flag: "🇬🇧", name: "General Medical Council (GMC)", url: "https://www.gmc-uk.org", region: "europe" },
  { country: "France", countryAr: "فرنسا", flag: "🇫🇷", name: "Conseil National de l'Ordre des Médecins", url: "https://www.conseil-national.medecin.fr", region: "europe" },
  { country: "Germany", countryAr: "ألمانيا", flag: "🇩🇪", name: "Bundesärztekammer", url: "https://www.bundesaerztekammer.de", region: "europe" },
  { country: "Italy", countryAr: "إيطاليا", flag: "🇮🇹", name: "FNOMCeO", url: "https://portale.fnomceo.it", region: "europe" },
  { country: "Spain", countryAr: "إسبانيا", flag: "🇪🇸", name: "Consejo General de Médicos", url: "https://www.cgcom.es", region: "europe" },
  { country: "Netherlands", countryAr: "هولندا", flag: "🇳🇱", name: "BIG-register", url: "https://www.bigregister.nl", region: "europe" },
  { country: "Greece", countryAr: "اليونان", flag: "🇬🇷", name: "Panhellenic Medical Association", url: "https://www.pis.gr", region: "europe" },
  { country: "Portugal", countryAr: "البرتغال", flag: "🇵🇹", name: "Ordem dos Médicos", url: "https://ordemdosmedicos.pt", region: "europe" },
  { country: "Switzerland", countryAr: "سويسرا", flag: "🇨🇭", name: "FMH", url: "https://www.fmh.ch", region: "europe" },
  { country: "Sweden", countryAr: "السويد", flag: "🇸🇪", name: "Socialstyrelsen", url: "https://www.socialstyrelsen.se", region: "europe" },
  { country: "Norway", countryAr: "النرويج", flag: "🇳🇴", name: "Helsedirektoratet", url: "https://www.helsedirektoratet.no", region: "europe" },
  { country: "Belgium", countryAr: "بلجيكا", flag: "🇧🇪", name: "Ordre des Médecins", url: "https://ordomedic.be", region: "europe" },
  { country: "Ireland", countryAr: "أيرلندا", flag: "🇮🇪", name: "Medical Council of Ireland", url: "https://www.medicalcouncil.ie", region: "europe" },
  { country: "Poland", countryAr: "بولندا", flag: "🇵🇱", name: "Naczelna Izba Lekarska", url: "https://nil.org.pl", region: "europe" },
  { country: "Russia", countryAr: "روسيا", flag: "🇷🇺", name: "Russian Medical Society", url: "https://www.rosmedlib.ru", region: "europe" },
  { country: "Turkey", countryAr: "تركيا", flag: "🇹🇷", name: "Turkish Medical Association", url: "https://www.ttb.org.tr", region: "europe" },
  // Americas
  { country: "United States", countryAr: "الولايات المتحدة", flag: "🇺🇸", name: "American Medical Association", url: "https://www.ama-assn.org", region: "americas" },
  { country: "Canada", countryAr: "كندا", flag: "🇨🇦", name: "Canadian Medical Association", url: "https://www.cma.ca", region: "americas" },
  { country: "Mexico", countryAr: "المكسيك", flag: "🇲🇽", name: "Comité Normativo Nacional CONAMEGE", url: "https://www.conamege.org.mx", region: "americas" },
  { country: "Brazil", countryAr: "البرازيل", flag: "🇧🇷", name: "Conselho Federal de Medicina", url: "https://portal.cfm.org.br", region: "americas" },
  { country: "Argentina", countryAr: "الأرجنتين", flag: "🇦🇷", name: "Confederación Médica Argentina", url: "https://www.comra.org.ar", region: "americas" },
  { country: "Chile", countryAr: "تشيلي", flag: "🇨🇱", name: "Colegio Médico de Chile", url: "https://www.colegiomedico.cl", region: "americas" },
  { country: "Colombia", countryAr: "كولومبيا", flag: "🇨🇴", name: "Federación Médica Colombiana", url: "https://www.federacionmedicacolombiana.com", region: "americas" },
  // Asia
  { country: "India", countryAr: "الهند", flag: "🇮🇳", name: "National Medical Commission", url: "https://www.nmc.org.in", region: "asia" },
  { country: "China", countryAr: "الصين", flag: "🇨🇳", name: "Chinese Medical Doctor Association", url: "http://www.cmda.net", region: "asia" },
  { country: "Japan", countryAr: "اليابان", flag: "🇯🇵", name: "Japan Medical Association", url: "https://www.med.or.jp", region: "asia" },
  { country: "South Korea", countryAr: "كوريا الجنوبية", flag: "🇰🇷", name: "Korean Medical Association", url: "https://www.kma.org", region: "asia" },
  { country: "Philippines", countryAr: "الفلبين", flag: "🇵🇭", name: "Philippine Medical Association", url: "https://www.philippinemedicalassociation.org", region: "asia" },
  { country: "Indonesia", countryAr: "إندونيسيا", flag: "🇮🇩", name: "Ikatan Dokter Indonesia", url: "https://www.idionline.org", region: "asia" },
  { country: "Vietnam", countryAr: "فيتنام", flag: "🇻🇳", name: "Vietnam Medical Association", url: "http://tonghoiyhoc.vn", region: "asia" },
  { country: "Thailand", countryAr: "تايلاند", flag: "🇹🇭", name: "Medical Council of Thailand", url: "https://www.tmc.or.th", region: "asia" },
  { country: "Pakistan", countryAr: "باكستان", flag: "🇵🇰", name: "Pakistan Medical & Dental Council", url: "https://www.pmdc.pk", region: "asia" },
  { country: "Bangladesh", countryAr: "بنغلاديش", flag: "🇧🇩", name: "Bangladesh Medical & Dental Council", url: "https://bmdc.org.bd", region: "asia" },
  { country: "Malaysia", countryAr: "ماليزيا", flag: "🇲🇾", name: "Malaysian Medical Council", url: "https://mmc.gov.my", region: "asia" },
  { country: "Singapore", countryAr: "سنغافورة", flag: "🇸🇬", name: "Singapore Medical Council", url: "https://www.healthprofessionals.gov.sg", region: "asia" },
  { country: "Iran", countryAr: "إيران", flag: "🇮🇷", name: "Iranian Medical Council", url: "https://irimc.org", region: "asia" },
  // Africa
  { country: "South Africa", countryAr: "جنوب أفريقيا", flag: "🇿🇦", name: "Health Professions Council of SA", url: "https://www.hpcsa.co.za", region: "africa" },
  { country: "Nigeria", countryAr: "نيجيريا", flag: "🇳🇬", name: "Medical & Dental Council of Nigeria", url: "https://portal.mdcn.gov.ng", region: "africa" },
  { country: "Kenya", countryAr: "كينيا", flag: "🇰🇪", name: "Kenya Medical Practitioners & Dentists Council", url: "https://kmpdc.go.ke", region: "africa" },
  { country: "Ethiopia", countryAr: "إثيوبيا", flag: "🇪🇹", name: "Ethiopian Medical Association", url: "https://emaeph.org", region: "africa" },
  { country: "Ghana", countryAr: "غانا", flag: "🇬🇭", name: "Medical & Dental Council Ghana", url: "https://mdcghana.org", region: "africa" },
  { country: "Tanzania", countryAr: "تنزانيا", flag: "🇹🇿", name: "Medical Council of Tanganyika", url: "https://mct.go.tz", region: "africa" },
  // Oceania
  { country: "Australia", countryAr: "أستراليا", flag: "🇦🇺", name: "Australian Medical Association", url: "https://www.ama.com.au", region: "oceania" },
  { country: "New Zealand", countryAr: "نيوزيلندا", flag: "🇳🇿", name: "Medical Council of New Zealand", url: "https://www.mcnz.org.nz", region: "oceania" },
];
