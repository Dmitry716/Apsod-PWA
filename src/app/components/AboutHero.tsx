'use client'

import Link from 'next/link'
import { useLocale } from '../lib/useLocale'
import HomeHeroCodeCanvas from './HomeHeroCodeCanvas'

/** Hero «О компании» — компактный, код справа */
export default function AboutHero() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section
      className="apsod-bleed-hero relative z-10 overflow-hidden text-white"
      aria-labelledby="about-hero-title"
    >
      <div className="apsod-arigo-hero-bg absolute inset-0" aria-hidden />
      <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />

      {/* Код — СПРАВА */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-[96px] hidden w-1/2 opacity-20 lg:block"
        aria-hidden
      >
        <div className="apsod-hero-code-bare">
          <HomeHeroCodeCanvas />
        </div>
      </div>

      <div className="relative z-30 mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36 lg:pb-24 lg:pt-40">
        <p
          className="apsod-hero-enter apsod-hero-enter-delay-1 mb-5 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 md:text-xs"
          aria-hidden="true"
        >
          <span>{isEn ? 'APSOD · About' : 'APSOD · О нас'}</span>
          <span className="hidden h-px flex-1 bg-white/40 sm:block" aria-hidden />
        </p>

        <h1
          id="about-hero-title"
          className="apsod-hero-enter apsod-hero-enter-delay-2 font-display max-w-3xl text-[clamp(2rem,5vw,3.75rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]"
        >
          {isEn ? (
            <>
              We build <span className="text-white/40">digital products</span>
            </>
          ) : (
            <>
              Создаём <span className="text-white/40">digital-продукты</span>
            </>
          )}
        </h1>

        <p className="apsod-hero-enter apsod-hero-enter-delay-3 mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {isEn
            ? 'APSOD designs and ships websites, apps and digital systems — from research to post-launch support.'
            : 'APSOD проектирует и выпускает сайты, приложения и digital-системы — от исследования до сопровождения.'}
        </p>

        <div className="apsod-hero-enter apsod-hero-enter-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100 sm:w-auto"
          >
            {isEn ? 'Contact us' : 'Связаться'}
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto"
          >
            {isEn ? 'View cases' : 'Смотреть кейсы'}
          </Link>
        </div>
      </div>
    </section>
  )
}
