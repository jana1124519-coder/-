// Common OTC + prescription medications with interactions and side effects.
// Educational reference only — not a substitute for a pharmacist or physician.

export interface Medication {
  id: string;
  ar: { name: string; uses: string[]; sideEffects: string[]; interactions: string[]; warnings: string[] };
  en: { name: string; uses: string[]; sideEffects: string[]; interactions: string[]; warnings: string[] };
  category: "analgesic" | "antibiotic" | "antihypertensive" | "antidiabetic" | "psychiatric" | "gastro" | "respiratory" | "cardiac" | "other";
}

export const MEDICATIONS: Medication[] = [
  {
    id: "paracetamol", category: "analgesic",
    ar: {
      name: "باراسيتامول (Paracetamol / Acetaminophen)",
      uses: ["خفض الحرارة", "تسكين الألم الخفيف إلى المتوسط", "صداع", "ألم العضلات"],
      sideEffects: ["نادرة عند الجرعة الصحيحة", "غثيان", "طفح جلدي نادر", "تلف كبدي عند الجرعة الزائدة"],
      interactions: ["الكحول (يزيد خطر تلف الكبد)", "الوارفارين (قد يزيد تأثيره)", "أدوية الصرع (تقلل فعاليته)"],
      warnings: ["لا تتجاوز 4 جرام يومياً للبالغ", "تجنّب مع مرضى الكبد", "اقرأ نسبة المادة في أدوية البرد المركبة"],
    },
    en: {
      name: "Paracetamol (Acetaminophen)",
      uses: ["Fever reduction", "Mild–moderate pain relief", "Headache", "Muscle ache"],
      sideEffects: ["Rare at correct dose", "Nausea", "Rare skin rash", "Liver damage in overdose"],
      interactions: ["Alcohol (↑ liver risk)", "Warfarin (may ↑ INR)", "Anti-epileptics (↓ efficacy)"],
      warnings: ["Max 4 g/day for adults", "Avoid in liver disease", "Check for it in combination cold meds"],
    },
  },
  {
    id: "ibuprofen", category: "analgesic",
    ar: {
      name: "إيبوبروفين (Ibuprofen)",
      uses: ["ألم", "التهاب", "حرارة", "آلام الدورة الشهرية"],
      sideEffects: ["قرحة معدة", "نزيف", "ارتفاع ضغط الدم", "ضرر كلوي", "ربو لدى الحساسين"],
      interactions: ["الأسبرين (↑ نزيف)", "مميعات الدم", "مدرات البول", "مثبطات ACE"],
      warnings: ["تناوله مع الطعام", "تجنّبه في الحمل الأخير", "حذر مع أمراض القلب والكلى"],
    },
    en: {
      name: "Ibuprofen",
      uses: ["Pain", "Inflammation", "Fever", "Menstrual cramps"],
      sideEffects: ["Stomach ulcer", "Bleeding", "↑ Blood pressure", "Kidney damage", "Asthma in sensitive"],
      interactions: ["Aspirin (↑ bleed)", "Blood thinners", "Diuretics", "ACE inhibitors"],
      warnings: ["Take with food", "Avoid in 3rd trimester", "Caution in heart/kidney disease"],
    },
  },
  {
    id: "amoxicillin", category: "antibiotic",
    ar: {
      name: "أموكسيسيلين (Amoxicillin)",
      uses: ["التهابات الأذن", "اللوزتين", "الجيوب الأنفية", "المسالك البولية", "بعض التهابات الجلد"],
      sideEffects: ["إسهال", "غثيان", "طفح جلدي", "حساسية (قد تكون شديدة)", "فطريات الفم"],
      interactions: ["حبوب منع الحمل (تقل فعاليتها)", "ميثوتركسيت", "الوارفارين"],
      warnings: ["أكمل كامل الكورس", "لا تستخدمه دون وصفة", "احذر إذا كان لديك حساسية بنسلين"],
    },
    en: {
      name: "Amoxicillin",
      uses: ["Ear infections", "Tonsillitis", "Sinusitis", "UTI", "Some skin infections"],
      sideEffects: ["Diarrhea", "Nausea", "Rash", "Allergy (can be severe)", "Oral thrush"],
      interactions: ["Oral contraceptives (↓ efficacy)", "Methotrexate", "Warfarin"],
      warnings: ["Finish full course", "Prescription only", "Avoid if penicillin-allergic"],
    },
  },
  {
    id: "metformin", category: "antidiabetic",
    ar: {
      name: "ميتفورمين (Metformin)",
      uses: ["السكري النوع 2", "تكيس المبايض (PCOS)", "مقاومة الأنسولين"],
      sideEffects: ["اضطرابات هضمية", "إسهال", "طعم معدني", "نقص فيتامين B12 على المدى الطويل", "حماض لبني (نادر وخطير)"],
      interactions: ["صبغة الأشعة المقطعية (أوقفه قبلها)", "الكحول", "بعض أدوية الضغط"],
      warnings: ["خذه مع الطعام", "راقب وظائف الكلى", "أوقفه قبل العمليات الكبرى"],
    },
    en: {
      name: "Metformin",
      uses: ["Type 2 diabetes", "PCOS", "Insulin resistance"],
      sideEffects: ["GI upset", "Diarrhea", "Metallic taste", "Long-term B12 deficiency", "Lactic acidosis (rare, serious)"],
      interactions: ["Iodinated contrast (hold before)", "Alcohol", "Some BP meds"],
      warnings: ["Take with meals", "Monitor kidneys", "Hold before major surgery"],
    },
  },
  {
    id: "amlodipine", category: "antihypertensive",
    ar: {
      name: "أملوديبين (Amlodipine)",
      uses: ["ارتفاع ضغط الدم", "الذبحة الصدرية"],
      sideEffects: ["تورم القدمين", "صداع", "احمرار الوجه", "دوخة", "تعب"],
      interactions: ["عصير الجريب فروت (↑ تأثير)", "السيمفاستاتين (حدد الجرعة)", "السيكلوسبورين"],
      warnings: ["لا توقفه فجأة", "راقب الضغط دورياً"],
    },
    en: {
      name: "Amlodipine",
      uses: ["Hypertension", "Angina"],
      sideEffects: ["Ankle swelling", "Headache", "Flushing", "Dizziness", "Fatigue"],
      interactions: ["Grapefruit juice (↑ effect)", "Simvastatin (limit dose)", "Cyclosporine"],
      warnings: ["Do not stop abruptly", "Monitor BP regularly"],
    },
  },
  {
    id: "omeprazole", category: "gastro",
    ar: {
      name: "أوميبرازول (Omeprazole)",
      uses: ["الارتجاع المعدي", "قرحة المعدة", "الحموضة المزمنة"],
      sideEffects: ["صداع", "إسهال أو إمساك", "نقص ماغنسيوم / B12 على المدى الطويل", "هشاشة عظام بطول الاستخدام"],
      interactions: ["كلوبيدوجريل (↓ فعاليته)", "ميثوتركسيت", "الديجوكسين"],
      warnings: ["خذه قبل الإفطار بـ30 دقيقة", "لا تتجاوز 14 يوماً دون استشارة"],
    },
    en: {
      name: "Omeprazole",
      uses: ["GERD", "Stomach ulcer", "Chronic heartburn"],
      sideEffects: ["Headache", "Diarrhea / constipation", "Long-term low Mg / B12", "Osteoporosis with prolonged use"],
      interactions: ["Clopidogrel (↓ efficacy)", "Methotrexate", "Digoxin"],
      warnings: ["Take 30 min before breakfast", "Don't exceed 14 days without advice"],
    },
  },
  {
    id: "salbutamol", category: "respiratory",
    ar: {
      name: "سالبوتامول (Salbutamol / Ventolin)",
      uses: ["نوبات الربو", "ضيق التنفس", "حساسية الصدر"],
      sideEffects: ["خفقان", "رعشة", "صداع", "تشنّج عضلي", "زيادة السكر"],
      interactions: ["حاصرات بيتا (↓ تأثيره)", "مدرات البول (↓ بوتاسيوم)"],
      warnings: ["إذا احتجته أكثر من مرتين أسبوعياً راجع الطبيب — السيطرة سيئة"],
    },
    en: {
      name: "Salbutamol (Albuterol / Ventolin)",
      uses: ["Asthma attacks", "Shortness of breath", "Bronchospasm"],
      sideEffects: ["Palpitations", "Tremor", "Headache", "Muscle cramps", "↑ Blood sugar"],
      interactions: ["Beta-blockers (↓ effect)", "Diuretics (↓ potassium)"],
      warnings: ["If needed >2×/week, see doctor — poor control"],
    },
  },
  {
    id: "atorvastatin", category: "cardiac",
    ar: {
      name: "أتورفاستاتين (Atorvastatin)",
      uses: ["ارتفاع الكولسترول", "الوقاية من النوبات القلبية"],
      sideEffects: ["آلام عضلية", "إنزيمات كبد مرتفعة", "صداع", "اضطراب هضمي", "نادراً: تكسر عضلي (rhabdomyolysis)"],
      interactions: ["الجريب فروت", "مضادات الفطريات (azoles)", "بعض المضادات الحيوية (macrolides)"],
      warnings: ["تجنّب في الحمل", "افحص الكبد دورياً", "أبلغ الطبيب فوراً عن ألم عضلي شديد"],
    },
    en: {
      name: "Atorvastatin",
      uses: ["High cholesterol", "Heart attack prevention"],
      sideEffects: ["Muscle pain", "Elevated liver enzymes", "Headache", "GI upset", "Rare: rhabdomyolysis"],
      interactions: ["Grapefruit", "Azole antifungals", "Some macrolide antibiotics"],
      warnings: ["Avoid in pregnancy", "Periodic liver tests", "Report severe muscle pain immediately"],
    },
  },
  {
    id: "sertraline", category: "psychiatric",
    ar: {
      name: "سيرترالين (Sertraline / Zoloft)",
      uses: ["اكتئاب", "اضطراب القلق", "وسواس قهري", "اضطراب ما بعد الصدمة"],
      sideEffects: ["غثيان أول أسبوعين", "أرق أو نعاس", "اضطراب جنسي", "تعرق", "صداع"],
      interactions: ["مضادات اكتئاب أخرى (متلازمة السيروتونين)", "ترامادول", "وارفارين", "الأسبرين"],
      warnings: ["لا توقفه فجأة", "التأثير الكامل بعد 4–6 أسابيع", "راقب أفكار إيذاء النفس في أول أسابيع للشباب"],
    },
    en: {
      name: "Sertraline (Zoloft)",
      uses: ["Depression", "Anxiety", "OCD", "PTSD"],
      sideEffects: ["Nausea (1st 2 weeks)", "Insomnia/drowsiness", "Sexual dysfunction", "Sweating", "Headache"],
      interactions: ["Other antidepressants (serotonin syndrome)", "Tramadol", "Warfarin", "Aspirin"],
      warnings: ["Don't stop abruptly", "Full effect after 4–6 weeks", "Monitor for self-harm thoughts in youth"],
    },
  },
  {
    id: "warfarin", category: "cardiac",
    ar: {
      name: "وارفارين (Warfarin)",
      uses: ["تخثر الدم", "الرجفان الأذيني", "الجلطات الوريدية", "بعد صمامات القلب"],
      sideEffects: ["نزيف (لثة، أنف، براز أسود)", "كدمات", "تساقط شعر مؤقت"],
      interactions: ["الكثير من الأدوية والأطعمة (الخضار الورقية، الجريب فروت، الأعشاب)", "المضادات الحيوية"],
      warnings: ["افحص INR دورياً", "حافظ على ثبات كمية فيتامين K في الأكل", "أبلغ أي طبيب/طبيب أسنان قبل أي إجراء"],
    },
    en: {
      name: "Warfarin",
      uses: ["Blood clots", "Atrial fibrillation", "DVT/PE", "After heart valve surgery"],
      sideEffects: ["Bleeding (gums, nose, black stool)", "Bruising", "Temporary hair loss"],
      interactions: ["Many drugs and foods (leafy greens, grapefruit, herbs)", "Antibiotics"],
      warnings: ["Regular INR checks", "Keep vitamin K intake stable", "Tell any doctor/dentist before procedures"],
    },
  },
];
