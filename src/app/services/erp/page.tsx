import { Metadata } from 'next'
import Link from 'next/link'
import SeoJsonLd from '../../components/SeoJsonLd'
import { SITE_URL } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'ERP системы — управление предприятием',
  description: 'Разработка и внедрение ERP для управления производством, складом, финансами и логистикой. Интеграция с 1С, SAP, Oracle.',
  keywords: 'erp системы, управление предприятием, 1с, sap, oracle, производство, складской учет, логистика',
  openGraph: {
    title: 'ERP системы | APSOD',
    description: 'Разработка и внедрение ERP. Производство, склад, финансы, логистика.',
    url: `${SITE_URL}/services/erp`,
    siteName: 'APSOD',
    type: 'website',
  },
}

export default function ERPPage() {
  const features = [
    {
      title: "Управление производством",
      description: "Планирование производственных циклов, контроль качества, учет материалов и готовой продукции.",
      icon: "🏭"
    },
    {
      title: "Складской учет",
      description: "Учет товаров на складах, инвентаризация, резервирование, отгрузка и приемка.",
      icon: "📦"
    },
    {
      title: "Управление закупками",
      description: "Автоматизация закупок, работа с поставщиками, контроль сроков и цен.",
      icon: "🛒"
    },
    {
      title: "Финансовый учет",
      description: "Бухгалтерия, бюджетирование, управление денежными потоками, отчетность.",
      icon: "💰"
    },
    {
      title: "Логистика",
      description: "Управление перевозками, маршрутами, отслеживание грузов, оптимизация затрат.",
      icon: "🚚"
    },
    {
      title: "Аналитика и прогнозирование",
      description: "BI-отчеты, дашборды, прогнозирование спроса, анализ эффективности.",
      icon: "📊"
    }
  ];

  const solutions = [
    {
      name: "1С:ERP",
      description: "Лидер на рынке СНГ для производственных и торговых предприятий.",
      features: ["Управление производством", "Бухгалтерия", "Зарплата и кадры", "CRM"],
      price: "индивидуально",
      icon: "1С"
    },
    {
      name: "SAP",
      description: "Мировой стандарт для крупного бизнеса и корпораций.",
      features: ["SAP S/4HANA", "SAP Business One", "SAP Ariba", "SAP SuccessFactors"],
      price: "индивидуально",
      icon: "💼"
    },
    {
      name: "Oracle ERP",
      description: "Облачная ERP для глобальных компаний с полным циклом управления.",
      features: ["Financials", "Procurement", "Project Management", "Analytics"],
      price: "индивидуально",
      icon: "☁️"
    },
    {
      name: "Кастомная ERP",
      description: "Разрабатываем ERP с нуля под уникальные процессы вашего бизнеса.",
      features: ["Полная кастомизация", "Любые интеграции", "Масштабирование"],
      price: "индивидуально",
      icon: "⚙️"
    }
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'ERP системы — управление предприятием',
    description: 'Разработка и внедрение ERP для управления производством, складом, финансами и логистикой.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Belarus' },
    url: `${SITE_URL}/services/erp`,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: 'ERP системы', item: `${SITE_URL}/services/erp` },
    ],
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SeoJsonLd data={[serviceSchema, breadcrumbSchema]} />
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
              Комплексное управление предприятием
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              ERP{' '}
              <span className="text-blue-600 dark:text-blue-400">
                системы
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Объедините все бизнес-процессы в единую систему для эффективного управления
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Обсудить внедрение ERP
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

      {/* Что такое ERP */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Что такое{' '}
                <span className="text-blue-600 dark:text-blue-400">ERP-система</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                ERP (Enterprise Resource Planning) — это система планирования ресурсов предприятия, которая объединяет все бизнес-процессы в единую информационную среду.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                ERP позволяет управлять производством, складом, закупками, финансами, персоналом и логистикой в одной системе, исключая дублирование данных и повышая эффективность.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mt-6">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  📊 Внедрение ERP позволяет снизить операционные затраты на 15-25% и ускорить обработку заказов на 30%.
                </p>
              </div>
            </div>
            <div className="bg-linear-to-br from-orange-400 to-red-500 rounded-2xl p-8 text-white">
              <div className="text-7xl mb-4 text-center">⚙️📊</div>
              <h3 className="text-2xl font-bold text-center mb-4">Единое управление предприятием</h3>
              <p className="text-center text-white/90">
                Производство, склад, финансы, логистика в одной системе
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Возможности ERP */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Возможности ERP-систем
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Полный контроль над ресурсами и процессами предприятия
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
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
            Выберите подходящую ERP для вашего бизнеса
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{solution.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{solution.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{solution.description}</p>
                <ul className="space-y-1 mb-3">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span className="text-green-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{solution.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отраслевые решения */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Отраслевые решения
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            ERP под вашу специфику
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-5xl mb-3">🏭</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Производство</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Управление производственными циклами, MES, контроль качества</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-5xl mb-3">📦</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Торговля и склад</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Складской учет, логистика, управление закупками</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-5xl mb-3">🏥</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Медицина</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Учет пациентов, медикаментов, оборудования</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-5xl mb-3">🏦</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Финансы</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Бухгалтерия, бюджетирование, управленческий учет</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Нужна ERP для вашего бизнеса?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Проведем аудит, подберем решение и внедрим ERP под ключ
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Получить консультацию
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}