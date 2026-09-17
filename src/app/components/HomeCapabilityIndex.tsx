import Link from 'next/link'
import Reveal from './Reveal'

const CAPABILITIES = [
  { title: 'Разработка сайтов', href: '/services/web-development', cmd: 'web' },
  { title: 'Лендинги', href: '/services/landing-page', cmd: 'landing' },
  { title: 'Корпоративные сайты', href: '/services/corporate-sites', cmd: 'corp' },
  { title: 'Интернет-магазины', href: '/services/ecommerce', cmd: 'shop' },
  { title: 'Мобильные приложения', href: '/services/mobile-development', cmd: 'mobile' },
  { title: 'SEO и GEO', href: '/services/seo', cmd: 'seo' },
] as const

const STEPS = [
  { step: '01', title: 'Исследование' },
  { step: '02', title: 'Архитектура' },
  { step: '03', title: 'Разработка' },
  { step: '04', title: 'Запуск' },
  { step: '05', title: 'Рост' },
] as const

/** Capabilities + process as lab index modules */
export default function HomeCapabilityIndex() {
  return (
    <section className="border-b border-slate-200 dark:border-[var(--border-color)] bg-white dark:bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 py-8 md:py-10 space-y-6">
        <Reveal>
          <div className="apsod-lab-panel overflow-hidden">
            <div className="apsod-lab-panel__head">
              <span className="apsod-lab-panel__title">Index / Capabilities</span>
              <Link
                href="/services"
                className="apsod-lab-panel__meta hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
              >
                All services →
              </Link>
            </div>

            <ul>
              {CAPABILITIES.map((item, i) => (
                <li key={item.href + item.title}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 md:gap-6 px-4 md:px-5 py-4 border-b border-slate-200 dark:border-[var(--border-color)] last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <span className="apsod-lab-mono text-[11px] text-slate-400 w-8 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="apsod-lab-mono text-[11px] text-sky-600/80 dark:text-sky-400/80 w-16 shrink-0 hidden sm:block">
                      /{item.cmd}
                    </span>
                    <span className="font-display text-lg md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] flex-1 min-w-0 group-hover:translate-x-1 transition-transform duration-400">
                      {item.title}
                    </span>
                    <span
                      className="text-slate-300 dark:text-slate-600 group-hover:text-sky-500 transition-colors"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="apsod-lab-panel overflow-hidden">
            <div className="apsod-lab-panel__head">
              <span className="apsod-lab-panel__title">Process / Pipeline</span>
              <Link
                href="/contact"
                className="apsod-lab-panel__meta hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
              >
                Start →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-slate-200 dark:bg-[var(--border-color)]">
              {STEPS.map((item) => (
                <div
                  key={item.step}
                  className="apsod-surface-hover bg-white dark:bg-[var(--bg-card)] p-4 md:p-5 min-h-[100px] flex flex-col justify-between"
                >
                  <p className="apsod-lab-mono text-[11px] text-sky-600/80 dark:text-sky-400/80">
                    {item.step}
                  </p>
                  <h4 className="font-display text-sm md:text-base font-semibold text-slate-900 dark:text-white tracking-tight">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
