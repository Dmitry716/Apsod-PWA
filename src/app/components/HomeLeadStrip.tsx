import Link from 'next/link'
import Reveal from './Reveal'

const PATHS = [
  {
    href: '/contact?goal=corporate',
    title: 'Разработка сайта',
    desc: 'Лендинг · корпоративный · магазин',
  },
  {
    href: '/contact?goal=mobile',
    title: 'Мобильное приложение',
    desc: 'iOS · Android · PWA',
  },
  {
    href: '/contact?goal=seo',
    title: 'Продвижение',
    desc: 'SEO · GEO · рост заявок',
  },
] as const

/** Следующий шаг — спокойный enterprise-блок */
export default function HomeLeadStrip() {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-950 border-y border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <Reveal className="max-w-2xl mb-10">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-3">
            Следующий шаг
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            С чего начнём
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Краткий бриф — коммерческое предложение с этапами, сроками и зоной ответственности.
          </p>
        </Reveal>

        <Reveal className="grid sm:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-8" stagger={2}>
          {PATHS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white dark:bg-gray-950 px-6 py-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <div className="font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                {item.title}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{item.desc}</div>
            </Link>
          ))}
        </Reveal>

        <Reveal className="flex flex-wrap gap-3" stagger={3}>
          <Link
            href="/contact"
            className="apsod-btn-solid inline-flex px-6 py-3 rounded-md text-sm font-semibold transition-colors"
          >
            Связаться с нами
          </Link>
          <Link
            href="/pricing"
            className="inline-flex px-6 py-3 border border-slate-300 dark:border-slate-600 hover:border-slate-900 dark:hover:border-white rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 transition-colors"
          >
            Пакеты и условия
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
