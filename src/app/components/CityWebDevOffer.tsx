'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { BelarusCity } from '../lib/belarus-cities'
import { DUAL_CURRENCY_NOTE, formatDualPrice } from '../lib/currency'
import {
  WEB_DEV_CASES,
  WEB_DEV_PACKAGES,
  WEB_DEV_PAYMENT_STAGES,
  WEB_DEV_SITE_TYPES,
  type WebDevPackageId,
} from '../lib/web-dev-packages'
import DevelopmentProcessSection from '../services/components/DevelopmentProcessSection'
import { WEB_DEVELOPMENT_PROCESS } from '../services/lib/development-process'

type Props = {
  city: BelarusCity
  /** false — H1 уже на странице */
  showHero?: boolean
  showFaq?: boolean
  faq?: { question: string; answer: string }[]
}

export default function CityWebDevOffer({
  city,
  showHero = true,
  showFaq = true,
  faq = [],
}: Props) {
  const [selected, setSelected] = useState<WebDevPackageId>('corporate')
  const pkg = WEB_DEV_PACKAGES.find((p) => p.id === selected) ?? WEB_DEV_PACKAGES[1]

  return (
    <div>
      {showHero && (
        <section className="pt-4 pb-12 md:pb-14">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
            Уникальный код · без конструкторов · {city.name}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Разработка и продвижение сайтов {city.nameIn}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 max-w-3xl">
            Делаем сайты, которые показывают сильные стороны компании и ведут к заявке.
            Стек Next.js / React — не Tilda и не шаблонный WordPress.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-3xl">
            {city.region}. База в Витебске, работаем удалённо по Беларуси. Смета от{' '}
            {formatDualPrice(8000)} — за 1 рабочий день после брифа.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?goal=corporate"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Заказать сайт
            </Link>
            <Link
              href="#city-packages"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-blue-500"
            >
              Стоимость разработки
            </Link>
          </div>
        </section>
      )}

      <section className="pb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Типы сайтов {city.nameIn}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
          Выберите формат — ниже покажем состав, ориентир цены и срок.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {WEB_DEV_SITE_TYPES.map((type) => {
            const active = selected === type.id
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelected(type.id)}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  active
                    ? 'border-blue-500 ring-1 ring-blue-500/40 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  {type.title}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{type.body}</p>
              </button>
            )
          })}
        </div>
        <p className="text-sm text-gray-500">
          Нужно приложение или продвижение?{' '}
          <Link href="/services/mobile-development" className="text-blue-600 hover:underline">
            Мобильные приложения
          </Link>
          {' · '}
          <Link href="/services/seo" className="text-blue-600 hover:underline">
            SEO
          </Link>
          {' · '}
          <Link href="/services/geo-promotion" className="text-blue-600 hover:underline">
            GEO
          </Link>
        </p>
      </section>

      <section
        id="city-packages"
        className="py-14 scroll-mt-28 border-y border-gray-100 dark:border-gray-800"
      >
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Стоимость разработки {city.nameIn}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Интерактивный ориентир. Точная смета — после брифа. {DUAL_CURRENCY_NOTE}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {WEB_DEV_PACKAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selected === p.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-8 max-w-2xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{pkg.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Срок: {pkg.term}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{pkg.byn}</p>
              <p className="text-sm text-gray-500">{pkg.rub}</p>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Что входит:</p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
            {pkg.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-500 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/contact?goal=${pkg.goal}&budget=${pkg.budget}`}
            className="inline-flex px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Получить предложение
          </Link>
        </div>
      </section>

      <section className="py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Порядок оплаты
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Оплата поэтапно, равными частями. Обычно три этапа — как у прозрачных digital-подрядчиков.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {WEB_DEV_PAYMENT_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5"
            >
              <span className="text-xs font-mono text-gray-400">{stage.step}</span>
              <h3 className="font-bold text-gray-900 dark:text-white mt-1 mb-2">{stage.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stage.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 md:px-8 rounded-2xl bg-slate-950 text-white mb-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-3">Есть ТЗ или нужна смета {city.nameIn}?</h2>
          <p className="text-slate-300 mb-6">
            Пришлите задачу — рассчитаем стоимость и сроки. Можно сразу в Telegram.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?goal=corporate"
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 rounded-lg font-semibold"
            >
              Оставить заявку
            </Link>
            <a
              href="https://t.me/DMITRYJS"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-white/25 rounded-lg font-medium"
            >
              Telegram
            </a>
          </div>
        </div>
      </section>

      <DevelopmentProcessSection
        title={`Как мы разрабатываем сайт ${city.nameIn}`}
        subtitle="От аналитики и ТЗ до дизайна, кода и запуска"
        phases={WEB_DEVELOPMENT_PROCESS.slice(0, 5)}
      />

      <section className="py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Примеры работ
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {WEB_DEV_CASES.map((c) => (
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
        <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
          Смотреть портфолио →
        </Link>
      </section>

      {showFaq && faq.length > 0 && (
        <section className="py-14 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Вопросы про разработку сайтов {city.nameIn}
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.question}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
              >
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  {item.question}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
