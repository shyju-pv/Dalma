import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getTx } from "@/lib/data";
import { asLocale, hrefTo } from "@/lib/i18n";
import { Crumbs, CtaBand, Hero, PackageCards, Section } from "@/components/site/ui";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = asLocale((await params).locale); const tx = await getTx(l); return pageMeta(l, "/packages", tx("m.pk.t"), tx("m.pk.d")); }

export default async function Packages({ params }: P) {
  const l = asLocale((await params).locale); const tx = await getTx(l);
  return (
    <>
      <Hero eyebrow={tx("pk.eb")} line1={tx("pk.l1")} line2={tx("pk.l2")} text={tx("pk.d")}><Link className="btn" href={hrefTo(l, "/appointment")}>{tx("nav.book")}</Link></Hero>
      <Crumbs l={l} items={[{ name: tx("nav.packages"), path: "/packages" }]} />
      <Section><PackageCards l={l} /><p style={{ textAlign: "center", marginTop: 28, color: "var(--muted)" }}>{tx("pk.note")}</p></Section>
      <CtaBand l={l} />
    </>
  );
}
