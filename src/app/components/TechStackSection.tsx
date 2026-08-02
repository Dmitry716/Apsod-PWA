import Reveal from './Reveal'
import { TECH_STACK_CATEGORIES, type TechStackCategory } from '../lib/tech-stack'

type Props = {
  title?: string
  subtitle?: string
  categories?: TechStackCategory[]
  className?: string
}

export default function TechStackSection({
  title = 'Стек',
  subtitle = 'Подбираем технологии под задачу: от современных JS-фреймворков до ASP.NET Core и мобильных платформ.',
  categories = TECH_STACK_CATEGORIES,
  className = '',
}: Props) {
  return (
    <section
      className={`py-14 md:py-20 border-y border-slate-200 dark:border-slate-800 ${className}`}
    >
      <div className="container mx-auto px-4">
        <Reveal className="mb-8 md:mb-10 max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-3">
            Технологии
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{subtitle}</p>
        </Reveal>

        <div className="grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Reveal
              key={category.id}
              className="apsod-surface-hover bg-white dark:bg-gray-950 p-6 md:p-7"
            >
              <h3 className="font-display text-sm font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
