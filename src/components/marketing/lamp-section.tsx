"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  ArrowRightIcon,
  BrainCircuitIcon,
  UsersIcon,
  RocketIcon,
} from "lucide-react";
import { LampContainer } from "@/components/ui/lamp-effect";
import { FlipWords } from "@/components/ui/flip-words";
import { SITE_META } from "@/domain/site-meta";

const OFFERS = [
  { icon: BrainCircuitIcon, label: "AI systems, end to end" },
  { icon: UsersIcon, label: "Delivery leadership" },
  { icon: RocketIcon, label: "Production from day one" },
];

const MAILTO = `mailto:${SITE_META.email}?subject=${encodeURIComponent(
  "Let's build something",
)}`;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function LampSection() {
  return (
    <LampContainer className="border-y border-[var(--border)]">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="flex w-full flex-col items-center"
      >
        {/* Availability pill */}
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)]/60 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Available for select 2026 projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={item}
          className="bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text py-2 text-center text-4xl font-semibold tracking-tighter text-transparent md:text-7xl"
        >
          Engineering that{" "}
          <FlipWords
            words={["ships", "scales", "endures"]}
            className="font-display text-[var(--text-primary)]"
          />
        </motion.h2>

        {/* Subcopy */}
        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-center text-base leading-relaxed text-pretty text-[var(--text-muted)] md:text-lg"
        >
          I take ambiguous problems from the first conversation to production —
          agentic AI platforms, hybrid retrieval, and the teams that ship them.
          If you need an engineer who owns the outcome, not just the code, let&apos;s
          talk.
        </motion.p>

        {/* Offer chips */}
        <motion.div
          variants={item}
          className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
        >
          {OFFERS.map((offer) => {
            const Icon = offer.icon;
            return (
              <span
                key={offer.label}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)]/50 px-3.5 py-1.5 font-mono text-xs text-[var(--text-primary)] backdrop-blur-sm"
              >
                <Icon className="size-3.5 text-[var(--text-muted)]" />
                {offer.label}
              </span>
            );
          })}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href={MAILTO}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--bg-page)] shadow-lg shadow-black/20 transition hover:opacity-90"
          >
            Start a conversation
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--text-muted)] hover:bg-[var(--bg-surface)]/60"
          >
            View work
          </Link>
        </motion.div>
      </motion.div>
    </LampContainer>
  );
}
