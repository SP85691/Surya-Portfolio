"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp-effect";
import { FlipWords } from "@/components/ui/flip-words";

export function LampSection() {
  return (
    <LampContainer className="border-y border-[var(--border)]">
      <motion.h2
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="mt-8 bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-muted)] py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Engineering that <FlipWords words={["ships", "scales", "endures"]} className="font-display" />
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 max-w-xl text-center text-[var(--text-muted)]"
      >
        Multi-agent platforms, clinical inference, and production-grade software —
        built with precision, shipped with care.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-6"
      >
        <Link
          href="/contact"
          className="rounded-full bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--bg-page)] transition hover:opacity-80"
        >
          Start a conversation
        </Link>
      </motion.div>
    </LampContainer>
  );
}
