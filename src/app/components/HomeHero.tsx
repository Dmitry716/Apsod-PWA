'use client'

import Link from 'next/link'
import { useLocale } from '../lib/useLocale'
import HomeHeroCodeCanvas from './HomeHeroCodeCanvas'

/** Product Lab command surface — brand + actions + framed runtime panel */
export default function HomeHero() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-[var(--border-color)] bg-white dark:bg-[var(--bg-primary)]">
      <div className="apsod-lab-grid-bg absolute inset-0 opacity-40 dark:opacity-50" aria-hidden />

      <div className="container mx-auto px-4 relative z-10 py-10 md:py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch min-w-0">
          <div className="lg:col-span-5 flex flex-col justify-end min-w-0">
            <p className="apsod-lab-mono text-[11px] text-slate-500 dark:text-slate-400 mb-4 tracking-[0.16em] uppercase">
              {isEn ? 'Build · Ship · Grow' : 'Build · Ship · Grow'}
            </p>

            <h1 className="apsod-hero-enter apsod-hero-enter-delay-1 font-display text-[clamp(3.2rem,12vw,6.5rem)] font-extrabold tracking-[-0.06em] leading-[0.9] text-slate-950 dark:text-white mb-5 md:mb-6">
              APSOD
            </h1>

            <p className="apsod-hero-enter apsod-hero-enter-delay-2 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed mb-7 md:mb-9">
              {isEn
                ? 'Web, commerce and apps as one engineered product.'
                : 'Сайты, магазины и приложения — как один инженерный продукт.'}
            </p>

            <div className="apsod-hero-enter apsod-hero-enter-delay-3 flex flex-wrap gap-2.5">
              <Link href="/portfolio" className="apsod-lab-btn apsod-lab-btn--primary">
                {isEn ? 'Open cases' : 'Открыть кейсы'}
              </Link>
              <Link href="/contact" className="apsod-lab-btn apsod-lab-btn--ghost">
                {isEn ? 'Start project' : 'Запустить проект'}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 apsod-hero-enter apsod-hero-enter-delay-2">
            <HomeHeroCodeCanvas />
          </div>
        </div>
      </div>
    </section>
  )
}
