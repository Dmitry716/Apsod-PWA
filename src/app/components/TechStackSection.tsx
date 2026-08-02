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
      className="apsod-tech-tile group relative flex items-center gap-3 bg-white dark:bg-gray-950 px-4 py-3.5"
      style={{ ['--tech-accent' as string]: item.accent }}
    >
      <span className="apsod-tech-tile__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200">
        <TechBrandIcon id={item.icon} className="h-5 w-5" title={item.name} />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-sm font-semibold tracking-tight text-slate-900 dark:text-white truncate">
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

        <div className="space-y-8 md:space-y-10">
          {categories.map((category) => (
            <Reveal key={category.id}>
              <div className="flex items-end justify-between gap-4 mb-3">
                <h3 className="font-display text-sm md:text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  {category.title}
                </h3>
                <span className="text-[11px] tracking-[0.14em] uppercase text-slate-400">
                  {String(category.items.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="apsod-tech-grid grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
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
      className={`apsod-tech-grid apsod-tech-grid--chips grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 ${className}`}
    >
      {items.map((item) => (
        <TechTile key={item.id} item={item} />
      ))}
    </ul>
  )
}
