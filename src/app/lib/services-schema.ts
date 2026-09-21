export type ServiceSchemaItem = {
  title: string
  description: string
  link: string
}

const SERVICES_FOR_SCHEMA = [
  {
    title: 'Веб-разработка',
    description:
      'Сайты от брифа до запуска: лендинг, корпоративный сайт и интернет-магазин. Исследование, архитектура, запуск и SEO-база.',
    link: '/services/web-development',
    children: [
      { title: 'Лендинг', link: '/services/landing-page' },
      { title: 'Корпоративный сайт', link: '/services/corporate-sites' },
      { title: 'Интернет-магазин', link: '/services/ecommerce' },
    ],
  },
  {
    title: 'Мобильные приложения',
    description:
      'iOS и Android: натив или кроссплатформа — от MVP до публикации в App Store и Google Play.',
    link: '/services/mobile-development',
    children: [
      { title: 'iOS', link: '/services/ios-apps' },
      { title: 'Android', link: '/services/android-apps' },
    ],
  },
  {
    title: 'PWA',
    description: 'Прогрессивные веб-приложения: установка с сайта, офлайн-сценарии и push.',
    link: '/services/pwa-development',
  },
  {
    title: 'UI/UX дизайн',
    description: 'Исследование, прототипы и дизайн-система под сценарии пользователя.',
    link: '/services/ui-ux',
  },
  {
    title: 'SEO-продвижение',
    description: 'Яндекс и Google: аудит, семантика, техника, контент и отчётность.',
    link: '/services/seo',
  },
  {
    title: 'GEO в нейросетях',
    description: 'Видимость в ответах AI: структура контента, экспертность и итерации.',
    link: '/services/geo-promotion',
  },
  {
    title: 'Техподдержка',
    description: 'Мониторинг, обновления, резервное копирование и доработки по договору.',
    link: '/services/technical-support',
  },
  {
    title: 'CRM',
    description: 'Внедрение и кастомные CRM для заявок, продаж и коммуникаций.',
    link: '/services/crm',
  },
  {
    title: 'ERP и учёт',
    description: 'Интеграции и кастомные решения для процессов, склада и отчётности.',
    link: '/services/erp',
  },
] as const

/** RU titles for ItemList schema (stable SEO surface) */
export const SERVICES_SCHEMA_ITEMS: ServiceSchemaItem[] = [
  ...SERVICES_FOR_SCHEMA.map((s) => ({
    title: s.title,
    description: s.description,
    link: s.link,
  })),
  ...SERVICES_FOR_SCHEMA.flatMap((s) =>
    ('children' in s ? s.children : []).map((c) => ({
      title: c.title,
      description: `${c.title} — направление APSOD`,
      link: c.link,
    }))
  ),
]
