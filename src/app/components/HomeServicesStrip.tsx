'use client'

import Link from 'next/link'
import { useRef } from 'react'
import Reveal from './Reveal'
import { useLocale } from '../lib/useLocale'

const SERVICES = [
  {
    href: '/services/web-development',
    titleRu: 'Веб-разработка',
    titleEn: 'Web development',
    descRu: 'Корпоративные сайты и продукты: архитектура, UI и запуск.',
    descEn: 'Corporate sites and products: architecture, UI and launch.',
    icon: '01',
  },
  {
    href: '/services/ecommerce',
    titleRu: 'Интернет-магазины',
    titleEn: 'E-commerce',
    descRu: 'Каталог, оплата, доставка и админка под ваш процесс продаж.',
    descEn: 'Catalog, payments, fulfillment and admin for your sales flow.',
    icon: '02',
  },
  {
    href: '/services/mobile-development',
    titleRu: 'Мобильные приложения',
    titleEn: 'Mobile apps',
    descRu: 'iOS и Android: от MVP до публикации в сторах.',
    descEn: 'iOS and Android — from MVP to App Store and Google Play.',
    icon: '03',
  },
  {
    href: '/services/pwa-development',
    titleRu: 'PWA',
    titleEn: 'PWA',
    descRu: 'Установка с сайта, офлайн-сценарии и push-уведомления.',
    descEn: 'Installable web apps with offline flows and push.',
    icon: '04',
  },
  {
    href: '/services/seo',
    titleRu: 'SEO и GEO',
    titleEn: 'SEO & GEO',
    descRu: 'Поиск и нейросети: трафик, видимость и заявки.',
    descEn: 'Search and AI answers: traffic, visibility and leads.',
    icon: '05',
  },
  {
    href: '/services/ui-ux',
    titleRu: 'UI/UX дизайн',
    titleEn: 'UI/UX design',
    descRu: 'Исследование, прототипы и система под сценарии пользователя.',
    descEn: 'Research, prototypes and a system for real user flows.',
    icon: '06',
  },
] as const

/** Services strip with scroll-snap — Nerox ServicesFour without Swiper */
export default function HomeServicesStrip() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-service-card]')
    const step = (card?.offsetWidth ?? 280) + 24
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="bg-slate-50 pb-16 pt-4 md:pb-24 dark:bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4">
        <Reveal className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {isEn ? 'Our services' : 'Услуги'}
            </p>
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] font-bold tracking-normal leading-[1.15] text-slate-950 dark:text-white">
              {isEn ? (
                <>
                  Delivery with{' '}
                  <span className="font-light text-slate-500 dark:text-slate-400">exclusive focus.</span>
                </>
              ) : (
                <>
                  Сервис с фокусом на{' '}
                  <span className="font-light text-slate-500 dark:text-slate-400">результат.</span>
                </>
              )}
            </h2>
          </div>

          <div className="flex gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={isEn ? 'Previous' : 'Назад'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:border-sky-500 hover:text-sky-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M12.7 4.3 7 10l5.7 5.7 1.1-1.1L9.2 10l4.6-4.6z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={isEn ? 'Next' : 'Вперёд'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:border-sky-500 hover:text-sky-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M7.3 4.3 6.2 5.4 10.8 10l-4.6 4.6 1.1 1.1L13 10z" />
              </svg>
            </button>
          </div>
        </Reveal>

        <div
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {SERVICES.map((item) => (
            <article
              key={item.href}
              data-service-card
              className="w-[min(82vw,300px)] shrink-0 snap-start border border-slate-200 bg-white p-6 transition-colors hover:border-sky-400/60 dark:border-[var(--border-color)] dark:bg-[var(--bg-primary)] dark:hover:border-sky-500/40 md:w-[280px]"
            >
              <p className="mb-5 font-display text-2xl font-extrabold tracking-tight text-sky-500/80 dark:text-sky-400/80">
                {item.icon}
              </p>
              <h3 className="font-display mb-3 text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                <Link href={item.href} className="hover:text-sky-600 dark:hover:text-sky-300">
                  {isEn ? item.titleEn : item.titleRu}
                </Link>
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {isEn ? item.descEn : item.descRu}
              </p>
              <Link
                href={item.href}
                className="text-sm font-semibold text-slate-900 underline-offset-4 hover:text-sky-600 hover:underline dark:text-white dark:hover:text-sky-300"
              >
                {isEn ? 'More details' : 'Подробнее'}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
