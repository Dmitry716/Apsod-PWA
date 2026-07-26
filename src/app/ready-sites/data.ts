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
    title: 'Готовая PWA детейлинг-студии',
    subtitle:
      'Progressive Web App на уникальном коде: сайт как приложение на телефоне, запись, SEO и GEO. Ребренд под ваш бренд и перенос на ваш домен.',
    category: 'Авто / детейлинг · PWA',
    bynAmount: 8000,
    priceLabel: formatDualPrice(8000, { from: false }),
    priceByn: detailingPrice.byn,
    priceRub: detailingPrice.rub.replace(/^или /, ''),
    image: '/portfolio/artdetailing.png',
    demoUrl: 'https://artdetailing.by/',
    demoNote:
      'Живое демо PWA: https://artdetailing.by/ — премиальный продукт. После покупки: ваш бренд, контакты, город и ваш домен.',
    portfolioSlug: 'artdetailing',
    highlights: [
      'PWA: устанавливается на смартфон, быстрый app-like интерфейс',
      'Каталог услуг: химчистка, полировка, оклейка, защитные покрытия, комплексы',
      'Онлайн-запись, фото/видео, сертификат, вакансии — полный контур студии',
      'Сильная локальная SEO-база + подготовка под GEO в нейросетях',
    ],
    includes: [
      'Исходный код PWA и дизайн',
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
      'Это не шаблон: полноценная PWA-разработка с нуля под нишу детейлинга.',
      'Вы получаете исходники и контроль — без лимитов Tilda / Wix.',
      'Структура заточена под заявки, локальный поиск и рост в нейросетях.',
    ],
    seoPitch:
      'На демо (artdetailing.by) — PWA с локальной семантикой под детейлинг и город, структурой услуг и технической базой для поиска плюс контур под GEO. Позиции в топе «из коробки» не обещаем — передаём фундамент под ваш бренд и город.',
    status: 'available',
  },
]

export function getReadySiteBySlug(slug: string): ReadySite | undefined {
  return READY_SITES.find((site) => site.slug === slug)
}

export function getAllReadySiteSlugs(): string[] {
  return READY_SITES.map((site) => site.slug)
}
