'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { useLocale } from '../lib/useLocale'

/** Split goal block */
export default function HomeGoalSplit() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="relative overflow-hidden bg-slate-100 dark:bg-[var(--bg-secondary)]">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-[520px]">
          <Image
            src="/about/gallery/office-collab.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-slate-950/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link
              href="/portfolio"
              className="group inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-transform duration-500 hover:scale-105 hover:bg-white/20"
              aria-label={isEn ? 'View portfolio' : 'Смотреть портфолио'}
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="flex items-center px-6 py-14 md:px-12 md:py-20 lg:px-16">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {isEn ? 'Our main goal' : 'Наша цель'}
            </p>
            <h2 className="font-display mb-5 text-[clamp(1.85rem,3.5vw,2.6rem)] font-bold tracking-normal leading-[1.15] text-slate-950 dark:text-white">
              {isEn ? (
                <>
                  Building products with{' '}
                  <span className="font-light text-slate-500 dark:text-slate-400">exclusive features.</span>
                </>
              ) : (
                <>
                  Продукты с{' '}
                  <span className="font-light text-slate-500 dark:text-slate-400">сильной инженерией.</span>
                </>
              )}
            </h2>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {isEn
                ? 'We ship interfaces that convert, systems that scale, and SEO foundations that keep bringing leads after launch.'
                : 'Делаем интерфейсы, которые конвертируют, системы, которые масштабируются, и SEO-базу, которая продолжает приносить заявки после запуска.'}
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-sky-600 dark:text-white dark:hover:text-sky-300"
            >
              {isEn ? 'More details' : 'Смотреть проекты'}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
