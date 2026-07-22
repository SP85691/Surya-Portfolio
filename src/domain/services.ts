/**
 * FACTS (GateGuard):
 * 1. Callers: src/components/marketing/services-experience.tsx; src/app/services/page.tsx
 * 2. No prior services domain module — new content source for /services
 * 3. Static in-module data only (no DB/dates beyond engagement cadence strings)
 * 4. User: improve /services with hero like home → list → deep detail; GSAP + shadcn
 */

export type ServiceHorizon = "2026" | "2027";

export interface ServiceOffering {
  slug: string;
  index: string;
  horizon: ServiceHorizon;
  title: string;
  tagline: string;
  accent: string;
  problem: string;
  approach: string;
  outcomes: string[];
  stack: string[];
  proof: string;
}

export interface EngagementModel {
  name: string;
  price: string;
  cadence: string;
  featured: boolean;
  cta: string;
  features: string[];
}

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    slug: "multi-agent-platforms",
    index: "01",
    horizon: "2026",
    title: "Production multi-agent platforms",
    tagline: "Supervisor + specialists. Propose, confirm, ship.",
    accent: "#C6A579",
    problem:
      "Most agent pilots die in production: one monolithic “super-agent,” no durable state, and irreversible writes without a human gate.",
    approach:
      "I design LangGraph (or equivalent) pods with a supervisor routing to narrow specialists, HITL confirm checkpoints, audit envelopes, and kill switches. Autonomy is staged — earned, not declared.",
    outcomes: [
      "Operator-trusted propose/confirm loops",
      "Durable workflow state across restarts",
      "Audit trail for every consequential action",
      "Parallel fan-out with critic agreement scores",
    ],
    stack: ["LangGraph", "FastAPI", "Celery", "Redis", "PostgreSQL"],
    proof: "Infer360 — 11+ agents, FinTech transfer-pricing, ~80% analyst effort off the table.",
  },
  {
    slug: "hybrid-rag",
    index: "02",
    horizon: "2026",
    title: "Agentic & hybrid retrieval",
    tagline: "Cite it, or do not claim it.",
    accent: "#7BA0BC",
    problem:
      "Vanilla RAG fails on multi-hop enterprise questions. Context is split across islands; models fill gaps with confident fiction.",
    approach:
      "Plan → retrieve → critic loops over vectors and graphs. Sufficient-context checks refuse thin answers. Citations map claim → page / sheet / section.",
    outcomes: [
      "Hybrid pgvector + graph retrieval",
      "Multi-hop agentic search paths",
      "Citation validation on every claim",
      "Grounded refusals when evidence is missing",
    ],
    stack: ["pgvector", "Neo4j", "LangGraph", "OpenAI / local LLMs"],
    proof: "Infer360 ownership graphs + KisanGrid hybrid RAG patterns in production contexts.",
  },
  {
    slug: "tool-mcp",
    index: "03",
    horizon: "2026",
    title: "Tool & MCP integration",
    tagline: "Agents that act — with least privilege.",
    accent: "#8FB694",
    problem:
      "An agent without governed tools is a chatbot. Raw DB access and brittle wrappers create sprawl, security debt, and silent failures.",
    approach:
      "Typed tool adapters, MCP-ready interfaces, permission scoping, retries, and complete audit logs. Writes go through guarded code — never through the LLM.",
    outcomes: [
      "MCP-compatible tool surfaces",
      "Least-privilege agent identities",
      "Async job fleets for long work",
      "Graceful degradation on tool failure",
    ],
    stack: ["MCP", "FastAPI", "Celery", "AWS", "OpenTelemetry"],
    proof: "KisanGrid MCP tooling + Infer360 dual FastAPI / Celery fleets.",
  },
  {
    slug: "evals-observability",
    index: "04",
    horizon: "2026",
    title: "Evals, observability & cost",
    tagline: "You cannot improve what you cannot see.",
    accent: "#C89CA0",
    problem:
      "Nondeterminism is the product risk. Teams ship demos without traces, regression suites, or cost budgets — then discover failures in production.",
    approach:
      "Tracing, LLM-as-judge gates, versioned prompts, and latency/cost/accuracy measured as one triad from the first vertical slice.",
    outcomes: [
      "End-to-end agent traces",
      "Offline + online evaluation loops",
      "Token and dollar visibility",
      "Regression gates before rollout",
    ],
    stack: ["OpenTelemetry", "LangSmith-class tooling", "custom judges", "dashboards"],
    proof: "Production platforms with ~85% latency cuts and calm, measured rollouts.",
  },
  {
    slug: "fine-tuning",
    index: "05",
    horizon: "2027",
    title: "Fine-tuning & cost-aware serving",
    tagline: "Frontier everywhere is a demo tax.",
    accent: "#B98C6D",
    problem:
      "Calling the largest model for every turn burns margin. Domain tasks need specialised models without sacrificing accuracy or latency.",
    approach:
      "QLoRA / Unsloth-style fine-tunes where they pay, deterministic code for numbers, and serving paths tuned for the latency–cost–accuracy product.",
    outcomes: [
      "Domain adapters that cut inference cost",
      "Numbers from code, prose from models",
      "Serving under real SLA budgets",
      "Eval harnesses that prove the trade",
    ],
    stack: ["QLoRA", "Unsloth", "vLLM / Bedrock", "FastAPI"],
    proof: "Call-Evaluation — Qwen/LLaMA QLoRA, ~65% cost reduction across 50+ agents.",
  },
  {
    slug: "delivery-leadership",
    index: "06",
    horizon: "2027",
    title: "Forward-deployed delivery",
    tagline: "Close the pilot → production gap.",
    accent: "#9A8C7A",
    problem:
      "2027 winners invest in orchestration and governed identity before adding more agents. Most teams still lack a partner who has shipped the control plane.",
    approach:
      "Embedded build or fractional lead: architecture in the first weeks, implementation with the pod, staged autonomy, and a named owner for every agent lifecycle.",
    outcomes: [
      "Production roadmap in weeks, not quarters",
      "Team mentoring and review culture",
      "Registry + approval widening patterns",
      "Hands-on ownership through rollout",
    ],
    stack: ["Architecture", "Pod leadership", "AWS", "CI/CD"],
    proof: "Xicom pod lead + LetsAI delivery — systems that survive beyond the demo.",
  },
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    name: "Advisory",
    price: "Engagement",
    cadence: "1–2 days / week",
    featured: false,
    cta: "Book a call",
    features: [
      "Architecture review & diagrams",
      "Agent design & HITL loops",
      "Rollout & kill-switch strategy",
      "Async review of your code",
    ],
  },
  {
    name: "Embedded Build",
    price: "Retainer",
    cadence: "4–12 weeks",
    featured: true,
    cta: "Start a build",
    features: [
      "Hands-on multi-agent implementation",
      "Hybrid RAG & tool integration",
      "Observability & latency budgets",
      "Operator UIs & audit envelopes",
      "Production rollout ownership",
    ],
  },
  {
    name: "Fractional Lead",
    price: "Ongoing",
    cadence: "Quarterly",
    featured: false,
    cta: "Discuss scope",
    features: [
      "Technical leadership for the AI pod",
      "Team mentoring & code review",
      "Roadmap & system design",
      "Quarterly architecture audits",
    ],
  },
];
