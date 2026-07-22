/**
 * FACTS (GateGuard):
 * 1. Caller: src/components/marketing/about-experience.tsx
 * 2. New domain for /about page storytelling from resume + portfolio dossier
 * 3. Static content only — years as strings (2023–2025); no DB
 * 4. User: refactor About to homepage UI/UX; use resume + portfolio docs
 */

export const ABOUT_HERO = {
  eyebrow: "About",
  titleLead: "More than",
  titleMuted: " an engineer",
  lede:
    "I take ambiguous AI problems from ideation to deployment — and I lead the teams that ship them. Production systems, not prototypes.",
} as const;

export const ABOUT_INTRO = {
  name: "Surya Pratap",
  role: "AI & Deployment Engineer · Pod Lead",
  location: "New Delhi, India",
  status: "Currently leading AI delivery at Xicom Technologies",
  p1: "An AI engineer who ships production systems, not prototypes. Over 2+ years I have designed and operated agentic AI platforms end to end — from problem framing and architecture through async backends, retrieval, guardrails, deployment, and observability — across FinTech, healthcare, EdTech, and agriculture.",
  p2: "But the title undersells the job. I frame the problem, architect the system, talk to clients, stand up staging, run the demos, plan the sprints, deploy to the cloud, and lead the pod that builds it. A full deployment engineer, from the first conversation to production and the on-call that follows.",
  tags: ["Agentic AI", "Hybrid RAG", "FastAPI", "AWS · Docker", "LangGraph"],
} as const;

export type AboutEra = {
  year: string;
  tag: string;
  role: string;
  org: string;
  story: string;
  impact: { value: string; label: string };
  stack: string[];
  accent: string;
};

export const ABOUT_ERAS: AboutEra[] = [
  {
    year: "2023",
    tag: "Where it began",
    role: "ML Research Intern",
    org: "Ashoka University · CDSA",
    story:
      "I started where rigor is non-negotiable. Web-scale biographical data pipelines and a computer-vision + NER system that turned raw images into structured research records, validated on live datasets.",
    impact: { value: "CV + NER", label: "identity extraction at scale" },
    stack: ["Python", "OpenCV", "spaCy", "scikit-learn"],
    accent: "#7BA0BC",
  },
  {
    year: "2024",
    tag: "Learning to ship",
    role: "AI Software Developer",
    org: "LetsAI Solutions · Intern → Full-time",
    story:
      "I learned what production really costs. An end-to-end call-evaluation pipeline (Whisper ASR + diarisation + LLM scoring) replaced manual QA for 50+ agents. Then QLoRA on Qwen 2.5 and LLaMA 3.1 cut inference cost ~65% and retired GPT-4 from that workload.",
    impact: { value: "~65%", label: "inference cost cut" },
    stack: ["LangChain", "Whisper ASR", "QLoRA", "RAGAS", "FastAPI"],
    accent: "#8FB694",
  },
  {
    year: "2025 · Today",
    tag: "Owning delivery",
    role: "AI Engineer & Pod Lead",
    org: "Xicom Technologies",
    story:
      "I own production AI end to end on Infer360 — a live B2B transfer-pricing platform. Dual FastAPI microservices on AWS, hybrid pgvector + Neo4j retrieval, 11+ agents with human-in-the-loop gates, and a seven-person pod from framing through deployment.",
    impact: { value: "~85%", label: "API latency reduction" },
    stack: ["FastAPI", "LangGraph", "pgvector", "Neo4j", "Celery", "AWS"],
    accent: "#C6A579",
  },
];

export const ABOUT_FACETS = [
  {
    title: "Clients & stakeholders",
    detail:
      "I turn ambiguous asks into scoped, defensible plans, and I speak fluently to both engineers and business.",
    accent: "#7BA0BC",
  },
  {
    title: "Architecture & tech",
    detail:
      "Hexagonal, contracts-first systems that I build hands-on across backend and AI — not just draw on a whiteboard.",
    accent: "#C6A579",
  },
  {
    title: "Staging & demos",
    detail:
      "I stand up staging environments and run live demos that hold up under real client scrutiny.",
    accent: "#8FB694",
  },
  {
    title: "Planning & sessions",
    detail:
      "I break work into buildable modules, sequence it, unblock the team, and keep quality gates in place.",
    accent: "#C89CA0",
  },
  {
    title: "Cloud & deployment",
    detail:
      "Containerised, queue-driven, observable deploys on AWS that stay migration-managed and reproducible.",
    accent: "#7BA0BC",
  },
  {
    title: "Team leadership",
    detail:
      "I lead a seven-person pod — 2 frontend, 3 backend, 2 AI — on direction, review, and delivery while staying hands-on.",
    accent: "#C6A579",
  },
] as const;

export const ABOUT_METRICS = [
  { value: 2, suffix: "+", prefix: "", label: "Years shipping production AI", accent: "#7BA0BC" },
  { value: 4, suffix: "+", prefix: "", label: "Production AI systems", accent: "#C6A579" },
  { value: 11, suffix: "+", prefix: "", label: "Agent systems on Infer360", accent: "#8FB694" },
  { value: 85, suffix: "%", prefix: "~", label: "API latency reduction", accent: "#C89CA0" },
  { value: 7, suffix: "", prefix: "", label: "Engineers led in a pod", accent: "#7BA0BC" },
  { value: 65, suffix: "%", prefix: "~", label: "Inference cost cut via QLoRA", accent: "#B98C6D" },
] as const;

export const ABOUT_PHILOSOPHY = [
  {
    title: "AI proposes, humans confirm",
    body: "In regulated work, the model generates candidates; a person approves; guarded code commits. The LLM never touches the write path directly.",
  },
  {
    title: "Numbers from code, prose from models",
    body: "Consequential figures are materialised deterministically from data; the model is trusted only for language.",
  },
  {
    title: "Adversarial beats oracular",
    body: "Multiple generators plus a critic and an agreement score expose weakness that a single confident model hides.",
  },
  {
    title: "Grounding beats cleverness",
    body: "Retrieval over real source material earns trust that prompt engineering alone cannot.",
  },
  {
    title: "Observe, then optimise",
    body: "Tracing, cost accounting, and evaluation ship with the first agent — not after the incident.",
  },
  {
    title: "Latency, cost, accuracy together",
    body: "Optimising one in isolation usually quietly wrecks another. Measure all three.",
  },
] as const;

export const ABOUT_SYSTEMS = [
  {
    name: "Infer360",
    domain: "FinTech / Tax",
    result: "~70–80% effort ↓ · ~85% latency ↓",
    accent: "#C6A579",
  },
  {
    name: "SkinCare AI",
    domain: "Healthcare",
    result: "~75% fewer LLM calls / message",
    accent: "#C89CA0",
  },
  {
    name: "iSpeak AI",
    domain: "EdTech",
    result: "±0.5–1.0 band · 100+ concurrent",
    accent: "#7BA0BC",
  },
  {
    name: "KisanGrid AI",
    domain: "AgriTech",
    result: "Hindi-first localised advisory",
    accent: "#8FB694",
  },
] as const;

export const ABOUT_QUOTE =
  "Precision in code. Restraint in design. Confidence in shipping.";
