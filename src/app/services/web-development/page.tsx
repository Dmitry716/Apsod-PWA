import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Веб-разработка | Современные технологии и стек',
  description: 'Профессиональная веб-разработка на Next.js, React, Vue, Node.js. Создаем корпоративные сайты, интернет-магазины, веб-приложения и CRM системы.',
  keywords: 'веб-разработка, next.js, react, vue, node.js, typescript, tailwind css, разработка сайтов',
}

export default function WebDevelopmentPage() {
  const technologies = [
    {
      category: 'Frontend',
      icon: '🎨',
      description: 'Современные библиотеки и фреймворки для создания пользовательских интерфейсов',
      stacks: [
        {
          name: 'Next.js 15+',
          logo: '▲',
          description: 'React фреймворк для production с серверным рендерингом, статической генерацией и отличным SEO',
          features: ['Server Components', 'App Router', 'API Routes', 'Image Optimization'],
          useCases: ['Корпоративные сайты', 'Интернет-магазины', 'Блоги', 'Сложные веб-приложения']
        },
        {
          name: 'React 19+',
          logo: '⚛️',
          description: 'Библиотека для создания динамических пользовательских интерфейсов с компонентным подходом',
          features: ['Hooks', 'Server Components', 'Concurrent Rendering', 'Suspense'],
          useCases: ['SPA приложения', 'Интерактивные дашборды', 'Социальные сети', 'Админ-панели']
        },
        {
          name: 'Vue 3+',
          logo: '🟢',
          description: 'Прогрессивный фреймворк для создания пользовательских интерфейсов с простым синтаксисом',
          features: ['Composition API', 'Pinia', 'Vue Router', 'Vite'],
          useCases: ['Легкие веб-приложения', 'Прототипы', 'Корпоративные порталы', 'SPA']
        },
        {
          name: 'TypeScript',
          logo: '📘',
          description: 'Строго типизированное расширение JavaScript для надежной и масштабируемой разработки',
          features: ['Статическая типизация', 'Интерфейсы', 'Generic', 'Advanced types'],
          useCases: ['Крупные проекты', 'Библиотеки', 'Командная разработка', 'Миссия-критичные системы']
        },
        {
          name: 'Tailwind CSS',
          logo: '🎨',
          description: 'Утилитарный CSS-фреймворк для быстрой и кастомизируемой верстки',
          features: ['Utility-first', 'JIT компиляция', 'Темная тема', 'Адаптивность'],
          useCases: ['Современный дизайн', 'Быстрый прототип', 'Адаптивные сайты', 'UI библиотеки']
        }
      ]
    },
    {
      category: 'Backend',
      icon: '⚙️',
      description: 'Надежные серверные технологии для обработки бизнес-логики и данных',
      stacks: [
        {
          name: 'Node.js',
          logo: '🟢',
          description: 'Серверная платформа на JavaScript/V8 для создания масштабируемых приложений',
          features: ['Event-driven', 'NPM экосистема', 'Микросервисы', 'Real-time приложения'],
          useCases: ['REST API', 'GraphQL серверы', 'Real-time чаты', 'Стриминговые сервисы']
        },
        {
          name: 'NestJS',
          logo: '🐱',
          description: 'Прогрессивный Node.js фреймворк для создания эффективных и масштабируемых серверных приложений',
          features: ['Модульная архитектура', 'Dependency Injection', 'WebSockets', 'GraphQL'],
          useCases: ['Корпоративные API', 'Микросервисы', 'Сложные бэкенд системы']
        },
        {
          name: 'Express.js',
          logo: '🚂',
          description: 'Минималистичный и гибкий веб-фреймворк для Node.js',
          features: ['Middleware', 'Маршрутизация', 'REST API', 'Большое сообщество'],
          useCases: ['REST API', 'MVP', 'Прототипы', 'Микросервисы']
        },
        {
          name: 'Python (Django)',
          logo: '🐍',
          description: 'Высокоуровневый Python фреймворк для быстрой разработки с "батарейками в комплекте"',
          features: ['ORM', 'Admin панель', 'Аутентификация', 'Маршрутизация'],
          useCases: ['Сложные веб-приложения', 'Порталы', 'API', 'CMS']
        }
      ]
    },
    {
      category: 'Базы данных',
      icon: '🗄️',
      description: 'Современные решения для хранения и обработки данных',
      stacks: [
        {
          name: 'PostgreSQL',
          logo: '🐘',
          description: 'Мощная объектно-реляционная база данных с открытым исходным кодом',
          features: ['ACID', 'JSON поддержка', 'Репликация', 'Full-text search'],
          useCases: ['Сложные транзакции', 'Геоданные', 'Аналитика', 'Крупные проекты']
        },
        {
          name: 'MongoDB',
          logo: '🍃',
          description: 'Документоориентированная NoSQL база данных для гибкого хранения данных',
          features: ['Документная модель', 'Масштабирование', 'Ad-hoc запросы', 'Aggregation'],
          useCases: ['Big Data', 'Каталоги', 'Real-time данные', 'Content management']
        },
        {
          name: 'MySQL',
          logo: '🐬',
          description: 'Популярная реляционная база данных для веб-приложений',
          features: ['Надежность', 'Производительность', 'Репликация', 'Транзакции'],
          useCases: ['Интернет-магазины', 'CMS', 'Блоги', 'Средние проекты']
        },
        {
          name: 'Redis',
          logo: '🔴',
          description: 'Высокопроизводительное хранилище данных в памяти для кэширования и real-time задач',
          features: ['In-memory', 'Кэширование', 'Pub/Sub', 'Очереди'],
          useCases: ['Кэширование', 'Сессии', 'Очереди задач', 'Real-time лидерборды']
        }
      ]
    },
    {
      category: 'DevOps и инфраструктура',
      icon: '☁️',
      description: 'Инструменты для развертывания и управления инфраструктурой',
      stacks: [
        {
          name: 'Docker',
          logo: '🐳',
          description: 'Платформа для контейнеризации приложений и их зависимостей',
          features: ['Контейнеры', 'Docker Compose', 'Образы', 'Масштабирование'],
          useCases: ['Микросервисы', 'CI/CD', 'Локальная разработка', 'Продакшен деплой']
        },
        {
          name: 'Kubernetes',
          logo: '⎈',
          description: 'Система для оркестрации контейнеров и управления кластерами',
          features: ['Автоматическое масштабирование', 'Self-healing', 'Service discovery', 'Load balancing'],
          useCases: ['Крупные инфраструктуры', 'Микросервисы', 'Высоконагруженные системы']
        },
        {
          name: 'AWS/GCP/Azure',
          logo: '☁️',
          description: 'Облачные платформы для хостинга и масштабирования приложений',
          features: ['Compute', 'Storage', 'Databases', 'Serverless'],
          useCases: ['Облачная инфраструктура', 'Serverless', 'Масштабирование', 'Глобальный охват']
        },
        {
          name: 'GitHub Actions',
          logo: '🔄',
          description: 'Система непрерывной интеграции и доставки (CI/CD)',
          features: ['Автоматизация сборки', 'Тестирование', 'Деплой', 'Интеграции'],
          useCases: ['Автоматический деплой', 'Тестирование', 'Проверка кода', 'Мониторинг']
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Веб-{' '}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                разработка
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Создаем современные веб-приложения на передовом стеке технологий
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
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
        </div>
      </section>

      {/* Технологические стеки */}
      {technologies.map((category, idx) => (
        <section key={idx} className="py-16 even:bg-white dark:even:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">{category.icon}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {category.category}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.stacks.map((stack, stackIdx) => (
                <div
                  key={stackIdx}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-xl flex items-center justify-center shrink-0">
                        {stack.logo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {stack.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {stack.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ключевые возможности:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stack.features.map((feature, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Для чего используем:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stack.useCases.map((useCase, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Преимущества работы с нами */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Современный стек</h3>
              <p className="text-white/80">Используем только актуальные технологии</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Высокая производительность</h3>
              <p className="text-white/80">Оптимизируем код для максимальной скорости</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
              <p className="text-white/80">Защита от современных угроз</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Готовы начать проект?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Расскажите нам о ваших задачах, и мы подберем оптимальный технологический стек
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Получить консультацию
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}