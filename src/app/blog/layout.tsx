import { Metadata } from 'next'
import { SITE_URL } from '../lib/seo'

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Блог APSOD: статьи о разработке сайтов, интернет-магазинов, мобильных приложений, SEO продвижении и технической поддержке сайтов.',
  keywords: 'блог APSOD, разработка сайтов, SEO, PWA, поддержка сайтов',
  openGraph: {
    title: 'Блог | APSOD',
    description: 'Статьи о разработке сайтов, приложений, SEO и поддержке.',
    url: `${SITE_URL}/blog`,
    siteName: 'APSOD',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/blog` },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
