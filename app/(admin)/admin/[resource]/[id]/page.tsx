import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { resources, type Field } from "@/lib/admin-config";
import { deleteRow, saveRow } from "../../actions";

type Row = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
type Props = { params: Promise<{ resource: string; id: string }>; searchParams: Promise<{ error?: string }> };

function Input({ f, col, row, rtl }: { f: Field; col: string; row: Row; rtl?: boolean }) {
  const v = row[col];
  const dir = rtl ? "rtl" : undefined;
  if (f.type === "textarea") return <textarea name={col} dir={dir} defaultValue={v ?? ""} rows={f.key === "body" ? 14 : 4} />;
  if (f.type === "lines") return <textarea name={col} dir={dir} defaultValue={(v ?? []).join("\n")} rows={4} />;
  if (f.type === "number") return <input type="number" name={col} defaultValue={v ?? ""} />;
  if (f.type === "date") return <input type="date" name={col} defaultValue={v ?? new Date().toISOString().slice(0, 10)} />;
  return <input type="text" name={col} dir={dir} defaultValue={v ?? ""} required={f.required && (!f.bi || col.endsWith("_en"))} />;
}

export default async function Edit({ params, searchParams }: Props) {
  const { resource, id } = await params; const { error } = await searchParams;
  const cfg = resources[resource]; if (!cfg) notFound();
  const { supabase } = await requireAdmin();
  let row: Row = { published: true };
  if (id !== "new") {
    const { data } = await supabase.from(cfg.table).select("*").eq("id", cfg.single ? 1 : id).maybeSingle();
    if (data) row = data; else if (!cfg.single) notFound();
  }
  const save = saveRow.bind(null, resource, id);
  const del = deleteRow.bind(null, resource, id);
  return (
    <>
      <p><Link href={cfg.single ? "/admin" : `/admin/${resource}`}>← Back</Link></p>
      <h1>{id === "new" ? "Add new" : "Edit"}: {cfg.title}</h1><p className="sub">Fill English and Arabic. If Arabic is empty, the English text is shown on the Arabic site.</p>
      {error && <div className="msg err">Could not save: {error === "image" ? "images must be under 5 MB." : error === "upload" ? "the image upload failed." : error}</div>}
      <form className="f" action={save}>
        {cfg.fields.map((f) => (
          <div className="fld" key={f.key}>
            <label>{f.label}</label>
            {f.bi ? <div className="bi"><div><small>English</small><Input f={f} col={`${f.key}_en`} row={row} /></div><div><small>العربية</small><Input f={f} col={`${f.key}_ar`} row={row} rtl /></div></div>
              : f.type === "bool" ? <label><input type="checkbox" name={f.key} defaultChecked={row[f.key] === undefined ? f.key === "published" : !!row[f.key]} /> Visible on the website</label>
              : f.type === "image" ? <div>{row[f.key] && <><img className="thumb" src={row[f.key]} alt="" /><input type="hidden" name={`${f.key}__current`} value={row[f.key]} /><label><input type="checkbox" name={`${f.key}__remove`} /> Remove photo</label></>}<input type="file" name={`${f.key}__file`} accept="image/*" /><p className="hint">JPG, PNG or WebP, up to 5 MB. Landscape photos work best.</p></div>
              : <Input f={f} col={f.key} row={row} />}
            {f.hint && <p className="hint">{f.hint}</p>}
          </div>
        ))}
        <div className="row"><button className="btn" type="submit">Save</button><Link className="btn o" href={`/admin/${resource}`}>Cancel</Link></div>
      </form>
      {id !== "new" && !cfg.single && <form action={del} style={{ marginTop: 24 }}><button className="btn d" type="submit">Delete this item</button></form>}
    </>
  );
}
