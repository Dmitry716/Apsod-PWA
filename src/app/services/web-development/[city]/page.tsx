import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BELARUS_CITIES, getCityBySlug } from '../../../lib/belarus-cities'
import {
  buildPageMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
  SITE_NAME,
  SITE_URL,
} from '../../../lib/seo'
import { getCityFaq } from '../../../lib/semantic-core'
import { formatDualPrice } from '../../../lib/currency'
import SeoJsonLd from '../../../components/SeoJsonLd'
import CityWebDevOffer from '../../../components/CityWebDevOffer'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return BELARUS_CITIES.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) return { title: 'Город не найден' }

  return buildPageMetadata({
    title: `Разработка и продвижение сайтов ${city.nameIn} | APSOD`,
    description: `Разработка и продвижение сайтов ${city.nameIn}: лендинг, корпоративный, каталог, магазин на уникальном коде. Смета ${formatDualPrice(8000)}. APSOD.`,
    path: `/services/web-development/${city.slug}`,
    canonicalPath: `/belarus/${city.slug}`,
    absoluteTitle: true,
    keywords: [
      `разработка и продвижение сайтов ${city.name}`,
      `разработка сайтов ${city.name}`,
      `продвижение сайтов ${city.name}`,
      `заказать сайт ${city.name}`,
    ],
  })
}

export default async function WebDevelopmentCityPage({ params }: Props) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) notFound()

  const cityFaq = getCityFaq(city.name, city.nameIn)
  const description = `Разработка и продвижение сайтов ${city.nameIn} на уникальном коде. Лендинг, корпоративный сайт, каталог, интернет-магазин.`

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Главная', path: '/' },
      { name: 'Услуги', path: '/services' },
      { name: 'Веб-разработка', path: '/services/web-development' },
      { name: city.name, path: `/services/web-development/${city.slug}` },
    ]),
    generateFAQSchema(cityFaq),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Разработка и продвижение сайтов ${city.nameIn}`,
      description,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      areaServed: {
        '@type': 'City',
        name: city.name,
        containedInPlace: { '@type': 'Country', name: 'Belarus' },
      },
      url: `${SITE_URL}/belarus/${city.slug}`,
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <SeoJsonLd data={schemas} />

        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Главная
          </Link>
          {' / '}
          <Link href="/services" className="hover:text-blue-600">
            Услуги
          </Link>
          {' / '}
          <Link href="/services/web-development" className="hover:text-blue-600">
            Веб-разработка
          </Link>
          {' / '}
          <span className="text-gray-700 dark:text-gray-300">{city.name}</span>
        </nav>

        <CityWebDevOffer city={city} showHero showFaq faq={cityFaq} />

        <p className="mt-8 text-sm text-gray-500">
          Основная страница города:{' '}
          <Link href={`/belarus/${city.slug}`} className="text-blue-600 hover:underline">
            IT-услуги {city.nameIn}
          </Link>
          {' · '}
          <Link href="/services/web-development" className="text-blue-600 hover:underline">
            Все о веб-разработке
          </Link>
        </p>
      </div>
    </div>
  )
}
