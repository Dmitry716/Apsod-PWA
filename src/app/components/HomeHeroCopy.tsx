'use client'

import Link from 'next/link'
import { POSITIONING } from '../lib/positioning'
import { useLocale } from '../lib/useLocale'
import { COMPANY_ADDRESS_DISPLAY } from '../lib/seo'

export default function HomeHeroCopy() {
  const { locale } = useLocale()
  const copy = POSITIONING[locale === 'en' ? 'en' : 'ru']
  const isEn = locale === 'en'

  return (
    <div className="max-w-3xl">
      <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-6">
        {copy.badge}
      </p>

      <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 dark:text-white mb-6 leading-[1.2] tracking-tight max-md:text-[1.65rem]">
        {copy.heroTitle}
      </h1>

      <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-2xl leading-relaxed max-md:text-base">
        {copy.heroLead}
      </p>

      <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-sm text-slate-500 dark:text-slate-400 mb-8">
        {isEn ? 'Office · ' : 'Офис · '}
        <span className="text-slate-700 dark:text-slate-200">{COMPANY_ADDRESS_DISPLAY}</span>
      </p>

      <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3 mb-10">
        <Link
          href="/contact"
          className="apsod-btn-solid apsod-cta-primary px-7 py-3 rounded-md text-sm font-semibold transition-colors"
        >
          <span>{copy.ctaPrimary}</span>
        </Link>
        <Link
          href="/portfolio"
          className="px-7 py-3 text-slate-800 dark:text-white rounded-md text-sm font-semibold border border-slate-300 dark:border-slate-600 hover:border-slate-900 dark:hover:border-white transition-colors"
        >
          {copy.ctaSecondary}
        </Link>
      </div>

      <nav
        className="apsod-hero-enter apsod-hero-enter-delay-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 dark:border-slate-800 pt-6"
        aria-label={isEn ? 'Focus areas' : 'Направления'}
      >
        {copy.heroTopics.map((topic) => (
          <Link
            key={topic.href}
            href={topic.href}
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            {topic.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
