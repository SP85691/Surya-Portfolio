"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHUTTER_COUNT = 8;

type ProcessStep = {
  index: string;
  title: string;
  kicker: string;
  description: string;
  detail: string;
  outcomes: string[];
  image: string;
  imageAlt: string;
  credit: string;
};

const STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    kicker: "Constraints before code",
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
  },
  {
    index: "02",
    title: "Design",
    kicker: "Contracts first",
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
  },
  {
    index: "03",
    title: "Build",
    kicker: "Vertical slices, measured",
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
  },
  {
    index: "04",
    title: "Ship",
    kicker: "Production is the product",
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
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = STEPS[active] ?? STEPS[0];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          canMotion: "(prefers-reduced-motion: no-preference)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          if (!context.conditions) return;
          const { reduceMotion, isDesktop } = context.conditions;

          const images = gsap.utils.toArray<HTMLElement>(
            "[data-process-image]",
            pin,
          );
          const shutters = gsap.utils.toArray<HTMLElement>(
            "[data-process-shutter]",
            pin,
          );
          const progress = pin.querySelector<HTMLElement>(
            "[data-process-progress]",
          );
          const copies = gsap.utils.toArray<HTMLElement>(
            "[data-process-copy]",
            pin,
          );

          gsap.set(shutters, { scaleY: 0, transformOrigin: "top" });
          gsap.set(images, { autoAlpha: 0 });
          if (images[0]) gsap.set(images[0], { autoAlpha: 1 });
          if (progress) gsap.set(progress, { scaleX: 1 / STEPS.length });

          if (reduceMotion || !isDesktop) {
            gsap.set(images, { clearProps: "opacity,visibility" });
            gsap.set(copies, { clearProps: "opacity" });
            return;
          }

          copies.forEach((el, i) => {
            gsap.set(el, { autoAlpha: i === 0 ? 1 : 0.28 });
          });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () =>
                `+=${Math.round(window.innerHeight * STEPS.length * 0.85)}`,
              pin: true,
              scrub: 0.75,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate(self) {
                const idx = Math.min(
                  STEPS.length - 1,
                  Math.floor(self.progress * STEPS.length),
                );
                setActive((prev) => (prev === idx ? prev : idx));
              },
            },
          });

          STEPS.forEach((_, i) => {
            const position = i;

            if (i > 0) {
              tl.to(
                shutters,
                {
                  scaleY: 1,
                  duration: 0.28,
                  stagger: { each: 0.018, from: "start" },
                  ease: "power3.inOut",
                },
                position,
              )
                .set(images[i - 1]!, { autoAlpha: 0 }, position + 0.28)
                .set(images[i]!, { autoAlpha: 1 }, position + 0.28)
                .to(
                  copies[i - 1]!,
                  { autoAlpha: 0.28, duration: 0.2, ease: "power2.out" },
                  position + 0.2,
                )
                .to(
                  copies[i]!,
                  { autoAlpha: 1, duration: 0.25, ease: "power2.out" },
                  position + 0.25,
                )
                .to(
                  shutters,
                  {
                    scaleY: 0,
                    duration: 0.32,
                    stagger: { each: 0.018, from: "end" },
                    ease: "power3.inOut",
                  },
                  position + 0.3,
                );
            }

            if (progress) {
              tl.to(
                progress,
                {
                  scaleX: (i + 1) / STEPS.length,
                  duration: 0.55,
                  ease: "none",
                },
                position,
              );
            }

            tl.to({}, { duration: 0.55 }, position + 0.55);
          });
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
      <div
        ref={pinRef}
        className="relative flex min-h-svh flex-col justify-center border-b border-[var(--border)] py-16 lg:py-0"
      >
        <div className="mx-auto flex w-full max-w-[min(100rem,94vw)] flex-col gap-10 px-4 md:px-6 lg:gap-12">
          <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-muted)] text-pretty md:text-base">
                A disciplined loop from discovery to production — scroll to walk
                each stage. Reverse scroll to step back.
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:text-xs">
              {current.index} / {String(STEPS.length).padStart(2, "0")} ·{" "}
              {current.title}
            </p>
          </header>

          <Separator />

          <div className="grid items-stretch gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] md:gap-10 lg:gap-14">
            <div className="hidden flex-col gap-2 md:flex">
              {STEPS.map((step, index) => {
                const isActive = index === active;
                return (
                  <article
                    key={step.index}
                    data-process-copy
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "border-b border-[var(--border)] py-5 transition-colors md:py-6",
                      isActive && "border-[var(--text-primary)]",
                    )}
                  >
                    <div className="grid grid-cols-[2.5rem_1fr] gap-3">
                      <span
                        className={cn(
                          "font-mono text-[10px] md:text-xs",
                          isActive
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-muted)]",
                        )}
                      >
                        {step.index}
                      </span>
                      <div className="min-w-0">
                        <h3
                          className={cn(
                            "font-display text-xl font-semibold tracking-tight md:text-2xl",
                            isActive
                              ? "text-[var(--text-primary)]"
                              : "text-[var(--text-muted)]",
                          )}
                        >
                          {step.title}
                        </h3>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                          {step.kicker}
                        </p>
                        <p
                          className={cn(
                            "mt-3 text-sm leading-relaxed text-[var(--text-muted)] text-pretty md:text-base",
                            !isActive && "line-clamp-2 lg:line-clamp-none",
                          )}
                        >
                          {isActive ? step.detail : step.description}
                        </p>
                        {isActive && (
                          <div className="mt-4 flex flex-wrap gap-2">
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
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="relative hidden min-h-[28rem] overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] md:block lg:min-h-[32rem]">
              <div className="absolute inset-0">
                {STEPS.map((step, index) => (
                  <div
                    key={step.image}
                    data-process-image
                    className={cn(
                      "absolute inset-0",
                      index === 0 ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="55vw"
                      className="object-cover grayscale contrast-[1.05] brightness-[0.72]"
                      priority={index === 0}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10"
                    />
                  </div>
                ))}
              </div>

              <div
                className="pointer-events-none absolute inset-0 z-20 grid grid-cols-8"
                aria-hidden
              >
                {Array.from({ length: SHUTTER_COUNT }).map((_, index) => (
                  <div
                    key={index}
                    data-process-shutter
                    className="h-full origin-top scale-y-0 bg-[var(--bg-page)]"
                  />
                ))}
              </div>

              <div className="relative z-10 flex h-full min-h-[32rem] flex-col justify-between p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                    Stage {current.index}
                  </p>
                  <p className="max-w-[10rem] text-right font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                    {current.credit}
                  </p>
                </div>

                <div>
                  <p className="font-display text-[clamp(4.5rem,12vw,8rem)] font-semibold leading-none tracking-tighter text-white/90">
                    {current.index}
                  </p>
                  <p className="mt-2 max-w-sm text-sm text-white/75 text-pretty md:text-base">
                    {current.description}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="h-px w-full bg-white/20">
                    <div
                      data-process-progress
                      className="h-px origin-left bg-white"
                      style={{ transform: "scaleX(0.25)" }}
                    />
                  </div>
                  <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                    {STEPS.map((step) => (
                      <span
                        key={step.index}
                        className={cn(
                          step.index === current.index && "text-white",
                        )}
                      >
                        {step.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 md:hidden">
            {STEPS.map((step) => (
              <article
                key={`mobile-${step.index}`}
                className="flex flex-col gap-4 border-b border-[var(--border)] pb-10"
              >
                <div className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {step.kicker}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] text-pretty">
                      {step.detail}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
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
                </div>
                <figure className="relative aspect-[4/3] overflow-hidden border border-[var(--border)]">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover grayscale contrast-[1.05] brightness-[0.75]"
                  />
                  <figcaption className="sr-only">{step.credit}</figcaption>
                </figure>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
