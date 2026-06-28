import { Metadata } from 'next'
import { buildPageMetadata } from '../lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Портфолио — кейсы разработки сайтов в РФ и Беларуси',
  description:
    'Портфолио APSOD: реальные проекты — сайты, интернет-магазины и веб-приложения для бизнеса в России, Беларуси и СНГ. Next.js, React, SEO.',
  path: '/portfolio',
  keywords: [
    'портфолио веб-студии',
    'кейсы разработки сайтов',
    'примеры сайтов Москва',
    'портфолио APSOD',
    'разработка сайтов Беларусь',
  ],
})

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
