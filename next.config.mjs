/** @type {import('next').NextConfig} */
const nextConfig = {
    // IMPORTANT: Only client-side environment variables should be exposed here.
    // Server-side variables are automatically available in the server environment.
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org', // Added for expertise icons
            },
        ],
    },
    // Suppress SES warnings (can be kept if needed)
    webpack: (config, { isServer }) => {
        config.ignoreWarnings = [
            /The 'dateTaming' option is deprecated/,
            /The 'mathTaming' option is deprecated/,
            /Removing unpermitted intrinsics/,
        ];

        return config;
    },
    // Experimental features to improve performance
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
    // Vercel optimization: Creates a standalone output for smaller deployment packages
    output: 'standalone',
};

export default nextConfig;
