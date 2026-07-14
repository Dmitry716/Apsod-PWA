export type PortfolioProject = {
  id: number
  title: string
  category: string
  type: 'web' | 'mobile'
  description: string
  image: string
  tags: string[]
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
    title: 'Amba Detail',
    category: 'Детейлинг студия',
    type: 'web',
    description:
      'Сайт студии детейлинга «Amba Detail» в Витебске. Услуги по уходу за автомобилем, портфолио работ и прайс-лист.',
    image: '/portfolio/amba.png',
    tags: ['Next.js', 'Tailwind CSS', 'Node.js'],
    link: 'https://ambadetail.by',
    color: 'from-orange-600 to-red-500',
    year: '2026',
    icon: '🚘',
    location: 'Витебск',
  },
  {
    id: 23,
    title: 'nexton.vip',
    category: 'Автосервис',
    type: 'web',
    description:
      'Сайт автосервиса NEXTON: заправка и ремонт кондиционеров, Webasto и системы охлаждения в Полоцке и Новополоцке.',
    image: '/portfolio/nexton.png',
    tags: ['Next.js', 'TypeScript', 'UI/UX'],
    link: 'https://nexton.vip',
    color: 'from-violet-600 to-fuchsia-600',
    year: '2026',
    icon: '💼',
    location: 'Полоцк',
  },
  {
    id: 2,
    title: 'Maxximum',
    category: 'Образование',
    type: 'web',
    description:
      'Сайт спортивно-образовательного центра «Maxximum» в Витебске: направления, расписание, тренеры и запись на пробные тренировки.',
    image: '/portfolio/maxximum.jpg',
    tags: ['React', 'TypeScript', 'Express'],
    link: 'https://maxximum.by',
    color: 'from-green-600 to-emerald-500',
    year: '2024',
    icon: '🏋️',
    location: 'Витебск',
  },
  {
    id: 1,
    title: 'Динамо-Витебск (СДЮШОР)',
    category: 'Спортивный сайт',
    type: 'web',
    description:
      'Официальный сайт СДЮШОР «Динамо-Витебск»: отделения, секции, блог, достижения воспитанников и тренерский состав.',
    image: '/portfolio/dynamo.png',
    tags: ['Next.js', 'Tailwind CSS', 'Node.js'],
    link: 'https://dynamovitebsk.by',
    color: 'from-blue-600 to-cyan-500',
    year: '2019',
    icon: '🏒',
    location: 'Витебск',
  },
  {
    id: 24,
    title: 'BMservice',
    category: 'Автосервис',
    type: 'web',
    description:
      'Сайт сервисного центра BMW, Mercedes и Land Rover в Витебске: услуги, блог и онлайн-запись.',
    image: '/portfolio/bmservice.jpg',
    tags: ['Next.js', 'SEO', 'UI/UX'],
    link: 'https://bmservice.by/',
    color: 'from-slate-700 to-gray-900',
    year: '2022',
    icon: '🔧',
    location: 'Витебск',
  },
  {
    id: 4,
    title: 'Sparkite',
    category: 'Мобильное приложение',
    type: 'mobile',
    description:
      'Реабилитационное приложение: цели и ежедневные чекины для возвращения к здоровому образу жизни.',
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
    title: 'Buzz',
    category: 'Мобильное приложение',
    type: 'mobile',
    description:
      'Приложение для поиска и организации событий в небольших городах с системой рекомендаций.',
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
    title: 'Erin Wesley',
    category: 'Веб-сайт',
    type: 'web',
    description:
      'Сайт-портфолио оператора-постановщика с GLSL-анимациями и кастомным скроллом.',
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
    title: 'VSE NASHI',
    category: 'Мобильное приложение',
    type: 'mobile',
    description:
      'Социальная платформа для русскоязычной диаспоры: работа, знакомства, услуги и события.',
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
    title: 'Vigbo',
    category: 'Веб-платформа',
    type: 'web',
    description:
      'Конструктор сайтов для творцов и предпринимателей с системой клиентских галерей.',
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
  const normalized = normalizePortfolioLink(project.link)
  const idx = PORTFOLIO_PRIORITY_LINKS.findIndex(
    (link) => normalizePortfolioLink(link) === normalized
  )
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

export function getFeaturedPortfolioProjects(): PortfolioProject[] {
  return PORTFOLIO_PRIORITY_LINKS.map((link) =>
    PORTFOLIO_PROJECTS.find(
      (p) => normalizePortfolioLink(p.link) === normalizePortfolioLink(link)
    )
  ).filter((p): p is PortfolioProject => p != null)
}

export function getSlugFromLink(link: string): string | null {
  if (link.startsWith('/portfolio/')) {
    return link.replace(/^\/portfolio\/?/, '').trim() || null
  }
  return null
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => getSlugFromLink(p.link) === slug)
}
