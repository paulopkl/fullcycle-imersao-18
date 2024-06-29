/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/nextjs",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unplash.com"
            }
        ]
    },
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:8000"]
        }
    },
}

module.exports = nextConfig

// http://localhost:8000/nextjs/events/11111/spots-layout
