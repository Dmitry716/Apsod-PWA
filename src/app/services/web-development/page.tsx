import Link from 'next/link'
import ServiceSemanticBlocks from '../../components/ServiceSemanticBlocks'
import SeoJsonLd from '../../components/SeoJsonLd'
import { ServiceBreadcrumbs, ServiceFaqBlock } from '../../components/ServiceSeoExtras'
import DevelopmentProcessSection from '../components/DevelopmentProcessSection'
import { WEB_DEVELOPMENT_PROCESS } from '../lib/development-process'
import { buildServiceMetadata, SITE_URL } from '../../lib/seo'
import { DUAL_CURRENCY_NOTE, formatDualPrice } from '../../lib/currency'
import {
  WEB_DEV_CASES,
  WEB_DEV_FEATURED_PACKAGES,
} from '../../lib/web-dev-packages'

export const metadata = buildServiceMetadata('web-development')

const FOR_WHOM = [
  'Нужен сайт как канал заявок, а не «визитка на конструкторе»',
  'Важны скорость, безопасность и контроль над кодом',
  'Планируете SEO / GEO и интеграции с CRM или оплатой',
  'Готовы к индивидуальному дизайну и осознанным срокам',
]

const NOT_FOR = [
  'Нужен сайт «за выходные» на Tilda / Wix',
  'Достаточно типовой темы WordPress без кастомизации',
]

const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'Vercel / Docker',
]

export default function WebDevelopmentPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Разработка сайтов в Минске',
    description:
      'Разработка сайтов, интернет-магазинов и веб-приложений в Минске на Next.js, React, Node.js. Без конструкторов.',
    provider: { '@type': 'Organization', name: 'APSOD', url: SITE_URL },
    areaServed: [
      { '@type': 'City', name: 'Minsk' },
      { '@type': 'Country', name: 'Belarus' },
    ],
    url: `${SITE_URL}/services/web-development`,
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ServiceBreadcrumbs service="web-development" />
      <SeoJsonLd data={serviceSchema} />

      <section className="relative pt-16 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
              Минск · уникальный код · без конструкторов
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-5">
              Разработка сайтов в Минске
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Лендинг, корпоративный сайт или магазин на Next.js для бизнеса Минска и Беларуси.
              Смета {formatDualPrice(8000)} — после короткого брифа.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact?goal=corporate"
                className="px-7 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Обсудить проект
              </Link>
              <Link
                href="#packages"
                className="px-7 py-3.5 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-blue-500"
              >
                Смотреть пакеты
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Кому подходит</h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {FOR_WHOM.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-green-500 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Кому не подходит</h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {NOT_FOR.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-rose-400 shrink-0">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="py-16 bg-white dark:bg-gray-800 scroll-mt-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Пакеты и что входит
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ориентиры стоимости. Точная смета — после брифа. {DUAL_CURRENCY_NOTE}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {WEB_DEV_FEATURED_PACKAGES.map((pkg) => (
              <div
                key={pkg.title}
                className={`rounded-2xl border p-6 flex flex-col ${
                  pkg.highlight
                    ? 'border-blue-500 ring-1 ring-blue-500/30 bg-blue-50/40 dark:bg-blue-950/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40'
                }`}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{pkg.title}</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{pkg.byn}</p>
                <p className="text-sm text-gray-500 mb-1">{pkg.rub}</p>
                <p className="text-sm text-gray-500 mb-4">Срок: {pkg.term}</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1">
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
          <p className="text-center text-sm text-gray-500">
            Нужен сложный продукт или кабинет?{' '}
            <Link href="/contact?goal=complex" className="text-blue-600 hover:underline">
              Обсудим индивидуально
            </Link>
            {' · '}
            <Link href="/pricing" className="text-blue-600 hover:underline">
              Все цены
            </Link>
          </p>
        </div>
      </section>

      <ServiceSemanticBlocks service="web-development" />

      <DevelopmentProcessSection
        title="Как мы разрабатываем"
        subtitle="От Discovery до запуска и поддержки — прозрачные этапы и артефакты"
        phases={WEB_DEVELOPMENT_PROCESS.slice(0, 5)}
      />

      <section className="py-14 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Стек
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base">
            Современный продуктовый стек — скорость, SEO из коробки и контроль над кодом.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Примеры работ
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {WEB_DEV_CASES.slice(0, 3).map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:border-blue-400 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{c.result}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Смотреть портфолио →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-950 text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Готовы обсудить сайт?</h2>
          <p className="text-slate-300 mb-6">
            Короткий бриф — смета за 1 рабочий день. Можно сразу в Telegram.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-400 rounded-lg font-semibold"
            >
              Оставить заявку
            </Link>
            <a
              href="https://t.me/Apsod_IT"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/25 rounded-lg font-medium"
            >
              Telegram
            </a>
          </div>
        </div>
      </section>

      <ServiceFaqBlock service="web-development" />
    </div>
  )
}
