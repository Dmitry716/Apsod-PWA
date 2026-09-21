export type WebDevPackageId = 'landing' | 'corporate' | 'catalog' | 'shop'

export type WebDevPackage = {
  id: WebDevPackageId
  title: string
  term: string
  goal: string
  budget: string
  highlight: boolean
  items: string[]
}

const packageFrom = (
  id: WebDevPackageId,
  title: string,
  term: string,
  goal: string,
  budget: string,
  highlight: boolean,
  items: string[]
): WebDevPackage => ({
  id,
  title,
  term,
  goal,
  budget,
  highlight,
  items,
})

/** Единые форматы веб-разработки — /services/web-development и гео-офферы */
export const WEB_DEV_PACKAGES: WebDevPackage[] = [
  packageFrom(
    'landing',
    'Лендинг',
    '2–4 недели',
    'landing',
    'landing',
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
    '4–8 недель',
    'corporate',
    'corporate',
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
    '4–8 недель',
    'corporate',
    'corporate',
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
    'от 2–3 месяцев',
    'shop',
    'shop',
    false,
    [
      'Каталог, корзина, оплата',
      'Интеграции доставки и CRM',
      'Админка и SEO каталога',
      'Обучение и запуск',
    ]
  ),
]

/** Форматы для сетки на /services/web-development (без отдельной карточки каталога) */
export const WEB_DEV_FEATURED_PACKAGES = WEB_DEV_PACKAGES.filter(
  (p) => p.id === 'landing' || p.id === 'corporate' || p.id === 'shop'
)

export const WEB_DEV_SITE_TYPES = [
  {
    id: 'landing' as const,
    title: 'Лендинг',
    body: 'Одностраничный сайт под рекламу и заявки.',
    href: '/services/landing-page',
  },
  {
    id: 'corporate' as const,
    title: 'Корпоративный сайт',
    body: 'Сайт компании: услуги, кейсы, контакты, SEO.',
    href: '/services/corporate-sites',
  },
  {
    id: 'catalog' as const,
    title: 'Каталог',
    body: 'Витрина товаров или услуг с фильтрами.',
    href: '/services/corporate-sites',
  },
  {
    id: 'shop' as const,
    title: 'Интернет-магазин',
    body: 'Онлайн-продажи: корзина, оплата, доставка.',
    href: '/services/ecommerce',
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
    result: 'Витрина услуг и цен + путь к заявке с телефона за один экран',
    href: '/portfolio/amba-detail',
    image: '/portfolio/amba.png',
  },
  {
    title: 'NEXTON',
    result: 'PWA автосервиса: app-like UX, услуги для двух городов без App Store',
    href: '/portfolio/nexton',
    image: '/portfolio/nexton.png',
  },
  {
    title: 'Maxximum',
    result: 'Запись на пробные занятия прямо с сайта спортивного центра',
    href: '/portfolio/maxximum',
    image: '/portfolio/maxximum.jpg',
  },
  {
    title: 'ArtDetailing',
    result: 'PWA студии: запись, каталог услуг и SEO-база под заявки',
    href: '/portfolio/artdetailing',
    image: '/portfolio/artdetailing.png',
  },
] as const

export function getWebDevPackage(id: WebDevPackageId): WebDevPackage {
  return WEB_DEV_PACKAGES.find((p) => p.id === id) ?? WEB_DEV_PACKAGES[1]
}
