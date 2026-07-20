import type { SearchResult } from "@/application/ports/content-repository";
import { mdxContentRepository } from "@/adapters/content/mdx-content-repository";
import { NAV_ITEMS } from "@/domain/site-meta";

export async function searchSiteContent(query: string): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return [
      ...NAV_ITEMS.map((item) => ({
        title: item.label,
        slug: item.href.replace(/^\//, "") || "home",
        href: item.href,
        type: "page" as const,
      })),
    ];
  }

  return mdxContentRepository.search(trimmed);
}
