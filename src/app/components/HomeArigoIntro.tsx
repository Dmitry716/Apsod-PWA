'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { useLocale } from '../lib/useLocale'

const STATS = [
  { value: '50+', labelRu: 'Проектов', labelEn: 'Projects shipped' },
  { value: 'BY·EU', labelRu: 'Рынки', labelEn: 'Markets' },
  { value: '1', labelRu: 'Команда founders', labelEn: 'Founder-led team' },
] as const

/** Arigo-style about + stats band */
export default function HomeArigoIntro() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="mb-12 flex items-center gap-4 md:mb-16">
          <span className="text-xs font-medium tracking-[0.18em] text-white/45">02</span>
          <span className="h-px flex-1 bg-white/15" aria-hidden />
        </Reveal>

        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] md:aspect-[5/6]">
              <Image
                src="/about/gallery/team-lounge.jpg"
                alt={isEn ? 'APSOD team' : 'Команда APSOD'}
                fill
                className="object-cover object-[center_35%]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                {isEn ? 'Who we are' : 'Кто мы'}
              </p>
              <h2 className="font-display mb-6 max-w-xl text-[clamp(1.75rem,3.5vw,3rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]">
                {isEn
                  ? 'A product engineering studio for web & mobile'
                  : 'Product engineering для веба и мобильных'}
              </h2>
              <p className="mb-10 max-w-lg text-base leading-relaxed text-white/65">
                {isEn
                  ? 'We design and build sites, apps and digital platforms — from brief to launch — with clear delivery and SEO foundations.'
                  : 'Проектируем и собираем сайты, приложения и цифровые платформы — от брифа до запуска, с понятной поставкой и SEO-базой.'}
              </p>
            </Reveal>

            <div className="grid gap-8 sm:grid-cols-3">
              {STATS.map((stat, i) => (
                <Reveal key={stat.value} stagger={(i + 1) as 1 | 2 | 3}>
                  <p className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-none tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                    {isEn ? stat.labelEn : stat.labelRu}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-orange-300"
              >
                {isEn ? 'About APSOD' : 'О компании'}
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
