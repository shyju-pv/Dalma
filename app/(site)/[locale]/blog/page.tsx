import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getPosts, getTx } from "@/lib/data";
import { asLocale } from "@/lib/i18n";
import { BlogCards, Crumbs, CtaBand, Hero, Section } from "@/components/site/ui";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = asLocale((await params).locale); const tx = await getTx(l); return pageMeta(l, "/blog", tx("m.blog.t"), tx("m.blog.d")); }

export default async function Blog({ params }: P) {
  const l = asLocale((await params).locale); const [tx, posts] = await Promise.all([getTx(l), getPosts(l)]);
  return (
    <>
      <Hero eyebrow={tx("blog.eb")} line1={tx("blog.l1")} line2={tx("blog.l2")} text={tx("blog.d")} />
      <Crumbs l={l} items={[{ name: tx("nav.blog"), path: "/blog" }]} />
      <Section><BlogCards l={l} posts={posts} /></Section>
      <CtaBand l={l} />
    </>
  );
}
