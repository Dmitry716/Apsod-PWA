import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../../components/Reveal'
import SectionAtmosphere from '../../components/SectionAtmosphere'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { DUAL_CURRENCY_NOTE, formatDualPrice } from '../../lib/currency'
import {
  CLIENT_PROOF,
  TEAM_PROOF,
  WEB_BUILD_TIMELINE,
  WHY_APSOD_WEB,
} from '../../lib/client-proof'
import { COMPANY_ADDRESS_DISPLAY, COMPANY_AREA_SERVED, SITE_URL } from '../../lib/seo'
import {
  WEB_DEV_CASES,
  WEB_DEV_FEATURED_PACKAGES,
  WEB_DEV_SITE_TYPES,
} from '../../lib/web-dev-packages'
import { WEB_STACK } from '../../lib/tech-stack'
import { WEB_DEVELOPMENT_PROCESS } from '../lib/development-process'
import DevelopmentProcessSection from './DevelopmentProcessSection'
import { TechStackChips } from '../../components/TechStackSection'

const OUTCOMES = [
  {
    title: 'Канал заявок',
    body: 'Структура, CTA и аналитика под коммерческие цели — сайт как инструмент продаж, а не визитка.',
  },
  {
    title: 'Собственный код',
    body: 'Next.js, Angular, Vue, Svelte или ASP.NET Core — стек под задачу, скорость, SEO и контроль без конструкторов.',
  },
  {
    title: 'SEO с первого дня',
    body: 'Семантика в структуре, разметка, Core Web Vitals и готовность к продвижению в Яндексе и Google.',
  },
  {
    title: 'Сопровождение',
    body: 'Запуск, обучение и поддержка после релиза — интеграции с CRM, оплатой и рекламой.',
  },
] as const

const TRUST = [
  'Минск',
  'Собственный код',
  'SEO-ready',
  'Сроки 2–8 недель',
] as const

const LOCAL_BLOCKS = [
  {
    h2: 'Создание сайта в Минске под заявки',
    body: 'Лендинг, корпоративный сайт, каталог или магазин — с коммерческой структурой, аналитикой и понятным путём к контакту. Смета и договор до старта работ.',
  },
  {
    h2: 'Сайт под ключ на собственном коде',
    body: 'Проектируем и собираем продукт без конструкторов: контроль над дизайном, CRM, оплатой и Core Web Vitals. Хостинг выбираете вы.',
  },
  {
    h2: 'SEO-база уже в разработке',
    body: 'Семантика, разметка и скорость закладываем с первого дня. Дальше — продвижение в Яндексе и Google или пакет «сайт + SEO».',
  },
] as const

const FEATURED_CASES = WEB_DEV_CASES.filter((c) =>
  ['Amba Detail', 'NEXTON', 'ArtDetailing'].includes(c.title)
)

export default function WebDevelopmentLanding() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Разработка сайтов',
    description:
      'Разработка сайтов в Минске: лендинг, корпоративный сайт, каталог и интернет-магазин на Next.js, Angular, Vue, Svelte и ASP.NET Core.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: COMPANY_AREA_SERVED,
    url: `${SITE_URL}/services/web-development`,
    offers: WEB_DEV_FEATURED_PACKAGES.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.title,
      priceCurrency: 'BYN',
      price: String(pkg.bynAmount),
      url: `${SITE_URL}/contact?goal=${pkg.goal}&budget=${pkg.budget}`,
    })),
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ServiceBreadcrumbs service="web-development" />
      <SeoJsonLd data={serviceSchema} />

      {/* Hero — full-bleed composition */}
      <section className="relative min-h-[min(72svh,640px)] flex items-end overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/portfolio/amba.png"
            alt=""
            fill
            priority
            className="object-cover object-center scale-105 opacity-45 apsod-ken-burns"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-16 pt-20 md:pt-24">
          <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-[11px] font-medium tracking-[0.22em] uppercase text-slate-400 mb-5">
            Веб-разработка
          </p>
          <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-5 max-w-2xl">
            Разработка сайтов в Минске
          </h1>
          <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-base md:text-lg text-slate-300 leading-relaxed mb-4 max-w-lg">
            Создание сайта под ключ для бизнеса в Минске: лендинг, корпоративный сайт или каталог на
            собственном коде — с SEO-базой и запуском как продукта.
          </p>
          <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-sm text-slate-400 mb-8 max-w-lg">
            Ориентир: лендинг — {formatDualPrice(8000)}, корпоративный — {formatDualPrice(15000)}. Смета
            после брифа.
          </p>
          <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
            <Link
              href="/contact?goal=corporate&budget=corporate-15k"
              className="apsod-btn-solid apsod-cta-primary px-7 py-3.5 rounded-md text-sm font-semibold"
            >
              <span>Заказать сайт</span>
            </Link>
            <Link
              href="/pricing"
              className="px-7 py-3.5 rounded-md text-sm font-semibold border border-white/30 text-white hover:border-white transition-colors"
            >
              Стоимость
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-5 md:py-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
            {TRUST.map((item, i) => (
              <li key={item} className="inline-flex items-center gap-6">
                {i > 0 ? (
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Local commercial copy — без отдельного гео-URL */}
      <section className="py-14 md:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Веб-студия в Минске для бизнеса
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              APSOD — разработка и создание сайтов в Минске: от брифа до запуска. Офис: ул. Куйбышева,
              35. Работаем онлайн и на встречах.
            </p>
          </Reveal>
          <div className="grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 md:grid-cols-3">
            {LOCAL_BLOCKS.map((block) => (
              <Reveal
                key={block.h2}
                className="apsod-surface-hover bg-white dark:bg-gray-950 p-6 md:p-8"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {block.h2}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{block.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/pricing" className="apsod-link-nudge font-medium text-slate-900 dark:text-white">
              Стоимость сайта
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/services/seo"
              className="apsod-link-nudge font-medium text-slate-900 dark:text-white"
            >
              SEO продвижение
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="apsod-link-nudge font-medium text-slate-900 dark:text-white"
            >
              Контакты
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 md:mb-10 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Что получите
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Не шаблонный сайт — рабочий digital-канал под заявки, поиск и рост.
            </p>
          </Reveal>
          <div className="grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 md:grid-cols-2">
            {OUTCOMES.map((item) => (
              <Reveal
                key={item.title}
                className="apsod-surface-hover bg-white dark:bg-gray-950 p-6 md:p-8 min-h-[120px]"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Site types */}
      <section className="py-14 md:py-20 bg-slate-50 dark:bg-gray-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 md:mb-10 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Какой сайт нужен
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Подберём формат под задачу — от посадочной под рекламу до витрины продаж.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            {WEB_DEV_SITE_TYPES.map((type, index) => (
              <Reveal
                key={type.id}
                stagger={(Math.min(index + 1, 4) as 1 | 2 | 3 | 4)}
                className="apsod-surface-hover group bg-white dark:bg-gray-950 p-6 md:p-7"
              >
                <p className="text-[11px] tracking-[0.18em] uppercase text-slate-400 mb-3">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white tracking-tight mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {type.body}
                </p>
                <Link
                  href={type.href}
                  className="apsod-link-nudge text-sm font-medium text-slate-900 dark:text-white"
                >
                  Подробнее
                  <span aria-hidden>→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-14 md:py-20 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <Reveal className="mb-4 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Стоимость и ориентиры
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Стоимость разработки сайта в Минске зависит от объёма. Точная смета — после короткого
              брифа.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{DUAL_CURRENCY_NOTE}</p>
          </Reveal>

          <div className="mt-8 grid md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 overflow-hidden">
            {WEB_DEV_FEATURED_PACKAGES.map((pkg) => (
              <Reveal
                key={pkg.id}
                className={`apsod-price-card bg-white dark:bg-gray-950 p-7 flex flex-col h-full ${
                  pkg.highlight ? 'ring-1 ring-inset ring-slate-900 dark:ring-white' : ''
                }`}
              >
                {pkg.highlight ? (
                  <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400 mb-3">
                    Часто выбирают
                  </p>
                ) : (
                  <div className="h-5 mb-3" aria-hidden />
                )}
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {pkg.title}
                </h3>
                <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{pkg.byn}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{pkg.rub}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Срок: {pkg.term}</p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="h-px w-3 bg-slate-400 shrink-0 mt-2.5" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
                  className="apsod-btn-solid inline-flex justify-center w-full px-4 py-2.5 rounded-md text-sm font-semibold transition-colors"
                >
                  Получить смету
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <Link
              href="/pricing"
              className="apsod-link-nudge text-sm font-medium text-slate-900 dark:text-white"
            >
              Полная стоимость: сайты, SEO и приложения
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-slate-50 dark:bg-gray-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Сроки по этапам
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Понятный ритм от брифа до запуска — как у сильных студий Минска, без размытых «индивидуально».
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            {WEB_BUILD_TIMELINE.map((step) => (
              <Reveal
                key={step.title}
                className="apsod-surface-hover bg-white dark:bg-gray-950 p-6 min-h-[140px] flex flex-col justify-between"
              >
                <p className="text-[11px] tracking-[0.18em] uppercase text-slate-400 mb-3">
                  {step.weeks}
                </p>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section
        id="cases"
        className="py-14 md:py-20 bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
      >
        <div className="container mx-auto px-4 mb-8 md:mb-10">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Кейсы
            </h2>
            <Link
              href="/portfolio"
              className="apsod-link-nudge text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Все проекты
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        <div className="border-y border-slate-200 dark:border-slate-800">
          {FEATURED_CASES.map((item, index) => {
            const odd = index % 2 === 1
            return (
              <Reveal key={`${item.href}-${item.title}`}>
                <Link
                  href={item.href}
                  className="apsod-case-row group grid lg:grid-cols-12 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
                >
                  <div
                    className={`lg:col-span-8 relative min-h-[220px] md:min-h-[320px] lg:min-h-[380px] overflow-hidden bg-slate-100 dark:bg-slate-900 ${
                      odd ? 'lg:order-2' : ''
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain object-center p-3 md:p-5 transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                  <div
                    className={`lg:col-span-4 flex flex-col justify-end p-8 md:p-12 lg:p-14 bg-white dark:bg-gray-950 ${
                      odd ? 'lg:order-1' : ''
                    }`}
                  >
                    <p className="text-[11px] tracking-[0.22em] uppercase text-slate-400 mb-4">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-500">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {item.result}
                    </p>
                    <span className="apsod-link-nudge text-sm font-medium text-slate-900 dark:text-white">
                      Открыть
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <DevelopmentProcessSection
        title="Как создаём сайт"
        subtitle="От брифа до запуска — прозрачные этапы и артефакты."
        phases={WEB_DEVELOPMENT_PROCESS}
      />

      <section className="py-14 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Почему APSOD, а не конструктор или «агентство ради отчётов»
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {COMPANY_ADDRESS_DISPLAY}. Делаем продукт под заявки — с SEO-базой и развитием на вашем коде.
            </p>
          </Reveal>
          <div className="grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 md:grid-cols-2">
            {WHY_APSOD_WEB.map((item) => (
              <Reveal
                key={item.title}
                className="apsod-surface-hover bg-white dark:bg-gray-950 p-6 md:p-8"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-slate-50 dark:bg-gray-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Отзывы по проектам
            </h2>
          </Reveal>
          <div className="grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 md:grid-cols-3">
            {CLIENT_PROOF.map((item) => (
              <Reveal
                key={item.attribution}
                className="apsod-surface-hover bg-white dark:bg-gray-950 p-6 md:p-8"
              >
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  «{item.quote}»
                </p>
                <p className="font-display font-semibold text-slate-900 dark:text-white tracking-tight">
                  {item.attribution}
                </p>
                <p className="text-xs text-slate-500 mt-1">{item.niche}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="grid md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 overflow-hidden max-w-4xl">
            <div className="relative min-h-[220px] bg-slate-100 dark:bg-slate-900">
              <Image
                src={TEAM_PROOF.image}
                alt={TEAM_PROOF.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="bg-white dark:bg-gray-950 p-8 md:p-10 flex flex-col justify-end">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                {TEAM_PROOF.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {TEAM_PROOF.body}
              </p>
              <ul className="space-y-2">
                {TEAM_PROOF.people.map((person) => (
                  <li key={person.name} className="text-sm">
                    <span className="font-medium text-slate-900 dark:text-white">{person.name}</span>
                    <span className="text-slate-500"> — {person.role}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="apsod-link-nudge mt-6 text-sm font-medium text-slate-900 dark:text-white"
              >
                О компании
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stack */}
      <section className="py-14 md:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-4 max-w-2xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Стек
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Современные фреймворки 2026 года — выбираем под продукт, сроки и команду заказчика.
            </p>
          </Reveal>
          <Reveal>
            <TechStackChips items={WEB_STACK} />
          </Reveal>
        </div>
      </section>

      <ServiceFaqBlock service="web-development" />

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-slate-950 text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Нужна смета под ваш сайт?
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Расскажем сроки и ориентир стоимости после короткого брифа — обычно в течение рабочего дня.
            </p>
            <Link
              href="/contact?goal=corporate"
              className="apsod-btn-solid apsod-cta-primary inline-flex px-10 py-4 rounded-md text-sm font-semibold"
            >
              <span>Получить смету</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
