/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REVALIDATE: process.env.REVALIDATE,
    SITE: process.env.SITE,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID
  },
  swcMinify: true,
  i18n: {
    locales: ["ro"],
    defaultLocale: "ro",
  },
  images: {
    domains: ["api.inspiredconsulting.ro", "f005.backblazeb2.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.inspiredconsulting.ro",
      },
      {
        protocol: 'https', 
        hostname: 'f005.backblazeb2.com',
      },
    ],
  },
};

module.exports = nextConfig;
