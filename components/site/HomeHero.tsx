import Link from "next/link";
import "./hero.css";
import { getHeroSlides, getTx } from "@/lib/data";
import { hrefTo, type Locale } from "@/lib/i18n";
import { HeroSlider } from "./HeroSlider";

const Leaf = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 17-9 17z" /><path d="M4 21c3-6 6-9 11-11" /></svg>
);

export async function HomeHero({ l }: { l: Locale }) {
  const [tx, slides] = await Promise.all([getTx(l), getHeroSlides(l)]);
  return (
    <div className="hh">
      <div className="w hs2">
        <div className="hx">
          <span className="hp"><span className="hi"><Leaf /></span>{tx("hero.pill")}</span>
          <h1>{tx("hero.l1")}<span>{tx("hero.l2")} {tx("hero.l3")}</span></h1>
          <p>{tx("hero.d")}</p>
          <div className="hb2">
            <Link className="hbt1" href={hrefTo(l, "/appointment")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>{tx("nav.book")}
            </Link>
            <Link className="hbt2" href={hrefTo(l, "/treatments")}>{tx("c.explore")}<span className="arw" aria-hidden="true">→</span></Link>
          </div>
          <ul className="hf"><li><Leaf />{tx("hero.f1")}</li><li><Leaf />{tx("hero.f2")}</li><li><Leaf />{tx("hero.f3")}</li></ul>
        </div>
        <HeroSlider slides={slides} rtl={l === "ar"} labels={{ prev: tx("hero.prev"), next: tx("hero.next"), go: tx("hero.go"), label: tx("hero.label"), tag: tx("hero.tag") }} />
      </div>
    </div>
  );
}
