import { createServerFn } from "@tanstack/react-start";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const SPECIALTIES = [
  "general_practitioner", "internal_medicine", "cardiology", "neurology",
  "pulmonology", "gastroenterology", "endocrinology", "nephrology",
  "rheumatology", "hematology", "oncology", "infectious_disease",
  "dermatology", "ophthalmology", "ent", "orthopedics", "urology",
  "gynecology", "obstetrics", "pediatrics", "psychiatry", "psychology",
  "emergency_medicine", "general_surgery", "neurosurgery", "plastic_surgery",
  "dentistry", "allergy_immunology", "geriatrics", "physical_medicine",
];

const SYSTEM_BASE = (lang: string) => `You are "Sehetak" — a multilingual AI medical assistant.

CORE RULES (always):
1. You are NOT a substitute for a licensed physician. Mention this briefly when relevant.
2. For ANY emergency (severe chest pain, breathing difficulty, loss of consciousness, heavy bleeding, stroke signs, anaphylaxis, severe trauma, suicidal intent), say FIRST and clearly: tell the user to call their local emergency number / ambulance immediately.
3. Never give a definitive diagnosis. Use "may be", "could indicate", "possible".
4. Don't prescribe medications with dosages except very common safe OTC ones (e.g., paracetamol).
5. Ask clarifying questions when info is insufficient.
6. Reply primarily in the user's UI language code: "${lang}". If the user writes in a different language, reply in their writing language.
7. NEVER invent doctor names, phone numbers, or addresses. If asked, say you cannot share private contacts and instead suggest the SPECIALTY they need plus official channels (their country's medical council or licensed booking platforms like Vezeeta, Doctolib, Zocdoc, Practo, Halodoc).
8. When a condition is clear enough, ALWAYS recommend a medical SPECIALTY using one of these exact tokens at the END of your reply on its own line: \`SPECIALTY: <token>\` where <token> is one of: ${SPECIALTIES.join(", ")}. Use \`SPECIALTY: none\` if no referral needed yet.
9. Keep answers organized, concise, and warm.`;

const PSYCH_RULES = (lang: string) => `You are "Sehetak" — a multilingual empathetic mental-health support assistant trained in screening psychological conditions.

CRITICAL RULES:
1. You are NOT a substitute for a licensed therapist or psychiatrist, but you CAN suggest the most likely psychological condition the user may be experiencing based on their description (DSM-5 / ICD-11 oriented).
2. After enough info, structure your reply like this:
   • التعاطف / Empathy line.
   • "اللي بتوصفه ممكن يكون مؤشّر على ..." — list 1-3 most likely conditions (e.g., Generalized Anxiety, Major Depression, PTSD, OCD, Bipolar, BPD, ADHD, Panic Disorder, Social Anxiety) with a one-line reason for each.
   • Brief next-step plan (CBT, exposure, journaling, sleep hygiene, breathing).
   • Clear note: this is NOT a final diagnosis — only a licensed psychiatrist confirms.
3. If the user mentions suicidal thoughts, self-harm, or imminent danger, respond IMMEDIATELY: express concern, tell them to call their crisis line right now (e.g., 988 US, 116123 UK, 08008880700 Egypt, 920033360 Saudi, 110 Jordan) or go to the nearest ER. Reassure them they are not alone.
4. Use CBT, ACT, and mindfulness techniques: gentle reframing, 5-4-3-2-1 grounding, slow breathing.
5. Reply primarily in UI language code: "${lang}". Mirror the user's writing language.
6. NEVER invent therapist names/phones. Direct the user to the in-app /therapists page and to crisis hotlines.
7. End every structured response with \`SPECIALTY: psychiatry\` or \`SPECIALTY: psychology\` (or \`SPECIALTY: none\` if not yet appropriate).
8. Keep replies warm and end with one gentle follow-up question.`;

const GENERAL_RULES = (lang: string) => `You are "Sehetak General Assistant" — an open-ended helpful AI like ChatGPT, but with a health-aware mindset.

RULES:
1. Answer ANY question the user asks: general knowledge, writing help, coding, math, advice, brainstorming, language, study, etc.
2. Be friendly, concise, and structured (use bullets/headings when useful).
3. If the question is medical or mental, give helpful information AND remind them the dedicated /chat (medical) or /psych-chat (mental) pages have stronger safety guardrails.
4. For any emergency hint, advise calling local emergency services first.
5. Never invent personal contacts, phone numbers, or private medical advice with dosages.
6. LANGUAGE & DIALECT MIRRORING — CRITICAL:
   • UI language is "${lang}". Default reply in this language.
   • If the user writes in a different language, switch and reply in THEIR language.
   • If the user writes Arabic, detect the dialect (Egyptian, Gulf/Khaleeji, Levantine/Shami, Maghrebi, Iraqi, Sudanese, or MSA Fusha) from vocabulary and grammar, and reply in the SAME dialect with matching vocabulary and tone. Example: user writes "ايه اخبارك يا صاحبي" → reply Egyptian. User writes "شلونك" → reply Gulf. User writes "كيفك" → reply Levantine.
   • Mirror formality (formal vs casual) of the user.
7. End with \`SPECIALTY: none\` (this assistant rarely refers).`;

export const chatWithAI = createServerFn({ method: "POST" })
  .inputValidator(
    (input: { messages: ChatMessage[]; mode: "medical" | "psych" | "general"; lang: "ar" | "en"; uiLang?: string }) => {
      if (!Array.isArray(input.messages) || input.messages.length === 0) throw new Error("messages required");
      if (input.messages.length > 50) throw new Error("Too many messages");
      for (const m of input.messages) {
        if (typeof m.content !== "string" || m.content.length > 4000) throw new Error("Invalid message");
      }
      return input;
    }
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI service not configured");

    const uiLang = (data.uiLang ?? data.lang).slice(0, 5);
    const systemPrompt =
      data.mode === "psych" ? PSYCH_RULES(uiLang)
      : data.mode === "general" ? GENERAL_RULES(uiLang)
      : SYSTEM_BASE(uiLang);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...data.messages],
      }),
    });

    if (response.status === 429) throw new Error("RATE_LIMIT");
    if (response.status === 402) throw new Error("PAYMENT_REQUIRED");
    if (!response.ok) {
      const text = await response.text();
      console.error("AI error", response.status, text);
      throw new Error("AI request failed");
    }

    const json = await response.json();
    const raw: string = json.choices?.[0]?.message?.content ?? "";

    // Extract specialty token
    let specialty: string | null = null;
    let reply = raw;
    const m = raw.match(/SPECIALTY:\s*([a-z_]+)/i);
    if (m) {
      const tok = m[1].toLowerCase();
      specialty = tok === "none" ? null : tok;
      reply = raw.replace(/SPECIALTY:\s*[a-z_]+/i, "").trim();
    }

    return { reply, specialty };
  });

// AI translation of arbitrary medical text into target language.
// Used to translate disease detail content on-demand for non-AR/EN UI users.
export const translateMedical = createServerFn({ method: "POST" })
  .inputValidator((input: { text: string; targetLang: string; sourceLang?: string }) => {
    if (typeof input.text !== "string" || input.text.length === 0) throw new Error("text required");
    if (input.text.length > 8000) throw new Error("text too long");
    if (typeof input.targetLang !== "string" || input.targetLang.length > 5) throw new Error("invalid targetLang");
    return input;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI service not configured");

    const sys = `You are a professional medical translator. Translate the user's medical text into language code "${data.targetLang}" with clinical accuracy. Preserve medical terminology where appropriate. Keep the same structure (lines, bullets). Output ONLY the translated text, no commentary.`;
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: data.text },
        ],
      }),
    });
    if (response.status === 429) throw new Error("RATE_LIMIT");
    if (response.status === 402) throw new Error("PAYMENT_REQUIRED");
    if (!response.ok) throw new Error("translate_failed");
    const j = await response.json();
    return { translated: (j.choices?.[0]?.message?.content ?? "").trim() };
  });
