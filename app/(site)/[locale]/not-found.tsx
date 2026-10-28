import Link from "next/link";
import { cookies } from "next/headers";
import { Hero } from "@/components/site/ui";
import { asLocale, dict } from "@/lib/i18n";

export const metadata = { title: "404", robots: { index: false } };
export default async function NotFound() {
  const l = asLocale((await cookies()).get("NEXT_LOCALE")?.value ?? "en");
  return <Hero eyebrow="404" line1={dict[l]["nf.t"]}><Link className="btn" href={`/${l}`}>{dict[l]["nf.b"]}</Link></Hero>;
}
