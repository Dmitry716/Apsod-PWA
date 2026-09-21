import { MetadataRoute } from 'next'
import { blogPosts } from './blog/data/posts'
import { PORTFOLIO_SITEMAP_SLUGS } from './portfolio/sitemap-slugs'
import {
  SITE_URL,
  SERVICE_PATHS,
  LEGAL_PATHS,
  SERVICE_SITEMAP_PRIORITY,
  parseRussianDateToIso,
  buildLocaleAlternates,
} from './lib/seo'

export const dynamic = 'force-static'
export const revalidate = false

function entry(
  path: string,
  opts: {
    lastModified: Date
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
  },
): MetadataRoute.Sitemap {
  const alts = buildLocaleAlternates(path)
  const base = SITE_URL.replace(/\/$/, '')
  const ruPath = path === '/' ? '' : path
  const enPath = path === '/' ? '/en' : `/en${path}`

  return [
    {
      url: `${base}${ruPath}` || base,
      lastModified: opts.lastModified,
      changeFrequency: opts.changeFrequency,
      priority: opts.priority,
      alternates: { languages: alts },
    },
    {
      url: `${base}${enPath}`,
      lastModified: opts.lastModified,
      changeFrequency: opts.changeFrequency,
      priority: Math.max(0.1, opts.priority - 0.02),
      alternates: { languages: alts },
    },
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPaths = [
    '/',
    '/services',
    '/portfolio',
    '/contact',
    '/blog',
    '/about',
  ]

  const staticPages = staticPaths.flatMap((path, index) =>
    entry(path, {
      lastModified: now,
      changeFrequency: path === '/blog' ? 'daily' : path === '/' || path === '/services' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : path === '/services' ? 0.95 : 0.9 - index * 0.01,
    }),
  )

  const servicePages = SERVICE_PATHS.flatMap((slug) =>
    entry(`/services/${slug}`, {
      lastModified: now,
      changeFrequency: 'monthly',
      priority: SERVICE_SITEMAP_PRIORITY[slug] ?? 0.88,
    }),
  )

  const blogPages = blogPosts.flatMap((post) =>
    entry(`/blog/${post.slug}`, {
      lastModified: new Date(parseRussianDateToIso(post.date)),
      changeFrequency: 'monthly',
      priority: 0.75,
    }),
  )

  const portfolioPages = PORTFOLIO_SITEMAP_SLUGS.flatMap((slug) =>
    entry(`/portfolio/${slug}`, {
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.72,
    }),
  )

  const legalPages = LEGAL_PATHS.flatMap((slug) =>
    entry(`/legal/${slug}`, {
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.25,
    }),
  )

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...portfolioPages,
    ...legalPages,
  ]
}
