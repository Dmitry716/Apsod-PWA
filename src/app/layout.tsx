import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { cookies } from "next/headers";
import { Providers } from "./providers";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/CookieConsent";
import PushPermissionBanner from "./components/PushPermissionBanner";
import ChatWidget from "./components/ChatWidget";
import SeoJsonLd from "./components/SeoJsonLd";
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
import "./globals.css";
import "./hero-animations.css";
import "./premium-motion.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
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
  const cookieStore = await cookies()
  const cookieLang = cookieStore.get('lang')?.value
  const lang = normalizeLocale(cookieLang)

  return (
    <html lang={lang === 'en' ? 'en' : 'ru'} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
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
      <body className={`${inter.variable} ${manrope.variable} ${inter.className}`}>
        <GoogleAnalytics />
        <YandexMetrika />
        <Providers>
          <Header />
          <PushPermissionBanner />
          <CookieConsent />
          <main className="pt-20 md:pt-24 min-h-screen">{children}</main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
