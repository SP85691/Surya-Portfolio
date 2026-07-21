"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ScaleIcon,
  HeartPulseIcon,
  MicIcon,
  SproutIcon,
  PhoneCallIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ACCENTS = {
  sand: "#C6A579",
  mauve: "#C89CA0",
  slate: "#7BA0BC",
  sage: "#8FB694",
  clay: "#B98C6D",
} as const;

const SHUTTER_COUNT = 8;

type Metric = { value: string; label: string };

type Project = {
  index: string;
  name: string;
  domain: string;
  status: string;
  role: string;
  period: string;
  tagline: string;
  story: string;
  stack: string[];
  metrics: Metric[];
  image: string;
  imageAlt: string;
  credit: string;
  icon: LucideIcon;
  accent: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Infer360",
    domain: "FinTech · Transfer Pricing",
    status: "Live in production",
    role: "Lead AI & Backend Engineer",
    period: "Jul 2025 — Present",
    tagline: "AI proposes, humans confirm, every number stays auditable.",
    story:
      "A B2B platform that automates OECD transfer-pricing compliance end to end. Eleven-plus agents draft the analysis, a reviewer approves, and guarded code commits the numbers, so tax authorities always see a defensible trail. I run two FastAPI microservices on AWS with hybrid retrieval across pgvector and Neo4j.",
    stack: ["FastAPI", "LangGraph", "pgvector", "Neo4j", "Celery", "AWS"],
    metrics: [
      { value: "~80%", label: "Manual analyst effort removed" },
      { value: "~85%", label: "API latency reduction" },
      { value: "11+", label: "Distinct agent systems" },
    ],
    image: "/assets/images/projects/infer360.jpg",
    imageAlt: "Tax and financial documents with a calculator",
    credit: "Unsplash",
    icon: ScaleIcon,
    accent: ACCENTS.sand,
  },
  {
    index: "02",
    name: "SkinCare AI",
    domain: "Healthcare · Consultation",
    status: "Production",
    role: "AI Systems Engineer",
    period: "2025",
    tagline: "A dermatology assistant that talks, listens, and stays grounded.",
    story:
      "A seven-agent LangGraph system powers a conversational skincare consultant across text and natural voice. A strict agent registry routes each message to the right specialist instead of overloading one prompt, which keeps answers grounded and dramatically cuts redundant model calls per turn.",
    stack: ["LangGraph", "FastAPI", "Multi-Agent", "Voice / TTS", "Redis"],
    metrics: [
      { value: "~75%", label: "Fewer LLM calls per message" },
      { value: "7", label: "Specialised agents orchestrated" },
      { value: "Chat + Voice", label: "Dual interaction modes" },
    ],
    image: "/assets/images/projects/skincare.jpg",
    imageAlt: "Hands typing on a laptop beside a stethoscope",
    credit: "Unsplash",
    icon: HeartPulseIcon,
    accent: ACCENTS.mauve,
  },
  {
    index: "03",
    name: "iSpeak AI",
    domain: "EdTech · IELTS Speaking",
    status: "Production-ready",
    role: "AI Systems & Backend Engineer",
    period: "Oct 2025 — Jan 2026",
    tagline: "An examiner in software, grounded in real rubric language.",
    story:
      "Automated examiner-style IELTS Speaking assessment from raw audio. A high-concurrency FastAPI backend transcribes with faster-whisper, then a LangGraph pipeline scores the four IELTS criteria against an examiner baseline, so feedback never drifts from how real raters actually speak.",
    stack: ["faster-whisper", "LangGraph", "uvloop", "MongoDB", "Gemini"],
    metrics: [
      { value: "±0.5–1.0", label: "Target band accuracy" },
      { value: "~2–3s", label: "Per-request scoring" },
      { value: "100+", label: "Concurrent sessions" },
    ],
    image: "/assets/images/projects/ispeak.jpg",
    imageAlt: "Studio microphone in a recording booth",
    credit: "Unsplash",
    icon: MicIcon,
    accent: ACCENTS.slate,
  },
  {
    index: "04",
    name: "KisanGrid AI",
    domain: "AgriTech · Advisory",
    status: "Open source",
    role: "Creator",
    period: "2025",
    tagline: "Localised farm advice, Hindi-first, from many live signals.",
    story:
      "A multi-agent agricultural advisory that gives farmers trustworthy, localised guidance in their own language. Modular LangGraph agents run hybrid RAG over live crop, weather, market, and soil APIs, with Model Context Protocol tools stitching real-time data into one Hindi-first recommendation pipeline.",
    stack: ["LangGraph", "pgvector", "TimescaleDB", "MCP", "Claude"],
    metrics: [
      { value: "Hindi-first", label: "Localised advisory output" },
      { value: "4 signals", label: "Crop · weather · market · soil" },
      { value: "MCP", label: "Live tool integration" },
    ],
    image: "/assets/images/projects/kisangrid.jpg",
    imageAlt: "Golden farm field at sunrise",
    credit: "Unsplash",
    icon: SproutIcon,
    accent: ACCENTS.sage,
  },
  {
    index: "05",
    name: "Call-Evaluation Pipeline",
    domain: "SaaS · Quality Assurance",
    status: "Shipped",
    role: "AI Software Developer",
    period: "2024 — 2025",
    tagline: "Retiring GPT-4 with fine-tuned models that cost a fraction.",
    story:
      "An end-to-end call-evaluation pipeline that replaced manual QA for fifty-plus agents. Whisper ASR and diarisation feed an LLM scorer across eight-plus quality metrics. I fine-tuned Qwen 2.5 and LLaMA 3.1 with QLoRA to match production quality while retiring GPT-4 from the workload entirely.",
    stack: ["Whisper ASR", "QLoRA", "Unsloth", "HF TRL", "RAGAS"],
    metrics: [
      { value: "~65%", label: "Inference cost cut" },
      { value: "~84%", label: "Fine-tuned Qwen accuracy" },
      { value: "50+", label: "Agents QA automated" },
    ],
    image: "/assets/images/projects/calleval.jpg",
    imageAlt: "Professional standing with a laptop in an open office",
    credit: "Unsplash",
    icon: PhoneCallIcon,
    accent: ACCENTS.clay,
  },
];

const TOTAL = String(PROJECTS.length).padStart(2, "0");

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = PROJECTS[active] ?? PROJECTS[0]!;

  useGSAP(
    () => {
      const scene = sceneRef.current;
      const pin = pinRef.current;
      const fallback = fallbackRef.current;
      if (!scene || !pin) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (!context.conditions) return;
          const { isDesktop, reduceMotion } = context.conditions;

          // Mobile: CSS already shows the static stacked list and hides the
          // pinned scene, so there is nothing to animate here.
          if (!isDesktop) return;

          // Desktop + reduced motion: force the static list in place of the pin.
          if (reduceMotion) {
            scene.style.display = "none";
            if (fallback) fallback.style.display = "block";
            return () => {
              scene.style.display = "";
              if (fallback) fallback.style.display = "";
            };
          }

          const q = (el: Element, sel: string) =>
            gsap.utils.toArray<HTMLElement>(sel, el);

          const copies = gsap.utils.toArray<HTMLElement>("[data-pr-copy]", pin);
          const images = gsap.utils.toArray<HTMLElement>("[data-pr-image]", pin);
          const inners = gsap.utils.toArray<HTMLElement>(
            "[data-pr-image-inner]",
            pin,
          );
          const sweeps = gsap.utils.toArray<HTMLElement>("[data-pr-sweep]", pin);
          const shutters = gsap.utils.toArray<HTMLElement>(
            "[data-pr-shutter]",
            pin,
          );
          const progress = pin.querySelector<HTMLElement>("[data-pr-progress]");

          const parts = copies.map((c) => ({
            titleInner: c.querySelector<HTMLElement>("[data-pr-title-inner]"),
            line: c.querySelector<HTMLElement>("[data-pr-line]"),
            icon: c.querySelector<HTMLElement>("[data-pr-icon]"),
            ghost: c.querySelector<HTMLElement>("[data-pr-ghost]"),
            fades: q(c, "[data-pr-fade]"),
            badges: q(c, "[data-pr-badge]"),
            metrics: q(c, "[data-pr-metric]"),
          }));

          const setCopyIn = (i: number) => {
            const p = parts[i]!;
            gsap.set(p.titleInner, { yPercent: 0 });
            gsap.set(p.line, { scaleX: 1, transformOrigin: "left center" });
            gsap.set(p.icon, { autoAlpha: 1, scale: 1, rotate: 0 });
            gsap.set(p.ghost, { autoAlpha: 1, yPercent: 0, scale: 1 });
            gsap.set(p.fades, { autoAlpha: 1, y: 0 });
            gsap.set(p.badges, { autoAlpha: 1, y: 0 });
            gsap.set(p.metrics, { autoAlpha: 1, y: 0, scale: 1 });
          };
          const setCopyOut = (i: number) => {
            const p = parts[i]!;
            gsap.set(p.titleInner, { yPercent: 110 });
            gsap.set(p.line, { scaleX: 0, transformOrigin: "left center" });
            gsap.set(p.icon, { autoAlpha: 0, scale: 0.7, rotate: -8 });
            gsap.set(p.ghost, { autoAlpha: 0, yPercent: 10, scale: 1.15 });
            gsap.set(p.fades, { autoAlpha: 0, y: 14 });
            gsap.set(p.badges, { autoAlpha: 0, y: 18 });
            gsap.set(p.metrics, { autoAlpha: 0, y: 22, scale: 0.94 });
          };

          gsap.set(copies, { autoAlpha: 0, yPercent: 6 });
          gsap.set(copies[0]!, { autoAlpha: 1, yPercent: 0 });
          gsap.set(images, { autoAlpha: 0 });
          gsap.set(images[0]!, { autoAlpha: 1 });
          gsap.set(inners, { scale: 1, transformOrigin: "center" });
          gsap.set(sweeps, { xPercent: -140, autoAlpha: 0 });
          gsap.set(shutters, { scaleY: 0, transformOrigin: "top" });
          if (progress) gsap.set(progress, { scaleX: 1 / PROJECTS.length });

          PROJECTS.forEach((_, i) => (i === 0 ? setCopyIn(0) : setCopyOut(i)));

          const STEP = 1;

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => "+=" + window.innerHeight * PROJECTS.length,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate(self) {
                const idx = Math.min(
                  PROJECTS.length - 1,
                  Math.max(0, Math.round(self.progress * PROJECTS.length)),
                );
                setActive((prev) => (prev === idx ? prev : idx));
              },
            },
          });

          PROJECTS.forEach((_, i) => {
            const at = i * STEP;
            tl.addLabel(`project-${i}`, at);

            // Continuous parallax zoom on the framed image.
            tl.to(inners[i]!, { scale: 1.18, duration: STEP }, at);
            if (parts[i]!.ghost) {
              tl.to(parts[i]!.ghost, { yPercent: -8, duration: STEP }, at);
            }

            if (i < PROJECTS.length - 1) {
              const next = i + 1;
              const wipeIn = at + STEP * 0.6;
              const cover = wipeIn + STEP * 0.16;
              const wipeOut = cover + STEP * 0.02;

              tl.to(
                copies[i]!,
                {
                  autoAlpha: 0,
                  yPercent: -6,
                  duration: STEP * 0.16,
                  ease: "power2.in",
                },
                wipeIn + STEP * 0.02,
              );

              tl.to(
                shutters,
                {
                  scaleY: 1,
                  duration: STEP * 0.16,
                  stagger: { each: 0.02, from: "start" },
                  ease: "power3.inOut",
                },
                wipeIn,
              );

              tl.set(images[i]!, { autoAlpha: 0 }, cover)
                .set(images[next]!, { autoAlpha: 1 }, cover)
                .set(inners[next]!, { scale: 1 }, cover);

              tl.fromTo(
                copies[next]!,
                { autoAlpha: 0, yPercent: 6 },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: STEP * 0.2,
                  ease: "power2.out",
                },
                cover,
              );

              tl.fromTo(
                parts[next]!.titleInner,
                { yPercent: 110 },
                { yPercent: 0, duration: STEP * 0.26, ease: "power4.out" },
                cover,
              );
              tl.fromTo(
                parts[next]!.line,
                { scaleX: 0 },
                { scaleX: 1, duration: STEP * 0.3, ease: "power2.out" },
                cover + STEP * 0.04,
              );
              tl.fromTo(
                parts[next]!.icon,
                { autoAlpha: 0, scale: 0.7, rotate: -8 },
                {
                  autoAlpha: 1,
                  scale: 1,
                  rotate: 0,
                  duration: STEP * 0.3,
                  ease: "back.out(1.6)",
                },
                cover + STEP * 0.02,
              );
              tl.fromTo(
                parts[next]!.fades,
                { autoAlpha: 0, y: 14 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: STEP * 0.28,
                  stagger: STEP * 0.05,
                  ease: "power2.out",
                },
                cover + STEP * 0.05,
              );
              tl.fromTo(
                parts[next]!.badges,
                { autoAlpha: 0, y: 18 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: STEP * 0.3,
                  stagger: STEP * 0.04,
                  ease: "power2.out",
                },
                cover + STEP * 0.08,
              );
              tl.fromTo(
                parts[next]!.metrics,
                { autoAlpha: 0, y: 22, scale: 0.94 },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: STEP * 0.34,
                  stagger: STEP * 0.06,
                  ease: "back.out(1.5)",
                },
                cover + STEP * 0.1,
              );
              tl.fromTo(
                parts[next]!.ghost,
                { autoAlpha: 0, yPercent: 10, scale: 1.15 },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  scale: 1,
                  duration: STEP * 0.4,
                  ease: "power2.out",
                },
                cover,
              );

              tl.fromTo(
                sweeps[next]!,
                { xPercent: -140, autoAlpha: 0 },
                {
                  xPercent: 140,
                  autoAlpha: 1,
                  duration: STEP * 0.5,
                  ease: "power2.inOut",
                },
                cover,
              ).to(
                sweeps[next]!,
                { autoAlpha: 0, duration: STEP * 0.12 },
                cover + STEP * 0.44,
              );

              tl.to(
                shutters,
                {
                  scaleY: 0,
                  duration: STEP * 0.2,
                  stagger: { each: 0.02, from: "end" },
                  ease: "power3.inOut",
                },
                wipeOut,
              );
            }
          });

          if (progress) {
            tl.fromTo(
              progress,
              { scaleX: 1 / PROJECTS.length },
              { scaleX: 1, duration: PROJECTS.length * STEP },
              0,
            );
          }

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative bg-[var(--bg-page)]"
    >
      {/* Interactive pinned showcase — desktop only; mobile uses the static list */}
      <div ref={sceneRef} data-projects-scene className="hidden md:block">
        <div
          ref={pinRef}
          className="relative min-h-svh overflow-hidden border-b border-[var(--border)]"
        >
          {/* Full-bleed image stage */}
          <div className="absolute inset-0">
            {PROJECTS.map((project, index) => (
              <div
                key={project.image}
                data-pr-image
                aria-hidden={index !== active}
                className={cn(
                  "absolute inset-0",
                  index === 0 ? "opacity-100" : "opacity-0",
                )}
              >
                <div
                  data-pr-image-inner
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover grayscale contrast-[1.05] brightness-[0.55]"
                    priority={index === 0}
                  />
                </div>

                {/* Per-project duotone grade */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundColor: project.accent,
                    mixBlendMode: "color",
                    opacity: 0.24,
                  }}
                />
                {/* Legibility gradients */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40"
                />

                {/* Light sweep */}
                <div
                  data-pr-sweep
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent will-change-transform"
                />
              </div>
            ))}
          </div>

          {/* Shutters */}
          <div
            className="pointer-events-none absolute inset-0 z-20 grid grid-cols-8"
            aria-hidden
          >
            {Array.from({ length: SHUTTER_COUNT }).map((_, index) => (
              <div
                key={index}
                data-pr-shutter
                className="h-full origin-top scale-y-0 bg-[var(--bg-page)]"
              />
            ))}
          </div>

          {/* Content layer */}
          <div className="relative z-30 flex min-h-svh flex-col justify-between pt-24 pb-10 md:pt-28 md:pb-12">
            <div className="mx-auto w-full max-w-[min(100rem,94vw)] px-4 md:px-6">
              {/* Top bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 md:text-xs">
                    Selected projects
                  </span>
                  <span className="h-px w-10 bg-white/40" />
                </div>
                <p
                  aria-live="polite"
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60 md:text-xs"
                >
                  <span
                    className="transition-colors duration-500"
                    style={{ color: current.accent }}
                  >
                    {current.index}
                  </span>{" "}
                  / {TOTAL} · {current.name}
                </p>
              </div>

              {/* Mobile segmented indicator */}
              <div className="mt-4 flex items-center gap-1.5 md:hidden" aria-hidden>
                {PROJECTS.map((project, index) => (
                  <div
                    key={project.index}
                    className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20"
                  >
                    <div
                      className={cn(
                        "h-full origin-left rounded-full transition-transform duration-500 ease-out",
                        index <= active ? "scale-x-100" : "scale-x-0",
                      )}
                      style={{ backgroundColor: current.accent }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Copy stack — one active project at a time */}
            <div className="mx-auto w-full max-w-[min(100rem,94vw)] px-4 md:px-6">
              <div className="relative min-h-[26rem] md:min-h-[32rem]">
                {PROJECTS.map((project, index) => {
                  const Icon = project.icon;
                  return (
                    <article
                      key={project.index}
                      data-pr-copy
                      aria-hidden={index !== active}
                      className={cn(
                        "absolute inset-0 flex flex-col justify-end gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10",
                        index !== active && "pointer-events-none",
                      )}
                    >
                      {/* Ghost number */}
                      <span
                        data-pr-ghost
                        aria-hidden
                        className="pointer-events-none absolute -top-4 right-0 -z-0 select-none font-display text-[7rem] leading-none font-bold tracking-tighter text-transparent md:-top-10 md:text-[15rem]"
                        style={{
                          WebkitTextStroke: `1px ${hexToRgba(project.accent, 0.55)}`,
                        }}
                      >
                        {project.index}
                      </span>

                      {/* Left: narrative */}
                      <div className="relative z-10 flex max-w-2xl flex-col gap-4 md:gap-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            data-pr-icon
                            className="flex size-10 shrink-0 items-center justify-center rounded-xl border backdrop-blur-sm md:size-11"
                            style={{
                              borderColor: hexToRgba(project.accent, 0.6),
                              color: project.accent,
                              backgroundColor: hexToRgba(project.accent, 0.12),
                            }}
                          >
                            <Icon className="size-5" />
                          </span>
                          <span
                            className="rounded-full px-3 py-1 font-mono text-[11px] font-medium tracking-[0.08em] backdrop-blur-sm"
                            style={{
                              color: project.accent,
                              backgroundColor: hexToRgba(project.accent, 0.16),
                            }}
                          >
                            {project.domain}
                          </span>
                          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                            <span
                              className="size-1.5 rounded-full"
                              style={{ backgroundColor: project.accent }}
                            />
                            {project.status}
                          </span>
                        </div>

                        <div className="overflow-hidden py-1">
                          <h3
                            data-pr-title-inner
                            className="font-display text-4xl font-semibold tracking-tighter text-white will-change-transform md:text-6xl lg:text-7xl"
                          >
                            {project.name}
                          </h3>
                        </div>

                        <span
                          data-pr-line
                          className="h-px w-16 origin-left"
                          style={{ backgroundColor: project.accent }}
                        />

                        <p
                          data-pr-fade
                          className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70"
                        >
                          {project.role} · {project.period}
                        </p>

                        <p
                          data-pr-fade
                          className="font-serif text-lg italic md:text-xl"
                          style={{ color: project.accent }}
                        >
                          {project.tagline}
                        </p>

                        <p
                          data-pr-fade
                          className="max-w-xl text-sm leading-relaxed text-pretty text-white/85 md:text-base"
                        >
                          {project.story}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <Badge
                              key={tech}
                              data-pr-badge
                              variant="outline"
                              className="rounded-full border-white/25 bg-white/5 px-3 py-1 font-mono text-xs font-normal text-white/85 backdrop-blur-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Right: impact metrics */}
                      <div className="relative z-10 grid w-full grid-cols-3 gap-3 lg:w-auto lg:max-w-xs lg:grid-cols-1 lg:gap-4">
                        {project.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            data-pr-metric
                            className="rounded-xl border border-white/15 bg-white/[0.06] p-3 backdrop-blur-md will-change-transform md:p-4"
                          >
                            <p
                              className="font-display text-xl font-semibold tracking-tighter md:text-3xl"
                              style={{ color: project.accent }}
                            >
                              {metric.value}
                            </p>
                            <p className="mt-1 text-[11px] leading-snug text-white/70 md:text-xs">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Progress rail */}
            <div className="mx-auto w-full max-w-[min(100rem,94vw)] px-4 md:px-6">
              <div className="mt-8 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
                <div
                  data-pr-progress
                  className="h-full origin-left rounded-full transition-colors duration-500"
                  style={{
                    backgroundColor: current.accent,
                    boxShadow: `0 0 12px ${current.accent}`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static stacked layout — shown on mobile and for reduced motion */}
      <div
        ref={fallbackRef}
        className="border-b border-[var(--border)] py-16 md:hidden"
      >
        <div className="mx-auto flex w-full max-w-[min(100rem,94vw)] flex-col gap-10 px-4 md:px-6">
          <header className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
              Selected projects
            </p>
            <h2
              id="projects-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-5xl"
            >
              What I have built
            </h2>
          </header>
          <Separator />
          <div className="flex flex-col gap-12">
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <article
                  key={`static-${project.index}`}
                  className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-10 shrink-0 items-center justify-center rounded-xl border"
                        style={{
                          borderColor: hexToRgba(project.accent, 0.6),
                          color: project.accent,
                          backgroundColor: hexToRgba(project.accent, 0.08),
                        }}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs text-[var(--text-primary)]">
                        {project.index}
                      </span>
                      <span className="h-px flex-1 bg-[var(--border)]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        {project.domain}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-3xl">
                      {project.name}
                    </h3>
                    <p
                      className="font-serif text-lg italic"
                      style={{ color: project.accent }}
                    >
                      {project.tagline}
                    </p>
                    <p className="max-w-xl text-sm leading-relaxed text-pretty text-[var(--text-muted)] md:text-base">
                      {project.story}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="rounded-full border-[var(--border)] bg-transparent px-3 py-1 font-mono text-xs font-normal text-[var(--text-primary)]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-4">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p
                            className="font-display text-xl font-semibold tracking-tighter md:text-2xl"
                            style={{ color: project.accent }}
                          >
                            {metric.value}
                          </p>
                          <p className="mt-1 text-[11px] leading-snug text-[var(--text-muted)]">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--border)]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover grayscale contrast-[1.05] brightness-[0.75]"
                    />
                    <figcaption className="sr-only">{project.credit}</figcaption>
                  </figure>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
