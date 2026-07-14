'use client'

import Link from 'next/link'
import { POSITIONING } from '../lib/positioning'
import { useLocale } from '../lib/useLocale'

export default function HomeHeroCopy() {
  const { locale } = useLocale()
  const copy = POSITIONING[locale === 'en' ? 'en' : 'ru']

  return (
    <div>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6 text-sm font-medium">
        <span className="w-2 h-2 bg-blue-600 rounded-full" />
        {copy.badge}
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight max-md:text-3xl">
        <span className="block">{copy.heroTitle1}</span>
        <span className="block text-blue-600 dark:text-blue-400">{copy.heroTitle2}</span>
        <span className="block text-2xl md:text-3xl lg:text-4xl mt-2 font-semibold text-gray-700 dark:text-gray-200">
          {copy.heroTitle3}
        </span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed max-md:text-base">
        {copy.heroLead}
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all max-md:px-6 max-md:py-3 max-md:text-sm"
        >
          {copy.ctaPrimary}
        </Link>
        <Link
          href="/portfolio"
          className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all max-md:px-6 max-md:py-3 max-md:text-sm"
        >
          {copy.ctaSecondary}
        </Link>
      </div>
    </div>
  )
}
