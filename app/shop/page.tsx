"use client";

import { useState, useEffect, useMemo } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

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

  const groupedProducts = useMemo(() => {
    const grouped = filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);

    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredProducts]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar
            filters={filters}
            categories={categories}
            sizes={sizes}
            artists={artists}
            setFilters={setFilters}
            isMobileOpen={isMobileSidebarOpen}
            onMobileClose={() => setIsMobileSidebarOpen(false)}
          />

          {/* Main Content */}

          <main className="lg:flex-1">
            <h1 className="text-4xl font-bold mb-8 text-center bg-black text-white py-2 uppercase ">
              Our Collection
            </h1>

            <div className="bg-white shadow-md p-6">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  className="lg:hidden w-full sm:w-auto bg-black text-white px-4 py-2 rounded-full flex items-center justify-center"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <Filter className="mr-2" size={20} /> Filters
                </button>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <h2 className="text-2xl font-semibold">
                    {filteredProducts.length} Products
                  </h2>
                  <select className="border rounded-md p-2 bg-white">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>

              {/* Product Display by Category */}
              {groupedProducts.map(([category, products]) => (
                <div key={category} className="mb-8">
                  <button
                    className="flex items-center justify-between w-full text-left text-2xl font-bold mb-4 bg-gray-100 p-4 rounded-lg"
                    onClick={() => toggleCategory(category)}
                  >
                    <span>{category}</span>
                    {expandedCategories.includes(category) ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </button>
                  {expandedCategories.includes(category) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
