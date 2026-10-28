import { rows } from "./dict";
import { heroRows } from "./dict-hero";
import { sectionRows } from "./dict-sections";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const asLocale = (v: string): Locale => (isLocale(v) ? v : defaultLocale);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");
export const intlLocale = (l: Locale) => (l === "ar" ? "ar-AE" : "en-GB");
export const hrefTo = (l: Locale, path = "") => `/${l}${path === "/" ? "" : path}`;

export const dict: Record<Locale, Record<string, string>> = { en: {}, ar: {} };
for (const [k, en, ar] of [...rows, ...heroRows, ...sectionRows]) { dict.en[k] = en; dict.ar[k] = ar; }

export const fmt = (s: string, v: Record<string, string> = {}) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? "");
