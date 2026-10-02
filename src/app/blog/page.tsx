'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts, type BlogPost } from './data/posts'
import { t } from '../lib/i18n'
import { useLocale } from '../lib/useLocale'
import AgencyPageHero from '../components/AgencyPageHero'
import BlogTrust from '../components/blog/BlogTrust'
import BlogSubscribe from '../components/blog/BlogSubscribe'
import BlogCta from '../components/blog/BlogCta'

type TileVariant = 'solid' | 'dark' | 'light' | 'overlay'

function variantForIndex(index: number): TileVariant {
  const cycle: TileVariant[] = ['overlay', 'solid', 'light', 'dark', 'overlay', 'overlay']
  return cycle[index % cycle.length]
}

function animForIndex(index: number): string {
  const anims = [
    'apsod-journal-slide-left',
    'apsod-journal-slide-bottom',
    'apsod-journal-slide-right',
    'apsod-journal-slide-left',
    'apsod-journal-slide-bottom',
    'apsod-journal-slide-right',
  ]
  return anims[index % anims.length]
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

/** «20 февраля 2026» → «2026-02-20» для <time dateTime> */
function toIsoDate(ruDate: string): string | undefined {
  const MONTHS: Record<string, string> = {
    января: '01', февраля: '02', марта: '03', апреля: '04',
    мая: '05', июня: '06', июля: '07', августа: '08',
    сентября: '09', октября: '10', ноября: '11', декабря: '12',
  }
  const parts = ruDate.trim().split(/\s+/)
  if (parts.length < 3) return undefined
  const day = parts[0].padStart(2, '0')
  const month = MONTHS[parts[1].toLowerCase()]
  const year = parts[2]
  if (!month || !/^\d{4}$/.test(year)) return undefined
  return `${year}-${month}-${day}`
}

function MosaicTile({
  post,
  variant,
  locale,
  priority,
  index,
}: {
  post: BlogPost
  variant: TileVariant
  locale: 'ru' | 'en'
  priority?: boolean
  index: number
}) {
  const href = `/blog/${post.slug}`
  const label = locale === 'en' ? 'Insights' : post.category
  const anim = animForIndex(index)
  const isoDate = toIsoDate(post.date)
  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black'

  if (variant === 'overlay') {
    return (
      <Link
        href={href}
        className={`apsod-journal-card ${anim} group relative flex min-h-[300px] flex-col justify-end overflow-hidden p-7 md:min-h-[340px] md:p-9 lg:min-h-[380px] ${focusRing}`}
        aria-label={`${post.title} — ${post.category}, ${post.readTime} минут чтения`}
      >
        <Image
          src={post.image}
          alt={`Обложка статьи: ${post.title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 40vw"
          priority={priority}
        />
        <div className="absolute inset-0 bg-slate-950/65 transition-colors group-hover:bg-slate-950/55" />
        <div className="apsod-journal-photo-dots absolute inset-0" aria-hidden />
        <div className="relative z-10">
          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
            {label}
            <span className="mx-2 opacity-50">·</span>
            <time dateTime={isoDate}>{post.date}</time>
          </p>
          <h2 className="font-display mb-3 text-[1.35rem] font-bold leading-snug tracking-tight text-white md:text-2xl">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-relaxed text-white/75">{post.excerpt}</p>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60 transition-colors group-hover:text-white">
            Читать
            <span aria-hidden className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </p>
        </div>
      </Link>
    )
  }

  const shell =
    variant === 'solid'
      ? 'bg-[var(--apsod-accent)] text-white'
      : variant === 'dark'
        ? 'bg-slate-950 text-white dark:bg-[#020617]'
        : 'bg-white text-slate-950 dark:bg-[var(--bg-card)] dark:text-white'

  const muted =
    variant === 'light' ? 'text-slate-500 dark:text-slate-400' : 'text-white/70'
  const body =
    variant === 'light' ? 'text-slate-600 dark:text-slate-300' : 'text-white/80'

  return (
    <Link
      href={href}
      className={`apsod-journal-card ${anim} group flex min-h-[300px] flex-col justify-between p-7 md:min-h-[340px] md:p-9 lg:min-h-[380px] ${shell} ${focusRing}`}
      aria-label={`${post.title} — ${post.category}, ${post.readTime} минут чтения`}
    >
      <div className="relative">
        <div className="apsod-journal-card-dots absolute inset-0 -m-4 pointer-events-none" aria-hidden />
        <p className={`relative mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${muted}`}>
          {label}
          <span className="mx-2 opacity-50">·</span>
          <time dateTime={isoDate}>{post.date}</time>
          <span className="mx-2 opacity-50">·</span>
          {post.readTime} {locale === 'en' ? 'min' : 'мин'}
        </p>
        <h2 className="relative font-display mb-4 text-[1.35rem] font-bold leading-snug tracking-tight md:text-2xl lg:text-[1.65rem]">
          {post.title}
        </h2>
        <p className={`relative line-clamp-4 text-sm leading-relaxed md:text-[15px] ${body}`}>
          {post.excerpt}
        </p>
      </div>
      <p className={`relative mt-8 text-[11px] font-bold uppercase tracking-[0.16em] ${muted} transition-opacity group-hover:opacity-100`}>
        Читать
        <span aria-hidden className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
      </p>
    </Link>
  )
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { locale } = useLocale()
  const isEn = locale === 'en'

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
    <div className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-white">
      <AgencyPageHero
        title={isEn ? 'Blog' : 'Блог'}
        crumb={isEn ? 'Blog' : 'Блог'}
        note={
          isEn
            ? 'Notes, breakdowns and cases about web, mobile, SEO and product engineering.'
            : 'Разборы, заметки и кейсы про веб, мобильные приложения, SEO и продуктовую инженерию.'
        }
        homeLabel={isEn ? 'Home' : 'Главная'}
      />

      {/* Фильтры */}
      <section className="relative pb-8 pt-10" aria-labelledby="blog-filters-heading">
        <h2 id="blog-filters-heading" className="sr-only">
          {isEn ? 'Filter articles by category' : 'Фильтр статей по категории'}
        </h2>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div
            className="flex flex-wrap items-stretch justify-start border-y border-slate-200 dark:border-white/10 sm:justify-center"
            role="tablist"
            aria-label={isEn ? 'Blog categories' : 'Категории блога'}
          >
            {categories.map((cat, index) => {
              const isActive = activeCategory === cat.slug
              return (
                <button
                  key={cat.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`relative shrink-0 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-5 sm:text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black ${
                    index > 0
                      ? 'before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-slate-200 dark:before:bg-white/15'
                      : ''
                  } ${
                    isActive
                      ? 'text-orange-500 dark:text-orange-300'
                      : 'text-slate-500 hover:text-slate-900 dark:text-white/45 dark:hover:text-white'
                  }`}
                >
                  {cat.name}
                  <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
                </button>
              )
            })}
          </div>

          <p className="mt-4 text-sm text-slate-500 dark:text-white/40" aria-live="polite">
            {isEn ? 'Found' : 'Найдено'}: {filteredPosts.length}
          </p>
        </div>
      </section>

      {/* Мозаика статей */}
      <section
        className="pb-14 md:pb-20"
        aria-labelledby="blog-posts-heading"
      >
        <h2 id="blog-posts-heading" className="sr-only">
          {isEn ? 'Articles' : 'Статьи'}
        </h2>
        {filteredPosts.length === 0 ? (
          <p className="py-16 text-center text-slate-500 dark:text-slate-400">
            {isEn ? 'No articles in this category.' : 'В этой категории пока нет статей.'}
          </p>
        ) : (
          <div className="mx-auto max-w-[1370px]">
            <ul
              className="grid grid-cols-1 md:grid-cols-12"
              role="list"
              aria-label={isEn ? 'Blog articles' : 'Статьи блога'}
            >
              {filteredPosts.map((post, index) => (
                <li
                  key={post.slug}
                  className={`border-b border-slate-200 dark:border-slate-800 md:border-r ${spanForIndex(index)}`}
                >
                  <MosaicTile
                    post={post}
                    variant={variantForIndex(index)}
                    locale={isEn ? 'en' : 'ru'}
                    priority={index < 2}
                    index={index}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Trust-цифры */}
      <BlogTrust />

      {/* Подписка */}
      <BlogSubscribe />

      {/* Финальный CTA */}
      <BlogCta />
    </div>
  )
}
