import type { Project } from "@/domain/case-study";
import { mdxContentRepository } from "@/adapters/content/mdx-content-repository";

export async function getWorkPortfolio(): Promise<Project[]> {
  return mdxContentRepository.getAllProjects();
}
