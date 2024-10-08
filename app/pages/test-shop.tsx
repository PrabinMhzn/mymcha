import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  // Add other fields as necessary
}

export default function TestShop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      if (!supabase) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(5);

      if (error) {
        setError(error.message);
      } else {
        setProducts(data as Product[]);
      }
    }

    if (supabase) {
      fetchProducts();
    }
  }, [supabase]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Test Shop</h1>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
