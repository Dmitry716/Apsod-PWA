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
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      <SeoJsonLd data={[articleSchema, breadcrumbSchema]} />

      <article className="pb-16 md:pb-24">
        {/* Full-bleed hero — на всю ширину, текст по центру как у Itransition */}
        <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen -mt-16 md:-mt-20 min-h-[420px] md:min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden bg-slate-950">
          <img
            src={post.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0 bg-slate-950/55"
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-24 md:pt-28 pb-16 md:pb-20 text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.15] text-balance">
              {post.title}
            </h1>
            <p className="mt-6 md:mt-8 text-sm md:text-base font-medium text-white/85">
              {post.date}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 pt-6 md:pt-8">
          <nav
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 overflow-x-auto pb-2 mb-10 md:mb-12"
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

        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            {post.readTime} {locale === 'en' ? 'min read' : 'мин чтения'}
            <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
            {post.category}
          </p>

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
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-16 md:mt-20">
            <div className="container mx-auto px-4 mb-6 md:mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t(locale, 'blog.relatedTitle')}
              </h2>
            </div>
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group w-full md:w-1/3 flex flex-col-reverse bg-slate-100 dark:bg-slate-900/80"
                  >
                    <div className="relative min-h-[220px] md:min-h-[260px] overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <img
                        src={related.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 md:p-9 flex flex-col flex-1">
                      <h3 className="font-display text-xl md:text-[1.35rem] font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-4 group-hover:underline decoration-1 underline-offset-4">
                        {related.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6 flex-1">
                        {related.excerpt}
                      </p>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 pt-2">
                        {related.date}
                        <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
                        {related.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
