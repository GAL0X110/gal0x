import type { Metadata } from "next";
import { Vazirmatn, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/config/profile";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

/** فونت نمایشی لاتین برای برند GALOX و اعداد بخش‌ها */
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.brand} | ${profile.name}`,
  description: profile.seoDescription,
  keywords: [
    profile.brand,
    profile.name,
    profile.fullName,
    "سایت شخصی",
    "رزومه آنلاین",
    profile.role,
    "پورتفولیو",
  ],
  authors: [{ name: profile.fullName }],
  icons: {
    icon: profile.logo || profile.avatar,
  },
  openGraph: {
    title: `${profile.brand} | ${profile.name}`,
    description: profile.seoDescription,
    url: profile.siteUrl,
    siteName: profile.brand,
    type: "website",
    locale: "fa_IR",
    images: [{ url: profile.logo, width: 512, height: 512, alt: profile.brand }],
  },
  twitter: {
    card: "summary",
    title: `${profile.brand} | ${profile.name}`,
    description: profile.seoDescription,
    images: [profile.logo],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} ${orbitron.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
