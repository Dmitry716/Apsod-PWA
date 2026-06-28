import { Metadata } from 'next'
import SeoJsonLd from '../components/SeoJsonLd'
import { buildPageMetadata, generateContactPageSchema } from '../lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Контакты — заказать разработку сайта в РФ и Беларуси',
  description:
    'Свяжитесь с APSOD: разработка сайтов, SEO и мобильных приложений. Москва, Минск и регионы РФ/РБ. Офис в Минске, ул. Фрунзе, 9.',
  path: '/contact',
  keywords: [
    'контакты APSOD',
    'заказать сайт Москва',
    'заказать сайт Минск',
    'разработка сайтов контакты',
    'IT компания Москва',
  ],
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SeoJsonLd data={generateContactPageSchema()} />
      {children}
    </>
  )
}
