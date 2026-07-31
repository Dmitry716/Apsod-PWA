import Link from "next/link";
import { blogPosts } from "./blog/data/posts";
import { getCasePath, getFeaturedPortfolioProjects } from "./portfolio/data";
import { buildSnippetMetadata, generateFAQSchema } from "./lib/seo";
import { HOMEPAGE_FAQ } from "./lib/homepage-faq";
import SeoJsonLd from "./components/SeoJsonLd";
import HomeSeoSection from "./components/HomeSeoSection";
import HomeHeroCopy from "./components/HomeHeroCopy";
import HomeValueSections from "./components/HomeValueSections";
import HomeLeadStrip from "./components/HomeLeadStrip";
import HomeDeviceShowcase from "./components/HomeDeviceShowcase";
import HomeGlobalDelivery from "./components/HomeGlobalDelivery";
import HomeAtAGlance from "./components/HomeAtAGlance";
import Reveal from "./components/Reveal";

export const metadata = buildSnippetMetadata('/');

export default function Home() {
  const featuredServices = services.filter((s) => s.featured)
  const moreServices = services.filter((s) => !s.featured)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SeoJsonLd data={generateFAQSchema([...HOMEPAGE_FAQ])} />

      <section className="hero-section relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/70 to-cyan-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <div className="apsod-grid-fade opacity-60 dark:opacity-30" />
          <div
            className="apsod-mesh-blob w-[480px] h-[480px] bg-blue-400/20 dark:bg-blue-500/10 top-[-120px] left-[-80px]"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="apsod-mesh-blob w-[380px] h-[380px] bg-cyan-300/15 dark:bg-cyan-500/10 bottom-[-80px] right-[-40px]"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <HomeHeroCopy />
            <HomeGlobalDelivery />
          </div>
        </div>
      </section>

      <HomeDeviceShowcase />
      <HomeAtAGlance />
      <HomeValueSections />

      <section className="py-20 bg-white dark:bg-gray-800 max-md:py-12">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12 max-md:mb-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-md:text-3xl tracking-tight">
              Три направления для роста
            </h2>
            <div className="apsod-line-draw mx-auto mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto max-md:text-base">
              Разработка сайтов в Минске, мобильные приложения и продвижение — ядро APSOD
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
                  className="apsod-card-lift group block h-full rounded-2xl p-8 border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-gray-800/80 hover:border-blue-400 max-md:p-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-display text-sm font-bold text-blue-600 dark:text-blue-400 tabular-nums mt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 max-md:text-sm">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-white dark:bg-slate-900/60 text-xs rounded-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
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
                  className="px-3 py-1.5 rounded-md text-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  {service.title}
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
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-md:text-3xl tracking-tight">
                Избранные проекты
              </h2>
              <div className="apsod-line-draw mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-md:text-base">
                Кейсы по Беларуси · студия в Минске
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
                <div className="apsod-card-lift group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 text-gray-900 rounded-md text-xs font-semibold backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${project.color}`} />
                  </div>
                  <div className="p-8 max-md:p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                        {project.type === "web" ? "Веб-сайт" : "Мобильное приложение"}
                      </span>
                      <span>·</span>
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors max-md:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 max-md:text-sm">
                      {project.description}
                    </p>
                    {project.results[0] ? (
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                        Результат: {project.results[0]}
                      </p>
                    ) : null}
                    <Link
                      href={getCasePath(project)}
                      className="inline-flex text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
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

      <section className="relative py-16 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 max-md:py-10 overflow-hidden">
        <div className="apsod-grid-fade opacity-40 dark:opacity-20" aria-hidden />
        <div className="container mx-auto px-4 relative z-10">
          <Reveal className="text-center mb-10 max-md:mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 max-md:text-2xl tracking-tight">
              Клиенты, которым доверяют результат
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto max-md:text-base">
              Более 350 проектов. На сайте — избранные кейсы; полный архив покажем на консультации.
            </p>
          </Reveal>

          <Reveal className="flex flex-wrap justify-center gap-3 mb-10" stagger={2}>
            {['Amba Detail', 'NEXTON', 'Maxximum', 'Динамо-Витебск', 'BMservice', 'ArtDetailing'].map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-md bg-white/90 dark:bg-gray-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium"
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
              className="inline-flex ml-3 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-colors font-medium text-gray-800 dark:text-gray-200"
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
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-md:text-3xl tracking-tight">
                Блог
              </h2>
              <div className="apsod-line-draw mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-md:text-base">
                Материалы о разработке и продвижении
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Reveal
                key={post.slug}
                stagger={(Math.min(index + 1, 5) as 1 | 2 | 3 | 4 | 5)}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="apsod-card-lift group block h-full rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-gray-800"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-500 mb-2">
                      {post.category} · {post.date}
                    </p>
                    <h3 className="font-display font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeSeoSection />

      <section className="py-20 bg-slate-950 text-white max-md:py-14">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Готовы обсудить проект в Минске?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">
              Расскажите задачу — подготовим смету за 1 рабочий день. Офис: г. Минск, ул. Куйбышева, 35.
            </p>
            <Link
              href="/contact"
              className="apsod-cta-primary inline-flex px-8 py-3.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold"
            >
              <span>Связаться с нами</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

const services = [
  {
    title: "Веб-разработка",
    description:
      "Корпоративные сайты и интернет-магазины на уникальном коде: аналитика, архитектура, безопасность.",
    tags: ["Next.js", "React", "TypeScript", "Без конструкторов"],
    link: "/services/web-development",
    featured: true,
  },
  {
    title: "Мобильные приложения",
    description:
      "Уникальные iOS и Android продукты с упором на безопасность и стабильность.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin"],
    link: "/services/mobile-development",
    featured: true,
  },
  {
    title: "SEO и аналитика",
    description: "Стратегия продвижения и измеримый рост в Яндексе и Google.",
    tags: ["SEO", "Метрика", "Контент"],
    link: "/services/seo",
    featured: true,
  },
  {
    title: "GEO продвижение",
    description: "Видимость бренда в нейросетях: ChatGPT, Google AI, Алиса.",
    tags: ["ChatGPT", "AI Overviews", "Алиса"],
    link: "/services/geo-promotion",
    featured: true,
  },
  {
    title: "Техподдержка",
    description: "Сопровождение и развитие после запуска.",
    tags: [] as string[],
    link: "/services/technical-support",
    featured: false,
  },
  {
    title: "CRM системы",
    description: "Внедрение и кастомная разработка.",
    tags: [] as string[],
    link: "/services/crm",
    featured: false,
  },
  {
    title: "ERP и учёт",
    description: "Автоматизация процессов под ваш бизнес.",
    tags: [] as string[],
    link: "/services/erp",
    featured: false,
  },
  {
    title: "UI/UX дизайн",
    description: "Интерфейсы и прототипы под конверсию.",
    tags: [] as string[],
    link: "/services/ui-ux",
    featured: false,
  },
  {
    title: "PWA разработка",
    description: "Сайт как приложение на телефоне.",
    tags: [] as string[],
    link: "/services/pwa-development",
    featured: false,
  },
];
