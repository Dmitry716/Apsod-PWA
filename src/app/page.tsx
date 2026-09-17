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
import Reveal from './components/Reveal'
import SectionAtmosphere from './components/SectionAtmosphere'

export const metadata = buildSnippetMetadata('/')

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[var(--bg-primary)]">
      <SeoJsonLd data={generateFAQSchema([...HOMEPAGE_FAQ])} />

      <HomeHero />

      <HomeDeviceShowcase />
      <VisualMarquee title="В работе" />
      <HomeFeaturedWork />
      <HomeCapabilityIndex />
      <TechStackSection title="С чем работаем" />

      <section className="py-20 md:py-28 bg-slate-50 dark:bg-[var(--bg-secondary)] border-y border-slate-200 dark:border-[var(--border-color)]">
        <div className="container mx-auto px-4">
          <Reveal className="flex justify-between items-end mb-12 md:mb-16">
            <div>
              <p className="apsod-section-marker mb-3">07 · Journal</p>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em]">
                Журнал
              </h2>
            </div>
            <Link
              href="/blog"
              className="apsod-link-nudge text-[12px] font-semibold tracking-[0.12em] uppercase text-slate-500 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
            >
              Все статьи
            </Link>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-3 md:gap-4">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Reveal
                key={post.slug}
                stagger={(Math.min(index + 1, 3) as 1 | 2 | 3)}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="apsod-media-frame group block relative aspect-[4/5] overflow-hidden bg-slate-200 dark:bg-slate-900"
                >
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="apsod-media-zoom absolute inset-0 w-full h-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/92 via-[#05070d]/25 to-transparent z-[2]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 z-[2]">
                    <h3 className="font-display text-xl font-extrabold text-white tracking-tight leading-snug">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeSeoSection />

      <section className="apsod-grain apsod-immersive relative py-24 md:py-32 overflow-hidden text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Reveal>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="apsod-hero-line-dot" aria-hidden />
              <p className="text-[11px] tracking-[0.28em] uppercase text-slate-400">APSOD</p>
              <span className="apsod-hero-line bg-sky-400/70" aria-hidden />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-[-0.035em] leading-[1.02] mb-10">
              Обсудим ваш проект
            </h2>
            <Link
              href="/contact"
              className="apsod-btn-solid apsod-cta-primary inline-flex px-10 py-4 rounded-md text-[12px] font-semibold tracking-[0.12em] uppercase"
            >
              <span>Начать проект</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
