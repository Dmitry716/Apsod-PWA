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
import VisualMarquee from './components/VisualMarquee'
import Reveal from './components/Reveal'
import SectionAtmosphere from './components/SectionAtmosphere'

export const metadata = buildSnippetMetadata('/')

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SeoJsonLd data={generateFAQSchema([...HOMEPAGE_FAQ])} />

      <HomeHero />

      <HomeDeviceShowcase />
      <VisualMarquee title="В работе" />
      <HomeFeaturedWork />
      <HomeCapabilityIndex />

      <section className="py-20 md:py-28 bg-slate-50 dark:bg-gray-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="flex justify-between items-end mb-12 md:mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Журнал
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
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
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug">
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

      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950 text-white">
        <SectionAtmosphere tone="dark" grid={false} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Reveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 mb-6">APSOD</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-10">
              Обсудим ваш проект
            </h2>
            <Link
              href="/contact"
              className="apsod-btn-solid apsod-cta-primary inline-flex px-10 py-4 rounded-md text-sm font-semibold"
            >
              <span>Начать проект</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
