import { ProductCard } from "@/components/ProductCart";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

async function getProducts(): Promise<Product[]> {
  // Fetch from the Fake Store API
  const res = await fetch("https://fakestoreapi.com/products", {
    // We can still use revalidate here for ISR
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Our Latest Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
          Discover high-quality apparel and accessories designed for the modern
          lifestyle.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.title}
            price={product.price}
            imageUrl={product.image}
          />
        ))}
      </div>
    </main>
  );
}
