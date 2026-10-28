import Image from "next/image";
import Link from "next/link";
import "./sections.css";
import { getFaqs, getImages, getJourney, getSettings, getTestimonials, getTx, getWa } from "@/lib/data";
import { hrefTo, type Locale } from "@/lib/i18n";
import { Faq, Heading } from "./ui";
import { TestimonialSlider } from "./TestimonialSlider";

const I = ({ children }: { children: React.ReactNode }) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>);
const icons = [
  <I key="a"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="m9 12 2 2 4-4" /></I>,
  <I key="b"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 17-9 17z" /><path d="M4 21c3-6 6-9 11-11" /></I>,
  <I key="c"><path d="M20.8 5.6a5 5 0 0 0-7-.1L12 7.2l-1.8-1.7a5 5 0 0 0-7 7.1L12 21l8.8-8.400a5 5 0 0 0 0-7z" /></I>,
  <I key="d"><path d="M12 21s7-6.100 7-11a7 7 0 0 0-14 0c0 4.900 7 11 7 11z" /><circle cx="12" cy="10" r="2.500" /></I>,
];

export async function Welcome({ l }: { l: Locale }) {
  const [tx, img] = await Promise.all([getTx(l), getImages()]);
  const photo = !!img.about;
  return (
    <section className="alt"><div className="w"><div className="two">
      <div><div className="eb">{tx("home.w.eb")}</div><h2>{tx("home.w.t")}</h2><p>{tx("home.w.p1")}</p><p>{tx("home.w.p2")}</p>
        {photo && <ul className="ckl">{[1, 2, 3, 4].map((n) => <li key={n}><i><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></i>{tx(`wl.${n}.t`)}</li>)}</ul>}
        <Link className="btn" href={hrefTo(l, "/about-us")} style={photo ? undefined : { marginTop: 8 }}>{tx("c.learn")}</Link></div>
      {photo
        ? <div className="picw"><div className="pic" style={{ position: "relative" }}><Image src={img.about} alt={tx("home.w.t")} fill sizes="(max-width:860px) 100vw, 520px" style={{ objectFit: "cover" }} /></div>
            <div className="pfl"><span className="wic">{icons[1]}</span><div><b>{tx("wl.badge.t")}</b><small>{tx("wl.badge.d")}</small></div></div></div>
        : <div className="wlg">{[1, 2, 3, 4].map((n) => <div className="wli" key={n}><span className="wic">{icons[n - 1]}</span><h3>{tx(`wl.${n}.t`)}</h3><p>{tx(`wl.${n}.d`)}</p></div>)}</div>}
    </div></div></section>
  );
}

const Botanical = () => (
  <svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" fill="none" stroke="var(--brown)" strokeWidth="1.6" strokeLinecap="round">
    <g transform="translate(860 40)"><path d="M120 480C120 300 140 160 200 20" /><path d="M120 400C60 380 20 330 10 270C70 280 110 330 120 400Z" /><path d="M126 340C190 320 230 270 240 210C180 220 136 270 126 340Z" /><path d="M134 260C84 240 56 200 50 150C100 160 130 200 134 260Z" /><path d="M150 200C205 185 235 145 240 100C190 110 158 148 150 200Z" /><path d="M166 130C130 115 112 85 110 50C146 58 164 88 166 130Z" /></g>
    <g transform="translate(60 120)"><circle cx="120" cy="120" r="90" /><circle cx="120" cy="120" r="60" /><path d="M120 40C150 80 150 130 120 170C90 130 90 80 120 40Z" /><path d="M120 170C85 165 50 140 45 105C80 108 110 130 120 170ZM120 170C155 165 190 140 195 105C160 108 130 130 120 170Z" /></g>
  </svg>
);

export async function ConditionsSection({ l, children }: { l: Locale; children: React.ReactNode }) {
  const img = await getImages();
  return (
    <section className="cond">
      <div className="cbg" aria-hidden="true">{img.conditions ? <Image src={img.conditions} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} /> : <Botanical />}</div>
      <div className="w">{children}</div>
    </section>
  );
}

export async function Journey({ l }: { l: Locale }) {
  const [tx, steps] = await Promise.all([getTx(l), getJourney(l)]);
  return (
    <section className="alt"><div className="w">
      <div className="sh"><div className="eb">{tx("jr.eb")}</div><h2>{tx("jr.t")}</h2><p>{tx("jr.d")}</p></div>
      <ol className="jr" style={{ ["--n" as string]: Math.min(steps.length, 6) }}>
        {steps.map((s, i) => (<li key={i}><span className="jn">{String(i + 1).padStart(2, "0")}</span><h3>{s.title}</h3><p>{s.text}</p></li>))}
      </ol>
    </div></section>
  );
}

export async function Testimonials({ l }: { l: Locale }) {
  const [tx, items] = await Promise.all([getTx(l), getTestimonials(l)]);
  if (!items.length) return null;
  return (
    <section className="ts"><div className="w">
      <div className="sh"><div className="eb">{tx("ts.eb")}</div><h2>{tx("ts.t")}</h2><p>{tx("ts.d")}</p></div>
      <TestimonialSlider items={items} rtl={l === "ar"} labels={{ prev: tx("ts.prev"), next: tx("ts.next"), go: tx("ts.go") }} />
    </div></section>
  );
}

export async function FaqSection({ l }: { l: Locale }) {
  const [tx, items, s, wa] = await Promise.all([getTx(l), getFaqs(l), getSettings(l), getWa(l)]);
  return (
    <section><div className="w"><div className="fq">
      <aside className="fqa">
        <div className="eb">{tx("faq.eb")}</div><h2>{tx("home.faq.t")}</h2>
        <div className="fqh"><h3>{tx("faq.side")}</h3><p>{tx("faq.help")}</p>
          <div className="pact"><a className="btn sm" href={`tel:${s.phone}`}>{tx("faq.call")}</a><a className="btn o sm" href={wa(tx("wa.gen"))} rel="noopener noreferrer">{tx("faq.wa")}</a></div></div>
      </aside>
      <Faq items={items} />
    </div></div></section>
  );
}
