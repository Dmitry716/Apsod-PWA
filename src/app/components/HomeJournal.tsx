'use client'

import Image from 'next/image'
import Link from 'next/link'
import { blogPosts, type BlogPost } from '../blog/data/posts'
import { t } from '../lib/i18n'
import { useLocale } from '../lib/useLocale'

type TileVariant = 'solid' | 'dark' | 'light' | 'overlay'

function variantForIndex(index: number): TileVariant {
  const cycle: TileVariant[] = ['overlay', 'solid', 'light', 'dark', 'overlay', 'overlay']
  return cycle[index % cycle.length]
}

function MosaicTile({
  post,
  variant,
  locale,
}: {
  post: BlogPost
  variant: TileVariant
  locale: 'ru' | 'en'
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
          <h3 className="font-display mb-3 text-[1.35rem] font-bold leading-snug tracking-tight text-white md:text-2xl">
            {post.title}
          </h3>
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

  const muted =
    variant === 'light' ? 'text-slate-500' : 'text-white/70'
  const body =
    variant === 'light' ? 'text-slate-600' : 'text-white/80'

  return (
    <Link
      href={href}
      className={`group flex min-h-[280px] flex-col justify-between p-7 md:min-h-[300px] md:p-9 lg:min-h-[340px] ${shell}`}
    >
      <div>
        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] ${muted}`}>
          {label}
        </p>
        <h3 className="font-display mb-4 text-[1.35rem] font-bold leading-snug tracking-tight md:text-2xl lg:text-[1.65rem]">
          {post.title}
        </h3>
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

const SPAN = [
  'md:col-span-4',
  'md:col-span-5',
  'md:col-span-3',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
] as const

/** Itransition Insights-style flush mosaic for homepage journal */
export default function HomeJournal() {
  const { locale } = useLocale()
  const posts = blogPosts.slice(0, 6)

  return (
    <section id="journal" className="scroll-mt-24 border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-white/45">05</span>
              <span className="h-px w-16 bg-white/15" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em]">
              {t(locale, 'home.journal.titleLead')}
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
          >
            {t(locale, 'home.journal.viewMore')} →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 border-y border-white/10 md:grid-cols-12">
        {posts.map((post, index) => (
          <div
            key={post.slug}
            className={`border-b border-white/10 md:border-r md:border-white/10 ${SPAN[index] ?? 'md:col-span-4'}`}
          >
            <MosaicTile post={post} variant={variantForIndex(index)} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  )
}
