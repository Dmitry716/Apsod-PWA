'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '../lib/useLocale'

/** Full-bleed craft hero — product frame first, no brand megatype, no sports mockup */
export default function HomeHero() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="relative min-h-[min(100svh,900px)] flex items-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/devices/showcase-monitor.png"
          alt=""
          fill
          priority
          className="object-cover object-[center_28%] scale-[1.02] apsod-ken-burns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-28 md:py-32">
        <div className="max-w-xl">
          <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-[11px] font-medium tracking-[0.22em] uppercase text-slate-400 mb-6">
            {isEn ? 'Custom software' : 'Собственный код'}
          </p>

          <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-[clamp(2.5rem,6vw,3.75rem)] font-bold tracking-tight leading-[1.08] mb-5">
            {isEn
              ? 'Digital products of any complexity'
              : 'Digital-продукты любой сложности'}
          </h1>

          <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-base md:text-lg text-slate-300/95 max-w-md leading-relaxed mb-10">
            {isEn
              ? 'Websites, commerce and applications — designed, engineered and shipped as one product.'
              : 'Сайты, магазины и приложения: проектируем, разрабатываем и запускаем как единый продукт.'}
          </p>

          <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="apsod-btn-solid apsod-cta-primary px-7 py-3.5 rounded-md text-sm font-semibold"
            >
              <span>{isEn ? 'View work' : 'Смотреть работы'}</span>
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-md text-sm font-semibold border border-white/30 text-white hover:border-white transition-colors"
            >
              {isEn ? 'Start a project' : 'Начать проект'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
