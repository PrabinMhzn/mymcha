"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const artists = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "/images/alex-johnson.jpg",
    description:
      "Specializing in vibrant, abstract designs inspired by urban landscapes.",
  },
  {
    id: 2,
    name: "Sarah Lee",
    image: "/images/sarah-lee.jpg",
    description:
      "Creating minimalist designs with a focus on geometric patterns and shapes.",
  },
  {
    id: 3,
    name: "Michael Chen",
    image: "/images/michael-chen.jpg",
    description:
      "Blending traditional Asian art styles with modern graphic design techniques.",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    image: "/images/emily-rodriguez.jpg",
    description:
      "Exploring the intersection of nature and technology through digital illustrations.",
  },
  {
    id: 5,
    name: "David Kim",
    image: "/images/david-kim.jpg",
    description:
      "Crafting whimsical character designs inspired by pop culture and anime.",
  },
  {
    id: 6,
    name: "Olivia Patel",
    image: "/images/olivia-patel.jpg",
    description:
      "Merging fashion photography with digital art to create unique apparel designs.",
  },
];

const featuredDesigns = [
  {
    id: 1,
    name: "Urban Rhythm",
    artist: "Alex Johnson",
    image: "/images/urban-rhythm.jpg",
  },
  {
    id: 2,
    name: "Geometric Harmony",
    artist: "Sarah Lee",
    image: "/images/geometric-harmony.jpg",
  },
  {
    id: 3,
    name: "Zen Garden",
    artist: "Michael Chen",
    image: "/images/zen-garden.jpg",
  },
];

export default function ArtistsPage() {
  return (
    <div className="min-h-screen relative pt-24">
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
            Creative Community
          </h1>

          {/* Featured Designs Section */}
          <section className="mb-24">
            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
              Featured Designs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDesigns.map((design) => (
                <motion.div
                  key={design.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300"
                >
                  <Image
                    src={design.image}
                    alt={design.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2">{design.name}</h3>
                      <p>by {design.artist}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Artists Grid */}
          <section className="mb-24">
            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
              Meet Our Artists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artists.map((artist) => (
                <motion.div
                  key={artist.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300"
                >
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{artist.name}</h2>
                    <p className="text-gray-600 mb-4">{artist.description}</p>
                    <Link
                      href={`/artists/${artist.id}`}
                      className="inline-flex items-center text-black font-semibold hover:text-gray-700 transition-colors"
                    >
                      View Designs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Call to Action for Aspiring Artists */}
          <section className="text-center bg-black text-white py-16 rounded-lg shadow-xl mb-12">
            <h2 className="text-xl font-bold mb-4">Are You an Artist?</h2>
            <p className="text-lg mb-8 max-w-md mx-auto">
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
      </div>
    </div>
  );
}
