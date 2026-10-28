import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getPost, getPosts, getSlugs, getTx, SITE_URL } from "@/lib/data";
import { asLocale, hrefTo, locales } from "@/lib/i18n";
import { BlogCards, Cover, Crumbs, CtaBand, Heading, Meta, Section } from "@/components/site/ui";
import { JsonLd } from "@/components/site/JsonLd";

type P = { params: Promise<{ locale: string; slug: string }> };
export async function generateStaticParams() { const { posts } = await getSlugs(); return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug }))); }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params; const l = asLocale(locale); const p = await getPost(slug, l);
  return p ? pageMeta(l, `/blog/${slug}`, p.title, p.excerpt, { type: "article", publishedTime: p.date, image: p.image }) : {};
}

export default async function PostPage({ params }: P) {
  const { locale, slug } = await params; const l = asLocale(locale);
  const [p, tx, all] = await Promise.all([getPost(slug, l), getTx(l), getPosts(l)]);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt, datePublished: p.date, dateModified: p.date, inLanguage: l === "ar" ? "ar-AE" : "en-AE", mainEntityOfPage: `${SITE_URL}/${l}/blog/${slug}`, author: { "@type": "Organization", name: tx("brand.full") }, publisher: { "@id": `${SITE_URL}/#clinic` }, ...(p.image ? { image: p.image } : {}) }} />
      <Crumbs l={l} items={[{ name: tx("nav.blog"), path: "/blog" }, { name: p.title, path: `/blog/${slug}` }]} />
      <Section><article className="art"><Link className="back" href={hrefTo(l, "/blog")}>{tx("art.back")}</Link><h1>{p.title}</h1><Meta post={p} l={l} min={tx("c.min")} /><Cover post={p} />{p.body.map((t, i) => <p key={i}>{t}</p>)}</article></Section>
      <Section alt><Heading title={tx("art.more")} /><BlogCards l={l} posts={all.filter((x) => x.slug !== slug).slice(0, 3)} /></Section>
      <CtaBand l={l} />
    </>
  );
}
