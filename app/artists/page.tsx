"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

interface Artist {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface FeaturedDesign {
  id: number;
  name: string;
  artist: string;
  image: string;
}

async function fetchArtists() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("artists")
    .select("id, name, image, description");

  if (error) {
    console.error("Error fetching artists:", error);
    return [];
  }

  return data || [];
}

async function fetchFeaturedDesigns() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("featured_designs")
    .select("id, name, artist, image");

  if (error) {
    console.error("Error fetching featured designs:", error);
    return [];
  }

  return data || [];
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [featuredDesigns, setFeaturedDesigns] = useState<FeaturedDesign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [fetchedArtists, fetchedDesigns] = await Promise.all([
        fetchArtists(),
        fetchFeaturedDesigns(),
      ]);
      setArtists(fetchedArtists);
      setFeaturedDesigns(fetchedDesigns);
      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

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
                    layout="responsive"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
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
                  <div className="relative h-64">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300"
                    />
                  </div>
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
