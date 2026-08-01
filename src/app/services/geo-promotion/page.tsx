import Link from 'next/link'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import { buildServiceMetadata, SITE_URL } from '../../lib/seo'
import { DUAL_CURRENCY_NOTE, formatDualPrice } from '../../lib/currency'

export const metadata = buildServiceMetadata('geo-promotion')

export default function GeoPromotionPage() {
  const startSteps = [
    {
      title: 'Начнём с GEO-аудита',
      body: 'Зафиксируем текущую AI-видимость бренда, конкурентов, источники, слабые места сайта, контента и внешнего контура.',
    },
    {
      title: 'Доработаем сайт и контент под AI-ответы',
      body: 'Усилим страницы, факты, FAQ, кейсы, экспертные блоки и структуру — чтобы нейросетям было проще корректно описывать бренд.',
    },
    {
      title: 'Будем отслеживать динамику',
      body: 'Ежемесячно проверяем упоминаемость, цитируемость, тональность, точность описаний и изменения относительно прошлого среза.',
    },
  ]

  const audience = [
    'Хотите не только проверить AI-видимость, но и системно её улучшать',
    'Конкуренты уже появляются в AI-ответах, рекомендациях и сравнениях',
    'Сайт хорошо работает в SEO, но не адаптирован под ответы нейросетей',
    'AI-системы описывают бренд неполно или неточно',
    'Нужен регулярный мониторинг упоминаемости, цитируемости и тональности',
    'Хотите связать SEO, контент, аналитику и внешний контур в одну систему работ',
  ]

  const tariffs = [
    {
      name: 'Базовый',
      price: formatDualPrice(2500, { perMonth: true }),
      focus: 'В основном внутренний контур',
      suit: 'Старт подготовки сайта к AI-видимости и регулярный мониторинг.',
      points: [
        'Аудит входит в стартовую настройку',
        'До 20 промптов — мониторинговый минимум',
        'До 3 страниц услуг и 5 информационных',
        'Создание факт-матрицы бренда',
        'Базовые SEO/GEO-доработки',
        'Ежемесячный мониторинг и отчёт',
      ],
    },
    {
      name: 'Стандартный',
      price: formatDualPrice(4000, { perMonth: true }),
      focus: 'Внутренний контур + расширение внешнего',
      suit: 'Несколько направлений, услуг, регионов или более широкая контентная структура.',
      points: [
        'Аудит входит / опираемся на выводы',
        'До 40 промптов — расширенный срез',
        'До 5 страниц услуг и 10 информационных',
        'Расширение и поддержка факт-матрицы',
        'Расширенные SEO/GEO-доработки',
        'Внешние публикации с 3–4 месяца',
        'Расширенный ежемесячный отчёт',
      ],
    },
    {
      name: 'Бизнес',
      price: formatDualPrice(6500, { perMonth: true }),
      focus: 'Внутренний + внешний контур',
      suit: 'Когда AI-видимость зависит от публикаций, карточек, каталогов и рейтингов.',
      points: [
        'Аудит входит / расширяем внешний контур',
        'До 40 промптов + внешние источники',
        'До 10 страниц услуг и 15 информационных',
        'Факт-матрица + контент-гигиена во внешнем контуре',
        'SEO/GEO + частично управляемые источники',
        'Системные внешние публикации по плану',
        'Отчёт с динамикой внешнего контура',
      ],
    },
  ]

  const promptTypes = [
    'Брендовые',
    'Категорийные',
    'Сопоставительные',
    'Продуктовые',
    'Проблемно-решенческие',
    'Информационные',
    'Коммерческие',
    'Конкурентные',
  ]

  const methodBlocks = [
    {
      title: 'Изучаем бизнес-контекст и собираем промпт-сет',
      body: 'Промпт в GEO — не аналог SEO-ключа. Один промпт проверяет целый сценарий: выбор, сравнение, решение, цены, кейсы, экспертность или альтернативы.',
    },
    {
      title: 'Отбираем мониторинговый минимум',
      body: 'Большой набор нужен для исследования. В регулярный срез берём устойчивые запросы: AI-видимость бренда, конкуренты, коммерческие сценарии и разные интенты. В аудите и базовом тарифе — до 20 промптов, в стандартном и бизнес — до 40.',
    },
    {
      title: 'Проверяем бренд в AI-системах',
      body: 'Фиксируем: упоминается ли бренд, цитируется ли сайт, тональность, рекомендация или просто упоминание, какие конкуренты рядом, какие источники и есть ли ошибки.',
    },
    {
      title: 'Сравниваем с конкурентами',
      body: 'Если вас нет в ответе — важно понять, кто есть вместо вас и почему: страницы, рейтинги, СМИ, кейсы и внешние сигналы конкурентов.',
    },
    {
      title: 'Анализируем источники',
      body: 'Смотрим, откуда AI может брать подтверждение: официальный сайт, внешние домены, противоречия и слабые сигналы. Делим источники на управляемые, частично управляемые и неуправляемые.',
    },
    {
      title: 'Разделяем данные и гипотезы',
      body: 'AI-ответы вариативны. В отчётах отделяем зафиксированные данные, повторяющиеся закономерности, конкурентные разрывы, гипотезы роста и ограничения анализа.',
    },
  ]

  const systems = ['ChatGPT', 'Google AI Overviews', 'Поиск с Алисой', 'Perplexity', 'ЯндексGPT']

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'GEO-продвижение сайта и бренда в нейросетях',
    description:
      'GEO (Generative Engine Optimization): повышение AI-видимости бренда в ChatGPT, Google AI Overviews, Алисе и других нейросетях. Аудит, факт-матрица, доработка контента, ежемесячный мониторинг.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: [
      { '@type': 'Country', name: 'Belarus' },
      { '@type': 'Country', name: 'Russia' },
    ],
    url: `${SITE_URL}/services/geo-promotion`,
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ServiceBreadcrumbs service="geo-promotion" />
      <SeoJsonLd data={serviceSchema} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full mb-6 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              Generative Engine Optimization · AI-видимость бренда
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              GEO-продвижение{' '}
              <span className="text-blue-700 dark:text-blue-400">сайта и бренда</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Повышаем AI-видимость: чтобы бренд корректнее и чаще появлялся в ответах нейросетей —
              ChatGPT, Google AI, Алиса, Perplexity и другие системы
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all shadow-lg"
              >
                Получить коммерческое предложение
              </Link>
              <Link
                href="/services/seo"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-slate-900 hover:text-slate-900 dark:hover:border-white dark:hover:text-white transition-all"
              >
                Классическое SEO
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {startSteps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 shadow-sm text-left"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Что такое */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Что такое GEO-продвижение
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                GEO-продвижение — регулярная работа над тем, чтобы бренд корректнее и чаще
                появлялся в AI-ответах. Мы не управляем нейросетями напрямую, но усиливаем
                источники, на которые они могут опираться.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Это не замена{' '}
                <Link href="/services/seo" className="text-blue-700 dark:text-blue-400 hover:underline">
                  SEO-продвижения
                </Link>
                : SEO растит позиции в поиске, GEO — присутствие в ответах, рекомендациях и
                сравнениях нейросетей. Часто нужны оба контура.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Набор AI-систем и языков подстраиваем под ваш рынок и сценарии запросов клиентов.
              </p>
            </div>
            <div className="bg-slate-950 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Системы в фокусе</h3>
              <ul className="space-y-3">
                {systems.map((name) => (
                  <li key={name} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                    <span className="w-2 h-2 rounded-full bg-blue-300 shrink-0" />
                    {name}
                  </li>
                ))}
              </ul>
              <p className="text-white/80 text-sm mt-6">
                Практика GEO в нейросетях: поиск с AI-ответами + отдельные
                ассистенты. Список расширяем под задачу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Кому нужно */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Кому нужно GEO-продвижение
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-10">
            GEO подойдёт вам, если:
          </p>
          <ul className="space-y-3">
            {audience.map((item) => (
              <li
                key={item}
                className="flex gap-3 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700"
              >
                <span className="text-blue-700 dark:text-blue-400 font-bold shrink-0">✓</span>
                <span className="text-gray-700 dark:text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Как устроена работа */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Как устроена работа: старт и ежемесячный цикл
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
            GEO начинается со стартовой настройки, затем переходит в регулярный цикл.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">На старте</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Проводим GEO-аудит, фиксируем точку ноль, собираем первичный промпт-сет, формируем
                факт-матрицу бренда и выбираем страницы, с которыми работаем в первую очередь.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Каждый месяц</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Прогоняем стабильный промпт-сет, сравниваем с прошлым срезом, дорабатываем страницы,
                обновляем факт-матрицу при изменении данных о компании, работаем с источниками,
                готовим отчёт и план на следующий месяц.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Тарифы на GEO-продвижение
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-4 max-w-2xl mx-auto">
            Три уровня регулярной работы. Точная смета — после брифа и аудита.
          </p>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-12">
            {DUAL_CURRENCY_NOTE}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tariffs.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-7 shadow-sm"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t.name}</h3>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-400 leading-snug mt-2 mb-3">
                  {t.price}
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  Фокус: {t.focus}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{t.suit}</p>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-blue-600 shrink-0">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block text-center px-4 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
                >
                  Обсудить тариф
                </Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mt-8 text-center leading-relaxed">
            * Частично управляемые источники — карточки и профили компании на внешних площадках.
            При наличии доступов можем вносить изменения, но не гарантируем, что платформа их
            примет.
          </p>
        </div>
      </section>

      {/* Методология */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Методология GEO-анализа
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Как устроена аналитика AI-видимости — по шагам
          </p>

          <div className="mb-12 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              8 типов запросов в промпт-сете
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {promptTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1.5 rounded-full text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                >
                  {type}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Промпт в GEO проверяет пользовательский интент целиком — не отдельный «ключ», как в
              классическом SEO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methodBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {block.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Доп. услуги */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Дополнительно
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">GEO-аудит отдельно</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Срез текущей AI-видимости, конкуренты и карта проблем — без регулярного ведения.
                {' '}
                {formatDualPrice(1200)}.
              </p>
              <Link href="/contact" className="text-blue-700 dark:text-blue-400 text-sm font-medium hover:underline">
                Заказать аудит →
              </Link>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">GEO-стратегия</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Стартовый срез, факт-матрица, карта промптов и источников, план на 6 месяцев —
                если нужен план, а не сразу цикл.
              </p>
              <Link href="/contact" className="text-blue-700 dark:text-blue-400 text-sm font-medium hover:underline">
                Обсудить стратегию →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            У вас есть деловой запрос? Давайте обсудим
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Оставьте заявку — предложим формат: аудит, стратегия или ежемесячный GEO-цикл.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold text-lg transition-colors"
          >
            Оставить заявку
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <ServiceFaqBlock service="geo-promotion" />
    </div>
  )
}
