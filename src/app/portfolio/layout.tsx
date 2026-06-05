import { Metadata } from 'next'
import { SITE_URL } from '../lib/seo'

export const metadata: Metadata = {
  title: 'Портфолио',
  description: 'Портфолио APSOD: разработка сайтов, интернет-магазинов, мобильных приложений. Кейсы для бизнеса в Беларуси, США и Канаде.',
  keywords: 'портфолио APSOD, кейсы разработки сайтов, примеры работ, интернет-магазины, мобильные приложения',
  openGraph: {
    title: 'Портфолио | APSOD',
    description: 'Наши проекты: сайты, интернет-магазины, мобильные приложения для бизнеса.',
    url: `${SITE_URL}/portfolio`,
    siteName: 'APSOD',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/portfolio` },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
