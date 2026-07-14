import { Metadata } from 'next'
import { buildSnippetMetadata } from '../lib/seo'

export const metadata: Metadata = buildSnippetMetadata('/portfolio')

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
