import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../../components/Reveal'
import SectionAtmosphere from '../../components/SectionAtmosphere'
import VisualMarquee from '../../components/VisualMarquee'
import ServiceSemanticBlocks from '../../components/ServiceSemanticBlocks'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import DevelopmentProcessSection from '../components/DevelopmentProcessSection'
import { WEB_DEVELOPMENT_PROCESS } from '../lib/development-process'
import { buildServiceMetadata, SITE_URL } from '../../lib/seo'
import { DUAL_CURRENCY_NOTE, formatDualPrice } from '../../lib/currency'
import {
  WEB_DEV_CASES,
  WEB_DEV_FEATURED_PACKAGES,
  WEB_DEV_SITE_TYPES,
} from '../../lib/web-dev-packages'

export const metadata = buildServiceMetadata('web-development')

const OUTCOMES = [
  {
    title: 'Канал заявок',
    body: 'Структура, CTA и аналитика под коммерческие цели бизнеса.',
  },
  {
    title: 'Собственный код',
    body: 'Next.js / React: контроль над скоростью, SEO и развитием продукта.',
  },
  {
    title: 'Готовность к росту',
    body: 'Базовая SEO-разметка, интеграции с CRM и оплатой, сопровождение после запуска.',
  },
]

const FOR_WHOM = [
  'Нужен сайт как канал заявок',
  'Важны скорость, безопасность и контроль над кодом',
  'Планируете SEO / GEO и интеграции с CRM или оплатой',
  'Готовы к индивидуальному дизайну и осознанным срокам',
]

const NOT_FOR = [
  'Нужен типовой шаблон за короткий срок',
  'Достаточно готовой темы без инженерной доработки',
]

const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'Vercel / Docker',
]

export default function WebDevelopmentPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Разработка сайтов',
    description:
      'Разработка сайтов, интернет-магазинов и веб-приложений на Next.js, React, Node.js.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: [{ '@type': 'City', name: 'Minsk' }],
    url: `${SITE_URL}/services/web-development`,
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ServiceBreadcrumbs service="web-development" />
      <SeoJsonLd data={serviceSchema} />

      <section className="relative min-h-[min(92vh,900px)] flex items-end overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/devices/showcase-macbook.png"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-55 apsod-ken-burns"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/55 to-transparent" />
        </div>
        <SectionAtmosphere tone="dark" />

        <div className="container mx-auto px-4 relative z-10 pb-16 md:pb-24 pt-28">
          <div className="max-w-2xl">
            <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-xs font-medium tracking-[0.18em] uppercase text-slate-300 mb-4">
              APSOD · собственный код
            </p>
            <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-5">
              Разработка сайтов
            </h1>
            <div className="apsod-hero-line mb-6 bg-slate-400" />
            <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
              Лендинг, корпоративный сайт или магазин на Next.js — под заявки, SEO и дальнейший
              рост. Ориентир {formatDualPrice(8000)} после короткого брифа.
            </p>
            <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
              <Link
                href="/contact?goal=corporate"
                className="apsod-btn-solid apsod-cta-primary px-7 py-3.5 rounded-md font-semibold text-sm"
              >
                <span>Запросить консультацию</span>
              </Link>
              <Link
                href="#packages"
                className="px-7 py-3.5 border border-white/30 rounded-md font-medium text-sm text-white hover:border-white transition-colors"
              >
                Смотреть пакеты
              </Link>
            </div>
          </div>
        </div>
      </section>

      <VisualMarquee title="Так выглядят наши сайты" />

      <section className="relative py-16 md:py-20 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        <SectionAtmosphere tone="light" grid={false} />
        <div className="container mx-auto px-4 relative z-10">
          <Reveal className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Что разрабатываем
            </h2>
            <div className="apsod-line-draw mb-4 bg-slate-400 dark:bg-slate-500" />
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              От посадочной под рекламу до интернет-магазина полного цикла — один инженерный контур.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {WEB_DEV_SITE_TYPES.map((type, i) => (
              <Reveal key={type.id} stagger={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}>
                <p className="text-xs font-medium tracking-[0.14em] uppercase text-blue-600/80 dark:text-blue-400 mb-2">
                  0{i + 1}
                </p>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {type.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-slate-50 dark:bg-gray-900/40 overflow-hidden">
        <SectionAtmosphere tone="slate" />
        <div className="container mx-auto px-4 relative z-10">
          <Reveal className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Зачем заказывать у APSOD
            </h2>
            <div className="apsod-line-draw mb-4 bg-slate-400 dark:bg-slate-500" />
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              Сайт как продукт: исследование, инженерия и готовность к продвижению — в одной
              ответственности.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl">
            {OUTCOMES.map((item, i) => (
              <Reveal key={item.title} stagger={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <div className="h-full rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-gray-950/70 backdrop-blur-sm p-6 md:p-7">
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Кому подходит
            </h2>
            <div className="apsod-line-draw mb-4 bg-slate-400 dark:bg-slate-500" />
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Честно про формат работы — чтобы не тратить время на несовпадение ожиданий.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <h3 className="text-sm font-medium tracking-[0.14em] uppercase text-slate-500 mb-4">
                Да
              </h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                {FOR_WHOM.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="text-slate-900 dark:text-white shrink-0 font-medium" aria-hidden>
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal stagger={2}>
              <h3 className="text-sm font-medium tracking-[0.14em] uppercase text-slate-500 mb-4">
                Нет
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                {NOT_FOR.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="shrink-0" aria-hidden>
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="relative py-16 md:py-20 bg-slate-50 dark:bg-gray-900/40 scroll-mt-28 border-y border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <SectionAtmosphere tone="slate" grid={false} />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <Reveal className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Пакеты и что входит
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ориентиры стоимости. Точная смета — после брифа. {DUAL_CURRENCY_NOTE}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-8 apsod-glow-ring">
            {WEB_DEV_FEATURED_PACKAGES.map((pkg) => (
              <div
                key={pkg.title}
                className={`flex flex-col p-6 md:p-8 bg-white dark:bg-gray-950 ${
                  pkg.highlight ? 'ring-1 ring-inset ring-slate-900/10 dark:ring-white/10' : ''
                }`}
              >
                {pkg.highlight && (
                  <p className="text-xs font-medium tracking-[0.14em] uppercase text-slate-500 mb-3">
                    Частый выбор
                  </p>
                )}
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {pkg.title}
                </h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{pkg.byn}</p>
                <p className="text-sm text-slate-500 mb-1">{pkg.rub}</p>
                <p className="text-sm text-slate-500 mb-5">Срок: {pkg.term}</p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-slate-400 shrink-0" aria-hidden>
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
                  className="apsod-btn-solid apsod-cta-primary inline-block w-full text-center px-4 py-2.5 rounded-md text-sm font-medium"
                >
                  <span>Получить смету</span>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500">
            Нужен сложный продукт или кабинет?{' '}
            <Link
              href="/contact?goal=complex"
              className="text-slate-900 dark:text-white underline-offset-4 hover:underline"
            >
              Обсудим индивидуально
            </Link>
            {' · '}
            <Link
              href="/pricing"
              className="text-slate-900 dark:text-white underline-offset-4 hover:underline"
            >
              Все цены
            </Link>
          </p>
        </div>
      </section>

      <ServiceSemanticBlocks service="web-development" />

      <DevelopmentProcessSection
        title="Как мы разрабатываем"
        subtitle="От исследования до запуска и поддержки — прозрачные этапы и артефакты"
        phases={WEB_DEVELOPMENT_PROCESS.slice(0, 5)}
      />

      <section className="relative py-16 md:py-20 bg-white dark:bg-gray-950 overflow-hidden">
        <SectionAtmosphere tone="light" grid={false} />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Примеры работ
            </h2>
            <div className="apsod-line-draw mb-4 bg-slate-400 dark:bg-slate-500" />
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Сайты и PWA, которые ведут к заявке — не к «красивой картинке».
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {WEB_DEV_CASES.slice(0, 3).map((c, i) => (
              <Reveal key={c.href} stagger={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <Link href={c.href} className="apsod-media-frame group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900 mb-4 apsod-glow-ring">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover apsod-media-zoom"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:underline underline-offset-4">
                    {c.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {c.result}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/portfolio"
              className="apsod-btn-solid apsod-cta-primary inline-flex px-5 py-2.5 rounded-md font-medium text-sm"
            >
              <span>Смотреть портфолио</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative py-14 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
        <SectionAtmosphere tone="slate" grid />
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <Reveal className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Стек
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Современный продуктовый стек — скорость, SEO из коробки и контроль над кодом.
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base tracking-wide">
              {STACK.join(' · ')}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-slate-950 text-white overflow-hidden">
        <SectionAtmosphere tone="dark" />
        <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 tracking-tight">
              Готовы обсудить сайт?
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Короткий бриф — смета за 1 рабочий день. Можно сразу в Telegram.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="apsod-btn-solid apsod-cta-primary px-6 py-3 rounded-md font-semibold text-sm"
              >
                <span>Оставить заявку</span>
              </Link>
              <a
                href="https://t.me/Apsod_IT"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/25 rounded-md font-medium text-sm hover:border-white transition-colors"
              >
                Telegram
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceFaqBlock service="web-development" />
    </div>
  )
}
