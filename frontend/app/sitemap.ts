import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.clinicalsitehub.com",
      priority: 1,
    },

    {
      url: "https://www.clinicalsitehub.com/sponsor",
      priority: 0.8,
    },

    {
      url: "https://www.clinicalsitehub.com/admin",
      priority: 0.3,
    },
  ];
}