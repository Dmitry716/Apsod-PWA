'use client'

import LocaleLink from './LocaleLink'
import { useLocale } from '../lib/useLocale'

const CLIENTS = [
  'Legal Team',
  'Amba Detail',
  'NEXTON',
  'ArtDetailing',
  'BMservice',
  'Динамо-Витебск',
  'Maxximum',
  'Sparkite',
] as const

const STATS = [
  {
    value: '22',
    labelRu: 'направления права в одном канале',
    labelEn: 'practice areas in one digital channel',
    bodyRu:
      'Legal Team: структура услуг, формы, чат и PWA — премиальный канал заявок и SEO в Москве.',
    bodyEn:
      'Legal Team: service structure, forms, chat and PWA — a premium lead and SEO channel in Moscow.',
    href: '/portfolio/legal-team',
  },
  {
    value: 'PWA',
    labelRu: 'продукты без магазинов приложений',
    labelEn: 'products without app stores',
    bodyRu:
      'NEXTON и ArtDetailing: установка с сайта, app-like интерфейс, быстрый контакт с телефона.',
    bodyEn:
      'NEXTON and ArtDetailing: install from the web, app-like UI, fast mobile contact.',
    href: '/portfolio/nexton',
  },
] as const

/** Itransition-style clients / outcomes band under home services */
export default function HomeClientsBand() {
  const { locale } = useLocale()
  const isEn = locale === 'en'

  return (
    <section
      className="relative overflow-hidden border-b border-slate-800"
      aria-labelledby="home-clients-title"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(105deg,#0f172a_0%,#0c4a6e_48%,#082f49_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 15% 50%, rgba(14,165,233,0.22), transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative container mx-auto px-4 py-14 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Logo / wordmark grid */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 md:gap-y-12">
              {CLIENTS.map((name) => (
                <li
                  key={name}
                  className="flex min-h-[2.5rem] items-center justify-center sm:min-h-[3rem] sm:justify-start"
                >
                  <span className="font-display text-center text-[13px] font-semibold tracking-[0.06em] text-sky-100/55 transition-colors hover:text-sky-50/90 sm:text-left sm:text-sm md:text-[15px]">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Headline + stats */}
          <div className="lg:col-span-6 xl:col-span-5">
            <h2
              id="home-clients-title"
              className="font-display mb-10 text-[clamp(1.75rem,3.5vw,2.65rem)] font-bold leading-[1.15] tracking-tight text-slate-200"
            >
              {isEn ? (
                <>
                  Clients across
                  <br />
                  BY · RU · EU · US
                </>
              ) : (
                <>
                  Клиенты в Беларуси,
                  <br />
                  РФ, ЕС и США
                </>
              )}
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
              {STATS.map((stat) => (
                <div key={stat.value} className="min-w-0">
                  <p className="font-display mb-1 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mb-3 text-sm font-medium leading-snug text-slate-100/90">
                    {isEn ? stat.labelEn : stat.labelRu}
                  </p>
                  <p className="mb-4 text-[13px] leading-relaxed text-slate-300/85">
                    {isEn ? stat.bodyEn : stat.bodyRu}
                  </p>
                  <LocaleLink
                    href={stat.href}
                    className="inline-flex text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200"
                  >
                    {isEn ? 'View case →' : 'Смотреть кейс →'}
                  </LocaleLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
