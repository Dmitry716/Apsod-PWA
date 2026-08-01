'use client'

import Link from 'next/link'
import { useLocale } from '../lib/useLocale'

export default function HomeHeroCopy() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <div className="relative z-10 max-w-3xl">
      <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-[11px] font-medium tracking-[0.28em] uppercase text-slate-400 mb-8">
        {isEn ? 'Product engineering' : 'Инженерия продуктов'}
      </p>

      <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-[clamp(3.25rem,12vw,7.5rem)] font-bold text-white tracking-[-0.04em] leading-[0.9] mb-8">
        APSOD
      </h1>

      <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-lg md:text-xl text-slate-300 max-w-md leading-relaxed mb-10">
        {isEn
          ? 'Websites and digital products of any complexity — engineered end to end.'
          : 'Сайты и digital-продукты любой сложности на собственном коде.'}
      </p>

      <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
        <Link
          href="/portfolio"
          className="apsod-btn-solid apsod-cta-primary px-8 py-3.5 rounded-md text-sm font-semibold"
        >
          <span>{isEn ? 'See the work' : 'Смотреть работы'}</span>
        </Link>
        <Link
          href="/contact"
          className="px-8 py-3.5 rounded-md text-sm font-semibold border border-white/25 text-white hover:border-white transition-colors"
        >
          {isEn ? 'Start a project' : 'Начать проект'}
        </Link>
      </div>
    </div>
  )
}
