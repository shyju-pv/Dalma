import { requireAdmin } from "@/lib/admin";
import { dict } from "@/lib/i18n";
import { saveText } from "../actions";

const GROUPS: Record<string, string> = { brand: "Brand", nav: "Menu", c: "Buttons", cta: "Call-to-action band", home: "Home page", cond: "Conditions list", faq: "FAQ", about: "About page", treat: "Treatments page", td: "Treatment detail", pk: "Packages page", yoga: "Yoga page", blog: "Blog page", art: "Article page", ct: "Contact page", bk: "Booking page", ft: "Footer", wa: "WhatsApp messages", nf: "Not found page", m: "Search engine titles and descriptions" };

export default async function TextEditor({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("content").select("*");
  const over = new Map((data ?? []).map((r: { key: string; en: string | null; ar: string | null }) => [r.key, r]));
  const groups: Record<string, string[]> = {};
  Object.keys(dict.en).forEach((k) => { const g = k.split(".")[0]; (groups[g] ??= []).push(k); });
  return (
    <>
      <h1>Page text</h1>
      <p className="sub">Change any wording on the website. Leave a box empty to use the built-in text (shown as the grey placeholder). Use {"{name}"}, {"{phone}"} and {"{address}"} as they appear.</p>
      {saved && <div className="msg">Saved. The website updates within seconds.</div>}
      <form action={saveText}>
        {Object.entries(groups).map(([g, keys]) => (
          <details key={g}><summary>{GROUPS[g] ?? g} ({keys.length})</summary>
            {keys.map((k) => (
              <div className="tx" key={k}><code>{k}</code>
                <div className="bi" style={{ marginTop: 6 }}>
                  <div><small>English</small><textarea name={`en__${k}`} rows={2} placeholder={dict.en[k]} defaultValue={over.get(k)?.en ?? ""} /></div>
                  <div><small>العربية</small><textarea name={`ar__${k}`} dir="rtl" rows={2} placeholder={dict.ar[k]} defaultValue={over.get(k)?.ar ?? ""} /></div>
                </div></div>
            ))}
          </details>
        ))}
        <div className="sticky"><button className="btn" type="submit">Save all text</button></div>
      </form>
    </>
  );
}
