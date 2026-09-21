'use client'

import Link from 'next/link'
import AgencyPageHero from './AgencyPageHero'
import Reveal from './Reveal'
import TechStackSection from './TechStackSection'
import { COMPANY } from '../lib/seo'
import { t, type Locale } from '../lib/i18n'
import { useLocale } from '../lib/useLocale'

type ServiceCard = {
  titleRu: string
  titleEn: string
  descriptionRu: string
  descriptionEn: string
  link: string
  children?: { titleRu: string; titleEn: string; link: string }[]
}

const SERVICES: ServiceCard[] = [
  {
    titleRu: 'Веб-разработка',
    titleEn: 'Web development',
    descriptionRu:
      'Сайты от брифа до запуска: лендинг, корпоративный сайт и интернет-магазин.',
    descriptionEn: 'Sites end-to-end: landing, corporate and e-commerce.',
    link: '/services/web-development',
    children: [
      { titleRu: 'Лендинг', titleEn: 'Landing page', link: '/services/landing-page' },
      { titleRu: 'Корпоративный сайт', titleEn: 'Corporate site', link: '/services/corporate-sites' },
      { titleRu: 'Интернет-магазин', titleEn: 'Online store', link: '/services/ecommerce' },
    ],
  },
  {
    titleRu: 'Мобильные приложения',
    titleEn: 'Mobile apps',
    descriptionRu: 'iOS и Android: натив или кроссплатформа — от MVP до сторов.',
    descriptionEn: 'iOS and Android — native or cross-platform, MVP to stores.',
    link: '/services/mobile-development',
    children: [
      { titleRu: 'iOS', titleEn: 'iOS', link: '/services/ios-apps' },
      { titleRu: 'Android', titleEn: 'Android', link: '/services/android-apps' },
    ],
  },
  {
    titleRu: 'PWA',
    titleEn: 'PWA',
    descriptionRu: 'Прогрессивные веб-приложения: установка, офлайн и push.',
    descriptionEn: 'Progressive web apps: installable, offline and push.',
    link: '/services/pwa-development',
  },
  {
    titleRu: 'UI/UX дизайн',
    titleEn: 'UI/UX design',
    descriptionRu: 'Исследование, прототипы и дизайн-система.',
    descriptionEn: 'Research, prototypes and design systems.',
    link: '/services/ui-ux',
  },
  {
    titleRu: 'SEO-продвижение',
    titleEn: 'SEO promotion',
    descriptionRu: 'Яндекс и Google: аудит, семантика, техника, контент.',
    descriptionEn: 'Yandex and Google: audit, semantics, tech, content.',
    link: '/services/seo',
  },
  {
    titleRu: 'GEO в нейросетях',
    titleEn: 'GEO in AI answers',
    descriptionRu: 'Видимость в ответах AI: структура и экспертность.',
    descriptionEn: 'Visibility in AI answers: structure and expertise.',
    link: '/services/geo-promotion',
  },
  {
    titleRu: 'Техподдержка',
    titleEn: 'Technical support',
    descriptionRu: 'Мониторинг, обновления, бэкапы и доработки.',
    descriptionEn: 'Monitoring, updates, backups and roadmap work.',
    link: '/services/technical-support',
  },
  {
    titleRu: 'CRM',
    titleEn: 'CRM',
    descriptionRu: 'Внедрение и кастомные CRM для продаж.',
    descriptionEn: 'CRM rollout and custom builds for sales.',
    link: '/services/crm',
  },
  {
    titleRu: 'ERP и учёт',
    titleEn: 'ERP & accounting',
    descriptionRu: 'Интеграции и кастомные решения для процессов.',
    descriptionEn: 'Integrations and custom systems for operations.',
    link: '/services/erp',
  },
]

function getPlans(locale: Locale) {
  const isEn = locale === 'en'
  return [
    {
      name: isEn ? 'Landing' : 'Лендинг',
      term: isEn ? '2–4 weeks' : '2–4 недели',
      highlight: false,
      items: isEn
        ? ['Design and responsive layout', 'Lead form / WhatsApp', 'Basic SEO markup', 'Analytics setup']
        : ['Дизайн и адаптив', 'Форма заявки / WhatsApp', 'Базовая SEO-разметка', 'Подключение аналитики'],
      href: '/contact?goal=landing&budget=landing',
    },
    {
      name: isEn ? 'Corporate' : 'Корпоративный',
      term: isEn ? '4–8 weeks' : '4–8 недель',
      highlight: true,
      items: isEn
        ? ['Up to 10–15 pages', 'CMS / easy editing', 'Structure for search', 'Speed and Core Web Vitals']
        : ['До 10–15 страниц', 'CMS / удобное редактирование', 'Структура под семантику', 'Скорость и Core Web Vitals'],
      href: '/contact?goal=corporate&budget=corporate',
    },
    {
      name: isEn ? 'Store' : 'Магазин',
      term: isEn ? 'from 2–3 months' : 'от 2–3 месяцев',
      highlight: false,
      items: isEn
        ? ['Catalog, cart, payments', 'Delivery integrations', 'Admin and catalog SEO', 'Training and launch']
        : ['Каталог, корзина, оплата', 'Интеграции доставки', 'Админка и SEO каталога', 'Обучение и запуск'],
      href: '/contact?goal=shop&budget=shop',
    },
  ]
}

export default function ServicesIndex() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const plans = getPlans(locale)

  return (
    <div className="bg-black text-white">
      <AgencyPageHero
        title={t(locale, 'services.hero.title')}
        crumb={t(locale, 'services.hero.crumb')}
        note={t(locale, 'services.hero.note')}
        homeLabel={t(locale, 'common.home')}
      />

      <section className="bg-black py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-10 md:mb-14">
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-white/45">01</span>
              <span className="h-px w-16 bg-white/15" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em]">
              {isEn ? 'Capabilities' : 'Направления'}
            </h2>
          </Reveal>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {SERVICES.map((item, index) => {
              const title = isEn ? item.titleEn : item.titleRu
              const description = isEn ? item.descriptionEn : item.descriptionRu
              return (
                <Reveal key={item.link} stagger={(Math.min(index % 5, 4) + 1) as 1 | 2 | 3 | 4 | 5}>
                  <div className="grid gap-4 py-8 sm:grid-cols-12 sm:items-start sm:gap-6 md:py-10">
                    <span className="text-xs tracking-[0.18em] text-white/35 sm:col-span-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="sm:col-span-4">
                      <h3 className="font-display text-xl font-extrabold uppercase tracking-tight md:text-2xl">
                        <Link href={item.link} className="transition-colors hover:text-orange-300">
                          {title}
                        </Link>
                      </h3>
                      {item.children ? (
                        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                          {item.children.map((child) => (
                            <li key={child.link}>
                              <Link
                                href={child.link}
                                className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-white"
                              >
                                {isEn ? child.titleEn : child.titleRu}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <p className="text-sm leading-relaxed text-white/55 sm:col-span-5">{description}</p>
                    <Link
                      href={item.link}
                      className="text-xs font-bold uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white sm:col-span-2 sm:text-right"
                    >
                      →
                    </Link>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-10 md:mb-14">
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-white/45">02</span>
              <span className="h-px w-16 bg-white/15" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em]">
              {t(locale, 'services.pricing.titleLead')}
            </h2>
            <p className="mt-4 max-w-xl text-sm text-white/55">{t(locale, 'services.pricing.note')}</p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} stagger={(Math.min(index, 4) + 1) as 1 | 2 | 3 | 4 | 5}>
                <article
                  className={`flex h-full flex-col rounded-[20px] border p-7 ${
                    plan.highlight
                      ? 'border-orange-400/40 bg-white/[0.04]'
                      : 'border-white/10 bg-transparent'
                  }`}
                >
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-extrabold uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    {plan.highlight ? (
                      <span className="shrink-0 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {t(locale, 'common.popular')}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                    {isEn ? 'Timeline' : 'Срок'}
                  </p>
                  <p className="font-display mt-2 mb-6 text-2xl font-extrabold">{plan.term}</p>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.items.map((line) => (
                      <li key={line} className="text-sm text-white/60">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100"
                  >
                    {t(locale, 'services.order')}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TechStackSection
        title={t(locale, 'services.tech.title')}
        subtitle={t(locale, 'services.tech.subtitle')}
      />

      <section className="apsod-arigo-hero-bg relative overflow-hidden">
        <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <h2 className="font-display mb-5 text-[clamp(1.85rem,4vw,3rem)] font-extrabold uppercase tracking-[-0.02em]">
              {t(locale, 'services.cta.title')}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/70">{t(locale, 'services.cta.text')}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100"
              >
                {t(locale, 'services.cta.button')}
              </Link>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-xs font-bold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
              >
                {COMPANY.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
