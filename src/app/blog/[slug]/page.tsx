import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '../data/posts'
import SeoJsonLd from '../../components/SeoJsonLd'
import BlogShare from '../../components/BlogShare'
import {
  buildPageMetadata,
  generateArticleSchema,
  generateBreadcrumbSchema,
  SITE_NAME,
  SITE_URL,
} from '../../lib/seo'
import { blogPostSnippet } from '../../lib/page-snippets'
import { cookies } from 'next/headers'
import { normalizeLocale, t } from '../../lib/i18n'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Статья не найдена',
    }
  }

  const snippet = blogPostSnippet(post.title, post.excerpt)
  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    path: `/blog/${post.slug}`,
    keywords: [...(snippet.keywords ?? []), ...post.tags],
    ogType: 'article',
    publishedTime: post.date,
    images: [post.image],
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  const cookieStore = await cookies()
  const cookieLang = cookieStore.get('lang')?.value ?? null
  const locale = normalizeLocale(cookieLang)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter((p) => p.categorySlug === post.categorySlug && p.slug !== post.slug)
    .slice(0, 3)

  const articleUrl = `${SITE_URL}/blog/${post.slug}`

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    author: SITE_NAME,
    date: post.date,
    image: post.image,
  })
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Главная', path: '/' },
    { name: 'Блог', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SeoJsonLd data={[articleSchema, breadcrumbSchema]} />

      <div className="container mx-auto px-4 pt-10 md:pt-12">
        <nav
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 overflow-x-auto pb-2 mb-10"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
            {t(locale, 'blog.breadcrumb.home')}
          </Link>
          <span aria-hidden>/</span>
          <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
            {t(locale, 'blog.breadcrumb.blog')}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-slate-700 dark:text-slate-300 truncate">{post.title}</span>
        </nav>
      </div>

      <article className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-10 md:mb-12">
            <h1 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.2] mb-5">
              {post.title}
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {post.date}
              <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
              {post.readTime} {locale === 'en' ? 'min read' : 'мин чтения'}
              <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
              {post.category}
            </p>
          </div>

          <div className="relative aspect-[16/9] mb-10 md:mb-12 overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>

          <div
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-slate-900 dark:prose-a:text-white prose-a:underline-offset-4 mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <BlogShare url={articleUrl} title={post.title} locale={locale === 'en' ? 'en' : 'ru'} />

          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-slate-900 dark:text-white underline-offset-4 hover:underline"
            >
              ← {t(locale, 'blog.backToBlog')}
            </Link>
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-16 md:mt-20">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                {t(locale, 'blog.relatedTitle')}
              </h2>
              <div className="flex flex-wrap -mx-0">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group w-full sm:w-1/2 lg:w-1/3 flex flex-col-reverse bg-slate-100 dark:bg-slate-900/80 sm:border-r sm:border-b border-white dark:border-gray-950 last:border-r-0"
                  >
                    <div className="relative h-36 overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <img
                        src={related.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-2 group-hover:underline decoration-1 underline-offset-4">
                        {related.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">{related.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  )
}
