import { MetadataRoute } from 'next'
import { blogPosts } from './blog/data/posts'
import { PORTFOLIO_PROJECTS, getSlugFromLink } from './portfolio/data'
import { BELARUS_CITIES } from './lib/belarus-cities'
import {
  SITE_URL,
  SERVICE_PATHS,
  LEGAL_PATHS,
} from './lib/seo'

function parsePostDate(dateStr: string): Date {
  const months: Record<string, string> = {
    января: '01',
    февраля: '02',
    марта: '03',
    апреля: '04',
    мая: '05',
    июня: '06',
    июля: '07',
    августа: '08',
    сентября: '09',
    октября: '10',
    ноября: '11',
    декабря: '12',
  }
  const parts = dateStr.trim().split(/\s+/)
  if (parts.length >= 3) {
    const day = parts[0].padStart(2, '0')
    const month = months[parts[1].toLowerCase()] || '01'
    const year = parts[2]
    const parsed = new Date(`${year}-${month}-${day}`)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, '')
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/belarus`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICE_PATHS.map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.88,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: parsePostDate(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const portfolioSlugs = PORTFOLIO_PROJECTS.map((p) => getSlugFromLink(p.link)).filter(Boolean)
  const portfolioPages: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${base}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const legalPages: MetadataRoute.Sitemap = LEGAL_PATHS.map((slug) => ({
    url: `${base}/legal/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  const cityPages: MetadataRoute.Sitemap = BELARUS_CITIES.map((city) => ({
    url: `${base}/belarus/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: city.slug === 'minsk' ? 0.92 : 0.82,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...portfolioPages,
    ...legalPages,
    ...cityPages,
  ]
}
