'use client'

import { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { getReviewsByService, type ReviewServiceSlug } from '../lib/reviews'

type Props = {
  serviceSlug: ReviewServiceSlug
  limit?: number
  headingRu?: string
  headingEn?: string
}

export default function ReviewsByService({
  serviceSlug,
  limit = 3,
  headingRu,
  headingEn,
}: Props) {
  const [locale, setLocale] = useState<'ru' | 'en'>('ru')

  useEffect(() => {
    if (document.documentElement.lang === 'en') setLocale('en')
  }, [])

  const reviews = getReviewsByService(serviceSlug, limit)
  if (reviews.length === 0) return null

  const isEn = locale === 'en'

  return (
    <section
      className="apsod-reviews-section relative overflow-hidden"
      aria-labelledby={`reviews-service-${serviceSlug}`}
    >
      <div
        className="apsod-reviews-glow pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-[clamp(1rem,3vw,2rem)] py-[clamp(2.5rem,5vw,4.5rem)]">
        <header className="mx-auto mb-[clamp(1.5rem,3vw,2.5rem)] max-w-2xl text-center">
          <p className="apsod-section-marker mb-4 justify-center">
            {isEn ? 'Client reviews' : 'Отзывы клиентов'}
          </p>
          <h2
            id={`reviews-service-${serviceSlug}`}
            className="font-display font-extrabold uppercase leading-[1.15] tracking-tight text-[clamp(1.35rem,3.5vw,2.25rem)] apsod-reviews-heading"
          >
            {isEn
              ? (headingEn ?? 'What clients say about this service')
              : (headingRu ?? 'Что говорят клиенты об этой услуге')}
          </h2>
        </header>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.id} className="min-w-0">
              <ReviewCard review={r} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
