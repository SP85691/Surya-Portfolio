"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileTextIcon, HomeIcon, UserIcon, BriefcaseIcon, WrenchIcon, MailIcon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { NAV_ITEMS } from "@/domain/site-meta";
import type { SearchResult } from "@/application/ports/content-repository";

const PAGE_ICONS: Record<string, React.ReactNode> = {
  home: <HomeIcon className="size-4" />,
  work: <BriefcaseIcon className="size-4" />,
  services: <WrenchIcon className="size-4" />,
  about: <UserIcon className="size-4" />,
  contact: <MailIcon className="size-4" />,
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const runSearch = useCallback(async (query: string) => {
    const res = await fetch(
      `/api/search?q=${encodeURIComponent(query)}`,
    );
    if (res.ok) {
      const data = (await res.json()) as SearchResult[];
      setResults(data);
    }
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const openMenu = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-menu", openMenu);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-menu", openMenu);
    };
  }, []);

  useEffect(() => {
    if (open) runSearch("");
  }, [open, runSearch]);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const pages = results.filter((r) => r.type === "page");
  const caseStudies = results.filter((r) => r.type === "case-study");

  const fallbackPages: SearchResult[] = NAV_ITEMS.map((item) => ({
    title: item.label,
    slug: item.href.replace(/^\//, "") || "home",
    href: item.href,
    type: "page" as const,
  }));

  const displayPages = pages.length > 0 ? pages : fallbackPages;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search pages and case studies..."
        onValueChange={runSearch}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {displayPages.map((item) => (
            <CommandItem
              key={item.href}
              value={item.title}
              onSelect={() => navigate(item.href)}
            >
              {PAGE_ICONS[item.slug] ?? <HomeIcon className="size-4" />}
              {item.title}
            </CommandItem>
          ))}
        </CommandGroup>
        {caseStudies.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Case Studies">
              {caseStudies.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.title}
                  onSelect={() => navigate(item.href)}
                >
                  <FileTextIcon className="size-4" />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
