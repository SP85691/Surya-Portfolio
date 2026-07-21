"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CompassIcon,
  DraftingCompassIcon,
  BlocksIcon,
  RocketIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHUTTER_COUNT = 8;

type ProcessStep = {
  index: string;
  title: string;
  kicker: string;
  signal: string;
  description: string;
  detail: string;
  outcomes: string[];
  image: string;
  imageAlt: string;
  credit: string;
  icon: LucideIcon;
  accent: string;
};

const STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    kicker: "Constraints before code",
    signal: "Risks become contracts.",
    description:
      "Map constraints, stakeholders, and failure modes before a single line ships.",
    detail:
      "Clinical SLAs, PHI boundaries, and operator workflows define the system — not the model. I interview the people who will live with the product on-call, then write the risks down as contracts the architecture must satisfy.",
    outcomes: [
      "Stakeholder map",
      "Failure-mode register",
      "SLA & PHI boundaries",
      "Success metrics",
    ],
    image: "/assets/images/process/discover.jpg",
    imageAlt: "Planning workspace with documents and analysis",
    credit: "Unsplash / Glenn Carstens-Peters",
    icon: CompassIcon,
    accent: "#6E8CA0",
  },
  {
    index: "02",
    title: "Design",
    kicker: "Contracts first",
    signal: "Boundaries before build.",
    description:
      "Architecture that separates agents from adapters — propose / confirm as a first-class surface.",
    detail:
      "Hexagonal boundaries, audit envelopes, and human checkpoints are drawn before implementation. Message schemas, kill-switch points, and latency budgets are part of the design — not afterthoughts bolted on at the end.",
    outcomes: [
      "Hexagonal diagram",
      "Propose / confirm loops",
      "Audit envelopes",
      "Latency budgets",
    ],
    image: "/assets/images/process/design.jpg",
    imageAlt: "Code editor reflecting system design work",
    credit: "Unsplash / Kevin Ku",
    icon: DraftingCompassIcon,
    accent: "#A88B6A",
  },
  {
    index: "03",
    title: "Build",
    kicker: "Vertical slices, measured",
    signal: "Observable by default.",
    description:
      "Ship thin slices with observability baked in — parallel fan-out, caching, selective routing.",
    detail:
      "Each slice lands with dashboards, traces, and a rollback path. Lightweight tasks hit smaller models; complex differentials escalate only when confidence drops. Nothing ships without a way to watch it under load.",
    outcomes: [
      "Observable slices",
      "Prompt caching",
      "Model routing",
      "Load evidence",
    ],
    image: "/assets/images/process/build.jpg",
    imageAlt: "Server racks representing production infrastructure",
    credit: "Unsplash / Taylor Vick",
    icon: BlocksIcon,
    accent: "#7C9A7E",
  },
  {
    index: "04",
    title: "Ship",
    kicker: "Production is the product",
    signal: "The rollout is the deliverable.",
    description:
      "Rollouts with kill switches, calm operator UIs, and metrics that prove the system.",
    detail:
      "The rollout is the deliverable — not the demo. Kill switches, latency budgets, and operator overrides turn scary releases into non-events. We measure what agents propose so teams can trust what ships.",
    outcomes: [
      "Kill-switch rollout",
      "Operator UX",
      "Proof metrics",
      "Quiet on-call",
    ],
    image: "/assets/images/process/ship.jpg",
    imageAlt: "Analytics dashboard showing production metrics",
    credit: "Unsplash / Luke Chesser",
    icon: RocketIcon,
    accent: "#B08A8A",
  },
];

const TOTAL = String(STEPS.length).padStart(2, "0");

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = STEPS[active] ?? STEPS[0]!;

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

          const copies = gsap.utils.toArray<HTMLElement>(
            "[data-p-copy]",
            pin,
          );
          const images = gsap.utils.toArray<HTMLElement>(
            "[data-p-image]",
            pin,
          );
          const inners = gsap.utils.toArray<HTMLElement>(
            "[data-p-image-inner]",
            pin,
          );
          const nums = gsap.utils.toArray<HTMLElement>("[data-p-num]", pin);
          const sweeps = gsap.utils.toArray<HTMLElement>(
            "[data-p-sweep]",
            pin,
          );
          const shutters = gsap.utils.toArray<HTMLElement>(
            "[data-p-shutter]",
            pin,
          );
          const progress = pin.querySelector<HTMLElement>(
            "[data-p-progress]",
          );

          // Per-copy children, indexed to match STEPS order.
          const parts = copies.map((c) => ({
            titleInner: c.querySelector<HTMLElement>("[data-p-title-inner]"),
            line: c.querySelector<HTMLElement>("[data-p-line]"),
            icon: c.querySelector<HTMLElement>("[data-p-icon]"),
            ghost: c.querySelector<HTMLElement>("[data-p-ghost]"),
            fades: q(c, "[data-p-fade]"),
            badges: q(c, "[data-p-badge]"),
          }));

          const setCopyIn = (i: number) => {
            const p = parts[i]!;
            gsap.set(p.titleInner, { yPercent: 0 });
            gsap.set(p.line, { scaleX: 1, transformOrigin: "left center" });
            gsap.set(p.icon, { autoAlpha: 1, scale: 1, rotate: 0 });
            gsap.set(p.ghost, { autoAlpha: 0.07, yPercent: 0, scale: 1 });
            gsap.set(p.fades, { autoAlpha: 1, y: 0 });
            gsap.set(p.badges, { autoAlpha: 1, y: 0 });
          };
          const setCopyOut = (i: number) => {
            const p = parts[i]!;
            gsap.set(p.titleInner, { yPercent: 110 });
            gsap.set(p.line, { scaleX: 0, transformOrigin: "left center" });
            gsap.set(p.icon, { autoAlpha: 0, scale: 0.7, rotate: -8 });
            gsap.set(p.ghost, { autoAlpha: 0, yPercent: 10, scale: 1.15 });
            gsap.set(p.fades, { autoAlpha: 0, y: 14 });
            gsap.set(p.badges, { autoAlpha: 0, y: 18 });
          };

          // Baseline — only the first step is visible.
          gsap.set(copies, { autoAlpha: 0, yPercent: 6 });
          gsap.set(copies[0]!, { autoAlpha: 1, yPercent: 0 });
          gsap.set(images, { autoAlpha: 0 });
          gsap.set(images[0]!, { autoAlpha: 1 });
          gsap.set(inners, { scale: 1, transformOrigin: "center" });
          gsap.set(nums, { yPercent: 0 });
          gsap.set(sweeps, { xPercent: -140, autoAlpha: 0 });
          gsap.set(shutters, { scaleY: 0, transformOrigin: "top" });
          if (progress) gsap.set(progress, { scaleX: 1 / STEPS.length });

          STEPS.forEach((_, i) => (i === 0 ? setCopyIn(0) : setCopyOut(i)));

          const STEP = 1; // one segment per step

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => "+=" + window.innerHeight * STEPS.length,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate(self) {
                const idx = Math.min(
                  STEPS.length - 1,
                  Math.max(0, Math.round(self.progress * STEPS.length)),
                );
                setActive((prev) => (prev === idx ? prev : idx));
              },
            },
          });

          STEPS.forEach((_, i) => {
            const at = i * STEP;
            tl.addLabel(`step-${i}`, at);

            // Dwell parallax — the frame is always breathing.
            tl.to(inners[i]!, { scale: 1.16, duration: STEP }, at);
            tl.to(nums[i]!, { yPercent: -14, duration: STEP }, at);
            if (parts[i]!.ghost) {
              tl.to(parts[i]!.ghost, { yPercent: -8, duration: STEP }, at);
            }

            if (i < STEPS.length - 1) {
              const next = i + 1;
              const wipeIn = at + STEP * 0.6;
              const cover = wipeIn + STEP * 0.16;
              const wipeOut = cover + STEP * 0.02;

              // Current copy exits (container + ghost fade).
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
              if (parts[i]!.ghost) {
                tl.to(
                  parts[i]!.ghost,
                  { autoAlpha: 0, duration: STEP * 0.12 },
                  wipeIn + STEP * 0.02,
                );
              }

              // Shutters wipe the panel closed.
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

              // Swap image + reset the next frame under cover.
              tl.set(images[i]!, { autoAlpha: 0 }, cover)
                .set(images[next]!, { autoAlpha: 1 }, cover)
                .set(inners[next]!, { scale: 1 }, cover)
                .set(nums[next]!, { yPercent: 0 }, cover);

              // Next copy container rises in.
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

              // Masked title reveal.
              tl.fromTo(
                parts[next]!.titleInner,
                { yPercent: 110 },
                { yPercent: 0, duration: STEP * 0.26, ease: "power4.out" },
                cover,
              );
              // Accent underline draws out.
              tl.fromTo(
                parts[next]!.line,
                { scaleX: 0 },
                { scaleX: 1, duration: STEP * 0.3, ease: "power2.out" },
                cover + STEP * 0.04,
              );
              // Icon pops.
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
              // Signal + detail cascade.
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
              // Outcome badges stagger.
              tl.fromTo(
                parts[next]!.badges,
                { autoAlpha: 0, y: 18 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: STEP * 0.3,
                  stagger: STEP * 0.05,
                  ease: "power2.out",
                },
                cover + STEP * 0.08,
              );
              // Ghost number drifts in behind.
              tl.fromTo(
                parts[next]!.ghost,
                { autoAlpha: 0, yPercent: 10, scale: 1.15 },
                {
                  autoAlpha: 0.07,
                  yPercent: 0,
                  scale: 1,
                  duration: STEP * 0.4,
                  ease: "power2.out",
                },
                cover,
              );

              // Light sweep across the new frame.
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

              // Shutters lift to reveal the frame.
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

          // Continuous progress rail across the whole scene.
          if (progress) {
            tl.fromTo(
              progress,
              { scaleX: 1 / STEPS.length },
              { scaleX: 1, duration: STEPS.length * STEP },
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
      aria-labelledby="process-heading"
      className="relative bg-[var(--bg-page)]"
    >
      {/* Interactive pinned scene — desktop only; mobile uses the static list */}
      <div ref={sceneRef} data-process-scene className="hidden md:block">
        <div
          ref={pinRef}
          className="relative flex min-h-svh flex-col justify-center overflow-hidden border-b border-[var(--border)] pt-24 pb-12 md:pt-28 md:pb-14"
        >
          <div className="mx-auto flex w-full max-w-[min(100rem,94vw)] flex-col gap-7 px-4 md:gap-9 md:px-6">
            <header className="flex flex-col gap-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
                    Method
                  </p>
                  <h2
                    id="process-heading"
                    className="mt-2 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-5xl"
                  >
                    How I work
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-[var(--text-muted)] md:text-base">
                    A disciplined loop from discovery to production. Each stage
                    holds the screen — scroll to walk it, reverse to step back.
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
                  / {TOTAL} · {current.title}
                </p>
              </div>

              {/* Segmented step indicator (mobile) */}
              <div className="flex items-center gap-1.5 md:hidden" aria-hidden>
                {STEPS.map((step, index) => (
                  <div
                    key={step.index}
                    className="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--border)]"
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
            </header>

            <div className="grid items-stretch gap-8 md:grid-cols-[auto_minmax(0,0.92fr)_minmax(0,1.18fr)] md:gap-10 lg:gap-14">
              {/* Vertical index rail (desktop) */}
              <div
                className="hidden md:flex md:flex-col md:items-center md:justify-center md:pr-1"
                aria-hidden
              >
                {STEPS.map((step, index) => (
                  <div
                    key={step.index}
                    className="flex flex-col items-center"
                  >
                    <span
                      className={cn(
                        "font-mono text-xs tabular-nums transition-all duration-500 ease-out",
                        index === active
                          ? "scale-125 text-[var(--text-primary)]"
                          : "text-[var(--text-muted)]/50",
                      )}
                      style={
                        index === active
                          ? { color: step.accent }
                          : undefined
                      }
                    >
                      {step.index}
                    </span>
                    {index < STEPS.length - 1 && (
                      <span className="relative my-2.5 h-12 w-px overflow-hidden bg-[var(--border)]">
                        <span
                          className={cn(
                            "absolute inset-x-0 top-0 origin-top bg-[var(--text-primary)] transition-transform duration-500 ease-out",
                            "h-full",
                            index < active ? "scale-y-100" : "scale-y-0",
                          )}
                        />
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Copy stack — one active step at a time */}
              <div className="relative min-h-[17rem] md:min-h-[30rem]">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <article
                      key={step.index}
                      data-p-copy
                      aria-hidden={index !== active}
                      className={cn(
                        "absolute inset-0 flex flex-col justify-center",
                        index !== active && "pointer-events-none",
                      )}
                    >
                      {/* Ghost number behind the copy */}
                      <span
                        data-p-ghost
                        aria-hidden
                        className="pointer-events-none absolute -top-10 right-0 -z-0 select-none font-display text-[7rem] leading-none font-bold tracking-tighter text-transparent md:-top-16 md:text-[13rem]"
                        style={{ WebkitTextStroke: "1px var(--border)" }}
                      >
                        {step.index}
                      </span>

                      <div className="relative z-10 flex flex-col gap-4 md:gap-5">
                        <div className="flex items-center gap-3">
                          <span
                            data-p-icon
                            className="flex size-9 shrink-0 items-center justify-center rounded-full border md:size-10"
                            style={{
                              borderColor: step.accent,
                              color: step.accent,
                            }}
                          >
                            <Icon className="size-4 md:size-[18px]" />
                          </span>
                          <span
                            data-p-line
                            className="h-px w-10 origin-left"
                            style={{ backgroundColor: step.accent }}
                          />
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                            {step.kicker}
                          </span>
                        </div>

                        <div className="overflow-hidden py-1">
                          <h3
                            data-p-title-inner
                            className="font-display text-4xl font-semibold tracking-tighter text-[var(--text-primary)] will-change-transform md:text-5xl lg:text-6xl"
                          >
                            {step.title}
                          </h3>
                        </div>

                        <p
                          data-p-fade
                          className="font-serif text-lg italic md:text-xl"
                          style={{ color: step.accent }}
                        >
                          {step.signal}
                        </p>

                        <p
                          data-p-fade
                          className="max-w-md text-sm leading-relaxed text-pretty text-[var(--text-muted)] md:text-base"
                        >
                          {step.detail}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {step.outcomes.map((item) => (
                            <Badge
                              key={item}
                              data-p-badge
                              variant="outline"
                              className="rounded-full border-[var(--border)] bg-transparent px-3 py-1 font-mono text-xs font-normal text-[var(--text-primary)]"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Image panel */}
              <div className="relative h-[40svh] overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] md:h-auto md:min-h-[30rem]">
                {STEPS.map((step, index) => (
                  <div
                    key={step.image}
                    data-p-image
                    aria-hidden={index !== active}
                    className={cn(
                      "absolute inset-0",
                      index === 0 ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <div
                      data-p-image-inner
                      className="absolute inset-0 will-change-transform"
                    >
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="(min-width: 768px) 55vw, 100vw"
                        className="object-cover grayscale contrast-[1.05] brightness-[0.7]"
                        priority={index === 0}
                      />
                    </div>

                    {/* Per-step duotone grade */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundColor: step.accent,
                        mixBlendMode: "color",
                        opacity: 0.22,
                      }}
                    />
                    {/* Legibility gradient */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"
                    />

                    {/* Light sweep */}
                    <div
                      data-p-sweep
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent will-change-transform"
                    />

                    {/* Per-step overlay */}
                    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-5 md:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                          Stage {step.index}
                        </p>
                        <p className="max-w-[10rem] text-right font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                          {step.credit}
                        </p>
                      </div>

                      <div>
                        <p
                          data-p-num
                          className="font-display text-[clamp(3.5rem,13vw,8rem)] leading-[0.85] font-semibold tracking-tighter text-white/90 will-change-transform"
                        >
                          {step.index}
                        </p>
                        <p className="mt-3 max-w-sm text-sm text-pretty text-white/75 md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Shutters */}
                <div
                  className="pointer-events-none absolute inset-0 z-20 grid grid-cols-8"
                  aria-hidden
                >
                  {Array.from({ length: SHUTTER_COUNT }).map((_, index) => (
                    <div
                      key={index}
                      data-p-shutter
                      className="h-full origin-top scale-y-0 bg-[var(--bg-page)]"
                    />
                  ))}
                </div>

                {/* Progress rail */}
                <div className="absolute inset-x-5 bottom-4 z-30 md:inset-x-8 md:bottom-6">
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      data-p-progress
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
              Method
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-5xl">
              How I work
            </h2>
          </header>
          <Separator />
          <div className="flex flex-col gap-12">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={`static-${step.index}`}
                  className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-12"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                        style={{
                          borderColor: step.accent,
                          color: step.accent,
                        }}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="font-mono text-xs text-[var(--text-primary)]">
                        {step.index}
                      </span>
                      <span className="h-px flex-1 bg-[var(--border)]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        {step.kicker}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-3xl">
                      {step.title}
                    </h3>
                    <p
                      className="font-serif text-lg italic"
                      style={{ color: step.accent }}
                    >
                      {step.signal}
                    </p>
                    <p className="max-w-md text-sm leading-relaxed text-pretty text-[var(--text-muted)] md:text-base">
                      {step.detail}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.outcomes.map((item) => (
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
                  <figure className="relative aspect-[4/3] overflow-hidden border border-[var(--border)]">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover grayscale contrast-[1.05] brightness-[0.75]"
                    />
                    <figcaption className="sr-only">{step.credit}</figcaption>
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
