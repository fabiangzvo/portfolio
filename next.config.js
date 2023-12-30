/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es", "pt"],
    defaultLocale: "es",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "comunidad.socialab.com",
      },
    ],
  },
};

module.exports = nextConfig;
