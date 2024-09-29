// components/ProductCard.tsx
"use client";
import React, { useState } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { ShoppingCart } from "lucide-react";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the button
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const ImageContainer = ({ className }: { className: string }) => (
    <div className={`relative ${className} overflow-hidden group`}>
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes={
          viewMode === "grid"
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
      />
    </div>
  );

  const CardContent = () => (
    <>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-neutral-950 text-white py-2 rounded-md font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center"
      >
        <ShoppingCart size={18} className="mr-2" />
        Add to Cart
      </button>
    </>
  );

  if (viewMode === "grid") {
    return (
      <>
        <div
          className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={openModal}
        >
          <ImageContainer className="w-full aspect-square" />
          <div className="p-4">
            <CardContent />
          </div>
        </div>
        {isModalOpen && <ProductModal product={product} onClose={closeModal} />}
      </>
    );
  } else {
    return (
      <>
        <div
          className="flex border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={openModal}
        >
          <ImageContainer className="w-1/3 aspect-square" />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <CardContent />
          </div>
        </div>
        {isModalOpen && <ProductModal product={product} onClose={closeModal} />}
      </>
    );
  }
};

export default ProductCard;
