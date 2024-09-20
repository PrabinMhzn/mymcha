import React from "react";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded-full">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">by {product.artist}</p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
          <button className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
