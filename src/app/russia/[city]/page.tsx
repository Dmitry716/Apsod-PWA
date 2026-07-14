import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RUSSIA_CITIES, getRussiaCityBySlug } from '../../lib/russia-cities'
import {
  buildPageMetadata,
  generateBreadcrumbSchema,
  generateCityLandingSchema,
  generateFAQSchema,
  SITE_NAME,
} from '../../lib/seo'
import {
  getCityContentBlocks,
  getCityFaq,
  getCityMetaKeywords,
  getCityPageDescription,
  getCityPageTitle,
  getRussiaGeoTier,
} from '../../lib/semantic-core'
import SeoJsonLd from '../../components/SeoJsonLd'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return RUSSIA_CITIES.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getRussiaCityBySlug(citySlug)
  if (!city) return { title: 'Город не найден' }

  const tier = getRussiaGeoTier(city.priority, city.slug)

  return buildPageMetadata({
    title: getCityPageTitle(city.nameIn),
    description: getCityPageDescription(city.nameIn, city.region),
    path: `/russia/${city.slug}`,
    keywords: getCityMetaKeywords(city.name, city.region, tier, 'Россия'),
  })
}

const SERVICES = [
  { href: '/services/web-development', title: 'Разработка сайтов', desc: 'Корпоративные сайты, каталоги, интернет-магазины' },
  { href: '/services/seo', title: 'SEO-продвижение', desc: 'Яндекс, Google, локальная выдача по РФ' },
  { href: '/services/mobile-development', title: 'Мобильные приложения', desc: 'iOS, Android, React Native' },
  { href: '/services/pwa-development', title: 'PWA', desc: 'Веб-приложения с push-уведомлениями' },
  { href: '/services/technical-support', title: 'Техподдержка', desc: 'Сопровождение и обновления' },
  { href: '/services/ui-ux', title: 'UI/UX дизайн', desc: 'Интерфейсы и прототипы' },
]

export default async function RussiaCityPage({ params }: Props) {
  const { city: citySlug } = await params
  const city = getRussiaCityBySlug(citySlug)
  if (!city) notFound()

  const isMoscow = city.slug === 'moscow'
  const description = isMoscow
    ? 'Разработка сайтов, интернет-магазинов и SEO в Москве — ключевой рынок APSOD в России.'
    : `IT-услуги ${city.nameIn}: разработка сайтов, SEO и мобильные приложения для ${city.region}.`

  const contentBlocks = getCityContentBlocks(city.name, city.nameIn, city.region)
  const cityFaq = getCityFaq(city.name, city.nameIn)

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Главная', path: '/' },
      { name: 'Россия', path: '/russia' },
      { name: city.name, path: `/russia/${city.slug}` },
    ]),
    generateCityLandingSchema({
      cityName: city.name,
      citySlug: city.slug,
      description,
      countryPath: 'russia',
      countryName: 'Russia',
    }),
    generateFAQSchema(cityFaq),
  ]

  const moscowRegionCities = RUSSIA_CITIES.filter(
    (c) => c.priority === 'primary' && c.slug !== city.slug
  ).slice(0, 6)
  const otherMajor = RUSSIA_CITIES.filter(
    (c) => c.priority === 'major' && c.slug !== city.slug
  ).slice(0, 5)

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SeoJsonLd data={schemas} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Главная</Link>
        {' / '}
        <Link href="/russia" className="hover:text-blue-600">Россия</Link>
        {' / '}
        <span className="text-gray-700 dark:text-gray-300">{city.name}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {isMoscow
          ? 'Разработка сайтов в Москве — создание сайта, SEO и приложения'
          : `Разработка сайтов ${city.nameIn} — создание сайта и SEO`}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        {city.region} · население ~{city.population}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
        {SITE_NAME} создаёт сайты, интернет-магазины и digital-продукты для компаний{' '}
        {city.nameIn} и всей России.
        {isMoscow
          ? ' Москва — наш приоритетный рынок в РФ: SEO в Яндексе и Google, e-commerce, PWA и мобильные приложения.'
          : ' Работаем удалённо по всей РФ из Витебска. Основной фокус — Москва и Московская область.'}
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

      {contentBlocks.map((block) => (
        <section key={block.h2} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {block.h2}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            {block.body}
          </p>
        </section>
      ))}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Заказать сайт {city.nameIn}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
          Бизнес {city.nameIn} заказывает у {SITE_NAME} сайт с нуля, интернет-магазин, мобильные
          приложения и SEO в Яндексе и Google. Для {city.region} важны скорость, адаптив и
          локальное продвижение — закладываем это в архитектуру и контент. Консультация: обсудим
          задачу и план работ по созданию сайта {city.nameIn}.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          {isMoscow ? 'Почему APSOD для бизнеса в Москве' : `Почему APSOD для бизнеса ${city.nameGenitive}`}
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc pl-5">
          <li>15+ лет опыта, проекты для рынков РФ и СНГ</li>
          <li>SEO под Яндекс и Google — критично для российского рынка</li>
          <li>Разработка на Next.js, React, PWA с push-уведомлениями</li>
          <li>Удалённая работа по всей России, прозрачные процессы</li>
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
          href="/pricing"
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500"
        >
          Цены
        </Link>
        <Link
          href="/portfolio"
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500"
        >
          Портфолио
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Вопросы про разработку сайтов {city.nameIn}
        </h2>
        <div className="space-y-3">
          {cityFaq.map((item) => (
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

      {(moscowRegionCities.length > 0 || otherMajor.length > 0) && (
        <section className="space-y-6">
          {moscowRegionCities.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Москва и Московская область
              </h2>
              <div className="flex flex-wrap gap-2">
                {moscowRegionCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/russia/${c.slug}`}
                    className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {otherMajor.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Другие города России
              </h2>
              <div className="flex flex-wrap gap-2">
                {otherMajor.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/russia/${c.slug}`}
                    className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    {c.name}
                  </Link>
                ))}
                <Link
                  href="/russia"
                  className="px-3 py-1.5 text-sm rounded-full text-blue-600 hover:underline"
                >
                  Все города РФ →
                </Link>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
