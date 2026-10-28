import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { resources } from "@/lib/admin-config";

type Props = { params: Promise<{ resource: string }>; searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function List({ params, searchParams }: Props) {
  const { resource } = await params; const sp = await searchParams;
  const cfg = resources[resource]; if (!cfg) notFound();
  if (cfg.single) redirect(`/admin/${resource}/1${sp.saved ? "?saved=1" : ""}`);
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from(cfg.table).select("*").order(cfg.order, { ascending: cfg.order === "sort" });
  return (
    <>
      <h1>{cfg.title}</h1><p className="sub">{data?.length ?? 0} items</p>
      {sp.saved && <div className="msg">Saved. The website updates within seconds.</div>}{sp.deleted && <div className="msg">Deleted.</div>}
      <p><Link className="btn" href={`/admin/${resource}/new`}>+ Add new</Link></p>
      <table><thead><tr><th>Title (English)</th><th>Arabic</th><th>Status</th><th /></tr></thead><tbody>
        {(data ?? []).map((r: Record<string, any>) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
          <tr key={r.id}><td>{r[cfg.listKey]}</td><td dir="rtl">{cfg.listKey.endsWith("_en") ? r[cfg.listKey.replace("_en", "_ar")] || "—" : "—"}</td><td><span className={`tag${r.published === false ? " draft" : ""}`}>{r.published === false ? "Draft" : "Published"}</span></td><td><Link className="btn o" href={`/admin/${resource}/${r.id}`}>Edit</Link></td></tr>
        ))}
      </tbody></table>
    </>
  );
}
