import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getPackages, getSettings, getTreatments, getTx } from "@/lib/data";
import { asLocale } from "@/lib/i18n";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { Crumbs, Hero, Section } from "@/components/site/ui";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const l = asLocale((await params).locale); const tx = await getTx(l); return pageMeta(l, "/appointment", tx("m.bk.t"), tx("m.bk.d")); }

export default async function Appointment({ params }: P) {
  const l = asLocale((await params).locale); const [tx, s, tr, pk] = await Promise.all([getTx(l), getSettings(l), getTreatments(l), getPackages(l)]);
  const t = (k: string) => tx(k);
  return (
    <>
      <Hero eyebrow={tx("bk.eb")} line1={tx("bk.l1")} line2={tx("bk.l2")} text={tx("bk.d")} />
      <Crumbs l={l} items={[{ name: tx("nav.book"), path: "/appointment" }]} />
      <Section><AppointmentForm whatsapp={s.whatsapp} hi={tx("wa.hi")} tail={tx("wa.tail")} options={[t("bk.gen"), ...pk.map((p) => p.name), ...tr.map((x) => x.name)]}
        labels={{ name: t("bk.name"), phone: t("bk.phone"), svc: t("bk.svc"), date: t("bk.date"), notes: t("bk.notes"), send: t("bk.send"), note: t("bk.note") }} /></Section>
    </>
  );
}
