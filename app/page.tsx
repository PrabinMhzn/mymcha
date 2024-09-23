import Hero from "../components/HeroSection";
import FeaturedDesigns from "../components/FeaturedDesigns";
import ArtistCommunity from "../components/ArtistCommunity";

import FAQAccordion from "@/components/FAQ";

import MarqueeText from "@/components/MarqueeText";
import ShopByCategory from "@/components/ShopByCategory";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <MarqueeText />

        <FeaturedDesigns />
        <ShopByCategory />
        <FAQAccordion />
        <ArtistCommunity />
      </main>
    </div>
  );
}
