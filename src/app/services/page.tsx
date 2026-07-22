/**
 * FACTS: App router /services. Renders ServicesExperience.
 * User: improve services page with hero + list + deep detail.
 */
import { ServicesExperience } from "@/components/marketing/services-experience";

export const metadata = {
  title: "Services",
  description:
    "Production multi-agent platforms, hybrid RAG, MCP tools, evals, fine-tuning, and forward-deployed delivery — engagements for 2026–2027 AI systems.",
};

export default function ServicesPage() {
  return <ServicesExperience />;
}
