import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins, Roboto } from "next/font/google";
import { cookies, headers } from "next/headers";
import { Providers } from "./providers";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/CookieConsent";
import PushPermissionBanner from "./components/PushPermissionBanner";
import ChatWidget from "./components/ChatWidget";
import SeoJsonLd from "./components/SeoJsonLd";
import LocaleSeoHints from "./components/LocaleSeoHints";
import YandexMetrika from "./components/YandexMetrika";
import GoogleAnalytics from "./components/GoogleAnalytics";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  MAIN_KEYWORDS,
  DEFAULT_OG_IMAGE_URL,
  SITE_LOCALE,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSiteNavigationSchema,
  generateLocalBusinessSchema,
  generateGraphSchema,
} from "./lib/seo";
import { normalizeLocale } from "./lib/i18n";
import { getLocaleFromPathname } from "./lib/locale-path";
import "./globals.css";
import "./hero-animations.css";
import "./premium-motion.css";

/** Nerox body/paragraph — Roboto (full Cyrillic) */
const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Nerox headings — Poppins.
 * adjustFontFallback: false so missing Cyrillic glyphs fall through to Montserrat
 * instead of a local "Poppins Fallback" face.
 */
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

/** Geometric Cyrillic stand-in for Poppins (Nerox has no Cyrillic Poppins) */
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display-cyr",
  display: "swap",
  adjustFontFallback: false,
});

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
    default: `${SITE_NAME} — разработка сайтов в Минске`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: MAIN_KEYWORDS,
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  openGraph: {
    title: `${SITE_NAME} — разработка сайтов в Минске`,
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
    title: `${SITE_NAME} — разработка сайтов в Минске`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_URL],
  },
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
  const headerStore = await headers()
  const cookieStore = await cookies()
  const headerLocale = headerStore.get('x-apsod-locale')
  const pathLocale = getLocaleFromPathname(headerStore.get('x-apsod-pathname') || '/')
  const cookieLang = cookieStore.get('lang')?.value
  const lang = normalizeLocale(headerLocale ?? pathLocale ?? cookieLang)

  return (
    <html lang={lang === 'en' ? 'en' : 'ru'} suppressHydrationWarning>
      <head>
        <LocaleSeoHints />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="author" content={SITE_NAME} />
        <meta name="geo.region" content="BY-HM" />
        <meta name="geo.placename" content="Minsk, Belarus" />
        <meta name="geo.position" content="53.918052;27.573716" />
        <meta name="ICBM" content="53.918052, 27.573716" />
        <SeoJsonLd
          data={generateGraphSchema([
            generateOrganizationSchema(),
            generateWebSiteSchema(),
            generateSiteNavigationSchema(),
            generateLocalBusinessSchema(),
          ])}
        />
      </head>
      <body
        className={`${roboto.variable} ${poppins.variable} ${montserrat.variable} ${roboto.className}`}
      >
        <GoogleAnalytics />
        <YandexMetrika />
        <Providers>
          <Header />
          <PushPermissionBanner />
          <CookieConsent />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
