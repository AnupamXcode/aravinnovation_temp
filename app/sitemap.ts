import { MetadataRoute } from "next";
import { getRouteCatalog, getSEOForPath, SITE_BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getRouteCatalog();

  return routes.map((r) => {
    const seo = getSEOForPath(r.path);
    const path = r.path === "/" ? "" : r.path;

    return {
      url: `${SITE_BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: r.path === "/" ? "daily" : r.path.startsWith("/insights") ? "weekly" : "monthly",
      priority: seo.priority,
      alternates: {
        languages: {
          en: `${SITE_BASE_URL}/en${path}`,
        },
      },
    };
  });
}
