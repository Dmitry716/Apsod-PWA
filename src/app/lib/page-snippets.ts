/**
 * SERP-сниппеты всех публичных страниц APSOD.
 * Title ≈ до 60–65 символов, description ≈ 140–160 (Яндекс/Google).
 */

export type PageSnippet = {
  title: string
  description: string
  keywords?: string[]
  /** Не добавлять «| APSOD» через template layout */
  absoluteTitle?: boolean
  noIndex?: boolean
}

const GEO_KW = [
  'разработка сайтов Минск',
  'разработка сайтов Москва',
  'разработка сайтов Витебск',
  'SEO продвижение',
  'мобильные приложения',
]

/** Статические маршруты → сниппет */
export const PAGE_SNIPPETS: Record<string, PageSnippet> = {
  '/': {
    title: 'APSOD — разработка сайтов, SEO, мобильные приложения',
    description:
      'Создание сайта с нуля, SEO в Яндексе и Google, мобильные приложения. Минск, Витебск, Москва. Уникальный код, без конструкторов. Смета за 1 день.',
    absoluteTitle: true,
    keywords: GEO_KW,
  },
  '/about': {
    title: 'О компании APSOD — digital-команда',
    description:
      'APSOD: организация бизнеса в интернете, уникальная разработка и SEO. 15+ лет, 350+ кейсов. ИП в Витебске, проекты по РБ, РФ и миру.',
    keywords: ['APSOD', 'IT компания Беларусь', 'о компании APSOD'],
  },
  '/contact': {
    title: 'Контакты — заказать сайт и SEO',
    description:
      'Бриф за 1 минуту: цель, бюджет, сроки. Telegram, WhatsApp, телефон. Разработка сайтов и SEO — Минск, Витебск, Москва, удалённо.',
    keywords: ['контакты APSOD', 'заказать сайт', 'заказать SEO'],
  },
  '/pricing': {
    title: 'Цены на сайт и SEO — от 8 000 Б̶ / 240 000 ₽',
    description:
      'Лендинг от 8 000 Б̶ / 240 000 ₽, корпоративный сайт от 15 000 Б̶ / 450 000 ₽, магазин от 23 000 Б̶ / 690 000 ₽. SEO от 800 Б̶ / 24 000 ₽/мес. Минск, Витебск, Москва.',
    keywords: ['стоимость сайта', 'цена разработки сайта', 'стоимость SEO'],
  },
  '/portfolio': {
    title: 'Портфолио — кейсы разработки сайтов',
    description:
      'Реальные проекты APSOD: сайты и приложения для бизнеса. Amba Detail, NEXTON, Maxximum, Динамо-Витебск и другие. Смотрите результаты.',
    keywords: ['портфолио APSOD', 'кейсы разработки сайтов'],
  },
  '/blog': {
    title: 'Блог — разработка сайтов и SEO',
    description:
      'Статьи APSOD: создание сайтов, SEO в Яндексе и Google, PWA, мобильные приложения и поддержка для бизнеса в Беларуси и России.',
    keywords: ['блог веб-разработки', 'SEO статьи'],
  },
  '/services': {
    title: 'Услуги — сайты, SEO, приложения',
    description:
      'Разработка сайтов и интернет-магазинов, SEO-продвижение, мобильные приложения, PWA, CRM, техподдержка. Без конструкторов. Полный digital-цикл.',
    keywords: ['услуги веб-студии', 'разработка сайтов', 'SEO услуги'],
  },
  '/belarus': {
    title: 'Разработка сайтов Беларусь — Минск, Витебск',
    description:
      'Создание сайтов в Беларуси: Минск и Витебск, удалённо по РБ. Интернет-магазины, SEO в Яндексе и Google, мобильные приложения.',
    keywords: ['разработка сайтов Беларусь', 'создание сайтов Беларусь'],
  },
  '/russia': {
    title: 'Разработка сайтов Москва — и по России',
    description:
      'Создание сайтов в Москве и удалённо по РФ. Интернет-магазины, SEO продвижение в Яндексе и Google, мобильные приложения.',
    keywords: ['разработка сайтов Москва', 'создание сайта Москва'],
  },
  '/services/web-development': {
    title: 'Разработка сайтов — Минск, Витебск, Москва',
    description:
      'Создание сайта с нуля: лендинг, корпоративный сайт, интернет-магазин. Уникальный код Next.js. Смета после брифа. Без конструкторов.',
    keywords: [
      'разработка сайтов',
      'создание сайта',
      'разработка сайтов Минск',
      'разработка сайтов Москва',
    ],
  },
  '/services/seo': {
    title: 'SEO продвижение сайта — Яндекс и Google',
    description:
      'Продвижение сайта в Яндексе и Google: аудит, семантика, контент. Москва, Минск, Витебск. Стоимость SEO — после аудита.',
    keywords: ['SEO продвижение', 'продвижение сайта', 'SEO Яндекс', 'SEO Google'],
  },
  '/services/geo-promotion': {
    title: 'GEO-продвижение сайта и бренда в нейросетях',
    description:
      'GEO: AI-видимость в ChatGPT, Google AI, Алисе. Аудит, факт-матрица, тарифы Базовый / Стандарт / Бизнес, ежемесячный мониторинг.',
    keywords: [
      'GEO продвижение',
      'GEO в нейросетях',
      'Generative Engine Optimization',
      'AI-видимость',
      'продвижение в ChatGPT',
    ],
  },
  '/services/mobile-development': {
    title: 'Разработка мобильных приложений',
    description:
      'Создание мобильного приложения iOS и Android. React Native, Flutter. Москва, Минск, Беларусь. Смета после Discovery.',
    keywords: [
      'разработка мобильных приложений',
      'создание мобильного приложения',
    ],
  },
  '/services/pwa-development': {
    title: 'PWA-разработка — веб-приложения',
    description:
      'Progressive Web Apps: офлайн, push, установка на экран. Для бизнеса в Москве, регионах РФ и Беларуси. Без магазинов приложений.',
    keywords: ['PWA разработка', 'progressive web app'],
  },
  '/services/technical-support': {
    title: 'Техподдержка сайтов — РФ и Беларусь',
    description:
      'Сопровождение сайтов на Next.js и Node.js: обновления, мониторинг, бэкапы, доработки. Договор и SLA под ваш проект.',
    keywords: ['техническая поддержка сайтов', 'сопровождение сайта'],
  },
  '/services/ui-ux': {
    title: 'UI/UX дизайн сайтов и приложений',
    description:
      'Прототипы, интерфейсы и дизайн-системы для сайтов и мобильных приложений. Фокус на конверсии и удобстве. РБ и РФ.',
    keywords: ['UI UX дизайн', 'дизайн сайта', 'прототипирование'],
  },
  '/services/crm': {
    title: 'CRM для бизнеса — разработка и внедрение',
    description:
      'CRM под продажи: интеграции с сайтом и мессенджерами, воронки, отчёты. Москва, Беларусь. Внедрение и кастомная разработка.',
    keywords: ['CRM', 'внедрение CRM', 'автоматизация продаж'],
  },
  '/services/erp': {
    title: 'ERP-системы — учёт и автоматизация',
    description:
      'Разработка и внедрение ERP: склад, производство, финансы. Решения для компаний в России и Беларуси под ваши процессы.',
    keywords: ['ERP', 'автоматизация бизнеса', 'учётная система'],
  },
  '/legal/privacy-policy': {
    title: 'Политика конфиденциальности',
    description:
      'Политика конфиденциальности APSOD: обработка персональных данных по Закону РБ № 99-З. Права пользователей сайта apsod.com.',
    keywords: ['политика конфиденциальности', 'персональные данные'],
  },
  '/legal/cookie-policy': {
    title: 'Политика cookie',
    description:
      'Как APSOD использует cookie и аналогичные технологии на apsod.com. Управление согласием и параметры хранения.',
    keywords: ['политика cookie', 'cookies'],
  },
  '/legal/terms-of-use': {
    title: 'Пользовательское соглашение',
    description:
      'Условия использования сайта apsod.com и услуг APSOD. Права и обязанности пользователей и оператора.',
    keywords: ['пользовательское соглашение', 'условия использования'],
  },
  '/components/privacy': {
    title: 'Политика конфиденциальности',
    description:
      'Политика конфиденциальности и обработка персональных данных пользователей сайта APSOD.',
    keywords: ['политика конфиденциальности'],
    noIndex: true,
  },
  '/components/cookie-policy': {
    title: 'Политика cookie',
    description: 'Правила использования файлов cookie на сайте APSOD (apsod.com).',
    keywords: ['политика cookie'],
    noIndex: true,
  },
  '/404': {
    title: 'Страница не найдена',
    description:
      'Запрашиваемая страница не найдена. Перейдите на главную или в раздел услуг APSOD.',
    noIndex: true,
  },
}

export function getPageSnippet(path: string): PageSnippet | undefined {
  const normalized = path.replace(/\/+$/, '') || '/'
  return PAGE_SNIPPETS[normalized] ?? PAGE_SNIPPETS[path]
}

/** Сниппет гео-страницы */
export function cityPageSnippet(
  cityName: string,
  nameIn: string,
  region: string
): PageSnippet {
  const title = `Разработка сайтов ${nameIn} — сайт, SEO, приложения`
  const description = `Создание сайта ${nameIn}, интернет-магазин, SEO в Яндексе и Google, мобильные приложения. APSOD — IT для бизнеса в ${region}. Смета онлайн.`
  return {
    title: clipTitle(title),
    description: clipDescription(description),
    keywords: [
      `разработка сайтов ${cityName}`,
      `создание сайта ${cityName}`,
      `SEO продвижение ${cityName}`,
      `заказать сайт ${cityName}`,
    ],
  }
}

/** Сниппет кейса портфолио */
export function portfolioCaseSnippet(
  projectTitle: string,
  description: string
): PageSnippet {
  return {
    title: clipTitle(`${projectTitle} — кейс APSOD`),
    description: clipDescription(
      description || `Кейс APSOD: ${projectTitle}. Задача, решение и результат уникальной разработки.`
    ),
    keywords: [projectTitle, 'портфолио APSOD', 'кейс разработки'],
  }
}

/** Сниппет статьи блога */
export function blogPostSnippet(
  postTitle: string,
  excerpt: string
): PageSnippet {
  return {
    title: clipTitle(postTitle),
    description: clipDescription(excerpt),
    keywords: ['блог APSOD', 'разработка сайтов', 'SEO'],
  }
}

const TITLE_MAX = 65
const DESC_MAX = 160

export function clipTitle(text: string): string {
  return softClip(text, TITLE_MAX)
}

export function clipDescription(text: string): string {
  return softClip(text, DESC_MAX)
}

function softClip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > max * 0.55 ? cut.slice(0, lastSpace) : cut
  return `${base.trimEnd()}…`
}

/** Длина сниппета для самопроверки (dev) */
export function getSnippetLengths(snippet: PageSnippet) {
  return {
    title: snippet.title.length,
    description: snippet.description.length,
  }
}
