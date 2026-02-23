import Link from "next/link";
import { blogPosts } from './blog/data/posts';

// Известные мировые компании
const trustedCompanies = [
  { name: 'Microsoft' },
  { name: 'Google' },
  { name: 'Amazon' },
  { name: 'IBM' },
  { name: 'Oracle' },
  { name: 'SAP' },
  { name: 'Salesforce' },
  { name: 'Adobe' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                IT-компания полного цикла
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Создаем{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  цифровые продукты
                </span>{' '}
                для вашего бизнеса
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Веб-разработка, мобильные приложения, CRM и ERP системы для разных отраслей бизнеса.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Обсудить проект
                </Link>
                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  Наши работы
                </Link>
              </div>
            </div>
            
            {/* Статистика */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                  <div className="text-gray-600 dark:text-gray-300">лет на рынке</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">750+</div>
                  <div className="text-gray-600 dark:text-gray-300">проектов</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">350+</div>
                  <div className="text-gray-600 dark:text-gray-300">клиентов</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">25+</div>
                  <div className="text-gray-600 dark:text-gray-300">экспертов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Наши услуги */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Комплексные решения для развития вашего бизнеса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Кейсы/Проекты */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Наши проекты
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Реальные истории успеха наших клиентов</p>
            </div>
            <Link
              href="/portfolio"
              className="hidden md:flex items-center text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
            >
              Все проекты
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`h-2 bg-linear-to-r ${study.color}`}></div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                      {study.category}
                    </span>
                    <span>•</span>
                    <span>{study.client}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{study.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {study.stats.map((stat, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-bold text-gray-900 dark:text-white">{stat.value}</span>
                          <span className="text-gray-500 dark:text-gray-400 ml-1">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={study.link}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Подробнее →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отраслевая экспертиза */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Отрасли, которые мы трансформируем
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Глубокая отраслевая экспертиза в различных секторах экономики
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group relative bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{industry.projects}+ проектов</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок "Нам доверяют" */}
      <section className="py-16 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Нам доверяют ведущие компании
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Мы гордимся сотрудничеством с мировыми лидерами индустрии
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {trustedCompanies.map((company, index) => (
              <div
                key={index}
                className="group relative w-full flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-gray-400 dark:text-gray-500 font-semibold text-lg">
                  {company.name}
                </div>
              </div>
            ))}
          </div>

          {/* Статистика доверия */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">95%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">клиентов продолжают сотрудничество</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">лет среднее сотрудничество</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">40+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">стран представлены</div>
            </div>
          </div>
        </div>
      </section>

      {/* Последние статьи блога */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Последние{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  статьи
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Актуальные материалы о технологиях и разработке</p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
            >
              Все статьи
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-48 bg-linear-to-br from-blue-400 to-purple-500 relative flex items-center justify-center">
                    <span className="text-7xl opacity-30">{post.icon}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.readTime} мин чтения
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all inline-flex items-center">
                        Читать
                        <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Контактная форма */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Готовы начать проект?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Расскажите нам о вашей идее, и мы воплотим её в жизнь
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Связаться с нами
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Данные для услуг
const services = [
  {
    icon: "🌐",
    title: "Веб-разработка",
    description: "Создаем современные сайты, интернет-магазины и веб-приложения под ключ.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
    link: "/services/web-development"
  },
  {
    icon: "📱",
    title: "Мобильные приложения",
    description: "Разрабатываем нативные и кроссплатформенные приложения для iOS и Android.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin"],
    link: "/services/mobile-development"
  },
  {
    icon: "🤝",
    title: "CRM системы",
    description: "Внедряем и разрабатываем кастомные CRM системы для управления бизнесом.",
    tags: ["Salesforce", "Bitrix24", "AmoCRM"],
    link: "/services/crm"
  },
  {
    icon: "⚙️",
    title: "ERP системы",
    description: "Комплексные решения для управления производством, складом и финансами.",
    tags: ["1С", "SAP", "Oracle"],
    link: "/services/erp"
  },
  {
    icon: "🎨",
    title: "UI/UX дизайн",
    description: "Создаем удобные и красивые интерфейсы, которые нравятся пользователям.",
    tags: ["Figma", "Adobe XD", "Прототипирование"],
    link: "/services/ui-ux"
  },
  {
    icon: "📈",
    title: "SEO продвижение",
    description: "Выводим сайты в топ поисковых систем и увеличиваем органический трафик.",
    tags: ["SEO", "Аналитика", "Контент"],
    link: "/services/seo"
  },
  {
    icon: "📲",
    title: "PWA разработка",
    description: "Создаем прогрессивные веб-приложения, которые работают как нативные и устанавливаются на телефон.",
    tags: ["Next.js", "Service Workers", "Manifest"],
    link: "/services/pwa-development"
  }
];

// Данные для кейсов
const caseStudies = [
  {
    color: "from-blue-500 to-purple-500",
    category: "Финтех",
    client: "TradeStops",
    title: "Платформа управления инвестиционным портфелем",
    description: "Веб-платформа для управления инвестиционными портфелями обслуживает 30 000+ инвесторов.",
    stats: [
      { value: "$20 млрд", label: "под управлением" },
      { value: "30k+", label: "инвесторов" }
    ],
    link: "/portfolio/tradestops"
  },
  {
    color: "from-purple-500 to-pink-500",
    category: "Ритейл",
    client: "Глобальный ритейлер",
    title: "AI-решения для персонализации покупок",
    description: "AI-решения включают систему рекомендаций и распознавание товаров.",
    stats: [
      { value: "8%", label: "выше конверсия" },
      { value: "50%", label: "снижение затрат" }
    ],
    link: "/portfolio/ai-retail"
  }
];

// Данные для отраслей
const industries = [
  { icon: "🏭", name: "Производство", projects: 45 },
  { icon: "🏦", name: "Финансы", projects: 38 },
  { icon: "🏥", name: "Медицина", projects: 27 },
  { icon: "🛍️", name: "Ритейл", projects: 52 },
  { icon: "🚚", name: "Логистика", projects: 23 },
  { icon: "📚", name: "Образование", projects: 19 },
  { icon: "⚡", name: "Энергетика", projects: 16 },
  { icon: "🎮", name: "Развлечения", projects: 14 }
];