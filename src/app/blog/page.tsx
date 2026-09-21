'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts, type BlogPost } from './data/posts'
import { t } from '../lib/i18n'
import { useLocale } from '../lib/useLocale'
import PageBreadcrumbs from '../components/PageBreadcrumbs'

type TileVariant = 'solid' | 'dark' | 'light' | 'overlay'

function variantForIndex(index: number): TileVariant {
  const cycle: TileVariant[] = ['overlay', 'solid', 'light', 'dark', 'overlay', 'overlay']
  return cycle[index % cycle.length]
}

function spanForIndex(index: number): string {
  const spans = [
    'md:col-span-4',
    'md:col-span-5',
    'md:col-span-3',
    'md:col-span-4',
    'md:col-span-4',
    'md:col-span-4',
  ]
  return spans[index % spans.length]
}

function MosaicTile({
  post,
  variant,
  locale,
  priority,
}: {
  post: BlogPost
  variant: TileVariant
  locale: 'ru' | 'en'
  priority?: boolean
}) {
  const href = `/blog/${post.slug}`
  const label = locale === 'en' ? 'Insights' : post.category

  if (variant === 'overlay') {
    return (
      <Link
        href={href}
        className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden p-7 md:min-h-[300px] md:p-9 lg:min-h-[340px]"
      >
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className="absolute inset-0 bg-slate-950/65 transition-colors group-hover:bg-slate-950/55" />
        <div className="relative z-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            {label}
          </p>
          <h2 className="font-display mb-3 text-[1.35rem] font-bold leading-snug tracking-tight text-white md:text-2xl">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-relaxed text-white/75">{post.excerpt}</p>
        </div>
      </Link>
    )
  }

  const shell =
    variant === 'solid'
      ? 'bg-[var(--apsod-accent)] text-white'
      : variant === 'dark'
        ? 'bg-slate-950 text-white dark:bg-[#020617]'
        : 'bg-white text-slate-950'

  const muted = variant === 'light' ? 'text-slate-500' : 'text-white/70'
  const body = variant === 'light' ? 'text-slate-600' : 'text-white/80'

  return (
    <Link
      href={href}
      className={`group flex min-h-[280px] flex-col justify-between p-7 md:min-h-[300px] md:p-9 lg:min-h-[340px] ${shell}`}
    >
      <div>
        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] ${muted}`}>
          {label}
        </p>
        <h2 className="font-display mb-4 text-[1.35rem] font-bold leading-snug tracking-tight md:text-2xl lg:text-[1.65rem]">
          {post.title}
        </h2>
        <p className={`line-clamp-4 text-sm leading-relaxed md:text-[15px] ${body}`}>
          {post.excerpt}
        </p>
      </div>
      <p className={`mt-8 text-sm font-medium ${muted}`}>
        {post.date}
        <span className="mx-2 opacity-50">·</span>
        {post.readTime} {locale === 'en' ? 'min' : 'мин'}
      </p>
    </Link>
  )
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { locale } = useLocale()

  const categories = [
    { slug: 'all', name: t(locale, 'blog.categories.all'), count: blogPosts.length },
    {
      slug: 'business',
      name: t(locale, 'blog.categories.business'),
      count: blogPosts.filter((p) => p.categorySlug === 'business').length,
    },
    {
      slug: 'pwa',
      name: t(locale, 'blog.categories.pwa'),
      count: blogPosts.filter((p) => p.categorySlug === 'pwa').length,
    },
    {
      slug: 'seo',
      name: t(locale, 'blog.categories.seo'),
      count: blogPosts.filter((p) => p.categorySlug === 'seo').length,
    },
    {
      slug: 'support',
      name: t(locale, 'blog.categories.support'),
      count: blogPosts.filter((p) => p.categorySlug === 'support').length,
    },
  ]

  const filteredPosts =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.categorySlug === activeCategory)

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[var(--bg-secondary)]">
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Блог', path: '/blog' },
        ]}
      />

      <section className="border-b border-slate-200 bg-white pt-10 pb-8 dark:border-[var(--border-color)] dark:bg-[var(--bg-primary)] md:pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-[3.25rem]">
            {locale === 'en' ? 'Insights' : 'Блог'}
          </h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            {t(locale, 'blog.subtitle')}
          </p>

          <div className="flex flex-wrap gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                  activeCategory === cat.slug
                    ? 'apsod-btn-solid border-transparent'
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-0">
        {filteredPosts.length === 0 ? (
          <p className="py-16 text-center text-slate-500 dark:text-slate-400">
            {locale === 'en' ? 'No articles in this category.' : 'В этой категории пока нет статей.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12">
            {filteredPosts.map((post, index) => (
              <div
                key={post.slug}
                className={`border-b border-slate-200 dark:border-slate-800 md:border-r ${spanForIndex(index)}`}
              >
                <MosaicTile
                  post={post}
                  variant={variantForIndex(index)}
                  locale={locale}
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
