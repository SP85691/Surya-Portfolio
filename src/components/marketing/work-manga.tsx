"use client";

// Called by: src/app/work/page.tsx (WorkMangaPage). Existing manga work UI — edit only.
// Purpose: remove global ScrollTrigger kill that can break other pages on unmount.
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_META } from "@/domain/site-meta";
import {
  WORK_CHAPTER_ORDER,
  WORK_VOLUMES,
  type WorkVolume,
} from "@/domain/work-stories";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const MAILTO = `mailto:${SITE_META.email}?subject=${encodeURIComponent(
  "Project inquiry — from work page",
)}`;

const TOTAL = String(WORK_VOLUMES.length).padStart(2, "0");

function VolumeCover({
  volume,
  panelIndex,
}: {
  volume: WorkVolume;
  panelIndex: string;
}) {
  const caseHref = volume.hasCaseStudy
    ? `/work/${volume.slug}`
    : `#${volume.slug}-outcome`;

  return (
    <article
      id={volume.slug}
      data-manga-panel
      data-volume-index={volume.index}
      className="relative overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)]"
      style={{
        backgroundImage: `linear-gradient(160deg, ${hexToRgba(volume.accent, 0.14)} 0%, transparent 55%)`,
      }}
    >
      <div className="pointer-events-none absolute left-3 top-3 z-20 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        Vol.{volume.index} · Panel {panelIndex}
      </div>
      <div className="pointer-events-none absolute right-3 top-3 z-20 font-mono text-[10px] tabular-nums text-[var(--text-muted)]/70">
        {volume.index}/{TOTAL}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
        <Image
          src={volume.image}
          alt={volume.imageAlt}
          fill
          priority={volume.index === "01"}
          sizes="(max-width: 768px) 100vw, 90vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${hexToRgba("#0a0a0a", 0.88)} 0%, ${hexToRgba(volume.accent, 0.28)} 42%, transparent 78%)`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 space-y-3 p-5 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-none border-[var(--border)] font-mono text-[10px] uppercase tracking-[0.18em]"
            >
              {volume.domain}
            </Badge>
            <Badge
              variant="muted"
              className="rounded-none font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: volume.accent }}
            >
              {volume.status}
            </Badge>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tighter text-white md:text-5xl">
            {volume.title}
          </h2>
          <p className="max-w-2xl font-serif text-base italic text-white/80 md:text-lg">
            {volume.tagline}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-8">
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
          {volume.coverBlurb}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-3 border-y border-[var(--border)] py-4">
          {volume.metrics.map((metric) => (
            <div key={metric.label} className="min-w-[7rem]">
              <p
                className="font-display text-2xl font-semibold tracking-tight md:text-3xl"
                style={{ color: volume.accent }}
              >
                {metric.value}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {volume.stack.map((tech) => (
              <span
                key={tech}
                className="border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {volume.hasCaseStudy ? (
            <Button asChild variant="outline" size="sm" className="rounded-none">
              <Link href={caseHref}>
                Read case study
                <ArrowUpRightIcon className="size-3.5" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm" className="rounded-none">
              <Link href={caseHref}>Jump to outcome</Link>
            </Button>
          )}
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {volume.role} · {volume.period}
        </p>
      </div>
    </article>
  );
}

function ChapterPanel({
  volume,
  chapter,
  chapterIndex,
  panelIndex,
}: {
  volume: WorkVolume;
  chapter: WorkVolume["chapters"][number];
  chapterIndex: number;
  panelIndex: string;
}) {
  const isWide = chapterIndex % 3 === 0;

  return (
    <article
      id={`${volume.slug}-${chapter.id}`}
      data-manga-panel
      data-volume-index={volume.index}
      className={cn(
        "relative flex flex-col border border-[var(--border)] bg-[var(--bg-surface)] p-4 md:p-5",
        isWide ? "md:col-span-2" : "md:col-span-1",
      )}
      style={{
        backgroundImage: `linear-gradient(145deg, ${hexToRgba(volume.accent, 0.08)} 0%, transparent 50%)`,
      }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="space-y-2">
          <span
            className="inline-block border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{
              borderColor: hexToRgba(volume.accent, 0.45),
              color: volume.accent,
            }}
          >
            {chapter.sfx}
          </span>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Ch.{String(chapterIndex + 1).padStart(2, "0")} · {chapter.label}
          </p>
        </div>
        <div className="text-right font-mono text-[10px] tabular-nums text-[var(--text-muted)]/70">
          <div>Panel {panelIndex}</div>
          <div className="mt-0.5 opacity-60">
            p.{volume.index}
            {chapterIndex + 1}
          </div>
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold tracking-tight text-[var(--text-primary)] md:text-xl">
        {chapter.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
        {chapter.body}
      </p>

      {chapter.bullets && chapter.bullets.length > 0 ? (
        <ul className="mt-4 space-y-1.5 border-t border-[var(--border)] pt-3">
          {chapter.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2 text-xs leading-relaxed text-[var(--text-muted)]"
            >
              <span
                className="mt-1.5 size-1 shrink-0 rounded-full"
                style={{ backgroundColor: volume.accent }}
                aria-hidden
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export function WorkMangaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeVolume, setActiveVolume] = useState(0);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (!context.conditions) return;
          const { reduceMotion } = context.conditions;
          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-manga-panel]",
            root,
          );
          const intro = root.querySelectorAll<HTMLElement>("[data-manga-intro]");
          const covers = gsap.utils.toArray<HTMLElement>(
            "[data-volume-cover-chip]",
            root,
          );

          if (reduceMotion) {
            gsap.set([...intro, ...panels, ...covers], {
              autoAlpha: 1,
              y: 0,
              x: 0,
              scale: 1,
            });
            return;
          }

          gsap.from(intro, {
            autoAlpha: 0,
            y: 28,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
          });

          gsap.from(covers, {
            autoAlpha: 0,
            y: 16,
            scale: 0.96,
            duration: 0.55,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.2,
          });

          panels.forEach((panel) => {
            gsap.from(panel, {
              autoAlpha: 0,
              y: 36,
              scale: 0.985,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });
          });

          const volumes = gsap.utils.toArray<HTMLElement>(
            "[data-volume-block]",
            root,
          );

          volumes.forEach((block, index) => {
            ScrollTrigger.create({
              trigger: block,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveVolume(index),
              onEnterBack: () => setActiveVolume(index),
            });
          });

          if (progressRef.current) {
            gsap.fromTo(
              progressRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: root,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.4,
                },
              },
            );
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const current = WORK_VOLUMES[activeVolume] ?? WORK_VOLUMES[0]!;

  return (
    <div
      ref={rootRef}
      className="relative bg-[var(--bg-page)] pb-28 pt-[var(--space-section)]"
    >
      <div className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg-page)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[min(90rem,92vw)] items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Reading · Vol.{current.index} / {TOTAL}
            </p>
            <p className="truncate font-display text-sm font-semibold tracking-tight text-[var(--text-primary)]">
              {current.title}
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {WORK_VOLUMES.map((volume, index) => (
              <a
                key={volume.slug}
                href={`#${volume.slug}`}
                className={cn(
                  "size-2 rounded-full transition-transform",
                  index === activeVolume ? "scale-125" : "opacity-40",
                )}
                style={{ backgroundColor: volume.accent }}
                aria-label={`Jump to ${volume.title}`}
              />
            ))}
          </div>
        </div>
        <div
          ref={progressRef}
          className="h-px origin-left bg-[var(--text-primary)]/40"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="mx-auto max-w-[min(90rem,92vw)] px-4">
        <header className="max-w-3xl space-y-4 pt-10 md:pt-14">
          <p
            data-manga-intro
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
          >
            Work
          </p>
          <h1
            data-manga-intro
            className="font-display text-4xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-6xl"
          >
            Volumes of production AI
          </h1>
          <p
            data-manga-intro
            className="font-serif text-lg italic text-[var(--text-muted)] md:text-xl"
          >
            Scroll to turn the page —{" "}
            {WORK_CHAPTER_ORDER.map(
              (id) => id.charAt(0).toUpperCase() + id.slice(1),
            ).join(" → ")}
          </p>
          <p
            data-manga-intro
            className="max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base"
          >
            Five shipped systems told as a vertical comic: cover, then chapters.
            Same production language as the rest of the site — panels, stamps,
            and SFX — not a dashboard of cards.
          </p>
        </header>

        <Separator className="my-10 bg-[var(--border)]" />

        <nav aria-label="Volume covers" className="mb-14">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Cover rack
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {WORK_VOLUMES.map((volume) => (
              <a
                key={volume.slug}
                href={`#${volume.slug}`}
                data-volume-cover-chip
                className="group relative aspect-[3/4] overflow-hidden border border-[var(--border)]"
              >
                <Image
                  src={volume.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 45vw, 18vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${hexToRgba("#0a0a0a", 0.85)} 0%, transparent 60%)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/70">
                    Vol.{volume.index}
                  </p>
                  <p className="font-display text-sm font-semibold tracking-tight text-white">
                    {volume.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-20 md:space-y-28">
          {WORK_VOLUMES.map((volume, volumeIdx) => {
            let panelCounter = volumeIdx * 10 + 1;
            const coverPanel = String(panelCounter++).padStart(2, "0");

            return (
              <section
                key={volume.slug}
                data-volume-block
                className="space-y-3 md:space-y-4"
                aria-labelledby={`${volume.slug}-heading`}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p
                      id={`${volume.slug}-heading`}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
                    >
                      Volume {volume.index}
                    </p>
                    <p
                      className="font-display text-xl font-semibold tracking-tight"
                      style={{ color: volume.accent }}
                    >
                      {volume.title}
                    </p>
                  </div>
                  <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] sm:block">
                    {WORK_CHAPTER_ORDER.length} chapters
                  </p>
                </div>

                <VolumeCover volume={volume} panelIndex={coverPanel} />

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  {volume.chapters.map((chapter, chapterIndex) => {
                    const panelIndex = String(panelCounter++).padStart(2, "0");
                    return (
                      <ChapterPanel
                        key={chapter.id}
                        volume={volume}
                        chapter={chapter}
                        chapterIndex={chapterIndex}
                        panelIndex={panelIndex}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <Separator className="my-16 bg-[var(--border)]" />

        <footer
          data-manga-panel
          className="relative overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)] px-5 py-10 md:px-10 md:py-14"
          style={{
            backgroundImage: `linear-gradient(135deg, ${hexToRgba("#C6A579", 0.12)} 0%, transparent 55%)`,
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            End of volume · Next chapter
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
            Start a project
          </h2>
          <p className="mt-3 max-w-xl font-serif text-base italic text-[var(--text-muted)]">
            Tell me the problem. I&apos;ll bring the plan → discover → design →
            build → ship loop.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-none">
              <a href={MAILTO}>
                Email {SITE_META.email}
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-none">
              <Link href="/#contact">Contact on homepage</Link>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
