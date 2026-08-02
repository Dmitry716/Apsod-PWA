import type { DevelopmentPhase } from '../lib/development-process'

type Props = {
  title: string
  subtitle: string
  phases: DevelopmentPhase[]
}

export default function DevelopmentProcessSection({ title, subtitle, phases }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-4">
            Процесс
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{subtitle}</p>
        </div>

        <div className="max-w-4xl">
          <div className="relative">
            <div
              className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800"
              aria-hidden
            />

            <div className="space-y-10 md:space-y-12">
              {phases.map((phase) => (
                <article key={phase.step} className="relative pl-16 md:pl-20">
                  <div className="absolute left-0 top-0 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-display text-sm font-bold">
                    {String(phase.step).padStart(2, '0')}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {phase.title}
                      </h3>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {phase.subtitle}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-5 leading-relaxed max-w-2xl">
                      {phase.description}
                    </p>
                    <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-400 mb-3">
                      Артефакты этапа
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl">
                      {phase.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                        >
                          <span className="h-px w-3 bg-slate-400 shrink-0 mt-2.5" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
          {[
            { label: 'Методология', value: 'Scrum / Agile' },
            { label: 'Спринт', value: '2 недели' },
            { label: 'Прозрачность', value: 'Демо и отчёты' },
          ].map((item) => (
            <div key={item.label} className="bg-white dark:bg-gray-950 p-5 text-center sm:text-left">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-400 mb-1">
                {item.label}
              </p>
              <p className="font-display font-semibold text-slate-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
