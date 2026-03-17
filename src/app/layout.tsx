import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/CookieConsent";
import PushPermissionBanner from "./components/PushPermissionBanner";
import ChatWidget from "./components/ChatWidget";
import SeoJsonLd from "./components/SeoJsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  MAIN_KEYWORDS,
  DEFAULT_OG_IMAGE_URL,
} from "./lib/seo";
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
    default: `${SITE_NAME} — разработка сайтов, интернет-магазинов, мобильных приложений, SEO`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: MAIN_KEYWORDS,
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${SITE_NAME} — разработка сайтов, интернет-магазинов, мобильных приложений`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      { url: DEFAULT_OG_IMAGE_URL, width: 1200, height: 630, alt: SITE_NAME },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — разработка сайтов, интернет-магазинов, мобильных приложений`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_URL],
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/icons/icon-192x192.png`,
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    inLanguage: "ru",
  }

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <SeoJsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body className={inter.className}>
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
