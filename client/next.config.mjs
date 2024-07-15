/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        pinataJwt: process.env.PINATA_JWT,
        alchemyApiKey: process.env.ALCHEMY_API_KEY,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
            },
        ],
    },
};

export default nextConfig;
