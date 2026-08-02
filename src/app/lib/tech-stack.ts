/** Стек APSOD — единый источник для лендингов, FAQ и секций «Технологии». */

export type TechIconId =
  | 'react'
  | 'nextjs'
  | 'angular'
  | 'vue'
  | 'nuxt'
  | 'svelte'
  | 'sveltekit'
  | 'astro'
  | 'typescript'
  | 'tailwind'
  | 'aspnet'
  | 'csharp'
  | 'nodejs'
  | 'nestjs'
  | 'express'
  | 'rest'
  | 'graphql'
  | 'postgresql'
  | 'sqlserver'
  | 'mongodb'
  | 'redis'
  | 'prisma'
  | 'efcore'
  | 'reactnative'
  | 'flutter'
  | 'swift'
  | 'swiftui'
  | 'kotlin'
  | 'compose'
  | 'docker'
  | 'cicd'
  | 'vercel'
  | 'azure'
  | 'monitoring'
  | 'payments'
  | 'shipping'
  | 'crm'
  | 'firebase'

export type TechItem = {
  id: string
  name: string
  icon: TechIconId
  /** Brand accent for hover (hex) */
  accent: string
}

export type TechStackCategory = {
  id: string
  title: string
  items: TechItem[]
}

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      { id: 'react', name: 'React JS', icon: 'react', accent: '#61DAFB' },
      { id: 'nextjs', name: 'Next.js', icon: 'nextjs', accent: '#0A0A0A' },
      { id: 'angular', name: 'Angular', icon: 'angular', accent: '#DD0031' },
      { id: 'vue', name: 'Vue.js', icon: 'vue', accent: '#42B883' },
      { id: 'nuxt', name: 'Nuxt.js', icon: 'nuxt', accent: '#00DC82' },
      { id: 'svelte', name: 'Svelte', icon: 'svelte', accent: '#FF3E00' },
      { id: 'sveltekit', name: 'SvelteKit', icon: 'sveltekit', accent: '#FF3E00' },
      { id: 'astro', name: 'Astro', icon: 'astro', accent: '#FF5D01' },
      { id: 'typescript', name: 'TypeScript', icon: 'typescript', accent: '#3178C6' },
      { id: 'tailwind', name: 'Tailwind CSS', icon: 'tailwind', accent: '#38BDF8' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: [
      { id: 'aspnet', name: 'ASP.NET Core', icon: 'aspnet', accent: '#512BD4' },
      { id: 'csharp', name: 'C#', icon: 'csharp', accent: '#239120' },
      { id: 'nodejs', name: 'Node.js', icon: 'nodejs', accent: '#5FA04E' },
      { id: 'nestjs', name: 'NestJS', icon: 'nestjs', accent: '#E0234E' },
      { id: 'express', name: 'Express.js', icon: 'express', accent: '#0A0A0A' },
      { id: 'rest', name: 'REST API', icon: 'rest', accent: '#94A3B8' },
      { id: 'graphql', name: 'GraphQL', icon: 'graphql', accent: '#E10098' },
    ],
  },
  {
    id: 'data',
    title: 'Данные',
    items: [
      { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql', accent: '#4169E1' },
      { id: 'sqlserver', name: 'SQL Server', icon: 'sqlserver', accent: '#CC2927' },
      { id: 'mongodb', name: 'MongoDB', icon: 'mongodb', accent: '#47A248' },
      { id: 'redis', name: 'Redis', icon: 'redis', accent: '#FF4438' },
      { id: 'prisma', name: 'Prisma', icon: 'prisma', accent: '#2D3748' },
      { id: 'efcore', name: 'Entity Framework', icon: 'efcore', accent: '#512BD4' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    items: [
      { id: 'reactnative', name: 'React Native', icon: 'reactnative', accent: '#61DAFB' },
      { id: 'flutter', name: 'Flutter', icon: 'flutter', accent: '#02569B' },
      { id: 'swift', name: 'Swift', icon: 'swift', accent: '#F05138' },
      { id: 'swiftui', name: 'SwiftUI', icon: 'swiftui', accent: '#0A84FF' },
      { id: 'kotlin', name: 'Kotlin', icon: 'kotlin', accent: '#7F52FF' },
      { id: 'compose', name: 'Jetpack Compose', icon: 'compose', accent: '#4285F4' },
    ],
  },
  {
    id: 'infra',
    title: 'Инфраструктура',
    items: [
      { id: 'docker', name: 'Docker', icon: 'docker', accent: '#2496ED' },
      { id: 'cicd', name: 'CI / CD', icon: 'cicd', accent: '#FC6D26' },
      { id: 'vercel', name: 'Vercel', icon: 'vercel', accent: '#0A0A0A' },
      { id: 'azure', name: 'Microsoft Azure', icon: 'azure', accent: '#0078D4' },
      { id: 'monitoring', name: 'Monitoring', icon: 'monitoring', accent: '#F5A623' },
    ],
  },
]

export const WEB_STACK: TechItem[] = [
  { id: 'nextjs', name: 'Next.js', icon: 'nextjs', accent: '#0A0A0A' },
  { id: 'react', name: 'React JS', icon: 'react', accent: '#61DAFB' },
  { id: 'angular', name: 'Angular', icon: 'angular', accent: '#DD0031' },
  { id: 'vue', name: 'Vue.js', icon: 'vue', accent: '#42B883' },
  { id: 'svelte', name: 'Svelte', icon: 'svelte', accent: '#FF3E00' },
  { id: 'aspnet', name: 'ASP.NET Core', icon: 'aspnet', accent: '#512BD4' },
  { id: 'csharp', name: 'C#', icon: 'csharp', accent: '#239120' },
  { id: 'typescript', name: 'TypeScript', icon: 'typescript', accent: '#3178C6' },
  { id: 'nodejs', name: 'Node.js', icon: 'nodejs', accent: '#5FA04E' },
  { id: 'nestjs', name: 'NestJS', icon: 'nestjs', accent: '#E0234E' },
  { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql', accent: '#4169E1' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'tailwind', accent: '#38BDF8' },
]

/** @deprecated use WEB_STACK — имена для строковых списков */
export const WEB_STACK_CHIPS = WEB_STACK.map((t) => t.name)

export const ECOMMERCE_STACK: TechItem[] = [
  { id: 'nextjs', name: 'Next.js', icon: 'nextjs', accent: '#0A0A0A' },
  { id: 'react', name: 'React JS', icon: 'react', accent: '#61DAFB' },
  { id: 'aspnet', name: 'ASP.NET Core', icon: 'aspnet', accent: '#512BD4' },
  { id: 'csharp', name: 'C#', icon: 'csharp', accent: '#239120' },
  { id: 'nodejs', name: 'Node.js', icon: 'nodejs', accent: '#5FA04E' },
  { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql', accent: '#4169E1' },
  { id: 'payments', name: 'Payments API', icon: 'payments', accent: '#10B981' },
  { id: 'shipping', name: 'Shipping API', icon: 'shipping', accent: '#0EA5E9' },
  { id: 'crm', name: 'CRM Integrations', icon: 'crm', accent: '#F59E0B' },
]

export const ECOMMERCE_STACK_CHIPS = ECOMMERCE_STACK.map((t) => t.name)

export const IOS_STACK: TechItem[] = [
  { id: 'swift', name: 'Swift', icon: 'swift', accent: '#F05138' },
  { id: 'swiftui', name: 'SwiftUI', icon: 'swiftui', accent: '#0A84FF' },
  { id: 'reactnative', name: 'React Native', icon: 'reactnative', accent: '#61DAFB' },
  { id: 'typescript', name: 'TypeScript', icon: 'typescript', accent: '#3178C6' },
  { id: 'firebase', name: 'Firebase', icon: 'firebase', accent: '#FFCA28' },
  { id: 'nodejs', name: 'Node.js', icon: 'nodejs', accent: '#5FA04E' },
]

export const ANDROID_STACK: TechItem[] = [
  { id: 'kotlin', name: 'Kotlin', icon: 'kotlin', accent: '#7F52FF' },
  { id: 'compose', name: 'Jetpack Compose', icon: 'compose', accent: '#4285F4' },
  { id: 'reactnative', name: 'React Native', icon: 'reactnative', accent: '#61DAFB' },
  { id: 'typescript', name: 'TypeScript', icon: 'typescript', accent: '#3178C6' },
  { id: 'firebase', name: 'Firebase', icon: 'firebase', accent: '#FFCA28' },
  { id: 'nodejs', name: 'Node.js', icon: 'nodejs', accent: '#5FA04E' },
]

export const SUPPORT_STACK_CATEGORIES: TechStackCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: TECH_STACK_CATEGORIES[0].items.filter((t) =>
      ['react', 'nextjs', 'angular', 'vue', 'nuxt', 'svelte', 'typescript', 'tailwind'].includes(
        t.id
      )
    ),
  },
  {
    id: 'backend',
    title: 'Backend',
    items: TECH_STACK_CATEGORIES[1].items,
  },
  {
    id: 'data',
    title: 'Базы данных',
    items: TECH_STACK_CATEGORIES[2].items,
  },
  {
    id: 'infra',
    title: 'Инфраструктура',
    items: TECH_STACK_CATEGORIES[4].items,
  },
]
