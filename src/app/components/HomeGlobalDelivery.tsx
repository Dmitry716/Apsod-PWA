'use client'

import Link from 'next/link'
import { useLocale } from '../lib/useLocale'

export default function HomeGlobalDelivery() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  const points = isEn
    ? [
        { title: 'Web', body: 'Sites, shops, product UI' },
        { title: 'Mobile', body: 'iOS · Android · PWA' },
        { title: 'Growth', body: 'SEO · GEO · analytics' },
      ]
    : [
        { title: 'Веб', body: 'Сайты, магазины, интерфейсы' },
        { title: 'Мобильные', body: 'iOS · Android · PWA' },
        { title: 'Рост', body: 'SEO · GEO · аналитика' },
      ]

  return (
    <aside className="relative apsod-hero-enter apsod-hero-enter-delay-4 lg:pl-10 lg:border-l border-slate-200 dark:border-slate-700">
      <p className="text-xs font-medium tracking-[0.16em] uppercase text-slate-500 dark:text-slate-400 mb-6">
        APSOD
      </p>

      <ul className="space-y-5 mb-8">
        {points.map((point) => (
          <li key={point.title}>
            <div className="font-display font-semibold text-slate-900 dark:text-white text-sm tracking-tight">
              {point.title}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{point.body}</p>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="apsod-btn-solid apsod-cta-primary inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-md text-sm font-semibold transition-colors"
      >
        <span>{isEn ? 'Contact us' : 'Связаться'}</span>
      </Link>
    </aside>
  )
}
