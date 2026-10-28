import { cache } from "react";
import { publicClient } from "./supabase/public";
import { dict, fmt, type Locale } from "./i18n";
import { waLink } from "./wa";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dalmaayurvedic.com";
type Row = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
const L = (r: Row, f: string, l: Locale): string => (r[`${f}_${l}`] || r[`${f}_en`] || "") as string;

export type Settings = { phone: string; mobile: string; whatsapp: string; email: string; facebook: string; instagram: string; poBox: string; address: string; landmark: string };
export type Treatment = { slug: string; name: string; subtitle: string; summary: string; benefits: string[]; image?: string };
export type Pack = { id: string; name: string; tag: string; text: string; image?: string; price: number | null; duration: string; suitable: string; features: string[]; popular: boolean };
export type Step = { title: string; text: string };
export type Faq = { q: string; a: string };
export type Testimonial = { name: string; role: string; quote: string; rating: number; image?: string };
export type Post = { slug: string; category: string; title: string; tagline: string; excerpt: string; date: string; minutes: number; body: string[]; image?: string };

const fallback: Row = { phone: "+97165510666", mobile: "+971509678737", whatsapp: "971509678737", email: "mail@dalmaayurvedic.com", facebook: "https://www.facebook.com/ayurdalma/", po_box: "77302", address_en: "Al Zamil Building, Al Zahra Square, Sharjah, UAE", landmark_en: "Near Al Zahra Hospital" };

export const getSettings = cache(async (l: Locale): Promise<Settings> => {
  const { data } = await publicClient().from("site_settings").select("*").eq("id", 1).maybeSingle();
  const r = { ...fallback, ...(data ?? {}) };
  return { phone: r.phone, mobile: r.mobile, whatsapp: r.whatsapp, email: r.email, facebook: r.facebook ?? "", instagram: r.instagram ?? "", poBox: r.po_box ?? "", address: L(r, "address", l), landmark: L(r, "landmark", l) };
});

export const getImages = cache(async () => {
  const { data } = await publicClient().from("site_settings").select("header_image_url,about_image_url,conditions_bg_url").eq("id", 1).maybeSingle();
  return { header: (data?.header_image_url as string) || "", about: (data?.about_image_url as string) || "", conditions: (data?.conditions_bg_url as string) || "" };
});

export type Slide = { image?: string; badge: string; kicker: string; title: string };
export const getHeroSlides = cache(async (l: Locale): Promise<Slide[]> => {
  const { data } = await publicClient().from("hero_slides").select("*").eq("published", true).order("sort");
  const rows = (data ?? []).map((r: Row) => ({ image: (r.image_url as string) || undefined, badge: L(r, "badge", l), kicker: L(r, "kicker", l), title: L(r, "title", l) }));
  if (rows.length) return rows;
  const tx = await getTx(l); // built-in slides until the admin adds some
  return [1, 2, 3].map((n) => ({ badge: tx(`hero.s${n}.b`), kicker: tx(`hero.s${n}.k`), title: tx(`hero.s${n}.t`) }));
});

export const getTx = cache(async (l: Locale) => {
  const { data } = await publicClient().from("content").select("key,en,ar");
  const over: Record<string, string> = {};
  (data ?? []).forEach((r: Row) => { if (r[l]) over[r.key] = r[l]; });
  return (key: string, vars?: Record<string, string>) => fmt(over[key] ?? dict[l][key] ?? dict.en[key] ?? key, vars);
});

export const getWa = async (l: Locale) => {
  const [s, tx] = await Promise.all([getSettings(l), getTx(l)]);
  return (text: string) => waLink(s.whatsapp, text, tx("wa.hi"), tx("wa.tail"));
};

const toTreatment = (r: Row, l: Locale): Treatment => ({ slug: r.slug, name: L(r, "name", l), subtitle: L(r, "subtitle", l), summary: L(r, "summary", l), benefits: (r[`benefits_${l}`]?.length ? r[`benefits_${l}`] : r.benefits_en) ?? [], image: r.image_url || undefined });

export const getTreatments = cache(async (l: Locale) => {
  const { data } = await publicClient().from("treatments").select("*").eq("published", true).order("sort");
  return (data ?? []).map((r: Row) => toTreatment(r, l));
});
export const getTreatment = async (slug: string, l: Locale) => (await getTreatments(l)).find((t) => t.slug === slug) ?? null;

export const getPackages = cache(async (l: Locale): Promise<Pack[]> => {
  const { data } = await publicClient().from("packages").select("*").eq("published", true).order("sort");
  return (data ?? []).map((r: Row) => ({ id: r.id, name: L(r, "name", l), tag: L(r, "tag", l), text: L(r, "text", l), image: (r.image_url as string) || undefined, price: r.price ?? null, duration: L(r, "duration", l), suitable: L(r, "suitable", l), features: ((r[`features_${l}`]?.length ? r[`features_${l}`] : r.features_en) ?? []) as string[], popular: !!r.popular }));
});

const toPost = (r: Row, l: Locale): Post => ({ slug: r.slug, category: L(r, "category", l), title: L(r, "title", l), tagline: L(r, "tagline", l), excerpt: L(r, "excerpt", l), date: r.published_at, minutes: r.minutes ?? 4, body: L(r, "body", l).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean), image: r.cover_url || undefined });

export const getPosts = cache(async (l: Locale) => {
  const { data } = await publicClient().from("blog_posts").select("*").eq("published", true).lte("published_at", new Date().toISOString().slice(0, 10)).order("published_at", { ascending: false });
  return (data ?? []).map((r: Row) => toPost(r, l));
});
export const getPost = async (slug: string, l: Locale) => (await getPosts(l)).find((p) => p.slug === slug) ?? null;

export async function getSlugs() {
  const db = publicClient();
  const [t, b] = await Promise.all([db.from("treatments").select("slug").eq("published", true), db.from("blog_posts").select("slug,published_at").eq("published", true)]);
  return { treatments: (t.data ?? []).map((r: Row) => r.slug as string), posts: (b.data ?? []) as { slug: string; published_at: string }[] };
}

export const getJourney = cache(async (l: Locale): Promise<Step[]> => {
  const { data } = await publicClient().from("journey_steps").select("*").eq("published", true).order("sort");
  if (data?.length) return data.map((r: Row) => ({ title: L(r, "title", l), text: L(r, "text", l) }));
  const tx = await getTx(l);
  return [1, 2, 3, 4, 5].map((n) => ({ title: tx(`jr.s${n}.t`), text: tx(`jr.s${n}.d`) }));
});

export const getFaqs = cache(async (l: Locale): Promise<Faq[]> => {
  const [{ data }, s, tx] = await Promise.all([publicClient().from("faqs").select("*").eq("published", true).order("sort"), getSettings(l), getTx(l)]);
  const vars = { address: `${s.address} (${s.landmark})`, phone: s.phone };
  if (data?.length) return data.map((r: Row) => ({ q: L(r, "q", l), a: fmt(L(r, "a", l), vars) }));
  return [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ q: tx(`faq.q${n}`), a: tx(`faq.a${n}`, vars) }));
});

export const getTestimonials = cache(async (l: Locale): Promise<Testimonial[]> => {
  const { data } = await publicClient().from("testimonials").select("*").eq("published", true).order("sort");
  return (data ?? []).map((r: Row) => ({ name: r.name, role: L(r, "role", l), quote: L(r, "quote", l), rating: r.rating ?? 5, image: (r.image_url as string) || undefined }));
});
