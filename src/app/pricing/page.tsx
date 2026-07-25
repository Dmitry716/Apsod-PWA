import Link from 'next/link'
import {
  buildSnippetMetadata,
  generateFAQSchema,
} from '../lib/seo'
import SeoJsonLd from '../components/SeoJsonLd'
import PageBreadcrumbs from '../components/PageBreadcrumbs'
import { HOMEPAGE_FAQ } from '../lib/homepage-faq'
import { DUAL_CURRENCY_NOTE, dualPriceLines, formatDualPrice } from '../lib/currency'

export const metadata = buildSnippetMetadata('/pricing')

const PACKAGES = [
  {
    title: 'Лендинг / одностраничник',
    ...dualPriceLines(8000),
    term: '2–4 недели',
    goal: 'landing',
    budget: 'landing-8k',
    highlight: false,
    items: [
      'Дизайн и адаптив',
      'Форма заявки / WhatsApp',
      'Базовая SEO-разметка',
      'Подключение аналитики',
    ],
  },
  {
    title: 'Корпоративный сайт',
    ...dualPriceLines(15000),
    term: '4–8 недель',
    goal: 'corporate',
    budget: 'corporate-15k',
    highlight: true,
    items: [
      'До 10–15 страниц',
      'CMS / удобное редактирование',
      'Структура под семантику',
      'Скорость и Core Web Vitals',
    ],
  },
  {
    title: 'Интернет-магазин',
    ...dualPriceLines(23000),
    term: 'от 2–3 месяцев',
    goal: 'shop',
    budget: 'shop-23k',
    highlight: false,
    items: [
      'Каталог, корзина, оплата',
      'Интеграции (оплата, доставка)',
      'Админка и SEO каталога',
      'Обучение и запуск',
    ],
  },
]

const EXTRA = [
  {
    title: 'SEO в Яндексе и Google',
    desc: `Аудит, семантика, техника, контент — ${formatDualPrice(1500, { perMonth: true })} или пакетный старт после аудита.`,
    href: '/services/seo',
  },
  {
    title: 'GEO в нейросетях',
    desc: `AI-видимость: тарифы ${formatDualPrice(1500, { perMonth: true })}, отдельный аудит ${formatDualPrice(1200)}.`,
    href: '/services/geo-promotion',
  },
  {
    title: 'Мобильное приложение',
    desc: 'iOS / Android / React Native — смета после Discovery. MVP обычно от нескольких тысяч Б̶ / десятков–сотен тыс. ₽.',
    href: '/services/mobile-development',
  },
  {
    title: 'PWA и техподдержка',
    desc: 'PWA-доработки и ежемесячное сопровождение сайта — по договору; ориентиры в Б̶ и ₽ после аудита.',
    href: '/services/technical-support',
  },
]

export default function PricingPage() {
  const schemas = [
    generateFAQSchema(
      HOMEPAGE_FAQ.filter((f) =>
        f.question.toLowerCase().includes('стоит') || f.question.toLowerCase().includes('долго')
      ).map((f) => ({ question: f.question, answer: f.answer }))
    ),
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <SeoJsonLd data={schemas} />
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Цены', path: '/pricing' },
        ]}
        className="text-sm text-gray-500 mb-8"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Цены на разработку сайтов и digital
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-3 max-w-3xl">
        Ориентиры стоимости для бизнеса в Беларуси и России. Точная смета — после короткого брифа.
        Цены не фиксированы жёстко: зависят от объёма дизайна, интеграций и сроков.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 max-w-3xl">{DUAL_CURRENCY_NOTE}</p>

      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.title}
            className={`rounded-2xl border p-6 bg-white dark:bg-gray-800 ${
              pkg.highlight
                ? 'border-blue-500 ring-1 ring-blue-500/30'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {pkg.title}
            </h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{pkg.byn}</p>
            <p className="text-sm text-gray-500 mb-1">{pkg.rub}</p>
            <p className="text-sm text-gray-500 mb-4">Срок: {pkg.term}</p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
              {pkg.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <Link
              href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
              className="inline-block w-full text-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Получить смету
            </Link>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Другие услуги
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {EXTRA.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 bg-white dark:bg-gray-800"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Как формируется цена
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-10">
        <li>Бриф: цель, аудитория, география</li>
        <li>Оценка объёма: дизайн, страницы, интеграции</li>
        <li>Смета в белорусских и российских рублях и сроки в коммерческом предложении</li>
        <li>Договор, этапы оплаты, запуск</li>
      </ul>

      <div className="rounded-2xl bg-blue-600 text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Нужна смета под ваш проект?</h2>
        <p className="mb-6 text-blue-100">Ответим в течение рабочего дня — обычно быстрее.</p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50"
        >
          Оставить заявку
        </Link>
      </div>
    </div>
  )
}
