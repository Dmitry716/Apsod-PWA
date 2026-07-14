import { Metadata } from 'next'
import SeoJsonLd from '../components/SeoJsonLd'
import { buildSnippetMetadata, generateContactPageSchema } from '../lib/seo'

export const metadata: Metadata = buildSnippetMetadata('/contact')

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
