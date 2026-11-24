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
  const androidHero = content.slug === "android-apps";

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-gray-950 dark:text-white">
      <ServiceBreadcrumbs service={content.slug} />
      <SeoJsonLd data={serviceSchema} />

      {/* Dark hero */}
      <section className="apsod-bleed-hero relative overflow-hidden text-white">
        <div className="apsod-arigo-hero-bg absolute inset-0" aria-hidden />
        <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute -right-10 top-1/4 h-[min(52vw,480px)] w-[min(52vw,480px)] rounded-full bg-sky-500/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-[min(40vw,360px)] w-[min(40vw,360px)] rounded-full bg-violet-500/10 blur-3xl"
          aria-hidden
        />

        <div
          className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-8"
          style={{ paddingTop: "calc(var(--apsod-header-h) + 3.5rem)" }}
        >
          <div
            className={`grid items-end gap-10 pb-20 md:gap-12 md:pb-28 ${
              phoneHero
                ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,420px)] lg:items-center"
                : "lg:grid-cols-2"
            }`}
          >
            <div className="max-w-xl pb-2">
              <p className="apsod-hero-enter apsod-hero-enter-delay-1 mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                {content.eyebrow}
              </p>
              <h1 className="apsod-hero-enter apsod-hero-enter-delay-2 font-display mb-5 text-[clamp(2.35rem,5.5vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
                {content.title}
              </h1>
              <p className="apsod-hero-enter apsod-hero-enter-delay-3 mb-8 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
                {content.lead}
              </p>
              <div className="apsod-hero-enter apsod-hero-enter-delay-4 flex flex-wrap gap-3">
                <Link
                  href={content.primaryCta.href}
                  className="apsod-btn-solid apsod-cta-primary rounded-full px-7 py-3.5 text-sm font-semibold"
                >
                  <span>{content.primaryCta.label}</span>
                </Link>
                <Link
                  href={content.secondaryCta.href}
                  className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
                >
                  {content.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="apsod-hero-enter apsod-hero-enter-delay-3 relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none">
              {iosDuo ? (
                <IphoneDuoShowcase priority />
              ) : androidHero ? (
                <div className="apsod-phone-float mx-auto w-[min(58%,220px)]">
                  <DeviceMockup
                    device="samsung"
                    screenSrc={content.heroScreen.src}
                    screenAlt={content.heroScreen.alt}
                    priority
                  />
                </div>
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

      {/* Light body — overlaps hero */}
      <section className="relative z-10 -mt-8 rounded-t-[1.75rem] bg-white pb-4 dark:bg-gray-950 md:-mt-12 md:rounded-t-[2.5rem]">
        <div className="mx-auto max-w-[1200px] px-4 pt-10 md:px-8 md:pt-14">
          <Reveal className="mb-10 md:mb-14">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
              Что получите
            </h2>
          </Reveal>
          <div
            className={`grid gap-3 md:gap-4 ${
              content.outcomes.length % 3 === 0
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-2"
            }`}
          >
            {content.outcomes.map((item, i) => (
              <Reveal
                key={item.title}
                stagger={Math.min(i + 1, 3) as 1 | 2 | 3}
                className="apsod-surface-hover rounded-2xl border border-slate-200 bg-slate-50/80 p-6 md:p-8 dark:border-slate-800 dark:bg-gray-900/50"
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mb-3 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
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

      {content.audience?.length ? (
        <section className="border-b border-slate-200 bg-slate-50 py-16 md:py-24 dark:border-slate-800 dark:bg-gray-900/40">
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <Reveal className="mb-8 max-w-2xl">
              <h2 className="font-display mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Кому подходит
              </h2>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.audience.map((item) => (
                <Reveal
                  key={item}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-gray-950 dark:text-slate-300"
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
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
            <Reveal className="mb-8 max-w-2xl">
              <h2 className="font-display mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Типовые задачи
              </h2>
            </Reveal>
            <div className="grid gap-3 md:grid-cols-2 md:gap-4">
              {content.useCases.map((item, i) => (
                <Reveal
                  key={item.title}
                  stagger={Math.min(i + 1, 3) as 1 | 2 | 3}
                  className="apsod-surface-hover rounded-2xl border border-slate-200 bg-white p-6 md:p-8 dark:border-slate-800 dark:bg-gray-950"
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
          <div className="mx-auto max-w-[1200px] px-4 md:px-8">
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

      {/* Screens showcase */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 py-16 text-white md:py-24 dark:border-slate-800">
        <div className="apsod-arigo-hero-noise absolute inset-0 opacity-40" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-8">
          <Reveal className="mb-10 max-w-2xl md:mb-14">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Интерфейсы
            </p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-[-0.03em]">
              Экраны продукта
            </h2>
          </Reveal>
          <div
            className={`grid justify-items-center gap-6 sm:gap-8 ${
              content.screens.length >= 5
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {content.screens.map((screen, i) => (
              <Reveal
                key={`${screen.src}-${i}`}
                stagger={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}
                className="w-full max-w-[160px]"
              >
                <DeviceMockup
                  device={screen.device}
                  screenSrc={screen.src}
                  screenAlt={screen.alt}
                />
                <p className="mt-3 text-center text-[11px] leading-snug text-white/50">
                  {screen.alt}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 py-16 md:py-20 dark:border-slate-800">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="font-display mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              Стек
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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

      <section className="border-b border-slate-200 bg-white py-16 md:py-24 dark:border-slate-800 dark:bg-gray-950">
        <div className="mx-auto mb-10 max-w-[1200px] px-4 md:mb-14 md:px-8">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Кейсы
            </h2>
            <Link
              href="/portfolio"
              className="apsod-link-nudge shrink-0 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
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
                  className="apsod-case-row group grid border-b border-slate-200 last:border-b-0 dark:border-slate-800 lg:grid-cols-12"
                >
                  <div
                    className={`relative min-h-[220px] overflow-hidden bg-slate-100 dark:bg-slate-900 md:min-h-[320px] lg:col-span-8 lg:min-h-[380px] ${
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
                    className={`flex flex-col justify-end bg-white p-8 dark:bg-gray-950 md:p-12 lg:col-span-4 lg:p-14 ${
                      odd ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display mb-4 text-2xl font-bold tracking-tight text-slate-900 transition-transform duration-500 group-hover:translate-x-1 dark:text-white md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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
        <ServiceSemanticBlocks service={content.slug as SemanticServiceKey} />
      ) : null}

      <ServiceFaqBlock service={content.slug} />

      <ReviewsByService
        serviceSlug={content.slug as ReviewServiceSlug}
        limit={3}
      />

      <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center">
          <Reveal>
            <h2 className="font-display mb-8 text-3xl font-bold tracking-tight md:text-5xl">
              Обсудим ваш проект
            </h2>
            <Link
              href="/contact"
              className="apsod-btn-solid apsod-cta-primary inline-flex rounded-full px-10 py-4 text-sm font-semibold"
            >
              <span>Начать проект</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
