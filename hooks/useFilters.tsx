import { useState, useMemo } from "react";
import { Product } from "@/types/product";

export default function useFilters(products: Product[]) {
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

  const [sortBy, setSortBy] = useState("featured");

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

  return {
    filters,
    setFilters,
    categories,
    sizes,
    artists,
    filteredProducts,
    sortedProducts,
    sortBy,
    setSortBy,
  };
}
