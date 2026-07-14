/**
 * Семантическое ядро APSOD: коммерческие запросы × города РБ/РФ.
 * P1 — title/H1/meta, P2 — тексты и FAQ, P3 — long-tail.
 */

export type KeywordPriority = 'P1' | 'P2' | 'P3'
export type GeoTier = 'A' | 'B' | 'C'
export type CountryCode = 'BY' | 'RU'

export type SemanticKeyword = {
  phrase: string
  priority: KeywordPriority
  cluster:
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
}

const BY_TIER_A = new Set([
  'minsk',
  'vitebsk',
  'gomel',
  'grodno',
  'brest',
  'mogilev',
])

/** Тир города РБ по slug */
export function getBelarusGeoTier(slug: string): GeoTier {
  return BY_TIER_A.has(slug) ? 'A' : 'B'
}

/** Тир города РФ по priority из russia-cities */
export function getRussiaGeoTier(
  priority: 'primary' | 'major' | 'regional',
  slug?: string
): GeoTier {
  if (slug === 'moscow' || priority === 'primary') return 'A'
  if (priority === 'major') return 'B'
  return 'C'
}

function sitesP1(city: string): SemanticKeyword[] {
  return [
    { phrase: `разработка сайтов ${city}`, priority: 'P1', cluster: 'sites' },
    { phrase: `создание сайтов ${city}`, priority: 'P1', cluster: 'sites' },
    { phrase: `создание сайта ${city}`, priority: 'P1', cluster: 'sites' },
    { phrase: `заказать сайт ${city}`, priority: 'P1', cluster: 'sites' },
    { phrase: `сайт под ключ ${city}`, priority: 'P1', cluster: 'sites' },
  ]
}

function sitesP2(city: string): SemanticKeyword[] {
  return [
    { phrase: `корпоративный сайт ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `лендинг ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `сделать сайт ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `стоимость сайта ${city}`, priority: 'P2', cluster: 'sites' },
    { phrase: `веб-студия ${city}`, priority: 'P2', cluster: 'sites' },
  ]
}

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
      phrase: `интернет-магазин под ключ ${city}`,
      priority: 'P1',
      cluster: 'ecommerce',
    },
  ]
}

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
  ]
}

function seoP1(city: string): SemanticKeyword[] {
  return [
    { phrase: `SEO продвижение ${city}`, priority: 'P1', cluster: 'seo' },
    { phrase: `продвижение сайта ${city}`, priority: 'P1', cluster: 'seo' },
    { phrase: `SEO Яндекс ${city}`, priority: 'P1', cluster: 'seo' },
    { phrase: `SEO Google ${city}`, priority: 'P1', cluster: 'seo' },
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
    {
      phrase: `PWA разработка ${city}`,
      priority: 'P2',
      cluster: 'pwa',
    },
    {
      phrase: `техническая поддержка сайта ${city}`,
      priority: 'P2',
      cluster: 'support',
    },
    {
      phrase: `UI UX дизайн ${city}`,
      priority: 'P2',
      cluster: 'uiux',
    },
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
    return [
      ...sitesP1(cityName),
      ...sitesP2(cityName),
      ...ecommerceP1(cityName),
      {
        phrase: `заказать интернет-магазин ${cityName}`,
        priority: 'P1',
        cluster: 'ecommerce',
      },
      ...mobileP1(cityName),
      {
        phrase: `разработка приложения iOS ${cityName}`,
        priority: 'P2',
        cluster: 'mobile',
      },
      {
        phrase: `разработка приложения Android ${cityName}`,
        priority: 'P2',
        cluster: 'mobile',
      },
      ...seoP1(cityName),
      {
        phrase: `раскрутка сайта ${cityName}`,
        priority: 'P2',
        cluster: 'seo',
      },
      ...supportKeywords(cityName, tier),
    ]
  }

  if (tier === 'B') {
    return [
      ...sitesP1(cityName),
      ...sitesP2(cityName).slice(0, 3),
      ...ecommerceP1(cityName),
      ...mobileP1(cityName).slice(0, 1),
      ...seoP1(cityName).slice(0, 3),
      ...supportKeywords(cityName, tier),
    ]
  }

  // C — regional RF
  return [
    ...sitesP1(cityName).slice(0, 4),
    ...ecommerceP1(cityName).slice(0, 2),
    ...seoP1(cityName).slice(0, 2),
    ...mobileP1(cityName).slice(0, 1),
    ...supportKeywords(cityName, tier),
  ]
}

/** Keywords для meta keywords / Open Graph — только P1 (+ важные P2) */
export function getCityMetaKeywords(
  cityName: string,
  region: string,
  tier: GeoTier,
  countryLabel: string
): string[] {
  const core = buildCitySemanticCore(cityName, tier)
  const p1 = core.filter((k) => k.priority === 'P1').map((k) => k.phrase)
  const extra = [
    `IT компания ${cityName}`,
    `веб-разработка ${region}`,
    `разработка сайтов ${countryLabel}`,
  ]
  return [...p1.slice(0, 12), ...extra]
}

export const NATIONAL_BY_KEYWORDS = [
  'разработка сайтов Беларусь',
  'создание сайтов Беларусь',
  'заказать сайт Беларусь',
  'разработка интернет-магазина Беларусь',
  'разработка мобильных приложений Беларусь',
  'SEO продвижение Беларусь',
  'продвижение сайта в Яндексе Беларусь',
  'продвижение сайта в Google Беларусь',
  'IT компания Беларусь',
  'веб-студия Беларусь',
]

export const NATIONAL_RU_KEYWORDS = [
  'разработка сайтов Россия',
  'создание сайтов Россия',
  'разработка сайтов Москва',
  'создание сайта Москва',
  'разработка интернет-магазина Москва',
  'SEO продвижение Москва',
  'SEO Яндекс Москва',
  'SEO Google Москва',
  'разработка мобильных приложений Москва',
  'разработка сайтов Санкт-Петербург',
  'IT компания Москва',
  'веб-разработка Московская область',
]

/** Блоки контента для гео-страницы (H2 + абзац) с естественным вхождением P1 */
export function getCityContentBlocks(
  cityName: string,
  nameIn: string,
  region: string
): { h2: string; body: string }[] {
  return [
    {
      h2: `Создание и разработка сайтов ${nameIn}`,
      body: `Заказывайте разработку сайтов ${cityName}: корпоративный сайт, лендинг или сайт компании под ключ. Мы проектируем структуру под поисковые запросы ${region}, делаем адаптивную вёрстку и закладываем SEO на этапе создания сайта ${nameIn}.`,
    },
    {
      h2: `Интернет-магазин ${nameIn}`,
      body: `Создание интернет-магазина ${cityName} под ключ: каталог, корзина, оплата, интеграции и админка. Разработка интернет-магазина ${nameIn} на современном стеке (Next.js, Node.js) — с учётом скорости загрузки и продвижения в поиске.`,
    },
    {
      h2: `SEO-продвижение ${nameIn}`,
      body: `SEO продвижение ${cityName} в Яндексе и Google: технический аудит, семантика под ${region}, контент и локальная выдача. Продвижение сайта ${nameIn} помогает бизнесу получать заявки из органического поиска.`,
    },
    {
      h2: `Мобильные приложения ${nameIn}`,
      body: `Разработка мобильных приложений ${cityName} для iOS и Android. Создание мобильного приложения ${nameIn} — от идеи и UX до публикации в магазинах приложений и сопровождения после релиза.`,
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
      answer: `Ориентиры: лендинг — от 1 500 BYN, корпоративный сайт — от 3 500 BYN, интернет-магазин — от 6 000 BYN. Для ${cityName} работаем удалённо: бриф, смета и договор онлайн. Актуальные пакеты — на странице «Цены».`,
    },
    {
      question: `Делаете ли SEO ${nameIn}?`,
      answer: `Да. SEO продвижение ${cityName} в Яндексе и Google: техника, семантика и контент под локальный спрос. Можно вместе с разработкой сайта или отдельно.`,
    },
    {
      question: `Есть ли кейсы рядом с ${cityName}?`,
      answer: `В портфолио — проекты из Витебска и Полоцка (Amba Detail, Maxximum, Динамо-Витебск, NEXTON, BMservice) и другие работы. Смотрите раздел «Портфолио» и оставьте заявку на консультацию ${nameIn}.`,
    },
  ]
}
