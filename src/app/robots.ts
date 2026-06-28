import { MetadataRoute } from 'next'
import { SITE_URL } from './lib/seo'

export const dynamic = 'force-static'
export const revalidate = false

/** Пути, закрытые от индексации (см. also noindex в layout admin/dashboard). */
const DISALLOW_PATHS = [
  '/admin',
  '/dashboard',
  '/api/',
  '/private/',
  '/components/',
  '/en/',
  '/ru/',
  '/_next/',
] as const

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...DISALLOW_PATHS],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
