import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPortfolioSlugs, getProjectBySlug } from '../data'
import SeoJsonLd from '../../components/SeoJsonLd'
import { buildPageMetadata, generateCreativeWorkSchema, generateBreadcrumbSchema } from '../../lib/seo'
import { portfolioCaseSnippet } from '../../lib/page-snippets'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPortfolioSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Проект не найден' }
  const snippet = portfolioCaseSnippet(project.title, project.description)
  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    path: `/portfolio/${slug}`,
    keywords: [...(snippet.keywords ?? []), ...project.tags, project.category],
    images: [project.image],
  })
}

export default async function PortfolioSlugPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Главная', path: '/' },
    { name: 'Портфолио', path: '/portfolio' },
    { name: project.title, path: `/portfolio/${slug}` },
  ])
  const workSchema = generateCreativeWorkSchema({
    title: project.title,
    description: project.description,
    slug,
    image: project.image,
    location: project.location,
    year: project.year,
  })

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SeoJsonLd data={[breadcrumbSchema, workSchema]} />
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
            <div className="relative mb-8 overflow-hidden rounded-2xl aspect-video bg-gray-200 dark:bg-gray-700">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r ${project.color}`} />
            </div>

            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{project.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-1 mb-4">
              {project.title}
            </h1>
            {project.forSale && project.readySiteSlug ? (
              <div className="mb-8 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-blue-900 dark:text-blue-100">
                    В продаже: разработка с нуля + SEO и GEO
                  </p>
                  <p className="text-sm text-blue-800/90 dark:text-blue-200/90 mt-1">
                    Готовый продукт APSOD: ребренд, перенос на ваш домен, база под поиск и нейросети.
                  </p>
                </div>
                <Link
                  href={`/ready-sites/${project.readySiteSlug}`}
                  className="inline-flex justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg whitespace-nowrap"
                >
                  Смотреть лот
                </Link>
              </div>
            ) : null}
            <div className="flex flex-wrap items-center gap-3 text-gray-500 dark:text-gray-400 mb-8">
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.location}</span>
              <span>•</span>
              <span>{project.type === 'web' ? 'Веб' : 'Мобильное'}</span>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              {project.description}
            </p>

            <div className="space-y-6 mb-10">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <h2 className="text-sm font-semibold tracking-wide uppercase text-blue-600 dark:text-blue-400 mb-2">
                  Задача
                </h2>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{project.challenge}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <h2 className="text-sm font-semibold tracking-wide uppercase text-blue-600 dark:text-blue-400 mb-2">
                  Решение
                </h2>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{project.solution}</p>
              </div>
              <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/80 dark:bg-blue-950/30 p-6">
                <h2 className="text-sm font-semibold tracking-wide uppercase text-blue-600 dark:text-blue-400 mb-3">
                  Результат
                </h2>
                <ul className="space-y-2">
                  {project.results.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-800 dark:text-gray-100">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/contact?goal=${project.type === 'mobile' ? 'mobile' : 'web'}&ref=${project.slug}`}
                className="apsod-cta-primary inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                <span className="inline-flex items-center">
                  Обсудить похожий проект
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-800 dark:text-gray-100 hover:border-blue-500 transition-colors"
                >
                  Открыть сайт
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
