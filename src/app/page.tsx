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

      <section className="hero-section relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-slate-50 dark:bg-gray-950">
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.07] dark:opacity-[0.12]"
            style={{ backgroundImage: "url('/about/office-team.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/95 to-slate-50 dark:from-gray-950/90 dark:via-gray-950/95 dark:to-gray-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_70%_0%,rgba(30,64,175,0.05),transparent)] dark:bg-[radial-gradient(ellipse_70%_45%_at_70%_0%,rgba(59,130,246,0.06),transparent)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">
            <HomeHeroCopy />
            <HomeGlobalDelivery />
          </div>
        </div>
      </section>

      <HomeDeviceShowcase />
      <HomeAtAGlance />
      <HomeValueSections />

      <section className="py-20 bg-white dark:bg-gray-950 max-md:py-14">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl mb-12 max-md:mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Наши услуги
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-md:text-base">
              Инженерные практики полного цикла: продукт, рост и сопровождение
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-10">
            {featuredServices.map((service) => (
              <Reveal key={service.link}>
                <Link
                  href={service.link}
                  className="group block h-full bg-white dark:bg-gray-950 p-8 md:p-10 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors max-md:p-6"
                >
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed max-md:text-sm">
                    {service.description}
                  </p>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100 underline-offset-4 group-hover:underline">
                    Подробнее
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Также в контуре</p>
            {moreServices.map((service) => (
              <Link
                key={service.link}
                href={service.link}
                className="text-sm text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white underline-offset-4 hover:underline"
              >
                {service.title}
              </Link>
            ))}
            <Link
              href="/services"
              className="text-sm font-medium text-slate-900 dark:text-white underline-offset-4 hover:underline ml-auto max-md:ml-0"
            >
              Все услуги →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="container mx-auto px-4">
          <Reveal className="flex justify-between items-end mb-12 max-md:flex-col max-md:items-start max-md:gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                Кейсы
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-md:text-base">
                Избранные проекты · офис в Минске
              </p>
            </div>
            <Link
              href="/portfolio"
              className="hidden md:inline-flex text-sm font-medium text-slate-900 dark:text-white underline-offset-4 hover:underline"
            >
              Все кейсы →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-md:gap-4">
            {getFeaturedPortfolioProjects().map((project, index) => (
              <Reveal
                key={project.id}
                stagger={(Math.min(index + 1, 5) as 1 | 2 | 3 | 4 | 5)}
              >
                <Link
                  href={getCasePath(project)}
                  className="group block h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950 overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                >
                  <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-7 max-md:p-5">
                    <p className="text-xs font-medium tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400 mb-3">
                      Кейс · {project.category}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm md:text-base leading-relaxed">
                      {project.description}
                    </p>
                    <span className="text-sm font-medium text-slate-900 dark:text-white underline-offset-4 group-hover:underline">
                      Читать кейс
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeLeadStrip />

      <section className="relative py-16 bg-slate-50 dark:bg-gray-900 max-md:py-12">
        <div className="container mx-auto px-4 relative z-10">
          <Reveal className="max-w-2xl mb-10 max-md:mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Компании, с которыми мы работали
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-md:text-base">
              Избранные проекты на сайте; расширенный архив — на консультации.
            </p>
          </Reveal>

          <Reveal className="flex flex-wrap gap-x-10 gap-y-5 mb-10" stagger={2}>
            {['Amba Detail', 'NEXTON', 'Maxximum', 'Динамо-Витебск', 'BMservice', 'ArtDetailing'].map((name) => (
              <span
                key={name}
                className="font-display text-base md:text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-200"
              >
                {name}
              </span>
            ))}
          </Reveal>

          <Reveal stagger={3}>
            <Link
              href="/portfolio"
              className="inline-flex text-sm font-medium text-slate-900 dark:text-white underline-offset-4 hover:underline"
            >
              Смотреть кейсы →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="container mx-auto px-4">
          <Reveal className="flex justify-between items-end mb-12 max-md:flex-col max-md:items-start max-md:gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                Блог
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-md:text-base">
                Материалы о разработке и продвижении
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex text-sm font-medium text-slate-900 dark:text-white underline-offset-4 hover:underline"
            >
              Все статьи →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 overflow-hidden">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Reveal
                key={post.slug}
                stagger={(Math.min(index + 1, 5) as 1 | 2 | 3 | 4 | 5)}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full bg-white dark:bg-gray-950 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <div className="h-40 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs tracking-wide uppercase text-slate-500 dark:text-slate-400 mb-2">
                      {post.category} · {post.date}
                    </p>
                    <h3 className="font-display font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors line-clamp-2 mb-2 tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
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

      <section className="py-20 bg-white dark:bg-gray-950 max-md:py-14 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">
              Обсудим задачу вашей компании
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-xl mb-8 leading-relaxed">
              Краткий бриф — коммерческое предложение с этапами и зоной ответственности. Офис:
              г. Минск, ул. Куйбышева, 35.
            </p>
            <Link
              href="/contact"
              className="apsod-btn-solid apsod-cta-primary inline-flex px-7 py-3 rounded-md text-sm font-semibold transition-colors"
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
      "Корпоративные сайты и магазины: Discovery, архитектура, инженерия и безопасность на собственном коде.",
    tags: ["Next.js", "React", "TypeScript"],
    link: "/services/web-development",
    featured: true,
  },
  {
    title: "Мобильные приложения",
    description:
      "iOS и Android продукты с упором на стабильность, безопасность и сопровождение после релиза.",
    tags: ["React Native", "Flutter"],
    link: "/services/mobile-development",
    featured: true,
  },
  {
    title: "SEO и аналитика",
    description: "Стратегия продвижения и измеримый рост в Яндексе и Google для бизнеса в Минске.",
    tags: ["SEO", "Аналитика"],
    link: "/services/seo",
    featured: true,
  },
  {
    title: "GEO продвижение",
    description: "Видимость бренда в ответах нейросетей: структура контента, экспертность, мониторинг.",
    tags: ["GEO", "AI"],
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
    description: "Интерфейсы и прототипы под задачи продукта.",
    tags: [] as string[],
    link: "/services/ui-ux",
    featured: false,
  },
  {
    title: "PWA разработка",
    description: "Прогрессивные веб-приложения: установка, офлайн, push.",
    tags: [] as string[],
    link: "/services/pwa-development",
    featured: false,
  },
];
