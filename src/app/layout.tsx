import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from './components/layout/Header'
import PWAInstall from './components/PWAInstall'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'APSOD - IT компания',
  description: 'Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса',
  metadataBase: new URL('https://apsod-pwa.vercel.app'),
  manifest: '/manifest.json', // ← теперь с запятой и правильно
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <PWAInstall />
          <main className="pt-16 md:pt-20 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}