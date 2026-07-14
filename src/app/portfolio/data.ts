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
}

/** Порядок проектов на главной и в портфолио */
export const PORTFOLIO_PRIORITY_LINKS = [
  'https://ambadetail.by',
  'https://nexton.vip',
  'https://maxximum.by',
  'https://dynamovitebsk.by',
] as const

function normalizePortfolioLink(link: string): string {
  return link.replace(/\/+$/, '').toLowerCase()
}

/** Только реальные проекты APSOD (без чужих брендов) */
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
    id: 4,
    slug: 'sparkite',
    title: 'Sparkite',
    category: 'Мобильное приложение',
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
    category: 'Мобильное приложение',
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
