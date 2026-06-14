// Multi-language synonym map for voice navigation.
// Maps any spoken keyword (any language) to a target route path.

type NavEntry = { path: string; keywords: string[] };

export const NAV_SYNONYMS: NavEntry[] = [
  { path: "/", keywords: ["home","main","start","الرئيسية","رئيسية","البداية","البيت","accueil","inicio","casa","ホーム","主页","home","होम","ana sayfa","главная","αρχική"] },
  { path: "/diseases", keywords: ["diseases","disease","conditions","الأمراض","امراض","مرض","maladies","malattie","enfermedades","krankheit","病気","疾病","질병","रोग","hastalık","болезни","ασθένειες"] },
  { path: "/emergency", keywords: ["emergency","urgent","911","الطوارئ","طوارئ","urgence","emergencia","emergenza","notfall","緊急","紧急","응급","आपातकाल","acil","скорая","επείγον"] },
  { path: "/emergency-plan", keywords: ["plan","plan emergency","خطة","خطة طوارئ","خطه","plan urgence","plan emergencia","piano emergenza"] },
  { path: "/first-aid", keywords: ["first aid","aid","الإسعاف","اسعاف","الإسعافات","premiers","primo soccorso","primeros auxilios","erste hilfe","応急","急救","응급처치","प्राथमिक","ilk yardım","первая помощь","πρώτες βοήθειες"] },
  { path: "/mental-health", keywords: ["mental","psychology","الصحة النفسية","نفسي","نفسية","santé mentale","mental","ruh","психология","ψυχική"] },
  { path: "/parents", keywords: ["parents","children","الأهالي","الاباء","اطفال","أطفال","parents","padres","genitori","eltern","親","父母","부모","माता","aile","родители","γονείς"] },
  { path: "/symptom-checker", keywords: ["symptoms","symptom","checker","الأعراض","عرض","اعراض","فحص","symptômes","síntomas","sintomi","symptome","症状","증상","लक्षण","belirti","симптомы","συμπτώματα"] },
  { path: "/doctors", keywords: ["doctors","doctor","physicians","الأطباء","طبيب","دكتور","médecin","médico","medico","arzt","医者","医生","의사","डॉक्टर","doktor","врач","γιατρός"] },
  { path: "/sign-language", keywords: ["sign","sign language","لغة الإشارة","اشارة","إشارة","langue des signes","lengua de señas","手話","수화","sembra","знаки","νοηματική"] },
  { path: "/reminders", keywords: ["reminders","reminder","المنبه","تذكير","منبه","rappel","recordatorio","promemoria","erinnerung","リマインダー","提醒","알림","रिमाइंडर","hatırlatma","напоминание","υπενθύμιση"] },
  { path: "/assistant", keywords: ["assistant","ai","المساعد","مساعد","assistant","asistente","assistente","アシスタント","助手","어시스턴트","सहायक","asistan","помощник","βοηθός"] },
  { path: "/therapists", keywords: ["therapists","therapy","معالج","معالجون","علاج نفسي","therapeute","terapista","therapist","療法","治疗","치료사","चिकित्सक","terapist","терапевт","θεραπευτής"] },
  { path: "/research", keywords: ["research","البحوث","بحث","ابحاث","أبحاث","recherche","investigación","ricerca","forschung","研究","연구","अनुसंधान","araştırma","исследование","έρευνα"] },
  { path: "/calculators", keywords: ["calculator","calculators","حاسبة","الحاسبات","calculatrice","calculadora","calcolatrice","rechner","計算機","计算器","계산기","कैलकुलेटर","hesaplayıcı","калькулятор","υπολογιστής"] },
  { path: "/medications", keywords: ["medications","medicine","medicines","drugs","الأدوية","دواء","أدوية","علاج","médicament","medicamento","medicina","medikament","薬","药","약","दवा","ilaç","лекарство","φάρμακο"] },
  { path: "/maps", keywords: ["maps","map","hospital","pharmacy","خرائط","خريطة","مستشفى","صيدلية","carte","mapa","mappa","karte","地図","地图","지도","नक्शा","harita","карта","χάρτης"] },
  { path: "/psych-tests", keywords: ["test","tests","اختبار","اختبارات","نفسية","tests","prueba","test","テスト","测试","테스트","परीक्षा","test","тест","τεστ"] },
  { path: "/voice-chat", keywords: ["voice","chat","صوت","شات صوتي","voice","voz","ボイス","语音","음성","आवाज","ses","голос","φωνή"] },
  { path: "/forum", keywords: ["forum","community","مجتمع","المجتمع","forum","comunidad","comunità","フォーラム","论坛","포럼","समुदाय","topluluk","сообщество","κοινότητα"] },
];

export type VoiceAction = "stop" | "read" | "back" | "menu" | "replay" | null;

export function detectAction(text: string): VoiceAction {
  const t = text.toLowerCase().trim();
  if (/(stop|اوقف|أوقف|توقف|stopp|arrêt|para|fermare|やめ|停止|정지|बंद|dur|стоп|σταμάτα)/.test(t)) return "stop";
  if (/(read|اقرأ|اقرا|قراءة|lire|leer|leggere|lese|読む|读|읽|पढ़|oku|читай|διάβασε)/.test(t)) return "read";
  if (/(back|ارجع|رجوع|retour|atrás|indietro|zurück|戻|返回|뒤로|वापस|geri|назад|πίσω)/.test(t)) return "back";
  if (/(menu|قائمة|menu|menú|menü|メニュー|菜单|메뉴|मेनू|menü|меню|μενού)/.test(t)) return "menu";
  if (/(replay|repeat|أعد|اعد|répéte|repite|ripeti|繰り返|重复|반복|दोहर|tekrar|повтори|επανέλαβε)/.test(t)) return "replay";
  return null;
}

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchRoute(text: string): string | null {
  const t = norm(text);
  if (!t) return null;
  let best: { path: string; score: number } | null = null;
  for (const entry of NAV_SYNONYMS) {
    for (const kw of entry.keywords) {
      const k = norm(kw);
      if (!k) continue;
      let score = 0;
      if (t === k) score = 100;
      else if (t.includes(k) || k.includes(t)) score = k.length;
      else {
        // word overlap
        const tw = new Set(t.split(" "));
        const overlap = k.split(" ").filter((w) => tw.has(w)).length;
        if (overlap > 0) score = overlap * 2;
      }
      if (score > 0 && (!best || score > best.score)) best = { path: entry.path, score };
    }
  }
  return best && best.score >= 3 ? best.path : null;
}
