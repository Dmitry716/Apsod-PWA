import { Metadata } from 'next'
import { SITE_URL } from '../lib/seo'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с APSOD: разработка сайтов, интернет-магазинов, мобильных приложений, SEO продвижение и техническая поддержка. Обсудим ваш проект.',
  keywords: 'контакты APSOD, заказать сайт, разработка сайта, связь',
  openGraph: {
    title: 'Контакты | APSOD',
    description: 'Свяжитесь с нами для обсуждения проекта: разработка сайтов, приложений, SEO и поддержка.',
    url: `${SITE_URL}/contact`,
    siteName: 'APSOD',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
