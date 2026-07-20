"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/domain/case-study";
import { AgentTopology } from "@/components/marketing/agent-topology";
import { Timeline } from "@/components/ui/timeline";

const TOC_SECTIONS = [
  "overview",
  "challenges",
  "architecture",
  "implementation",
  "results",
];

export function CaseStudyLayout({
  caseStudy,
  children,
}: {
  caseStudy: CaseStudy;
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = document.querySelectorAll("[data-toc-section]");
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-toc-section");
            if (id) setActiveSection(id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((h) => observerRef.current?.observe(h));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-toc-section="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="mx-auto max-w-[min(90rem,92vw)] px-4 py-12">
      <header className="mb-12">
        <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
          <Image
            src={caseStudy.heroImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <p className="text-sm text-[var(--text-muted)]">{caseStudy.role}</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {caseStudy.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-muted)]">
          {caseStudy.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {caseStudy.stack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {caseStudy.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-4"
            >
              <p className="font-display text-2xl font-bold text-[var(--text-primary)]">
                {metric.value}
              </p>
              <p className="text-xs text-[var(--text-muted)]">{metric.label}</p>
            </div>
          ))}
        </div>
      </header>

      {caseStudy.diagramPaths.length > 0 && (
        <div className="mb-12 grid gap-6">
          {caseStudy.diagramPaths.map((path) => (
            <div
              key={path}
              className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4"
            >
              <Image
                src={path}
                alt="Architecture diagram"
                width={1200}
                height={600}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      )}

      <AgentTopology />

      <div className="mb-12">
        <Timeline
          data={[
            {
              title: "Phase 1",
              content: (
                <p className="text-sm text-[var(--text-muted)]">
                  Discovery & constraints — SLAs, PHI boundaries, operator workflows.
                </p>
              ),
            },
            {
              title: "Phase 2",
              content: (
                <p className="text-sm text-[var(--text-muted)]">
                  Architecture & contracts — agent registry, propose/confirm envelopes.
                </p>
              ),
            },
            {
              title: "Phase 3",
              content: (
                <p className="text-sm text-[var(--text-muted)]">
                  Implementation & ship — latency routing, audit trails, calm TOC UX.
                </p>
              ),
            },
          ]}
          title="Implementation phases"
          description="A calm overview of how the system moved from discovery to production."
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
              On this page
            </p>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <nav className="flex flex-col gap-1">
                {TOC_SECTIONS.map((section) => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => scrollTo(section)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-left text-sm capitalize transition-colors",
                      activeSection === section
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                    )}
                  >
                    {section}
                  </button>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        <div className="prose max-w-none">{children}</div>
      </div>

      <Separator className="my-12" />
    </article>
  );
}
