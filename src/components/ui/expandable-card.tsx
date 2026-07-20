"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export function ExpandableCard({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className={cn("flex max-w-5xl flex-col gap-3 md:flex-row md:gap-3")}>
      {services.map((service, index) => (
        <motion.button
          key={service.title}
          onClick={() => setActive(active === index ? null : index)}
          className={cn(
            "relative flex min-h-[400px] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 text-left transition-all duration-300 ease-in-out",
            active === index ? "md:w-[60%]" : "md:w-[13.33%]",
          )}
        >
          <div className={cn("flex flex-col", active === index ? "items-start" : "md:items-center md:justify-end md:[writing-mode:vertical-rl] md:rotate-180")}>
            <div className="flex items-center gap-3">
              {service.icon}
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                {service.title}
              </h3>
            </div>
          </div>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              active === index ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {service.description}
            </p>
          </div>
          <div className="absolute right-4 top-4 text-[var(--text-muted)]">
            {active === index ? <Minus className="size-4" /> : <Plus className="size-4" />}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
