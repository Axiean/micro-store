import Image from "next/image";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ name, price, imageUrl }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-60">
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
