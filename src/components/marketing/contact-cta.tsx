"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  ArrowUpRightIcon,
  MailIcon,
  LinkedinIcon,
  GithubIcon,
  MapPinIcon,
  ClockIcon,
} from "lucide-react";
import { SITE_META } from "@/domain/site-meta";
import { MagneticButton } from "@/components/ui/magnetic-button";

const MAILTO = `mailto:${SITE_META.email}?subject=${encodeURIComponent(
  "Let's work together",
)}`;

const CHANNELS = [
  {
    icon: MailIcon,
    label: "Email",
    value: SITE_META.email,
    href: `mailto:${SITE_META.email}`,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "in/surya-p",
    href: "https://linkedin.com/in/surya-p-871b95187",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "SP85691",
    href: "https://github.com/SP85691",
  },
];

const META = [
  { icon: ClockIcon, label: "Replies within 24 hours" },
  { icon: MapPinIcon, label: "New Delhi · Remote-friendly" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ContactCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg-page)] py-[var(--space-section)]"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[46rem] max-w-[110vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[var(--text-primary)] opacity-[0.06] blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mx-auto max-w-[min(72rem,92vw)] px-4"
      >
        <div className="mx-auto max-w-3xl text-center">
          {/* Availability */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-1.5"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Available for select 2026 engagements
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={item}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tighter text-[var(--text-primary)] text-balance md:text-6xl"
          >
            Have a problem worth solving?
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-[var(--text-muted)] md:text-lg"
          >
            I am open to engineering leadership, platform architecture, and
            ambitious AI product work. The kind where owning the outcome matters
            more than owning the title. Tell me what you are building and where
            it hurts.
          </motion.p>

          {/* Primary actions */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticButton strength={0.35} maxDistance={60}>
              <a
                href={MAILTO}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-7 py-3.5 text-sm font-medium text-[var(--bg-page)] shadow-lg shadow-black/10 transition hover:opacity-90"
              >
                Get in touch
                <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.25} maxDistance={40}>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-7 py-3.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--text-muted)]"
              >
                View work
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Meta */}
          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {META.map((m) => {
              const Icon = m.icon;
              return (
                <span
                  key={m.label}
                  className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]"
                >
                  <Icon className="size-3.5" />
                  {m.label}
                </span>
              );
            })}
          </motion.div>
        </div>

        {/* Direct channels */}
        <motion.div
          variants={item}
          className="mx-auto mt-12 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3"
        >
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            const external = c.href.startsWith("http");
            return (
              <a
                key={c.label}
                href={c.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 bg-[var(--bg-surface)] p-5 transition-colors duration-300 hover:bg-[var(--bg-page)]"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors duration-300 group-hover:border-[var(--text-primary)] group-hover:text-[var(--text-primary)]">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {c.label}
                  </span>
                  <span className="block truncate text-sm text-[var(--text-primary)]">
                    {c.value}
                  </span>
                </span>
              </a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
