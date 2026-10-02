'use client'

import ReviewCard from './ReviewCard'
import { useLocale } from '../lib/useLocale'
import { REVIEWS } from '../lib/reviews'

type Props = { caseSlug: string }

export default function ReviewByCase({ caseSlug }: Props) {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const review = REVIEWS.find((r) => r.caseSlug === caseSlug)
  if (!review) return null

  return (
    <section
      className="apsod-reviews-section relative overflow-hidden"
      aria-labelledby={`reviews-case-${caseSlug}`}
    >
      <div
        className="apsod-reviews-glow pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-[clamp(1rem,3vw,2rem)] py-[clamp(2.5rem,5vw,4rem)]">
        <header className="mb-6 text-center">
          <p className="apsod-section-marker mb-3 justify-center">
            {isEn ? 'Client feedback' : 'Отзыв клиента'}
          </p>
          <h2
            id={`reviews-case-${caseSlug}`}
            className="font-display font-extrabold uppercase leading-[1.15] tracking-tight text-[clamp(1.25rem,3vw,1.75rem)] apsod-reviews-heading"
          >
            {isEn ? 'What the client said' : 'Что сказал клиент'}
          </h2>
        </header>
        <div className="mx-auto max-w-xl">
          <ReviewCard review={review} locale={isEn ? 'en' : 'ru'} />
        </div>
      </div>
    </section>
  )
}
