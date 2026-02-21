import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import PWAInstall from './components/PWAInstall'
import CookieConsent from './components/CookieConsent'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'APSOD - IT компания',
  description: 'Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса',
  metadataBase: new URL('https://apsod-pwa.vercel.app'),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico', // ссылка на файл в public
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <CookieConsent />
          <PWAInstall />
          <main className="pt-16 md:pt-20 min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}