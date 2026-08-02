/** Стек APSOD — единый источник для лендингов, FAQ и секций «Технологии». */

export type TechStackCategory = {
  id: string
  title: string
  items: string[]
}

/** Полная карта компетенций по направлениям (2026). */
export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Angular',
      'Vue',
      'Nuxt',
      'Svelte',
      'SvelteKit',
      'Astro',
      'TypeScript',
      'Tailwind CSS',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: [
      'ASP.NET Core',
      'C#',
      'Node.js',
      'NestJS',
      'Express',
      'REST API',
      'GraphQL',
    ],
  },
  {
    id: 'data',
    title: 'Данные',
    items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'Prisma', 'Entity Framework'],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    items: [
      'React Native',
      'Flutter',
      'Swift',
      'SwiftUI',
      'Kotlin',
      'Jetpack Compose',
    ],
  },
  {
    id: 'infra',
    title: 'Инфраструктура',
    items: ['Docker', 'CI/CD', 'Vercel', 'Azure', 'Мониторинг'],
  },
]

/** Компактный ряд для секций «Стек» на веб-лендингах. */
export const WEB_STACK_CHIPS = [
  'Next.js',
  'React',
  'Angular',
  'Vue',
  'Svelte',
  'ASP.NET Core',
  'C#',
  'TypeScript',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Tailwind CSS',
] as const

export const ECOMMERCE_STACK_CHIPS = [
  'Next.js',
  'React',
  'ASP.NET Core',
  'C#',
  'Node.js',
  'PostgreSQL',
  'Оплата / эквайринг',
  'Доставка API',
  'CRM',
] as const

export const SUPPORT_STACK_CATEGORIES: TechStackCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Angular',
      'Vue',
      'Nuxt',
      'Svelte',
      'TypeScript',
      'Tailwind CSS',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: ['ASP.NET Core', 'C#', 'Node.js', 'NestJS', 'Express', 'REST API', 'GraphQL'],
  },
  {
    id: 'data',
    title: 'Базы данных',
    items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'Prisma', 'Entity Framework'],
  },
  {
    id: 'infra',
    title: 'Инфраструктура',
    items: ['Vercel', 'Azure', 'Docker', 'CI/CD', 'Мониторинг'],
  },
]
