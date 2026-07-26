import { dualPriceLines, formatDualPrice } from '../lib/currency'

export type ReadySite = {
  slug: string
  title: string
  subtitle: string
  category: string
  bynAmount: number
  priceLabel: string
  priceByn: string
  priceRub: string
  image: string
  demoUrl: string
  demoNote: string
  portfolioSlug?: string
  highlights: string[]
  includes: string[]
  excludes: string[]
  whyNotTemplate: string[]
  seoPitch: string
  status: 'available' | 'sold'
}

const detailingPrice = dualPriceLines(8000, { from: false })

/** Готовые сайты APSOD — уникальная разработка с нуля в продаже */
export const READY_SITES: ReadySite[] = [
  {
    slug: 'detailing-studio',
    title: 'Готовый сайт детейлинг-студии',
    subtitle:
      'Разработка с нуля на уникальном коде. Ребренд под ваш бренд, перенос на ваш домен, база SEO и GEO.',
    category: 'Авто / детейлинг',
    bynAmount: 8000,
    priceLabel: formatDualPrice(8000, { from: false }),
    priceByn: detailingPrice.byn,
    priceRub: detailingPrice.rub.replace(/^или /, ''),
    image: '/portfolio/artdetailing.png',
    demoUrl: 'https://artdetailing.by/',
    demoNote:
      'Живое демо: https://artdetailing.by/ — пример оформления. После покупки: ваш бренд, контакты, город и ваш домен.',
    portfolioSlug: 'artdetailing',
    highlights: [
      'Уникальная разработка с нуля — не конструктор и не тема WordPress',
      'Каталог услуг: химчистка, полировка, оклейка, защитные покрытия, комплексы',
      'Фото/видео работ, запись онлайн, сертификат, вакансии — готовый контур студии',
      'Сильная локальная SEO-база + подготовка под GEO в нейросетях',
    ],
    includes: [
      'Исходный код и дизайн',
      'Перенос на домен покупателя',
      'Ребренд: название, контакты, город, основные тексты',
      'Базовая SEO-разметка и структура под локальный поиск',
      'База под GEO (видимость в нейросетях)',
      'Краткая передача: как править контент и принимать заявки',
    ],
    excludes: [
      'Домен artdetailing.by (не входит в сделку)',
      'Ваши фото, видео и уникальный контент сверх ребренда',
      'Рекламный бюджет и ведение SEO/GEO после передачи',
      'Юридическая регистрация ИП / ООО покупателя',
    ],
    whyNotTemplate: [
      'Это не шаблон с маркетплейса: сайт собран с нуля под нишу детейлинга.',
      'Вы получаете исходники и полный контроль — без лимитов Tilda / Wix.',
      'Структура уже заточена под заявки, локальный поиск и дальнейший рост.',
    ],
    seoPitch:
      'На демо (artdetailing.by) уже заложена локальная семантика под детейлинг и город, структура услуг и технические сигналы для поиска. Плюс контур под GEO в нейросетях. Позиции в топе «из коробки» не обещаем — передаём фундамент для продвижения под ваш бренд и город.',
    status: 'available',
  },
]

export function getReadySiteBySlug(slug: string): ReadySite | undefined {
  return READY_SITES.find((site) => site.slug === slug)
}

export function getAllReadySiteSlugs(): string[] {
  return READY_SITES.map((site) => site.slug)
}
