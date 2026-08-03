import Reveal from './Reveal'
import TechBrandIcon from './TechBrandIcon'
import { TECH_STACK_CATEGORIES, type TechItem, type TechStackCategory } from '../lib/tech-stack'

type Props = {
  title?: string
  subtitle?: string
  categories?: TechStackCategory[]
  className?: string
}

function TechTile({ item }: { item: TechItem }) {
  return (
    <li
      className="apsod-tech-tile group relative flex items-center gap-2.5 sm:gap-3 bg-white dark:bg-gray-950 px-3 py-2.5 sm:px-4 sm:py-3.5"
      style={{ ['--tech-accent' as string]: item.accent }}
    >
      <span className="apsod-tech-tile__icon flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md">
        <TechBrandIcon id={item.icon} className="h-4 w-4 sm:h-5 sm:w-5" title={item.name} />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-xs sm:text-sm font-semibold tracking-tight text-slate-900 dark:text-white truncate">
          {item.name}
        </span>
      </span>
    </li>
  )
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

        <div className="space-y-6 md:space-y-10">
          {categories.map((category) => (
            <Reveal key={category.id}>
              <div className="flex items-end justify-between gap-4 mb-2 md:mb-3">
                <h3 className="font-display text-sm md:text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  {category.title}
                </h3>
                <span className="text-[11px] tracking-[0.14em] uppercase text-slate-400">
                  {String(category.items.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="apsod-tech-grid flex flex-wrap gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                {category.items.map((item) => (
                  <TechTile key={item.id} item={item} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

type ChipsProps = {
  items: readonly TechItem[]
  className?: string
}

/** Compact icon chips for service landings. */
export function TechStackChips({ items, className = '' }: ChipsProps) {
  return (
    <ul
      className={`apsod-tech-grid apsod-tech-grid--chips flex flex-wrap gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 ${className}`}
    >
      {items.map((item) => (
        <TechTile key={item.id} item={item} />
      ))}
    </ul>
  )
}
