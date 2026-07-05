import { Metadata } from 'next'
import SeoJsonLd from '../components/SeoJsonLd'
import { buildPageMetadata, generateContactPageSchema } from '../lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Контакты — заказать разработку сайта в РФ и Беларуси',
  description:
    'Свяжитесь с APSOD: разработка сайтов, SEO и мобильных приложений. Витебск, Москва, Минск и регионы РФ/РБ. Удалённая работа.',
  path: '/contact',
  keywords: [
    'контакты APSOD',
    'заказать сайт Москва',
    'заказать сайт Витебск',
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
