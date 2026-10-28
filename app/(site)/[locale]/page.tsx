import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getPackages, getPosts, getTreatments, getTx } from "@/lib/data";
import { asLocale, hrefTo } from "@/lib/i18n";
import { HomeHero } from "@/components/site/HomeHero";
import { ConditionsSection, FaqSection, Journey, Testimonials, Welcome } from "@/components/site/Sections";
import { BlogCards, CtaBand, Heading, PackageCards, Section, TreatmentCards } from "@/components/site/ui";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = asLocale((await params).locale); const tx = await getTx(l);
  return pageMeta(l, "/", tx("m.home.t") + " | " + tx("brand"), tx("m.home.d"), { absolute: true });
}

export default async function Home({ params }: P) {
  const l = asLocale((await params).locale);
  const [tx, tr, pk, posts] = await Promise.all([getTx(l), getTreatments(l), getPackages(l), getPosts(l)]);
  return (
    <>
      <HomeHero l={l} />
      <Welcome l={l} />
      <Section><Heading title={tx("home.sig.t")} text={tx("home.sig.d")} /><TreatmentCards l={l} items={tr.slice(0, 6)} />
        <p style={{ textAlign: "center", marginTop: 32 }}><Link className="btn o" href={hrefTo(l, "/treatments")}>{tx("c.all")}</Link></p></Section>
      <ConditionsSection l={l}>
        <Heading title={tx("home.cond.t")} text={tx("home.cond.d")} />
        <div className="grid">{[1, 2, 3].map((n) => <div className="card" key={n}><h3>{tx(`cond.${n}`)}</h3><ul className="chips" style={{ padding: 0 }}>{tx(`cond.${n}.i`).split("|").map((i) => <li key={i}>{i}</li>)}</ul></div>)}</div>
      </ConditionsSection>
      <Journey l={l} />
      <Section><Heading title={tx("home.pk.t")} text={tx("home.pk.d")} /><PackageCards l={l} items={pk} />
        <p style={{ textAlign: "center", marginTop: 32 }}><Link className="btn o" href={hrefTo(l, "/packages")}>{tx("c.seepk")}</Link></p></Section>
      <Testimonials l={l} />
      {posts.length > 0 && (
        <Section alt>
          <div className="jh"><div><span className="pillx">{tx("home.j.pill")}</span><h2>{tx("home.j.t1")}<span>{tx("home.j.t2")}</span></h2><p>{tx("home.j.d")}</p></div><Link className="vl" href={hrefTo(l, "/blog")}>{tx("home.j.all")}</Link></div>
          <BlogCards l={l} posts={posts.slice(0, 3)} />
        </Section>
      )}
      <FaqSection l={l} />
      <CtaBand l={l} />
    </>
  );
}
