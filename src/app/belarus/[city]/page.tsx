import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BELARUS_CITIES, getCityBySlug } from '../../lib/belarus-cities'
import {
  buildPageMetadata,
  generateBreadcrumbSchema,
  generateCityLandingSchema,
  generateFAQSchema,
  SITE_NAME,
  SITE_URL,
} from '../../lib/seo'
import {
  getBelarusGeoTier,
  getCityContentBlocks,
  getCityFaq,
  getCityMetaKeywords,
} from '../../lib/semantic-core'
import { cityPageSnippet } from '../../lib/page-snippets'
import SeoJsonLd from '../../components/SeoJsonLd'
import CityWebDevOffer from '../../components/CityWebDevOffer'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return BELARUS_CITIES.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) return { title: 'Город не найден' }

  const tier = getBelarusGeoTier(city.slug)
  const snippet = cityPageSnippet(city.name, city.nameIn, city.region)

  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    path: `/belarus/${city.slug}`,
    absoluteTitle: snippet.absoluteTitle,
    keywords: [
      ...snippet.keywords!,
      ...getCityMetaKeywords(city.name, city.region, tier, 'Беларусь'),
    ],
  })
}

const OTHER_SERVICES = [
  { href: '/services/seo', title: 'SEO-продвижение', desc: 'Google, Яндекс, органика' },
  { href: '/services/geo-promotion', title: 'GEO-продвижение', desc: 'AI-видимость в нейросетях' },
  { href: '/services/mobile-development', title: 'Мобильные приложения', desc: 'iOS, Android, React Native' },
  { href: '/services/pwa-development', title: 'PWA', desc: 'Веб-приложения с push' },
  { href: '/services/technical-support', title: 'Техподдержка', desc: 'Сопровождение после запуска' },
  { href: '/services/ui-ux', title: 'UI/UX дизайн', desc: 'Интерфейсы и прототипы' },
]

export default async function BelarusCityPage({ params }: Props) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) notFound()

  const description = `Разработка сайтов под ключ ${city.nameIn}: лендинг, корпоративный сайт, каталог, интернет-магазин на уникальном коде. SEO и сопровождение.`

  const contentBlocks = getCityContentBlocks(city.name, city.nameIn, city.region)
  const cityFaq = getCityFaq(city.name, city.nameIn)

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Разработка сайтов под ключ ${city.nameIn}`,
    description,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'Country', name: 'Belarus' },
    },
    url: `${SITE_URL}/belarus/${city.slug}`,
  }

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Главная', path: '/' },
      { name: 'Беларусь', path: '/belarus' },
      { name: city.name, path: `/belarus/${city.slug}` },
    ]),
    generateCityLandingSchema({
      cityName: city.name,
      citySlug: city.slug,
      description,
      countryPath: 'belarus',
    }),
    generateFAQSchema(cityFaq),
    serviceSchema,
  ]

  const otherCities = BELARUS_CITIES.filter((c) => c.slug !== city.slug)

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <SeoJsonLd data={schemas} />

        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Главная
          </Link>
          {' / '}
          <Link href="/belarus" className="hover:text-blue-600">
            Беларусь
          </Link>
          {' / '}
          <span className="text-gray-700 dark:text-gray-300">{city.name}</span>
        </nav>

        <CityWebDevOffer city={city} showHero showFaq faq={cityFaq} />

        <section className="py-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Другие услуги {city.nameIn}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {OTHER_SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">{s.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{s.desc}</p>
              </Link>
            ))}
          </div>

          {contentBlocks.slice(0, 2).map((block) => (
            <section key={block.h2} className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {block.h2}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {block.body}
              </p>
            </section>
          ))}

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Почему {SITE_NAME} для бизнеса {city.nameGenitive}
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc pl-5">
              <li>15+ лет опыта в веб-разработке и digital</li>
              <li>Уникальный код без конструкторов</li>
              <li>SEO под Google и Яндекс с учётом рынка РБ</li>
              <li>База в Витебске, удалённая работа по Беларуси</li>
              <li>Техподдержка и развитие после запуска</li>
            </ul>
          </section>
        </section>

        {otherCities.length > 0 && (
          <section className="pt-6 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Другие города
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/belarus/${c.slug}`}
                  className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                  {c.name}
                </Link>
              ))}
              <Link
                href={`/services/web-development/${city.slug}`}
                className="px-3 py-1.5 text-sm rounded-full text-blue-600 hover:underline"
              >
                Посадочная услуги →
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
