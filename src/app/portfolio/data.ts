export type PortfolioProject = {
  id: number
  slug: string
  title: string
  category: string
  type: 'web' | 'mobile'
  description: string
  /** Задача клиента */
  challenge: string
  /** Что сделали */
  solution: string
  /** Измеримые или качественные результаты (без выдуманных %) */
  results: string[]
  image: string
  tags: string[]
  /** Живой сайт или внешняя ссылка (если есть) */
  liveUrl?: string
  /** @deprecated используйте slug + liveUrl; оставлен для совместимости ссылок */
  link: string
  color: string
  year: string
  icon: string
  location: string
  /** Сайт выставлен на продажу как готовый продукт */
  forSale?: boolean
  /** slug в /ready-sites/[slug] */
  readySiteSlug?: string
}

/** Порядок проектов на главной и в портфолио */
export const PORTFOLIO_PRIORITY_LINKS = [
  'https://ambadetail.by',
  'https://nexton.vip',
  'https://maxximum.by',
  'https://dynamovitebsk.by',
  'https://bmservice.by',
  'https://artdetailing.by',
] as const

function normalizePortfolioLink(link: string): string {
  return link.replace(/\/+$/, '').toLowerCase()
}

/** Проекты APSOD: локальные кейсы + международные работы (США / UK) */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 3,
    slug: 'amba-detail',
    title: 'Amba Detail',
    category: 'Детейлинг студия',
    type: 'web',
    description:
      'Сайт студии детейлинга «Amba Detail» в Витебске. Услуги по уходу за автомобилем, портфолио работ и прайс-лист.',
    challenge:
      'Студия работала в основном через сарафан и мессенджеры: не было понятной витрины услуг и доверия для новых клиентов из поиска.',
    solution:
      'Собрали быстрый сайт на Next.js: услуги, портфолио работ, прайс и удобные точки контакта (звонок / WhatsApp). Структура под локальный поиск по Витебску.',
    results: [
      'Единая витрина услуг и цен вместо разрозненных сообщений',
      'Портфолио работ как аргумент для записи',
      'Сайт готов принимать заявки 24/7',
    ],
    image: '/portfolio/amba.png',
    tags: ['Next.js', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://ambadetail.by',
    link: 'https://ambadetail.by',
    color: 'from-orange-600 to-red-500',
    year: '2026',
    icon: '🚘',
    location: 'Витебск',
  },
  {
    id: 23,
    slug: 'nexton',
    title: 'nexton.vip',
    category: 'Автосервис',
    type: 'web',
    description:
      'Сайт автосервиса NEXTON: заправка и ремонт кондиционеров, Webasto и системы охлаждения в Полоцке и Новополоцке.',
    challenge:
      'Узкая специализация (кондиционеры, Webasto) терялась без сайта: клиенты из Полоцка/Новополоцка не находили сервис в поиске и не понимали перечень услуг.',
    solution:
      'Сделали сайт с понятной структурой услуг, гео-ориентацией на Полоцк и Новополоцк, акцентом на экспертизу и быстрый контакт.',
    results: [
      'Чёткая презентация узких услуг автосервиса',
      'Фокус на локальную аудиторию двух городов',
      'Удобный путь к записи / звонку',
    ],
    image: '/portfolio/nexton.png',
    tags: ['Next.js', 'TypeScript', 'UI/UX'],
    liveUrl: 'https://nexton.vip',
    link: 'https://nexton.vip',
    color: 'from-violet-600 to-fuchsia-600',
    year: '2026',
    icon: '💼',
    location: 'Полоцк',
  },
  {
    id: 2,
    slug: 'maxximum',
    title: 'Maxximum',
    category: 'Образование',
    type: 'web',
    description:
      'Сайт спортивно-образовательного центра «Maxximum» в Витебске: направления, расписание, тренеры и запись на пробные тренировки.',
    challenge:
      'Центру нужно было собрать направления, тренеров и запись на пробные занятия в одном месте — без конструктора и «шаблонного» вида.',
    solution:
      'Индивидуальный сайт: направления, расписание, команда тренеров и сценарий записи на пробную тренировку.',
    results: [
      'Единый цифровой канал центра',
      'Прозрачная презентация направлений и тренеров',
      'Запись на пробные занятия с сайта',
    ],
    image: '/portfolio/maxximum.jpg',
    tags: ['React', 'TypeScript', 'Express'],
    liveUrl: 'https://maxximum.by',
    link: 'https://maxximum.by',
    color: 'from-green-600 to-emerald-500',
    year: '2024',
    icon: '🏋️',
    location: 'Витебск',
  },
  {
    id: 1,
    slug: 'dynamo-vitebsk',
    title: 'Динамо-Витебск (СДЮШОР)',
    category: 'Спортивный сайт',
    type: 'web',
    description:
      'Официальный сайт СДЮШОР «Динамо-Витебск»: отделения, секции, блог, достижения воспитанников и тренерский состав.',
    challenge:
      'Школе нужен был официальный онлайн-представитель: отделения, секции, новости и доверие родителей — без зависимости от конструкторов.',
    solution:
      'Корпоративный сайт с разделами отделений, блогом, достижениями воспитанников и тренерским составом. Уникальный код, администрирование контента.',
    results: [
      'Официальная площадка школы в интернете',
      'Публикация новостей и достижений',
      'Долгоживущий проект на поддержке (с 2019)',
    ],
    image: '/portfolio/dynamo.png',
    tags: ['Next.js', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://dynamovitebsk.by',
    link: 'https://dynamovitebsk.by',
    color: 'from-blue-600 to-cyan-500',
    year: '2019',
    icon: '🏒',
    location: 'Витебск',
  },
  {
    id: 24,
    slug: 'bmservice',
    title: 'BMservice',
    category: 'Автосервис',
    type: 'web',
    description:
      'Сайт сервисного центра BMW, Mercedes и Land Rover в Витебске: услуги, блог и онлайн-запись.',
    challenge:
      'Премиальный сервис по марке нуждался в сайте, который отражает экспертизу по BMW / Mercedes / Land Rover и ведёт к записи.',
    solution:
      'Сайт услуг с блогом и онлайн-записью, акцент на марках и доверии к сервису.',
    results: [
      'Позиционирование как профильного сервиса марок',
      'Онлайн-запись и контент в блоге',
      'Канал заявок помимо телефонных звонков',
    ],
    image: '/portfolio/bmservice.jpg',
    tags: ['Next.js', 'SEO', 'UI/UX'],
    liveUrl: 'https://bmservice.by/',
    link: 'https://bmservice.by/',
    color: 'from-slate-700 to-gray-900',
    year: '2022',
    icon: '🔧',
    location: 'Витебск',
  },
  {
    id: 25,
    slug: 'artdetailing',
    title: 'ArtDetailing',
    category: 'Детейлинг студия',
    type: 'web',
    description:
      'PWA для детейлинг-студии ArtDetailing в Витебске: премиальный сайт-приложение с каталогом услуг, онлайн-записью, push-сценариями и сильным локальным SEO.',
    challenge:
      'Студии нужна была не визитка, а современный digital-канал: быстрый, как приложение, с записью, витриной работ и видимостью в поиске — без конструктора.',
    solution:
      'Собрали Progressive Web App на уникальном коде: app-like интерфейс, установка на телефон, каталог услуг (химчистка, полировка, оклейка, защита), фото/видео, запись и SEO под Витебск.',
    results: [
      'PWA: сайт работает как приложение на смартфоне',
      'Онлайн-запись и витрина услуг/комплексов',
      'Локальное SEO и база под GEO в нейросетях',
    ],
    image: '/portfolio/artdetailing.png',
    tags: ['PWA', 'Next.js', 'SEO', 'GEO'],
    liveUrl: 'https://artdetailing.by/',
    link: 'https://artdetailing.by/',
    color: 'from-rose-700 to-red-900',
    year: '2026',
    icon: '✨',
    location: 'Витебск',
    forSale: true,
    readySiteSlug: 'detailing-studio',
  },
  {
    id: 4,
    slug: 'sparkite',
    title: 'Sparkite',
    category: 'Медицина',
    type: 'mobile',
    description:
      'Реабилитационное приложение: цели и ежедневные чекины для возвращения к здоровому образу жизни.',
    challenge:
      'Нужен был продукт, который помогает держать реабилитационные цели ежедневно — не просто лендинг, а рабочее мобильное приложение.',
    solution:
      'React Native-приложение с целями, ежедневными чекинами и бэкендом на Node.js / PostgreSQL.',
    results: [
      'Рабочий MVP под iOS/Android-стек',
      'Ежедневные сценарии мотивации и контроля',
      'Серверная часть под рост аудитории',
    ],
    image: '/portfolio/sparkite.jpg',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    link: '/portfolio/sparkite',
    color: 'from-purple-600 to-pink-500',
    year: '2024',
    icon: '🧘',
    location: 'Нью-Йорк, США',
  },
  {
    id: 5,
    slug: 'buzz',
    title: 'Buzz',
    category: 'Развлечения',
    type: 'mobile',
    description:
      'Приложение для поиска и организации событий в небольших городах с системой рекомендаций.',
    challenge:
      'В малых городах сложно находить события: разобщённые группы в соцсетях и нет единого канала.',
    solution:
      'Flutter-приложение с картой, событиями и рекомендациями на Firebase.',
    results: [
      'Единая лента событий для локальной аудитории',
      'Карта и рекомендации для вовлечения',
      'Кроссплатформенная база для масштабирования',
    ],
    image: '/portfolio/buzz.jpg',
    tags: ['Flutter', 'Firebase', 'Google Maps API'],
    link: '/portfolio/buzz',
    color: 'from-yellow-500 to-orange-500',
    year: '2025',
    icon: '🎉',
    location: 'США',
  },
  {
    id: 6,
    slug: 'erin',
    title: 'Erin Wesley',
    category: 'Веб-сайт',
    type: 'web',
    description:
      'Сайт-портфолио оператора-постановщика с GLSL-анимациями и кастомным скроллом.',
    challenge:
      'Творческому портфолио нужен был запоминающийся сайт, а не шаблон Behance — с сильной визуальной драматургией.',
    solution:
      'Кастомный фронтенд на Next.js + Three.js / GSAP / GLSL, индивидуальный скролл и анимации.',
    results: [
      'Уникальный визуальный образ портфолио',
      'Высокий уровень motion и интерактива',
      'Отстройка от типовых шаблонов',
    ],
    image: '/portfolio/erin.jpg',
    tags: ['Next.js', 'Three.js', 'GSAP'],
    link: '/portfolio/erin',
    color: 'from-indigo-600 to-purple-500',
    year: '2023',
    icon: '🎬',
    location: 'Лос-Анджелес, США',
  },
  {
    id: 7,
    slug: 'vsenashi',
    title: 'VSE NASHI',
    category: 'Мобильное приложение',
    type: 'mobile',
    description:
      'Социальная платформа для русскоязычной диаспоры: работа, знакомства, услуги и события.',
    challenge:
      'Диаспоре нужен был свой хаб: работа, услуги, события и знакомства — без нагромождения несвязанных чатов.',
    solution:
      'Социальная платформа на React Native с сервером Node.js / MongoDB под ключевые сценарии сообщества.',
    results: [
      'Мобильный продукт под несколько сценариев сразу',
      'Архитектура под рост сообществ',
      'Единая точка входа для русскоязычной аудитории',
    ],
    image: '/portfolio/vsenashi.jpg',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    link: '/portfolio/vsenashi',
    color: 'from-teal-500 to-green-500',
    year: '2025',
    icon: '🌎',
    location: 'США',
  },
  {
    id: 8,
    slug: 'vigbo',
    title: 'Vigbo',
    category: 'Веб-платформа',
    type: 'web',
    description:
      'Конструктор сайтов для творцов и предпринимателей с системой клиентских галерей.',
    challenge:
      'Творцам нужна была платформа для презентации работ и клиентских галерей — гибче «голого» лендинга.',
    solution:
      'Веб-платформа на Vue.js с галереями клиентов и инфраструктурой на AWS.',
    results: [
      'Инструмент для регулярной публикации работ',
      'Клиентские галереи как часть продукта',
      'Масштабируемый хостинг-контур',
    ],
    image: '/portfolio/vigbo.jpg',
    tags: ['Vue.js', 'Node.js', 'AWS'],
    link: '/portfolio/vigbo',
    color: 'from-pink-500 to-rose-500',
    year: '2024',
    icon: '✨',
    location: 'Уэстон, Флорида, США',
  },
  {
    id: 26,
    slug: 'nordforge-industrial',
    title: 'NordForge Industrial',
    category: 'Производство',
    type: 'web',
    description:
      'Корпоративный B2B-сайт промышленного производителя: каталог решений, кейсы и лидогенерация для заводов США.',
    challenge:
      'Производителю нужна была цифровая витрина оборудования и комплектующих с понятным путём к запросу коммерческого предложения.',
    solution:
      'Корпоративный сайт на Next.js: каталог решений, отраслевые кейсы, формы RFQ и структура под технический поиск.',
    results: [
      'Единая презентация продуктовой линейки',
      'Канал заявок RFQ с сайта',
      'Готовность к SEO по промышленным запросам',
    ],
    image: '/portfolio/nordforge-industrial.jpg',
    tags: ['Next.js', 'B2B', 'SEO'],
    link: '/portfolio/nordforge-industrial',
    color: 'from-slate-600 to-zinc-800',
    year: '2024',
    icon: '🏭',
    location: 'Чикаго, США',
  },
  {
    id: 27,
    slug: 'meridian-ledger',
    title: 'Meridian Ledger',
    category: 'Финансы',
    type: 'web',
    description:
      'Сайт финтех-платформы для SMB в Великобритании: продукты, безопасность и онboarding к демо.',
    challenge:
      'Нужно было донести сложный финансовый продукт простым языком и вести к заявке на демо без перегруза.',
    solution:
      'Лендинг и продуктовые страницы с акцентом на доверие, безопасность и сценарий «запросить демо».',
    results: [
      'Понятная воронка к демо',
      'Блоки доверия и compliance-ready контент',
      'Адаптив под desktop и mobile',
    ],
    image: '/portfolio/meridian-ledger.jpg',
    tags: ['Next.js', 'FinTech', 'UI/UX'],
    link: '/portfolio/meridian-ledger',
    color: 'from-indigo-800 to-blue-900',
    year: '2025',
    icon: '💷',
    location: 'Лондон, Великобритания',
  },
  {
    id: 28,
    slug: 'harbor-health',
    title: 'Harbor Health',
    category: 'Медицина',
    type: 'web',
    description:
      'Сайт частной клиники в Бостоне: услуги, врачи и онлайн-запись на приём.',
    challenge:
      'Клинике нужна была спокойная digital-витрина с записью, без «шаблонного» медицинского конструктора.',
    solution:
      'Сайт услуг и команды врачей с удобной записью и локальным SEO по направлениям.',
    results: [
      'Онлайн-запись как основной канал',
      'Прозрачная структура услуг',
      'Доверительный визуальный образ клиники',
    ],
    image: '/portfolio/harbor-health.jpg',
    tags: ['Next.js', 'Healthcare', 'SEO'],
    link: '/portfolio/harbor-health',
    color: 'from-teal-600 to-cyan-700',
    year: '2024',
    icon: '🏥',
    location: 'Бостон, США',
  },
  {
    id: 29,
    slug: 'oak-and-thread',
    title: 'Oak & Thread',
    category: 'Ритейл',
    type: 'web',
    description:
      'Интернет-магазин британского fashion-бренда: каталог, карточки товаров и оформление заказа.',
    challenge:
      'Бренду нужен был магазин с сильным визуалом и быстрым путём к покупке, а не типовая тема Shopify «из коробки».',
    solution:
      'Кастомный storefront: каталог, фильтры, карточки и checkout-сценарий под fashion-ритейл.',
    results: [
      'Витрина под бренд, а не шаблон',
      'Удобный каталог и карточки товаров',
      'Готовность к масштабированию ассортимента',
    ],
    image: '/portfolio/oak-and-thread.jpg',
    tags: ['Next.js', 'E-commerce', 'UI/UX'],
    link: '/portfolio/oak-and-thread',
    color: 'from-stone-600 to-amber-800',
    year: '2025',
    icon: '🛍️',
    location: 'Манчестер, Великобритания',
  },
  {
    id: 30,
    slug: 'clearroute-logistics',
    title: 'ClearRoute Logistics',
    category: 'Логистика',
    type: 'web',
    description:
      'Корпоративный сайт логистического оператора в Техасе: услуги, трекинг и запрос тарифа.',
    challenge:
      'Оператору нужна была B2B-площадка с понятными услугами и быстрым запросом расчёта доставки.',
    solution:
      'Сайт услуг с виджетом трекинга, отраслевыми сценариями и формой quote request.',
    results: [
      'Прозрачная презентация логистических услуг',
      'Заявки на расчёт тарифа с сайта',
      'Структура под коммерческий поиск',
    ],
    image: '/portfolio/clearroute-logistics.jpg',
    tags: ['Next.js', 'B2B', 'Logistics'],
    link: '/portfolio/clearroute-logistics',
    color: 'from-orange-600 to-slate-800',
    year: '2023',
    icon: '🚚',
    location: 'Даллас, США',
  },
  {
    id: 31,
    slug: 'brightpath-academy',
    title: 'BrightPath Academy',
    category: 'Образование',
    type: 'web',
    description:
      'Платформа онлайн-курсов в Техасе: каталог программ, прогресс обучения и регистрация.',
    challenge:
      'EdTech-проекту нужна была витрина курсов и онboarding учеников без тяжёлой «учебной» CMS.',
    solution:
      'Сайт академии с каталогом курсов, карточками программ и сценарием регистрации.',
    results: [
      'Понятный каталог образовательных программ',
      'Путь к регистрации с лендинга курса',
      'Адаптивный интерфейс под mobile-first',
    ],
    image: '/portfolio/brightpath-academy.jpg',
    tags: ['Next.js', 'EdTech', 'UI/UX'],
    link: '/portfolio/brightpath-academy',
    color: 'from-indigo-600 to-violet-700',
    year: '2025',
    icon: '🎓',
    location: 'Остин, США',
  },
  {
    id: 32,
    slug: 'solara-grid',
    title: 'Solara Grid',
    category: 'Энергетика',
    type: 'web',
    description:
      'Сайт компании чистой энергетики в Калифорнии: решения, проекты и лиды для B2B/B2C.',
    challenge:
      'Нужно было упаковать сложные energy-решения в понятные сценарии и собирать заявки с сайта.',
    solution:
      'Корпоративный сайт с блоками решений, картой проектов и конверсионными формами.',
    results: [
      'Ясная презентация renewable-направлений',
      'Лиды с сайта для sales-команды',
      'Визуальный акцент на sustainability',
    ],
    image: '/portfolio/solara-grid.jpg',
    tags: ['Next.js', 'Corporate', 'SEO'],
    link: '/portfolio/solara-grid',
    color: 'from-emerald-600 to-sky-700',
    year: '2024',
    icon: '☀️',
    location: 'Калифорния, США',
  },
  {
    id: 33,
    slug: 'stagewire-events',
    title: 'StageWire',
    category: 'Развлечения',
    type: 'web',
    description:
      'Платформа событий и билетов в Лондоне: афиша, карточки мероприятий и покупка билетов.',
    challenge:
      'Организаторам нужна была яркая афиша с быстрым путём к билету, а не статичный «сайт клуба».',
    solution:
      'Event-платформа: лента событий, карточки шоу и сценарий покупки / бронирования.',
    results: [
      'Живая афиша с удобными карточками',
      'Короткий путь к билету',
      'Мобильный UX для вечерней аудитории',
    ],
    image: '/portfolio/stagewire-events.jpg',
    tags: ['Next.js', 'Events', 'UI/UX'],
    link: '/portfolio/stagewire-events',
    color: 'from-fuchsia-600 to-purple-800',
    year: '2025',
    icon: '🎭',
    location: 'Лондон, Великобритания',
  },
  {
    id: 34,
    slug: 'apex-advisory',
    title: 'Apex Advisory',
    category: 'Консалтинг',
    type: 'web',
    description:
      'Сайт консалтинговой практики в Нью-Йорке: услуги, кейсы и запрос консультации.',
    challenge:
      'Бюро нужна была строгая digital-визитка с кейсами и понятным CTA на консультацию.',
    solution:
      'Корпоративный сайт: услуги, выбранции, кейсы и форма запроса стратегии.',
    results: [
      'Доверительный образ практики',
      'Кейсы как аргумент продаж',
      'Заявки на консультацию с сайта',
    ],
    image: '/portfolio/apex-advisory.jpg',
    tags: ['Next.js', 'Consulting', 'SEO'],
    link: '/portfolio/apex-advisory',
    color: 'from-gray-700 to-stone-900',
    year: '2023',
    icon: '🧭',
    location: 'Нью-Йорк, США',
  },
]

export function getFeaturedRank(project: PortfolioProject): number {
  const candidates = [project.liveUrl, project.link].filter(Boolean) as string[]
  const idx = PORTFOLIO_PRIORITY_LINKS.findIndex((link) =>
    candidates.some((c) => normalizePortfolioLink(c) === normalizePortfolioLink(link))
  )
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

export function getFeaturedPortfolioProjects(): PortfolioProject[] {
  return PORTFOLIO_PRIORITY_LINKS.map((link) =>
    PORTFOLIO_PROJECTS.find((p) => {
      const candidates = [p.liveUrl, p.link].filter(Boolean) as string[]
      return candidates.some(
        (c) => normalizePortfolioLink(c) === normalizePortfolioLink(link)
      )
    })
  ).filter((p): p is PortfolioProject => p != null)
}

export function getCasePath(project: PortfolioProject): string {
  return `/portfolio/${project.slug}`
}

export function getSlugFromLink(link: string): string | null {
  if (link.startsWith('/portfolio/')) {
    return link.replace(/^\/portfolio\/?/, '').trim() || null
  }
  return null
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find(
    (p) => p.slug === slug || getSlugFromLink(p.link) === slug
  )
}

export function getAllPortfolioSlugs(): string[] {
  return PORTFOLIO_PROJECTS.map((p) => p.slug)
}
