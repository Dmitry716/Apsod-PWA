import type { Metadata } from 'next'
import {
  clipDescription,
  clipTitle,
  getPageSnippet,
  type PageSnippet,
} from './page-snippets'

/** Базовые данные сайта для SEO, Schema.org и Open Graph */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apsod.com'
export const SITE_NAME = 'APSOD'
export const SITE_LOCALE = 'ru_RU' as const

export const COMPANY = {
  legalName: 'APSOD',
  phone: '+375 (44) 577-77-24',
  phoneE164: '+375445777724',
  email: 'karelinseo@gmail.com',
  telegramUrl: 'https://t.me/Apsod_IT',
  telegramHandle: '@Apsod_IT',
  whatsappUrl: 'https://wa.me/375445777724',
  address: {
    street: 'ул. Куйбышева, 35',
    city: 'Минск',
    region: 'Минск',
    postalCode: '220029',
    country: 'BY',
    countryName: 'Беларусь',
  },
  /** ул. Куйбышева, 35 */
  geo: { lat: 53.918052, lng: 27.573716 },
  openingHours: 'Mo-Fr 09:00-18:00',
}

/** Полный адрес для контактов, футера и Schema */
export const COMPANY_ADDRESS_DISPLAY = 'г. Минск, ул. Куйбышева, 35'

export const COMPANY_REMOTE_NOTE =
  'Офис в центре Минска. Встречи по договорённости.'

function companyPostalAddress() {
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.region,
    postalCode: COMPANY.address.postalCode,
    addressCountry: COMPANY.address.country,
  }
}

export const SITE_DESCRIPTION =
  'APSOD — digital engineering в Минске: сайты и приложения на уникальном коде, SEO и GEO. Офис: ул. Куйбышева, 35.'

export const SITE_OG_IMAGE = '/og-image.jpg'
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${SITE_OG_IMAGE}`

/** Ключевые запросы: Минск-first */
export const MAIN_KEYWORDS = [
  'разработка сайтов в Минске',
  'разработка сайтов Минск',
  'создание сайтов в Минске',
  'создание сайта Минск',
  'заказать сайт Минск',
  'веб-студия Минск',
  'IT компания Минск',
  'SEO продвижение Минск',
  'продвижение сайта Минск',
  'разработка интернет-магазина Минск',
  'создание сайта с нуля',
  'стоимость сайта',
  'PWA разработка',
  'техническая поддержка сайтов',
  'разработка сайтов Беларусь',
  'создание сайтов Беларусь',
]

export const SERVICE_PATHS = [
  'web-development',
  'mobile-development',
  'pwa-development',
  'seo',
  'geo-promotion',
  'technical-support',
  'ui-ux',
  'crm',
  'erp',
] as const

export type ServicePath = (typeof SERVICE_PATHS)[number]

export const LEGAL_PATHS = [
  'privacy-policy',
  'cookie-policy',
  'terms-of-use',
] as const

export function buildCanonical(path: string): string {
  const base = SITE_URL.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

export function buildOgImageUrl(path?: string): string {
  return path ? `${SITE_URL}${path}` : DEFAULT_OG_IMAGE_URL
}

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  keywords?: string | string[]
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  images?: string[]
  noIndex?: boolean
  /** Не добавлять суффикс «| APSOD» из layout template */
  absoluteTitle?: boolean
  /** Если задан — canonical/OG url указывают сюда (для зеркальных посадочных) */
  canonicalPath?: string
}

const DEFAULT_INDEX_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

/** Приоритеты страниц услуг в sitemap.xml */
export const SERVICE_SITEMAP_PRIORITY: Partial<Record<ServicePath, number>> = {
  'web-development': 0.92,
  seo: 0.91,
  'geo-promotion': 0.9,
  'mobile-development': 0.89,
  'pwa-development': 0.88,
  'technical-support': 0.87,
  'ui-ux': 0.86,
  crm: 0.85,
  erp: 0.85,
}

/** Парсинг даты вида «3 февраля 2026» в ISO 8601 */
export function parseRussianDateToIso(dateStr: string): string {
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
    const parsed = new Date(`${year}-${month}-${day}T12:00:00.000Z`)
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString()
  }
  return new Date().toISOString()
}

/** Объединяет несколько JSON-LD-схем в @graph */
export function generateGraphSchema(schemas: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}

export function getOrganizationId() {
  return `${SITE_URL.replace(/\/$/, '')}/#organization`
}

export function getWebSiteId() {
  return `${SITE_URL.replace(/\/$/, '')}/#website`
}

/** Единый генератор metadata для страниц (SERP-сниппет) */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    images,
    noIndex,
    absoluteTitle,
    canonicalPath,
  } = options

  const snippetTitle = clipTitle(title)
  const snippetDescription = clipDescription(description)
  const canonical = buildCanonical(canonicalPath || path)
  const ogImages = (images?.length ? images : [DEFAULT_OG_IMAGE_URL]).map((url) => ({
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    width: 1200,
    height: 630,
    alt: snippetTitle,
  }))

  const keywordList = Array.isArray(keywords)
    ? keywords
    : keywords
      ? keywords.split(',').map((k) => k.trim())
      : MAIN_KEYWORDS

  const publishedIso = publishedTime?.includes('T')
    ? publishedTime
    : publishedTime
      ? parseRussianDateToIso(publishedTime)
      : undefined

  const ogTitle = absoluteTitle ? snippetTitle : `${snippetTitle} | ${SITE_NAME}`

  return {
    title: absoluteTitle ? { absolute: snippetTitle } : snippetTitle,
    description: snippetDescription,
    keywords: keywordList,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : DEFAULT_INDEX_ROBOTS,
    openGraph: {
      title: ogTitle,
      description: snippetDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: ogType,
      images: ogImages,
      ...(publishedIso ? { publishedTime: publishedIso } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: snippetDescription,
      images: ogImages.map((i) => i.url),
    },
  }
}

/** Metadata из реестра сниппетов PAGE_SNIPPETS */
export function buildSnippetMetadata(
  path: string,
  overrides?: Partial<PageMetadataOptions> & { snippet?: PageSnippet }
): Metadata {
  const fromRegistry = getPageSnippet(path)
  const snippet = overrides?.snippet ?? fromRegistry
  if (!snippet && !overrides?.title) {
    throw new Error(`No SERP snippet registered for path: ${path}`)
  }

  return buildPageMetadata({
    title: overrides?.title ?? snippet!.title,
    description: overrides?.description ?? snippet!.description,
    path,
    keywords: overrides?.keywords ?? snippet?.keywords,
    absoluteTitle: overrides?.absoluteTitle ?? snippet?.absoluteTitle,
    noIndex: overrides?.noIndex ?? snippet?.noIndex,
    ogType: overrides?.ogType,
    publishedTime: overrides?.publishedTime,
    modifiedTime: overrides?.modifiedTime,
    images: overrides?.images,
    canonicalPath: overrides?.canonicalPath,
  })
}

export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': getOrganizationId(),
    name: SITE_NAME,
    alternateName: ['APSOD IT', 'IT-компания APSOD', 'веб-студия APSOD'],
    legalName: COMPANY.legalName,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    knowsAbout: [
      'IT компания',
      'веб-студия',
      'Web Development',
      'SEO',
      'Mobile Apps',
      'PWA',
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icons/icon-192x192.png`,
      width: 192,
      height: 192,
    },
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: companyPostalAddress(),
    areaServed: [
      { '@type': 'City', name: 'Minsk' },
      { '@type': 'Country', name: 'Belarus' },
    ],
    sameAs: [
      COMPANY.telegramUrl,
      'https://www.facebook.com/share/1GuC7K2jZ1/?mibextid=wwXIfr',
      COMPANY.whatsappUrl,
    ],
  }
}

/** Основные разделы для быстрых ссылок / SiteNavigationElement (короткие имена) */
export const SITE_NAV_LINKS = [
  { name: 'Услуги', path: '/services' },
  { name: 'Цены', path: '/pricing' },
  { name: 'Портфолио', path: '/portfolio' },
  { name: 'Блог', path: '/blog' },
  { name: 'О нас', path: '/about' },
  { name: 'Контакты', path: '/contact' },
] as const

export function generateSiteNavigationSchema() {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL.replace(/\/$/, '')}/#site-navigation`,
    name: 'Основная навигация APSOD',
    numberOfItems: SITE_NAV_LINKS.length,
    itemListElement: SITE_NAV_LINKS.map((link, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: link.name,
      url: buildCanonical(link.path),
    })),
  }
}

export function generateWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': getWebSiteId(),
    name: SITE_NAME,
    alternateName: [
      'APSOD — разработка сайтов в Минске',
      'APSOD — IT-компания и веб-студия',
    ],
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@id': getOrganizationId() },
    inLanguage: 'ru-RU',
    hasPart: { '@id': `${SITE_URL.replace(/\/$/, '')}/#site-navigation` },
  }
}

export function generateLocalBusinessSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL.replace(/\/$/, '')}/#localbusiness`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    priceRange: '$$',
    parentOrganization: { '@id': getOrganizationId() },
    address: companyPostalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Minsk' },
      { '@type': 'Country', name: 'Belarus' },
    ],
    openingHours: COMPANY.openingHours,
    knowsAbout: [
      'Web Development',
      'E-commerce',
      'Mobile Apps',
      'SEO',
      'PWA',
      'CRM',
      'ERP',
    ],
  }
}

/**
 * BreadcrumbList для навигационной цепочки в сниппете Яндекса/Google.
 * У элементов: name + url (Яндекс) и item/@id (Schema.org).
 */
export function generateBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, i) => {
      const url = buildCanonical(crumb.path)
      const isLast = i === items.length - 1
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        // Яндекс учитывает url; Schema.org — item
        url,
        ...(isLast
          ? { item: { '@id': url, name: crumb.name } }
          : { item: url }),
      }
    }),
  }
}

export function generateServiceSchema(options: {
  name: string
  description: string
  path: string
}) {
  return {
    '@type': 'Service',
    name: options.name,
    description: options.description,
    provider: { '@id': getOrganizationId() },
    areaServed: [
      { '@type': 'Country', name: 'Belarus' },
      { '@type': 'Country', name: 'Russia' },
    ],
    url: buildCanonical(options.path),
  }
}

export function generateCityLandingSchema(options: {
  cityName: string
  citySlug: string
  description: string
  countryPath: 'belarus' | 'russia'
  countryName?: string
  /** Переопределение name страницы (для Витебска — «Создание сайтов…») */
  pageName?: string
}) {
  const serviceLabel =
    options.pageName ?? `Разработка сайтов ${options.cityName}`
  return {
    '@type': 'WebPage',
    name: `${serviceLabel} — ${SITE_NAME}`,
    description: options.description,
    url: buildCanonical(`/${options.countryPath}/${options.citySlug}`),
    inLanguage: 'ru-RU',
    isPartOf: { '@id': getWebSiteId() },
    about: {
      '@type': 'Service',
      name: serviceLabel,
      areaServed: [
        { '@type': 'City', name: options.cityName },
        { '@type': 'Country', name: options.countryName ?? (options.countryPath === 'russia' ? 'Russia' : 'Belarus') },
      ],
      provider: { '@id': getOrganizationId() },
    },
  }
}

export function generateArticleSchema(options: {
  title: string
  description: string
  slug: string
  author: string
  date: string
  image?: string
}) {
  const url = buildCanonical(`/blog/${options.slug}`)
  const datePublished = parseRussianDateToIso(options.date)
  return {
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    author: { '@type': 'Person', name: options.author },
    datePublished,
    dateModified: datePublished,
    image: options.image ? buildOgImageUrl(options.image) : DEFAULT_OG_IMAGE_URL,
    publisher: { '@id': getOrganizationId() },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'ru-RU',
    isPartOf: { '@id': getWebSiteId() },
  }
}

export function generateCreativeWorkSchema(options: {
  title: string
  description: string
  slug: string
  image?: string
  location?: string
  year?: string
}) {
  return {
    '@type': 'CreativeWork',
    name: options.title,
    description: options.description,
    url: buildCanonical(`/portfolio/${options.slug}`),
    image: options.image ? buildOgImageUrl(options.image) : DEFAULT_OG_IMAGE_URL,
    creator: { '@id': getOrganizationId() },
    ...(options.location ? { contentLocation: { '@type': 'Place', name: options.location } } : {}),
    ...(options.year ? { dateCreated: `${options.year}-01-01` } : {}),
  }
}

export function generateContactPageSchema() {
  return {
    '@type': 'ContactPage',
    name: `Контакты — ${SITE_NAME}`,
    url: buildCanonical('/contact'),
    description: 'Связаться с APSOD: бриф, разработка сайтов, SEO. Офис в Минске, ул. Куйбышева, 35.',
    mainEntity: { '@id': getOrganizationId() },
    isPartOf: { '@id': getWebSiteId() },
  }
}

export function generateItemListSchema(options: {
  name: string
  items: { name: string; url: string; description?: string }[]
}) {
  return {
    '@type': 'ItemList',
    name: options.name,
    numberOfItems: options.items.length,
    itemListElement: options.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : buildCanonical(item.url),
      ...(item.description ? { description: item.description } : {}),
    })),
  }
}

export function generateFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/** SEO-данные для страниц услуг (из PAGE_SNIPPETS) */
function serviceSnippet(service: ServicePath) {
  return (
    getPageSnippet(`/services/${service}`) ?? {
      title: service,
      description: SITE_DESCRIPTION,
      keywords: MAIN_KEYWORDS,
    }
  )
}

export const SERVICE_SEO: Record<
  ServicePath,
  { title: string; description: string; keywords: string[] }
> = {
  'web-development': {
    title: serviceSnippet('web-development').title,
    description: serviceSnippet('web-development').description,
    keywords: [...(serviceSnippet('web-development').keywords ?? [])],
  },
  'mobile-development': {
    title: serviceSnippet('mobile-development').title,
    description: serviceSnippet('mobile-development').description,
    keywords: [...(serviceSnippet('mobile-development').keywords ?? [])],
  },
  'pwa-development': {
    title: serviceSnippet('pwa-development').title,
    description: serviceSnippet('pwa-development').description,
    keywords: [...(serviceSnippet('pwa-development').keywords ?? [])],
  },
  seo: {
    title: serviceSnippet('seo').title,
    description: serviceSnippet('seo').description,
    keywords: [...(serviceSnippet('seo').keywords ?? [])],
  },
  'geo-promotion': {
    title: serviceSnippet('geo-promotion').title,
    description: serviceSnippet('geo-promotion').description,
    keywords: [...(serviceSnippet('geo-promotion').keywords ?? [])],
  },
  'technical-support': {
    title: serviceSnippet('technical-support').title,
    description: serviceSnippet('technical-support').description,
    keywords: [...(serviceSnippet('technical-support').keywords ?? [])],
  },
  'ui-ux': {
    title: serviceSnippet('ui-ux').title,
    description: serviceSnippet('ui-ux').description,
    keywords: [...(serviceSnippet('ui-ux').keywords ?? [])],
  },
  crm: {
    title: serviceSnippet('crm').title,
    description: serviceSnippet('crm').description,
    keywords: [...(serviceSnippet('crm').keywords ?? [])],
  },
  erp: {
    title: serviceSnippet('erp').title,
    description: serviceSnippet('erp').description,
    keywords: [...(serviceSnippet('erp').keywords ?? [])],
  },
}

export function buildServiceMetadata(service: ServicePath): Metadata {
  return buildSnippetMetadata(`/services/${service}`)
}
