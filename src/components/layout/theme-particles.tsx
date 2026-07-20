"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Particles } from "@/components/ui/particles";

export function ThemeParticles({
  className,
  quantity = 60,
  ease = 80,
  size = 0.4,
  staticity = 40,
}: {
  className?: string;
  quantity?: number;
  ease?: number;
  size?: number;
  staticity?: number;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const color =
    !mounted || resolvedTheme === "dark" ? "#ffffff" : "#000000";

  return (
    <Particles
      key={color}
      className={className}
      quantity={quantity}
      ease={ease}
      size={size}
      color={color}
      staticity={staticity}
    />
  );
}
