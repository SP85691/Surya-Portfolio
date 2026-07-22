import { HeroSection } from "@/components/marketing/hero-section";
import { TechMarquee } from "@/components/marketing/tech-marquee";
import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import { ProcessSection } from "@/components/marketing/process-section";
import { AboutSection } from "@/components/marketing/about-section";
import { ProjectsSection } from "@/components/marketing/projects-section";
import { LampSection } from "@/components/marketing/lamp-section";
import { ConvictionsStrip } from "@/components/marketing/convictions-strip";
import { ContactCta } from "@/components/marketing/contact-cta";

/**
 * Gate: Next.js app router entry — rendered by the framework as `/`.
 * Existing homepage composition; reorder only. No data files.
 * User: "After Capabilities -> About Us Section -> How I work -> rest of all"
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <CapabilitiesSection />
      <AboutSection />
      <ProcessSection />
      <ProjectsSection />
      <LampSection />
      <ConvictionsStrip />
      <ContactCta />
    </>
  );
}
