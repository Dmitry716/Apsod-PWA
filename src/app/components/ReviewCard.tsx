import Link from 'next/link'
import StarRating from './StarRating'
import type { Review } from '../lib/reviews'

type Props = { review: Review; locale: 'ru' | 'en' }

const M_RU = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
const M_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmt(iso: string, locale: 'ru' | 'en') {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const day = String(d.getUTCDate()).padStart(2, '0')
  const m = d.getUTCMonth()
  const y = d.getUTCFullYear()
  return locale === 'en' ? `${M_EN[m]} ${day}, ${y}` : `${day} ${M_RU[m]} ${y}`
}

/**
 * Карточка отзыва. Все цвета — через CSS-переменные, поэтому
 * автоматически подстраивается под светлую/тёмную тему.
 * «Резина»: fluid padding и font-size через clamp().
 */
export default function ReviewCard({ review, locale }: Props) {
  const text = review.text[locale]
  const author = review.author[locale]
  const position = review.position[locale]
  const company = review.company[locale]

  return (
    <article
      className="apsod-review-card flex h-full flex-col rounded-sm border p-[clamp(1.1rem,2.2vw,1.5rem)]"
      aria-label={`Отзыв от ${author}, ${company}`}
    >
      <div className="apsod-star mb-3">
        <StarRating rating={review.rating} size="sm" />
      </div>

      <blockquote className="mb-5 flex-1 text-[clamp(0.875rem,1vw,0.95rem)] leading-relaxed apsod-review-text">
        <p>&laquo;{text}&raquo;</p>
      </blockquote>

      <footer className="mt-auto flex items-start gap-3">
        <span
          aria-hidden="true"
          className="apsod-review-avatar inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold tracking-wide"
        >
          {review.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold apsod-review-name">
            {author}
          </p>
          <p className="truncate text-xs apsod-review-meta">
            {position} · {company}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-wider apsod-review-meta">
            {fmt(review.date, locale)}
            {review.verified && (
              <> · <span className="apsod-review-verified">{locale === 'en' ? 'verified' : 'проверен'}</span></>
            )}
          </p>
          {review.caseSlug && (
            <Link
              href={`/portfolio/${review.caseSlug}`}
              className="apsod-review-link mt-1 inline-block text-xs font-semibold underline-offset-2 hover:underline"
            >
              {locale === 'en' ? 'View case →' : 'Смотреть кейс →'}
            </Link>
          )}
        </div>
      </footer>
    </article>
  )
}
