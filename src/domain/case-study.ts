export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  title: string;
  slug: string;
  summary: string;
  role: string;
  stack: string[];
  metrics: CaseStudyMetric[];
  heroImage: string;
  diagramPaths: string[];
  publishedAt: string;
  content: string;
}

export interface Project {
  title: string;
  slug: string;
  summary: string;
  heroImage: string;
  publishedAt: string;
  featured?: boolean;
}
