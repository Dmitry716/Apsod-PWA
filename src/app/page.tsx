import type { Metadata } from 'next'
import { buildSnippetMetadata, generateFAQSchema } from './lib/seo'
import { HOMEPAGE_FAQ } from './lib/homepage-faq'

import HomeHero from './components/HomeHero'
import HomeArigoIntro from './components/HomeArigoIntro'
import HomeFeaturedWork from './components/HomeFeaturedWork'
import HomeArigoCapabilities from './components/HomeArigoCapabilities'
import HomeArigoCta from './components/HomeArigoCta'
import HomeJournal from './components/HomeJournal'
import HomeSeoSection from './components/HomeSeoSection'
import ReviewsSection from './components/ReviewsSection'
import SeoJsonLd from './components/SeoJsonLd'

export const metadata: Metadata = buildSnippetMetadata('/')

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <SeoJsonLd data={generateFAQSchema([...HOMEPAGE_FAQ])} />
      <HomeHero />
      <HomeArigoIntro />
      <HomeFeaturedWork />
      <HomeArigoCapabilities />
      <HomeJournal />
      <ReviewsSection />
      <HomeSeoSection />
      <HomeArigoCta />
    </div>
  )
}
