import type { Metadata } from "next";
import { SITE_URL, type Settings } from "./data";
import { locales, type Locale } from "./i18n";

const og = (l: Locale) => (l === "ar" ? "ar_AE" : "en_AE");

export function pageMeta(l: Locale, path: string, title: string, description: string, o: { type?: "website" | "article"; publishedTime?: string; image?: string; absolute?: boolean } = {}): Metadata {
  const p = path === "/" ? "" : path;
  const languages: Record<string, string> = { "x-default": `/en${p}` };
  locales.forEach((x) => (languages[x === "ar" ? "ar-AE" : "en-AE"] = `/${x}${p}`));
  return {
    title: o.absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: `/${l}${p}`, languages },
    openGraph: { title, description, url: `/${l}${p}`, locale: og(l), alternateLocale: og(l === "ar" ? "en" : "ar"), type: o.type ?? "website", ...(o.publishedTime ? { publishedTime: o.publishedTime } : {}), ...(o.image ? { images: [o.image] } : {}) },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const clinicJsonLd = (l: Locale, s: Settings, name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "HealthAndBeautyBusiness"],
  "@id": `${SITE_URL}/#clinic`,
  name, url: `${SITE_URL}/${l}`, description, telephone: s.phone, email: s.email, inLanguage: ["en-AE", "ar-AE"],
  address: { "@type": "PostalAddress", streetAddress: `${s.address} (${s.landmark})`, postOfficeBoxNumber: s.poBox, addressLocality: l === "ar" ? "الشارقة" : "Sharjah", addressCountry: "AE" },
  areaServed: [{ "@type": "City", name: "Sharjah" }, { "@type": "Country", name: "United Arab Emirates" }],
  sameAs: [s.facebook, s.instagram].filter(Boolean),
  // TODO: add "geo", "openingHoursSpecification" and "image" once confirmed.
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
});
