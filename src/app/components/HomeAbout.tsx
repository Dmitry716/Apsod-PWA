'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { useLocale } from '../lib/useLocale'

const CHECKS_RU = [
  'Сайты, интернет-магазины, веб и мобильные приложения под одну архитектуру',
  'SEO и GEO закладываем на этапе разработки',
  'Работаем с брендами в Беларуси, РФ, ЕС и США',
]

const CHECKS_EN = [
  'Sites, online stores, web and mobile apps on one architecture',
  'SEO and GEO built into delivery from day one',
  'Brands across Belarus, RU, EU and the US',
]

/** About split — Nerox AboutFour layout */
export default function HomeAbout() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const checks = isEn ? CHECKS_EN : CHECKS_RU

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24 dark:bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:mx-0">
              <div className="relative overflow-hidden rounded-sm">
                <Image
                  src="/about/founders-duo.jpg"
                  alt={isEn ? 'APSOD founders' : 'Основатели APSOD'}
                  width={720}
                  height={900}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div
                  className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-sky-500/20 blur-2xl"
                  aria-hidden
                />
              </div>
              <div
                className="pointer-events-none absolute -left-4 top-8 hidden h-20 w-20 border border-sky-400/40 md:block"
                aria-hidden
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" stagger={2}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {isEn ? 'About us' : 'О нас'}
            </p>
            <h2 className="font-display mb-5 text-[clamp(1.85rem,4vw,2.75rem)] font-bold tracking-normal leading-[1.15] text-slate-950 dark:text-white">
              {isEn ? (
                <>
                  Full-service digital{' '}
                  <span className="font-light text-slate-500 dark:text-slate-400">capabilities.</span>
                </>
              ) : (
                <>
                  Полный цикл digital-{' '}
                  <span className="font-light text-slate-500 dark:text-slate-400">разработки.</span>
                </>
              )}
            </h2>
            <p className="mb-7 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
              {isEn
                ? 'APSOD designs and ships sites, online stores, web and mobile apps as one engineered system — from brief to launch, development and support.'
                : 'APSOD проектирует и запускает сайты, интернет-магазины, веб и мобильные приложения как единую инженерную систему — от брифа до релиза, развития и поддержки.'}
            </p>

            <ul className="mb-9 space-y-3">
              {checks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400"
                    aria-hidden
                  >
                    <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current">
                      <path d="M6.2 11.4 2.8 8l1.1-1.1 2.3 2.3 5-5L12.3 5.3z" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="apsod-btn-solid inline-flex items-center justify-center rounded-md px-7 py-3.5 text-sm font-semibold transition-colors"
            >
              {isEn ? 'Learn more' : 'Подробнее о нас'}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
