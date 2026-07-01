import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BELARUS_CITIES, getCityBySlug } from '../../lib/belarus-cities'
import {
  buildPageMetadata,
  generateBreadcrumbSchema,
  generateCityLandingSchema,
  SITE_NAME,
} from '../../lib/seo'
import SeoJsonLd from '../../components/SeoJsonLd'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return BELARUS_CITIES.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) return { title: 'Город не найден' }

  return buildPageMetadata({
    title: `Разработка сайтов ${city.nameIn} — ${city.region}`,
    description: `Заказать разработку сайта, интернет-магазина или мобильного приложения ${city.nameIn}. SEO-продвижение, PWA, CRM и техподдержка. ${SITE_NAME} — IT-компания для бизнеса в ${city.region}.`,
    path: `/belarus/${city.slug}`,
    keywords: [
      `разработка сайтов ${city.name}`,
      `создание сайта ${city.name}`,
      `SEO ${city.name}`,
      `интернет-магазин ${city.name}`,
      `IT компания ${city.name}`,
      `веб-разработка ${city.region}`,
    ],
  })
}

const SERVICES = [
  { href: '/services/web-development', title: 'Разработка сайтов', desc: 'Корпоративные сайты, каталоги, интернет-магазины' },
  { href: '/services/seo', title: 'SEO-продвижение', desc: 'Google, Яндекс, локальная выдача' },
  { href: '/services/mobile-development', title: 'Мобильные приложения', desc: 'iOS, Android, React Native' },
  { href: '/services/pwa-development', title: 'PWA', desc: 'Веб-приложения с push-уведомлениями' },
  { href: '/services/technical-support', title: 'Техподдержка', desc: 'Сопровождение и обновления' },
  { href: '/services/ui-ux', title: 'UI/UX дизайн', desc: 'Интерфейсы и прототипы' },
]

export default async function BelarusCityPage({ params }: Props) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) notFound()

  const description = `IT-услуги ${city.nameIn}: разработка сайтов, интернет-магазинов, SEO и мобильных приложений для бизнеса ${city.region}.`

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
  ]

  const otherCities = BELARUS_CITIES.filter((c) => c.slug !== city.slug).slice(0, 6)

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SeoJsonLd data={schemas} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Главная</Link>
        {' / '}
        <Link href="/belarus" className="hover:text-blue-600">Беларусь</Link>
        {' / '}
        <span className="text-gray-700 dark:text-gray-300">{city.name}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Разработка сайтов {city.nameIn}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        {city.region} · население ~{city.population}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
        {SITE_NAME} создаёт сайты, интернет-магазины и цифровые продукты для компаний{' '}
        {city.nameIn} и всей {city.region}. Работаем удалённо и с офисом в Минске.
        Продвигаем проекты в Google и Яндексе с учётом белорусского рынка.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Услуги {city.nameIn}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {SERVICES.map((s) => (
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

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Заказать разработку сайта {city.nameIn}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
          Компании {city.nameIn} заказывают у {SITE_NAME} корпоративные сайты, лендинги,
          интернет-магазины и SEO-продвижение в Google и Яндексе. Мы подбираем стек под задачу
          (Next.js, React, Node.js), проектируем структуру под поисковые запросы региона{' '}
          {city.region} и сопровождаем проект после запуска. Оставьте заявку — подготовим
          оценку сроков и стоимости под ваш бизнес {city.nameIn}.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Почему {SITE_NAME} для бизнеса {city.nameGenitive}
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc pl-5">
          <li>15+ лет опыта в веб-разработке и digital</li>
          <li>Портфолио с проектами по всей Беларуси, включая {city.region}</li>
          <li>SEO под Google и Яндекс — важно для рынка РБ</li>
          <li>Современный стек: Next.js, React, Node.js, PWA</li>
          <li>Техподдержка и развитие проекта после запуска</li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-4 mb-12">
        <Link
          href="/contact"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Обсудить проект
        </Link>
        <Link
          href="/portfolio"
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500"
        >
          Портфолио
        </Link>
      </div>

      {otherCities.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            Другие города Беларуси
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
              href="/belarus"
              className="px-3 py-1.5 text-sm rounded-full text-blue-600 hover:underline"
            >
              Все города →
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
