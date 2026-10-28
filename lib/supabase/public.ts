import { createClient } from "@supabase/supabase-js";

// Cookie-free client for public pages. Reads are cached for 60s and cleared when an admin saves (tag "db").
export const publicClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://localhost", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "anon", {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 60, tags: ["db"] } }) },
  });
