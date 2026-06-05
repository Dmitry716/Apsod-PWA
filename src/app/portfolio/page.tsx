"use client";

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { PORTFOLIO_PROJECTS } from './data'
import { t } from '../lib/i18n'
import { useLocale } from '../lib/useLocale'

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const { locale } = useLocale()
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
    // Сбрасываем пагинацию при смене фильтров
    setVisibleProjects(6)
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

  const loadMore = () => {
    setVisibleProjects(prev => prev + 3)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero секция */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              {t(locale, 'portfolio.title').split(' ')[0]}{' '}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t(locale, 'portfolio.title').split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t(locale, 'portfolio.subtitle')}
            </p>
            
            {/* Фильтры */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t(locale, 'portfolio.filters.all')}
              </button>
              <button
                onClick={() => handleFilterChange('web')}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeFilter === 'web'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t(locale, 'portfolio.filters.web')}
              </button>
              <button
                onClick={() => handleFilterChange('mobile')}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeFilter === 'mobile'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t(locale, 'portfolio.filters.mobile')}
              </button>
            </div>

            {/* Фильтр по отраслям */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => handleIndustryChange('all')}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeIndustry === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t(locale, 'portfolio.filters.industriesAll')}
                </button>
                {industryOrder.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => handleIndustryChange(industry)}
                    className={`px-6 py-2 rounded-full transition-all ${
                      activeIndustry === industry
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {industryLabel(industry)}
                  </button>
                ))}
                <button
                  onClick={() => handleIndustryChange(OTHER_INDUSTRY_KEY)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeIndustry === OTHER_INDUSTRY_KEY
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t(locale, 'portfolio.filters.industriesOther')}
                </button>
              </div>
            </div>

            {/* Счетчик проектов */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {t(locale, 'portfolio.found')} {filteredProjects.length}
            </p>
          </div>
        </div>
      </section>

      {/* Сетка портфолио */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, visibleProjects).map((project) => (
              <div
                key={project.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} aria-hidden />
                
                {/* Превью главной страницы сайта */}
                <div className="h-48 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden pointer-events-none">
                  {!imageErrors[project.id] ? (
                    <img
                      src={project.image}
                      alt={`Главная страница ${project.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={() => setImageErrors((prev) => ({ ...prev, [project.id]: true }))}
                    />
                  ) : null}

                  <div
                    className={`absolute inset-0 bg-linear-to-br ${project.color} ${
                      imageErrors[project.id] ? 'opacity-20' : 'opacity-10'
                    } pointer-events-none`}
                    aria-hidden
                  />

                  {imageErrors[project.id] ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                        {project.icon}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Контент — выше оверлея, ссылки кликабельны */}
                <div className="relative z-10 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {project.category}
                      </span>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h2>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full text-gray-600 dark:text-gray-300">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{project.location}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Теги */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Ссылка: внешние сайты — в новой вкладке, кейсы — страница на сайте */}
                  {project.link.startsWith('http') ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all cursor-pointer hover:underline"
                    >
                      Посетить сайт
                      <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={project.link}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all cursor-pointer hover:underline"
                    >
                      Смотреть кейс
                      <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Кнопка "Загрузить еще" */}
          {visibleProjects < filteredProjects.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all hover:scale-105"
              >
                {t(locale, 'portfolio.loadMore')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t(locale, 'portfolio.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t(locale, 'portfolio.cta.subtitle')}
            </p>
          <Link
              href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
              {t(locale, 'portfolio.cta.button')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}