import { CartDisplay } from "@/components/CartDisplay";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Shopping Cart
        </h1>
        <CartDisplay />
      </div>
    </div>
  );
}
