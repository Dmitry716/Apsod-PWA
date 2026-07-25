import Link from 'next/link'
import Reveal from './Reveal'

const SCENARIOS = [
  {
    title: 'Разработка сайта',
    href: '/services/web-development',
    before: ['Заявки в мессенджерах и «на слуху»', 'Нет витрины услуг и цен', 'Слабый поиск по городу'],
    after: ['Сайт на уникальном коде 24/7', 'Понятный путь к записи / заявке', 'База под SEO и аналитику'],
  },
  {
    title: 'Мобильное приложение',
    href: '/services/mobile-development',
    before: ['Клиент «теряется» между сайтом и чатами', 'Нет повторных сценариев в продукте', 'Сложно удержать аудиторию'],
    after: ['MVP под iOS / Android или PWA', 'Ежедневные сценарии в приложении', 'Свой канал без лимитов соцсетей'],
  },
  {
    title: 'Продвижение',
    href: '/services/seo',
    before: ['Мало органического трафика', 'Сайт есть, но заявок из поиска почти нет', 'Бренд не виден в нейросетях'],
    after: ['SEO в Яндексе и Google', 'Рост целевых визитов и заявок', 'GEO: видимость в AI-ответах'],
  },
] as const

/** До / после — понятный оффер для трёх ключевых направлений */
export default function HomeBeforeAfter() {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Reveal className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Было → стало с APSOD
          </h2>
          <div className="apsod-line-draw mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Типовые ситуации клиентов по разработке и продвижению — без выдуманных процентов.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SCENARIOS.map((s, i) => (
            <Reveal key={s.href} stagger={(Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)}>
              <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/60 flex flex-col">
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white">{s.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-0 flex-1">
                  <div className="p-4 border-r border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold uppercase tracking-wide text-rose-500 mb-3">
                      Было
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      {s.before.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="text-rose-400 shrink-0">×</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-3">
                      Стало
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                      {s.after.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="text-emerald-500 shrink-0">✓</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={s.href}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Смотреть услугу →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
