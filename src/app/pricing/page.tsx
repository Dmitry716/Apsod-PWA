import Link from 'next/link'
import {
  buildSnippetMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '../lib/seo'
import SeoJsonLd from '../components/SeoJsonLd'
import { HOMEPAGE_FAQ } from '../lib/homepage-faq'

export const metadata = buildSnippetMetadata('/pricing')

const PACKAGES = [
  {
    title: 'Лендинг / одностраничник',
    price: 'от 8 000 Б̶',
    priceRu: 'или от 240 000 ₽',
    term: '2–4 недели',
    goal: 'landing',
    budget: 'landing-8k',
    items: [
      'Дизайн и адаптив',
      'Форма заявки / WhatsApp',
      'Базовая SEO-разметка',
      'Подключение аналитики',
    ],
  },
  {
    title: 'Корпоративный сайт',
    price: 'от 15 000 Б̶',
    priceRu: 'или от 450 000 ₽',
    term: '4–8 недель',
    goal: 'corporate',
    budget: 'corporate-15k',
    items: [
      'До 10–15 страниц',
      'CMS / удобное редактирование',
      'Структура под семантику',
      'Скорость и Core Web Vitals',
    ],
    highlight: true,
  },
  {
    title: 'Интернет-магазин',
    price: 'от 23 000 Б̶',
    priceRu: 'или от 690 000 ₽',
    term: 'от 2–3 месяцев',
    goal: 'shop',
    budget: 'shop-23k',
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
    desc: 'Аудит, семантика, техника, контент — от 800 Б̶/мес. или пакетный старт после аудита.',
    href: '/services/seo',
  },
  {
    title: 'GEO продвижение',
    desc: 'Карты, Яндекс Бизнес, Google Business, отзывы и локальная выдача — от 600 Б̶ за аудит, ведение от 700 Б̶/мес.',
    href: '/services/geo-promotion',
  },
  {
    title: 'Мобильное приложение',
    desc: 'iOS / Android / React Native — смета после Discovery. MVP обычно от нескольких тысяч Б̶.',
    href: '/services/mobile-development',
  },
  {
    title: 'PWA и техподдержка',
    desc: 'PWA-доработки и ежемесячное сопровождение сайта — по договору, от нескольких сотен Б̶/мес.',
    href: '/services/technical-support',
  },
]

export default function PricingPage() {
  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Главная', path: '/' },
      { name: 'Цены', path: '/pricing' },
    ]),
    generateFAQSchema(
      HOMEPAGE_FAQ.filter((f) =>
        f.question.toLowerCase().includes('стоит') || f.question.toLowerCase().includes('долго')
      ).map((f) => ({ question: f.question, answer: f.answer }))
    ),
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SeoJsonLd data={schemas} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Главная
        </Link>
        {' / '}
        <span className="text-gray-700 dark:text-gray-300">Цены</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Цены на разработку сайтов и digital
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
        Ориентиры стоимости для бизнеса в Беларуси и России. Точная смета — после короткого брифа.
        Цены не фиксированы жёстко: зависят от объёма дизайна, интеграций и сроков.
      </p>

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
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{pkg.price}</p>
            <p className="text-sm text-gray-500 mb-1">{pkg.priceRu}</p>
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
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl bg-gray-50 dark:bg-gray-800/60 p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Как формируется цена
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
          <li>Бесплатная консультация и бриф</li>
          <li>Оценка объёма: дизайн, страницы, интеграции</li>
          <li>Смета с этапами и сроками</li>
          <li>Договор и старт после предоплаты этапа</li>
        </ol>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Обсудить проект
        </Link>
        <Link
          href="/portfolio"
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500"
        >
          Портфолио
        </Link>
      </div>
    </div>
  )
}
