"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function ArtistDashboard() {
  const { user, isArtist } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !isArtist) {
      router.push("/login");
    } else {
      fetchArtistProducts();
    }
  }, [user, isArtist, router]);

  async function fetchArtistProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("artist_id", user?.id);

    if (error) console.error("Error fetching products:", error);
    else setProducts(data);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Artist Dashboard</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Products</h2>
        <ul className="bg-white shadow rounded p-4">
          {products.map((product: any) => (
            <li key={product.id} className="mb-2">
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
