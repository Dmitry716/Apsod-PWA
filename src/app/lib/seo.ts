import type { Metadata } from 'next'

/** Базовые данные сайта для SEO, Schema.org и Open Graph */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apsod.com'
export const SITE_NAME = 'APSOD'
export const SITE_LOCALE = 'ru_BY' as const

export const COMPANY = {
  legalName: 'APSOD',
  phone: '+375 (29) 000-00-00',
  email: 'karelinseo@gmail.com',
  address: {
    street: 'ул. Фрунзе, 9',
    city: 'Минск',
    region: 'Минская область',
    postalCode: '220034',
    country: 'BY',
    countryName: 'Беларусь',
  },
  geo: { lat: 53.9045, lng: 27.5615 },
  openingHours: 'Mo-Fr 09:00-18:00',
}

export const SITE_DESCRIPTION =
  'IT-компания APSOD: разработка сайтов, интернет-магазинов и мобильных приложений в Беларуси. SEO-продвижение в Google и Яндексе, PWA, CRM/ERP и техподдержка. Работаем по всей РБ — Минск, Брест, Гомель, Витебск, Гродно, Могилёв.'

export const SITE_OG_IMAGE = '/og-image.jpg'
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${SITE_OG_IMAGE}`

/** Ключевые запросы: Беларусь + услуги */
export const MAIN_KEYWORDS = [
  'разработка сайтов Беларусь',
  'создание сайтов Минск',
  'разработка сайтов Минск',
  'IT компания Беларусь',
  'интернет-магазин Беларусь',
  'мобильные приложения Беларусь',
  'SEO продвижение Беларусь',
  'SEO продвижение Минск',
  'разработка сайтов Брест',
  'разработка сайтов Гомель',
  'разработка сайтов Витебск',
  'разработка сайтов Гродно',
  'разработка сайтов Могилёв',
  'техническая поддержка сайтов',
  'PWA разработка',
  'веб-разработка Беларусь',
  'продвижение сайтов Яндекс',
  'создание интернет-магазина BYN',
]

export const SERVICE_PATHS = [
  'web-development',
  'mobile-development',
  'pwa-development',
  'seo',
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
}

/** Единый генератор metadata для страниц */
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
  } = options

  const canonical = buildCanonical(path)
  const ogImages = (images?.length ? images : [DEFAULT_OG_IMAGE_URL]).map((url) => ({
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    width: 1200,
    height: 630,
    alt: SITE_NAME,
  }))

  const keywordList = Array.isArray(keywords)
    ? keywords
    : keywords
      ? keywords.split(',').map((k) => k.trim())
      : MAIN_KEYWORDS

  return {
    title,
    description,
    keywords: keywordList,
    alternates: { canonical },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: ogType,
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ogImages.map((i) => i.url),
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/icons/icon-192x192.png`,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.country,
    },
    areaServed: { '@type': 'Country', name: 'Belarus' },
    sameAs: [] as string[],
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    inLanguage: 'ru-BY',
  }
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    areaServed: [
      { '@type': 'Country', name: 'Belarus' },
      { '@type': 'City', name: 'Minsk' },
      { '@type': 'City', name: 'Brest' },
      { '@type': 'City', name: 'Gomel' },
      { '@type': 'City', name: 'Vitebsk' },
      { '@type': 'City', name: 'Grodno' },
      { '@type': 'City', name: 'Mogilev' },
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

export function generateBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: buildCanonical(item.path),
    })),
  }
}

export function generateServiceSchema(options: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Belarus' },
    url: buildCanonical(options.path),
  }
}

export function generateCityLandingSchema(options: {
  cityName: string
  citySlug: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Разработка сайтов ${options.cityName} — ${SITE_NAME}`,
    description: options.description,
    url: buildCanonical(`/belarus/${options.citySlug}`),
    inLanguage: 'ru-BY',
    about: {
      '@type': 'Service',
      name: `Разработка сайтов ${options.cityName}`,
      areaServed: { '@type': 'City', name: options.cityName },
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
  }
}

/** SEO-данные для страниц услуг */
export const SERVICE_SEO: Record<
  ServicePath,
  { title: string; description: string; keywords: string[] }
> = {
  'web-development': {
    title: 'Разработка сайтов и интернет-магазинов в Беларуси',
    description:
      'Разработка сайтов и интернет-магазинов в Беларуси на Next.js и React. Корпоративные сайты, каталоги, e-commerce под ключ. Минск и вся РБ.',
    keywords: [
      'разработка сайтов Беларусь',
      'создание сайта Минск',
      'интернет-магазин Беларусь',
      'веб-разработка',
      'next.js',
    ],
  },
  'mobile-development': {
    title: 'Разработка мобильных приложений в Беларуси',
    description:
      'Разработка мобильных приложений iOS и Android для бизнеса в Беларуси. React Native, нативные приложения, интеграции с CRM.',
    keywords: [
      'мобильные приложения Беларусь',
      'разработка приложений Минск',
      'react native',
      'ios android',
    ],
  },
  'pwa-development': {
    title: 'PWA-разработка для бизнеса в Беларуси',
    description:
      'Progressive Web Apps для компаний в РБ: работа офлайн, push-уведомления, установка на экран. Альтернатива нативным приложениям.',
    keywords: ['PWA Беларусь', 'progressive web app', 'веб-приложение', 'push уведомления'],
  },
  seo: {
    title: 'SEO-продвижение сайтов в Google и Яндексе — Беларусь',
    description:
      'SEO-продвижение сайтов в Беларуси: Google, Яндекс, локальная выдача по городам РБ. Аудит, контент, техническое SEO.',
    keywords: [
      'SEO Беларусь',
      'продвижение сайтов Минск',
      'SEO Яндекс',
      'продвижение Google',
    ],
  },
  'technical-support': {
    title: 'Техническая поддержка сайтов в Беларуси',
    description:
      'Техподдержка и сопровождение сайтов для бизнеса в РБ: обновления, безопасность, мониторинг, резервное копирование.',
    keywords: ['техподдержка сайта', 'сопровождение сайта Беларусь', 'поддержка сайта'],
  },
  'ui-ux': {
    title: 'UI/UX дизайн сайтов и приложений — Беларусь',
    description:
      'UI/UX дизайн интерфейсов для сайтов и мобильных приложений. Прототипы, дизайн-системы, usability для рынка РБ.',
    keywords: ['UI UX дизайн', 'дизайн сайта Беларусь', 'прототипирование'],
  },
  crm: {
    title: 'Разработка и внедрение CRM в Беларуси',
    description:
      'CRM-системы под задачи бизнеса в Беларуси: автоматизация продаж, интеграции, отчёты, мобильный доступ.',
    keywords: ['CRM Беларусь', 'внедрение CRM', 'автоматизация продаж'],
  },
  erp: {
    title: 'ERP-системы для бизнеса в Беларуси',
    description:
      'Разработка и внедрение ERP: учёт, склад, производство, финансы. Решения для компаний в РБ.',
    keywords: ['ERP Беларусь', 'автоматизация бизнеса', 'учётная система'],
  },
}

export function buildServiceMetadata(service: ServicePath): Metadata {
  const data = SERVICE_SEO[service]
  return buildPageMetadata({
    title: data.title,
    description: data.description,
    path: `/services/${service}`,
    keywords: data.keywords,
  })
}
