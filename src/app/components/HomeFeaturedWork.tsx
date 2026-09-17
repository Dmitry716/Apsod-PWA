import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { getCasePath, getFeaturedPortfolioProjects } from '../portfolio/data'

/** Featured cases as lab panel rows */
export default function HomeFeaturedWork() {
  const featured = getFeaturedPortfolioProjects()
  const [hero, ...rest] = featured
  const projects = rest.slice(0, 3)

  return (
    <section className="border-b border-slate-200 dark:border-[var(--border-color)] bg-white dark:bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <Reveal className="mb-4 flex items-end justify-between gap-4">
          <div className="apsod-lab-panel__title text-slate-500 dark:text-slate-400">
            Cases / Featured
          </div>
          <Link
            href="/portfolio"
            className="apsod-lab-mono text-[11px] tracking-[0.12em] uppercase text-slate-500 hover:text-sky-600 dark:hover:text-sky-300"
          >
            All projects →
          </Link>
        </Reveal>

        <div className="apsod-lab-panel overflow-hidden">
          {hero ? (
            <Reveal>
              <Link
                href={getCasePath(hero)}
                className="apsod-case-row group relative block overflow-hidden bg-slate-950 text-white border-b border-slate-800"
              >
                <div className="relative min-h-[min(58svh,520px)] md:min-h-[min(64svh,600px)]">
                  <Image
                    src={hero.image}
                    alt={hero.title}
                    fill
                    priority
                    className="object-cover opacity-90 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    style={{ objectPosition: hero.imageObjectPosition ?? 'center' }}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-transparent to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
                    <p className="apsod-lab-mono text-[11px] tracking-[0.16em] uppercase text-sky-300/90 mb-3">
                      01 · {hero.category}
                    </p>
                    <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] mb-3 max-w-3xl leading-[1.02]">
                      {hero.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed mb-5">
                      {hero.description}
                    </p>
                    <span className="apsod-lab-mono text-[11px] tracking-[0.12em] uppercase text-white inline-flex items-center gap-2">
                      Open case
                      <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ) : null}

          {projects.map((project, index) => {
            const odd = index % 2 === 1
            return (
              <Reveal key={project.id}>
                <Link
                  href={getCasePath(project)}
                  className="apsod-case-row group grid lg:grid-cols-12 border-t border-slate-200 dark:border-[var(--border-color)]"
                >
                  <div
                    className={`lg:col-span-8 relative min-h-[220px] md:min-h-[320px] lg:min-h-[380px] overflow-hidden bg-slate-100 dark:bg-slate-900/80 ${
                      odd ? 'lg:order-2' : ''
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain object-center p-4 md:p-5 transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>

                  <div
                    className={`lg:col-span-4 flex flex-col justify-end p-6 md:p-8 lg:p-10 bg-white dark:bg-[var(--bg-primary)] ${
                      odd ? 'lg:order-1' : ''
                    }`}
                  >
                    <p className="apsod-lab-mono text-[11px] tracking-[0.16em] uppercase text-slate-400 mb-3">
                      {String(index + 2).padStart(2, '0')} · {project.category}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] mb-5 group-hover:translate-x-1 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <span className="apsod-lab-mono text-[11px] tracking-[0.12em] uppercase text-slate-900 dark:text-white inline-flex items-center gap-2">
                      Open
                      <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
