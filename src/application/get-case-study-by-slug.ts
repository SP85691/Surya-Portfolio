import type { CaseStudy } from "@/domain/case-study";
import { mdxContentRepository } from "@/adapters/content/mdx-content-repository";

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  return mdxContentRepository.getCaseStudyBySlug(slug);
}
