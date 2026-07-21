"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MicroscopeIcon,
  WaypointsIcon,
  RocketIcon,
  HandshakeIcon,
  CpuIcon,
  PresentationIcon,
  ClipboardListIcon,
  CloudIcon,
  UsersIcon,
  MapPinIcon,
  QuoteIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ACCENTS = {
  slate: "#7BA0BC",
  sand: "#C6A579",
  sage: "#8FB694",
  mauve: "#C89CA0",
} as const;

type Era = {
  year: string;
  ghost: string;
  tag: string;
  role: string;
  org: string;
  story: string;
  impact: { value: string; label: string };
  stack: string[];
  icon: LucideIcon;
  accent: string;
};

const ERAS: Era[] = [
  {
    year: "2023",
    ghost: "2023",
    tag: "Where it began",
    role: "ML Research Intern",
    org: "Ashoka University · CDSA",
    story:
      "I started where rigor is non negotiable. I built web scale biographical data pipelines and a computer vision plus NER system that turned raw images into structured research records, validated on live datasets.",
    impact: { value: "CV + NER", label: "identity extraction at scale" },
    stack: ["Python", "OpenCV", "spaCy", "scikit-learn"],
    icon: MicroscopeIcon,
    accent: ACCENTS.slate,
  },
  {
    year: "2024",
    ghost: "2024",
    tag: "Learning to ship",
    role: "AI Software Developer",
    org: "LetsAI Solutions · Intern to Full time",
    story:
      "I learned what production really costs. I built a call evaluation pipeline that replaced manual QA for 50+ agents, then trained Qwen 2.5 and LLaMA 3.1 with QLoRA to retire GPT-4 from that workload.",
    impact: { value: "~65%", label: "inference cost cut" },
    stack: ["LangChain", "Whisper ASR", "QLoRA", "RAGAS"],
    icon: WaypointsIcon,
    accent: ACCENTS.sage,
  },
  {
    year: "2025 · Today",
    ghost: "2025",
    tag: "Owning delivery",
    role: "AI Engineer & Pod Lead",
    org: "Xicom Technologies",
    story:
      "Now I own production AI end to end on Infer360. I run dual FastAPI microservices on AWS, hybrid retrieval across pgvector and Neo4j, and I lead a seven person pod from problem framing through demos and deployment.",
    impact: { value: "~85%", label: "API latency reduction" },
    stack: ["FastAPI", "LangGraph", "pgvector", "Neo4j", "AWS"],
    icon: RocketIcon,
    accent: ACCENTS.sand,
  },
];

type Facet = {
  title: string;
  detail: string;
  icon: LucideIcon;
  accent: string;
};

const FACETS: Facet[] = [
  {
    title: "Clients & stakeholders",
    detail:
      "I turn ambiguous asks into scoped, defensible plans, and I speak fluently to both engineers and business.",
    icon: HandshakeIcon,
    accent: ACCENTS.slate,
  },
  {
    title: "Architecture & tech",
    detail:
      "Hexagonal, contracts first systems that I build hands on across backend and AI, not just draw on a whiteboard.",
    icon: CpuIcon,
    accent: ACCENTS.sand,
  },
  {
    title: "Staging & demos",
    detail:
      "I stand up staging environments and run live demos that hold up under real client scrutiny.",
    icon: PresentationIcon,
    accent: ACCENTS.sage,
  },
  {
    title: "Planning & sessions",
    detail:
      "I break work into buildable modules, sequence it, unblock the team, and keep quality gates in place.",
    icon: ClipboardListIcon,
    accent: ACCENTS.mauve,
  },
  {
    title: "Cloud & deployment",
    detail:
      "Containerised, queue driven, observable deploys on AWS that stay migration managed and reproducible.",
    icon: CloudIcon,
    accent: ACCENTS.slate,
  },
  {
    title: "Team leadership",
    detail:
      "I lead a seven person pod of 2 frontend, 3 backend, and 2 AI engineers on direction, review, and delivery.",
    icon: UsersIcon,
    accent: ACCENTS.sand,
  },
];

type Metric = {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  accent: string;
};

const METRICS: Metric[] = [
  {
    value: 2,
    suffix: "+",
    prefix: "",
    label: "Years shipping production AI",
    accent: ACCENTS.slate,
  },
  {
    value: 4,
    suffix: "+",
    prefix: "",
    label: "Production AI systems",
    accent: ACCENTS.sand,
  },
  {
    value: 11,
    suffix: "+",
    prefix: "",
    label: "Agent systems on Infer360",
    accent: ACCENTS.sage,
  },
  {
    value: 85,
    suffix: "%",
    prefix: "~",
    label: "API latency reduction",
    accent: ACCENTS.mauve,
  },
  {
    value: 7,
    suffix: "",
    prefix: "",
    label: "Engineers led in a pod",
    accent: ACCENTS.slate,
  },
  {
    value: 4,
    suffix: "",
    prefix: "",
    label: "LLM vendors in production",
    accent: ACCENTS.sand,
  },
];

const QUICK_FACTS = [
  "Agentic AI",
  "Hybrid RAG",
  "FastAPI",
  "AWS · Docker",
  "LangGraph",
];

const DOMAINS = ["FinTech", "Healthcare", "EdTech", "AgriTech", "SaaS"];

function formatMetric(value: number, prefix: string, suffix: string) {
  return `${prefix}${Intl.NumberFormat("en-US").format(value)}${suffix}`;
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

          const q = (sel: string) =>
            gsap.utils.toArray<HTMLElement>(sel, section);

          const titleInner = section.querySelector<HTMLElement>(
            "[data-about-title-inner]",
          );
          const line = section.querySelector<HTMLElement>("[data-about-line]");
          const reveals = q("[data-about-reveal]");
          const fades = q("[data-about-fade]");
          const card = section.querySelector<HTMLElement>("[data-about-card]");
          const timelineFill = section.querySelector<HTMLElement>(
            "[data-about-timeline-fill]",
          );
          const eras = q("[data-about-era]");
          const eraYears = q("[data-about-era-year]");
          const facets = q("[data-about-facet]");
          const metricCells = q("[data-about-metric]");
          const metricNodes = q("[data-about-metric-value]");
          const metricsEl = section.querySelector<HTMLElement>(
            "[data-about-metrics]",
          );
          const quoteInner = section.querySelector<HTMLElement>(
            "[data-about-quote-inner]",
          );

          if (reduceMotion) {
            gsap.set(
              [
                titleInner,
                line,
                ...reveals,
                ...fades,
                card,
                ...eras,
                ...facets,
                ...metricCells,
                quoteInner,
              ],
              { clearProps: "all" },
            );
            if (timelineFill) gsap.set(timelineFill, { scaleY: 1 });
            metricNodes.forEach((node, i) => {
              const m = METRICS[i];
              if (m) node.textContent = formatMetric(m.value, m.prefix, m.suffix);
            });
            return;
          }

          // Header: masked title, accent line, serif signature.
          if (titleInner) {
            gsap.set(titleInner, { yPercent: 110 });
            gsap.to(titleInner, {
              yPercent: 0,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: { trigger: titleInner, start: "top 88%", once: true },
            });
          }
          if (line) {
            gsap.fromTo(
              line,
              { scaleX: 0, transformOrigin: "left center" },
              {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: { trigger: line, start: "top 90%", once: true },
              },
            );
          }

          // Intro reveals.
          gsap.fromTo(
            reveals,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: reveals[0] ?? section,
                start: "top 82%",
                once: true,
              },
            },
          );

          // Small labels and strips fade up (batched).
          if (fades.length) {
            gsap.set(fades, { y: 18, autoAlpha: 0 });
            ScrollTrigger.batch(fades, {
              start: "top 90%",
              onEnter: (batch) =>
                gsap.to(batch, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.6,
                  ease: "power3.out",
                  stagger: 0.08,
                  overwrite: true,
                }),
            });
          }

          // Profile card float in plus gentle scrub parallax.
          if (card) {
            gsap.fromTo(
              card,
              { y: 40, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 85%", once: true },
              },
            );
            gsap.to(card, {
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }

          // Timeline progress line draws with scroll.
          if (timelineFill) {
            gsap.fromTo(
              timelineFill,
              { scaleY: 0, transformOrigin: "top center" },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: timelineFill.parentElement ?? timelineFill,
                  start: "top 70%",
                  end: "bottom 75%",
                  scrub: 0.6,
                },
              },
            );
          }

          // Era cards reveal on enter.
          eras.forEach((era) => {
            gsap.fromTo(
              era,
              { x: -28, autoAlpha: 0 },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: { trigger: era, start: "top 80%", once: true },
              },
            );
          });

          // Ghost year: readable accent number, parallax drift plus subtle scale.
          eraYears.forEach((year) => {
            gsap.fromTo(
              year,
              { yPercent: 20, scale: 1.08 },
              {
                yPercent: -20,
                scale: 0.96,
                ease: "none",
                scrollTrigger: {
                  trigger: year.closest("[data-about-era]") ?? year,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              },
            );
          });

          // Facet grid: batched stagger.
          if (facets.length) {
            gsap.set(facets, { y: 28, autoAlpha: 0 });
            ScrollTrigger.batch(facets, {
              start: "top 88%",
              onEnter: (batch) =>
                gsap.to(batch, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.7,
                  ease: "power3.out",
                  stagger: 0.08,
                  overwrite: true,
                }),
            });
          }

          // Metric cells reveal plus count up.
          if (metricsEl && metricNodes.length) {
            gsap.set(metricCells, { y: 22, autoAlpha: 0 });
            metricNodes.forEach((node, i) => {
              const m = METRICS[i];
              if (m) node.textContent = formatMetric(0, m.prefix, m.suffix);
            });
            ScrollTrigger.create({
              trigger: metricsEl,
              start: "top 84%",
              once: true,
              onEnter: () => {
                gsap.to(metricCells, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.6,
                  ease: "power3.out",
                  stagger: 0.07,
                });
                metricNodes.forEach((node, i) => {
                  const m = METRICS[i];
                  if (!m) return;
                  const state = { value: 0 };
                  gsap.to(state, {
                    value: m.value,
                    duration: 1.2,
                    delay: 0.1 + i * 0.07,
                    ease: "power2.out",
                    onUpdate: () => {
                      node.textContent = formatMetric(
                        Math.round(state.value),
                        m.prefix,
                        m.suffix,
                      );
                    },
                  });
                });
              },
            });
          }

          // Closing philosophy quote: masked reveal.
          if (quoteInner) {
            gsap.set(quoteInner, { yPercent: 110 });
            gsap.to(quoteInner, {
              yPercent: 0,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: { trigger: quoteInner, start: "top 88%", once: true },
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-page)] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[min(100rem,94vw)] px-4 md:px-6">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
              About
            </span>
            <span data-about-line className="h-px w-12 bg-[var(--text-primary)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:text-xs">
              Ideation to Deployment
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <h2
              id="about-heading"
              data-about-title-inner
              className="font-display text-4xl font-semibold tracking-tighter text-[var(--text-primary)] will-change-transform md:text-6xl lg:text-7xl"
            >
              More than an engineer.
            </h2>
          </div>
          <p className="max-w-2xl font-serif text-lg italic text-[var(--text-muted)] md:text-2xl">
            I take ambiguous problems from ideation to deployment, and I lead the
            teams that ship them.
          </p>
        </header>

        {/* Intro + profile card */}
        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-5">
            <p
              data-about-reveal
              className="max-w-xl text-base leading-relaxed text-pretty text-[var(--text-primary)] md:text-lg"
            >
              I&apos;m <span className="font-semibold">Surya Pratap</span>, an AI
              engineer who ships production systems, not prototypes. Over 2+ years
              I have designed and operated agentic AI platforms end to end, across
              FinTech, healthcare, EdTech, and agriculture.
            </p>
            <p
              data-about-reveal
              className="max-w-xl text-sm leading-relaxed text-pretty text-[var(--text-muted)] md:text-base"
            >
              But the title undersells the job. I frame the problem, architect the
              system, talk to clients, stand up staging, run the demos, plan the
              sprints, deploy to the cloud, and lead the pod that builds it. A full
              deployment engineer, from the first conversation to production and
              the on call that follows.
            </p>
            <div data-about-reveal className="flex flex-wrap gap-2">
              {QUICK_FACTS.map((fact) => (
                <Badge
                  key={fact}
                  variant="outline"
                  className="rounded-full border-[var(--border)] bg-transparent px-3 py-1 font-mono text-xs font-normal text-[var(--text-primary)]"
                >
                  {fact}
                </Badge>
              ))}
            </div>
          </div>

          {/* Profile card */}
          <div
            data-about-card
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 will-change-transform md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-6 -z-0 select-none font-display text-[9rem] leading-none font-bold tracking-tighter md:text-[12rem]"
              style={{
                color: hexToRgba(ACCENTS.slate, 0.14),
                WebkitTextStroke: `1px ${hexToRgba(ACCENTS.slate, 0.35)}`,
              }}
            >
              SP
            </div>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span
                  className="flex size-14 items-center justify-center rounded-2xl font-display text-2xl font-bold tracking-tight text-[var(--bg-page)]"
                  style={{ backgroundColor: "var(--text-primary)" }}
                >
                  SP
                </span>
                <div>
                  <p className="font-display text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                    Surya Pratap
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    AI &amp; Deployment Engineer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <MapPinIcon className="size-4" aria-hidden />
                New Delhi, India
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] px-3 py-2">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: ACCENTS.sage }}
                />
                <span className="text-xs text-[var(--text-muted)]">
                  Currently leading AI delivery at Xicom Technologies
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-5">
                <div>
                  <p className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)]">
                    2+
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Years</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)]">
                    4+
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Systems</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)]">
                    7
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Pod led</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="mt-20 md:mt-28">
          <div data-about-fade className="flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
              The journey
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
              From research bench to production lead
            </h3>
          </div>

          <div className="relative mt-10">
            {/* Rail */}
            <div className="pointer-events-none absolute top-4 bottom-4 left-[10px] w-0.5 rounded-full bg-[var(--border)]">
              <div
                data-about-timeline-fill
                className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-[var(--text-primary)]"
              />
            </div>

            <div className="flex flex-col gap-10 md:gap-14">
              {ERAS.map((era) => {
                const Icon = era.icon;
                return (
                  <article
                    key={era.year}
                    data-about-era
                    className="relative pl-10 will-change-transform md:pl-14"
                  >
                    {/* Rail node */}
                    <span
                      aria-hidden
                      className="absolute top-9 left-[3px] z-20 flex size-4 items-center justify-center rounded-full border-2 bg-[var(--bg-page)] md:top-11"
                      style={{
                        borderColor: era.accent,
                        boxShadow: `0 0 0 4px ${hexToRgba(era.accent, 0.12)}`,
                      }}
                    >
                      <span
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: era.accent }}
                      />
                    </span>

                    {/* Ghost year (readable accent) — decorative only; the year
                        is already shown as a pill in the card, so we hide this on
                        mobile where the full-width cards leave no room for it. */}
                    <span
                      data-about-era-year
                      aria-hidden
                      className="pointer-events-none absolute -top-9 right-0 z-0 hidden select-none font-display text-7xl font-bold tracking-tighter will-change-transform md:right-6 md:block md:text-[9rem]"
                      style={{
                        color: hexToRgba(era.accent, 0.2),
                        WebkitTextStroke: `1px ${hexToRgba(era.accent, 0.45)}`,
                      }}
                    >
                      {era.ghost}
                    </span>

                    {/* Card */}
                    <div
                      className="relative z-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 transition-colors duration-300 hover:border-[var(--text-muted)] md:max-w-3xl md:p-8"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[3px]"
                        style={{ backgroundColor: era.accent }}
                      />

                      <div className="flex flex-col gap-5">
                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className="flex size-10 shrink-0 items-center justify-center rounded-xl border"
                            style={{
                              borderColor: hexToRgba(era.accent, 0.5),
                              color: era.accent,
                              backgroundColor: hexToRgba(era.accent, 0.08),
                            }}
                          >
                            <Icon className="size-5" />
                          </span>
                          <span
                            className="rounded-full px-3 py-1 font-mono text-xs font-medium tracking-[0.08em]"
                            style={{
                              color: era.accent,
                              backgroundColor: hexToRgba(era.accent, 0.12),
                            }}
                          >
                            {era.year}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                            {era.tag}
                          </span>
                        </div>

                        {/* Title */}
                        <div>
                          <h4 className="font-display text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
                            {era.role}
                          </h4>
                          <p className="mt-1 text-sm text-[var(--text-muted)]">
                            {era.org}
                          </p>
                        </div>

                        {/* Story */}
                        <p className="text-sm leading-relaxed text-pretty text-[var(--text-primary)]/90 md:text-base">
                          {era.story}
                        </p>

                        {/* Stack */}
                        <div className="flex flex-wrap gap-2">
                          {era.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-[var(--border)] bg-[var(--bg-page)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-muted)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <Separator className="bg-[var(--border)]" />

                        {/* Impact highlight */}
                        <div className="flex items-end gap-3">
                          <span
                            className="font-display text-3xl font-semibold tracking-tighter md:text-4xl"
                            style={{ color: era.accent }}
                          >
                            {era.impact.value}
                          </span>
                          <span className="pb-1 text-xs text-[var(--text-muted)] md:text-sm">
                            {era.impact.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Every hat I wear */}
        <div className="mt-20 md:mt-28">
          <div data-about-fade className="flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
              Every hat I wear
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
              A full deployment engineer
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">
              Writing code is one lane. Shipping a product to a real client needs
              all of these, and I run every one of them.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FACETS.map((facet, i) => {
              const Icon = facet.icon;
              return (
                <div
                  key={facet.title}
                  data-about-facet
                  className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition-colors will-change-transform hover:border-[var(--text-muted)] md:p-6"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    style={{ backgroundColor: facet.accent }}
                  />
                  <span
                    aria-hidden
                    className="absolute top-4 right-4 font-mono text-xs text-[var(--text-muted)] opacity-40"
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="flex size-11 items-center justify-center rounded-full border"
                    style={{
                      borderColor: hexToRgba(facet.accent, 0.5),
                      color: facet.accent,
                      backgroundColor: hexToRgba(facet.accent, 0.08),
                    }}
                  >
                    <Icon className="size-5" />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                    {facet.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-[var(--text-muted)]">
                    {facet.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-20 md:mt-28">
          <p
            data-about-fade
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs"
          >
            Impact by the numbers
          </p>
          <div
            data-about-metrics
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-3 lg:grid-cols-6"
          >
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                data-about-metric
                className="flex flex-col gap-3 bg-[var(--bg-surface)] p-5 will-change-transform md:p-6"
              >
                <span
                  aria-hidden
                  className="h-1 w-8 rounded-full"
                  style={{ backgroundColor: metric.accent }}
                />
                <p
                  data-about-metric-value
                  className="font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl"
                >
                  {formatMetric(metric.value, metric.prefix, metric.suffix)}
                </p>
                <p className="text-xs leading-snug text-[var(--text-muted)] md:text-sm">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing philosophy */}
        <div
          data-about-fade
          className="relative mt-20 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 md:mt-28 md:p-12"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px]"
            style={{ backgroundColor: ACCENTS.sand }}
          />
          <QuoteIcon
            aria-hidden
            className="pointer-events-none absolute -top-6 right-4 size-40 text-[var(--text-primary)] opacity-[0.03]"
          />
          <figure className="relative flex max-w-4xl flex-col gap-5">
            <div className="flex items-center gap-2">
              <SparklesIcon
                className="size-4"
                style={{ color: ACCENTS.sand }}
                aria-hidden
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
                Engineering philosophy
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <blockquote
                data-about-quote-inner
                className="font-display text-2xl font-semibold tracking-tight text-pretty text-[var(--text-primary)] will-change-transform md:text-4xl"
              >
                &ldquo;AI proposes, humans confirm. I build systems that are
                correct, observable, and safe to run in front of real
                clients.&rdquo;
              </blockquote>
            </div>
            <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-primary)]">
                Surya Pratap
              </span>
              <span className="h-3 w-px bg-[var(--border)]" />
              {DOMAINS.map((domain) => (
                <span
                  key={domain}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]"
                >
                  {domain}
                </span>
              ))}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
