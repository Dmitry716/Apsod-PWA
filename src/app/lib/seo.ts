import type { Metadata } from 'next'

/** Базовые данные сайта для SEO, Schema.org и Open Graph */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apsod.com'
export const SITE_NAME = 'APSOD'
export const SITE_LOCALE = 'ru_RU' as const

export const COMPANY = {
  legalName: 'APSOD',
  phone: '+375 (44) 577-77-24',
  email: 'karelinseo@gmail.com',
  address: {
    street: 'ул. 33 Армии, 7',
    city: 'Витебск',
    region: 'Витебская область',
    postalCode: '210000',
    country: 'BY',
    countryName: 'Беларусь',
  },
  geo: { lat: 55.1848, lng: 30.2016 },
  openingHours: 'Mo-Fr 09:00-18:00',
}

/** Полный адрес ИП для legal, футера и контактов */
export const COMPANY_ADDRESS_DISPLAY = 'г. Витебск, ул. 33 Армии, 7'

export const COMPANY_REMOTE_NOTE =
  'ИП зарегистрирован в Витебске. Проекты ведём удалённо по всей Беларуси и России.'

export const SITE_DESCRIPTION =
  'IT-компания APSOD: разработка сайтов, интернет-магазинов и мобильных приложений в Беларуси и России. SEO в Яндексе и Google. База в Витебске, работаем по всей РБ и регионам России.'

export const SITE_OG_IMAGE = '/og-image.jpg'
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${SITE_OG_IMAGE}`

/** Ключевые запросы: Беларусь + Россия (Москва) + услуги */
export const MAIN_KEYWORDS = [
  'разработка сайтов Москва',
  'создание сайта Москва',
  'создание сайтов Москва',
  'разработка интернет-магазина Москва',
  'SEO продвижение Москва',
  'SEO Яндекс Москва',
  'SEO Google Москва',
  'разработка мобильных приложений Москва',
  'разработка сайтов Россия',
  'IT компания Москва',
  'интернет-магазин Москва',
  'веб-разработка Московская область',
  'разработка сайтов Беларусь',
  'создание сайтов Беларусь',
  'создание сайтов Витебск',
  'разработка сайтов Витебск',
  'создание сайтов Минск',
  'разработка сайтов Минск',
  'разработка интернет-магазина Минск',
  'SEO продвижение Минск',
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
  /** Не добавлять суффикс «| APSOD» из layout template */
  absoluteTitle?: boolean
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
    absoluteTitle,
  } = options

  const canonical = buildCanonical(path)
  const ogImages = (images?.length ? images : [DEFAULT_OG_IMAGE_URL]).map((url) => ({
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    width: 1200,
    height: 630,
    alt: title,
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

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywordList,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : DEFAULT_INDEX_ROBOTS,
    openGraph: {
      title: absoluteTitle ? title : `${title} | ${SITE_NAME}`,
      description,
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
      title: absoluteTitle ? title : `${title} | ${SITE_NAME}`,
      description,
      images: ogImages.map((i) => i.url),
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': getOrganizationId(),
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icons/icon-192x192.png`,
      width: 192,
      height: 192,
    },
    email: COMPANY.email,
    telephone: COMPANY.phone,
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
    sameAs: [
      'https://t.me/DMITRYJS',
      'https://www.facebook.com/share/1GuC7K2jZ1/?mibextid=wwXIfr',
      'https://wa.me/375445777724',
    ],
  }
}

export function generateWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': getWebSiteId(),
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@id': getOrganizationId() },
    inLanguage: 'ru-RU',
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
}) {
  return {
    '@type': 'WebPage',
    name: `Разработка сайтов ${options.cityName} — ${SITE_NAME}`,
    description: options.description,
    url: buildCanonical(`/${options.countryPath}/${options.citySlug}`),
    inLanguage: 'ru-RU',
    isPartOf: { '@id': getWebSiteId() },
    about: {
      '@type': 'Service',
      name: `Разработка сайтов ${options.cityName}`,
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
    description: 'Связаться с APSOD: разработка сайтов, SEO и мобильных приложений в Беларуси и России.',
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

/** SEO-данные для страниц услуг */
export const SERVICE_SEO: Record<
  ServicePath,
  { title: string; description: string; keywords: string[] }
> = {
  'web-development': {
    title: 'Разработка сайтов и интернет-магазинов — Беларусь и Россия',
    description:
      'Разработка сайтов на Next.js и React по enterprise-процессу: Discovery, экспертиза, архитектура, Agile, QA и DevOps. Витебск, Москва, МО, Минск и регионы РФ/РБ.',
    keywords: [
      'разработка сайтов Москва',
      'создание сайтов Москва',
      'разработка сайтов Беларусь',
      'создание сайтов Минск',
      'создание сайта Москва',
      'интернет-магазин Москва',
      'разработка интернет-магазина Минск',
      'сайт под ключ',
      'next.js',
    ],
  },
  'mobile-development': {
    title: 'Разработка мобильных приложений — РФ и РБ',
    description:
      'Мобильные приложения iOS и Android: Discovery, техническая экспертиза, Agile-разработка, QA и публикация в App Store / Google Play. Москва, регионы РФ и Беларусь.',
    keywords: [
      'разработка мобильных приложений Москва',
      'создание мобильного приложения Москва',
      'мобильные приложения Москва',
      'разработка приложений Россия',
      'разработка мобильных приложений Беларусь',
      'react native',
      'ios android',
    ],
  },
  'pwa-development': {
    title: 'PWA-разработка для бизнеса в РФ и Беларуси',
    description:
      'Progressive Web Apps: офлайн, push-уведомления, установка на экран. Для компаний в Москве, регионах РФ и РБ.',
    keywords: ['PWA Москва', 'PWA Россия', 'PWA разработка Беларусь', 'progressive web app', 'push уведомления'],
  },
  seo: {
    title: 'SEO-продвижение в Яндексе и Google — Москва, Россия',
    description:
      'SEO-продвижение сайтов: Яндекс и Google. Москва — приоритетный рынок, также Беларусь и регионы РФ. Аудит, контент, техническое SEO.',
    keywords: [
      'SEO продвижение Москва',
      'SEO Яндекс Москва',
      'SEO Google Москва',
      'продвижение сайта Москва',
      'SEO продвижение Россия',
      'SEO продвижение Беларусь',
      'SEO продвижение Минск',
      'SEO Яндекс',
      'продвижение Google',
    ],
  },
  'technical-support': {
    title: 'Техническая поддержка сайтов — Россия и Беларусь',
    description:
      'Техподдержка сайтов на React, Next.js, Node.js, MongoDB и PostgreSQL. Обновления, безопасность, мониторинг, резервное копирование.',
    keywords: [
      'техническая поддержка сайтов',
      'техподдержка сайта Москва',
      'сопровождение сайта',
      'поддержка Next.js',
      'PostgreSQL поддержка',
      'MERN поддержка',
    ],
  },
  'ui-ux': {
    title: 'UI/UX дизайн сайтов и приложений',
    description:
      'UI/UX дизайн для сайтов и мобильных приложений. Прототипы и дизайн-системы для рынков РФ и Беларуси.',
    keywords: ['UI UX дизайн', 'дизайн сайта Москва', 'дизайн сайта Минск', 'прототипирование'],
  },
  crm: {
    title: 'Разработка и внедрение CRM — Россия и Беларусь',
    description:
      'CRM-системы для бизнеса в Москве, регионах РФ и Беларуси: автоматизация продаж, интеграции, отчёты.',
    keywords: ['CRM Москва', 'CRM Россия', 'CRM Беларусь', 'внедрение CRM', 'автоматизация продаж'],
  },
  erp: {
    title: 'ERP-системы для бизнеса — РФ и РБ',
    description:
      'Разработка и внедрение ERP: учёт, склад, производство, финансы. Решения для компаний в России и Беларуси.',
    keywords: ['ERP Россия', 'ERP Москва', 'ERP Беларусь', 'автоматизация бизнеса', 'учётная система'],
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
