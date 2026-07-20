"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Compare({
  firstImage,
  secondImage,
  firstImageLabel,
  secondImageLabel,
  className,
}: {
  firstImage: string;
  secondImage: string;
  firstImageLabel?: string;
  secondImageLabel?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      className={cn(
        "relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-[var(--border)]",
        className,
      )}
    >
      <img src={firstImage} alt={firstImageLabel ?? "Before"} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={secondImage} alt={secondImageLabel ?? "After"} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div
        className="absolute inset-y-0 z-10 w-px bg-[var(--bg-surface)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-primary)]">
          &lt;&gt;
        </div>
      </div>
      {firstImageLabel && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
          {firstImageLabel}
        </span>
      )}
      {secondImageLabel && (
        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
          {secondImageLabel}
        </span>
      )}
    </div>
  );
}
