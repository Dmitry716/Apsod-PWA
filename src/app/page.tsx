import Link from "next/link";
import Image from "next/image";

// Последние 3 статьи из блога
const latestPosts = [
  {
    slug: 'gpt-5-revolution-web-development',
    title: 'GPT-5 и революция в веб-разработке: что изменится в 2026',
    excerpt: 'Анализ возможностей GPT-5 и его влияния на создание веб-приложений, автоматизацию кодинга и роль разработчика.',
    author: 'Дмитрий Карелин',
    date: '21 февраля 2026',
    readTime: 8,
    category: 'AI',
    icon: '🤖'
  },
  {
    slug: 'neural-interfaces-web',
    title: 'Нейроинтерфейсы в вебе: как управлять сайтом силой мысли',
    excerpt: 'Обзор технологии Brain-Computer Interface (BCI) и её интеграции с веб-приложениями. Первые эксперименты и будущее.',
    author: 'Анна Смирнова',
    date: '18 февраля 2026',
    readTime: 10,
    category: 'AI',
    icon: '🧠'
  },
  {
    slug: 'ai-code-assistants-2026',
    title: 'AI-ассистенты программиста: Copilot, Codeium и будущее парного программирования',
    excerpt: 'Сравнение лучших AI-инструментов для разработчиков в 2026 году. Как они меняют процесс написания кода.',
    author: 'Максим Петров',
    date: '15 февраля 2026',
    readTime: 7,
    category: 'AI',
    icon: '👨‍💻'
  }
];

// Известные мировые компании (для блока "Нам доверяют")
const trustedCompanies = [
  { name: 'Microsoft', logo: 'microsoft.svg', width: 140, height: 40 },
  { name: 'Google', logo: 'google.svg', width: 120, height: 40 },
  { name: 'Amazon', logo: 'amazon.svg', width: 120, height: 40 },
  { name: 'IBM', logo: 'ibm.svg', width: 100, height: 40 },
  { name: 'Oracle', logo: 'oracle.svg', width: 120, height: 40 },
  { name: 'SAP', logo: 'sap.svg', width: 100, height: 40 },
  { name: 'Salesforce', logo: 'salesforce.svg', width: 120, height: 40 },
  { name: 'Adobe', logo: 'adobe.svg', width: 120, height: 40 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      {/* Hero секция с глобальным позиционированием */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                Глобальная IT-инженерия с 2010 года
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Мы — глобальная{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  IT-компания
                </span>{' '}
                полного цикла
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Создаем корпоративные и потребительские приложения с глубоким пониманием вашей отрасли и рынка.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Чем мы можем помочь?
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  Наши услуги
                </Link>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Мы на связи 24/7
              </p>
            </div>
            
            {/* Глобальная карта/статистика */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-lg">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                  <div className="text-gray-600 dark:text-gray-300">лет на рынке</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-lg">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">750+</div>
                  <div className="text-gray-600 dark:text-gray-300">проектов</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-lg">
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">350+</div>
                  <div className="text-gray-600 dark:text-gray-300">клиентов</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-lg">
                  <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">25+</div>
                  <div className="text-gray-600 dark:text-gray-300">экспертов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Наши услуги - основной блок */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Наши{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                услуги
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Мы создаем цифровые решения любой сложности, объединяя мультидисциплинарную технологическую экспертизу с отраслевым опытом
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all"
                >
                  Подробнее
                  <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
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
                Наши{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  проекты
                </span>
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
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`h-2 bg-gradient-to-r ${study.color}`}></div>
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
                      {study.stats.map((stat, i) => (
                        <div key={i} className="text-sm">
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
              Отрасли, которые мы{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                трансформируем
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Глубокая отраслевая экспертиза в различных секторах экономики
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{industry.projects}+ проектов</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок "Нам доверяют мировые компании" - НОВЫЙ БЛОК */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Нам доверяют{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ведущие компании
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Мы гордимся сотрудничеством с мировыми лидерами индустрии
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {trustedCompanies.map((company, idx) => (
              <div
                key={idx}
                className="group relative w-full flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Плейсхолдер для логотипа (пока без изображений) */}
                <div className="text-gray-400 dark:text-gray-500 font-semibold text-lg opacity-50 group-hover:opacity-70 transition-opacity">
                  {company.name}
                </div>
                {/* Когда будут реальные логотипы:
                <Image
                  src={`/logos/${company.logo}`}
                  alt={company.name}
                  width={company.width}
                  height={company.height}
                  className="opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                />
                */}
              </div>
            ))}
          </div>

          {/* Дополнительная статистика доверия */}
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
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
            {latestPosts.map((post, idx) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative flex items-center justify-center">
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

      {/* Крупные достижения */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">$20+ млрд</div>
              <div className="text-white/80">инвестиционных портфелей под управлением</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">20 млн+</div>
              <div className="text-white/80">пользователей AI-рекомендаций</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">10x</div>
              <div className="text-white/80">быстрее анализ фармацевтических данных</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">$50K</div>
              <div className="text-white/80">экономии ежегодно с DevOps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Контактная форма */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Свяжитесь{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                с нами
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Обсудим ваш проект. Мы на связи 24/7.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
              <textarea
                rows={4}
                placeholder="Чем мы можем помочь?"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// Данные для компонентов
const services = [
  {
    icon: "💻",
    title: "Разработка приложений",
    description: "Создаем цифровые решения любой сложности, объединяя мультидисциплинарную технологическую экспертизу с отраслевым опытом.",
    link: "/services/development"
  },
  {
    icon: "🔒",
    title: "Безопасность приложений",
    description: "Обеспечиваем корпоративную безопасность через аудит, тестирование и безопасные практики разработки.",
    link: "/services/security"
  },
  {
    icon: "📊",
    title: "Аналитика данных",
    description: "От разработки MVP до пост-релизной поддержки, помогаем вывести продукты на рынок быстро и без ошибок.",
    link: "/services/analytics"
  },
  {
    icon: "🤖",
    title: "Интеллектуальная автоматизация",
    description: "Интегрируем корпоративные системы для создания взаимосвязанных экосистем бесшовного управления.",
    link: "/services/automation"
  },
  {
    icon: "🔄",
    title: "Интеграция систем",
    description: "Делаем тестирование частью процесса разработки, а также предлагаем как отдельную услугу.",
    link: "/services/integration"
  },
  {
    icon: "✅",
    title: "QA и тестирование",
    description: "Комплексное обеспечение качества и тестирование ваших приложений.",
    link: "/services/qa"
  }
];

const caseStudies = [
  {
    color: "from-blue-500 to-purple-500",
    category: "Финтех",
    client: "TradeStops",
    title: "Платформа управления инвестиционным портфелем",
    description: "Веб-платформа для управления инвестиционными портфелями обслуживает 30 000+ инвесторов с продвинутой аналитикой и управлением рисками.",
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
    description: "AI-решения включают predictive BI платформу, систему рекомендаций в реальном времени и распознавание товаров.",
    stats: [
      { value: "8%", label: "выше конверсия" },
      { value: "50%", label: "снижение затрат" }
    ],
    link: "/portfolio/ai-retail"
  }
];

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