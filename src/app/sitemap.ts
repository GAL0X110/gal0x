import type { MetadataRoute } from "next";
import { profile } from "@/config/profile";

/** https://<دامنه>/sitemap.xml — نقشه‌ی سایت برای گوگل و بقیه موتورها */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: profile.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
