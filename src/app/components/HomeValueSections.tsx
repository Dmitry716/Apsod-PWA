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
      <section className="relative py-16 md:py-24 bg-slate-950 text-white overflow-hidden">
        <div className="apsod-mesh" aria-hidden>
          <div
            className="apsod-mesh-blob w-[420px] h-[420px] bg-blue-600/30 top-[-80px] left-[-60px]"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="apsod-mesh-blob w-[360px] h-[360px] bg-indigo-500/25 bottom-[-100px] right-[-40px]"
            style={{ animationDelay: '2s' }}
          />
        </div>
        <div className="apsod-grid-fade opacity-40" aria-hidden />

        <div className="container mx-auto px-4 relative z-10">
          <Reveal className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.principlesTitle}</h2>
            <div className="apsod-line-draw mb-4" />
            <p className="text-slate-300 text-lg">
              {locale === 'en'
                ? 'Professionals who organize and run your digital channel — not only ship a page.'
                : 'Профессионалы, которые организуют и настраивают ваш канал в интернете — а не только «отдают макет с кнопками».'}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {copy.principles.map((item, i) => (
              <Reveal key={item.title} stagger={(i + 1) as 1 | 2 | 3}>
                <div className="apsod-card-lift h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:bg-white/[0.08]">
                  <div className="mb-4 h-1 w-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" />
                  <h3 className="text-xl font-semibold mb-3 text-blue-200">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {copy.lifecycleTitle}
            </h2>
            <div className="apsod-line-draw mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg">{copy.lifecycleSubtitle}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {copy.lifecycle.map((item, i) => (
              <Reveal key={item.step} stagger={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}>
                <div className="apsod-card-lift group h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-wrap gap-4" stagger={3}>
            <Link
              href="/services"
              className="apsod-cta-primary px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              <span>{locale === 'en' ? 'All services' : 'Все услуги'}</span>
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-800 dark:text-gray-100 hover:border-blue-500 hover:-translate-y-0.5 transition-all"
            >
              {locale === 'en' ? 'Pricing' : 'Цены'}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
