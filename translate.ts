// Client-side translation helper with localStorage caching.
// Translates any string from a source lang (default ar) to the active UI lang
// using the /api/public/translate proxy. Results are cached so offline reuse
// works after first view.

const CACHE_KEY = "translate-cache-v1";
const MEM: Record<string, string> = {};
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) Object.assign(MEM, JSON.parse(raw) as Record<string, string>);
  } catch {
    /* ignore */
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(MEM));
  } catch {
    /* quota */
  }
}

const key = (text: string, source: string, target: string) => `${source}>${target}:${text}`;

export function getCached(text: string, source: string, target: string): string | null {
  load();
  return MEM[key(text, source, target)] ?? null;
}

const inflight = new Map<string, Promise<string>>();
let pending: { text: string; source: string; target: string; resolve: (s: string) => void }[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

async function flush() {
  timer = null;
  const batch = pending;
  pending = [];
  if (batch.length === 0) return;
  // Group by source>target
  const groups = new Map<string, typeof batch>();
  for (const it of batch) {
    const k = `${it.source}>${it.target}`;
    const arr = groups.get(k) ?? [];
    arr.push(it);
    groups.set(k, arr);
  }
  for (const [k, items] of groups) {
    const [source, target] = k.split(">");
    try {
      const res = await fetch("/api/public/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: items.map((i) => i.text), source, target }),
      });
      const json = (await res.json()) as { translations?: string[] };
      const out = json.translations ?? items.map((i) => i.text);
      items.forEach((it, i) => {
        const t = out[i] ?? it.text;
        MEM[key(it.text, it.source, it.target)] = t;
        it.resolve(t);
      });
    } catch {
      items.forEach((it) => it.resolve(it.text));
    }
  }
  persist();
}

export function translateText(text: string, target: string, source = "auto"): Promise<string> {
  load();
  if (!text || !text.trim()) return Promise.resolve(text);
  if (source === target) return Promise.resolve(text);
  const k = key(text, source, target);
  if (MEM[k]) return Promise.resolve(MEM[k]);
  if (inflight.has(k)) return inflight.get(k)!;
  const p = new Promise<string>((resolve) => {
    pending.push({ text, source, target, resolve });
    if (!timer) timer = setTimeout(flush, 40);
  }).finally(() => inflight.delete(k));
  inflight.set(k, p);
  return p;
}
