import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const QuerySchema = z.object({
  q: z.string().trim().min(1).max(500),
  lang: z
    .string()
    .trim()
    .min(2)
    .max(10)
    .regex(/^[a-z]{2,3}(?:-[A-Za-z]{2,4})?$/),
});

export const Route = createFileRoute("/api/public/tts")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const parsed = QuerySchema.safeParse({
          q: url.searchParams.get("q"),
          lang: url.searchParams.get("lang"),
        });

        if (!parsed.success) {
          return new Response("Invalid query", { status: 400 });
        }

        const upstream = new URL("https://translate.google.com/translate_tts");
        upstream.searchParams.set("ie", "UTF-8");
        upstream.searchParams.set("client", "tw-ob");
        upstream.searchParams.set("tl", parsed.data.lang.toLowerCase());
        upstream.searchParams.set("q", parsed.data.q);

        const res = await fetch(upstream.toString(), {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            Accept: "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
          },
        });

        if (!res.ok || !res.body) {
          return new Response("TTS unavailable", { status: 502 });
        }

        return new Response(res.body, {
          status: 200,
          headers: {
            "Content-Type": res.headers.get("content-type") || "audio/mpeg",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      },
    },
  },
});