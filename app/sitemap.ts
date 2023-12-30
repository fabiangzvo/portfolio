import { MetadataRoute } from "next";

import menuItems from "@shared/menuItems.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const hostname = "https://fabiangzvo.netlify.com/";

  const sitemapItems = menuItems.map(({ href }) => ({
    url: hostname + href,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  })) as MetadataRoute.Sitemap;

  return [
    {
      url: hostname,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...sitemapItems,
  ];
}
