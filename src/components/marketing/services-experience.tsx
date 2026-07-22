"use client";

/**
 * FACTS (GateGuard):
 * 1. Caller: src/app/services/page.tsx — <ServicesExperience />
 * 2. New marketing page shell for /services (replaces expandable/wobble layout)
 * 3. Reads static SERVICE_OFFERINGS / ENGAGEMENT_MODELS from domain/services.ts
 * 4. User: hero like home → list → deep detail; GSAP + shadcn + design skills
 */

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_META } from "@/domain/site-meta";
import {
  ENGAGEMENT_MODELS,
  SERVICE_OFFERINGS,
  type ServiceOffering,
} from "@/domain/services";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MAILTO = `mailto:${SITE_META.email}?subject=${encodeURIComponent(
  "Services inquiry",
)}`;

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ServiceDeepDive({
  service,
  active,
}: {
  service: ServiceOffering;
  active: boolean;
}) {
  return (
    <article
      id={service.slug}
      data-service-block
      data-service-index={service.index}
      className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24"
      style={{
        backgroundImage: `linear-gradient(135deg, ${hexToRgba(service.accent, active ? 0.1 : 0.04)} 0%, transparent 45%)`,
      }}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs tracking-[0.22em] text-[var(--text-muted)]">
              {service.index}
            </span>
            <Badge
              variant="outline"
              className="rounded-none font-mono text-[10px] uppercase tracking-[0.16em]"
              style={{ color: service.accent, borderColor: hexToRgba(service.accent, 0.45) }}
            >
              {service.horizon === "2026" ? "Now · 2026" : "Needed · 2027"}
            </Badge>
          </div>
          <h3 className="font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
            {service.title}
          </h3>
          <p className="font-serif text-lg italic text-[var(--text-muted)] md:text-xl">
            {service.tagline}
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Proof ·{" "}
            </span>
            {service.proof}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {service.stack.map((tech) => (
              <span
                key={tech}
                className="border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div data-service-panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              The gap
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              {service.problem}
            </p>
          </div>
          <div data-service-panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              How I close it
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]/90 md:text-base">
              {service.approach}
            </p>
          </div>
          <div data-service-panel>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              What you walk away with
            </p>
            <ul className="mt-3 space-y-2">
              {service.outcomes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--text-muted)]"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: service.accent }}
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ServicesExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICE_OFFERINGS[activeIndex] ?? SERVICE_OFFERINGS[0]!;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          canPlay: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};
          const heroBits = root.querySelectorAll<HTMLElement>("[data-svc-hero]");
          const indexRows = gsap.utils.toArray<HTMLElement>(
            "[data-svc-index]",
            root,
          );
          const blocks = gsap.utils.toArray<HTMLElement>(
            "[data-service-block]",
            root,
          );
          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-service-panel]",
            root,
          );
          const engage = gsap.utils.toArray<HTMLElement>(
            "[data-engage-card]",
            root,
          );

          if (reduceMotion) {
            gsap.set([...heroBits, ...indexRows, ...blocks, ...panels, ...engage], {
              autoAlpha: 1,
              y: 0,
              x: 0,
            });
            return;
          }

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.from(heroBits, {
            autoAlpha: 0,
            y: 28,
            duration: 0.75,
            stagger: 0.08,
          }).from(
            indexRows,
            {
              autoAlpha: 0,
              x: -16,
              duration: 0.55,
              stagger: 0.05,
            },
            "-=0.35",
          );

          panels.forEach((panel) => {
            gsap.from(panel, {
              autoAlpha: 0,
              y: 24,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            });
          });

          engage.forEach((card, i) => {
            gsap.from(card, {
              autoAlpha: 0,
              y: 32,
              duration: 0.7,
              delay: i * 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          });

          blocks.forEach((block, index) => {
            ScrollTrigger.create({
              trigger: block,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveIndex(index),
              onEnterBack: () => setActiveIndex(index),
            });
          });
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
      {/* Hero */}
      <header className="relative mx-auto max-w-[min(90rem,92vw)] overflow-hidden px-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--text-primary)_1px,transparent_1px)] [background-size:64px_64px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, #C6A579 35%, transparent), transparent 70%)",
          }}
        />

        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <span data-svc-hero className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            New Delhi · Remote-friendly
          </span>
          <span data-svc-hero className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Available for select 2026 work
          </span>
        </div>

        <div className="relative max-w-4xl space-y-6 pt-10 md:pt-14">
          <p
            data-svc-hero
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
          >
            Services
          </p>
          <h1
            data-svc-hero
            className="font-display text-5xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-7xl lg:text-8xl"
          >
            What I build
            <span className="text-[var(--text-muted)]"> for teams</span>
            <span className="text-[var(--text-primary)]">.</span>
          </h1>
          <p
            data-svc-hero
            className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg"
          >
            From ambiguous AI bets to production systems — multi-agent platforms,
            hybrid retrieval, governed tools, evals, and cost-aware serving.
            2026 is the chase. I close the catch.
          </p>
          <div data-svc-hero className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="rounded-full px-6">
              <a href={MAILTO}>
                Start a conversation
                <ArrowRightIcon className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="/work">See the work</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Index list */}
      <section
        aria-label="Service index"
        className="mx-auto mt-16 max-w-[min(90rem,92vw)] px-4 md:mt-24"
      >
        <div className="flex items-end justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Index · {String(SERVICE_OFFERINGS.length).padStart(2, "0")} offerings
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] sm:block">
            Reading · {active.index} {active.title}
          </p>
        </div>
        <Separator className="my-5 bg-[var(--border)]" />
        <ol className="space-y-0">
          {SERVICE_OFFERINGS.map((service, i) => (
            <li key={service.slug} data-svc-index>
              <a
                href={`#${service.slug}`}
                className={cn(
                  "group flex items-baseline justify-between gap-4 border-b border-[var(--border)] py-4 transition-colors",
                  i === activeIndex
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                )}
              >
                <span className="flex min-w-0 items-baseline gap-4 md:gap-8">
                  <span className="font-mono text-xs tracking-[0.18em]">
                    {service.index}
                  </span>
                  <span className="truncate font-display text-xl font-semibold tracking-tight md:text-2xl">
                    {service.title}
                  </span>
                </span>
                <span
                  className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] opacity-70"
                  style={{
                    color: i === activeIndex ? service.accent : undefined,
                  }}
                >
                  {service.horizon}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* Deep dives + sticky rail */}
      <div className="mx-auto mt-6 max-w-[min(90rem,92vw)] px-4 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
        <aside className="sticky top-24 hidden self-start lg:block">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            On this page
          </p>
          <nav className="space-y-2" aria-label="Service anchors">
            {SERVICE_OFFERINGS.map((service, i) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className={cn(
                  "block font-mono text-[11px] tracking-[0.08em] transition-colors",
                  i === activeIndex
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                )}
              >
                <span className="mr-2 opacity-50">{service.index}</span>
                {service.title.split(" ").slice(0, 3).join(" ")}
              </a>
            ))}
          </nav>
        </aside>

        <div>
          {SERVICE_OFFERINGS.map((service, i) => (
            <ServiceDeepDive
              key={service.slug}
              service={service}
              active={i === activeIndex}
            />
          ))}
        </div>
      </div>

      {/* Engagements */}
      <section className="mx-auto mt-8 max-w-[min(90rem,92vw)] px-4 md:mt-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Engagement models
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
          How we work together
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
          Advisory when you need the map. Embedded when you need the build.
          Fractional when you need the lead.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((tier) => (
            <div
              key={tier.name}
              data-engage-card
              className={cn(
                "relative flex flex-col border border-[var(--border)] bg-[var(--bg-surface)] p-7",
                tier.featured && "border-[var(--text-primary)]",
              )}
            >
              {tier.featured ? (
                <span className="absolute -top-3 left-6 rounded-none bg-[var(--text-primary)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--bg-page)]">
                  Most popular
                </span>
              ) : null}
              <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                {tier.name}
              </h3>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)]">
                {tier.price}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {tier.cadence}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-sm leading-relaxed text-[var(--text-muted)]"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--text-primary)]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={tier.featured ? "default" : "outline"}
                className="mt-8 w-full rounded-none"
              >
                <Link href="/contact">{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <footer className="mx-auto mt-20 max-w-[min(90rem,92vw)] px-4 md:mt-28">
        <div
          className="border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-12 md:px-12 md:py-16"
          style={{
            backgroundImage: `linear-gradient(135deg, ${hexToRgba("#C6A579", 0.12)} 0%, transparent 55%)`,
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Next chapter
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-5xl">
            Tell me the constraint.
          </h2>
          <p className="mt-4 max-w-xl font-serif text-base italic text-[var(--text-muted)] md:text-lg">
            I&apos;ll tell you the engagement — and whether we should start with
            architecture, a vertical slice, or a full platform build.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-none">
              <a href={MAILTO}>
                Email {SITE_META.email}
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-none">
              <Link href="/work">Browse volumes of work</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
