import { HeroSection } from "@/components/marketing/hero-section";
import { TechMarquee } from "@/components/marketing/tech-marquee";
import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import { ProcessSection } from "@/components/marketing/process-section";
import { AboutSection } from "@/components/marketing/about-section";
import { ProjectsSection } from "@/components/marketing/projects-section";
import { LampSection } from "@/components/marketing/lamp-section";
import { ConvictionsStrip } from "@/components/marketing/convictions-strip";
import { ContactCta } from "@/components/marketing/contact-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <CapabilitiesSection />
      <ProcessSection />
      <AboutSection />
      <ProjectsSection />
      <LampSection />
      <ConvictionsStrip />
      <ContactCta />
    </>
  );
}
