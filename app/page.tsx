import Hero from "../components/HeroSection";
import FeaturedDesigns from "../components/FeaturedDesigns";
import ArtistCommunity from "../components/ArtistCommunity";

import FAQAccordion from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <FeaturedDesigns />
        <FAQAccordion />
        <ArtistCommunity />
      </main>
    </div>
  );
}
