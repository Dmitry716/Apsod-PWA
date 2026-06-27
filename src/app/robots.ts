import { MetadataRoute } from 'next'
import { SITE_URL } from './lib/seo'

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/api/', '/private/', '/en/', '/ru/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
