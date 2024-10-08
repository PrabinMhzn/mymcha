"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function DataEntry() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category: "",
    artist_id: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      alert("You do not have permission to add products.");
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .insert([productData]);

    if (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } else {
      alert("Product added successfully!");
      router.push("/admin/dashboard");
    }
  };

  if (!user || !isAdmin) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="image_url" className="block mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={productData.image_url}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="artist_id" className="block mb-1">
            Artist ID
          </label>
          <input
            type="text"
            id="artist_id"
            name="artist_id"
            value={productData.artist_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
