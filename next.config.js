/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es", "pt"],
    defaultLocale: "es",
  },
  images: {
    domains: ["comunidad.socialab.com"],
  },
};

module.exports = nextConfig;
