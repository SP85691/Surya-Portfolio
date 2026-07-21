"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const BEAM = "var(--lamp-beam)";

export function LampContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        "relative isolate z-0 flex min-h-[68svh] w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-page)] px-5 py-28 md:py-36",
        className,
      )}
    >
      {/* Decorative lamp — anchored to the top, fully contained, resolution-safe.
          It lives behind the content in normal flow, so it can never overlap the
          section above it at any viewport size. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[24rem] overflow-hidden"
      >
        {/* Conic beams fanning down from the center-top */}
        <motion.div
          initial={{ opacity: 0.35, width: "16rem" }}
          whileInView={{ opacity: 1, width: "34rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${BEAM} 0deg, transparent 62deg, transparent 320deg, ${BEAM} 360deg)`,
          }}
          className="absolute right-1/2 top-0 h-64 w-[34rem] max-w-[92vw]"
        />
        <motion.div
          initial={{ opacity: 0.35, width: "16rem" }}
          whileInView={{ opacity: 1, width: "34rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, ${BEAM} 0deg, transparent 40deg, transparent 298deg, ${BEAM} 360deg)`,
          }}
          className="absolute left-1/2 top-0 h-64 w-[34rem] max-w-[92vw]"
        />
        {/* Haze that dissolves the beams into the page background */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-transparent via-[var(--bg-page)]/30 to-[var(--bg-page)]" />
        {/* Central glow that bridges the bright line down toward the copy.
            Brighter in light theme so it lifts the page behind dark text;
            a softer halo in dark theme. */}
        <motion.div
          initial={{ opacity: 0, width: "10rem" }}
          whileInView={{ opacity: 1, width: "24rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
          style={{ backgroundColor: "var(--lamp-glow)" }}
          className="absolute left-1/2 top-12 h-72 w-[24rem] max-w-[86vw] -translate-x-1/2 rounded-[100%] opacity-70 blur-3xl dark:opacity-[0.16]"
        />
        {/* The bright lamp line */}
        <motion.div
          initial={{ opacity: 0, width: "10rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          style={{
            backgroundImage:
              "linear-gradient(to right, transparent, var(--lamp-line), transparent)",
          }}
          className="absolute left-1/2 top-16 h-0.5 w-[30rem] max-w-[86vw] -translate-x-1/2 rounded-full"
        />
      </div>

      {/* Content — normal centered flow, nudged up under the lamp line */}
      <div className="relative z-50 -mt-4 flex w-full max-w-3xl flex-col items-center md:-mt-8">
        {children}
      </div>
    </div>
  );
}
