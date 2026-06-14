import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, Plus, Flag, MessageSquare, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/forum")({
  head: () => ({ meta: [
    { title: "مجتمع مرضى مجهول — صحّتك" },
    { name: "description", content: "منتدى مجهول الهوية للمرضى لمشاركة التجارب بدعم وإشراف." },
  ]}),
  component: ForumPage,
});

interface Post { id: string; title: string; body: string; category: string; created_at: string; user_id: string; }
interface Alias { user_id: string; alias: string }

const CATEGORIES = [
  { id: "general", ar: "عام", en: "General" },
  { id: "mental", ar: "نفسي", en: "Mental health" },
  { id: "chronic", ar: "أمراض مزمنة", en: "Chronic illness" },
  { id: "parents", ar: "أهالي", en: "Parents" },
  { id: "support", ar: "دعم", en: "Support" },
];

function ForumPage() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [aliases, setAliases] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [cat, setCat] = useState("general");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("forum_posts").select("*").eq("hidden", false).order("created_at", { ascending: false }).limit(100);
    setPosts(data ?? []);
    const ids = Array.from(new Set((data ?? []).map((p) => p.user_id)));
    if (ids.length) {
      const { data: aliasRows } = await supabase.from("forum_aliases").select("*").in("user_id", ids);
      const map: Record<string, string> = {};
      (aliasRows ?? []).forEach((a: Alias) => { map[a.user_id] = a.alias; });
      setAliases(map);
    }
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const ensureAlias = async () => {
    if (!user) return null;
    const { data: existing } = await supabase.from("forum_aliases").select("alias").eq("user_id", user.id).maybeSingle();
    if (existing?.alias) return existing.alias;
    const animals = ["نجمة", "قمر", "نسيم", "Falcon", "Lotus", "Cedar", "Oasis", "Sahara", "Atlas"];
    const alias = animals[Math.floor(Math.random() * animals.length)] + "-" + Math.floor(1000 + Math.random() * 9000);
    const { error } = await supabase.from("forum_aliases").insert({ user_id: user.id, alias });
    if (error) return null;
    return alias;
  };

  const submit = async () => {
    if (!user) { toast.error(ar ? "سجّل دخول أولاً" : "Sign in first"); return; }
    if (!title.trim() || !body.trim()) return;
    await ensureAlias();
    const { error } = await supabase.from("forum_posts").insert({ user_id: user.id, title: title.trim(), body: body.trim(), category: cat });
    if (error) { toast.error(error.message); return; }
    toast.success(ar ? "تم النشر" : "Posted");
    setTitle(""); setBody(""); setShowForm(false);
    void load();
  };

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center"><Users className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{ar ? "مجتمع المرضى" : "Patients Community"}</h1>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">{ar ? "منتدى مجهول الهوية. كن لطيفاً، لا تشارك معلومات شخصية حساسة." : "Anonymous forum. Be kind. Don't share sensitive personal info."}</p>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap gap-1">
            <CatPill id="all" active={filter === "all"} onClick={() => setFilter("all")} label={ar ? "الكل" : "All"} />
            {CATEGORIES.map((c) => <CatPill key={c.id} id={c.id} active={filter === c.id} onClick={() => setFilter(c.id)} label={ar ? c.ar : c.en} />)}
          </div>
          {user ? (
            <Button onClick={() => setShowForm((s) => !s)} className="bg-gradient-primary"><Plus className="me-2 h-4 w-4" /> {ar ? "اكتب" : "Post"}</Button>
          ) : (
            <Button onClick={() => navigate({ to: "/auth" })} variant="outline">{ar ? "سجّل للنشر" : "Sign in to post"}</Button>
          )}
        </div>

        {showForm && (
          <div className="rounded-2xl border border-border bg-card p-4 mb-4 space-y-3">
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{ar ? c.ar : c.en}</option>)}
            </select>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={ar ? "العنوان" : "Title"} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={ar ? "اكتب تجربتك..." : "Share your experience..."} className="w-full min-h-28 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <Button onClick={submit} className="bg-gradient-primary">{ar ? "نشر" : "Post"}</Button>
          </div>
        )}

        {loading ? <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin" /></div> : (
          <div className="space-y-3">
            {filtered.map((p) => {
              const catObj = CATEGORIES.find((c) => c.id === p.category);
              return (
                <Link key={p.id} to="/forum/$id" params={{ id: p.id }} className="block rounded-2xl border border-border bg-card p-4 hover:border-primary/50">
                  <div className="flex items-center gap-2 mb-1.5 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-primary-soft text-primary font-medium">{catObj ? (ar ? catObj.ar : catObj.en) : p.category}</span>
                    <span>•</span>
                    <span>{aliases[p.user_id] ?? (ar ? "مجهول" : "Anonymous")}</span>
                    <span>•</span>
                    <span>{new Date(p.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold mb-1">{p.title}</h3>
                  <p className="text-sm text-foreground/80 line-clamp-2">{p.body}</p>
                </Link>
              );
            })}
            {filtered.length === 0 && <p className="text-center text-muted-foreground py-6">{ar ? "لا توجد منشورات بعد" : "No posts yet"}</p>}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function CatPill({ id, active, onClick, label }: { id: string; active: boolean; onClick: () => void; label: string }) {
  return <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>{label}</button>;
}
