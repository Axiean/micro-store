/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  output: "standalone", // Docker optimization!
  async rewrites() {
    return [
      {
        // Route all requests starting with /cart to the cart app
        source: "/cart/:path*",
        // The destination is the internal Docker network name and port
        destination: "http://cart-app:3000/cart/:path*",
        // dev
        // destination: "http://localhost:3001/cart/:path*",
      },
    ];
  },
};

export default nextConfig;
