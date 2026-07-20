"use client";

import React, { forwardRef, useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

const Node = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-center font-mono text-[10px] leading-tight text-[var(--text-primary)] shadow-lg md:size-20 md:text-xs",
        className,
      )}
    >
      {children}
    </div>
  );
});
Node.displayName = "Node";

export function AgentTopology({
  title = "Agent topology",
  subtitle = "Specialized agents coordinated through a central orchestrator with human confirmation gates.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orchestratorRef = useRef<HTMLDivElement>(null);
  const extractRef = useRef<HTMLDivElement>(null);
  const differentialRef = useRef<HTMLDivElement>(null);
  const guidelineRef = useRef<HTMLDivElement>(null);
  const auditRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);

  return (
    <section className="my-16">
      <h2 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-[var(--text-muted)]">{subtitle}</p>

      <div
        ref={containerRef}
        className="relative mt-10 flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 md:h-[480px]"
      >
        <div className="relative flex h-full w-full max-w-3xl items-center justify-between px-4">
          <div className="flex flex-col justify-center gap-10">
            <Node ref={extractRef}>Extract</Node>
            <Node ref={differentialRef}>Diff</Node>
            <Node ref={guidelineRef}>Guide</Node>
          </div>

          <Node
            ref={orchestratorRef}
            className="border-[var(--text-primary)] font-semibold text-[var(--text-primary)]"
          >
            Orchestrator
          </Node>

          <div className="flex flex-col justify-center gap-16">
            <Node ref={auditRef}>Audit</Node>
            <Node ref={humanRef} className="font-semibold text-[var(--text-primary)]">
              Human
            </Node>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={extractRef}
          toRef={orchestratorRef}
          curvature={-40}
          gradientStartColor="#000000"
          gradientStopColor="#525252"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={differentialRef}
          toRef={orchestratorRef}
          gradientStartColor="#000000"
          gradientStopColor="#525252"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={guidelineRef}
          toRef={orchestratorRef}
          curvature={40}
          gradientStartColor="#000000"
          gradientStopColor="#525252"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={orchestratorRef}
          toRef={auditRef}
          curvature={-30}
          gradientStartColor="#000000"
          gradientStopColor="#737373"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={orchestratorRef}
          toRef={humanRef}
          curvature={30}
          gradientStartColor="#000000"
          gradientStopColor="#737373"
          reverse
        />
      </div>
    </section>
  );
}
