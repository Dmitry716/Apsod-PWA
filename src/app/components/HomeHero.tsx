'use client'

import Link from 'next/link'
import { useLocale } from '../lib/useLocale'
import HomeHeroCodeCanvas from './HomeHeroCodeCanvas'

/** Full-bleed craft hero — live code atmosphere, no client mockups */
export default function HomeHero() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="apsod-grain relative min-h-[min(72svh,600px)] md:min-h-[min(100svh,920px)] flex items-end md:items-center overflow-hidden bg-[var(--apsod-immersive)] text-white">
      <HomeHeroCodeCanvas />

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-12 md:py-32">
        <div className="max-w-2xl">
          <div className="apsod-hero-enter apsod-hero-enter-delay-1 mb-4 md:mb-7 flex items-center gap-3">
            <p className="font-display text-sm md:text-base font-extrabold tracking-[-0.03em] text-white">
              APSOD
            </p>
            <span className="apsod-hero-line-dot" aria-hidden />
            <span className="apsod-hero-line bg-sky-400/80" aria-hidden />
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-400">
              {isEn ? 'Software engineering' : 'Software engineering'}
            </p>
          </div>

          <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-[clamp(2.4rem,8vw,4.5rem)] font-extrabold tracking-[-0.04em] leading-[1.02] mb-4 md:mb-6">
            {isEn
              ? 'Digital products of any complexity'
              : 'Digital-продукты любой сложности'}
          </h1>

          <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-[0.95rem] md:text-lg text-slate-300/95 max-w-md leading-relaxed mb-7 md:mb-11">
            {isEn
              ? 'Websites, commerce and applications — designed, engineered and shipped as one product.'
              : 'Сайты, магазины и приложения: проектируем, разрабатываем и запускаем как единый продукт.'}
          </p>

          <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="apsod-btn-solid apsod-cta-primary px-6 py-3.5 md:px-8 md:py-4 rounded-md text-[12px] font-semibold tracking-[0.1em] uppercase"
            >
              <span>{isEn ? 'View work' : 'Смотреть работы'}</span>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 md:px-8 md:py-4 rounded-md text-[12px] font-semibold tracking-[0.1em] uppercase border border-sky-400/35 text-white hover:border-sky-300/70 hover:bg-sky-400/5 transition-colors"
            >
              {isEn ? 'Start a project' : 'Начать проект'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
