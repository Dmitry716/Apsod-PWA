import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { getCasePath, getFeaturedPortfolioProjects } from '../portfolio/data'

/** Oversized editorial cases — hero case + alternating grid */
export default function HomeFeaturedWork() {
  const featured = getFeaturedPortfolioProjects()
  const [hero, ...rest] = featured
  const projects = rest.slice(0, 3)

  return (
    <section className="bg-white dark:bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 pt-20 md:pt-28 pb-6">
        <Reveal className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="apsod-section-marker mb-3">03 · Cases</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em]">
              Работы
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="apsod-link-nudge text-[12px] font-semibold tracking-[0.12em] uppercase text-slate-500 hover:text-sky-600 dark:hover:text-sky-300 shrink-0"
          >
            Все проекты
          </Link>
        </Reveal>
      </div>

      {hero ? (
        <Reveal>
          <Link
            href={getCasePath(hero)}
            className="apsod-case-row group relative block border-t border-slate-200 dark:border-[var(--border-color)] overflow-hidden bg-[var(--apsod-immersive)] text-white"
          >
            <div className="relative min-h-[min(72svh,640px)] md:min-h-[min(78svh,720px)]">
              <Image
                src={hero.image}
                alt={hero.title}
                fill
                priority
                className="object-cover opacity-90 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                style={{ objectPosition: hero.imageObjectPosition ?? 'center' }}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--apsod-immersive)] via-[#05070d]/55 to-[#05070d]/15" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--apsod-immersive)]/85 via-transparent to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 lg:p-20">
                <p className="text-[11px] tracking-[0.22em] uppercase text-sky-300/90 mb-4">
                  Избранный кейс · {hero.category}
                </p>
                <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] mb-4 max-w-3xl leading-[1.02]">
                  {hero.title}
                </h3>
                <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
                  {hero.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] uppercase text-white">
                  Смотреть кейс
                  <span
                    className="transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ) : null}

      <div className="space-y-0">
        {projects.map((project, index) => {
          const odd = index % 2 === 1
          return (
            <Reveal key={project.id}>
              <Link
                href={getCasePath(project)}
                className="apsod-case-row group grid lg:grid-cols-12 border-t border-slate-200 dark:border-[var(--border-color)]"
              >
                <div
                  className={`lg:col-span-8 relative min-h-[280px] md:min-h-[420px] lg:min-h-[520px] overflow-hidden bg-slate-100 dark:bg-slate-900/80 ${
                    odd ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain object-center p-4 md:p-6 transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.04] transition-colors duration-500" />
                </div>

                <div
                  className={`lg:col-span-4 flex flex-col justify-end p-8 md:p-12 lg:p-14 bg-white dark:bg-[var(--bg-primary)] ${
                    odd ? 'lg:order-1' : ''
                  }`}
                >
                  <p className="text-[11px] tracking-[0.22em] uppercase text-slate-400 mb-4">
                    {String(index + 2).padStart(2, '0')} · {project.category}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] mb-6 group-hover:translate-x-1 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] uppercase text-slate-900 dark:text-white">
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
