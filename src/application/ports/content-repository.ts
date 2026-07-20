import type { CaseStudy, Project } from "@/domain/case-study";

export interface SearchResult {
  title: string;
  slug: string;
  href: string;
  type: "page" | "case-study";
}

export interface ContentRepositoryPort {
  getAllProjects(): Promise<Project[]>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudy | null>;
  search(query: string): Promise<SearchResult[]>;
}
