import Link from 'next/link'
import { COMPANY_ADDRESS_DISPLAY } from '../lib/seo'

const POINTS = [
  {
    title: 'Офис в Минске',
    body: COMPANY_ADDRESS_DISPLAY,
  },
  {
    title: 'Уникальный код',
    body: 'Без Tilda, Wix и типовых шаблонов — полный контроль над продуктом.',
  },
  {
    title: 'Заявки, не «визитка»',
    body: 'Сайт, SEO и GEO как канал продаж — от стратегии до сопровождения.',
  },
] as const

/** Правая колонка hero: спокойный trust-блок под Минск */
export default function HomeGlobalDelivery() {
  return (
    <div className="relative apsod-hero-enter apsod-hero-enter-delay-4">
      <div
        className="absolute -inset-3 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 rounded-3xl blur-2xl opacity-80"
        aria-hidden
      />

      <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-6 md:p-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-2">
          Минск
        </p>
        <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-snug tracking-tight">
          Веб-студия для бизнеса столицы
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          Индивидуальная разработка на современном стеке. Смета за 1 рабочий день после брифа.
        </p>

        <ul className="space-y-5 mb-7">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                aria-hidden
              />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {point.title}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                  {point.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
        >
          Обсудить проект
        </Link>
      </div>
    </div>
  )
}
