import Link from "next/link";
import { blogPosts } from "./blog/data/posts";
import { getCasePath, getFeaturedPortfolioProjects, PORTFOLIO_PROJECTS } from "./portfolio/data";
import { buildSnippetMetadata, generateFAQSchema } from "./lib/seo";
import { HOMEPAGE_FAQ } from "./lib/homepage-faq";
import SeoJsonLd from "./components/SeoJsonLd";
import HomeSeoSection from "./components/HomeSeoSection";
import HomeHeroCopy from "./components/HomeHeroCopy";
import HomeValueSections from "./components/HomeValueSections";
import HomeGeoBanner from "./components/HomeGeoBanner";
import HomeLeadStrip from "./components/HomeLeadStrip";
import HomeGrowthFunnel from "./components/HomeGrowthFunnel";
import HomeBeforeAfter from "./components/HomeBeforeAfter";
import Reveal from "./components/Reveal";

export const metadata = buildSnippetMetadata('/');

// Генерируем случайные значения ОДИН РАЗ вне компонента
const starPositions = {
  // Крупные звезды - ТОЛЬКО ДЛЯ ДЕСКТОПА
  large: [...Array(6)].map(() => ({
    top: 10 + Math.random() * 80,
    left: 10 + Math.random() * 80,
    size: 2 + Math.random() * 2,
    duration: 3 + Math.random() * 3,
    delay: Math.random() * 4,
  })),
  // Средние звезды - для всех (увеличены)
  medium: [...Array(16)].map(() => ({
    top: 10 + Math.random() * 80,
    left: 10 + Math.random() * 80,
    size: 2 + Math.random() * 2.5,
    opacity: 0.4 + Math.random() * 0.5,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  })),
  // Мелкие звезды - для всех, очень деликатно
  small: [...Array(40)].map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: 0.1 + Math.random() * 0.2,
    duration: 1 + Math.random() * 3,
    delay: Math.random() * 3,
  })),
  // Усиленные звезды справа - ТОЛЬКО ДЛЯ ДЕСКТОПА
  rightSideStars: [...Array(8)].map(() => ({
    top: 20 + Math.random() * 60,
    left: 60 + Math.random() * 35,
    size: 1.5 + Math.random() * 2,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  })),
  // Космическая пыль - для всех (но на мобилке меньше)
  dustParticles: [...Array(25)].map(() => ({
    top: 20 + Math.random() * 60,
    left: 60 + Math.random() * 35,
    width: 1 + Math.random() * 3,
    height: 1 + Math.random() * 3,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  })),
};

export default function Home() {
  const featuredServices = services.filter((s) => s.featured)
  const moreServices = services.filter((s) => !s.featured)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SeoJsonLd data={generateFAQSchema([...HOMEPAGE_FAQ])} />
      <HomeGeoBanner />
      {/* Hero секция */}
      <section className="hero-section relative pt-28 pb-20 overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/80 to-cyan-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Светлая тема: сетка + soft mesh */}
        <div className="absolute inset-0 z-0 dark:hidden pointer-events-none" aria-hidden>
          <div className="apsod-grid-fade opacity-70" />
          <div
            className="apsod-mesh-blob w-[480px] h-[480px] bg-blue-400/25 top-[-120px] left-[-80px]"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="apsod-mesh-blob w-[380px] h-[380px] bg-cyan-300/20 bottom-[-80px] right-[-40px]"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="apsod-mesh-blob w-[280px] h-[280px] bg-indigo-300/15 top-[40%] right-[20%]"
            style={{ animationDelay: "6s" }}
          />
        </div>

        {/* Эффект космоса - ТОЛЬКО В ТЕМНОЙ ТЕМЕ */}
        <div className="absolute inset-0 z-0 dark:block hidden">
          {/* Большие туманности - адаптивные */}
          <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float-slow animate-nebula max-md:w-[300px] max-md:h-[300px] max-md:opacity-15"></div>
          <div className="absolute top-40 right-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float animation-delay-2000 animate-nebula max-md:w-[200px] max-md:h-[200px] max-md:opacity-10"></div>

          {/* Звездное небо */}
          <div className="absolute inset-0 overflow-hidden">
            {/* КРУПНЫЕ ЗВЕЗДЫ - ТОЛЬКО ДЕСКТОП */}
            {starPositions.large.map((star, i) => (
              <div
                key={`large-${i}`}
                className="absolute bg-purple-300 rounded-full animate-twinkle shadow-lg max-md:hidden"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: 0.5,
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}

            {/* УСИЛЕННЫЕ ЗВЕЗДЫ СПРАВА - ТОЛЬКО ДЕСКТОП */}
            {starPositions.rightSideStars.map((star, i) => (
              <div
                key={`right-${i}`}
                className="absolute right-side-star bg-gradient-to-br from-blue-300 to-purple-300 rounded-full max-md:hidden"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size * 2}px`,
                  height: `${star.size * 2}px`,
                  opacity: 0.3,
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}

            {/* СРЕДНИЕ ЗВЕЗДЫ - для всех (увеличены) */}
            {starPositions.medium.map((pos, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  width: `clamp(2px, ${pos.size * 0.3}vw, ${pos.size}px)`,
                  height: `clamp(2px, ${pos.size * 0.3}vw, ${pos.size}px)`,
                  opacity: pos.opacity,
                  animationDuration: `${pos.duration}s`,
                  animationDelay: `${pos.delay}s`,
                }}
              />
            ))}

            {/* МЕЛКИЕ ЗВЕЗДЫ - для всех (очень деликатно) */}
            {starPositions.small.map((pos, i) => (
              <div
                key={`small-${i}`}
                className="absolute bg-blue-200 rounded-full animate-star-pulse"
                style={{
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  width: "clamp(0.5px, 0.15vw, 1px)",
                  height: "clamp(0.5px, 0.15vw, 1px)",
                  opacity: `clamp(${pos.opacity * 0.2}, ${pos.opacity * 0.3}, ${pos.opacity})`,
                  animationDuration: `${pos.duration}s`,
                  animationDelay: `${pos.delay}s`,
                }}
              />
            ))}

            {/* КОСМИЧЕСКАЯ ПЫЛЬ - для всех (на мобилке очень деликатно) */}
            {starPositions.dustParticles.map((dust, i) => (
              <div
                key={`dust-${i}`}
                className="absolute bg-blue-400/20 rounded-full animate-dust"
                style={{
                  top: `${dust.top}%`,
                  left: `${dust.left}%`,
                  width: `clamp(1px, ${dust.width * 0.2}vw, ${dust.width}px)`,
                  height: `clamp(1px, ${dust.height * 0.2}vw, ${dust.height}px)`,
                  opacity: `clamp(0.1, 0.15, 0.2)`,
                  animationDuration: `${dust.duration}s`,
                  animationDelay: `${dust.delay}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <HomeHeroCopy />

            {/* Правая колонка со статистикой */}
            <div className="relative apsod-hero-enter apsod-hero-enter-delay-4">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-2xl opacity-80 dark:opacity-100"></div>

              <div className="grid grid-cols-2 gap-4 relative max-md:gap-2">
                {[
                  {
                    value: "15+",
                    label: "лет в digital",
                    valueClass: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    value: "350+",
                    label: "реальных кейсов",
                    valueClass: "text-indigo-600 dark:text-indigo-400",
                  },
                  {
                    value: "100%",
                    label: "уникальный код",
                    valueClass: "text-cyan-600 dark:text-cyan-400",
                  },
                  {
                    value: "24ч",
                    label: "ответ на заявку",
                    valueClass: "text-sky-600 dark:text-sky-400",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="apsod-stat-card apsod-card-lift group bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-100/80 dark:border-gray-700/50 max-md:p-3"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <div
                      className={`text-4xl font-bold ${stat.valueClass} group-hover:scale-110 transition-transform duration-300 max-md:text-2xl`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors max-md:text-xs">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeGrowthFunnel />
      <HomeBeforeAfter />

      <HomeValueSections />

      {/* Топ услуг — фокус на привлечение клиентов */}
      <section className="py-20 bg-white dark:bg-gray-800 max-md:py-12">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12 max-md:mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-md:text-3xl">
              Три направления для роста
            </h2>
            <div className="apsod-line-draw mx-auto mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto max-md:text-base">
              Разработка сайтов, мобильные приложения и продвижение — ядро APSOD
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-4 mb-10">
            {featuredServices.map((service, index) => (
              <Reveal
                key={service.link}
                stagger={(Math.min(index + 1, 5) as 1 | 2 | 3 | 4 | 5)}
              >
                <Link
                  href={service.link}
                  className="apsod-card-lift group block h-full rounded-2xl p-8 border border-blue-100 dark:border-blue-900/40 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:border-blue-400 max-md:p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl max-md:text-3xl transition-transform duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 max-md:text-sm">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-xs rounded-full text-blue-700 dark:text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mb-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Также в контуре APSOD
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {moreServices.map((service) => (
                <Link
                  key={service.link}
                  href={service.link}
                  className="px-3 py-1.5 rounded-full text-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  {service.icon} {service.title}
                </Link>
              ))}
            </div>
            <Link
              href="/services"
              className="inline-flex text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Смотреть все услуги →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="container mx-auto px-4">
          <Reveal className="flex justify-between items-end mb-12 max-md:flex-col max-md:items-start max-md:gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-md:text-3xl">
                Наши проекты
              </h2>
              <div className="apsod-line-draw mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-md:text-base">
                Избранные кейсы: что сделали и какой результат получили клиенты
              </p>
            </div>
            <Link
              href="/portfolio"
              className="hidden md:flex items-center text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
            >
              Все проекты
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-md:gap-4">
            {getFeaturedPortfolioProjects().map((project, index) => (
              <Reveal
                key={project.id}
                stagger={(Math.min(index + 1, 5) as 1 | 2 | 3 | 4 | 5)}
              >
                <div className="apsod-card-lift group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 text-gray-900 rounded-full text-xs font-semibold backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${project.color}`} />
                  </div>
                  <div className="p-8 max-md:p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        {project.type === "web" ? "Веб-сайт" : "Мобильное приложение"}
                      </span>
                      <span>•</span>
                      <span>{project.location}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors max-md:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 max-md:text-sm">
                      {project.description}
                    </p>
                    {project.results[0] ? (
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4 line-clamp-2">
                        Результат: {project.results[0]}
                      </p>
                    ) : null}
                    <Link
                      href={getCasePath(project)}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      Смотреть кейс →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeLeadStrip />

      <section className="py-20 bg-white dark:bg-gray-800 max-md:py-12">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16 max-md:mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-md:text-3xl">
              Отрасли, с которыми работаем
            </h2>
            <div className="apsod-line-draw mx-auto mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto max-md:text-base">
              Выберите отрасль — откроется портфолио с релевантными проектами
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-md:gap-3">
            {industries.map((industry, index) => {
              const sample = PORTFOLIO_PROJECTS.find((p) => p.category === industry.name)
              return (
              <Reveal
                key={industry.name}
                stagger={(Math.min((index % 5) + 1, 5) as 1 | 2 | 3 | 4 | 5)}
              >
                <Link
                  href={`/portfolio?industry=${encodeURIComponent(industry.name)}`}
                  className="apsod-card-lift group relative block bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center max-md:p-3 border border-transparent hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="text-4xl mb-3 max-md:text-2xl transition-transform duration-300 group-hover:scale-125">
                    {industry.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 max-md:text-sm">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-md:text-xs line-clamp-1">
                    {sample ? sample.title : 'Смотреть проекты'}
                  </p>
                </Link>
              </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 max-md:py-10 overflow-hidden">
        <div className="apsod-grid-fade opacity-40 dark:opacity-20" aria-hidden />
        <div className="container mx-auto px-4 relative z-10">
          <Reveal className="text-center mb-10 max-md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 max-md:text-2xl">
              Реальные проекты клиентов
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto max-md:text-base">
              Более 350 выполненных проектов. Ниже — избранные работы; в портфолио на сайте
              опубликована часть кейсов.
            </p>
          </Reveal>

          <Reveal className="flex flex-wrap justify-center gap-4 mb-10" stagger={2}>
            {['Amba Detail', 'NEXTON', 'Maxximum', 'Динамо-Витебск', 'BMservice', 'ArtDetailing'].map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-lg bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium backdrop-blur-sm hover:border-blue-400 hover:-translate-y-0.5 transition-all"
              >
                {name}
              </span>
            ))}
          </Reveal>

          <Reveal className="text-center" stagger={3}>
            <Link
              href="/portfolio"
              className="apsod-cta-primary inline-flex px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <span>Смотреть портфолио</span>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex ml-3 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:-translate-y-0.5 transition-all font-medium text-gray-800 dark:text-gray-200"
            >
              Цены и пакеты
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="container mx-auto px-4">
          <Reveal className="flex justify-between items-end mb-12 max-md:flex-col max-md:items-start max-md:gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-md:text-3xl">
                Последние{" "}
                <span className="text-blue-600 dark:text-blue-400">статьи</span>
              </h2>
              <div className="apsod-line-draw mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-md:text-base">
                Актуальные материалы о технологиях и разработке
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
            >
              Все статьи
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-md:gap-4">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Reveal
                key={post.slug}
                stagger={(Math.min(index + 1, 5) as 1 | 2 | 3 | 4 | 5)}
              >
                <article className="apsod-card-lift group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="h-48 bg-linear-to-br from-blue-500 to-cyan-600 relative overflow-hidden max-md:h-32">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-black/10" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 text-gray-900 rounded-full text-xs font-semibold backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 max-md:p-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3 max-md:text-xs">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          {post.category}
                        </span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 max-md:text-base">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 max-md:text-sm max-md:mb-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400 max-md:text-xs">
                          {post.readTime} мин чтения
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all inline-flex items-center text-sm max-md:text-xs">
                          Читать
                          <svg
                            className="w-4 h-4 ml-2 group-hover:ml-3 transition-all max-md:w-3 max-md:h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeSeoSection />

      <section className="relative py-20 overflow-hidden max-md:py-12">
        <div className="absolute inset-0 bg-linear-to-br from-blue-700 via-blue-600 to-cyan-600" />
        <div className="apsod-mesh" aria-hidden>
          <div className="apsod-mesh-blob w-[420px] h-[420px] bg-white/10 top-[-100px] right-[-60px]" />
          <div
            className="apsod-mesh-blob w-[320px] h-[320px] bg-cyan-300/20 bottom-[-80px] left-[-40px]"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="apsod-grid-fade opacity-30" aria-hidden />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-md:text-3xl">
              Готовы начать проект?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto max-md:text-base">
              Расскажите нам о вашей идее, и мы воплотим её в жизнь
            </p>
            <Link
              href="/contact"
              className="apsod-cta-primary inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold text-lg shadow-xl max-md:px-6 max-md:py-3 max-md:text-base"
            >
              <span className="inline-flex items-center">
                Связаться с нами
                <svg
                  className="w-5 h-5 ml-2 max-md:w-4 max-md:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// Ядро привлечения клиентов: сайт, apps, SEO, GEO
const services = [
  {
    icon: "🌐",
    title: "Веб-разработка",
    description:
      "Корпоративные сайты и интернет-магазины на уникальном коде: аналитика, архитектура, безопасность.",
    tags: ["Next.js", "React", "TypeScript", "Без конструкторов"],
    link: "/services/web-development",
    featured: true,
  },
  {
    icon: "📱",
    title: "Мобильные приложения",
    description:
      "Уникальные iOS и Android продукты с упором на безопасность и стабильность.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin"],
    link: "/services/mobile-development",
    featured: true,
  },
  {
    icon: "📈",
    title: "SEO и аналитика",
    description:
      "Стратегия продвижения и измеримый рост в Яндексе и Google.",
    tags: ["SEO", "Метрика", "Контент"],
    link: "/services/seo",
    featured: true,
  },
  {
    icon: "🤖",
    title: "GEO продвижение",
    description:
      "Видимость бренда в нейросетях: ChatGPT, Google AI, Алиса.",
    tags: ["ChatGPT", "AI Overviews", "Алиса"],
    link: "/services/geo-promotion",
    featured: true,
  },
  {
    icon: "🛠️",
    title: "Техподдержка",
    description:
      "Сопровождение после запуска: мониторинг, обновления, развитие продукта.",
    tags: ["Next.js", "Безопасность", "SLA"],
    link: "/services/technical-support",
    featured: false,
  },
  {
    icon: "🤝",
    title: "CRM системы",
    description:
      "Настройка и кастомные CRM для заявок, продаж и коммуникаций с клиентами.",
    tags: ["Bitrix24", "AmoCRM", "Интеграции"],
    link: "/services/crm",
    featured: false,
  },
  {
    icon: "⚙️",
    title: "ERP и учёт",
    description:
      "Индивидуальные решения и интеграции для процессов, склада и отчётности.",
    tags: ["1С интеграция", "Кастом", "Отчёты"],
    link: "/services/erp",
    featured: false,
  },
  {
    icon: "🎨",
    title: "UI/UX дизайн",
    description:
      "Уникальный дизайн под бренд и сценарии пользователя — не готовые шаблоны.",
    tags: ["Figma", "Прототипы", "Дизайн-системы"],
    link: "/services/ui-ux",
    featured: false,
  },
  {
    icon: "📲",
    title: "PWA разработка",
    description:
      "Прогрессивные веб-приложения с push, офлайном и установкой на устройство.",
    tags: ["Next.js", "Service Workers", "Manifest"],
    link: "/services/pwa-development",
    featured: false,
  },
];

// Данные для отраслей
const industries = [
  { icon: "🏭", name: "Производство" },
  { icon: "🏦", name: "Финансы" },
  { icon: "🏥", name: "Медицина" },
  { icon: "🛍️", name: "Ритейл" },
  { icon: "🚚", name: "Логистика" },
  { icon: "📚", name: "Образование" },
  { icon: "⚡", name: "Энергетика" },
  { icon: "🎮", name: "Развлечения" },
  { icon: "📊", name: "Консалтинг" },
];
