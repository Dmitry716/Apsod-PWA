import { Metadata } from 'next'
import { Suspense } from 'react'
import { buildSnippetMetadata } from '../lib/seo'

export const metadata: Metadata = buildSnippetMetadata('/portfolio')

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense fallback={null}>{children}</Suspense>
}
