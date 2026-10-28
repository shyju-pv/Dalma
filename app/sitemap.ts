import type { MetadataRoute } from "next";
import { getSlugs, SITE_URL } from "@/lib/data";
import { locales } from "@/lib/i18n";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { treatments, posts } = await getSlugs();
  const entry = (path: string, priority: number, lastModified = new Date()) => locales.map((l) => ({
    url: `${SITE_URL}/${l}${path}`, lastModified, changeFrequency: "monthly" as const, priority,
    alternates: { languages: { "en-AE": `${SITE_URL}/en${path}`, "ar-AE": `${SITE_URL}/ar${path}` } },
  }));
  return [
    ...["", "/about-us", "/treatments", "/packages", "/yoga", "/blog", "/contact-us", "/appointment"].flatMap((p) => entry(p, p === "" ? 1 : 0.8)),
    ...treatments.flatMap((s) => entry(`/treatments/${s}`, 0.7)),
    ...posts.flatMap((p) => entry(`/blog/${p.slug}`, 0.6, new Date(p.published_at))),
  ];
}
