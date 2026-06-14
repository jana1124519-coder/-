import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  q: z.array(z.string().max(2000)).min(1).max(50),
  source: z.string().min(2).max(5).default("auto"),
  target: z.string().min(2).max(5),
});

// Uses Google Translate's free unofficial endpoint (same one the TTS proxy uses
// upstream). Cached aggressively on the edge.
async function translateOne(q: string, source: string, target: string): Promise<string> {
  if (!q.trim()) return q;
  const u = new URL("https://translate.googleapis.com/translate_a/single");
  u.searchParams.set("client", "gtx");
  u.searchParams.set("sl", source);
  u.searchParams.set("tl", target);
  u.searchParams.set("dt", "t");
  u.searchParams.set("q", q);
  const r = await fetch(u.toString(), {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    },
  });
  if (!r.ok) throw new Error("upstream " + r.status);
  const data = (await r.json()) as unknown;
  // shape: [[ [translated, original, ...], ... ], ...]
  if (Array.isArray(data) && Array.isArray((data as unknown[])[0])) {
    const segs = (data as unknown[][])[0];
    return segs.map((s) => (Array.isArray(s) ? String(s[0] ?? "") : "")).join("");
  }
  return q;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/translate")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Bad JSON", { status: 400, headers: CORS });
        }
        const parsed = Body.safeParse(body);
        if (!parsed.success) {
          return new Response("Invalid", { status: 400, headers: CORS });
        }
        const { q, source, target } = parsed.data;
        if (source === target) {
          return Response.json({ translations: q }, { headers: CORS });
        }
        try {
          const out = await Promise.all(q.map((s) => translateOne(s, source, target).catch(() => s)));
          return new Response(JSON.stringify({ translations: out }), {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, max-age=604800, s-maxage=604800",
              ...CORS,
            },
          });
        } catch {
          return new Response(JSON.stringify({ translations: q }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...CORS },
          });
        }
      },
    },
  },
});
