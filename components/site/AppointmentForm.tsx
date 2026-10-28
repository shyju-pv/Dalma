"use client";
import { useState } from "react";
import { waLink } from "@/lib/wa";

type Labels = Record<"name" | "phone" | "svc" | "date" | "notes" | "send" | "note", string>;

export function AppointmentForm({ whatsapp, hi, tail, options, labels }: { whatsapp: string; hi: string; tail: string; options: string[]; labels: Labels }) {
  const [v, setV] = useState({ name: "", phone: "", service: options[0] ?? "", date: "", notes: "" });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `${labels.name}: ${v.name || "-"}\n${labels.phone}: ${v.phone || "-"}\n${labels.svc}: ${v.service}\n${labels.date}: ${v.date || "-"}\n${labels.notes}: ${v.notes || "-"}`;
    window.open(waLink(whatsapp, text, hi, tail), "_blank", "noopener");
  };
  return (
    <form className="card" style={{ maxWidth: 600, margin: "0 auto" }} onSubmit={submit}>
      <div className="fld"><label htmlFor="n">{labels.name}</label><input id="n" autoComplete="name" value={v.name} onChange={set("name")} /></div>
      <div className="fld"><label htmlFor="p">{labels.phone}</label><input id="p" type="tel" dir="ltr" autoComplete="tel" value={v.phone} onChange={set("phone")} /></div>
      <div className="fld"><label htmlFor="s">{labels.svc}</label><select id="s" value={v.service} onChange={set("service")}>{options.map((o) => <option key={o}>{o}</option>)}</select></div>
      <div className="fld"><label htmlFor="d">{labels.date}</label><input id="d" type="date" value={v.date} onChange={set("date")} /></div>
      <div className="fld"><label htmlFor="m">{labels.notes}</label><textarea id="m" rows={3} value={v.notes} onChange={set("notes")} /></div>
      <button className="btn" type="submit">{labels.send}</button>
      <p style={{ fontSize: 14, color: "var(--muted)", margin: "14px 0 0" }}>{labels.note}</p>
    </form>
  );
}
