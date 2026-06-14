export interface FirstAidStep {
  ar: string;
  en: string;
}

export interface FirstAidGuide {
  id: string;
  ar: { title: string; intro: string };
  en: { title: string; intro: string };
  steps: FirstAidStep[];
  videoQuery: string;
}

export const firstAidGuides: FirstAidGuide[] = [
  {
    id: "cpr",
    ar: { title: "الإنعاش القلبي الرئوي (CPR)", intro: "استخدم عند توقف التنفس والنبض." },
    en: { title: "CPR", intro: "Use when breathing and pulse have stopped." },
    videoQuery: "CPR training adult",
    steps: [
      { ar: "تأكد من سلامة المكان واستجابة المصاب.", en: "Ensure scene safety and check responsiveness." },
      { ar: "اتصل بالإسعاف فوراً أو اطلب من شخص آخر.", en: "Call emergency services immediately." },
      { ar: "ضع كف يدك على وسط الصدر، الأخرى فوقها.", en: "Place one hand on center of chest, the other on top." },
      { ar: "اضغط 30 مرة بعمق 5-6 سم وبسرعة 100-120/دقيقة.", en: "30 compressions, 5-6 cm deep, at 100-120/min." },
      { ar: "اعطِ نفسين إنقاذيين (إن كنت مدرباً).", en: "Give 2 rescue breaths (if trained)." },
      { ar: "كرر دورات 30:2 حتى وصول الإسعاف.", en: "Repeat 30:2 cycles until help arrives." },
    ],
  },
  {
    id: "heimlich",
    ar: { title: "مناورة هايمليك (الاختناق)", intro: "للمصاب الواعي بانسداد كامل في المجرى التنفسي." },
    en: { title: "Heimlich Maneuver", intro: "For a conscious person with complete airway obstruction." },
    videoQuery: "Heimlich maneuver adult",
    steps: [
      { ar: "اسأله: 'هل تختنق؟'. إن لم يستطع الكلام: ابدأ.", en: "Ask 'Are you choking?'. If they can't speak: start." },
      { ar: "قف خلفه وانحنِ قليلاً للأمام.", en: "Stand behind, lean them slightly forward." },
      { ar: "5 ضربات بكعب اليد بين لوحي الكتف.", en: "5 back blows between shoulder blades." },
      { ar: "ضع قبضة فوق السرة وامسكها بيدك الأخرى.", en: "Place a fist above navel, grasp with other hand." },
      { ar: "اضغط للداخل وللأعلى 5 مرات بقوة.", en: "5 quick inward and upward thrusts." },
      { ar: "كرر حتى يخرج الجسم أو يفقد الوعي → ابدأ CPR.", en: "Repeat until expelled or unconscious → start CPR." },
    ],
  },
  {
    id: "bleeding",
    ar: { title: "إيقاف نزيف حاد", intro: "للنزيف الشديد من جرح خارجي." },
    en: { title: "Stopping Severe Bleeding", intro: "For severe external bleeding." },
    videoQuery: "stop severe bleeding first aid",
    steps: [
      { ar: "ارتدِ قفازات إن أمكن.", en: "Wear gloves if available." },
      { ar: "اضغط مباشرة بقماش نظيف أو شاش معقم.", en: "Apply direct pressure with clean cloth/sterile gauze." },
      { ar: "ارفع المنطقة المصابة فوق مستوى القلب.", en: "Elevate the wound above heart level." },
      { ar: "لا ترفع الضمادة الأولى، أضف فوقها إن تشبعت.", en: "Don't lift the first dressing; add layers if soaked." },
      { ar: "في حال الفشل: استخدم عاصبة فوق الجرح.", en: "If failing: apply a tourniquet above the wound." },
      { ar: "اتصل بالإسعاف فوراً.", en: "Call emergency services immediately." },
    ],
  },
  {
    id: "burns",
    ar: { title: "علاج الحروق", intro: "للحروق السطحية والمتوسطة." },
    en: { title: "Burn Treatment", intro: "For superficial and partial-thickness burns." },
    videoQuery: "burn first aid treatment",
    steps: [
      { ar: "أبعد المصاب عن مصدر الحرارة.", en: "Move the person from the heat source." },
      { ar: "اغمر الحرق بماء جاري بارد (ليس ثلج) لمدة 20 دقيقة.", en: "Cool burn under running cool water (not ice) for 20 min." },
      { ar: "انزع الملابس والمجوهرات قبل التورم.", en: "Remove jewelry/clothing before swelling." },
      { ar: "غطِ بضمادة معقمة فضفاضة أو قماش نظيف.", en: "Cover with loose sterile dressing or clean cloth." },
      { ar: "لا تفقع الفقاعات ولا تضع زيوت.", en: "Don't pop blisters; don't apply oils." },
      { ar: "اطلب طبيب للحروق العميقة أو الواسعة.", en: "Seek medical care for deep or extensive burns." },
    ],
  },
  {
    id: "seizure",
    ar: { title: "نوبة الصرع (التشنجات)", intro: "كيف تساعد شخصاً يعاني من تشنجات." },
    en: { title: "Epileptic Seizure", intro: "How to help someone having a seizure." },
    videoQuery: "seizure first aid",
    steps: [
      { ar: "ابقَ هادئاً واضبط الوقت.", en: "Stay calm and time the seizure." },
      { ar: "أبعد الأشياء الحادة والخطرة.", en: "Clear sharp/dangerous objects." },
      { ar: "ضع شيئاً ناعماً تحت الرأس.", en: "Cushion the head." },
      { ar: "أدره على جنبه (recovery position).", en: "Place in recovery position on side." },
      { ar: "لا تضع أي شيء في فمه ولا تحاول إيقاف الحركات.", en: "Do NOT put anything in the mouth or restrain movements." },
      { ar: "اتصل بالإسعاف إذا تجاوزت 5 دقائق أو تكررت.", en: "Call emergency if >5 min or recurrent." },
    ],
  },
  {
    id: "fracture",
    ar: { title: "تثبيت الكسور", intro: "للكسور المشتبه بها قبل وصول الإسعاف." },
    en: { title: "Fracture Immobilization", intro: "For suspected fractures before EMS arrives." },
    videoQuery: "fracture splint first aid",
    steps: [
      { ar: "لا تحرك المصاب إن أمكن، خاصة في إصابات الرقبة/الظهر.", en: "Don't move the person, especially in spine/neck injuries." },
      { ar: "ثبّت العضو في وضعه الحالي بجبيرة مؤقتة.", en: "Immobilize the limb in its current position with a splint." },
      { ar: "ضع كمادات باردة لتقليل التورم.", en: "Apply cold packs to reduce swelling." },
      { ar: "لا تحاول تعديل العظم.", en: "Do NOT try to realign the bone." },
      { ar: "اتصل بالإسعاف.", en: "Call emergency services." },
    ],
  },
  {
    id: "anaphylaxis",
    ar: { title: "صدمة الحساسية", intro: "تفاعل تحسسي مهدد للحياة." },
    en: { title: "Anaphylaxis", intro: "Life-threatening allergic reaction." },
    videoQuery: "epipen anaphylaxis first aid",
    steps: [
      { ar: "إن وُجد EpiPen، استخدمه فوراً في الفخذ الخارجي.", en: "If EpiPen available, inject into outer thigh immediately." },
      { ar: "اتصل بالإسعاف.", en: "Call emergency services." },
      { ar: "أبقِ المصاب مستلقياً مع رفع الساقين.", en: "Lay flat with legs raised." },
      { ar: "إذا فقد الوعي: ضعه على جنبه.", en: "If unconscious: recovery position." },
      { ar: "كرر حقنة EpiPen بعد 5-15 دقيقة إن لم يتحسن.", en: "Repeat EpiPen after 5-15 min if no improvement." },
    ],
  },
];

export const getFirstAid = (id: string) => firstAidGuides.find((g) => g.id === id);
