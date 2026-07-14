import { Metadata } from 'next'
import { buildSnippetMetadata } from '../lib/seo'

export const metadata: Metadata = buildSnippetMetadata('/blog')

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
