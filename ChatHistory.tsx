import { useEffect, useState } from "react";
import { History, Loader2, Trash2, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Conv {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
  preview?: string;
}

interface Props {
  section: string;
  currentId: string | null;
  onSelect: (id: string) => void;
  onNew?: () => void;
}

export function ChatHistory({ section, currentId, onSelect }: Props) {
  const { lang } = useI18n();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Conv[]>([]);
  const isAr = lang === "ar";

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data: convs } = await supabase
        .from("chat_conversations")
        .select("id, title, created_at, updated_at")
        .eq("user_id", user.id)
        .eq("section", section)
        .order("updated_at", { ascending: false })
        .limit(30);
      const list: Conv[] = convs ?? [];
      // Fetch first user message as preview for each
      const previews = await Promise.all(
        list.map(async (c) => {
          const { data } = await supabase
            .from("chat_messages")
            .select("content")
            .eq("conversation_id", c.id)
            .eq("role", "user")
            .order("created_at", { ascending: true })
            .limit(1);
          return { ...c, preview: data?.[0]?.content?.slice(0, 80) ?? "" };
        })
      );
      setItems(previews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user, section]);

  const remove = async (id: string) => {
    await supabase.from("chat_conversations").delete().eq("id", id);
    setItems((prev) => prev.filter((c) => c.id !== id));
    toast.success(isAr ? "تم الحذف" : "Deleted");
  };

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs inline-flex items-center gap-1 rounded-lg bg-muted text-foreground px-2 py-1 hover:bg-muted/70 transition"
        title={isAr ? "الشاتات السابقة" : "Past chats"}
      >
        <History className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{isAr ? "السجل" : "History"}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-2" onClick={() => setOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md max-h-[80vh] bg-card rounded-2xl shadow-elevated overflow-hidden flex flex-col"
            dir={isAr ? "rtl" : "ltr"}
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-primary-soft">
              <div className="flex items-center gap-2 font-bold">
                <History className="h-4 w-4 text-primary" />
                <span>{isAr ? "محادثاتك السابقة" : "Your past conversations"}</span>
              </div>
              <button onClick={() => setOpen(false)} className="hover:opacity-70"><X className="h-4 w-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {loading ? (
                <div className="py-10 text-center"><Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" /></div>
              ) : items.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  {isAr ? "لا توجد محادثات سابقة" : "No past conversations"}
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {items.map((c) => (
                    <li key={c.id} className={`group flex items-center gap-2 rounded-xl border px-3 py-2 transition ${currentId === c.id ? "border-primary bg-primary-soft" : "border-border bg-card hover:border-primary/40"}`}>
                      <button
                        className="flex-1 text-start min-w-0"
                        onClick={() => { onSelect(c.id); setOpen(false); }}
                      >
                        <div className="text-sm font-semibold truncate">
                          {c.preview || (isAr ? "محادثة بدون رسائل" : "Empty chat")}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          {new Date(c.updated_at).toLocaleString(isAr ? "ar-EG" : "en-US")}
                        </div>
                      </button>
                      <button
                        onClick={() => remove(c.id)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-emergency hover:bg-emergency/10 opacity-0 group-hover:opacity-100 transition"
                        title={isAr ? "حذف" : "Delete"}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
