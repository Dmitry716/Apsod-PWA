import Image from "next/image";
import Link from "next/link";
import DeviceMockup from "../../components/DeviceMockup";
import IphoneDuoShowcase from "../../components/IphoneDuoShowcase";
import Reveal from "../../components/Reveal";
import SectionAtmosphere from "../../components/SectionAtmosphere";
import SeoJsonLd from "../../components/SeoJsonLd";
import ReviewsByService from "../../components/ReviewsByService";
import type { ReviewServiceSlug } from "../../lib/reviews";
import {
  ServiceBreadcrumbs,
  ServiceFaqBlock,
} from "../../components/ServiceSeoExtras";
import ServiceSemanticBlocks from "../../components/ServiceSemanticBlocks";
import { COMPANY_AREA_SERVED, SITE_URL } from "../../lib/seo";
import DevelopmentProcessSection from "./DevelopmentProcessSection";
import { TechStackChips } from "../../components/TechStackSection";
import type { ServiceLandingContent } from "../lib/landing-data";
import type { SemanticServiceKey } from "../../lib/semantic-core";

type Props = {
  content: ServiceLandingContent;
};

export default function ServiceLanding({ content }: Props) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.schemaName,
    description: content.schemaDescription,
    provider: { "@type": "Organization", name: "APSOD", url: SITE_URL },
    areaServed: COMPANY_AREA_SERVED,
    url: `${SITE_URL}/services/${content.slug}`,
  };

  const phoneHero =
    content.heroDevice === "iphone" || content.heroDevice === "samsung";
  const iosDuo = content.slug === "ios-apps";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ServiceBreadcrumbs service={content.slug} />
      <SeoJsonLd data={serviceSchema} />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 py-20 md:py-24 lg:py-28">
          <div
            className={`grid gap-10 lg:gap-14 items-center ${
              iosDuo
                ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
                : phoneHero
                  ? "lg:grid-cols-[1fr_auto]"
                  : "lg:grid-cols-2"
            }`}
          >
            <div className="max-w-xl lg:max-w-none">
              <p className="apsod-hero-enter apsod-hero-enter-delay-1 text-[11px] font-medium tracking-[0.22em] uppercase text-slate-400 mb-6">
                {content.eyebrow}
              </p>
              <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.08] mb-6">
                {content.title}
              </h1>
              <p className="apsod-hero-enter apsod-hero-enter-delay-3 text-base md:text-lg text-slate-300 leading-relaxed mb-5 max-w-lg">
                {content.lead}
              </p>
              <div className="mb-9" />
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
              className={`apsod-hero-enter apsod-hero-enter-delay-3 w-full ${
                iosDuo
                  ? "mx-auto max-w-md lg:max-w-lg lg:mx-0"
                  : phoneHero
                    ? "w-[min(46vw,200px)] sm:w-[190px] mx-auto lg:mx-0 lg:justify-self-end"
                    : "max-w-2xl mx-auto lg:max-w-none lg:justify-self-stretch"
              }`}
            >
              {iosDuo ? (
                <IphoneDuoShowcase priority />
              ) : (
                <DeviceMockup
                  device={content.heroDevice}
                  screenSrc={content.heroScreen.src}
                  screenAlt={content.heroScreen.alt}
                  priority
                />
              )}
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
          <div
            className={`grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 ${
              content.outcomes.length % 3 === 0
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-2"
            }`}
          >
            {content.outcomes.map((item) => (
              <Reveal
                key={item.title}
                className="apsod-surface-hover bg-white dark:bg-gray-950 p-6 md:p-8 min-h-[140px]"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {content.audience?.length ? (
        <section className="border-b border-slate-200 bg-slate-50 py-16 md:py-24 dark:border-slate-800 dark:bg-gray-900/40">
          <div className="container mx-auto px-4">
            <Reveal className="mb-8 max-w-2xl">
              <h2 className="font-display mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Кому подходит
              </h2>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.audience.map((item) => (
                <Reveal
                  key={item}
                  className="flex gap-3 rounded-sm border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-gray-950 dark:text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {content.useCases?.length ? (
        <section className="border-b border-slate-200 py-16 md:py-24 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <Reveal className="mb-8 max-w-2xl">
              <h2 className="font-display mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Типовые задачи
              </h2>
            </Reveal>
            <div className="grid gap-px border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 md:grid-cols-2">
              {content.useCases.map((item) => (
                <Reveal
                  key={item.title}
                  className="apsod-surface-hover bg-white p-6 md:p-8 dark:bg-gray-950"
                >
                  <h3 className="font-display mb-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.includes?.length ? (
        <section className="border-b border-slate-200 py-16 md:py-24 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <Reveal className="mb-8 max-w-2xl">
              <h2 className="font-display mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Что входит в работу
              </h2>
            </Reveal>
            <ul className="mx-auto grid max-w-3xl gap-3">
              {content.includes.map((item) => (
                <Reveal
                  key={item}
                  className="flex gap-3 border-b border-slate-200 py-3 text-sm text-slate-700 last:border-b-0 dark:border-slate-800 dark:text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900 dark:bg-white" />
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-24 bg-slate-50 dark:bg-gray-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div
            className={`grid gap-8 md:gap-10 ${
              content.screens.every(
                (s) => s.device === "iphone" || s.device === "samsung",
              )
                ? `grid-cols-2 items-end justify-items-center sm:grid-cols-3 ${
                    content.screens.length >= 5 ? "lg:grid-cols-5" : ""
                  }`
                : "items-stretch md:grid-cols-3"
            }`}
          >
            {content.screens.map((screen, i) => {
              const isPhone =
                screen.device === "iphone" || screen.device === "samsung";
              return (
                <Reveal
                  key={`${screen.src}-${i}`}
                  stagger={Math.min(i + 1, 3) as 1 | 2 | 3}
                  className={
                    isPhone
                      ? "flex h-[300px] w-full max-w-[180px] items-end justify-center sm:h-[340px]"
                      : "w-full"
                  }
                >
                  <DeviceMockup
                    device={screen.device}
                    screenSrc={screen.src}
                    screenAlt={screen.alt}
                    className={isPhone ? "h-full w-full" : undefined}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Стек
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Технологии под задачу продукта — без привязки к одному фреймворку.
            </p>
          </Reveal>
          <Reveal>
            <TechStackChips items={content.stack} />
          </Reveal>
        </div>
      </section>

      <DevelopmentProcessSection
        title={content.processTitle}
        subtitle={content.processSubtitle}
        phases={content.process}
      />

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 mb-10 md:mb-14">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Кейсы
            </h2>
            <Link
              href="/portfolio"
              className="apsod-link-nudge text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0"
            >
              Все проекты
            </Link>
          </Reveal>
        </div>

        <div className="border-y border-slate-200 dark:border-slate-800">
          {content.cases.map((item, index) => {
            const odd = index % 2 === 1;
            return (
              <Reveal key={`${item.href}-${item.title}`}>
                <Link
                  href={item.href}
                  className="apsod-case-row group grid lg:grid-cols-12 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
                >
                  <div
                    className={`lg:col-span-8 relative min-h-[220px] md:min-h-[320px] lg:min-h-[380px] overflow-hidden bg-slate-100 dark:bg-slate-900 ${
                      odd ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                  <div
                    className={`lg:col-span-4 flex flex-col justify-end p-8 md:p-12 lg:p-14 bg-white dark:bg-gray-950 ${
                      odd ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="text-[11px] tracking-[0.22em] uppercase text-slate-400 mb-4">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-500">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {item.result}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                      Открыть
                      <span
                        className="transition-transform duration-500 group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {content.slug === "android-apps" ? (
        <ServiceSemanticBlocks
          service={content.slug as SemanticServiceKey}
        />
      ) : null}

      <ServiceFaqBlock service={content.slug} />

      {/* Отзывы клиентов об этой услуге */}
      <ReviewsByService
        serviceSlug={content.slug as ReviewServiceSlug}
        limit={3}
      />

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
  );
}
