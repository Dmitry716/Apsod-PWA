import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  getAdjacentPortfolioProjects,
  getAllPortfolioSlugs,
  getCasePath,
  getProjectBySlug,
  isIndexedPortfolioCase,
  type PortfolioProject,
} from '../data'
import SeoJsonLd from '../../components/SeoJsonLd'
import AgencyPageHero from '../../components/AgencyPageHero'
import {
  buildPageMetadata,
  generateBreadcrumbSchema,
  generateCreativeWorkSchema,
} from '../../lib/seo'
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
    noIndex: !isIndexedPortfolioCase(project),
  })
}

function buildCaseParagraphs(project: PortfolioProject): string[] {
  const lead = [
    project.description,
    `Задача. ${project.challenge}`,
    `Решение. ${project.solution}`,
  ]
  const extra = project.detailParagraphs ?? [
    `Стек проекта: ${project.tags.join(', ')}. Формат — ${
      project.type === 'mobile' ? 'мобильный продукт' : 'веб-продукт'
    } для ${project.location}, с фокусом на понятный путь пользователя и дальнейшее развитие.`,
    project.results.length
      ? `После запуска зафиксировали: ${project.results.join('; ')}.`
      : `Проект рассчитан на сопровождение: контент, метрики и итерации после релиза.`,
  ]
  return [...lead, ...extra]
}

export default async function PortfolioSlugPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentPortfolioProjects(slug)
  const typeLabel = project.type === 'mobile' ? 'Мобильное приложение' : 'Веб-сайт'
  const paragraphs = buildCaseParagraphs(project)
  const introParagraphs = paragraphs.slice(0, 4)
  const afterGalleryParagraphs = paragraphs.slice(4)
  const gallery = (project.gallery ?? []).filter(Boolean)
  const pairGallery = gallery.slice(0, 2)
  const moreGallery = gallery.slice(2)

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

  const titleParts = project.title.split(/\s+/)
  const titleLead = titleParts.slice(0, Math.max(1, Math.ceil(titleParts.length / 2))).join(' ')
  const titleRest = titleParts.slice(Math.max(1, Math.ceil(titleParts.length / 2))).join(' ')

  const mediaBg =
    project.imageFit === 'contain' ? 'bg-[#050a1f]' : 'bg-slate-100 dark:bg-slate-900'

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SeoJsonLd data={[breadcrumbSchema, workSchema]} />

      <AgencyPageHero title="Детали проекта" crumb="Кейс" />

      <section className="pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="container mx-auto px-4">
          {/* Top: image + title / meta */}
          <div className="mb-14 grid items-center gap-10 lg:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div
                className={`relative min-w-0 overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-[5/6] ${mediaBg}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className={`object-top ${
                    project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                  }`}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <h1 className="font-display mb-10 text-[clamp(1.85rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-slate-300 dark:text-slate-600">
                <span className="text-slate-900 dark:text-white">{titleLead}</span>
                {titleRest ? <> {titleRest}</> : null}
              </h1>

              <ul className="space-y-4 text-base text-slate-600 dark:text-slate-300">
                <li className="flex flex-wrap gap-x-2">
                  <span className="text-slate-500 dark:text-slate-400">Клиент:</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {project.title}
                    {project.location ? ` (${project.location})` : null}
                  </span>
                </li>
                <li className="flex flex-wrap gap-x-2">
                  <span className="text-slate-500 dark:text-slate-400">Год:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{project.year}</span>
                </li>
                <li className="flex flex-wrap gap-x-2">
                  <span className="text-slate-500 dark:text-slate-400">Категория:</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {project.category} · {typeLabel}
                  </span>
                </li>
                <li className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-slate-500 dark:text-slate-400">Стек:</span>
                  <span className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </li>
                {project.liveUrl ? (
                  <li className="pt-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apsod-btn-solid inline-flex rounded-md px-5 py-2.5 text-sm font-semibold transition-colors"
                    >
                      Открыть сайт ↗
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {/* Case study body — Nerox text + gallery rhythm */}
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display mb-8 text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-slate-300 dark:text-slate-600">
              <span className="text-slate-900 dark:text-white">О проекте</span> — кейс
            </h2>

            <div className="space-y-6 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-[17px]">
              {introParagraphs.map((text) => (
                <p key={text.slice(0, 48)}>
                  {text.startsWith('Задача.') || text.startsWith('Решение.') ? (
                    <>
                      <strong className="font-semibold text-slate-900 dark:text-white">
                        {text.slice(0, text.indexOf('.') + 1)}{' '}
                      </strong>
                      {text.slice(text.indexOf('.') + 1).trim()}
                    </>
                  ) : (
                    text
                  )}
                </p>
              ))}
            </div>

            {/* Mid gallery — first two page screens */}
            {pairGallery.length > 0 ? (
              <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-7">
                {pairGallery.map((src, index) => (
                  <div
                    key={src}
                    className={`relative min-w-0 overflow-hidden rounded-2xl aspect-[16/11] border border-slate-200 dark:border-slate-800 ${mediaBg}`}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} — страница ${index + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-7">
                <div
                  className={`relative min-w-0 overflow-hidden rounded-2xl aspect-[16/11] border border-slate-200 dark:border-slate-800 ${mediaBg}`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — экран`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className={`relative min-w-0 overflow-hidden rounded-2xl aspect-[16/11] border border-slate-200 dark:border-slate-800 ${mediaBg}`}
                >
                  <Image
                    src={project.imageMobile ?? project.image}
                    alt={`${project.title} — детали`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}

            {afterGalleryParagraphs.length > 0 ? (
              <div className="mt-12 space-y-6 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:mt-14 md:text-[17px]">
                {afterGalleryParagraphs.map((text) => (
                  <p key={text.slice(0, 48)}>{text}</p>
                ))}
              </div>
            ) : null}

            {/* Extra page screens at the bottom */}
            {moreGallery.length > 0 ? (
              <div className="mt-12 md:mt-16">
                <h3 className="font-display mb-6 text-xl font-bold tracking-tight text-slate-900 dark:text-white md:mb-8">
                  Другие страницы сайта
                </h3>
                <div className="grid gap-5 sm:grid-cols-2 md:gap-7">
                  {moreGallery.map((src, index) => (
                    <div
                      key={src}
                      className={`relative min-w-0 overflow-hidden rounded-2xl aspect-[16/10] border border-slate-200 dark:border-slate-800 ${mediaBg}`}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} — экран ${index + 3}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-12 md:mt-14">
              <h3 className="font-display mb-5 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Результат
              </h3>
              <ul className="space-y-3">
                {project.results.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-slate-600 dark:text-slate-300"
                  >
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--apsod-accent)]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-slate-200 pt-10 dark:border-slate-800">
              <Link
                href={`/contact?goal=${project.type === 'mobile' ? 'mobile' : 'web'}&ref=${project.slug}`}
                className="apsod-btn-solid inline-flex rounded-md px-6 py-3 text-sm font-semibold transition-colors"
              >
                Обсудить похожий проект
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex rounded-md border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-slate-900 dark:border-slate-600 dark:text-slate-100 dark:hover:border-white"
              >
                Все кейсы
              </Link>
            </div>

            <nav
              className="mt-14 flex items-center justify-between gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 md:mt-16"
              aria-label="Соседние кейсы"
            >
              {prev ? (
                <Link
                  href={getCasePath(prev)}
                  className="group inline-flex max-w-[45%] items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-[var(--apsod-accent)] dark:text-slate-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="truncate">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400 group-hover:text-[var(--apsod-accent)]">
                      Назад
                    </span>
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}

              {next ? (
                <Link
                  href={getCasePath(next)}
                  className="group inline-flex max-w-[45%] items-center gap-2 text-right text-sm font-semibold text-slate-700 transition-colors hover:text-[var(--apsod-accent)] dark:text-slate-200"
                >
                  <span className="truncate">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400 group-hover:text-[var(--apsod-accent)]">
                      Далее
                    </span>
                    {next.title}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}
