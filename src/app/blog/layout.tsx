import { Metadata } from 'next'
import { buildSnippetMetadata } from '../lib/seo'
import { blogPosts } from './data/posts'
import SeoJsonLd from '../components/SeoJsonLd'
import { SITE_URL, SITE_NAME } from '../lib/seo'

export const metadata: Metadata = buildSnippetMetadata('/blog')

/**
 * Schema.org Blog + ItemList для листинга.
 * Google покажет расширенный сниппет с перечнем статей.
 */
function buildBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: `Блог ${SITE_NAME}`,
    description:
      'Разборы, заметки и кейсы про веб, мобильные приложения, SEO и продуктовую инженерию.',
    url: `${SITE_URL}/blog`,
    inLanguage: 'ru-RU',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      image: `${SITE_URL}${post.image}`,
      datePublished: post.date,
      author: { '@type': 'Organization', name: SITE_NAME },
      keywords: post.tags.join(', '),
      articleSection: post.category,
    })),
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SeoJsonLd data={buildBlogSchema()} />
      {children}
    </>
  )
}
