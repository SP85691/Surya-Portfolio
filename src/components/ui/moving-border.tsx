"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function MovingBorderButton({
  children,
  onClick,
  className,
  duration = 3000,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  duration?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--bg-surface)] px-6 py-3 text-sm font-medium text-[var(--text-primary)]",
        className,
      )}
    >
      <span className="absolute inset-0 z-0">
        <motion.span
          className="absolute inset-[-100%] block"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--text-primary) 90deg, transparent 180deg, transparent 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: duration / 1000, repeat: Infinity, ease: "linear" }}
        />
      </span>
      <span className="relative z-10 inline-flex items-center rounded-full bg-[var(--bg-surface)] px-6 py-3">
        {children}
      </span>
    </button>
  );
}
