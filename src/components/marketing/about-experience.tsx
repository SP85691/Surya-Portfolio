"use client";

/**
 * FACTS (GateGuard):
 * 1. Caller: src/app/about/page.tsx — <AboutExperience />
 * 2. Homepage-matched /about storytelling (replaces constellation galaxy)
 * 3. Reads ABOUT_* from domain/about-page.ts (resume + portfolio dossier)
 * 4. User: same HomePage UI/UX; docs for content; no full-page galaxy
 */

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRightIcon,
  CloudIcon,
  ClipboardListIcon,
  CpuIcon,
  HandshakeIcon,
  MapPinIcon,
  MicroscopeIcon,
  PresentationIcon,
  QuoteIcon,
  RocketIcon,
  SparklesIcon,
  UsersIcon,
  WaypointsIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_META } from "@/domain/site-meta";
import {
  ABOUT_ERAS,
  ABOUT_FACETS,
  ABOUT_HERO,
  ABOUT_INTRO,
  ABOUT_METRICS,
  ABOUT_PHILOSOPHY,
  ABOUT_QUOTE,
  ABOUT_SYSTEMS,
} from "@/domain/about-page";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MAILTO = `mailto:${SITE_META.email}?subject=${encodeURIComponent(
  "About — let's talk",
)}`;

const ERA_ICONS: LucideIcon[] = [MicroscopeIcon, WaypointsIcon, RocketIcon];
const FACET_ICONS: LucideIcon[] = [
  HandshakeIcon,
  CpuIcon,
  PresentationIcon,
  ClipboardListIcon,
  CloudIcon,
  UsersIcon,
];

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatMetric(value: number, prefix: string, suffix: string) {
  return `${prefix}${Intl.NumberFormat("en-US").format(value)}${suffix}`;
}

export function AboutExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

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
            gsap.utils.toArray<HTMLElement>(sel, root);

          const heroes = q("[data-ab-hero]");
          const reveals = q("[data-ab-reveal]");
          const eras = q("[data-ab-era]");
          const facets = q("[data-ab-facet]");
          const metricsEl = root.querySelector<HTMLElement>("[data-ab-metrics]");
          const metricCells = q("[data-ab-metric]");
          const metricNodes = q("[data-ab-metric-value]");
          const phil = q("[data-ab-phil]");
          const systems = q("[data-ab-system]");
          const quoteInner = root.querySelector<HTMLElement>(
            "[data-ab-quote-inner]",
          );
          const timelineFill = root.querySelector<HTMLElement>(
            "[data-ab-timeline-fill]",
          );
          const cta = root.querySelector<HTMLElement>("[data-ab-cta]");

          if (reduceMotion) {
            gsap.set(
              [
                ...heroes,
                ...reveals,
                ...eras,
                ...facets,
                ...metricCells,
                ...phil,
                ...systems,
                quoteInner,
                cta,
              ],
              { clearProps: "all" },
            );
            if (timelineFill) gsap.set(timelineFill, { scaleY: 1 });
            metricNodes.forEach((node, i) => {
              const m = ABOUT_METRICS[i];
              if (m)
                node.textContent = formatMetric(m.value, m.prefix, m.suffix);
            });
            return;
          }

          gsap.from(heroes, {
            autoAlpha: 0,
            y: 28,
            duration: 0.85,
            stagger: 0.07,
            ease: "power3.out",
          });

          if (reveals.length) {
            gsap.from(reveals, {
              autoAlpha: 0,
              y: 24,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: reveals[0],
                start: "top 82%",
                once: true,
              },
            });
          }

          if (timelineFill) {
            gsap.fromTo(
              timelineFill,
              { scaleY: 0, transformOrigin: "top center" },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: root.querySelector("[data-ab-journey]"),
                  start: "top 70%",
                  end: "bottom 40%",
                  scrub: 0.4,
                },
              },
            );
          }

          eras.forEach((era) => {
            gsap.from(era, {
              autoAlpha: 0,
              y: 36,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: era,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          });

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

          if (metricsEl && metricNodes.length) {
            gsap.set(metricCells, { y: 22, autoAlpha: 0 });
            metricNodes.forEach((node, i) => {
              const m = ABOUT_METRICS[i];
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
                  const m = ABOUT_METRICS[i];
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

          phil.forEach((item, i) => {
            gsap.from(item, {
              autoAlpha: 0,
              y: 24,
              duration: 0.7,
              delay: i * 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            });
          });

          systems.forEach((item, i) => {
            gsap.from(item, {
              autoAlpha: 0,
              y: 20,
              duration: 0.65,
              delay: i * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            });
          });

          if (quoteInner) {
            gsap.set(quoteInner, { yPercent: 110 });
            gsap.to(quoteInner, {
              yPercent: 0,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: {
                trigger: quoteInner,
                start: "top 88%",
                once: true,
              },
            });
          }

          if (cta) {
            gsap.from(cta, {
              autoAlpha: 0,
              y: 24,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cta,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative bg-[var(--bg-page)] pb-28 pt-[var(--space-section)]"
    >
      <header className="relative mx-auto max-w-[min(100rem,94vw)] overflow-hidden px-4 md:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--text-primary)_1px,transparent_1px)] [background-size:64px_64px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, #C6A579 32%, transparent), transparent 70%)",
          }}
        />

        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <span data-ab-hero className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            New Delhi · Remote-friendly
          </span>
          <span data-ab-hero className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Available for select 2026 work
          </span>
        </div>

        <div className="relative max-w-4xl space-y-6 pt-10 md:pt-14">
          <div data-ab-hero className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              {ABOUT_HERO.eyebrow}
            </span>
            <span className="h-px w-12 bg-[var(--text-primary)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Ideation to Deployment
            </span>
          </div>
          <h1
            data-ab-hero
            className="font-display text-5xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-7xl lg:text-8xl"
          >
            {ABOUT_HERO.titleLead}
            <span className="text-[var(--text-muted)]">
              {ABOUT_HERO.titleMuted}
            </span>
            <span className="text-[var(--text-primary)]">.</span>
          </h1>
          <p
            data-ab-hero
            className="max-w-2xl font-serif text-lg italic text-[var(--text-muted)] md:text-2xl"
          >
            {ABOUT_HERO.lede}
          </p>
          <div data-ab-hero className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="rounded-full px-6">
              <a href="#journey">
                Read the journey
                <ArrowRightIcon className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6"
            >
              <Link href="/work">See the work</Link>
            </Button>
          </div>
        </div>
      </header>

      <section
        aria-label="Who I am"
        className="mx-auto mt-16 max-w-[min(100rem,94vw)] px-4 md:mt-24 md:px-6"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-5">
            <p
              data-ab-reveal
              className="max-w-xl text-base leading-relaxed text-pretty text-[var(--text-primary)] md:text-lg"
            >
              I&apos;m{" "}
              <span className="font-semibold">{ABOUT_INTRO.name}</span>.{" "}
              {ABOUT_INTRO.p1}
            </p>
            <p
              data-ab-reveal
              className="max-w-xl text-sm leading-relaxed text-pretty text-[var(--text-muted)] md:text-base"
            >
              {ABOUT_INTRO.p2}
            </p>
            <div data-ab-reveal className="flex flex-wrap gap-2">
              {ABOUT_INTRO.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full border-[var(--border)] bg-transparent px-3 py-1 font-mono text-xs font-normal text-[var(--text-primary)]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div
            data-ab-reveal
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-6 -z-0 select-none font-display text-[9rem] leading-none font-bold tracking-tighter md:text-[12rem]"
              style={{
                color: hexToRgba("#7BA0BC", 0.14),
                WebkitTextStroke: `1px ${hexToRgba("#7BA0BC", 0.35)}`,
              }}
            >
              SP
            </div>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-[var(--text-primary)] font-display text-2xl font-bold tracking-tight text-[var(--bg-page)]">
                  SP
                </span>
                <div>
                  <p className="font-display text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {ABOUT_INTRO.name}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {ABOUT_INTRO.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <MapPinIcon className="size-4" aria-hidden />
                {ABOUT_INTRO.location}
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] px-3 py-2">
                <span className="size-2 shrink-0 rounded-full bg-[#8FB694]" />
                <span className="text-xs text-[var(--text-muted)]">
                  {ABOUT_INTRO.status}
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
      </section>

      <section
        id="journey"
        data-ab-journey
        aria-label="Career journey"
        className="mx-auto mt-20 max-w-[min(100rem,94vw)] scroll-mt-24 px-4 md:mt-28 md:px-6"
      >
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
            The journey
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
            From research bench to production lead
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">
            Three chapters — Ashoka research, LetsAI shipping, Xicom ownership —
            told with the same timeline language as the homepage About.
          </p>
        </div>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute top-4 bottom-4 left-[10px] w-0.5 rounded-full bg-[var(--border)] md:left-[14px]">
            <div
              data-ab-timeline-fill
              className="h-full w-full origin-top rounded-full bg-[var(--text-primary)]"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol className="space-y-10 md:space-y-14">
            {ABOUT_ERAS.map((era, i) => {
              const Icon = ERA_ICONS[i] ?? RocketIcon;
              return (
                <li
                  key={era.year}
                  data-ab-era
                  className="relative grid gap-4 pl-10 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10 md:pl-14"
                >
                  <div className="absolute top-1 left-0 flex size-5 items-center justify-center md:size-7">
                    <span
                      className="size-2.5 rounded-full ring-4 ring-[var(--bg-page)] md:size-3"
                      style={{ backgroundColor: era.accent }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-display text-3xl font-semibold tracking-tighter md:text-4xl"
                      style={{ color: era.accent }}
                    >
                      {era.year.split(" · ")[0]}
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-2 rounded-none font-mono text-[10px] uppercase tracking-[0.14em]"
                      style={{
                        color: era.accent,
                        borderColor: hexToRgba(era.accent, 0.45),
                      }}
                    >
                      {era.tag}
                    </Badge>
                  </div>
                  <div
                    className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]/60 p-5 md:p-7"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${hexToRgba(era.accent, 0.08)} 0%, transparent 50%)`,
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Icon
                            className="size-4"
                            style={{ color: era.accent }}
                            aria-hidden
                          />
                          <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--text-primary)] md:text-2xl">
                            {era.role}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {era.org}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="font-display text-2xl font-semibold tracking-tighter"
                          style={{ color: era.accent }}
                        >
                          {era.impact.value}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {era.impact.label}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                      {era.story}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {era.stack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        aria-label="How I work"
        className="mx-auto mt-20 max-w-[min(100rem,94vw)] px-4 md:mt-28 md:px-6"
      >
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
            How I work
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
            Six jobs under one title
          </h2>
        </div>
        <div className="mt-10 grid gap-px bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_FACETS.map((facet, i) => {
            const Icon = FACET_ICONS[i] ?? SparklesIcon;
            return (
              <article
                key={facet.title}
                data-ab-facet
                className="bg-[var(--bg-page)] p-6 md:p-8"
              >
                <Icon
                  className="size-5"
                  style={{ color: facet.accent }}
                  aria-hidden
                />
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                  {facet.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {facet.detail}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        data-ab-metrics
        aria-label="Proof in numbers"
        className="mx-auto mt-20 max-w-[min(100rem,94vw)] px-4 md:mt-28 md:px-6"
      >
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
            Signal · not vanity
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
            What the work left behind
          </h2>
        </div>
        <Separator className="my-6 bg-[var(--border)]" />
        <div className="grid gap-px bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_METRICS.map((m) => (
            <div
              key={m.label}
              data-ab-metric
              className="bg-[var(--bg-page)] p-6 md:p-8"
            >
              <p
                data-ab-metric-value
                className="font-display text-4xl font-semibold tracking-tighter md:text-5xl"
                style={{ color: m.accent }}
              >
                {formatMetric(0, m.prefix, m.suffix)}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Systems shipped"
        className="mx-auto mt-20 max-w-[min(100rem,94vw)] px-4 md:mt-28 md:px-6"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
              Portfolio at a glance
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
              Four production systems
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden rounded-full sm:inline-flex"
          >
            <Link href="/work">
              Full case studies
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <ul className="mt-8 space-y-0">
          {ABOUT_SYSTEMS.map((sys) => (
            <li key={sys.name} data-ab-system>
              <Link
                href="/work"
                className="group flex items-baseline justify-between gap-4 border-b border-[var(--border)] py-5 transition-colors"
              >
                <span className="flex min-w-0 items-baseline gap-4 md:gap-8">
                  <span
                    className="font-display text-xl font-semibold tracking-tight md:text-2xl"
                    style={{ color: sys.accent }}
                  >
                    {sys.name}
                  </span>
                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {sys.domain}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                  {sys.result}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-label="Engineering philosophy"
        className="mx-auto mt-20 max-w-[min(100rem,94vw)] px-4 md:mt-28 md:px-6"
      >
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
            Philosophy
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
            Convictions that shape every system
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--text-muted)]">
            A client is not buying code — they are buying judgement about how to
            build AI that is correct, defensible, and affordable to run.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ABOUT_PHILOSOPHY.map((item, i) => (
            <article
              key={item.title}
              data-ab-phil
              className="border-t border-[var(--border)] pt-5"
            >
              <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[min(52rem,94vw)] overflow-hidden px-4 text-center md:mt-28 md:px-6">
        <QuoteIcon
          className="mx-auto size-6 text-[var(--text-muted)] opacity-40"
          aria-hidden
        />
        <div className="mt-4 overflow-hidden">
          <blockquote data-ab-quote-inner className="will-change-transform">
            <p className="font-serif text-2xl leading-relaxed text-[var(--text-muted)] md:text-4xl">
              &ldquo;{ABOUT_QUOTE}&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      <section
        data-ab-cta
        className="mx-auto mt-16 max-w-[min(100rem,94vw)] px-4 md:mt-24 md:px-6"
      >
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]/50 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Next conversation
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)]">
              Have a hard AI problem?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-[var(--text-muted)]">
              Tell me where the system breaks. I&apos;ll tell you what to ship
              first.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <a href={MAILTO}>
                Email {SITE_META.email}
                <ArrowRightIcon className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6"
            >
              <Link href="/services">Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
