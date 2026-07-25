'use client'

import Link from 'next/link'
import { POSITIONING } from '../lib/positioning'
import { useLocale } from '../lib/useLocale'

export default function HomeHeroCopy() {
  const { locale } = useLocale()
  const copy = POSITIONING[locale === 'en' ? 'en' : 'ru']

  return (
    <div>
      <div className="apsod-hero-enter apsod-hero-enter-delay-1 inline-flex items-center gap-2 px-4 py-2 bg-blue-100/90 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full mb-6 text-sm font-medium backdrop-blur-sm border border-blue-200/60 dark:border-blue-700/50 apsod-badge-pulse">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
        </span>
        {copy.badge}
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight max-md:text-3xl">
        <span className="block apsod-hero-enter apsod-hero-enter-delay-2">{copy.heroTitle1}</span>
        <span className="block apsod-hero-enter apsod-hero-enter-delay-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
          {copy.heroTitle2}
        </span>
        <span className="block apsod-hero-enter apsod-hero-enter-delay-4 text-lg md:text-xl lg:text-2xl mt-2 font-semibold text-gray-700 dark:text-gray-200">
          {copy.heroTitle3}
        </span>
      </h1>

      <p className="apsod-hero-enter apsod-hero-enter-delay-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed max-md:text-base">
        {copy.heroLead}
      </p>

      <div className="apsod-hero-enter apsod-hero-enter-delay-5 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="apsod-cta-primary px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors max-md:px-6 max-md:py-3 max-md:text-sm"
        >
          <span>{copy.ctaPrimary}</span>
        </Link>
        <Link
          href="/portfolio"
          className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 hover:-translate-y-0.5 transition-all max-md:px-6 max-md:py-3 max-md:text-sm"
        >
          {copy.ctaSecondary}
        </Link>
      </div>
    </div>
  )
}
