import Link from 'next/link'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { buildServiceMetadata, SITE_URL } from '../../lib/seo'
import { formatDualPrice } from '../../lib/currency'

export const metadata = buildServiceMetadata('crm')

export default function CRMPage() {
  const features = [
    {
      title: "Автоматизация продаж",
      description: "Управляйте воронкой продаж, контролируйте сделки на каждом этапе, автоматизируйте рутинные задачи менеджеров.",
    },
    {
      title: "Управление клиентской базой",
      description: "Вся история взаимодействия с клиентами в одном месте: звонки, письма, встречи, документы.",
    },
    {
      title: "Интеграция с телефонией",
      description: "Звонки через CRM, запись разговоров, автоопределение клиента при входящем звонке.",
    },
    {
      title: "Email-маркетинг",
      description: "Создание email-рассылок, отслеживание открытий и кликов, автоматические триггерные письма.",
    },
    {
      title: "Отчеты и аналитика",
      description: "Настраиваемые дашборды, отчеты по продажам, прогнозирование и анализ эффективности.",
    },
    {
      title: "Мобильный доступ",
      description: "Работайте с CRM из любой точки мира через мобильное приложение или адаптивную веб-версию.",
    }
  ];

  const solutions = [
    {
      name: "Битрикс24",
      description: "Самая популярная CRM в СНГ. Подходит для малого и среднего бизнеса.",
      features: ["Бесплатный тариф", "Воронка продаж", "Телефония", "Задачи и проекты"],
      price: formatDualPrice(0, { perMonth: true }),
    },
    {
      name: "AmoCRM",
      description: "Простая и понятная CRM для активных продаж. Фокус на воронке и сделках.",
      features: ["Воронка продаж", "Интеграция с WhatsApp", "Виджеты", "API"],
      price: formatDualPrice(50, { perMonth: true }),
    },
    {
      name: "Salesforce",
      description: "Мировой лидер для крупного бизнеса. Максимальная кастомизация и масштабирование.",
      features: ["Sales Cloud", "Service Cloud", "Marketing Cloud", "AI-аналитика"],
      price: "индивидуально",
    },
    {
      name: "Кастомная CRM",
      description: "Разрабатываем CRM с нуля под ваши уникальные бизнес-процессы.",
      features: ["Полная кастомизация", "Любые интеграции", "Ваша интеллектуальная собственность"],
      price: "индивидуально",
    }
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'CRM системы — разработка и внедрение',
    description: 'Разработка и внедрение CRM для автоматизации продаж и управления клиентами. Битрикс24, AmoCRM, Salesforce.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: { '@type': 'City', name: 'Minsk' },
    url: `${SITE_URL}/services/crm`,
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ServiceBreadcrumbs service="crm" />
      <SeoJsonLd data={serviceSchema} />
      {/* Hero секция */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Автоматизация продаж и управления клиентами
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              CRM{' '}
              <span className="text-blue-600 dark:text-blue-400">
                системы
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Автоматизируйте продажи, управляйте клиентами и увеличивайте прибыль с современными CRM-решениями
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Обсудить внедрение CRM
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Наши кейсы
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Что такое CRM */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Что такое{' '}
                <span className="text-blue-600 dark:text-blue-400">CRM-система</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                CRM (Customer Relationship Management) — это система управления взаимоотношениями с клиентами. Она помогает автоматизировать продажи, маркетинг и поддержку, собирая всю информацию о клиентах в одном месте.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Внедрение CRM помогает упорядочить продажи, маркетинг и поддержку: единая база
                клиентов, история взаимодействий и понятные процессы для команды.
              </p>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-6 mt-6">
                <p className="text-slate-700 dark:text-slate-200 font-medium">
                  Фокус внедрения — прозрачные сделки, меньше ручной рутины и измеримые этапы воронки.
                </p>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80 mb-4 text-center">
                CRM
              </p>
              <h3 className="text-2xl font-bold text-center mb-4">Клиенты и процессы в одном контуре</h3>
              <p className="text-center text-white/90">
                Единая база, история взаимодействий, автоматизация рутинных шагов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Возможности CRM */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Возможности CRM-систем
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Что вы получаете после внедрения CRM
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Готовые решения */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Готовые решения
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Выберите подходящую CRM для вашего бизнеса
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{solution.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{solution.description}</p>
                <ul className="space-y-1 mb-3">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span className="h-px w-3 bg-slate-400 shrink-0" aria-hidden /> {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-base font-bold text-blue-600 dark:text-blue-400 leading-snug">{solution.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Процесс внедрения */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Как мы внедряем CRM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Анализ процессов</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Изучаем ваши бизнес-процессы и определяем потребности</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Выбор решения</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Подбираем оптимальную CRM под ваши задачи</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Настройка и интеграция</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Настраиваем систему и интегрируем с вашими сервисами</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Обучение и поддержка</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Обучаем сотрудников и сопровождаем после внедрения</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Обсудим внедрение CRM
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Краткий бриф — предложение по системе, этапам и интеграциям
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-colors"
          >
            Получить консультацию
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
      <ServiceFaqBlock service="crm" />
    </div>
  );
}