import { MetadataRoute } from 'next'
import { blogPosts } from './blog/data/posts'
import { PORTFOLIO_SITEMAP_SLUGS } from './portfolio/sitemap-slugs'
import { getAllReadySiteSlugs } from './ready-sites/data'
import {
  SITE_URL,
  SERVICE_PATHS,
  LEGAL_PATHS,
  SERVICE_SITEMAP_PRIORITY,
  parseRussianDateToIso,
} from './lib/seo'

export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, '')
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/ready-sites`, lastModified: now, changeFrequency: 'weekly', priority: 0.88 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICE_PATHS.map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: SERVICE_SITEMAP_PRIORITY[slug] ?? 0.88,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(parseRussianDateToIso(post.date)),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const portfolioPages: MetadataRoute.Sitemap = PORTFOLIO_SITEMAP_SLUGS.map((slug) => ({
    url: `${base}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.72,
  }))

  const readySitePages: MetadataRoute.Sitemap = getAllReadySiteSlugs().map((slug) => ({
    url: `${base}/ready-sites/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.86,
  }))

  const legalPages: MetadataRoute.Sitemap = LEGAL_PATHS.map((slug) => ({
    url: `${base}/legal/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.25,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...portfolioPages,
    ...readySitePages,
    ...legalPages,
  ]
}
