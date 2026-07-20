import Link from "next/link";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { WobbleCard } from "@/components/ui/wobble-card";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { Brain, ShieldCheck, Gauge, Layers, Workflow, LineChart } from "lucide-react";

export const metadata = {
  title: "Services",
};

const SERVICES = [
  {
    title: "Agent Platform Engineering",
    description:
      "Multi-agent orchestration with propose/confirm loops, audit envelopes, and human checkpoints. Parallel fan-out, prompt caching, and selective model routing — measured, not guessed. Built so operators can trust what agents propose.",
    icon: <Brain className="size-5" />,
  },
  {
    title: "Clinical & Regulated AI",
    description:
      "Inference systems that respect PHI boundaries, clinical SLAs, and operator workflows. Traceability, deterministic fallbacks, and calm UIs for high-stakes environments where a wrong answer is a patient risk.",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Production Architecture",
    description:
      "Hexagonal, contracts-first architecture that separates agents from adapters. Rollouts with kill switches, latency budgets, and observability baked in from the first vertical slice.",
    icon: <Layers className="size-5" />,
  },
  {
    title: "Performance & Reliability",
    description:
      "Latency reduction, caching strategy, and quiet on-call. I have taken an inference platform from slow-and-scary to a 85% latency drop with calmer rollouts — the audit envelopes turn scary releases into non-events.",
    icon: <Gauge className="size-5" />,
  },
];

const PRICING = [
  {
    name: "Advisory",
    price: "Engagement",
    cadence: "1–2 days / week",
    features: [
      "Architecture review & diagrams",
      "Agent design propose/confirm loops",
      "Rollout & kill-switch strategy",
      "Async review of your code",
    ],
    cta: "Book a call",
    featured: false,
  },
  {
    name: "Embedded Build",
    price: "Retainer",
    cadence: "4–12 weeks",
    features: [
      "Hands-on implementation",
      "Multi-agent platform build",
      "Observability & latency budgets",
      "Operator UIs & audit envelopes",
      "Production rollout ownership",
    ],
    cta: "Start a build",
    featured: true,
  },
  {
    name: "Fractional Lead",
    price: "Ongoing",
    cadence: "Quarterly",
    features: [
      "Technical leadership",
      "Team mentoring & review",
      "Roadmap & system design",
      "Quarterly architecture audits",
    ],
    cta: "Discuss scope",
    featured: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[var(--bg-page)] py-[var(--space-section)] pb-28">
      <div className="mx-auto max-w-[min(90rem,92vw)] px-4">
        <SectionReveal
          title="Services"
          subtitle="Disciplined engineering engagements — from architecture advisory to hands-on production builds."
        />

        <div className="mt-12">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            What I do
          </p>
          <ExpandableCard services={SERVICES} />
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-2">
          <WobbleCard containerClassName="min-h-[260px]">
            <h3 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)]">
              Propose. Confirm. Ship.
            </h3>
            <p className="mt-3 max-w-md text-[var(--text-muted)]">
              Every engagement starts with constraints, not code. I map the failure
              modes, the stakeholders, and the clinical SLAs before a single line ships.
            </p>
            <div className="mt-6 flex gap-6">
              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                <Workflow className="size-4" /> Contracts first
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                <LineChart className="size-4" /> Measured, not guessed
              </div>
            </div>
          </WobbleCard>
          <WobbleCard containerClassName="min-h-[260px] bg-[var(--bg-inverse)]">
            <h3 className="font-display text-2xl font-semibold tracking-tighter text-[var(--text-inverse)]">
              Production is the product.
            </h3>
            <p className="mt-3 max-w-md text-neutral-400">
              Kill switches, latency budgets, and calm operator UIs. The rollout is the
              deliverable — not the demo.
            </p>
            <Link
              href="/work"
              className="mt-6 inline-flex rounded-full border border-white px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
            >
              See it in the work &rarr;
            </Link>
          </WobbleCard>
        </div>

        <div className="mt-24">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Engagement models
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  tier.featured
                    ? "border-[var(--text-primary)] bg-[var(--bg-surface)]"
                    : "border-[var(--border)] bg-[var(--bg-surface)]"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[var(--text-primary)] px-3 py-1 text-xs font-medium text-[var(--bg-page)]">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                  {tier.name}
                </h3>
                <p className="mt-2 text-3xl font-semibold tracking-tighter text-[var(--text-primary)]">
                  {tier.price}
                </p>
                <p className="text-sm text-[var(--text-muted)]">{tier.cadence}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                      <span className="mt-1.5 size-1.5 rounded-full bg-[var(--text-primary)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${
                    tier.featured
                      ? "bg-[var(--text-primary)] text-[var(--bg-page)] hover:opacity-80"
                      : "border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tighter text-[var(--text-primary)] md:text-4xl">
            Not sure which fits?
          </h2>
          <p className="mt-3 max-w-md text-[var(--text-muted)]">
            Tell me the constraint. I will tell you the engagement.
          </p>
          <div className="mt-6">
            <MovingBorderButton>
              <Link href="/contact">Start a conversation</Link>
            </MovingBorderButton>
          </div>
        </div>
      </div>
    </div>
  );
}
