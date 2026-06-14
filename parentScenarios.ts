export interface Scenario {
  id: string;
  ar: { title: string; problem: string; steps: string[]; phrases: string[]; whenAsk: string };
  en: { title: string; problem: string; steps: string[]; phrases: string[]; whenAsk: string };
}

import { EXTRA_PARENT_SCENARIOS } from "./extraParentScenarios";
import { REAL_ILLNESS_SCENARIOS } from "./realIllnessParenting";

const BASE_PARENT_SCENARIOS: Scenario[] = [
  {
    id: "refuse-medicine",
    ar: {
      title: "طفلك يرفض أخذ الدواء",
      problem: "كل مرة موعد الدواء، الطفل يبكي أو يخفي نفسه أو يبصق الدواء.",
      steps: [
        "اشرح بلغة بسيطة: 'الدواء ده زي الجنود اللي بيحاربوا الميكروبات اللي عاملاك تعبان'.",
        "اعرض اختيارات محدودة: 'تحب تشربه قبل ولا بعد العصير؟' (الاختيار يعطيه إحساس بالتحكم).",
        "استخدم نظام مكافآت بصري (ملصقات على تقويم) — كل جرعة = ملصق، 7 ملصقات = هدية صغيرة.",
        "لو الطعم مر، اسأل الصيدلي عن نسخة بطعم محسّن أو اخلطه بملعقة عسل (للأطفال فوق سنة).",
        "لا تخدعه أبداً بإخفائه في الطعام كله — يفقد الثقة في كل وجباته.",
      ],
      phrases: [
        "'أنا فاهم إنك مش عايز، بس ده هيخليك تلعب وترجع زي الأول.'",
        "'تعالى نعدّه مع بعض، 1... 2... 3...'",
        "'أنا فخور بيك إنك صبرت.'",
      ],
      whenAsk: "لو رفض كامل لأكثر من جرعتين، أو قيء بعد كل مرة، اتصل بالطبيب لتعديل الشكل أو الجرعة.",
    },
    en: {
      title: "Your child refuses medication",
      problem: "Every dose time the child cries, hides, or spits the medicine out.",
      steps: [
        "Explain simply: 'This medicine is like soldiers fighting the germs that are making you tired.'",
        "Offer limited choices: 'Do you want to take it before or after juice?' — choice gives them control.",
        "Use a visual reward chart — one sticker per dose, 7 stickers = small reward.",
        "If taste is bad, ask the pharmacist for a flavored version or mix in a teaspoon of honey (over age 1).",
        "Never hide it in their entire meal — they'll lose trust in all food.",
      ],
      phrases: [
        "'I understand you don't want to, but this will help you play again.'",
        "'Let's count together: 1... 2... 3.'",
        "'I'm so proud you were brave.'",
      ],
      whenAsk: "If refused for more than 2 doses or vomits each time, call the doctor to change form/dose.",
    },
  },
  {
    id: "tell-chronic",
    ar: {
      title: "كيف تخبر طفلك إن عنده مرض مزمن",
      problem: "تشخيص جديد (سكري، ربو، صرع...) وانت خايف توصّل المعلومة بدون ما تخوفه.",
      steps: [
        "اختر وقت هادي بدون مشتتات. اقعد على نفس مستواه (ركبتيك على الأرض).",
        "ابدأ بسؤال: 'فاكر لما رحنا للدكتور؟ عرفنا إيه السبب اللي بيخليك تحس كده.'",
        "استخدم تشبيهات حسية: السكري = 'البنكرياس بيتعب وبيحتاج مساعدة من إبرة الإنسولين'.",
        "أكّد إن المرض مش بسببه ومش عقاب على حاجة عملها.",
        "وضّح إيه اللي هيتغير (دواء يومي، فحص دم) وإيه اللي هيفضل زي ما هو (مدرسة، لعب، أصدقاء).",
        "اسمح له يبكي/يغضب/يصمت — كل المشاعر مقبولة. قول: 'حقك تحس كده'.",
        "بعد يومين، افتح الموضوع تاني واسأل: 'فيه أسئلة جت في بالك؟'",
      ],
      phrases: [
        "'إحنا فريق، أنا ومامتك/بابا والدكتور كلنا معاك.'",
        "'مش لازم تكون شجاع طول الوقت، تقدر تحس بأي حاجة.'",
        "'فيه أطفال كتير زيك، وعايشين حياة عادية جداً.'",
      ],
      whenAsk: "لو لاحظت انعزال، تراجع دراسي، أو كوابيس متكررة لأكثر من أسبوعين، اطلب جلسة مع أخصائي نفسي للأطفال.",
    },
    en: {
      title: "How to tell your child about a chronic illness",
      problem: "A new diagnosis (diabetes, asthma, epilepsy...) and you're scared to break the news without scaring them.",
      steps: [
        "Pick a quiet moment. Get down to their eye level.",
        "Start with a question: 'Remember when we went to the doctor? We learned why you feel this way.'",
        "Use sensory analogies: diabetes = 'your pancreas is tired and needs help from an insulin pen.'",
        "Reassure them it's NOT their fault and not a punishment.",
        "Explain what will change (daily medicine, blood test) and what stays the same (school, play, friends).",
        "Let them cry/be angry/be silent — all feelings are okay. Say: 'You have every right to feel this.'",
        "Two days later, reopen: 'Did any questions pop up in your head?'",
      ],
      phrases: [
        "'We're a team — me, mom/dad, the doctor — all with you.'",
        "'You don't have to be brave all the time. You can feel anything.'",
        "'Many kids have this and live very normal lives.'",
      ],
      whenAsk: "If you notice withdrawal, school decline, or repeated nightmares for over 2 weeks, book a child psychologist.",
    },
  },
  {
    id: "hospital-fear",
    ar: {
      title: "طفلك خايف من المستشفى/الإبر",
      problem: "كل زيارة بتتحول لأزمة، صراخ ودموع وأحياناً رفض كامل.",
      steps: [
        "حضّره قبل الزيارة بيوم: اشرح خطوة بخطوة بصور أو لعب (دكتور بلاي مع دبدوب).",
        "خد معاه شيء يطمّنه (دبدوب، بطانية، تابلت بفيلمه المفضّل).",
        "اطلب من الممرضة استخدام كريم مخدر (EMLA) قبل الإبرة بساعة لو ممكن.",
        "اشغله أثناء الإبرة: عد، نفس عميق، اطلب يضغط على يدك بقوة.",
        "ما تكدبش: 'مش هيوجع' خطأ. قول: 'هتحس وخزة صغيرة، بس بسرعة بتخلص'.",
        "بعدها مباشرة: مكافأة فورية واحتضان وكلام إيجابي.",
      ],
      phrases: [
        "'إحنا هنا عشان نخليك أحسن، مش عقاب.'",
        "'أنا معاك، مش هسيبك ثانية.'",
        "'بصلي في عنيي وعد معايا، 1... 2... 3...'",
      ],
      whenAsk: "لو الخوف وصل لمرحلة قيء قبل الزيارة أو نوبة هلع، اتكلم مع الطبيب — ممكن يحوّلكم لأخصائي 'تحضير طبي' للأطفال.",
    },
    en: {
      title: "Your child fears the hospital / needles",
      problem: "Every visit becomes a crisis: screaming, tears, sometimes total refusal.",
      steps: [
        "Prepare them a day ahead: explain step by step with pictures or role-play (toy doctor with teddy).",
        "Bring a comfort object (teddy, blanket, tablet with favorite show).",
        "Ask the nurse for numbing cream (EMLA) one hour before the injection if possible.",
        "Distract during the shot: count, deep breath, ask them to squeeze your hand hard.",
        "Don't lie: 'It won't hurt' is wrong. Say: 'A small pinch, but quick.'",
        "Right after: instant reward, hug, and positive words.",
      ],
      phrases: [
        "'We're here to help you, not to punish.'",
        "'I'm with you, I won't leave for one second.'",
        "'Look in my eyes and count with me, 1... 2... 3.'",
      ],
      whenAsk: "If fear causes vomiting before visits or panic attacks, ask your doctor — they may refer you to a child medical-prep specialist.",
    },
  },
  {
    id: "home-emergency",
    ar: {
      title: "أزمة طوارئ مفاجئة في البيت",
      problem: "نوبة (تشنج، صعوبة تنفس، ارتفاع سكر/هبوط، حساسية شديدة) — لازم تتصرف في ثواني.",
      steps: [
        "اهدأ. صوتك ومظهرك أهم من الكلمات. خد نفس عميق قبل ما تتحرك.",
        "اعمل خطة طوارئ مكتوبة ومعلقة على الثلاجة (أرقام إسعاف، طبيب، جار، الأدوية + الجرعات).",
        "علم باقي الأسرة (إخوة كبار، خادمة) إيه يعملوا في كل سيناريو.",
        "احتفظ بحقيبة طوارئ جاهزة: دواء الإنقاذ، بخاخ، EpiPen، جلوكوز، رقم تأمين، كارت معلومات الطفل.",
        "أثناء الأزمة: ضع الطفل في وضع آمن (جنبه لو نوبة تشنج)، اتصل بالإسعاف، استخدم الدواء المعد.",
        "بعد الأزمة: وثّق إيه حصل، إمتى، إيه اللي شغّلها — هيساعد الطبيب جداً.",
      ],
      phrases: [
        "'إنت في أمان، أنا معاك.' (كرّرها بهدوء حتى لو فاقد الوعي)",
        "'كل حاجة تحت السيطرة.'",
      ],
      whenAsk: "أي نوبة جديدة (لم تحدث قبل كده) = إسعاف فوراً. أي نوبة أطول من 5 دقائق = إسعاف فوراً.",
    },
    en: {
      title: "Sudden home emergency",
      problem: "An attack (seizure, breathing trouble, blood-sugar swing, severe allergy) — you have seconds to act.",
      steps: [
        "Stay calm. Your voice and demeanor matter more than your words. Take a deep breath before moving.",
        "Have a written emergency plan on the fridge: ambulance, doctor, neighbor, medications + doses.",
        "Train the rest of the family (older siblings, helper) on what to do in each scenario.",
        "Keep an emergency kit: rescue meds, inhaler, EpiPen, glucose, insurance card, child info card.",
        "During the crisis: place child in safe position (on side if seizing), call ambulance, give the prepared medicine.",
        "After: document what happened, when, what triggered it — this helps the doctor immensely.",
      ],
      phrases: [
        "'You're safe, I'm with you.' (Repeat calmly even if unconscious.)",
        "'Everything is under control.'",
      ],
      whenAsk: "Any new attack (never happened before) = ambulance immediately. Any attack lasting > 5 minutes = ambulance immediately.",
    },
  },
  {
    id: "sibling-care",
    ar: {
      title: "الإخوة الأصحاء يحسّوا بالتجاهل",
      problem: "كل وقتك مع الطفل المريض، والباقي يحسّوا إنهم مش مهمين.",
      steps: [
        "خصّص 15 دقيقة يومياً 'وقت خاص' مع كل أخ بدون مقاطعة (تليفون مقفول).",
        "اشرحلهم المرض بصدق ومستوى عمرهم — يخفف الخوف والغيرة.",
        "اسمحهم يساعدوا بطرق صغيرة (يجيب الدواء، يقرأله قصة) — يحسّوا إنهم جزء من الحل.",
        "احذر العبارات: 'إنت أكبر، تحمّل' — تخلق ضغط ومرارة.",
        "اعمل أنشطة عائلية يقدر يشترك فيها المريض والأصحاء معاً.",
      ],
      phrases: [
        "'أنا عارف إن الوقت ده صعب عليك إنت كمان.'",
        "'إنت مهم جداً وأنا فخور بيك.'",
        "'مش لازم تكون قوي طول الوقت، تقدر تكون زعلان.'",
      ],
      whenAsk: "لو لاحظت تراجع دراسي، عدوانية، أو شكوى جسدية متكررة (صداع، آلام بطن) — استشير أخصائي نفسي.",
    },
    en: {
      title: "Healthy siblings feel ignored",
      problem: "All your time goes to the sick child; the others feel unimportant.",
      steps: [
        "Set aside 15 minutes daily of 'special time' with each sibling — phone off.",
        "Explain the illness honestly at their level — eases fear and jealousy.",
        "Let them help in small ways (fetch medicine, read a story) — they feel part of the solution.",
        "Avoid phrases like 'You're older, deal with it' — creates pressure and resentment.",
        "Do family activities all kids can join together.",
      ],
      phrases: [
        "'I know this time is hard for you too.'",
        "'You matter so much and I'm proud of you.'",
        "'You don't have to be strong all the time — you can be sad.'",
      ],
      whenAsk: "If you notice school decline, aggression, or recurring physical complaints (headache, tummy pain), see a psychologist.",
    },
  },
  {
    id: "selfcare",
    ar: {
      title: "إنت محتاج تعتني بنفسك (Burnout)",
      problem: "بقالك شهور بتعتني، ومحدش بيسأل عنك. مش نايم، مش آكل، حاسس إنك خايب.",
      steps: [
        "اطلب مساعدة بدون خجل: قريب، صديق، جمعية دعم. ساعتين راحة في الأسبوع = حاجة أساسية مش رفاهية.",
        "نام لما الطفل بينام (حتى لو بالنهار).",
        "كل وجبات منتظمة حتى لو بسيطة. اشرب ميه.",
        "اعمل 10 دقايق يومياً لنفسك: مشي، صلاة/تأمل، حد بتحبه تكلمه.",
        "انضم لمجموعة أهالي (Facebook، WhatsApp) لأطفال بنفس الحالة — مش هتحس إنك لوحدك.",
        "لو الحزن استمر أكثر من أسبوعين، أو فيه أفكار يأس، روح لطبيب نفسي. ده مش ضعف.",
      ],
      phrases: [
        "'مش لازم أكون مثالي، كفاية إني بحاول.'",
        "'صحتي مهمة عشان أقدر أعتني بطفلي.'",
      ],
      whenAsk: "أي أفكار إيذاء النفس أو يأس عميق = اتصل بخط دعم نفسي فوراً (مثلاً 920033360 في السعودية، 16328 في مصر).",
    },
    en: {
      title: "You need to care for yourself (Burnout)",
      problem: "You've been caregiving for months and no one asks about you. Not sleeping, not eating, feeling like a failure.",
      steps: [
        "Ask for help without shame: relative, friend, support group. Two hours of rest a week = essential, not luxury.",
        "Sleep when the child sleeps (even if during the day).",
        "Eat regular meals, even simple. Drink water.",
        "Take 10 minutes daily for yourself: walk, prayer/meditation, call someone you love.",
        "Join a parent group (Facebook, WhatsApp) for kids with the same condition — you'll feel less alone.",
        "If sadness lasts more than 2 weeks or you have hopeless thoughts, see a psychiatrist. This isn't weakness.",
      ],
      phrases: [
        "'I don't need to be perfect; trying is enough.'",
        "'My health matters so I can care for my child.'",
      ],
      whenAsk: "Any self-harm thoughts or deep hopelessness = call a crisis line immediately.",
    },
  },

  // ===== DISABILITY-SPECIFIC GUIDES =====
  {
    id: "down-syndrome",
    ar: {
      title: "ابنك عنده متلازمة داون — كيف تتعامل معاه؟",
      problem: "تشخيص متلازمة داون بيخلي الأهل قلقانين على المستقبل والتعليم والاستقلالية، ومش عارفين يبدأوا منين.",
      steps: [
        "ابدأ التدخل المبكر من الشهور الأولى: علاج طبيعي لتقوية العضلات (Hypotonia)، علاج نطق، علاج وظيفي.",
        "تابع طبياً بانتظام: قلب (50% عندهم عيوب قلب)، غدة درقية، سمع وبصر، فحص رقبة (Atlantoaxial instability) قبل الرياضة.",
        "كلّمه زي أي طفل في عمره — بكلام كامل، مش مختصر. هو فاهم أكتر مما تتخيل.",
        "اعتمد على الروتين الواضح والصور البصرية (Picture schedules) — ده بيقلل القلق ويزيد الاستقلالية.",
        "علّمه مهارات الحياة اليومية بالتقسيم (Task analysis): لبس الملابس، تنظيف الأسنان، تحضير ساندويتش — خطوة خطوة، مع تكرار وصبر.",
        "ادمجه في مدرسة عادية (Inclusion) لو ممكن، مع دعم تربوي فردي (IEP). الأبحاث بتأكد إن الدمج بيحسّن النطق والمهارات الاجتماعية بشكل كبير.",
        "شجّعه على الرياضة (سباحة، جودو، رقص) — بتقوي العضلات وبتزود الثقة وبتحارب السمنة المرتبطة بالحالة.",
        "ركّز على مواهبه (موسيقى، تمثيل، فن) مش بس على نقاط ضعفه. اشتغل على نقاط القوة.",
      ],
      phrases: [
        "'إنت قادر، خد وقتك.' (مش 'بسرعة' أو 'يلا')",
        "'وريني إزاي عملتها' بدل 'هاتها هنا'.",
        "'أنا فخور بيك' — كرّرها بصدق على أبسط إنجاز.",
      ],
      whenAsk: "أي تأخر مفاجئ في مهارة كان يعملها، أو علامات سكتة قلبية أو مشاكل تنفس أثناء النوم — اطلب طبيب فوراً. للدعم النفسي للأهل: مجموعات أهالي متلازمة داون في بلدك (مثلاً جمعية رعاية متلازمة داون في مصر، الجمعية السعودية لمتلازمة داون).",
    },
    en: {
      title: "Your child has Down syndrome — how to support them",
      problem: "A Down syndrome diagnosis leaves parents worried about the future, education, and independence — and unsure where to start.",
      steps: [
        "Start early intervention from the first months: physical therapy for hypotonia, speech therapy, occupational therapy.",
        "Schedule routine medical follow-up: heart (50% have congenital defects), thyroid, hearing/vision, atlantoaxial spine screening before any sport.",
        "Speak to them like any child their age — full sentences, not baby-talk. They understand more than you think.",
        "Use clear routines and visual schedules — reduces anxiety, builds independence.",
        "Teach daily-life skills via task analysis: dressing, brushing, making a sandwich — step by step, with repetition and patience.",
        "Mainstream school placement (inclusion) when possible, with an Individualized Education Plan (IEP). Research consistently shows it boosts speech and social skills.",
        "Encourage sports (swimming, judo, dance) — strengthens muscles, builds confidence, fights weight gain.",
        "Focus on their strengths (music, drama, art), not just deficits. Build on what they love.",
      ],
      phrases: [
        "'You can do it, take your time.' (Not 'hurry up'.)",
        "'Show me how you did it.' (Builds pride.)",
        "'I'm proud of you' — said sincerely for the smallest win.",
      ],
      whenAsk: "Any sudden loss of an acquired skill, signs of heart failure, or sleep apnea — see a doctor immediately. For parent support: join a local Down syndrome association.",
    },
  },
  {
    id: "autism-asd",
    ar: {
      title: "ابنك عنده توحد (ASD) — التعامل اليومي",
      problem: "صعوبة في التواصل، نوبات حسية (Meltdown)، روتين صارم، ومشاكل في النوم والأكل — والأهل حاسين بالإرهاق.",
      steps: [
        "التشخيص المبكر = نتائج أحسن. ابدأ علاج ABA أو DIR-Floortime من سن سنتين لو ممكن.",
        "افهم المحفّزات الحسية: ضوء قوي، صوت عالي، ملمس قماش معين — وحاول تتجنبها أو تقلل التعرض.",
        "استخدم الصور والـPECS (تبادل صور للتواصل) لو الكلام متأخر. كل صورة = طلب أو مشاعر.",
        "نظّم البيت بمناطق هادئة محسوسة: ركن استرخاء فيه ضوء خافت، بطانية ثقيلة، سماعات عازلة.",
        "أنذره بالتغييرات قبلها: 'بعد 5 دقايق هنطفي التليفزيون' بدل قطع مفاجئ.",
        "أثناء نوبة حسية (Meltdown): لا تتكلم كتير، لا تلمسه (إلا لو طلب)، خفّض الإضاءة، اعطيه مساحة. هي مش 'دلع' — هي إرهاق عصبي حقيقي.",
        "ركّز على اهتماماته الخاصة (قطارات، ديناصورات، أرقام) واستخدمها مدخل للتعلم.",
        "اشتغل مع أخصائي تخاطب وعلاج وظيفي بانتظام، وخد فترات راحة لنفسك (Respite care).",
      ],
      phrases: [
        "'أنا شايفك، إنت في أمان.' (بصوت هادي جداً)",
        "'هتختار إيه: التيشيرت الأزرق ولا الأحمر؟' (اختيارات محدودة).",
        "'فاهم إن الصوت ده مزعج، تعالى نروح مكان أهدى.'",
      ],
      whenAsk: "أي تراجع مفاجئ في مهارات اكتسبها (كلام، تواصل بصري) — استشر طبيب أعصاب أطفال. أي إيذاء للنفس متكرر — أخصائي سلوك فوراً.",
    },
    en: {
      title: "Your child is on the autism spectrum (ASD) — daily life",
      problem: "Difficulty communicating, sensory meltdowns, rigid routines, sleep and feeding issues — and parents feel overwhelmed.",
      steps: [
        "Early diagnosis = better outcomes. Start ABA or DIR/Floortime by age 2 if possible.",
        "Identify sensory triggers: bright light, loud sound, a specific fabric — and reduce exposure.",
        "Use pictures and PECS (Picture Exchange Communication System) when speech is delayed. Each picture = a request or feeling.",
        "Set up a calm sensory corner at home: dim light, weighted blanket, noise-cancelling headphones.",
        "Warn before transitions: 'In 5 minutes we'll turn off the TV' beats sudden cut-offs.",
        "During a meltdown: don't talk much, don't touch (unless invited), dim the lights, give space. It's NOT a tantrum — it's real neurological overload.",
        "Lean into special interests (trains, dinosaurs, numbers) as gateways to learning.",
        "Work regularly with speech and occupational therapists, and arrange respite care for yourself.",
      ],
      phrases: [
        "'I see you, you're safe.' (Very calm voice.)",
        "'Blue shirt or red shirt?' (Limited choices.)",
        "'I get that the noise hurts. Let's go somewhere quieter.'",
      ],
      whenAsk: "Any sudden regression in acquired skills (speech, eye contact) — see a child neurologist. Repeated self-injury — behavior specialist immediately.",
    },
  },
  {
    id: "adhd",
    ar: {
      title: "ابنك عنده ADHD (فرط حركة وتشتت)",
      problem: "ما يقدرش يقعد، ينسى واجباته، يقاطع، ينفجر بسرعة — والمدرسة بتشتكي والأهل تعبانين.",
      steps: [
        "تشخيص ADHD لازم من طبيب نفسي أطفال — مش كل طفل نشيط عنده ADHD. بعد التشخيص، الخطة بتجمع: علاج سلوكي + (أحياناً) دواء + دعم مدرسي.",
        "قسّم الواجبات لقطع صغيرة (10-15 دقيقة) مع استراحة حركة بينهم. تايمر مرئي بيساعد جداً.",
        "روتين يومي ثابت بنفس المواعيد كل يوم — نوم، أكل، واجب، لعب. التغيير بيرفع الأعراض.",
        "قلّل المشتتات وقت الواجب: مكتب فاضي، تليفون بعيد، صوت أبيض لو محتاج.",
        "مدحه على المحاولة مش بس النتيجة. نظام نقاط مرئي يومي بمكافآت صغيرة بيشتغل ممتاز.",
        "اعطيه فرص لتفريغ الطاقة كل يوم: رياضة 60 دقيقة (سباحة، كاراتيه، كرة) — بتقلل الأعراض بشكل واضح.",
        "تعليمات قصيرة وواحدة في المرة: 'البس الجزمة' بدل 'هات الجزمة والشنطة وامشي'.",
        "تواصل دائم مع المدرسة لخطة دعم (504 plan / IEP)، مع جلوس قدام، وقت إضافي للامتحانات، استراحات حركة.",
      ],
      phrases: [
        "'بصلي وأنا بكلمك.' (بدل ما تكلمه من بعيد).",
        "'إنت اشتغلت 10 دقايق من غير ما تقوم — برافو.'",
        "'فاهم إنك متضايق، خد نفس عميق ونتكلم بعد دقيقة.'",
      ],
      whenAsk: "لو فيه أفكار إيذاء نفس، اكتئاب، أو الدواء بيسبب أعراض جانبية شديدة (فقدان شهية حاد، أرق، تغير مزاج كبير) — راجع الطبيب فوراً.",
    },
    en: {
      title: "Your child has ADHD",
      problem: "Can't sit still, forgets homework, interrupts, explodes quickly — school complains and parents are exhausted.",
      steps: [
        "ADHD must be diagnosed by a child psychiatrist — not every active child has ADHD. The plan combines behavioral therapy + sometimes medication + school support.",
        "Break homework into 10-15 min chunks with movement breaks between. A visual timer helps a lot.",
        "Strict daily routine — same sleep, meal, homework, play times every day. Change worsens symptoms.",
        "Reduce distractions during homework: clear desk, phone away, white noise if needed.",
        "Praise effort, not just outcome. A daily visual point system with small rewards works wonders.",
        "Daily energy outlet: 60 minutes of sport (swimming, karate, ball) — measurably reduces symptoms.",
        "Short, single instructions: 'Put on your shoes' beats 'Get your shoes and bag and let's go'.",
        "Stay in close contact with school for a support plan (504/IEP) — front-row seat, extended exam time, movement breaks.",
      ],
      phrases: [
        "'Look at me when I'm talking.' (Instead of calling from far away.)",
        "'You worked 10 minutes without getting up — well done!'",
        "'I see you're frustrated. Take a deep breath, we'll talk in a minute.'",
      ],
      whenAsk: "Any self-harm thoughts, depression, or severe medication side effects (loss of appetite, insomnia, big mood change) — see the doctor immediately.",
    },
  },
  {
    id: "learning-difficulties",
    ar: {
      title: "صعوبات تعلّم (عسر قراءة/كتابة/حساب)",
      problem: "ابنك ذكي لكن بيعاني في القراءة، الكتابة، أو الحساب، والمدرسة بتقول 'كسلان' أو 'مش بيركز'.",
      steps: [
        "اطلب تقييم نفسي تربوي متخصص (Educational psychologist) لتحديد نوع الصعوبة بدقة (Dyslexia/Dysgraphia/Dyscalculia).",
        "وضّح للطفل: 'إنت ذكي جداً، بس مخك بيشتغل بطريقة مختلفة في حاجة معينة' — يحميه من تدمير ثقته بنفسه.",
        "اشتغل مع أخصائي تربوي مدرّب على Orton-Gillingham (للديسلكسيا) — أكثر طريقة مثبتة علمياً.",
        "استخدم تكنولوجيا مساعدة: قارئ نصوص (Text-to-speech)، إملاء صوتي للكتابة، آلة حاسبة.",
        "في البيت: اقرأ معاه بصوت عالٍ يومياً، حتى لو هو اللي بيختار الكتاب. اخليه يستمتع بالكتب المسموعة.",
        "ركّز على نقاط قوته (رياضة، فن، تكنولوجيا) عشان يبني هوية إيجابية مش متعلقة بالأكاديمية بس.",
        "تواصل مع المدرسة لخطة دعم: وقت إضافي للامتحان، أسئلة مقروءة شفهياً، تقييم بطرق متعددة.",
      ],
      phrases: [
        "'مخك مختلف، مش أقل.'",
        "'حلّيت 5 من أصل 10 — يبقى تعلمت 5، نتعلم الباقي مع بعض.'",
        "'مش لازم تبقى زي حد، إنت إنت.'",
      ],
      whenAsk: "لو لاحظت اكتئاب، رفض كامل للمدرسة، أو شكاوى جسدية متكررة قبل المدرسة (مغص، صداع) — استشر أخصائي نفسي للأطفال.",
    },
    en: {
      title: "Learning difficulties (dyslexia / dysgraphia / dyscalculia)",
      problem: "Your child is bright but struggles with reading, writing, or math — and the school calls them 'lazy' or 'unfocused'.",
      steps: [
        "Request a full educational-psychology evaluation to identify the specific difficulty (Dyslexia/Dysgraphia/Dyscalculia).",
        "Tell the child: 'You're very smart — your brain just works differently for this thing' — protects their self-esteem.",
        "Work with a tutor trained in Orton-Gillingham (for dyslexia) — the most evidence-based method.",
        "Use assistive tech: text-to-speech, voice-to-text dictation, calculator.",
        "At home: read aloud together daily, even if they pick the book. Audiobooks are great too.",
        "Focus on strengths (sport, art, tech) so they build identity beyond academics.",
        "Coordinate with school for accommodations: extra time, oral questions, multiple assessment formats.",
      ],
      phrases: [
        "'Your brain is different, not less.'",
        "'You got 5 out of 10 — you learned 5, we'll learn the rest together.'",
        "'You don't have to be like anyone else. You're you.'",
      ],
      whenAsk: "If you notice depression, school refusal, or recurring physical complaints before school (tummy ache, headache) — consult a child psychologist.",
    },
  },
];

export const PARENT_SCENARIOS: Scenario[] = [...REAL_ILLNESS_SCENARIOS, ...BASE_PARENT_SCENARIOS, ...EXTRA_PARENT_SCENARIOS];
