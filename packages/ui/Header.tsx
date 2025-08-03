import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <Link href="/" className="text-2xl font-bold text-gray-800">
            NextJS Store
          </Link>
        </div>
        <div>
          <Link
            href="/cart"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}
