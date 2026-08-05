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
      'Разработка сайтов в Минске на собственном коде: лендинг, корпоративный, магазин. SEO и GEO. Смета за 1 день.',
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
    title: 'Контакты APSOD в Минске — сайт, приложение или SEO',
    description:
      'Бриф за 1 минуту. Адрес: г. Минск, ул. Куйбышева, 35. Telegram @Apsod_IT, WhatsApp, +375445777724.',
    keywords: [
      'контакты APSOD Минск',
      'заказать сайт Минск',
      'заказать приложение',
      'заказать SEO',
    ],
  },
  '/pricing': {
    title: 'Стоимость сайта в Минске — от 8 000 Б̶',
    description:
      'Стоимость разработки сайта в Минске: лендинг от 8 000 Б̶, корпоративный от 15 000 Б̶, магазин от 23 000 Б̶. SEO от 800 Б̶/мес. Сайт + SEO — по смете.',
    keywords: [
      'стоимость сайта Минск',
      'цена разработки сайта',
      'стоимость SEO Минск',
      'цены на сайт Минск',
    ],
  },
  '/ready-sites': {
    title: 'Готовые сайты в Минске — разработка с нуля, SEO и GEO',
    description:
      `Купить готовый сайт APSOD в Минске: уникальный код с нуля, ребренд, перенос на ваш домен, база SEO и GEO. От ${formatDualPrice(15000, { from: true })}.`,
    absoluteTitle: true,
    keywords: [
      'готовые сайты Минск',
      'купить готовый сайт',
      'разработка сайта с нуля',
      'готовый сайт SEO',
      'готовый сайт GEO',
    ],
  },
  '/portfolio': {
    title: 'Кейсы APSOD — разработка сайтов в Минске',
    description:
      'Кейсы APSOD в Минске: сайты и приложения для бизнеса. Amba Detail, NEXTON, Maxximum, Динамо-Витебск, BMservice, ArtDetailing.',
    keywords: [
      'портфолио APSOD',
      'кейсы разработки сайтов',
      'портфолио веб-студии Минск',
    ],
  },
  '/blog': {
    title: 'Блог — разработка сайтов и SEO в Минске',
    description:
      'Статьи APSOD: создание сайтов, SEO в Яндексе и Google, PWA и мобильные приложения. Разработка сайтов в Минске.',
    keywords: ['блог веб-разработки', 'SEO статьи', 'разработка сайтов Минск'],
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
    title: 'Разработка сайтов в Минске — собственный код',
    description:
      'Создание сайта в Минске под ключ: лендинг от 8 000 Б̶, корпоративный от 15 000 Б̶. Собственный код, SEO-база, смета после брифа.',
    keywords: [
      'разработка сайтов в Минске',
      'разработка сайтов Минск',
      'создание сайта Минск',
      'заказать сайт Минск',
      'сайт под ключ Минск',
      'создание сайта',
    ],
  },
  '/services/ecommerce': {
    title: 'Разработка интернет-магазина в Минске',
    description:
      'Интернет-магазин в Минске на собственном коде: каталог, корзина, оплата, доставка, админка и SEO. Смета после брифа.',
    keywords: [
      'разработка интернет-магазина Минск',
      'создание интернет-магазина Минск',
      'интернет-магазин под ключ',
    ],
  },
  '/services/ios-apps': {
    title: 'Разработка приложений для iOS в Минске',
    description:
      'Мобильные приложения для iPhone в Минске: Swift, SwiftUI, React Native. Публикация в App Store. MVP от 12 000 Б̶.',
    keywords: [
      'разработка приложений iOS Минск',
      'создание приложения для iPhone',
      'Swift разработка Минск',
    ],
  },
  '/services/android-apps': {
    title: 'Разработка приложений для Android в Минске',
    description:
      'Мобильные приложения для Android в Минске: Kotlin, Jetpack Compose, React Native. Google Play. MVP от 12 000 Б̶.',
    keywords: [
      'разработка приложений Android Минск',
      'создание приложения для Android',
      'Kotlin разработка Минск',
    ],
  },
  '/services/seo': {
    title: 'SEO продвижение сайта в Минске — Яндекс и Google',
    description:
      'SEO продвижение в Минске: аудит, семантика, техника и контент в Яндексе и Google. Комплекс от 3 000 Б̶/мес. Смета после аудита.',
    keywords: [
      'SEO продвижение Минск',
      'продвижение сайта Минск',
      'SEO Яндекс Минск',
      'SEO Google',
      'стоимость SEO Минск',
    ],
  },
  '/services/geo-promotion': {
    title: 'GEO-продвижение в Минске — нейросети',
    description:
      'GEO в Минске: AI-видимость в ChatGPT, Google AI, Алисе. Аудит, факт-матрица, тарифы и ежемесячный мониторинг.',
    keywords: [
      'GEO продвижение Минск',
      'GEO в нейросетях',
      'Generative Engine Optimization',
      'AI-видимость',
      'продвижение в ChatGPT',
    ],
  },
  '/services/mobile-development': {
    title: 'Разработка мобильных приложений в Минске',
    description:
      'Создание мобильного приложения iOS и Android в Минске. React Native, Flutter. MVP от 12 000 Б̶. Смета после Discovery.',
    keywords: [
      'разработка мобильных приложений Минск',
      'создание мобильного приложения Минск',
    ],
  },
  '/services/pwa-development': {
    title: 'PWA-разработка в Минске — веб-приложения',
    description:
      'Progressive Web Apps в Минске: офлайн, push, установка на экран. Без магазинов приложений. Смета после брифа.',
    keywords: ['PWA разработка Минск', 'progressive web app'],
  },
  '/services/technical-support': {
    title: 'Техподдержка сайтов в Минске',
    description:
      'Сопровождение сайтов в Минске: Next.js, Angular, Vue, ASP.NET Core, Node.js — обновления, мониторинг, бэкапы, доработки. Договор и SLA.',
    keywords: [
      'техническая поддержка сайтов Минск',
      'сопровождение сайта Минск',
    ],
  },
  '/services/ui-ux': {
    title: 'UI/UX дизайн сайтов и приложений в Минске',
    description:
      'Прототипы, интерфейсы и дизайн-системы в Минске для сайтов и мобильных приложений. Фокус на конверсии и удобстве.',
    keywords: ['UI UX дизайн Минск', 'дизайн сайта Минск', 'прототипирование'],
  },
  '/services/crm': {
    title: 'CRM для бизнеса в Минске — разработка и внедрение',
    description:
      'CRM в Минске под продажи: интеграции с сайтом и мессенджерами, воронки, отчёты. Внедрение и кастомная разработка.',
    keywords: ['CRM Минск', 'внедрение CRM', 'автоматизация продаж'],
  },
  '/services/erp': {
    title: 'ERP-системы в Минске — учёт и автоматизация',
    description:
      'Разработка и внедрение ERP в Минске: склад, производство, финансы. Решения под ваши процессы.',
    keywords: ['ERP Минск', 'автоматизация бизнеса', 'учётная система'],
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
        'Разработка и создание сайтов в Минске на уникальном коде: лендинг, корпоративный, магазин. SEO в Яндексе и Google. Офис: ул. Куйбышева, 35. Смета от 8 000 Б̶.'
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
    keywords: [projectTitle, 'портфолио APSOD', 'кейс разработки', 'разработка сайтов Минск'],
  }
}

/** Сниппет лота готового сайта */
export function readySiteSnippet(site: {
  title: string
  subtitle: string
  priceLabel: string
}): PageSnippet {
  return {
    title: clipTitle(`${site.title} — разработка с нуля в Минске`),
    description: clipDescription(
      `${site.subtitle} Цена ${site.priceLabel}. Купить готовый сайт APSOD в Минске с ребрендом.`
    ),
    absoluteTitle: true,
    keywords: [
      'купить готовый сайт Минск',
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
    keywords: ['блог APSOD', 'разработка сайтов в Минске', 'SEO Минск'],
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
