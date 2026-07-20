"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const TESTIMONIALS = [
  {
    quote:
      "Surya shipped the agent platform in weeks, not quarters. The propose/confirm loop gave our operators confidence to trust the system on day one.",
    name: "VP Engineering",
    title: "Clinical AI startup",
  },
  {
    quote:
      "Rare combination: deep systems thinking and actual production discipline. Latency dropped 85% and the on-call got quieter.",
    name: "Staff Engineer",
    title: "Inference platform",
  },
  {
    quote:
      "He designed the architecture before writing code. That meant the code that shipped was the code that lasted.",
    name: "CTO",
    title: "Healthtech",
  },
  {
    quote:
      "Calm, precise, and allergic to theatre. Exactly the engineer you want on a high-stakes release.",
    name: "Head of Product",
    title: "Consumer AI",
  },
  {
    quote:
      "The audit envelopes and kill switches he built turned a scary rollout into a non-event.",
    name: "Director of Platform",
    title: "Enterprise SaaS",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[var(--bg-page)] py-[var(--space-section)]">
      <div className="mx-auto mb-12 max-w-[min(90rem,92vw)] px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Trusted by teams
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
          What collaborators say
        </h2>
      </div>
      <div className="flex justify-center px-4">
        <InfiniteMovingCards items={TESTIMONIALS} direction="left" speed="slow" />
      </div>
      <div className="flex justify-center px-4">
        <InfiniteMovingCards
          items={[...TESTIMONIALS].reverse()}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}
