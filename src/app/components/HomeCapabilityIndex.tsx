import Link from 'next/link'
import Reveal from './Reveal'

const CAPABILITIES = [
  { title: 'Разработка сайтов', href: '/services/web-development' },
  { title: 'Лендинги', href: '/services/landing-page' },
  { title: 'Корпоративные сайты', href: '/services/corporate-sites' },
  { title: 'Интернет-магазины', href: '/services/ecommerce' },
  { title: 'Мобильные приложения', href: '/services/mobile-development' },
  { title: 'SEO и GEO', href: '/services/seo' },
] as const

const STEPS = [
  { step: '01', title: 'Исследование' },
  { step: '02', title: 'Архитектура' },
  { step: '03', title: 'Разработка' },
  { step: '04', title: 'Запуск' },
  { step: '05', title: 'Рост' },
] as const

/** Capabilities + process in one dense block — no empty heading voids */
export default function HomeCapabilityIndex() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[var(--bg-primary)] border-t border-slate-200 dark:border-[var(--border-color)]">
      <div className="container mx-auto px-4">
        <Reveal className="mb-10 md:mb-12">
          <p className="apsod-section-marker mb-3">04 · Capabilities</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em]">
            Возможности
          </h2>
        </Reveal>

        <Reveal>
          <ul className="border-t border-slate-200 dark:border-[var(--border-color)] mb-16 md:mb-20">
            {CAPABILITIES.map((item) => (
              <li key={item.href + item.title}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-6 py-5 md:py-6 border-b border-slate-200 dark:border-[var(--border-color)]"
                >
                  <span className="font-display text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 group-hover:text-sky-700 dark:group-hover:text-sky-300">
                    {item.title}
                  </span>
                  <span
                    className="text-slate-300 dark:text-slate-600 text-lg md:text-xl transition-all duration-500 group-hover:text-sky-600 dark:group-hover:text-sky-300 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="apsod-section-marker mb-2">05 · Process</p>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em]">
                Как мы работаем
              </h3>
            </div>
            <Link
              href="/contact"
              className="apsod-link-nudge text-[12px] font-semibold tracking-[0.12em] uppercase text-slate-500 hover:text-sky-600 dark:hover:text-sky-300"
            >
              Начать проект
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-slate-200 dark:bg-[var(--border-color)] border border-slate-200 dark:border-[var(--border-color)]">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="apsod-surface-hover bg-white dark:bg-[var(--bg-secondary)] p-5 md:p-6 min-h-[120px] flex flex-col justify-between"
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-sky-600/80 dark:text-sky-400/80">
                  {item.step}
                </p>
                <h4 className="font-display text-base md:text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
