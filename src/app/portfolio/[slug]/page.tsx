import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getSlugFromLink, PORTFOLIO_PROJECTS } from '../data'
import SeoJsonLd from '../../components/SeoJsonLd'
import { SITE_URL } from '../../lib/seo'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => getSlugFromLink(p.link)).filter(Boolean).map((slug) => ({ slug: slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Проект не найден' }
  const url = `${SITE_URL}/portfolio/${slug}`
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Портфолио APSOD`,
      description: project.description,
      url,
      siteName: 'APSOD',
      type: 'website',
    },
  }
}

export default async function PortfolioSlugPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Портфолио', item: `${SITE_URL}/portfolio` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}/portfolio/${slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SeoJsonLd data={breadcrumbSchema} />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад к портфолио
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${project.color} text-3xl mb-6`}>
              {project.icon}
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{project.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-1 mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-500 dark:text-gray-400 mb-8">
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.location}</span>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Обсудить похожий проект
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
