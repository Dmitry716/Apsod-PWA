'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { getCasePath, getFeaturedPortfolioProjects } from '../portfolio/data'
import { useLocale } from '../lib/useLocale'

/** Arigo-style featured projects — large media, bold titles */
export default function HomeFeaturedWork() {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  const projects = getFeaturedPortfolioProjects().slice(0, 3)

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.18em] text-white/45">03</span>
              <span className="h-px w-16 bg-white/15 sm:w-24" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]">
              {isEn ? 'Selected work' : 'Избранные кейсы'}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
          >
            {isEn ? 'View all projects' : 'Все проекты'} →
          </Link>
        </Reveal>

        <div className="space-y-14 md:space-y-20">
          {projects.map((project, index) => (
            <Reveal key={project.id} stagger={(Math.min(index, 4) + 1) as 1 | 2 | 3 | 4 | 5}>
              <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                <Link
                  href={getCasePath(project)}
                  className={`relative block overflow-hidden rounded-[24px] bg-zinc-900 lg:col-span-7 ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority={index === 0}
                    />
                  </div>
                </Link>

                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                    {String(index + 1).padStart(2, '0')} / {project.category}
                  </p>
                  <h3 className="font-display mb-5 text-[clamp(1.5rem,2.8vw,2.35rem)] font-extrabold uppercase leading-[1.1] tracking-tight">
                    <Link href={getCasePath(project)} className="transition-colors hover:text-orange-300">
                      {project.title}
                    </Link>
                  </h3>
                  <Link
                    href={getCasePath(project)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
                  >
                    {isEn ? 'View project' : 'Смотреть кейс'}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
