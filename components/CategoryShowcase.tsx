import React from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryShowcase: React.FC = () => {
  const categories = [
    { id: 1, name: "T-Shirts", image: "/images/tshirts.jpg" },
    { id: 2, name: "Hoodies", image: "/images/hoodies.jpg" },
    { id: 3, name: "Accessories", image: "/images/accessories.jpg" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/category/${category.id}`}
              className="relative group overflow-hidden rounded-lg"
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
