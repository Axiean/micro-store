import { ProductCard } from "@/components/ProductCart";
import Image from "next/image";

// Mock data for our products. In a real app, this would come from an API.
const products = [
  {
    id: 1,
    name: "Modern T-Shirt",
    price: 25.0,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
  },
  {
    id: 2,
    name: "Classic Jeans",
    price: 75.5,
    imageUrl:
      "https://images.unsplash.com/photo-1602293589914-9e29544ddd5b?w=500",
  },
  {
    id: 3,
    name: "Running Sneakers",
    price: 120.0,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ab?w=500",
  },
  {
    id: 4,
    name: "Stylish Watch",
    price: 250.0,
    imageUrl:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",
  },
  {
    id: 5,
    name: "Leather Backpack",
    price: 95.0,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb68c6a62?w=500",
  },
  {
    id: 6,
    name: "Cozy Beanie",
    price: 18.0,
    imageUrl:
      "https://images.unsplash.com/photo-1576871335624-912d8a80cf1b?w=500",
  },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
