/** @type {import('next').NextConfig} */
const nextConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
