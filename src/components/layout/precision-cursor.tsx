"use client";

import { useEffect, useState } from "react";

export function PrecisionCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setEnabled(finePointer && !reducedMotion);

    if (!finePointer || reducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!enabled || !visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative size-8">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--accent)]/40" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--accent)]/40" />
        <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
      </div>
    </div>
  );
}
