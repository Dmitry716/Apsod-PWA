const PILLARS = [
  {
    title: 'Engineering',
    label: 'Архитектура, код-ревью, QA и современный стек',
  },
  {
    title: 'Delivery',
    label: 'Прозрачные этапы от Discovery до релиза',
  },
  {
    title: 'Security',
    label: 'Доступ, интеграции, бэкапы и устойчивость',
  },
  {
    title: 'Continuity',
    label: 'Сопровождение, метрики и развитие продукта',
  },
] as const

/** At a glance — в духе enterprise capability strip */
export default function HomeAtAGlance() {
  return (
    <section
      className="relative border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950"
      aria-label="APSOD at a glance"
    >
      <div className="container mx-auto px-4 py-14 md:py-16">
        <p className="text-center text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-10">
          APSOD at a glance
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {PILLARS.map((item) => (
            <div
              key={item.title}
              className="text-center lg:text-left lg:pl-6 lg:border-l lg:border-slate-200 dark:lg:border-slate-800 first:lg:border-l-0 first:lg:pl-0"
            >
              <div className="font-display text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {item.title}
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-snug">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
