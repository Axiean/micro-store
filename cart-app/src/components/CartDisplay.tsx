"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { useState, useEffect } from "react";

export function CartDisplay() {
  const { items, addToCart, removeItem, updateQuantity } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-slate-500">Loading Your Cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-slate-700">
          Your Cart is Empty
        </h2>
        <p className="mt-2 text-slate-500">
          Looks like you haven't added anything to your cart yet.
        </p>
      </div>
    );
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold border-b pb-4 mb-6 text-gray-800">
          Your Items
        </h2>
        <ul className="space-y-6">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-md"
                />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-semibold text-lg text-slate-800">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500">
                  ${item.price.toFixed(2)} each
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm hover:underline mt-2 font-medium hover:cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-3 text-gray-800">
                <button
                  onClick={() => updateQuantity(item.id, "decrease")}
                  className="px-3 py-1 border rounded-md hover:bg-slate-100 transition hover:cursor-pointer"
                >
                  -
                </button>
                <span className="font-semibold w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, "increase")}
                  className="px-3 py-1 border rounded-md hover:bg-slate-100 transition hover:cursor-pointer"
                >
                  +
                </button>
              </div>
              <p className="font-bold text-lg w-24 text-right text-slate-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 sticky top-8">
        <h2 className="text-2xl font-bold border-b pb-4 mb-6 text-gray-700">
          Order Summary
        </h2>
        <div className="space-y-4 text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-green-500">FREE</span>
          </div>
          <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl text-slate-900">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
