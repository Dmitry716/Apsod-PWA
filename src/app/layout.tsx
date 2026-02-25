import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PWAInstall from "./components/PWAInstall";
import CookieConsent from "./components/CookieConsent";
import "./globals.css";
import "./hero-animations.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "APSOD - IT компания",
  description:
    "Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса",
  metadataBase: new URL("https://apsod.com"),
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "APSOD - IT компания",
    description:
      "Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса",
    url: "https://apsod.com",
    siteName: "APSOD",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APSOD - IT компания",
    description:
      "Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://apsod.com" />
        {/* Убедитесь, что нет пробелов между тегами */}
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <CookieConsent />
          <PWAInstall />
          <main className="pt-16 md:pt-20 min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
