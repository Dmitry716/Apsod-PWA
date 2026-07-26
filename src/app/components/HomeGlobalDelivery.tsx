import Link from 'next/link'

const POINTS = [
  {
    title: 'BY · RU · remote',
    body: 'Хабы в Витебске, Минске и Москве — проекты ведём удалённо для клиентов по миру.',
  },
  {
    title: 'Привлечение клиентов',
    body: 'Сайт, приложение, SEO и GEO как канал заявок, а не «страница ради страницы».',
  },
  {
    title: 'Сопровождение',
    body: 'Поддержка и развитие после запуска: обновления, метрики, доработки по данным.',
  },
  {
    title: 'Только уникальный код',
    body: 'Без Tilda, Wix и типовых шаблонов — полный контроль над продуктом и безопасностью.',
  },
] as const

/** Правая колонка hero: глобальная доставка вместо vanity-цифр */
export default function HomeGlobalDelivery() {
  return (
    <div className="relative apsod-hero-enter apsod-hero-enter-delay-4">
      <div
        className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-2xl opacity-80 dark:opacity-100"
        aria-hidden
      />

      <div className="relative rounded-2xl border border-blue-100/80 dark:border-gray-700/60 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl p-6 md:p-7 max-md:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          Global delivery
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
          IT-команда для клиентов по всему миру
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
          Привлекаем и обслуживаем бизнес удалённо: от стратегии и продукта до роста в поиске и
          сопровождения.
        </p>

        <ul className="space-y-4 mb-6">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-3">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-cyan-400"
                aria-hidden
              />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-[15px]">
                  {point.title}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-0.5">
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
