/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['rickandmortyapi.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rickandmortyapi.com',
            },
        ],
        unoptimized: true,
    },
}

module.exports = nextConfig
