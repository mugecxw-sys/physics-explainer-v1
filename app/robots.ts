import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const production = process.env.SITE_DEPLOYMENT === "production";
  return {
    rules: production ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
