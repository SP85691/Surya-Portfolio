"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  BotIcon,
  BrainCircuitIcon,
  CloudIcon,
  Code2Icon,
  FileSearchIcon,
  LayersIcon,
  MicroscopeIcon,
  RocketIcon,
  ServerIcon,
  SparklesIcon,
  UsersIcon,
  WaypointsIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_META } from "@/domain/site-meta";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type Profile = {
  index: string;
  label: string;
  proof: string;
  icon: LucideIcon;
  accent: string;
};

/** Specialty line under the name — what I do. */
const PROFILES: Profile[] = [
  {
    index: "01",
    label: "Agentic AI systems",
    proof: "11+ agents on Infer360",
    icon: BotIcon,
    accent: "#C6A579",
  },
  {
    index: "02",
    label: "Multi-agent architectures",
    proof: "7 specialised agents · SkinCare AI",
    icon: LayersIcon,
    accent: "#C89CA0",
  },
  {
    index: "03",
    label: "RAG workflows",
    proof: "pgvector · Neo4j · hybrid RAG",
    icon: FileSearchIcon,
    accent: "#7BA0BC",
  },
  {
    index: "04",
    label: "LLM fine-tuning",
    proof: "~65% inference cost cut",
    icon: BrainCircuitIcon,
    accent: "#A88B6A",
  },
  {
    index: "05",
    label: "Machine learning",
    proof: "CV · NER · production scorers",
    icon: SparklesIcon,
    accent: "#8FB694",
  },
  {
    index: "06",
    label: "Full-stack AI development",
    proof: "Next.js · FastAPI · LangGraph",
    icon: Code2Icon,
    accent: "#6E8CA0",
  },
  {
    index: "07",
    label: "Backend engineering",
    proof: "~85% API latency cut",
    icon: ServerIcon,
    accent: "#B08A8A",
  },
  {
    index: "08",
    label: "Forward deployment",
    proof: "Client → staging → production",
    icon: RocketIcon,
    accent: "#7C9A7E",
  },
  {
    index: "09",
    label: "Cloud & production",
    proof: "AWS · Docker · Celery · Redis",
    icon: CloudIcon,
    accent: "#7BA0BC",
  },
  {
    index: "10",
    label: "Pod leadership",
    proof: "7 engineers led · Xicom",
    icon: UsersIcon,
    accent: "#C6A579",
  },
];

type Chapter = {
  index: string;
  year: string;
  tag: string;
  role: string;
  org: string;
  story: string;
  impact: string;
  icon: LucideIcon;
  accent: string;
};

/** Right card — career story from the resume, not specialty duplicates. */
const CHAPTERS: Chapter[] = [
  {
    index: "01",
    year: "2023",
    tag: "Where it began",
    role: "ML Research Intern",
    org: "Ashoka University · CDSA",
    story:
      "I started where rigor is non-negotiable. Web-scale biographical pipelines and a CV + NER system that turned raw images into structured research records, validated on live datasets.",
    impact: "CV + NER at scale",
    icon: MicroscopeIcon,
    accent: "#7BA0BC",
  },
  {
    index: "02",
    year: "2024",
    tag: "Learning to ship",
    role: "AI Software Developer",
    org: "LetsAI Solutions",
    story:
      "I learned what production really costs. A call-evaluation pipeline replaced manual QA for 50+ agents, then QLoRA fine-tunes of Qwen 2.5 and LLaMA 3.1 retired GPT-4 from that workload.",
    impact: "~65% inference cost cut",
    icon: WaypointsIcon,
    accent: "#8FB694",
  },
  {
    index: "03",
    year: "2025",
    tag: "Owning delivery",
    role: "AI Engineer & Pod Lead",
    org: "Xicom Technologies",
    story:
      "I own production AI end to end on Infer360. Dual FastAPI services on AWS, hybrid retrieval across pgvector and Neo4j, and a seven-person pod from problem framing through demos and deploy.",
    impact: "~85% API latency cut",
    icon: RocketIcon,
    accent: "#C6A579",
  },
  {
    index: "04",
    year: "Now",
    tag: "How I work",
    role: "Forward-deployed ownership",
    org: "First call → staging → production",
    story:
      "I sit with the problem from the first client conversation through staging, live demos, rollout, and the on-call that follows. Architecture, stakeholders, and shipping — not just the model.",
    impact: "7 engineers · Infer360",
    icon: UsersIcon,
    accent: "#C89CA0",
  },
];

const HERO_STATS = [
  { value: "2+", label: "Years shipping AI", accent: "#7BA0BC" },
  { value: "4+", label: "Production systems", accent: "#C6A579" },
  { value: "11+", label: "Agent systems", accent: "#8FB694" },
  { value: "~85%", label: "Latency cut", accent: "#C89CA0" },
  { value: "7", label: "Engineers led", accent: "#A88B6A" },
];

const SHUTTER_COUNT = 8;
const PROFILE_MS = 3400;
const CHAPTER_MS = 5600;
const PROFILE_TOTAL = String(PROFILES.length).padStart(2, "0");
const CHAPTER_TOTAL = String(CHAPTERS.length).padStart(2, "0");

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const profileLineRef = useRef<HTMLDivElement>(null);
  const profileProgressRef = useRef<HTMLDivElement>(null);
  const chapterCardRef = useRef<HTMLDivElement>(null);
  const chapterProgressRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLSpanElement>(null);
  const profilePausedRef = useRef(false);
  const chapterPausedRef = useRef(false);
  const [profileIndex, setProfileIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);

  const active = PROFILES[profileIndex] ?? PROFILES[0]!;
  const chapter = CHAPTERS[chapterIndex] ?? CHAPTERS[0]!;
  const prevChapter =
    CHAPTERS[(chapterIndex - 1 + CHAPTERS.length) % CHAPTERS.length]!;
  const nextChapter = CHAPTERS[(chapterIndex + 1) % CHAPTERS.length]!;

  const goToProfile = useCallback((index: number) => {
    setProfileIndex((prevIdx) => {
      const nextIdx =
        ((index % PROFILES.length) + PROFILES.length) % PROFILES.length;
      return prevIdx === nextIdx ? prevIdx : nextIdx;
    });
  }, []);

  const goToChapter = useCallback((index: number) => {
    setChapterIndex((prevIdx) => {
      const nextIdx =
        ((index % CHAPTERS.length) + CHAPTERS.length) % CHAPTERS.length;
      return prevIdx === nextIdx ? prevIdx : nextIdx;
    });
  }, []);

  useEffect(() => {
    const wash = washRef.current;
    const profileLine = profileLineRef.current;
    const progress = profileProgressRef.current;

    if (wash) {
      gsap.fromTo(
        wash,
        { autoAlpha: 0.5 },
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
      );
    }

    if (profileLine) {
      const inner =
        profileLine.querySelector<HTMLElement>("[data-profile-inner]");
      const proof =
        profileLine.querySelector<HTMLElement>("[data-profile-proof]");
      if (inner) {
        gsap.fromTo(
          inner,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: "power4.out" },
        );
      }
      if (proof) {
        gsap.fromTo(
          proof,
          { autoAlpha: 0, x: -10 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.4,
            delay: 0.06,
            ease: "power3.out",
          },
        );
      }
    }

    if (progress) {
      gsap.fromTo(
        progress,
        { scaleX: 0 },
        { scaleX: 1, duration: PROFILE_MS / 1000, ease: "none" },
      );
    }
  }, [active]);

  useEffect(() => {
    const card = chapterCardRef.current;
    const progress = chapterProgressRef.current;

    if (card) {
      gsap.fromTo(
        card.querySelectorAll("[data-chapter-fade]"),
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        },
      );
    }

    if (progress) {
      gsap.fromTo(
        progress,
        { scaleX: 0 },
        { scaleX: 1, duration: CHAPTER_MS / 1000, ease: "none" },
      );
    }
  }, [chapter]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const profileId = window.setInterval(() => {
      if (profilePausedRef.current) return;
      setProfileIndex((prevIdx) => (prevIdx + 1) % PROFILES.length);
    }, PROFILE_MS);

    const chapterId = window.setInterval(() => {
      if (chapterPausedRef.current) return;
      setChapterIndex((prevIdx) => (prevIdx + 1) % CHAPTERS.length);
    }, CHAPTER_MS);

    return () => {
      window.clearInterval(profileId);
      window.clearInterval(chapterId);
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const spotlight = spotlightRef.current;
      const ghost = ghostRef.current;
      const scrollCue = scrollCueRef.current;
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
            gsap.set(gsap.utils.toArray("[data-shutter-panel]", section), {
              autoAlpha: 0,
            });
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
          const title = section.querySelector<HTMLElement>("[data-hero-title]");
          const stats = gsap.utils.toArray<HTMLElement>(
            "[data-hero-stat]",
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
                y: 32,
                duration: 0.7,
                stagger: 0.07,
                ease: "power3.out",
              },
              "-=0.42",
            );

          if (title) {
            intro.from(
              title,
              { yPercent: 110, duration: 0.9, ease: "power4.out" },
              "-=0.55",
            );
          }

          if (stats.length) {
            intro.from(
              stats,
              {
                autoAlpha: 0,
                y: 18,
                duration: 0.5,
                stagger: 0.05,
                ease: "power3.out",
              },
              "-=0.35",
            );
          }

          const scrollTalk = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.85,
              id: "hero-scroll-talk",
            },
          });

          scrollTalk
            .to(
              content,
              {
                y: isDesktop ? -90 : -36,
                scale: isDesktop ? 0.97 : 0.99,
                autoAlpha: 0.2,
              },
              0,
            )
            .to(
              spotlight,
              { autoAlpha: 0.12, scale: 1.25, transformOrigin: "center" },
              0,
            );

          if (ghost) {
            scrollTalk.to(
              ghost,
              {
                yPercent: isDesktop ? -12 : -6,
                scale: 1.06,
                autoAlpha: 0.025,
                transformOrigin: "center",
              },
              0,
            );
          }

          if (scrollCue) {
            scrollTalk.to(scrollCue, { autoAlpha: 0, y: 16 }, 0);
            gsap.to(scrollCue, {
              y: 6,
              duration: 1.1,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
            });
          }

          if (!isDesktop) return;

          const moveX = gsap.quickTo(spotlight, "x", {
            duration: 0.65,
            ease: "power3.out",
          });
          const moveY = gsap.quickTo(spotlight, "y", {
            duration: 0.65,
            ease: "power3.out",
          });

          const onPointerMove = (event: PointerEvent) => {
            const bounds = section.getBoundingClientRect();
            moveX(event.clientX - bounds.left);
            moveY(event.clientY - bounds.top);
          };
          const onPointerEnter = () =>
            gsap.to(spotlight, { autoAlpha: 0.85, duration: 0.35 });
          const onPointerLeave = () =>
            gsap.to(spotlight, { autoAlpha: 0.35, duration: 0.35 });

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

  const ActiveIcon = active.icon;
  const ChapterIcon = chapter.icon;
  const mailto = `mailto:${SITE_META.email}?subject=${encodeURIComponent(
    "Let's build something",
  )}`;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.07),transparent_28%,transparent_72%,rgba(255,255,255,0.03))]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(12.5%-1px),rgba(255,255,255,0.045)_calc(12.5%-1px),rgba(255,255,255,0.045)_12.5%)]" />
        <div
          ref={washRef}
          className="absolute inset-0 will-change-[opacity]"
          style={{
            background: `radial-gradient(ellipse 65% 50% at 82% 48%, ${hexToRgba(chapter.accent, 0.22)}, transparent 68%)`,
          }}
        />
        <div
          ref={spotlightRef}
          className="absolute left-0 top-0 size-[min(46rem,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-2xl will-change-transform"
          style={{
            background: `radial-gradient(circle, ${hexToRgba(active.accent, 0.35)}, rgba(255,255,255,0.06) 42%, transparent 70%)`,
          }}
        />
        {/* Hard dissolve to page — avoids muddy grey mix in light mode.
            Caller: page.tsx. User: light theme stack looks bad. */}
        <div className="absolute inset-x-0 bottom-0 z-0 h-[min(22vh,11rem)] bg-gradient-to-b from-transparent from-0% via-transparent via-35% to-[var(--bg-page)] to-100%" />
        <div className="absolute inset-x-0 bottom-0 z-0 h-16 bg-gradient-to-b from-transparent to-[var(--bg-page)]" />
        <span
          ref={ghostRef}
          className="absolute bottom-[6%] right-[-1%] z-[1] hidden select-none font-display text-[min(36vw,16rem)] font-bold leading-none tracking-tighter text-white/[0.09] will-change-transform lg:block"
        >
          SP
        </span>
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
        className="relative z-20 mx-auto flex w-full max-w-[min(100rem,94vw)] flex-col px-4 pb-12 pt-24 will-change-transform md:px-6 md:pb-14 md:pt-28"
      >
        <div
          data-hero-row
          className="flex items-center justify-between border-b border-white/15 pb-4 text-[10px] uppercase tracking-[0.22em] text-neutral-400 md:text-xs"
        >
          <span className="flex items-center gap-2">
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: active.accent }}
            />
            New Delhi · Remote-friendly
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for select 2026 work
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-6 md:py-8">
          <p
            data-hero-row
            className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-400 md:mb-4 md:text-xs"
          >
            AI &amp; Deployment Engineer · Pod Lead
          </p>

          <h1 className="overflow-hidden">
            <span
              data-hero-title
              className="block whitespace-nowrap font-display text-[clamp(2.35rem,9.6vw,8.75rem)] font-semibold uppercase leading-[0.9] tracking-[-0.07em] will-change-transform"
            >
              Surya{" "}
              <span className="text-neutral-500 transition-colors duration-500 hover:text-white">
                Pratap.
              </span>
            </span>
          </h1>

          <div
            ref={profileLineRef}
            data-hero-row
            className="mt-4 flex min-h-[4.25rem] flex-col justify-center gap-2 md:mt-5 md:min-h-[5rem]"
            aria-live="polite"
            onMouseEnter={() => {
              profilePausedRef.current = true;
            }}
            onMouseLeave={() => {
              profilePausedRef.current = false;
            }}
          >
            <div className="overflow-hidden py-0.5">
              <p
                key={`label-${active.index}`}
                data-profile-inner
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-serif text-[clamp(1.4rem,3.6vw,2.85rem)] leading-[1.15] italic tracking-tight will-change-transform"
                style={{ color: active.accent }}
              >
                <span
                  className="inline-flex size-8 shrink-0 translate-y-0.5 items-center justify-center rounded-lg border md:size-9"
                  style={{
                    borderColor: hexToRgba(active.accent, 0.5),
                    backgroundColor: hexToRgba(active.accent, 0.12),
                  }}
                >
                  <ActiveIcon className="size-4 md:size-[18px]" />
                </span>
                {active.label}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p
                key={`proof-${active.index}`}
                data-profile-proof
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 md:text-[11px]"
              >
                <span className="text-neutral-600">
                  {active.index} / {PROFILE_TOTAL}
                </span>
                <span className="mx-2 text-neutral-700">·</span>
                {active.proof}
              </p>
              <span
                className="hidden h-0.5 w-16 overflow-hidden rounded-full bg-white/15 sm:block"
                aria-hidden
              >
                <span
                  ref={profileProgressRef}
                  className="block h-full origin-left rounded-full will-change-transform"
                  style={{ backgroundColor: active.accent }}
                />
              </span>
            </div>
            <div
              className="mt-1 flex flex-wrap items-center gap-1.5"
              role="tablist"
              aria-label="Specialties"
            >
              {PROFILES.map((profile, index) => {
                const isActive = index === profileIndex;
                return (
                  <button
                    key={profile.index}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={profile.label}
                    onClick={() => goToProfile(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      isActive ? "w-5" : "w-1.5 bg-white/20 hover:bg-white/40",
                    )}
                    style={
                      isActive
                        ? { backgroundColor: profile.accent }
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </div>

          <div
            data-hero-row
            className="mt-8 grid gap-8 border-t border-white/15 pt-6 lg:mt-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
          >
            <div className="flex max-w-xl flex-col items-start gap-5 md:gap-6">
              <p className="text-base leading-relaxed text-pretty text-neutral-300 md:text-lg">
                I&apos;m the engineer who owns the outcome, not just the model.
                Agentic platforms, RAG workflows, LLM fine-tuning, and forward
                deployment from the first client conversation to a running
                product.
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
                  <a href={mailto}>Start a project</a>
                </Button>
              </div>
            </div>

            <div
              className="relative flex flex-col"
              onMouseEnter={() => {
                chapterPausedRef.current = true;
              }}
              onMouseLeave={() => {
                chapterPausedRef.current = false;
              }}
              onFocusCapture={() => {
                chapterPausedRef.current = true;
              }}
              onBlurCapture={() => {
                chapterPausedRef.current = false;
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Path · {chapter.index} / {CHAPTER_TOTAL}
                </span>
                <span
                  className="h-0.5 w-20 overflow-hidden rounded-full bg-white/15"
                  aria-hidden
                >
                  <span
                    ref={chapterProgressRef}
                    className="block h-full origin-left rounded-full will-change-transform"
                    style={{ backgroundColor: chapter.accent }}
                  />
                </span>
              </div>

              <div
                ref={chapterCardRef}
                className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-sm md:p-6"
                style={{ boxShadow: `inset 3px 0 0 ${chapter.accent}` }}
              >
                <div
                  data-chapter-fade
                  className="mb-4 flex items-start justify-between gap-3"
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: hexToRgba(chapter.accent, 0.55),
                      color: chapter.accent,
                      backgroundColor: hexToRgba(chapter.accent, 0.12),
                    }}
                  >
                    <ChapterIcon className="size-5" />
                  </span>
                  <div className="flex flex-col items-end gap-1.5 text-right">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                      {chapter.year}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                      style={{
                        color: chapter.accent,
                        backgroundColor: hexToRgba(chapter.accent, 0.12),
                      }}
                    >
                      {chapter.tag}
                    </span>
                  </div>
                </div>

                <p
                  data-chapter-fade
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500"
                >
                  {chapter.org}
                </p>
                <h2
                  data-chapter-fade
                  className="mt-1.5 font-display text-xl font-semibold tracking-tight text-white md:text-2xl"
                >
                  {chapter.role}
                </h2>
                <p
                  data-chapter-fade
                  className="mt-3 text-sm leading-relaxed text-neutral-300"
                >
                  {chapter.story}
                </p>
                <p
                  data-chapter-fade
                  className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: chapter.accent }}
                >
                  {chapter.impact}
                </p>

                <div
                  data-chapter-fade
                  className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4"
                >
                  <button
                    type="button"
                    onClick={() => goToChapter(chapterIndex - 1)}
                    className="group flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-600">
                      Prev
                    </span>
                    <span className="truncate text-xs text-neutral-500 transition-colors group-hover:text-neutral-300">
                      {prevChapter.role}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => goToChapter(chapterIndex + 1)}
                    className="group flex min-w-0 flex-1 flex-col items-end gap-0.5 text-right"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-600">
                      Next
                    </span>
                    <span className="truncate text-xs text-neutral-500 transition-colors group-hover:text-neutral-300">
                      {nextChapter.role}
                    </span>
                  </button>
                </div>
              </div>

              <div
                className="mt-4 flex flex-wrap items-center justify-center gap-1.5"
                role="tablist"
                aria-label="Career chapters"
              >
                {CHAPTERS.map((item, index) => {
                  const isActive = index === chapterIndex;
                  return (
                    <button
                      key={item.index}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`${item.year} · ${item.role}`}
                      onClick={() => goToChapter(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        isActive
                          ? "w-6"
                          : "w-1.5 bg-white/20 hover:bg-white/40",
                      )}
                      style={
                        isActive
                          ? { backgroundColor: item.accent }
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div
            data-hero-row
            className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-3 lg:grid-cols-5"
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                data-hero-stat
                className="flex flex-col gap-1.5 will-change-transform"
              >
                <span
                  className="h-0.5 w-7 rounded-full"
                  style={{ backgroundColor: stat.accent }}
                  aria-hidden
                />
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
          <span
            ref={scrollCueRef}
            className="inline-flex items-center gap-2 will-change-transform"
          >
            Scroll to explore
            <ArrowDownIcon className="size-3.5" />
          </span>
          <span className="hidden sm:inline">
            FastAPI · LangGraph · AWS · Next.js
          </span>
        </div>
      </div>
    </section>
  );
}
