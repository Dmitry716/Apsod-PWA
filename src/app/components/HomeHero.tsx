'use client'

import Link from 'next/link'
import { useLocale } from '../lib/useLocale'
import HomeHeroCodeCanvas from './HomeHeroCodeCanvas'

/** Full-bleed craft hero — live code atmosphere, no client mockups */
export default function HomeHero() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="relative min-h-[min(68svh,560px)] md:min-h-[min(100svh,900px)] flex items-end md:items-center overflow-hidden bg-slate-950 text-white">
      <HomeHeroCodeCanvas />

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-10 md:py-32">
        <div className="max-w-xl">
          <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-[11px] font-medium tracking-[0.22em] uppercase text-slate-400 mb-3 md:mb-6">
            {isEn ? 'Custom software' : 'Собственный код'}
          </p>

          <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-[clamp(2.15rem,7.5vw,3.75rem)] font-bold tracking-tight leading-[1.08] mb-3 md:mb-5">
            {isEn
              ? 'Digital products of any complexity'
              : 'Digital-продукты любой сложности'}
          </h1>

          <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-[0.95rem] md:text-lg text-slate-300/95 max-w-md leading-relaxed mb-6 md:mb-10">
            {isEn
              ? 'Websites, commerce and applications — designed, engineered and shipped as one product.'
              : 'Сайты, магазины и приложения: проектируем, разрабатываем и запускаем как единый продукт.'}
          </p>

          <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="apsod-btn-solid apsod-cta-primary px-6 py-3 md:px-7 md:py-3.5 rounded-md text-sm font-semibold"
            >
              <span>{isEn ? 'View work' : 'Смотреть работы'}</span>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 md:px-7 md:py-3.5 rounded-md text-sm font-semibold border border-white/30 text-white hover:border-white transition-colors"
            >
              {isEn ? 'Start a project' : 'Начать проект'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
