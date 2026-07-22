/**
 * FACTS: Route /contact. Renders ContactPageView (lamp hero + form).
 * User: optimize contact with home hero + bulb theme.
 */
import { ContactPageView } from "@/components/marketing/contact-page";

export const metadata = {
  title: "Contact",
  description:
    "Start a conversation — engineering leadership, platform architecture, and ambitious AI product work.",
};

export default function ContactPage() {
  return <ContactPageView />;
}
