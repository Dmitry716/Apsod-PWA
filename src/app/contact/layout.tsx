import { Metadata } from 'next'
import SeoJsonLd from '../components/SeoJsonLd'
import PageBreadcrumbs from '../components/PageBreadcrumbs'
import {
  buildSnippetMetadata,
  generateContactPageSchema,
} from '../lib/seo'

export const metadata: Metadata = buildSnippetMetadata('/contact')

const BREADCRUMBS = [
  { name: 'Главная', path: '/' },
  { name: 'Контакты', path: '/contact' },
]

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SeoJsonLd data={generateContactPageSchema()} />
      <PageBreadcrumbs items={BREADCRUMBS} />
      {children}
    </>
  )
}
