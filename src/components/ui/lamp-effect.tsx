"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function LampContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        "relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-page)] rounded-md z-0",
        className,
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position, from 70deg at center top), var(--border) 0deg, transparent 60deg, transparent 320deg, var(--border) 360deg)",
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]"
        />
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position, from 290deg at center top), var(--border) 0deg, transparent 60deg, transparent 320deg, var(--border) 360deg)",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] overflow-visible"
        />
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[var(--bg-page)] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[var(--bg-page)] opacity-50 blur-3xl" />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[var(--text-primary)] opacity-10 blur-2xl"
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "9rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[9rem] -translate-y-[7rem] bg-[var(--text-primary)]"
        />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[var(--bg-page)]" />
      </div>
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
