// pages/shop.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Filter, Grid, List, ChevronDown, Search } from "lucide-react";
import { Product } from "@/types/product";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{
    category: string;
    priceRange: [number, number];
    size: string;
    artist: string;
    search: string;
  }>({
    category: "All",
    priceRange: [0, 1000],
    size: "All",
    artist: "All",
    search: "",
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

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
        (filters.artist === "All" || product.artist === filters.artist) &&
        (filters.search === "" ||
          product.name.toLowerCase().includes(filters.search.toLowerCase()))
    );
  }, [filters, products]);

  const sortedProducts = useMemo(() => {
    switch (sortBy) {
      case "price-low-high":
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case "price-high-low":
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case "newest":
        return [...filteredProducts].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      default:
        return filteredProducts;
    }
  }, [filteredProducts, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Collection</h1>

        {/* Category Toggles */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilters((prev) => ({ ...prev, category }))}
              className={`px-4 py-2 rounded-full ${
                filters.category === category
                  ? "bg-neutral-950 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Sidebar */}
          <aside className="lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
            <Sidebar
              filters={filters}
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
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-950"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>

              {/* Toolbar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  className="lg:hidden w-full sm:w-auto bg-neutral-950 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-neutral-800 transition-colors"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <Filter className="mr-2" size={20} /> Filters
                </button>
                <h2 className="text-xl font-semibold">
                  {sortedProducts.length} Products
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select
                      className="appearance-none border rounded-md py-2 pl-3 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-950"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="featured">Sort by: Featured</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      size={16}
                    />
                  </div>
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
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    productId={product.id}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* No products found message */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
