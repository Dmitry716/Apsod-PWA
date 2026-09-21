'use client'

import Link from 'next/link'
import Reveal from './Reveal'
import { useLocale } from '../lib/useLocale'

/** Arigo-style closing CTA */
export default function HomeArigoCta() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="apsod-arigo-hero-bg relative overflow-hidden text-white">
      <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            {isEn ? "Let's work together" : 'Давайте работать вместе'}
          </p>
          <h2 className="font-display mb-10 max-w-4xl text-[clamp(2.25rem,7vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
            {isEn ? 'Start your next product' : 'Запустим ваш следующий продукт'}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-9 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 transition-colors hover:bg-orange-100"
          >
            {isEn ? 'Contact us now' : 'Связаться'}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
