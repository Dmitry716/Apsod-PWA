/** Базовые данные сайта для SEO, Schema.org и Open Graph */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apsod.com'
export const SITE_NAME = 'APSOD'
export const SITE_DESCRIPTION =
  'Разработка сайтов, интернет-магазинов и мобильных приложений. SEO продвижение и техническая поддержка сайтов. IT-компания с 15-летним опытом.'
export const SITE_OG_IMAGE = '/og-image.jpg'
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${SITE_OG_IMAGE}`

/** Основные ключевые запросы для продвижения */
export const MAIN_KEYWORDS = [
  'разработка сайтов',
  'интернет-магазины',
  'мобильные приложения',
  'seo продвижение',
  'техническая поддержка сайтов',
  'создание сайтов',
  'разработка интернет-магазина',
  'разработка мобильных приложений',
  'продвижение сайтов',
  'поддержка сайта',
]

export function buildCanonical(path: string): string {
  const base = SITE_URL.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

export function buildOgImageUrl(path?: string): string {
  return path ? `${SITE_URL}${path}` : DEFAULT_OG_IMAGE_URL
}

/** Schema.org Organization для JSON-LD (используется в SchemaOrg.tsx) */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/icons/icon-192x192.png`,
  }
}

/** Schema.org WebSite для JSON-LD (используется в SchemaOrg.tsx) */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    inLanguage: 'ru',
  }
}
