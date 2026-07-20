import { HeroSection } from "@/components/marketing/hero-section";
import { TechMarquee } from "@/components/marketing/tech-marquee";
import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import { ProcessSection } from "@/components/marketing/process-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { WorkTeaser } from "@/components/marketing/work-teaser";
import { StatsStrip } from "@/components/marketing/stats-strip";
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
      <TestimonialsSection />
      <WorkTeaser />
      <StatsStrip />
      <LampSection />
      <ConvictionsStrip />
      <ContactCta />
    </>
  );
}
