/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Docker optimization!
  async rewrites() {
    return [
      {
        // Route all requests starting with /cart to the cart app
        source: "/cart/:path*",
        // The destination is the internal Docker network name and port
        destination: "http://cart-app:3000/:path*",
      },
    ];
  },
};

export default nextConfig;
