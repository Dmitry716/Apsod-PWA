import Link from 'next/link'
import { COMPANY_ADDRESS_DISPLAY } from '../lib/seo'

const POINTS = [
  {
    title: 'Офис в Минске',
    body: COMPANY_ADDRESS_DISPLAY,
  },
  {
    title: 'Полный цикл delivery',
    body: 'Discovery, архитектура, разработка, QA, релиз и сопровождение.',
  },
  {
    title: 'Рост после запуска',
    body: 'SEO, GEO и развитие продукта по данным эксплуатации.',
  },
] as const

/** Правая колонка hero: editorial rail, не SaaS-карточка */
export default function HomeGlobalDelivery() {
  return (
    <aside className="relative apsod-hero-enter apsod-hero-enter-delay-4 lg:pl-10 lg:border-l border-slate-200 dark:border-slate-700">
      <p className="text-xs font-medium tracking-[0.16em] uppercase text-slate-500 dark:text-slate-400 mb-3">
        Сотрудничество
      </p>
      <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-snug tracking-tight">
        Инженерный партнёр по digital-продукту
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
        Фиксируем scope, этапы и критерии приёмки. Коммерческое предложение — после брифа.
      </p>

      <ul className="space-y-5 mb-8">
        {POINTS.map((point) => (
          <li key={point.title} className="border-t border-slate-200 dark:border-slate-700 pt-4 first:border-0 first:pt-0">
            <div className="font-display font-semibold text-slate-900 dark:text-white text-sm tracking-tight">
              {point.title}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
              {point.body}
            </p>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="apsod-btn-solid inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-md text-sm font-semibold transition-colors"
      >
        Связаться с нами
      </Link>
    </aside>
  )
}
