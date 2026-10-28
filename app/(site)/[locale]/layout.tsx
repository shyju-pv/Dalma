import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Amiri, DM_Sans, IBM_Plex_Sans_Arabic, Newsreader } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { JsonLd } from "@/components/site/JsonLd";
import { clinicJsonLd } from "@/lib/seo";
import { getSettings, getTx, SITE_URL } from "@/lib/data";
import { dirOf, isLocale, locales, type Locale } from "@/lib/i18n";
import "../../globals.css";
import "../../typography.css";

const enSerif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const enSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const arSerif = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-serif", display: "swap" });
const arSans = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const revalidate = 60;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const tx = await getTx(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: tx("m.home.t") + " | " + tx("brand"), template: `%s | ${tx("brand")}` },
    description: tx("m.site.d"),
    applicationName: tx("brand"),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    formatDetection: { telephone: true, email: true, address: true },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
    other: { "geo.region": "AE-SH", "geo.placename": locale === "ar" ? "الشارقة" : "Sharjah" },
  };
}

export const viewport: Viewport = { themeColor: "#173F2A", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l: Locale = locale;
  const [tx, s] = await Promise.all([getTx(l), getSettings(l)]);
  const fonts = l === "ar" ? `${arSerif.variable} ${arSans.variable}` : `${enSerif.variable} ${enSans.variable}`;
  return (
    <html lang={l === "ar" ? "ar-AE" : "en-AE"} dir={dirOf(l)} className={fonts}>
      <body>
        <JsonLd data={clinicJsonLd(l, s, tx("brand.full"), tx("m.site.d"))} />
        <Header l={l} t={{ home: tx("nav.home"), about: tx("nav.about"), treatments: tx("nav.treatments"), wellness: tx("nav.wellness"), packages: tx("nav.packages"), yoga: tx("nav.yoga"), blog: tx("nav.blog"), contact: tx("nav.contact"), book: tx("nav.book"), menu: tx("nav.menu"), lang: tx("nav.lang"), brand: tx("brand"), sub: tx("brand.sub") }} />
        <main>{children}</main>
        <Footer l={l} />
        <FloatingActions l={l} />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
