import fs from "fs/promises";
import path from "path";
import type { BrandManifest } from "@/components/site/brand-context";

const MANIFEST_PATH = path.join(
  process.cwd(),
  "public",
  "images",
  "brand.json"
);

export const DEFAULT_MANIFEST: BrandManifest = {
  avatar: "/images/avatar.png",
  logo: null,
  resume: null,
  updatedAt: 0,
};

/** خواندن مانیفست برند؛ در نبود فایل، مقادیر پیش‌فرض برگردانده می‌شود */
export async function readManifest(): Promise<BrandManifest> {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<BrandManifest>;
    return { ...DEFAULT_MANIFEST, ...parsed };
  } catch {
    return DEFAULT_MANIFEST;
  }
}

export async function writeManifest(manifest: BrandManifest): Promise<void> {
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
}
