import Link from 'next/link'
import SeoJsonLd from '../../components/SeoJsonLd'
import ServiceSemanticBlocks from '../../components/ServiceSemanticBlocks'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { buildServiceMetadata, SITE_URL } from '../../lib/seo'
import { DUAL_CURRENCY_NOTE, formatDualPrice } from '../../lib/currency'

export const metadata = buildServiceMetadata('seo')

const ENTRY = [
  {
    title: 'SEO-аудит',
    description: 'Техника, контент, индексация, конкуренты — карта проблем и приоритетов.',
    price: formatDualPrice(800),
    tag: 'Старт',
  },
  {
    title: 'Сбор семантики',
    description: 'Ядро запросов, кластеризация, структура посадочных под бизнес-цели.',
    price: formatDualPrice(500),
    tag: 'Основа',
  },
  {
    title: 'Техническая оптимизация',
    description: 'Скорость, индексация, ошибки, разметка — фундамент для роста позиций.',
    price: formatDualPrice(1500),
    tag: 'Техника',
  },
  {
    title: 'Оптимизация контента',
    description: 'Мета, тексты, перелинковка, страницы услуг под коммерческие запросы.',
    price: formatDualPrice(1000),
    tag: 'Контент',
  },
]

const COMPLEX = {
  title: 'Комплексное SEO',
  price: formatDualPrice(3000, { perMonth: true }),
  description:
    'Ежемесячный цикл: техника, семантика, контент, внешние факторы и отчётность. Старт после аудита.',
  points: [
    'План работ по приоритетам аудита',
    'Регулярные доработки страниц и контента',
    'Мониторинг позиций и трафика',
    'Отчёт и рекомендации на следующий месяц',
  ],
}

const KPI = [
  { title: 'Позиции', body: 'Динамика по приоритетным коммерческим и брендовым запросам' },
  { title: 'Трафик', body: 'Органика из Яндекса и Google, качество посадочных' },
  { title: 'Заявки', body: 'Цели в Метрике / Analytics: формы, звонки, мессенджеры' },
  { title: 'Техника', body: 'Индексация, скорость, ошибки Crawl / Search Console' },
]

const STEPS = [
  { n: '1', title: 'Аудит', body: 'Фиксируем точку ноль и узкие места' },
  { n: '2', title: 'Семантика', body: 'Собираем и кластеризуем спрос' },
  { n: '3', title: 'Оптимизация', body: 'Техника и контент по плану' },
  { n: '4', title: 'Рост', body: 'Итерации, ссылки, доработки' },
  { n: '5', title: 'Аналитика', body: 'Отчёт и корректировка курса' },
]

const AUDIENCE = [
  'Сайт есть, но мало заявок из органики',
  'Запускаете новый сайт и сразу закладываете SEO',
  'Нужен рост в Яндексе и Google',
  'Готовы к системной работе 2–4+ месяца, а не к разовым «быстрым позициям»',
]

export default function SEOPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEO продвижение сайтов',
    description:
      'SEO продвижение в Яндексе и Google: аудит, семантика, техника, контент.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: [
      { '@type': 'Country', name: 'Belarus' },
      { '@type': 'Country', name: 'Russia' },
    ],
    url: `${SITE_URL}/services/seo`,
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ServiceBreadcrumbs service="seo" />
      <SeoJsonLd data={serviceSchema} />

      <section className="relative pt-16 pb-14 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
              Яндекс · Google · органика
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-5">
              SEO-продвижение сайта под заявки
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
              Аудит, семантика, техника и контент. Комплекс —{' '}
              {formatDualPrice(3000, { perMonth: true })}. Для AI-видимости в нейросетях — отдельно{' '}
              <Link href="/services/geo-promotion" className="text-blue-600 dark:text-blue-400 hover:underline">
                GEO
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact?goal=seo"
                className="px-7 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Заказать SEO
              </Link>
              <Link
                href="#products"
                className="px-7 py-3.5 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-blue-500"
              >
                Что можно заказать
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Кому подходит</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {AUDIENCE.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
              >
                <span className="text-blue-500 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="products" className="py-16 bg-white dark:bg-gray-800 scroll-mt-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Входные услуги и комплекс
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              Можно начать с аудита или сразу с ежемесячного цикла. {DUAL_CURRENCY_NOTE}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {ENTRY.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-5"
              >
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{item.tag}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                <p className="font-semibold text-blue-600 dark:text-blue-400">{item.price}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/30 p-6 md:p-8 mb-8">
            <div className="md:flex md:items-start md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {COMPLEX.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-xl">{COMPLEX.description}</p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {COMPLEX.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 text-left md:text-right">
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                  {COMPLEX.price}
                </p>
                <Link
                  href="/contact?goal=seo"
                  className="inline-flex px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Запросить план
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Ссылочное продвижение — индивидуально после аудита.{' '}
            <Link href="/pricing" className="text-blue-600 hover:underline">
              Ориентиры на странице цен
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Что измеряем
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KPI.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Этапы работы
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center">
                  {s.n}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceSemanticBlocks service="seo" />

      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50/60 dark:bg-violet-950/30 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                SEO закрывает поиск. GEO — нейросети.
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl">
                Если бренд должен корректнее появляться в ответах ChatGPT, Google AI и Алисы —
                добавьте GEO-цикл после или параллельно с SEO.
              </p>
            </div>
            <Link
              href="/services/geo-promotion"
              className="shrink-0 px-5 py-2.5 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-500"
            >
              Смотреть GEO →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Кейсы с сильным SEO-контуром</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
            Сайты APSOD изначально собираем под семантику, скорость и локальный поиск — например Amba
            Detail, NEXTON, BMservice.
          </p>
          <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Открыть портфолио →
          </Link>
        </div>
      </section>

      <section className="py-14 bg-slate-950 text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Нужен план по SEO?</h2>
          <p className="text-white/90 mb-6">
            Начнём с аудита или сразу с комплексного цикла — подскажем после короткого брифа.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact?goal=seo"
              className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50"
            >
              Получить консультацию
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 border border-white/40 rounded-lg font-medium hover:bg-white/10"
            >
              Цены
            </Link>
          </div>
        </div>
      </section>

      <ServiceFaqBlock service="seo" />
    </div>
  )
}
