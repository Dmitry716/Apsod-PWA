import type { Metadata } from "next";
import { buildSnippetMetadata } from "./lib/seo";

import HomeHero from "./components/HomeHero";
import HomeArigoIntro from "./components/HomeArigoIntro";
import HomeFeaturedWork from "./components/HomeFeaturedWork";
import HomeArigoCapabilities from "./components/HomeArigoCapabilities";
import HomeArigoCta from "./components/HomeArigoCta";
import HomeJournal from "./components/HomeJournal";
import ReviewsSection from "./components/ReviewsSection";

// export const metadata = buildSnippetMetadata("/");
export const metadata: Metadata = buildSnippetMetadata("/");

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HomeHero />
      <HomeArigoIntro />
      <HomeFeaturedWork />
      <HomeArigoCapabilities />
      <HomeJournal />
      <ReviewsSection />
      <HomeArigoCta />
    </div>
  );
}
