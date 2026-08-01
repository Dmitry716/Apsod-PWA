import Image from 'next/image'
import Link from 'next/link'
import DeviceMockup from '../../components/DeviceMockup'
import Reveal from '../../components/Reveal'
import SectionAtmosphere from '../../components/SectionAtmosphere'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { COMPANY_AREA_SERVED, SITE_URL } from '../../lib/seo'
import DevelopmentProcessSection from './DevelopmentProcessSection'
import type { ServiceLandingContent } from '../lib/landing-data'

type Props = {
  content: ServiceLandingContent
}

export default function ServiceLanding({ content }: Props) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.schemaName,
    description: content.schemaDescription,
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: COMPANY_AREA_SERVED,
    url: `${SITE_URL}/services/${content.slug}`,
  }

  const phoneHero = content.heroDevice === 'iphone' || content.heroDevice === 'samsung'

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ServiceBreadcrumbs service={content.slug} />
      <SeoJsonLd data={serviceSchema} />

      <section className="relative min-h-[min(92vh,920px)] flex items-center overflow-hidden bg-slate-950 text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 py-24 md:py-28">
          <div
            className={`grid gap-12 lg:gap-16 items-center ${
              phoneHero ? 'lg:grid-cols-[1.05fr_0.95fr]' : 'lg:grid-cols-2'
            }`}
          >
            <div className="max-w-xl">
              <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-[11px] font-medium tracking-[0.22em] uppercase text-slate-400 mb-5">
                {content.eyebrow}
              </p>
              <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.08] mb-5">
                {content.title}
              </h1>
              <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-md">
                {content.lead}
              </p>
              {content.priceNote ? (
                <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-sm text-slate-400 mb-8">
                  {content.priceNote}
                </p>
              ) : null}
              <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
                <Link
                  href={content.primaryCta.href}
                  className="apsod-btn-solid apsod-cta-primary px-7 py-3.5 rounded-md text-sm font-semibold"
                >
                  <span>{content.primaryCta.label}</span>
                </Link>
                <Link
                  href={content.secondaryCta.href}
                  className="px-7 py-3.5 rounded-md text-sm font-semibold border border-white/30 text-white hover:border-white transition-colors"
                >
                  {content.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div
              className={`apsod-hero-enter apsod-hero-enter-delay-3 ${
                phoneHero ? 'max-w-[280px] sm:max-w-[320px] mx-auto lg:ml-auto lg:mr-8' : 'w-full max-w-xl mx-auto lg:max-w-none'
              }`}
            >
              <DeviceMockup
                device={content.heroDevice}
                screenSrc={content.heroScreen.src}
                screenAlt={content.heroScreen.alt}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-10 md:mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Что получите
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            {content.outcomes.map((item) => (
              <Reveal key={item.title} className="bg-white dark:bg-gray-950 p-6 md:p-8 min-h-[140px]">
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 dark:bg-gray-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-end justify-items-center">
            {content.screens.map((screen, i) => {
              const isPhone = screen.device === 'iphone' || screen.device === 'samsung'
              return (
                <Reveal
                  key={`${screen.src}-${i}`}
                  stagger={(Math.min(i + 1, 3) as 1 | 2 | 3)}
                  className={isPhone ? 'w-full max-w-[240px]' : 'w-full max-w-md'}
                >
                  <DeviceMockup
                    device={screen.device}
                    screenSrc={screen.src}
                    screenAlt={screen.alt}
                  />
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Стек
            </h2>
          </Reveal>
          <Reveal>
            <ul className="flex flex-wrap gap-2 md:gap-3">
              {content.stack.map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <DevelopmentProcessSection
        title={content.processTitle}
        subtitle={content.processSubtitle}
        phases={content.process}
      />

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Кейсы
            </h2>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline shrink-0"
            >
              Все проекты
            </Link>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-3 md:gap-4">
            {content.cases.map((item, index) => (
              <Reveal key={item.href} stagger={(Math.min(index + 1, 3) as 1 | 2 | 3)}>
                <Link
                  href={item.href}
                  className="apsod-media-frame group block relative aspect-[4/5] overflow-hidden bg-slate-200 dark:bg-slate-900"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-xl font-bold text-white tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-snug">{item.result}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaqBlock service={content.slug} />

      <section className="relative py-20 md:py-28 overflow-hidden bg-slate-950 text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Обсудим ваш проект
            </h2>
            <Link
              href="/contact"
              className="apsod-btn-solid apsod-cta-primary inline-flex px-10 py-4 rounded-md text-sm font-semibold"
            >
              <span>Начать проект</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
