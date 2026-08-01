const PILLARS = [
  {
    title: 'Инженерия',
    label: 'Архитектура, код-ревью, QA и современный стек',
  },
  {
    title: 'Delivery',
    label: 'Прозрачные этапы от Discovery до релиза',
  },
  {
    title: 'Безопасность',
    label: 'Доступ, интеграции, бэкапы и устойчивость',
  },
  {
    title: 'Сопровождение',
    label: 'Метрики, поддержка и развитие продукта',
  },
] as const

/** Capability strip — спокойный enterprise */
export default function HomeAtAGlance() {
  return (
    <section
      className="relative border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-gray-900"
      aria-label="Возможности APSOD"
    >
      <div className="container mx-auto px-4 py-12 md:py-14">
        <p className="text-center text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-10">
          Возможности
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {PILLARS.map((item) => (
            <div
              key={item.title}
              className="text-center lg:text-left lg:pl-6 lg:border-l lg:border-slate-200 dark:lg:border-slate-700 first:lg:border-l-0 first:lg:pl-0"
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
