import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getSettings, getSlugs, getTreatment, getTreatments, getTx, getWa, SITE_URL } from "@/lib/data";
import { asLocale, hrefTo, locales } from "@/lib/i18n";
import { Crumbs, CtaBand, Faq, Heading, Hero, Section, Sparkle, TreatmentCards } from "@/components/site/ui";
import { JsonLd } from "@/components/site/JsonLd";

type P = { params: Promise<{ locale: string; slug: string }> };
export async function generateStaticParams() { const { treatments } = await getSlugs(); return locales.flatMap((locale) => treatments.map((slug) => ({ locale, slug }))); }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params; const l = asLocale(locale);
  const [t, tx] = await Promise.all([getTreatment(slug, l), getTx(l)]);
  if (!t) return {};
  const title = l === "ar" ? `${t.name} في الشارقة: ${t.subtitle}` : `${t.name} in Sharjah: ${t.subtitle}`;
  return pageMeta(l, `/treatments/${slug}`, title, `${t.name} (${t.subtitle}) ${tx("brand")}. ${t.summary}`.slice(0, 300), { image: t.image });
}

export default async function TreatmentPage({ params }: P) {
  const { locale, slug } = await params; const l = asLocale(locale);
  const [t, tx, s, wa, all] = await Promise.all([getTreatment(slug, l), getTx(l), getSettings(l), getWa(l), getTreatments(l)]);
  if (!t) notFound();
  const v = { name: t.name, phone: s.phone };
  const faqs = [{ q: tx("td.q1", v), a: t.summary }, { q: tx("td.q2", v), a: tx("td.a2", v) }, { q: tx("td.q3", v), a: tx("td.a3", v) }];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `${t.name} (${t.subtitle})`, description: t.summary, serviceType: "Ayurvedic therapy", areaServed: "Sharjah, United Arab Emirates", provider: { "@id": `${SITE_URL}/#clinic` }, inLanguage: l === "ar" ? "ar-AE" : "en-AE" }} />
      <Hero eyebrow={t.subtitle} line1={tx("td.l1", v)} line2={tx("td.l2")}>
        <a className="btn" href={wa(tx("wa.int", { name: `${t.name} (${t.subtitle})` }))} rel="noopener noreferrer">{tx("c.wa")}</a><Link className="btn o" href={hrefTo(l, "/appointment")}>{tx("nav.book")}</Link>
      </Hero>
      <Crumbs l={l} items={[{ name: tx("nav.treatments"), path: "/treatments" }, { name: t.name, path: `/treatments/${slug}` }]} />
      <Section alt><div className="two"><div className="prose"><p>{t.summary}</p><ul className="chips" style={{ margin: "18px 0", padding: 0 }}>{t.benefits.map((b) => <li key={b}>{b}</li>)}</ul><p>{tx("td.suit")}</p></div>
        <div className="pic" style={{ position: "relative" }}>{t.image ? <Image src={t.image} alt={t.name} fill sizes="(max-width:860px) 100vw, 520px" style={{ objectFit: "cover" }} priority /> : <Sparkle size={64} />}</div></div></Section>
      <Section><Heading title={tx("td.faq", v)} /><div style={{ maxWidth: 760, margin: "0 auto" }}><Faq items={faqs} /></div></Section>
      <Section alt><Heading title={tx("td.other")} /><TreatmentCards l={l} items={all.filter((x) => x.slug !== slug).slice(0, 3)} /></Section>
      <CtaBand l={l} />
    </>
  );
}
