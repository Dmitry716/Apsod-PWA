import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllReadySiteSlugs, getReadySiteBySlug } from '../data'
import SeoJsonLd from '../../components/SeoJsonLd'
import PageBreadcrumbs from '../../components/PageBreadcrumbs'
import {
  SITE_URL,
  buildCanonical,
  buildPageMetadata,
  generateBreadcrumbSchema,
  getOrganizationId,
} from '../../lib/seo'
import { readySiteSnippet } from '../../lib/page-snippets'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllReadySiteSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const site = getReadySiteBySlug(slug)
  if (!site) return { title: 'Лот не найден' }
  const snippet = readySiteSnippet(site)
  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    path: `/ready-sites/${slug}`,
    keywords: snippet.keywords,
    absoluteTitle: true,
    images: [site.image],
  })
}

function generateProductSchema(site: ReturnType<typeof getReadySiteBySlug>) {
  if (!site) return null
  const url = buildCanonical(`/ready-sites/${site.slug}`)
  return {
    '@type': 'Product',
    name: site.title,
    description: site.subtitle,
    image: `${SITE_URL.replace(/\/$/, '')}${site.image}`,
    url,
    brand: { '@id': getOrganizationId() },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'BYN',
      price: site.bynAmount,
      availability:
        site.status === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
      seller: { '@id': getOrganizationId() },
    },
  }
}

export default async function ReadySiteSlugPage({ params }: Props) {
  const { slug } = await params
  const site = getReadySiteBySlug(slug)
  if (!site) notFound()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Главная', path: '/' },
    { name: 'Готовые сайты', path: '/ready-sites' },
    { name: site.title, path: `/ready-sites/${slug}` },
  ])
  const productSchema = generateProductSchema(site)
  const contactHref = `/contact?goal=ready-site&budget=ready-8k&ref=${site.slug}&ready-site=${site.slug}`

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SeoJsonLd data={[breadcrumbSchema, ...(productSchema ? [productSchema] : [])]} />
      <PageBreadcrumbs
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Готовые сайты', path: '/ready-sites' },
          { name: site.title, path: `/ready-sites/${slug}` },
        ]}
      />

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8 overflow-hidden rounded-2xl aspect-video bg-gray-200 dark:bg-gray-700">
              <Image
                src={site.image}
                alt={site.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
              <span className="absolute top-4 left-4 rounded-md bg-blue-600 text-white text-xs font-semibold px-2.5 py-1">
                {site.status === 'available' ? 'В продаже' : 'Продан'}
              </span>
            </div>

            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{site.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-1 mb-3">
              {site.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {site.subtitle}
            </p>

            <div className="flex flex-wrap items-end gap-6 mb-8 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Цена передачи</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{site.priceByn}</div>
                <div className="text-gray-600 dark:text-gray-300">{site.priceRub}</div>
              </div>
              <div className="flex flex-wrap gap-3 ml-auto">
                <Link
                  href={contactHref}
                  className="apsod-cta-primary inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                >
                  Купить / обсудить
                </Link>
                <a
                  href={site.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-800 dark:text-gray-100 hover:border-blue-500 transition-colors"
                >
                  Смотреть демо
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">{site.demoNote}</p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-12">
              {site.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm text-gray-800 dark:text-gray-100"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-6 mb-12">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Почему это не шаблон
                </h2>
                <ul className="space-y-2">
                  {site.whyNotTemplate.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-700 dark:text-gray-200">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Что входит</h2>
                <ul className="space-y-2">
                  {site.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-700 dark:text-gray-200">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Что не входит</h2>
                <ul className="space-y-2">
                  {site.excludes.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-600 dark:text-gray-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/80 dark:bg-blue-950/30 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">SEO и GEO</h2>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{site.seoPitch}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={contactHref}
                className="apsod-cta-primary inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
              >
                Забронировать лот
              </Link>
              {site.portfolioSlug ? (
                <Link
                  href={`/portfolio/${site.portfolioSlug}`}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-800 dark:text-gray-100 hover:border-blue-500 transition-colors"
                >
                  Кейс в портфолио
                </Link>
              ) : null}
              <Link
                href="/ready-sites"
                className="inline-flex items-center px-6 py-3 text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Все готовые сайты
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
