'use client'

import Link from 'next/link'
import { POSITIONING } from '../lib/positioning'
import { useLocale } from '../lib/useLocale'
import Reveal from './Reveal'

export default function HomeValueSections() {
  const { locale } = useLocale()
  const copy = POSITIONING[locale === 'en' ? 'en' : 'ru']

  return (
    <>
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              {copy.principlesTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              {locale === 'en'
                ? 'An engineering partner for architecture, delivery and growth — not a one-off page handoff.'
                : 'Инженерный партнёр по архитектуре, delivery и росту — а не разовая сдача страницы.'}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {copy.principles.map((item, i) => (
              <Reveal key={item.title} stagger={(i + 1) as 1 | 2 | 3}>
                <div className="h-full">
                  <div className="font-display text-xs text-slate-400 mb-3 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              {copy.lifecycleTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">{copy.lifecycleSubtitle}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {copy.lifecycle.map((item, i) => (
              <Reveal key={item.step} stagger={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}>
                <div className="h-full">
                  <div className="text-xs font-medium tracking-[0.14em] text-slate-400 mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-wrap gap-4" stagger={3}>
            <Link
              href="/services"
              className="apsod-btn-solid px-6 py-3 rounded-md text-sm font-semibold transition-colors"
            >
              {locale === 'en' ? 'All services' : 'Все услуги'}
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-semibold text-slate-800 dark:text-slate-100 hover:border-slate-900 dark:hover:border-white transition-colors"
            >
              {locale === 'en' ? 'Contact us' : 'Связаться с нами'}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
