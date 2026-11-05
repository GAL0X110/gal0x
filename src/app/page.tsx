import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { ToolsMarquee } from "@/components/site/tools-marquee";
import { About } from "@/components/site/about";
import { Skills } from "@/components/site/skills";
import { Projects } from "@/components/site/projects";
import { Resume } from "@/components/site/resume";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BrandProvider } from "@/components/site/brand-context";
import { BrandSettings } from "@/components/site/brand-settings";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <BrandProvider>
        <div className="noise-overlay" aria-hidden="true" />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <ToolsMarquee />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
        <Footer />
        {/* پنل آپلود برند فقط در حالت توسعه (لوکال) نمایش داده می‌شود؛
            در سایت زنده (پروداکشن) هرگز رندر نمی‌شود */}
        {process.env.NODE_ENV === "development" ? <BrandSettings /> : null}
      </BrandProvider>
    </div>
  );
}
