'use client'

import Link from 'next/link'
import { POSITIONING } from '../lib/positioning'
import { useLocale } from '../lib/useLocale'
import Reveal from './Reveal'

export default function HomeValueSections() {
  const { locale } = useLocale()
  const copy = POSITIONING[locale === 'en' ? 'en' : 'ru']

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <Reveal className="mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            {copy.lifecycleTitle}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
          {copy.lifecycle.map((item, i) => (
            <Reveal
              key={item.step}
              stagger={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}
              className="bg-white dark:bg-gray-950 p-6 md:p-8 min-h-[140px] md:min-h-[180px] flex flex-col"
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-400 mb-auto pb-6">
                {item.step}
              </p>
              <h3 className="font-display text-base md:text-lg font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                {item.title}
              </h3>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10" stagger={3}>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-900 dark:text-white underline-offset-4 hover:underline"
          >
            {locale === 'en' ? 'Start a project' : 'Начать проект'}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
