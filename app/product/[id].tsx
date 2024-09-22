// pages/product/[id].tsx

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// Use the same featuredDesigns array from your FeaturedDesigns component
const featuredDesigns = [
  { id: 1, src: "/assets/pexels-5.jpeg", alt: "Featured Design 1" },
  { id: 2, src: "/assets/pexels-2.jpeg", alt: "Featured Design 2" },
  { id: 3, src: "/assets/pexels-3.jpeg", alt: "Featured Design 3" },
  { id: 4, src: "/assets/pexels-4.jpeg", alt: "Featured Design 4" },
];

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const design = featuredDesigns.find((d) => d.id === Number(id));

  if (!design) {
    return <div className="container mx-auto px-4 py-8">Design not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Featured Designs
      </Link>
      <h1 className="text-3xl font-bold mb-4">{design.alt}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <Image
            src={design.src}
            alt={design.alt}
            width={600}
            height={800}
            layout="responsive"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <p className="text-lg mb-4">
            This is a detailed description of {design.alt}. You can add more
            information about the design, its features, and any other relevant
            details here.
          </p>
          <p className="text-xl font-bold mb-4">$99.99</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
