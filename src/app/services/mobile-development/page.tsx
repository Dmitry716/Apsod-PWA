import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Мобильная разработка | Нативные и кроссплатформенные приложения',
  description: 'Разработка мобильных приложений на React Native, Flutter, Swift (iOS) и Kotlin (Android). Создаем приложения для бизнеса, стартапов и корпораций.',
  keywords: 'мобильная разработка, react native, flutter, ios, swift, android, kotlin, мобильные приложения',
}

export default function MobileDevelopmentPage() {
  const technologies = [
    {
      category: 'Кроссплатформенная разработка',
      icon: '🔄',
      description: 'Одна кодовая база для iOS и Android — быстрый выход на рынок и экономия ресурсов',
      stacks: [
        {
          name: 'React Native',
          logo: '⚛️',
          description: 'Фреймворк от Meta для создания нативных мобильных приложений на JavaScript/TypeScript',
          features: ['Hot Reload', 'Native компоненты', 'Reanimated', 'Hermes engine'],
          useCases: ['Бизнес-приложения', 'Социальные сети', 'Маркетплейсы', 'Стартапы'],
          pros: ['Огромное сообщество', 'Быстрая разработка', 'Интеграция с React'],
          cons: ['Медленнее на сложных анимациях']
        },
        {
          name: 'Flutter',
          logo: '🦋',
          description: 'UI-фреймворк от Google с собственной графической библиотекой для красивого интерфейса',
          features: ['Hot Reload', 'Material You', 'Cupertino', 'Высокая производительность'],
          useCases: ['MVP', 'Приложения с кастомным дизайном', 'Финтех'],
          pros: ['Высокая производительность', 'Единый дизайн', 'Отличная документация'],
          cons: ['Большой размер приложения']
        }
      ]
    },
    {
      category: 'Нативная iOS разработка',
      icon: '🍎',
      description: 'Максимальная производительность и полный доступ к возможностям Apple экосистемы',
      stacks: [
        {
          name: 'Swift',
          logo: '🕊️',
          description: 'Современный язык программирования от Apple для создания приложений под iOS, iPadOS, macOS',
          features: ['Protocol-Oriented', 'Value Types', 'Concurrency', 'SwiftUI'],
          useCases: ['iOS приложения', 'macOS приложения', 'watchOS приложения'],
          pros: ['Безопасность типов', 'Высокая производительность', 'Современный синтаксис'],
          cons: ['Только для Apple платформ']
        }
      ]
    },
    {
      category: 'Нативная Android разработка',
      icon: '🤖',
      description: 'Максимальная оптимизация под устройства Android и доступ ко всем функциям системы',
      stacks: [
        {
          name: 'Kotlin',
          logo: '🎯',
          description: 'Современный язык программирования для Android разработки от JetBrains',
          features: ['Null safety', 'Coroutines', 'Data classes', 'Compose'],
          useCases: ['Android приложения', 'Google Play', 'Автомобили Android Auto'],
          pros: ['Лаконичность', 'Безопасность', 'Coroutines'],
          cons: ['Медленнее Java в некоторых задачах']
        }
      ]
    },
    {
      category: 'Бэкенд для мобильных приложений',
      icon: '☁️',
      description: 'Серверная часть для обеспечения работы мобильных приложений',
      stacks: [
        {
          name: 'Firebase',
          logo: '🔥',
          description: 'Платформа Google для быстрого создания бэкенда мобильных приложений',
          features: ['Realtime Database', 'Authentication', 'Cloud Functions', 'Push'],
          useCases: ['Стартапы', 'MVP', 'Приложения с real-time'],
          pros: ['Быстрый старт', 'Масштабирование', 'Множество сервисов'],
          cons: ['Привязка к Google']
        },
        {
          name: 'Node.js',
          logo: '🟢',
          description: 'Гибкое серверное решение для кастомной логики приложений',
          features: ['REST API', 'GraphQL', 'WebSockets', 'JWT'],
          useCases: ['Кастомные решения', 'Микросервисы', 'Real-time приложения'],
          pros: ['Гибкость', 'JavaScript/TypeScript', 'Огромное сообщество'],
          cons: ['Требуется разработка']
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
              Мобильная{' '}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                разработка
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Создаем нативные и кроссплатформенные приложения для iOS и Android
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Обсудить приложение
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

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Плюсы:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
                        {stack.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Минусы:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
                        {stack.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Процесс разработки */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Как мы создаем мобильные приложения
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Анализ и прототип</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Изучаем задачу, создаем прототип</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Дизайн</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Разрабатываем UI/UX дизайн</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Разработка</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Пишем код и интеграции</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Релиз и поддержка</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Публикация в сторах</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Есть идея приложения?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Расскажите нам о вашей идее, и мы подберем оптимальную технологию
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
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