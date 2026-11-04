import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Skills } from "@/components/site/skills";
import { Projects } from "@/components/site/projects";
import { Resume } from "@/components/site/resume";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { BrandProvider } from "@/components/site/brand-context";
import { BrandSettings } from "@/components/site/brand-settings";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <BrandProvider>
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
        <Footer />
        <BrandSettings />
      </BrandProvider>
    </div>
  );
}
