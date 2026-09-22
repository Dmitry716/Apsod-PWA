"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import AnimatedNumber from "./AnimatedNumber";
import { useLocale } from "../lib/useLocale";

const STATS = [
  { value: "50+", labelRu: "Проектов", labelEn: "Projects shipped" },
  { value: "BY·EU", labelRu: "Рынки", labelEn: "Markets" },
  { value: "1", labelRu: "Команда founders", labelEn: "Founder-led team" },
] as const;

/** Arigo-style about + stats band — full-bleed photo left, content right */
export default function HomeArigoIntro() {
  const { locale } = useLocale();
  const isEn = locale === "en";

  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* ─── ФОТО: фон слева, целиком, с размытой копией по краям ─── */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[55%]"
        aria-hidden
      >
        {/* Слой 1: размытая копия — только на десктопе */}
        <Image
          src="/about/gallery/team-lounge.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="hidden object-cover object-center scale-125 blur-xl brightness-[0.5] saturate-150 lg:block lg:blur-2xl"
        />

        {/* Слой 2: чёткое фото целиком */}
        <Image
          src="/about/gallery/team-lounge.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-contain object-center"
        />

        {/* Слой 3: растворение справа */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black lg:to-black" />

        {/* Слой 4: растворение сверху/снизу */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        {/* Слой 5: затемнение — только на десктопе */}
        <div className="absolute inset-0 hidden bg-black/15 lg:block" />
      </div>

      {/* ─── КОНТЕНТ ─── */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:py-32">
        {/* Маркер 02 + плавно исчезающая полоска */}
        <Reveal className="mb-12 flex items-center gap-4 md:mb-16">
          <span className="font-display text-xs font-bold tracking-[0.2em] text-orange-300/70">
            02
          </span>
          <span
            className="apsod-mobile-line h-px w-32 md:w-48"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.35), rgba(255,255,255,0))",
            }}
            aria-hidden
          />
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-5 lg:block" />

          <div className="lg:col-span-7">
            <div className="apsod-mobile-anim lg:block">
              <Reveal>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300/80">
                  {isEn ? "Who we are" : "Кто мы"}
                </p>
                <h2 className="font-display mb-6 max-w-xl text-[clamp(1.75rem,3.5vw,3rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]">
                  {isEn
                    ? "A product engineering studio for web & mobile"
                    : "Product engineering для веба и мобильных"}
                </h2>
                <p className="mb-10 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
                  {isEn
                    ? "We design and build sites, apps and digital platforms — from brief to launch — with clear delivery and SEO foundations."
                    : "Проектируем и собираем сайты, приложения и цифровые платформы — от брифа до запуска, с понятной поставкой и SEO-базой."}
                </p>
              </Reveal>

              <div className="grid gap-8 sm:grid-cols-3">
                {STATS.map((stat, i) => (
                  <Reveal key={stat.value} stagger={(i + 1) as 1 | 2 | 3}>
                    <div className="relative">
                      <span
                        className="absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-orange-400/60 to-transparent"
                        aria-hidden
                      />
                      <p className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-none tracking-tight">
                        {stat.value === "50+" ? (
                          <AnimatedNumber value={50} suffix="+" />
                        ) : stat.value === "1" ? (
                          <AnimatedNumber value={1} />
                        ) : (
                          stat.value
                        )}
                      </p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                        {isEn ? stat.labelEn : stat.labelRu}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-12">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-orange-300"
                >
                  <span className="relative">
                    {isEn ? "About APSOD" : "О компании"}
                    <span
                      className="absolute -bottom-1 left-0 h-px w-0 bg-orange-300 transition-all duration-500 group-hover:w-full"
                      aria-hidden
                    />
                  </span>
                  <span
                    className="transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
