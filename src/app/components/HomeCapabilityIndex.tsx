import Link from 'next/link'
import Reveal from './Reveal'

const CAPABILITIES = [
  { title: 'Корпоративные сайты', href: '/services/web-development' },
  { title: 'Интернет-магазины', href: '/services/web-development#packages' },
  { title: 'Мобильные приложения', href: '/services/mobile-development' },
  { title: 'PWA и кабинеты', href: '/services/pwa-development' },
  { title: 'SEO и GEO', href: '/services/seo' },
  { title: 'Сопровождение', href: '/services/technical-support' },
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
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <Reveal className="mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Возможности
          </h2>
        </Reveal>

        <Reveal>
          <ul className="border-t border-slate-200 dark:border-slate-800 mb-16 md:mb-20">
            {CAPABILITIES.map((item) => (
              <li key={item.href + item.title}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-6 py-5 md:py-6 border-b border-slate-200 dark:border-slate-800"
                >
                  <span className="font-display text-xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {item.title}
                  </span>
                  <span
                    className="text-slate-300 dark:text-slate-600 text-lg md:text-xl transition-all duration-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1"
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
            <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Как мы работаем
            </h3>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Начать проект
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-white dark:bg-gray-950 p-5 md:p-6 min-h-[120px] flex flex-col justify-between"
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-slate-400">{item.step}</p>
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
