import Link from 'next/link'
import Image from 'next/image'
import { blogPosts, type BlogPost } from '../blog/data/posts'
import type { Locale } from '../lib/i18n'
import { t } from '../lib/i18n'

type Props = {
  currentSlug: string
  locale: Locale
}

function categoryCounts() {
  const map = new Map<string, { name: string; slug: string; count: number }>()
  for (const post of blogPosts) {
    const prev = map.get(post.categorySlug)
    if (prev) prev.count += 1
    else map.set(post.categorySlug, { name: post.category, slug: post.categorySlug, count: 1 })
  }
  return [...map.values()].sort((a, b) => b.count - a.count)
}

function popularTags(limit = 10) {
  const counts = new Map<string, number>()
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag)
}

/** Nerox-style blog details sidebar */
export default function BlogPostSidebar({ currentSlug, locale }: Props) {
  const isEn = locale === 'en'
  const feeds = blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 4)
  const categories = categoryCounts()
  const tags = popularTags()

  return (
    <aside className="space-y-10 lg:pl-4">
      <div>
        <h3 className="font-display mb-5 text-base font-bold tracking-tight text-slate-900 dark:text-white">
          {isEn ? 'Popular feeds' : 'Популярные статьи'}
        </h3>
        <ul className="space-y-5">
          {feeds.map((post) => (
            <li key={post.slug} className="flex gap-3">
              <Link
                href={`/blog/${post.slug}`}
                className="relative h-[70px] w-[70px] shrink-0 overflow-hidden bg-slate-200 dark:bg-slate-800"
              >
                <Image src={post.image} alt="" fill className="object-cover" sizes="70px" />
              </Link>
              <div className="min-w-0">
                <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">{post.date}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-display text-sm font-semibold leading-snug text-slate-900 transition-colors hover:text-[var(--apsod-accent)] dark:text-white"
                >
                  {post.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display mb-5 text-base font-bold tracking-tight text-slate-900 dark:text-white">
          {isEn ? 'Categories' : 'Категории'}
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href="/blog"
                className="flex items-center justify-between border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition-colors hover:border-[var(--apsod-accent)] hover:text-[var(--apsod-accent)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                <span>{cat.name}</span>
                <span className="text-slate-400">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display mb-5 text-base font-bold tracking-tight text-slate-900 dark:text-white">
          {isEn ? 'Popular tags' : 'Популярные теги'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href="/blog"
              className="inline-flex border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-[var(--apsod-accent)] hover:text-[var(--apsod-accent)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/50">
        <p className="font-display mb-2 text-sm font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          APSOD
        </p>
        <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {isEn
            ? 'Need a site, store or app? Tell us about the brief — we reply the same day.'
            : 'Нужен сайт, магазин или приложение? Опишите задачу — ответим в тот же день.'}
        </p>
        <Link
          href="/contact"
          className="apsod-btn-solid inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold"
        >
          {isEn ? 'Contact us' : 'Связаться'}
        </Link>
      </div>
    </aside>
  )
}

export function getRecentPosts(current: BlogPost, limit = 2): BlogPost[] {
  const same = blogPosts.filter(
    (p) => p.categorySlug === current.categorySlug && p.slug !== current.slug
  )
  if (same.length >= limit) return same.slice(0, limit)
  const rest = blogPosts.filter((p) => p.slug !== current.slug && !same.includes(p))
  return [...same, ...rest].slice(0, limit)
}
