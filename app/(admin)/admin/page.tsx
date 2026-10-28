import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { resources } from "@/lib/admin-config";

export default async function Dashboard() {
  const { supabase } = await requireAdmin();
  const counts = await Promise.all(Object.values(resources).filter((r) => !r.single).map(async (r) => [r.table, (await supabase.from(r.table).select("*", { count: "exact", head: true })).count ?? 0] as const));
  const n = Object.fromEntries(counts);
  return (
    <>
      <h1>Dashboard</h1><p className="sub">Edits appear on the website within seconds, in English and Arabic.</p>
      <div className="grid">
        <Link className="card" href="/admin/blog"><h3>Blog posts</h3><p>{n.blog_posts} posts. Write, edit, publish.</p></Link>
        <Link className="card" href="/admin/treatments"><h3>Treatments</h3><p>{n.treatments} treatments and photos.</p></Link>
        <Link className="card" href="/admin/packages"><h3>Packages</h3><p>{n.packages} packages.</p></Link>
        <Link className="card" href="/admin/text"><h3>Page text</h3><p>Headlines and paragraphs on every page.</p></Link>
        <Link className="card" href="/admin/settings"><h3>Contact settings</h3><p>Phone, WhatsApp, email, address.</p></Link>
      </div>
    </>
  );
}
