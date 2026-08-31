"use client";

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { PORTFOLIO_PROJECTS, getCasePath, getFeaturedRank } from './data'
import { t } from '../lib/i18n'
import { useLocale } from '../lib/useLocale'
import PageBreadcrumbs from '../components/PageBreadcrumbs'

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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Портфолио', path: '/portfolio' },
        ]}
      />

      <section className="relative pt-10 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-4">
              Кейсы
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              {t(locale, 'portfolio.title')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed">
              {t(locale, 'portfolio.subtitle')}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(
                [
                  { key: 'all', label: t(locale, 'portfolio.filters.all') },
                  { key: 'web', label: t(locale, 'portfolio.filters.web') },
                  { key: 'mobile', label: t(locale, 'portfolio.filters.mobile') },
                ] as const
              ).map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => handleFilterChange(f.key)}
                  className={`px-4 py-2 rounded-md transition-colors text-sm border ${
                    activeFilter === f.key
                      ? 'apsod-btn-solid border-transparent'
                      : 'bg-transparent text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                onClick={() => handleIndustryChange('all')}
                className={`px-3 py-1.5 rounded-md transition-colors text-xs border ${
                  activeIndustry === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                    : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                {t(locale, 'portfolio.filters.industriesAll')}
              </button>
              {industryOrder.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => handleIndustryChange(industry)}
                  className={`px-3 py-1.5 rounded-md transition-colors text-xs border ${
                    activeIndustry === industry
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                      : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {industryLabel(industry)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleIndustryChange(OTHER_INDUSTRY_KEY)}
                className={`px-3 py-1.5 rounded-md transition-colors text-xs border ${
                  activeIndustry === OTHER_INDUSTRY_KEY
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                    : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                {t(locale, 'portfolio.filters.industriesOther')}
              </button>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t(locale, 'portfolio.found')} {filteredProjects.length}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => {
              const isFeatured = getFeaturedRank(project) === 0
              return (
              <article
                key={project.id}
                className={`apsod-price-card group border bg-white dark:bg-gray-950 overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 ${
                  isFeatured
                    ? 'md:col-span-2 border-amber-500/40 dark:border-amber-500/30 ring-1 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-slate-100 dark:bg-slate-900 ${
                    isFeatured ? 'h-56 md:h-72' : 'h-48'
                  }`}
                >
                  {!imageErrors[project.id] ? (
                    <img
                      src={project.image}
                      alt={`Главная страница ${project.title}`}
                      loading="lazy"
                      className={`w-full h-full ${isFeatured ? 'object-cover object-top' : 'object-cover'}`}
                      onError={() => setImageErrors((prev) => ({ ...prev, [project.id]: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-sm font-semibold tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400">
                        {project.category}
                      </span>
                    </div>
                  )}
                  {isFeatured ? (
                    <span className="absolute top-3 left-3 z-10 rounded-md bg-amber-500 text-slate-950 text-xs font-semibold px-2.5 py-1">
                      Избранный кейс
                    </span>
                  ) : null}
                  {project.forSale ? (
                    <span className="absolute top-3 right-3 z-10 rounded-md bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 dark:bg-white dark:text-slate-900">
                      В продаже
                    </span>
                  ) : null}
                </div>

                <div className="p-6 md:p-7">
                  <p className="text-xs font-medium tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400 mb-2">
                    {project.category} · {project.year}
                  </p>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{project.location}</p>
                  <p className="text-slate-600 dark:text-slate-300 mb-3 line-clamp-2 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  {project.results[0] ? (
                    <p className="text-sm text-slate-700 dark:text-slate-200 mb-4 line-clamp-2">
                      Результат: {project.results[0]}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap gap-x-2 gap-y-1 mb-5 text-xs text-slate-500 dark:text-slate-400">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={getCasePath(project)}
                      className="text-sm font-medium text-slate-900 dark:text-white underline-offset-4 hover:underline"
                    >
                      Смотреть кейс
                    </Link>
                    {project.forSale && project.readySiteSlug ? (
                      <Link
                        href={`/ready-sites/${project.readySiteSlug}`}
                        className="text-sm font-medium text-slate-700 dark:text-slate-300 underline-offset-4 hover:underline"
                      >
                        Купить сайт
                      </Link>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        Сайт ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              {t(locale, 'portfolio.cta.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {t(locale, 'portfolio.cta.subtitle')}
            </p>
            <Link
              href="/contact"
              className="apsod-btn-solid inline-flex px-7 py-3 rounded-md text-sm font-semibold transition-colors"
            >
              {t(locale, 'portfolio.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}