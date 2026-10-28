"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type T = Record<"home" | "about" | "treatments" | "wellness" | "packages" | "yoga" | "blog" | "contact" | "book" | "menu" | "lang" | "brand" | "sub", string>;

export function Header({ l, t }: { l: Locale; t: T }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const rest = path.replace(/^\/(en|ar)/, "") || "/";
  const on = (h: string) => (h === "/" ? rest === "/" : rest.startsWith(h));
  const c = (h: string) => (on(h) ? "on" : undefined);
  const close = () => setOpen(false);
  const href = (h: string) => `/${l}${h === "/" ? "" : h}`;
  const other = l === "ar" ? "en" : "ar";
  return (
    <header>
      <div className="w">
        <Link className="logo" href={href("/")} aria-label={t.brand} onClick={close}>
          <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="none" stroke="var(--brown)" strokeWidth="1.5" /><path d="M20 8C27 14 27 24 20 32C13 24 13 14 20 8Z" fill="var(--green)" /><path d="M20 32C14 31 9 27 8 21C14 21 18 25 20 32ZM20 32C26 31 31 27 32 21C26 21 22 25 20 32Z" fill="var(--brown)" opacity=".85" /></svg>
          <span><b>{l === "ar" ? t.brand.split(" ")[0] : "Dalma"}</b><small>{t.sub}</small></span>
        </Link>
        <button className="menu" aria-expanded={open} aria-controls="nv" onClick={() => setOpen(!open)}>{t.menu}</button>
        <nav id="nv" className={open ? "open" : undefined} aria-label="Main">
          <Link href={href("/")} className={c("/")} onClick={close}>{t.home}</Link>
          <Link href={href("/about-us")} className={c("/about-us")} onClick={close}>{t.about}</Link>
          <Link href={href("/treatments")} className={c("/treatments")} onClick={close}>{t.treatments}</Link>
          <div className="dd"><button className={on("/packages") || on("/yoga") ? "on" : undefined}>{t.wellness} ▾</button>
            <div className="sub"><Link href={href("/packages")} onClick={close}>{t.packages}</Link><Link href={href("/yoga")} onClick={close}>{t.yoga}</Link></div></div>
          <Link href={href("/blog")} className={c("/blog")} onClick={close}>{t.blog}</Link>
          <Link href={href("/contact-us")} className={c("/contact-us")} onClick={close}>{t.contact}</Link>
          <Link href={`/${other}${rest === "/" ? "" : rest}`} className="lang" hrefLang={other === "ar" ? "ar-AE" : "en-AE"} lang={other} onClick={close}>{t.lang}</Link>
        </nav>
        <Link className="btn sm hide-m" href={href("/appointment")}>{t.book}</Link>
      </div>
    </header>
  );
}
