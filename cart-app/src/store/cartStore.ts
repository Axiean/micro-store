import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Define the shape of the store's state
interface CartState {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
}

// A helper function to safely access localStorage
const safeLocalStorage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        const cart = get().items;
        const findProduct = cart.find((p) => p.id === product.id);

        if (findProduct) {
          findProduct.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        set({ items: [...cart] });
      },
    }),
    {
      name: "cart-storage", // The key in localStorage
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);
