import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getCaseStudyBySlug } from "@/application/get-case-study-by-slug";
import { getWorkPortfolio } from "@/application/get-work-portfolio";
import { CaseStudyLayout } from "@/components/marketing/case-study-layout";

const mdxComponents = {
  h2: ({ children, ...props }: React.ComponentProps<"h2">) => {
    const id = String(children).toLowerCase();
    return (
      <h2 data-toc-section={id} {...props}>
        {children}
      </h2>
    );
  },
};

export async function generateStaticParams() {
  const projects = await getWorkPortfolio();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const { content } = await compileMDX({
    source: caseStudy.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  return (
    <CaseStudyLayout caseStudy={caseStudy}>{content}</CaseStudyLayout>
  );
}
