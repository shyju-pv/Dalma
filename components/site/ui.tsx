import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import "./sections.css";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getImages, getPackages, getTx, getWa, type Post, type Treatment, type Pack } from "@/lib/data";
import { hrefTo, intlLocale, type Locale } from "@/lib/i18n";

export const Sparkle = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z" /></svg>
);

import { Art } from "./Art";
export { Art };

const Leaves = () => (
  <>
    {["s", "e"].map((k) => (
      <svg key={k} className={`lv ${k}`} viewBox="0 0 200 260" aria-hidden="true"><path d="M0 40C60 40 110 80 120 150C60 150 10 110 0 40Z" fill="#8FB58A" opacity=".55" /><path d="M0 120C50 110 100 140 110 210C55 215 8 180 0 120Z" fill="#6E9A6B" opacity=".5" /><path d="M0 0C40 10 70 40 74 90C34 86 6 50 0 0Z" fill="#B88A44" opacity=".35" /></svg>
    ))}
  </>
);

export async function Pic({ alt = "" }: { alt?: string }) {
  const { about } = await getImages();
  return <div className="pic" style={{ position: "relative" }}>{about ? <Image src={about} alt={alt} fill sizes="(max-width:860px) 100vw, 520px" style={{ objectFit: "cover" }} /> : <Art />}</div>;
}

export async function Hero({ eyebrow, line1, line2, text, children }: { eyebrow: string; line1: string; line2?: string; text?: string; children?: ReactNode }) {
  const img = await getImages();
  const title = <h1>{line1}{line2 && <span>{line2}</span>}</h1>;
  const actions = children && <div className="cta">{children}</div>;
  const inner = (<div className="hero"><div className="ic"><Sparkle /></div><div className="eb">{eyebrow}</div>{title}{text && <p>{text}</p>}{actions}</div>);
  if (img.header) {
    return (
      <div className="hb"><Image src={img.header} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} /><div className="hb-o" /><div className="w">{inner}</div></div>
    );
  }
  return <div className="w page"><Leaves />{inner}</div>;
}

export const Section = ({ children, alt }: { children: ReactNode; alt?: boolean }) => (<section className={alt ? "alt" : undefined}><div className="w">{children}</div></section>);
export const Heading = ({ title, text }: { title: string; text?: string }) => (<div className="sh"><h2>{title}</h2>{text && <p>{text}</p>}</div>);

export async function Crumbs({ l, items }: { l: Locale; items: { name: string; path: string }[] }) {
  const tx = await getTx(l);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: tx("nav.home"), path: `/${l}` }, ...items.map((i) => ({ name: i.name, path: `/${l}${i.path}` }))])} />
      <div className="crumbs" role="navigation" aria-label="Breadcrumb"><Link href={hrefTo(l)}>{tx("nav.home")}</Link>{items.map((i) => <span key={i.path}> / <Link href={hrefTo(l, i.path)}>{i.name}</Link></span>)}</div>
    </>
  );
}

export async function CtaBand({ l }: { l: Locale }) {
  const tx = await getTx(l);
  return <Section><div className="band"><h2>{tx("cta.t")}</h2><p>{tx("cta.d")}</p><Link className="btn" href={hrefTo(l, "/appointment")}>{tx("nav.book")}</Link></div></Section>;
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) }} />
      {items.map((i, n) => <details key={i.q} name="faq" open={n === 0}><summary>{i.q}</summary><p>{i.a}</p></details>)}
    </div>
  );
}

export async function TreatmentCards({ l, items }: { l: Locale; items: Treatment[] }) {
  const tx = await getTx(l);
  return (
    <div className="grid">
      {items.map((t) => (
        <Link key={t.slug} className="card" href={hrefTo(l, `/treatments/${t.slug}`)}>
          {t.image && <div className="img" style={{ position: "relative" }}><Image src={t.image} alt={t.name} fill sizes="(max-width:860px) 100vw, 360px" style={{ objectFit: "cover" }} /></div>}
          <span className="tag">{t.subtitle}</span><h3>{t.name}</h3><p>{t.summary.split(/(?<=[.。])\s/)[0]}</p><span className="more">{tx("c.details")}</span>
        </Link>
      ))}
    </div>
  );
}

const tints = ["none", "hue-rotate(-18deg) saturate(1.1)", "hue-rotate(24deg)"];
const Check = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>);

export async function PackageCards({ l, items }: { l: Locale; items?: Pack[] }) {
  const [list, tx, wa] = await Promise.all([items ?? getPackages(l), getTx(l), getWa(l)]);
  return (
    <div className="pkgs">
      {list.map((p, i) => (
        <article className={`pkg${p.popular ? " pop" : ""}`} key={p.id}>
          <div className="pimg">
            {p.image ? <Image src={p.image} alt={p.name} fill sizes="(max-width:860px) 100vw, 380px" style={{ objectFit: "cover" }} /> : <div className="artw" style={{ filter: tints[i % 3] }}><Art /></div>}
            {p.popular && <span className="ppop">{tx("pk.pop")}</span>}
          </div>
          <div className="pbd">
            <span className="tag">{p.tag}</span>
            <h3 className="pn">{p.name}</h3>
            <p className="pkt">{p.text}</p>
            <div className="pmeta">
              <div className="ppr">{p.price != null ? <><b>{p.price.toLocaleString(intlLocale(l))}</b><small>{tx("pk.cur")}</small></> : <span>{tx("pk.price")}</span>}</div>
              {p.duration && <div className="pdur"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{p.duration}</div>}
            </div>
            <div className="pfill">
              {p.features.length > 0 && <><div className="pl">{tx("pk.incl")}</div><ul className="pft">{p.features.map((f) => <li key={f}><Check />{f}</li>)}</ul></>}
              {p.suitable && <><div className="pl">{tx("pk.good")}</div><p className="pg">{p.suitable}</p></>}
            </div>
            <div className="pact">
              <Link className="btn sm" href={hrefTo(l, "/appointment")}>{tx("pk.book")}</Link>
              <a className="btn o sm" href={wa(tx("wa.pk", { name: p.name }))} rel="noopener noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a7.8 7.8 0 0 1-3.9-3.4c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.8 3.8 0 0 0-1.2 2.8c0 1.7 1.2 3.3 1.4 3.5.2.2 2.4 3.7 5.8 5.1 2.1.9 2.9.9 3.4.8.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" /></svg>WhatsApp</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

const split = (t: string): [string, string] => { const w = t.split(" "); if (w.length < 4) return [t, ""]; const m = Math.ceil(w.length / 2); return [w.slice(0, m).join(" "), w.slice(m).join(" ")]; };

const Leaf = () => (
  <svg className="dc" viewBox="0 0 200 200" aria-hidden="true"><path d="M10 200C0 150 20 100 70 70C80 120 60 170 10 200Z" fill="#6E9A6B" /><path d="M60 200C50 160 70 120 110 100C115 140 100 175 60 200Z" fill="#8FB58A" /><path d="M95 150H195A50 40 0 0 1 95 150Z" fill="#D9D2C0" /><path d="M110 148Q145 118 180 148Z" fill="#B88A44" /><ellipse cx="145" cy="150" rx="50" ry="6" fill="#B8A98A" /></svg>
);

export function Cover({ post, pill }: { post: Post; pill?: boolean }) {
  const [a, b] = split(post.title);
  return (
    <div className="cv">
      {post.image ? <Image src={post.image} alt={post.title} fill sizes="(max-width:860px) 100vw, 360px" style={{ objectFit: "cover" }} /> : (
        <><Leaf /><div className="cvt"><span className="h4">{a}<span>{b}</span></span><small>{post.tagline}</small></div></>
      )}
      {pill && <><span className="pill">{post.category}</span><span className="ar" aria-hidden="true">↗</span></>}
    </div>
  );
}

export const Meta = ({ post, l, min }: { post: Post; l: Locale; min: string }) => (
  <div className="meta"><time dateTime={post.date}>{new Date(post.date).toLocaleDateString(intlLocale(l), { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time><span>•</span><span>{post.minutes} {min}</span></div>
);

export async function BlogCards({ l, posts }: { l: Locale; posts: Post[] }) {
  const tx = await getTx(l);
  return (
    <div className="grid">
      {posts.map((p) => (
        <Link key={p.slug} className="bc" href={hrefTo(l, `/blog/${p.slug}`)}>
          <Cover post={p} pill />
          <div className="bb"><Meta post={p} l={l} min={tx("c.min")} /><h3>{p.title}</h3><p>{p.excerpt}</p><div className="rd">{tx("c.read")} ↗</div></div>
        </Link>
      ))}
    </div>
  );
}
