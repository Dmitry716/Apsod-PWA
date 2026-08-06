import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../../components/Reveal'
import SectionAtmosphere from '../../components/SectionAtmosphere'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { DUAL_CURRENCY_NOTE } from '../../lib/currency'
import {
  CLIENT_PROOF,
  TEAM_PROOF,
  WEB_BUILD_TIMELINE,
  WHY_APSOD_WEB,
} from '../../lib/client-proof'
import { COMPANY_ADDRESS_DISPLAY, COMPANY_AREA_SERVED, SITE_URL } from '../../lib/seo'
import {
  getSiteTypeCases,
  getSiteTypePackage,
  SITE_TYPE_PAGES,
  type SiteTypeSlug,
} from '../../lib/site-type-pages'

export default function SiteTypeLanding({ slug }: { slug: SiteTypeSlug }) {
  const page = SITE_TYPE_PAGES[slug]
  const pkg = getSiteTypePackage(slug)
  const cases = getSiteTypeCases(slug)

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.schemaName,
    description: page.lead,
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: COMPANY_AREA_SERVED,
    url: `${SITE_URL}/services/${slug}`,
    offers: {
      '@type': 'Offer',
      name: pkg.title,
      priceCurrency: 'BYN',
      price: String(pkg.bynAmount),
      url: `${SITE_URL}/contact?goal=${pkg.goal}&budget=${pkg.budget}`,
    },
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ServiceBreadcrumbs service={slug} />
      <SeoJsonLd data={serviceSchema} />

      <section className="relative min-h-[min(68svh,600px)] flex items-end overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={cases[0]?.image ?? '/portfolio/amba.png'}
            alt=""
            fill
            priority
            className="object-cover object-center scale-105 opacity-40 apsod-ken-burns"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-16 pt-20 md:pt-24">
          <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-[11px] font-medium tracking-[0.22em] uppercase text-slate-400 mb-5">
            {page.eyebrow}
          </p>
          <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-5 max-w-2xl">
            {page.h1}
          </h1>
          <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-base md:text-lg text-slate-300 leading-relaxed mb-4 max-w-lg">
            {page.lead}
          </p>
          <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-sm text-slate-400 mb-8 max-w-lg">
            {page.priceLine}
          </p>
          <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
            <Link
              href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
              className="apsod-btn-solid apsod-cta-primary px-7 py-3.5 rounded-md text-sm font-semibold"
            >
              <span>Получить смету</span>
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

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-5 text-sm text-slate-600 dark:text-slate-300">
          {COMPANY_ADDRESS_DISPLAY}
          {' · '}
          <Link href="/pricing" className="apsod-link-nudge font-medium text-slate-900 dark:text-white">
            Цены
          </Link>
          {page.parentNote ? (
            <>
              {' · '}
              <Link
                href={page.parentNote.href}
                className="apsod-link-nudge font-medium text-slate-900 dark:text-white"
              >
                {page.parentNote.label}
              </Link>
            </>
          ) : null}
        </div>
      </section>

      <section className="py-14 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Что получите
            </h2>
          </Reveal>
          <div className="grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 md:grid-cols-2">
            {page.outcomes.map((item) => (
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
              Стоимость
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{DUAL_CURRENCY_NOTE}</p>
          </Reveal>
          <Reveal className="apsod-price-card max-w-lg bg-white dark:bg-gray-950 border border-slate-200 dark:border-slate-800 p-7 flex flex-col">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              {pkg.title}
            </h3>
            <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{pkg.byn}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{pkg.rub}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Срок: {pkg.term}</p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-8">
              {pkg.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="h-px w-3 bg-slate-400 shrink-0 mt-2.5" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
              className="apsod-btn-solid inline-flex justify-center w-full px-4 py-2.5 rounded-md text-sm font-semibold"
            >
              Получить смету
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Сроки по этапам
            </h2>
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

      <section className="py-14 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Почему APSOD
            </h2>
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

      {cases.length > 0 ? (
        <section className="py-14 md:py-20 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 mb-8">
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
            {cases.map((item, index) => (
              <Reveal key={item.href}>
                <Link
                  href={item.href}
                  className="apsod-case-row group grid md:grid-cols-12 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
                >
                  <div className="md:col-span-5 relative min-h-[180px] md:min-h-[240px] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain object-center p-4 transition-transform duration-[1.1s] group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className="md:col-span-7 flex flex-col justify-end p-8 md:p-10">
                    <p className="text-[11px] tracking-[0.22em] uppercase text-slate-400 mb-3">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.result}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

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
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceFaqBlock service={slug} />

      <section className="relative py-20 md:py-28 overflow-hidden bg-slate-950 text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Нужна смета?
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Ориентир стоимости и сроки — после короткого брифа, обычно в течение рабочего дня.
            </p>
            <Link
              href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
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
