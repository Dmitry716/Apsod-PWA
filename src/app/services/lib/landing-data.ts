import type { DeviceKind } from '../../components/DeviceMockup'
import type { DevelopmentPhase } from './development-process'
import {
  MOBILE_DEVELOPMENT_PROCESS,
  WEB_DEVELOPMENT_PROCESS,
} from './development-process'
import { formatDualPrice } from '../../lib/currency'
import type { ServicePath } from '../../lib/seo'

export type ServiceLandingCase = {
  title: string
  result: string
  href: string
  image: string
}

export type ServiceLandingScreen = {
  src: string
  alt: string
  device: DeviceKind
}

export type ServiceLandingContent = {
  slug: ServicePath
  schemaName: string
  schemaDescription: string
  eyebrow: string
  title: string
  lead: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  heroDevice: DeviceKind
  heroScreen: { src: string; alt: string }
  outcomes: { title: string; body: string }[]
  screens: ServiceLandingScreen[]
  stack: string[]
  processTitle: string
  processSubtitle: string
  process: DevelopmentPhase[]
  cases: ServiceLandingCase[]
  priceNote?: string
}

export const SERVICE_LANDINGS: Partial<Record<ServicePath, ServiceLandingContent>> = {
  'web-development': {
    slug: 'web-development',
    schemaName: 'Разработка сайтов',
    schemaDescription:
      'Разработка сайтов в Минске: лендинг, корпоративный сайт, каталог на Next.js и React.',
    eyebrow: 'Веб-разработка',
    title: 'Разработка сайтов любой сложности',
    lead: 'Лендинг, корпоративный сайт или каталог — проектируем, собираем на собственном коде и запускаем как продукт.',
    primaryCta: { label: 'Смотреть работы', href: '/portfolio' },
    secondaryCta: { label: 'Начать проект', href: '/contact' },
    heroDevice: 'desktop',
    heroScreen: { src: '/portfolio/apex-advisory.jpg', alt: 'Corporate website' },
    outcomes: [
      {
        title: 'Канал заявок',
        body: 'Структура, CTA и аналитика под коммерческие цели.',
      },
      {
        title: 'Собственный код',
        body: 'Next.js / React: скорость, SEO и контроль над развитием.',
      },
      {
        title: 'Готовность к росту',
        body: 'Разметка, интеграции с CRM и оплатой, сопровождение после запуска.',
      },
    ],
    screens: [
      { src: '/portfolio/apex-advisory.jpg', alt: 'Corporate advisory', device: 'desktop' },
      { src: '/portfolio/harbor-health.jpg', alt: 'Medical clinic', device: 'desktop' },
      { src: '/portfolio/oak-and-thread.jpg', alt: 'Fashion storefront', device: 'desktop' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    processTitle: 'Как создаём сайт',
    processSubtitle: 'От брифа до запуска — прозрачные этапы и артефакты.',
    process: WEB_DEVELOPMENT_PROCESS,
    cases: [
      {
        title: 'Apex Advisory',
        result: 'Корпоративный сайт: стратегия, кейсы, контакт',
        href: '/portfolio/apex-advisory',
        image: '/portfolio/apex-advisory.jpg',
      },
      {
        title: 'Harbor Health',
        result: 'Клиника: услуги, запись, понятная структура',
        href: '/portfolio/harbor-health',
        image: '/portfolio/harbor-health.jpg',
      },
      {
        title: 'Oak & Thread',
        result: 'Витрина и каталог с чистым UX покупки',
        href: '/portfolio/oak-and-thread',
        image: '/portfolio/oak-and-thread.jpg',
      },
    ],
    priceNote: `Ориентир: лендинг — ${formatDualPrice(8000)}, корпоративный — ${formatDualPrice(15000)}.`,
  },

  ecommerce: {
    slug: 'ecommerce',
    schemaName: 'Разработка интернет-магазина',
    schemaDescription:
      'Разработка интернет-магазина в Минске: каталог, корзина, оплата, доставка и админка на собственном коде.',
    eyebrow: 'E-commerce',
    title: 'Разработка интернет-магазина',
    lead: 'Каталог, корзина, оплата и доставка — собираем витрину продаж, которую удобно вести и масштабировать.',
    primaryCta: { label: 'Обсудить магазин', href: '/contact' },
    secondaryCta: { label: 'Смотреть кейсы', href: '/portfolio' },
    heroDevice: 'desktop',
    heroScreen: { src: '/portfolio/oak-and-thread.jpg', alt: 'Fashion e-commerce storefront' },
    outcomes: [
      {
        title: 'Полный цикл покупки',
        body: 'Каталог, карточка, корзина, чекаут и статусы заказа.',
      },
      {
        title: 'Интеграции',
        body: 'Оплата, доставка, CRM и уведомления без «зоопарка» плагинов.',
      },
      {
        title: 'SEO каталога',
        body: 'Структура разделов, фильтры и скорость под органику.',
      },
      {
        title: 'Админка',
        body: 'Товары, цены, остатки и заказы — под вашу команду.',
      },
      {
        title: 'Мобильная витрина',
        body: 'Быстрый UX на телефоне: поиск, фильтры и оформление заказа.',
      },
      {
        title: 'Аналитика продаж',
        body: 'События воронки, источники трафика и отчёты для роста.',
      },
    ],
    screens: [
      { src: '/portfolio/oak-and-thread.jpg', alt: 'Fashion store', device: 'desktop' },
      { src: '/portfolio/best-buy-wide.jpg', alt: 'Best Buy storefront', device: 'desktop' },
      { src: '/portfolio/costco-wide.jpg', alt: 'Costco storefront', device: 'desktop' },
    ],
    stack: [
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Оплата / эквайринг',
      'Доставка API',
      'CRM',
    ],
    processTitle: 'Как запускаем магазин',
    processSubtitle: 'От ассортимента и сценариев покупки до оплаты и публикации.',
    process: WEB_DEVELOPMENT_PROCESS,
    cases: [
      {
        title: 'Oak & Thread',
        result: 'Fashion e-commerce: каталог, карточки и чистый checkout-путь',
        href: '/portfolio/oak-and-thread',
        image: '/portfolio/oak-and-thread.jpg',
      },
      {
        title: 'StageWire',
        result: 'Афиша и покупка билетов: каталог событий и короткий путь к оплате',
        href: '/portfolio/stagewire-events',
        image: '/portfolio/stagewire-events.jpg',
      },
      {
        title: 'BrightPath Academy',
        result: 'Каталог курсов и регистрация — витрина с понятным сценарием покупки',
        href: '/portfolio/brightpath-academy',
        image: '/portfolio/brightpath-academy.jpg',
      },
    ],
    priceNote: `Ориентир интернет-магазина — ${formatDualPrice(23000)}. Точная смета после брифа.`,
  },

  'ios-apps': {
    slug: 'ios-apps',
    schemaName: 'Разработка приложений для iOS',
    schemaDescription:
      'Разработка мобильных приложений для iOS в Минске: Swift, SwiftUI, React Native. Публикация в App Store.',
    eyebrow: 'iOS · iPhone 17 Pro Max',
    title: 'Разработка приложений для iOS',
    lead: 'Нативный Swift или кроссплатформа — продукт под App Store с UX, достойным экосистемы Apple.',
    primaryCta: { label: 'Начать Discovery', href: '/contact' },
    secondaryCta: { label: 'Все мобильные', href: '/services/mobile-development' },
    heroDevice: 'iphone',
    heroScreen: { src: '/devices/app-screens/home.png', alt: 'Главный экран приложения' },
    outcomes: [
      {
        title: 'App Store ready',
        body: 'Сборка, подпись, гайдлайны Apple и публикация.',
      },
      {
        title: 'Нативный UX',
        body: 'SwiftUI / UIKit или React Native с нативным ощущением.',
      },
      {
        title: 'Бэкенд и push',
        body: 'API, авторизация, уведомления и аналитика.',
      },
    ],
    screens: [
      { src: '/devices/app-screens/home.png', alt: 'Главный экран', device: 'iphone' },
      { src: '/devices/app-screens/services.png', alt: 'Список услуг', device: 'iphone' },
      { src: '/devices/app-screens/booking.png', alt: 'Запись', device: 'iphone' },
    ],
    stack: ['Swift', 'SwiftUI', 'React Native', 'TypeScript', 'Firebase', 'Node.js'],
    processTitle: 'Как делаем iOS-приложение',
    processSubtitle: 'От Discovery и прототипа до релиза в App Store.',
    process: MOBILE_DEVELOPMENT_PROCESS,
    cases: [
      {
        title: 'ArtDetailing',
        result: 'PWA с мобильным UX под запись',
        href: '/portfolio/artdetailing',
        image: '/portfolio/artdetailing.png',
      },
      {
        title: 'NEXTON',
        result: 'App-like интерфейс автосервиса',
        href: '/portfolio/nexton',
        image: '/portfolio/nexton.png',
      },
      {
        title: 'Amba Detail',
        result: 'Витрина услуг с сильным мобильным сценарием',
        href: '/portfolio/amba-detail',
        image: '/portfolio/amba.png',
      },
    ],
    priceNote: `Ориентир MVP — ${formatDualPrice(12000)}. Смета после Discovery.`,
  },

  'android-apps': {
    slug: 'android-apps',
    schemaName: 'Разработка приложений для Android',
    schemaDescription:
      'Разработка мобильных приложений для Android в Минске: Kotlin, Jetpack Compose, React Native. Публикация в Google Play.',
    eyebrow: 'Android · Samsung Galaxy S26',
    title: 'Разработка приложений для Android',
    lead: 'Kotlin или кроссплатформа — стабильный продукт под Google Play и широкий парк устройств.',
    primaryCta: { label: 'Начать Discovery', href: '/contact' },
    secondaryCta: { label: 'Все мобильные', href: '/services/mobile-development' },
    heroDevice: 'samsung',
    heroScreen: { src: '/devices/app-screens/home.png', alt: 'Главный экран приложения' },
    outcomes: [
      {
        title: 'Google Play ready',
        body: 'Сборка, политики стора и публикация.',
      },
      {
        title: 'Современный UI',
        body: 'Jetpack Compose или React Native под Material You.',
      },
      {
        title: 'Производительность',
        body: 'Оптимизация под разные экраны и версии Android.',
      },
    ],
    screens: [
      { src: '/devices/app-screens/home.png', alt: 'Главный экран', device: 'samsung' },
      { src: '/devices/app-screens/services.png', alt: 'Список услуг', device: 'samsung' },
      { src: '/devices/app-screens/booking.png', alt: 'Запись', device: 'samsung' },
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'React Native', 'TypeScript', 'Firebase', 'Node.js'],
    processTitle: 'Как делаем Android-приложение',
    processSubtitle: 'От Discovery и прототипа до релиза в Google Play.',
    process: MOBILE_DEVELOPMENT_PROCESS,
    cases: [
      {
        title: 'ArtDetailing',
        result: 'PWA с мобильным UX под запись',
        href: '/portfolio/artdetailing',
        image: '/portfolio/artdetailing.png',
      },
      {
        title: 'NEXTON',
        result: 'App-like интерфейс автосервиса',
        href: '/portfolio/nexton',
        image: '/portfolio/nexton.png',
      },
      {
        title: 'Amba Detail',
        result: 'Витрина услуг с сильным мобильным сценарием',
        href: '/portfolio/amba-detail',
        image: '/portfolio/amba.png',
      },
    ],
    priceNote: `Ориентир MVP — ${formatDualPrice(12000)}. Смета после Discovery.`,
  },
}

export function getServiceLanding(slug: ServicePath): ServiceLandingContent | undefined {
  return SERVICE_LANDINGS[slug]
}
