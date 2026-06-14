import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Stethoscope, FileDown, Save, History } from "lucide-react";
import { useI18n, contentLangFor } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionChatbot } from "@/components/SectionChatbot";
import { Button } from "@/components/ui/button";
import { allDiseases as diseases } from "@/lib/diseases";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { T } from "@/components/T";
import { toast } from "sonner";
import jsPDF from "jspdf";

type ResultRow = { id: string; name: string; score: number; severity: string; cat: string };

// jsPDF export — works offline, no popup blocker issues, downloads instantly.
async function exportPdf(lang: string, selected: string[], results: ResultRow[]) {
  const ar = lang === "ar";
  const nonLatin = ["ar", "ja", "zh", "ko", "hi", "ru", "el"].includes(lang);
  try {
    if (nonLatin) {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const dir = ar ? "rtl" : "ltr";
      const el = document.createElement("div");
      el.style.cssText = "width:520pt;padding:24pt;font-family:Cairo,'Noto Sans','Noto Sans JP','Noto Sans SC','Noto Sans KR','Noto Sans Devanagari',system-ui,sans-serif;color:#111;line-height:1.6;font-size:11pt;background:#fff";
      el.setAttribute("dir", dir);
      el.innerHTML = `
        <h1 style="color:#0ea5e9;border-bottom:3px solid #0ea5e9;padding-bottom:6px;margin:0 0 8px;font-size:18pt">${ar ? "تقرير فحص الأعراض" : "Symptom Report"}</h1>
        <div style="font-size:10pt;color:#555;margin-bottom:14pt"><b>${ar ? "التاريخ" : "Date"}:</b> ${new Date().toLocaleString(ar ? "ar-EG" : "en-US")}</div>
        <div><b>${ar ? "الأعراض المختارة" : "Selected symptoms"}:</b></div>
        <div style="margin:6pt 0 12pt">${selected.map((s) => `<span style="display:inline-block;background:#e0f2fe;color:#075985;border-radius:999px;padding:3px 9px;margin:2px;font-size:9pt">${s}</span>`).join("")}</div>
        <h3 style="margin:14pt 0 4pt">${ar ? "الاحتمالات الأولية" : "Possible conditions"}</h3>
        <table style="width:100%;border-collapse:collapse">
          <thead><tr>
            <th style="border:1px solid #ddd;padding:6pt;background:#f1f5f9;text-align:start">${ar ? "الحالة" : "Condition"}</th>
            <th style="border:1px solid #ddd;padding:6pt;background:#f1f5f9;text-align:center">${ar ? "النسبة" : "Match"}</th>
            <th style="border:1px solid #ddd;padding:6pt;background:#f1f5f9;text-align:start">${ar ? "الخطورة" : "Severity"}</th>
            <th style="border:1px solid #ddd;padding:6pt;background:#f1f5f9;text-align:start">${ar ? "التصنيف" : "Category"}</th>
          </tr></thead>
          <tbody>${results.map((r) => `<tr>
            <td style="border:1px solid #ddd;padding:6pt">${r.name}</td>
            <td style="border:1px solid #ddd;padding:6pt;text-align:center">${r.score}%</td>
            <td style="border:1px solid #ddd;padding:6pt">${r.severity}</td>
            <td style="border:1px solid #ddd;padding:6pt">${r.cat}</td>
          </tr>`).join("") || `<tr><td colspan="4" style="border:1px solid #ddd;padding:8pt;text-align:center;color:#999">${ar ? "لا نتائج" : "No results"}</td></tr>`}</tbody>
        </table>
        <p style="margin-top:18pt;font-size:9pt;color:#777;border-top:1px solid #ddd;padding-top:8pt">${ar ? "أداة تعليمية فقط — ليست تشخيصاً طبياً." : "Educational tool only — not a medical diagnosis."}</p>
      `;
      el.style.position = "fixed";
      el.style.left = "-9999px";
      el.style.top = "0";
      document.body.appendChild(el);
      await doc.html(el, {
        callback: (d) => {
          d.save(`symptom-report-${Date.now()}.pdf`);
          if (el.parentNode) document.body.removeChild(el);
        },
        x: 20,
        y: 20,
        width: 555,
        windowWidth: 700,
      });
    } else {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      let y = 40;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(14, 165, 233);
      doc.text("Symptom Report", 40, y);
      y += 6;
      doc.setDrawColor(14, 165, 233);
      doc.setLineWidth(2);
      doc.line(40, y, 555, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text(`Date: ${new Date().toLocaleString("en-US")}`, 40, y);
      y += 18;
      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.text("Selected symptoms:", 40, y);
      y += 14;
      doc.setFont("helvetica", "normal");
      const symLines = doc.splitTextToSize(selected.join(", ") || "—", 510) as string[];
      doc.text(symLines, 40, y);
      y += symLines.length * 12 + 14;
      doc.setFont("helvetica", "bold");
      doc.text("Possible conditions", 40, y);
      y += 14;
      doc.setFont("helvetica", "normal");
      results.forEach((r) => {
        if (y > 760) { doc.addPage(); y = 40; }
        doc.text(`${r.name}  —  ${r.score}%  —  ${r.severity}  —  ${r.cat}`, 40, y);
        y += 14;
      });
      y += 14;
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text("Educational tool only — not a medical diagnosis.", 40, y);
      doc.save(`symptom-report-${Date.now()}.pdf`);
    }
    toast.success(ar ? "تم تصدير PDF" : "PDF exported");
  } catch (e) {
    console.error(e);
    toast.error(ar ? "فشل تصدير PDF" : "PDF export failed");
  }
}

export const Route = createFileRoute("/symptom-checker")({
  head: () => ({ meta: [{ title: "فحص الأعراض — صحّتك" }] }),
  component: SymptomChecker,
});

type SavedRow = { id: string; lang: string; symptoms: string[]; results: ResultRow[]; created_at: string };

function SymptomChecker() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const cl = contentLangFor(lang);
  const allSymptoms = useMemo(() => {
    const set = new Set<string>();
    diseases.forEach((d) => d[cl].symptoms.forEach((s: string) => set.add(s)));
    return Array.from(set).sort();
  }, [cl]);

  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState<ResultRow[] | null>(null);
  const [history, setHistory] = useState<SavedRow[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const visible = filter ? allSymptoms.filter((s) => s.toLowerCase().includes(filter.toLowerCase())) : allSymptoms;
  const toggle = (s: string) => setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const analyze = () => {
    const r = diseases
      .map((d) => {
        const symps = d[cl].symptoms;
        const matched = symps.filter((s: string) => selected.includes(s)).length;
        const score = matched === 0 ? 0 : Math.round((matched / Math.max(symps.length, selected.length)) * 100);
        return { id: d.id, name: d[cl].name, score, severity: d.severity, cat: d.category };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    setResults(r);
  };

  // Offline-first cache
  useEffect(() => {
    const cached = localStorage.getItem("symptom-results-cache");
    if (cached) try { setHistory(JSON.parse(cached)); } catch { /* */ }
  }, []);

  const loadHistory = async () => {
    setShowHistory(true);
    if (!user) return;
    const { data, error } = await supabase
      .from("symptom_results")
      .select("id, lang, symptoms, results, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (!error && data) {
      const rows = data as unknown as SavedRow[];
      setHistory(rows);
      localStorage.setItem("symptom-results-cache", JSON.stringify(rows));
    }
  };

  const saveResults = async () => {
    if (!results || results.length === 0) return;
    if (!user) { toast.error(lang === "ar" ? "سجّل الدخول لحفظ النتائج" : "Sign in to save"); return; }
    const { error } = await supabase.from("symptom_results").insert([{
      user_id: user.id, lang, symptoms: selected, results: JSON.parse(JSON.stringify(results)),
    }]);
    if (error) toast.error(error.message);
    else toast.success(lang === "ar" ? "تم الحفظ" : "Saved");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl w-full px-4 py-10 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.nav.symptoms}</h1>
        <p className="text-muted-foreground mb-6">{t.sections.symptomsDesc}</p>

        <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 mb-6 text-sm text-foreground/90">
          {t.home.disclaimer}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft mb-6">
          <div className="relative mb-4">
            <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-muted-foreground" />
            <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={lang === "ar" ? "ابحث عن عرض..." : "Search symptom..."} className="w-full ps-10 h-11 rounded-lg border border-input bg-background px-3 text-sm" />
          </div>

          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
            {visible.map((s) => {
              const on = selected.includes(s);
              return (
                <button key={s} onClick={() => toggle(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  on ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/40"
                }`}>{s}</button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm text-muted-foreground">{lang === "ar" ? `محدد: ${selected.length}` : `Selected: ${selected.length}`}</div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={loadHistory}><History className="me-2 h-4 w-4" />{lang === "ar" ? "نتائجى السابقة" : "My history"}</Button>
              <Button onClick={analyze} disabled={selected.length === 0} className="bg-gradient-primary">
                <Stethoscope className="me-2 h-4 w-4" /> {lang === "ar" ? "حلّل" : "Analyze"}
              </Button>
            </div>
          </div>
        </div>

        {results && (
          <div className="space-y-3 bg-background p-4 rounded-xl">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="font-bold text-lg">{lang === "ar" ? "الاحتمالات الأولية" : "Possible conditions"}</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={saveResults}><Save className="me-2 h-4 w-4" />{lang === "ar" ? "احفظ" : "Save"}</Button>
                <Button size="sm" variant="outline" onClick={() => void exportPdf(lang, selected, results)}>
                  <FileDown className="me-2 h-4 w-4" /> {lang === "ar" ? "تصدير PDF" : "Export PDF"}
                </Button>
              </div>
            </div>
            <div className="text-xs text-muted-foreground border-b border-border pb-2">
              <div><b>{lang === "ar" ? "التاريخ" : "Date"}:</b> {new Date().toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}</div>
              <div className="mt-1"><b>{lang === "ar" ? "الأعراض المختارة" : "Selected symptoms"}:</b> {selected.join("، ")}</div>
            </div>
            {results.length === 0 ? (
              <p className="text-muted-foreground">{t.common.noResults}</p>
            ) : (
              results.map((r) => (
                <Link key={r.id} to="/diseases/$id" params={{ id: r.id }} className="block rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold"><T from={cl}>{r.name}</T></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{lang === "ar" ? "تطابق" : "Match"}: {r.score}%</div>
                    </div>
                    <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-primary" style={{ width: `${r.score}%` }} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {showHistory && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">{lang === "ar" ? "النتائج المحفوظة" : "Saved results"}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)}>×</Button>
            </div>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">{lang === "ar" ? "لا توجد نتائج محفوظة." : "No saved results yet."}</p>
            ) : history.map((h) => (
              <button key={h.id} onClick={() => { setSelected(h.symptoms); setResults(h.results); setShowHistory(false); }}
                className="w-full text-start block rounded-lg border border-border p-3 mb-2 hover:border-primary/40">
                <div className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</div>
                <div className="text-sm mt-1 line-clamp-1">{h.symptoms.join("، ")}</div>
              </button>
            ))}
          </div>
        )}
      </main>
      <SectionChatbot section="symptoms" title={lang === "ar" ? "اسأل عن أعراضك" : "Ask about your symptoms"} />
      <Footer />
    </div>
  );
}
