/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.jikan.moe'],
        remotePatterns: [
            {
                hostname: "cdn.myanimelist.net",
            }
        ]
    },
    experimental: {
        serverActions: true,
    }
};

export default nextConfig;
