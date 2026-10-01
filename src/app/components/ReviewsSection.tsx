'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import ReviewCard from './ReviewCard'
import StarRating from './StarRating'
import { useLocale } from '../lib/useLocale'
import { getFeaturedReviews, getAggregateRating } from '../lib/reviews'

/**
 * Секция отзывов на главной.
 *
 * Технически:
 *  - CSS scroll-snap carousel (нативный свайп на тач-устройствах,
 *    работает с клавиатуры, доступен скринридерам без JS)
 *  - Точки-индикаторы синхронизированы через IntersectionObserver
 *  - Стрелки ← → только на sm+ (на мобилке — свайп)
 *  - Нет автопрокрутки → не нужна кнопка «Пауза» (WCAG 2.2.2 соблюдён)
 *  - Fluid: width карточки в %, font-size через clamp() в CSS
 *  - Light/dark: все цвета через CSS-переменные в globals.css
 */
export default function ReviewsSection() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const reviews = useMemo(() => getFeaturedReviews(12), [])
  const agg = useMemo(() => getAggregateRating(), [])

  const trackRef = useRef<HTMLUListElement | null>(null)
  const [active, setActive] = useState(0)

  // Синхронизация активной точки со скроллом
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-card]'))
    if (cards.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { root: track, threshold: 0.6 }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [reviews])

  const scrollTo = (idx: number) => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll<HTMLElement>('[data-card]')
    const card = cards[idx]
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }

  const goPrev = () => scrollTo(Math.max(0, active - 1))
  const goNext = () => scrollTo(Math.min(reviews.length - 1, active + 1))

  return (
    <section
      className="apsod-reviews-section relative overflow-hidden"
      aria-labelledby="reviews-heading"
    >
      <div
        className="apsod-reviews-glow pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-[clamp(1rem,3vw,2rem)] py-[clamp(3rem,7vw,7rem)]">
        <header className="mx-auto mb-[clamp(2rem,4vw,3.5rem)] max-w-2xl text-center">
          <p className="apsod-section-marker mb-5 justify-center">
            {isEn ? 'Client reviews' : 'Отзывы клиентов'}
          </p>
          <h2
            id="reviews-heading"
            className="font-display font-extrabold uppercase leading-[1.1] tracking-tight text-[clamp(1.5rem,4.5vw,2.75rem)] apsod-reviews-heading"
          >
            {isEn ? 'What our clients say' : 'Что говорят наши клиенты'}
          </h2>
          <div className="mt-5 flex flex-col items-center gap-2">
            <div className="apsod-star">
              <StarRating rating={agg.ratingValue} size="md" />
            </div>
            <p className="text-[clamp(0.8rem,1vw,0.9rem)] apsod-reviews-meta">
              {isEn
                ? `${agg.reviewCount} reviews · average ${agg.ratingValue} of 5`
                : `${agg.reviewCount} отзывов · средняя оценка ${agg.ratingValue} из 5`}
            </p>
          </div>
        </header>

        {/* Стрелки — только на планшете и десктопе */}
        <div className="mb-5 hidden items-center justify-between gap-3 sm:flex">
          <button
            type="button"
            onClick={goPrev}
            disabled={active === 0}
            aria-label={isEn ? 'Previous reviews' : 'Предыдущие отзывы'}
            className="apsod-reviews-arrow inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={active >= reviews.length - 1}
            aria-label={isEn ? 'Next reviews' : 'Следующие отзывы'}
            className="apsod-reviews-arrow inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Трек карточек: нативный scroll-snap. На мобилке карточки
            занимают 88% ширины — видно, что есть ещё. На планшете 2 шт.
            На десктопе 3 шт. Всё — резиновое, без медиазапросов в JS. */}
        <ul
          ref={trackRef}
          className="apsod-reviews-track -mx-[clamp(1rem,3vw,2rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[clamp(1rem,3vw,2rem)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
          aria-label={isEn ? 'Client reviews carousel' : 'Карусель отзывов клиентов'}
        >
          {reviews.map((r) => (
            <li
              key={r.id}
              data-card
              className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
            >
              <ReviewCard review={r} locale={isEn ? 'en' : 'ru'} />
            </li>
          ))}
        </ul>

        {/* Точки */}
        <div
          className="mt-6 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label={isEn ? 'Reviews pages' : 'Страницы отзывов'}
        >
          {reviews.map((r, index) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`${isEn ? 'Review' : 'Отзыв'} ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === active
                  ? 'w-8 apsod-reviews-dot-active'
                  : 'w-1.5 apsod-reviews-dot'
              }`}
            />
          ))}
        </div>

        {/* Подсказка для мобилки */}
        <p className="mt-5 text-center text-xs sm:hidden apsod-reviews-meta">
          {isEn ? 'Swipe to see more →' : 'Свайпните, чтобы увидеть больше →'}
        </p>
      </div>
    </section>
  )
}
