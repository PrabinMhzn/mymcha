import { useState, useEffect } from "react";
import { Product } from "@/types/product";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setError("Failed to load products");
        setIsLoading(false);
      });
  }, []);

  return { products, isLoading, error };
}
