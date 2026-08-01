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

/** Capability index — typography as interface, no essays */
export default function HomeCapabilityIndex() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <Reveal className="mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Возможности
          </h2>
        </Reveal>

        <ul className="border-t border-slate-200 dark:border-slate-800">
          {CAPABILITIES.map((item, i) => (
            <li key={item.href + item.title}>
              <Reveal stagger={(Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-6 py-6 md:py-8 border-b border-slate-200 dark:border-slate-800"
                >
                  <span className="font-display text-2xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {item.title}
                  </span>
                  <span
                    className="text-slate-300 dark:text-slate-600 text-xl md:text-2xl transition-all duration-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
