import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getTreatments, getTx } from "@/lib/data";
import { asLocale, hrefTo } from "@/lib/i18n";
import { Crumbs, CtaBand, Hero, Section, TreatmentCards } from "@/components/site/ui";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = asLocale((await params).locale); const tx = await getTx(l); return pageMeta(l, "/treatments", tx("m.treat.t"), tx("m.treat.d")); }

export default async function Treatments({ params }: P) {
  const l = asLocale((await params).locale); const [tx, items] = await Promise.all([getTx(l), getTreatments(l)]);
  return (
    <>
      <Hero eyebrow={tx("treat.eb")} line1={tx("treat.l1")} line2={tx("treat.l2")} text={tx("treat.d")}><Link className="btn" href={hrefTo(l, "/appointment")}>{tx("nav.book")}</Link></Hero>
      <Crumbs l={l} items={[{ name: tx("nav.treatments"), path: "/treatments" }]} />
      <Section><TreatmentCards l={l} items={items} /></Section>
      <CtaBand l={l} />
    </>
  );
}
