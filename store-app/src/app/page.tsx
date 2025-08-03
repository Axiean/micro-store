import { ProductCard } from "@/components/ProductCart";
import { GET } from "./api/products/route";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const revalidate = 300;

export default async function HomePage() {
  const response = await GET();
  const products: Product[] = await response.json();

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
