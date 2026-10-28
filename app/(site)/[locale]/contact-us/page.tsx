import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getSettings, getTx } from "@/lib/data";
import { asLocale } from "@/lib/i18n";
import { Crumbs, Hero, Section } from "@/components/site/ui";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = asLocale((await params).locale); const tx = await getTx(l); return pageMeta(l, "/contact-us", tx("m.ct.t"), tx("m.ct.d")); }

export default async function Contact({ params }: P) {
  const l = asLocale((await params).locale); const [tx, s] = await Promise.all([getTx(l), getSettings(l)]);
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Dalma Ayurvedic Al Zahra Square Sharjah")}`;
  return (
    <>
      <Hero eyebrow={tx("ct.eb")} line1={tx("ct.l1")} line2={tx("ct.l2")} text={tx("ct.d")}><a className="btn" href={`tel:${s.phone}`}>{tx("ct.call")}</a><a className="btn o" href={maps} rel="noopener noreferrer">{tx("ct.map")}</a></Hero>
      <Crumbs l={l} items={[{ name: tx("nav.contact"), path: "/contact-us" }]} />
      <Section><address className="card" style={{ maxWidth: 640, margin: "0 auto" }}><dl>
        <dt>{tx("ct.addr")}</dt><dd>P.O. Box {s.poBox}, {s.address}. {s.landmark}.</dd>
        <dt>{tx("ct.land")}</dt><dd><a href={`tel:${s.phone}`} dir="ltr">{s.phone}</a></dd>
        <dt>{tx("ct.mob")}</dt><dd><a href={`tel:${s.mobile}`} dir="ltr">{s.mobile}</a></dd>
        <dt>{tx("ct.mail")}</dt><dd><a href={`mailto:${s.email}`}>{s.email}</a></dd></dl></address></Section>
    </>
  );
}
