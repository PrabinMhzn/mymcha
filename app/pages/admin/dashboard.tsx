"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/login");
    } else {
      fetchData();
    }
  }, [user, isAdmin, router]);

  async function fetchData() {
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) console.error("Error fetching products:", productsError);
    else setProducts(productsData);

    const { data: artistsData, error: artistsError } = await supabase
      .from("users")
      .select("*")
      .eq("role", "artist");

    if (artistsError) console.error("Error fetching artists:", artistsError);
    else setArtists(artistsData);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Link
        href="/admin/data-entry"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add New Product
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <ul className="bg-white shadow rounded p-4">
            {products.map((product: any) => (
              <li key={product.id} className="mb-2">
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Artists</h2>
          <ul className="bg-white shadow rounded p-4">
            {artists.map((artist: any) => (
              <li key={artist.id} className="mb-2">
                {artist.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
