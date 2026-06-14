// Real-illness parenting scenarios: how to handle a child diagnosed with a specific condition.
import type { Scenario } from "./parentScenarios";

export const REAL_ILLNESS_SCENARIOS: Scenario[] = [
  {
    id: "child-asthma",
    ar: {
      title: "طفلك مصاب بالربو",
      problem: "طفلك يعاني نوبات ضيق تنفس وكحة ليلية، وأنت قلق من كل صفير.",
      steps: [
        "احصل من الطبيب على 'خطة عمل الربو' مكتوبة (المنطقة الخضراء/الصفراء/الحمراء).",
        "علّمه استخدام البخاخ بطريقة صحيحة مع المباعد (spacer) — هزّ ثم رشّ ثم 5 أنفاس.",
        "بخاخ الإنقاذ (Salbutamol) في كل حقيبة (مدرسة، سيارة، بيت).",
        "حدّد المثيرات: تراب، حيوانات، تدخين سلبي، رياضة عنيفة، نزلات برد.",
        "غيّر الفراش أسبوعياً، تجنّب السجاد، استخدم غطاء مضاد للحساسية.",
        "أبلغ المدرسة والمدرّسين كتابياً بالخطة.",
      ],
      phrases: [
        "'هنستخدم البخاخ الآن — هتحس نفسك أحسن خلال دقايق.'",
        "'مش لازم تستحي — البخاخ ده زي النضارة، أداة بتساعدك.'",
        "'لو حسيت بضيق وأنا مش جنبك، خد البخاخ على طول وقل لأي حد كبير.'",
      ],
      whenAsk: "اذهب للطوارئ إذا: صعوبة كلام بسبب ضيق التنفس، أو زرقة شفايف/أظافر، أو لم يستجب لبخاخ الإنقاذ بعد 3 رشات.",
    },
    en: {
      title: "Your child has asthma",
      problem: "Wheezing attacks and night coughs leave you anxious at every whistle.",
      steps: [
        "Get a written Asthma Action Plan from the doctor (Green/Yellow/Red zones).",
        "Teach correct inhaler technique with a spacer — shake, puff, 5 breaths.",
        "Keep a rescue inhaler (Salbutamol) in every bag (school, car, home).",
        "Identify triggers: dust, pets, secondhand smoke, intense exercise, colds.",
        "Wash bedding weekly, avoid carpets, use allergen-proof covers.",
        "Brief the school and teachers in writing.",
      ],
      phrases: [
        "'We'll use the inhaler now — you'll feel better in a couple of minutes.'",
        "'It's nothing to be ashamed of — the inhaler is a tool, like glasses.'",
        "'If I'm not around and you feel tight, take your inhaler and tell any adult.'",
      ],
      whenAsk: "Go to ER if: can't speak full sentences, lips/nails turning blue, or no relief after 3 rescue puffs.",
    },
  },
  {
    id: "child-t1-diabetes",
    ar: {
      title: "طفلك مصاب بالسكري النوع الأول",
      problem: "تشخيص جديد بالسكري، وأنت محتار بين الحقن والقياسات والوجبات.",
      steps: [
        "تعلّم قياس السكر قبل الوجبات وقبل النوم (4–7 مرات/يوم في البداية).",
        "اعرف علامات نقص السكر: رعشة، عرق، جوع شديد، تشوّش — أعطه 15 جرام سكر سريع.",
        "اطّلع على نظام 'الكربوهيدرات-للأنسولين' (carb counting) مع اختصاصي تغذية.",
        "ابحث عن جهاز قياس مستمر (CGM) — يقلل وخز الإصبع كثيراً.",
        "أبلغ المدرسة وسجّل خطة طبية موثّقة — مع عصير/سكاكر للطوارئ.",
        "اجعل الطفل يشارك في القرارات حسب عمره — السيطرة الذاتية مهمة لاحقاً.",
      ],
      phrases: [
        "'السكر مش غلطتك. جسمك بس محتاج مساعدة مع الأنسولين.'",
        "'هنتعلّم سوا — كل خطأ هو درس مش فشل.'",
        "'ممكن تعمل كل اللي زمايلك يعملوه، مع شوية تخطيط زيادة.'",
      ],
      whenAsk: "اتصل بالطوارئ فوراً عند: قيء متكرر، تنفس سريع برائحة فواكه، نعاس شديد، أو قياس سكر فوق 250 مع كيتونات — قد يكون حماض كيتوني (DKA).",
    },
    en: {
      title: "Your child has Type 1 Diabetes",
      problem: "New diagnosis — you're juggling injections, finger sticks, and meal counts.",
      steps: [
        "Check blood sugar before meals and bedtime (4–7×/day initially).",
        "Know hypoglycemia signs: shaking, sweating, intense hunger, confusion — give 15 g fast sugar.",
        "Learn carb counting with a dietitian.",
        "Look into a Continuous Glucose Monitor (CGM) — drastically fewer finger pricks.",
        "Brief the school with a written medical plan + emergency juice/candy.",
        "Let the child help decide based on age — autonomy matters long-term.",
      ],
      phrases: [
        "'Diabetes isn't your fault. Your body just needs help with insulin.'",
        "'We'll learn together — every mistake is a lesson, not a failure.'",
        "'You can do everything your friends do, with a bit more planning.'",
      ],
      whenAsk: "Call emergency immediately if: repeated vomiting, rapid breathing with fruity breath, severe drowsiness, or BG >250 with ketones — possible DKA.",
    },
  },
  {
    id: "child-epilepsy",
    ar: {
      title: "طفلك مصاب بالصرع",
      problem: "نوبة تشنّج هزّتك من جذورك، وأنت خايف من كل لحظة قادمة.",
      steps: [
        "وقت النوبة: ضعه على جانبه، أزل الأشياء الحادة، لا تضع شيئاً في فمه، وقّت النوبة.",
        "إذا تجاوزت 5 دقائق أو تكررت بسرعة، اتصل بالإسعاف.",
        "أعطه الدواء (مثل ليفيتيراسيتام) في نفس الموعد يومياً — لا تفوّت جرعة.",
        "تجنّب المثيرات: قلة النوم، الحمى، الإجهاد الشديد، الأضواء الوامضة (لبعض الأنواع).",
        "احتفظ بسجل نوبات (وقت، مدة، شكل، ما قبلها) لمشاركته مع طبيب الأعصاب.",
        "تأكد من فهم المدرسة كيفية التصرف — اعطهم نسخة من خطة الطوارئ.",
      ],
      phrases: [
        "'النوبة مش هتأذيك — هنخليك بأمان.'",
        "'مفيش حاجة عيب فيها. كتير من الناس عندهم زيك، وعايشين حياة كاملة.'",
        "'الدواء بيخلي مخّك مرتاح — لازم نوخده زي ما الدكتور قال.'",
      ],
      whenAsk: "اتصل بالإسعاف فوراً إذا: نوبة أطول من 5 دقائق، أو نوبة ثانية قبل ما يستفيق، أو إصابة أثناء النوبة، أو صعوبة تنفس بعدها.",
    },
    en: {
      title: "Your child has epilepsy",
      problem: "A seizure shook you to the core, and now you live on edge.",
      steps: [
        "During seizure: side position, clear sharp objects, NOTHING in mouth, time it.",
        "If >5 minutes or cluster seizures, call emergency.",
        "Give medication (e.g., levetiracetam) at the same time daily — never miss a dose.",
        "Avoid triggers: sleep loss, fever, severe stress, flashing lights (for some types).",
        "Keep a seizure log (time, duration, type, preceding events) for the neurologist.",
        "Ensure the school knows the protocol — give them a written emergency plan.",
      ],
      phrases: [
        "'The seizure won't hurt you — we'll keep you safe.'",
        "'Nothing is shameful here. Many people live full lives with this.'",
        "'The medication keeps your brain calm — we take it exactly as the doctor said.'",
      ],
      whenAsk: "Call emergency immediately if: seizure >5 minutes, a second seizure before waking, injury during it, or trouble breathing after.",
    },
  },
  {
    id: "child-leukemia",
    ar: {
      title: "طفلك مشخّص باللوكيميا (سرطان دم الأطفال)",
      problem: "تشخيص صادم، علاج كيماوي طويل، وطفل أصبح ضعيف المناعة.",
      steps: [
        "تابع الكورس مع مركز أورام أطفال متخصص (57357 في مصر، KFSH&RC في السعودية، Boston Children's بأمريكا).",
        "احذر العدوى: تجنّب الأماكن المزدحمة، تأكد من تطعيمات العائلة، اغسل يديك دائماً.",
        "راقب الحرارة كل يوم — أي حرارة 38°+ تتطلب اتصال فوري بالطبيب.",
        "وفّر غذاء آمن: مطبوخ جيداً، تجنّب الخضار النيئة والأجبان غير المبسترة.",
        "اطلب دعم نفسي للطفل وللعائلة — الإرهاق العاطفي حقيقي.",
        "تواصل مع منظمات دعم (مثل CCI، 57357 لدعم الأسر) للمساعدة المالية والمعنوية.",
      ],
      phrases: [
        "'المرض ده مش غلطتك ولا غلطة حد. جسمك بيحارب، وإحنا كلنا معاك.'",
        "'العلاج صعب بس بيشتغل. كل يوم نقرّب من النهاية.'",
        "'الصلع موضة مؤقتة — شعرك هيرجع أحلى.'",
      ],
      whenAsk: "اذهب للطوارئ فوراً عند: حرارة فوق 38°، نزيف، كدمات مفاجئة، شحوب شديد، أو ألم مفاجئ.",
    },
    en: {
      title: "Your child is diagnosed with leukemia",
      problem: "Shocking diagnosis, long chemo course, and an immunocompromised child.",
      steps: [
        "Stay in a specialized pediatric oncology center (St. Jude US, GOSH UK, 57357 Egypt).",
        "Infection precautions: avoid crowds, family vaccinated, constant hand hygiene.",
        "Daily temperature checks — any fever ≥38°C is a doctor call immediately.",
        "Safe food: fully cooked, no raw vegetables, no unpasteurized cheese.",
        "Get psychological support for both child and family — burnout is real.",
        "Connect with support orgs (CCI, local foundations) for financial and emotional aid.",
      ],
      phrases: [
        "'This illness isn't your fault or anyone's. Your body is fighting, and we're with you.'",
        "'Treatment is hard, but it works. Every day brings us closer to the end.'",
        "'Baldness is temporary — your hair will grow back even better.'",
      ],
      whenAsk: "Go to ER immediately if: fever above 38°C, bleeding, sudden bruising, severe pallor, or sudden pain.",
    },
  },
  {
    id: "child-autism",
    ar: {
      title: "طفلك مشخّص باضطراب طيف التوحد",
      problem: "صعوبة في التواصل، روتين صارم، ومخاوف من نظرة المجتمع.",
      steps: [
        "ابدأ التدخل المبكر — كلما أبكر كان أفضل (تحت سن 5).",
        "ابحث عن جلسات ABA أو TEACCH أو DIR Floortime مع أخصائي مرخّص.",
        "ضع روتيناً بصرياً (صور مرتبة) للأنشطة اليومية — يقلل القلق.",
        "اعرف 'الإثارات الحسية' (sensory triggers): صوت عالي، أنوار، ملابس — جنّبها.",
        "علاج نطق + علاج وظيفي حسب الحاجة.",
        "انضم لمجموعات دعم للأهالي — التجارب المشتركة كنز.",
      ],
      phrases: [
        "'إنت مختلف، وده شيء جميل.'",
        "'فاهم إن الضوضاء بتضايقك — هنبعد عنها.'",
        "'مش لازم تشوفني في عيني، أنا فاهمك من كلامك.'",
      ],
      whenAsk: "راجع المختص إذا: انتكاسة مفاجئة في المهارات، إيذاء النفس، أو نوبات عدوانية شديدة.",
    },
    en: {
      title: "Your child is diagnosed with Autism Spectrum Disorder",
      problem: "Communication challenges, rigid routines, and social-stigma fears.",
      steps: [
        "Start early intervention — the sooner the better (under age 5).",
        "Find ABA, TEACCH, or DIR Floortime sessions with a licensed specialist.",
        "Use a visual schedule (picture cards) for daily activities — reduces anxiety.",
        "Identify sensory triggers (loud noise, lights, fabrics) — accommodate them.",
        "Speech therapy + occupational therapy as needed.",
        "Join parent support groups — shared experiences are gold.",
      ],
      phrases: [
        "'You're different, and that's a beautiful thing.'",
        "'I get that the noise bothers you — let's step away.'",
        "'You don't need to look me in the eye, I understand you from your words.'",
      ],
      whenAsk: "See specialist if: sudden regression in skills, self-injury, or severe aggression episodes.",
    },
  },
];
