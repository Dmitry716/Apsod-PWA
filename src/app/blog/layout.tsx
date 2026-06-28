import { Metadata } from 'next'
import { buildPageMetadata } from '../lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Блог — разработка сайтов, SEO и digital для бизнеса',
  description:
    'Блог APSOD: экспертные статьи о разработке сайтов, SEO в Яндексе и Google, PWA, мобильных приложениях и техподдержке для рынков РФ и Беларуси.',
  path: '/blog',
  keywords: [
    'блог веб-разработки',
    'SEO статьи',
    'разработка сайтов блог',
    'PWA блог',
    'техподдержка сайтов',
  ],
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
