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
  /** Значение budget в /contact для этого лота */
  contactBudgetKey: string
}

const detailingPrice = dualPriceLines(15000, { from: false })

/** Готовые сайты APSOD — уникальная разработка с нуля в продаже */
export const READY_SITES: ReadySite[] = [
  {
    slug: 'detailing-studio',
    title: 'Готовая PWA детейлинг-студии на ASP.NET Core 10',
    subtitle:
      'Progressive Web App на ASP.NET Core 10.0: сайт как приложение на телефоне, каталог услуг, запись, SEO и GEO. Ребренд под ваш бренд и перенос на ваш домен.',
    category: 'Авто / детейлинг · PWA · ASP.NET Core 10',
    bynAmount: 15000,
    priceLabel: formatDualPrice(15000, { from: false }),
    contactBudgetKey: 'ready-15k',
    priceByn: detailingPrice.byn,
    priceRub: detailingPrice.rub.replace(/^или /, ''),
    image: '/portfolio/artdetailing.png',
    demoUrl: 'https://artdetailing.by/',
    demoNote:
      'Живое демо PWA: https://artdetailing.by/ — премиальный продукт. После покупки: ваш бренд, контакты, город и ваш домен.',
    portfolioSlug: 'artdetailing',
    highlights: [
      'PWA: установка на смартфон, app-like интерфейс, обновления без App Store / Google Play',
      'ASP.NET Core 10.0: скорость, безопасность, масштабируемая серверная архитектура',
      'Каталог услуг: химчистка, полировка, оклейка, защитные покрытия, комплексы',
      'Онлайн-запись, фото/видео, сертификат, вакансии — полный контур студии',
      'Сильная локальная SEO-база + подготовка под GEO в нейросетях',
    ],
    includes: [
      'Исходный код PWA на ASP.NET Core 10.0 и дизайн',
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
      'Это не шаблон: полноценная PWA на ASP.NET Core 10.0 с нуля под нишу детейлинга.',
      'Вы получаете исходники и контроль над продуктом — без чужой платформы и без магазина приложений.',
      'Структура заточена под заявки, локальный поиск и рост в нейросетях.',
    ],
    seoPitch:
      'На демо (artdetailing.by) — PWA на ASP.NET Core 10.0 с локальной семантикой под детейлинг и город, структурой услуг и технической базой для поиска плюс контур под GEO. Позиции в топе «из коробки» не обещаем — передаём фундамент под ваш бренд и город.',
    status: 'available',
  },
]

export function getReadySiteBySlug(slug: string): ReadySite | undefined {
  return READY_SITES.find((site) => site.slug === slug)
}

export function getAllReadySiteSlugs(): string[] {
  return READY_SITES.map((site) => site.slug)
}
