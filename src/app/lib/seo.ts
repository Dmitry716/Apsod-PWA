import type { Metadata } from 'next'

/** Базовые данные сайта для SEO, Schema.org и Open Graph */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apsod.com'
export const SITE_NAME = 'APSOD'
export const SITE_LOCALE = 'ru_RU' as const

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
  'IT-компания APSOD: разработка сайтов, интернет-магазинов и мобильных приложений в Беларуси и России. SEO в Яндексе и Google. Основной фокус РФ — Москва и МО. Работаем по всей РБ и регионам России.'

export const SITE_OG_IMAGE = '/og-image.jpg'
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${SITE_OG_IMAGE}`

/** Ключевые запросы: Беларусь + Россия (Москва) + услуги */
export const MAIN_KEYWORDS = [
  'разработка сайтов Москва',
  'создание сайта Москва',
  'SEO продвижение Москва',
  'SEO Яндекс Москва',
  'разработка сайтов Россия',
  'IT компания Москва',
  'интернет-магазин Москва',
  'веб-разработка Московская область',
  'разработка сайтов Беларусь',
  'создание сайтов Минск',
  'разработка сайтов Минск',
  'IT компания Беларусь',
  'интернет-магазин Беларусь',
  'мобильные приложения',
  'SEO продвижение Яндекс',
  'SEO продвижение Google',
  'разработка сайтов Санкт-Петербург',
  'PWA разработка',
  'техническая поддержка сайтов',
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
    areaServed: [
      { '@type': 'Country', name: 'Belarus' },
      { '@type': 'Country', name: 'Russia' },
    ],
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
    inLanguage: 'ru-RU',
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
      { '@type': 'Country', name: 'Russia' },
      { '@type': 'City', name: 'Moscow' },
      { '@type': 'City', name: 'Minsk' },
      { '@type': 'City', name: 'Saint Petersburg' },
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
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Разработка сайтов ${options.cityName} — ${SITE_NAME}`,
    description: options.description,
    url: buildCanonical(`/${options.countryPath}/${options.citySlug}`),
    inLanguage: 'ru-RU',
    about: {
      '@type': 'Service',
      name: `Разработка сайтов ${options.cityName}`,
      areaServed: [
        { '@type': 'City', name: options.cityName },
        { '@type': 'Country', name: options.countryName ?? (options.countryPath === 'russia' ? 'Russia' : 'Belarus') },
      ],
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
    title: 'Разработка сайтов и интернет-магазинов — Беларусь и Россия',
    description:
      'Разработка сайтов и интернет-магазинов на Next.js и React. Москва, МО, Минск и регионы РФ/РБ. Корпоративные сайты и e-commerce под ключ.',
    keywords: [
      'разработка сайтов Москва',
      'разработка сайтов Беларусь',
      'создание сайта Москва',
      'интернет-магазин',
      'next.js',
    ],
  },
  'mobile-development': {
    title: 'Разработка мобильных приложений — РФ и РБ',
    description:
      'Мобильные приложения iOS и Android для бизнеса в России и Беларуси. Москва, React Native, нативные приложения, CRM-интеграции.',
    keywords: [
      'мобильные приложения Москва',
      'разработка приложений Россия',
      'react native',
      'ios android',
    ],
  },
  'pwa-development': {
    title: 'PWA-разработка для бизнеса в РФ и Беларуси',
    description:
      'Progressive Web Apps: офлайн, push-уведомления, установка на экран. Для компаний в Москве, регионах РФ и РБ.',
    keywords: ['PWA Москва', 'PWA Россия', 'progressive web app', 'push уведомления'],
  },
  seo: {
    title: 'SEO-продвижение в Яндексе и Google — Москва, Россия',
    description:
      'SEO-продвижение сайтов: Яндекс и Google. Москва — приоритетный рынок, также Беларусь и регионы РФ. Аудит, контент, техническое SEO.',
    keywords: [
      'SEO Москва',
      'SEO продвижение Россия',
      'SEO Яндекс',
      'продвижение Google',
      'SEO Беларусь',
    ],
  },
  'technical-support': {
    title: 'Техническая поддержка сайтов — Россия и Беларусь',
    description:
      'Техподдержка сайтов на React, Next.js, Node.js, MongoDB и PostgreSQL. Обновления, безопасность, мониторинг, резервное копирование. Без WordPress и конструкторов.',
    keywords: ['техподдержка сайта', 'поддержка Next.js', 'PostgreSQL поддержка', 'MERN поддержка', 'сопровождение сайта Москва'],
  },
  'ui-ux': {
    title: 'UI/UX дизайн сайтов и приложений',
    description:
      'UI/UX дизайн для сайтов и мобильных приложений. Прототипы и дизайн-системы для рынков РФ и Беларуси.',
    keywords: ['UI UX дизайн', 'дизайн сайта Москва', 'прототипирование'],
  },
  crm: {
    title: 'Разработка и внедрение CRM — Россия и Беларусь',
    description:
      'CRM-системы для бизнеса в Москве, регионах РФ и Беларуси: автоматизация продаж, интеграции, отчёты.',
    keywords: ['CRM Москва', 'CRM Россия', 'внедрение CRM', 'автоматизация продаж'],
  },
  erp: {
    title: 'ERP-системы для бизнеса — РФ и РБ',
    description:
      'Разработка и внедрение ERP: учёт, склад, производство, финансы. Решения для компаний в России и Беларуси.',
    keywords: ['ERP Россия', 'ERP Москва', 'автоматизация бизнеса', 'учётная система'],
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
