import { dualPriceLines } from './currency'

export type WebDevPackageId = 'landing' | 'corporate' | 'catalog' | 'shop'

export type WebDevPackage = {
  id: WebDevPackageId
  title: string
  bynAmount: number
  byn: string
  rub: string
  term: string
  goal: string
  budget: string
  highlight: boolean
  items: string[]
}

const packageFrom = (
  id: WebDevPackageId,
  title: string,
  bynAmount: number,
  term: string,
  goal: string,
  budget: string,
  highlight: boolean,
  items: string[]
): WebDevPackage => ({
  id,
  title,
  bynAmount,
  ...dualPriceLines(bynAmount),
  term,
  goal,
  budget,
  highlight,
  items,
})

/** Единый прайс веб-разработки — /services/web-development и гео-офферы */
export const WEB_DEV_PACKAGES: WebDevPackage[] = [
  packageFrom(
    'landing',
    'Лендинг',
    8000,
    '2–4 недели',
    'landing',
    'landing-8k',
    false,
    [
      'Уникальный дизайн и адаптив',
      'Форма заявки / WhatsApp / Telegram',
      'Базовая SEO-разметка',
      'Подключение аналитики',
    ]
  ),
  packageFrom(
    'corporate',
    'Корпоративный сайт',
    15000,
    '4–8 недель',
    'corporate',
    'corporate-15k',
    true,
    [
      'До 10–15 страниц под семантику',
      'CMS / удобное редактирование',
      'Скорость и Core Web Vitals',
      'Структура под заявки и SEO',
    ]
  ),
  packageFrom(
    'catalog',
    'Каталог товаров / услуг',
    15000,
    '4–8 недель',
    'corporate',
    'corporate-15k',
    false,
    [
      'Каталог с фильтрами и карточками',
      'SEO-структура разделов',
      'Формы заявок и аналитика',
      'Удобное наполнение контента',
    ]
  ),
  packageFrom(
    'shop',
    'Интернет-магазин',
    23000,
    'от 2–3 месяцев',
    'shop',
    'shop-23k',
    false,
    [
      'Каталог, корзина, оплата',
      'Интеграции доставки и CRM',
      'Админка и SEO каталога',
      'Обучение и запуск',
    ]
  ),
]

/** Ориентиры стоимости для сетки на /services/web-development (без отдельной карточки каталога) */
export const WEB_DEV_FEATURED_PACKAGES = WEB_DEV_PACKAGES.filter(
  (p) => p.id === 'landing' || p.id === 'corporate' || p.id === 'shop'
)

export const WEB_DEV_SITE_TYPES = [
  {
    id: 'landing' as const,
    title: 'Landing page',
    body: 'Одностраничный сайт под рекламу и заявки.',
  },
  {
    id: 'corporate' as const,
    title: 'Корпоративный',
    body: 'Сайт компании: услуги, кейсы, контакты, SEO.',
  },
  {
    id: 'catalog' as const,
    title: 'Каталог',
    body: 'Витрина товаров или услуг с фильтрами.',
  },
  {
    id: 'shop' as const,
    title: 'Интернет-магазин',
    body: 'Онлайн-продажи: корзина, оплата, доставка.',
  },
]

export const WEB_DEV_PAYMENT_STAGES = [
  {
    step: '01',
    title: 'Исследование и ТЗ',
    body: 'Бриф, цели, структура, смета и договор.',
  },
  {
    step: '02',
    title: 'Дизайн и прототип',
    body: 'Интерфейсы, согласование макетов и ключевых экранов.',
  },
  {
    step: '03',
    title: 'Разработка и запуск',
    body: 'Код, интеграции, тесты, публикация и обучение.',
  },
] as const

export const WEB_DEV_CASES = [
  {
    title: 'Amba Detail',
    result: 'Единая витрина услуг и цен с понятным путём к заявке',
    href: '/portfolio/amba-detail',
    image: '/portfolio/amba.png',
  },
  {
    title: 'NEXTON',
    result: 'PWA автосервиса: app-like интерфейс, услуги для двух городов',
    href: '/portfolio/nexton',
    image: '/portfolio/nexton.png',
  },
  {
    title: 'Maxximum',
    result: 'Запись на пробные занятия с сайта спортивного центра',
    href: '/portfolio/maxximum',
    image: '/portfolio/maxximum.jpg',
  },
  {
    title: 'ArtDetailing',
    result: 'PWA детейлинг-студии: запись и SEO под заявки',
    href: '/portfolio/artdetailing',
    image: '/portfolio/artdetailing.png',
  },
] as const

export function getWebDevPackage(id: WebDevPackageId): WebDevPackage {
  return WEB_DEV_PACKAGES.find((p) => p.id === id) ?? WEB_DEV_PACKAGES[1]
}
