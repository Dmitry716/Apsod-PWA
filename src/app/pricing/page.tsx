import Link from 'next/link'
import {
  buildSnippetMetadata,
  generateFAQSchema,
} from '../lib/seo'
import SeoJsonLd from '../components/SeoJsonLd'
import PageBreadcrumbs from '../components/PageBreadcrumbs'
import { HOMEPAGE_FAQ } from '../lib/homepage-faq'
import { DUAL_CURRENCY_NOTE, dualPriceLines, formatDualPrice } from '../lib/currency'
import { MOBILE_APP_ENTRY_BYN, MOBILE_APP_PACKAGES } from '../lib/mobile-app-packages'

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
    desc: `iOS / Android / React Native — ориентир MVP ${formatDualPrice(MOBILE_APP_ENTRY_BYN)}. Точная смета после Discovery.`,
    href: '/services/mobile-development',
  },
  {
    title: 'PWA и техподдержка',
    desc: 'PWA-доработки и ежемесячное сопровождение сайта — по договору; ориентиры в Б̶ и ₽ после аудита.',
    href: '/services/technical-support',
  },
]

const SITE_PLUS_SEO = {
  title: 'Сайт + SEO',
  body: `Разработка сайта и старт продвижения в Яндексе и Google. Ориентир: корпоративный сайт ${formatDualPrice(15000)} + SEO-цикл ${formatDualPrice(3000, { perMonth: true })}. Точная смета после брифа.`,
}

export default function PricingPage() {
  const schemas = [
    generateFAQSchema(
      HOMEPAGE_FAQ.filter((f) =>
        f.question.toLowerCase().includes('стоит') || f.question.toLowerCase().includes('долго')
      ).map((f) => ({ question: f.question, answer: f.answer }))
    ),
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SeoJsonLd data={schemas} />
      <div className="container mx-auto px-4 pt-10 pb-20 max-w-5xl">
        <PageBreadcrumbs
          items={[
            { name: 'Главная', path: '/' },
            { name: 'Цены', path: '/pricing' },
          ]}
          className="text-sm text-slate-500 mb-8"
        />

        <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-4">
          Стоимость
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
          Стоимость сайта в Минске
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-3 max-w-3xl leading-relaxed">
          Цены на разработку сайтов и SEO для бизнеса в Минске. Точная смета — после короткого брифа.
          Ориентиры зависят от объёма дизайна, интеграций и сроков.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-3xl">{DUAL_CURRENCY_NOTE}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-12 max-w-3xl">
          Подробнее —{' '}
          <Link href="/services/web-development" className="apsod-link-nudge text-slate-900 dark:text-white font-medium">
            разработка сайтов
          </Link>
          {' · '}
          <Link href="/services/landing-page" className="apsod-link-nudge text-slate-900 dark:text-white font-medium">
            лендинг
          </Link>
          {' · '}
          <Link href="/services/corporate-sites" className="apsod-link-nudge text-slate-900 dark:text-white font-medium">
            корпоративный
          </Link>
          {' · '}
          <Link href="/services/seo" className="apsod-link-nudge text-slate-900 dark:text-white font-medium">
            SEO
          </Link>
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 overflow-hidden mb-16">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.title}
              className={`apsod-price-card bg-white dark:bg-gray-950 p-7 flex flex-col ${
                pkg.highlight ? 'ring-1 ring-inset ring-slate-900 dark:ring-white' : ''
              }`}
            >
              {pkg.highlight ? (
                <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400 mb-3">
                  Часто выбирают
                </p>
              ) : (
                <div className="h-5 mb-3" aria-hidden />
              )}
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                {pkg.title}
              </h2>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{pkg.byn}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{pkg.rub}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Срок: {pkg.term}</p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                {pkg.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="h-px w-3 bg-slate-400 shrink-0 mt-2.5" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
                className="apsod-btn-solid inline-flex justify-center w-full px-4 py-2.5 rounded-md text-sm font-semibold transition-colors"
              >
                Получить смету
              </Link>
            </div>
          ))}
        </div>

        <div className="border border-slate-200 dark:border-slate-800 p-7 md:p-8 mb-16 bg-white dark:bg-gray-950">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            {SITE_PLUS_SEO.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-3xl">
            {SITE_PLUS_SEO.body}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?goal=corporate&budget=corporate-15k"
              className="apsod-btn-solid inline-flex px-5 py-2.5 rounded-md text-sm font-semibold transition-colors"
            >
              Получить смету на пакет
            </Link>
            <Link
              href="/services/seo"
              className="inline-flex px-5 py-2.5 rounded-md text-sm font-semibold border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-500 transition-colors"
            >
              Подробнее про SEO
            </Link>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
          Мобильные приложения
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-2xl leading-relaxed">
          Ориентиры для iOS, Android и React Native. Точная смета — после Discovery.
        </p>
        <div className="grid md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 overflow-hidden mb-16">
          {MOBILE_APP_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`apsod-price-card bg-white dark:bg-gray-950 p-7 flex flex-col ${
                pkg.highlight ? 'ring-1 ring-inset ring-slate-900 dark:ring-white' : ''
              }`}
            >
              {pkg.highlight ? (
                <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400 mb-3">
                  Часто выбирают
                </p>
              ) : (
                <div className="h-5 mb-3" aria-hidden />
              )}
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                {pkg.title}
              </h3>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{pkg.byn}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{pkg.rub}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Срок: {pkg.term}</p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-8 flex-1">
                {pkg.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="h-px w-3 bg-slate-400 shrink-0 mt-2.5" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
                className="apsod-btn-solid inline-flex justify-center w-full px-4 py-2.5 rounded-md text-sm font-semibold transition-colors"
              >
                Получить смету
              </Link>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
          Другие услуги
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {EXTRA.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="p-6 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 bg-white dark:bg-gray-950 transition-all duration-300 hover:-translate-y-0.5"
            >
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
          Как формируется цена
        </h2>
        <ul className="space-y-3 text-slate-600 dark:text-slate-300 mb-14 max-w-2xl">
          {[
            'Бриф: цель, аудитория, география',
            'Оценка объёма: дизайн, страницы, интеграции',
            'Смета в белорусских и российских рублях и сроки в коммерческом предложении',
            'Договор, этапы оплаты, запуск',
          ].map((line) => (
            <li key={line} className="flex gap-3 text-sm md:text-base">
              <span className="h-px w-4 bg-slate-400 shrink-0 mt-3" aria-hidden />
              {line}
            </li>
          ))}
        </ul>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            Нужна смета под ваш проект?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-xl leading-relaxed">
            Ответим в течение рабочего дня — обычно быстрее.
          </p>
          <Link
            href="/contact"
            className="apsod-btn-solid inline-flex px-6 py-3 rounded-md text-sm font-semibold transition-colors"
          >
            Оставить заявку
          </Link>
        </div>
      </div>
    </div>
  )
}
