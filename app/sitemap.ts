import type { MetadataRoute } from "next";
import { site, citySEOPages, serviceDetails } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/book", "/quote", "/services", "/areas"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = Object.keys(serviceDetails).map((slug) => ({
    url: `${site.url}/services/${slug}`,
    lastModified: new Date(),
  }));

  const cityRoutes = citySEOPages.map((slug) => ({
    url: `${site.url}/areas/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes];
}
