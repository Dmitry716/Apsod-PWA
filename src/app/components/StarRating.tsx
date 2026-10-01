type Props = {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  label?: string
}

const SIZE = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' } as const

/** 5 звёзд. Цвет через CSS-переменную --apsod-star (light/dark темы). */
export default function StarRating({
  rating, size = 'md', showValue = false, label,
}: Props) {
  const clamped = Math.max(1, Math.min(5, Math.round(rating)))
  const ariaLabel = label ?? `Оценка ${clamped} из 5`
  const cls = SIZE[size]
  return (
    <span
      className="inline-flex items-center gap-0.5 apsod-star"
      role="img"
      aria-label={ariaLabel}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= clamped
        return (
          <svg
            key={n}
            viewBox="0 0 20 20"
            className={cls}
            aria-hidden="true"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={filled ? 0 : 1.4}
          >
            <path
              d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
              strokeLinejoin="round"
            />
          </svg>
        )
      })}
      {showValue && (
        <span className="ml-1.5 text-xs font-semibold tabular-nums">
          {clamped.toFixed(1)}
        </span>
      )}
    </span>
  )
}
