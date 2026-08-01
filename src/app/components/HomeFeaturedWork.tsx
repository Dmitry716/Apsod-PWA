import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { getCasePath, getFeaturedPortfolioProjects } from '../portfolio/data'

/** Oversized editorial cases — proof of craft at Apple/Microsoft scale of ambition */
export default function HomeFeaturedWork() {
  const projects = getFeaturedPortfolioProjects().slice(0, 4)

  return (
    <section className="bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 pt-20 md:pt-28 pb-6">
        <Reveal className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Работы
          </h2>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline shrink-0"
          >
            Все проекты
          </Link>
        </Reveal>
      </div>

      <div className="space-y-0">
        {projects.map((project, index) => {
          const odd = index % 2 === 1
          return (
            <Reveal key={project.id}>
              <Link
                href={getCasePath(project)}
                className="apsod-case-row group grid lg:grid-cols-12 border-t border-slate-200 dark:border-slate-800"
              >
                <div
                  className={`lg:col-span-8 relative min-h-[280px] md:min-h-[420px] lg:min-h-[520px] overflow-hidden bg-slate-100 dark:bg-slate-900 ${
                    odd ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/10 transition-colors duration-500" />
                </div>

                <div
                  className={`lg:col-span-4 flex flex-col justify-end p-8 md:p-12 lg:p-14 bg-white dark:bg-gray-950 ${
                    odd ? 'lg:order-1' : ''
                  }`}
                >
                  <p className="text-[11px] tracking-[0.22em] uppercase text-slate-400 mb-4">
                    {String(index + 1).padStart(2, '0')} · {project.category}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 group-hover:translate-x-1 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                    Открыть
                    <span
                      className="transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
