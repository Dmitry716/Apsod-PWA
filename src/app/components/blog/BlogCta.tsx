import Link from 'next/link'
import Reveal from '../Reveal'

/**
 * Финальный CTA под листингом блога.
 * Две развилки: обсудить задачу или посмотреть проекты.
 */
export default function BlogCta() {
  return (
    <section
      className="border-t border-slate-200 bg-white py-16 dark:border-[var(--border-color)] dark:bg-[var(--bg-primary)] md:py-20"
      aria-labelledby="blog-cta-heading"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        <Reveal>
          <p className="apsod-section-marker mb-5 justify-center">Что дальше</p>
          <h2
            id="blog-cta-heading"
            className="font-display mb-5 text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold uppercase leading-[1.1] tracking-tight text-slate-900 dark:text-white"
          >
            Не нашли ответ на свой вопрос?
          </h2>
          <p className="mx-auto mb-9 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            Расскажите о задаче — предложим контур, сроки и смету. Обычно
            отвечаем в течение рабочего дня.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="apsod-btn-solid inline-flex rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[var(--bg-primary)]"
            >
              Обсудить проект
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex rounded-full border border-slate-300 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-900 transition-colors hover:border-orange-400 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/25 dark:text-white dark:hover:border-orange-400 dark:hover:text-orange-300 dark:focus-visible:ring-offset-[var(--bg-primary)]"
            >
              Смотреть кейсы
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
