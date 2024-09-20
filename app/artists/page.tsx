import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const artists = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "",
    description:
      "Specializing in vibrant, abstract designs inspired by urban landscapes.",
  },
  {
    id: 2,
    name: "Sarah Lee",
    image: "",
    description:
      "Creating minimalist designs with a focus on geometric patterns and shapes.",
  },
  {
    id: 3,
    name: "Michael Chen",
    image: "",
    description:
      "Blending traditional Asian art styles with modern graphic design techniques.",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    image: "",
    description:
      "Exploring the intersection of nature and technology through digital illustrations.",
  },
  {
    id: 5,
    name: "David Kim",
    image: "",
    description:
      "Crafting whimsical character designs inspired by pop culture and anime.",
  },
  {
    id: 6,
    name: "Olivia Patel",
    image: "",
    description:
      "Merging fashion photography with digital art to create unique apparel designs.",
  },
];

const featuredDesigns = [
  {
    id: 1,
    name: "Urban Rhythm",
    artist: "Alex Johnson",
    image: "",
  },
  {
    id: 2,
    name: "Geometric Harmony",
    artist: "Sarah Lee",
    image: "",
  },
  {
    id: 3,
    name: "Zen Garden",
    artist: "Michael Chen",
    image: "",
  },
];

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Our Featured Artists
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Discover the talented creators behind our unique designs. Each artist
          brings their own style and vision to our collection.
        </p>

        {/* Featured Designs Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Featured Designs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDesigns.map((design) => (
              <div key={design.id} className="relative group">
                <Image
                  src={design.image}
                  alt={design.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{design.name}</h3>
                    <p>by {design.artist}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Artists Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Meet Our Artists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={artist.image}
                  alt={artist.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
                  <p className="text-gray-600 mb-4">{artist.description}</p>
                  <Link
                    href={`/artists/${artist.id}`}
                    className="inline-flex items-center text-black font-semibold hover:text-gray-700 transition-colors"
                  >
                    View Designs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Artist Spotlight */}
        <section className="mb-16 bg-gray-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Artist Spotlight
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Image
                src={artists[0].image}
                alt={artists[0].name}
                width={300}
                height={300}
                className="rounded-full"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-bold mb-4">{artists[0].name}</h3>
              <p className="text-gray-600 mb-4">{artists[0].description}</p>
              <p className="mb-4">
                I find inspiration in the chaos and beauty of city life. My
                designs aim to capture the energy and diversity of urban
                environments, translating them into wearable art.
              </p>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  (4.9 / 5 based on 127 reviews)
                </span>
              </div>
              <Link
                href={`/artists/${artists[0].id}`}
                className="inline-flex items-center bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                Explore {artists[0].name}&apos;s Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action for Aspiring Artists */}
        <section className="text-center bg-black text-white py-16 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Are You an Artist?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of talented creators and share your unique
            designs with the world. Turn your passion into profit with MYMCHA.
          </p>
          <Link
            href="/artist-signup"
            className="inline-flex items-center bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Become a MYMCHA Artist
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>
      </main>

      <footer className="bg-black text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 MYMCHA. All rights reserved.</p>
          <nav className="mt-4">
            <ul className="flex justify-center space-x-6">
              <li>
                <Link href="/terms" className="hover:text-gray-300">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-300">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
