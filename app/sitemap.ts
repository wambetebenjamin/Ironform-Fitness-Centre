import type { MetadataRoute } from "next";
import { blogPosts, classCategories } from "@/lib/data";
import { siteUrl } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/schedule`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/memberships`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/trainers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...classCategories.map(item => ({ url: `${siteUrl}/classes/${item.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...blogPosts.map(item => ({ url: `${siteUrl}/blog/${item.slug}`, lastModified: new Date(item.date), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
