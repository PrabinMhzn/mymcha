"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";

interface Design {
  id: number;
  src: string;
  alt: string;
}

const featuredDesigns: Design[] = [
  { id: 1, src: "/assets/pexels-5.jpeg", alt: "Featured Design 1" },
  { id: 2, src: "/assets/pexels-2.jpeg", alt: "Featured Design 2" },
  { id: 3, src: "/assets/pexels-3.jpeg", alt: "Featured Design 3" },
  { id: 4, src: "/assets/pexels-4.jpeg", alt: "Featured Design 4" },
  { id: 5, src: "/assets/pexels-5.jpeg", alt: "Featured Design 5" },
  { id: 6, src: "/assets/pexels-2.jpeg", alt: "Featured Design 6" },
  { id: 7, src: "/assets/pexels-3.jpeg", alt: "Featured Design 7" },
];

export default function FeaturedDesigns() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const cardWidth = containerWidth / 4; // Width of each card
  const totalWidth = cardWidth * featuredDesigns.length;
  const dragConstraints = { right: 0, left: -totalWidth + containerWidth };

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Designs
        </h2>
        <motion.div ref={containerRef} className="overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={dragConstraints}
            style={{ x }}
            className="flex cursor-grab active:cursor-grabbing"
          >
            {featuredDesigns.map((design) => (
              <motion.div
                key={design.id}
                className="flex-none"
                style={{ width: cardWidth }}
              >
                <div className="p-2">
                  <motion.div whileHover={{ scale: 1.05 }} className="relative">
                    <Image
                      src={design.src}
                      alt={design.alt}
                      width={300}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Link
                        href={`/product/${design.id}`}
                        className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                      >
                        View Design
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
