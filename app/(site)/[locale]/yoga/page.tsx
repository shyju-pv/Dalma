import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getTx, getWa } from "@/lib/data";
import { asLocale } from "@/lib/i18n";
import { Crumbs, CtaBand, Hero } from "@/components/site/ui";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = asLocale((await params).locale); const tx = await getTx(l); return pageMeta(l, "/yoga", tx("m.yoga.t"), tx("m.yoga.d")); }

export default async function Yoga({ params }: P) {
  const l = asLocale((await params).locale); const [tx, wa] = await Promise.all([getTx(l), getWa(l)]);
  return (
    <>
      <Hero eyebrow={tx("yoga.eb")} line1={tx("yoga.l1")} line2={tx("yoga.l2")} text={tx("yoga.d")}><a className="btn" href={wa(tx("yoga.wa"))} rel="noopener noreferrer">{tx("yoga.btn")}</a></Hero>
      <Crumbs l={l} items={[{ name: tx("nav.yoga"), path: "/yoga" }]} />
      <CtaBand l={l} />
    </>
  );
}
