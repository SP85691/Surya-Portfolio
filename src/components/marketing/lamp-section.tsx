"use client";

/**
 * FACTS (GateGuard):
 * 1. Caller: src/app/page.tsx lines 7 + 25 — `<LampSection />`
 * 2. Existing marketing file — enhance, not net-new
 * 3. No data-file I/O
 * 4. User: "Let's improve this section, we need this with the Bulb + Ambient lighting..."
 */

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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
        <motion.div variants={item} className="mb-6">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-[var(--border)] bg-[var(--bg-surface)]/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)] backdrop-blur-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Available for select 2026 projects
          </Badge>
        </motion.div>

        <motion.h2
          variants={item}
          className="bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text py-2 text-center font-display text-4xl font-semibold tracking-tighter text-transparent md:text-7xl"
        >
          Engineering that{" "}
          <FlipWords
            words={["ships", "scales", "endures"]}
            className="font-display text-[var(--text-primary)]"
          />
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-center text-base leading-relaxed text-pretty text-[var(--text-muted)] md:text-lg"
        >
          I take ambiguous problems from the first conversation to production —
          agentic AI platforms, hybrid retrieval, and the teams that ship them.
          If you need an engineer who owns the outcome, not just the code,
          let&apos;s talk.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
        >
          {OFFERS.map((offer) => {
            const Icon = offer.icon;
            return (
              <Badge
                key={offer.label}
                variant="outline"
                className="gap-2 rounded-full border-[var(--border)] bg-[var(--bg-surface)]/50 px-3.5 py-1.5 font-mono text-xs font-normal text-[var(--text-primary)] backdrop-blur-sm"
              >
                <Icon className="size-3.5 text-[var(--text-muted)]" />
                {offer.label}
              </Badge>
            );
          })}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full px-6 shadow-lg shadow-black/20"
          >
            <a href={MAILTO}>
              Start a conversation
              <ArrowRightIcon className="size-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-6"
          >
            <Link href="/work">View work</Link>
          </Button>
        </motion.div>
      </motion.div>
    </LampContainer>
  );
}
