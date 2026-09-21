'use client'

import Link from 'next/link'
import { useLocale } from '../lib/useLocale'

/** Arigo-inspired hero — oversized type, gradient stage, no mockups */
export default function HomeHero() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="apsod-bleed-hero relative min-h-[min(100svh,920px)] overflow-hidden text-white">
      <div className="apsod-arigo-hero-bg absolute inset-0" aria-hidden />
      <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36 lg:pb-24">
        <p className="apsod-hero-enter apsod-hero-enter-delay-1 mb-8 flex max-w-xl items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 md:mb-10 md:text-xs">
          <span>
            {isEn
              ? 'Building products that convert and scale'
              : 'Продукты, которые конвертируют и масштабируются'}
          </span>
          <span className="hidden h-px flex-1 bg-white/50 sm:block" aria-hidden />
          <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-white sm:block" aria-hidden />
        </p>

        <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display font-extrabold uppercase leading-[0.92] tracking-[-0.03em]">
          <span className="block text-[clamp(3.25rem,14vw,9.5rem)]">Digital</span>
          <span className="mt-1 flex flex-wrap items-center gap-3 text-[clamp(3.25rem,14vw,9.5rem)] md:gap-5 md:mt-2">
            <span className="apsod-arigo-star" aria-hidden>
              <svg viewBox="0 0 64 64" className="h-[0.55em] w-[0.55em]" fill="currentColor">
                <path d="M32 4l4.2 20.2L56 32l-19.8 7.8L32 60l-4.2-20.2L8 32l19.8-7.8L32 4z" />
              </svg>
            </span>
            <span>{isEn ? 'Engineering' : 'Engineering'}</span>
          </span>
        </h1>

        <div className="apsod-hero-enter apsod-hero-enter-delay-3 mt-10 flex flex-wrap gap-3 md:mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100"
          >
            {isEn ? 'Start a project' : 'Начать проект'}
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
          >
            {isEn ? 'View work' : 'Смотреть работы'}
          </Link>
        </div>
      </div>
    </section>
  )
}
