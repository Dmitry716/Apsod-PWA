'use client'

import Link from 'next/link'
import { HOMEPAGE_FAQ } from '../lib/homepage-faq'
import { useLocale } from '../lib/useLocale'

/** FAQ на главной — тёмный Arigo-блок + коммерческие анкоры */
export default function HomeSeoSection() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section className="border-t border-white/10 bg-black py-14 text-white md:py-20">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <h2 className="font-display mb-8 text-center text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
          {isEn ? 'FAQ' : 'Частые вопросы'}
        </h2>
        <div className="space-y-2">
          {HOMEPAGE_FAQ.map((item) => (
            <details
              key={item.question}
              className="group border border-white/15 bg-white/[0.03] open:border-white/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-sm font-medium text-white md:text-base">
                {isEn ? item.question : item.question}
                <span
                  className="shrink-0 text-lg leading-none text-white/40 transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 text-sm leading-relaxed text-white/65">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/45">
          <Link
            href="/services/web-development"
            className="text-white/80 underline-offset-4 transition-colors hover:text-orange-300 hover:underline"
          >
            {isEn ? 'Web development' : 'Разработка сайтов'}
          </Link>
          {' · '}
          <Link
            href="/services/seo"
            className="text-white/80 underline-offset-4 transition-colors hover:text-orange-300 hover:underline"
          >
            {isEn ? 'SEO' : 'SEO продвижение'}
          </Link>
          {' · '}
          <Link
            href="/contact"
            className="text-white/80 underline-offset-4 transition-colors hover:text-orange-300 hover:underline"
          >
            {isEn ? 'Get a quote' : 'Смета / контакты'}
          </Link>
        </p>
      </div>
    </section>
  )
}
