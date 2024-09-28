// components/ProductCard.tsx
import React from "react";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  if (viewMode === "grid") {
    return (
      <div className="border rounded-lg overflow-hidden shadow-md hover:scale-110 duration-200 transition-all">
        <div className="relative w-full h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          {/* Add more product details as needed */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex border rounded-lg overflow-hidden shadow-md">
        <div className="relative w-1/3 aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-4 flex-1">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          {/* Add more product details as needed */}
        </div>
      </div>
    );
  }
};

export default ProductCard;
