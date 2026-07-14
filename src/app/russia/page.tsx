import Link from 'next/link'
import { Metadata } from 'next'
import { RUSSIA_CITIES } from '../lib/russia-cities'
import { buildPageMetadata, generateBreadcrumbSchema, generateItemListSchema, SITE_NAME } from '../lib/seo'
import { NATIONAL_RU_KEYWORDS } from '../lib/semantic-core'
import SeoJsonLd from '../components/SeoJsonLd'

export const metadata: Metadata = buildPageMetadata({
  title: 'Разработка сайтов в России — Москва и вся РФ удалённо',
  description:
    'Создание и разработка сайтов в России: фокус Москва, удалённо по всей РФ. Интернет-магазины, SEO в Яндексе и Google, мобильные приложения, PWA.',
  path: '/russia',
  keywords: NATIONAL_RU_KEYWORDS,
})

export default function RussiaIndexPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Главная', path: '/' },
    { name: 'Россия', path: '/russia' },
  ])

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
        {SITE_NAME} работает с клиентами по всей РФ удалённо. <strong>Гео-фокус — Москва</strong>:
        сайты, интернет-магазины, SEO в Яндексе и Google, PWA и мобильные приложения.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
        ИП в Витебске. Проекты для компаний из любого региона России — без локального офиса,
        с прозрачными сроками и сметой.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Приоритетный город
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {RUSSIA_CITIES.map((city) => (
          <Link
            key={city.slug}
            href={`/russia/${city.slug}`}
            className="block p-5 rounded-xl border border-blue-500 ring-1 ring-blue-500/30 bg-white dark:bg-gray-800 hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {city.name}
              <span className="ml-2 text-xs font-normal text-blue-500">приоритет</span>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{city.region}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Разработка сайтов {city.nameIn}
            </p>
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
