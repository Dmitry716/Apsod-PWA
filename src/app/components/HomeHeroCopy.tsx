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
    <div className="max-w-2xl">
      <p className="apsod-hero-enter apsod-hero-enter-delay-1 font-display text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-5">
        APSOD
      </p>

      <p className="apsod-hero-enter apsod-hero-enter-delay-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
        {copy.badge}
      </p>

      <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-900 dark:text-white mb-6 leading-[1.12] tracking-tight max-md:text-[1.85rem]">
        <span className="block apsod-hero-enter apsod-hero-enter-delay-2">{copy.heroTitle1}</span>
        <span className="block apsod-hero-enter apsod-hero-enter-delay-3 text-blue-600 dark:text-blue-400">
          {copy.heroTitle2}
        </span>
        <span className="block apsod-hero-enter apsod-hero-enter-delay-4 mt-3 text-base md:text-lg lg:text-xl font-medium text-slate-600 dark:text-slate-300 tracking-normal">
          {copy.heroTitle3}
        </span>
      </h1>

      <p className="apsod-hero-enter apsod-hero-enter-delay-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-4 max-w-xl leading-relaxed max-md:text-base">
        {copy.heroLead}
      </p>

      <p className="apsod-hero-enter apsod-hero-enter-delay-4 text-sm text-slate-500 dark:text-slate-400 mb-8">
        {isEn ? 'Office: ' : 'Офис: '}
        <span className="text-slate-700 dark:text-slate-200 font-medium">{COMPANY_ADDRESS_DISPLAY}</span>
      </p>

      <div className="apsod-hero-enter apsod-hero-enter-delay-5 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="apsod-cta-primary px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors max-md:px-6 max-md:py-3 max-md:text-sm"
        >
          <span>{copy.ctaPrimary}</span>
        </Link>
        <Link
          href="/portfolio"
          className="px-8 py-3.5 text-slate-800 dark:text-white rounded-lg font-semibold border border-slate-300 dark:border-slate-600 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors max-md:px-6 max-md:py-3 max-md:text-sm"
        >
          {copy.ctaSecondary}
        </Link>
      </div>
    </div>
  )
}
