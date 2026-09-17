import Link from 'next/link'
import { blogPosts } from './blog/data/posts'
import { buildSnippetMetadata, generateFAQSchema } from './lib/seo'
import { HOMEPAGE_FAQ } from './lib/homepage-faq'
import SeoJsonLd from './components/SeoJsonLd'
import HomeSeoSection from './components/HomeSeoSection'
import HomeHero from './components/HomeHero'
import HomeFeaturedWork from './components/HomeFeaturedWork'
import HomeDeviceShowcase from './components/HomeDeviceShowcase'
import HomeCapabilityIndex from './components/HomeCapabilityIndex'
import TechStackSection from './components/TechStackSection'
import VisualMarquee from './components/VisualMarquee'
import HomeLabStatusBar from './components/HomeLabStatusBar'
import Reveal from './components/Reveal'

export const metadata = buildSnippetMetadata('/')

export default function Home() {
  return (
    <div className="apsod-lab-shell min-h-screen">
      <SeoJsonLd data={generateFAQSchema([...HOMEPAGE_FAQ])} />

      <HomeLabStatusBar />
      <HomeHero />

      <HomeDeviceShowcase />
      <VisualMarquee title="В работе" />
      <HomeFeaturedWork />
      <HomeCapabilityIndex />
      <TechStackSection title="С чем работаем" />

      <section className="border-b border-slate-200 dark:border-[var(--border-color)] bg-white dark:bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <Reveal>
            <div className="apsod-lab-panel overflow-hidden">
              <div className="apsod-lab-panel__head">
                <span className="apsod-lab-panel__title">Journal</span>
                <Link
                  href="/blog"
                  className="apsod-lab-panel__meta hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
                >
                  All posts →
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-slate-200 dark:bg-[var(--border-color)]">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="apsod-media-frame group relative aspect-[4/5] overflow-hidden bg-slate-200 dark:bg-slate-900"
                  >
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="apsod-media-zoom absolute inset-0 w-full h-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent z-[2]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-[2]">
                      <h3 className="font-display text-lg md:text-xl font-extrabold text-white tracking-tight leading-snug">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <HomeSeoSection />

      <section className="border-b border-slate-200 dark:border-[var(--border-color)] bg-slate-50 dark:bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <Reveal>
            <div className="apsod-lab-panel overflow-hidden">
              <div className="apsod-lab-panel__head">
                <span className="apsod-lab-panel__title">Ready to ship</span>
                <span className="apsod-lab-panel__meta">Contact</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 md:p-7">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] mb-1">
                    Обсудим ваш проект
                  </h2>
                  <p className="apsod-lab-mono text-[11px] tracking-[0.12em] uppercase text-slate-500">
                    Brief → Architecture → Build
                  </p>
                </div>
                <Link href="/contact" className="apsod-lab-btn apsod-lab-btn--primary shrink-0">
                  Начать проект
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
