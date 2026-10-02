import Reveal from '../Reveal'

const STATS = [
  { value: '20+', label: 'реализованных проектов' },
  { value: '7', label: 'лет на рынке' },
  { value: '13', label: 'отзывов клиентов' },
  { value: '100%', label: 'NDA по запросу' },
] as const

/**
 * Trust-блок перед CTA. Цифры появляются со stagger-анимацией через Reveal.
 */
export default function BlogTrust() {
  return (
    <section
      className="border-y border-slate-200 bg-slate-50 py-12 dark:border-[var(--border-color)] dark:bg-[var(--bg-secondary)] md:py-16"
      aria-labelledby="blog-trust-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="mb-8 max-w-2xl md:mb-10">
          <p className="apsod-section-marker mb-3">Почему APSOD</p>
          <h2
            id="blog-trust-heading"
            className="font-display text-2xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white md:text-3xl"
          >
            Не просто статьи — практика
          </h2>
        </Reveal>

        <ul
          className="grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 dark:border-[var(--border-color)] dark:bg-[var(--border-color)] md:grid-cols-4"
          role="list"
        >
          {STATS.map((item, index) => (
            <Reveal
              key={item.label}
              stagger={Math.min(index + 1, 5) as 1 | 2 | 3 | 4 | 5}
              className="flex min-h-[140px] flex-col justify-end bg-white p-6 dark:bg-[var(--bg-card)] md:min-h-[160px] md:p-8"
            >
              <li className="contents">
                <p className="font-display mb-2 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-none tracking-tight text-orange-600 dark:text-orange-400">
                  {item.value}
                </p>
                <p className="text-sm leading-snug text-slate-600 dark:text-slate-300">
                  {item.label}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
