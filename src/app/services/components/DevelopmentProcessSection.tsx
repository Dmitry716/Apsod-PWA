import type { DevelopmentPhase } from '../lib/development-process'

type Props = {
  title: string
  subtitle: string
  phases: DevelopmentPhase[]
}

export default function DevelopmentProcessSection({ title, subtitle, phases }: Props) {
  return (
    <section className="py-14 md:py-20 bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="mb-10 md:mb-12 md:flex md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-3">
              Процесс
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{subtitle}</p>
          </div>
        </div>

        <div className="grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 md:grid-cols-2">
          {phases.map((phase) => (
            <article
              key={phase.step}
              className="apsod-surface-hover group bg-white dark:bg-gray-950 p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-display text-sm font-bold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                  {String(phase.step).padStart(2, '0')}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-transform duration-500 group-hover:translate-x-0.5">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{phase.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                {phase.description}
              </p>
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-400 mb-3">
                Артефакты этапа
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {phase.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-white"
                  >
                    <span
                      className="h-px w-3 bg-slate-400 shrink-0 mt-2.5 transition-all duration-500 group-hover:w-4 group-hover:bg-slate-900 dark:group-hover:bg-white"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
          {[
            { label: 'Методология', value: 'Scrum / Agile' },
            { label: 'Спринт', value: '2 недели' },
            { label: 'Прозрачность', value: 'Демо и отчёты' },
          ].map((item) => (
            <div
              key={item.label}
              className="apsod-surface-hover bg-white dark:bg-gray-950 p-5 text-center sm:text-left"
            >
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
