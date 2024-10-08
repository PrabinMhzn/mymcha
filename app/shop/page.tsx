// app/shop/page.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import CategoryToggle from "@/components/ShopCategoryToogle";
import Toolbar from "@/components/ShopToolbar";
import ProductGrid from "@/components/ProductGrid";
import useProducts from "@/hooks/useProducts";
import useFilters from "@/hooks/useFilters";

export default function Shop() {
  const { products, isLoading, error } = useProducts();
  const {
    filters,
    setFilters,
    categories,
    sizes,
    artists,
    sortedProducts, // Use sortedProducts instead of sortedProductIds
    sortBy,
    setSortBy,
  } = useFilters(products);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Collection</h1>

        <CategoryToggle
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={(category) =>
            setFilters((prev) => ({ ...prev, category }))
          }
        />

        <div className="flex flex-col lg:flex-row gap-8 relative">
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

          <main className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <SearchBar
                value={filters.search}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, search: value }))
                }
              />

              <Toolbar
                productCount={sortedProducts.length}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
              />

              <ProductGrid products={sortedProducts} viewMode={viewMode} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
