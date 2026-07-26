import Link from 'next/link'
import {
  VITEBSK_AUDIENCES,
  VITEBSK_CASES,
  VITEBSK_ENGAGEMENT,
  getVitebskSeoBlocks,
} from '../lib/vitebsk-seo'
import { formatDualPrice } from '../lib/currency'
import { SITE_NAME } from '../lib/seo'

/** Дополнительные деловые секции только для /belarus/vitebsk */
export default function VitebskLandingSections() {
  const blocks = getVitebskSeoBlocks()

  return (
    <>
      <section className="py-12 md:py-14 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Для кого создаём сайты в Витебске
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Не «сайт ради сайта», а рабочий канал заявок под задачу бизнеса в городе и области.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {VITEBSK_AUDIENCES.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-14 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Как мы работаем с клиентами в Витебске
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Понятный процесс без хаоса: договор, этапы, фиксируемые результаты на каждой вехе.
        </p>
        <ol className="grid md:grid-cols-2 gap-4">
          {VITEBSK_ENGAGEMENT.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-5"
            >
              <span className="text-xs font-mono text-slate-400">{item.step}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-1 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-12 md:py-14 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Кейсы APSOD в Витебске
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Локальные проекты на уникальном коде — аргумент для бизнеса, которому важны заявки, а не
          «красивая картинка».
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {VITEBSK_CASES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-5 hover:border-blue-500 transition-colors"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
                {c.niche}
              </p>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {c.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{c.result}</p>
            </Link>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          Ориентир по цене:{' '}
          <Link href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">
            от {formatDualPrice(8000)}
          </Link>
          {' · '}
          <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline">
            всё портфолио
          </Link>
        </p>
      </section>

      <section className="py-12 md:py-14 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Почему {SITE_NAME} для бизнеса Витебска
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
          {[
            'ИП и команда в Витебске — локальный подрядчик, не «удалёнка без адреса»',
            'Только уникальный код: без Tilda, Wix и типовых тем',
            'Кейсы в городе: Amba Detail, Maxximum, Динамо-Витебск, ArtDetailing, BMservice',
            'SEO и раскрутка под Яндекс и Google с учётом рынка РБ',
            'Договор, поэтаная оплата, смета за 1 рабочий день',
            'Сопровождение после запуска: поддержка, SEO, GEO по необходимости',
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 p-4"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-12 md:py-14 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
          Создание, разработка и продвижение в Витебске
        </h2>
        <div className="space-y-8">
          {blocks.map((block) => (
            <article key={block.h2}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{block.h2}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">{block.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
