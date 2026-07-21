"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  NetworkIcon,
  StethoscopeIcon,
  BoxesIcon,
  GaugeIcon,
  type LucideIcon,
} from "lucide-react";
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
  signal: string;
  detail: string;
  deliverables: string[];
  proof: ProofMetric[];
  caseStudy: { label: string; href: string };
  icon: LucideIcon;
  accent: string;
};

/**
 * Grounded in Infer360 MDX + Services page — real shipping work, not filler.
 */
const CAPABILITIES: Capability[] = [
  {
    index: "01",
    title: "Agent platforms",
    summary: "Orchestration operators can trust.",
    signal: "Every action — proposed, then confirmed.",
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
    icon: NetworkIcon,
    accent: "#6E8CA0",
  },
  {
    index: "02",
    title: "Clinical & regulated AI",
    summary: "High-stakes inference with calm UX.",
    signal: "A wrong answer is a patient risk.",
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
    icon: StethoscopeIcon,
    accent: "#B08A8A",
  },
  {
    index: "03",
    title: "Production architecture",
    summary: "Contracts first. Adapters last.",
    signal: "Architecture that survives contact.",
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
    icon: BoxesIcon,
    accent: "#7C9A7E",
  },
  {
    index: "04",
    title: "Performance & reliability",
    summary: "Quiet on-call. Measurable speed.",
    signal: "Scary releases become non-events.",
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
    icon: GaugeIcon,
    accent: "#A88B6A",
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
  const current = CAPABILITIES[active] ?? CAPABILITIES[0]!;

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

  // Rich content reveal for the active panel (masked title, accent line,
  // icon pop, cascading copy, ghost drift) — transform/opacity only.
  const animatePanel = useCallback(() => {
    const root = panelRef.current;
    if (!root) return;

    const titleInner = root.querySelector<HTMLElement>(
      "[data-cap-title-inner]",
    );
    const line = root.querySelector<HTMLElement>("[data-cap-line]");
    const icon = root.querySelector<HTMLElement>("[data-cap-icon]");
    const ghost = root.querySelector<HTMLElement>("[data-cap-ghost]");
    const fades = gsap.utils.toArray<HTMLElement>("[data-cap-fade]", root);
    const badges = gsap.utils.toArray<HTMLElement>("[data-cap-badge]", root);
    const targets = [titleInner, line, icon, ghost, ...fades, ...badges];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(targets);
    if (reduce) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      titleInner,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.55, ease: "power4.out" },
      0,
    )
      .fromTo(
        line,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5 },
        0.05,
      )
      .fromTo(
        icon,
        { autoAlpha: 0, scale: 0.7, rotate: -8 },
        { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.6)" },
        0.03,
      )
      .fromTo(
        ghost,
        { autoAlpha: 0, scale: 1.15, yPercent: 8 },
        { autoAlpha: 0.07, scale: 1, yPercent: 0, duration: 0.75 },
        0,
      )
      .fromTo(
        fades,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 },
        0.06,
      )
      .fromTo(
        badges,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 },
        0.1,
      );
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const cap = CAPABILITIES[active] ?? CAPABILITIES[0]!;
      animatePanel();
      animateMetrics(cap);
    });
    return () => cancelAnimationFrame(frame);
  }, [active, animateMetrics, animatePanel]);

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

  const Icon = current.icon;

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
          <p
            aria-live="polite"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:text-xs"
          >
            <span
              className="transition-colors duration-500"
              style={{ color: current.accent }}
            >
              {current.index}
            </span>{" "}
            / {String(CAPABILITIES.length).padStart(2, "0")} · {current.title}
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
              const TabIcon = cap.icon;
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
                    "group relative grid grid-cols-[1.75rem_2.25rem_1fr_auto] items-center gap-3 border-b border-[var(--border)] py-5 pl-3 text-left transition-colors md:py-6",
                    isActive
                      ? "border-[var(--text-primary)]"
                      : "hover:border-[var(--text-muted)]",
                  )}
                >
                  {/* Active accent bar */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1/2 left-0 h-[62%] w-[2px] origin-center -translate-y-1/2 transition-transform duration-500 ease-out",
                      isActive ? "scale-y-100" : "scale-y-0",
                    )}
                    style={{ backgroundColor: cap.accent }}
                  />

                  <span
                    aria-hidden
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full border transition-colors duration-300",
                      isActive
                        ? ""
                        : "border-[var(--border)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]",
                    )}
                    style={
                      isActive
                        ? { borderColor: cap.accent, color: cap.accent }
                        : undefined
                    }
                  >
                    <TabIcon className="size-3.5" />
                  </span>

                  <span
                    className={cn(
                      "font-mono text-[10px] tabular-nums transition-colors md:text-xs",
                      isActive ? "" : "text-[var(--text-muted)]",
                    )}
                    style={isActive ? { color: cap.accent } : undefined}
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
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 text-[var(--text-muted)] opacity-0 group-hover:opacity-60",
                    )}
                    style={isActive ? { color: current.accent } : undefined}
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
              {/* Ghost number behind the panel */}
              <span
                data-cap-ghost
                aria-hidden
                className="pointer-events-none absolute -top-6 right-3 -z-0 select-none font-display text-[8rem] leading-none font-bold tracking-tighter text-transparent md:text-[12rem]"
                style={{ WebkitTextStroke: "1px var(--border)" }}
              >
                {current.index}
              </span>

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <span
                    data-cap-icon
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border md:size-10"
                    style={{
                      borderColor: current.accent,
                      color: current.accent,
                    }}
                  >
                    <Icon className="size-4 md:size-[18px]" />
                  </span>
                  <span
                    data-cap-line
                    className="h-px w-10 origin-left"
                    style={{ backgroundColor: current.accent }}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Discipline {current.index}
                  </p>
                </div>

                <div className="mt-3 overflow-hidden py-1">
                  <h3
                    data-cap-title-inner
                    className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] will-change-transform md:text-3xl"
                  >
                    {current.title}
                  </h3>
                </div>

                <p
                  data-cap-fade
                  className="mt-2 font-serif text-lg italic md:text-xl"
                  style={{ color: current.accent }}
                >
                  {current.signal}
                </p>

                <p
                  data-cap-fade
                  className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--text-muted)] text-pretty md:text-base"
                >
                  {current.detail}
                </p>
              </div>

              <div className="relative z-10">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Deliverables
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.deliverables.map((item) => (
                    <Badge
                      key={item}
                      data-cap-badge
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
                className="relative z-10 mt-auto grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-6"
              >
                {current.proof.map((metric) => (
                  <div key={`${current.index}-${metric.label}`}>
                    <div className="flex items-baseline gap-2">
                      <span
                        aria-hidden
                        className="h-4 w-[3px] rounded-full"
                        style={{ backgroundColor: current.accent }}
                      />
                      <p
                        data-proof-value
                        className="font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl"
                      >
                        {formatProof(metric.value, metric.suffix)}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-[var(--text-muted)] md:text-sm">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-3">
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
