import { Metadata } from 'next'
import { buildPageMetadata } from '../lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Контакты APSOD — заказать разработку сайта в Беларуси',
  description:
    'Свяжитесь с APSOD в Минске: разработка сайтов, интернет-магазинов, мобильных приложений и SEO по всей Беларуси. Офис: ул. Фрунзе, 9.',
  path: '/contact',
  keywords: [
    'контакты APSOD',
    'заказать сайт Минск',
    'разработка сайтов Беларусь',
    'IT компания Минск',
  ],
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
