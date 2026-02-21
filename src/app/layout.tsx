import type { Metadata } from 'next'
import Header from './components/layout/Header'
import { Providers } from './providers'
import PWAInstall from './components/PWAInstall'
import './globals.css'

export const metadata: Metadata = {
  title: 'APSOD - IT компания',
  description: 'Профессиональная команда, которая делает технологии инструментом для роста вашего бизнеса',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'APSOD',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <PWAInstall />
          <main className="pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}