"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StackItem = {
  name: string;
  icon: string;
};

/**
 * Caller: `src/app/page.tsx` → `<TechMarquee />` (Trusted stack section).
 * Existing purpose: this file already owns the marquee; expanding STACK only.
 * Data: static in-module list — `{ name: string, icon: string }` paths under
 * `/public/assets/icons/stack/*.svg` (no DB / date fields).
 * User: gather resume + portfolio skills, add bluffed extras (Azure, Docker,
 * Redis, etc.), download SVG/PNG assets, ship 30–50+ skills in Trusted stack.
 */
const STACK: StackItem[] = [
  { name: "Python", icon: "/assets/icons/stack/python.svg" },
  { name: "TypeScript", icon: "/assets/icons/stack/typescript.svg" },
  { name: "JavaScript", icon: "/assets/icons/stack/javascript.svg" },
  { name: "React", icon: "/assets/icons/stack/react.svg" },
  { name: "Next.js", icon: "/assets/icons/stack/nextjs.svg" },
  { name: "Vite", icon: "/assets/icons/stack/vite.svg" },
  { name: "Tailwind", icon: "/assets/icons/stack/tailwind.svg" },
  { name: "Three.js", icon: "/assets/icons/stack/threedotjs.svg" },
  { name: "GSAP", icon: "/assets/icons/stack/gsap.svg" },
  { name: "FastAPI", icon: "/assets/icons/stack/fastapi.svg" },
  { name: "Flask", icon: "/assets/icons/stack/flask.svg" },
  { name: "Celery", icon: "/assets/icons/stack/celery.svg" },
  { name: "SQLAlchemy", icon: "/assets/icons/stack/sqlalchemy.svg" },
  { name: "Alembic", icon: "/assets/icons/stack/alembic.svg" },
  { name: "Redis", icon: "/assets/icons/stack/redis.svg" },
  { name: "PostgreSQL", icon: "/assets/icons/stack/postgresql.svg" },
  { name: "pgvector", icon: "/assets/icons/stack/pgvector.svg" },
  { name: "MongoDB", icon: "/assets/icons/stack/mongodb.svg" },
  { name: "Neo4j", icon: "/assets/icons/stack/neo4j.svg" },
  { name: "MySQL", icon: "/assets/icons/stack/mysql.svg" },
  { name: "TimescaleDB", icon: "/assets/icons/stack/timescaledb.svg" },
  { name: "Pinecone", icon: "/assets/icons/stack/pinecone.svg" },
  { name: "ChromaDB", icon: "/assets/icons/stack/chromadb.svg" },
  { name: "FAISS", icon: "/assets/icons/stack/faiss.svg" },
  { name: "AstraDB", icon: "/assets/icons/stack/astradb.svg" },
  { name: "Supabase", icon: "/assets/icons/stack/supabase.svg" },
  { name: "Firebase", icon: "/assets/icons/stack/firebase.svg" },
  { name: "AWS", icon: "/assets/icons/stack/aws.svg" },
  { name: "AWS S3", icon: "/assets/icons/stack/aws-s3.svg" },
  { name: "AWS RDS", icon: "/assets/icons/stack/aws-rds.svg" },
  { name: "Azure", icon: "/assets/icons/stack/azure.svg" },
  { name: "Azure AI Foundry", icon: "/assets/icons/stack/azure-ai-foundry.svg" },
  { name: "GCP", icon: "/assets/icons/stack/gcp.svg" },
  { name: "Docker", icon: "/assets/icons/stack/docker.svg" },
  { name: "Kubernetes", icon: "/assets/icons/stack/kubernetes.svg" },
  { name: "Git", icon: "/assets/icons/stack/git.svg" },
  { name: "GitHub", icon: "/assets/icons/stack/github.svg" },
  { name: "GitHub Actions", icon: "/assets/icons/stack/github-actions.svg" },
  { name: "LangGraph", icon: "/assets/icons/stack/langgraph.svg" },
  { name: "LangChain", icon: "/assets/icons/stack/langchain.svg" },
  { name: "LlamaIndex", icon: "/assets/icons/stack/llamaindex.svg" },
  { name: "AutoGen", icon: "/assets/icons/stack/autogen.svg" },
  { name: "OpenAI", icon: "/assets/icons/stack/openai.svg" },
  { name: "Anthropic", icon: "/assets/icons/stack/anthropic.svg" },
  { name: "Claude", icon: "/assets/icons/stack/claude.svg" },
  { name: "Claude Code", icon: "/assets/icons/stack/claude-code.svg" },
  { name: "Gemini", icon: "/assets/icons/stack/gemini.svg" },
  { name: "Ollama", icon: "/assets/icons/stack/ollama.svg" },
  { name: "PyTorch", icon: "/assets/icons/stack/pytorch.svg" },
  { name: "Hugging Face", icon: "/assets/icons/stack/huggingface.svg" },
  { name: "Unsloth", icon: "/assets/icons/stack/unsloth.svg" },
  { name: "Jupyter", icon: "/assets/icons/stack/jupyter.svg" },
  { name: "Whisper", icon: "/assets/icons/stack/whisper.svg" },
  { name: "Docling", icon: "/assets/icons/stack/docling.svg" },
  { name: "PyMuPDF", icon: "/assets/icons/stack/pymupdf.svg" },
  { name: "RAG", icon: "/assets/icons/stack/rag.svg" },
  { name: "RAGAS", icon: "/assets/icons/stack/ragas.svg" },
  { name: "Langfuse", icon: "/assets/icons/stack/langfuse.svg" },
  { name: "Grafana", icon: "/assets/icons/stack/grafana.svg" },
  { name: "OpenTelemetry", icon: "/assets/icons/stack/opentelemetry.svg" },
  { name: "ElevenLabs", icon: "/assets/icons/stack/elevenlabs.svg" },
  { name: "Groq", icon: "/assets/icons/stack/groq.svg" },
  { name: "Socket.IO", icon: "/assets/icons/stack/socketio.svg" },
  { name: "uv", icon: "/assets/icons/stack/uv.svg" },
];

const mid = Math.ceil(STACK.length / 2);
const ROW_A = STACK.slice(0, mid);
const ROW_B = STACK.slice(mid);

function StackMark({ icon }: { icon: string }) {
  return (
    // Decorative — monochrome via filter so SVG currentColor stays theme-safe
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon}
      alt=""
      aria-hidden
      width={22}
      height={22}
      className="size-[22px] brightness-0 dark:invert"
    />
  );
}

function StackChip({ name, icon }: StackItem) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "group/chip hover-elevate h-12 shrink-0 gap-2.5 rounded-xl border-[var(--border)]",
        "bg-[var(--bg-surface)] px-3 py-1.5 font-mono text-sm font-medium shadow-sm shadow-black/[0.03]",
        "text-[var(--text-primary)] transition-[transform,border-color,box-shadow] duration-300",
        "hover:-translate-y-0.5 hover:border-[var(--text-muted)] hover:shadow-md hover:shadow-black/[0.06]",
        "dark:shadow-none dark:hover:shadow-none",
      )}
    >
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-[0.65rem]",
          "border border-[var(--border)] bg-[var(--bg-elevated)]",
          "transition-colors duration-300 group-hover/chip:border-[var(--text-muted)]",
        )}
      >
        <StackMark icon={icon} />
      </span>
      <span className="pr-1 tracking-tight">{name}</span>
    </Badge>
  );
}

function TickerRow({
  items,
  reverse = false,
  trackRef,
}: {
  items: StackItem[];
  reverse?: boolean;
  trackRef: RefObject<HTMLDivElement | null>;
}) {
  const sequence = [...items, ...items, ...items, ...items];

  return (
    <div data-ticker-row className="relative overflow-hidden py-0.5">
      {/* Theme-safe edge fades — caller page.tsx TechMarquee. User: light mode odd. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/85 to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-page)] via-[var(--bg-page)]/85 to-transparent sm:w-28"
      />
      <div
        ref={trackRef}
        data-ticker-track
        data-reverse={reverse ? "true" : "false"}
        className="flex w-max will-change-transform gap-3"
      >
        {sequence.map((item, index) => (
          <StackChip key={`${item.name}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
}

function createInfiniteTicker(
  track: HTMLElement,
  reverse: boolean,
  duration: number,
) {
  const distance = track.scrollWidth / 4;

  gsap.set(track, { x: reverse ? -distance : 0 });

  return gsap.to(track, {
    x: reverse ? 0 : -distance,
    duration,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((value) => {
        const x = parseFloat(value);
        return gsap.utils.wrap(-distance, 0, x);
      }),
    },
  });
}

export function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const rowA = rowARef.current;
      const rowB = rowBRef.current;
      if (!section || !rowA || !rowB) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          canMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions) return;
          const { reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.set([rowA, rowB], { clearProps: "transform" });
            gsap.set(
              gsap.utils.toArray("[data-stack-reveal]", section),
              { clearProps: "all" },
            );
            return;
          }

          gsap.fromTo(
            "[data-stack-reveal]",
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.08,
              clearProps: "transform",
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                once: true,
              },
            },
          );

          gsap.fromTo(
            "[data-ticker-row]",
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                once: true,
              },
            },
          );

          const tweenA = createInfiniteTicker(rowA, false, 55);
          const tweenB = createInfiniteTicker(rowB, true, 62);
          const tweens = [tweenA, tweenB];

          const pause = () => tweens.forEach((t) => t.pause());
          const resume = () => tweens.forEach((t) => t.resume());

          section.addEventListener("mouseenter", pause);
          section.addEventListener("mouseleave", resume);

          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate(self) {
              const velocity = Math.abs(self.getVelocity());
              const boost = gsap.utils.clamp(1, 3.2, 1 + velocity / 1400);
              tweens.forEach((tween) => {
                tween.timeScale(boost);
                gsap.to(tween, {
                  timeScale: 1,
                  duration: 0.85,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              });
            },
          });

          return () => {
            section.removeEventListener("mouseenter", pause);
            section.removeEventListener("mouseleave", resume);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trusted-stack-heading"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-page)] py-8 md:py-10"
    >
      {/* Clean page field — no muddy washes. Caller: page.tsx. User: light theme looks bad. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-[0.028] dark:opacity-[0.045] [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_calc(12.5%-1px),var(--text-primary)_calc(12.5%-1px),var(--text-primary)_12.5%)]" />
      </div>

      <div
        data-stack-reveal
        className="relative z-10 mx-auto mb-6 flex max-w-[min(100rem,94vw)] items-end justify-between gap-6 border-b border-[var(--border)] px-4 pb-5 md:mb-8 md:px-6"
      >
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:text-xs">
            Production tools
          </p>
          <h2
            id="trusted-stack-heading"
            className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-primary)] md:text-sm"
          >
            Trusted stack
          </h2>
        </div>
        <div className="flex max-w-sm flex-col items-end gap-2 text-right">
          <p className="hidden text-sm leading-snug text-[var(--text-muted)] text-pretty sm:block">
            Tools I ship with when the work has to hold up in production.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:text-xs">
            {STACK.length} tools
          </p>
        </div>
      </div>

      <div
        className="relative z-10 motion-safe:block motion-reduce:hidden"
        role="region"
        aria-label="Technology stack scrolling showcase"
      >
        <div className="flex flex-col gap-3.5">
          <TickerRow items={ROW_A} trackRef={rowARef} />
          <TickerRow items={ROW_B} reverse trackRef={rowBRef} />
        </div>
      </div>

      <ul
        className="relative z-10 mx-auto hidden max-w-[min(90rem,92vw)] flex-wrap items-center justify-center gap-3 px-4 motion-reduce:flex"
        aria-label="Technology stack"
      >
        {STACK.map((item) => (
          <li key={item.name}>
            <StackChip {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
