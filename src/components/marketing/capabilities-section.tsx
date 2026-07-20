"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHUTTER_COUNT = 7;

type ProofMetric = {
  value: number;
  suffix: string;
  label: string;
};

type Capability = {
  index: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
  proof: ProofMetric[];
  caseStudy: { label: string; href: string };
};

/**
 * Grounded in Infer360 MDX + Services page — real shipping work, not filler.
 */
const CAPABILITIES: Capability[] = [
  {
    index: "01",
    title: "Agent platforms",
    summary: "Orchestration operators can trust.",
    detail:
      "Multi-agent systems with propose/confirm contracts, audit envelopes, and human checkpoints as first-class surfaces. Parallel fan-out, prompt caching, and selective model routing — measured, not guessed.",
    deliverables: [
      "Propose / confirm loops",
      "Audit envelopes",
      "Plugin agent registry",
      "SSE operator progress",
    ],
    proof: [
      { value: 12, suffix: "", label: "Agents orchestrated" },
      { value: 3, suffix: "", label: "Hospital pilots" },
    ],
    caseStudy: { label: "Infer360", href: "/work/infer360" },
  },
  {
    index: "02",
    title: "Clinical & regulated AI",
    summary: "High-stakes inference with calm UX.",
    detail:
      "Inference that respects PHI boundaries, clinical SLAs, and operator workflows. Traceable reasoning chains, deterministic fallbacks, and one-click overrides — because a wrong answer is a patient risk.",
    deliverables: [
      "PHI-aware boundaries",
      "Traceable reasoning",
      "Deterministic fallbacks",
      "Calm operator UIs",
    ],
    proof: [
      { value: 85, suffix: "%", label: "Latency cut vs baseline" },
      { value: 1, suffix: "", label: "Click override path" },
    ],
    caseStudy: { label: "Infer360", href: "/work/infer360" },
  },
  {
    index: "03",
    title: "Production architecture",
    summary: "Contracts first. Adapters last.",
    detail:
      "Hexagonal, contracts-first systems that separate agents from adapters. JSON Schema message envelopes, Redis-backed burst queues, and observability baked into the first vertical slice — so the architecture survives contact.",
    deliverables: [
      "Hexagonal boundaries",
      "Schema-validated envelopes",
      "Kill-switch rollouts",
      "Latency budgets",
    ],
    proof: [
      { value: 3, suffix: "", label: "Products shipped" },
      { value: 10, suffix: "K+", label: "Active users" },
    ],
    caseStudy: { label: "Selected work", href: "/work" },
  },
  {
    index: "04",
    title: "Performance & reliability",
    summary: "Quiet on-call. Measurable speed.",
    detail:
      "Taken inference from slow-and-scary to an 85% latency drop with calmer rollouts. Lightweight tasks hit smaller models; complex differentials escalate only when confidence drops. Audit envelopes turn scary releases into non-events.",
    deliverables: [
      "Parallel agent fan-out",
      "Prompt caching",
      "Selective model routing",
      "Kill switches",
    ],
    proof: [
      { value: 85, suffix: "%", label: "Latency reduction" },
      { value: 12, suffix: "", label: "Specialized agents" },
    ],
    caseStudy: { label: "Infer360 results", href: "/work/infer360" },
  },
];

function formatProof(value: number, suffix: string) {
  return `${Intl.NumberFormat("en-US").format(value)}${suffix}`;
}

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shuttersRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0);
  const current = CAPABILITIES[active] ?? CAPABILITIES[0];

  const animateMetrics = useCallback((capability: Capability) => {
    const root = metricsRef.current;
    if (!root) return;

    const nodes = gsap.utils.toArray<HTMLElement>("[data-proof-value]", root);
    nodes.forEach((node, index) => {
      const metric = capability.proof[index];
      if (!metric) return;
      const state = { value: 0 };
      gsap.killTweensOf(state);
      gsap.to(state, {
        value: metric.value,
        duration: 0.9,
        delay: index * 0.08,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = formatProof(
            Math.round(state.value),
            metric.suffix,
          );
        },
      });
    });
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      animateMetrics(CAPABILITIES[active] ?? CAPABILITIES[0]);
    });
    return () => cancelAnimationFrame(frame);
  }, [active, animateMetrics]);

  const runShutterSwap = useCallback((nextIndex: number) => {
    if (nextIndex === activeRef.current) return;

    const shutters = shuttersRef.current
      ? gsap.utils.toArray<HTMLElement>(
          "[data-cap-shutter]",
          shuttersRef.current,
        )
      : [];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (reduceMotion || shutters.length === 0) {
      gsap.set(shutters, { scaleY: 0 });
      activeRef.current = nextIndex;
      setActive(nextIndex);
      return;
    }

    gsap.set(shutters, { scaleY: 0, transformOrigin: "top" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        timelineRef.current = null;
      },
    });
    timelineRef.current = tl;

    tl.to(shutters, {
      scaleY: 1,
      duration: 0.28,
      stagger: { each: 0.03, from: "start" },
    })
      .add(() => {
        activeRef.current = nextIndex;
        setActive(nextIndex);
      })
      .to(shutters, {
        scaleY: 0,
        duration: 0.32,
        stagger: { each: 0.03, from: "end" },
      });
  }, []);

  const selectCapability = useCallback(
    (index: number) => {
      runShutterSwap(index);
    },
    [runShutterSwap],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          canMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions) return;
          const { reduceMotion } = context.conditions;

          gsap.set("[data-cap-shutter]", { scaleY: 0, transformOrigin: "top" });

          if (reduceMotion) {
            gsap.set(
              gsap.utils.toArray("[data-cap-reveal]", section),
              { clearProps: "all" },
            );
            return;
          }

          gsap.fromTo(
            "[data-cap-reveal]",
            { y: 22, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.07,
              clearProps: "transform",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                once: true,
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="capabilities-heading"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-page)] py-14 md:py-20"
    >
      <div className="mx-auto max-w-[min(100rem,94vw)] px-4 md:px-6">
        <div
          data-cap-reveal
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
              What I ship
            </p>
            <h2
              id="capabilities-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-5xl"
            >
              Capabilities
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-muted)] text-pretty md:text-base">
              Grounded in production work — Infer360 multi-agent clinical
              inference, hexagonal platforms, and measured latency wins.
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:text-xs">
            {String(CAPABILITIES.length).padStart(2, "0")} disciplines
          </p>
        </div>

        <Separator className="my-8 md:my-10" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
          <div
            data-cap-reveal
            className="flex flex-col"
            role="tablist"
            aria-label="Capability disciplines"
          >
            {CAPABILITIES.map((cap, index) => {
              const isActive = index === active;
              return (
                <button
                  key={cap.index}
                  type="button"
                  role="tab"
                  id={`capability-tab-${cap.index}`}
                  aria-selected={isActive}
                  aria-controls="capability-panel"
                  onMouseEnter={() => selectCapability(index)}
                  onFocus={() => selectCapability(index)}
                  onClick={() => selectCapability(index)}
                  className={cn(
                    "group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-[var(--border)] py-5 text-left transition-colors md:py-6",
                    isActive
                      ? "border-[var(--text-primary)]"
                      : "hover:border-[var(--text-muted)]",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] transition-colors md:text-xs",
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)]",
                    )}
                  >
                    {cap.index}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block font-display text-lg font-semibold tracking-tight transition-colors md:text-xl",
                        isActive
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]",
                      )}
                    >
                      {cap.title}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-sm transition-opacity",
                        isActive
                          ? "text-[var(--text-muted)] opacity-100"
                          : "text-[var(--text-muted)] opacity-0 md:opacity-60",
                      )}
                    >
                      {cap.summary}
                    </span>
                  </span>
                  <ArrowUpRightIcon
                    className={cn(
                      "size-4 transition duration-300",
                      isActive
                        ? "translate-x-0 text-[var(--text-primary)] opacity-100"
                        : "-translate-x-1 text-[var(--text-muted)] opacity-0 group-hover:opacity-60",
                    )}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>

          <div
            data-cap-reveal
            className="relative min-h-[22rem] overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] md:min-h-[26rem]"
          >
            <div
              ref={shuttersRef}
              className="pointer-events-none absolute inset-0 z-20 grid grid-cols-7"
              aria-hidden
            >
              {Array.from({ length: SHUTTER_COUNT }).map((_, index) => (
                <div
                  key={index}
                  data-cap-shutter
                  className="h-full origin-top scale-y-0 bg-[var(--bg-page)]"
                />
              ))}
            </div>

            <div
              ref={panelRef}
              id="capability-panel"
              role="tabpanel"
              aria-labelledby={`capability-tab-${current.index}`}
              className="relative z-10 flex h-full flex-col gap-8 p-6 md:p-8"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Discipline {current.index}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--text-muted)] text-pretty md:text-base">
                  {current.detail}
                </p>
              </div>

              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Deliverables
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.deliverables.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="rounded-full border-[var(--border)] bg-transparent px-3 py-1 font-mono text-xs font-normal text-[var(--text-primary)]"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div
                ref={metricsRef}
                className="mt-auto grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-6"
              >
                {current.proof.map((metric) => (
                  <div key={`${current.index}-${metric.label}`}>
                    <p
                      data-proof-value
                      className="font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl"
                    >
                      {formatProof(metric.value, metric.suffix)}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-muted)] md:text-sm">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="sm" className="rounded-full">
                  <Link href={current.caseStudy.href}>
                    {current.caseStudy.label}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <Link href="/services">All services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
