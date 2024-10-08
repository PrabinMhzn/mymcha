// components/ProductGrid.tsx
import React from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode }) => {
  return (
    <div
      className={`
        ${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-6"
        }
      `}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          productId={product.id}
          viewMode={viewMode}
        />
      ))}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
