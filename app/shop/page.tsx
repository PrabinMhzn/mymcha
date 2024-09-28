// pages/shop.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Filter, Grid, List } from "lucide-react";
import { Product } from "@/types/product";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [0, 100],
    size: "All",
    artist: "All",
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const sizes = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.size)))],
    [products]
  );

  const artists = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.artist)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (filters.category === "All" || product.category === filters.category) &&
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        (filters.size === "All" || product.size === filters.size) &&
        (filters.artist === "All" || product.artist === filters.artist)
    );
  }, [filters, products]);

  return (
    <div className="bg-gray-100 min-h-screen mt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Collection</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <Sidebar
              filters={filters}
              categories={categories}
              sizes={sizes}
              artists={artists}
              setFilters={setFilters}
              isMobileOpen={isMobileSidebarOpen}
              onMobileClose={() => setIsMobileSidebarOpen(false)}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Toolbar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  className="lg:hidden w-full sm:w-auto bg-black text-white px-4 py-2 rounded-full flex items-center justify-center"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <Filter className="mr-2" size={20} /> Filters
                </button>
                <h2 className="text-2xl font-semibold">
                  {filteredProducts.length} Products
                </h2>
                <div className="flex items-center gap-4">
                  <select className="border rounded-md p-2 bg-white">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${
                        viewMode === "grid" ? "bg-gray-200" : ""
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list" ? "bg-gray-200" : ""
                      }`}
                      aria-label="List view"
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Display */}
              <div
                className={`
                ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              `}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
