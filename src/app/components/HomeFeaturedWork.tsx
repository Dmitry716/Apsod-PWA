"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { getCasePath, getFeaturedPortfolioProjects } from "../portfolio/data";
import { useLocale } from "../lib/useLocale";

/** Arigo-style featured projects — large media, bold titles */
export default function HomeFeaturedWork() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const projects = getFeaturedPortfolioProjects().slice(0, 3);

  return (
    <section className="bg-white text-slate-900 transition-colors dark:bg-black dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-slate-400 dark:text-white/45">
                03
              </span>
              <span
                className="h-px w-16 bg-slate-200 dark:bg-white/15 sm:w-24"
                aria-hidden
              />
            </div>
            <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-slate-900 dark:text-white">
              {isEn ? "Selected work" : "Избранные кейсы"}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 transition-colors hover:text-orange-500 dark:text-white/70 dark:hover:text-white"
          >
            {isEn ? "View all projects" : "Все проекты"}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        <div className="space-y-14 md:space-y-20">
          {projects.map((project, index) => {
            const caseHref = getCasePath(project);
            const isRight = index % 2 === 1;

            return (
              <Reveal
                key={project.id}
                stagger={(Math.min(index, 4) + 1) as 1 | 2 | 3 | 4 | 5}
              >
                <article className="group grid items-center gap-6 px-1 sm:px-2 md:px-0 lg:grid-cols-12 lg:gap-12">
                  {/* Фото — 7 колонок */}
                  <Link
                    href={caseHref}
                    className={`relative block overflow-hidden rounded-[20px] bg-slate-100 transition-all duration-500 hover:shadow-[0_25px_60px_-30px_rgba(251,146,60,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:bg-[#050a1f] dark:focus-visible:ring-offset-black lg:col-span-7 ${
                      isRight ? "lg:order-2" : ""
                    }`}
                    aria-label={`Открыть кейс: ${project.title} — ${project.category}`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050a1f]">
                      {/* Размытая копия на фоне */}
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        aria-hidden
                        className="scale-110 object-cover blur-2xl brightness-[0.45]"
                      />
                      {/* Чёткое фото целиком */}
                      <Image
                        src={project.image}
                        alt={`Превью проекта ${project.title}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        priority={index === 0}
                      />
                      <div
                        className="apsod-photo-vignette pointer-events-none absolute inset-0"
                        aria-hidden
                      />
                    </div>
                  </Link>

                  {/* Текст — 5 колонок, с отступами для мобилки */}
                  <div
                    className={`px-2 sm:px-4 md:px-6 lg:col-span-5 lg:px-0 lg:pl-4 xl:pl-6 ${
                      isRight ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300/80">
                      {String(index + 1).padStart(2, "0")} / {project.category}
                    </p>
                    <h3 className="font-display mb-5 text-[clamp(1.5rem,2.8vw,2.35rem)] font-extrabold uppercase leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                      <Link
                        href={caseHref}
                        className="transition-colors hover:text-orange-500 focus:outline-none focus-visible:text-orange-500 dark:hover:text-orange-300 dark:focus-visible:text-orange-300"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-600 dark:text-white/60">
                      {project.description}
                    </p>
                    <Link
                      href={caseHref}
                      className="group/link inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 transition-colors hover:text-orange-500 focus:outline-none focus-visible:text-orange-500 dark:text-white/70 dark:hover:text-white dark:focus-visible:text-white"
                    >
                      {isEn ? "View project" : "Смотреть кейс"}
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
