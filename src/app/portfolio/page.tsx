"use client";

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { PORTFOLIO_PROJECTS, getCasePath, getFeaturedRank } from './data'
import { t } from '../lib/i18n'
import { useLocale } from '../lib/useLocale'
import AgencyPageHero from '../components/AgencyPageHero'

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const { locale } = useLocale()
  const searchParams = useSearchParams()
  const industryOrder = useMemo(
    () => [
      'Производство',
      'Финансы',
      'Медицина',
      'Ритейл',
      'Логистика',
      'Образование',
      'Энергетика',
      'Развлечения',
      'Консалтинг',
    ],
    [],
  )
  const OTHER_INDUSTRY_KEY = 'other'

  useEffect(() => {
    const fromQuery = searchParams.get('industry')
    if (!fromQuery) return
    if (fromQuery === OTHER_INDUSTRY_KEY || industryOrder.includes(fromQuery)) {
      setActiveIndustry(fromQuery)
    }
  }, [searchParams, industryOrder])

  const industryLabel = (industry: string) => {
    switch (industry) {
      case 'Производство':
        return t(locale, 'industries.manufacturing')
      case 'Финансы':
        return t(locale, 'industries.finances')
      case 'Медицина':
        return t(locale, 'industries.medicine')
      case 'Ритейл':
        return t(locale, 'industries.retail')
      case 'Логистика':
        return t(locale, 'industries.logistics')
      case 'Образование':
        return t(locale, 'industries.education')
      case 'Энергетика':
        return t(locale, 'industries.energy')
      case 'Развлечения':
        return t(locale, 'industries.entertainment')
      case 'Консалтинг':
        return t(locale, 'industries.consulting')
      default:
        return industry
    }
  }

  const resetView = () => {
    setImageErrors({})
  }

  const handleFilterChange = (nextFilter: string) => {
    setActiveFilter(nextFilter)
    resetView()
  }

  const handleIndustryChange = (nextIndustry: string) => {
    setActiveIndustry(nextIndustry)
    resetView()
  }

  const sortedProjects = useMemo(() => {
    const yearNum = (year: string) => {
      const n = Number.parseInt(year, 10)
      return Number.isFinite(n) ? n : 0
    }

    const getIndustryIndex = (category: string) => {
      const idx = industryOrder.indexOf(category)
      return idx === -1 ? industryOrder.length + 1 : idx
    }

    return [...PORTFOLIO_PROJECTS].sort((a, b) => {
      const featuredDiff = getFeaturedRank(a) - getFeaturedRank(b)
      if (featuredDiff !== 0) return featuredDiff

      const ai = getIndustryIndex(a.category)
      const bi = getIndustryIndex(b.category)
      if (ai !== bi) return ai - bi

      // Сортировка по году (сначала новые)
      const dy = yearNum(b.year) - yearNum(a.year)
      if (dy !== 0) return dy

      // Чтобы сортировка была детерминированной
      return a.id - b.id
    })
  }, [industryOrder])

  const filteredProjects = useMemo(() => {
    let list = sortedProjects

    if (activeFilter !== 'all') {
      list = list.filter((project) => project.type === activeFilter)
    }

    if (activeIndustry !== 'all') {
      if (activeIndustry === OTHER_INDUSTRY_KEY) {
        list = list.filter((project) => !industryOrder.includes(project.category))
      } else {
        list = list.filter((project) => project.category === activeIndustry)
      }
    }

    return list
  }, [activeFilter, activeIndustry, industryOrder, sortedProjects])

  return (
    <div className="min-h-screen bg-black text-white">
      <AgencyPageHero
        title={t(locale, 'portfolio.title')}
        crumb={locale === 'en' ? 'Work' : 'Кейсы'}
        note={t(locale, 'portfolio.subtitle')}
        homeLabel={locale === 'en' ? 'Home' : 'Главная'}
      />

      <section className="relative pb-8 pt-10">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-6 space-y-3">
            <div
              className="flex flex-wrap items-stretch justify-start border-y border-white/10 sm:justify-center"
              role="tablist"
              aria-label={t(locale, 'portfolio.filters.all')}
            >
              {(
                [
                  { key: 'all', label: t(locale, 'portfolio.filters.all') },
                  { key: 'web', label: t(locale, 'portfolio.filters.web') },
                  { key: 'mobile', label: t(locale, 'portfolio.filters.mobile') },
                ] as const
              ).map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === item.key}
                  onClick={() => handleFilterChange(item.key)}
                  className={`relative shrink-0 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-5 sm:text-xs ${
                    index > 0
                      ? 'before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-white/15'
                      : ''
                  } ${
                    activeFilter === item.key
                      ? 'text-orange-300'
                      : 'text-white/45 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0">
              <div
                className="flex w-max min-w-full flex-nowrap items-stretch justify-start border-y border-white/10 md:w-auto md:flex-wrap md:justify-center"
                role="tablist"
                aria-label={t(locale, 'portfolio.filters.industriesAll')}
              >
                {(
                  [
                    { key: 'all', label: t(locale, 'portfolio.filters.industriesAll') },
                    ...industryOrder.map((industry) => ({
                      key: industry,
                      label: industryLabel(industry),
                    })),
                    {
                      key: OTHER_INDUSTRY_KEY,
                      label: t(locale, 'portfolio.filters.industriesOther'),
                    },
                  ] as const
                ).map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={activeIndustry === item.key}
                    onClick={() => handleIndustryChange(item.key)}
                    className={`relative shrink-0 px-3.5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-4 sm:text-xs ${
                      index > 0
                        ? 'before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-white/15'
                        : ''
                    } ${
                      activeIndustry === item.key
                        ? 'text-orange-300'
                        : 'text-white/45 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-white/40">
            {t(locale, 'portfolio.found')} {filteredProjects.length}
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {filteredProjects.map((project) => {
              const fitContain = project.imageFit === 'contain'
              return (
              <article
                key={project.id}
                className="group min-w-0 overflow-hidden"
              >
                <div
                  className={`relative mb-5 aspect-[16/10] w-full min-w-0 overflow-hidden rounded-[20px] ${
                    fitContain ? 'bg-[#050a1f]' : 'bg-zinc-900'
                  }`}
                >
                  {!imageErrors[project.id] ? (
                    <picture className="absolute inset-0 block h-full w-full">
                      {project.imageMobile ? (
                        <source media="(max-width: 767px)" srcSet={project.imageMobile} />
                      ) : null}
                      <img
                        src={project.image}
                        alt={`Главная страница ${project.title}`}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`h-full w-full max-w-full transition-transform duration-700 group-hover:scale-[1.03] ${
                          fitContain ? 'object-contain object-top' : 'object-cover object-top'
                        }`}
                        onError={() => setImageErrors((prev) => ({ ...prev, [project.id]: true }))}
                      />
                    </picture>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-sm font-semibold tracking-[0.14em] uppercase text-white/40">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>

                <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-white/40">
                  {project.category} · {project.year}
                </p>
                <h2 className="font-display mb-3 text-xl font-extrabold uppercase tracking-tight md:text-2xl">
                  <Link href={getCasePath(project)} className="transition-colors hover:text-orange-300">
                    {project.title}
                  </Link>
                </h2>
                <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-white/55">
                  {project.description}
                </p>
                <Link
                  href={getCasePath(project)}
                  className="text-xs font-bold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
                >
                  {locale === 'en' ? 'View project' : 'Смотреть кейс'} →
                </Link>
              </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="apsod-arigo-hero-bg relative overflow-hidden">
        <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display mb-4 text-[clamp(1.85rem,4vw,3rem)] font-extrabold uppercase tracking-[-0.02em]">
              {t(locale, 'portfolio.cta.title')}
            </h2>
            <p className="mb-8 leading-relaxed text-white/70">
              {t(locale, 'portfolio.cta.subtitle')}
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100"
            >
              {t(locale, 'portfolio.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}