import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { tools } from "@/lib/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${SITE_URL}${tool.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
