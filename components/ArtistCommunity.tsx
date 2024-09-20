import Link from "next/link";

export default function ArtistCommunity() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Join Our Artist Community</h2>
        <p className="text-xl mb-8">
          Showcase your designs and earn from every sale
        </p>
        <Link
          href="/artist-signup"
          className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
        >
          Become an Artist
        </Link>
      </div>
    </section>
  );
}
