"use server";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { serverClient } from "@/lib/supabase/server";
import { columns, resources, slugify } from "@/lib/admin-config";
import { dict } from "@/lib/i18n";

const refresh = () => { revalidateTag("db"); revalidatePath("/en", "layout"); revalidatePath("/ar", "layout"); };

export async function signIn(formData: FormData) {
  const supabase = await serverClient();
  const { error } = await supabase.auth.signInWithPassword({ email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") });
  if (error) redirect("/admin/login?error=invalid");
  redirect("/admin");
}

export async function signOut() {
  const supabase = await serverClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveRow(resource: string, id: string, formData: FormData) {
  const cfg = resources[resource];
  if (!cfg) throw new Error("Unknown resource");
  const { supabase } = await requireAdmin();
  const row: Record<string, unknown> = {};

  for (const f of cfg.fields) {
    for (const col of columns(f)) {
      const raw = formData.get(col);
      if (f.type === "bool") row[col] = formData.get(col) === "on";
      else if (f.type === "number") row[col] = raw === "" || raw == null ? null : parseInt(String(raw), 10);
      else if (f.type === "lines") row[col] = String(raw ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
      else if (f.type === "date") { if (raw) row[col] = String(raw); }
      else if (f.type === "image") {
        const file = formData.get(`${col}__file`);
        if (file instanceof File && file.size > 0) {
          if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) redirect(`/admin/${resource}/${id}?error=image`);
          const path = `${resource}/${crypto.randomUUID()}.${(file.name.split(".").pop() || "jpg").toLowerCase()}`;
          const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
          if (error) redirect(`/admin/${resource}/${id}?error=upload`);
          row[col] = supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
        } else row[col] = formData.get(`${col}__remove`) === "on" ? null : String(formData.get(`${col}__current`) || "") || null;
      } else if (f.type === "slug") row[col] = slugify(String(raw || formData.get(cfg.slugFrom ?? "") || ""));
      else row[col] = String(raw ?? "").trim() || null;
    }
  }
  if (cfg.single) row.id = 1;
  const q = id === "new" ? supabase.from(cfg.table).insert(row) : cfg.single ? supabase.from(cfg.table).upsert(row) : supabase.from(cfg.table).update(row).eq("id", id);
  const { error } = await q;
  if (error) redirect(`/admin/${resource}/${id}?error=${encodeURIComponent(error.message.slice(0, 120))}`);
  refresh();
  redirect(`/admin/${resource}?saved=1`);
}

export async function deleteRow(resource: string, id: string) {
  const cfg = resources[resource];
  if (!cfg || cfg.single) throw new Error("Not allowed");
  const { supabase } = await requireAdmin();
  await supabase.from(cfg.table).delete().eq("id", id);
  refresh();
  redirect(`/admin/${resource}?deleted=1`);
}

export async function saveText(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { data: existing } = await supabase.from("content").select("key");
  const had = new Set((existing ?? []).map((r: { key: string }) => r.key));
  const upserts: { key: string; en: string | null; ar: string | null }[] = [];
  const removes: string[] = [];
  for (const key of Object.keys(dict.en)) {
    const en = String(formData.get(`en__${key}`) ?? "").trim();
    const ar = String(formData.get(`ar__${key}`) ?? "").trim();
    if (en || ar) upserts.push({ key, en: en || null, ar: ar || null });
    else if (had.has(key)) removes.push(key);
  }
  if (upserts.length) await supabase.from("content").upsert(upserts);
  if (removes.length) await supabase.from("content").delete().in("key", removes);
  refresh();
  redirect("/admin/text?saved=1");
}
