export type Severity = "mild" | "moderate" | "severe" | "critical";
export type Category = "common" | "rare" | "genetic" | "mental" | "emergency";

export interface DiseaseI18n {
  name: string;
  shortDesc: string;
  // Detailed long description (paragraph) used in "Learn more" expansion
  fullDesc?: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  // Detailed treatment explanations (each item: title + body) for "Learn more"
  treatmentDetails?: { title: string; body: string }[];
  // Disease stages or progression
  stages?: { name: string; desc: string }[];
  // Possible complications if untreated
  complications?: string[];
  // Lifestyle / daily management tips
  lifestyle?: string[];
  // Prevention tips
  prevention?: string[];
  // Frequently asked questions
  faq?: { q: string; a: string }[];
  // When to see a doctor / red flags
  redFlags?: string[];
  // Diagnostic tests usually needed
  diagnosis?: string[];
  research?: string;
  whatToDo?: string;
}

export interface Disease {
  id: string;
  category: Category;
  severity: Severity;
  /** WHO/MedlinePlus reference URL for the disease */
  whoUrl?: string;
  ar: DiseaseI18n;
  en: DiseaseI18n;
}

export const diseases: Disease[] = [
  // ===== COMMON =====
  {
    id: "diabetes-type-2",
    category: "common",
    severity: "moderate",
    ar: {
      name: "السكري من النوع الثاني",
      shortDesc: "اضطراب مزمن في تنظيم سكر الدم بسبب مقاومة الأنسولين.",
      symptoms: ["العطش الشديد", "كثرة التبول", "إرهاق دائم", "بطء التئام الجروح", "تشوش الرؤية"],
      causes: ["السمنة", "قلة النشاط البدني", "الوراثة", "التقدم بالعمر"],
      treatments: ["تعديل النظام الغذائي", "ممارسة الرياضة", "ميتفورمين", "حقن الأنسولين عند الحاجة"],
      research: "أدوية GLP-1 وSGLT2 inhibitors وبحوث في زراعة خلايا بيتا.",
    },
    en: {
      name: "Type 2 Diabetes",
      shortDesc: "Chronic disorder of blood sugar regulation due to insulin resistance.",
      symptoms: ["Excessive thirst", "Frequent urination", "Fatigue", "Slow wound healing", "Blurred vision"],
      causes: ["Obesity", "Physical inactivity", "Genetics", "Aging"],
      treatments: ["Diet changes", "Exercise", "Metformin", "Insulin when needed"],
      research: "GLP-1 agonists, SGLT2 inhibitors, and beta-cell transplant research.",
    },
  },
  {
    id: "hypertension",
    category: "common",
    severity: "moderate",
    ar: {
      name: "ارتفاع ضغط الدم",
      shortDesc: "ضغط الدم على جدران الشرايين أعلى من الطبيعي بشكل مستمر.",
      symptoms: ["صداع", "دوخة", "نزيف الأنف", "خفقان", "ضيق تنفس"],
      causes: ["الوراثة", "الملح الزائد", "التوتر", "السمنة", "التدخين"],
      treatments: ["تقليل الملح", "رياضة", "أدوية ACE inhibitors و beta blockers"],
    },
    en: {
      name: "Hypertension",
      shortDesc: "Persistently elevated blood pressure against artery walls.",
      symptoms: ["Headache", "Dizziness", "Nosebleeds", "Palpitations", "Shortness of breath"],
      causes: ["Genetics", "High salt intake", "Stress", "Obesity", "Smoking"],
      treatments: ["Low-salt diet", "Exercise", "ACE inhibitors", "Beta blockers"],
    },
  },
  {
    id: "asthma",
    category: "common",
    severity: "moderate",
    ar: {
      name: "الربو",
      shortDesc: "التهاب مزمن في الشعب الهوائية يسبب ضيق التنفس.",
      symptoms: ["صفير في الصدر", "كحة مستمرة خاصة ليلاً", "ضيق تنفس", "ضغط في الصدر"],
      causes: ["الحساسية", "وراثة", "تلوث الهواء", "العدوى الفيروسية"],
      treatments: ["بخاخات موسعة (سالبوتامول)", "كورتيكوستيرويد استنشاقي", "تجنب المحفزات"],
      whatToDo: "في النوبة: اجلس مستقيماً، استخدم البخاخ كل 30-60 ثانية، اتصل بالإسعاف إذا لم يتحسن.",
    },
    en: {
      name: "Asthma",
      shortDesc: "Chronic airway inflammation causing breathing difficulty.",
      symptoms: ["Wheezing", "Persistent night cough", "Shortness of breath", "Chest tightness"],
      causes: ["Allergies", "Genetics", "Air pollution", "Viral infections"],
      treatments: ["Bronchodilators (salbutamol)", "Inhaled corticosteroids", "Trigger avoidance"],
      whatToDo: "In an attack: sit upright, puff inhaler every 30–60s, call emergency if no improvement.",
    },
  },
  {
    id: "migraine",
    category: "common",
    severity: "moderate",
    ar: {
      name: "الصداع النصفي",
      shortDesc: "نوبات صداع شديدة في جانب واحد من الرأس.",
      symptoms: ["ألم نابض", "غثيان", "حساسية للضوء والصوت", "اضطراب رؤية"],
      causes: ["وراثة", "هرمونات", "توتر", "أطعمة معينة", "قلة النوم"],
      treatments: ["مسكنات", "تريبتانات", "أدوية وقائية", "تجنب المحفزات"],
    },
    en: {
      name: "Migraine",
      shortDesc: "Severe one-sided recurrent headaches.",
      symptoms: ["Throbbing pain", "Nausea", "Light/sound sensitivity", "Visual aura"],
      causes: ["Genetics", "Hormones", "Stress", "Food triggers", "Sleep deprivation"],
      treatments: ["Analgesics", "Triptans", "Preventive drugs", "Avoid triggers"],
    },
  },
  {
    id: "gastritis",
    category: "common",
    severity: "mild",
    ar: {
      name: "التهاب المعدة",
      shortDesc: "التهاب في بطانة المعدة.",
      symptoms: ["ألم أعلى البطن", "غثيان", "انتفاخ", "فقدان شهية"],
      causes: ["جرثومة H. pylori", "مسكنات NSAIDs", "كحول", "توتر"],
      treatments: ["مثبطات مضخة البروتون", "مضادات حيوية للجرثومة", "تعديل غذائي"],
    },
    en: {
      name: "Gastritis",
      shortDesc: "Inflammation of the stomach lining.",
      symptoms: ["Upper abdominal pain", "Nausea", "Bloating", "Loss of appetite"],
      causes: ["H. pylori", "NSAIDs", "Alcohol", "Stress"],
      treatments: ["PPIs", "Antibiotics for H. pylori", "Diet changes"],
    },
  },
  {
    id: "anemia-iron",
    category: "common",
    severity: "mild",
    ar: {
      name: "فقر الدم بنقص الحديد",
      shortDesc: "نقص خلايا الدم الحمراء بسبب نقص الحديد.",
      symptoms: ["إرهاق", "شحوب", "ضيق تنفس", "تساقط شعر", "خفقان"],
      causes: ["نقص غذائي", "نزيف مزمن", "حمل", "سوء امتصاص"],
      treatments: ["مكملات الحديد", "أطعمة غنية بالحديد", "علاج السبب"],
    },
    en: {
      name: "Iron-Deficiency Anemia",
      shortDesc: "Reduced red blood cells due to iron deficiency.",
      symptoms: ["Fatigue", "Pallor", "Shortness of breath", "Hair loss", "Palpitations"],
      causes: ["Dietary deficiency", "Chronic bleeding", "Pregnancy", "Malabsorption"],
      treatments: ["Iron supplements", "Iron-rich foods", "Treat the cause"],
    },
  },
  // ===== EMERGENCY =====
  {
    id: "epilepsy-seizure",
    category: "emergency",
    severity: "critical",
    ar: {
      name: "نوبة الصرع (تشنجات)",
      shortDesc: "نشاط كهربائي مفاجئ غير طبيعي في الدماغ.",
      symptoms: ["فقدان وعي", "تشنجات في الأطراف", "زبد بالفم", "عض اللسان", "تبول لا إرادي"],
      causes: ["صرع مزمن", "ارتفاع حرارة (أطفال)", "إصابة رأس", "نقص سكر", "أدوية"],
      treatments: ["مضادات صرع: فالبروات، ليفيتيراسيتام", "متابعة عصبية"],
      whatToDo:
        "1) ضعه على جنبه. 2) ابعد الأشياء الحادة. 3) لا تضع شيئاً في فمه. 4) اضبط الوقت. 5) اتصل بالإسعاف إذا تجاوزت 5 دقائق أو تكررت.",
    },
    en: {
      name: "Epileptic Seizure",
      shortDesc: "Sudden abnormal electrical activity in the brain.",
      symptoms: ["Loss of consciousness", "Limb convulsions", "Foaming at mouth", "Tongue biting", "Incontinence"],
      causes: ["Chronic epilepsy", "High fever (children)", "Head injury", "Hypoglycemia", "Drugs"],
      treatments: ["Antiepileptics: valproate, levetiracetam", "Neurology follow-up"],
      whatToDo:
        "1) Place on side. 2) Clear sharp objects. 3) Do NOT put anything in the mouth. 4) Time the seizure. 5) Call emergency if >5 min or recurrent.",
    },
  },
  {
    id: "heart-attack",
    category: "emergency",
    severity: "critical",
    ar: {
      name: "النوبة القلبية",
      shortDesc: "انسداد شريان تاجي يحرم عضلة القلب من الأكسجين.",
      symptoms: ["ألم ضاغط بالصدر", "ألم ينتشر للذراع/الفك", "تعرق بارد", "ضيق تنفس", "غثيان"],
      causes: ["تصلب شرايين", "تدخين", "كولسترول", "ضغط", "سكري"],
      treatments: ["أسبرين عاجل", "قسطرة قلبية", "ستنت", "أدوية مذيبة للجلطة"],
      whatToDo: "اتصل بالإسعاف فوراً، أعطه أسبرين 300mg مضغ إن لم يكن لديه حساسية، اجعله يجلس مرتاحاً.",
    },
    en: {
      name: "Heart Attack",
      shortDesc: "Coronary artery blockage depriving heart muscle of oxygen.",
      symptoms: ["Crushing chest pain", "Pain radiating to arm/jaw", "Cold sweat", "Shortness of breath", "Nausea"],
      causes: ["Atherosclerosis", "Smoking", "Cholesterol", "Hypertension", "Diabetes"],
      treatments: ["Urgent aspirin", "Cardiac catheterization", "Stent", "Thrombolytics"],
      whatToDo: "Call emergency immediately. Give 300mg aspirin (chewed) if no allergy. Keep patient seated and calm.",
    },
  },
  {
    id: "stroke",
    category: "emergency",
    severity: "critical",
    ar: {
      name: "السكتة الدماغية",
      shortDesc: "انقطاع تدفق الدم إلى جزء من الدماغ.",
      symptoms: ["ضعف بجانب واحد", "تدلي الوجه", "صعوبة كلام", "اضطراب رؤية", "صداع شديد مفاجئ"],
      causes: ["جلطة دماغية", "نزيف دماغي", "ضغط مرتفع", "رجفان أذيني"],
      treatments: ["مذيبات الجلطة (ساعات أولى)", "قسطرة مخ", "إعادة تأهيل"],
      whatToDo: "تذكّر FAST: Face-Arm-Speech-Time. اتصل بالإسعاف فوراً، الوقت = دماغ.",
    },
    en: {
      name: "Stroke",
      shortDesc: "Interruption of blood flow to part of the brain.",
      symptoms: ["One-sided weakness", "Facial droop", "Slurred speech", "Visual disturbance", "Sudden severe headache"],
      causes: ["Ischemic clot", "Hemorrhage", "Hypertension", "Atrial fibrillation"],
      treatments: ["Thrombolytics (early hours)", "Mechanical thrombectomy", "Rehabilitation"],
      whatToDo: "Remember FAST: Face-Arm-Speech-Time. Call emergency immediately. Time = brain.",
    },
  },
  {
    id: "anaphylaxis",
    category: "emergency",
    severity: "critical",
    ar: {
      name: "صدمة الحساسية (أنافيلاكسيس)",
      shortDesc: "تفاعل تحسسي شديد ومفاجئ مهدد للحياة.",
      symptoms: ["تورم وجه/لسان", "صعوبة تنفس", "طفح", "هبوط ضغط", "فقدان وعي"],
      causes: ["مكسرات", "بيض", "لدغ نحل", "مضادات حيوية"],
      treatments: ["إيبينيفرين عضلي فوراً (EpiPen)", "أكسجين", "ستيرويد"],
      whatToDo: "أعطه إيبينيفرين فوراً، اتصل بالإسعاف، استلقِ مع رفع الساقين.",
    },
    en: {
      name: "Anaphylaxis",
      shortDesc: "Severe sudden life-threatening allergic reaction.",
      symptoms: ["Face/tongue swelling", "Breathing difficulty", "Rash", "Low BP", "Loss of consciousness"],
      causes: ["Nuts", "Eggs", "Bee stings", "Antibiotics"],
      treatments: ["IM epinephrine immediately (EpiPen)", "Oxygen", "Steroids"],
      whatToDo: "Give epinephrine immediately. Call emergency. Lay flat, legs raised.",
    },
  },
  {
    id: "choking",
    category: "emergency",
    severity: "critical",
    ar: {
      name: "الاختناق بجسم غريب",
      shortDesc: "انسداد المجرى التنفسي بطعام أو جسم غريب.",
      symptoms: ["عدم قدرة على الكلام", "إمساك الحلق", "ازرقاق", "كحة ضعيفة"],
      causes: ["طعام", "ألعاب صغيرة (أطفال)"],
      treatments: ["مناورة هايمليك", "إنعاش قلبي رئوي عند فقدان الوعي"],
      whatToDo: "ضربات بين الكتفين 5 مرات، ثم هايمليك (ضغطات بطنية) 5 مرات، كرر.",
    },
    en: {
      name: "Choking",
      shortDesc: "Airway obstruction by food or foreign object.",
      symptoms: ["Inability to speak", "Hands at throat", "Cyanosis", "Weak cough"],
      causes: ["Food", "Small toys (children)"],
      treatments: ["Heimlich maneuver", "CPR if unconscious"],
      whatToDo: "5 back blows between shoulder blades, then 5 abdominal thrusts (Heimlich). Repeat.",
    },
  },
  {
    id: "severe-bleeding",
    category: "emergency",
    severity: "critical",
    ar: {
      name: "نزيف حاد",
      shortDesc: "فقد كميات كبيرة من الدم بشكل سريع.",
      symptoms: ["دم متدفق", "شحوب", "تسارع نبض", "هبوط ضغط", "إغماء"],
      causes: ["جروح عميقة", "حوادث", "كسور مفتوحة"],
      treatments: ["ضغط مباشر", "رفع العضو", "نقل دم بالمستشفى"],
      whatToDo: "اضغط مباشرة بقماش نظيف، ارفع المنطقة فوق القلب، اتصل بالإسعاف، لا ترفع الضمادة.",
    },
    en: {
      name: "Severe Bleeding",
      shortDesc: "Rapid significant blood loss.",
      symptoms: ["Spurting blood", "Pallor", "Rapid pulse", "Low BP", "Fainting"],
      causes: ["Deep wounds", "Accidents", "Open fractures"],
      treatments: ["Direct pressure", "Limb elevation", "In-hospital transfusion"],
      whatToDo: "Apply firm direct pressure with a clean cloth, raise above heart level, call emergency, don't lift the dressing.",
    },
  },
  {
    id: "burns",
    category: "emergency",
    severity: "severe",
    ar: {
      name: "الحروق",
      shortDesc: "تلف الجلد بالحرارة أو الكيماويات أو الكهرباء.",
      symptoms: ["احمرار", "ألم", "فقاعات", "تفحم في الحروق العميقة"],
      causes: ["نار", "ماء ساخن", "كهرباء", "كيماويات"],
      treatments: ["تبريد بالماء الجاري 20 دقيقة", "ضمادات معقمة", "كريمات", "ترقيع جلد"],
      whatToDo: "ماء جاري بارد (ليس ثلج) 20 دقيقة، لا تفقع الفقاعات، غطِ بقطعة قماش نظيفة.",
    },
    en: {
      name: "Burns",
      shortDesc: "Skin damage from heat, chemicals or electricity.",
      symptoms: ["Redness", "Pain", "Blisters", "Charring in deep burns"],
      causes: ["Fire", "Hot water", "Electricity", "Chemicals"],
      treatments: ["Cool running water 20 min", "Sterile dressings", "Creams", "Skin grafts"],
      whatToDo: "Cool running water (not ice) 20 min. Don't pop blisters. Cover with a clean cloth.",
    },
  },
  // ===== GENETIC =====
  {
    id: "down-syndrome",
    category: "genetic",
    severity: "moderate",
    ar: {
      name: "متلازمة داون",
      shortDesc: "حالة جينية ناتجة عن نسخة إضافية من الكروموسوم 21.",
      symptoms: ["ملامح وجه مميزة", "تأخر نمو", "إعاقة ذهنية بدرجات", "نقص توتر عضلي", "عيوب قلب خلقية"],
      causes: ["تثلث صبغي 21 (Trisomy 21)", "عمر الأم المتقدم عامل خطر"],
      treatments: ["لا علاج جذري", "تأهيل مبكر", "علاج طبيعي ونطق", "متابعة قلب وغدد"],
      research: "أبحاث في تعديل التعبير الجيني لـ Dyrk1a، أدوية لتحسين الإدراك.",
    },
    en: {
      name: "Down Syndrome",
      shortDesc: "Genetic condition caused by an extra copy of chromosome 21.",
      symptoms: ["Distinct facial features", "Developmental delay", "Variable intellectual disability", "Hypotonia", "Congenital heart defects"],
      causes: ["Trisomy 21", "Advanced maternal age (risk factor)"],
      treatments: ["No cure", "Early intervention", "Physical and speech therapy", "Cardiac/endocrine follow-up"],
      research: "Dyrk1a expression modulation, cognition-enhancing drug research.",
    },
  },
  {
    id: "cystic-fibrosis",
    category: "genetic",
    severity: "severe",
    ar: {
      name: "التليف الكيسي",
      shortDesc: "مرض وراثي يصيب الرئتين والجهاز الهضمي بإفرازات لزجة.",
      symptoms: ["كحة مزمنة", "عدوى صدرية متكررة", "صعوبة هضم", "نقص وزن", "عرق مالح"],
      causes: ["طفرة في جين CFTR (وراثة متنحية)"],
      treatments: ["إنزيمات هاضمة", "فيزيوثيرابي صدر", "أدوية CFTR modulators (Trikafta)", "زراعة رئة"],
      research: "علاج جيني (CRISPR)، تطوير modulators لطفرات نادرة.",
    },
    en: {
      name: "Cystic Fibrosis",
      shortDesc: "Inherited disease producing thick mucus in lungs and digestive tract.",
      symptoms: ["Chronic cough", "Recurrent chest infections", "Digestive issues", "Poor weight gain", "Salty sweat"],
      causes: ["CFTR gene mutation (autosomal recessive)"],
      treatments: ["Pancreatic enzymes", "Chest physiotherapy", "CFTR modulators (Trikafta)", "Lung transplant"],
      research: "Gene therapy (CRISPR), modulators for rare mutations.",
    },
  },
  {
    id: "sickle-cell",
    category: "genetic",
    severity: "severe",
    ar: {
      name: "فقر الدم المنجلي",
      shortDesc: "خلايا دم حمراء مشوهة على شكل منجل تسد الأوعية الدموية.",
      symptoms: ["نوبات ألم شديدة", "إرهاق", "تورم اليدين والقدمين", "عدوى متكررة"],
      causes: ["طفرة في جين الهيموجلوبين (HBB)"],
      treatments: ["هيدروكسي يوريا", "نقل دم", "زراعة نخاع", "علاج جيني (Casgevy)"],
      research: "علاج CRISPR (Casgevy) معتمد منذ 2023، أبحاث lentiviral.",
    },
    en: {
      name: "Sickle Cell Disease",
      shortDesc: "Sickle-shaped red blood cells block blood vessels.",
      symptoms: ["Severe pain crises", "Fatigue", "Swelling of hands/feet", "Recurrent infections"],
      causes: ["HBB gene mutation"],
      treatments: ["Hydroxyurea", "Transfusions", "Bone marrow transplant", "Gene therapy (Casgevy)"],
      research: "CRISPR therapy (Casgevy) approved 2023, lentiviral research.",
    },
  },
  {
    id: "duchenne",
    category: "genetic",
    severity: "severe",
    ar: {
      name: "حثل دوشين العضلي",
      shortDesc: "ضعف تدريجي في العضلات يصيب الذكور غالباً.",
      symptoms: ["ضعف عضلات", "صعوبة مشي", "سقوط متكرر", "تضخم بطة الساق"],
      causes: ["طفرة في جين الديستروفين على الكروموسوم X"],
      treatments: ["كورتيكوستيرويد", "علاج طبيعي", "أدوية exon skipping (eteplirsen)"],
      research: "علاج جيني AAV (Elevidys معتمد 2023)، CRISPR.",
    },
    en: {
      name: "Duchenne Muscular Dystrophy",
      shortDesc: "Progressive muscle weakness, mostly affecting boys.",
      symptoms: ["Muscle weakness", "Difficulty walking", "Frequent falls", "Calf hypertrophy"],
      causes: ["Dystrophin gene mutation on X chromosome"],
      treatments: ["Corticosteroids", "Physiotherapy", "Exon-skipping drugs (eteplirsen)"],
      research: "AAV gene therapy (Elevidys approved 2023), CRISPR.",
    },
  },
  {
    id: "huntington",
    category: "genetic",
    severity: "severe",
    ar: {
      name: "مرض هنتنجتون",
      shortDesc: "مرض وراثي تنكسي يصيب الدماغ تدريجياً.",
      symptoms: ["حركات لا إرادية (chorea)", "تدهور إدراكي", "اكتئاب", "تغير شخصية"],
      causes: ["تكرار CAG في جين HTT (وراثة سائدة)"],
      treatments: ["تتراابينازين للحركات", "مضادات اكتئاب", "علاج داعم"],
      research: "ASOs (Tominersen)، علاج جيني، CRISPR.",
    },
    en: {
      name: "Huntington's Disease",
      shortDesc: "Inherited progressive brain disorder.",
      symptoms: ["Involuntary movements (chorea)", "Cognitive decline", "Depression", "Personality change"],
      causes: ["CAG repeat in HTT gene (autosomal dominant)"],
      treatments: ["Tetrabenazine", "Antidepressants", "Supportive care"],
      research: "ASOs (Tominersen), gene therapy, CRISPR.",
    },
  },
  // ===== RARE =====
  {
    id: "als",
    category: "rare",
    severity: "critical",
    ar: {
      name: "التصلب الجانبي الضموري (ALS)",
      shortDesc: "تنكس تدريجي للخلايا العصبية الحركية.",
      symptoms: ["ضعف عضلات", "تشنجات", "صعوبة كلام وبلع", "ضمور عضلي"],
      causes: ["غير معروف غالباً", "وراثي 10%"],
      treatments: ["ريلوزول", "إيدارافون", "علاج داعم"],
      research: "Tofersen لطفرات SOD1، علاج جيني.",
    },
    en: {
      name: "Amyotrophic Lateral Sclerosis (ALS)",
      shortDesc: "Progressive degeneration of motor neurons.",
      symptoms: ["Muscle weakness", "Cramps", "Speech/swallow difficulty", "Muscle wasting"],
      causes: ["Mostly unknown", "10% genetic"],
      treatments: ["Riluzole", "Edaravone", "Supportive care"],
      research: "Tofersen for SOD1 mutations, gene therapy.",
    },
  },
  {
    id: "marfan",
    category: "rare",
    severity: "moderate",
    ar: {
      name: "متلازمة مارفان",
      shortDesc: "اضطراب في النسيج الضام يصيب القلب والعينين والهيكل.",
      symptoms: ["طول مفرط", "أصابع طويلة", "تمدد أبهر", "خلع عدسة العين", "جنف"],
      causes: ["طفرة جين FBN1 (وراثة سائدة)"],
      treatments: ["حاصرات بيتا", "متابعة قلبية دورية", "جراحة الأبهر"],
    },
    en: {
      name: "Marfan Syndrome",
      shortDesc: "Connective tissue disorder affecting heart, eyes and skeleton.",
      symptoms: ["Tall stature", "Long fingers", "Aortic dilation", "Lens dislocation", "Scoliosis"],
      causes: ["FBN1 gene mutation (autosomal dominant)"],
      treatments: ["Beta blockers", "Regular cardiac follow-up", "Aortic surgery"],
    },
  },
  {
    id: "ehlers-danlos",
    category: "rare",
    severity: "moderate",
    ar: {
      name: "متلازمة إهلرز-دانلوس",
      shortDesc: "اضطرابات وراثية تصيب الكولاجين والنسيج الضام.",
      symptoms: ["مفاصل مفرطة المرونة", "جلد قابل للتمدد", "كدمات سهلة", "ندوب رقيقة"],
      causes: ["طفرات في جينات الكولاجين المختلفة"],
      treatments: ["علاج طبيعي", "تثبيت مفاصل", "متابعة قلب في النوع الوعائي"],
    },
    en: {
      name: "Ehlers-Danlos Syndrome",
      shortDesc: "Inherited disorders affecting collagen and connective tissue.",
      symptoms: ["Joint hypermobility", "Stretchy skin", "Easy bruising", "Thin scars"],
      causes: ["Mutations in various collagen genes"],
      treatments: ["Physiotherapy", "Joint stabilization", "Cardiac follow-up in vascular type"],
    },
  },
  {
    id: "wilson",
    category: "rare",
    severity: "severe",
    ar: {
      name: "مرض ويلسون",
      shortDesc: "تراكم النحاس في الكبد والدماغ.",
      symptoms: ["يرقان", "رعشة", "تغير شخصية", "حلقة كايزر-فلايشر بالعين"],
      causes: ["طفرة في جين ATP7B"],
      treatments: ["بنسيلامين", "زنك", "نظام منخفض النحاس", "زراعة كبد"],
    },
    en: {
      name: "Wilson's Disease",
      shortDesc: "Copper accumulation in liver and brain.",
      symptoms: ["Jaundice", "Tremor", "Personality change", "Kayser-Fleischer ring"],
      causes: ["ATP7B gene mutation"],
      treatments: ["Penicillamine", "Zinc", "Low-copper diet", "Liver transplant"],
    },
  },
  {
    id: "pompe",
    category: "rare",
    severity: "severe",
    ar: {
      name: "مرض بومبي",
      shortDesc: "اضطراب تخزين ليسوسومي يؤثر على العضلات.",
      symptoms: ["ضعف عضلي", "صعوبة تنفس", "تضخم قلب (في الرضع)"],
      causes: ["نقص إنزيم GAA"],
      treatments: ["علاج بإحلال الإنزيم (Lumizyme، Nexviazyme)"],
      research: "علاج جيني AAV.",
    },
    en: {
      name: "Pompe Disease",
      shortDesc: "Lysosomal storage disorder affecting muscles.",
      symptoms: ["Muscle weakness", "Breathing difficulty", "Cardiomegaly (infants)"],
      causes: ["GAA enzyme deficiency"],
      treatments: ["Enzyme replacement (Lumizyme, Nexviazyme)"],
      research: "AAV gene therapy.",
    },
  },
  // ===== MENTAL =====
  {
    id: "depression",
    category: "mental",
    severity: "moderate",
    ar: {
      name: "الاكتئاب",
      shortDesc: "اضطراب مزاج يسبب حزناً مستمراً وفقدان الاهتمام.",
      symptoms: ["حزن مستمر", "فقدان الاهتمام", "اضطراب نوم", "تغير شهية", "أفكار سلبية", "إرهاق"],
      causes: ["كيمياء الدماغ", "وراثة", "صدمات", "أمراض مزمنة"],
      treatments: ["علاج معرفي سلوكي (CBT)", "SSRI/SNRI", "ممارسة الرياضة", "دعم اجتماعي"],
    },
    en: {
      name: "Depression",
      shortDesc: "Mood disorder causing persistent sadness and loss of interest.",
      symptoms: ["Persistent sadness", "Loss of interest", "Sleep disturbance", "Appetite change", "Negative thoughts", "Fatigue"],
      causes: ["Brain chemistry", "Genetics", "Trauma", "Chronic illness"],
      treatments: ["CBT", "SSRI/SNRI", "Exercise", "Social support"],
    },
  },
  {
    id: "anxiety-gad",
    category: "mental",
    severity: "moderate",
    ar: {
      name: "اضطراب القلق العام",
      shortDesc: "قلق مفرط ومستمر تجاه أمور يومية.",
      symptoms: ["قلق دائم", "توتر عضلي", "خفقان", "اضطراب نوم", "صعوبة تركيز"],
      causes: ["وراثة", "كيمياء دماغ", "ضغوط حياتية"],
      treatments: ["CBT", "SSRI", "تمارين تنفس", "تأمل"],
    },
    en: {
      name: "Generalized Anxiety Disorder",
      shortDesc: "Excessive persistent worry about everyday matters.",
      symptoms: ["Constant worry", "Muscle tension", "Palpitations", "Sleep issues", "Concentration problems"],
      causes: ["Genetics", "Brain chemistry", "Life stressors"],
      treatments: ["CBT", "SSRIs", "Breathing exercises", "Meditation"],
    },
  },
  {
    id: "bipolar",
    category: "mental",
    severity: "severe",
    ar: {
      name: "اضطراب ثنائي القطب",
      shortDesc: "تقلبات شديدة بين نوبات الهوس والاكتئاب.",
      symptoms: ["نوبات هوس (طاقة مفرطة، اندفاع)", "نوبات اكتئاب", "اضطراب نوم", "اندفاعية"],
      causes: ["وراثة قوية", "كيمياء دماغ", "ضغط نفسي"],
      treatments: ["مثبتات مزاج (ليثيوم)", "مضادات ذهان", "علاج نفسي"],
    },
    en: {
      name: "Bipolar Disorder",
      shortDesc: "Severe mood swings between mania and depression.",
      symptoms: ["Manic episodes", "Depressive episodes", "Sleep disturbance", "Impulsivity"],
      causes: ["Strong genetic component", "Brain chemistry", "Stress"],
      treatments: ["Mood stabilizers (lithium)", "Antipsychotics", "Psychotherapy"],
    },
  },
  {
    id: "schizophrenia",
    category: "mental",
    severity: "severe",
    ar: {
      name: "الفصام",
      shortDesc: "اضطراب نفسي شديد يؤثر على التفكير والإدراك.",
      symptoms: ["هلاوس", "أوهام", "تفكير مشوش", "انعزال اجتماعي", "بلادة عاطفية"],
      causes: ["وراثة", "اختلال دوبامين", "عوامل بيئية"],
      treatments: ["مضادات ذهان", "علاج نفسي اجتماعي", "إعادة تأهيل"],
    },
    en: {
      name: "Schizophrenia",
      shortDesc: "Severe mental disorder affecting thought and perception.",
      symptoms: ["Hallucinations", "Delusions", "Disorganized thinking", "Social withdrawal", "Flat affect"],
      causes: ["Genetics", "Dopamine dysregulation", "Environment"],
      treatments: ["Antipsychotics", "Psychosocial therapy", "Rehabilitation"],
    },
  },
  {
    id: "ocd",
    category: "mental",
    severity: "moderate",
    ar: {
      name: "الوسواس القهري",
      shortDesc: "أفكار مزعجة متكررة وسلوكيات قهرية.",
      symptoms: ["وساوس متكررة", "غسيل يدين متكرر", "تأكد متكرر", "ترتيب", "قلق شديد"],
      causes: ["وراثة", "خلل في دوائر الدماغ", "صدمات"],
      treatments: ["CBT خاصة ERP", "SSRI بجرعات عالية"],
    },
    en: {
      name: "OCD",
      shortDesc: "Recurrent intrusive thoughts and compulsive behaviors.",
      symptoms: ["Obsessions", "Compulsive hand washing", "Checking", "Ordering", "High anxiety"],
      causes: ["Genetics", "Brain circuit dysfunction", "Trauma"],
      treatments: ["CBT (especially ERP)", "High-dose SSRIs"],
    },
  },
  {
    id: "ptsd",
    category: "mental",
    severity: "severe",
    ar: {
      name: "اضطراب ما بعد الصدمة (PTSD)",
      shortDesc: "اضطراب نفسي بعد التعرض لحدث صادم.",
      symptoms: ["استرجاع للحدث", "كوابيس", "تجنب", "فرط يقظة", "اكتئاب"],
      causes: ["حروب", "اعتداء", "حوادث", "كوارث"],
      treatments: ["EMDR", "CBT للصدمة", "SSRI"],
    },
    en: {
      name: "PTSD",
      shortDesc: "Mental disorder following exposure to a traumatic event.",
      symptoms: ["Flashbacks", "Nightmares", "Avoidance", "Hyperarousal", "Depression"],
      causes: ["War", "Assault", "Accidents", "Disasters"],
      treatments: ["EMDR", "Trauma-focused CBT", "SSRIs"],
    },
  },
  {
    id: "adhd",
    category: "mental",
    severity: "mild",
    ar: {
      name: "اضطراب فرط الحركة وتشتت الانتباه",
      shortDesc: "صعوبة تركيز وفرط نشاط واندفاعية.",
      symptoms: ["تشتت انتباه", "نسيان", "فرط حركة", "اندفاعية", "ضعف تنظيم"],
      causes: ["وراثة قوية", "اختلال نواقل عصبية"],
      treatments: ["ميثيلفينيديت (ريتالين)", "أتوموكستين", "علاج سلوكي"],
    },
    en: {
      name: "ADHD",
      shortDesc: "Difficulty focusing, hyperactivity and impulsivity.",
      symptoms: ["Inattention", "Forgetfulness", "Hyperactivity", "Impulsivity", "Poor organization"],
      causes: ["Strong genetics", "Neurotransmitter imbalance"],
      treatments: ["Methylphenidate (Ritalin)", "Atomoxetine", "Behavioral therapy"],
    },
  },
  {
    id: "autism",
    category: "mental",
    severity: "moderate",
    ar: {
      name: "اضطراب طيف التوحد",
      shortDesc: "اضطراب نمائي يؤثر على التواصل والسلوك.",
      symptoms: ["ضعف تواصل اجتماعي", "سلوكيات متكررة", "اهتمامات محدودة", "حساسية حسية"],
      causes: ["وراثة قوية", "عوامل بيئية"],
      treatments: ["تدخل سلوكي مبكر (ABA)", "علاج نطق", "علاج وظيفي"],
    },
    en: {
      name: "Autism Spectrum Disorder",
      shortDesc: "Developmental disorder affecting communication and behavior.",
      symptoms: ["Social communication deficits", "Repetitive behaviors", "Restricted interests", "Sensory sensitivity"],
      causes: ["Strong genetics", "Environmental factors"],
      treatments: ["Early behavioral intervention (ABA)", "Speech therapy", "Occupational therapy"],
    },
  },
];

import { diseasesExtra } from "./diseasesExtra";
import { diseasesMega } from "./diseasesMega";
import { diseasesBulk } from "./diseasesBulk";
import { extraDiseases } from "./extraDiseases";
import { physicalDiseases } from "./physicalDiseases";
export const allDiseases: Disease[] = [...diseases, ...diseasesExtra, ...diseasesMega, ...diseasesBulk, ...extraDiseases, ...physicalDiseases];
export const getDisease = (id: string) => allDiseases.find((d) => d.id === id);
