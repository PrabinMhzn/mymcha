import Image from "next/image";
import Link from "next/link";

export default function FeaturedDesigns() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Designs
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative">
              <Image
                src={`/assets/pexels-2.jpeg`}
                alt={`Featured Design ${i}`}
                width={300}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                <Link
                  href={`/product/${i}`}
                  className="bg-white text-black px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  View Design
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
