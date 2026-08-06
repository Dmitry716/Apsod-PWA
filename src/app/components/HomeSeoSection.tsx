import Link from 'next/link'
import { HOMEPAGE_FAQ } from '../lib/homepage-faq'

/** FAQ only — без SEO-стены текста и дублирующих ссылок */
export default function HomeSeoSection() {
  return (
    <section className="py-14 md:py-16 bg-slate-50 dark:bg-gray-900/50 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight text-center">
          Вопросы
        </h2>
        <div className="space-y-2">
          {HOMEPAGE_FAQ.map((item) => (
            <details
              key={item.question}
              className="group border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 open:border-slate-300 dark:open:border-slate-600"
            >
              <summary className="cursor-pointer px-5 py-3.5 font-medium text-slate-900 dark:text-white list-none flex justify-between items-center gap-4 text-sm md:text-base">
                {item.question}
                <span
                  className="text-slate-400 shrink-0 group-open:rotate-45 transition-transform text-lg leading-none"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          <Link
            href="/services/web-development"
            className="underline-offset-4 hover:underline text-slate-800 dark:text-slate-200"
          >
            Разработка сайтов
          </Link>
          {' · '}
          <Link href="/pricing" className="underline-offset-4 hover:underline text-slate-800 dark:text-slate-200">
            Стоимость
          </Link>
          {' · '}
          <Link href="/services/seo" className="underline-offset-4 hover:underline text-slate-800 dark:text-slate-200">
            SEO
          </Link>
          {' · '}
          <Link href="/contact" className="underline-offset-4 hover:underline text-slate-800 dark:text-slate-200">
            Связаться
          </Link>
        </p>
      </div>
    </section>
  )
}
