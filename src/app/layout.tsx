import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Providers } from "./providers";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/CookieConsent";
import PushPermissionBanner from "./components/PushPermissionBanner";
import ChatWidget from "./components/ChatWidget";
import SeoJsonLd from "./components/SeoJsonLd";
import YandexMetrika from "./components/YandexMetrika";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  MAIN_KEYWORDS,
  DEFAULT_OG_IMAGE_URL,
  SITE_LOCALE,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
} from "./lib/seo";
import { normalizeLocale } from "./lib/i18n";
import "./globals.css";
import "./hero-animations.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  interactiveWidget: "overlays-content",
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — разработка сайтов и SEO в РФ и Беларуси`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: MAIN_KEYWORDS,
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${SITE_NAME} — IT-компания в России и Беларуси`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      { url: DEFAULT_OG_IMAGE_URL, width: 1200, height: 630, alt: SITE_NAME },
    ],
    locale: SITE_LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — разработка сайтов в России и Беларуси`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_URL],
  },
  alternates: { canonical: SITE_URL },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
    ? { other: { 'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION } }
    : {}),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies()
  const cookieLang = cookieStore.get('lang')?.value
  const lang = normalizeLocale(cookieLang)

  const jsonLd = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateLocalBusinessSchema(),
  ]

  return (
    <html lang={lang === 'en' ? 'en' : 'ru'} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="geo.region" content="BY" />
        <meta name="geo.placename" content="Minsk" />
        <meta name="ICBM" content="53.9045, 27.5615" />
        <SeoJsonLd data={jsonLd} />
      </head>
      <body className={inter.className}>
        <YandexMetrika />
        <Providers>
          <Header />
          <PushPermissionBanner />
          <CookieConsent />
          <main className="pt-16 md:pt-20 min-h-screen">{children}</main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
