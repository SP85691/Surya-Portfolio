"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function Lens({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
}: {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
}) {
  const [hovering, setHovering] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-lg z-20"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, black 100%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px, black 100%, transparent 100%)`,
              transformOrigin: `${pos.x}px ${pos.y}px`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${pos.x}px ${pos.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn(
          "pointer-events-none absolute z-30 rounded-full border border-[var(--border)] transition-opacity",
          hovering ? "opacity-100" : "opacity-0",
        )}
        style={{
          width: lensSize,
          height: lensSize,
          left: pos.x - lensSize / 2,
          top: pos.y - lensSize / 2,
        }}
      />
    </div>
  );
}
