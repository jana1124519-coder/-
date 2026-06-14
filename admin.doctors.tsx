import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, Edit, Shield, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/doctors")({
  head: () => ({ meta: [{ title: "إدارة الأطباء — Admin" }] }),
  component: AdminDoctorsPage,
});

interface Doctor {
  id: string;
  full_name: string;
  specialty: string;
  country: string;
  city: string | null;
  phone: string | null;
  email: string | null;
  clinic_name: string | null;
  languages: string[];
  notes: string | null;
  consent_obtained: boolean;
  verified: boolean;
  created_at: string;
}

const emptyDoctor = {
  full_name: "",
  specialty: "",
  country: "",
  city: "",
  phone: "",
  email: "",
  clinic_name: "",
  languages: "",
  notes: "",
  consent_obtained: false,
  verified: false,
};

function AdminDoctorsPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [busy, setBusy] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyDoctor);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin]);

  const load = async () => {
    setBusy(true);
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setDoctors((data ?? []) as Doctor[]);
    setBusy(false);
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyDoctor);
    setDialogOpen(true);
  };

  const openEdit = (d: Doctor) => {
    setEditingId(d.id);
    setForm({
      full_name: d.full_name,
      specialty: d.specialty,
      country: d.country,
      city: d.city ?? "",
      phone: d.phone ?? "",
      email: d.email ?? "",
      clinic_name: d.clinic_name ?? "",
      languages: d.languages.join(", "),
      notes: d.notes ?? "",
      consent_obtained: d.consent_obtained,
      verified: d.verified,
    });
    setDialogOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const payload = {
      full_name: form.full_name.trim(),
      specialty: form.specialty.trim(),
      country: form.country.trim(),
      city: form.city.trim() || null,
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      clinic_name: form.clinic_name.trim() || null,
      languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
      notes: form.notes.trim() || null,
      consent_obtained: form.consent_obtained,
      verified: form.verified,
      added_by: user?.id ?? null,
    };
    const { error } = editingId
      ? await supabase.from("doctors").update(payload).eq("id", editingId)
      : await supabase.from("doctors").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success(editingId ? "تم التعديل" : "تمت الإضافة");
      setDialogOpen(false);
      void load();
    }
    setBusy(false);
  };

  const remove = async (id: string) => {
    if (!confirm("متأكد من الحذف؟")) return;
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("تم الحذف"); void load(); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h1 className="text-xl font-bold mb-2">صلاحية مرفوضة</h1>
            <p className="text-sm text-muted-foreground mb-4">
              هذه الصفحة للمسؤولين فقط. لتفعيل صلاحية الأدمن، شغّل في قاعدة البيانات:
            </p>
            <code className="block bg-muted p-3 rounded-lg text-xs text-start mb-4 break-all">
              INSERT INTO public.user_roles (user_id, role) VALUES ('{user.id}', 'admin');
            </code>
            <Link to="/" className="text-primary underline text-sm">رجوع للرئيسية</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl w-full px-4 py-10 flex-1">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowRight className="h-4 w-4 rtl:rotate-180" /> الرئيسية
        </Link>
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-7 w-7 text-primary" /> إدارة الأطباء
            </h1>
            <p className="text-sm text-muted-foreground mt-1">أضف فقط الأطباء الذين أخذت إذنهم الصريح بنشر بياناتهم.</p>
          </div>
          <Button onClick={openNew} className="bg-gradient-primary gap-2"><Plus className="h-4 w-4" /> طبيب جديد</Button>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {busy && doctors.length === 0 ? (
            <div className="p-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>
          ) : doctors.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">لم تُضِف أي طبيب بعد. اضغط "طبيب جديد".</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase">
                  <tr>
                    <th className="px-3 py-3 text-start">الاسم</th>
                    <th className="px-3 py-3 text-start">التخصص</th>
                    <th className="px-3 py-3 text-start">الدولة</th>
                    <th className="px-3 py-3 text-start">الهاتف</th>
                    <th className="px-3 py-3 text-start">إذن</th>
                    <th className="px-3 py-3 text-start">معتمد</th>
                    <th className="px-3 py-3 text-end">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((d) => (
                    <tr key={d.id} className="border-t border-border hover:bg-muted/30">
                      <td className="px-3 py-3 font-medium">{d.full_name}</td>
                      <td className="px-3 py-3"><Badge variant="outline">{d.specialty}</Badge></td>
                      <td className="px-3 py-3">{d.country}{d.city ? ` — ${d.city}` : ""}</td>
                      <td className="px-3 py-3 font-mono text-xs">{d.phone ?? "—"}</td>
                      <td className="px-3 py-3">{d.consent_obtained ? <CheckCircle2 className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-destructive" />}</td>
                      <td className="px-3 py-3">{d.verified ? <CheckCircle2 className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-muted-foreground" />}</td>
                      <td className="px-3 py-3 text-end">
                        <div className="inline-flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => openEdit(d)}><Edit className="h-3.5 w-3.5" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => remove(d.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingId ? "تعديل طبيب" : "إضافة طبيب"}</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>الاسم الكامل *</Label><Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required /></div>
              <div><Label>التخصص *</Label><Input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} placeholder="مثال: cardiology" required /></div>
              <div><Label>الدولة *</Label><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required /></div>
              <div><Label>المدينة</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
              <div><Label>الهاتف</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} dir="ltr" /></div>
              <div><Label>الإيميل</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} dir="ltr" /></div>
              <div className="col-span-2"><Label>اسم العيادة/المستشفى</Label><Input value={form.clinic_name} onChange={(e) => setForm({ ...form, clinic_name: e.target.value })} /></div>
              <div className="col-span-2"><Label>اللغات (مفصولة بفاصلة)</Label><Input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} placeholder="ar, en, fr" /></div>
              <div className="col-span-2"><Label>ملاحظات</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} /></div>
            </div>
            <div className="flex flex-col gap-2 p-3 rounded-lg bg-warning/10 border border-warning/30">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.consent_obtained} onChange={(e) => setForm({ ...form, consent_obtained: e.target.checked })} className="h-4 w-4" />
                <span>أؤكد أنني حصلت على إذن صريح من الطبيب لنشر بياناته</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.verified} onChange={(e) => setForm({ ...form, verified: e.target.checked })} className="h-4 w-4" />
                <span>تم التحقق من البيانات وجاهز للنشر العام</span>
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>إلغاء</Button>
              <Button type="submit" disabled={busy} className="bg-gradient-primary">{busy && <Loader2 className="h-4 w-4 animate-spin me-2" />}حفظ</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
