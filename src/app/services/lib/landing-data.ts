import type { DeviceKind } from '../../components/DeviceMockup'
import type { DevelopmentPhase } from './development-process'
import {
  MOBILE_DEVELOPMENT_PROCESS,
  WEB_DEVELOPMENT_PROCESS,
} from './development-process'
import type { ServicePath } from '../../lib/seo'
import {
  ANDROID_STACK,
  ECOMMERCE_STACK,
  IOS_STACK,
  WEB_STACK,
  type TechItem,
} from '../../lib/tech-stack'

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
  audience?: string[]
  useCases?: { title: string; body: string }[]
  includes?: string[]
  screens: ServiceLandingScreen[]
  stack: TechItem[]
  processTitle: string
  processSubtitle: string
  process: DevelopmentPhase[]
  cases: ServiceLandingCase[]
}

export const SERVICE_LANDINGS: Partial<Record<ServicePath, ServiceLandingContent>> = {
  'web-development': {
    slug: 'web-development',
    schemaName: 'Разработка сайтов',
    schemaDescription:
      'Разработка сайтов в Минске: лендинг, корпоративный сайт, каталог на Next.js, Angular, Vue и ASP.NET Core.',
    eyebrow: 'Веб-разработка',
    title: 'Разработка сайтов любой сложности',
    lead: 'Лендинг, корпоративный сайт или каталог — проектируем, собираем и запускаем как продукт.',
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
        title: 'Инженерия под продукт',
        body: 'Next.js, Angular, Vue, Svelte или ASP.NET Core — стек под задачу и развитие.',
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
    stack: WEB_STACK,
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
  },

  ecommerce: {
    slug: 'ecommerce',
    schemaName: 'Разработка интернет-магазина',
    schemaDescription:
      'Разработка интернет-магазина в Минске: каталог, корзина, оплата, доставка и админка.',
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
    stack: ECOMMERCE_STACK,
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
    heroScreen: {
      src: '/devices/app-screens/serious/bank-home.jpg',
      alt: 'Northline — главный экран банкинга',
    },
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
      {
        src: '/devices/app-screens/serious/bank-home.jpg',
        alt: 'Банкинг — баланс и операции',
        device: 'iphone',
      },
      {
        src: '/devices/app-screens/serious/bank-cards.jpg',
        alt: 'Банкинг — карты и лимиты',
        device: 'iphone',
      },
      {
        src: '/devices/app-screens/serious/social-feed.jpg',
        alt: 'Соцсеть — лента',
        device: 'iphone',
      },
    ],
    stack: IOS_STACK,
    processTitle: 'Как делаем iOS-приложение',
    processSubtitle: 'От Discovery и прототипа до релиза в App Store.',
    process: MOBILE_DEVELOPMENT_PROCESS,
    cases: [
      {
        title: 'Northline',
        result: 'Мобильный банкинг: счета, карты, переводы',
        href: '/portfolio/northline',
        image: '/portfolio/northline.jpg',
      },
      {
        title: 'North',
        result: 'Социальная сеть: лента, stories, сообщения',
        href: '/portfolio/north-social',
        image: '/portfolio/north-social.jpg',
      },
      {
        title: 'VSE NASHI',
        result: 'Социальная платформа для сообщества',
        href: '/portfolio/vsenashi',
        image: '/portfolio/vsenashi.jpg',
      },
    ],
  },

  'android-apps': {
    slug: 'android-apps',
    schemaName: 'Разработка приложений для Android',
    schemaDescription:
      'Мобильные приложения для Android: Kotlin, Jetpack Compose, React Native. Публикация в Google Play.',
    eyebrow: 'Android',
    title: 'Разработка приложений для Android',
    lead: 'Kotlin или кроссплатформа — стабильный продукт под Google Play и широкий парк устройств.',
    primaryCta: { label: 'Начать Discovery', href: '/contact' },
    secondaryCta: { label: 'Все мобильные', href: '/services/mobile-development' },
    heroDevice: 'samsung',
    heroScreen: {
      src: '/devices/app-screens/serious/social-feed.jpg',
      alt: 'North — лента социальной сети',
    },
    outcomes: [
      {
        title: 'Google Play ready',
        body: 'Сборка, политики стора, внутреннее тестирование и публикация.',
      },
      {
        title: 'Современный UI',
        body: 'Jetpack Compose или React Native под Material You.',
      },
      {
        title: 'Производительность',
        body: 'Оптимизация под разные экраны и версии Android.',
      },
      {
        title: 'Бэкенд и push',
        body: 'API, авторизация, уведомления и аналитика событий.',
      },
      {
        title: 'MVP или продукт',
        body: 'От первого релиза до масштабирования фич без смены стека.',
      },
      {
        title: 'Поддержка после релиза',
        body: 'Обновления ОС, стора и доработки по договору.',
      },
    ],
    audience: [
      'Нужно Android-приложение с публикацией в Google Play',
      'Есть идея MVP и нужно понять срок и объём после Discovery',
      'Нужен натив на Kotlin или кроссплатформа на React Native',
      'Уже есть iOS — хотите Android без потери качества UX',
    ],
    useCases: [
      {
        title: 'Банкинг и финансы',
        body: 'Счета, карты, переводы, лимиты и история операций.',
      },
      {
        title: 'Социальные сети',
        body: 'Лента, профили, сообщения, медиа и push.',
      },
      {
        title: 'Клиентский портал',
        body: 'Авторизация, документы, уведомления и история обращений.',
      },
      {
        title: 'Полевые сотрудники',
        body: 'Офлайн-сценарии, фото/отчёты, синхронизация с CRM.',
      },
    ],
    includes: [
      'Discovery: сценарии, платформы, интеграции',
      'UX/UI под Android и Material',
      'Разработка на Kotlin / Compose или React Native',
      'API, push, аналитика (по брифу)',
      'Сборка и публикация в Google Play',
      'Передача и поддержка после релиза',
    ],
    screens: [
      {
        src: '/devices/app-screens/serious/social-feed.jpg',
        alt: 'Соцсеть — лента',
        device: 'samsung',
      },
      {
        src: '/devices/app-screens/serious/social-chat.jpg',
        alt: 'Соцсеть — сообщения',
        device: 'samsung',
      },
      {
        src: '/devices/app-screens/serious/bank-home.jpg',
        alt: 'Банкинг — баланс',
        device: 'samsung',
      },
    ],
    stack: ANDROID_STACK,
    processTitle: 'Как делаем Android-приложение',
    processSubtitle: 'От Discovery и прототипа до релиза в Google Play.',
    process: MOBILE_DEVELOPMENT_PROCESS,
    cases: [
      {
        title: 'North',
        result: 'Социальная сеть: лента, stories, сообщения',
        href: '/portfolio/north-social',
        image: '/portfolio/north-social.jpg',
      },
      {
        title: 'Northline',
        result: 'Мобильный банкинг: счета, карты, переводы',
        href: '/portfolio/northline',
        image: '/portfolio/northline.jpg',
      },
      {
        title: 'VSE NASHI',
        result: 'Социальная платформа для сообщества',
        href: '/portfolio/vsenashi',
        image: '/portfolio/vsenashi.jpg',
      },
    ],
  },
}

export function getServiceLanding(slug: ServicePath): ServiceLandingContent | undefined {
  return SERVICE_LANDINGS[slug]
}
