"use client";

import {
  IconBrandGithub,
  IconHome,
  IconMail,
  IconUser,
  IconBriefcase,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { SITE_META } from "@/domain/site-meta";

const items = [
  {
    title: "Home",
    href: "/",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    title: "Work",
    href: "/work",
    icon: (
      <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    title: "About",
    href: "/about",
    icon: (
      <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    title: "GitHub",
    href: "https://github.com",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    title: "Email",
    href: `mailto:${SITE_META.email}`,
    icon: (
      <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
];

export function SiteFloatingDock() {
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 md:block">
      <div className="pointer-events-auto">
        <FloatingDock
          items={items}
          desktopClassName="border border-[var(--border)] bg-[var(--bg-surface)]/90 backdrop-blur-md dark:bg-[var(--bg-surface)]/90"
          mobileClassName="hidden"
        />
      </div>
    </div>
  );
}
