"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StackItem = {
  name: string;
  icon: string;
};

const STACK: StackItem[] = [
  { name: "Next.js", icon: "/assets/icons/stack/nextjs.svg" },
  { name: "Python", icon: "/assets/icons/stack/python.svg" },
  { name: "TypeScript", icon: "/assets/icons/stack/typescript.svg" },
  { name: "OpenAI", icon: "/assets/icons/stack/openai.svg" },
  { name: "PostgreSQL", icon: "/assets/icons/stack/postgresql.svg" },
  { name: "FastAPI", icon: "/assets/icons/stack/fastapi.svg" },
  { name: "PyTorch", icon: "/assets/icons/stack/pytorch.svg" },
  { name: "Redis", icon: "/assets/icons/stack/redis.svg" },
  { name: "AWS", icon: "/assets/icons/stack/aws.svg" },
  { name: "Tailwind", icon: "/assets/icons/stack/tailwind.svg" },
  { name: "LangGraph", icon: "/assets/icons/stack/langgraph.svg" },
  { name: "GSAP", icon: "/assets/icons/stack/gsap.svg" },
];

/** Full set on both rows, phase-shifted for denser logo cloud */
const ROW_A = STACK;
const ROW_B = [...STACK.slice(6), ...STACK.slice(0, 6)];

function StackMark({ icon }: { icon: string }) {
  return (
    // Decorative — monochrome via filter so SVG currentColor stays theme-safe
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon}
      alt=""
      aria-hidden
      width={22}
      height={22}
      className="size-[22px] brightness-0 dark:invert"
    />
  );
}

function StackChip({ name, icon }: StackItem) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "group/chip hover-elevate h-14 shrink-0 gap-3 rounded-2xl border-[var(--border)]",
        "bg-[var(--bg-surface)] px-3.5 py-2 font-mono text-sm font-medium",
        "text-[var(--text-primary)] transition-[transform,border-color] duration-300",
        "hover:-translate-y-0.5 hover:border-[var(--text-muted)]",
      )}
    >
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-[0.65rem]",
          "border border-[var(--border)] bg-[var(--bg-elevated)]",
          "transition-colors duration-300 group-hover/chip:border-[var(--text-muted)]",
        )}
      >
        <StackMark icon={icon} />
      </span>
      <span className="pr-1 tracking-tight">{name}</span>
    </Badge>
  );
}

function TickerRow({
  items,
  reverse = false,
  trackRef,
}: {
  items: StackItem[];
  reverse?: boolean;
  trackRef: RefObject<HTMLDivElement | null>;
}) {
  const sequence = [...items, ...items, ...items, ...items];

  return (
    <div data-ticker-row className="relative overflow-hidden py-0.5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent sm:w-28"
      />
      <div
        ref={trackRef}
        data-ticker-track
        data-reverse={reverse ? "true" : "false"}
        className="flex w-max will-change-transform gap-3"
      >
        {sequence.map((item, index) => (
          <StackChip key={`${item.name}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
}

function createInfiniteTicker(
  track: HTMLElement,
  reverse: boolean,
  duration: number,
) {
  const distance = track.scrollWidth / 4;

  gsap.set(track, { x: reverse ? -distance : 0 });

  return gsap.to(track, {
    x: reverse ? 0 : -distance,
    duration,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((value) => {
        const x = parseFloat(value);
        return gsap.utils.wrap(-distance, 0, x);
      }),
    },
  });
}

export function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const rowA = rowARef.current;
      const rowB = rowBRef.current;
      if (!section || !rowA || !rowB) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          canMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions) return;
          const { reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.set([rowA, rowB], { clearProps: "transform" });
            gsap.set(
              gsap.utils.toArray("[data-stack-reveal]", section),
              { clearProps: "all" },
            );
            return;
          }

          gsap.fromTo(
            "[data-stack-reveal]",
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.08,
              clearProps: "transform",
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                once: true,
              },
            },
          );

          gsap.fromTo(
            "[data-ticker-row]",
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                once: true,
              },
            },
          );

          const tweenA = createInfiniteTicker(rowA, false, 28);
          const tweenB = createInfiniteTicker(rowB, true, 34);
          const tweens = [tweenA, tweenB];

          const pause = () => tweens.forEach((t) => t.pause());
          const resume = () => tweens.forEach((t) => t.resume());

          section.addEventListener("mouseenter", pause);
          section.addEventListener("mouseleave", resume);

          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate(self) {
              const velocity = Math.abs(self.getVelocity());
              const boost = gsap.utils.clamp(1, 3.2, 1 + velocity / 1400);
              tweens.forEach((tween) => {
                tween.timeScale(boost);
                gsap.to(tween, {
                  timeScale: 1,
                  duration: 0.85,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              });
            },
          });

          return () => {
            section.removeEventListener("mouseenter", pause);
            section.removeEventListener("mouseleave", resume);
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
      aria-labelledby="trusted-stack-heading"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-page)] py-8 md:py-10"
    >
      <div
        data-stack-reveal
        className="mx-auto mb-6 flex max-w-[min(100rem,94vw)] items-end justify-between gap-6 border-b border-[var(--border)] px-4 pb-5 md:mb-8 md:px-6"
      >
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
            Production tools
          </p>
          <h2
            id="trusted-stack-heading"
            className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-primary)] md:text-sm"
          >
            Trusted stack
          </h2>
        </div>
        <div className="flex max-w-sm flex-col items-end gap-2 text-right">
          <p className="hidden text-sm leading-snug text-[var(--text-muted)] text-pretty sm:block">
            Tools I ship with when the work has to hold up in production.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:text-xs">
            {STACK.length} systems
          </p>
        </div>
      </div>

      <div
        className="motion-safe:block motion-reduce:hidden"
        role="region"
        aria-label="Technology stack scrolling showcase"
      >
        <div className="flex flex-col gap-3.5">
          <TickerRow items={ROW_A} trackRef={rowARef} />
          <TickerRow items={ROW_B} reverse trackRef={rowBRef} />
        </div>
      </div>

      <ul
        className="mx-auto hidden max-w-[min(90rem,92vw)] flex-wrap items-center justify-center gap-3 px-4 motion-reduce:flex"
        aria-label="Technology stack"
      >
        {STACK.map((item) => (
          <li key={item.name}>
            <StackChip {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
