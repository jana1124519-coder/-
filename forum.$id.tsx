import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Flag, Send, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/forum/$id")({
  component: ForumThread,
});

function ForumThread() {
  const { id } = useParams({ from: "/forum/$id" });
  const { lang } = useI18n();
  const ar = lang === "ar";
  const { user, isAdmin } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [aliases, setAliases] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  const load = async () => {
    setLoading(true);
    const { data: p } = await supabase.from("forum_posts").select("*").eq("id", id).maybeSingle();
    setPost(p);
    const { data: cs } = await supabase.from("forum_comments").select("*").eq("post_id", id).eq("hidden", false).order("created_at");
    setComments(cs ?? []);
    const ids = Array.from(new Set<string>([...(cs ?? []).map((c) => c.user_id), p?.user_id].filter((x): x is string => !!x)));
    if (ids.length) {
      const { data: aliasRows } = await supabase.from("forum_aliases").select("*").in("user_id", ids);
      const map: Record<string, string> = {};
      (aliasRows ?? []).forEach((a: any) => { map[a.user_id] = a.alias; });
      setAliases(map);
    }
    setLoading(false);
  };

  useEffect(() => { void load(); }, [id]);

  const reply = async () => {
    if (!user) { toast.error(ar ? "سجّل دخول" : "Sign in"); return; }
    if (!text.trim()) return;
    const { error } = await supabase.from("forum_comments").insert({ post_id: id, user_id: user.id, body: text.trim() });
    if (error) { toast.error(error.message); return; }
    setText(""); void load();
  };

  const report = async (target: "post" | "comment", targetId: string) => {
    if (!user) return;
    const reason = prompt(ar ? "سبب الإبلاغ؟" : "Reason?");
    if (!reason) return;
    await supabase.from("forum_reports").insert({ reporter_id: user.id, post_id: target === "post" ? targetId : null, comment_id: target === "comment" ? targetId : null, reason });
    toast.success(ar ? "تم الإبلاغ، شكراً" : "Reported, thanks");
  };

  const hideContent = async (table: "forum_posts" | "forum_comments", rowId: string) => {
    await supabase.from(table).update({ hidden: true }).eq("id", rowId);
    toast.success(ar ? "تم الإخفاء" : "Hidden");
    void load();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center">{ar ? "غير موجود" : "Not found"}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-10 flex-1">
        <Link to="/forum" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="me-1 h-4 w-4" /> {ar ? "رجوع" : "Back"}
        </Link>

        <article className="rounded-2xl border border-border bg-card p-5 shadow-soft mb-4">
          <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
            <span>{aliases[post.user_id] ?? (ar ? "مجهول" : "Anonymous")}</span>
            <span>•</span>
            <span>{new Date(post.created_at).toLocaleString()}</span>
          </div>
          <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
          <p className="whitespace-pre-wrap text-foreground/90">{post.body}</p>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="ghost" onClick={() => report("post", post.id)}><Flag className="me-1 h-3 w-3" /> {ar ? "بلّغ" : "Report"}</Button>
            {isAdmin && <Button size="sm" variant="outline" onClick={() => hideContent("forum_posts", post.id)}>{ar ? "إخفاء" : "Hide"}</Button>}
          </div>
        </article>

        <h2 className="font-bold mb-2">{ar ? "الردود" : "Replies"} ({comments.length})</h2>
        <div className="space-y-2 mb-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-xl border border-border bg-card p-3">
              <div className="text-xs text-muted-foreground mb-1">{aliases[c.user_id] ?? (ar ? "مجهول" : "Anonymous")} • {new Date(c.created_at).toLocaleString()}</div>
              <p className="text-sm whitespace-pre-wrap">{c.body}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => report("comment", c.id)} className="text-[11px] text-muted-foreground hover:text-emergency inline-flex items-center"><Flag className="me-1 h-3 w-3" />{ar ? "بلّغ" : "Report"}</button>
                {isAdmin && <button onClick={() => hideContent("forum_comments", c.id)} className="text-[11px] text-muted-foreground hover:text-foreground">{ar ? "إخفاء" : "Hide"}</button>}
              </div>
            </div>
          ))}
        </div>

        {user ? (
          <div className="rounded-2xl border border-border bg-card p-3">
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={ar ? "اكتب رداً..." : "Write a reply..."} className="w-full min-h-20 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <Button onClick={reply} className="mt-2 bg-gradient-primary"><Send className="me-2 h-4 w-4" />{ar ? "إرسال" : "Send"}</Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground"><Link to="/auth" className="text-primary underline">{ar ? "سجّل دخول" : "Sign in"}</Link> {ar ? "للرد" : "to reply"}</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
