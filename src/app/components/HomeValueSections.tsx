'use client'

import Link from 'next/link'
import { POSITIONING } from '../lib/positioning'
import { useLocale } from '../lib/useLocale'

export default function HomeValueSections() {
  const { locale } = useLocale()
  const copy = POSITIONING[locale === 'en' ? 'en' : 'ru']

  return (
    <>
      <section className="py-16 md:py-20 bg-slate-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.principlesTitle}</h2>
            <p className="text-slate-300 text-lg">
              {locale === 'en'
                ? 'Professionals who organize and run your digital channel — not only ship a page.'
                : 'Профессионалы, которые организуют и настраивают ваш канал в интернете — а не только «отдают макет с кнопками».'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {copy.principles.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-300">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {copy.lifecycleTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{copy.lifecycleSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {copy.lifecycle.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5"
              >
                <div className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              {locale === 'en' ? 'All services' : 'Все услуги'}
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-800 dark:text-gray-100 hover:border-blue-500"
            >
              {locale === 'en' ? 'Pricing' : 'Цены'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
