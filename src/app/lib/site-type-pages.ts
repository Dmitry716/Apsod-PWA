import { formatDualPrice } from './currency'
import { getWebDevPackage, WEB_DEV_CASES, type WebDevPackageId } from './web-dev-packages'

export type SiteTypeSlug = 'landing-page' | 'corporate-sites' | 'ecommerce'

export type SiteTypePage = {
  slug: SiteTypeSlug
  packageId: WebDevPackageId
  schemaName: string
  eyebrow: string
  h1: string
  lead: string
  priceLine: string
  outcomes: { title: string; body: string }[]
  caseTitles: string[]
  parentNote?: { label: string; href: string }
}

export const SITE_TYPE_PAGES: Record<SiteTypeSlug, SiteTypePage> = {
  'landing-page': {
    slug: 'landing-page',
    packageId: 'landing',
    schemaName: 'Разработка лендинга',
    eyebrow: 'Landing page',
    h1: 'Разработка лендинга в Минске',
    lead:
      'Одностраничный сайт под рекламу и заявки: сильный первый экран, оффер, форма и мессенджеры.',
    priceLine: `Ориентир — ${formatDualPrice(8000)}. Срок 2–4 недели. Смета после брифа.`,
    outcomes: [
      {
        title: 'Под рекламу',
        body: 'Структура под Яндекс / Google Ads и Meta: один оффер, понятный CTA, быстрая загрузка.',
      },
      {
        title: 'Заявки с телефона',
        body: 'Форма, WhatsApp и Telegram — короткий путь к контакту без лишних экранов.',
      },
      {
        title: 'SEO-база',
        body: 'Мета, разметка и скорость — чтобы лендинг не мешал органике и ремаркетингу.',
      },
      {
        title: 'Дизайн под оффер',
        body: 'Индивидуальная композиция и логика под ваш продукт.',
      },
    ],
    caseTitles: ['Amba Detail', 'ArtDetailing'],
    parentNote: { label: 'Все типы сайтов', href: '/services/web-development' },
  },
  'corporate-sites': {
    slug: 'corporate-sites',
    packageId: 'corporate',
    schemaName: 'Разработка корпоративного сайта',
    eyebrow: 'Корпоративный сайт',
    h1: 'Корпоративный сайт в Минске',
    lead:
      'Сайт компании под ключ: услуги, кейсы, команда, контакты и структура под SEO.',
    priceLine: `Ориентир — ${formatDualPrice(15000)}. Срок 4–8 недель. Смета после брифа.`,
    outcomes: [
      {
        title: 'До 10–15 страниц',
        body: 'Услуги, о компании, кейсы, блог при необходимости — без «пустых» разделов.',
      },
      {
        title: 'Под семантику',
        body: 'Иерархия и тексты под коммерческие запросы Минска и вашей ниши.',
      },
      {
        title: 'CMS для команды',
        body: 'Удобное редактирование контента без разработчика на каждую правку.',
      },
      {
        title: 'Скорость и доверие',
        body: 'Core Web Vitals, аналитика, формы и мессенджеры — сайт как канал продаж.',
      },
    ],
    caseTitles: ['NEXTON', 'Maxximum', 'Amba Detail'],
    parentNote: { label: 'Все типы сайтов', href: '/services/web-development' },
  },
  ecommerce: {
    slug: 'ecommerce',
    packageId: 'shop',
    schemaName: 'Разработка интернет-магазина',
    eyebrow: 'Интернет-магазин',
    h1: 'Разработка интернет-магазина в Минске',
    lead:
      'Каталог, корзина, оплата и доставка — витрина, которую удобно вести и масштабировать.',
    priceLine: `Ориентир — ${formatDualPrice(23000)}. Срок от 2–3 месяцев. Смета после брифа.`,
    outcomes: [
      {
        title: 'Полный цикл покупки',
        body: 'Каталог, карточка, корзина, чекаут и статусы заказа.',
      },
      {
        title: 'Интеграции',
        body: 'Оплата, доставка, CRM и уведомления — в одной аккуратной связке.',
      },
      {
        title: 'SEO каталога',
        body: 'Структура разделов, фильтры и скорость под органику в Минске и РБ.',
      },
      {
        title: 'Админка',
        body: 'Товары, цены, остатки и заказы — под вашу команду.',
      },
    ],
    caseTitles: ['Amba Detail', 'NEXTON'],
    parentNote: { label: 'Разработка сайтов', href: '/services/web-development' },
  },
}

export function getSiteTypeCases(slug: SiteTypeSlug) {
  const titles = new Set(SITE_TYPE_PAGES[slug].caseTitles)
  return WEB_DEV_CASES.filter((c) => titles.has(c.title))
}

export function getSiteTypePackage(slug: SiteTypeSlug) {
  return getWebDevPackage(SITE_TYPE_PAGES[slug].packageId)
}
