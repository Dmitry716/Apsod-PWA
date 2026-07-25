import Link from 'next/link'
import Reveal from './Reveal'

const PILLARS = [
  {
    step: '01',
    title: 'Сайт',
    body: 'Лендинг, корпоративный или магазин на уникальном коде — канал заявок 24/7.',
    href: '/services/web-development',
    accent: 'from-blue-500 to-cyan-400',
    icon: '🌐',
  },
  {
    step: '02',
    title: 'Приложение',
    body: 'iOS / Android или PWA: продукт в кармане клиента, когда сайту мало.',
    href: '/services/mobile-development',
    accent: 'from-indigo-500 to-violet-400',
    icon: '📱',
  },
  {
    step: '03',
    title: 'Продвижение',
    body: 'SEO в Яндексе и Google + GEO в нейросетях — трафик и видимость бренда.',
    href: '/services/seo',
    accent: 'from-emerald-500 to-teal-400',
    icon: '📈',
  },
] as const

/** Воронка привлечения: продукт → рост → заявки */
export default function HomeGrowthFunnel() {
  return (
    <section className="py-16 md:py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="apsod-mesh" aria-hidden>
        <div className="apsod-mesh-blob w-[400px] h-[400px] bg-blue-600/20 top-[-100px] left-[-60px]" />
        <div
          className="apsod-mesh-blob w-[320px] h-[320px] bg-emerald-500/15 bottom-[-80px] right-[-40px]"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-3">
            Как мы привлекаем клиентов для бизнеса
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Сайт · приложение · продвижение → заявки
          </h2>
          <p className="text-slate-300 text-lg">
            Три направления APSOD. Можно заказать одно или связать в воронку роста.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto mb-10">
          {PILLARS.map((item, i) => (
            <Reveal key={item.href} stagger={(Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)}>
              <Link
                href={item.href}
                className="apsod-card-lift group relative flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.09] backdrop-blur-sm"
              >
                <div className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${item.accent}`} />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-400">{item.step}</span>
                  <span className="text-2xl" aria-hidden>
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed flex-1">{item.body}</p>
                <span className="mt-4 text-sm font-medium text-blue-300 group-hover:underline">
                  Подробнее →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Визуальная воронка */}
        <Reveal className="max-w-3xl mx-auto" stagger={3}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-center text-sm text-slate-400 mb-6">Воронка роста заявок</p>
            <div className="flex flex-col items-center gap-2">
              {[
                { label: 'Продукт: сайт или приложение', w: 'w-full max-w-xl' },
                { label: 'Продвижение: SEO + GEO', w: 'w-[85%] max-w-md' },
                { label: 'Заявки, звонки, продажи', w: 'w-[70%] max-w-sm' },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`${row.w} rounded-lg bg-gradient-to-r from-blue-600/80 to-cyan-500/70 px-4 py-3 text-center text-sm md:text-base font-medium shadow-lg shadow-blue-900/30`}
                >
                  {row.label}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?goal=corporate"
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 rounded-lg text-sm font-semibold"
              >
                Нужен сайт
              </Link>
              <Link
                href="/contact?goal=mobile"
                className="px-5 py-2.5 border border-white/25 hover:border-white/50 rounded-lg text-sm font-medium"
              >
                Нужно приложение
              </Link>
              <Link
                href="/contact?goal=seo"
                className="px-5 py-2.5 border border-white/25 hover:border-white/50 rounded-lg text-sm font-medium"
              >
                Нужно продвижение
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
