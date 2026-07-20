"use client";

import {
  IconBrandAws,
  IconBrandOpenai,
  IconBrandPython,
  IconBrandReact,
  IconBrandTypescript,
  IconDatabase,
} from "@tabler/icons-react";
import { MagicCard } from "@/components/ui/magic-card";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Timeline } from "@/components/ui/timeline";
import { Lens } from "@/components/ui/lens";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { BlurFade } from "@/components/ui/blur-fade";
import { SITE_META } from "@/domain/site-meta";

const MILESTONES = [
  {
    title: "2026",
    content: (
      <p className="text-[var(--text-muted)]">
        Shipping Infer360 — multi-agent clinical inference with audit-ready
        propose/confirm loops and sub-second operator UX.
      </p>
    ),
  },
  {
    title: "2025",
    content: (
      <p className="text-[var(--text-muted)]">
        Led platform architecture for real-time coaching and computer-vision
        products reaching 10K+ active users.
      </p>
    ),
  },
  {
    title: "2024",
    content: (
      <p className="text-[var(--text-muted)]">
        Built production FastAPI + Next.js systems with hexagonal boundaries,
        observability, and human-in-the-loop design as default.
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--bg-page)] py-[var(--space-section)] pb-28">
      <div className="mx-auto max-w-[min(90rem,92vw)] px-4">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          <BlurFade inView>
            <MagicCard
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6"
              gradientFrom="#000000"
              gradientTo="#525252"
              gradientColor="#e5e5e5"
            >
              <div className="flex flex-col items-center text-center">
                <Lens zoomFactor={2} lensSize={140}>
                  <div className="relative size-48 overflow-hidden rounded-full border-2 border-[var(--border)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/images/profile/placeholder.svg"
                      alt={SITE_META.author}
                      className="duotone-portrait size-full object-cover"
                    />
                  </div>
                </Lens>
                <h1 className="mt-6 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)]">
                  {SITE_META.author}
                </h1>
                <p className="mt-2 text-[var(--text-muted)]">
                  Lead Engineer · Multi-Agent Systems
                </p>
              </div>
            </MagicCard>
          </BlurFade>

          <div>
            <BlurFade delay={0.1} inView>
              <p className="text-lg leading-relaxed text-[var(--text-primary)]">
                I build production systems where AI augments human judgment —
                not replaces it. My work spans clinical inference platforms,
                computer vision pipelines, and real-time coaching products
                shipped to thousands of users.
              </p>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="mt-4 text-lg leading-relaxed text-[var(--text-muted)]">
                I care about architecture that scales, interfaces that respect
                attention, and teams that ship with precision.
              </p>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <div className="relative mx-auto mt-16 flex h-[320px] w-full max-w-md items-center justify-center">
                <OrbitingCircles radius={120} iconSize={40} speed={0.6}>
                  <IconBrandTypescript className="text-[var(--text-primary)]" />
                  <IconBrandPython className="text-[var(--text-primary)]" />
                  <IconBrandReact className="text-[var(--text-primary)]" />
                  <IconBrandOpenai className="text-[var(--text-primary)]" />
                  <IconDatabase className="text-[var(--text-primary)]" />
                  <IconBrandAws className="text-[var(--text-primary)]" />
                </OrbitingCircles>
                <OrbitingCircles
                  radius={60}
                  iconSize={28}
                  reverse
                  speed={1.2}
                  className="border-none bg-transparent"
                >
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    GSAP
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    PG
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    AWS
                  </span>
                </OrbitingCircles>
                <p className="absolute font-display text-sm font-semibold tracking-tighter text-[var(--text-primary)]">
                  Stack
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <blockquote className="mt-16">
                <p className="font-serif text-2xl leading-relaxed text-[var(--text-muted)] md:text-3xl">
                  &ldquo;Precision in code. Restraint in design. Confidence in
                  shipping.&rdquo;
                </p>
              </blockquote>
            </BlurFade>
          </div>
        </div>

        <div className="mt-20">
          <Timeline
            data={MILESTONES}
            title="Career milestones"
            description="Selected chapters from clinical AI, platforms, and production engineering."
          />
        </div>

        <div className="mt-20">
          <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            In their words
          </p>
          <AnimatedTestimonials
            testimonials={[
              {
                quote:
                  "Surya is the engineer you put on the thing that cannot fail. He designs the safety rails first, then ships fast.",
                name: "VP Engineering",
                designation: "Clinical AI startup",
              },
              {
                quote:
                  "He turned a scary inference rollout into a non-event. Latency down 85%, on-call got quieter.",
                name: "Staff Engineer",
                designation: "Inference platform",
              },
              {
                quote:
                  "Architecture before code. That is why the code that shipped was the code that lasted.",
                name: "CTO",
                designation: "Healthtech",
              },
            ]}
          />
        </div>
      </div>

      <style>{`
        .duotone-portrait {
          filter: grayscale(100%) contrast(1.1);
          mix-blend-mode: luminosity;
        }
      `}</style>
    </div>
  );
}
