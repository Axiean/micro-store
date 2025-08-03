"use client";

import { useCartStore, CartItem } from "@/store/cartStore";
import Image from "next/image";
import { useState, useEffect } from "react"; // Import useState and useEffect

export function CartDisplay() {
  const items = useCartStore((state) => state.items);
  // Create a state to track if the component has mounted on the client
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true only after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If we're on the server or before the client has mounted, render nothing or a loader
  if (!isClient) {
    return <p className="text-center text-gray-500">Loading cart...</p>;
  }

  if (items.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={64}
              height={64}
              className="rounded-md"
            />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
}
