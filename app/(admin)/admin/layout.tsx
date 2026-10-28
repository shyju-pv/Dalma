import type { Metadata } from "next";
import Link from "next/link";
import { serverClient } from "@/lib/supabase/server";
import { signOut } from "./actions";
import "./admin.css";

export const metadata: Metadata = { title: "Admin | Dalma Ayurvedic", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await serverClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html lang="en"><body>
      <div className="top"><b>Dalma admin</b>
        {user && <><Link href="/admin">Dashboard</Link><Link href="/admin/slides">Hero slides</Link><Link href="/admin/blog">Blog</Link><Link href="/admin/treatments">Treatments</Link><Link href="/admin/packages">Packages</Link><Link href="/admin/journey">Journey</Link><Link href="/admin/testimonials">Testimonials</Link><Link href="/admin/faqs">FAQs</Link><Link href="/admin/text">Page text</Link><Link href="/admin/settings">Contact</Link><Link href="/en" target="_blank">View site</Link>
          <form action={signOut}><button className="btn o" type="submit">Sign out</button></form></>}
      </div>
      <div className="wrap">{children}</div>
    </body></html>
  );
}
