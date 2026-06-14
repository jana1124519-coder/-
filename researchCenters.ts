// Public research centers & how to refer / submit samples.
export interface ResearchCenter {
  id: string;
  name: { ar: string; en: string };
  country: string;
  city: { ar: string; en: string };
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  address?: { ar: string; en: string };
  services: { ar: string[]; en: string[] };
  howToRefer: { ar: string; en: string };
  hours: { ar: string; en: string };
}

export const RESEARCH_CENTERS: ResearchCenter[] = [
  {
    id: "nrc-egypt",
    name: { ar: "المركز القومي للبحوث — مصر", en: "National Research Centre (NRC) — Egypt" },
    country: "Egypt",
    city: { ar: "القاهرة - الدقي", en: "Cairo - Dokki" },
    phone: "+20 2 33371010",
    fax: "+20 2 33370931",
    email: "info@nrc.sci.eg",
    website: "https://www.nrc.sci.eg",
    address: { ar: "33 شارع البحوث، الدقي، الجيزة 12622", en: "33 El-Bohouth St., Dokki, Giza 12622" },
    services: {
      ar: ["تحاليل جينية متقدمة", "فحوص نادرة (الأمراض الوراثية)", "علم السموم", "تحاليل بيئية وغذائية", "بحوث الأدوية", "تحاليل المعادن الثقيلة"],
      en: ["Advanced genetic testing", "Rare-disease panels", "Toxicology", "Food & environment analysis", "Pharma research", "Heavy metals"],
    },
    howToRefer: {
      ar: "الإحالة عبر طبيبك المعالج بطلب رسمي مختوم يوضح التشخيص المبدئي والفحص المطلوب. تواصل أولاً على 33371010 لحجز موعد، احضر الطلب وبطاقة الرقم القومي ودفع الرسوم بالاستقبال (المبنى الإداري). نتائج الفحوص الجينية: 3-6 أسابيع.",
      en: "Referral by your physician with a stamped request stating tentative diagnosis & required test. Call 33371010 to book, bring the referral, ID, and pay fees at the admin building reception. Genetic results: 3-6 weeks.",
    },
    hours: { ar: "الأحد-الخميس 9ص - 3م", en: "Sun-Thu 9am - 3pm" },
  },
  {
    id: "vacsera-egypt",
    name: { ar: "فاكسيرا (الهيئة المصرية للقاحات والأمصال)", en: "VACSERA — Egyptian Vaccine & Sera Authority" },
    country: "Egypt",
    city: { ar: "القاهرة - الجيزة", en: "Cairo - Giza" },
    phone: "+20 2 37489251",
    website: "https://www.vacsera.com",
    services: { ar: ["لقاحات", "أمصال ضد لدغات الثعابين والعقارب", "تحاليل أمصال متخصصة"], en: ["Vaccines", "Snake & scorpion antivenoms", "Specialized serology"] },
    howToRefer: {
      ar: "للأمصال الطارئة (لدغات): التوجه مباشرة لأقرب مستشفى حكومي ثم تحويل لفاكسيرا. للقاحات الروتينية: مراكز صحة الأم والطفل.",
      en: "For emergency antivenoms: go to nearest gov hospital → VACSERA referral. Routine vaccines via MCH centers.",
    },
    hours: { ar: "24/7 لقسم الطوارئ", en: "24/7 emergency unit" },
  },
  {
    id: "kfshrc-saudi",
    name: { ar: "مستشفى الملك فيصل التخصصي ومركز الأبحاث", en: "King Faisal Specialist Hospital & Research Centre" },
    country: "Saudi Arabia",
    city: { ar: "الرياض / جدة", en: "Riyadh / Jeddah" },
    phone: "+966 11 4647272",
    website: "https://www.kfshrc.edu.sa",
    services: { ar: ["زراعة الأعضاء", "علاج الأورام", "بحوث الجينوم", "العلاج الإشعاعي الذري"], en: ["Organ transplant", "Oncology", "Genomics research", "Proton therapy"] },
    howToRefer: {
      ar: "عبر برنامج الإحالة الإلكتروني E-Referral من المستشفى المعالج، أو بريد الإحالات referrals@kfshrc.edu.sa مع كل التقارير الطبية.",
      en: "Via E-Referral system from your hospital, or email referrals@kfshrc.edu.sa with full medical records.",
    },
    hours: { ar: "24/7", en: "24/7" },
  },
  {
    id: "57357-egypt",
    name: { ar: "مستشفى 57357 لسرطان الأطفال", en: "Children's Cancer Hospital 57357" },
    country: "Egypt",
    city: { ar: "القاهرة - السيدة زينب", en: "Cairo - Sayeda Zeinab" },
    phone: "+20 2 25351500",
    website: "https://www.57357.org",
    services: { ar: ["تشخيص وعلاج سرطانات الأطفال مجاناً", "أبحاث جزيئية للأورام", "زراعة نخاع عظم"], en: ["Free pediatric oncology", "Molecular tumor research", "Bone marrow transplant"] },
    howToRefer: {
      ar: "احجز كشف عبر الموقع الإلكتروني أو 16602. احضر تقارير الطبيب + التحاليل + شرائح الباثولوجي. القبول حسب توافق الحالة.",
      en: "Book via website or 16602. Bring physician reports + labs + pathology slides. Acceptance per case fit.",
    },
    hours: { ar: "9ص - 5م يومياً", en: "Daily 9am - 5pm" },
  },
  {
    id: "magdi-yacoub",
    name: { ar: "مؤسسة مجدي يعقوب لأمراض وأبحاث القلب", en: "Magdi Yacoub Heart Foundation" },
    country: "Egypt",
    city: { ar: "أسوان / القاهرة", en: "Aswan / Cairo" },
    phone: "+20 97 2480000",
    website: "https://www.myf.org.eg",
    services: { ar: ["جراحات القلب المفتوح للأطفال والكبار مجاناً", "قسطرة قلبية", "أبحاث أمراض القلب الوراثية"], en: ["Free open heart surgery", "Cardiac catheterization", "Inherited cardiac research"] },
    howToRefer: {
      ar: "أرسل تقرير الطبيب + ايكو القلب + إيكو دوبلر عبر الموقع. سيُتم تقييم الحالة خلال 2-4 أسابيع وتُستدعى للجراحة بدون تكلفة.",
      en: "Submit physician report + echo + Doppler via website. Case reviewed in 2-4 weeks, free surgery if accepted.",
    },
    hours: { ar: "السبت - الخميس 8ص - 4م", en: "Sat-Thu 8am - 4pm" },
  },
  {
    id: "who-collab-jordan",
    name: { ar: "المركز الوطني الأردني لمكافحة السرطان (KHCC)", en: "King Hussein Cancer Center" },
    country: "Jordan",
    city: { ar: "عمّان", en: "Amman" },
    phone: "+962 6 5300460",
    website: "https://www.khcc.jo",
    services: { ar: ["علاج كل أنواع الأورام", "أبحاث سريرية تجريبية", "زراعة نخاع"], en: ["All-cancer care", "Clinical trials", "Bone marrow transplant"] },
    howToRefer: { ar: "ادخل على /referral وأرسل ملفك الطبي. مقبول من جميع الدول العربية.", en: "Submit medical file via /referral. Accepts patients from all Arab countries." },
    hours: { ar: "24/7", en: "24/7" },
  },
];
