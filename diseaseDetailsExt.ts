// Extended details for the remaining diseases (Arabic + English).
// Same patch shape as diseaseDetails.ts.
import type { DiseaseI18n } from "./diseases";

type DetailPatch = Partial<Pick<DiseaseI18n,
  "fullDesc" | "treatmentDetails" | "stages" | "complications" |
  "lifestyle" | "prevention" | "faq" | "redFlags" | "diagnosis"
>>;

interface Entry { ar: DetailPatch; en: DetailPatch }

export const DISEASE_WHO_URLS: Record<string, string> = {
  "diabetes-type-2": "https://www.who.int/news-room/fact-sheets/detail/diabetes",
  "hypertension": "https://www.who.int/news-room/fact-sheets/detail/hypertension",
  "asthma": "https://www.who.int/news-room/fact-sheets/detail/asthma",
  "depression": "https://www.who.int/news-room/fact-sheets/detail/depression",
  "anxiety-gad": "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders",
  "heart-attack": "https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)",
  "stroke": "https://www.who.int/news-room/fact-sheets/detail/stroke-cerebrovascular-accident",
  "epilepsy-seizure": "https://www.who.int/news-room/fact-sheets/detail/epilepsy",
  "anemia-iron": "https://www.who.int/news-room/fact-sheets/detail/anaemia",
  "migraine": "https://www.who.int/news-room/fact-sheets/detail/headache-disorders",
  "gastritis": "https://medlineplus.gov/gastritis.html",
  "autism": "https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders",
  "adhd": "https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd",
  "down-syndrome": "https://www.who.int/news-room/fact-sheets/detail/down-syndrome",
  "bipolar": "https://www.who.int/news-room/fact-sheets/detail/bipolar-disorder",
  "schizophrenia": "https://www.who.int/news-room/fact-sheets/detail/schizophrenia",
  "ocd": "https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd",
  "ptsd": "https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd",
  "sickle-cell": "https://www.who.int/news-room/fact-sheets/detail/sickle-cell-disease",
  "cystic-fibrosis": "https://medlineplus.gov/cysticfibrosis.html",
  "duchenne": "https://medlineplus.gov/genetics/condition/duchenne-and-becker-muscular-dystrophy/",
  "huntington": "https://medlineplus.gov/genetics/condition/huntington-disease/",
  "marfan": "https://medlineplus.gov/genetics/condition/marfan-syndrome/",
  "ehlers-danlos": "https://medlineplus.gov/genetics/condition/ehlers-danlos-syndrome/",
  "wilson": "https://medlineplus.gov/genetics/condition/wilson-disease/",
  "pompe": "https://medlineplus.gov/genetics/condition/pompe-disease/",
  "als": "https://www.ninds.nih.gov/health-information/disorders/amyotrophic-lateral-sclerosis-als",
  "anaphylaxis": "https://medlineplus.gov/ency/article/000844.htm",
  "burns": "https://www.who.int/news-room/fact-sheets/detail/burns",
  "choking": "https://medlineplus.gov/ency/article/000049.htm",
  "severe-bleeding": "https://medlineplus.gov/bleeding.html",
};

export const DISEASE_DETAILS_EXT: Record<string, Entry> = {
  // ============ ASTHMA — already in DISEASE_DETAILS but in case missing ============

  // ============ HEART ATTACK ============
  "heart-attack": {
    ar: {
      fullDesc: "النوبة القلبية بتحصل لما شريان من شرايين القلب يتسد فجأة (في الغالب بسبب جلطة على لويحة كوليسترول)، فيتوقف الدم عن جزء من عضلة القلب ويبدأ ده الجزء يموت خلال دقايق. كل دقيقة تأخير = خلايا قلب بتموت ومش بترجع. السرعة في طلب الإسعاف هي الفرق بين الحياة وفقدان جزء كبير من القلب أو الموت.",
      treatmentDetails: [
        { title: "الإسعاف الفوري (الـ Golden Hour)", body: "اتصل بالإسعاف فوراً، اقعد المريض، فك أي ملابس ضيقة، وادّيله أسبرين 300mg يمضغه (لو مش حساس له)." },
        { title: "فتح الشريان (PCI / قسطرة)", body: "في المستشفى يدخّلوا أنبوب رفيع لفتح الشريان المسدود وتركيب دعامة (Stent). أفضل علاج لو اتعمل خلال 90 دقيقة." },
        { title: "أدوية مذيبة للجلطة", body: "لما القسطرة مش متاحة، أدوية زي Tenecteplase بتذوّب الجلطة (في خلال أول 3-12 ساعة)." },
        { title: "أدوية ما بعد النوبة", body: "أسبرين + كلوبيدوغريل (لمنع جلطات جديدة)، Statins للكوليسترول، Beta-blockers، ACE inhibitors لحماية القلب." },
        { title: "إعادة التأهيل القلبي", body: "برنامج تمارين ومتابعة لـ 6-12 أسبوع — بيقلل الوفيات 25% وبيرجّع المريض لحياته الطبيعية." },
      ],
      complications: ["فشل عضلة القلب", "اضطرابات نظم خطيرة", "جلطة جديدة", "تمزق جدار القلب (نادر لكن قاتل)"],
      lifestyle: ["امتنع عن التدخين فوراً", "حمية البحر المتوسط (سمك، خضار، زيت زيتون)", "30 دقيقة مشي يومياً", "تحكم في الضغط والسكر والكوليسترول", "تجنب التوتر الشديد"],
      prevention: ["لا للتدخين", "تحرك يومي", "وزن صحي", "فحص ضغط/كوليسترول/سكر سنوياً بعد سن 35", "أسبرين وقائي لمن لديه عوامل خطر (باستشارة الطبيب)"],
      faq: [
        { q: "هل ألم الكتف الأيسر دايماً نوبة قلبية؟", a: "لا، لكن ألم الصدر اللي بيمتد للكتف والفك مع تعرق وغثيان = طوارئ فوراً." },
        { q: "هل ممكن أرجع أشتغل؟", a: "أيوة، معظم الناس بيرجعوا خلال 4-6 أسابيع لو الوظيفة مش جسدية شاقة." },
        { q: "هل ممكن أمارس الجنس؟", a: "بعد 2-4 أسابيع لو مفيش أعراض في المشي السريع، استشر الطبيب." },
      ],
      redFlags: ["ألم صدر شديد لأكثر من 5 دقائق", "ألم ينتشر للذراع/الفك/الظهر", "تعرق بارد + غثيان + ضيق تنفس", "إغماء"],
      diagnosis: ["تخطيط قلب ECG", "إنزيمات قلب (Troponin)", "إيكو", "قسطرة تشخيصية"],
    },
    en: {
      fullDesc: "A heart attack happens when a coronary artery suddenly blocks (usually a clot on a cholesterol plaque), cutting blood to part of the heart muscle which begins dying within minutes. Every minute of delay = heart cells lost forever. Speed of EMS response is the difference between recovery and death.",
      treatmentDetails: [
        { title: "Immediate first response (Golden Hour)", body: "Call EMS immediately, sit the person down, loosen tight clothing, give 300mg aspirin to chew (if not allergic)." },
        { title: "Opening the artery (PCI/catheterization)", body: "In hospital they thread a tube to open the blocked artery and place a stent. Best within 90 minutes of arrival." },
        { title: "Clot-busting drugs (thrombolytics)", body: "When PCI isn't available, drugs like Tenecteplase dissolve the clot (within 3-12 hours of onset)." },
        { title: "Post-MI medications", body: "Aspirin + clopidogrel, statins, beta-blockers, ACE inhibitors — lifelong heart protection." },
        { title: "Cardiac rehabilitation", body: "Supervised exercise program for 6-12 weeks — reduces mortality 25% and restores normal life." },
      ],
      complications: ["Heart failure", "Dangerous arrhythmias", "New clot", "Heart wall rupture (rare, fatal)"],
      lifestyle: ["Stop smoking immediately", "Mediterranean diet", "30 min daily walk", "Control BP, sugar, cholesterol", "Avoid extreme stress"],
      prevention: ["No smoking", "Daily activity", "Healthy weight", "Annual BP/cholesterol/sugar after age 35", "Preventive aspirin if at risk (with doctor)"],
      faq: [
        { q: "Is left shoulder pain always a heart attack?", a: "No, but chest pain spreading to shoulder/jaw with sweating and nausea = emergency now." },
        { q: "Can I return to work?", a: "Yes, most people return in 4-6 weeks for non-physical jobs." },
        { q: "Can I have sex again?", a: "After 2-4 weeks if you can climb stairs without symptoms, ask your doctor." },
      ],
      redFlags: ["Chest pain >5 min", "Pain to arm/jaw/back", "Cold sweat + nausea + breathlessness", "Fainting"],
      diagnosis: ["ECG", "Cardiac enzymes (Troponin)", "Echocardiogram", "Coronary angiography"],
    },
  },

  // ============ STROKE ============
  "stroke": {
    ar: {
      fullDesc: "السكتة الدماغية بتحصل لما شريان في المخ يتسد (إقفارية - 85%) أو ينفجر (نزفية - 15%)، فبيتوقف وصول الأكسجين لخلايا المخ وتموت بسرعة. كل دقيقة بتموت 2 مليون خلية مخية. علامة FAST: Face (انحراف الوش)، Arm (ضعف الذراع)، Speech (تلعثم)، Time (وقت الإسعاف).",
      treatmentDetails: [
        { title: "اختبار FAST واتصل بالإسعاف فوراً", body: "لو شفت أي علامة من FAST، اتصل بالإسعاف فوراً وحدد وقت بداية الأعراض بدقة (مهم جداً للعلاج)." },
        { title: "تذويب الجلطة (tPA)", body: "حقنة بتذوّب الجلطة، لازم تتاخد خلال 4.5 ساعة من بداية الأعراض. بترجّع كثير من الوظائف لو اتأخدت بدري." },
        { title: "استخراج الجلطة ميكانيكياً (Thrombectomy)", body: "تدخل بالقسطرة لسحب الجلطة من شريان المخ. ممكن خلال 24 ساعة في حالات معينة." },
        { title: "إعادة التأهيل", body: "علاج طبيعي + علاج وظيفي + علاج نطق، يبدأ في المستشفى ويكمل 6-12 شهر. كل ما بدأ بدري كل ما الاسترداد أحسن." },
        { title: "الوقاية الثانوية", body: "أسبرين/كلوبيدوغريل، أدوية ضغط، Statins، تحكم في السكر — لمنع سكتة جديدة." },
      ],
      complications: ["شلل دائم", "مشاكل نطق وبلع", "اكتئاب", "تشنجات", "خطر سكتة جديدة"],
      lifestyle: ["تحكم في الضغط (الأهم)", "علاج الرجفان الأذيني لو موجود", "نزول وزن", "ممارسة رياضة", "وقف التدخين"],
      prevention: ["ضغط دم تحت 130/80", "علاج اضطرابات نظم القلب", "حمية صحية", "ممارسة رياضة منتظمة", "فحص دوري للكوليسترول والسكر"],
      faq: [
        { q: "هل ممكن أرجع طبيعي بعد السكتة؟", a: "حسب حجم السكتة وسرعة العلاج. كثير من المرضى بيرجعوا 70-90% مع تأهيل جيد." },
        { q: "إيه الفرق بين السكتة والجلطة العابرة (TIA)؟", a: "TIA أعراض بتروح خلال 24 ساعة لكن إنذار خطير لسكتة قادمة — لازم فحص فوري." },
      ],
      redFlags: ["انحراف الوش فجأة", "ضعف ذراع أو رجل فجأة", "تلعثم/صعوبة كلام", "صداع شديد مفاجئ", "فقدان توازن أو رؤية"],
      diagnosis: ["CT/MRI مخ فوراً", "تخطيط قلب", "دوبلر شرايين الرقبة", "تحاليل دم"],
    },
    en: {
      fullDesc: "Stroke happens when a brain artery blocks (ischemic - 85%) or bursts (hemorrhagic - 15%), cutting oxygen to brain cells which die rapidly. 2 million neurons die per minute. FAST: Face droop, Arm weakness, Speech slurred, Time to call EMS.",
      treatmentDetails: [
        { title: "FAST test and call EMS now", body: "If any FAST sign, call EMS and note the exact time symptoms started (critical for treatment)." },
        { title: "Clot-busting (tPA)", body: "IV drug that dissolves the clot, must be given within 4.5 hours of onset. Restores many functions if early." },
        { title: "Mechanical thrombectomy", body: "Catheter procedure to physically remove the clot. Possible up to 24 hours in selected cases." },
        { title: "Rehabilitation", body: "Physical + occupational + speech therapy, starting in hospital and continuing 6-12 months. Earlier = better recovery." },
        { title: "Secondary prevention", body: "Aspirin/clopidogrel, BP meds, statins, sugar control — prevent next stroke." },
      ],
      complications: ["Permanent paralysis", "Speech and swallowing issues", "Depression", "Seizures", "Recurrent stroke"],
      lifestyle: ["Tight BP control (most important)", "Treat AFib if present", "Lose weight", "Exercise", "Quit smoking"],
      prevention: ["BP < 130/80", "Treat arrhythmias", "Healthy diet", "Regular exercise", "Annual cholesterol/sugar check"],
      faq: [
        { q: "Can I fully recover?", a: "Depends on size and speed of treatment. Many recover 70-90% with good rehab." },
        { q: "What's a TIA (mini-stroke)?", a: "Symptoms resolve within 24h but it's a major warning — needs urgent workup." },
      ],
      redFlags: ["Sudden face droop", "Sudden arm/leg weakness", "Slurred speech", "Sudden severe headache", "Loss of balance or vision"],
      diagnosis: ["Urgent CT/MRI brain", "ECG", "Carotid Doppler", "Blood tests"],
    },
  },

  // ============ EPILEPSY ============
  "epilepsy-seizure": {
    ar: {
      fullDesc: "الصرع اضطراب مزمن في كهرباء المخ، بيؤدي لنوبات متكررة. النوبة ممكن تكون تشنج كامل بفقدان وعي، أو لحظات سرحان فقط (نوبات غيبة)، أو حركات لا إرادية في جزء من الجسم. ثلثي المرضى بيتحكموا تماماً في الأعراض بالأدوية ويعيشوا حياة طبيعية.",
      treatmentDetails: [
        { title: "أثناء النوبة", body: "حط المريض على جنبه، فك ملابسه الضيقة، شيل أي حاجة خطر حواليه. متحطش حاجة في فمه أبداً، متحاولش توقفه. سجل وقت بدء النوبة." },
        { title: "أدوية مضادة للصرع", body: "ليفيتيراسيتام، فالبروات، لاموتريجين، كاربامازيبين — اختيار الدواء حسب نوع النوبة. غالباً يُؤخذ مدى الحياة." },
        { title: "حمية الكيتو الطبية", body: "مفيدة جداً للأطفال المقاومين للأدوية، تقلل النوبات 50% أو أكتر." },
        { title: "محفز العصب المبهم (VNS)", body: "جهاز صغير يُزرع تحت الجلد لتحفيز العصب وتقليل النوبات في الحالات المقاومة." },
        { title: "جراحة الصرع", body: "للحالات اللي بييجي فيها التشنج من بؤرة محددة في المخ، إزالة هذه البؤرة بيشفي 60-80% من الحالات." },
      ],
      stages: [
        { name: "الهالة (Aura)", desc: "إحساس غريب قبل النوبة (شم، رؤية، خوف) — تحذير مهم." },
        { name: "النوبة (Ictal)", desc: "التشنجات الفعلية، تستمر ثواني لدقائق." },
        { name: "ما بعد النوبة (Post-ictal)", desc: "نعاس، تشوش، صداع لـ دقائق إلى ساعات." },
      ],
      complications: ["إصابات أثناء النوبة (سقوط، حروق)", "حالة الصرع المستمرة (status epilepticus) - طارئة", "غرق في حمام أو مسبح", "تأثير على القيادة والدراسة"],
      lifestyle: ["نام 7-8 ساعات (قلة النوم محفز رئيسي)", "تجنب الأضواء الوامضة لو حساس", "متشربش كحول", "خد دواءك بانتظام", "اعمل قلادة طبية تنبه للناس بالحالة"],
      prevention: ["الالتزام بالدواء", "نوم منتظم", "تجنب التوتر الزائد", "متشربش كحول", "تجنب المحفزات الفردية"],
      faq: [
        { q: "هل الصرع وراثي؟", a: "بعض الأنواع نعم، لكن معظم الحالات سبب غير معروف." },
        { q: "هل ممكن أسوق؟", a: "حسب القوانين، عادة بعد سنة بدون نوبات." },
        { q: "هل الحامل ممكن تخد دواء الصرع؟", a: "بعض الأدوية آمنة، لكن لازم تخطيط مع الطبيب قبل الحمل." },
      ],
      redFlags: ["نوبة تستمر أكثر من 5 دقائق", "نوبة جديدة لشخص لم تحدث له من قبل", "صعوبة تنفس بعد النوبة", "نوبتان متتاليتان بدون استرداد وعي بينهما", "إصابة شديدة أثناء النوبة"],
      diagnosis: ["تخطيط مخ EEG", "MRI مخ", "تحاليل دم", "تخطيط فيديو-EEG لتحديد البؤرة"],
    },
    en: {
      fullDesc: "Epilepsy is a chronic brain electrical disorder causing recurrent seizures. Seizures range from full convulsions with loss of consciousness to brief 'absence' staring, or involuntary movements in one body part. Two-thirds of patients control symptoms fully with medication and live normal lives.",
      treatmentDetails: [
        { title: "During a seizure", body: "Roll on side, loosen clothing, clear danger nearby. Never put anything in mouth, never try to stop movements. Time the seizure." },
        { title: "Anti-epileptic drugs", body: "Levetiracetam, valproate, lamotrigine, carbamazepine — choice depends on seizure type. Often lifelong." },
        { title: "Medical ketogenic diet", body: "Very helpful for drug-resistant pediatric cases, reduces seizures 50%+." },
        { title: "Vagus nerve stimulator (VNS)", body: "Small implanted device that reduces seizures in resistant cases." },
        { title: "Epilepsy surgery", body: "For seizures from a single focal area, removing it cures 60-80% of cases." },
      ],
      stages: [
        { name: "Aura", desc: "Strange sensation before seizure (smell, vision, fear) — important warning." },
        { name: "Ictal phase", desc: "The actual convulsions, seconds to minutes." },
        { name: "Post-ictal", desc: "Drowsiness, confusion, headache for minutes to hours." },
      ],
      complications: ["Injuries during seizure", "Status epilepticus (medical emergency)", "Drowning in bath/pool", "Driving and study restrictions"],
      lifestyle: ["Sleep 7-8h (sleep deprivation is a major trigger)", "Avoid flashing lights if sensitive", "No alcohol", "Take meds on time", "Wear medical alert ID"],
      prevention: ["Medication adherence", "Regular sleep", "Avoid excess stress", "No alcohol", "Avoid personal triggers"],
      faq: [
        { q: "Is epilepsy hereditary?", a: "Some types yes, most cases have unknown cause." },
        { q: "Can I drive?", a: "Per local laws, usually after 1 year seizure-free." },
        { q: "Can pregnant women take epilepsy meds?", a: "Some are safe but require pre-pregnancy planning with doctor." },
      ],
      redFlags: ["Seizure >5 minutes", "First-ever seizure", "Difficulty breathing after seizure", "Two consecutive seizures without recovery", "Serious injury during seizure"],
      diagnosis: ["EEG", "Brain MRI", "Blood tests", "Video-EEG to localize"],
    },
  },

  // ============ MIGRAINE ============
  "migraine": {
    ar: {
      fullDesc: "الصداع النصفي اضطراب عصبي مزمن، نوبات صداع نابض شديد في جانب واحد من الرأس مع غثيان وحساسية للضوء والصوت، تستمر 4-72 ساعة. أكثر من مجرد صداع — بيعطّل الحياة تماماً. ثلث المرضى بييجيلهم 'هالة' بصرية قبل النوبة.",
      treatmentDetails: [
        { title: "علاج النوبة الحادة", body: "إيبوبروفين/نابروكسين بدري + مضاد قيء، تريبتانز (سوماتريبتان) للنوبات المتوسطة-الشديدة. ادخل غرفة مظلمة هادئة." },
        { title: "علاج وقائي يومي", body: "Beta-blockers (بروبرانولول)، Topiramate، Amitriptyline — لو النوبات أكتر من 4 شهرياً." },
        { title: "حقن CGRP الجديدة", body: "Erenumab, Galcanezumab — حقنة شهرية، فعالية ممتازة، أعراض جانبية قليلة." },
        { title: "البوتوكس", body: "حقن كل 3 شهور للصداع النصفي المزمن (>15 يوم/شهر)." },
        { title: "تقنيات غير دوائية", body: "علاج معرفي سلوكي، تأمل، biofeedback، يوغا — تقلل التكرار بنسبة 30-50%." },
      ],
      complications: ["تحول لصداع مزمن يومي", "الإفراط في المسكنات (rebound headache)", "اكتئاب وقلق", "نقص إنتاجية في العمل/الدراسة"],
      lifestyle: ["سجل مذكرة صداع لمعرفة المحفزات", "نوم منتظم (نفس الميعاد كل يوم)", "متفوّتش وجبات", "اشرب 2 لتر ماء", "قلل كافيين تدريجياً"],
      prevention: ["تجنب المحفزات (شوكولاتة، جبنة قديمة، نبيذ، توتر، هرمونات)", "ممارسة رياضة منتظمة (مش وقت النوبة)", "نوم كافي ومنتظم", "تقنيات استرخاء"],
      faq: [
        { q: "هل الصداع النصفي وراثي؟", a: "نعم بنسبة كبيرة، لو أحد الوالدين مصاب الاحتمال 50%." },
        { q: "متى يبقى خطير؟", a: "لو الصداع 'الأسوأ في حياتك'، أو مع حمى/شلل/تشوش وعي = طوارئ." },
        { q: "هل الحمل بيخفف الصداع النصفي؟", a: "70% من النساء يتحسنّ في الثلث التاني والتالت." },
      ],
      redFlags: ["صداع 'الأسوأ في حياتك'", "صداع مع حمى وتيبس رقبة", "صداع مع شلل/تشوش", "صداع جديد بعد سن 50", "صداع بعد ضربة على الرأس"],
      diagnosis: ["تشخيص سريري بالأعراض", "MRI لاستبعاد أسباب أخرى عند الشك"],
    },
    en: {
      fullDesc: "Migraine is a chronic neurological disorder of severe one-sided throbbing headache with nausea, light/sound sensitivity, lasting 4-72 hours. More than 'just a headache' — fully disabling. A third of patients get a visual 'aura' beforehand.",
      treatmentDetails: [
        { title: "Acute attack", body: "Early ibuprofen/naproxen + antiemetic, triptans (sumatriptan) for moderate-severe. Dark, quiet room." },
        { title: "Daily preventive", body: "Beta-blockers (propranolol), topiramate, amitriptyline — if >4 attacks/month." },
        { title: "New CGRP injections", body: "Erenumab, galcanezumab — monthly injection, excellent efficacy, few side effects." },
        { title: "Botox", body: "Every 3 months for chronic migraine (>15 days/month)." },
        { title: "Non-drug techniques", body: "CBT, meditation, biofeedback, yoga — reduce frequency 30-50%." },
      ],
      complications: ["Transformation to chronic daily headache", "Medication overuse rebound", "Depression/anxiety", "Lost productivity"],
      lifestyle: ["Headache diary to find triggers", "Regular sleep (same time daily)", "Don't skip meals", "2L water/day", "Taper caffeine"],
      prevention: ["Avoid triggers (chocolate, aged cheese, wine, stress, hormones)", "Regular exercise (not during attack)", "Adequate regular sleep", "Relaxation techniques"],
      faq: [
        { q: "Is migraine hereditary?", a: "Highly — 50% chance if one parent has it." },
        { q: "When is it dangerous?", a: "If 'worst headache of your life', or with fever/paralysis/confusion = emergency." },
        { q: "Does pregnancy help?", a: "70% of women improve in 2nd/3rd trimester." },
      ],
      redFlags: ["'Worst headache ever'", "Headache with fever and stiff neck", "Headache with paralysis/confusion", "New headache after age 50", "Headache after head injury"],
      diagnosis: ["Clinical diagnosis", "MRI to rule out other causes if suspicious"],
    },
  },

  // ============ ANEMIA ============
  "anemia-iron": {
    ar: {
      fullDesc: "أنيميا نقص الحديد بتحصل لما الجسم ميكونش عنده حديد كافي لتصنيع الهيموجلوبين (اللي بيحمل الأكسجين في الدم). النتيجة: تعب، شحوب، ضيق نفس، خفقان. الأسباب الشائعة: نزيف الدورة الغزير، نقص الحديد في الأكل، فقدان دم من الجهاز الهضمي. هي أكثر أنواع الأنيميا شيوعاً عالمياً.",
      treatmentDetails: [
        { title: "حبوب حديد فموية", body: "Ferrous sulfate 325mg مرة-مرتين يومياً على معدة فاضية مع فيتامين C (لتحسين الامتصاص). تجنب القهوة/الشاي/منتجات الألبان قبل وبعد الحبة بساعتين." },
        { title: "حقن الحديد الوريدية", body: "للحالات الشديدة أو لما الفموي مش بينفع (سوء امتصاص، عدم تحمل). Iron sucrose أو Ferric carboxymaltose — جرعة واحدة بترفع الهيموجلوبين بسرعة." },
        { title: "علاج السبب الأساسي", body: "تحاليل لمعرفة سبب فقد الدم: منظار معدة وقولون لكبار السن، علاج نزيف الدورة، علاج البواسير." },
        { title: "نقل دم", body: "للحالات الشديدة جداً (هيموجلوبين <7) أو لو فيه أعراض قلبية." },
        { title: "تعديل النظام الغذائي", body: "كبدة، لحم أحمر، سبانخ، عدس، تمر، فول سوداني، تين مجفف، مع فيتامين C (ليمون، برتقال) لتحسين الامتصاص." },
      ],
      stages: [
        { name: "نقص حديد بدون أنيميا", desc: "مخزون الحديد (فيريتين) منخفض لكن الهيموجلوبين طبيعي. تعب وقلة تركيز." },
        { name: "أنيميا بسيطة", desc: "هيموجلوبين 10-12. أعراض خفيفة، علاج بالحبوب." },
        { name: "أنيميا متوسطة-شديدة", desc: "هيموجلوبين <10. أعراض واضحة، محتاج علاج مكثف." },
      ],
      complications: ["مشاكل قلبية (تضخم، فشل قلب)", "مشاكل في الحمل وتأخر نمو الجنين", "ضعف المناعة", "تأخر دراسي عند الأطفال"],
      lifestyle: ["كل وجبة فيها بروتين حيواني أو بقوليات", "اشرب عصير برتقال مع الحديد", "متشربش الشاي بعد الأكل مباشرة", "كرر تحليل الدم كل 3 شهور حتى التحسن"],
      prevention: ["نظام غذائي متنوع", "للحوامل: مكملات حديد", "علاج الدورة الغزيرة", "فحص دم سنوي للأطفال والمراهقات"],
      faq: [
        { q: "هل لازم آخذ حديد طول العمر؟", a: "لا، 3-6 شهور بعد ما الهيموجلوبين يرجع طبيعي + علاج السبب." },
        { q: "ليه الحبوب بتعمل إمساك؟", a: "أعراض شائعة، اشرب ماء كثير، كل ألياف، أو جرّب نوع آخر." },
        { q: "هل البراز الأسود طبيعي مع حبوب الحديد؟", a: "أيوة طبيعي وغير ضار." },
      ],
      redFlags: ["إغماء أو دوخة شديدة", "ضيق نفس عند المشي البسيط", "خفقان مستمر", "براز أسود قطراني (نزيف داخلي)"],
      diagnosis: ["CBC", "فيريتين، حديد، TIBC", "براز للدم الخفي", "منظار للحالات غير المبررة"],
    },
    en: {
      fullDesc: "Iron-deficiency anemia occurs when the body lacks enough iron to make hemoglobin (which carries oxygen). Results: fatigue, pallor, breathlessness, palpitations. Common causes: heavy menstruation, dietary deficiency, GI blood loss. The world's most common anemia.",
      treatmentDetails: [
        { title: "Oral iron tablets", body: "Ferrous sulfate 325mg 1-2x daily on empty stomach with vitamin C. Avoid coffee/tea/dairy 2h before and after." },
        { title: "IV iron", body: "For severe cases or oral failure. Iron sucrose or ferric carboxymaltose — single dose raises Hb fast." },
        { title: "Treat underlying cause", body: "Workup for blood loss: gastroscopy/colonoscopy in older adults, manage heavy periods, treat hemorrhoids." },
        { title: "Blood transfusion", body: "For very severe (Hb <7) or cardiac symptoms." },
        { title: "Dietary adjustment", body: "Liver, red meat, spinach, lentils, dates, peanuts, dried figs, with vitamin C (citrus) to boost absorption." },
      ],
      stages: [
        { name: "Iron deficiency without anemia", desc: "Low ferritin but normal Hb. Fatigue, poor concentration." },
        { name: "Mild anemia", desc: "Hb 10-12. Mild symptoms, treat with tablets." },
        { name: "Moderate-severe anemia", desc: "Hb <10. Clear symptoms, intensive treatment needed." },
      ],
      complications: ["Cardiac (enlargement, failure)", "Pregnancy complications and fetal growth delay", "Weak immunity", "School underperformance in kids"],
      lifestyle: ["Animal protein or legumes each meal", "Orange juice with iron", "No tea right after meals", "Repeat CBC every 3 months until improved"],
      prevention: ["Varied diet", "Iron supplements in pregnancy", "Treat heavy periods", "Annual blood test for children and adolescent girls"],
      faq: [
        { q: "Do I take iron forever?", a: "No, 3-6 months after Hb normalizes + treat the cause." },
        { q: "Why does iron cause constipation?", a: "Common — drink water, eat fiber, or try another form." },
        { q: "Black stool with iron is normal?", a: "Yes, harmless." },
      ],
      redFlags: ["Fainting or severe dizziness", "Breathless on mild walking", "Persistent palpitations", "Black tarry stool (GI bleed)"],
      diagnosis: ["CBC", "Ferritin, iron, TIBC", "Stool occult blood", "Endoscopy for unexplained cases"],
    },
  },

  // ============ GASTRITIS ============
  "gastritis": {
    ar: {
      fullDesc: "التهاب بطانة المعدة — حاد (مفاجئ) أو مزمن. الأسباب الشائعة: جرثومة المعدة (H. pylori)، مسكنات NSAIDs، الكحول، التوتر الشديد. لو ما اتعالجش ممكن يؤدي لقرحة معدة أو نزيف، ونادراً سرطان معدة.",
      treatmentDetails: [
        { title: "مثبطات مضخة البروتون (PPI)", body: "أوميبرازول، بانتوبرازول — تقلل حمض المعدة بشدة، تستخدم 4-8 أسابيع." },
        { title: "علاج جرثومة المعدة", body: "ثلاثي علاج لمدة 14 يوم: PPI + Amoxicillin + Clarithromycin. شفاء أكتر من 90%." },
        { title: "مضادات حموضة سريعة", body: "Maalox, Gaviscon — لتسكين فوري للأعراض." },
        { title: "حماية البطانة", body: "Sucralfate يكوّن طبقة حماية على البطانة الملتهبة." },
        { title: "إيقاف المسببات", body: "وقف NSAIDs، الكحول، التدخين، الأكل الحار جداً والقهوة." },
      ],
      complications: ["قرحة معدة", "نزيف هضمي", "ثقب في المعدة (نادر)", "زيادة خطر سرطان المعدة (مع جرثومة)"],
      lifestyle: ["كل وجبات صغيرة متكررة", "متاكلش قبل النوم بـ 3 ساعات", "ابعد عن الحار والمقلي والحمضيات أثناء النوبة", "قلل الكافيين", "اعمل تمارين استرخاء للتوتر"],
      prevention: ["متاخدش مسكنات NSAIDs على معدة فاضية", "علاج جرثومة المعدة لو موجودة", "تجنب الكحول", "نظافة الطعام والمياه (لمنع الجرثومة)"],
      faq: [
        { q: "هل التوتر يسبب قرحة فعلاً؟", a: "ميسببهاش مباشرة لكن بيزود الأعراض ويبطّئ الشفاء." },
        { q: "متى أعمل منظار؟", a: "لو الأعراض استمرت بعد العلاج، أو فيه نزيف، أو فقدان وزن، أو فوق سن 50." },
        { q: "هل اللبن مفيد للمعدة؟", a: "بيهدّي مؤقتاً لكن بيحفز إفراز حمض أكتر بعدها." },
      ],
      redFlags: ["قيء دموي أو بلون القهوة", "براز أسود قطراني", "ألم شديد جداً", "فقدان وزن غير مفسر", "صعوبة بلع"],
      diagnosis: ["تنفس اليوريا أو براز لجرثومة المعدة", "منظار معدة + خزعة", "تحاليل دم"],
    },
    en: {
      fullDesc: "Inflammation of the stomach lining — acute (sudden) or chronic. Common causes: H. pylori, NSAIDs, alcohol, severe stress. Untreated can cause ulcer, bleeding, rarely stomach cancer.",
      treatmentDetails: [
        { title: "Proton pump inhibitors (PPI)", body: "Omeprazole, pantoprazole — strong acid suppression for 4-8 weeks." },
        { title: "H. pylori treatment", body: "14-day triple therapy: PPI + amoxicillin + clarithromycin. >90% cure." },
        { title: "Fast antacids", body: "Maalox, Gaviscon — immediate symptom relief." },
        { title: "Mucosal protection", body: "Sucralfate forms a protective coat over inflamed lining." },
        { title: "Stop triggers", body: "Stop NSAIDs, alcohol, smoking, very spicy food, coffee." },
      ],
      complications: ["Stomach ulcer", "GI bleeding", "Perforation (rare)", "Increased stomach cancer risk (with H. pylori)"],
      lifestyle: ["Small frequent meals", "Don't eat 3h before bed", "Avoid spicy/fried/citrus during flare", "Reduce caffeine", "Stress relaxation"],
      prevention: ["No NSAIDs on empty stomach", "Treat H. pylori if positive", "Avoid alcohol", "Food/water hygiene (to prevent H. pylori)"],
      faq: [
        { q: "Does stress really cause ulcers?", a: "Doesn't directly, but worsens symptoms and slows healing." },
        { q: "When do I need endoscopy?", a: "If symptoms persist post-treatment, bleeding, weight loss, or over 50." },
        { q: "Is milk good for the stomach?", a: "Soothes briefly but triggers more acid afterward." },
      ],
      redFlags: ["Bloody or coffee-ground vomit", "Black tarry stool", "Very severe pain", "Unexplained weight loss", "Difficulty swallowing"],
      diagnosis: ["Urea breath or stool test for H. pylori", "Gastroscopy + biopsy", "Blood tests"],
    },
  },

  // ============ AUTISM ============
  "autism": {
    ar: {
      fullDesc: "اضطراب طيف التوحد (ASD) اضطراب نمائي عصبي بيظهر في الطفولة المبكرة، بيأثر على التواصل الاجتماعي، اللغة، والسلوك. 'طيف' لأن الأعراض بتختلف من خفيفة جداً (Asperger سابقاً) لشديدة. مش مرض يتشفى لكن مع التدخل المبكر، كثير من الأطفال بيوصلوا لاستقلالية كاملة وحياة منتجة.",
      treatmentDetails: [
        { title: "تحليل السلوك التطبيقي ABA", body: "أكتر علاج مدروس وفعال، 20-40 ساعة أسبوعياً. بيعلّم مهارات تواصل وحياة بطريقة منهجية." },
        { title: "علاج النطق واللغة", body: "ضروري جداً لمعظم الأطفال — يطور التواصل الكلامي وغير الكلامي (PECS، صور)." },
        { title: "علاج وظيفي (OT)", body: "يساعد في المهارات الحركية، التكامل الحسي، والاستقلالية في الأكل/اللبس/الحمام." },
        { title: "علاج التكامل الحسي", body: "للأطفال اللي عندهم حساسية حسية شديدة (أصوات، إضاءة، لمس) — يدربهم على التحمل التدريجي." },
        { title: "أدوية مساعدة", body: "مفيش دواء للتوحد نفسه، لكن أدوية للأعراض المصاحبة: قلق، ADHD، عدوانية، اضطرابات نوم. ريسبيردون وأريبيبرازول معتمدة للسلوك العدواني." },
        { title: "دعم تعليمي مخصص (IEP)", body: "خطة تعليمية فردية في المدرسة مع شادو/مساعد لو لازم." },
      ],
      stages: [
        { name: "علامات مبكرة (6-18 شهر)", desc: "قلة تواصل بصري، عدم استجابة للاسم، عدم الإشارة، تأخر كلام." },
        { name: "تشخيص (18 شهر - 3 سنوات)", desc: "أنسب وقت للتدخل المبكر — أكبر فرصة لتحسن جذري." },
        { name: "سن المدرسة", desc: "تحدي اجتماعي وأكاديمي، محتاج دعم متخصص." },
        { name: "المراهقة والبلوغ", desc: "تركيز على المهارات الحياتية، الاستقلالية، التوظيف." },
      ],
      complications: ["قلق واكتئاب", "صرع (في 25%)", "اضطرابات نوم", "صعوبة تكوين علاقات", "تنمر في المدرسة"],
      lifestyle: ["روتين يومي ثابت ومتوقع", "مساحة هادئة للهروب من المحفزات", "تواصل بصور وجداول", "مكافآت محسوسة للسلوك الإيجابي", "دعم نفسي للأهل والأخوة"],
      prevention: ["مفيش وقاية معروفة", "التدخل المبكر بيقلل الأعراض كثير", "متابعة نمو الطفل وتشخيص مبكر"],
      faq: [
        { q: "هل التطعيمات تسبب التوحد؟", a: "لا، ده اعتقاد خاطئ تماماً. مئات الدراسات أثبتت إنه مفيش علاقة." },
        { q: "هل ابني هيتكلم؟", a: "30% من المصابين لا يتكلمون كلاماً وظيفياً، لكن مع علاج النطق المكثف كثير منهم بيتكلموا." },
        { q: "هل التوحد وراثي؟", a: "عامل وراثي قوي، لو طفل عنده توحد، احتمال 1 من 5 إن طفل تالي يبقى عنده." },
      ],
      redFlags: ["إيذاء النفس", "نوبات عدوانية شديدة", "نوبات صرع جديدة", "تراجع شديد في المهارات", "اكتئاب أو أفكار انتحارية في المراهقة"],
      diagnosis: ["تقييم متخصص (طبيب نفسي أطفال)", "M-CHAT (للأطفال 16-30 شهر)", "ADOS-2", "تقييم سمع وكلام"],
    },
    en: {
      fullDesc: "Autism Spectrum Disorder (ASD) is a neurodevelopmental disorder appearing in early childhood, affecting social communication, language, and behavior. A 'spectrum' because symptoms vary from very mild (formerly Asperger's) to severe. Not curable but with early intervention many children reach full independence.",
      treatmentDetails: [
        { title: "Applied Behavior Analysis (ABA)", body: "Most studied effective therapy, 20-40 hrs/week. Teaches communication and life skills systematically." },
        { title: "Speech & language therapy", body: "Essential for most kids — develops verbal and non-verbal communication (PECS, pictures)." },
        { title: "Occupational therapy (OT)", body: "Helps motor skills, sensory integration, independence in eating/dressing/toileting." },
        { title: "Sensory integration therapy", body: "For children with severe sensory sensitivities (sound, light, touch) — gradual tolerance." },
        { title: "Medications", body: "No drug for autism itself, but for comorbidities: anxiety, ADHD, aggression, sleep. Risperidone/aripiprazole approved for aggression." },
        { title: "Individualized Education Plan (IEP)", body: "Personalized school plan with shadow/aide if needed." },
      ],
      stages: [
        { name: "Early signs (6-18 mo)", desc: "Poor eye contact, doesn't respond to name, no pointing, language delay." },
        { name: "Diagnosis (18 mo - 3 yrs)", desc: "Best window for early intervention — biggest chance for transformative improvement." },
        { name: "School age", desc: "Social and academic challenges, needs specialized support." },
        { name: "Adolescence/adulthood", desc: "Focus on life skills, independence, employment." },
      ],
      complications: ["Anxiety and depression", "Epilepsy (25%)", "Sleep disorders", "Difficulty forming relationships", "School bullying"],
      lifestyle: ["Stable predictable daily routine", "Quiet retreat space from stimuli", "Visual schedules and pictures", "Tangible rewards for positive behavior", "Family/sibling support"],
      prevention: ["No known prevention", "Early intervention dramatically reduces symptoms", "Track development for early diagnosis"],
      faq: [
        { q: "Do vaccines cause autism?", a: "No — completely false. Hundreds of studies show no link." },
        { q: "Will my child speak?", a: "30% remain non-verbal, but intensive speech therapy helps many speak." },
        { q: "Is autism hereditary?", a: "Strong genetic component — if one child has autism, 1 in 5 chance for next child." },
      ],
      redFlags: ["Self-injury", "Severe aggression episodes", "New seizures", "Severe skill regression", "Depression or suicidal thoughts in adolescence"],
      diagnosis: ["Child psychiatry evaluation", "M-CHAT (16-30 mo)", "ADOS-2", "Hearing & speech evaluation"],
    },
  },

  // ============ ADHD ============
  "adhd": {
    ar: {
      fullDesc: "اضطراب نقص الانتباه وفرط الحركة (ADHD) اضطراب نمائي عصبي بيأثر على القدرة على التركيز، التحكم في الاندفاعات، والنشاط الزائد. بيبدأ في الطفولة لكن بيستمر في 60% من الحالات في البالغين. مش 'كسل' أو 'تربية سيئة' — اختلاف حقيقي في كهرباء المخ. مع العلاج، الناس بنجاحات كبيرة.",
      treatmentDetails: [
        { title: "أدوية محفزة", body: "ميثيلفينيدات (ريتالين، كونسيرتا)، أمفيتامينات — أكتر العلاجات فعالية، تحسّن التركيز 70-80%." },
        { title: "أدوية غير محفزة", body: "أتوموكسيتين، جوانفاسين — للحالات اللي ميتحملش المحفزات." },
        { title: "علاج معرفي سلوكي (CBT)", body: "خاصة للبالغين — يعلّم استراتيجيات تنظيم وتخطيط." },
        { title: "تدريب الأهل (Parent Training)", body: "أهم من العلاج للطفل نفسه أحياناً — يعلّم الأهل تقنيات إدارة السلوك بدون عقاب." },
        { title: "دعم مدرسي", body: "خطة 504 أو IEP، جلوس قدام، فترات راحة، وقت إضافي للامتحانات." },
      ],
      complications: ["فشل دراسي", "حوادث (سيارات، إصابات)", "إدمان (3 مرات أكثر)", "اكتئاب وقلق", "مشاكل في العلاقات والوظيفة"],
      lifestyle: ["روتين يومي ثابت", "نوم 8-9 ساعات (الحرمان بيزود الأعراض)", "تمارين رياضية يومية", "تقليل سكر ومنبهات", "كتابة قوائم وتذكيرات", "تأمل/يوغا"],
      prevention: ["تجنب التدخين والكحول في الحمل", "نوم وتغذية جيدة للطفل", "بيئة منظمة وقليلة المحفزات"],
      faq: [
        { q: "هل أدوية ADHD بتسبب إدمان؟", a: "لا لما تتاخد بشكل صحيح، بل بتقلل خطر الإدمان لاحقاً." },
        { q: "هل البالغين بيتشخصوا بـ ADHD؟", a: "أيوة، كثير من البالغين بيتشخصوا متأخر بعد ما يلاقوا تفسير لمشاكلهم طول العمر." },
        { q: "هل اللعب الإلكتروني بيسبب ADHD؟", a: "لا، لكن مرضى ADHD أكتر عرضة للإدمان عليه." },
      ],
      redFlags: ["اكتئاب شديد أو أفكار انتحار", "إدمان مواد", "فشل دراسي/مهني شديد", "حوادث متكررة"],
      diagnosis: ["تقييم متخصص (نفسي أطفال أو نفسي بالغين)", "Vanderbilt scales", "ASRS للبالغين", "تقييم نفسي شامل"],
    },
    en: {
      fullDesc: "Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental disorder affecting focus, impulse control, and activity level. Starts in childhood, persists in 60% of adult cases. Not 'laziness' or 'bad parenting' — a real difference in brain wiring. With treatment, many achieve major success.",
      treatmentDetails: [
        { title: "Stimulant medications", body: "Methylphenidate (Ritalin, Concerta), amphetamines — most effective, improve focus 70-80%." },
        { title: "Non-stimulants", body: "Atomoxetine, guanfacine — for those who can't tolerate stimulants." },
        { title: "Cognitive Behavioral Therapy (CBT)", body: "Especially for adults — teaches organization and planning strategies." },
        { title: "Parent training", body: "Sometimes more important than child therapy — teaches non-punitive behavior management." },
        { title: "School support", body: "504 or IEP plan, front-row seating, breaks, extra exam time." },
      ],
      complications: ["Academic failure", "Accidents (cars, injuries)", "Addiction (3x more)", "Depression and anxiety", "Relationship and job problems"],
      lifestyle: ["Stable daily routine", "Sleep 8-9h (deprivation worsens symptoms)", "Daily exercise", "Less sugar and stimulants", "Lists and reminders", "Meditation/yoga"],
      prevention: ["No smoking/alcohol in pregnancy", "Good sleep and nutrition for child", "Organized low-stimulus environment"],
      faq: [
        { q: "Are ADHD meds addictive?", a: "No when taken properly — actually reduce later addiction risk." },
        { q: "Do adults get diagnosed with ADHD?", a: "Yes, many adults are diagnosed late after finding an explanation for lifelong struggles." },
        { q: "Do video games cause ADHD?", a: "No, but ADHD patients are more prone to gaming addiction." },
      ],
      redFlags: ["Severe depression or suicidal thoughts", "Substance abuse", "Severe academic/career failure", "Repeated accidents"],
      diagnosis: ["Specialist evaluation (child or adult psychiatry)", "Vanderbilt scales", "ASRS for adults", "Comprehensive psychological assessment"],
    },
  },

  // ============ DOWN SYNDROME ============
  "down-syndrome": {
    ar: {
      fullDesc: "متلازمة داون اضطراب وراثي بسبب وجود نسخة كاملة أو جزئية إضافية من كروموسوم 21 (Trisomy 21). بتسبب ملامح مميزة، تأخر نمو معرفي متفاوت، ومشاكل صحية مصاحبة. متوسط العمر دلوقتي 60+ سنة. مع التدخل المبكر والدعم، كثير من المصابين بيعيشوا حياة سعيدة ومنتجة، يشتغلوا، ويكوّنوا علاقات.",
      treatmentDetails: [
        { title: "تدخل مبكر (0-3 سنوات)", body: "علاج طبيعي ووظيفي ونطق من أول شهر — أهم استثمار في تطور الطفل." },
        { title: "علاج النطق", body: "ضروري لكل الأطفال، يبدأ مبكراً جداً (6 شهور) ويستمر سنين طويلة." },
        { title: "متابعة طبية مكثفة", body: "إيكو قلب عند الولادة (50% عندهم عيب قلبي)، فحص سمع وعين دوري، فحص غدة درقية سنوي، متابعة عظام الرقبة." },
        { title: "تعليم متخصص", body: "مدارس دامجة لو ممكن، أو مدارس تربية خاصة. التعلم بطيء لكن مستمر." },
        { title: "علاج الأمراض المصاحبة", body: "جراحة قلب لو لازم، علاج خمول الغدة الدرقية، نظارات/سماعة." },
        { title: "الاستقلالية والتوظيف", body: "في سن البلوغ، تدريب على المهارات الحياتية ووظائف بسيطة (كاشير، تنظيف، مساعد إداري)." },
      ],
      stages: [
        { name: "الرضاعة (0-1)", desc: "تركيز على التغذية، علاج عيب القلب لو موجود، تدخل مبكر." },
        { name: "الطفولة (2-12)", desc: "تطوير لغة، مهارات حياتية، تعليم منهجي." },
        { name: "المراهقة", desc: "بلوغ، تعليم اجتماعي، استقلالية تدريجية." },
        { name: "البلوغ", desc: "توظيف، استقلالية، علاقات. خطر مبكر لمرض ألزهايمر بعد 40." },
      ],
      complications: ["عيوب قلب خلقية (50%)", "خمول غدة درقية (40%)", "مشاكل سمع وعين", "عدم استقرار فقرات الرقبة", "ألزهايمر مبكر", "سرطان الدم (نادر لكن أعلى)"],
      lifestyle: ["نظام غذائي صحي (ميل للسمنة)", "نشاط بدني يومي", "متابعة طبية شاملة سنوية", "تدريب اجتماعي مستمر", "تعليم مهارات الحماية الجنسية"],
      prevention: ["مفيش وقاية، لكن سن الأم عامل (احتمال أعلى بعد 35)", "فحص ما قبل الولادة (NIPT) لمن في خطر", "فحوصات دم وموجات صوتية في الحمل"],
      faq: [
        { q: "هل ابني هيتعلم يتكلم ويقرا؟", a: "نعم، 90%+ بيتكلموا، وكثير بيتعلموا قراءة بسيطة على الأقل." },
        { q: "هل هيعيش لوحده يوماً ما؟", a: "كثير من البالغين بيعيشوا في بيوت مدعومة، البعض يعيش مستقل تماماً." },
        { q: "هل ممكن يتجوز؟", a: "نعم، كثير من البالغين بيكوّنوا علاقات وبيتجوزوا." },
        { q: "كيف أتعامل مع الأخوة؟", a: "افتح الموضوع، اشركهم في الرعاية بحدود، خليلهم وقت خاص ليهم." },
      ],
      redFlags: ["صعوبة تنفس مفاجئة (عيب قلبي)", "تعب شديد (خمول غدة)", "ألم رقبة أو ضعف أطراف (مشكلة فقرات)", "تراجع مفاجئ في القدرات (ممكن ألزهايمر مبكر)"],
      diagnosis: ["كاريوتايب (تحليل كروموسومات)", "إيكو قلب", "تحاليل غدة درقية دورية", "فحص سمع وعين"],
    },
    en: {
      fullDesc: "Down syndrome is a genetic condition caused by an extra full or partial copy of chromosome 21 (Trisomy 21). Causes distinctive features, variable cognitive delay, and associated health issues. Average lifespan now 60+. With early intervention and support, many live happy productive lives, work, and form relationships.",
      treatmentDetails: [
        { title: "Early intervention (0-3)", body: "Physical, occupational, and speech therapy from month one — the most important investment." },
        { title: "Speech therapy", body: "Essential for every child, starts very early (6 months) and continues for years." },
        { title: "Intensive medical follow-up", body: "Echo at birth (50% have heart defects), regular hearing/vision screens, annual thyroid, neck spine monitoring." },
        { title: "Specialized education", body: "Inclusive schools when possible, or special ed. Learning is slow but continuous." },
        { title: "Treatment of comorbidities", body: "Heart surgery if needed, hypothyroidism treatment, glasses/hearing aids." },
        { title: "Independence and employment", body: "In adulthood, training in life skills and simple jobs (cashier, cleaning, admin assistant)." },
      ],
      stages: [
        { name: "Infancy (0-1)", desc: "Focus on feeding, heart surgery if needed, early intervention." },
        { name: "Childhood (2-12)", desc: "Language, life skills, structured education." },
        { name: "Adolescence", desc: "Puberty, social skills, gradual independence." },
        { name: "Adulthood", desc: "Employment, independence, relationships. Early Alzheimer's risk after 40." },
      ],
      complications: ["Congenital heart defects (50%)", "Hypothyroidism (40%)", "Hearing/vision issues", "Cervical spine instability", "Early Alzheimer's", "Leukemia (rare but elevated)"],
      lifestyle: ["Healthy diet (obesity-prone)", "Daily physical activity", "Comprehensive annual checkups", "Continuous social training", "Sexual safety education"],
      prevention: ["No prevention, but maternal age is a factor (higher after 35)", "Prenatal screening (NIPT) for at-risk", "Pregnancy blood tests and ultrasound"],
      faq: [
        { q: "Will my child talk and read?", a: "Yes, 90%+ talk, many learn at least basic reading." },
        { q: "Will they live independently?", a: "Many live in supported housing, some are fully independent." },
        { q: "Can they marry?", a: "Yes, many adults form relationships and marry." },
        { q: "How do I support siblings?", a: "Be open, involve them in care within limits, give them dedicated time." },
      ],
      redFlags: ["Sudden breathing difficulty (heart defect)", "Extreme fatigue (thyroid)", "Neck pain or limb weakness (spine issue)", "Sudden skill regression (possible early Alzheimer's)"],
      diagnosis: ["Karyotype", "Echocardiogram", "Periodic thyroid tests", "Hearing and vision screens"],
    },
  },

  // ============ BIPOLAR ============
  "bipolar": {
    ar: {
      fullDesc: "الاضطراب ثنائي القطب اضطراب مزاجي بيأرجح المريض بين نوبات هوس (طاقة شديدة، قلة نوم، اندفاعات) ونوبات اكتئاب عميقة. بيبدأ غالباً في المراهقة أو العشرينات. اضطراب مزمن لكن مع علاج مستمر، أغلب المرضى بيعيشوا حياة طبيعية ومنتجة.",
      treatmentDetails: [
        { title: "مثبتات المزاج (الأهم)", body: "ليثيوم — العلاج الذهبي، يقلل النوبات والانتحار. فالبروات، لاموتريجين كبدائل." },
        { title: "مضادات ذهان", body: "أوريبيبرازول، كيتيابين، أولانزابين — للنوبات الحادة وللوقاية." },
        { title: "مضادات اكتئاب (بحذر)", body: "تستخدم فقط مع مثبت مزاج، لأنها لوحدها بتحفز نوبة هوس." },
        { title: "العلاج المعرفي السلوكي والتثقيف النفسي", body: "تعلم التعرف على علامات النوبة المبكرة والتعامل معها." },
        { title: "الصدمات الكهربائية (ECT)", body: "للحالات الشديدة المقاومة، آمن وفعال جداً." },
      ],
      complications: ["انتحار (15% من المرضى)", "إدمان مواد", "مشاكل مالية ووظيفية", "علاقات متضررة", "نوبات ذهان"],
      lifestyle: ["نوم منتظم جداً (الأهم! اختلاف ساعتين بيحفز نوبة)", "تجنب الكحول والمخدرات تماماً", "كتابة مذكرة مزاج يومية", "ممارسة رياضة منتظمة", "تجنب التغيرات المفاجئة في الجدول"],
      prevention: ["الالتزام بالأدوية حتى لما تحس بتحسن", "متابعة دورية مع طبيب نفسي", "نظام يوم/نوم منتظم", "دعم عائلي مستمر"],
      faq: [
        { q: "هل أقدر أتجوز وأنجب؟", a: "نعم، مع تخطيط مع الطبيب لتعديل الأدوية في الحمل." },
        { q: "هل ممكن أوقف الأدوية لما أحس بتحسن؟", a: "لا، إيقاف الأدوية أكبر سبب لرجوع النوبات. الالتزام مدى الحياة." },
        { q: "إيه الفرق بين بايبولار 1 و 2؟", a: "النوع 1 فيه نوبات هوس كاملة، النوع 2 نوبات هوس خفيف (هايبومانيا) + اكتئاب." },
      ],
      redFlags: ["أفكار انتحار", "أعراض ذهانية (هلاوس، أوهام)", "اندفاعات خطيرة (إنفاق ضخم، علاقات خطرة)", "عدم النوم لأيام", "عدوانية شديدة"],
      diagnosis: ["تقييم نفسي مفصل", "تاريخ مزاج طويل", "استبعاد أسباب طبية (غدة درقية)", "تقييم مخاطر انتحار"],
    },
    en: {
      fullDesc: "Bipolar disorder is a mood disorder swinging between manic episodes (high energy, no sleep, impulsivity) and deep depression. Often begins in adolescence or 20s. Chronic but with continuous treatment most patients lead normal productive lives.",
      treatmentDetails: [
        { title: "Mood stabilizers (most important)", body: "Lithium — gold standard, reduces episodes and suicide. Valproate, lamotrigine as alternatives." },
        { title: "Antipsychotics", body: "Aripiprazole, quetiapine, olanzapine — for acute episodes and prevention." },
        { title: "Antidepressants (with caution)", body: "Only with mood stabilizer; alone can trigger mania." },
        { title: "CBT and psychoeducation", body: "Learn to recognize early episode signs and respond." },
        { title: "ECT", body: "For severe resistant cases — safe and very effective." },
      ],
      complications: ["Suicide (15% of patients)", "Substance abuse", "Financial and career issues", "Damaged relationships", "Psychotic episodes"],
      lifestyle: ["Very regular sleep (most critical! 2hr shift can trigger episode)", "Strictly avoid alcohol/drugs", "Daily mood journal", "Regular exercise", "Avoid sudden schedule changes"],
      prevention: ["Med adherence even when feeling well", "Regular psychiatry follow-up", "Regular sleep/wake schedule", "Continuous family support"],
      faq: [
        { q: "Can I marry and have children?", a: "Yes, with planning to adjust meds in pregnancy." },
        { q: "Can I stop meds when I feel better?", a: "No — stopping is the #1 reason for relapse. Lifelong adherence." },
        { q: "Difference between Bipolar I and II?", a: "Type I has full mania; Type II has hypomania + depression." },
      ],
      redFlags: ["Suicidal thoughts", "Psychotic symptoms (hallucinations, delusions)", "Dangerous impulsivity (huge spending, risky sex)", "No sleep for days", "Severe aggression"],
      diagnosis: ["Detailed psychiatric assessment", "Long mood history", "Rule out medical causes (thyroid)", "Suicide risk assessment"],
    },
  },

  // ============ SCHIZOPHRENIA ============
  "schizophrenia": {
    ar: {
      fullDesc: "الفصام اضطراب نفسي مزمن شديد بيأثر على التفكير، الإدراك، والسلوك. الأعراض تشمل هلاوس (سماع أصوات)، أوهام (معتقدات خاطئة قوية)، تفكير غير منظم، انعزال اجتماعي. بيبدأ غالباً في المراهقة المتأخرة أو العشرينات. مع العلاج المستمر، 25% بيتعافوا تماماً، 50% يعيشوا حياة شبه طبيعية.",
      treatmentDetails: [
        { title: "مضادات الذهان", body: "أوريبيبرازول، ريسبيردون، أولانزابين، كلوزابين (للحالات المقاومة) — العلاج الأساسي مدى الحياة." },
        { title: "حقن طويلة المفعول", body: "حقنة كل شهر أو 3 شهور — تحل مشكلة عدم الالتزام بالحبوب." },
        { title: "إعادة التأهيل النفسي والاجتماعي", body: "تعلم مهارات حياة، عمل، علاقات، استقلالية." },
        { title: "علاج معرفي سلوكي للذهان (CBTp)", body: "يساعد المريض في التعامل مع الأصوات والأوهام." },
        { title: "دعم الأسرة (Family therapy)", body: "تعلم الأسرة كيف تتعامل وتقلل التوتر — يقلل الانتكاسات بشكل كبير." },
      ],
      complications: ["انتحار (5-10%)", "إدمان مواد", "تشرد", "بطالة", "أمراض جسدية مهملة (سكر، قلب)"],
      lifestyle: ["الالتزام التام بالدواء", "تجنب الحشيش والكحول (يحفزوا الذهان)", "روتين يومي بسيط", "علاقات داعمة محدودة", "ممارسة رياضة"],
      prevention: ["تجنب الحشيش (محفز قوي للأشخاص المعرضين)", "تشخيص وعلاج مبكر بتغير المسار", "إدارة التوتر"],
      faq: [
        { q: "هل الفصام يعني تعدد شخصيات؟", a: "لا، ده اعتقاد خاطئ. الفصام اضطراب في الإدراك والتفكير." },
        { q: "هل المريض خطير؟", a: "أغلبية المرضى مش عنيفين، هما أكتر عرضة لإيذاء نفسهم." },
        { q: "هل ممكن يشتغل ويتجوز؟", a: "نعم لما يكون مستقر على العلاج." },
      ],
      redFlags: ["أفكار أو محاولة انتحار", "هلاوس آمرة بإيذاء نفسه أو غيره", "عدم الأكل أو الشرب لفترات", "عدوانية شديدة", "إهمال شديد للنظافة الشخصية"],
      diagnosis: ["تقييم نفسي شامل", "ملاحظة الأعراض لأكثر من 6 شهور", "استبعاد أسباب طبية (ورم، تخدير)", "صور مخ في بعض الحالات"],
    },
    en: {
      fullDesc: "Schizophrenia is a chronic severe psychiatric disorder affecting thinking, perception, and behavior. Symptoms include hallucinations (hearing voices), delusions (strong false beliefs), disorganized thinking, social withdrawal. Often starts late teens or 20s. With continuous treatment, 25% fully recover, 50% live near-normal lives.",
      treatmentDetails: [
        { title: "Antipsychotics", body: "Aripiprazole, risperidone, olanzapine, clozapine (resistant cases) — lifelong primary treatment." },
        { title: "Long-acting injections", body: "Monthly or 3-monthly shot — solves adherence issues." },
        { title: "Psychosocial rehabilitation", body: "Life skills, work, relationships, independence." },
        { title: "CBT for psychosis (CBTp)", body: "Helps patient cope with voices and delusions." },
        { title: "Family therapy", body: "Family learns to support and reduce stress — drastically cuts relapses." },
      ],
      complications: ["Suicide (5-10%)", "Substance abuse", "Homelessness", "Unemployment", "Neglected physical illness"],
      lifestyle: ["Strict med adherence", "Avoid cannabis and alcohol (trigger psychosis)", "Simple daily routine", "Limited supportive relationships", "Exercise"],
      prevention: ["Avoid cannabis (strong trigger in vulnerable)", "Early diagnosis and treatment changes course", "Stress management"],
      faq: [
        { q: "Does schizophrenia mean multiple personalities?", a: "No, that's a myth. It's a perception and thought disorder." },
        { q: "Are patients dangerous?", a: "Most are not violent — they're more likely to harm themselves." },
        { q: "Can they work and marry?", a: "Yes when stable on treatment." },
      ],
      redFlags: ["Suicidal thoughts/attempts", "Command hallucinations to harm self/others", "Not eating/drinking for periods", "Severe aggression", "Severe self-care neglect"],
      diagnosis: ["Comprehensive psychiatric assessment", "Symptoms >6 months", "Rule out medical causes (tumor, drugs)", "Brain imaging in select cases"],
    },
  },

  // ============ OCD ============
  "ocd": {
    ar: {
      fullDesc: "اضطراب الوسواس القهري بيتميز بأفكار وسواسية متكررة (قلق من تلوث، شك، أفكار مقتحمة) وأفعال قهرية بيعملها المريض لتخفيف القلق (غسيل أيدي متكرر، فحص متكرر، عد). الأفعال بتاخد ساعات يومياً وبتعطل الحياة. مش 'وسوسة' عادية — مرض حقيقي يستجيب للعلاج.",
      treatmentDetails: [
        { title: "العلاج بالتعرض ومنع الاستجابة (ERP)", body: "أفضل علاج. المريض يتعرض للمحفز (يلمس حاجة 'متسخة') ومن غير ما يعمل الفعل القهري (الغسيل). تدريجياً القلق بينقص." },
        { title: "مثبطات السيروتونين الانتقائية (SSRIs)", body: "فلوكسيتين، سيرترالين بجرعات أعلى من الاكتئاب. تحتاج 8-12 أسبوع لتظهر." },
        { title: "كلوميبرامين", body: "مضاد اكتئاب قديم لكن فعال جداً للوسواس." },
        { title: "العلاج المعرفي السلوكي (CBT)", body: "تحدي الأفكار الوسواسية وتقليل تصديقها." },
        { title: "تحفيز المخ العميق (DBS)", body: "للحالات الشديدة جداً المقاومة لكل العلاجات." },
      ],
      complications: ["اكتئاب", "تعطل دراسي ووظيفي", "علاقات متضررة", "إدمان مواد للهروب", "تشققات جلد من الغسيل المفرط"],
      lifestyle: ["مارس ERP يومياً (تعرض تدريجي)", "تجنب الطمأنة المفرطة من الأهل (تزود الحالة)", "نوم منتظم", "تأمل وأذكار", "تقليل الكافيين"],
      prevention: ["تشخيص مبكر يحسن النتائج", "علاج التوتر المزمن"],
      faq: [
        { q: "هل لو وسواسي ديني يبقى ضعف إيمان؟", a: "لا، ده مرض، والعلاج جزء من الأخذ بالأسباب. اطلب فتوى من شيخ متفهم للحالة." },
        { q: "هل العلاج بيخلي الوسواس يختفي خالص؟", a: "في 60-70% بيقل بشكل كبير، البعض يختفي تماماً." },
        { q: "هل الأفكار المقتحمة المخيفة تعني إني مجنون؟", a: "لا، 90% من الناس عندهم أفكار مقتحمة، الفرق إن مريض الوسواس بيعطيها أهمية." },
      ],
      redFlags: ["أفكار انتحار", "وسواس بإيذاء النفس أو طفل", "عجز عن الخروج من البيت", "تشققات وعدوى من الغسيل المفرط"],
      diagnosis: ["مقياس Y-BOCS", "تقييم نفسي مفصل", "تمييز عن اضطرابات أخرى"],
    },
    en: {
      fullDesc: "OCD features recurrent obsessive thoughts (contamination fears, doubt, intrusive thoughts) and compulsive actions to relieve anxiety (repeated handwashing, checking, counting). Actions take hours daily and disrupt life. Not normal 'pickiness' — a real illness that responds to treatment.",
      treatmentDetails: [
        { title: "Exposure and Response Prevention (ERP)", body: "Best treatment. Patient faces trigger (touches 'dirty' object) without doing the compulsion. Anxiety gradually drops." },
        { title: "SSRIs", body: "Fluoxetine, sertraline at higher doses than for depression. Need 8-12 weeks." },
        { title: "Clomipramine", body: "Older antidepressant but very effective for OCD." },
        { title: "CBT", body: "Challenge obsessive thoughts and reduce belief in them." },
        { title: "Deep Brain Stimulation (DBS)", body: "For very severe resistant cases." },
      ],
      complications: ["Depression", "Academic and work disability", "Damaged relationships", "Substance abuse to escape", "Skin damage from over-washing"],
      lifestyle: ["Daily ERP practice", "Avoid excess reassurance from family (feeds the condition)", "Regular sleep", "Meditation", "Less caffeine"],
      prevention: ["Early diagnosis improves outcomes", "Manage chronic stress"],
      faq: [
        { q: "If I have religious OCD am I weak in faith?", a: "No, it's an illness — treatment is part of taking responsibility." },
        { q: "Does treatment make OCD disappear?", a: "60-70% see major reduction; some achieve full remission." },
        { q: "Do scary intrusive thoughts mean I'm crazy?", a: "No, 90% of people have intrusive thoughts — OCD patients just attach importance to them." },
      ],
      redFlags: ["Suicidal thoughts", "Obsessions about harming self or child", "Unable to leave home", "Skin cracks/infection from over-washing"],
      diagnosis: ["Y-BOCS scale", "Detailed psychiatric assessment", "Differentiate from other disorders"],
    },
  },

  // ============ PTSD ============
  "ptsd": {
    ar: {
      fullDesc: "اضطراب ما بعد الصدمة بيحصل بعد التعرض لحدث صادم (حرب، اعتداء، حادث، كارثة). أعراضه: استرجاع الحدث (فلاش باك، كوابيس)، تجنب أي شيء يذكر بالحدث، تيقظ مفرط (سهولة الفزع، أرق)، تغير في المزاج. مش ضعف — ده استجابة بيولوجية لصدمة شديدة، وقابل للعلاج تماماً.",
      treatmentDetails: [
        { title: "علاج EMDR", body: "حركات عين موجهة أثناء استدعاء الذكرى، طريقة مثبتة لإعادة معالجة الصدمة." },
        { title: "العلاج المعرفي السلوكي المركز على الصدمة (TF-CBT)", body: "يساعد المريض على إعادة فهم الحدث وتقليل تأثيره." },
        { title: "العلاج بالتعرض الطويل (PE)", body: "تعرض تدريجي للذكرى والمحفزات حتى ينخفض القلق." },
        { title: "أدوية", body: "SSRIs (سيرترالين، باروكسيتين)، برازوسين للكوابيس، أدوية نوم قصيرة المدى." },
        { title: "مجموعات دعم", body: "خاصة الناجين من نفس النوع من الصدمة (حرب، اعتداء)." },
      ],
      complications: ["اكتئاب", "إدمان مواد للهروب", "أفكار انتحار", "عزلة ومشاكل علاقات", "أمراض جسدية (قلب، مناعة)"],
      lifestyle: ["تقنيات تأريض (5-4-3-2-1) وقت الفلاش باك", "تأمل وتنفس عميق", "ممارسة رياضة (خاصة يوغا)", "تجنب الكحول والمنبهات", "روتين نوم منتظم"],
      prevention: ["دعم نفسي مبكر بعد الصدمة", "تجنب العزلة بعد الحدث", "علاج بدري لو ظهرت الأعراض"],
      faq: [
        { q: "ميرفعش الكلام عن الصدمة بس يخليها أسوأ؟", a: "العكس، تجنب الحديث عنها بطريقة علاجية بيخليها مدفونة وأقوى. العلاج المتدرج بيعالجها." },
        { q: "هل ممكن أتعالج لو الصدمة من سنين؟", a: "نعم، PTSD يستجيب للعلاج حتى بعد عقود." },
      ],
      redFlags: ["أفكار انتحار", "نوبات فلاش باك شديدة", "إدمان مواد", "عنف منزلي", "عجز شديد عن العمل أو الخروج"],
      diagnosis: ["تقييم نفسي مفصل", "PCL-5 scale", "تاريخ الصدمة والأعراض لأكثر من شهر"],
    },
    en: {
      fullDesc: "PTSD develops after exposure to a traumatic event (war, assault, accident, disaster). Symptoms: re-experiencing (flashbacks, nightmares), avoidance of reminders, hyperarousal (easily startled, insomnia), mood changes. Not weakness — a biological response to severe trauma, fully treatable.",
      treatmentDetails: [
        { title: "EMDR therapy", body: "Guided eye movements while recalling memory — proven method to reprocess trauma." },
        { title: "Trauma-Focused CBT (TF-CBT)", body: "Helps reinterpret the event and reduce its impact." },
        { title: "Prolonged Exposure (PE)", body: "Gradual exposure to memory and triggers until anxiety drops." },
        { title: "Medications", body: "SSRIs (sertraline, paroxetine), prazosin for nightmares, short-term sleep aids." },
        { title: "Support groups", body: "Especially survivors of similar trauma (combat, assault)." },
      ],
      complications: ["Depression", "Substance abuse to escape", "Suicidal thoughts", "Isolation and relationship problems", "Physical illness (heart, immunity)"],
      lifestyle: ["Grounding techniques (5-4-3-2-1) during flashbacks", "Meditation and deep breathing", "Exercise (especially yoga)", "Avoid alcohol and stimulants", "Regular sleep routine"],
      prevention: ["Early psychological support post-trauma", "Avoid isolation after event", "Early treatment if symptoms emerge"],
      faq: [
        { q: "Doesn't talking about trauma make it worse?", a: "Opposite — avoidance keeps it buried and stronger. Gradual therapy heals it." },
        { q: "Can I be treated if trauma was years ago?", a: "Yes, PTSD responds even decades later." },
      ],
      redFlags: ["Suicidal thoughts", "Severe flashback episodes", "Substance abuse", "Domestic violence", "Severe inability to work or leave home"],
      diagnosis: ["Detailed psychiatric assessment", "PCL-5 scale", "Trauma history and symptoms >1 month"],
    },
  },

  // ============ ANAPHYLAXIS ============
  "anaphylaxis": {
    ar: {
      fullDesc: "تفاعل تحسسي شديد ومفاجئ يهدد الحياة، بيحصل خلال دقائق من التعرض للمحفز (مكسرات، أدوية، لدغة نحل، مأكولات بحرية). بيسبب ضيق تنفس، انخفاض ضغط، انتفاخ حلق، إغماء. كل دقيقة تأخير = خطر موت. الإبينفرين (الأدرينالين) هو العلاج المنقذ.",
      treatmentDetails: [
        { title: "حقن EpiPen فوراً", body: "حقنة أدرينالين في فخذ (حتى من فوق الملابس). لو الأعراض ما تحسنتش خلال 5-15 دقيقة، حقنة تانية." },
        { title: "اتصل بالإسعاف فوراً", body: "حتى لو تحسن بعد الحقنة — لازم مراقبة في المستشفى لـ 4-6 ساعات (موجة تانية ممكنة)." },
        { title: "وضعية الاستلقاء مع رفع الرجلين", body: "لو فيه دوخة أو إغماء — يحسن وصول الدم للمخ." },
        { title: "علاج المستشفى", body: "أدرينالين إضافي، أوكسجين، مضادات هيستامين IV، كورتيزون، سوائل وريدية، مراقبة قلب." },
        { title: "متابعة بعد ذلك", body: "تشخيص المسبب بدقة، وصف EpiPen محمول دائماً (2 حقن)، تدريب الأهل والمدرسة." },
      ],
      complications: ["وفاة (لو ما اتعالجش)", "نقص أكسجين دائم للمخ", "نوبة قلبية", "موجة تانية بعد ساعات (Biphasic)"],
      lifestyle: ["احمل EpiPen دائماً (2 حقن)", "اقرا مكونات كل أكل بعناية", "بلّغ المطاعم بالحساسية بقوة", "اعمل سوار طبي", "درّب الأهل والمدرسة على EpiPen"],
      prevention: ["تجنب تام للمحفز المعروف", "اختبارات حساسية لتحديد المثيرات", "علاج بطيء بالحساسية (Immunotherapy) لبعض الحالات", "تأكد من جواز سفرك فيه EpiPen قبل السفر"],
      faq: [
        { q: "هل EpiPen خطير؟", a: "تأخيره خطر، استعماله آمن جداً. لو شك = اضرب EpiPen." },
        { q: "هل الحساسية ممكن تختفي؟", a: "بعض حساسيات الطعام عند الأطفال (حليب، بيض) ممكن تختفي. حساسية المكسرات والمأكولات البحرية غالباً مدى الحياة." },
      ],
      redFlags: ["ضيق تنفس أو صفير", "انتفاخ شفايف، لسان، حلق", "دوخة أو إغماء", "طفح أحمر مع حكة شديدة", "قيء وإسهال بعد التعرض لمحفز"],
      diagnosis: ["تشخيص سريري سريع للأعراض", "تحاليل دم (Tryptase) خلال 6 ساعات", "اختبار جلدي للحساسية بعد التعافي"],
    },
    en: {
      fullDesc: "Anaphylaxis is a severe, life-threatening sudden allergic reaction occurring within minutes of trigger exposure (nuts, drugs, bee sting, seafood). Causes airway swelling, low BP, breathing difficulty, fainting. Every minute of delay = death risk. Epinephrine (adrenaline) is the lifesaver.",
      treatmentDetails: [
        { title: "Inject EpiPen immediately", body: "Adrenaline shot in thigh (even through clothes). If no improvement in 5-15 min, second shot." },
        { title: "Call EMS now", body: "Even if improved after shot — needs hospital monitoring 4-6h (biphasic reaction possible)." },
        { title: "Lie down with legs elevated", body: "If dizzy or fainting — improves brain perfusion." },
        { title: "Hospital treatment", body: "More adrenaline, oxygen, IV antihistamines, steroids, IV fluids, cardiac monitoring." },
        { title: "Follow-up", body: "Identify trigger precisely, prescribe portable EpiPens (always 2), train family and school." },
      ],
      complications: ["Death if untreated", "Brain hypoxia", "Heart attack", "Biphasic reaction hours later"],
      lifestyle: ["Always carry EpiPen (2 doses)", "Read every food label", "Strongly notify restaurants of allergy", "Wear medical bracelet", "Train family and school on EpiPen"],
      prevention: ["Total avoidance of known trigger", "Allergy testing to identify triggers", "Immunotherapy for select cases", "Travel with EpiPen and documentation"],
      faq: [
        { q: "Is EpiPen dangerous?", a: "Delaying it is dangerous; using it is very safe. When in doubt = inject." },
        { q: "Can allergies disappear?", a: "Some childhood food allergies (milk, egg) may resolve. Nut and seafood usually lifelong." },
      ],
      redFlags: ["Breathing difficulty or wheeze", "Lip/tongue/throat swelling", "Dizziness or fainting", "Severe itchy red rash", "Vomiting/diarrhea after trigger exposure"],
      diagnosis: ["Fast clinical diagnosis", "Serum tryptase within 6h", "Skin allergy test after recovery"],
    },
  },

  // ============ BURNS ============
  "burns": {
    ar: {
      fullDesc: "إصابة الجلد أو الأنسجة بسبب حرارة، كهرباء، كيماويات، أو إشعاع. درجات: أولى (احمرار سطحي زي حرق الشمس)، تانية (تقرحات وألم شديد)، تالتة (الجلد أبيض/أسود وممكن مفيش ألم لإصابة الأعصاب). شدتها تعتمد على الدرجة + المساحة + المكان.",
      treatmentDetails: [
        { title: "إسعاف فوري للحروق البسيطة", body: "مياه جارية باردة (مش ثلج) لـ 20 دقيقة. شيل ملابس وحلي قبل الانتفاخ. غطي بشاش نظيف. متفقعش الفقاعات. متحطش معجون أسنان أو زبدة." },
        { title: "حروق متوسطة (درجة تانية)", body: "مرهم Silver Sulfadiazine، شاش معقم، ضمادات يومية، مسكن قوي. تطعيم تيتانوس لو مش حديث." },
        { title: "حروق شديدة (درجة تالتة أو واسعة)", body: "طوارئ. سوائل وريدية مكثفة، مسكن قوي، نقل لوحدة حروق متخصصة. ممكن جراحة وزرع جلد." },
        { title: "حروق كيميائية", body: "اشطف بمياه جارية لـ 30 دقيقة، شيل الملابس الملوثة، اتصل بمركز السموم." },
        { title: "حروق كهربائية", body: "افصل التيار قبل اللمس. حتى لو الجلد سليم ممكن أذى داخلي شديد — لازم مستشفى." },
      ],
      stages: [
        { name: "درجة أولى", desc: "احمرار، ألم، بدون فقاعات. يشفى خلال أسبوع بدون ندبة." },
        { name: "درجة تانية", desc: "فقاعات، ألم شديد. يشفى 2-3 أسابيع، ممكن ندبة بسيطة." },
        { name: "درجة تالتة", desc: "جلد أبيض/أسود/جلدي، مفيش ألم. لازم زرع جلد، ندبات دائمة." },
      ],
      complications: ["عدوى (الأخطر)", "صدمة من فقد سوائل", "ندبات مشوهة وتقلصات", "اكتئاب بعد الصدمة", "فشل أعضاء في الحروق الواسعة"],
      lifestyle: ["نظافة شديدة أثناء الشفاء", "مرطبات وكريمات واقية من الشمس على الندبة سنة كاملة", "تأهيل وتمارين لمنع التقلصات", "دعم نفسي للحروق المشوهة"],
      prevention: ["مفيش ولاعات في متناول الأطفال", "أجهزة تحذير حريق وطفايات في البيت", "اختبر حرارة المياه قبل تحميم الطفل", "غطي مقابض الحلل", "احذر الكيماويات المنزلية"],
      faq: [
        { q: "هل أحط معجون أسنان؟", a: "لا أبداً، يزود الالتهاب ويعمل عدوى." },
        { q: "إمتى أروح للطوارئ؟", a: "حروق درجة تانية أكبر من راحة الإيد، أي حرق وش/يد/قدم/أعضاء تناسلية، حروق كهربائية أو كيميائية، أي حرق على طفل." },
      ],
      redFlags: ["حروق وش أو رقبة (انسداد مجرى الهواء)", "حروق دائرية على ذراع أو رجل", "حروق كهربائية", "حروق على أكثر من 10% من الجسم", "صعوبة تنفس بعد استنشاق دخان"],
      diagnosis: ["تقييم سريري للدرجة والمساحة", "قاعدة التسعات لحساب المساحة", "تحاليل دم في الحروق الكبيرة"],
    },
    en: {
      fullDesc: "Skin or tissue injury from heat, electricity, chemicals, or radiation. Degrees: 1st (superficial redness like sunburn), 2nd (blisters and severe pain), 3rd (white/black skin, possibly painless from nerve damage). Severity depends on degree + area + location.",
      treatmentDetails: [
        { title: "First aid for minor burns", body: "Cool running water (not ice) for 20 min. Remove clothing/jewelry before swelling. Cover with clean gauze. Don't pop blisters. No toothpaste/butter." },
        { title: "Moderate (2nd degree)", body: "Silver sulfadiazine cream, sterile dressing, daily changes, strong analgesic. Tetanus shot if not recent." },
        { title: "Severe (3rd degree or large)", body: "Emergency. Aggressive IV fluids, strong analgesia, transfer to burn unit. May need surgery and skin graft." },
        { title: "Chemical burns", body: "Rinse with running water 30 min, remove contaminated clothing, call poison control." },
        { title: "Electrical burns", body: "Cut current before touching. Even with intact skin, severe internal damage possible — needs hospital." },
      ],
      stages: [
        { name: "1st degree", desc: "Redness, pain, no blisters. Heals in a week without scar." },
        { name: "2nd degree", desc: "Blisters, severe pain. Heals 2-3 weeks, possibly mild scarring." },
        { name: "3rd degree", desc: "White/black/leathery skin, painless. Needs skin graft, permanent scars." },
      ],
      complications: ["Infection (most dangerous)", "Fluid-loss shock", "Disfiguring scars and contractures", "Post-trauma depression", "Organ failure in large burns"],
      lifestyle: ["Strict hygiene during healing", "Moisturizers and sunscreen on scar for a full year", "Rehab and stretching to prevent contractures", "Psychological support for disfiguring burns"],
      prevention: ["No lighters within child reach", "Smoke alarms and extinguishers", "Test water temp before bathing child", "Pot handles inward", "Beware household chemicals"],
      faq: [
        { q: "Should I put toothpaste?", a: "Never — increases inflammation and infection." },
        { q: "When to ER?", a: "2nd degree larger than palm, any face/hand/foot/genital burn, electrical or chemical, any burn on a child." },
      ],
      redFlags: ["Face/neck burns (airway risk)", "Circumferential burns on arm/leg", "Electrical burns", "Burns >10% body surface", "Breathing difficulty after smoke"],
      diagnosis: ["Clinical assessment of degree and area", "Rule of nines for area", "Blood tests in major burns"],
    },
  },

  // ============ CHOKING ============
  "choking": {
    ar: {
      fullDesc: "انسداد مجرى الهواء بجسم غريب (طعام، لعبة، فص دواء). الشخص بيحط إيديه على رقبته، مش قادر يتكلم أو يكح. كل ثانية تأخير = خطر موت من نقص أكسجين. مهارة Heimlich مهارة لازم كل واحد يعرفها.",
      treatmentDetails: [
        { title: "للبالغين والأطفال فوق سنة (مناورة هايمليش)", body: "قف ورا الشخص، ضع قبضتك فوق سرته بين الثدي والسرة، الإيد التانية على الأولى، ادفع لداخل ولفوق بقوة 5 مرات. كرر حتى يخرج الجسم أو يفقد الوعي." },
        { title: "للأطفال أقل من سنة", body: "نيمه على وش ذراعك، رأسه أوطى من جسمه، اضرب 5 ضربات قوية على ظهره بين الأكتاف. لو ما خرجش، اقلبه على ظهره واضغط 5 مرات على وسط الصدر بإصبعين." },
        { title: "للحوامل والسمان", body: "ضغط على الصدر بدل البطن، نفس عدد المرات." },
        { title: "لو فقد الوعي", body: "ابدأ CPR فوراً، شوف الفم قبل كل نفس واخرج الجسم لو بقى ظاهر." },
        { title: "بعد إخراج الجسم", body: "حتى لو الشخص تحسن، اعرضه للطوارئ — ممكن يكون فيه أذى للحلق أو شفط للرئة." },
      ],
      complications: ["وفاة (في 4 دقايق بدون أكسجين)", "تلف مخ من نقص الأكسجين", "إصابة في الأضلاع أو الكبد من ضغط شديد", "التهاب رئوي شفطي"],
      prevention: [
        "قطّع طعام الأطفال لقطع صغيرة (مش أكبر من 1 سم)",
        "متدّيش طفل أقل من 4 سنين فول سوداني، عنب صحيح، مكسرات، حلوى صلبة، نقانق",
        "خلي الأطفال يأكلوا قاعدين ومتحركوش",
        "تجنب اللعب بحاجات صغيرة (بطاريات قرص، مغناطيس)",
        "متضحكش أو تتكلم وفمك مليان",
        "كل بشكل بطيء وامضغ كويس",
      ],
      faq: [
        { q: "لو الشخص بيكح، أعمل هايمليش؟", a: "لا، الكحة العنيفة أفضل من المناورة. اتدخل لما يبطل يكح ويبقى صامت." },
        { q: "لو الشخص لوحده وبيختنق؟", a: "اضرب بطنك بقوة على ظهر كرسي أو حافة طاولة." },
      ],
      redFlags: ["الشخص مش قادر يتكلم أو يصدر صوت", "وش أزرق أو شفايف زرقاء", "إيديه على رقبته", "إغماء"],
      diagnosis: ["تشخيص فوري بالأعراض", "أشعة صدر بعد الإخراج لاستبعاد بقايا"],
    },
    en: {
      fullDesc: "Airway blockage by foreign object (food, toy, pill). Person grabs throat, can't speak or cough. Every second delay = brain death risk from hypoxia. Heimlich is a skill everyone must know.",
      treatmentDetails: [
        { title: "Adults and children >1 yr (Heimlich)", body: "Stand behind, fist above navel between belly and chest, other hand over fist, thrust inward and upward 5 times. Repeat until object out or loss of consciousness." },
        { title: "Infants <1 yr", body: "Lay on your forearm face down, head lower than body, 5 firm back blows between shoulders. If no result, flip over and 5 chest compressions with 2 fingers." },
        { title: "Pregnant and obese", body: "Chest thrusts instead of abdominal, same count." },
        { title: "If unconscious", body: "Start CPR immediately. Check mouth before each breath, remove visible object." },
        { title: "After clearance", body: "Even if person improves, ER assessment — possible throat injury or aspiration." },
      ],
      complications: ["Death within 4 min without oxygen", "Brain damage from hypoxia", "Rib or liver injury from forceful thrusts", "Aspiration pneumonia"],
      prevention: [
        "Cut child food into small pieces (<1 cm)",
        "Don't give kids <4: peanuts, whole grapes, nuts, hard candy, hot dogs",
        "Children must eat sitting still",
        "Avoid small parts (button batteries, magnets)",
        "Don't laugh or talk with mouth full",
        "Eat slowly and chew well",
      ],
      faq: [
        { q: "If person is coughing, do Heimlich?", a: "No — forceful cough is better. Intervene if they go silent." },
        { q: "Alone and choking?", a: "Thrust your abdomen against a chair back or table edge." },
      ],
      redFlags: ["Can't speak or make sound", "Blue face or lips", "Hands at throat", "Loss of consciousness"],
      diagnosis: ["Immediate clinical diagnosis", "Chest X-ray after to rule out remnants"],
    },
  },

  // ============ SEVERE BLEEDING ============
  "severe-bleeding": {
    ar: {
      fullDesc: "نزيف شديد من جرح كبير ممكن يؤدي لصدمة وموت في دقايق. كل ثانية تأخير في إيقاف النزيف = فقد دم. الإسعاف الأولي الفوري هو المنقذ.",
      treatmentDetails: [
        { title: "الضغط المباشر على الجرح", body: "اضغط بإيدك (بقفاز لو متاح) أو شاش نظيف على الجرح بقوة لـ 10-15 دقيقة بدون ما تشيل. لو الشاش اتشرب دم، حط فوقه شاش جديد بدون ما تشيل القديم." },
        { title: "ارفع المنطقة المصابة", body: "ارفع الذراع أو الرجل أعلى من القلب لو ممكن (مش لو فيه كسر)." },
        { title: "استخدم Tourniquet (لإصابات الذراع/الرجل الشديدة)", body: "لو الضغط ما أوقفش النزيف، حط رباط ضيق فوق الجرح بـ 5-7 سم، اربطه بقوة لحد ما النزيف يقف. سجل الوقت بدقة. لا تشيله — الإسعاف هيشيله." },
        { title: "اتصل بالإسعاف فوراً", body: "حتى لو وقف النزيف — لازم تقييم في المستشفى، ممكن يكون فيه نقص دم داخلي." },
        { title: "تعامل مع الصدمة", body: "نوّم الشخص، ارفع رجليه، غطيه ضد البرد، اتكلم معاه ليفضل واعي. متدّيش ميه أو طعام." },
      ],
      complications: ["صدمة نقص حجم", "فشل أعضاء", "وفاة", "عدوى", "تلف عصبي إذا الـ Tourniquet اتساب أكتر من ساعتين"],
      prevention: ["انتبه لأدوات حادة في المطبخ", "تجنب أعمال جرارة بدون أمان", "تعلم إسعافات أولية"],
      faq: [
        { q: "هل أشيل الجسم الغريب من الجرح (سكين، زجاج)؟", a: "لا أبداً، ممكن يكون بيسد وعاء دموي وتطلعه يسبب نزيف أسوأ. ثبّته وانقل المصاب." },
        { q: "Tourniquet خطر؟", a: "ممكن يسبب فقدان الطرف لو اتساب طويل، لكن في النزيف الشديد فقدان الحياة أخطر." },
      ],
      redFlags: ["دم بيتدفق بقوة (شريان)", "شحوب وعرق بارد", "نبض سريع وضعيف", "تشوش وعي", "إغماء"],
      diagnosis: ["تشخيص سريري", "تحاليل دم في المستشفى (Hb, تجلط)", "أشعة لاستبعاد إصابات داخلية"],
    },
    en: {
      fullDesc: "Severe bleeding from a major wound can lead to shock and death within minutes. Every second of delay = blood lost. Immediate first aid is the lifesaver.",
      treatmentDetails: [
        { title: "Direct pressure", body: "Press hand (with glove if possible) or clean cloth on wound forcefully for 10-15 min without lifting. If soaked, add more on top without removing the old." },
        { title: "Elevate", body: "Raise the injured limb above heart level if possible (unless fracture)." },
        { title: "Tourniquet (severe limb injury)", body: "If pressure fails, tight band 5-7 cm above wound until bleeding stops. Note exact time. Don't loosen — let EMS handle." },
        { title: "Call EMS now", body: "Even if bleeding stopped — needs hospital evaluation, possible internal blood loss." },
        { title: "Manage shock", body: "Lay person down, elevate legs, cover from cold, talk to keep awake. No food or water." },
      ],
      complications: ["Hypovolemic shock", "Organ failure", "Death", "Infection", "Nerve damage if tourniquet on >2 hours"],
      prevention: ["Care with kitchen knives", "No power tools without safety", "Learn first aid"],
      faq: [
        { q: "Should I pull out an embedded object (knife, glass)?", a: "Never — it may be plugging a vessel; removal worsens bleeding. Stabilize and transport." },
        { q: "Is tourniquet dangerous?", a: "Can cause limb loss if left too long, but in severe bleeding, life loss is worse." },
      ],
      redFlags: ["Spurting blood (artery)", "Pale and cold sweat", "Fast weak pulse", "Confusion", "Fainting"],
      diagnosis: ["Clinical", "Blood tests in hospital (Hb, coagulation)", "Imaging to rule out internal injury"],
    },
  },

  // ============ SICKLE CELL ============
  "sickle-cell": {
    ar: {
      fullDesc: "مرض وراثي بيخلي خلايا الدم الحمراء على شكل منجل بدل من قرص، فبتسد الأوعية الدموية وتسبب نوبات ألم شديدة (أزمات سيكل)، فقر دم، وأذى للأعضاء. شائع في أصول إفريقية وعربية ومتوسطية. مع العلاج الحديث، متوسط العمر بقى 50+ سنة.",
      treatmentDetails: [
        { title: "هيدروكسي يوريا", body: "العلاج الأساسي — يقلل النوبات 50% ويحسّن نوعية الحياة. حبة يومياً." },
        { title: "نقل دم منتظم", body: "للحالات الشديدة وللوقاية من السكتة الدماغية." },
        { title: "زرع نخاع العظام", body: "العلاج الوحيد الشافي. بيتعمل من أخ أو أخت متطابقين، أنجح في الأطفال." },
        { title: "علاج جيني (جديد)", body: "Casgevy و Lyfgenia — معتمدة 2023، شفاء كامل لبعض المرضى." },
        { title: "علاج الأزمات", body: "مسكنات قوية (مورفين)، سوائل وريدية، أكسجين، علاج العدوى." },
        { title: "تطعيمات ووقاية من العدوى", body: "بنسلين يومي للأطفال، تطعيم ضد بنوموكوكس وميننجوكوكس وأنفلونزا." },
      ],
      complications: ["سكتة دماغية (خاصة الأطفال)", "فشل كلوي", "نوبات ألم متكررة", "تلف الطحال والعدوى", "تأخر نمو", "قرح ساق", "أمراض رئة مزمنة"],
      lifestyle: ["اشرب 2-3 لتر ماء يومياً", "تجنب البرد الشديد والارتفاعات", "تجنب الإجهاد البدني المفرط", "نام كفاية", "تجنب الكحول والتدخين", "تطعيم سنوي ضد الأنفلونزا"],
      prevention: ["فحص ما قبل الزواج للأشخاص في مناطق الانتشار", "استشارة وراثية لو الزوجين حاملين", "فحص حديثي الولادة للتشخيص المبكر"],
      faq: [
        { q: "هل ابني هيعيش طبيعي؟", a: "مع العلاج الحديث والمتابعة، كثير بيعيشوا حياة شبه طبيعية ويعملوا ويتجوزوا." },
        { q: "هل أزمة الألم خطيرة؟", a: "مؤلمة جداً لكن مش قاتلة في الغالب. بعض الأنواع (Acute Chest) خطر شديد ومحتاج طوارئ." },
      ],
      redFlags: ["ألم صدر شديد + ضيق تنفس (Acute Chest)", "ألم بطن شديد", "حمى >38.5", "أعراض سكتة (انحراف وش، ضعف)", "ألم مفاصل شديد ميستجيبش لمسكنات"],
      diagnosis: ["تحليل هيموجلوبين كهربي (Hb electrophoresis)", "CBC", "فحص جيني"],
    },
    en: {
      fullDesc: "Genetic disorder making red blood cells sickle-shaped instead of disc-shaped, blocking blood vessels and causing severe pain crises, anemia, and organ damage. Common in African, Arab, Mediterranean ancestry. Modern treatment has raised lifespan to 50+ years.",
      treatmentDetails: [
        { title: "Hydroxyurea", body: "Mainstay — reduces crises 50% and improves quality of life. Daily tablet." },
        { title: "Regular transfusions", body: "For severe cases and stroke prevention." },
        { title: "Bone marrow transplant", body: "Only curative option. From matched sibling, best in children." },
        { title: "Gene therapy (new)", body: "Casgevy and Lyfgenia — approved 2023, full cure for select patients." },
        { title: "Crisis treatment", body: "Strong analgesics (morphine), IV fluids, oxygen, treat infections." },
        { title: "Vaccines and infection prevention", body: "Daily penicillin for kids, pneumococcal/meningococcal/flu vaccines." },
      ],
      complications: ["Stroke (especially children)", "Kidney failure", "Recurrent pain crises", "Spleen damage and infections", "Growth delay", "Leg ulcers", "Chronic lung disease"],
      lifestyle: ["Drink 2-3L water daily", "Avoid extreme cold and high altitude", "Avoid extreme physical exertion", "Adequate sleep", "No alcohol/smoking", "Annual flu vaccine"],
      prevention: ["Pre-marital screening in endemic areas", "Genetic counseling if both carriers", "Newborn screening for early diagnosis"],
      faq: [
        { q: "Will my child live normally?", a: "With modern care, many live near-normal lives, work, and marry." },
        { q: "Is a pain crisis dangerous?", a: "Very painful, usually not fatal. Some types (Acute Chest) are dangerous and need ER." },
      ],
      redFlags: ["Severe chest pain + breathlessness (Acute Chest)", "Severe abdominal pain", "Fever >38.5", "Stroke symptoms", "Severe joint pain unresponsive to meds"],
      diagnosis: ["Hb electrophoresis", "CBC", "Genetic testing"],
    },
  },

  // ============ CYSTIC FIBROSIS ============
  "cystic-fibrosis": {
    ar: {
      fullDesc: "مرض وراثي بيخلي إفرازات الجسم (مخاط، عرق، عصارات هضمية) لزجة وسميكة جداً، فتسد المجاري التنفسية والبنكرياس. أعراضه: عدوى رئوية متكررة، صعوبة هضم، ضعف نمو. مع العلاج الحديث متوسط العمر تخطى 50 سنة.",
      treatmentDetails: [
        { title: "أدوية معدّلة CFTR", body: "Trikafta (Kaftrio) — علاج ثوري، يصحح خلل البروتين الأساسي. مناسب لأكثر من 90% من المرضى. غير حياة المرضى تماماً." },
        { title: "علاج طبيعي تنفسي يومي", body: "تمارين تصريف المخاط، أجهزة اهتزاز (Vest)، استنشاق محلول ملحي. مرة-مرتين يومياً." },
        { title: "مضادات حيوية متكررة", body: "حبوب أو استنشاق أو وريدي للعدوى الرئوية المتكررة (خاصة Pseudomonas)." },
        { title: "إنزيمات هضمية", body: "كبسولات مع كل وجبة لتعويض إنزيمات البنكرياس." },
        { title: "تغذية عالية السعرات", body: "احتياج 130-150% من الطبيعي + مكملات فيتامينات A,D,E,K." },
        { title: "زرع رئة", body: "للحالات المتقدمة جداً." },
      ],
      complications: ["فشل تنفسي مزمن", "سكري CF (30%)", "أمراض كبد", "هشاشة عظام", "عقم عند الذكور", "انسداد أمعاء"],
      lifestyle: ["العلاج الطبيعي يومياً بدون إهمال", "تطعيمات منتظمة", "تجنب التدخين والمدخنين", "تباعد عن مرضى آخرين بـ CF (تجنب عدوى متبادلة)", "تمارين رياضية يومية"],
      prevention: ["فحص ما قبل الزواج", "فحص حديثي الولادة"],
      faq: [
        { q: "هل ممكن أنجب؟", a: "النساء نعم لكن حمل عالي الخطر. الذكور غالباً عقم لكن ممكن أب بيولوجي بحقن مجهري." },
        { q: "هل Trikafta متاح في مصر/الدول العربية؟", a: "متاح لكن باهظ الثمن، بعض الدول بتوفره من خلال صناديق دعم." },
      ],
      redFlags: ["ضيق تنفس شديد", "بصق دم", "حمى عالية", "ألم بطن شديد (انسداد أمعاء)", "نزول وزن شديد"],
      diagnosis: ["اختبار العرق (Sweat chloride)", "تحليل جيني", "وظائف رئة دورية"],
    },
    en: {
      fullDesc: "Genetic disorder making body secretions (mucus, sweat, digestive juices) very thick and sticky, blocking airways and pancreas. Symptoms: recurrent lung infections, malabsorption, poor growth. Modern treatment has pushed lifespan past 50 years.",
      treatmentDetails: [
        { title: "CFTR modulators", body: "Trikafta (Kaftrio) — revolutionary, corrects underlying protein defect. Suitable for >90% of patients. Life-changing." },
        { title: "Daily airway clearance", body: "Mucus drainage exercises, vibrating vest, hypertonic saline nebulizer. 1-2x daily." },
        { title: "Repeated antibiotics", body: "Oral, inhaled, or IV for recurrent lung infections (especially Pseudomonas)." },
        { title: "Pancreatic enzymes", body: "Capsules with every meal to replace pancreatic enzymes." },
        { title: "High-calorie nutrition", body: "Need 130-150% of normal + vitamins A,D,E,K." },
        { title: "Lung transplant", body: "For very advanced cases." },
      ],
      complications: ["Chronic respiratory failure", "CF-related diabetes (30%)", "Liver disease", "Osteoporosis", "Male infertility", "Bowel obstruction"],
      lifestyle: ["Daily airway clearance, no skipping", "Up-to-date vaccines", "Avoid smoking and smokers", "Distance from other CF patients (cross-infection)", "Daily exercise"],
      prevention: ["Pre-marital screening", "Newborn screening"],
      faq: [
        { q: "Can I have children?", a: "Women yes but high-risk pregnancy. Men usually infertile but can father biologically with ICSI." },
        { q: "Is Trikafta available regionally?", a: "Available but expensive; some countries cover via support funds." },
      ],
      redFlags: ["Severe breathlessness", "Coughing blood", "High fever", "Severe abdominal pain (obstruction)", "Severe weight loss"],
      diagnosis: ["Sweat chloride test", "Genetic test", "Periodic lung function"],
    },
  },

  // ============ DUCHENNE ============
  "duchenne": {
    ar: {
      fullDesc: "ضمور دوشين العضلي مرض وراثي يصيب الذكور أساساً (مرتبط بكروموسوم X)، يسبب ضعف عضلي تدريجي يبدأ في الطفولة المبكرة. الطفل بيمشي متأخر، بيكتر سقوطه، بيصعب عليه يطلع السلم، وغالباً يحتاج كرسي متحرك بعمر 12. مع العلاج الحديث متوسط العمر امتد لـ 30+ سنة.",
      treatmentDetails: [
        { title: "كورتيكوستيرويد (Deflazacort/Prednisone)", body: "العلاج الأساسي، بيبطئ تطور المرض ويطيل المشي 2-3 سنين إضافية." },
        { title: "أدوية جينية حديثة", body: "Eteplirsen, Casimersen — مناسبة لطفرات معينة، توقف تطور المرض في 13% من المرضى. علاج جيني (Elevidys) معتمد 2023 للأطفال 4-5 سنوات." },
        { title: "علاج طبيعي ومائي", body: "ضروري يومياً للحفاظ على المرونة وتأخير الانكماشات." },
        { title: "متابعة قلب ورئة", body: "إيكو سنوي بعد 7 سنوات، أدوية قلب وقائية، تنفس صناعي ليلي عند الحاجة." },
        { title: "أجهزة دعم", body: "كرسي متحرك كهربائي، رافع، تعديلات بيت ومدرسة." },
        { title: "جراحات تصحيح", body: "لتصحيح الجنف وانكماشات المفاصل." },
      ],
      stages: [
        { name: "ما قبل الأعراض (0-3)", desc: "بدون أعراض واضحة، تشخيص بالصدفة من رفع إنزيم CK." },
        { name: "مبكر (3-7)", desc: "تأخر مشي، صعوبة في الجري والطلوع، مشية بطية." },
        { name: "متوسط (8-12)", desc: "ضعف واضح، علامة Gowers، قد يحتاج كرسي." },
        { name: "متقدم (>12)", desc: "كرسي دائم، مشاكل تنفس وقلب." },
      ],
      complications: ["فشل قلب (Cardiomyopathy)", "فشل تنفسي", "جنف الظهر", "هشاشة عظام", "صعوبات تعلم"],
      lifestyle: ["علاج طبيعي يومي", "نظام غذائي متوازن (تجنب السمنة من الكورتيزون)", "حياة اجتماعية ومدرسية كاملة", "دعم نفسي للأهل والطفل"],
      prevention: ["فحص جيني ما قبل الزواج لو فيه تاريخ عائلي", "تشخيص ما قبل الولادة", "استشارة وراثية"],
      faq: [
        { q: "هل ابني هيعيش لكام سنة؟", a: "مع العلاج الحديث 30-40 سنة. الأبحاث الجينية بتفتح آفاق جديدة باستمرار." },
        { q: "هل البنات يصبن؟", a: "نادراً جداً (حاملات بدون أعراض غالباً)، لكن ممكن أعراض خفيفة." },
        { q: "هل ممكن يدرس مدرسة عادية؟", a: "نعم، مع تعديلات بسيطة في البيئة المدرسية." },
      ],
      redFlags: ["ضيق تنفس متزايد", "ألم صدر", "تعب شديد جديد", "صعوبة بلع", "علامات فشل قلب (تورم رجلين، صعوبة استلقاء)"],
      diagnosis: ["إنزيم CK (مرتفع 10-100x)", "تحليل جيني للـ DMD gene", "خزعة عضلة (نادراً الآن)", "إيكو قلب"],
    },
    en: {
      fullDesc: "Duchenne muscular dystrophy — X-linked genetic disease affecting mainly boys, causing progressive muscle weakness from early childhood. Walks late, falls often, struggles climbing stairs, usually needs wheelchair by age 12. Modern treatment has extended life to 30+ years.",
      treatmentDetails: [
        { title: "Corticosteroids (Deflazacort/Prednisone)", body: "Mainstay — slows progression, extends walking 2-3 years." },
        { title: "Modern genetic therapies", body: "Eteplirsen, casimersen — for specific mutations, halt progression in 13%. Gene therapy (Elevidys) approved 2023 for ages 4-5." },
        { title: "Physical and aqua therapy", body: "Daily, essential to preserve mobility and delay contractures." },
        { title: "Cardiac and pulmonary follow-up", body: "Annual echo after age 7, preventive cardiac meds, nocturnal ventilation as needed." },
        { title: "Assistive devices", body: "Power wheelchair, lifts, home and school adaptations." },
        { title: "Corrective surgery", body: "For scoliosis and joint contractures." },
      ],
      stages: [
        { name: "Pre-symptomatic (0-3)", desc: "No clear symptoms, sometimes diagnosed via incidental high CK." },
        { name: "Early (3-7)", desc: "Late walking, difficulty running/climbing, slow gait." },
        { name: "Middle (8-12)", desc: "Clear weakness, Gowers sign, may need wheelchair." },
        { name: "Late (>12)", desc: "Permanent wheelchair, breathing and heart issues." },
      ],
      complications: ["Cardiomyopathy", "Respiratory failure", "Scoliosis", "Osteoporosis", "Learning difficulties"],
      lifestyle: ["Daily physiotherapy", "Balanced diet (steroid weight gain risk)", "Full social and school life", "Family and child psychological support"],
      prevention: ["Pre-marital genetic screening if family history", "Prenatal diagnosis", "Genetic counseling"],
      faq: [
        { q: "How long will my son live?", a: "With modern care 30-40 years. Genetic research keeps opening new horizons." },
        { q: "Do girls get it?", a: "Very rarely (carriers usually asymptomatic), but mild symptoms possible." },
        { q: "Can he attend regular school?", a: "Yes with simple environmental adaptations." },
      ],
      redFlags: ["Increasing breathlessness", "Chest pain", "Severe new fatigue", "Swallowing difficulty", "Heart failure signs (leg swelling, can't lie flat)"],
      diagnosis: ["CK enzyme (10-100x elevated)", "DMD gene analysis", "Muscle biopsy (rare now)", "Echocardiogram"],
    },
  },

  // ============ HUNTINGTON ============
  "huntington": {
    ar: {
      fullDesc: "مرض هنتنغتون اضطراب وراثي عصبي (جسمي قاهر، 50% فرصة انتقال للأطفال) يسبب موت تدريجي لخلايا المخ. أعراضه: حركات لا إرادية، تدهور إدراكي، اضطرابات نفسية. بيبدأ غالباً بين 30-50 سنة. مفيش علاج شافي حالياً، لكن أبحاث جينية واعدة.",
      treatmentDetails: [
        { title: "أدوية للحركات اللا إرادية", body: "Tetrabenazine, Deutetrabenazine — تقلل الحركات الراقصة الطابع." },
        { title: "علاج الأعراض النفسية", body: "مضادات اكتئاب (SSRIs)، مضادات ذهان لو فيه هلاوس، علاج OCD." },
        { title: "علاج طبيعي ووظيفي ونطق", body: "للحفاظ على القدرة الحركية والكلامية أطول فترة." },
        { title: "تغذية متخصصة", body: "احتياج سعرات أعلى بسبب الحركات. مع تطور المرض ممكن يحتاج أنبوب تغذية." },
        { title: "أبحاث جديدة", body: "علاجات جينية (Tominersen) في مرحلة التجارب — تقلل البروتين السام." },
        { title: "دعم نفسي للأسرة", body: "اختبار الأبناء، استشارة وراثية، تخطيط مالي ومستقبلي." },
      ],
      stages: [
        { name: "مبكر", desc: "حركات بسيطة، تغيرات مزاج، صعوبة تركيز خفيفة. لسه يشتغل ويعيش طبيعي." },
        { name: "متوسط", desc: "حركات واضحة، صعوبة بلع، تدهور إدراكي. صعوبة في العمل." },
        { name: "متأخر", desc: "اعتماد كامل، فقدان كلام، صعوبة بلع شديدة، خرف." },
      ],
      complications: ["انتحار (4-6 مرات أعلى)", "اختناق من صعوبة بلع", "عدوى صدرية متكررة", "إصابات من السقوط", "نقص تغذية"],
      lifestyle: ["ممارسة رياضة منتظمة (تأخر تطور)", "نظام غذائي عالي السعرات", "بيت آمن (إزالة عوائق، حماية حواف)", "روتين يومي ثابت", "دعم نفسي مستمر"],
      prevention: ["فحص جيني للأبناء (اختياري)", "استشارة وراثية قبل الإنجاب", "اختبار ما قبل الغرس (PGD) في الإخصاب الصناعي"],
      faq: [
        { q: "هل أعمل اختبار جيني لو واحد من والديا مصاب؟", a: "قرار شخصي صعب. لازم استشارة وراثية ودعم نفسي قبل وبعد. 50% فرصة الإصابة." },
        { q: "هل الأبحاث قريبة من علاج؟", a: "أبحاث جينية واعدة لكن لسه في مراحل تجارب. مفيش علاج شافي حالياً." },
      ],
      redFlags: ["أفكار انتحار", "اختناق متكرر أثناء الأكل", "سقوط متكرر", "عدوى صدرية", "تدهور سريع في القدرات"],
      diagnosis: ["تحليل جيني (CAG repeats في HTT gene)", "MRI مخ", "تقييم نفسي وعصبي"],
    },
    en: {
      fullDesc: "Huntington's disease — autosomal dominant genetic disorder (50% chance of passing to children) causing progressive brain cell death. Symptoms: involuntary movements, cognitive decline, psychiatric disturbances. Usually begins age 30-50. No cure currently, but genetic research promising.",
      treatmentDetails: [
        { title: "Movement medications", body: "Tetrabenazine, deutetrabenazine — reduce dance-like movements." },
        { title: "Psychiatric treatment", body: "SSRIs for depression, antipsychotics for hallucinations, OCD treatment." },
        { title: "Physical, occupational, speech therapy", body: "Preserve mobility and speech as long as possible." },
        { title: "Specialized nutrition", body: "Higher calories due to movements. May need feeding tube later." },
        { title: "New research", body: "Gene therapies (tominersen) in trials — reduce toxic protein." },
        { title: "Family psychological support", body: "Children's testing, genetic counseling, financial and future planning." },
      ],
      stages: [
        { name: "Early", desc: "Mild movements, mood changes, slight focus issues. Still works and lives normally." },
        { name: "Middle", desc: "Visible movements, swallowing difficulty, cognitive decline. Work becomes hard." },
        { name: "Late", desc: "Full dependence, speech loss, severe swallowing issues, dementia." },
      ],
      complications: ["Suicide (4-6x higher)", "Choking from swallowing difficulty", "Recurrent chest infections", "Fall injuries", "Malnutrition"],
      lifestyle: ["Regular exercise (delays progression)", "High-calorie diet", "Safe home (clear obstacles, protect edges)", "Stable daily routine", "Continuous psychological support"],
      prevention: ["Genetic testing for offspring (optional)", "Pre-conception genetic counseling", "Pre-implantation testing (PGD) in IVF"],
      faq: [
        { q: "Should I test if my parent has it?", a: "A hard personal choice. Requires genetic counseling and psychological support before/after. 50% chance." },
        { q: "Is a cure close?", a: "Promising genetic research, still in trials. No cure currently." },
      ],
      redFlags: ["Suicidal thoughts", "Recurrent choking while eating", "Recurrent falls", "Chest infections", "Rapid functional decline"],
      diagnosis: ["Genetic test (CAG repeats in HTT gene)", "Brain MRI", "Psychiatric and neurological assessment"],
    },
  },

  // ============ MARFAN ============
  "marfan": {
    ar: {
      fullDesc: "متلازمة مارفان مرض وراثي يصيب النسيج الضام في الجسم (الجلد، الأوعية، العظام، العين). المريض طويل، نحيف، أصابع طويلة، مرونة مفاصل، ومشاكل خطيرة في القلب والأوعية (تمدد الشريان الأبهر) وفي العين (انخلاع العدسة). تشخيص ومتابعة مبكرة بتنقذ الحياة.",
      treatmentDetails: [
        { title: "حاصرات بيتا أو ARBs (لوسارتان)", body: "تقلل ضغط الدم على الشريان الأبهر وتبطّئ تمدده." },
        { title: "متابعة قلب دورية", body: "إيكو سنوي على الأقل، CT/MRI للأبهر دورياً." },
        { title: "جراحة الأبهر الوقائية", body: "لو الأبهر اتمدد فوق 5 سم، جراحة لاستبدال جزء منه قبل التمزق." },
        { title: "متابعة عين", body: "فحص سنوي، علاج انخلاع العدسة، نظارات لقصر النظر." },
        { title: "تجنب الرياضات الشديدة", body: "ممنوع رفع أثقال، رياضات تنافسية، غوص. مسموح سباحة، مشي." },
        { title: "تصحيح جنف الظهر", body: "حزام أو جراحة لو شديد." },
      ],
      complications: ["تمزق الشريان الأبهر (سبب وفاة رئيسي)", "ارتجاع صمامات قلب", "انخلاع العدسة", "انفصال الشبكية", "استرواح صدري"],
      lifestyle: ["تجنب الرياضات الشديدة والتنافسية", "تجنب رفع أثقال", "ضغط دم مستقر", "متابعة طبية منتظمة", "إخبار كل طبيب بالحالة قبل أي جراحة"],
      prevention: ["فحص جيني للأبناء", "استشارة وراثية قبل الإنجاب", "تشخيص مبكر لتقليل المضاعفات"],
      faq: [
        { q: "هل ابني هيعيش طبيعي؟", a: "نعم مع المتابعة والعلاج. متوسط العمر تخطى 70 سنة." },
        { q: "هل الحمل آمن؟", a: "حمل عالي الخطر، لازم تخطيط مع طبيب قلب قبل الحمل." },
      ],
      redFlags: ["ألم صدر شديد مفاجئ (تمزق أبهر — طارئ)", "ضيق تنفس مفاجئ", "تشوش رؤية مفاجئ", "ألم ظهر شديد"],
      diagnosis: ["إيكو قلب لقياس الأبهر", "فحص عين", "تحليل جيني (FBN1 gene)", "معايير غينت السريرية"],
    },
    en: {
      fullDesc: "Marfan syndrome — genetic connective tissue disorder affecting skin, vessels, bones, eyes. Patient is tall, thin, with long fingers, joint hypermobility, and serious heart/vessel problems (aortic aneurysm) and eye issues (lens dislocation). Early diagnosis and monitoring saves lives.",
      treatmentDetails: [
        { title: "Beta-blockers or ARBs (losartan)", body: "Lower BP on aorta and slow dilation." },
        { title: "Periodic cardiac follow-up", body: "Annual echo minimum, periodic CT/MRI of aorta." },
        { title: "Preventive aortic surgery", body: "If aorta >5cm, replace before rupture." },
        { title: "Eye follow-up", body: "Annual exam, lens dislocation treatment, glasses for myopia." },
        { title: "Avoid intense sports", body: "No weightlifting, competitive sports, scuba. OK: swimming, walking." },
        { title: "Scoliosis correction", body: "Brace or surgery if severe." },
      ],
      complications: ["Aortic rupture (main cause of death)", "Heart valve regurgitation", "Lens dislocation", "Retinal detachment", "Pneumothorax"],
      lifestyle: ["Avoid intense/competitive sports", "No weightlifting", "Stable BP", "Regular medical follow-up", "Inform every doctor before surgery"],
      prevention: ["Genetic testing for children", "Pre-conception counseling", "Early diagnosis reduces complications"],
      faq: [
        { q: "Will my child live normally?", a: "Yes with monitoring and treatment. Lifespan now over 70." },
        { q: "Is pregnancy safe?", a: "High-risk pregnancy, must plan with cardiologist beforehand." },
      ],
      redFlags: ["Sudden severe chest pain (aortic dissection — emergency)", "Sudden breathlessness", "Sudden vision changes", "Severe back pain"],
      diagnosis: ["Echo for aortic measurements", "Eye exam", "Genetic test (FBN1)", "Ghent clinical criteria"],
    },
  },

  // ============ EHLERS-DANLOS ============
  "ehlers-danlos": {
    ar: {
      fullDesc: "مجموعة من الاضطرابات الوراثية في النسيج الضام بتأثر على الجلد (مرن جداً، يتجرح بسهولة)، المفاصل (مرنة بشكل غير طبيعي، خلع متكرر)، والأوعية الدموية. فيه 13 نوع، أخطرها النوع الوعائي. مفيش علاج شافي، لكن إدارة الأعراض بتحسّن الحياة كثير.",
      treatmentDetails: [
        { title: "علاج طبيعي لتقوية العضلات", body: "العضلات القوية بتدعم المفاصل وبتقلل الخلع. تمارين منخفضة التأثير (سباحة، يوغا)." },
        { title: "دعامات ورباطات للمفاصل", body: "حماية المفاصل من الخلع المتكرر." },
        { title: "مسكنات الألم المزمن", body: "مسكنات بسيطة، أحياناً Duloxetine أو Pregabalin للألم العصبي. تجنب الأفيونات قدر الإمكان." },
        { title: "متابعة قلب وعائية (للنوع الوعائي)", body: "إيكو دوري، CT/MRI للشرايين، Celiprolol بيقلل خطر التمزق." },
        { title: "علاج الجلد", body: "غسل وتنظيف الجروح بعناية، استخدام Steri-strips بدل الخياطة لو ممكن، الجروح بتلتئم ببطء." },
        { title: "دعم نفسي", body: "ألم مزمن واضطراب يأثر على الصحة النفسية، CBT مفيد." },
      ],
      complications: ["خلع مفاصل متكرر", "ألم مزمن شديد", "تمزق أوعية دموية أو أعضاء (في النوع الوعائي)", "مشاكل حمل وولادة", "اكتئاب من الألم المزمن"],
      lifestyle: ["تجنب الرياضات الاحتكاكية", "حماية الجلد من الجروح", "ارتدِ دعامات وقت الحاجة", "تجنب أوضاع الخلع", "احمل قلادة طبية", "أخبر كل طبيب أسنان أو جراح قبل أي إجراء"],
      prevention: ["فحص جيني للأقارب", "استشارة وراثية قبل الإنجاب"],
      faq: [
        { q: "هل ممكن أمارس رياضة؟", a: "نعم، رياضات منخفضة التأثير: سباحة، مشي، تاي تشي. تجنب القفز ورفع الأثقال." },
        { q: "هل الحمل آمن؟", a: "متوسط الخطورة، لكن النوع الوعائي شديد الخطورة، لازم متابعة مكثفة." },
      ],
      redFlags: ["ألم بطن أو صدر شديد مفاجئ (تمزق وعاء)", "نزيف غير مفسر", "أعراض سكتة", "خلع مفصل ميرجعش بسهولة"],
      diagnosis: ["معايير سريرية", "تحليل جيني للنوع المحدد", "خزعة جلد للنوع الوعائي"],
    },
    en: {
      fullDesc: "Group of genetic connective tissue disorders affecting skin (hyperelastic, bruises easily), joints (abnormally flexible, frequent dislocations), and blood vessels. 13 types; vascular type most dangerous. No cure, but symptom management dramatically improves life.",
      treatmentDetails: [
        { title: "Physiotherapy to strengthen muscles", body: "Strong muscles support joints and reduce dislocations. Low-impact exercise (swimming, yoga)." },
        { title: "Joint braces and supports", body: "Protect joints from repeated dislocations." },
        { title: "Chronic pain management", body: "Simple analgesics, sometimes duloxetine or pregabalin for neuropathic pain. Avoid opioids when possible." },
        { title: "Cardiovascular monitoring (vascular type)", body: "Periodic echo, CT/MRI of arteries, celiprolol reduces rupture risk." },
        { title: "Skin care", body: "Careful wound cleaning, Steri-strips over sutures when possible — wounds heal slowly." },
        { title: "Psychological support", body: "Chronic pain affects mental health; CBT helps." },
      ],
      complications: ["Recurrent joint dislocations", "Severe chronic pain", "Vessel/organ rupture (vascular type)", "Pregnancy and delivery issues", "Depression from chronic pain"],
      lifestyle: ["Avoid contact sports", "Protect skin from wounds", "Wear braces when needed", "Avoid dislocation positions", "Wear medical alert", "Inform every dentist/surgeon"],
      prevention: ["Genetic testing for relatives", "Pre-conception counseling"],
      faq: [
        { q: "Can I exercise?", a: "Yes, low-impact: swimming, walking, tai chi. Avoid jumping and heavy lifting." },
        { q: "Is pregnancy safe?", a: "Moderate risk; vascular type is very high-risk and needs intensive monitoring." },
      ],
      redFlags: ["Sudden severe abdominal/chest pain (vessel rupture)", "Unexplained bleeding", "Stroke symptoms", "Joint dislocation that won't reduce easily"],
      diagnosis: ["Clinical criteria", "Genetic testing for specific type", "Skin biopsy for vascular type"],
    },
  },

  // ============ WILSON ============
  "wilson": {
    ar: {
      fullDesc: "مرض ويلسون اضطراب وراثي نادر بيخلي النحاس يتراكم في الكبد والمخ بدل ما يتخلص منه. الأعراض بتظهر بين 5-35 سنة: مشاكل كبد (التهاب، تليف)، أعراض عصبية (رعشة، صعوبة كلام، تغيرات سلوك)، حلقة كايزر-فلايشر في العين. التشخيص والعلاج المبكر بيخلي المريض يعيش حياة طبيعية تماماً.",
      treatmentDetails: [
        { title: "Penicillamine", body: "العلاج الأساسي تاريخياً، يربط النحاس ويطرده في البول. أعراض جانبية كثيرة." },
        { title: "Trientine", body: "بديل أحدث وأقل أعراضاً جانبية، نفس آلية Penicillamine." },
        { title: "Zinc", body: "يمنع امتصاص النحاس من الأمعاء، يستخدم للحفاظ على المرض بعد علاج الـ chelators." },
        { title: "حمية قليلة النحاس", body: "تجنب الكبدة، المحار، المكسرات، الشوكولاتة، الفطر." },
        { title: "زرع كبد", body: "للحالات المتقدمة (فشل كبد)، يشفي المرض تماماً." },
        { title: "متابعة دورية", body: "تحاليل كبد، نحاس البول، فحص عصبي كل 6 شهور." },
      ],
      complications: ["تليف وفشل كبد", "أعراض عصبية دائمة", "اضطرابات نفسية", "مشاكل كلى من الأدوية", "أنيميا انحلالية"],
      lifestyle: ["التزام تام بالعلاج مدى الحياة", "حمية قليلة النحاس", "تجنب الكحول تماماً", "متابعة منتظمة", "تجنب فيتامينات تحتوي نحاس"],
      prevention: ["فحص الأقارب من الدرجة الأولى للمرضى", "تشخيص مبكر يمنع كل المضاعفات"],
      faq: [
        { q: "هل ممكن أكل أي حاجة؟", a: "تجنب الأطعمة عالية النحاس فقط، باقي الأكل عادي." },
        { q: "هل ممكن أنجب؟", a: "نعم مع تعديل الأدوية في الحمل (Penicillamine آمن نسبياً، Zinc الأفضل)." },
      ],
      redFlags: ["اصفرار شديد (يرقان)", "تشوش وعي (اعتلال دماغي كبدي)", "نزيف غير مفسر", "أعراض ذهان", "ضعف شديد مفاجئ"],
      diagnosis: ["سيرولوبلازمين منخفض في الدم", "نحاس مرتفع في البول 24 ساعة", "خزعة كبد", "حلقة كايزر-فلايشر بفحص عين", "تحليل جيني"],
    },
    en: {
      fullDesc: "Wilson's disease — rare genetic disorder causing copper accumulation in liver and brain instead of excretion. Symptoms appear age 5-35: liver issues, neurological (tremor, slurred speech, behavior changes), Kayser-Fleischer rings in the eye. Early diagnosis and treatment allow fully normal life.",
      treatmentDetails: [
        { title: "Penicillamine", body: "Historical mainstay — binds copper for urinary excretion. Many side effects." },
        { title: "Trientine", body: "Newer alternative with fewer side effects, same mechanism as penicillamine." },
        { title: "Zinc", body: "Blocks copper absorption in gut, used for maintenance after chelation." },
        { title: "Low-copper diet", body: "Avoid liver, shellfish, nuts, chocolate, mushrooms." },
        { title: "Liver transplant", body: "For advanced cases (liver failure) — fully cures the disease." },
        { title: "Periodic follow-up", body: "Liver tests, urine copper, neurological exam every 6 months." },
      ],
      complications: ["Cirrhosis and liver failure", "Permanent neurological symptoms", "Psychiatric disorders", "Drug-induced kidney issues", "Hemolytic anemia"],
      lifestyle: ["Strict lifelong treatment adherence", "Low-copper diet", "No alcohol", "Regular follow-up", "Avoid copper-containing vitamins"],
      prevention: ["Screen first-degree relatives", "Early diagnosis prevents all complications"],
      faq: [
        { q: "Can I eat anything?", a: "Avoid high-copper foods only; rest is normal." },
        { q: "Can I have children?", a: "Yes with med adjustment in pregnancy (penicillamine relatively safe, zinc preferred)." },
      ],
      redFlags: ["Severe jaundice", "Confusion (hepatic encephalopathy)", "Unexplained bleeding", "Psychotic symptoms", "Sudden severe weakness"],
      diagnosis: ["Low ceruloplasmin", "High 24h urine copper", "Liver biopsy", "Kayser-Fleischer rings on eye exam", "Genetic test"],
    },
  },

  // ============ POMPE ============
  "pompe": {
    ar: {
      fullDesc: "مرض بومبي مرض وراثي نادر، نقص إنزيم بيكسر الجليكوجين، فبيتراكم في العضلات (خاصة عضلة القلب وعضلات التنفس). نوعين: طفولي (شديد جداً) وبالغين (تدريجي). علاج الإنزيم البديل غيّر مسار المرض تماماً.",
      treatmentDetails: [
        { title: "علاج الإنزيم البديل (Alglucosidase alfa)", body: "Myozyme/Lumizyme — حقن وريدي كل أسبوعين مدى الحياة. يبطئ أو يوقف تطور المرض." },
        { title: "Avalglucosidase (Nexviazyme)", body: "علاج جديد (2021) أكثر فعالية، نفس الآلية بشكل محسّن." },
        { title: "علاج طبيعي مكثف", body: "للحفاظ على القوة العضلية والوظيفة." },
        { title: "دعم تنفسي", body: "تنفس صناعي ليلي (CPAP/BiPAP)، أحياناً تنفس صناعي دائم." },
        { title: "تغذية متخصصة", body: "بروتين عالي، أحياناً أنبوب تغذية." },
        { title: "متابعة قلب", body: "في النوع الطفولي خاصة — إيكو دوري." },
      ],
      complications: ["فشل قلب (في النوع الطفولي)", "فشل تنفسي", "صعوبات أكل وبلع", "وفاة مبكرة في النوع الطفولي بدون علاج", "ضعف عضلي تدريجي"],
      lifestyle: ["العلاج بالإنزيم بدون انقطاع", "علاج طبيعي يومي", "نظام غذائي عالي البروتين", "تجنب العدوى التنفسية (تطعيمات)", "بيت مهيأ للحركة"],
      prevention: ["فحص جيني للأقارب", "تشخيص ما قبل الولادة", "فحص حديثي الولادة في بعض الدول"],
      faq: [
        { q: "هل علاج الإنزيم متاح في مصر/الدول العربية؟", a: "متاح لكن مكلف جداً، بعض الدول بتوفره من خلال صناديق الأدوية اليتيمة." },
        { q: "هل ممكن أعيش حياة طبيعية؟", a: "البالغون مع العلاج المنتظم: نعم، مع تعديلات. الأطفال مع تشخيص مبكر وعلاج: تحسن جذري." },
      ],
      redFlags: ["ضيق تنفس مفاجئ", "علامات فشل قلب (في الأطفال)", "صعوبة بلع شديدة", "ضعف عضلي مفاجئ"],
      diagnosis: ["تحليل إنزيم GAA من بقعة دم جافة", "تحليل جيني", "خزعة عضلة (نادراً)"],
    },
    en: {
      fullDesc: "Pompe disease — rare genetic enzyme deficiency causing glycogen buildup in muscles (especially heart and breathing muscles). Two types: infantile (very severe) and adult (gradual). Enzyme replacement therapy transformed the disease.",
      treatmentDetails: [
        { title: "Enzyme replacement (Alglucosidase alfa)", body: "Myozyme/Lumizyme — IV infusion every 2 weeks for life. Slows or halts progression." },
        { title: "Avalglucosidase (Nexviazyme)", body: "Newer therapy (2021), more effective, same mechanism improved." },
        { title: "Intensive physiotherapy", body: "Preserve muscle strength and function." },
        { title: "Respiratory support", body: "Nocturnal ventilation (CPAP/BiPAP), sometimes permanent ventilation." },
        { title: "Specialized nutrition", body: "High protein, sometimes feeding tube." },
        { title: "Cardiac follow-up", body: "Especially infantile — periodic echo." },
      ],
      complications: ["Heart failure (infantile)", "Respiratory failure", "Eating/swallowing difficulty", "Early death in infantile without treatment", "Progressive muscle weakness"],
      lifestyle: ["Uninterrupted enzyme therapy", "Daily physiotherapy", "High-protein diet", "Avoid respiratory infections (vaccines)", "Mobility-friendly home"],
      prevention: ["Genetic testing for relatives", "Prenatal diagnosis", "Newborn screening in some countries"],
      faq: [
        { q: "Is enzyme therapy available regionally?", a: "Available but very expensive; some countries cover via orphan drug funds." },
        { q: "Can I live a normal life?", a: "Adults with regular treatment: yes, with adjustments. Children with early diagnosis and treatment: dramatic improvement." },
      ],
      redFlags: ["Sudden breathlessness", "Heart failure signs (in infants)", "Severe swallowing difficulty", "Sudden muscle weakness"],
      diagnosis: ["GAA enzyme assay from dry blood spot", "Genetic test", "Muscle biopsy (rarely)"],
    },
  },

  // ============ ALS ============
  "als": {
    ar: {
      fullDesc: "التصلب الجانبي الضموري (مرض لو غريغ، مرض ستيفن هوكينغ) مرض عصبي تدريجي يدمر الخلايا العصبية الحركية في المخ والحبل الشوكي. النتيجة: ضعف عضلي تدريجي، شلل، صعوبة كلام وبلع وتنفس. العقل يظل صافياً تماماً. متوسط البقاء 3-5 سنوات، مع علاج حديث ودعم تنفسي يطول.",
      treatmentDetails: [
        { title: "Riluzole", body: "العلاج الأول، يبطئ تطور المرض ويزيد البقاء 2-3 شهور." },
        { title: "Edaravone (Radicava)", body: "علاج أحدث، يبطئ التدهور الوظيفي." },
        { title: "AMX0035 (Relyvrio)", body: "علاج جديد (2022)، يطيل البقاء 6+ شهور." },
        { title: "علاج طبيعي ووظيفي", body: "للحفاظ على الوظيفة أطول فترة، تجنب الانكماشات." },
        { title: "علاج النطق والبلع", body: "تأخير صعوبة الكلام والبلع، تعليم استراتيجيات بديلة." },
        { title: "دعم تنفسي", body: "BiPAP ليلي، ثم تنفس صناعي إذا قبل المريض. القرار صعب جداً ولازم يتناقش بدري." },
        { title: "أنبوب تغذية", body: "لما البلع يصعب، يحفظ التغذية ويمنع الشفط." },
        { title: "أجهزة تواصل", body: "أجهزة بتعقب حركة العين أو المخ للتواصل لما الكلام يفقد." },
      ],
      complications: ["فشل تنفسي (السبب الرئيسي للوفاة)", "اختناق من الشفط", "تجلطات من قلة الحركة", "اكتئاب", "تقرحات الفراش"],
      lifestyle: ["خطة رعاية مبكرة (وصية، توكيلات)", "بيت مهيأ بكرسي ومصعد", "مجموعات دعم", "متابعة منتظمة مع فريق متخصص", "علاج نفسي للمريض والأسرة"],
      prevention: ["مفيش وقاية معروفة، 10% فقط وراثي"],
      faq: [
        { q: "هل العقل بيتأثر؟", a: "في 50% فيه تأثير معرفي خفيف، 15% خرف. أغلب المرضى عقولهم سليمة تماماً." },
        { q: "متى أقرر التنفس الصناعي؟", a: "قرار شخصي صعب، يطيل العمر سنين لكن يحتاج رعاية مستمرة. ناقش الموضوع بدري مع الأسرة والطبيب." },
      ],
      redFlags: ["ضيق تنفس شديد", "اختناق متكرر أثناء الأكل", "أفكار انتحار", "عدم القدرة على الحركة لمدة طويلة"],
      diagnosis: ["EMG", "MRI مخ وحبل شوكي", "تحاليل دم لاستبعاد أسباب أخرى", "خزعة عصب أحياناً"],
    },
    en: {
      fullDesc: "Amyotrophic Lateral Sclerosis (Lou Gehrig's disease, Stephen Hawking's disease) — progressive neurological disease destroying motor neurons in brain and spinal cord. Results: progressive muscle weakness, paralysis, difficulty speaking, swallowing, breathing. Mind remains completely intact. Median survival 3-5 years; modern treatment and ventilation extend it.",
      treatmentDetails: [
        { title: "Riluzole", body: "First-line, slows progression and adds 2-3 months survival." },
        { title: "Edaravone (Radicava)", body: "Newer treatment, slows functional decline." },
        { title: "AMX0035 (Relyvrio)", body: "New (2022), extends survival 6+ months." },
        { title: "Physical and occupational therapy", body: "Preserve function as long as possible, prevent contractures." },
        { title: "Speech and swallowing therapy", body: "Delay communication and swallowing decline, teach alternative strategies." },
        { title: "Respiratory support", body: "Nocturnal BiPAP, then mechanical ventilation if patient consents. A difficult decision to discuss early." },
        { title: "Feeding tube", body: "When swallowing fails, preserves nutrition and prevents aspiration." },
        { title: "Communication devices", body: "Eye-tracking or brain interface for communication when speech is lost." },
      ],
      complications: ["Respiratory failure (main cause of death)", "Aspiration choking", "Clots from immobility", "Depression", "Bed sores"],
      lifestyle: ["Early care planning (will, power of attorney)", "Wheelchair-accessible home", "Support groups", "Regular multidisciplinary follow-up", "Psychological care for patient and family"],
      prevention: ["No known prevention; only 10% hereditary"],
      faq: [
        { q: "Is the mind affected?", a: "50% have mild cognitive change, 15% dementia. Most have fully intact cognition." },
        { q: "When to decide on ventilation?", a: "Difficult personal choice — extends life by years but needs constant care. Discuss early with family and doctor." },
      ],
      redFlags: ["Severe breathlessness", "Recurrent choking while eating", "Suicidal thoughts", "Prolonged immobility"],
      diagnosis: ["EMG", "Brain and spinal MRI", "Blood tests to exclude other causes", "Nerve biopsy occasionally"],
    },
  },
};
