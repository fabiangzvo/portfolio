import { MetadataRoute } from "next";

import menuItems from "@shared/menuItems.json";

const hostname = "https://fabiangzvo.netlify.com/";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapItems = menuItems.map(({ href }) => ({
    url: hostname + href,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  })) as MetadataRoute.Sitemap;

  return [
    {
      url: "https://fabiangzvo.netlify.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...sitemapItems,
  ];
}
