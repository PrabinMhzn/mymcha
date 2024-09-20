"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type ValueKey = "Creativity" | "Community" | "Quality" | "Sustainability";

const AboutSection = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-16 text-center text-gray-800"
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto"
        >
          At Mymcha, we believe in the power of art to inspire, connect, and
          transform. Our platform is dedicated to showcasing unique,
          artist-designed apparel that reflects individuality and creativity.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Our mission is to empower independent artists by providing them
              with a platform to share their creativity with the world. We
              strive to create a community where art is accessible to everyone.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Our Values
            </h3>
            <ul className="space-y-3 text-gray-600">
              {(
                [
                  "Creativity",
                  "Community",
                  "Quality",
                  "Sustainability",
                ] as const
              ).map((value, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  className="flex items-center"
                >
                  <svg
                    className="w-6 h-6 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>
                    <strong>{value}:</strong> {getValueDescription(value)}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src="/assets/pexels-3.jpeg"
              alt="About Us"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4 text-lg">
                Founded in 2015, Mymcha started as a small project fueled by
                passion for printing as an art. What began as a simple idea has
                grown into a vibrant community of artists and art lovers.
              </p>
              <p className="text-gray-600 text-lg">
                Each piece of apparel tells a story, connecting the
                artist&apos;s vision with the wearer&apos;s personality. Join us
                on this journey as we continue to support artists and bring
                unique designs to life.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Follow us on social media and be part of our creative family!
          </p>

          <a
            href="/artist-signup"
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105 inline-block"
          >
            Become an Artist
          </a>
        </motion.div>
      </div>
    </div>
  );
};

const getValueDescription = (value: ValueKey): string => {
  const descriptions: Record<ValueKey, string> = {
    Creativity: "We celebrate artistic expression in all forms",
    Community:
      "We foster a supportive environment for artists and customers alike",
    Quality:
      "We prioritize high-quality materials and craftsmanship in every product",
    Sustainability:
      "We are committed to eco-friendly practices in our production processes",
  };
  return descriptions[value];
};

export default AboutSection;
