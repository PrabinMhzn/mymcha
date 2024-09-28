import React from "react";
import Image from "next/image";
import Link from "next/link";

const NewArrivals: React.FC = () => {
  const newArrivals = [
    { id: 1, name: "Urban Tee", image: "/images/urban-tee.jpg", price: 29.99 },
    {
      id: 2,
      name: "Artsy Hoodie",
      image: "/images/artsy-hoodie.jpg",
      price: 49.99,
    },
    {
      id: 3,
      name: "Graffiti Cap",
      image: "/images/graffiti-cap.jpg",
      price: 24.99,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <Link
                  href={`/shop/${item.id}`}
                  className="mt-2 inline-block bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
