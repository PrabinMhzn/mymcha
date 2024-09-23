"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroContent = [
  {
    title: "MYMCHA",
    subtitle: "From The Streets",
    description: "Unique T-shirts designed by independent artists",
    cta: "Shop Now",
    ctaLink: "/shop",
    image: "/assets/pexels-5.jpeg",
  },
  {
    title: "Become an Artist",
    subtitle: "Share Your Creativity",
    description: "Join our community and showcase your designs to the world",
    cta: "Start Creating",
    ctaLink: "/artist-signup",
    image: "/assets/pexels-2.jpeg",
  },
  {
    title: "Custom Designs",
    subtitle: "Your Vision, Our Tees",
    description: "Create your own unique t-shirt with our design tool",
    cta: "Customize Now",
    ctaLink: "/customize",
    image: "/assets/pexels-3.jpeg",
  },
  {
    title: "Limited Editions",
    subtitle: "Exclusive Collections",
    description: "Discover our limited edition collaborations with top artists",
    cta: "Explore Collections",
    ctaLink: "/collections",
    image: "/assets/pexels-4.jpeg",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroContent.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % heroContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + heroContent.length) % heroContent.length
    );
  };

  return (
    <section className="relative h-[70vh]">
      {heroContent.map((content, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={content.image}
            alt={`Hero Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold">{content.title}</h1>
              <h2 className="text-2xl md:text-4xl font-semibold mb-4">
                {content.subtitle}
              </h2>
              <p className="text-xl mb-8">{content.description}</p>
              <Link
                href={content.ctaLink}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
              >
                {content.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
