"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Conviction = {
  index: string;
  title: string;
  body: string;
};

const CONVICTIONS: Conviction[] = [
  {
    index: "01",
    title: "AI proposes, humans confirm",
    body: "Models draft, a person approves, and only guarded code reaches production. Autonomy is earned one reviewed decision at a time.",
  },
  {
    index: "02",
    title: "Numbers from code, prose from models",
    body: "Consequential figures stay deterministic. The model is trusted for language, never for arithmetic that a customer depends on.",
  },
  {
    index: "03",
    title: "Adversarial beats oracular",
    body: "Multiple generators, a critic, and an agreement score surface the weakness a single confident answer quietly hides.",
  },
  {
    index: "04",
    title: "Grounding beats cleverness",
    body: "Retrieval over real sources earns trust that prompt tricks never will. Cite the evidence or do not make the claim.",
  },
  {
    index: "05",
    title: "Observe, then optimise",
    body: "Tracing, cost, and evaluation ship with the first agent, not after the incident. You cannot improve what you cannot see.",
  },
  {
    index: "06",
    title: "Latency, cost, accuracy as one",
    body: "Tune a single dimension in isolation and you break the other two. Every change is measured against all three together.",
  },
];

export function ConvictionsStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const quote = sectionRef.current?.querySelector<HTMLElement>(
          "[data-quote]",
        );
        if (quote) {
          gsap.fromTo(
            quote,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: quote, start: "top 82%", once: true },
            },
          );
        }

        const cards = gsap.utils.toArray<HTMLElement>("[data-conviction]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: "[data-conviction-grid]",
              start: "top 78%",
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg-surface)] py-[var(--space-section)]"
    >
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--text-primary)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative mx-auto max-w-[min(80rem,92vw)] px-4">
        {/* Eyebrow + signature quote */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="h-px w-6 bg-[var(--text-muted)]" />
            Operating convictions
            <span className="h-px w-6 bg-[var(--text-muted)]" />
          </span>

          <blockquote
            data-quote
            className="mt-6"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <p className="font-serif text-3xl leading-[1.15] tracking-tight text-[var(--text-primary)] text-balance md:text-5xl">
              &ldquo;AI proposes. Humans confirm.&rdquo;
            </p>
          </blockquote>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
            Six principles behind every system I ship. They are why the work
            holds up in production long after the demo is over.
          </p>
        </div>

        {/* Convictions grid */}
        <div
          data-conviction-grid
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3"
        >
          {CONVICTIONS.map((c) => (
            <article
              key={c.index}
              data-conviction
              className="group relative flex flex-col bg-[var(--bg-page)] p-7 transition-colors duration-300 hover:bg-[var(--bg-surface)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.2em] text-[var(--text-muted)]">
                  {c.index}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]/40 transition-colors duration-300 group-hover:bg-[var(--text-primary)]" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {c.body}
              </p>
              <span className="mt-6 h-px w-10 bg-[var(--text-primary)] opacity-20 transition-all duration-300 group-hover:w-16 group-hover:opacity-60" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
