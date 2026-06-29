import type { DevelopmentPhase } from '../lib/development-process'

type Props = {
  title: string
  subtitle: string
  phases: DevelopmentPhase[]
}

export default function DevelopmentProcessSection({ title, subtitle, phases }: Props) {
  return (
    <section className="py-20 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Процесс разработки
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-blue-500 opacity-30"
              aria-hidden
            />

            <div className="space-y-8">
              {phases.map((phase) => (
                <article
                  key={phase.step}
                  className="relative pl-16 md:pl-20"
                >
                  <div className="absolute left-0 md:left-2 top-1 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                    {phase.step}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {phase.title}
                      </h3>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {phase.subtitle}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                      {phase.description}
                    </p>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                        Артефакты этапа
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {phase.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <span className="text-blue-500 mt-0.5 shrink-0" aria-hidden>
                              ✓
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Методология', value: 'Scrum / Agile' },
            { label: 'Длительность спринта', value: '2 недели' },
            { label: 'Прозрачность', value: 'Демо и отчёты' },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                {item.label}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
