/**
 * Семантическое ядро APSOD.
 * Фокус: разработка и продвижение сайтов, мобильные приложения, SEO.
 * Гео-приоритет: Витебск, Минск, Москва (+ хабы РБ/РФ).
 *
 * P1 — title / H1 / meta description
 * P2 — H2, тексты, FAQ
 * P3 — long-tail, вспомогательные страницы
 */

import { formatDualPrice } from './currency'

export type KeywordPriority = 'P1' | 'P2' | 'P3'
export type GeoTier = 'A' | 'B' | 'C'
export type CountryCode = 'BY' | 'RU'
export type SemanticCluster =
  | 'sites'
  | 'ecommerce'
  | 'mobile'
  | 'seo'
  | 'pwa'
  | 'support'
  | 'uiux'
  | 'crm'
  | 'erp'
  | 'general'

export type SemanticKeyword = {
  phrase: string
  priority: KeywordPriority
  cluster: SemanticCluster
}

/** Приоритетные города для money-запросов */
export const TOP_GEO_NAMES = {
  vitebsk: 'Витебск',
  minsk: 'Минск',
  moscow: 'Москва',
} as const

const BY_TIER_A = new Set(['minsk', 'vitebsk'])

export function getBelarusGeoTier(slug: string): GeoTier {
  return BY_TIER_A.has(slug) ? 'A' : 'B'
}

export function getRussiaGeoTier(
  priority: 'primary' | 'major' | 'regional',
  slug?: string
): GeoTier {
  if (slug === 'moscow' || priority === 'primary') return 'A'
  if (priority === 'major') return 'B'
  return 'C'
}

function uniqKeywords(items: SemanticKeyword[]): SemanticKeyword[] {
  const seen = new Set<string>()
  return items.filter((k) => {
    const key = k.phrase.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** —— Сайты —— */
function sitesP1(city: string): SemanticKeyword[] {
  return [
    { phrase: `разработка сайтов ${city}`, priority: 'P1', cluster: 'sites' },
    { phrase: `создание сайтов ${city}`, priority: 'P1', cluster: 'sites' },
    { phrase: `создание сайта ${city}`, priority: 'P1', cluster: 'sites' },
    { phrase: `заказать сайт ${city}`, priority: 'P1', cluster: 'sites' },
    { phrase: `разработка сайта ${city}`, priority: 'P1', cluster: 'sites' },
    { phrase: `создание сайта с нуля ${city}`, priority: 'P1', cluster: 'sites' },
  ]
}

function sitesP2(city: string): SemanticKeyword[] {
  return [
    { phrase: `сделать сайт ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `стоимость сайта ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `цена разработки сайта ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `корпоративный сайт ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `лендинг ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `веб-студия ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `сайт компании ${city}`, priority: 'P2', cluster: 'sites' },
  ]
}

/** —— E-commerce —— */
function ecommerceP1(city: string): SemanticKeyword[] {
  return [
    {
      phrase: `разработка интернет-магазина ${city}`,
      priority: 'P1',
      cluster: 'ecommerce',
    },
    {
      phrase: `создание интернет-магазина ${city}`,
      priority: 'P1',
      cluster: 'ecommerce',
    },
    {
      phrase: `заказать интернет-магазин ${city}`,
      priority: 'P1',
      cluster: 'ecommerce',
    },
  ]
}

function ecommerceP2(city: string): SemanticKeyword[] {
  return [
    {
      phrase: `интернет-магазин ${city}`,
      priority: 'P2',
      cluster: 'ecommerce',
    },
    {
      phrase: `стоимость интернет-магазина ${city}`,
      priority: 'P2',
      cluster: 'ecommerce',
    },
  ]
}

/** —— Mobile —— */
function mobileP1(city: string): SemanticKeyword[] {
  return [
    {
      phrase: `разработка мобильных приложений ${city}`,
      priority: 'P1',
      cluster: 'mobile',
    },
    {
      phrase: `создание мобильного приложения ${city}`,
      priority: 'P1',
      cluster: 'mobile',
    },
    {
      phrase: `заказать мобильное приложение ${city}`,
      priority: 'P1',
      cluster: 'mobile',
    },
  ]
}

function mobileP2(city: string): SemanticKeyword[] {
  return [
    {
      phrase: `разработка приложения iOS ${city}`,
      priority: 'P2',
      cluster: 'mobile',
    },
    {
      phrase: `разработка приложения Android ${city}`,
      priority: 'P2',
      cluster: 'mobile',
    },
    {
      phrase: `мобильное приложение ${city}`,
      priority: 'P2',
      cluster: 'mobile',
    },
  ]
}

/** —— SEO —— */
function seoP1(city: string): SemanticKeyword[] {
  return [
    { phrase: `SEO продвижение ${city}`, priority: 'P1', cluster: 'seo' },
    { phrase: `продвижение сайта ${city}`, priority: 'P1', cluster: 'seo' },
    { phrase: `SEO продвижение сайта ${city}`, priority: 'P1', cluster: 'seo' },
    { phrase: `продвижение сайта Яндекс ${city}`, priority: 'P1', cluster: 'seo' },
    { phrase: `продвижение сайта Google ${city}`, priority: 'P1', cluster: 'seo' },
  ]
}

function seoP2(city: string): SemanticKeyword[] {
  return [
    { phrase: `SEO Яндекс ${city}`, priority: 'P2', cluster: 'seo' },
    { phrase: `SEO Google ${city}`, priority: 'P2', cluster: 'seo' },
    { phrase: `раскрутка сайта ${city}`, priority: 'P2', cluster: 'seo' },
    { phrase: `SEO оптимизация ${city}`, priority: 'P2', cluster: 'seo' },
    { phrase: `поисковое продвижение ${city}`, priority: 'P2', cluster: 'seo' },
    { phrase: `стоимость SEO ${city}`, priority: 'P2', cluster: 'seo' },
  ]
}

function supportKeywords(city: string, tier: GeoTier): SemanticKeyword[] {
  if (tier === 'C') {
    return [
      {
        phrase: `техническая поддержка сайта ${city}`,
        priority: 'P2',
        cluster: 'support',
      },
    ]
  }
  return [
    { phrase: `PWA разработка ${city}`, priority: 'P2', cluster: 'pwa' },
    {
      phrase: `техническая поддержка сайта ${city}`,
      priority: 'P2',
      cluster: 'support',
    },
    { phrase: `UI UX дизайн ${city}`, priority: 'P2', cluster: 'uiux' },
    ...(tier === 'A'
      ? ([
          { phrase: `CRM ${city}`, priority: 'P3', cluster: 'crm' },
          { phrase: `ERP ${city}`, priority: 'P3', cluster: 'erp' },
        ] as SemanticKeyword[])
      : []),
  ]
}

/** Полный список фраз для города по тиру */
export function buildCitySemanticCore(
  cityName: string,
  tier: GeoTier
): SemanticKeyword[] {
  if (tier === 'A') {
    return uniqKeywords([
      ...sitesP1(cityName),
      ...sitesP2(cityName),
      ...ecommerceP1(cityName),
      ...ecommerceP2(cityName),
      ...mobileP1(cityName),
      ...mobileP2(cityName),
      ...seoP1(cityName),
      ...seoP2(cityName),
      ...supportKeywords(cityName, tier),
    ])
  }

  if (tier === 'B') {
    return uniqKeywords([
      ...sitesP1(cityName),
      ...sitesP2(cityName).slice(0, 4),
      ...ecommerceP1(cityName),
      ...mobileP1(cityName).slice(0, 2),
      ...seoP1(cityName).slice(0, 3),
      ...seoP2(cityName).slice(0, 2),
      ...supportKeywords(cityName, tier),
    ])
  }

  return uniqKeywords([
    ...sitesP1(cityName).slice(0, 4),
    ...ecommerceP1(cityName).slice(0, 2),
    ...seoP1(cityName).slice(0, 2),
    ...mobileP1(cityName).slice(0, 1),
    ...supportKeywords(cityName, tier),
  ])
}

/** Keywords для meta — P1 + сильные P2 */
export function getCityMetaKeywords(
  cityName: string,
  region: string,
  tier: GeoTier,
  countryLabel: string
): string[] {
  const core = buildCitySemanticCore(cityName, tier)
  const p1 = core.filter((k) => k.priority === 'P1').map((k) => k.phrase)
  const p2 = core
    .filter((k) => k.priority === 'P2' && (k.cluster === 'seo' || k.cluster === 'sites' || k.cluster === 'mobile'))
    .map((k) => k.phrase)
  const extra = [
    `IT компания ${cityName}`,
    `веб-разработка ${region}`,
    `разработка сайтов ${countryLabel}`,
    `SEO продвижение ${countryLabel}`,
  ]
  return [...p1.slice(0, 14), ...p2.slice(0, 6), ...extra]
}

/** Национальные / хабы */
export const NATIONAL_BY_KEYWORDS = [
  'разработка и продвижение сайтов в Беларуси',
  'разработка сайтов в Беларуси',
  'продвижение сайтов в Беларуси',
  'создание сайтов в Витебске',
  'создание сайта в Витебске',
  'разработка сайтов в Витебске',
  'раскрутка сайта Витебск',
  'продвижение сайтов в Витебске',
  'обслуживание сайтов Витебск',
  'разработка сайтов Беларусь',
  'создание сайтов Беларусь',
  'создание сайта Беларусь',
  'заказать сайт Беларусь',
  'разработка интернет-магазина Беларусь',
  'создание интернет-магазина Беларусь',
  'разработка мобильных приложений Беларусь',
  'создание мобильного приложения Беларусь',
  'SEO продвижение Беларусь',
  'продвижение сайта Беларусь',
  'продвижение сайта в Яндексе Беларусь',
  'продвижение сайта в Google Беларусь',
  'SEO продвижение Минск',
  'разработка сайтов Минск',
  'разработка сайтов Витебск',
  'IT компания Беларусь',
  'веб-студия Беларусь',
]

export const NATIONAL_RU_KEYWORDS = [
  'разработка и продвижение сайтов в России',
  'разработка сайтов в России',
  'продвижение сайтов в России',
  'разработка и продвижение сайтов в Москве',
  'разработка сайтов в Москве',
  'продвижение сайтов в Москве',
  'разработка сайтов Москва',
  'создание сайтов Москва',
  'создание сайта Москва',
  'заказать сайт Москва',
  'разработка интернет-магазина Москва',
  'создание интернет-магазина Москва',
  'разработка мобильных приложений Москва',
  'создание мобильного приложения Москва',
  'SEO продвижение Москва',
  'продвижение сайта Москва',
  'SEO Яндекс Москва',
  'SEO Google Москва',
  'продвижение сайта Яндекс Москва',
  'продвижение сайта Google Москва',
  'разработка сайтов Россия',
  'создание сайтов Россия',
  'IT компания Москва',
  'веб-разработка Московская область',
]

/**
 * Топ коммерческие запросы без гео — для главной /pricing /services.
 * Закрывают голову воронки: разработка, продвижение, приложения.
 */
export const TOP_COMMERCIAL_KEYWORDS = [
  // Сайты
  'разработка сайтов',
  'создание сайтов',
  'создание сайта',
  'заказать сайт',
  'разработка сайта',
  'создание сайта с нуля',
  'стоимость сайта',
  'цена разработки сайта',
  'корпоративный сайт',
  'лендинг',
  'веб-студия',
  // Магазины
  'разработка интернет-магазина',
  'создание интернет-магазина',
  'заказать интернет-магазин',
  // Mobile
  'разработка мобильных приложений',
  'создание мобильного приложения',
  'заказать мобильное приложение',
  'разработка приложения iOS',
  'разработка приложения Android',
  // SEO
  'SEO продвижение',
  'продвижение сайта',
  'SEO продвижение сайта',
  'продвижение сайта в Яндексе',
  'продвижение сайта в Google',
  'SEO оптимизация сайта',
  'раскрутка сайта',
  'поисковое продвижение',
  'стоимость SEO продвижения',
]

/** Кластеры для money-страниц услуг (meta + тексты) */
export const SERVICE_CLUSTER_KEYWORDS: Record<
  'web-development' | 'seo' | 'mobile-development',
  string[]
> = {
  'web-development': [
    'разработка сайтов Москва',
    'создание сайтов Москва',
    'создание сайта Москва',
    'заказать сайт Москва',
    'разработка сайтов Минск',
    'создание сайтов Минск',
    'разработка сайтов Витебск',
    'создание сайтов Витебск',
    'разработка сайтов Беларусь',
    'создание сайта с нуля',
    'разработка интернет-магазина Москва',
    'разработка интернет-магазина Минск',
    'создание интернет-магазина',
    'корпоративный сайт',
    'стоимость сайта',
    'веб-студия Москва',
    'веб-студия Минск',
  ],
  seo: [
    'SEO продвижение Москва',
    'продвижение сайта Москва',
    'SEO продвижение сайта Москва',
    'продвижение сайта Яндекс Москва',
    'продвижение сайта Google Москва',
    'SEO Яндекс Москва',
    'SEO Google Москва',
    'SEO продвижение Минск',
    'продвижение сайта Минск',
    'SEO продвижение Витебск',
    'SEO продвижение Беларусь',
    'продвижение сайта в Яндексе',
    'продвижение сайта в Google',
    'SEO оптимизация сайта',
    'раскрутка сайта',
    'стоимость SEO продвижения',
  ],
  'mobile-development': [
    'разработка мобильных приложений Москва',
    'создание мобильного приложения Москва',
    'заказать мобильное приложение Москва',
    'разработка мобильных приложений Минск',
    'создание мобильного приложения Минск',
    'разработка мобильных приложений Беларусь',
    'разработка приложения iOS',
    'разработка приложения Android',
    'мобильное приложение на заказ',
    'React Native разработка',
  ],
}

/** SEO-блоки для страниц услуг (H2 + абзац с естественными P1) */
export function getServiceSemanticBlocks(
  service: 'web-development' | 'seo' | 'mobile-development'
): { h2: string; body: string }[] {
  if (service === 'web-development') {
    return [
      {
        h2: 'Разработка и создание сайтов в Минске, Витебске и Москве',
        body: 'Закажите разработку сайтов и создание сайта с нуля: корпоративный сайт, лендинг или сайт компании на уникальном коде. Работаем в Минске, Витебске и Москве — удалённо по Беларуси и России. Без конструкторов и типовых CMS-сборок.',
      },
      {
        h2: 'Разработка интернет-магазина',
        body: 'Создание интернет-магазина и разработка интернет-магазина полного цикла: каталог, корзина, оплата, доставка, админка и SEO каталога. Ориентиры стоимости — на странице цен; точная смета после брифа.',
      },
      {
        h2: 'Сколько стоит сайт',
        body: `Стоимость сайта и цена разработки сайта зависят от объёма: лендинг — ${formatDualPrice(8000)}, корпоративный сайт — ${formatDualPrice(15000)}, интернет-магазин — ${formatDualPrice(23000)}. Закладываем скорость, адаптив и базовую SEO-разметку уже на этапе создания сайта.`,
      },
    ]
  }

  if (service === 'seo') {
    return [
      {
        h2: 'SEO-продвижение сайта в Яндексе и Google',
        body: 'SEO продвижение и продвижение сайта в Яндексе и Google: технический аудит, семантика, контент, внутренняя перелинковка и локальная выдача. Фокус — Москва, Минск, Витебск и удалённые проекты по РБ/РФ.',
      },
      {
        h2: 'Продвижение сайта Москва, Минск, Витебск',
        body: 'SEO продвижение Москвы и регионов: коммерческие запросы, карты и локальное SEO. Для Беларуси — SEO продвижение Минска и Витебска с упором на Яндекс и Google.',
      },
      {
        h2: 'Стоимость SEO продвижения',
        body: `Стоимость SEO продвижения — ${formatDualPrice(800, { perMonth: true })} или пакетный старт после аудита. Срок заметного роста позиций по конкурентным запросам обычно 2–4 месяца при системной работе.`,
      },
    ]
  }

  return [
    {
      h2: 'Разработка мобильных приложений для бизнеса',
      body: 'Разработка мобильных приложений и создание мобильного приложения на заказ: iOS, Android и кроссплатформа (React Native, Flutter). От MVP до продукта с бэкендом и публикацией в App Store / Google Play.',
    },
    {
      h2: 'Мобильные приложения в Москве, Минске и Беларуси',
      body: 'Заказать мобильное приложение можно удалённо: Discovery, UX, разработка приложения iOS и Android, QA и поддержка после релиза. Работаем с клиентами в Москве, Минске, Витебске и по миру.',
    },
  ]
}

/** Title/description шаблоны для топ-гео */
export function getCityPageTitle(nameIn: string): string {
  return `Разработка сайтов ${nameIn} — создание сайта, интернет-магазин, SEO`
}

export function getCityPageDescription(nameIn: string, region: string): string {
  return `Создание и разработка сайтов ${nameIn}, заказать сайт и интернет-магазин, SEO продвижение в Яндексе и Google, мобильные приложения. APSOD — IT для бизнеса в ${region}.`
}

/** Блоки контента для гео-страницы */
export function getCityContentBlocks(
  cityName: string,
  nameIn: string,
  region: string
): { h2: string; body: string }[] {
  return [
    {
      h2: `Разработка и создание сайтов ${nameIn}`,
      body: `Разработка сайтов ${cityName} и создание сайта ${nameIn} на уникальном коде: корпоративный сайт, лендинг, сайт компании. Проектируем структуру под поисковые запросы ${region}, адаптив и SEO уже на этапе создания сайта с нуля ${nameIn}.`,
    },
    {
      h2: `Заказать сайт ${nameIn}`,
      body: `Заказать сайт ${cityName} можно онлайн: бриф, смета, договор. Делаем сайт с нуля — без конструкторов и шаблонных CMS. Ориентиры по стоимости сайта ${nameIn} — на странице «Цены».`,
    },
    {
      h2: `Интернет-магазин ${nameIn}`,
      body: `Разработка интернет-магазина ${cityName} и создание интернет-магазина ${nameIn}: каталог, корзина, оплата, интеграции и админка. Стек Next.js / Node.js — скорость и удобство SEO каталога.`,
    },
    {
      h2: `SEO-продвижение ${nameIn}`,
      body: `SEO продвижение ${cityName} и продвижение сайта ${nameIn} в Яндексе и Google: техника, семантика, контент и локальная выдача. Раскрутка сайта ${nameIn} помогает получать заявки из органического поиска.`,
    },
    {
      h2: `Мобильные приложения ${nameIn}`,
      body: `Разработка мобильных приложений ${cityName} и создание мобильного приложения ${nameIn} для iOS и Android. Заказать мобильное приложение можно вместе с сайтом или отдельно — от идеи до публикации.`,
    },
  ]
}

/** Локальный FAQ для гео-страницы */
export function getCityFaq(
  cityName: string,
  nameIn: string
): { question: string; answer: string }[] {
  return [
    {
      question: `Сколько стоит создание сайта ${nameIn}?`,
      answer: `Стоимость сайта ${nameIn}: лендинг — ${formatDualPrice(8000)}, корпоративный сайт / каталог — ${formatDualPrice(15000)}, интернет-магазин — ${formatDualPrice(23000)}. Работаем удалённо: бриф и смета онлайн. Актуальные пакеты — на странице «Цены».`,
    },
    {
      question: `Какие сроки разработки сайта ${nameIn}?`,
      answer: `Лендинг — обычно 2–4 недели, корпоративный сайт — 4–8 недель, интернет-магазин — от 2–3 месяцев. Точный срок фиксируем в смете после Discovery.`,
    },
    {
      question: `Как проходит оплата за сайт ${nameIn}?`,
      answer: `Оплата поэтапная, обычно тремя равными частями: Discovery и ТЗ → дизайн → разработка и запуск. Детали — в договоре.`,
    },
    {
      question: `Делаете сайт на конструкторе или на уникальном коде?`,
      answer: `Только уникальный код (Next.js / React). Не делаем сайты на Tilda, Wix и типовых темах WordPress без кастомизации — это другой сегмент и другой срок жизни продукта.`,
    },
    {
      question: `Как заказать сайт ${nameIn}?`,
      answer: `Оставьте заявку на странице контактов или напишите в Telegram / WhatsApp. Согласуем цель, бюджет и сроки, затем дадим коммерческое предложение на разработку сайта ${cityName}.`,
    },
    {
      question: `Делаете ли SEO продвижение ${nameIn}?`,
      answer: `Да. SEO продвижение сайта ${cityName} в Яндексе и Google: аудит, семантика, контент и локальная выдача. Можно вместе с разработкой или отдельно.`,
    },
    {
      question: `Делаете ли мобильные приложения ${nameIn}?`,
      answer: `Да. Создание мобильного приложения ${cityName}: iOS, Android, React Native / Flutter. Смета после Discovery.`,
    },
    {
      question: `Есть ли кейсы рядом с ${cityName}?`,
      answer: `За 15 лет — более 350 реальных кейсов. В портфолио — часть работ (Amba Detail, Maxximum, Динамо-Витебск, NEXTON, BMservice, ArtDetailing). Остальные проекты покажем на консультации.`,
    },
  ]
}
