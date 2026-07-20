"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";
import { ThemeParticles } from "@/components/layout/theme-particles";

const STATS = [
  { value: 85, suffix: "%", label: "Latency reduction" },
  { value: 12, suffix: "", label: "Agents orchestrated" },
  { value: 3, suffix: "", label: "Products shipped" },
  { value: 10, suffix: "K+", label: "Active users" },
];

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--bg-surface)] py-16">
      <ThemeParticles
        className="absolute inset-0 opacity-30"
        quantity={40}
        ease={70}
        size={0.35}
        staticity={50}
      />
      <div className="relative mx-auto grid max-w-[min(90rem,92vw)] grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <BlurFade key={stat.label} delay={0.1 + i * 0.1} inView>
            <div className="text-center">
              <div className="font-display text-4xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-5xl">
                <NumberTicker value={stat.value} delay={i * 0.1} />
                {stat.suffix && (
                  <span className="text-[var(--text-primary)]">{stat.suffix}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {stat.label}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
