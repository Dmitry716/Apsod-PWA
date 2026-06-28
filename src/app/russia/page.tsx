import Link from 'next/link'
import { Metadata } from 'next'
import { RUSSIA_CITIES } from '../lib/russia-cities'
import { buildPageMetadata, generateBreadcrumbSchema, generateItemListSchema, SITE_NAME } from '../lib/seo'
import SeoJsonLd from '../components/SeoJsonLd'

export const metadata: Metadata = buildPageMetadata({
  title: 'Разработка сайтов в России — Москва и регионы',
  description:
    'APSOD — разработка сайтов, интернет-магазинов, SEO и мобильных приложений по всей России. Основной фокус: Москва и Московская область. Яндекс, Google, PWA.',
  path: '/russia',
  keywords: [
    'разработка сайтов Россия',
    'разработка сайтов Москва',
    'SEO Москва',
    'SEO продвижение Россия',
    'создание сайта Москва',
    'IT компания Москва',
    'интернет-магазин Москва',
    'веб-разработка Московская область',
  ],
})

export default function RussiaIndexPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Главная', path: '/' },
    { name: 'Россия', path: '/russia' },
  ])

  const moscowRegion = RUSSIA_CITIES.filter((c) => c.priority === 'primary')
  const majorCities = RUSSIA_CITIES.filter((c) => c.priority === 'major' || c.priority === 'regional')

  const cityList = generateItemListSchema({
    name: 'Разработка сайтов в городах России',
    items: RUSSIA_CITIES.map((city) => ({
      name: `Разработка сайтов ${city.name}`,
      url: `/russia/${city.slug}`,
      description: `SEO и веб-разработка ${city.nameIn}`,
    })),
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SeoJsonLd data={[breadcrumb, cityList]} />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Разработка сайтов и SEO в России
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-3xl">
        {SITE_NAME} работает с клиентами по всей РФ. <strong>Основной фокус — Москва</strong> и
        Московская область: SEO в Яндексе и Google, сайты, интернет-магазины, PWA и мобильные
        приложения.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
        Офис в Минске, удалённая работа по всей России. Портфолио включает проекты для рынков РФ и
        СНГ.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Москва и Московская область
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {moscowRegion.map((city) => (
          <Link
            key={city.slug}
            href={`/russia/${city.slug}`}
            className={`block p-5 rounded-xl border bg-white dark:bg-gray-800 hover:shadow-md transition-all ${
              city.slug === 'moscow'
                ? 'border-blue-500 ring-1 ring-blue-500/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'
            }`}
          >
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {city.name}
              {city.slug === 'moscow' && (
                <span className="ml-2 text-xs font-normal text-blue-500">приоритет</span>
              )}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{city.region}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Разработка сайтов {city.nameIn}
            </p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Крупные города России
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {majorCities.map((city) => (
          <Link
            key={city.slug}
            href={`/russia/${city.slug}`}
            className="block p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {city.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{city.region}</p>
          </Link>
        ))}
      </div>

      <section className="prose dark:prose-invert max-w-none">
        <h2>Услуги APSOD для рынка РФ</h2>
        <ul>
          <li>
            <Link href="/services/web-development">Разработка сайтов и интернет-магазинов</Link>
          </li>
          <li>
            <Link href="/services/seo">SEO-продвижение в Яндексе и Google</Link>
          </li>
          <li>
            <Link href="/services/mobile-development">Мобильные приложения</Link>
          </li>
          <li>
            <Link href="/services/pwa-development">PWA-приложения</Link>
          </li>
        </ul>
        <p>
          Также работаем в{' '}
          <Link href="/belarus" className="text-blue-600 hover:underline">
            Беларуси
          </Link>
          .{' '}
          <Link href="/contact" className="text-blue-600 hover:underline">
            Связаться с нами →
          </Link>
        </p>
      </section>
    </div>
  )
}
