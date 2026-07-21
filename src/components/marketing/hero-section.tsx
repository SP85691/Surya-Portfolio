"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRightIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DISCIPLINES = [
  {
    index: "01",
    label: "Agentic AI systems",
    detail:
      "LangGraph orchestration, tool calling, and human in the loop gates that keep AI defensible.",
  },
  {
    index: "02",
    label: "Document intelligence & RAG",
    detail:
      "Hybrid retrieval across pgvector and Neo4j over real financial documents at scale.",
  },
  {
    index: "03",
    label: "Production backend",
    detail:
      "Dual FastAPI microservices on AWS with Celery and Redis, and an ~85% latency cut.",
  },
  {
    index: "04",
    label: "Leadership & delivery",
    detail:
      "Leading a seven person pod from problem framing through demos and deployment.",
  },
];

const HERO_STATS = [
  { value: "2+", label: "Years shipping AI" },
  { value: "4+", label: "Production systems" },
  { value: "11+", label: "Agent systems" },
  { value: "~85%", label: "Latency cut" },
  { value: "7", label: "Engineers led" },
];

const SHUTTER_COUNT = 8;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [activeDiscipline, setActiveDiscipline] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const spotlight = spotlightRef.current;
      if (!section || !content || !spotlight) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (!context.conditions) return;
          const { isDesktop, reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.set(
              gsap.utils.toArray("[data-shutter-panel]", section),
              { autoAlpha: 0 },
            );
            gsap.set(gsap.utils.toArray("[data-hero-row]", section), {
              autoAlpha: 1,
              y: 0,
            });
            return;
          }

          const shutters = gsap.utils.toArray<HTMLElement>(
            "[data-shutter-panel]",
            section,
          );
          const rows = gsap.utils.toArray<HTMLElement>(
            "[data-hero-row]",
            section,
          );

          const intro = gsap.timeline({ defaults: { ease: "power4.inOut" } });
          intro
            .fromTo(
              shutters,
              {
                scaleY: 1,
                transformOrigin: (index) =>
                  index % 2 === 0 ? "center top" : "center bottom",
              },
              {
                scaleY: 0,
                duration: 1.05,
                stagger: { each: 0.055, from: "center" },
              },
            )
            .from(
              rows,
              {
                autoAlpha: 0,
                y: 42,
                duration: 0.75,
                stagger: 0.08,
                ease: "power3.out",
              },
              "-=0.42",
            );

          gsap.to(content, {
            y: isDesktop ? -72 : -24,
            scale: isDesktop ? 0.975 : 0.99,
            autoAlpha: 0.18,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
              id: "hero-newform-exit",
            },
          });

          if (!isDesktop) return;

          const moveX = gsap.quickTo(spotlight, "x", {
            duration: 0.7,
            ease: "power3.out",
          });
          const moveY = gsap.quickTo(spotlight, "y", {
            duration: 0.7,
            ease: "power3.out",
          });

          const onPointerMove = (event: PointerEvent) => {
            const bounds = section.getBoundingClientRect();
            moveX(event.clientX - bounds.left);
            moveY(event.clientY - bounds.top);
          };

          const onPointerEnter = () =>
            gsap.to(spotlight, { autoAlpha: 0.7, duration: 0.35 });
          const onPointerLeave = () =>
            gsap.to(spotlight, { autoAlpha: 0.3, duration: 0.35 });

          section.addEventListener("pointermove", onPointerMove, {
            passive: true,
          });
          section.addEventListener("pointerenter", onPointerEnter);
          section.addEventListener("pointerleave", onPointerLeave);

          return () => {
            section.removeEventListener("pointermove", onPointerMove);
            section.removeEventListener("pointerenter", onPointerEnter);
            section.removeEventListener("pointerleave", onPointerLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const active = DISCIPLINES[activeDiscipline];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),transparent_28%,transparent_72%,rgba(255,255,255,0.04))]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(12.5%-1px),rgba(255,255,255,0.055)_calc(12.5%-1px),rgba(255,255,255,0.055)_12.5%)]" />
        <div
          ref={spotlightRef}
          className="absolute left-0 top-0 size-[min(46rem,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),rgba(255,255,255,0.035)_42%,transparent_70%)] opacity-30 blur-2xl"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-40 grid grid-cols-8"
        aria-hidden
      >
        {Array.from({ length: SHUTTER_COUNT }).map((_, index) => (
          <div
            key={index}
            data-shutter-panel
            className="h-full origin-top scale-y-0 bg-[var(--bg-page)]"
          />
        ))}
      </div>

      <div
        ref={contentRef}
        className="relative z-20 mx-auto flex w-full max-w-[min(100rem,94vw)] flex-col px-4 pb-16 pt-24 will-change-transform md:px-6 md:pb-20 md:pt-28"
      >
        <div
          data-hero-row
          className="flex items-center justify-between border-b border-white/15 pb-4 text-[10px] uppercase tracking-[0.22em] text-neutral-400 md:text-xs"
        >
          <span>Surya Pratap / AI &amp; Deployment Engineer</span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="size-1.5 rounded-full bg-white" />
            Available for select work
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-8 md:py-12">
          <p
            data-hero-row
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-400 md:mb-6 md:text-xs"
          >
            AI Engineer · Backend · Full Deployment Engineer
          </p>
          <h1 className="font-display text-[clamp(3.6rem,10.4vw,10rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em]">
            <span data-hero-row className="block">
              Engineering
            </span>
            <span
              data-hero-row
              className="block text-neutral-500 transition-colors duration-500 hover:text-white"
            >
              that ships.
            </span>
          </h1>

          <div
            data-hero-row
            className="mt-10 grid gap-8 border-t border-white/15 pt-6 lg:grid-cols-[1.05fr_1.45fr] lg:gap-16"
          >
            <div className="flex max-w-xl flex-col items-start gap-6">
              <p className="text-base leading-relaxed text-neutral-300 md:text-lg">
                I&apos;m <span className="font-semibold text-white">Surya
                Pratap</span>. I build production grade AI systems end to end, and
                I lead the pod that ships them, across FinTech, healthcare, EdTech,
                and agriculture.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-black hover:bg-neutral-200"
                >
                  <Link href="/work">
                    Explore work
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/35 text-white hover:bg-white hover:text-black"
                >
                  <Link href="/contact">Start a project</Link>
                </Button>
              </div>
            </div>

            <div
              className="grid gap-1"
              role="group"
              aria-label="Engineering disciplines"
            >
              {DISCIPLINES.map((discipline, index) => {
                const isActive = activeDiscipline === index;
                return (
                  <button
                    key={discipline.index}
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActiveDiscipline(index)}
                    onFocus={() => setActiveDiscipline(index)}
                    className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-white/15 py-3 text-left"
                  >
                    <span className="font-mono text-[10px] text-neutral-600">
                      {discipline.index}
                    </span>
                    <span
                      className={`text-sm transition-colors duration-300 md:text-base ${
                        isActive ? "text-white" : "text-neutral-600"
                      }`}
                    >
                      {discipline.label}
                    </span>
                    <ArrowDownRightIcon
                      className={`size-4 transition duration-300 ${
                        isActive
                          ? "translate-x-0 text-white opacity-100"
                          : "-translate-x-2 text-neutral-600 opacity-0"
                      }`}
                      aria-hidden
                    />
                  </button>
                );
              })}
              <p
                className="min-h-12 pt-3 text-sm leading-relaxed text-neutral-400"
                aria-live="polite"
              >
                {active.detail}
              </p>
            </div>
          </div>

          <div
            data-hero-row
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-3 lg:grid-cols-5"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-display text-2xl font-semibold tracking-tighter text-white md:text-3xl">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500 md:text-[11px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-hero-row
          className="flex items-end justify-between border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500"
        >
          <span>Scroll to explore</span>
          <span>FastAPI · LangGraph · AWS · Next.js</span>
        </div>
      </div>
    </section>
  );
}
