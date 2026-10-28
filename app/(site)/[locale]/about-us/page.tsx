import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getTx } from "@/lib/data";
import { asLocale, hrefTo } from "@/lib/i18n";
import { Crumbs, CtaBand, Hero, Section, Sparkle } from "@/components/site/ui";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = asLocale((await params).locale); const tx = await getTx(l); return pageMeta(l, "/about-us", tx("m.about.t"), tx("m.about.d")); }

export default async function About({ params }: P) {
  const l = asLocale((await params).locale); const tx = await getTx(l);
  return (
    <>
      <Hero eyebrow={tx("about.eb")} line1={tx("about.l1")} line2={tx("about.l2")} text={tx("about.d")}><Link className="btn" href={hrefTo(l, "/appointment")}>{tx("nav.book")}</Link></Hero>
      <Crumbs l={l} items={[{ name: tx("nav.about"), path: "/about-us" }]} />
      <Section alt><div className="two"><div className="prose"><h2>{tx("about.h")}</h2><p>{tx("about.p1")}</p><p>{tx("about.p2")}</p></div><div className="pic"><Sparkle size={64} /></div></div></Section>
      <CtaBand l={l} />
    </>
  );
}
