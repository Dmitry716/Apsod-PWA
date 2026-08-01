/**
 * SERP-сниппеты всех публичных страниц APSOD.
 * Title ≈ до 60–65 символов, description ≈ 140–160 (Яндекс/Google).
 */

import { formatDualPrice } from './currency'

export type PageSnippet = {
  title: string
  description: string
  keywords?: string[]
  /** Не добавлять «| APSOD» через template layout */
  absoluteTitle?: boolean
  noIndex?: boolean
}

/** Статические маршруты → сниппет */
export const PAGE_SNIPPETS: Record<string, PageSnippet> = {
  '/': {
    title: 'APSOD — разработка сайтов в Минске',
    description:
      'Разработка сайтов в Минске на уникальном коде: лендинг, корпоративный, магазин. SEO и GEO. Смета за 1 день.',
    absoluteTitle: true,
    keywords: [
      'разработка сайтов в Минске',
      'разработка сайтов Минск',
      'создание сайтов в Минске',
      'создание сайта Минск',
      'веб-студия Минск',
      'SEO продвижение Минск',
      'IT компания Минск',
    ],
  },
  '/about': {
    title: 'О компании APSOD — software engineering в Минске',
    description:
      'APSOD: software engineering в Минске — сайты, приложения, SEO и GEO на собственном коде. Офис: ул. Куйбышева, 35.',
    absoluteTitle: true,
    keywords: [
      'IT компания',
      'IT-компания',
      'веб-студия',
      'веб студия',
      'IT компания Минск',
      'веб-студия Минск',
      'о компании APSOD',
    ],
  },
  '/contact': {
    title: 'Контакты — сайт, приложение или продвижение',
    description:
      'Бриф за 1 минуту. Адрес: г. Минск, ул. Куйбышева, 35. Telegram @Apsod_IT, WhatsApp, +375445777724.',
    keywords: ['контакты APSOD', 'заказать сайт', 'заказать приложение', 'заказать SEO'],
  },
  '/pricing': {
    title: 'Цены на сайт и SEO — от 8 000 Б̶ / 240 000 ₽',
    description:
      'Лендинг от 8 000 Б̶ / 240 000 ₽, корпоративный сайт от 15 000 Б̶ / 450 000 ₽, магазин от 23 000 Б̶ / 690 000 ₽. SEO от 800 Б̶ / 24 000 ₽/мес. Минск и Беларусь.',
    keywords: ['стоимость сайта', 'цена разработки сайта', 'стоимость SEO'],
  },
  '/ready-sites': {
    title: 'Готовые сайты — разработка с нуля, SEO и GEO',
    description:
      `Купить готовый сайт APSOD: уникальный код с нуля, ребренд, перенос на ваш домен, база SEO и GEO. Собственный код. От ${formatDualPrice(15000, { from: true })}.`,
    absoluteTitle: true,
    keywords: [
      'готовые сайты',
      'купить готовый сайт',
      'разработка сайта с нуля',
      'готовый сайт SEO',
      'готовый сайт GEO',
    ],
  },
  '/portfolio': {
    title: 'Кейсы APSOD — разработка сайтов и приложений',
    description:
      'Case studies APSOD: сайты и приложения для бизнеса. Amba Detail, NEXTON, Maxximum, Динамо-Витебск, BMservice, ArtDetailing.',
    keywords: ['портфолио APSOD', 'кейсы разработки сайтов', 'портфолио веб-студии'],
  },
  '/blog': {
    title: 'Блог — разработка сайтов и SEO',
    description:
      'Статьи APSOD: создание сайтов, SEO в Яндексе и Google, PWA, мобильные приложения и поддержка для бизнеса в Беларуси и России.',
    keywords: ['блог веб-разработки', 'SEO статьи'],
  },
  '/services': {
    title: 'Услуги APSOD — software engineering в Минске',
    description:
      'Услуги APSOD в Минске: веб и мобильная разработка, SEO, GEO, CRM, ERP и сопровождение. Собственный код.',
    keywords: [
      'услуги веб-студии',
      'услуги IT компании',
      'разработка сайтов в Минске',
      'SEO услуги',
    ],
  },
  '/services/web-development': {
    title: 'Разработка сайтов в Минске — уникальный код',
    description:
      'Создание сайта с нуля в Минске: лендинг, корпоративный сайт, интернет-магазин. Уникальный код Next.js. Смета после брифа. Собственный код.',
    keywords: [
      'разработка сайтов в Минске',
      'разработка сайтов Минск',
      'создание сайта Минск',
      'создание сайта',
    ],
  },
  '/services/seo': {
    title: 'SEO продвижение сайта — Яндекс и Google',
    description:
      'Продвижение сайта в Яндексе и Google: аудит, семантика, контент. Минск и Беларусь. Стоимость SEO — после аудита.',
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
  const isVitebsk = cityName === 'Витебск'

  if (isVitebsk) {
    return {
      title: clipTitle('Создание сайтов в Витебске — разработка и продвижение'),
      description: clipDescription(
        'Создание и разработка сайтов в Витебске на уникальном коде: визитка, лендинг, каталог, магазин. Раскрутка SEO в Яндексе и Google. APSOD — база в Витебске. Смета от 8 000 Б̶.'
      ),
      absoluteTitle: true,
      keywords: [
        'создание сайтов в Витебске',
        'создание сайта в Витебске',
        'разработка сайтов в Витебске',
        'разработка сайтов Витебск',
        'создание сайтов Витебск',
        'раскрутка сайта Витебск',
        'продвижение сайтов в Витебске',
        'заказать сайт в Витебске',
        'обслуживание сайтов Витебск',
      ],
    }
  }

  if (cityName === 'Минск') {
    return {
      title: clipTitle('Разработка сайтов в Минске — создание сайта и SEO'),
      description: clipDescription(
        'Разработка и создание сайтов в Минске на уникальном коде: лендинг, корпоративный, магазин. SEO в Яндексе и Google. APSOD — удалённо по РБ. Смета от 8 000 Б̶.'
      ),
      absoluteTitle: true,
      keywords: [
        'разработка сайтов в Минске',
        'разработка сайтов Минск',
        'создание сайтов в Минске',
        'создание сайта в Минске',
        'создание сайта Минск',
        'заказать сайт в Минске',
        'продвижение сайтов в Минске',
        'SEO продвижение Минск',
      ],
    }
  }

  const title = `Разработка и продвижение сайтов ${nameIn}`
  const description = `Разработка и продвижение сайтов ${nameIn} на уникальном коде: лендинг, корпоративный, каталог, магазин. SEO в Яндексе и Google. APSOD — ${region}. Смета от 8 000 Б̶.`
  return {
    title: clipTitle(title),
    description: clipDescription(description),
    absoluteTitle: true,
    keywords: [
      `разработка и продвижение сайтов ${cityName}`,
      `разработка сайтов ${cityName}`,
      `создание сайтов ${cityName}`,
      `создание сайта ${cityName}`,
      `продвижение сайтов ${cityName}`,
      `заказать сайт ${cityName}`,
      `SEO продвижение ${cityName}`,
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

/** Сниппет лота готового сайта */
export function readySiteSnippet(site: {
  title: string
  subtitle: string
  priceLabel: string
}): PageSnippet {
  return {
    title: clipTitle(`${site.title} — разработка с нуля, SEO и GEO`),
    description: clipDescription(
      `${site.subtitle} Цена ${site.priceLabel}. Купить готовый сайт APSOD с ребрендом.`
    ),
    absoluteTitle: true,
    keywords: [
      'купить готовый сайт',
      'готовый сайт детейлинг',
      'разработка сайта с нуля',
      'готовый сайт SEO',
      'готовый сайт GEO',
    ],
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
