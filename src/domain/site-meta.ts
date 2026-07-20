export interface NavItem {
  label: string;
  href: string;
}

export interface SiteMeta {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  email: string;
}

export const SITE_META: SiteMeta = {
  name: "Surya",
  title: "Surya Portfolio",
  description:
    "Engineering portfolio — multi-agent systems, clinical AI, and production-grade software.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://surya.dev",
  author: "Surya",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@surya.dev",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
