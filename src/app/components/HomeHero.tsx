"use client";

import Link from "next/link";
import { useLocale } from "../lib/useLocale";
import HomeHeroPhotos from "./HomeHeroPhotos";
import HomeHeroCodeCanvas from "./HomeHeroCodeCanvas";

/** Arigo-inspired hero — oversized type, floating photos right, live code background */
export default function HomeHero() {
  const { locale } = useLocale();
  const isEn = locale === "en";

  return (
    <section
      className="apsod-bleed-hero relative z-10 min-h-[min(100svh,920px)] overflow-hidden text-white"
      aria-labelledby="hero-title"
    >
      {/* Фон hero */}
      <div className="apsod-arigo-hero-bg absolute inset-0" aria-hidden />
      <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />

      {/* Код на фоне — виден и на мобилке, и на десктопе */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-[96px] w-full opacity-[0.12] lg:w-1/2 lg:opacity-25"
        aria-hidden
      >
        <div className="apsod-hero-code-bare">
          <HomeHeroCodeCanvas />
        </div>
      </div>

      {/* 3 фото */}
      <HomeHeroPhotos />

      {/* Контент */}
      <div className="relative z-30 mx-auto flex min-h-[min(100svh,920px)] max-w-7xl flex-col justify-end px-4 pb-40 pt-24 md:px-8 md:pb-48 md:pt-32 lg:pb-24 lg:pt-36">
        {/* Маркер */}
        <p
          className="apsod-hero-enter apsod-hero-enter-delay-1 mt-24 mb-6 flex max-w-xl items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 md:mt-0 md:mb-10 md:text-xs"
          aria-hidden="true"
        >
          <span>
            {isEn
              ? "Building products that convert and scale"
              : "Продукты, которые конвертируют и масштабируются"}
          </span>
          <span
            className="hidden h-px flex-1 bg-white/50 sm:block"
            aria-hidden
          />
          <span
            className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-white sm:block"
            aria-hidden
          />
        </p>

        <h1
          id="hero-title"
          className="apsod-hero-enter apsod-hero-enter-delay-2 font-display font-extrabold uppercase leading-[0.92] tracking-[-0.03em]"
        >
          <span className="block text-[clamp(3rem,15vw,9.5rem)]">Digital</span>
          <span className="mt-1 flex flex-wrap items-center gap-3 text-[clamp(3rem,15vw,9.5rem)] md:gap-5 md:mt-2">
            <span
              className="apsod-arigo-star apsod-star-spin"
              role="img"
              aria-label={isEn ? "Star" : "Звезда"}
            >
              <svg
                viewBox="0 0 64 64"
                className="h-[0.55em] w-[0.55em]"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M32 4l4.2 20.2L56 32l-19.8 7.8L32 60l-4.2-20.2L8 32l19.8-7.8L32 4z" />
              </svg>
            </span>
            <span>Engineering</span>
          </span>
        </h1>

        {/* CTA */}
        <div className="apsod-hero-enter apsod-hero-enter-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-12">
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100 sm:w-auto sm:py-3.5"
          >
            {isEn ? "Start a project" : "Начать проект"}
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/40 px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto sm:py-3.5"
          >
            {isEn ? "View work" : "Смотреть работы"}
          </Link>
        </div>
      </div>
    </section>
  );
}
