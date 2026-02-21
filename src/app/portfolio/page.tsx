import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Портфолио | APSOD',
  description: 'Наши лучшие проекты для клиентов из США: веб-сайты и мобильные приложения, созданные с любовью к технологиям и дизайну.',
}

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: 'Sparkite — реабилитационное приложение',
      category: 'Мобильное приложение',
      location: 'Нью-Йорк, США',
      year: '2024',
      description: 'Приложение для бывших пациентов реабилитационных центров. Помогает вернуться к здоровому образу жизни через постановку целей и ежедневные чекины. Сотрудники центров могут наблюдать за прогрессом через веб-панель. [citation:1]',
      image: '/portfolio/sparkite.jpg',
      color: 'from-blue-600 to-cyan-500',
      stats: ['87% удержание', '5+ центров', '500+ пользователей'],
      features: ['Цели и прогресс', 'Ежедневные чекины', 'Панель для сотрудников', 'Push-уведомления'],
      link: '/portfolio/sparkite',
      icon: '🧘'
    },
    {
      id: 2,
      title: 'Buzz — движ для мероприятий',
      category: 'Мобильное приложение',
      location: 'Небольшие города США',
      year: '2025',
      description: 'Приложение для поиска и организации ивентов в небольших американских городах. Создано с нуля: от логотипа и айдентики до разработки MVP. Яркий дизайн в стиле MTV и уникальная система рекомендаций. [citation:4]',
      image: '/portfolio/buzz.jpg',
      color: 'from-purple-600 to-pink-500',
      stats: ['50+ событий/неделю', '3000+ пользователей', '4.8★ в App Store'],
      features: ['Создание ивентов', 'Лента рекомендаций', 'Групповые чаты', 'Геолокация'],
      link: '/portfolio/buzz',
      icon: '🎉'
    },
    {
      id: 3,
      title: 'Erin Wesley — портфолио оператора',
      category: 'Веб-сайт',
      location: 'Лос-Анджелес, США',
      year: '2023',
      description: 'Сайт-портфолио для оператора-постановщика, работавшей над Marvel ("Шан-Чи"), клипами Криса Брауна и рекламой Nike. Уникальные GLSL-анимации и кастомный скролл для идеального просмотра работ. [citation:8]',
      image: '/portfolio/erin.jpg',
      color: 'from-amber-600 to-orange-500',
      stats: ['6 уникальных галерей', 'GLSL анимации', 'Премия Tagline Awards'],
      features: ['Кастомный скролл', 'Видео-галереи', 'GLSL эффекты', 'Адаптивность'],
      link: '/portfolio/erin',
      icon: '🎬'
    },
    {
      id: 4,
      title: 'VSE NASHI — сообщество русскоязычных',
      category: 'Мобильное приложение',
      location: 'США',
      year: '2025',
      description: 'Социальная платформа для русскоязычной диаспоры в США. В одном приложении: работа, знакомства, услуги, события и общение. Поддержка геолокации и удобный интерфейс. [citation:3]',
      image: '/portfolio/vsenashi.jpg',
      color: 'from-emerald-600 to-teal-500',
      stats: ['10K+ загрузок', '500+ вакансий', '1000+ событий'],
      features: ['Лента вакансий', 'Знакомства поблизости', 'Доска услуг', 'Календарь событий'],
      link: '/portfolio/vsenashi',
      icon: '🌎'
    },
    {
      id: 5,
      title: 'Vigbo — конструктор сайтов',
      category: 'Веб-платформа',
      location: 'Уэстон, Флорида',
      year: '2024',
      description: 'Готовое решение для творцов и предпринимателей. Конструктор сайтов с красивыми дизайнами и система клиентских галерей для фотографов. Удобная продажа цифровых и физических товаров. [citation:2]',
      image: '/portfolio/vigbo.jpg',
      color: 'from-indigo-600 to-blue-500',
      stats: ['50K+ сайтов', '182+ подписчика', '12 лет на рынке'],
      features: ['Конструктор сайтов', 'Клиентские галереи', 'Интернет-магазин', 'Цифровые товары'],
      link: '/portfolio/vigbo',
      icon: '✨'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Наши{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                проекты
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Мы создаем цифровые продукты для клиентов по всему миру, от Нью-Йорка до Лос-Анджелеса
            </p>
            
            {/* Фильтры */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Все проекты
              </button>
              <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm">
                Веб-сайты
              </button>
              <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm">
                Мобильные приложения
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Сетка портфолио */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Градиентный фон */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Изображение (заглушка) */}
                <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl transform group-hover:scale-110 transition-transform duration-500">
                      {project.icon}
                    </span>
                  </div>
                </div>

                {/* Контент */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {project.category}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h2>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full text-gray-600 dark:text-gray-300">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{project.location}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Технологии/фичи */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-300">
                        +{project.features.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Статистика */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat}</div>
                      </div>
                    ))}
                  </div>

                  {/* Кнопка */}
                  <Link
                    href={project.link}
                    className={`inline-flex items-center text-${project.color.split(' ')[0].replace('from-', '')}-600 font-medium group-hover:gap-3 transition-all`}
                  >
                    <span>Смотреть кейс</span>
                    <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Хотите такой же проект?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Расскажите нам о вашей идее, и мы воплотим её в жизнь с тем же уровнем качества и внимания к деталям
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Обсудить проект
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}