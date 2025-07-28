/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        ADMIN_USERNAME: process.env.ADMIN_USERNAME,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
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
        ],
    },
    // Suppress SES warnings
    webpack: (config, { isServer }) => {
        // Suppress SES lockdown warnings
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
};

export default nextConfig; 