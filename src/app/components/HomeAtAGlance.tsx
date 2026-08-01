'use client'

import Reveal from './Reveal'
import SectionAtmosphere from './SectionAtmosphere'
import { useLocale } from '../lib/useLocale'

const PILLARS_RU = [
  { title: 'Инженерия', label: 'Архитектура, код-ревью, тесты и современный стек' },
  { title: 'Поставка', label: 'Прозрачные этапы от исследования до релиза' },
  { title: 'Безопасность', label: 'Доступ, интеграции, бэкапы и устойчивость' },
  { title: 'Сопровождение', label: 'Метрики, поддержка и развитие продукта' },
] as const

const PILLARS_EN = [
  { title: 'Engineering', label: 'Architecture, code review, QA and modern stack' },
  { title: 'Delivery', label: 'Clear stages from discovery to release' },
  { title: 'Security', label: 'Access, integrations, backups and resilience' },
  { title: 'Support', label: 'Metrics, maintenance and product evolution' },
] as const

export default function HomeAtAGlance() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const pillars = isEn ? PILLARS_EN : PILLARS_RU

  return (
    <section
      className="relative border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950 overflow-hidden"
      aria-label={isEn ? 'APSOD capabilities' : 'Возможности APSOD'}
    >
      <SectionAtmosphere tone="light" grid={false} />
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <Reveal>
          <p className="text-center text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-3">
            {isEn ? 'Capabilities' : 'Возможности'}
          </p>
          <div className="mx-auto apsod-line-draw mb-10 bg-slate-300 dark:bg-slate-600" />
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {pillars.map((item, i) => (
            <Reveal key={item.title} stagger={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}>
              <div className="text-center lg:text-left lg:pl-6 lg:border-l lg:border-slate-200 dark:lg:border-slate-700 first:lg:border-l-0 first:lg:pl-0 group">
                <div className="font-display text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  {item.title}
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-snug">
                  {item.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
