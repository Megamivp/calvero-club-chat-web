import type { MetadataRoute } from "next";

export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/help", "/register", "/login", "/chats"].map(
    (route) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
      priority: route === "" ? 1.0 : route === "/chats" ? 0.9 : 0.8,
    }),
  );

  return [...routes];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await generateSitemap();
}
