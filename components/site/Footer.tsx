import Link from "next/link";
import { getSettings, getTreatments, getTx } from "@/lib/data";
import { hrefTo, type Locale } from "@/lib/i18n";

export async function Footer({ l }: { l: Locale }) {
  const [tx, s, tr] = await Promise.all([getTx(l), getSettings(l), getTreatments(l)]);
  const h = (p: string) => hrefTo(l, p);
  return (
    <footer><div className="w"><div className="g">
      <div><h3>{tx("brand")}</h3><p>{tx("ft.about")}</p>{s.facebook && <a href={s.facebook} rel="noopener noreferrer">Facebook</a>}{s.instagram && <a href={s.instagram} rel="noopener noreferrer">Instagram</a>}</div>
      <div><h3>{tx("ft.quick")}</h3><Link href={h("/")}>{tx("nav.home")}</Link><Link href={h("/about-us")}>{tx("nav.about")}</Link><Link href={h("/treatments")}>{tx("nav.treatments")}</Link><Link href={h("/packages")}>{tx("nav.packages")}</Link><Link href={h("/yoga")}>{tx("nav.yoga")}</Link><Link href={h("/blog")}>{tx("nav.blog")}</Link><Link href={h("/contact-us")}>{tx("nav.contact")}</Link></div>
      <div><h3>{tx("ft.treat")}</h3>{tr.slice(0, 4).map((t) => <Link key={t.slug} href={h(`/treatments/${t.slug}`)}>{t.name}</Link>)}<Link href={h("/treatments")}>{tx("c.all")}</Link></div>
      <address><h3>{tx("ft.contact")}</h3><p>P.O. Box {s.poBox}, {s.address} ({s.landmark})</p><p>{tx("ct.land")}: <a href={`tel:${s.phone}`} dir="ltr">{s.phone}</a></p><p>{tx("ct.mob")}: <a href={`tel:${s.mobile}`} dir="ltr">{s.mobile}</a></p><p><a href={`mailto:${s.email}`}>{s.email}</a></p></address>
    </div><div className="cp">© {new Date().getFullYear()} {tx("brand")}. {tx("ft.disc")}</div></div></footer>
  );
}
