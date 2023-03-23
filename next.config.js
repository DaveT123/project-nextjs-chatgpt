/** @type {import('next').NextConfig} */
const nextConfig = {
    secret: process.env.SECRET,
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
