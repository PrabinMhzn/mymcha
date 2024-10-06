// components/ProductCard.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { ShoppingCart } from "lucide-react";
import ProductModal from "./ProductModal";
import { createClient } from "@/utils/supabase/client";

interface ProductCardProps {
  productId: string | number;
  viewMode: "grid" | "list";
}

const supabase = createClient();
const ProductCard: React.FC<ProductCardProps> = ({ productId, viewMode }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");
      } else {
        setProduct(data);
      }
      setIsLoading(false);
    }

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the button
    if (product) {
      try {
        await addToCart({
          ...product,
          quantity: 1,
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
        // Optionally, show an error message to the user
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const ImageContainer = ({ className }: { className: string }) => (
    <div className={`relative ${className} overflow-hidden group`}>
      {product && (
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
      )}
    </div>
  );

  const CardContent = () => (
    <>
      <h3 className="text-lg font-semibold">{product?.name}</h3>
      <p className="text-gray-600 mb-2">${product?.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-neutral-950 text-white py-2 rounded-md font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center"
      >
        <ShoppingCart size={18} className="mr-2" />
        Add to Cart
      </button>
    </>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

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
