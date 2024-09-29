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
}
