"use client";

/**
 * FACTS (GateGuard):
 * 1. Caller: src/app/page.tsx L8 import + L26 <ConvictionsStrip />
 * 2. Existing file — replace convictions content with Solutions (same component export)
 * 3. No data-file I/O
 * 4. User: "Let's talk about solutions that I can provide, talk more about AI Related like what are trending in 2026? and what will be needed in 2027? and what is fundamentally I gave the solution that I can build for ithers... use internet for play with bluff and my real knowledge"
 */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Horizon = "2026" | "2027";

type Solution = {
  index: string;
  horizon: Horizon;
  trend: string;
  title: string;
  body: string;
  deliverable: string;
};

/**
 * Grounded in 2026 research (Forrester agentic state; enterprise production guides;
 * Gartner AEOP; Google agentic RAG): pilots >> production; HITL; hybrid/agentic RAG;
 * MCP/tool governance; evals & observability; 2027 = control plane + cost discipline.
 * Mapped to shipped work: Infer360, hybrid RAG, LangGraph critics, QLoRA, FastAPI/Celery.
 */
const SOLUTIONS: Solution[] = [
  {
    index: "01",
    horizon: "2026",
    trend: "Agentic AI is chasing; few are catching",
    title: "Production multi-agent platforms",
    body: "Enterprises are stuck in pilots because monolithic “super-agents” fail under real workflows. I design supervisor + specialist graphs with propose/confirm gates so irreversible writes never bypass a human.",
    deliverable:
      "LangGraph pods, HITL confirm UX, durable state, audit envelopes — Infer360-class systems.",
  },
  {
    index: "02",
    horizon: "2026",
    trend: "Vanilla RAG breaks on multi-hop work",
    title: "Agentic & hybrid retrieval",
    body: "Single-shot retrieval guesses when context is split across islands. I build plan → retrieve → critic loops over vectors and graphs so answers cite sources — or refuse when evidence is thin.",
    deliverable:
      "pgvector + Neo4j / hybrid RAG, citation validation, sufficient-context checks.",
  },
  {
    index: "03",
    horizon: "2026",
    trend: "Agents without integration are chatbots",
    title: "Tool & MCP integration layers",
    body: "Action needs typed tools, least privilege, retries, and logs — not raw DB access. I wire agents to enterprise systems the way APIs should have been governed all along.",
    deliverable:
      "MCP-ready adapters, permissioned tools, Celery/async job fleets, kill switches.",
  },
  {
    index: "04",
    horizon: "2026",
    trend: "Evals & observability are table stakes",
    title: "Observe, evaluate, then scale",
    body: "Nondeterminism is the product risk. Tracing, cost, and regression suites ship with the first agent — not after the incident. You cannot improve what you cannot see.",
    deliverable:
      "Traceable runs, LLM-as-judge gates, cost/latency dashboards, versioned prompts.",
  },
  {
    index: "05",
    horizon: "2027",
    trend: "Long-running agents need a control plane",
    title: "Governed autonomy at scale",
    body: "2027 winners won’t win on more agents — they win on registries, identity, orchestration, and staged autonomy. I harden the track before you add locomotives.",
    deliverable:
      "Agent registry patterns, approval widening, rollback paths, non-human identity discipline.",
  },
  {
    index: "06",
    horizon: "2027",
    trend: "Latency · cost · accuracy as one product",
    title: "Cost-aware AI that still ships",
    body: "Frontier calls everywhere is a demo tax. I fine-tune where it pays (QLoRA), keep deterministic numbers in code, and tune the triad together so production stays affordable.",
    deliverable:
      "Domain QLoRA, critic ensembles, FastAPI/AWS serving, forward-deployed delivery.",
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
      id="solutions"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg-surface)] py-[var(--space-section)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--text-primary)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative mx-auto max-w-[min(80rem,92vw)] px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="h-px w-6 bg-[var(--text-muted)]" />
            Solutions · 2026 → 2027
            <span className="h-px w-6 bg-[var(--text-muted)]" />
          </span>

          <blockquote
            data-quote
            className="mt-6"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <p className="font-serif text-3xl leading-[1.15] tracking-tight text-[var(--text-primary)] text-balance md:text-5xl">
              &ldquo;Pilots are everywhere. Production is the product.&rdquo;
            </p>
          </blockquote>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
            2026 is the year of agentic chase — multi-agent graphs, hybrid RAG,
            MCP tools, and evals. 2027 will punish teams without orchestration,
            identity, and cost discipline. Here is what I actually build to close
            that gap.
          </p>
        </div>

        <div
          data-conviction-grid
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3"
        >
          {SOLUTIONS.map((s) => (
            <article
              key={s.index}
              data-conviction
              className="group relative flex flex-col bg-[var(--bg-page)] p-7 transition-colors duration-300 hover:bg-[var(--bg-surface)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs tracking-[0.2em] text-[var(--text-muted)]">
                  {s.index}
                </span>
                <span
                  className={
                    s.horizon === "2026"
                      ? "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
                      : "font-mono text-[10px] uppercase tracking-[0.16em] text-[#C6A579]"
                  }
                >
                  {s.horizon === "2026" ? "Now · 2026" : "Needed · 2027"}
                </span>
              </div>

              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]/80">
                {s.trend}
              </p>

              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                {s.body}
              </p>

              <p className="mt-5 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--text-primary)]/80">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  I ship ·{" "}
                </span>
                {s.deliverable}
              </p>

              <span className="mt-5 h-px w-10 bg-[var(--text-primary)] opacity-20 transition-all duration-300 group-hover:w-16 group-hover:opacity-60" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
