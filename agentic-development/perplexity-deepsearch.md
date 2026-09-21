<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# ROLE

You are a senior technical lead for agentic systems and an applied ML research engineer. You will perform DeepSearch first, then produce a spec-driven implementation plan and reference architecture for a local-first “agentic dev + research environment”.

GOAL
Design an OpenCode-like local environment that:

- runs primarily on local open-source models (Gemma 4 as the default baseline)
- supports multi-model orchestration (choose the best model per scenario/task)
- enables agentic workflows (plan → act → observe → evaluate → reflect)
- supports tool calling (repo/file ops, git, tests, linters, notebooks, browser/search, citations)
- supports ML/LLM research and scientific writing for computer science (paper summarisation, citation management, LaTeX/Markdown workflows)

NON-NEGOTIABLES

- Local-first by default (privacy-preserving). Remote APIs are allowed only as optional add-ons, clearly separated.
- If any term/tool is ambiguous, do NOT invent definitions. Use DeepSearch to disambiguate and cite sources.
- Every major recommendation must include trade-offs (latency, VRAM, quality, licensing, complexity).

DEEPSEARCH (EVIDENCE GATHERING) — DO THIS FIRST
Research and cite sources for each category:

1) Local agentic dev environments / OpenCode-like tools:
   - coding agents, agentic IDEs, repo-level agents, evaluation harnesses, tool gateways
   - prioritise official docs + repos + widely adopted frameworks
2) Gemma 4 and other open-source models suited for agentic tasks:
   - models strong in: reasoning/planning, code generation \& debugging, long-context retrieval, summarisation, scientific writing
   - include constraints: quantisation options, typical VRAM needs, context length, tool-calling/function calling support (if any)
   - produce a “model capability matrix” with citations
3) Multi-model routing patterns:
   - rule-based routing, learned routing, eval-driven routing, bandits, cost/latency-aware routing
   - fallback strategies and confidence estimation
4) Tool-calling + sandboxing architectures:
   - function calling schemas, permission models, sandbox approaches (container, restricted subprocess, policy engine)
   - audit logs, replayable runs, secrets management
5) Research + scientific writing workflows (CS focus):
   - paper ingestion \& summarisation, citation extraction, Zotero/BibTeX/CSL, LaTeX/Markdown (Pandoc), structured notes
   - provenance: citations for claims, quote boundaries, “what was read” transparency

Prioritise sources:

- official docs/repos first
- peer-reviewed papers / arXiv next
- reputable engineering blogs last
Include URLs for key claims.

DELIVERABLES (MUST OUTPUT ALL)

A) EXECUTIVE SUMMARY (10–15 bullets)

- What we are building, key decisions, risks, and why this architecture.

B) SPEC-DRIVEN SYSTEM SPEC

1. Problem statement + non-goals
2. Primary personas: (a) local developer (b) ML/LLM researcher (c) scientific writer
3. User stories (at least 12) + acceptance criteria
4. Functional requirements (FRs) and Non-functional requirements (NFRs)
   - include performance targets, offline operation, reproducibility, traceability, privacy
5. Contracts / Interfaces (explicit schemas):
   - ModelProvider interface (local models, optional remote)
   - Router interface (inputs, scoring, decision, fallbacks)
   - ToolGateway interface (function schema, permissions, audit logs)
   - AgentLoop interface (plan/act/observe/evaluate/reflection)
6. Security \& Safety:
   - tool permission levels, sandbox policy, secret handling, prompt injection mitigations
7. Observability \& Reproducibility:
   - structured logs, traces, run replay, dataset/version tracking
8. Success metrics:
   - offline eval metrics (task success, tests passing, citation correctness)
   - user productivity metrics (time-to-solution, iteration count)

C) REFERENCE ARCHITECTURE

- Provide a clear text diagram (boxes/arrows) and describe each component:
  - UI layer (chat + workflow + file explorer + citations)
  - Orchestrator (agent manager)
  - Router (multi-model selection)
  - Model runtimes (Gemma 4 + others)
  - Tool gateway (sandbox + permission policy engine)
  - Memory (short-term, long-term notes, optional vector store)
  - Retrieval pipeline (papers/repos)
  - Evaluation harness (benchmarks, regression tests)
  - Data stores (runs, prompts, citations, artefacts)

D) MULTI-MODEL STRATEGY (scenario-based)

- Create a “Scenario → Recommended model(s) → Why → Cost/latency → Fallback” table for:
  1) repo-level code changes
  2) debugging failing tests
  3) planning multi-step refactors
  4) mathematical reasoning / proofs
  5) summarising research papers
  6) drafting scientific writing with citations
  7) long-context synthesis across many sources
- Include a routing policy proposal:
  - confidence signals, eval-based gating, and safe fallbacks (Gemma 4 baseline)

E) IMPLEMENTATION PLAN (PHASED, SPEC-DRIVEN)

- Phases: MVP → Beta → Production
For each phase provide:
- milestones, tasks, dependencies
- deliverables (specs, ADRs, tests, docs)
- evaluation plan (offline + user feedback)
- definition of done
Also include:
- repository structure (monorepo layout)
- CI/CD plan and model/eval regression strategy

F) TECH STACK OPTIONS (WITH TRADE-OFFS)

- Backend: Python vs TypeScript vs hybrid (why)
- UI: web app vs desktop app vs IDE plugin (why)
- Local model serving: options, quantisation, caching
- Sandbox: containers vs restricted exec vs WASM
- Retrieval: local indexing + embeddings + rerankers
- Writing pipeline: Markdown/LaTeX, Pandoc, Zotero/BibTeX, CSL

G) TOOLING CHECKLIST

- Must-have tools for:
  - agentic dev (git, test runner, linter, formatter, static analysis)
  - ML/LLM experimentation (datasets, eval harness, prompt/versioning)
  - deep research \& scientific writing (PDF ingestion, citation manager, LaTeX toolchain)
  - observability (trace viewer, run registry, audit logs)

OUTPUT STYLE

- Use headings, concise bullets, and checklists.
- Clearly label assumptions.
- Cite sources whenever referencing existing tools/models.
- Avoid vague statements; provide actionable implementation details.

CONSTRAINTS (FILL IF KNOWN; OTHERWISE STATE ASSUMPTIONS)

- Target OS:
- Hardware (CPU/GPU/VRAM/RAM):
- Preferred language(s): Python/TypeScript/Other
- Primary UI target: Web/Desktop/IDE plugin

Here is a spec-driven reference plan for a local-first agentic dev + research environment centered on Gemma as the default baseline, with multi-model routing, audited tool use, and research/writing workflows built in. OpenCode shows the viability of a local-capable coding agent across terminal, desktop, and IDE surfaces; MCP gives a standard way to expose tools; vLLM provides OpenAI-compatible serving with tool-calling; aider and OpenHands show strong patterns for repo editing and software-agent harnesses; and Zotero/Better BibTeX plus Pandoc provide a practical citation-and-writing backbone for CS workflows.[^1][^2][^3][^4][^5][^6]

A good architecture here is hybrid but local-first: Python for orchestration, tools, evals, and research pipelines; TypeScript for the UI shell; a model runtime layer fronted by a common provider interface; a router that defaults to Gemma and escalates only when confidence or context constraints require it; and a sandboxed ToolGateway with replayable logs and explicit permissions. That combination best balances privacy, extensibility, and reproducibility, while keeping optional remote APIs isolated behind a separate provider boundary.[^7][^8][^3][^6]

## Assumptions

- Target OS: Linux first, macOS second, Windows via WSL2 as supported-but-not-primary, because local model serving, containers, CLI tooling, and LaTeX/Pandoc workflows are usually cleanest on Linux-class environments.[^8][^6]
- Hardware assumption for baseline: 32–64 GB RAM, NVIDIA GPU preferred, 16–24 GB VRAM for comfortable local experimentation with quantized mid-size models; CPU-only mode should remain functional for orchestration, retrieval, writing, and small-model tasks, but with materially worse latency.[^2][^8]
- Preferred languages: Python backend plus TypeScript frontend, because Python aligns with ML, evals, notebooks, document processing, and agent SDKs, while TypeScript is the practical choice for a responsive desktop/web client and IDE integration surfaces.[^6][^1]
- Primary UI target: desktop-first app with an optional web UI and IDE extension, which mirrors how OpenCode spans terminal, desktop, and IDE contexts.[^1]


## Executive summary

- Build a local-first agentic workspace for coding, research, and scientific writing, with Gemma as the baseline default model and optional other local models selected by router policy per task.[^9][^7]
- Use a strict separation between local providers and optional remote providers so privacy-sensitive tasks never leak by default.[^3][^1]
- Standardize tool exposure through an MCP-compatible ToolGateway, because MCP defines a host-client-server protocol for exposing tools and context to AI applications over JSON-RPC 2.0.[^10][^3]
- Front local models through a provider abstraction compatible with vLLM’s OpenAI-style API shape, because that lowers switching costs across runtimes and makes tool-calling integration easier.[^8][^2]
- Implement the core loop explicitly as plan → act → observe → evaluate → reflect, rather than a single opaque “agent run,” so tasks are traceable, interruptible, and replayable.[^11][^6]
- Treat repo editing as a first-class workflow, borrowing from aider’s benchmark-driven code-editing philosophy and OpenHands’ software-agent SDK model.[^12][^5][^6]
- Make evals non-optional: every agent/tool/model change should run offline regressions on code editing, bug fixing, citation correctness, and summarization fidelity before promotion.[^13][^12]
- Use permissioned sandboxes for all side-effecting tools, with at least read-only, workspace-write, and privileged modes, plus audit trails for every action.[^3][^6]
- Build short-term working memory into the orchestration state, and long-term notes/provenance into a local store; keep vector search optional, not mandatory, for smaller deployments.[^6][^3]
- Support scientific writing through PDF/paper ingestion, metadata extraction, Zotero/Better BibTeX export, and Pandoc-based Markdown/LaTeX output pipelines.[^4]
- Use confidence-aware routing: default to Gemma, escalate when code-edit confidence is low, context is too large, or math/reasoning evals show another model is stronger for that scenario.[^7][^9][^12]
- Main risks are model-quality variance, VRAM pressure, tool-call brittleness, and prompt-injection from retrieved content; mitigate with eval gates, quantization choices, permission barriers, and provenance-aware retrieval.[^2][^11][^3]
- This architecture is preferable because it composes open standards and proven open-source components instead of depending on a monolithic closed platform.[^5][^1][^3][^6]


## Evidence base

- OpenCode is an open-source AI coding agent available as terminal, desktop, and IDE extension, and it initializes projects by analyzing the repo and creating `AGENTS.md` metadata.[^1]
- OpenCode supports specialized agents defined globally or per-project, which is a useful pattern for role-specific local agents such as “review,” “paper-summarizer,” or “latex-editor”.[^14]
- Gemma supports function-calling patterns, and Google documents a full tool-use sequence in which the model emits structured function calls, the developer executes them, and the model then incorporates results.[^7]
- Google’s Gemma docs also note that FunctionGemma is a specialized small Gemma variant for agentic tool use, while recommending Gemma 3 27B for best function-calling performance and 12B for a better latency/quality balance.[^9]
- vLLM exposes an OpenAI-compatible server and documents tool calling, including strict schemas and auto tool choice, which makes it a strong fit for a local model-serving layer.[^8][^2]
- MCP is an open protocol for connecting AI applications to tools and context providers, using JSON-RPC 2.0 and explicit host/client/server roles.[^10][^3]
- aider’s docs and benchmarks emphasize end-to-end code editing that actually writes files and passes tests, which is directly relevant for agentic dev environments.[^12][^13]
- OpenHands provides a software-agent SDK for code tasks ranging from small maintenance tasks to major multi-agent refactors, which maps well to your desired agent-loop orchestration layer.[^6]
- Better BibTeX for Zotero supports Pandoc-oriented citation export workflows, which is practical for Markdown and LaTeX scientific writing pipelines.[^4]


## System spec

### Problem statement

Design a privacy-preserving local-first environment that helps three user classes—developer, ML researcher, and scientific writer—complete multi-step work using local open-source models, trusted tools, and reproducible workflows. The environment must support codebase work, deep research, and citation-aware writing from one orchestrated interface, with optional remote augmentation that is disabled by default.[^3][^1][^6]

### Non-goals

- Not a general-purpose cloud SaaS coding platform, because the primary design constraint is local-first execution and privacy separation.[^1]
- Not a fully autonomous “always-on” agent with unrestricted machine access, because tool use must be permissioned and auditable.[^3][^6]
- Not a replacement for Zotero, git, Jupyter, or LaTeX itself; instead it composes them behind a consistent orchestration layer.[^4][^6]


### Personas

| Persona | Needs | Pain points | Design focus |
| :-- | :-- | :-- | :-- |
| Local developer | Repo-level edits, tests, git ops, refactors, code review [^5][^6] | Tool trust, accidental file changes, weak long-horizon planning [^12][^6] | Safe sandbox, strong diff UX, test-driven loops |
| ML/LLM researcher | Notebooks, experiments, prompts, evals, datasets, paper synthesis [^6] | Reproducibility drift, context fragmentation, poor provenance | Run registry, dataset/version tracking, retrieval provenance |
| Scientific writer | Paper ingestion, citations, BibTeX/CSL, Markdown/LaTeX export [^4] | Hallucinated citations, quote leakage, formatting friction | Citation boundaries, source traceability, Zotero/Pandoc pipeline |

### User stories

1. As a developer, I want the agent to inspect a repo and propose a plan before changing files, so I can approve scope.
Acceptance: a structured plan lists target files, intended edits, tools to invoke, and rollback path.
2. As a developer, I want failing tests triaged automatically, so I can approve a fix candidate quickly.
Acceptance: the system identifies failing tests, hypothesizes root cause, proposes patch, reruns tests, and logs all outcomes.
3. As a developer, I want git-aware edits with auto-generated commit messages.
Acceptance: every applied change produces a diff view and optional commit metadata.
4. As a researcher, I want notebook cells executed inside a reproducible run context.
Acceptance: environment, model version, seed, dataset refs, and outputs are stored with the run.
5. As a researcher, I want prompt and model variants compared offline.
Acceptance: an eval suite can replay the same tasks across providers and store metrics.
6. As a writer, I want PDFs ingested and summarized with citation links to the exact source.
Acceptance: each summary paragraph references source metadata and extracted evidence spans.
7. As a writer, I want claim drafting to distinguish paraphrase from quote.
Acceptance: the editor marks quoted spans explicitly and records source attribution.
8. As a writer, I want Zotero/Better BibTeX export into my writing workflow.
Acceptance: citation keys resolve into Pandoc/LaTeX references without manual copy-paste.[^4]
9. As a developer, I want low-risk tools to run automatically but risky tools to require approval.
Acceptance: read-only tools can auto-run; file writes, git commits, shell exec, and network use are policy-gated.
10. As a team lead, I want every run replayable.
Acceptance: prompts, model decisions, tool inputs/outputs, artefacts, and permissions are recoverable from logs.
11. As a privacy-conscious user, I want remote APIs off by default.
Acceptance: no remote provider is active until explicitly enabled in config.
12. As a researcher, I want long-context synthesis over many notes and papers.
Acceptance: the retrieval stack can chunk, index, rerank, and build a cited synthesis draft.
13. As a writer, I want Markdown and LaTeX outputs from the same source.
Acceptance: Pandoc export produces target formats with citations intact.[^4]
14. As a developer, I want specialized per-project agents.
Acceptance: agents can be defined per project, similar to OpenCode’s project-scoped agent files.[^14]

### Functional requirements

- FR1: Local model serving via pluggable providers, with Gemma baseline default.[^7][^8]
- FR2: Multi-model router choosing model by scenario, confidence, context size, and eval policy.
- FR3: Explicit agent loop with plan, act, observe, evaluate, reflect stages.[^11][^6]
- FR4: ToolGateway for filesystem, git, tests, linters, notebooks, browser/search, citations, and PDF ingestion.
- FR5: Permission engine controlling tool actions by risk level.
- FR6: Retrieval pipeline for repos, notes, PDFs, and bibliographic metadata.
- FR7: Citation-aware editor with provenance display and export.
- FR8: Offline evaluation harness for code, retrieval, summarization, and citation correctness.[^13][^12]
- FR9: Structured logging, run replay, and artefact registry.
- FR10: Optional remote provider support behind an explicit config boundary.


### Non-functional requirements

- NFR1: Offline-first operation for core tasks including coding, local retrieval, notes, and writing.
- NFR2: Reproducibility through pinned prompts, model IDs, tool versions, seeds, and dataset refs.
- NFR3: Privacy by default with zero outbound network access unless approved per tool/provider.
- NFR4: Traceability for every claim, file edit, and tool action.
- NFR5: Performance target: interactive chat response under 3–8 seconds on the baseline hardware for lightweight tasks, and under 30–90 seconds for repo edits or paper syntheses, with clear progress telemetry.
- NFR6: Reliability target: replay success over 95% for deterministic tool runs in the same environment.
- NFR7: Extensibility through interfaces rather than hard-wired runtime assumptions.


## Contracts and interfaces

### ModelProvider

```ts
interface ModelProvider {
  id: string;                     // e.g. "local.vllm.gemma"
  locality: "local" | "remote";
  models(): Promise<ModelCard[]>;
  chat(req: ChatRequest): Promise<ChatResponse>;
  stream(req: ChatRequest): AsyncIterable<ChatDelta>;
  embed?(req: EmbedRequest): Promise<EmbedResponse>;
  health(): Promise<ProviderHealth>;
}
```

```ts
type ModelCard = {
  model_id: string;
  family: string;
  context_window?: number;
  supports_tools: boolean;
  supports_json_schema?: boolean;
  quantizations?: string[];
  estimated_vram_gb?: { q4?: number; q8?: number; fp16?: number };
  licenses?: string[];
};
```

Why: this mirrors the practical serving shape exposed by OpenAI-style runtimes like vLLM while preserving local/remote distinction.[^2][^8]

### Router

```ts
interface Router {
  route(input: RouteInput): Promise<RouteDecision>;
}
type RouteInput = {
  task_type: "code_edit" | "debug" | "planning" | "math" | "paper_summary" | "scientific_writing" | "long_context_synthesis";
  context_tokens_estimate: number;
  tool_need: "none" | "light" | "heavy";
  latency_budget_ms?: number;
  privacy_mode: "strict_local" | "prefer_local" | "remote_allowed";
  repo_state?: RepoSignals;
  confidence_signals?: Partial<ConfidenceSignals>;
};
type RouteDecision = {
  primary_model: string;
  fallback_models: string[];
  score_breakdown: Record<string, number>;
  rationale: string;
  requires_approval: boolean;
};
```


### ToolGateway

```ts
interface ToolGateway {
  listTools(): Promise<ToolSpec[]>;
  authorize(req: ToolAuthRequest): Promise<ToolAuthDecision>;
  invoke(req: ToolInvokeRequest): Promise<ToolResult>;
  audit(runId: string): Promise<ToolAuditEntry[]>;
}
```

```ts
type ToolSpec = {
  name: string;
  schema: JSONSchema7;
  side_effect_level: "read" | "write" | "exec" | "network" | "privileged";
  sandbox_profile: "readonly" | "workspace" | "container" | "isolated";
};
```

Why: MCP already standardizes tool/context interoperability and should be the interoperability boundary where possible.[^10][^3]

### AgentLoop

```ts
interface AgentLoop {
  run(input: AgentTask): Promise<AgentRun>;
}
type AgentTask = {
  goal: string;
  context_refs: string[];
  constraints: string[];
  max_steps: number;
  approval_mode: "manual" | "policy_auto";
};
type AgentRun = {
  plan: PlanStep[];
  actions: ActionRecord[];
  observations: ObservationRecord[];
  evaluations: EvaluationRecord[];
  reflections: ReflectionRecord[];
  final_output: FinalArtifact[];
};
```

This makes the loop first-class and inspectable, instead of hidden in framework internals.[^11][^6]

## Security and safety

- Permission levels:
    - P0 read-only, file/repo inspection, metadata, citation lookup.
    - P1 workspace-write, patch files inside project root only.
    - P2 controlled exec, tests/linters/notebooks in restricted runtime.
    - P3 network, explicit user approval for any outbound fetch.
    - P4 privileged, package install, system changes, secret access.
This aligns with the need for explicit host-tool boundaries in MCP-style systems and safer software-agent SDK deployments.[^6][^3]
- Sandbox choices:
    - Read-only subprocess for grep/list/read tasks.
    - Workspace-scoped container for test runs, builds, and patch application.
    - Isolated container or microVM for untrusted code, package install, or browser automation.
Trade-off: containers are practical and mature but heavier; restricted subprocess is fast but weaker for isolation; WASM is safer for some tool classes but limited for many real dev workflows.
- Secret handling: mount secrets only into tools that require them, never into the model context; redact from logs; represent them as opaque handles.
- Prompt-injection mitigations: mark retrieved content as untrusted, strip instruction-like segments where possible, segregate “evidence” from “system policy,” and require policy validation before executing retrieved tool suggestions. NeMo Guardrails’ LangGraph integration underscores the value of safety checks over tool invocation and results in multi-agent flows.[^11]


## Observability and reproducibility

- Structured logs per run: prompt hashes, provider/model ID, route decision, tool actions, timings, file diffs, and citation records.
- Trace viewer: visualize each plan/action/observation/eval/reflection step.
- Replay mode: rebuild a run from stored prompts, tool IO, and artefacts, reusing deterministic tool stubs when needed.
- Version tracking: datasets, prompt templates, agent definitions, and eval suites stored in version control.
- Repo-level agent metadata: support project-scoped agent definitions in the spirit of OpenCode’s per-project agents.[^14]


## Success metrics

### Offline eval metrics

- Task success rate on repo edit tasks, measured by tests passing after patch application, following aider-style end-to-end evaluation.[^12][^13]
- Debugging success rate on seeded failing-test tasks.
- Citation correctness rate: proportion of claims linked to the right source item and evidence span.
- Summary faithfulness: judged against source-grounded criteria.
- Tool-call validity: JSON/schema compliance and permission-policy compliance.


### User productivity metrics

- Time-to-solution for common tasks.
- Number of human interventions per completed task.
- Iteration count before acceptable output.
- Diff rejection rate.
- Percentage of tasks completed fully offline.


## Reference architecture

```text
+--------------------------------------------------------------+
| UI Layer                                                     |
| Chat | Workflow Board | File Explorer | Diff Viewer | Notes |
| Paper Reader | Citation Panel | Run Trace | Settings         |
+-----------------------------+--------------------------------+
                              |
                              v
+--------------------------------------------------------------+
| Orchestrator / Agent Manager                                 |
| Session state | Plan/Act/Observe/Evaluate/Reflect loop       |
| Approval checkpoints | Human-in-the-loop controls            |
+-----------------------------+--------------------------------+
                              |
                +-------------+-------------+
                |                           |
                v                           v
+---------------------------+   +-----------------------------+
| Multi-Model Router        |   | ToolGateway                |
| task classifier           |   | MCP adapters               |
| confidence scoring        |   | JSON schema tools          |
| latency/cost/privacy gate |   | policy engine              |
| fallback policy           |   | sandbox runner             |
+-------------+-------------+   | audit log                  |
              |                 +-------------+--------------+
              |                               |
              v                               v
+---------------------------+   +-----------------------------+
| Model Runtimes            |   | Tool Sandboxes             |
| Gemma baseline            |   | FS/git/tests/linters       |
| code-specialist model     |   | notebook runner            |
| long-context model        |   | browser/search             |
| math/reasoning model      |   | PDF/citation tools         |
| optional remote providers |   +-----------------------------+
+-------------+-------------+
              |
              v
+--------------------------------------------------------------+
| Memory & Retrieval                                            |
| short-term working memory | long-term notes | vector index   |
| repo index | paper store | metadata store | reranker         |
+-----------------------------+--------------------------------+
                              |
                              v
+--------------------------------------------------------------+
| Evaluation Harness & Data Stores                             |
| regression suites | benchmark tasks | run registry           |
| prompts | citations | artefacts | dataset/version tracking   |
+--------------------------------------------------------------+
```


### Components

- UI layer: chat plus workflow and file views, because coding and scientific writing both need conversational control and artefact inspection.[^1]
- Orchestrator: the control plane that runs explicit agent stages and approval steps, similar in spirit to software-agent SDKs and graph-based workflows.[^6][^11]
- Router: decides whether Gemma is enough or whether another local model should take the turn.
- Model runtimes: local serving through a common provider shape, ideally OpenAI-compatible for easier integration with tools and clients.[^8]
- ToolGateway: MCP-compatible adapters, policy engine, and audit logger.[^3]
- Memory: short-term run state and long-term note store; vector index optional but useful for papers and large repos.
- Retrieval: parsers for repo files and PDFs, metadata extraction, chunking, indexing, reranking.
- Eval harness: benchmark tasks and regressions modeled after code-edit eval discipline from aider.[^13][^12]
- Data stores: persistent runs, prompts, citations, and artefacts for replay and provenance.


## Multi-model strategy

Because you asked for Gemma 4 specifically: Google provides current official function-calling guidance for Gemma 4, but public search results here more clearly expose detailed function-calling guidance and model recommendations for Gemma 3 and FunctionGemma than a full Gemma 4 sizing matrix. So the safe recommendation is to treat “Gemma 4 baseline” as a configurable default family choice, but to validate exact context windows, quantization behavior, and deployment VRAM experimentally for the specific checkpoint you adopt before production rollout.[^9][^7]

### Capability matrix

| Model family | Best use | Tool support | Serving fit | Trade-offs |
| :-- | :-- | :-- | :-- | :-- |
| Gemma baseline family | Default assistant, planning, general coding, tool-use baseline [^7][^9] | Official function-calling patterns are documented for Gemma, including Gemma 4 guidance [^7][^9] | Good fit behind vLLM/OpenAI-style abstraction if checkpoint/runtime support aligns [^8][^2] | Strong openness and local-first fit, but exact quality/VRAM/context depend on the chosen checkpoint and quantization |
| FunctionGemma | Lightweight agentic tool use [^9] | Specialized for function calling with control tokens [^9] | Good as a routing target for tool-heavy micro-tasks | Small model means lower reasoning/code quality than larger general models |
| Code-specialist local model | Repo edits, debugging, code completion | Varies by checkpoint/runtime | Useful second-line model for code-intensive tasks | Often higher VRAM and integration complexity; licensing must be checked per model |
| Long-context local model | Multi-source synthesis, long papers, large repos | Varies | Needed when retrieval compression is not enough | Long-context models can be slower and more VRAM-hungry |
| Math/reasoning local model | Proofs, derivations, planner sub-agent | Varies | Useful as specialist fallback | May underperform on code editing or tool use |

### Scenario routing table

| Scenario | Recommended model(s) | Why | Cost/latency | Fallback |
| :-- | :-- | :-- | :-- | :-- |
| Repo-level code changes | Gemma baseline first; code-specialist local model second | Gemma handles plan + patch baseline; specialist model can improve edit precision on hard repos [^7][^12] | Moderate to high depending on model size | Gemma baseline with smaller patch scope |
| Debugging failing tests | Code-specialist local model first; Gemma for explanation/reflection | Debugging benefits from tight code-edit loops and test feedback [^12][^13] | Moderate | Gemma plus iterative failing-test summarization |
| Planning multi-step refactors | Gemma baseline or reasoning-strong local model | Planning benefits from structured decomposition more than raw token speed [^6][^11] | Moderate | Gemma with human approval after each milestone |
| Mathematical reasoning / proofs | Reasoning-specialist model | Higher chance of coherent derivation and checker-friendly steps | Higher latency | Gemma plus symbolic/tool assistance |
| Summarising research papers | Gemma baseline for short papers; long-context model for dense/full-paper synthesis | Summarization quality depends heavily on context fit and retrieval quality | Moderate to high | Retrieval-compressed summary with Gemma |
| Drafting scientific writing with citations | Gemma baseline plus citation-aware retrieval | Writing needs style consistency and evidence grounding more than pure code skill | Moderate | Gemma with stricter evidence gating |
| Long-context synthesis across many sources | Long-context model first | Reduced fragmentation and fewer retrieval hops | High | Hierarchical retrieval and map-reduce summarization with Gemma |

### Routing policy proposal

- Default to Gemma for all new sessions in strict-local mode.[^7]
- Compute route score from: task classifier, estimated context length, expected tool density, prior eval results, and available VRAM.
- Confidence signals:
    - low self-consistency across sampled plans,
    - repeated tool-call schema failures,
    - patch application failures,
    - low retrieval coverage,
    - failing citation grounding checks.
- Escalation rules:
    - if code-edit benchmark score for the selected model is below threshold on similar tasks, route to code-specialist local model;
    - if context estimate exceeds safe window, route to long-context model or split task hierarchically;
    - if tool-call schema failures exceed $n$, route to FunctionGemma or a runtime/model pair with stronger structured tool support.[^9][^2]
- Safe fallback:
    - always retain Gemma baseline as the universal fallback,
    - reduce task scope,
    - request approval before switching to a remote provider.


## Tool-calling and sandboxing architecture

### Function schema

Use JSON Schema-based function definitions with strict argument validation, because vLLM documents strict-function schema handling and OpenAI-compatible tool invocation patterns.[^15][^2]

Example tool classes:

- `repo.read_file`, `repo.search`, `repo.apply_patch`
- `git.status`, `git.diff`, `git.commit`
- `ci.run_tests`, `ci.run_linter`, `ci.run_formatter`
- `notebook.execute_cell`
- `papers.ingest_pdf`, `papers.extract_metadata`, `citations.resolve_key`
- `browser.search`, `browser.fetch_page`


### Permission model

- Auto-allow: read-only local inspection.
- Ask-once-per-run: workspace writes and test execution.
- Always-confirm: network access, commits, dependency installation, shell commands outside allowlist.
- Block-by-default: any system-level privileged action.


### Sandboxing trade-offs

| Option | Pros | Cons | Best use |
| :-- | :-- | :-- | :-- |
| Restricted subprocess | Low latency, simple, cheap | Weak isolation, easy to misconfigure | Read-only tools, safe local inspectors |
| Containers | Practical isolation, familiar, good for builds/tests | Overhead, image maintenance | Default for tests, linters, notebooks |
| WASM | Strong isolation for narrow workloads | Limited ecosystem, awkward for real repos | Parsers, deterministic transforms |
| MicroVMs | Stronger isolation than containers | Heavyweight, operationally complex | High-risk code execution |

### Audit and replay

Every tool invocation should store tool name, schema version, auth decision, arguments, stdout/stderr, artefacts, file diffs, and wall-clock timing. This is essential for replayable runs and for post-mortems when an agent made a bad decision.[^3][^6]

## Research and scientific writing workflows

### Ingestion pipeline

1. Import PDFs, URLs, and BibTeX/Zotero items.
2. Extract metadata and text.
3. Chunk by section with page/span provenance.
4. Index locally.
5. Generate summary cards with source-linked evidence.
6. Sync citation keys to Markdown/LaTeX outputs.

This is the practical path to “what was read” transparency and grounded paper notes.[^4]

### Citation workflow

- Zotero remains the reference manager.
- Better BibTeX exports citation keys and bibliography suitable for Pandoc/LaTeX workflows.[^4]
- Draft editor inserts citation placeholders by key.
- Build step renders Markdown → PDF/LaTeX/Docx through Pandoc, with CSL/BibTeX if configured.[^4]


### Provenance rules

- Every factual claim in generated notes stores source item ID and evidence span.
- Quotes are surrounded and labeled explicitly; paraphrases cannot reuse source wording beyond a configurable overlap threshold.
- Summaries show source coverage counts and unresolved claims.


## Implementation plan

### MVP

#### Milestones

- Core desktop/web UI shell.
- Python orchestrator with explicit agent loop.
- Local provider via vLLM-compatible interface.
- Gemma baseline integration.
- ToolGateway with file, git, tests, linters.
- Basic run logs and diff viewer.
- Paper ingestion for PDF text + local note store.
- Markdown writing with BibTeX key insertion.


#### Tasks

- Define interfaces and ADRs.
- Implement provider abstraction and one local runtime path.
- Build route v0: rule-based only.
- Build policy engine with three permission tiers.
- Add offline eval seeds for code-edit and summary tasks.


#### Dependencies

- Local model serving validated.
- Sandboxed execution environment.
- Basic PDF extraction and bibliography parsing.


#### Deliverables

- System spec v1.
- ADRs for provider, router, ToolGateway, sandbox.
- Smoke tests.
- Demo workflows.
- Threat model draft.


#### Evaluation

- Offline code-edit regression on a small repo set.
- Paper-summary faithfulness spot checks.
- User feedback from 3–5 local pilot sessions.


#### Definition of done

- Can inspect repo, propose patch, run tests, and present audited diff fully locally.
- Can ingest a paper and draft a cited Markdown summary locally.


### Beta

#### Milestones

- Multi-model local routing.
- Retrieval index for repos and papers.
- Notebook runner and experiment tracking.
- Citation panel with evidence spans.
- Trace viewer and run replay.
- Per-project agent definitions.


#### Tasks

- Add specialist local models.
- Implement confidence signals and fallback policy.
- Add reranker and chunking improvements.
- Add Pandoc export pipeline.
- Expand eval suites.


#### Deliverables

- Router spec v2.
- Eval dashboards.
- Citation correctness tests.
- Run replay documentation.


#### Evaluation

- Aider-style code-edit benchmark subset.[^12][^13]
- Debugging benchmark with seeded failing tests.
- Citation correctness and provenance completeness.


#### Definition of done

- Router beats Gemma-only baseline on at least two target workloads without violating privacy defaults.
- Replay works for at least 90% of audited runs.


### Production

#### Milestones

- Hardened sandbox profiles.
- Optional remote providers.
- Team features: shared eval packs, exportable run bundles.
- Policy administration UI.
- Long-context synthesis optimizations.


#### Tasks

- Add approval workflows and policy templates.
- Add secure secret broker.
- Add model/eval regression gating in CI.
- Finalize packaging and updates.


#### Deliverables

- Security review.
- Ops runbooks.
- Plugin/MCP integration guide.
- Performance tuning docs.


#### Evaluation

- Longitudinal user productivity study.
- Stability and replay metrics.
- Security incident drills.


#### Definition of done

- Default-local privacy boundary is enforced technically, not just by convention.
- Production release passes regression gates for code, citation, and sandbox policy compliance.


## Repository structure

```text
agentic-workbench/
  apps/
    desktop-ui/
    web-ui/
    ide-extension/
  services/
    orchestrator/
    router/
    tool-gateway/
    retrieval/
    eval-harness/
  libs/
    provider-sdk/
    schemas/
    policy-engine/
    provenance/
    citations/
  runtimes/
    local-vllm/
    optional-remote/
  tools/
    repo-tools/
    git-tools/
    ci-tools/
    notebook-tools/
    paper-tools/
  evals/
    code-edit/
    debug/
    retrieval/
    citation/
    writing/
  docs/
    specs/
    adrs/
    threat-model/
```


## CI/CD and regression strategy

- CI on every PR:
    - interface contract tests,
    - policy-engine tests,
    - deterministic tool tests,
    - small offline eval pack.
- Nightly:
    - code-edit benchmark subset modeled after aider-style end-to-end task success,[^13][^12]
    - retrieval + citation correctness suite,
    - route-quality comparison against Gemma-only baseline.
- Release gate:
    - no regression beyond threshold on task success,
    - no increase in unauthorized tool attempts,
    - replay success above threshold.


## Tech stack options

### Backend

| Option | Pros | Cons | Recommendation |
| :-- | :-- | :-- | :-- |
| Python | Best ML ecosystem, notebooks, evals, PDF tooling, agent SDK fit [^6] | Less ergonomic for rich desktop UI | Best orchestrator/tooling language |
| TypeScript | Great for UI and Electron/Tauri surfaces | Weaker for ML/research plumbing | Best frontend/integration language |
| Hybrid | Strongest fit overall | More complexity, two runtimes | Recommended |

### UI

| Option | Pros | Cons | Recommendation |
| :-- | :-- | :-- | :-- |
| Web app | Easiest iteration, portable | Weaker local integration alone | Good secondary surface |
| Desktop app | Better local FS/process UX, cohesive workspace | Packaging complexity | Recommended primary |
| IDE plugin | Best in-code ergonomics | Narrow for research/writing workflows | Good adjunct, not primary |

### Local model serving

| Option | Pros | Cons | Recommendation |
| :-- | :-- | :-- | :-- |
| vLLM | OpenAI-compatible server, tool-calling docs, strong serving abstraction [^8][^2] | GPU-centric, compatibility varies by model | Recommended main serving path |
| llama.cpp-class runtime | Great quantized local CPU/GPU usability | Different API surfaces, structured tool support varies | Good lightweight fallback |
| Ollama-class wrapper | Simple local UX | Less control in some advanced orchestration cases | Accept as user-friendly optional backend |

Trade-offs: quantization reduces VRAM and can preserve usability on commodity hardware, but may reduce code accuracy or tool-call reliability, so model-specific evals are mandatory before defaulting to a quantized checkpoint.

### Sandbox

| Option | Recommendation |
| :-- | :-- |
| Containers | Default for execution-heavy dev tasks |
| Restricted exec | Default for low-risk local inspectors |
| WASM | Use selectively for parsers/transformers |

### Retrieval

Use local indexing with embeddings plus reranking, but make it modular. Simpler lexical search should remain available for small repos and deterministic citation checks. Trade-off: embeddings improve recall on semantic queries but add model/runtime overhead and can obscure why a source was retrieved.

### Writing pipeline

Markdown as the editing substrate, LaTeX as optional target, Pandoc for conversion, Zotero + Better BibTeX for references, CSL where needed for style rendering. Trade-off: this is robust and researcher-friendly, but the Pandoc/Zotero toolchain adds setup complexity.[^4]

## Tooling checklist

### Agentic dev

- [ ] File read/search/apply patch
- [ ] Git status/diff/commit
- [ ] Test runner
- [ ] Linter
- [ ] Formatter
- [ ] Static analysis
- [ ] Dependency inspector
- [ ] Repo indexer


### ML/LLM experimentation

- [ ] Notebook executor
- [ ] Dataset registry
- [ ] Prompt/version tracker
- [ ] Eval harness
- [ ] Metrics logger
- [ ] Model registry
- [ ] Reproducible run config


### Deep research and scientific writing

- [ ] PDF ingestion
- [ ] Metadata extraction
- [ ] Citation resolver
- [ ] Zotero/Better BibTeX sync[^4]
- [ ] Markdown editor with citations
- [ ] LaTeX/Pandoc export[^4]
- [ ] Source evidence panel
- [ ] Quote/paraphrase boundary checker


### Observability

- [ ] Run registry
- [ ] Trace viewer
- [ ] Audit logs
- [ ] Artefact store
- [ ] Replay engine
- [ ] Route decision logs


## Recommended concrete stack

- Orchestrator: Python.
- UI: desktop-first TypeScript app, with optional browser UI.
- Provider layer: OpenAI-compatible abstraction, local runtime first through vLLM.[^8]
- Default baseline model: Gemma family checkpoint selected and validated for your hardware; keep this configurable because exact Gemma 4 deployment characteristics need checkpoint-specific validation.[^9][^7]
- Specialist models: one code-focused local model, one long-context local model, one reasoning-focused local model.
- Tool protocol: MCP-compatible ToolGateway.[^10][^3]
- Evals: aider-style code-edit tasks plus citation and summary faithfulness suites.[^12][^13]
- Writing: Zotero + Better BibTeX + Pandoc + Markdown/LaTeX.[^4]


## Key trade-offs

- Gemma-first default improves openness, privacy alignment, and architectural simplicity, but a single model will not be best at every task, especially high-difficulty code editing or very long-context synthesis.[^7][^9][^12]
- Multi-model routing improves quality and robustness, but increases VRAM pressure, operational complexity, and evaluation burden.
- Strict local-first privacy reduces leakage risk and variable API cost, but sacrifices access to some frontier remote models unless you explicitly permit them.
- Containers are the best practical sandbox default, but they add startup latency and packaging overhead.
- Citation-aware research flows greatly improve trust, but require disciplined provenance storage and more UI complexity.

If you want, I can turn this into a next-step engineering package with:

1. ADRs,
2. JSON schemas for all interfaces,
3. a monorepo bootstrap,
4. or a concrete hardware-to-model sizing recommendation for your machine.
<span style="display:none">[^16][^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30]</span>

<div align="center">⁂</div>

[^1]: https://opencode.ai/docs/

[^2]: https://docs.vllm.ai/en/latest/features/tool_calling/

[^3]: https://modelcontextprotocol.io/specification/2025-03-26

[^4]: https://retorque.re/zotero-better-bibtex/exporting/pandoc/index.html

[^5]: https://aider.chat/docs/

[^6]: https://docs.openhands.dev/sdk

[^7]: https://ai.google.dev/gemma/docs/capabilities/text/function-calling-gemma4

[^8]: https://docs.vllm.ai/en/stable/serving/openai_compatible_server/

[^9]: https://ai.google.dev/gemma/docs/capabilities/function-calling

[^10]: https://modelcontextprotocol.io/docs/getting-started/intro

[^11]: https://docs.nvidia.com/nemo/guardrails/0.18.0/user-guides/langchain/langgraph-integration.html

[^12]: https://aider.chat/docs/benchmarks.html

[^13]: https://aider.chat/docs/benchmarks-1106.html

[^14]: https://opencode.ai/docs/agents/

[^15]: https://docs.vllm.ai/en/v0.8.5/getting_started/examples/openai_chat_completion_client_with_tools.html

[^16]: https://opencode.ai

[^17]: https://github.com/opencode-ai/opencode

[^18]: https://opencode.ai/docs/github/

[^19]: https://github.com/github/awesome-copilot/blob/main/docs/README.agents.md

[^20]: https://github.com/awesome-opencode/awesome-opencode

[^21]: https://techcommunity.microsoft.com/blog/educatordeveloperblog/agentic-code-fixing-with-github-copilot-sdk-and-foundry-local/4493967

[^22]: https://github.com/vllm-project/vllm/issues/16340

[^23]: https://nm-vllm.readthedocs.io/en/0.4.0/serving/openai_compatible_server.html

[^24]: https://forums.zotero.org/discussion/108968/pandoc-citation-format-as-a-citation-style-with-betterbibtex

[^25]: https://github.com/vllm-project/vllm/issues/1869

[^26]: https://github.com/aider-ai/aider

[^27]: https://aider.chat/docs/leaderboards/

[^28]: https://aider.chat/HISTORY.html

[^29]: https://openhands.dev

[^30]: https://dev.to/sidkul2000/production-ready-multi-agent-systems-with-langgraph-a-complete-tutorial-20j1

