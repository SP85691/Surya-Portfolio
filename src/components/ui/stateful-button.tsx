"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function StatefulButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => Promise<void> | void;
  className?: string;
}) {
  const [state, setState] = useState<"default" | "loading" | "success">("default");

  const handleClick = async () => {
    if (state !== "default") return;
    setState("loading");
    try {
      await onClick?.();
      setState("success");
      setTimeout(() => setState("default"), 2000);
    } catch {
      setState("default");
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      disabled={state !== "default"}
      className={cn(
        "relative inline-flex min-w-40 items-center justify-center gap-2 rounded-full bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--bg-page)] transition disabled:opacity-80",
        className,
      )}
    >
      {state === "loading" && <Loader2 className="size-4 animate-spin" />}
      {state === "default" && children}
      {state === "success" && "Sent ✓"}
    </motion.button>
  );
}
