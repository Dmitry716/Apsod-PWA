
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PORTFOLIO_PROJECTS, getCasePath, getFeaturedRank } from "./data";
import { t } from "../lib/i18n";
import { useLocale } from "../lib/useLocale";
import AgencyPageHero from "../components/AgencyPageHero";

export default function PortfolioPage() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();

  const industryOrder = useMemo(
    () => [
      "Производство",
      "Финансы",
      "Медицина",
      "Ритейл",
      "Логистика",
      "Образование",
      "Энергетика",
      "Развлечения",
      "Консалтинг",
    ],
    [],
  );
  const OTHER_INDUSTRY_KEY = "other";

  // Инициализация из URL — без useEffect (fix ESLint set-state-in-effect)
  const initialIndustry = useMemo(() => {
    const fromQuery = searchParams.get("industry");
    if (!fromQuery) return "all";
    if (fromQuery === OTHER_INDUSTRY_KEY || industryOrder.includes(fromQuery)) {
      return fromQuery;
    }
    return "all";
  }, [searchParams, industryOrder]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndustry, setActiveIndustry] = useState(initialIndustry);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Синхронизация при смене URL — официальный паттерн React 19, без useEffect
  const [prevInitial, setPrevInitial] = useState(initialIndustry);
  if (prevInitial !== initialIndustry) {
    setPrevInitial(initialIndustry);
    setActiveIndustry(initialIndustry);
  }

  const industryLabel = (industry: string) => {
    switch (industry) {
      case "Производство":
        return t(locale, "industries.manufacturing");
      case "Финансы":
        return t(locale, "industries.finances");
      case "Медицина":
        return t(locale, "industries.medicine");
      case "Ритейл":
        return t(locale, "industries.retail");
      case "Логистика":
        return t(locale, "industries.logistics");
      case "Образование":
        return t(locale, "industries.education");
      case "Энергетика":
        return t(locale, "industries.energy");
      case "Развлечения":
        return t(locale, "industries.entertainment");
      case "Консалтинг":
        return t(locale, "industries.consulting");
      default:
        return industry;
    }
  };

  const resetView = () => setImageErrors({});
  const handleFilterChange = (nextFilter: string) => {
    setActiveFilter(nextFilter);
    resetView();
  };
  const handleIndustryChange = (nextIndustry: string) => {
    setActiveIndustry(nextIndustry);
    resetView();
  };

  const sortedProjects = useMemo(() => {
    const yearNum = (year: string) => {
      const n = Number.parseInt(year, 10);
      return Number.isFinite(n) ? n : 0;
    };
    const getIndustryIndex = (category: string) => {
      const idx = industryOrder.indexOf(category);
      return idx === -1 ? industryOrder.length + 1 : idx;
    };
    return [...PORTFOLIO_PROJECTS].sort((a, b) => {
      const featuredDiff = getFeaturedRank(a) - getFeaturedRank(b);
      if (featuredDiff !== 0) return featuredDiff;
      const ai = getIndustryIndex(a.category);
      const bi = getIndustryIndex(b.category);
      if (ai !== bi) return ai - bi;
      const dy = yearNum(b.year) - yearNum(a.year);
      if (dy !== 0) return dy;
      return a.id - b.id;
    });
  }, [industryOrder]);

  const filteredProjects = useMemo(() => {
    let list = sortedProjects;
    if (activeFilter !== "all")
      list = list.filter((p) => p.type === activeFilter);
    if (activeIndustry !== "all") {
      if (activeIndustry === OTHER_INDUSTRY_KEY) {
        list = list.filter((p) => !industryOrder.includes(p.category));
      } else {
        list = list.filter((p) => p.category === activeIndustry);
      }
    }
    return list;
  }, [activeFilter, activeIndustry, industryOrder, sortedProjects]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-white">
      <AgencyPageHero
        title={t(locale, "portfolio.title")}
        crumb={locale === "en" ? "Work" : "Кейсы"}
        note={t(locale, "portfolio.subtitle")}
        homeLabel={locale === "en" ? "Home" : "Главная"}
      />

      {/* Фильтры */}
      <section className="relative pb-8 pt-10" aria-label="Фильтры кейсов">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-6 space-y-3">
            <div
              className="flex flex-wrap items-stretch justify-start border-y border-slate-200 dark:border-white/10 sm:justify-center"
              role="tablist"
              aria-label={t(locale, "portfolio.filters.all")}
            >
              {(
                [
                  { key: "all", label: t(locale, "portfolio.filters.all") },
                  { key: "web", label: t(locale, "portfolio.filters.web") },
                  {
                    key: "mobile",
                    label: t(locale, "portfolio.filters.mobile"),
                  },
                ] as const
              ).map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === item.key}
                  onClick={() => handleFilterChange(item.key)}
                  className={`relative shrink-0 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-5 sm:text-xs ${
                    index > 0
                      ? "before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-slate-200 dark:before:bg-white/15"
                      : ""
                  } ${
                    activeFilter === item.key
                      ? "text-orange-500 dark:text-orange-300"
                      : "text-slate-500 hover:text-slate-900 dark:text-white/45 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0">
              <div
                className="flex w-max min-w-full flex-nowrap items-stretch justify-start border-y border-slate-200 dark:border-white/10 md:w-auto md:flex-wrap md:justify-center"
                role="tablist"
                aria-label={t(locale, "portfolio.filters.industriesAll")}
              >
                {(
                  [
                    {
                      key: "all",
                      label: t(locale, "portfolio.filters.industriesAll"),
                    },
                    ...industryOrder.map((industry) => ({
                      key: industry,
                      label: industryLabel(industry),
                    })),
                    {
                      key: OTHER_INDUSTRY_KEY,
                      label: t(locale, "portfolio.filters.industriesOther"),
                    },
                  ] as const
                ).map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={activeIndustry === item.key}
                    onClick={() => handleIndustryChange(item.key)}
                    className={`relative shrink-0 px-3.5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-4 sm:text-xs ${
                      index > 0
                        ? "before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-slate-200 dark:before:bg-white/15"
                        : ""
                    } ${
                      activeIndustry === item.key
                        ? "text-orange-500 dark:text-orange-300"
                        : "text-slate-500 hover:text-slate-900 dark:text-white/45 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p
            className="text-sm text-slate-500 dark:text-white/40"
            aria-live="polite"
          >
            {t(locale, "portfolio.found")} {filteredProjects.length}
          </p>
        </div>
      </section>

      {/* Карточки */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {filteredProjects.map((project) => {
              const caseHref = getCasePath(project);
              const hasError = imageErrors[project.id];
              return (
                <article key={project.id} className="group min-w-0">
                  <Link
                    href={caseHref}
                    className="flex h-full flex-col overflow-hidden rounded-sm border border-slate-200 bg-[#050a1f] text-white transition-all duration-500 hover:border-orange-400/60 hover:shadow-[0_20px_50px_-25px_rgba(251,146,60,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:border-white/10 dark:hover:border-white/30 dark:focus-visible:ring-offset-black"
                    aria-label={`Открыть кейс: ${project.title} — ${project.category}, ${project.year}`}
                  >
                    <div className="relative h-[280px] w-full overflow-hidden bg-[#050a1f] md:h-[320px]">
                      {!hasError ? (
                        <Image
                          src={project.image}
                          alt={`Превью проекта ${project.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                          onError={() =>
                            setImageErrors((prev) => ({
                              ...prev,
                              [project.id]: true,
                            }))
                          }
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/40">
                            {project.category}
                          </span>
                        </div>
                      )}
                      <div
                        className="apsod-photo-vignette pointer-events-none absolute inset-0"
                        aria-hidden
                      />
                      <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
                        <span className="rounded-sm border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm">
                          {project.year}
                        </span>
                        <span className="rounded-sm border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm">
                          {project.type === "mobile" ? "Mobile" : "Web"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-300/80">
                        {project.category} · {project.location}
                      </p>
                      <h2 className="font-display mb-3 text-xl font-extrabold uppercase leading-snug tracking-tight text-white transition-colors group-hover:text-orange-300 md:text-2xl">
                        {project.title}
                      </h2>
                      <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-white/60">
                        {project.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition-colors group-hover:text-white">
                        {locale === "en" ? "View project" : "Смотреть кейс"}
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="apsod-arigo-hero-bg relative overflow-hidden">
        <div className="apsod-arigo-hero-noise absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold uppercase leading-[1.08] tracking-[-0.015em]">
              {t(locale, "portfolio.cta.title")}
            </h2>
            <p className="mb-8 leading-relaxed text-white/70">
              {t(locale, "portfolio.cta.subtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-orange-100"
            >
              {t(locale, "portfolio.cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
