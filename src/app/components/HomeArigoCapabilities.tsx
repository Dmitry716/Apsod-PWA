'use client'

import Link from 'next/link'
import Reveal from './Reveal'
import { useLocale } from '../lib/useLocale'

const CAPS = [
  {
    n: '01',
    titleRu: 'Web',
    titleEn: 'Web',
    bodyRu: 'Сайты и платформы: лендинг, корпоратив, магазин.',
    bodyEn: 'Sites and platforms: landing, corporate, store.',
    href: '/services/web-development',
  },
  {
    n: '02',
    titleRu: 'Mobile',
    titleEn: 'Mobile',
    bodyRu: 'iOS, Android и PWA — от MVP до релиза в сторах.',
    bodyEn: 'iOS, Android and PWA — from MVP to store release.',
    href: '/services/mobile-development',
  },
  {
    n: '03',
    titleRu: 'UI / UX',
    titleEn: 'UI / UX',
    bodyRu: 'Интерфейсы и дизайн-системы под продукт.',
    bodyEn: 'Interfaces and design systems for the product.',
    href: '/services/ui-ux',
  },
  {
    n: '04',
    titleRu: 'Growth',
    titleEn: 'Growth',
    bodyRu: 'SEO и GEO — видимость после запуска.',
    bodyEn: 'SEO and GEO — visibility after launch.',
    href: '/services/seo',
  },
] as const

/** Arigo-style capability list */
export default function HomeArigoCapabilities() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="mb-12 md:mb-16">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs font-medium tracking-[0.18em] text-white/45">04</span>
            <span className="h-px w-16 bg-white/15 sm:w-24" aria-hidden />
          </div>
          <h2 className="font-display max-w-2xl text-[clamp(1.85rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]">
            {isEn ? 'Capabilities that ship products' : 'Capabilities для запуска продуктов'}
          </h2>
        </Reveal>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {CAPS.map((item, i) => (
            <Reveal key={item.n} stagger={(Math.min(i, 4) + 1) as 1 | 2 | 3 | 4 | 5}>
              <Link
                href={item.href}
                className="group grid gap-4 py-8 transition-colors sm:grid-cols-12 sm:items-center sm:gap-6 md:py-10"
              >
                <span className="text-xs font-medium tracking-[0.18em] text-white/35 sm:col-span-1">
                  {item.n}
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight transition-colors group-hover:text-orange-300 sm:col-span-4 md:text-3xl">
                  {isEn ? item.titleEn : item.titleRu}
                </h3>
                <p className="text-sm leading-relaxed text-white/55 sm:col-span-5">
                  {isEn ? item.bodyEn : item.bodyRu}
                </p>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/40 transition-colors group-hover:text-white sm:col-span-2 sm:text-right">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
