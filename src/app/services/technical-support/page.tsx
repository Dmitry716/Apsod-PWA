import Link from 'next/link'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { buildServiceMetadata, SITE_URL } from '../../lib/seo'

export const metadata = buildServiceMetadata('technical-support')

export default function TechnicalSupportPage() {
  const features = [
    {
      title: 'Обновление контента и правки',
      description: 'Добавление новостей, правка текстов, замена изображений и любые изменения на сайте по вашему запросу.',
      icon: '✏️',
    },
    {
      title: 'Мониторинг доступности',
      description: 'Отслеживание работоспособности сайта, уведомления о сбоях и оперативное устранение проблем.',
      icon: '📡',
    },
    {
      title: 'Резервное копирование',
      description: 'Регулярные бэкапы данных и кода, возможность восстановления при сбоях или ошибках.',
      icon: '💾',
    },
    {
      title: 'Обновление зависимостей и безопасности',
      description: 'Актуализация npm-пакетов, Node.js, React/Next.js и серверных библиотек. Закрытие уязвимостей и стабильные релизы.',
      icon: '🔄',
    },
    {
      title: 'Консультации и доработки',
      description: 'Консультации по развитию сайта, доработка функционала и интеграции по запросу.',
      icon: '💬',
    },
  ]

  const supportedStacks = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'NestJS', 'REST API', 'GraphQL'],
    },
    {
      category: 'Базы данных',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
    },
    {
      category: 'Инфраструктура',
      items: ['Vercel', 'Docker', 'CI/CD', 'Мониторинг'],
    },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Техническая поддержка сайтов',
    description: 'Техподдержка сайтов на современном JavaScript-стеке: React, Next.js, Node.js, MongoDB, PostgreSQL. Обновление контента, мониторинг, резервное копирование и доработки.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Belarus' },
    url: `${SITE_URL}/services/technical-support`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: 'Техническая поддержка сайтов', item: `${SITE_URL}/services/technical-support` },
    ],
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ServiceBreadcrumbs service="technical-support" />
      <SeoJsonLd data={[serviceSchema, breadcrumbSchema]} />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-slate-200 dark:bg-slate-800/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 rounded-full mb-6">
              <span className="w-2 h-2 bg-slate-600 rounded-full animate-pulse" />
              Поддержка и сопровождение сайтов
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Техническая{' '}
              <span className="text-slate-600 dark:text-slate-400">поддержка сайтов</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Сопровождение сайтов на React, Next.js, Node.js, MongoDB и PostgreSQL
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Заказать поддержку
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-slate-600 transition-all"
              >
                Все услуги
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Что входит в техническую поддержку
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
              Регулярное сопровождение сайта избавляет от сбоев, устаревшего контента и рисков потери данных.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Поддерживаемые технологии
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 text-center max-w-2xl mx-auto">
              Работаем с современными JavaScript-стеками для веб-приложений и корпоративных сайтов.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportedStacks.map((stack) => (
                <div
                  key={stack.category}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{stack.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 rounded-full text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-r from-slate-600 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Нужна поддержка вашего сайта?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Оставьте заявку — подберём оптимальный тариф и режим сопровождения
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Связаться с нами
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
          <ServiceFaqBlock service="technical-support" />
</div>
  )
}
