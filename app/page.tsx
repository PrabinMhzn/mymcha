import Hero from "../components/HeroSection";
import FeaturedDesigns from "../components/FeaturedDesigns";
import ArtistCommunity from "../components/ArtistCommunity";

import FAQAccordion from "@/components/FAQ";

import MarqueeText from "@/components/MarqueeText";
import NewArrivals from "@/components/NewArrivals";
import CategoryShowcase from "@/components/CategoryShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-white mt-16">
      <main>
        <Hero />
        <MarqueeText />
        <NewArrivals />
        <FeaturedDesigns />
        <CategoryShowcase />
        <FAQAccordion />
        <ArtistCommunity />
      </main>
    </div>
  );
}
