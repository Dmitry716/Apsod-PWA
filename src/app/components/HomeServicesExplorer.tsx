'use client'

import { useId, useState } from 'react'
import LocaleLink from './LocaleLink'
import { useLocale } from '../lib/useLocale'

type ServiceCard = {
  titleRu: string
  titleEn: string
  descRu: string
  descEn: string
  href: string
}

type ServiceCategory = {
  id: string
  titleRu: string
  titleEn: string
  descRu: string
  descEn: string
  href: string
  cards: ServiceCard[]
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: 'web',
    titleRu: 'Веб-разработка',
    titleEn: 'Web development',
    descRu:
      'Сайты и цифровые продукты: исследование, архитектура, UI, запуск и SEO-база — как единая инженерная поставка.',
    descEn:
      'Sites and digital products end-to-end: research, architecture, UI, launch and SEO foundations as one engineered delivery.',
    href: '/services/web-development',
    cards: [
      {
        titleRu: 'Лендинг',
        titleEn: 'Landing page',
        descRu: 'Одностраничник под заявки: структура, адаптив, форма и базовая SEO-разметка.',
        descEn: 'One-pager for leads: structure, responsive layout, form and basic SEO markup.',
        href: '/services/landing-page',
      },
      {
        titleRu: 'Корпоративный сайт',
        titleEn: 'Corporate site',
        descRu: 'Многостраничный сайт компании: услуги, кейсы, CMS и структура под поиск.',
        descEn: 'Multi-page company site: services, cases, CMS and search-ready structure.',
        href: '/services/corporate-sites',
      },
      {
        titleRu: 'Интернет-магазин',
        titleEn: 'Online store',
        descRu: 'Каталог, оплата, доставка и админка под ваш процесс продаж.',
        descEn: 'Catalog, payments, fulfillment and admin for your sales flow.',
        href: '/services/ecommerce',
      },
      {
        titleRu: 'UI/UX дизайн',
        titleEn: 'UI/UX design',
        descRu: 'Исследование, прототипы и дизайн-система под реальные сценарии пользователя.',
        descEn: 'Research, prototypes and a design system for real user flows.',
        href: '/services/ui-ux',
      },
    ],
  },
  {
    id: 'apps',
    titleRu: 'Веб и мобильные приложения',
    titleEn: 'Web & mobile apps',
    descRu:
      'PWA, iOS и Android: от MVP до релиза в сторах — с фокусом на скорость, стабильность и рост продукта.',
    descEn:
      'PWA, iOS and Android — from MVP to store release, with focus on speed, stability and product growth.',
    href: '/services/mobile-development',
    cards: [
      {
        titleRu: 'Мобильные приложения',
        titleEn: 'Mobile apps',
        descRu: 'Натив или кроссплатформа: архитектура, UX и публикация в App Store и Google Play.',
        descEn: 'Native or cross-platform: architecture, UX and App Store / Google Play release.',
        href: '/services/mobile-development',
      },
      {
        titleRu: 'iOS',
        titleEn: 'iOS',
        descRu: 'Приложения под Apple: Swift / SwiftUI, интеграция с API и подготовка к модерации.',
        descEn: 'Apple apps: Swift / SwiftUI, API integration and App Store review readiness.',
        href: '/services/ios-apps',
      },
      {
        titleRu: 'Android',
        titleEn: 'Android',
        descRu: 'Приложения под Google Play: Kotlin / Compose, стабильность и аналитика.',
        descEn: 'Google Play apps: Kotlin / Compose, stability and analytics.',
        href: '/services/android-apps',
      },
      {
        titleRu: 'PWA',
        titleEn: 'PWA',
        descRu: 'Установка с сайта, офлайн-сценарии, push и app-like интерфейс без сторов.',
        descEn: 'Installable from the web, offline flows, push and app-like UI without stores.',
        href: '/services/pwa-development',
      },
    ],
  },
  {
    id: 'growth',
    titleRu: 'SEO и GEO',
    titleEn: 'SEO & GEO',
    descRu:
      'Видимость в Яндексе, Google и ответах нейросетей: семантика, техника, контент и итерации по метрикам.',
    descEn:
      'Visibility in Yandex, Google and AI answers: semantics, tech SEO, content and metric-driven iterations.',
    href: '/services/seo',
    cards: [
      {
        titleRu: 'SEO-продвижение',
        titleEn: 'SEO promotion',
        descRu: 'Аудит, семантика, техника, контент и отчётность в Яндексе и Google.',
        descEn: 'Audit, semantics, tech SEO, content and reporting in Yandex and Google.',
        href: '/services/seo',
      },
      {
        titleRu: 'GEO в нейросетях',
        titleEn: 'GEO in AI answers',
        descRu: 'Структура контента и экспертность для видимости в ответах AI.',
        descEn: 'Content structure and expertise for visibility in AI answers.',
        href: '/services/geo-promotion',
      },
    ],
  },
  {
    id: 'support',
    titleRu: 'Развитие и поддержка',
    titleEn: 'Development & support',
    descRu:
      'Сопровождение после релиза: мониторинг, доработки, CRM/ERP и стабильная работа продукта.',
    descEn:
      'Post-launch care: monitoring, roadmap work, CRM/ERP and stable product operations.',
    href: '/services/technical-support',
    cards: [
      {
        titleRu: 'Техподдержка',
        titleEn: 'Technical support',
        descRu: 'Мониторинг, обновления, резервное копирование и доработки по договору.',
        descEn: 'Monitoring, updates, backups and contracted roadmap work.',
        href: '/services/technical-support',
      },
      {
        titleRu: 'CRM',
        titleEn: 'CRM',
        descRu: 'Внедрение и кастомные CRM для заявок, продаж и коммуникаций.',
        descEn: 'CRM rollout and custom builds for leads, sales and communications.',
        href: '/services/crm',
      },
      {
        titleRu: 'ERP и учёт',
        titleEn: 'ERP & accounting',
        descRu: 'Интеграции и кастомные решения для процессов, склада и отчётности.',
        descEn: 'Integrations and custom systems for ops, inventory and reporting.',
        href: '/services/erp',
      },
    ],
  },
]

/** Itransition-style services explorer under the home hero */
export default function HomeServicesExplorer() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const [activeId, setActiveId] = useState(CATEGORIES[0].id)
  const baseId = useId()
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0]

  return (
    <section
      className="border-b border-slate-200 bg-[#f4f6f8] py-14 md:py-20 dark:border-[var(--border-color)] dark:bg-[var(--bg-secondary)]"
      aria-labelledby={`${baseId}-title`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left nav */}
          <div className="lg:col-span-4 xl:col-span-3">
            <h2
              id={`${baseId}-title`}
              className="font-display mb-8 text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-slate-700 dark:text-slate-200"
            >
              {isEn ? (
                <>
                  Our
                  <br />
                  services
                </>
              ) : (
                <>
                  Наши
                  <br />
                  услуги
                </>
              )}
            </h2>

            <nav aria-label={isEn ? 'Service categories' : 'Категории услуг'}>
              <ul className="border-t border-slate-300/80 dark:border-slate-600/60">
                {CATEGORIES.map((category) => {
                  const selected = category.id === active.id
                  return (
                    <li key={category.id} className="border-b border-slate-300/80 dark:border-slate-600/60">
                      <button
                        type="button"
                        onClick={() => setActiveId(category.id)}
                        onMouseEnter={() => {
                          if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                            setActiveId(category.id)
                          }
                        }}
                        aria-pressed={selected}
                        className={`relative w-full py-4 text-left font-display text-[1.05rem] font-semibold tracking-tight transition-colors md:text-[1.15rem] ${
                          selected
                            ? 'text-slate-950 dark:text-white'
                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        {selected ? (
                          <span
                            className="apsod-services-active-line absolute inset-x-0 top-0 h-[2px]"
                            aria-hidden
                          />
                        ) : null}
                        {isEn ? category.titleEn : category.titleRu}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-8 xl:col-span-9" role="region" aria-live="polite">
            <div className="mb-8 max-w-3xl">
              <h3 className="font-display mb-3 text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-tight text-slate-950 dark:text-white">
                {isEn ? active.titleEn : active.titleRu}
              </h3>
              <p className="mb-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                {isEn ? active.descEn : active.descRu}
              </p>
              <LocaleLink
                href={active.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--apsod-accent)] transition-opacity hover:opacity-80"
              >
                {isEn ? 'Learn more' : 'Подробнее'}
                <span aria-hidden>→</span>
              </LocaleLink>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {active.cards.map((card) => (
                <li key={card.href + card.titleEn}>
                  <LocaleLink
                    href={card.href}
                    className="group flex h-full min-h-[168px] flex-col border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 dark:border-slate-700 dark:bg-[var(--bg-primary)] dark:hover:border-slate-500 md:p-6"
                  >
                    <h4 className="font-display mb-2 text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                      {isEn ? card.titleEn : card.titleRu}
                    </h4>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {isEn ? card.descEn : card.descRu}
                    </p>
                    <span
                      className="ml-auto inline-flex size-9 items-center justify-center border border-slate-200 text-[var(--apsod-accent)] transition-colors group-hover:border-[var(--apsod-accent)] dark:border-slate-600"
                      aria-hidden
                    >
                      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                        <path d="M7.3 4.3 6.2 5.4 10.8 10l-4.6 4.6 1.1 1.1L13 10z" />
                      </svg>
                    </span>
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
