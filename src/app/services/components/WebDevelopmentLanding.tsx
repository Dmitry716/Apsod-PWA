import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../../components/Reveal'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { WEB_BUILD_TIMELINE } from '../../lib/client-proof'
import { COMPANY_AREA_SERVED, SITE_URL } from '../../lib/seo'
import {
  WEB_DEV_CASES,
  WEB_DEV_FEATURED_PACKAGES,
  WEB_DEV_SITE_TYPES,
} from '../../lib/web-dev-packages'
import { WEB_STACK } from '../../lib/tech-stack'
import { TechStackChips } from '../../components/TechStackSection'
import ServiceDetailsCarousel from './ServiceDetailsCarousel'

const PILL_LINKS = [
  { label: 'Лендинг', href: '/services/landing-page' },
  { label: 'Корпоративный сайт', href: '/services/corporate-sites' },
  { label: 'Интернет-магазин', href: '/services/ecommerce' },
  { label: 'PWA', href: '/services/pwa-development' },
] as const

const SLIDES = [
  { src: '/portfolio/gallery/nexton/01.jpg', alt: 'Кейс NEXTON — веб-продукт' },
  { src: '/portfolio/gallery/amba-detail/01.jpg', alt: 'Кейс Amba Detail' },
  { src: '/portfolio/gallery/artdetailing/01.jpg', alt: 'Кейс ArtDetailing' },
  { src: '/portfolio/gallery/maxximum/01.jpg', alt: 'Кейс Maxximum' },
] as const

const COLLAGE = [
  { src: '/portfolio/gallery/legal-team/01.jpg', alt: 'Legal Team', tall: true },
  { src: '/portfolio/gallery/bmservice/01.jpg', alt: 'BM Service', tall: false },
  { src: '/portfolio/gallery/dynamo-vitebsk/01.jpg', alt: 'Dynamo Vitebsk', tall: false },
  { src: '/devices/macbook.jpg', alt: 'Разработка на MacBook', center: true },
  { src: '/portfolio/gallery/nexton/03.jpg', alt: 'NEXTON UI', tall: false },
  { src: '/portfolio/gallery/amba-detail/03.jpg', alt: 'Amba Detail UI', tall: false },
] as const

const BENEFITS = [
  {
    title: 'Скорость и CWV',
    body: 'Оптимизированный код и современный стек — быстрая загрузка и стабильный UX на всех устройствах.',
  },
  {
    title: 'Надёжность',
    body: 'Безопасность, бэкапы и архитектура под рост: сайт не ломается на первом же пике трафика.',
  },
  {
    title: 'Адаптив',
    body: 'Корректная работа на десктопе, планшете и телефоне — без «обрезанных» макетов.',
  },
  {
    title: 'Конверсия',
    body: 'Структура, CTA и аналитика под заявки — сайт как канал продаж, а не визитка.',
  },
] as const

export default function WebDevelopmentLanding() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Разработка сайтов',
    description:
      'Разработка сайтов: лендинг, корпоративный сайт, каталог и интернет-магазин на Next.js, Angular, Vue, Svelte и ASP.NET Core.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: COMPANY_AREA_SERVED,
    url: `${SITE_URL}/services/web-development`,
    offers: WEB_DEV_FEATURED_PACKAGES.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.title,
      url: `${SITE_URL}/contact?goal=${pkg.goal}&budget=${pkg.budget}`,
    })),
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SeoJsonLd data={serviceSchema} />

      {/* Arigo Service Details — dark banner */}
      <section className="apsod-bleed-hero relative overflow-hidden text-white">
        <div className="apsod-arigo-hero-bg absolute inset-0" aria-hidden />
        <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute left-[8%] top-1/2 h-[min(42vw,420px)] w-[min(42vw,420px)] -translate-y-1/2 opacity-[0.14]"
          aria-hidden
        >
          <svg viewBox="0 0 200 200" className="h-full w-full text-white" fill="currentColor">
            <path d="M100 8 L112 78 L180 78 L126 118 L146 188 L100 148 L54 188 L74 118 L20 78 L88 78 Z" />
          </svg>
        </div>

        <div
          className="relative z-10 mx-auto max-w-5xl px-4 pb-16 text-center md:px-8 md:pb-24"
          style={{ paddingTop: 'calc(var(--apsod-header-h) + 4.5rem)' }}
        >
          <h1 className="font-display text-[clamp(2.5rem,9vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em]">
            Разработка сайтов
          </h1>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5 md:mt-10 md:gap-3">
            {PILL_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-full border border-white/25 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm transition-colors hover:border-white/55 hover:bg-white/10 md:px-5 md:py-2.5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Light body panel — overlaps hero like Arigo */}
      <section className="relative z-10 -mt-6 rounded-t-[1.75rem] bg-white pb-4 md:-mt-10 md:rounded-t-[2.5rem]">
        <div className="mx-auto max-w-[1370px] px-4 pt-6 md:px-8 md:pt-10">
          <Reveal>
            <ServiceDetailsCarousel slides={[...SLIDES]} />
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-[1100px] md:mt-16">
            <h2 className="font-display text-[clamp(1.75rem,4.2vw,3.75rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-slate-950">
              От разработки до постоянного развития
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Создаём сайт для бизнеса: лендинг, корпоративный сайт, каталог или магазин — от брифа
              до запуска, с SEO-базой и инженерией под рост.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Смета после короткого брифа — обычно за 1 рабочий день. Полный цикл: структура,
              дизайн, разработка, интеграции, запуск и поддержка.
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-14 max-w-[1100px] md:mt-20">
            <h2 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-slate-950">
              Обзор услуги
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Полный цикл веб-разработки под современные задачи бизнеса: кастомная разработка,
              front-end и back-end, адаптив и производительность. Собираем быстрые, безопасные и
              масштабируемые сайты с понятным UX на всех устройствах.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              От концепции до релиза — чистый код, удобство и поддержка на дистанции. Корпоративный
              сайт, портфолио или e-commerce: надёжный digital-канал, который помогает расти и
              получать заявки.
            </p>
          </Reveal>

          {/* Collage */}
          <div className="mx-auto mt-10 grid max-w-[1100px] gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
            <div className="flex flex-col gap-3 md:gap-4">
              <Reveal className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image src={COLLAGE[0].src} alt={COLLAGE[0].alt} fill className="object-cover" sizes="33vw" />
              </Reveal>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Reveal className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={COLLAGE[1].src} alt={COLLAGE[1].alt} fill className="object-cover" sizes="16vw" />
                </Reveal>
                <Reveal className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={COLLAGE[2].src} alt={COLLAGE[2].alt} fill className="object-cover" sizes="16vw" />
                </Reveal>
              </div>
            </div>

            <Reveal className="relative min-h-[280px] overflow-hidden rounded-2xl md:min-h-full">
              <Image src={COLLAGE[3].src} alt={COLLAGE[3].alt} fill className="object-cover" sizes="33vw" />
              <Link
                href="/contact?goal=corporate"
                className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--apsod-arigo-accent)] text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg transition hover:scale-105 md:h-24 md:w-24"
              >
                Brief
              </Link>
            </Reveal>

            <div className="flex flex-col gap-3 md:gap-4 md:pt-10">
              <Reveal className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                <Image src={COLLAGE[4].src} alt={COLLAGE[4].alt} fill className="object-cover" sizes="33vw" />
              </Reveal>
              <Reveal className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                <Image src={COLLAGE[5].src} alt={COLLAGE[5].alt} fill className="object-cover" sizes="33vw" />
              </Reveal>
            </div>
          </div>

          {/* Benefits */}
          <Reveal className="mx-auto mt-14 max-w-[1100px] md:mt-20">
            <h2 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-slate-950">
              Что вы получите
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Рабочий digital-канал под заявки, поиск и рост — с инженерией, SEO-базой и понятными
              сроками. Без размытых «индивидуально» и чужих ограничений платформы.
            </p>
          </Reveal>

          <div className="mx-auto mt-8 grid max-w-[1100px] gap-6 sm:grid-cols-2 md:mt-10 md:gap-8">
            {BENEFITS.map((item) => (
              <Reveal key={item.title} className="flex gap-3">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--apsod-arigo-accent)]"
                  aria-hidden
                />
                <div>
                  <h3 className="font-display text-base font-bold text-slate-950 md:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Directions */}
      <section id="directions" className="scroll-mt-24 border-t border-slate-200 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-10 max-w-2xl md:mb-14">
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-slate-400">01</span>
              <span className="h-px w-16 bg-slate-200" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em] text-slate-950">
              Направления
            </h2>
            <p className="mt-4 text-sm text-slate-600">
              Выберите формат — откроется страница с деталями и сроками.
            </p>
          </Reveal>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {WEB_DEV_SITE_TYPES.map((type, index) => (
              <Reveal key={type.id} stagger={(Math.min(index % 5, 4) + 1) as 1 | 2 | 3 | 4 | 5}>
                <div className="grid gap-3 py-7 sm:grid-cols-12 sm:items-center sm:gap-6 md:py-8">
                  <span className="text-xs tracking-[0.18em] text-slate-400 sm:col-span-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-slate-950 sm:col-span-4 md:text-2xl">
                    <Link href={type.href} className="transition-colors hover:text-orange-600">
                      {type.title}
                    </Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 sm:col-span-5">{type.body}</p>
                  <Link
                    href={type.href}
                    className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-slate-950 sm:col-span-2 sm:text-right"
                  >
                    →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section id="formats" className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-10 max-w-2xl md:mb-14">
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-slate-400">02</span>
              <span className="h-px w-16 bg-slate-200" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em] text-slate-950">
              Форматы
            </h2>
            <p className="mt-4 text-sm text-slate-600">
              Объём и интеграции определяют срок. Смету фиксируем после короткого брифа.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {WEB_DEV_FEATURED_PACKAGES.map((pkg, index) => (
              <Reveal key={pkg.id} stagger={(Math.min(index, 4) + 1) as 1 | 2 | 3 | 4 | 5}>
                <article
                  className={`flex h-full flex-col rounded-[20px] border bg-white p-7 ${
                    pkg.highlight ? 'border-slate-950' : 'border-slate-200'
                  }`}
                >
                  {pkg.highlight ? (
                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-orange-600">
                      Часто выбирают
                    </p>
                  ) : (
                    <div className="mb-3 h-4" aria-hidden />
                  )}
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-slate-950">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">Срок: {pkg.term}</p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-600">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-px w-3 shrink-0 bg-slate-300" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
                    className="mt-8 inline-flex justify-center rounded-full bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-orange-600"
                  >
                    Получить смету
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-slate-200 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-10 max-w-2xl md:mb-14">
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-slate-400">03</span>
              <span className="h-px w-16 bg-slate-200" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em] text-slate-950">
              Сроки по этапам
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[20px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {WEB_BUILD_TIMELINE.map((step) => (
              <Reveal key={step.title} className="bg-white p-6 md:p-7">
                <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-400">{step.weeks}</p>
                <h3 className="font-display text-lg font-bold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="scroll-mt-24 border-t border-slate-200 bg-white py-16 md:py-24">
        <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between gap-6 px-4 md:mb-14 md:px-8">
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-slate-400">04</span>
              <span className="h-px w-16 bg-slate-200" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em] text-slate-950">
              Кейсы
            </h2>
          </Reveal>
          <Link
            href="/portfolio"
            className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 transition hover:text-slate-950"
          >
            Все проекты →
          </Link>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {WEB_DEV_CASES.map((item, index) => (
            <Reveal key={item.href}>
              <Link
                href={item.href}
                className="group mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-12 sm:items-center md:px-8 md:py-10"
              >
                <span className="text-xs tracking-[0.18em] text-slate-400 sm:col-span-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:col-span-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="sm:col-span-6">
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-slate-950 md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.result}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 transition group-hover:text-slate-950 sm:col-span-1 sm:text-right">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-6 max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-slate-950 md:text-3xl">
              Стек
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Современные фреймворки — выбираем под продукт, сроки и команду заказчика.
            </p>
          </Reveal>
          <Reveal>
            <TechStackChips items={WEB_STACK} />
          </Reveal>
        </div>
      </section>

      <ServiceFaqBlock service="web-development" />

      {/* CTA */}
      <section className="apsod-arigo-hero-bg relative overflow-hidden text-white">
        <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <h2 className="font-display mb-5 text-[clamp(1.85rem,4vw,3rem)] font-extrabold uppercase tracking-[-0.02em]">
              Нужна смета под ваш сайт?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/70">
              Расскажем сроки и смету после короткого брифа — обычно в течение рабочего дня.
            </p>
            <Link
              href="/contact?goal=corporate"
              className="inline-flex rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100"
            >
              Получить смету
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
