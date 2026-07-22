"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
/**
 * Gate: called from src/app/page.tsx → <ProcessSection />.
 * Existing file overwrite. Static STEPS[]; images in /public/assets/images/process/.
 * User: show titles (Design, Discover…) on image instead of numbers; expand to
 * Plan → Research/Discover → Design/Architect → Build → Ship → Maintain; richer content.
 */
import {
  ClipboardListIcon,
  CompassIcon,
  DraftingCompassIcon,
  BlocksIcon,
  RocketIcon,
  ShieldCheckIcon,
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

/** Plan → Discover → Design → Build → Ship → Maintain — portfolio-grounded loop. */
const STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Plan",
    kicker: "Scope before sprint",
    signal: "Ambiguity becomes a buildable plan.",
    description:
      "Turn vague asks into sequenced modules, owners, and success metrics both engineers and stakeholders can defend.",
    detail:
      "I sit with the problem — client call, operator pain, regulatory constraint — and break it into buildable modules with clear gates. On Infer360 that meant five product modules (IDR → benchmark → reports → catalogue → access) before a single agent graph was drawn. Direction, sequencing, and quality gates land here so the pod never builds the wrong thing fast.",
    outcomes: [
      "Scoped delivery plan",
      "Module sequence",
      "Success metrics",
      "Stakeholder alignment",
    ],
    image: "/assets/images/process/plan.jpg",
    imageAlt: "Planning workspace with documents and sticky notes",
    credit: "Unsplash / Glenn Carstens-Peters",
    icon: ClipboardListIcon,
    accent: "#7BA0BC",
  },
  {
    index: "02",
    title: "Discover",
    kicker: "Research the real risk",
    signal: "Risks become contracts.",
    description:
      "Map constraints, failure modes, and the people who will live with the system on-call — before architecture hardens.",
    detail:
      "Research is where I pressure-test the plan against reality: data shapes, latency budgets, PHI or audit boundaries, and what a wrong answer costs. I interview the operators who will confirm AI proposals, write failure modes as contracts, and decide where humans must stay in the loop. Grounding starts here — retrieval sources, rubrics, and citeable documents — not after the first demo.",
    outcomes: [
      "Failure-mode register",
      "Constraint map",
      "HITL gate points",
      "Source / rubric inventory",
    ],
    image: "/assets/images/process/discover.jpg",
    imageAlt: "Research desk with analysis documents",
    credit: "Unsplash / Glenn Carstens-Peters",
    icon: CompassIcon,
    accent: "#6E8CA0",
  },
  {
    index: "03",
    title: "Design",
    kicker: "Architect contracts first",
    signal: "Boundaries before build.",
    description:
      "Hexagonal boundaries, propose/confirm surfaces, and audit envelopes drawn before implementation starts.",
    detail:
      "I separate agents from adapters and numbers from prose. Message schemas, kill-switch points, latency budgets, and dual-runtime topology (state graphs vs tool loops) are design artefacts — not afterthoughts. On Infer360 the rule is fixed: AI proposes, humans confirm, guarded Python writes. The LLM never issues SQL.",
    outcomes: [
      "Hexagonal diagram",
      "Propose / confirm loops",
      "Audit envelopes",
      "Latency budgets",
    ],
    image: "/assets/images/process/design.jpg",
    imageAlt: "Code editor reflecting system architecture work",
    credit: "Unsplash / Kevin Ku",
    icon: DraftingCompassIcon,
    accent: "#C6A579",
  },
  {
    index: "04",
    title: "Build",
    kicker: "Vertical slices, measured",
    signal: "Observable by default.",
    description:
      "Thin production slices with traces, queues, and eval in the first cut — not bolted on after the incident.",
    detail:
      "Each slice lands with dashboards, Langfuse / OTel traces, and a rollback path. Heavy AI work rides Celery/Redis; APIs stay sub-100 ms. Lightweight tasks hit smaller models; complex work escalates only when confidence drops. Parallel fan-out, prompt caching, and selective routing are measured under load before they leave staging.",
    outcomes: [
      "Observable slices",
      "Async worker fleets",
      "Model routing",
      "Load evidence",
    ],
    image: "/assets/images/process/build.jpg",
    imageAlt: "Server racks representing production infrastructure",
    credit: "Unsplash / Taylor Vick",
    icon: BlocksIcon,
    accent: "#8FB694",
  },
  {
    index: "05",
    title: "Ship",
    kicker: "Production is the product",
    signal: "The rollout is the deliverable.",
    description:
      "Staging demos that survive client scrutiny, kill-switch rollouts, and metrics that prove the system under real traffic.",
    detail:
      "I stand up staging, run live demos, and own the path to production. Kill switches, operator overrides, and proof metrics turn scary releases into non-events. We measure what agents propose — latency, cost, accuracy together — so stakeholders can trust what ships. On Infer360 that meant ~85% latency cut and ~70–80% less manual analyst effort without inventing a single number.",
    outcomes: [
      "Kill-switch rollout",
      "Staging & live demos",
      "Proof metrics",
      "Quiet cutover",
    ],
    image: "/assets/images/process/ship.jpg",
    imageAlt: "Analytics dashboard showing production metrics",
    credit: "Unsplash / Luke Chesser",
    icon: RocketIcon,
    accent: "#C89CA0",
  },
  {
    index: "06",
    title: "Maintain",
    kicker: "Stay with the system",
    signal: "On-call is part of ownership.",
    description:
      "Observe, harden, and iterate — retries, cost governance, and eval loops that keep production calm after the launch.",
    detail:
      "Forward deployment does not end at launch. I keep the pod sharp on reviews, retries, job locking, and failure recovery — and I stay hands-on when production complains. Cost caps, prompt versioning, and eval harnesses keep models honest as traffic and vendors change. Quiet on-call is the product of design and discipline, not luck.",
    outcomes: [
      "On-call readiness",
      "Retry & recovery",
      "Cost / prompt versioning",
      "Continuous eval",
    ],
    image: "/assets/images/process/maintain.jpg",
    imageAlt: "Monitoring and operations dashboard",
    credit: "Unsplash / Luke Chesser",
    icon: ShieldCheckIcon,
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

          if (!isDesktop) return;

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

          const copies = gsap.utils.toArray<HTMLElement>("[data-p-copy]", pin);
          const images = gsap.utils.toArray<HTMLElement>("[data-p-image]", pin);
          const inners = gsap.utils.toArray<HTMLElement>(
            "[data-p-image-inner]",
            pin,
          );
          const nums = gsap.utils.toArray<HTMLElement>("[data-p-num]", pin);
          const sweeps = gsap.utils.toArray<HTMLElement>("[data-p-sweep]", pin);
          const shutters = gsap.utils.toArray<HTMLElement>(
            "[data-p-shutter]",
            pin,
          );
          const progress = pin.querySelector<HTMLElement>("[data-p-progress]");

          if (
            copies.length !== STEPS.length ||
            images.length !== STEPS.length ||
            inners.length !== STEPS.length
          ) {
            return;
          }

          const parts = copies.map((c) => ({
            titleInner: c.querySelector<HTMLElement>("[data-p-title-inner]"),
            line: c.querySelector<HTMLElement>("[data-p-line]"),
            icon: c.querySelector<HTMLElement>("[data-p-icon]"),
            ghost: c.querySelector<HTMLElement>("[data-p-ghost]"),
            fades: q(c, "[data-p-fade]"),
            badges: q(c, "[data-p-badge]"),
          }));

          const showStep = (i: number) => {
            copies.forEach((copy, idx) => {
              const on = idx === i;
              gsap.set(copy, { autoAlpha: on ? 1 : 0, yPercent: on ? 0 : 6 });
              if (on) {
                const p = parts[idx]!;
                gsap.set(p.titleInner, { yPercent: 0 });
                gsap.set(p.line, { scaleX: 1, transformOrigin: "left center" });
                gsap.set(p.icon, { autoAlpha: 1, scale: 1, rotate: 0 });
                gsap.set(p.ghost, { autoAlpha: 0.07, yPercent: 0, scale: 1 });
                gsap.set(p.fades, { autoAlpha: 1, y: 0 });
                gsap.set(p.badges, { autoAlpha: 1, y: 0 });
              }
            });
            images.forEach((img, idx) => {
              gsap.set(img, { autoAlpha: idx === i ? 1 : 0 });
            });
            gsap.set(inners, { scale: 1, transformOrigin: "center" });
            gsap.set(nums, { yPercent: 0 });
            gsap.set(sweeps, { xPercent: -140, autoAlpha: 0 });
            gsap.set(shutters, { scaleY: 0, transformOrigin: "top" });
          };

          showStep(0);
          if (progress) gsap.set(progress, { scaleX: 1 / STEPS.length });

          // One clean segment per step. Transitions are short crossfades —
          // no staggered shutters that overlap the next step and get stuck.
          const DWELL = 1;
          const XFADE = 0.35;
          const SEG = DWELL + XFADE;
          const STEP_COUNT = STEPS.length;

          // Shutters unused in this timeline — force hidden so they cannot cover media.
          gsap.set(shutters, { scaleY: 0, autoAlpha: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "process-method",
              trigger: pin,
              start: "top top",
              end: () =>
                "+=" + Math.round(window.innerHeight * STEP_COUNT * 1.5),
              pin: true,
              pinSpacing: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // Higher than projects so pinSpacing is measured before projects start.
              refreshPriority: 2,
              // Snap to each stage so Lenis cannot skip Discover → Projects.
              snap: {
                snapTo: (value) => {
                  const i = Math.min(
                    STEP_COUNT - 1,
                    Math.max(0, Math.round(value * STEP_COUNT - 0.5)),
                  );
                  return (i + 0.5) / STEP_COUNT;
                },
                duration: { min: 0.15, max: 0.4 },
                delay: 0.04,
                ease: "power1.inOut",
              },
              onUpdate(self) {
                const idx = Math.min(
                  STEP_COUNT - 1,
                  Math.floor(self.progress * STEP_COUNT),
                );
                setActive((prev) => (prev === idx ? prev : idx));
              },
            },
          });

          STEPS.forEach((_, i) => {
            const at = i * SEG;
            tl.addLabel(`step-${i}`, at);

            // Dwell / parallax for this step.
            tl.to(inners[i]!, { scale: 1.12, duration: DWELL }, at);
            tl.to(nums[i]!, { yPercent: -10, duration: DWELL }, at);
            if (parts[i]!.ghost) {
              tl.to(parts[i]!.ghost, { yPercent: -6, duration: DWELL }, at);
            }

            // Pad final step so every stage owns an equal timeline slice.
            if (i >= STEPS.length - 1) {
              tl.to({}, { duration: XFADE }, at + DWELL);
              return;
            }

            const next = i + 1;
            const xAt = at + DWELL;

            // Crossfade copy
            tl.to(
              copies[i]!,
              { autoAlpha: 0, yPercent: -4, duration: XFADE * 0.55 },
              xAt,
            );
            tl.fromTo(
              copies[next]!,
              { autoAlpha: 0, yPercent: 5 },
              { autoAlpha: 1, yPercent: 0, duration: XFADE },
              xAt + XFADE * 0.15,
            );

            // Crossfade image (no shutters)
            tl.to(images[i]!, { autoAlpha: 0, duration: XFADE * 0.5 }, xAt);
            tl.fromTo(
              images[next]!,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: XFADE },
              xAt + XFADE * 0.1,
            );
            tl.set(inners[next]!, { scale: 1 }, xAt);
            tl.set(nums[next]!, { yPercent: 0 }, xAt);

            // Soft reveal for next copy pieces
            tl.fromTo(
              parts[next]!.titleInner,
              { yPercent: 100 },
              { yPercent: 0, duration: XFADE, ease: "power3.out" },
              xAt + XFADE * 0.15,
            );
            tl.fromTo(
              parts[next]!.line,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: XFADE * 0.8,
                transformOrigin: "left center",
                ease: "power2.out",
              },
              xAt + XFADE * 0.2,
            );
            tl.fromTo(
              parts[next]!.icon,
              { autoAlpha: 0, scale: 0.85 },
              { autoAlpha: 1, scale: 1, duration: XFADE * 0.7, ease: "power2.out" },
              xAt + XFADE * 0.15,
            );
            tl.fromTo(
              parts[next]!.fades,
              { autoAlpha: 0, y: 10 },
              {
                autoAlpha: 1,
                y: 0,
                duration: XFADE * 0.7,
                stagger: 0.04,
                ease: "power2.out",
              },
              xAt + XFADE * 0.2,
            );
            tl.fromTo(
              parts[next]!.badges,
              { autoAlpha: 0, y: 10 },
              {
                autoAlpha: 1,
                y: 0,
                duration: XFADE * 0.7,
                stagger: 0.03,
                ease: "power2.out",
              },
              xAt + XFADE * 0.25,
            );
            if (parts[next]!.ghost) {
              tl.fromTo(
                parts[next]!.ghost,
                { autoAlpha: 0 },
                { autoAlpha: 0.07, duration: XFADE },
                xAt + XFADE * 0.15,
              );
            }

            // Optional light sweep — does not block stage visibility
            if (sweeps[next]) {
              tl.fromTo(
                sweeps[next]!,
                { xPercent: -120, autoAlpha: 0 },
                {
                  xPercent: 120,
                  autoAlpha: 0.8,
                  duration: XFADE,
                  ease: "power1.inOut",
                },
                xAt,
              );
              tl.to(sweeps[next]!, { autoAlpha: 0, duration: 0.08 }, xAt + XFADE);
            }
          });

          if (progress) {
            tl.fromTo(
              progress,
              { scaleX: 1 / STEPS.length },
              { scaleX: 1, duration: STEPS.length * SEG },
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
          className="relative flex min-h-svh flex-col justify-start overflow-hidden border-b border-[var(--border)] pt-20 pb-28 md:pt-24 md:pb-32"
        >
          <div className="mx-auto flex w-full max-w-[min(100rem,94vw)] flex-col gap-5 px-4 md:gap-6 md:px-6">
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
                    Plan → Discover → Design → Build → Ship → Maintain. Each
                    stage holds the screen — scroll to walk it, reverse to step
                    back.
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

            <div className="grid items-start gap-6 md:grid-cols-[auto_minmax(0,0.92fr)_minmax(0,1.18fr)] md:gap-8 lg:gap-12">
              {/* Vertical index rail (desktop) */}
              <div
                className="hidden md:flex md:flex-col md:items-center md:justify-start md:pt-2 md:pr-1"
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
                      <span className="relative my-1.5 h-8 w-px overflow-hidden bg-[var(--border)] lg:my-2 lg:h-10">
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
              <div className="relative min-h-[15rem] md:min-h-[24rem] lg:min-h-[26rem]">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <article
                      key={step.index}
                      data-p-copy
                      aria-hidden={index !== active}
                      className={cn(
                        "absolute inset-0 flex flex-col justify-start pt-1",
                        index !== active && "pointer-events-none",
                      )}
                    >
                      {/* Ghost number behind the copy */}
                      <span
                        data-p-ghost
                        aria-hidden
                        className="pointer-events-none absolute -top-6 right-0 -z-0 select-none font-display text-[5.5rem] leading-none font-bold tracking-tighter text-transparent md:-top-8 md:text-[9rem]"
                        style={{ WebkitTextStroke: "1px var(--border)" }}
                      >
                        {step.index}
                      </span>

                      <div className="relative z-10 flex flex-col gap-3 md:gap-4">
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

                        <div className="overflow-hidden py-0.5">
                          <h3
                            data-p-title-inner
                            className="font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] will-change-transform md:text-4xl lg:text-5xl"
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
              <div className="relative h-[36svh] overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] md:h-auto md:min-h-[24rem] lg:min-h-[26rem]">
                {STEPS.map((step, index) => (
                  <div
                    key={step.index}
                    data-p-image
                    aria-hidden={index !== active}
                    className="absolute inset-0"
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
                          className="font-display text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.9] font-semibold tracking-tighter text-white/95 will-change-transform"
                        >
                          {step.title}
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
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="font-display text-2xl font-semibold tracking-tighter text-white">
                        {step.title}
                      </p>
                      <p className="mt-1 text-xs text-white/70">
                        {step.description}
                      </p>
                    </div>
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
