import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../../components/Reveal'
import SectionAtmosphere from '../../components/SectionAtmosphere'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import {
  CLIENT_PROOF,
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
      url: `${SITE_URL}/contact?goal=${pkg.goal}&budget=${pkg.budget}`,
    },
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ServiceBreadcrumbs service={slug} />
      <SeoJsonLd data={serviceSchema} />

      <section className="relative overflow-hidden text-white">
        <div className="apsod-arigo-hero-bg absolute inset-0" aria-hidden />
        <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />

        <div
          className="relative z-10 mx-auto max-w-7xl px-4 pb-14 md:px-8 md:pb-20"
          style={{ paddingTop: 'calc(var(--apsod-header-h) + 3.5rem)' }}
        >
          <p className="apsod-hero-enter apsod-hero-enter-delay-1 mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
            {page.eyebrow}
          </p>
          <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display mb-5 max-w-3xl text-[clamp(2rem,6vw,4.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
            {page.h1}
          </h1>
          <p className="apsod-hero-enter apsod-hero-enter-delay-3 mb-4 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
            {page.lead}
          </p>
          <p className="apsod-hero-enter apsod-hero-enter-delay-3 mb-8 max-w-lg text-sm text-white/45">
            {page.termLine}
          </p>
          <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
            <Link
              href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
              className="inline-flex rounded-full bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100"
            >
              Получить смету
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white"
            >
              Обсудить задачу
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-5 text-sm text-slate-600 dark:text-slate-300">
          {COMPANY_ADDRESS_DISPLAY}
          {' · '}
          <Link href="/contact" className="apsod-link-nudge font-medium text-slate-900 dark:text-white">
            Контакты
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
              Формат
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Смета после брифа — обычно за 1 рабочий день.</p>
          </Reveal>
          <Reveal className="apsod-price-card max-w-lg bg-white dark:bg-gray-950 border border-slate-200 dark:border-slate-800 p-7 flex flex-col">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              {pkg.title}
            </h3>
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
                      className="object-cover object-top transition-transform duration-[1.1s] group-hover:scale-[1.02]"
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

      <ServiceFaqBlock service={slug} />

      <section className="relative py-20 md:py-28 overflow-hidden bg-slate-950 text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Нужна смета?
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Смета и сроки — после короткого брифа, обычно в течение рабочего дня.
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
