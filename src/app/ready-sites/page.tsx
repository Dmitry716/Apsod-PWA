import Link from 'next/link'
import Image from 'next/image'
import { buildSnippetMetadata } from '../lib/seo'
import PageBreadcrumbs from '../components/PageBreadcrumbs'
import { READY_SITES } from './data'

export const metadata = buildSnippetMetadata('/ready-sites')

export default function ReadySitesPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Готовые сайты', path: '/ready-sites' },
        ]}
      />

      <section className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
              Ready sites
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Готовые сайты — разработка с нуля
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Не шаблоны и не конструкторы: уникальный код APSOD, уже собранный продукт. Ребренд под
              ваш бренд, перенос на ваш домен, база SEO и GEO. Быстрее и дешевле, чем полный цикл с
              нуля — без потери качества.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {READY_SITES.map((site) => (
              <article
                key={site.slug}
                className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <Link href={`/ready-sites/${site.slug}`} className="block">
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={site.image}
                      alt={site.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {site.status === 'available' ? (
                      <span className="absolute top-3 left-3 rounded-md bg-blue-600 text-white text-xs font-semibold px-2.5 py-1">
                        В продаже
                      </span>
                    ) : (
                      <span className="absolute top-3 left-3 rounded-md bg-gray-800 text-white text-xs font-semibold px-2.5 py-1">
                        Продан
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {site.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {site.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {site.subtitle}
                    </p>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {site.priceByn}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{site.priceRub}</div>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                        Смотреть лот →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
