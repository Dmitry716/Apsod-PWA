import Link from 'next/link'
import Image from 'next/image'
import { buildSnippetMetadata } from '../lib/seo'
import AboutHero from '../components/AboutHero'
import AboutEngineering from '../components/AboutEngineering'
import AboutStats from '../components/AboutStats'
import {
  getCasePath,
  getFeaturedPortfolioProjects,
  PORTFOLIO_PROJECTS,
} from '../portfolio/data'
import './about-animations.css'

export const metadata = buildSnippetMetadata('/about')

const CLIENTS = [
  'Legal Team',
  'Amba Detail',
  'NEXTON',
  'ArtDetailing',
  'BMservice',
  'Динамо-Витебск',
  'Maxximum',
  'Sparkite',
] as const

const STATS = [
  { value: PORTFOLIO_PROJECTS.length, suffix: '+', label: 'Проектов в портфолио' },
  { value: 9, suffix: '', label: 'Отраслей в фокусе' },
  { value: 4, suffix: '', label: 'Рынка: BY · RU · EU · US' },
  { value: 1, suffix: '', label: 'Офис APSOD' },
] as const

export default function AboutPage() {
  const milestones = getFeaturedPortfolioProjects().slice(0, 4)

  return (
    <div className="min-h-screen bg-black text-white">
      <AboutHero />
      <AboutEngineering />
      <AboutStats stats={[...STATS]} />

      <section className="bg-black py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Клиенты
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
            {CLIENTS.map((name) => (
              <li key={name}>
                <span className="font-display text-sm font-semibold tracking-[0.06em] text-white/35 transition-colors hover:text-white md:text-base">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex items-center gap-4 md:mb-14">
            <span className="text-xs font-medium tracking-[0.18em] text-white/45">02</span>
            <span className="h-px w-16 bg-white/15" aria-hidden />
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em]">
              Избранные кейсы
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {milestones.map((project, index) => (
              <Link
                key={project.id}
                href={getCasePath(project)}
                className="group grid items-center gap-5 py-6 transition-colors sm:grid-cols-12 sm:gap-6 md:py-8"
              >
                <span className="text-xs tracking-[0.18em] text-white/35 sm:col-span-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative h-20 overflow-hidden rounded-2xl bg-zinc-900 sm:col-span-3 sm:h-24">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="200px"
                  />
                </div>
                <div className="min-w-0 sm:col-span-6">
                  <h3 className="font-display text-lg font-extrabold uppercase tracking-tight transition-colors group-hover:text-orange-300 md:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">
                    {project.year} · {project.category}
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/40 transition-colors group-hover:text-white sm:col-span-2 sm:text-right">
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/portfolio"
              className="text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
            >
              Все кейсы →
            </Link>
          </div>
        </div>
      </section>

      <section className="apsod-arigo-hero-bg relative overflow-hidden">
        <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h2 className="font-display mb-6 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em]">
            Обсудим задачу вашей компании
          </h2>
          <p className="mb-10 max-w-xl text-white/70">
            Краткий бриф — коммерческое предложение с этапами, сроками и зоной ответственности.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100"
            >
              Связаться с нами
            </Link>
            <Link
              href="/services"
              className="inline-flex rounded-full border border-white/35 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Смотреть услуги
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
