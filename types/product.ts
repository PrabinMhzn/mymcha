// @/types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  size: string;
  artist: string;
  createdAt?: string | Date; // Make it optional with '?'
  // ... any other properties
  quantity?: number;
}
export interface Artist {
  id: number;
  name: string;
  genre: string;
}

export interface User {
  id: string;
  email?: string;
}
