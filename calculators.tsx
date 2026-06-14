import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, Baby, Activity, Heart, Calendar } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/calculators")({
  head: () => ({ meta: [
    { title: "حاسبات طبية — صحّتك" },
    { name: "description", content: "حاسبات طبية: BMI، جرعات الأطفال، تاريخ الإباضة، فترة الحمل." },
  ]}),
  component: CalcPage,
});

function CalcPage() {
  const { lang } = useI18n();
  const ar = lang === "ar";
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-4xl w-full px-4 py-10 flex-1 space-y-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center"><Calculator className="h-6 w-6" /></div>
          <h1 className="text-3xl md:text-4xl font-bold">{ar ? "حاسبات طبية" : "Medical Calculators"}</h1>
        </div>

        <BMICalc ar={ar} />
        <PediatricDose ar={ar} />
        <Ovulation ar={ar} />
        <Pregnancy ar={ar} />
      </main>
      <Footer />
    </div>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="flex items-center gap-2 text-xl font-bold mb-4">{icon}{title}</h2>
      {children}
    </section>
  );
}

function NumInput({ label, value, onChange, unit }: { label: string; value: string; onChange: (v: string) => void; unit?: string }) {
  return (
    <label className="block">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2 mt-1">
        <input type="number" value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm" />
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
    </label>
  );
}

function BMICalc({ ar }: { ar: boolean }) {
  const [w, setW] = useState(""); const [h, setH] = useState("");
  const wn = parseFloat(w); const hn = parseFloat(h) / 100;
  const bmi = wn > 0 && hn > 0 ? wn / (hn * hn) : 0;
  const cat = bmi === 0 ? "" : bmi < 18.5 ? (ar ? "نقص وزن" : "Underweight") : bmi < 25 ? (ar ? "طبيعي" : "Normal") : bmi < 30 ? (ar ? "زيادة وزن" : "Overweight") : (ar ? "سمنة" : "Obese");
  return (
    <Card icon={<Activity className="h-5 w-5 text-primary" />} title={ar ? "مؤشر كتلة الجسم BMI" : "Body Mass Index (BMI)"}>
      <div className="grid grid-cols-2 gap-3">
        <NumInput label={ar ? "الوزن" : "Weight"} value={w} onChange={setW} unit="kg" />
        <NumInput label={ar ? "الطول" : "Height"} value={h} onChange={setH} unit="cm" />
      </div>
      {bmi > 0 && (
        <div className="mt-4 rounded-xl bg-primary-soft p-4">
          <div className="text-2xl font-bold text-primary">{bmi.toFixed(1)}</div>
          <div className="text-sm">{cat}</div>
        </div>
      )}
    </Card>
  );
}

function PediatricDose({ ar }: { ar: boolean }) {
  const [w, setW] = useState(""); const [dose, setDose] = useState("15");
  const [freq, setFreq] = useState("4");
  const wn = parseFloat(w); const dn = parseFloat(dose); const fn = parseFloat(freq);
  const single = wn > 0 && dn > 0 ? wn * dn : 0;
  const daily = single * (fn || 1);
  return (
    <Card icon={<Baby className="h-5 w-5 text-primary" />} title={ar ? "جرعة دواء للأطفال" : "Pediatric Dose"}>
      <p className="text-sm text-muted-foreground mb-3">
        {ar ? "حسب وزن الطفل (مثال باراسيتامول 10–15 مغ/كغ كل 4–6 ساعات)." : "By child weight (e.g., paracetamol 10–15 mg/kg every 4–6 h)."}
      </p>
      <div className="grid grid-cols-3 gap-3">
        <NumInput label={ar ? "وزن الطفل" : "Child weight"} value={w} onChange={setW} unit="kg" />
        <NumInput label={ar ? "مغ/كغ للجرعة" : "mg/kg per dose"} value={dose} onChange={setDose} unit="mg/kg" />
        <NumInput label={ar ? "عدد الجرعات/يوم" : "Doses/day"} value={freq} onChange={setFreq} />
      </div>
      {single > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-primary-soft p-4">
            <div className="text-xs text-muted-foreground">{ar ? "الجرعة الواحدة" : "Single dose"}</div>
            <div className="text-2xl font-bold text-primary">{single.toFixed(0)} mg</div>
          </div>
          <div className="rounded-xl bg-primary-soft p-4">
            <div className="text-xs text-muted-foreground">{ar ? "الجرعة اليومية" : "Daily total"}</div>
            <div className="text-2xl font-bold text-primary">{daily.toFixed(0)} mg</div>
          </div>
        </div>
      )}
      <p className="text-xs text-warning-foreground mt-3">
        {ar ? "تنبيه: تجنّب تجاوز 60 مغ/كغ يومياً للباراسيتامول. راجع الطبيب/الصيدلي قبل الإعطاء." : "Warning: do not exceed 60 mg/kg/day for paracetamol. Confirm with doctor/pharmacist."}
      </p>
    </Card>
  );
}

function Ovulation({ ar }: { ar: boolean }) {
  const [last, setLast] = useState(""); const [cycle, setCycle] = useState("28");
  let ovDate = ""; let fertileFrom = ""; let fertileTo = "";
  if (last) {
    const d = new Date(last);
    const c = parseInt(cycle) || 28;
    const ov = new Date(d); ov.setDate(d.getDate() + (c - 14));
    const ff = new Date(ov); ff.setDate(ov.getDate() - 5);
    const ft = new Date(ov); ft.setDate(ov.getDate() + 1);
    ovDate = ov.toLocaleDateString(); fertileFrom = ff.toLocaleDateString(); fertileTo = ft.toLocaleDateString();
  }
  return (
    <Card icon={<Heart className="h-5 w-5 text-primary" />} title={ar ? "تاريخ الإباضة" : "Ovulation Date"}>
      <div className="grid grid-cols-2 gap-3">
        <label className="block"><span className="text-sm text-muted-foreground">{ar ? "أول يوم في آخر دورة" : "First day of last period"}</span>
          <input type="date" value={last} onChange={(e) => setLast(e.target.value)} className="w-full mt-1 h-10 rounded-lg border border-input bg-background px-3 text-sm" />
        </label>
        <NumInput label={ar ? "طول الدورة" : "Cycle length"} value={cycle} onChange={setCycle} unit={ar ? "يوم" : "days"} />
      </div>
      {ovDate && (
        <div className="mt-4 space-y-2">
          <div className="rounded-xl bg-accent/10 border border-accent/30 p-3">
            <div className="text-xs text-muted-foreground">{ar ? "تاريخ الإباضة المتوقع" : "Estimated ovulation"}</div>
            <div className="font-bold">{ovDate}</div>
          </div>
          <div className="rounded-xl bg-primary-soft p-3">
            <div className="text-xs text-muted-foreground">{ar ? "نافذة الخصوبة" : "Fertile window"}</div>
            <div className="font-bold">{fertileFrom} → {fertileTo}</div>
          </div>
        </div>
      )}
    </Card>
  );
}

function Pregnancy({ ar }: { ar: boolean }) {
  const [last, setLast] = useState("");
  let due = ""; let weeks = 0;
  if (last) {
    const d = new Date(last);
    const dd = new Date(d); dd.setDate(d.getDate() + 280);
    due = dd.toLocaleDateString();
    weeks = Math.floor((Date.now() - d.getTime()) / (7 * 86400000));
  }
  return (
    <Card icon={<Calendar className="h-5 w-5 text-primary" />} title={ar ? "حاسبة الحمل" : "Pregnancy Calculator"}>
      <label className="block">
        <span className="text-sm text-muted-foreground">{ar ? "أول يوم في آخر دورة شهرية" : "First day of last menstrual period"}</span>
        <input type="date" value={last} onChange={(e) => setLast(e.target.value)} className="w-full mt-1 h-10 rounded-lg border border-input bg-background px-3 text-sm" />
      </label>
      {due && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-primary-soft p-4">
            <div className="text-xs text-muted-foreground">{ar ? "أسبوع الحمل" : "Gestational age"}</div>
            <div className="text-2xl font-bold text-primary">{weeks} {ar ? "أسبوع" : "weeks"}</div>
          </div>
          <div className="rounded-xl bg-accent/10 border border-accent/30 p-4">
            <div className="text-xs text-muted-foreground">{ar ? "موعد الولادة المتوقع" : "Estimated due date"}</div>
            <div className="text-xl font-bold">{due}</div>
          </div>
        </div>
      )}
    </Card>
  );
}
