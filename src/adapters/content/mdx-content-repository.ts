import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { CaseStudy, CaseStudyMetric, Project } from "@/domain/case-study";
import type {
  ContentRepositoryPort,
  SearchResult,
} from "@/application/ports/content-repository";
import { NAV_ITEMS } from "@/domain/site-meta";

const CONTENT_DIR = path.join(process.cwd(), "src/content/case-studies");

function parseMetrics(raw: unknown): CaseStudyMetric[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (item): item is CaseStudyMetric =>
        typeof item === "object" &&
        item !== null &&
        "label" in item &&
        "value" in item,
    )
    .map((item) => ({
      label: String(item.label),
      value: String(item.value),
    }));
}

function parseStack(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(String);
}

function toCaseStudy(slug: string, data: Record<string, unknown>, content: string): CaseStudy {
  return {
    title: String(data.title ?? slug),
    slug: String(data.slug ?? slug),
    summary: String(data.summary ?? ""),
    role: String(data.role ?? ""),
    stack: parseStack(data.stack),
    metrics: parseMetrics(data.metrics),
    heroImage: String(data.heroImage ?? ""),
    diagramPaths: Array.isArray(data.diagramPaths)
      ? data.diagramPaths.map(String)
      : [],
    publishedAt: String(data.publishedAt ?? ""),
    content,
  };
}

function toProject(caseStudy: CaseStudy, featured?: boolean): Project {
  return {
    title: caseStudy.title,
    slug: caseStudy.slug,
    summary: caseStudy.summary,
    heroImage: caseStudy.heroImage,
    publishedAt: caseStudy.publishedAt,
    featured,
  };
}

async function readAllCaseStudies(): Promise<CaseStudy[]> {
  let files: string[];
  try {
    files = await fs.readdir(CONTENT_DIR);
  } catch {
    return [];
  }

  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));
  const studies = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = await fs.readFile(path.join(CONTENT_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      return toCaseStudy(slug, data as Record<string, unknown>, content);
    }),
  );

  return studies.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export const mdxContentRepository: ContentRepositoryPort = {
  async getAllProjects(): Promise<Project[]> {
    const studies = await readAllCaseStudies();
    return studies.map((study, index) => toProject(study, index === 0));
  },

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    const studies = await readAllCaseStudies();
    return studies.find((s) => s.slug === slug) ?? null;
  },

  async search(query: string): Promise<SearchResult[]> {
    const q = query.toLowerCase();
    const studies = await readAllCaseStudies();
    const caseResults: SearchResult[] = studies
      .filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.stack.some((tech) => tech.toLowerCase().includes(q)),
      )
      .map((s) => ({
        title: s.title,
        slug: s.slug,
        href: `/work/${s.slug}`,
        type: "case-study" as const,
      }));

    const pageResults: SearchResult[] = NAV_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(q),
    ).map((item) => ({
      title: item.label,
      slug: item.href.replace(/^\//, "") || "home",
      href: item.href,
      type: "page" as const,
    }));

    return [...pageResults, ...caseResults];
  },
};
