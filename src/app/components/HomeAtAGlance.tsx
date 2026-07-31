const FACTS = [
  {
    value: 'с 2010',
    label: '15 лет в digital',
  },
  {
    value: 'Минск',
    label: 'Фокус рынка · Беларусь',
  },
  {
    value: 'Без конструкторов',
    label: 'Только уникальный код',
  },
  {
    value: 'Full cycle',
    label: 'Продукт → SEO/GEO → поддержка',
  },
] as const

/** Компактная полоса фактов в духе «at a glance» — без vanity % */
export default function HomeAtAGlance() {
  return (
    <section
      className="relative border-y border-slate-200/80 dark:border-gray-800 bg-white dark:bg-gray-950"
      aria-label="APSOD at a glance"
    >
      <div className="container mx-auto px-4 py-10 md:py-12">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-8">
          APSOD at a glance
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {FACTS.map((fact) => (
            <div key={fact.label} className="text-center lg:text-left lg:pl-4 lg:border-l lg:border-slate-200 dark:lg:border-gray-800 first:lg:border-l-0 first:lg:pl-0">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {fact.value}
              </div>
              <div className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-snug">
                {fact.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
