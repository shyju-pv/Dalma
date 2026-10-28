import { redirect } from "next/navigation";
import { serverClient } from "./supabase/server";

// Every admin page and action calls this. Row Level Security in Supabase is the real lock; this gives friendly redirects.
export async function requireAdmin() {
  const supabase = await serverClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!data) redirect("/admin/login?error=forbidden");
  return { supabase, user };
}
