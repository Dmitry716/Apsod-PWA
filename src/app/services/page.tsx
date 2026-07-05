import Link from 'next/link'
import SeoJsonLd from '../components/SeoJsonLd'
import {
  buildPageMetadata,
  generateBreadcrumbSchema,
  generateItemListSchema,
  SITE_URL,
} from '../lib/seo'

export const metadata = buildPageMetadata({
  title: 'Услуги — разработка сайтов и digital в РФ и Беларуси',
  description:
    'IT-услуги APSOD: сайты, интернет-магазины, мобильные приложения, SEO в Яндексе и Google, CRM, ERP и техподдержка. Витебск, Москва, Минск, регионы.',
  path: '/services',
  keywords: [
    'услуги IT Москва',
    'разработка сайтов Россия',
    'SEO продвижение',
    'мобильные приложения',
    'техподдержка сайтов',
    'услуги IT Беларусь',
  ],
})

const services = [
  {
    id: 1,
    title: 'Веб-разработка',
    description: 'Сайты и веб-приложения по enterprise-процессу: анализ, экспертиза, Agile, QA и DevOps',
    icon: '🌐',
    fullDescription: 'Разрабатываем корпоративные сайты, интернет-магазины и веб-приложения по 8-этапному процессу крупных IT-компаний: Discovery, технический аудит, архитектура, UX/UI, Agile-разработка, QA, DevOps и поддержка.',
    features: [
      'Корпоративные сайты и порталы',
      'Интернет-магазины с каталогами',
      'Веб-приложения и дашборды',
      'Интеграция с CRM и ERP',
      'Админ-панели для управления'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB'],
    link: '/services/web-development',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 2,
    title: 'Мобильные приложения',
    description: 'iOS и Android: от Discovery и экспертизы до публикации в сторах',
    icon: '📱',
    fullDescription: 'Полный цикл mobile-разработки: бизнес-анализ, техническая экспертиза, проектирование, UX/UI, Agile-спринты, QA на реальных устройствах, релиз в App Store и Google Play, post-launch поддержка.',
    features: [
      'Нативные iOS приложения (Swift)',
      'Нативные Android приложения (Kotlin)',
      'Кроссплатформенные (React Native, Flutter)',
      'Интеграция с бэкендом',
      'Публикация в App Store и Google Play'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    link: '/services/mobile-development',
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 3,
    title: 'PWA разработка',
    description: 'Создаем прогрессивные веб-приложения, которые работают как нативные и устанавливаются на телефон',
    icon: '📲',
    fullDescription: 'Progressive Web Apps (PWA) — гибрид веб-сайта и мобильного приложения. Установка на устройство, работа офлайн, push-уведомления, высокая скорость загрузки.',
    features: [
      'Установка на главный экран',
      'Работа без интернета',
      'Push-уведомления',
      'Мгновенная загрузка',
      'Автоматические обновления'
    ],
    technologies: ['Next.js', 'Service Workers', 'Manifest', 'Workbox'],
    link: '/services/pwa-development',
    color: 'from-indigo-600 to-blue-500'
  },
  {
    id: 4,
    title: 'SEO продвижение',
    description: 'Выводим сайты в топ поисковых систем и увеличиваем органический трафик',
    icon: '📈',
    fullDescription: 'Комплексное продвижение сайтов в поисковых системах. Работаем с контентом, технической оптимизацией и внешними факторами.',
    features: [
      'Аудит сайта и анализ конкурентов',
      'Техническая оптимизация',
      'Работа с контентом',
      'Внешняя оптимизация',
      'Аналитика и отчетность'
    ],
    technologies: ['SEO Audit', 'Link Building', 'Content Marketing', 'Analytics'],
    link: '/services/seo',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    id: 5,
    title: 'CRM системы',
    description: 'Внедряем и разрабатываем кастомные CRM системы для управления бизнесом и клиентами',
    icon: '🤝',
    fullDescription: 'Автоматизируем продажи и взаимодействие с клиентами. Внедряем готовые решения или разрабатываем CRM с нуля под ваши бизнес-процессы.',
    features: [
      'Внедрение Salesforce, Bitrix24, AmoCRM',
      'Разработка кастомных CRM',
      'Интеграция с телефонией и почтой',
      'Отчеты и аналитика продаж',
      'Мобильный доступ для менеджеров'
    ],
    technologies: ['Salesforce', 'Bitrix24', 'AmoCRM', 'Custom CRM'],
    link: '/services/crm',
    color: 'from-green-600 to-emerald-500'
  },
  {
    id: 6,
    title: 'ERP системы',
    description: 'Комплексные решения для управления производством, складом и финансами',
    icon: '⚙️',
    fullDescription: 'Оптимизируем управление ресурсами предприятия. Внедряем ERP-системы или разрабатываем индивидуальные решения под ваши задачи.',
    features: [
      'Управление производством и запасами',
      'Складской учет и логистика',
      'Финансовое планирование',
      'Интеграция с 1С и бухгалтерией',
      'Отчетность и аналитика'
    ],
    technologies: ['1С', 'SAP', 'Oracle', 'Custom ERP'],
    link: '/services/erp',
    color: 'from-orange-600 to-red-500'
  },
  {
    id: 7,
    title: 'UI/UX дизайн',
    description: 'Создаем удобные и красивые интерфейсы, которые нравятся пользователям',
    icon: '🎨',
    fullDescription: 'Разрабатываем дизайн сайтов и приложений, ориентированный на пользователя. Проводим исследования и тестирования для создания лучшего опыта.',
    features: [
      'Прототипирование и дизайн-концепции',
      'Дизайн сайтов и мобильных приложений',
      'UI-киты и дизайн-системы',
      'Анимация интерфейсов',
      'Юзабилити-тестирование'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'ProtoPie'],
    link: '/services/ui-ux',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 8,
    title: 'Техническая поддержка сайтов',
    description: 'Сопровождение сайтов на React, Next.js и Node.js: контент, мониторинг, бэкапы и доработки',
    icon: '🛠️',
    fullDescription: 'Техподдержка сайтов на современном стеке: React, Next.js, Node.js, MongoDB, PostgreSQL. Обновления, исправление ошибок, резервные копии, мониторинг и доработки.',
    features: [
      'Обновление контента и правки на сайте',
      'Мониторинг доступности и устранение сбоев',
      'Резервное копирование и восстановление',
      'Обновление npm-зависимостей и безопасности',
      'Консультации и доработки по запросу'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL'],
    link: '/services/technical-support',
    color: 'from-slate-600 to-slate-800'
  }
];

export default function ServicesPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Главная', path: '/' },
    { name: 'Услуги', path: '/services' },
  ])
  const servicesList = generateItemListSchema({
    name: 'IT-услуги APSOD',
    items: services.map((service) => ({
      name: service.title,
      url: `${SITE_URL}${service.link}`,
      description: service.description,
    })),
  })

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SeoJsonLd data={[breadcrumb, servicesList]} />
      
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Наши{' '}
              <span className="text-blue-600 dark:text-blue-400">
                услуги
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Комплексные решения для вашего бизнеса: от разработки до продвижения
            </p>
          </div>
        </div>
      </section>

      {/* Детальный список услуг */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className={`bg-linear-to-r ${service.color} p-8 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{service.icon}</span>
                    <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-lg text-white/90 max-w-3xl">
                    {service.fullDescription}
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Что мы делаем:
                      </h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                            <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Используемые технологии:
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={service.link}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all group"
                      >
                        Подробнее об услуге
                        <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Преимущества */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Современные технологии</h3>
              <p className="text-white/80">Используем актуальный стек 2025-2026</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Быстрый старт</h3>
              <p className="text-white/80">MVP за 2-3 месяца</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
              <p className="text-white/80">Защита данных и кода</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-white/80">Всегда на связи</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Нужна консультация?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Расскажите нам о ваших задачах, и мы подберем оптимальное решение
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl"
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