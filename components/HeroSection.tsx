import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[70vh]">
      <Image
        src="/assets/pexels-5.jpeg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold">MYMCHA</h1>
          <h1 className="text-2xl md:text-4xl font-semibold mb-4">
            From The Streets
          </h1>
          <p className="text-xl mb-8">
            Unique T-shirts designed by independent artists
          </p>
          <Link
            href="/shop"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
