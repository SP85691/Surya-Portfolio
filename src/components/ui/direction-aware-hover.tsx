"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type DirectionItem = {
  title: string;
  description: string;
  image?: string;
};

const directionMap = {
  top: "inset(0 100% 0 0)",
  bottom: "inset(100% 0 0 0)",
  left: "inset(0 0 100% 0)",
  right: "inset(0 0 0 100%)",
};

export function DirectionAwareHover({ items, className }: { items: DirectionItem[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, i) => (
        <DirectionCard key={item.title + i} item={item} />
      ))}
    </div>
  );
}

function DirectionCard({ item }: { item: DirectionItem }) {
  const [dir, setDir] = useState<keyof typeof directionMap | null>(null);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onEnter = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle >= -45 && angle < 45) setDir("right");
    else if (angle >= 45 && angle < 135) setDir("bottom");
    else if (angle >= -135 && angle < -45) setDir("top");
    else setDir("left");
    setHover(true);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={() => setHover(false)}
      className="group relative h-80 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]"
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition group-hover:opacity-40"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
        <motion.div
          className="absolute inset-0 bg-[var(--bg-surface)]"
          initial={false}
          animate={{ clipPath: hover && dir ? directionMap[dir] : "inset(0 0 0 0)" }}
          transition={{ duration: 0.3 }}
          style={{ clipPath: "inset(0 0 0 0)" }}
        />
        <div className="relative z-10">
          <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
            {item.title}
          </h3>
          <motion.p
            className="mt-2 max-w-xs text-sm text-[var(--text-muted)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 8 }}
            transition={{ delay: 0.1 }}
          >
            {item.description}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
