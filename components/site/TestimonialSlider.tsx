"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type TItem = { name: string; role: string; quote: string; rating: number; image?: string };
type Labels = { prev: string; next: string; go: string };

export function TestimonialSlider({ items, rtl, labels }: { items: TItem[]; rtl: boolean; labels: Labels }) {
  const ref = useRef<HTMLDivElement>(null);
  const [st, setSt] = useState({ i: 0, start: true, end: items.length <= 1 });
  const dir = rtl ? -1 : 1;
  const step = () => { const c = ref.current?.children[0] as HTMLElement | undefined; return (c?.offsetWidth ?? 320) + 20; };
  const sync = () => {
    const el = ref.current; if (!el) return;
    const x = Math.abs(el.scrollLeft);
    const end = x + el.clientWidth >= el.scrollWidth - 4;
    setSt({ i: end ? items.length - 1 : Math.round(x / step()), start: x < 4, end });
  };
  useEffect(() => {
    sync();
    const el = ref.current!;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => { el.removeEventListener("scroll", sync); window.removeEventListener("resize", sync); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const behavior = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth") as ScrollBehavior;
  const by = (d: number) => ref.current?.scrollBy({ left: d * dir * step(), behavior: behavior() });
  const to = (i: number) => ref.current?.scrollTo({ left: dir * i * step(), behavior: behavior() });

  return (
    <>
      <div className="tsr" ref={ref} tabIndex={0} role="list">
        {items.map((t, i) => {
          const r = Math.max(1, Math.min(5, t.rating));
          return (
            <figure className="tc" key={i} role="listitem">
              <div className="stars" role="img" aria-label={`${r} / 5`}>{"★".repeat(r)}<span>{"★".repeat(5 - r)}</span></div>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                {t.image ? <Image className="av" src={t.image} alt="" width={44} height={44} /> : <span className="av">{t.name.trim().charAt(0)}</span>}
                <span><b>{t.name}</b>{t.role && <small>{t.role}</small>}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      {items.length > 1 && (
        <div className="tsc">
          <div className="tsd">{items.map((_, i) => <button key={i} type="button" className={i === st.i ? "on" : undefined} aria-label={labels.go.replace("{n}", String(i + 1))} aria-current={i === st.i} onClick={() => to(i)} />)}</div>
          <div className="tsa"><span aria-hidden="true">{st.i + 1} / {items.length}</span>
            <button type="button" onClick={() => by(-1)} disabled={st.start} aria-label={labels.prev}>←</button>
            <button type="button" onClick={() => by(1)} disabled={st.end} aria-label={labels.next}>→</button></div>
        </div>
      )}
    </>
  );
}
