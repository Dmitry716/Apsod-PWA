'use client'

import Link from 'next/link'
import Reveal from './Reveal'
import { t } from '../lib/i18n'
import { useLocale } from '../lib/useLocale'

export default function HomeProjectCta() {
  const { locale } = useLocale()

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-16 dark:border-[var(--border-color)] dark:bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display mb-2 text-2xl font-bold tracking-normal text-slate-950 dark:text-white md:text-3xl">
              {t(locale, 'home.cta.title')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t(locale, 'home.cta.pipeline')}
            </p>
          </div>
          <Link
            href="/contact"
            className="apsod-btn-solid inline-flex shrink-0 items-center justify-center rounded-md px-7 py-3.5 text-sm font-semibold transition-colors"
          >
            {t(locale, 'home.cta.button')}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
