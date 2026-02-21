import { Metadata } from 'next'
import { generateSEOMetadata } from '../lib/seo'  // ← исправлено
import Link from 'next/link'

// Метаданные для SEO
export const metadata: Metadata = generateSEOMetadata({
  title: 'Услуги',
  description: 'Профессиональные услуги по веб-разработке, созданию мобильных приложений и SEO продвижению в Витебске и Минске.',
  keywords: ['веб-разработка', 'мобильные приложения', 'SEO', 'UI/UX дизайн', 'разработка сайтов'],
  path: '/services',
})

// Данные об услугах
const servicesData = [
  {
    id: 1,
    title: 'Веб-разработка',
    description: 'Создаем современные сайты, интернет-магазины и веб-приложения под ключ.',
    icon: '🌐',
    features: [
      'Корпоративные сайты',
      'Интернет-магазины',
      'Лендинги',
      'Веб-приложения',
      'CRM системы'
    ],
    price: 'от 2000 BYN',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: 'Мобильные приложения',
    description: 'Разрабатываем нативные и кроссплатформенные приложения для iOS и Android.',
    icon: '📱',
    features: [
      'iOS приложения',
      'Android приложения',
      'React Native',
      'Flutter',
      'UI/UX дизайн'
    ],
    price: 'от 3000 BYN',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    title: 'SEO продвижение',
    description: 'Выводим сайты в топ поисковых систем и увеличиваем органический трафик.',
    icon: '📈',
    features: [
      'Аудит сайта',
      'Оптимизация контента',
      'Внешняя оптимизация',
      'Аналитика',
      'Работа с поведенческими'
    ],
    price: 'от 500 BYN/мес',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 4,
    title: 'UI/UX дизайн',
    description: 'Создаем удобные и красивые интерфейсы, которые нравятся пользователям.',
    icon: '🎨',
    features: [
      'Прототипирование',
      'Веб-дизайн',
      'Дизайн приложений',
      'Анимация интерфейсов',
      'Дизайн-системы'
    ],
    price: 'от 1500 BYN',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 5,
    title: 'Поддержка проектов',
    description: 'Обеспечиваем техническую поддержку и развитие существующих проектов.',
    icon: '⚙️',
    features: [
      'Техническая поддержка',
      'Обновление контента',
      'Мониторинг 24/7',
      'Резервное копирование',
      'Безопасность'
    ],
    price: 'от 300 BYN/мес',
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 6,
    title: 'Аудит и оптимизация',
    description: 'Проводим комплексный аудит и оптимизацию существующих проектов.',
    icon: '🔍',
    features: [
      'Технический аудит',
      'SEO аудит',
      'Оптимизация скорости',
      'Юзабилити аудит',
      'Анализ конкурентов'
    ],
    price: 'от 800 BYN',
    color: 'from-red-500 to-red-600'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero секция */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Наши{' '}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                услуги
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Мы предлагаем полный спектр услуг для развития вашего бизнеса в digital-среде
            </p>
            
            {/* Быстрые ссылки */}
            <div className="flex flex-wrap gap-3 justify-center">
              {servicesData.map(service => (
                <a
                  key={service.id}
                  href={`#service-${service.id}`}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-700 dark:text-gray-200 text-sm"
                >
                  {service.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Список услуг */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {servicesData.map((service) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden scroll-mt-24"
              >
                <div className={`bg-linear-to-r ${service.color} p-6 text-white`}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{service.icon}</span>
                      <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-semibold">
                      {service.price}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Что входит:
                      </h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Для кого подходит:
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Идеально подходит для малого и среднего бизнеса, стартапов и крупных компаний.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        Заказать услугу
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Готовы начать проект?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами сегодня и получите бесплатную консультацию
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Связаться с нами
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}