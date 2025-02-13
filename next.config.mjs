/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [
            {
                source: "/.well-known/ai-plugin.json",
                destination: "/api/ai-plugin"
            }
        ]
    },
    async headers() {
        return [
          {
            source: "/api/:path*",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "*", // Set your origin
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization",
              },
            ],
          },
        ];
      },
};

export default nextConfig;