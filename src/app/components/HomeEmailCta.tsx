'use client'

import Reveal from './Reveal'
import { COMPANY } from '../lib/seo'
import { useLocale } from '../lib/useLocale'

/** Mega email CTA — Nerox CtaFour */
export default function HomeEmailCta() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const [local, domain] = COMPANY.email.split('@')

  return (
    <section className="border-y border-slate-200 bg-white py-16 md:py-24 dark:border-[var(--border-color)] dark:bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 text-center">
        <Reveal>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {isEn ? "Let's work together" : 'Давайте работать вместе'}
          </p>
          <h2 className="font-display mb-10 break-all text-[clamp(1.75rem,7vw,4.5rem)] font-bold tracking-normal leading-[1.05] text-slate-950 dark:text-white md:break-normal">
            <a
              href={`mailto:${COMPANY.email}`}
              className="transition-colors hover:text-sky-600 dark:hover:text-sky-300"
            >
              {local}
              <span className="font-light text-slate-400 dark:text-slate-500">@{domain}</span>
            </a>
          </h2>
          <a
            href="#journal"
            className="inline-flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300"
          >
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600"
              aria-hidden
            >
              ↓
            </span>
            {isEn ? 'Scroll down' : 'Дальше'}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
