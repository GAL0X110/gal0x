"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface BrandManifest {
  avatar: string;
  logo: string | null;
  resume: string | null;
  updatedAt: number;
}

interface BrandContextValue {
  manifest: BrandManifest | null;
  refetch: () => Promise<void>;
}

const BrandContext = createContext<BrandContextValue>({
  manifest: null,
  refetch: async () => {},
});

/**
 * اطلاعات برند (آواتار، لوگو، رزومه) را از سرور می‌گیرد و در اختیار
 * همه کامپوننت‌های سایت قرار می‌دهد؛ پس از آپلود هم به‌روزرسانی می‌شود.
 */
export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [manifest, setManifest] = useState<BrandManifest | null>(null);

  const fetchManifest = useCallback(async (): Promise<BrandManifest | null> => {
    try {
      /* پارامتر تصادفی برای دور زدن هر نوع کش */
      const res = await fetch(`/api/brand?_=${Date.now()}`, {
        cache: "no-store",
      });
      if (!res.ok) return null;
      return (await res.json()) as BrandManifest;
    } catch {
      return null;
    }
  }, []);

  const refetch = useCallback(async () => {
    const data = await fetchManifest();
    if (data) setManifest(data);
  }, [fetchManifest]);

  useEffect(() => {
    let cancelled = false;

    void fetchManifest().then((data) => {
      if (!cancelled && data) setManifest(data);
    });

    return () => {
      cancelled = true;
    };
  }, [fetchManifest]);

  /* به‌روزرسانی favicon در صورت وجود لوگوی اختصاصی */
  useEffect(() => {
    if (!manifest?.logo) return;
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (link) link.href = `${manifest.logo}?v=${manifest.updatedAt}`;
  }, [manifest]);

  return (
    <BrandContext.Provider value={{ manifest, refetch }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
