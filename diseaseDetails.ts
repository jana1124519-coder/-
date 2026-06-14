// Extended details for major diseases — merged into the base disease record at runtime.
// Keeps src/lib/diseases.ts smaller and lets us iterate on long-form content separately.
import type { DiseaseI18n } from "./diseases";
import { DISEASE_DETAILS_EXT, DISEASE_WHO_URLS } from "./diseaseDetailsExt";

type DetailPatch = Partial<Pick<DiseaseI18n,
  "fullDesc" | "treatmentDetails" | "stages" | "complications" |
  "lifestyle" | "prevention" | "faq" | "redFlags" | "diagnosis"
>>;

export interface DiseaseDetailsEntry {
  ar: DetailPatch;
  en: DetailPatch;
}

export const DISEASE_DETAILS: Record<string, DiseaseDetailsEntry> = {
  "diabetes-type-2": {
    ar: {
      fullDesc:
        "السكري من النوع الثاني مرض مزمن بيحصل لما الجسم يفقد قدرته على استخدام الأنسولين بكفاءة (مقاومة الأنسولين)، أو لما البنكرياس يبطّأ إنتاجه. النتيجة هي ارتفاع السكر في الدم لفترات طويلة، اللي بمرور الوقت بيأذي الأوعية الدموية والأعصاب والكلى والعينين. الخبر الكويس إنه مرض ممكن يتحكم فيه بالكامل بالعلاج وأسلوب الحياة، بل ويتراجع تماماً في حالات السكري المبكر مع نزول الوزن.",
      treatmentDetails: [
        { title: "تعديل النظام الغذائي", body: "قلّل النشويات البسيطة (السكر، العيش الأبيض، الأرز الأبيض، المشروبات الغازية). ركّز على الخضار، البروتين الخالي من الدهون، الحبوب الكاملة، والدهون الصحية (زيتون، مكسرات). خد 3 وجبات + 2 سناك بدل وجبة كبيرة." },
        { title: "النشاط البدني", body: "150 دقيقة أسبوعياً نشاط متوسط (مشي سريع، سباحة) + تمارين مقاومة مرتين أسبوعياً. حتى المشي 10 دقايق بعد الأكل بيخفّض السكر بشكل ملحوظ." },
        { title: "ميتفورمين", body: "العلاج الأول للمعظم. بيقلل إنتاج الكبد للسكر ويحسّن حساسية الخلايا للأنسولين. الأعراض الجانبية الشائعة: غثيان وإسهال (بتتحسن مع الوقت أو شكل ممتد المفعول)." },
        { title: "أدوية GLP-1 (مثل سيماجلوتايد)", body: "حقن أسبوعية بتقلل السكر وبتساعد على نزول الوزن بشكل ملحوظ. مفيدة جداً للمرضى السمان." },
        { title: "أدوية SGLT2 inhibitors", body: "بتطرد السكر الزايد عن طريق البول، وبتحمي القلب والكلى. مناسبة لمرضى السكري مع أمراض قلب." },
        { title: "حقن الأنسولين", body: "للحالات المتقدمة لما الأدوية الفموية مش كافية. أنواع: سريعة المفعول مع الوجبات + طويلة المفعول مرة يومياً." },
      ],
      stages: [
        { name: "ما قبل السكري", desc: "السكر الصايم 100-125 mg/dL أو HbA1c 5.7-6.4%. قابل للتراجع تماماً بنزول 5-7% من الوزن." },
        { name: "السكري المبكر", desc: "تشخيص حديث، السكر متذبذب لكن بدون مضاعفات. أهم مرحلة للسيطرة." },
        { name: "السكري المتقدم", desc: "بدأت تظهر مضاعفات (اعتلال كلى/عصبي/شبكية). محتاج علاج مكثف ومتابعة دورية." },
      ],
      complications: [
        "اعتلال شبكية العين قد يؤدي لفقدان البصر",
        "الفشل الكلوي",
        "تلف الأعصاب الطرفية (تنميل وألم في القدمين)",
        "قرح القدم السكرية وقد تؤدي لبتر",
        "أمراض القلب والشرايين",
        "بطء التئام الجروح وزيادة العدوى",
      ],
      lifestyle: [
        "اقيس السكر يومياً في نفس الأوقات وسجّله",
        "افحص قدميك يومياً للتأكد من عدم وجود جروح",
        "اشرب 2 لتر ماء يومياً",
        "نام 7-8 ساعات (قلة النوم بترفع السكر)",
        "تجنب التدخين تماماً",
        "اعمل HbA1c كل 3 شهور",
        "افحص العين والكلى والقدم سنوياً",
      ],
      prevention: [
        "حافظ على وزن صحي (BMI تحت 25)",
        "تمرّن منتظم 30 دقيقة 5 مرات أسبوعياً",
        "قلّل السكر المضاف والمشروبات المحلاة",
        "افحص السكر سنوياً لو فيه تاريخ عائلي",
        "تعامل مع التوتر بطرق صحية",
      ],
      faq: [
        { q: "هل السكري النوع الثاني بيختفي؟", a: "ممكن يدخل في 'هدأة' (Remission) لو نزل المريض 10-15% من وزنه في السنة الأولى من التشخيص. السكر بيرجع طبيعي بدون أدوية، لكن المتابعة لازمة." },
        { q: "هل لازم أبطل السكر تماماً؟", a: "مش لازم. المسموح: 25-30 جرام سكر مضاف يومياً (حوالي 6 ملاعق صغيرة)، موزّعة على اليوم بحكمة." },
        { q: "أكل الفواكه ممنوع؟", a: "لأ، الفواكه الطازجة (تفاح، جوافة، توت) مفيدة. تجنب العصائر المركّزة والفواكه المجففة بكميات كبيرة." },
        { q: "هل الأنسولين بيسبّب إدمان؟", a: "إطلاقاً. الأنسولين دواء طبيعي ينتجه الجسم. استخدامه بيحمي البنكرياس وبيمنع المضاعفات." },
        { q: "أتعامل إزاي مع هبوط السكر؟", a: "لو السكر تحت 70: 15 جرام سكر سريع (4 ملاعق صغيرة سكر، أو نصف كوب عصير). أعد القياس بعد 15 دقيقة. لو فاقد الوعي: حقنة جلوكاجون + إسعاف فوراً." },
      ],
      redFlags: [
        "سكر فوق 300 mg/dL مع غثيان وقيء = حماض كيتوني، إسعاف فوراً",
        "سكر أقل من 54 mg/dL أو فقدان وعي = هبوط حاد",
        "ألم صدر أو ضيق تنفس = احتمال مشكلة قلبية",
        "جرح في القدم لا يلتئم بعد أسبوع",
        "تشوش رؤية مفاجئ",
      ],
      diagnosis: [
        "سكر صايم (FPG) ≥ 126 mg/dL",
        "HbA1c ≥ 6.5%",
        "سكر عشوائي ≥ 200 mg/dL مع أعراض",
        "اختبار تحمل الجلوكوز (OGTT)",
      ],
    },
    en: {
      fullDesc:
        "Type 2 diabetes is a chronic condition where the body becomes resistant to insulin or the pancreas slows its production, leading to chronically elevated blood sugar. Over time, this damages blood vessels, nerves, kidneys and eyes. The good news: it's largely controllable with lifestyle and medication, and early type 2 diabetes can even go into remission with significant weight loss.",
      treatmentDetails: [
        { title: "Diet modification", body: "Reduce simple carbs (sugar, white bread/rice, sodas). Build meals around vegetables, lean protein, whole grains, and healthy fats. Three meals + two snacks beats one large meal." },
        { title: "Physical activity", body: "150 minutes/week of moderate activity (brisk walking, swimming) + resistance training twice weekly. Even a 10-minute walk after meals significantly lowers blood sugar." },
        { title: "Metformin", body: "First-line therapy. Reduces liver glucose production and improves insulin sensitivity. Common side effects: nausea/diarrhea (improve with time or extended-release form)." },
        { title: "GLP-1 agonists (semaglutide)", body: "Weekly injections that lower blood sugar and aid significant weight loss. Excellent for overweight patients." },
        { title: "SGLT2 inhibitors", body: "Excrete excess sugar via urine, protect heart and kidneys. Ideal for diabetics with cardiovascular disease." },
        { title: "Insulin therapy", body: "For advanced cases when oral meds aren't enough. Types: rapid-acting with meals + long-acting once daily." },
      ],
      stages: [
        { name: "Pre-diabetes", desc: "Fasting glucose 100-125 mg/dL or HbA1c 5.7-6.4%. Fully reversible with 5-7% weight loss." },
        { name: "Early diabetes", desc: "Recent diagnosis, sugar fluctuates but no complications. Most important window for control." },
        { name: "Advanced diabetes", desc: "Complications appearing (retinopathy, nephropathy, neuropathy). Needs intensive management." },
      ],
      complications: [
        "Retinopathy → potential blindness",
        "Kidney failure",
        "Peripheral neuropathy (foot numbness/pain)",
        "Diabetic foot ulcers, possibly amputation",
        "Heart and vascular disease",
        "Slow wound healing, increased infections",
      ],
      lifestyle: [
        "Check blood sugar daily at consistent times",
        "Inspect feet daily for cuts",
        "Drink 2L of water daily",
        "Sleep 7-8 hours (sleep loss raises sugar)",
        "Avoid smoking completely",
        "HbA1c every 3 months",
        "Annual eye, kidney, and foot exams",
      ],
      prevention: [
        "Maintain healthy weight (BMI under 25)",
        "Exercise 30 min, 5x/week",
        "Limit added sugar and sweetened drinks",
        "Annual sugar screening if family history",
        "Manage stress healthily",
      ],
      faq: [
        { q: "Can Type 2 diabetes go away?", a: "It can enter 'remission' if a patient loses 10-15% of body weight within the first year of diagnosis. Blood sugar normalizes without medication, but follow-up is essential." },
        { q: "Do I have to stop sugar entirely?", a: "No. Up to 25-30g added sugar/day (~6 teaspoons) is allowed, spread wisely." },
        { q: "Is fruit forbidden?", a: "No, fresh fruits (apple, guava, berries) are beneficial. Avoid concentrated juices and large amounts of dried fruit." },
        { q: "Is insulin addictive?", a: "Not at all. Insulin is a natural hormone. Using it protects the pancreas and prevents complications." },
        { q: "How to handle low blood sugar?", a: "If <70: 15g fast sugar (4 tsp sugar or 1/2 cup juice). Recheck in 15 min. If unconscious: glucagon shot + ambulance." },
      ],
      redFlags: [
        "Sugar >300 with nausea/vomiting = ketoacidosis, emergency",
        "Sugar <54 or loss of consciousness = severe hypoglycemia",
        "Chest pain or shortness of breath = possible cardiac issue",
        "Foot wound not healing after a week",
        "Sudden blurred vision",
      ],
      diagnosis: [
        "Fasting glucose ≥ 126 mg/dL",
        "HbA1c ≥ 6.5%",
        "Random glucose ≥ 200 mg/dL with symptoms",
        "Oral glucose tolerance test (OGTT)",
      ],
    },
  },

  "hypertension": {
    ar: {
      fullDesc:
        "ارتفاع ضغط الدم يُسمى 'القاتل الصامت' لأنه عادةً بدون أعراض لكن بيدمر الأعضاء بصمت. الضغط الطبيعي تحت 120/80. الضغط المرتفع: 130/80 أو أكتر. كل 10 مم زيادة بتضاعف خطر السكتة وأمراض القلب. التحكم فيه ممكن جداً بالأدوية + أسلوب الحياة.",
      treatmentDetails: [
        { title: "تقليل الملح (الصوديوم)", body: "أقل من 2300 ملغ يومياً (ملعقة صغيرة). تجنّب: الأطعمة المعلبة، الجبن المالح، المخللات، الوجبات السريعة، صلصة الصويا." },
        { title: "حمية DASH", body: "نظام غذائي متخصص لخفض الضغط: غني بالخضار والفواكه ومنتجات الألبان قليلة الدسم، قليل اللحوم الحمراء والسكر. بيقلل الضغط 8-14 نقطة." },
        { title: "ACE Inhibitors (مثل ليزينوبريل)", body: "توسّع الأوعية الدموية وتحمي الكلى. أعراض جانبية: كحة جافة (في 10% من المرضى)." },
        { title: "ARBs (مثل لوسارتان)", body: "بديل للACE inhibitors بدون كحة. مناسبة للسكريين." },
        { title: "حاصرات بيتا (مثل بيسوبرولول)", body: "تقلل سرعة القلب وقوة انقباضه. مفيدة بعد جلطة قلب أو مع رجفان أذيني." },
        { title: "مدرات البول (مثل هيدروكلوروثيازيد)", body: "تخلّص الجسم من الصوديوم والماء الزائد. أرخص خيار وفعّال." },
        { title: "حاصرات قنوات الكالسيوم (أملوديبين)", body: "توسّع الشرايين. مناسبة للكبار وأصحاب البشرة الداكنة." },
      ],
      stages: [
        { name: "طبيعي", desc: "أقل من 120/80" },
        { name: "مرتفع", desc: "120-129 / تحت 80 — تعديل أسلوب الحياة" },
        { name: "المرحلة 1", desc: "130-139 / 80-89 — أسلوب حياة + قد يحتاج دواء" },
        { name: "المرحلة 2", desc: "140+ / 90+ — يحتاج دواء فوراً" },
        { name: "أزمة ارتفاع", desc: "180+ / 120+ — طوارئ" },
      ],
      complications: [
        "السكتة الدماغية",
        "النوبات القلبية",
        "الفشل الكلوي",
        "تمدد الأوعية الدموية وتمزقها",
        "ضعف البصر (اعتلال شبكية)",
        "الخرف الوعائي",
      ],
      lifestyle: [
        "اقيس الضغط في البيت يومياً (صباحاً ومساءً)",
        "اشرب الماء بانتظام",
        "نام 7-9 ساعات",
        "تأمّل / تنفس عميق 10 دقايق يومياً",
        "قلّل الكافيين (أقل من 200 ملغ يومياً)",
        "بطّل التدخين فوراً",
        "حافظ على وزن صحي",
      ],
      prevention: [
        "حافظ على BMI طبيعي",
        "اتمرّن 30 دقيقة يومياً",
        "قلّل الملح من بدري",
        "اشرب الكحول بحد أدنى أو امتنع",
        "افحص الضغط سنوياً بعد سن 30",
      ],
      faq: [
        { q: "هل لازم آخد الدواء طول العمر؟", a: "في معظم الحالات نعم، لكن لو نزلت وزنك بشكل كبير وعدّلت نمط حياتك ممكن تقلل الجرعة بإشراف الطبيب." },
        { q: "إيه أحسن وقت لقياس الضغط؟", a: "الصباح قبل أي شيء (قبل القهوة والدواء) والمساء قبل النوم. اقعد مرتاح 5 دقائق قبل القياس." },
        { q: "الليمون والثوم بيخفضوا الضغط؟", a: "بيساعدوا قليلاً لكن مش بديل عن الدواء. لا توقف دوائك أبداً." },
      ],
      redFlags: [
        "ضغط فوق 180/120 = طوارئ",
        "صداع شديد مفاجئ مع تشوش رؤية",
        "ألم صدر أو ضيق تنفس",
        "ضعف في جانب من الجسم",
        "نزيف من الأنف لا يتوقف",
      ],
      diagnosis: [
        "قياس الضغط 3 مرات في زيارات مختلفة",
        "تخطيط قلب (ECG)",
        "تحليل بول وكلى",
        "تحليل دهون وسكر",
      ],
    },
    en: {
      fullDesc:
        "Hypertension is the 'silent killer' — usually symptomless but quietly damages organs. Normal: under 120/80. High: 130/80+. Every 10 mmHg increase doubles stroke and heart disease risk. Highly controllable with medication + lifestyle.",
      treatmentDetails: [
        { title: "Reduce sodium", body: "Less than 2300mg/day (1 tsp). Avoid: canned foods, salty cheese, pickles, fast food, soy sauce." },
        { title: "DASH diet", body: "Designed to lower BP: rich in vegetables, fruits, low-fat dairy; low in red meat and sugar. Lowers BP 8-14 points." },
        { title: "ACE Inhibitors (lisinopril)", body: "Dilate vessels and protect kidneys. Side effect: dry cough (10% of patients)." },
        { title: "ARBs (losartan)", body: "ACE alternative without cough. Good for diabetics." },
        { title: "Beta blockers (bisoprolol)", body: "Slow heart rate and contraction. Useful post-MI or with atrial fibrillation." },
        { title: "Diuretics (HCTZ)", body: "Eliminate excess sodium and water. Cheapest effective option." },
        { title: "Calcium channel blockers (amlodipine)", body: "Dilate arteries. Good for elderly and dark-skinned patients." },
      ],
      stages: [
        { name: "Normal", desc: "Below 120/80" },
        { name: "Elevated", desc: "120-129 / under 80 — lifestyle changes" },
        { name: "Stage 1", desc: "130-139 / 80-89 — lifestyle + possible medication" },
        { name: "Stage 2", desc: "140+ / 90+ — medication needed" },
        { name: "Hypertensive crisis", desc: "180+ / 120+ — emergency" },
      ],
      complications: ["Stroke", "Heart attack", "Kidney failure", "Aneurysm rupture", "Vision loss (retinopathy)", "Vascular dementia"],
      lifestyle: [
        "Measure BP at home daily (morning + evening)",
        "Drink water regularly",
        "Sleep 7-9 hours",
        "Meditation/deep breathing 10 min daily",
        "Limit caffeine (under 200mg/day)",
        "Quit smoking immediately",
        "Maintain healthy weight",
      ],
      prevention: [
        "Keep BMI normal",
        "Exercise 30 min daily",
        "Reduce salt early in life",
        "Minimal or no alcohol",
        "Annual BP screening after age 30",
      ],
      faq: [
        { q: "Do I need medication for life?", a: "In most cases yes, but with significant weight loss and lifestyle changes, dosage can be reduced under doctor supervision." },
        { q: "Best time to measure BP?", a: "Morning before anything (no coffee/meds) and evening before bed. Rest 5 minutes before measuring." },
        { q: "Do garlic/lemon lower BP?", a: "Slightly helpful but never a substitute for medication. Never stop your meds." },
      ],
      redFlags: [
        "BP over 180/120 = emergency",
        "Sudden severe headache with vision changes",
        "Chest pain or shortness of breath",
        "Weakness on one side",
        "Persistent nosebleed",
      ],
      diagnosis: ["BP measured 3x on different visits", "ECG", "Urine and kidney function", "Lipid and sugar panels"],
    },
  },

  "asthma": {
    ar: {
      fullDesc:
        "الربو التهاب مزمن في الشعب الهوائية بيخليها حساسة وضيقة لما تتعرض لمحفزات. النوبة بتسبب صفير وضيق تنفس وكحة. مرض شائع جداً (1 من كل 13) ومش معدي ومش 'نفسي'. بالعلاج الصح، 95% من المرضى بيعيشوا حياة طبيعية تماماً.",
      treatmentDetails: [
        { title: "بخاخات الإنقاذ (سالبوتامول/فينتولين)", body: "أزرق اللون. سريع المفعول (دقايق). للنوبات الحادة فقط. لو محتاجه أكتر من مرتين أسبوعياً، علاجك مش كافي." },
        { title: "بخاخات الكورتيكوستيرويد المستنشقة", body: "بنية أو حمراء (بوديزونيد، فلوتيكازون). دواء أساسي يومي يقلل الالتهاب. لازم استخدامه يومياً حتى لو ما فيش أعراض. اشطف فمك بالماء بعد كل استخدام." },
        { title: "بخاخات مركّبة (LABA + ICS)", body: "زي سيمبيكورت وسيريتايد. تجمع موسّع طويل المفعول مع كورتيكوستيرويد. مرتين يومياً." },
        { title: "أدوية مضادات اللوكوترايين (مونتيلوكاست)", body: "حبوب يومية ليلاً. مفيدة للربو الحساسي وللأطفال." },
        { title: "العلاج البيولوجي (Omalizumab, Mepolizumab)", body: "حقن للحالات الشديدة المقاومة. غالية لكن فعّالة جداً." },
      ],
      stages: [
        { name: "متقطع", desc: "أعراض أقل من مرتين أسبوعياً، نوبات ليلية أقل من مرتين شهرياً" },
        { name: "خفيف مستمر", desc: "أعراض أكتر من مرتين أسبوعياً لكن مش يومياً" },
        { name: "متوسط مستمر", desc: "أعراض يومياً، تأثير على النشاط" },
        { name: "شديد مستمر", desc: "أعراض مستمرة، نشاط محدود" },
      ],
      complications: [
        "نوبة ربو شديدة (Status Asthmaticus) قد تهدد الحياة",
        "تشوّه شكل الصدر مع نوبات متكررة في الأطفال",
        "التهابات صدر متكررة",
        "اعتماد نفسي على البخاخ",
        "آثار جانبية للكورتيزون عند الإفراط في استخدامه",
      ],
      lifestyle: [
        "احمل بخاخ الإنقاذ معاك دايماً",
        "اعرف محفزاتك (غبار، فراء، عطور، رياضة، تدخين) وتجنّبها",
        "خد لقاح الإنفلونزا سنوياً",
        "غسّل المفارش الأسبوع في ماء ساخن",
        "تجنّب التدخين والمدخنين",
        "اشرب ماء كتير",
        "اعمل خطة مكتوبة مع الطبيب لإدارة النوبات",
      ],
      prevention: [
        "تجنّب المحفزات المعروفة",
        "حافظ على نظافة البيت من الغبار",
        "تجنّب الحيوانات الأليفة لو حساس",
        "خد أدويتك الوقائية يومياً",
        "تمرّن منتظم لتقوية الرئة (سباحة ممتازة)",
      ],
      faq: [
        { q: "الربو بيختفي مع العمر؟", a: "في الأطفال، 50% بيتحسنوا في المراهقة. في الكبار، نادراً يختفي تماماً لكن ممكن يصير خفيف جداً." },
        { q: "ينفع أتمرّن بالربو؟", a: "أكيد! الرياضة بتقوّي الرئة. خد بخاخ الإنقاذ 15 دقيقة قبل التمرين، وسخّن جسمك تدريجياً." },
        { q: "البخاخ بيسبب إدمان؟", a: "لأ. لكن لو محتاجه يومياً يبقى علاجك الوقائي مش كافي." },
        { q: "الكورتيزون المستنشق آمن؟", a: "نعم بجرعات منخفضة. الفوائد تفوق المخاطر بكتير. الكورتيزون الفموي هو اللي بيكون له أعراض جانبية لو طال." },
      ],
      redFlags: [
        "صعوبة كلام جملة كاملة",
        "زرقان الشفاه أو الأظافر",
        "البخاخ مش بيستجيب",
        "تنفس أسرع من 30 مرة بالدقيقة",
        "نعاس شديد أو ارتباك",
      ],
      diagnosis: [
        "اختبار وظائف الرئة (Spirometry)",
        "اختبار الذروة (Peak Flow)",
        "اختبارات الحساسية",
        "أشعة صدر",
      ],
    },
    en: {
      fullDesc:
        "Asthma is chronic airway inflammation that makes them sensitive and narrow when exposed to triggers. Attacks cause wheezing, shortness of breath, cough. Very common (1 in 13), not contagious, not 'psychological'. With proper treatment 95% of patients live a normal life.",
      treatmentDetails: [
        { title: "Rescue inhalers (salbutamol/Ventolin)", body: "Blue. Fast-acting (minutes). For acute attacks only. If needed >2x/week, your controller therapy is inadequate." },
        { title: "Inhaled corticosteroids", body: "Brown/red (budesonide, fluticasone). Daily controller reducing inflammation. Use daily even when symptom-free. Rinse mouth after use." },
        { title: "Combination inhalers (LABA+ICS)", body: "Symbicort, Seretide. Long-acting bronchodilator + steroid. Twice daily." },
        { title: "Leukotriene antagonists (montelukast)", body: "Daily evening tablets. Good for allergic asthma and children." },
        { title: "Biologics (Omalizumab, Mepolizumab)", body: "Injections for severe refractory cases. Expensive but very effective." },
      ],
      stages: [
        { name: "Intermittent", desc: "Symptoms <2x/week, night symptoms <2x/month" },
        { name: "Mild persistent", desc: "Symptoms >2x/week but not daily" },
        { name: "Moderate persistent", desc: "Daily symptoms, activity affected" },
        { name: "Severe persistent", desc: "Continuous symptoms, limited activity" },
      ],
      complications: [
        "Status asthmaticus (life-threatening)",
        "Chest deformity with recurrent childhood attacks",
        "Recurrent chest infections",
        "Psychological dependence on inhaler",
        "Steroid side effects with overuse",
      ],
      lifestyle: [
        "Always carry your rescue inhaler",
        "Know your triggers (dust, fur, perfume, exercise, smoke) and avoid them",
        "Annual flu vaccine",
        "Wash bedding weekly in hot water",
        "Avoid smoking and smokers",
        "Drink plenty of water",
        "Have a written asthma action plan with your doctor",
      ],
      prevention: [
        "Avoid known triggers",
        "Keep home dust-free",
        "Avoid pets if allergic",
        "Daily preventive medication",
        "Regular exercise (swimming excellent)",
      ],
      faq: [
        { q: "Does asthma go away with age?", a: "In children, 50% improve by adolescence. In adults rarely disappears entirely but can become very mild." },
        { q: "Can I exercise with asthma?", a: "Absolutely! Exercise strengthens lungs. Use rescue inhaler 15 min before, warm up gradually." },
        { q: "Are inhalers addictive?", a: "No. But if you need rescue daily, your controller therapy is insufficient." },
        { q: "Are inhaled steroids safe?", a: "Yes at low doses. Benefits far outweigh risks. Oral steroids carry side effects if prolonged." },
      ],
      redFlags: [
        "Can't speak a full sentence",
        "Blue lips or nails",
        "Inhaler not working",
        "Breathing faster than 30/min",
        "Severe drowsiness or confusion",
      ],
      diagnosis: ["Spirometry", "Peak flow test", "Allergy testing", "Chest X-ray"],
    },
  },

  "depression": {
    ar: {
      fullDesc:
        "الاكتئاب مش 'حزن عادي' ولا ضعف شخصية. ده اضطراب طبي بيأثر على المخ والجسم والسلوك. بيصيب 1 من كل 6 أشخاص في حياتهم. السبب: خلل في الناقلات العصبية (سيروتونين، دوبامين) + عوامل وراثية + ضغوط حياتية. الخبر الكويس: 80-90% من المرضى بيتحسنوا تماماً مع العلاج الصحيح.",
      treatmentDetails: [
        { title: "العلاج النفسي (CBT)", body: "العلاج المعرفي السلوكي بيغيّر أنماط التفكير السلبية. 12-20 جلسة عادة كافية. فعّاليته زي الدواء في الحالات الخفيفة والمتوسطة." },
        { title: "مضادات الاكتئاب (SSRIs)", body: "مثل سيرترالين، فلوكستين، إسيتالوبرام. تحتاج 4-6 أسابيع لتظهر فعّاليتها. لازم تستمر 6-12 شهر بعد التحسن." },
        { title: "مضادات الاكتئاب (SNRIs)", body: "مثل فينلافاكسين ودولوكستين. مفيدة لما فيه ألم مزمن مصاحب." },
        { title: "العلاج بالضوء", body: "للاكتئاب الموسمي. 30 دقيقة يومياً أمام صندوق ضوء (10000 lux)." },
        { title: "TMS (تحفيز مغناطيسي عبر الجمجمة)", body: "للحالات المقاومة للدواء. غير جراحي وآمن." },
        { title: "الكيتامين / Esketamine", body: "علاج جديد للاكتئاب الشديد المقاوم. سريع المفعول لكن تحت إشراف طبي صارم." },
      ],
      stages: [
        { name: "خفيف", desc: "أعراض موجودة لكن الحياة اليومية ممكن تكمل" },
        { name: "متوسط", desc: "أعراض واضحة بتأثر على الشغل والعلاقات" },
        { name: "شديد", desc: "صعوبة في الوظائف الأساسية، احتمال أفكار انتحارية" },
      ],
      complications: [
        "أفكار أو محاولات انتحار",
        "إدمان الكحول أو المخدرات",
        "أمراض جسدية (قلب، سكري) بسبب الإهمال",
        "فشل دراسي أو وظيفي",
        "تدمير العلاقات الاجتماعية",
        "اضطرابات قلق مصاحبة",
      ],
      lifestyle: [
        "حافظ على روتين نوم منتظم (7-9 ساعات)",
        "اتمرّن 30 دقيقة يومياً (فعّاله زي مضاد اكتئاب خفيف)",
        "تعرّض للشمس صباحاً",
        "اتواصل مع شخص واحد على الأقل يومياً",
        "تجنّب الكحول والكافيين الزائد",
        "اكتب يومياتك أو 3 حاجات بتشكر عليها يومياً",
        "حدّد هدف صغير قابل للتحقيق كل يوم",
      ],
      prevention: [
        "تعلّم تقنيات إدارة التوتر بدري",
        "حافظ على شبكة دعم اجتماعي",
        "اطلب المساعدة فور ظهور الأعراض",
        "تجنّب العزلة الطويلة",
        "اعتني بصحتك الجسدية",
      ],
      faq: [
        { q: "هل الاكتئاب 'دلع' أو ضعف؟", a: "إطلاقاً. الاكتئاب مرض بيولوجي زي السكري والضغط. كلمة 'تماسك' أو 'فكر إيجابي' مش بتعالجه، زي ما مش بتعالج كسر في الرجل." },
        { q: "متى أحتاج طبيب نفسي؟", a: "لو أعراضك استمرت أكتر من أسبوعين، أو أثرت على شغلك أو علاقاتك، أو فيه أفكار انتحار. كل ما بدأت بدري كل ما كان أسرع." },
        { q: "مضادات الاكتئاب بتسبب إدمان؟", a: "لأ، مش بتسبب إدمان. لكن مينفعش توقفها فجأة، لازم تدريجياً تحت إشراف الطبيب." },
        { q: "هل هرجع زي الأول؟", a: "نعم في معظم الحالات. 80-90% بيتحسنوا تماماً. ممكن نوبة ترجع، بس بتعرف تتعامل معاها." },
        { q: "العلاج النفسي بيتكلم بس؟", a: "أكتر من كده. CBT بيعلّمك مهارات عملية لتغيير أفكارك ومشاعرك. ليه واجبات بين الجلسات." },
      ],
      redFlags: [
        "أفكار انتحار أو إيذاء النفس = اتصل فوراً بخط مساعدة نفسية",
        "خطة محددة للانتحار = طوارئ فورية",
        "هلوسات أو أوهام",
        "توقف تام عن الأكل والشرب",
        "أعراض ذهانية",
      ],
      diagnosis: [
        "9 أعراض لمدة أسبوعين على الأقل (تشخيص PHQ-9)",
        "تحاليل دم لاستبعاد قصور الغدة الدرقية",
        "تقييم نفسي شامل",
      ],
    },
    en: {
      fullDesc:
        "Depression isn't 'normal sadness' or weakness. It's a medical disorder affecting brain, body, and behavior. Affects 1 in 6 in their lifetime. Cause: neurotransmitter imbalance (serotonin, dopamine) + genetics + life stressors. Good news: 80-90% of patients fully recover with proper treatment.",
      treatmentDetails: [
        { title: "Psychotherapy (CBT)", body: "Cognitive behavioral therapy changes negative thought patterns. 12-20 sessions typically sufficient. As effective as medication for mild-to-moderate cases." },
        { title: "SSRIs", body: "Sertraline, fluoxetine, escitalopram. Need 4-6 weeks for full effect. Continue 6-12 months after improvement." },
        { title: "SNRIs", body: "Venlafaxine, duloxetine. Useful when chronic pain coexists." },
        { title: "Light therapy", body: "For seasonal affective disorder. 30 minutes daily in front of a 10,000-lux light box." },
        { title: "TMS (Transcranial Magnetic Stimulation)", body: "For treatment-resistant cases. Non-invasive and safe." },
        { title: "Ketamine / Esketamine", body: "New treatment for severe resistant depression. Fast-acting under strict medical supervision." },
      ],
      stages: [
        { name: "Mild", desc: "Symptoms present but daily life continues" },
        { name: "Moderate", desc: "Clear impact on work and relationships" },
        { name: "Severe", desc: "Basic functions impaired, possible suicidal thoughts" },
      ],
      complications: [
        "Suicidal thoughts or attempts",
        "Alcohol/drug addiction",
        "Physical illness from neglect",
        "Academic or career failure",
        "Damaged social relationships",
        "Comorbid anxiety disorders",
      ],
      lifestyle: [
        "Regular sleep schedule (7-9 hours)",
        "Exercise 30 min daily (as effective as mild antidepressant)",
        "Morning sun exposure",
        "Connect with at least one person daily",
        "Avoid alcohol and excess caffeine",
        "Journal or write 3 gratitudes daily",
        "Set one small achievable goal per day",
      ],
      prevention: [
        "Learn stress management techniques early",
        "Maintain social support network",
        "Seek help at first symptoms",
        "Avoid prolonged isolation",
        "Care for physical health",
      ],
      faq: [
        { q: "Is depression 'weakness'?", a: "Absolutely not. Depression is a biological illness like diabetes. 'Toughen up' or 'think positive' doesn't cure it any more than it cures a broken leg." },
        { q: "When do I need a psychiatrist?", a: "If symptoms last over 2 weeks, affect work/relationships, or include suicidal thoughts. Earlier intervention = faster recovery." },
        { q: "Are antidepressants addictive?", a: "No, not addictive. But never stop suddenly — taper under medical supervision." },
        { q: "Will I get back to normal?", a: "Yes in most cases. 80-90% fully recover. Relapses may occur, but you'll know how to handle them." },
        { q: "Is therapy just talking?", a: "Much more. CBT teaches practical skills to change thoughts and feelings. Includes between-session homework." },
      ],
      redFlags: [
        "Suicidal thoughts = call mental health crisis line immediately",
        "Specific suicide plan = immediate emergency",
        "Hallucinations or delusions",
        "Total food/drink refusal",
        "Psychotic features",
      ],
      diagnosis: [
        "9 symptoms for at least 2 weeks (PHQ-9)",
        "Blood tests to rule out hypothyroidism",
        "Comprehensive psychiatric evaluation",
      ],
    },
  },

  "anxiety": {
    ar: {
      fullDesc:
        "اضطراب القلق العام هو قلق مفرط ومستمر بخصوص أحداث يومية، أكتر من 6 شهور. مش مجرد توتر عادي. بيأثر على النوم والتركيز والعلاقات. يصيب 1 من كل 5 بالغين. السبب: تفاعل عوامل وراثية + كيمياء المخ + تجارب حياتية. قابل للعلاج بشكل ممتاز.",
      treatmentDetails: [
        { title: "CBT للقلق", body: "العلاج المفضل. بيعلّمك تتعرف على أفكارك المفاجئة وتعيد تقييمها. تقنيات التعرّض التدريجي للمخاوف. 80% بيتحسنوا." },
        { title: "SSRIs (سيرترالين، إسيتالوبرام)", body: "مضادات اكتئاب مفيدة للقلق المزمن. تحتاج 4-6 أسابيع. آمنة طويلة المدى." },
        { title: "Buspirone", body: "دواء قلق غير منوّم. يحتاج 2-4 أسابيع للمفعول. مفيد لكن أقل قوة من SSRIs." },
        { title: "البنزوديازيبينات (زاناكس، فاليوم)", body: "للأزمات الحادة فقط. سريعة المفعول لكن تسبب اعتماد لو استخدمت طويلاً. لا تأخذها أكتر من أسبوعين." },
        { title: "تقنيات استرخاء", body: "تنفس 4-7-8 (شهيق 4 ثواني، حبس 7، زفير 8). تأمل اليقظة الذهنية. اليوغا." },
      ],
      stages: [
        { name: "قلق طبيعي", desc: "محدود بموقف معين، يختفي بعد انتهائه" },
        { name: "قلق خفيف", desc: "يومي لكن لا يعطّل الحياة" },
        { name: "قلق متوسط", desc: "يؤثر على النوم والشغل" },
        { name: "قلق شديد + نوبات هلع", desc: "يحتاج تدخل طبي عاجل" },
      ],
      complications: [
        "اكتئاب مصاحب",
        "إدمان الكحول/الأدوية كهروب",
        "مشاكل قلب وضغط",
        "اضطرابات هضمية مزمنة",
        "عزلة اجتماعية",
        "نوبات هلع متكررة",
      ],
      lifestyle: [
        "قلّل الكافيين تماماً (بيزيد القلق)",
        "اتمرّن يومياً (بيخرج التوتر)",
        "نوم منتظم 7-9 ساعات",
        "تأمّل 10 دقايق يومياً",
        "حدّ من السوشيال ميديا والأخبار",
        "تجنّب الكحول كمسكّن وقتي",
        "اكتب أفكارك القلقة (Brain Dump)",
      ],
      prevention: [
        "إدارة التوتر بدري",
        "حافظ على علاقات داعمة",
        "اطلب المساعدة عند ظهور الأعراض",
        "مارس هواية ممتعة",
      ],
      faq: [
        { q: "إيه الفرق بين القلق ونوبة الهلع؟", a: "القلق مستمر منخفض الشدة. نوبة الهلع: ذروة شديدة (10 دقايق) خفقان، اختناق، إحساس بالموت. مفاجئة وعنيفة." },
        { q: "إزاي أوقف نوبة هلع؟", a: "1) ذكّر نفسك إنها هتعدي. 2) تنفس بطيء (4-7-8). 3) ركّز على 5 حاجات تشوفها، 4 تسمعها، 3 تلمسها (Grounding). 4) ميه باردة على الوش." },
        { q: "البنزو زي زاناكس آمن؟", a: "للاستخدام القصير فقط (أيام). الاستخدام الطويل بيسبب اعتماد جسدي وصعوبة إيقاف." },
        { q: "ينفع أعالج نفسي؟", a: "الحالات الخفيفة ممكن (CBT books, apps). المتوسطة والشديدة محتاجة متخصص." },
      ],
      redFlags: [
        "نوبات هلع يومية",
        "تجنّب كامل للخروج من البيت",
        "أفكار إيذاء النفس",
        "ألم صدر شديد (لازم استبعاد سبب قلبي)",
      ],
      diagnosis: [
        "GAD-7 questionnaire",
        "تقييم نفسي شامل",
        "تحاليل لاستبعاد فرط الغدة الدرقية",
      ],
    },
    en: {
      fullDesc:
        "Generalized anxiety disorder is excessive persistent worry about daily events, lasting more than 6 months. Not normal tension. Affects sleep, concentration, relationships. Affects 1 in 5 adults. Cause: genetics + brain chemistry + life experiences. Highly treatable.",
      treatmentDetails: [
        { title: "CBT for anxiety", body: "Preferred therapy. Teaches you to recognize and re-evaluate sudden thoughts. Gradual exposure techniques. 80% improve." },
        { title: "SSRIs (sertraline, escitalopram)", body: "Antidepressants useful for chronic anxiety. Need 4-6 weeks. Safe long-term." },
        { title: "Buspirone", body: "Non-sedating anxiety medication. Needs 2-4 weeks. Useful but less potent than SSRIs." },
        { title: "Benzodiazepines (Xanax, Valium)", body: "For acute crises only. Fast-acting but addictive long-term. Don't use over 2 weeks." },
        { title: "Relaxation techniques", body: "4-7-8 breathing. Mindfulness meditation. Yoga." },
      ],
      stages: [
        { name: "Normal anxiety", desc: "Tied to a specific situation, resolves after" },
        { name: "Mild anxiety", desc: "Daily but doesn't disrupt life" },
        { name: "Moderate anxiety", desc: "Affects sleep and work" },
        { name: "Severe + panic attacks", desc: "Needs urgent medical care" },
      ],
      complications: [
        "Comorbid depression",
        "Alcohol/drug abuse as escape",
        "Heart and BP issues",
        "Chronic GI disorders",
        "Social isolation",
        "Recurrent panic attacks",
      ],
      lifestyle: [
        "Eliminate caffeine (worsens anxiety)",
        "Daily exercise (releases tension)",
        "Regular sleep 7-9 hrs",
        "Meditate 10 min daily",
        "Limit social media and news",
        "Avoid alcohol as quick fix",
        "Brain-dump anxious thoughts on paper",
      ],
      prevention: [
        "Early stress management",
        "Maintain supportive relationships",
        "Seek help at symptom onset",
        "Pursue an enjoyable hobby",
      ],
      faq: [
        { q: "Difference between anxiety and panic attack?", a: "Anxiety is continuous low-grade. Panic attack: severe peak (10 min) with palpitations, choking, sense of impending doom. Sudden and intense." },
        { q: "How to stop a panic attack?", a: "1) Remind yourself it'll pass. 2) Slow breathing (4-7-8). 3) Grounding: 5 things you see, 4 hear, 3 touch. 4) Cold water on face." },
        { q: "Are benzos like Xanax safe?", a: "Short-term only (days). Long-term causes physical dependence and withdrawal." },
        { q: "Can I treat myself?", a: "Mild cases possibly (CBT books, apps). Moderate-severe need a specialist." },
      ],
      redFlags: [
        "Daily panic attacks",
        "Complete avoidance of leaving home",
        "Self-harm thoughts",
        "Severe chest pain (must rule out cardiac)",
      ],
      diagnosis: ["GAD-7 questionnaire", "Comprehensive psychiatric eval", "Tests to rule out hyperthyroidism"],
    },
  },
};

/** Merge static disease data with extended details. Returns enhanced disease. */
export function enhanceDisease<T extends { id: string; ar: DiseaseI18n; en: DiseaseI18n; whoUrl?: string }>(d: T): T {
  const patch = DISEASE_DETAILS[d.id] ?? DISEASE_DETAILS_EXT[d.id];
  const who = d.whoUrl ?? DISEASE_WHO_URLS[d.id];
  if (!patch && !who) return d;
  return {
    ...d,
    whoUrl: who,
    ar: { ...d.ar, ...(patch?.ar ?? {}) },
    en: { ...d.en, ...(patch?.en ?? {}) },
  };
}
