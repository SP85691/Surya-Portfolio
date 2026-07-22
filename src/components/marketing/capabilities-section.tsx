"use client";

/**
 * Gate facts:
 * 1. Caller: src/app/page.tsx → <CapabilitiesSection />
 * 2. Existing: src/components/marketing/capabilities-section.tsx (overwrite)
 * 3. Static CAPABILITIES[]; images at /public/assets/images/capabilities/*.jpg
 * 4. User: enrich Capabilities — portfolio-curated info, images, hover/mouse,
 *    60fps GSAP, shadcn; inspire from hero + projects.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BotIcon,
  BrainCircuitIcon,
  FileSearchIcon,
  LayersIcon,
  RocketIcon,
  ServerIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHUTTER_COUNT = 7;

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type ProofMetric = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
};

type Capability = {
  index: string;
  title: string;
  summary: string;
  signal: string;
  domain: string;
  detail: string;
  outcomes: string[];
  deliverables: string[];
  stack: string[];
  proof: ProofMetric[];
  caseStudy: { label: string; href: string };
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  accent: string;
};

const CAPABILITIES: Capability[] = [
  {
    index: "01",
    title: "Agentic AI platforms",
    summary: "Propose → confirm → guarded write.",
    signal: "The LLM never owns the write path.",
    domain: "FinTech · Infer360",
    detail:
      "I design agent platforms where AI drafts and humans gate every consequential step. On Infer360 that means 11+ specialised agents across dual FastAPI runtimes, with audit envelopes so tax authorities can always follow the trail.",
    outcomes: [
      "~70–80% less manual analyst effort on transfer-pricing engagements",
      "Human-in-the-loop confirm gates before any master-data write",
      "Append-only audit trail on every AI-assisted action",
    ],
    deliverables: [
      "Propose / confirm loops",
      "Audit envelopes",
      "Tool-calling agents",
      "SSE operator progress",
    ],
    stack: ["LangGraph", "FastAPI", "Celery", "Redis", "AWS"],
    proof: [
      { value: 11, suffix: "+", label: "Agent systems on Infer360" },
      { value: 80, prefix: "~", suffix: "%", label: "Manual effort removed" },
      { value: 2, suffix: "", label: "Production microservices" },
    ],
    caseStudy: { label: "See Infer360", href: "#projects" },
    image: "/assets/images/capabilities/agents.jpg",
    imageAlt: "Financial documents and analysis workspace",
    icon: BotIcon,
    accent: "#C6A579",
  },
  {
    index: "02",
    title: "Hybrid RAG & documents",
    summary: "Grounded answers over real sources.",
    signal: "Grounding beats cleverness.",
    domain: "Retrieval · Doc intelligence",
    detail:
      "Hybrid retrieval across pgvector semantic search, Neo4j graph traversal, and structured filters — over real financial and operational documents. Parsing with Docling and PyMuPDF, type-aware chunking, and citation validation so every claim can point back to a page.",
    outcomes: [
      "pgvector HNSW + Neo4j ownership graphs in one governed plane",
      "Citation validation from fact → page / sheet / section",
      "Hindi-first advisory retrieval on KisanGrid AI with MCP tools",
    ],
    deliverables: [
      "Hybrid retrieval",
      "Citation grounding",
      "OCR / parse pipelines",
      "Type-aware chunking",
    ],
    stack: ["pgvector", "Neo4j", "Docling", "PyMuPDF", "LlamaIndex"],
    proof: [
      { value: 3, suffix: "", label: "Stores in the data plane" },
      { value: 100, suffix: "MB", label: "Docs processed per batch" },
      { value: 0, suffix: "", label: "AI-authored numbers in deliverables" },
    ],
    caseStudy: { label: "Explore projects", href: "#projects" },
    image: "/assets/images/capabilities/rag.jpg",
    imageAlt: "Document intelligence and retrieval context",
    icon: FileSearchIcon,
    accent: "#7BA0BC",
  },
  {
    index: "03",
    title: "Multi-agent orchestration",
    summary: "Adversarial beats oracular.",
    signal: "One confident model is not enough.",
    domain: "LangGraph · Critic loops",
    detail:
      "Parallel generators, a critic that attacks gaps and overreach, and Jaccard agreement scores surfaced to the analyst. On SkinCare AI a seven-agent registry routes each turn to the right specialist — cutting redundant LLM calls by ~75%.",
    outcomes: [
      "Dual generators + critic + human gate on Infer360 benchmarking",
      "7 specialised agents on SkinCare AI chat + voice",
      "~75% fewer LLM calls per message via selective routing",
    ],
    deliverables: [
      "Critic / agreement scoring",
      "Agent registries",
      "Parallel fan-out",
      "Session memory",
    ],
    stack: ["LangGraph", "LangChain", "Redis", "Voice / TTS"],
    proof: [
      { value: 7, suffix: "", label: "Specialised SkinCare agents" },
      { value: 75, prefix: "~", suffix: "%", label: "Fewer LLM calls / msg" },
      { value: 4, suffix: "", label: "LLM vendors in production" },
    ],
    caseStudy: { label: "SkinCare AI", href: "#projects" },
    image: "/assets/images/capabilities/multiagent.jpg",
    imageAlt: "Multi-agent healthcare consultation workflows",
    icon: LayersIcon,
    accent: "#C89CA0",
  },
  {
    index: "04",
    title: "Production backends",
    summary: "Contracts first. Latency measured.",
    signal: "Scary releases become non-events.",
    domain: "FastAPI · AWS · Celery",
    detail:
      "Dual FastAPI microservices on AWS with Celery/Redis fleets, Alembic migrations, and observability from day one. I cut API latency from ~500–700 ms to ~50–100 ms (~85%) by moving heavy AI work off the request path.",
    outcomes: [
      "~85% API latency reduction on Infer360",
      "202 + task-id fast path; DB status never held in memory",
      "Partitioned Celery queues with retries ahead of fresh work",
    ],
    deliverables: [
      "Async worker fleets",
      "Kill-switch rollouts",
      "Latency budgets",
      "OpenTelemetry / Langfuse",
    ],
    stack: ["FastAPI", "Celery", "Redis", "Docker", "AWS"],
    proof: [
      { value: 85, prefix: "~", suffix: "%", label: "API latency cut" },
      { value: 100, prefix: "~", suffix: "ms", label: "p50 after optimise" },
      { value: 4, suffix: "+", label: "Production AI systems" },
    ],
    caseStudy: { label: "Results in work", href: "#projects" },
    image: "/assets/images/capabilities/backend.jpg",
    imageAlt: "Server infrastructure and production systems",
    icon: ServerIcon,
    accent: "#8FB694",
  },
  {
    index: "05",
    title: "Fine-tuning & cost",
    summary: "Smaller models. Same bar.",
    signal: "Measure latency, cost, and accuracy together.",
    domain: "QLoRA · Unsloth · Eval",
    detail:
      "At LetsAI I fine-tuned Qwen 2.5 (~84%) and LLaMA 3.1 3B (~80%) with QLoRA / Unsloth / HF TRL, retiring GPT-4 from a live call-evaluation workload and cutting inference cost ~65% — with RAGAS in the loop.",
    outcomes: [
      "~65% inference cost reduction vs GPT-4 baseline",
      "Call-eval pipeline replacing manual QA for 50+ agents",
      "Whisper ASR + diarisation + 8+ quality metrics",
    ],
    deliverables: [
      "QLoRA fine-tunes",
      "Eval harnesses",
      "Cost caps per run",
      "Model routing",
    ],
    stack: ["QLoRA", "Unsloth", "Whisper", "RAGAS", "PyTorch"],
    proof: [
      { value: 65, prefix: "~", suffix: "%", label: "Inference cost cut" },
      { value: 50, suffix: "+", label: "Agents covered by eval" },
      { value: 84, suffix: "%", label: "Qwen 2.5 fine-tune score" },
    ],
    caseStudy: { label: "CallEval work", href: "#projects" },
    image: "/assets/images/capabilities/finetune.jpg",
    imageAlt: "Speech evaluation and model training context",
    icon: BrainCircuitIcon,
    accent: "#A88B6A",
  },
  {
    index: "06",
    title: "Pod leadership",
    summary: "Hands-on from framing to ship.",
    signal: "I own the outcome, not just the model.",
    domain: "Xicom · Forward deploy",
    detail:
      "I lead a seven-person pod — 2 frontend, 3 backend, 2 AI — while staying hands-on on architecture, reviews, staging demos, and client conversations. Forward deployment means I sit with the problem until production is quiet.",
    outcomes: [
      "7 engineers led on direction, review, and delivery",
      "Client → staging → live demo → rollout ownership",
      "Problem framing that both engineers and stakeholders can defend",
    ],
    deliverables: [
      "Scoped delivery plans",
      "Staging & demos",
      "Code review gates",
      "On-call readiness",
    ],
    stack: ["FastAPI", "Next.js", "LangGraph", "AWS", "GitHub"],
    proof: [
      { value: 7, suffix: "", label: "Engineers in the pod" },
      { value: 2, suffix: "+", label: "Years shipping AI" },
      { value: 4, suffix: "+", label: "Domains shipped into" },
    ],
    caseStudy: { label: "About the path", href: "#about" },
    image: "/assets/images/capabilities/leadership.jpg",
    imageAlt: "Team collaboration and delivery leadership",
    icon: UsersIcon,
    accent: "#B08A8A",
  },
];

function formatProof(value: number, suffix: string, prefix = "") {
  return `${prefix}${Intl.NumberFormat("en-US").format(value)}${suffix}`;
}

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shuttersRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
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
        duration: 0.95,
        delay: index * 0.07,
        ease: "power3.out",
        onUpdate: () => {
          node.textContent = formatProof(
            Math.round(state.value),
            metric.suffix,
            metric.prefix ?? "",
          );
        },
      });
    });
  }, []);

  const animatePanel = useCallback(() => {
    const root = panelRef.current;
    if (!root) return;

    const titleInner = root.querySelector<HTMLElement>(
      "[data-cap-title-inner]",
    );
    const line = root.querySelector<HTMLElement>("[data-cap-line]");
    const icon = root.querySelector<HTMLElement>("[data-cap-icon]");
    const ghost = root.querySelector<HTMLElement>("[data-cap-ghost]");
    const media = root.querySelector<HTMLElement>("[data-cap-media]");
    const fades = gsap.utils.toArray<HTMLElement>("[data-cap-fade]", root);
    const badges = gsap.utils.toArray<HTMLElement>("[data-cap-badge]", root);
    const outcomes = gsap.utils.toArray<HTMLElement>(
      "[data-cap-outcome]",
      root,
    );
    const targets = [
      titleInner,
      line,
      icon,
      ghost,
      media,
      ...fades,
      ...badges,
      ...outcomes,
    ];

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    gsap.killTweensOf(targets);
    if (reduce) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.5 },
    });
    tl.fromTo(
      media,
      { scale: 1.08, autoAlpha: 0.4 },
      { scale: 1, autoAlpha: 1, duration: 0.7, ease: "power2.out" },
      0,
    )
      .fromTo(
        titleInner,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.55, ease: "power4.out" },
        0.05,
      )
      .fromTo(
        line,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.45 },
        0.08,
      )
      .fromTo(
        icon,
        { autoAlpha: 0, scale: 0.7, rotate: -10 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.04,
      )
      .fromTo(
        ghost,
        { autoAlpha: 0, scale: 1.12, yPercent: 6 },
        { autoAlpha: 0.09, scale: 1, yPercent: 0, duration: 0.8 },
        0,
      )
      .fromTo(
        fades,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, stagger: 0.05 },
        0.08,
      )
      .fromTo(
        outcomes,
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, stagger: 0.06 },
        0.12,
      )
      .fromTo(
        badges,
        { autoAlpha: 0, y: 12, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, stagger: 0.04 },
        0.14,
      );
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const cap = CAPABILITIES[active] ?? CAPABILITIES[0]!;
      animatePanel();
      animateMetrics(cap);
      if (washRef.current) {
        gsap.fromTo(
          washRef.current,
          { autoAlpha: 0.4 },
          { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        );
      }
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
      duration: 0.26,
      stagger: { each: 0.028, from: "start" },
    })
      .add(() => {
        activeRef.current = nextIndex;
        setActive(nextIndex);
      })
      .to(shutters, {
        scaleY: 0,
        duration: 0.3,
        stagger: { each: 0.028, from: "end" },
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
      const panel = panelRef.current;
      const spotlight = spotlightRef.current;
      const imageWrap = imageRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (!context.conditions) return;
          const { isDesktop, reduceMotion } = context.conditions;

          gsap.set("[data-cap-shutter]", { scaleY: 0, transformOrigin: "top" });

          if (reduceMotion) {
            gsap.set(gsap.utils.toArray("[data-cap-reveal]", section), {
              clearProps: "all",
            });
            return;
          }

          gsap.fromTo(
            "[data-cap-reveal]",
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.08,
              clearProps: "transform",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true,
              },
            },
          );

          if (imageWrap) {
            gsap.fromTo(
              imageWrap,
              { yPercent: -6 },
              {
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
              },
            );
          }

          if (!isDesktop || !panel || !spotlight) return;

          const moveX = gsap.quickTo(spotlight, "x", {
            duration: 0.55,
            ease: "power3.out",
          });
          const moveY = gsap.quickTo(spotlight, "y", {
            duration: 0.55,
            ease: "power3.out",
          });

          const onMove = (event: PointerEvent) => {
            const bounds = panel.getBoundingClientRect();
            moveX(event.clientX - bounds.left);
            moveY(event.clientY - bounds.top);
          };
          const onEnter = () =>
            gsap.to(spotlight, { autoAlpha: 0.7, duration: 0.3 });
          const onLeave = () =>
            gsap.to(spotlight, { autoAlpha: 0.25, duration: 0.35 });

          panel.addEventListener("pointermove", onMove, { passive: true });
          panel.addEventListener("pointerenter", onEnter);
          panel.addEventListener("pointerleave", onLeave);

          return () => {
            panel.removeEventListener("pointermove", onMove);
            panel.removeEventListener("pointerenter", onEnter);
            panel.removeEventListener("pointerleave", onLeave);
          };
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
      <div
        ref={washRef}
        className="pointer-events-none absolute inset-0 will-change-[opacity]"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 55% 45% at 85% 40%, ${hexToRgba(current.accent, 0.14)}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[min(100rem,94vw)] px-4 md:px-6">
        <div
          data-cap-reveal
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
              What I ship
            </p>
            <h2
              id="capabilities-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-5xl"
            >
              Capabilities
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] text-pretty md:text-base">
              Six production disciplines from Infer360, SkinCare, iSpeak,
              KisanGrid, and LetsAI — agents, retrieval, backends, fine-tunes,
              and the pod that ships them.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <p
              aria-live="polite"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:text-xs"
            >
              <span style={{ color: current.accent }}>{current.index}</span>
              {" / "}
              {String(CAPABILITIES.length).padStart(2, "0")} · {current.title}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {current.domain}
            </p>
          </div>
        </div>

        <Separator className="my-8 md:my-10" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-12">
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
                    "group relative grid grid-cols-[1.75rem_2.25rem_1fr_auto] items-center gap-3 border-b border-[var(--border)] py-4 pl-3 text-left transition-[border-color,background-color,transform] duration-300 md:py-5",
                    isActive
                      ? "border-[var(--text-primary)] bg-[var(--bg-surface)]"
                      : "hover:border-[var(--text-muted)] hover:bg-[var(--bg-surface)]/60",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1/2 left-0 h-[62%] w-[2.5px] origin-center -translate-y-1/2 rounded-full transition-transform duration-500 ease-out",
                      isActive ? "scale-y-100" : "scale-y-0",
                    )}
                    style={{ backgroundColor: cap.accent }}
                  />

                  <span
                    aria-hidden
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full border transition-[transform,colors] duration-300",
                      isActive
                        ? "scale-105"
                        : "border-[var(--border)] text-[var(--text-muted)] group-hover:scale-105 group-hover:text-[var(--text-primary)]",
                    )}
                    style={
                      isActive
                        ? {
                            borderColor: cap.accent,
                            color: cap.accent,
                            backgroundColor: hexToRgba(cap.accent, 0.12),
                          }
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
                        "block font-display text-base font-semibold tracking-tight transition-colors md:text-lg",
                        isActive
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]",
                      )}
                    >
                      {cap.title}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block text-xs transition-opacity md:text-sm",
                        isActive
                          ? "text-[var(--text-muted)] opacity-100"
                          : "text-[var(--text-muted)] opacity-0 md:opacity-55",
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
            ref={panelRef}
            className="relative min-h-[28rem] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] md:min-h-[32rem]"
            style={{ boxShadow: `inset 3px 0 0 ${current.accent}` }}
          >
            <div
              ref={spotlightRef}
              className="pointer-events-none absolute left-0 top-0 z-[5] size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl will-change-transform"
              style={{
                background: `radial-gradient(circle, ${hexToRgba(current.accent, 0.45)}, transparent 70%)`,
              }}
              aria-hidden
            />

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
              id="capability-panel"
              role="tabpanel"
              aria-labelledby={`capability-tab-${current.index}`}
              className="relative z-10 flex h-full flex-col"
            >
              <div className="relative h-36 overflow-hidden md:h-44">
                <div
                  ref={imageRef}
                  data-cap-media
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    key={current.image}
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                    priority={active === 0}
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, var(--bg-surface) 0%, ${hexToRgba(current.accent, 0.35)} 45%, transparent 100%)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
                  <Badge
                    variant="outline"
                    className="rounded-full border-white/25 bg-black/40 font-mono text-[10px] text-white backdrop-blur-sm"
                  >
                    {current.domain}
                  </Badge>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                    {current.index} /{" "}
                    {String(CAPABILITIES.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col gap-6 p-5 md:gap-7 md:p-7">
                <span
                  data-cap-ghost
                  aria-hidden
                  className="pointer-events-none absolute -top-2 right-2 -z-0 select-none font-display text-[7rem] leading-none font-bold tracking-tighter text-transparent md:text-[10rem]"
                  style={{
                    WebkitTextStroke: `1px ${hexToRgba(current.accent, 0.35)}`,
                  }}
                >
                  {current.index}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <span
                      data-cap-icon
                      className="flex size-9 shrink-0 items-center justify-center rounded-xl border md:size-10"
                      style={{
                        borderColor: hexToRgba(current.accent, 0.55),
                        color: current.accent,
                        backgroundColor: hexToRgba(current.accent, 0.12),
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

                  <div className="mt-3 overflow-hidden py-0.5">
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
                    className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] text-pretty md:text-[0.95rem]"
                  >
                    {current.detail}
                  </p>
                </div>

                <div className="relative z-10">
                  <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Outcomes in production
                  </p>
                  <ul className="flex flex-col gap-2">
                    {current.outcomes.map((item) => (
                      <li
                        key={item}
                        data-cap-outcome
                        className="flex gap-2.5 text-sm leading-snug text-[var(--text-primary)]"
                      >
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: current.accent }}
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10">
                  <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
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
                  data-cap-fade
                  className="relative z-10 flex flex-wrap gap-1.5"
                >
                  {current.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  ref={metricsRef}
                  className="relative z-10 mt-auto grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-5 md:gap-5"
                >
                  {current.proof.map((metric) => (
                    <div key={`${current.index}-${metric.label}`}>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          aria-hidden
                          className="h-3.5 w-[2.5px] rounded-full"
                          style={{ backgroundColor: current.accent }}
                        />
                        <p
                          data-proof-value
                          className="font-display text-xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-3xl"
                        >
                          {formatProof(
                            metric.value,
                            metric.suffix,
                            metric.prefix ?? "",
                          )}
                        </p>
                      </div>
                      <p className="mt-1 text-[10px] leading-snug text-[var(--text-muted)] md:text-xs">
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
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                  >
                    <Link href="#about">
                      Career path
                      <RocketIcon data-icon="inline-end" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
