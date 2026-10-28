"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Art } from "./Art";

export type Slide = { image?: string; badge: string; kicker: string; title: string };
type Labels = { prev: string; next: string; go: string; label: string; tag: string };

const tint = ["none", "hue-rotate(-18deg) saturate(1.1)", "hue-rotate(24deg)"];

export function HeroSlider({ slides, labels, rtl }: { slides: Slide[]; labels: Labels; rtl: boolean }) {
  const n = slides.length;
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const x0 = useRef<number | null>(null);
  const go = (i: number) => setCur(((i % n) + n) % n);
  const next = () => go(cur + 1);
  const prev = () => go(cur - 1);
  const s = slides[cur];

  return (
    <div className={`hsw${paused ? " paused" : ""}`} role="region" aria-roledescription="carousel" aria-label={labels.label}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="hsl"
        onPointerDown={(e) => { x0.current = e.clientX; }}
        onPointerUp={(e) => { if (x0.current == null) return; const dx = e.clientX - x0.current; x0.current = null; if (Math.abs(dx) > 45 && n > 1) ((dx < 0) !== rtl ? next() : prev()); }}>
        {slides.map((sl, i) => (
          <div key={i} className={`sl${i === cur ? " act" : i === (cur - 1 + n) % n ? " prv" : ""}`} aria-hidden={i !== cur}>
            {sl.image ? <Image src={sl.image} alt={i === cur ? sl.title : ""} fill priority={i === 0} sizes="(max-width:860px) 100vw, 520px" style={{ objectFit: "cover" }} />
              : <div className="artw" style={{ filter: tint[i % 3] }}><Art /></div>}
            <div className="shade" />
          </div>
        ))}
        <div className="bd" key={`b${cur}`}><i />{s.badge}</div>
        {n > 1 && (
          <div className="ctl">
            <button type="button" className="ar2" onClick={prev} aria-label={labels.prev}>←</button>
            <div className="dts">
              {slides.map((_, i) => (
                <button type="button" key={i} className={`dt${i === cur ? " on" : ""}`} onClick={() => go(i)} aria-label={labels.go.replace("{n}", String(i + 1))} aria-current={i === cur}>
                  {i === cur && <i key={cur} onAnimationEnd={next} />}
                </button>
              ))}
            </div>
            <button type="button" className="ar2" onClick={next} aria-label={labels.next}>→</button>
          </div>
        )}
      </div>
      <div className="no"><b>{String(cur + 1).padStart(2, "0")}</b><small>{labels.tag}</small></div>
      <div className="phc" key={`p${cur}`} aria-live={paused ? "polite" : "off"}>
        <span className="lf"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 17-9 17z" /><path d="M4 21c3-6 6-9 11-11" /></svg></span>
        <div><small>{s.kicker}</small><strong>{s.title}</strong></div>
      </div>
    </div>
  );
}
