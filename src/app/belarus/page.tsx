import Link from 'next/link'
import { Metadata } from 'next'
import { BELARUS_CITIES } from '../lib/belarus-cities'
import { buildPageMetadata, generateBreadcrumbSchema, generateItemListSchema, SITE_NAME } from '../lib/seo'
import SeoJsonLd from '../components/SeoJsonLd'

export const metadata: Metadata = buildPageMetadata({
  title: 'Разработка сайтов по всей Беларуси',
  description:
    'APSOD — IT-компания с охватом по всей РБ: Минск, Брест, Гомель, Витебск, Гродно, Могилёв и другие города. Разработка сайтов, интернет-магазинов, SEO и мобильных приложений.',
  path: '/belarus',
  keywords: [
    'разработка сайтов Беларусь',
    'IT компания РБ',
    'создание сайтов по Беларуси',
    'веб-разработка регионы',
  ],
})

export default function BelarusIndexPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Главная', path: '/' },
    { name: 'Беларусь', path: '/belarus' },
  ])

  const cityList = generateItemListSchema({
    name: 'Разработка сайтов в городах Беларуси',
    items: BELARUS_CITIES.map((city) => ({
      name: `Разработка сайтов ${city.name}`,
      url: `/belarus/${city.slug}`,
      description: `IT-услуги APSOD в ${city.nameIn}`,
    })),
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SeoJsonLd data={[breadcrumb, cityList]} />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Разработка сайтов и digital-услуги по всей Беларуси
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
        {SITE_NAME} работает с клиентами по всей РБ: от Минска до региональных центров.
        Создаём сайты, интернет-магазины, мобильные приложения и занимаемся SEO-продвижением
        в Google и Яндексе для белорусского рынка.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {BELARUS_CITIES.map((city) => (
          <Link
            key={city.slug}
            href={`/belarus/${city.slug}`}
            className="block p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {city.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{city.region}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Разработка сайтов {city.nameIn}
            </p>
          </Link>
        ))}
      </div>

      <section className="prose dark:prose-invert max-w-none">
        <h2>Услуги APSOD для бизнеса в РБ</h2>
        <ul>
          <li>
            <Link href="/services/web-development">Разработка сайтов и интернет-магазинов</Link>
          </li>
          <li>
            <Link href="/services/seo">SEO-продвижение в Google и Яндексе</Link>
          </li>
          <li>
            <Link href="/services/mobile-development">Мобильные приложения</Link>
          </li>
          <li>
            <Link href="/services/pwa-development">PWA-приложения</Link>
          </li>
          <li>
            <Link href="/services/technical-support">Техническая поддержка сайтов</Link>
          </li>
        </ul>
        <p>
          Также работаем в{' '}
          <Link href="/russia" className="text-blue-600 hover:underline">
            России (Москва и регионы)
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
