// components/ProductModal.tsx
"use client";
import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/components/CartContext";
import { ShoppingCart, X } from "lucide-react";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg w-full max-w-[95vw] lg:max-w-[80vw] xl:max-w-[1200px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 flex justify-end p-4 border-b">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-4 lg:p-8">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="lg:w-1/2 p-4 lg:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4">
                {product.name}
              </h2>
              <p className="text-xl lg:text-3xl font-semibold mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Artist:</span> {product.artist}
              </p>
              <p className="mb-4 text-lg">
                <span className="font-semibold">Size:</span> {product.size}
              </p>
              <p className="mb-6 text-base lg:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-neutral-950 text-white py-3 lg:py-4 rounded-md font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center text-lg"
            >
              <ShoppingCart size={24} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
