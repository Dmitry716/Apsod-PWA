import Link from 'next/link'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { buildServiceMetadata, SITE_URL } from '../../lib/seo'

export const metadata = buildServiceMetadata('geo-promotion')

export default function GeoPromotionPage() {
  const benefits = [
    {
      title: 'Клиенты рядом',
      description:
        'Люди ищут «рядом», «у меня» и в картах. GEO приводит тех, кто готов приехать или заказать в вашем городе.',
      icon: '📍',
    },
    {
      title: 'Карты и локальный пакет',
      description:
        'Видимость в Яндекс.Картах, Google Maps, 2GIS и локальной выдаче — не только в общем поиске.',
      icon: '🗺️',
    },
    {
      title: 'Доверие к бизнесу',
      description:
        'Заполненный профиль, отзывы, фото и актуальные контакты повышают конверсию в звонок и визит.',
      icon: '⭐',
    },
    {
      title: 'Меньше «пустого» трафика',
      description:
        'Локальные запросы ближе к сделке, чем широкие информационные — выше доля целевых обращений.',
      icon: '🎯',
    },
    {
      title: 'Синергия с SEO',
      description:
        'GEO усиливает классическое SEO: карты, NAP и городские посадочные помогают и органике.',
      icon: '🔗',
    },
    {
      title: 'Прозрачная отчётность',
      description:
        'Позиции в картах, просмотры профиля, звонки, маршруты и заявки — в понятных отчётах.',
      icon: '📊',
    },
  ]

  const packages = [
    {
      title: 'Аудит GEO',
      description:
        'Карты, карточки бизнеса, NAP, конкуренты в городе, технические пробелы сайта для локальной выдачи.',
      price: 'от 600 Б̶',
    },
    {
      title: 'Яндекс Бизнес и Google Business',
      description:
        'Создание и ведение карточек: категории, услуги, фото, посты, ответы на отзывы, атрибуты.',
      price: 'от 700 Б̶/мес',
    },
    {
      title: 'Карты и каталоги',
      description:
        'Яндекс.Карты, Google Maps, 2GIS и ключевые локальные справочники — единые название, адрес, телефон.',
      price: 'от 500 Б̶',
    },
    {
      title: 'Локальная семантика',
      description:
        'Запросы с гео: «услуга + город», «рядом», районы. Кластеризация и ТЗ на посадочные страницы.',
      price: 'от 500 Б̶',
    },
    {
      title: 'Отзывы и репутация',
      description:
        'Сценарии сбора отзывов, ответы, модерация рисков. Без накруток — только устойчивые практики.',
      price: 'индивидуально',
    },
    {
      title: 'Комплексное GEO',
      description:
        'Карточки + карты + локальный контент на сайте + отчётность. Оптимально для салонов, клиник, услуг и ритейла.',
      price: 'от 1 500 Б̶/мес',
    },
  ]

  const advantages = [
    {
      title: 'Белые методы',
      description: 'Без накруток отзывов и «серых» каталогов, которые вредят карточкам и сайту.',
      icon: '🛡️',
    },
    {
      title: 'Города фокуса',
      description: 'Витебск, Минск, Москва — и удалённо по РБ/РФ под вашу географию продаж.',
      icon: '🏙️',
    },
    {
      title: 'Сайт под локальный поиск',
      description: 'При необходимости — посадочные под город/район на уникальном коде, не на конструкторе.',
      icon: '🧩',
    },
    {
      title: 'Связка с SEO',
      description: 'Можем вести GEO отдельно или вместе с полным SEO-продвижением.',
      icon: '📈',
    },
  ]

  const steps = [
    { title: 'Аудит', desc: 'Карты, NAP, конкуренты, сайт' },
    { title: 'Карточки', desc: 'Яндекс / Google / каталоги' },
    { title: 'Локальный контент', desc: 'Семантика и посадочные' },
    { title: 'Отзывы', desc: 'Сбор и работа с репутацией' },
    { title: 'Рост', desc: 'Отчёты и доработка стратегии' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'GEO продвижение',
    description:
      'Локальное SEO и GEO-продвижение: карты, Яндекс Бизнес, Google Business Profile, отзывы и локальная выдача. Витебск, Минск, Москва.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: [
      { '@type': 'Country', name: 'Belarus' },
      { '@type': 'Country', name: 'Russia' },
    ],
    url: `${SITE_URL}/services/geo-promotion`,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${SITE_URL}/services` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'GEO продвижение',
        item: `${SITE_URL}/services/geo-promotion`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ServiceBreadcrumbs service="geo-promotion" />
      <SeoJsonLd data={[serviceSchema, breadcrumbSchema]} />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              Локальный поиск и карты
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              GEO{' '}
              <span className="text-emerald-600 dark:text-emerald-400">продвижение</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Локальное SEO: карты, карточки бизнеса, отзывы и выдача «рядом» — Витебск, Минск,
              Москва и удалённо по РБ/РФ
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Заказать GEO
              </Link>
              <Link
                href="/services/seo"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-600 hover:text-emerald-600 transition-all"
              >
                Классическое SEO
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Что такое{' '}
                <span className="text-emerald-600 dark:text-emerald-400">GEO</span>?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                GEO-продвижение (локальное SEO) — комплекс работ, чтобы ваш бизнес находили в
                своём городе и районе: в картах, локальном пакете Google/Яндекса и по запросам с
                геопривязкой.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Это не замена классического{' '}
                <Link href="/services/seo" className="text-blue-600 dark:text-blue-400 hover:underline">
                  SEO продвижения
                </Link>
                : SEO растит сайт в широкой выдаче, GEO — приводит клиентов «здесь и сейчас» через
                карты, профили и локальные страницы.
              </p>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 mt-6">
                <p className="text-emerald-900 dark:text-emerald-100 font-medium">
                  Подходит для услуг с точкой на карте: салоны, клиники, автосервисы, ритейл,
                  общепит, B2B с филиалами и выездом в городе.
                </p>
              </div>
            </div>
            <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
              <div className="text-6xl mb-4 text-center">📍</div>
              <h3 className="text-2xl font-bold text-center mb-4">Находят. Доверяют. Едут.</h3>
              <p className="text-center text-white/90">
                Правильная карточка и локальная выдача часто дают звонок быстрее, чем позиция на
                5-й странице общего поиска.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Зачем бизнесу GEO
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Видимость там, где клиент уже готов выбрать исполнителя
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Что входит в GEO
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Можно начать с аудита или взять комплекс под город
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Почему с APSOD
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="text-center">
                <div className="text-5xl mb-3">{a.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{a.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Локальные страницы по городам
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            GEO хорошо работает вместе с посадочными под город — разработку и локальное SEO
            связываем в один контур.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/belarus/vitebsk"
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-500"
            >
              Витебск
            </Link>
            <Link
              href="/belarus/minsk"
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-500"
            >
              Минск
            </Link>
            <Link
              href="/russia/moscow"
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-500"
            >
              Москва
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-500"
            >
              Цены
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Этапы работы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-xl font-bold text-emerald-600 dark:text-emerald-400 mx-auto mb-3">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-emerald-600 to-teal-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Нужны клиенты из вашего города?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Проведём GEO-аудит, настроим карты и карточки, предложим план под ваш бизнес
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Получить консультацию
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>

      <ServiceFaqBlock service="geo-promotion" />
    </div>
  )
}
