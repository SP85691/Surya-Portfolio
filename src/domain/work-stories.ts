export type WorkChapterId =
  | "plan"
  | "discover"
  | "design"
  | "build"
  | "ship"
  | "outcome";

export const WORK_CHAPTER_ORDER: WorkChapterId[] = [
  "plan",
  "discover",
  "design",
  "build",
  "ship",
  "outcome",
];

export interface WorkMetric {
  value: string;
  label: string;
}

export interface WorkChapter {
  id: WorkChapterId;
  label: string;
  sfx: string;
  title: string;
  body: string;
  bullets?: string[];
}

export interface WorkVolume {
  index: string;
  slug: string;
  title: string;
  domain: string;
  status: string;
  role: string;
  period: string;
  tagline: string;
  coverBlurb: string;
  image: string;
  imageAlt: string;
  accent: string;
  stack: string[];
  metrics: WorkMetric[];
  hasCaseStudy: boolean;
  chapters: WorkChapter[];
}

export const WORK_VOLUMES: WorkVolume[] = [
  {
    index: "01",
    slug: "infer360",
    title: "Infer360",
    domain: "FinTech · Transfer Pricing",
    status: "Live in production",
    role: "Lead AI & Backend Engineer",
    period: "Jul 2025 — Present",
    tagline: "AI proposes, humans confirm, every number stays auditable.",
    coverBlurb:
      "A B2B platform that automates OECD transfer-pricing compliance end to end — eleven-plus agents draft, reviewers confirm, and guarded code commits so tax authorities always see a defensible trail.",
    image: "/assets/images/projects/infer360.jpg",
    imageAlt: "Tax and financial documents with a calculator",
    accent: "#C6A579",
    stack: ["FastAPI", "LangGraph", "pgvector", "Neo4j", "Celery", "AWS"],
    metrics: [
      { value: "~80%", label: "Manual analyst effort removed" },
      { value: "~85%", label: "API latency reduction" },
      { value: "11+", label: "Distinct agent systems" },
    ],
    hasCaseStudy: true,
    chapters: [
      {
        id: "plan",
        label: "Plan",
        sfx: "BRIEFING",
        title: "Five modules before a single agent graph",
        body: "Transfer-pricing engagements are regulated storytelling with numbers that must survive OECD BEPS scrutiny. We scoped Infer360 as five product modules — IDR, benchmarking, reports, catalogue, access — with clear gates so the pod never built the wrong thing fast.",
        bullets: [
          "Module sequence: IDR → benchmark → reports → catalogue → access",
          "Success metrics agreed with tax operators before architecture hardened",
          "Propose / confirm as a product rule, not a late safety patch",
        ],
      },
      {
        id: "discover",
        label: "Discover",
        sfx: "RISK MAP",
        title: "What a wrong number costs",
        body: "The failure mode is not a bad chat reply — it is an indefensible deliverable in front of a tax authority. We mapped audit boundaries, ownership graphs, document shapes, and the humans who must confirm every consequential write.",
        bullets: [
          "HITL confirm gates before any master-data write",
          "Source inventory: filings, financials, ownership, comparables",
          "Zero tolerance for AI-authored numbers in final artefacts",
        ],
      },
      {
        id: "design",
        label: "Design",
        sfx: "BLUEPRINT",
        title: "Propose, confirm, guarded write",
        body: "Agents draft analysis; humans confirm; only guarded Python commits. Dual FastAPI runtimes separate state-graph orchestration from tool loops. The LLM never issues SQL. Audit envelopes wrap every AI-assisted action so the trail stays append-only.",
        bullets: [
          "Hexagonal boundaries: agents, adapters, number writers",
          "Message schemas and kill-switch points as design artefacts",
          "Hybrid retrieval: pgvector semantic + Neo4j ownership graphs",
        ],
      },
      {
        id: "build",
        label: "Build",
        sfx: "INK LINE",
        title: "Eleven-plus agents on dual FastAPI",
        body: "Specialised LangGraph agents cover extraction, benchmarking critics, report drafting, and catalogue work. Heavy AI rides Celery/Redis so APIs stay responsive. Parallel generators plus a critic surface agreement scores to the analyst instead of a single oracular answer.",
        bullets: [
          "11+ distinct agent systems across the compliance path",
          "Celery fleets for long jobs; fast path returns 202 + task-id",
          "Citation validation from claim → page / sheet / section",
        ],
      },
      {
        id: "ship",
        label: "Ship",
        sfx: "GO LIVE",
        title: "Latency cut without inventing a number",
        body: "We moved AI off the request path and proved the cut under load: API latency from roughly 500–700 ms down to ~50–100 ms (~85%). Staging demos, kill switches, and operator overrides made the rollout a quiet cutover — not a leap of faith.",
        bullets: [
          "~85% API latency reduction on the critical path",
          "Kill-switch rollout with operator overrides",
          "Latency, cost, and accuracy measured together",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        sfx: "SCORE",
        title: "Defensible trail, quieter analysts",
        body: "Infer360 removes ~70–80% of manual analyst effort on transfer-pricing engagements while keeping every consequential number human-confirmed. Tax authorities can follow the trail; the platform never invents a figure.",
        bullets: [
          "~70–80% less manual analyst effort",
          "0 AI-authored numbers in deliverables",
          "Append-only audit trail on every AI-assisted action",
        ],
      },
    ],
  },
  {
    index: "02",
    slug: "skincare-ai",
    title: "SkinCare AI",
    domain: "Healthcare · Consultation",
    status: "Production",
    role: "AI Systems Engineer",
    period: "2025",
    tagline: "A dermatology assistant that talks, listens, and stays grounded.",
    coverBlurb:
      "A seven-agent LangGraph consultant across chat and natural voice. A strict registry routes each turn to the right specialist — fewer wasted LLM calls, answers that stay grounded.",
    image: "/assets/images/projects/skincare.jpg",
    imageAlt: "Hands typing on a laptop beside a stethoscope",
    accent: "#C89CA0",
    stack: ["LangGraph", "FastAPI", "Multi-Agent", "Voice / TTS", "Redis"],
    metrics: [
      { value: "~75%", label: "Fewer LLM calls per message" },
      { value: "7", label: "Specialised agents orchestrated" },
      { value: "Chat + Voice", label: "Dual interaction modes" },
    ],
    hasCaseStudy: true,
    chapters: [
      {
        id: "plan",
        label: "Plan",
        sfx: "BRIEFING",
        title: "One prompt was never the product",
        body: "Skincare consultation spans intake, triage signals, routine advice, and escalation. We planned a specialist registry from day one so no single mega-prompt would own every turn.",
        bullets: [
          "Dual modes scoped early: text chat and natural voice",
          "Clear handoff when advice leaves safe consumer scope",
          "Latency budget per turn, not per full conversation dump",
        ],
      },
      {
        id: "discover",
        label: "Discover",
        sfx: "RISK MAP",
        title: "Grounding over confident guesswork",
        body: "Wrong advice here erodes trust fast. We mapped which topics need specialist agents, where memory helps, and where the system should refuse or redirect instead of improvising.",
        bullets: [
          "Failure modes for overconfident dermatology claims",
          "Session memory boundaries for chat vs voice",
          "Routing contracts before the first demo prompt",
        ],
      },
      {
        id: "design",
        label: "Design",
        sfx: "BLUEPRINT",
        title: "Registry, not oracle",
        body: "Seven specialised agents sit behind a strict registry. Each message resolves to the right specialist; parallel work only happens when it earns its cost. Voice and chat share orchestration contracts so behaviour stays consistent across channels.",
        bullets: [
          "Agent registry as the single routing surface",
          "Shared schemas across chat and TTS paths",
          "Selective escalation when confidence drops",
        ],
      },
      {
        id: "build",
        label: "Build",
        sfx: "INK LINE",
        title: "Seven agents, one turn budget",
        body: "LangGraph orchestration plus Redis-backed session state keeps the conversation coherent without replaying the whole history into every model call. FastAPI serves both interaction modes from one governed backend.",
        bullets: [
          "7 specialised agents on a shared registry",
          "Redis session memory without prompt bloat",
          "Voice / TTS wired into the same turn loop",
        ],
      },
      {
        id: "ship",
        label: "Ship",
        sfx: "GO LIVE",
        title: "Fewer calls, same presence",
        body: "Selective routing cut redundant LLM calls by roughly three quarters per message. Production felt snappier because the system stopped paying for specialists that were never needed.",
        bullets: [
          "~75% fewer LLM calls per message",
          "Chat + voice both live on the same contracts",
          "Cost and latency tracked per routed specialist",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        sfx: "SCORE",
        title: "A consultant that stays in its lane",
        body: "SkinCare AI ships as a grounded multi-agent consultant — present in chat and voice, selective with spend, and structured enough that specialists do the work a single prompt never should.",
        bullets: [
          "7 agents orchestrated in production",
          "~75% call reduction via registry routing",
          "Dual interaction modes without dual architectures",
        ],
      },
    ],
  },
  {
    index: "03",
    slug: "ispeak-ai",
    title: "iSpeak AI",
    domain: "EdTech · IELTS Speaking",
    status: "Production-ready",
    role: "AI Systems & Backend Engineer",
    period: "Oct 2025 — Jan 2026",
    tagline: "An examiner in software, grounded in real rubric language.",
    coverBlurb:
      "Automated IELTS Speaking assessment from raw audio — faster-whisper transcription, LangGraph scoring against examiner baselines, and a high-concurrency FastAPI backend that holds under load.",
    image: "/assets/images/projects/ispeak.jpg",
    imageAlt: "Studio microphone in a recording booth",
    accent: "#7BA0BC",
    stack: ["faster-whisper", "LangGraph", "uvloop", "MongoDB", "Gemini"],
    metrics: [
      { value: "±0.5–1.0", label: "Target band accuracy" },
      { value: "~2–3s", label: "Per-request scoring" },
      { value: "100+", label: "Concurrent sessions" },
    ],
    hasCaseStudy: true,
    chapters: [
      {
        id: "plan",
        label: "Plan",
        sfx: "BRIEFING",
        title: "Score like an examiner, not a chatbot",
        body: "IELTS Speaking feedback only works if it mirrors how real raters talk about fluency, lexical resource, grammar, and pronunciation. We planned the product around rubric language — not generic “speak better” tips.",
        bullets: [
          "Four IELTS criteria as first-class scoring dimensions",
          "Audio-in → transcript → band → feedback as one pipeline",
          "Concurrency target set before model shopping",
        ],
      },
      {
        id: "discover",
        label: "Discover",
        sfx: "RISK MAP",
        title: "Drift is the enemy",
        body: "The risk is band inflation, vague feedback, and scoring that drifts from examiner baselines. We locked evaluation against real rubric phrasing and defined acceptable band tolerance early.",
        bullets: [
          "Examiner baseline corpus for calibration",
          "Target accuracy ±0.5–1.0 band",
          "Failure modes for noisy audio and short answers",
        ],
      },
      {
        id: "design",
        label: "Design",
        sfx: "BLUEPRINT",
        title: "ASR separate from judgment",
        body: "Transcription and scoring stay cleanly separated. faster-whisper owns speech-to-text; LangGraph owns criterion-level judgment grounded in rubric language. The API contract assumes bursty concurrent practice sessions.",
        bullets: [
          "Pipeline stages with explicit handoff schemas",
          "High-concurrency FastAPI + uvloop topology",
          "Feedback templates tied to criterion evidence",
        ],
      },
      {
        id: "build",
        label: "Build",
        sfx: "INK LINE",
        title: "Audio in, band out in seconds",
        body: "The backend transcribes with faster-whisper, then scores the four criteria through a LangGraph pipeline. MongoDB holds session artefacts; Gemini assists where generation needs speed without abandoning rubric grounding.",
        bullets: [
          "faster-whisper transcription path",
          "Criterion-level LangGraph scoring graph",
          "Session persistence for practice history",
        ],
      },
      {
        id: "ship",
        label: "Ship",
        sfx: "GO LIVE",
        title: "Hundreds of concurrent practice rooms",
        body: "Load targets mattered as much as band accuracy. The stack holds 100+ concurrent sessions with per-request scoring in roughly two to three seconds — fast enough for live practice loops.",
        bullets: [
          "100+ concurrent sessions under target load",
          "~2–3s per-request scoring path",
          "Production-ready examiner feedback loop",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        sfx: "SCORE",
        title: "Rubric-faithful, concurrency-ready",
        body: "iSpeak AI delivers examiner-style IELTS Speaking assessment that stays inside a tight band tolerance while surviving real concurrent practice traffic.",
        bullets: [
          "±0.5–1.0 target band accuracy",
          "Rubric-grounded criterion feedback",
          "100+ concurrent sessions supported",
        ],
      },
    ],
  },
  {
    index: "04",
    slug: "kisangrid-ai",
    title: "KisanGrid AI",
    domain: "AgriTech · Advisory",
    status: "Open source",
    role: "Creator",
    period: "2025",
    tagline: "Localised farm advice, Hindi-first, from many live signals.",
    coverBlurb:
      "A multi-agent agricultural advisory that speaks to farmers in Hindi. Modular LangGraph agents run hybrid RAG over crop, weather, market, and soil APIs — with MCP tools stitching live context into one recommendation path.",
    image: "/assets/images/projects/kisangrid.jpg",
    imageAlt: "Golden farm field at sunrise",
    accent: "#8FB694",
    stack: ["LangGraph", "pgvector", "TimescaleDB", "MCP", "Claude"],
    metrics: [
      { value: "Hindi-first", label: "Localised advisory output" },
      { value: "4 signals", label: "Crop · weather · market · soil" },
      { value: "MCP", label: "Live tool integration" },
    ],
    hasCaseStudy: false,
    chapters: [
      {
        id: "plan",
        label: "Plan",
        sfx: "BRIEFING",
        title: "Advice that meets farmers where they are",
        body: "Generic English agtech tips fail the people who need them. KisanGrid was planned Hindi-first, with live signals — not a static FAQ — as the spine of every recommendation.",
        bullets: [
          "Hindi-first output as a product invariant",
          "Four live signal families scoped up front",
          "Open-source path so local builders can extend it",
        ],
      },
      {
        id: "discover",
        label: "Discover",
        sfx: "RISK MAP",
        title: "Stale data is bad advice",
        body: "Farm decisions go wrong when weather, markets, or soil context is outdated. We treated live tool freshness and localisation quality as first-class risks, not polish items.",
        bullets: [
          "Freshness contracts for each signal source",
          "Hybrid RAG over docs plus live tool results",
          "Failure modes when an API is dark or late",
        ],
      },
      {
        id: "design",
        label: "Design",
        sfx: "BLUEPRINT",
        title: "Agents plus MCP tools",
        body: "Modular LangGraph agents own advisory roles while Model Context Protocol tools pull live crop, weather, market, and soil context. pgvector and TimescaleDB split semantic memory from time-series truth.",
        bullets: [
          "MCP as the live-tool seam",
          "Hybrid RAG over embeddings + structured series",
          "Agent modules that can fail independently",
        ],
      },
      {
        id: "build",
        label: "Build",
        sfx: "INK LINE",
        title: "Four signals, one Hindi answer",
        body: "The pipeline stitches four signal families into a single advisory turn. Claude-backed generation stays constrained by retrieved evidence and tool payloads so localisation never means hallucination.",
        bullets: [
          "Crop · weather · market · soil signal fusion",
          "pgvector retrieval over advisory knowledge",
          "TimescaleDB for live operational series",
        ],
      },
      {
        id: "ship",
        label: "Ship",
        sfx: "GO LIVE",
        title: "Open source, ready to extend",
        body: "KisanGrid ships as an open advisory stack — Hindi-first, MCP-wired, and modular enough for others to plug new tools without rewriting the graph.",
        bullets: [
          "Open-source release for local builders",
          "MCP tools live in the recommendation path",
          "Modular agents for domain extension",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        sfx: "SCORE",
        title: "Localised guidance from living context",
        body: "Farmers get trustworthy, localised guidance grounded in four live signals — not a brochure translated after the fact.",
        bullets: [
          "Hindi-first advisory output",
          "4 live signal families in one pipeline",
          "MCP-backed tool integration",
        ],
      },
    ],
  },
  {
    index: "05",
    slug: "call-evaluation",
    title: "Call-Evaluation Pipeline",
    domain: "SaaS · Quality Assurance",
    status: "Shipped",
    role: "AI Software Developer",
    period: "2024 — 2025",
    tagline: "Retiring GPT-4 with fine-tuned models that cost a fraction.",
    coverBlurb:
      "An end-to-end call-evaluation pipeline that replaced manual QA for fifty-plus agents. Whisper ASR and diarisation feed an LLM scorer — then QLoRA fine-tunes of Qwen and LLaMA retired GPT-4 from the workload.",
    image: "/assets/images/projects/calleval.jpg",
    imageAlt: "Professional standing with a laptop in an open office",
    accent: "#B98C6D",
    stack: ["Whisper ASR", "QLoRA", "Unsloth", "HF TRL", "RAGAS"],
    metrics: [
      { value: "~65%", label: "Inference cost cut" },
      { value: "~84%", label: "Fine-tuned Qwen accuracy" },
      { value: "50+", label: "Agents QA automated" },
    ],
    hasCaseStudy: false,
    chapters: [
      {
        id: "plan",
        label: "Plan",
        sfx: "BRIEFING",
        title: "Manual QA does not scale",
        body: "Fifty-plus agents meant QA that could never keep up by ear alone. We planned an end-to-end evaluation pipeline — speech in, scored quality metrics out — with a path to own the model cost later.",
        bullets: [
          "Replace manual QA for 50+ agents",
          "8+ quality metrics as the scoring contract",
          "Cost ownership as a phase-two requirement",
        ],
      },
      {
        id: "discover",
        label: "Discover",
        sfx: "RISK MAP",
        title: "GPT-4 quality, GPT-4 bill",
        body: "The first bar was production-quality scoring. The second was not paying GPT-4 forever. We measured accuracy, latency, and cost together so a fine-tune could retire the expensive baseline without dropping the bar.",
        bullets: [
          "Whisper ASR + diarisation as the speech foundation",
          "RAGAS in the eval loop before and after fine-tunes",
          "Cost vs accuracy trade space defined with stakeholders",
        ],
      },
      {
        id: "design",
        label: "Design",
        sfx: "BLUEPRINT",
        title: "ASR → score → fine-tune",
        body: "Pipeline stages stay explicit: diarised transcripts feed an LLM scorer across eight-plus metrics. Fine-tuning sits behind the same interfaces so Qwen and LLaMA can replace GPT-4 without rewriting the product surface.",
        bullets: [
          "Stable scorer interfaces across model generations",
          "QLoRA / Unsloth / HF TRL as the training path",
          "Eval harness wired before training starts",
        ],
      },
      {
        id: "build",
        label: "Build",
        sfx: "INK LINE",
        title: "Qwen and LLaMA take the shift",
        body: "I fine-tuned Qwen 2.5 (~84%) and LLaMA 3.1 3B (~80%) with QLoRA so the call-eval workload could leave GPT-4. Whisper still owns ASR; the scorer owns judgment; RAGAS keeps both honest.",
        bullets: [
          "QLoRA fine-tunes for Qwen 2.5 and LLaMA 3.1",
          "Whisper ASR + diarisation feeding the scorer",
          "RAGAS continuous evaluation in the loop",
        ],
      },
      {
        id: "ship",
        label: "Ship",
        sfx: "GO LIVE",
        title: "Same bar, smaller bill",
        body: "GPT-4 left the live workload. Inference cost dropped about sixty-five percent while fine-tuned models held production quality — turning a brittle vendor dependency into an owned scoring stack.",
        bullets: [
          "~65% inference cost reduction vs GPT-4",
          "GPT-4 retired from the live call-eval path",
          "QA coverage held for 50+ agents",
        ],
      },
      {
        id: "outcome",
        label: "Outcome",
        sfx: "SCORE",
        title: "Owned models, quieter QA",
        body: "The pipeline automated call QA at scale and proved that smaller fine-tuned models can match the production bar without the GPT-4 invoice.",
        bullets: [
          "50+ agents covered by automated QA",
          "~84% fine-tuned Qwen accuracy",
          "~65% cost cut with owned inference",
        ],
      },
    ],
  },
];
