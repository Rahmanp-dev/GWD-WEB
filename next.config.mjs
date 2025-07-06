/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'via.placeholder.com'],
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