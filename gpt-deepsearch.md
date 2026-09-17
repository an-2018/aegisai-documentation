# Local-first agentic dev + research environment with Gemma 4 baseline

## Executive summary

- Build a local-first “agentic dev + research environment” that combines an OpenCode-like coding agent UX with reproducible tool execution, multi-model routing, and a CS-focused research/writing workstation (PDF → notes → citations → LaTeX/Markdown outputs). citeturn10search10turn10search3turn7search6turn7search1  
- Default baseline model family: **Gemma 4** (Apache 2.0; native function calling; long-context up to 128K/256K depending on size; published inference memory guidance). citeturn19view0turn11view1turn11view0  
- Multi-model orchestration is a first-class design: route by task type (coding vs reasoning vs summarisation), context length, and tool-calling reliability; use eval-driven gates and fallbacks (RouteLLM/FrugalGPT-style cascades + bandit/uncertainty signals). citeturn4search0turn4search10turn4search4turn4search2  
- Tool calling should be represented with explicit JSON Schema contracts and executed through a **ToolGateway** that enforces permissions, sandboxing, audit logs, and replay. (OpenAI’s tool-calling loop is a good reference flow; MCP is a widely adopted open standard for exposing tools/resources.) citeturn5search1turn5search20turn5search0  
- Prefer **MCP** for third-party/local tool integrations (papers, search, repos, databases) because it standardises the “tool server ↔ client” boundary and schemas; keep a minimal internal tool API for core primitives (file ops, git, tests) so the system can run fully offline. citeturn5search20turn5search0  
- Run tools in a hardened sandbox by default: containerised/project-jail execution with a defence-in-depth option (e.g., gVisor, nsjail). Containers alone often share the host kernel; gVisor and nsjail add stronger isolation layers. citeturn5search18turn5search2turn5search3turn5search14  
- Agent loop should be explicit (plan → act → observe → evaluate → reflect) with stepwise traces and reflection hooks; this matches common agent workflow decompositions (Thought/Action/Observation) and “reflection agent” patterns. citeturn1search19turn1search23  
- Local model serving should support at least two runtime classes: (a) GPU-optimised OpenAI-compatible servers for tool calling (e.g., vLLM), and (b) CPU/edge-friendly runtimes with quantisation (e.g., llama.cpp/GGUF, Ollama/LM Studio wrappers). citeturn9search1turn9search0turn9search2turn9search3turn9search18  
- Expect “tool calling reliability” variance across open models; some require model-specific parsers/templates. Example: Gemma 4 has a dedicated tool-call protocol; Qwen coder variants have known parser/prompt-template mismatches in some servers, requiring custom parser plugins or templates. citeturn2search28turn15search2turn15search23  
- Codifying evaluation is non-negotiable: integrate repo regression tests + coding-agent benchmarks (SWE-bench Verified / containerised harness) into your CI. citeturn1search8turn1search0turn1search9  
- Scientific writing workflow should be built around: (1) local PDF parsing and citation extraction (GROBID), (2) citation management with Zotero + Better BibTeX auto-export, and (3) LaTeX/Markdown rendering with Pandoc + citeproc + latexmk. citeturn7search6turn7search0turn7search1turn8search2  
- Observability + reproducibility: use OpenTelemetry traces/logs (run-level IDs, tool spans, model spans) and persist “runs” + artifacts; for ML experiments/logging consider MLflow locally. citeturn6search1turn6search19turn6search3  
- Key risks: (1) prompt injection leading to unsafe tool execution, (2) model regressions breaking tool/schema adherence, (3) sandbox escape/over-permissive file/network access, (4) citation hallucinations in research writing without provenance controls. Mitigate with OWASP LLM risk guidance, least-privilege tools, gated approvals, and strict provenance records. citeturn6search0turn6search4  
- Assumptions (since constraints were not provided): target Linux + macOS first (Windows via WSL2), single-developer workstation tiers (CPU-only; 12–24GB VRAM; 48–80GB VRAM), backend primarily Python with a TypeScript UI, and a desktop+web hybrid UI with an optional IDE plugin. (Mark these as adjustable design parameters.)

## DeepSearch evidence base

**Evidence scope & prioritisation:** the items below are weighted toward official docs/repos and peer-reviewed papers; blogs are used only where they add implementation detail or cautionary trade-offs.

### Local agentic dev environments and OpenCode-like tools

entity["organization","OpenCode","opencode.ai coding agent"] is an open-source coding agent with multiple frontends (TUI/CLI/web/desktop) and a provider abstraction built on the AI SDK and Models.dev; its docs explicitly describe provider configuration, agent configuration, tool permissions, snapshots, and MCP server configuration. citeturn10search10turn10search2turn18view0  
Key design primitives worth copying into our system spec (because they map cleanly to local-first agent safety + usability):  
- **Configurable agents** (specialised prompts/models/tools per agent) and a “plan agent” concept for non-modifying analysis. citeturn10search3turn18view0  
- **Explicit permissions** per tool (e.g., set `edit`/`bash` to “ask”) and a clear permission config surface. citeturn18view0  
- **Snapshots** to track/undo file changes, with trade-offs for large repos (slow indexing, disk usage). citeturn18view0  
- **MCP server integration** in config. citeturn18view0  

entity["organization","Continue","continue.dev coding agent"] is a widely used open-source IDE agent/assistant that supports multiple “model providers” and explicitly encourages using different models for different tasks/features (chat/edit/autocomplete/embeddings), including local runners like Ollama and LM Studio. citeturn1search10turn1search6turn21view0  

entity["organization","OpenHands","openhands.dev coding agents"] is an open platform for coding agents with a “secure, sandboxed runtime you control” and self-hosting via isolated Docker/Kubernetes environments. Its repo describes multiple entrypoints (SDK/CLI/local GUI) and licensing boundaries (core MIT; enterprise directory separately licensed). citeturn0search5turn20view0  

entity["organization","SWE-agent","princeton nlp coding agent"] is an open-source agent that fixes GitHub issues and runs execution in a Docker sandbox (explicit in its “Hello world” docs), and it commonly appears as an evaluation harness in the SWE-bench ecosystem. citeturn1search9turn1search8  

entity["organization","SWE-bench","software engineering benchmark"] is a benchmark for real-world GitHub issues; the “Verified” split is a human-filtered subset (500 instances) designed to improve reliability of evaluation. citeturn1search8turn1search0turn1search24  

**Trade-offs surfaced by the evidence (and relevant to our spec):**  
- OpenCode/OpenHands-like agents trend toward broad tool access; their docs emphasise permissions/sandboxing/snapshots, underscoring that “agent power” must be balanced by isolation and reversibility. citeturn18view0turn20view0  
- SWE-bench-style evaluation is containerised for reproducibility; this pushes you toward container-based tool execution even in a “local desktop” UX. citeturn1search8turn1search9  

### Gemma 4 and other open(-weight) models for agentic tasks

Gemma 4 is documented as Apache 2.0 licensed with native function-calling support and long context (up to 128K for small models; 256K for larger). The official docs supply approximate inference memory requirements by model size and quantisation. citeturn19view0turn11view0turn11view1  
vLLM’s Gemma 4 recipe documents model-specific tool-call parsing and “thinking/reasoning mode” support via an OpenAI-compatible server interface. citeturn11view3turn2search28  

For coding-centric open models, Qwen families are well documented:  
- Qwen2.5-Coder instruct variants are Apache 2.0 licensed and advertise long context up to 131,072 tokens. citeturn14view0  
- Qwen3-Coder-Next advertises agentic coding focus, tool calling examples, Apache 2.0 licensing, and 256K context, plus explicit instructions for serving with vLLM/SGLang tool-call parsers. citeturn16view0  

For long-context + general reasoning, Llama 3.1 model cards document 128K context and note the community license (not OSI/Apache). citeturn13view3turn13view2  
For a permissive open-weight MoE, Mixtral 8x22B docs state Apache 2.0 licensing, 64K context, and provide approximate GPU RAM guidance (bf16 vs fp4). citeturn12view1turn3search11  

DeepSeek R1 distill models focus on reasoning; the model card provides context length for the base R1 (128K), local serving notes, licence (MIT for R1 series), and usage recommendations (e.g., temperature guidance and prompting patterns). citeturn17view0  

**Model capability matrix (agentic-relevant constraints)**  
Notes: “Weights VRAM” is **weights-only** unless stated; KV-cache for long contexts can dominate at 128K–256K, so planning must include both. Where official memory tables exist, they are preferred; otherwise numbers are approximate.

| Model (family / checkpoint) | Licence | Context length (documented) | Tool calling / function calling | Typical local fit & weights VRAM | Strengths relevant to this project | Major trade-offs |
|---|---|---:|---|---|---|---|
| Gemma 4 (E2B/E4B/26B-A4B/31B) | Apache 2.0 citeturn19view0 | Up to 128K (E2B/E4B) and 256K (26B-A4B/31B) citeturn11view1turn19view0 | Native function calling; vLLM has Gemma 4 tool-call parser/protocol support citeturn11view1turn2search28turn11view3 | Official inference memory guidance: E2B Q4_0 ~3.2GB, E4B Q4_0 ~5GB; 31B Q4_0 ~17.4GB; 26B-A4B Q4_0 ~15.6GB citeturn11view0 | Baseline “general agentic model”: long-context, reasoning mode, coding + tool use; scalable sizes (laptop → workstation). citeturn19view0turn11view0 | Long-context KV-cache costs can be high; MoE model still requires loading total weights; tool calling uses a custom protocol so runtimes/parsers must match. citeturn11view0turn2search28 |
| Qwen2.5-Coder-32B-Instruct | Apache 2.0 citeturn14view0 | “Full 131,072 tokens” citeturn14view0 | Tool calling support exists in Qwen ecosystem, but coder variants may require correct template/parser (known vLLM parsing mismatch; custom parser plugins exist) citeturn15search2turn15search23turn15search6 | Approx weights-only: ~65GB bf16; ~16GB 4-bit (estimate from params), plus KV cache | Strong code generation/repair; long context; Apache licence makes redistribution simpler than Llama-family restrictions. citeturn14view0turn2search7 | Tool calling can be brittle without model-specific integration; serving stacks may need plugins/templates; 32B class can be slow on small GPUs. citeturn15search2turn15search23 |
| Qwen3-Coder-Next (80B total / 3B active MoE) | Apache 2.0 citeturn16view0 | 262,144 tokens native citeturn16view0 | Explicit tool calling examples; vLLM/SGLang tool-call parser required per docs citeturn16view0turn15search7 | Heavy: total weights must be loaded despite 3B active (expect multi-GPU or high VRAM); docs recommend reducing context if OOM citeturn16view0 | “Best effort local” for long-horizon agentic coding + recovery from execution failures (as positioned by authors). citeturn16view0turn15search26 | Complexity: MoE runtime requirements, tool-call parser versions, and long-context memory pressure. citeturn16view0turn15search10 |
| Llama 3.1 (8B/70B/405B) | Llama 3.1 Community License (custom) citeturn13view3 | 128K citeturn13view3turn13view2 | Tool usage capabilities described; newer Llama versions document tool-calling formats citeturn13view2turn13view0 | Range: 8B fits widely; 70B needs large VRAM even quantised | Solid general model family; strong ecosystem support and long context. citeturn13view2 | Licensing is not Apache/OSI; larger models are expensive locally; tool-calling formats vary by version and require prompt discipline. citeturn13view3turn13view0 |
| Mixtral 8x22B | Apache 2.0 citeturn12view1turn3search11 | 64K citeturn12view1 | (Varies by serving stack; not universally “native tool calling”) | Docs: ≈ GPU RAM bf16 ~283GB; fp4 ~71GB citeturn12view1 | High capability in an open licence; long context; MoE efficiency. citeturn12view1turn3search11 | Too large for most single-workstation setups; operational complexity; not the best “default baseline.” citeturn12view1 |
| DeepSeek-R1-Distill-Qwen-32B | MIT (with derived-base licence notes) citeturn17view0 | R1 is 128K; distill models inherit base-model serving style; local serving examples provided citeturn17view0 | Tool calling support is inconsistent in practice across stacks; some systems mark models as not supporting function calling citeturn1search13turn2search5 | Similar footprint to other 32B dense models | Strong reasoning focus; explicit usage recommendations; good candidate for “math/proofs” and difficult debugging/planning. citeturn17view0 | Prompting constraints (e.g., temperature range, system prompt avoidance) and tool-calling uncertainty complicate agent integration. citeturn17view0turn2search5 |

### Multi-model routing patterns and fallback strategies

Well-studied routing patterns that map cleanly to multi-model local-first orchestration include:  
- **Cascades / “escalate to stronger model only if needed”** (FrugalGPT’s LLM cascade concept). citeturn4search0turn4search27  
- **Preference-trained routers** that learn when to call strong vs weak models (RouteLLM); the RouteLLM repo provides calibration tooling for thresholds. citeturn4search10turn4search14  
- **Contextual bandit routing** for online adaptation when only chosen-model feedback is observed; recent work frames routing as contextual bandits and evaluates on RouterBench. citeturn4search4turn4search32  
- **Confidence estimation / confidence tokens** to inform escalation/deferral decisions without always calling the strongest model. citeturn4search2turn4search5  

**Trade-offs:**  
- Cascades save cost/latency on “easy” prompts but introduce extra routing steps and potentially multi-round calls for hard prompts. citeturn4search0turn4search30  
- Learned routers require training/eval data and can drift when the model pool changes; bandit approaches handle non-stationarity but need careful exploration budgets. citeturn4search4turn4academia38  
- Confidence methods can be model-specific and imperfect; they should be combined with hard signals (tests passing, schema validation) for agentic dev. citeturn4search2turn4search5  

### Tool-calling and sandboxing architectures

Tool calling is typically a multi-step conversation loop: send tools → model emits tool call → executor runs tool → feed tool result → model continues (OpenAI’s docs lay out this archetype clearly). citeturn5search1  
For an open standard tool boundary, MCP specifies how servers expose tools with schemas and how clients invoke them. citeturn5search20turn5search0  

For sandboxing untrusted code/actions:  
- gVisor provides a sandbox that intercepts syscalls via a “Sentry” (userspace kernel) and reduces host kernel exposure. citeturn5search2turn5search18turn5search6  
- nsjail combines namespaces, cgroups, rlimits, and seccomp-bpf syscall filters for lightweight process isolation. citeturn5search3  
- For high-risk multi-tenant execution, Google’s GKE Sandbox conceptually frames gVisor as “an extra layer of security to prevent untrusted code from affecting the host kernel.” citeturn5search14  

Prompt injection and “insecure output handling” are widely listed as top LLM application risks; OWASP’s LLM Top 10 provides defence-in-depth mitigations (constrain behaviour, validate outputs, enforce least privilege, require human approval for high-risk actions). citeturn6search0turn6search4  

### Research and scientific writing workflows for computer science

For local PDF ingestion + citation extraction, GROBID is a well-known open-source library for extracting/structuring scientific PDFs into TEI/XML, with explicit focus on technical/scientific publications. citeturn7search6turn7search10  
For bibliographic management in text-based pipelines, Better BibTeX (BBT) integrates with Zotero and supports “keep updated” automatic export to update `.bib` files when collections change. citeturn7search8turn7search0turn8search31  
For document generation, Pandoc converts between Markdown/LaTeX and can generate PDF; citation rendering is a core part of its ecosystem (citeproc/CSL flows are widely referenced in Pandoc documentation and related tooling). citeturn7search1turn7search9  
For LaTeX builds, latexmk is a long-established tool that automates LaTeX compilation by managing dependencies and required runs. citeturn8search2turn8search14  
For scholarly metadata enrichment, Semantic Scholar’s Academic Graph API provides paper/author/citation metadata; OpenAlex provides a large open catalogue via REST API; arXiv offers APIs and OAI-PMH for metadata harvesting. citeturn7search3turn8search0turn8search1turn8search9  

## Spec-driven system spec

**System name (working):** *Local Agentic Dev + Research Environment (LADRE)*

### Problem statement and non-goals

**Problem statement**  
Build a privacy-preserving, local-first environment that supports:  
- agentic software development over real repositories (plan → act → observe → evaluate → reflect),  
- multi-model selection and orchestration,  
- tool calling through a secure tool gateway with sandboxed execution,  
- ML/LLM experimentation + CS research writing with citations and provenance.

**Non-goals (explicit)**  
- Not a hosted SaaS by default (remote is optional add-on only).  
- Not a full replacement for IDEs; instead, provide an IDE plugin (optional) and a standalone UI that can operate on repos.  
- Not a “generic internet research agent”: web/search tools exist but are opt-in, permissioned, and provenance-logged.  
- Not an always-autonomous agent: default mode is “reviewable autonomy” with human checkpoints for risky actions (writes, deletes, network).

### Primary personas

- **Local developer**: wants repo changes, faster debugging, automated refactors, tests/linters run locally, minimal data egress. (Comparable to OpenCode/Continue UX expectations.) citeturn10search10turn21view0  
- **ML/LLM researcher**: runs local model experiments, eval harnesses (SWE-bench/regressions), prompt/version tracking, reproducible runs. citeturn1search8turn6search3  
- **Scientific writer (CS)**: ingests papers, summarises with citations, manages BibTeX/CSL, compiles LaTeX/Markdown into PDF, and needs “what was read” transparency. citeturn7search6turn7search0turn7search1turn8search2  

### User stories with acceptance criteria

1) **Repo-level task planning (read-only)**  
- *Story:* As a developer, I ask the agent to propose a plan for a feature/refactor without changing code.  
- *Acceptance:* Agent produces a structured plan, references relevant files, and emits zero write/edit tool calls.

2) **Implement feature behind a flag**  
- *Story:* As a developer, I ask the agent to implement a change and add tests.  
- *Acceptance:* PR-style diff created; tests added; local test suite runs; all tool actions logged with run replay.

3) **Debug failing tests**  
- *Story:* As a developer, I give failing test output; agent iterates with tool usage.  
- *Acceptance:* Agent reproduces failure via test runner tool, proposes fix, re-runs tests, and reports green run or explains remaining failures.

4) **Safe file operations**  
- *Story:* As a developer, I allow read tools always, but require approval for writes/deletes.  
- *Acceptance:* ToolGateway blocks writes without explicit approval; approval decision is logged and replayable.

5) **Model switching per task**  
- *Story:* As a developer, I want autocomplete on a small fast model but refactor planning on a stronger one.  
- *Acceptance:* Router selects different models per “task class”; the chosen model and rationale/confidence are recorded.

6) **Offline-first operation**  
- *Story:* As a user, I run everything with no internet connection.  
- *Acceptance:* System runs local models/tools end-to-end; attempts to call network tools are blocked unless enabled.

7) **Optional remote provider add-on**  
- *Story:* As a team, we optionally add cloud APIs for specific workloads.  
- *Acceptance:* Remote providers are disabled by default; enabling requires explicit config; all remote calls are labelled “remote” in logs.

8) **Paper ingestion to structured notes**  
- *Story:* As a researcher, I drop a PDF and receive a structured summary with extracted bibliography.  
- *Acceptance:* GROBID (or equivalent) yields structured metadata; summary includes quote boundaries and citations mapped to extracted references. citeturn7search6turn7search10  

9) **Citation manager export**  
- *Story:* As a writer, my Zotero collection auto-exports a `.bib` file into the project.  
- *Acceptance:* Auto-export “keep updated” works; changes in collection update the `.bib` automatically. citeturn7search0turn7search8  

10) **Markdown/LaTeX build pipeline**  
- *Story:* As a writer, I compile from Markdown/LaTeX to PDF.  
- *Acceptance:* Pandoc/latexmk tool runs in sandbox; build logs/artifacts saved; failures are diagnosable. citeturn7search1turn8search2  

11) **Run-level provenance**  
- *Story:* As a reviewer, I can see exactly which files, commands, and sources were used to generate an answer.  
- *Acceptance:* UI shows “what was read” (file paths + hashes + tool outputs); citations link to stored excerpts.

12) **Reproducible eval regression**  
- *Story:* As a maintainer, I run nightly evals and detect regressions in model routing or tool reliability.  
- *Acceptance:* Fixed eval set + harness executes containerised; results compared to baseline; regressions trigger CI failure. citeturn1search8turn6search2  

### Functional requirements and non-functional requirements

**Functional requirements (FRs)**  
FR-1 Local model inference using Gemma 4 baseline with configurable sizes/quantisation. citeturn11view0turn19view0  
FR-2 Multi-model registry and routing (per request and per step).  
FR-3 Agent loop engine supporting plan/act/observe/evaluate/reflect with tool calls. citeturn1search19turn1search23  
FR-4 ToolGateway for file ops, git, tests, linters/formatters, notebook execution, retrieval/search, and citation management.  
FR-5 Sandboxed execution with permission policy and audit logs. citeturn5search3turn5search18turn6search4  
FR-6 Retrieval pipeline for repos and papers (local indexing; optional embeddings/vector store).  
FR-7 CS research writing pipeline: PDF ingest → summary → BibTeX/CSL → Markdown/LaTeX → PDF. citeturn7search6turn7search0turn7search1turn8search2  
FR-8 Evaluation harness integration (SWE-bench style; repo regressions). citeturn1search8turn1search0  

**Non-functional requirements (NFRs)**  
NFR-1 **Local-first privacy:** no network calls by default; remote providers hard-separated behind config and UI indicators.  
NFR-2 **Reproducibility:** every run stores (git commit, environment/sandbox image, model version + quantisation, prompts, tool traces). Use containerised pipelines where possible. citeturn6search2turn1search8  
NFR-3 **Traceability:** end-to-end trace spans across model calls and tool calls; exportable to local trace viewer (OpenTelemetry). citeturn6search1turn6search19  
NFR-4 **Performance targets (adjustable assumptions):**  
- Local UI interaction latency: <150ms for non-inference operations.  
- Router overhead: <10ms CPU per decision (rule-based path).  
- Tool execution overhead: sandbox start <500ms warm / <2s cold (container-backed).  
- Streamed model output with backpressure and cancellation.

NFR-5 **Offline evaluation:** all core evals runnable without internet; datasets vendored or mirrored locally.  
NFR-6 **Security:** least privilege tools + approval gates; prompt injection resilience. citeturn6search0turn6search4  

### Contracts and interfaces

Below are spec-level contracts (JSON-like schemas). These are not tied to a specific implementation language; they define **wire formats** between components.

**ModelProvider interface (local + optional remote)**  
- `list_models() -> [ModelDescriptor]`  
- `generate(request: ModelRequest) -> ModelResponse (streamable)`  
- `supports(capability: Capability) -> bool`

ModelDescriptor (schema-level fields):  
- `model_id: string`  
- `family: string` (e.g., "gemma4", "qwen2.5-coder")  
- `license: {name: string, url: string}`  
- `context_window_tokens: int` citeturn11view1turn14view0turn16view0turn13view3  
- `tool_calling: {mode: "native"|"prompted"|"unsupported", notes: string}` citeturn2search28turn15search2turn1search13  
- `quantisations: [string]` (e.g., "bf16", "int8", "q4") with VRAM guidance if available. citeturn11view0turn9search7  
- `runtime_backends: [string]` (e.g., "vllm", "ollama", "llama.cpp") citeturn9search1turn9search2turn9search0  
- `local_first: bool` (true for local providers)

**Router interface**  
- `route(input: RouteInput) -> RouteDecision`  
- `calibrate(eval_results) -> RouterParams` (optional; for learned routers or threshold tuning) citeturn4search14  

RouteInput:  
- `task_type: enum` (code_edit, debug, plan, math, summarise_paper, write_with_citations, long_synthesis)  
- `needs_tool_calls: bool`  
- `context_tokens_estimate: int`  
- `repo_size_hint: {files:int, bytes:int}`  
- `risk_level: enum` (low, medium, high)  
- `constraints: {offline_only: bool, max_vram_gb?: float, allow_remote: bool}`  

RouteDecision:  
- `primary_model_id: string`  
- `fallback_chain: [string]`  
- `confidence: float (0..1)` (router confidence, not model self-confidence) citeturn4search2turn4search5  
- `rationale: string`  
- `cost_estimate: {latency_ms?: int, vram_gb?: float}`  
- `gates: {requires_tests_pass: bool, requires_schema_valid: bool, requires_user_approval: bool}`  

**ToolGateway interface**  
- `list_tools() -> [ToolSpec]`  
- `invoke(tool_name, args, call_context) -> ToolResult`  
- `policy_check(tool_name, args, call_context) -> PermitDecision`  
- `audit(event) -> void` (append-only)

ToolSpec:  
- `name: string`  
- `description: string`  
- `input_schema: JSONSchema` (draft-2020-12 compatible)  
- `output_schema: JSONSchema`  
- `permissions: {default: "allow"|"ask"|"deny", risk: "low"|"medium"|"high"}`  
- `sandbox_profile: string` (e.g., “repo-jail-no-net”, “latex-build”, “python-notebook”) citeturn5search3turn5search18  

ToolResult:  
- `status: "ok"|"error"`  
- `stdout/stderr: string (optional)`  
- `artifacts: [{path, hash, mime, size}]`  
- `provenance: {inputs_hashed, outputs_hashed}`  

**AgentLoop interface**  
Agent loops are state machines over a run:

- States: `PLAN -> ACT -> OBSERVE -> EVALUATE -> REFLECT -> (repeat or STOP)` citeturn1search19turn1search23  
- `step(input: AgentStepInput) -> AgentStepOutput`  
- `stop_condition` includes: “tests green”, “no pending actions”, “risk exceeded”, “user stop”.

AgentStepOutput includes:  
- `messages_delta`  
- `tool_calls: [PlannedToolCall]` (before execution)  
- `evaluation: {tests_passed?: bool, lint_passed?: bool, schema_valid?: bool}`  
- `reflection: {what_worked, what_failed, next_plan}`  

### Security and safety

**Permission levels (tooling)**  
- L0: Read-only context tools (read file, search index, view diffs).  
- L1: Compute without side effects (parse, summarise, static analysis).  
- L2: Local repo mutation (write/edit) — **ask by default**.  
- L3: Arbitrary command execution (bash, package install) — **ask + sandbox + allowlist**.  
- L4: Network egress (web/search, API calls) — **deny by default**; allow with scope.  
- L5: Credentials/secrets access — **deny by default**; only via secret broker; never exposed to LLM.

**Prompt injection mitigations (defence in depth)**  
- Treat all retrieved text/tool outputs as untrusted; constrain agent instructions and validate outputs, per OWASP prompt injection and insecure output handling guidance. citeturn6search0turn6search4  
- Enforce least privilege by routing tool invocations through ToolGateway policy checks (no direct model→shell). citeturn6search4  
- Require human approval for high-risk actions (filesystem writes beyond repo, deletes, network, secret usage). citeturn6search4  

**Sandbox expectations**  
- Default: project-scoped filesystem view, no network, CPU/mem limits, syscall filtering (where available). nsjail provides a concrete implementation pattern for namespaces/cgroups/seccomp. citeturn5search3  
- Defence-in-depth option: gVisor for container sandboxing to reduce host kernel exposure. citeturn5search18turn5search6  

### Observability and reproducibility

- Use OpenTelemetry trace concepts: each **Run** is a trace; each model call and tool invocation is a span; store correlated logs. citeturn6search1turn6search19  
- Persist: prompts, model IDs/versions, router decision, tool inputs/outputs, artifacts, git state (commit/dirty diff), sandbox image hashes. (Containerisation improves variance control.) citeturn6search2turn1search8  
- For ML experimentation tracking and comparison, MLflow Tracking provides a local API/UI for logging parameters, code versions, metrics, and artifacts. citeturn6search3turn6search13  

### Success metrics

**Offline evaluation metrics**  
- Task success rate (issue resolved; tests pass; lint pass).  
- SWE-bench Verified pass rate for coding agent configurations. citeturn1search0turn1search8  
- Tool-call correctness: schema-valid tool calls (JSON schema adherence) and correct argument grounding (no hallucinated parameters). citeturn5search1turn5search0  
- Citation correctness for research outputs: fraction of claims linked to a source excerpt; “quote boundary” correctness.

**User productivity metrics**  
- Time-to-first-green-test for bugfix tasks.  
- Iteration count (plan/act cycles) to resolve.  
- Human approvals per task (should fall over time with trust + safe defaults).  

## Reference architecture

Text diagram (logical components and data flows):

```
[UI: Chat + Workflows + File Explorer + Citations]
          |
          v
[Orchestrator / Agent Manager] <-------------------------------+
  |        |            |                                      |
  |        |            +--> [Run Registry + Trace Store] <----+
  |        |                      |
  |        |                      v
  |        +--> [Router] --> [Model Provider(s)]
  |                         (Local runtimes; optional remote)
  |
  +--> [ToolGateway + Policy Engine + Sandbox Runner]
          |                |
          |                v
          |          [Sandbox Backends]
          |          (containers / nsjail / gVisor)
          |
          +--> [Retrieval + Indexing Pipeline]
                |           |
                v           v
        [Repo Index]   [Paper Library]
        (code, docs)   (PDFs, TEI, Bib)
```

Component responsibilities (mapped to requirements and evidence):

**UI layer**  
- Chat + task board (“runs”), diff viewer, file explorer, tool call inspector, citation panel.  
- Must support “approve/deny tool” prompts, similar to permission models seen in agentic dev tools. citeturn18view0  

**Orchestrator (agent manager)**  
- Implements agent loop state machine: plan/act/observe/evaluate/reflect. citeturn1search19turn1search23  
- Owns run lifecycle: start, pause awaiting approval, resume, stop, replay.

**Router (multi-model selection)**  
- Uses rules + evaluation-driven thresholds (RouteLLM-style calibration) and supports cascades (FrugalGPT). citeturn4search14turn4search0  
- Emits RouteDecision with confidence, fallbacks, and policy gates.

**Model runtimes**  
- Primary serving: entity["organization","vLLM","openai compatible llm server"] for GPU-backed OpenAI-compatible serving and tool calling flags. citeturn9search1turn9search5turn11view3  
- Secondary serving: entity["organization","Ollama","local model server"] API server (simple local serving) and entity["organization","LM Studio","local llm server"] OpenAI-compatible server for desktop workflows. citeturn9search2turn9search3turn9search6  
- CPU/quantised fallback: entity["organization","llama.cpp","gguf inference engine"] with GGUF quantisation to reduce size/speed up inference (with possible accuracy loss). citeturn9search7turn9search18turn9search0  

**Tool gateway (sandbox + permission policy engine)**  
- Owns: schema validation, permission gating, sandbox selection, execution, capture outputs, and audit logs.  
- Should support MCP tool servers as an integration mechanism. citeturn5search20turn5search0  

**Memory and retrieval**  
- Short-term: conversation + working set (files opened, diffs, recent tool outputs).  
- Long-term: structured notes (paper summaries, design decisions) with citations and “what was read” pointers.  
- Optional vector store for embeddings; local-first index always exists (ripgrep/Lucene-like + embeddings). (Implementation choice; not mandated by sources.)

**Retrieval pipeline**  
- Repo ingest: parse git metadata, build code index, optionally embed chunks.  
- Paper ingest: PDF → TEI/XML + references via GROBID; metadata enrichment via Semantic Scholar/OpenAlex/arXiv (optional, permissioned). citeturn7search6turn7search3turn8search0turn8search1  

**Evaluation harness**  
- Integrate SWE-bench Verified style runs to benchmark coding-agent performance consistently. citeturn1search0turn1search8  
- For local project regression: run unit tests, lint, typecheck, security scanners in sandbox.

**Data stores**  
- Runs: append-only run registry (JSONL + blob store).  
- Prompts/responses: versioned with hashes.  
- Citations: citation graph store (BibTeX/CSL JSON) + excerpt store.  
- Artifacts: diffs, patches, PDFs, build outputs.

## Multi-model strategy

### Scenario-based model recommendation table

Assumptions for “cost/latency”: local inference cost is dominated by GPU/CPU time + VRAM availability; remote costs are token-priced and require explicit opt-in. Routing must therefore be **latency/VRAM-aware** and **offline-by-default**.

| Scenario | Recommended model(s) | Why (capabilities) | Cost/latency + VRAM trade-offs | Fallbacks |
|---|---|---|---|---|
| Repo-level code changes | Gemma 4 (26B-A4B or 31B) when available; else Gemma 4 E4B baseline | Gemma 4 family targets coding + agentic capabilities and native function calling; larger sizes give better reasoning. citeturn19view0turn11view0turn11view1 | 26B/31B need substantial VRAM even quantised (~15–17GB weights at Q4 per Google guidance); E4B fits smaller machines (~5GB at Q4). citeturn11view0 | If tool calling unstable in runtime, switch to “prompted structured output” mode or a coder-specialist model (Qwen2.5-Coder) with correct parser/template. citeturn15search2turn2search28 |
| Debugging failing tests | Gemma 4 (31B/26B-A4B) + tool calling; optionally DeepSeek-R1-Distill for hard reasoning steps | Debugging benefits from tool loops (run tests, inspect logs); Gemma 4 tool protocol is supported in vLLM recipes. citeturn11view3turn2search28 | Long runs can be expensive locally; KV cache grows; keep context windows trimmed and use compaction | If tool calling is inconsistent, force structured outputs with schema gating (tool_choice required) via vLLM tool calling. citeturn15search1turn15search8 |
| Planning multi-step refactors | Gemma 4 (31B/26B-A4B) for planning + reflection; E4B for drafts | Gemma 4 model card explicitly frames “thinking” and agentic capabilities; reflection patterns improve long-horizon success when combined with eval gates. citeturn11view1turn1search23 | Larger models: slower but fewer iterations; smaller models: faster but higher risk of plan errors | Ask-only plan agent (no write tools) then escalate to build agent; if context too long, use retrieval summarisation + chunked planning |
| Mathematical reasoning / proofs | DeepSeek-R1-Distill-Qwen-32B (offline) for proofy steps; Gemma 4 as baseline | DeepSeek R1 family is reasoning-oriented and ships explicit usage recommendations for reasoning performance. citeturn17view0 | Tool calling may be unreliable depending on stack; may require non-standard prompting and higher generation lengths | If reasoning model is unstable, fall back to Gemma 4 and add “verify with unit tests / symbolic tool” where possible |
| Summarising research papers | Gemma 4 (long context) + retrieval; optionally Mixtral for higher quality (if hardware allows) | Gemma 4 includes long context up to 256K; good for single-paper full-text ingestion. citeturn11view1turn19view0 | Full-PDF summarisation is KV-cache heavy; prefer “extract > chunk > map-reduce > synthesis” | If local compute insufficient, summarise abstract + key sections and cite extracted references (GROBID) |
| Drafting scientific writing with citations | Gemma 4 + strict citation/provenance tools; enforce citeproc/BibTeX pipeline tools | Writing must be grounded in extracted sources; use Zotero+BBT auto-export + Pandoc/latexmk pipeline. citeturn7search0turn7search1turn8search2 | The primary cost is not model size but **citation correctness**; require tool-grounded citation insertion | If the model cannot reliably cite, switch to a “citation-only” subagent that only edits bibliography/citations using tools |
| Long-context synthesis across many sources | Gemma 4 medium (256K) or Qwen3-Coder-Next (256K) if available; otherwise hierarchical synthesis | Both Gemma 4 medium models and Qwen3-Coder-Next support ~256K context. citeturn11view1turn16view0 | 256K contexts can be extremely memory-intensive; you may need to downshift to retrieval + summarisation and keep only structured notes in context | Use routing to summarise first; only escalate when synthesis requires cross-document reasoning |

### Routing policy proposal

**Baseline principle:** Gemma 4 E4B is the always-available default baseline (because it has explicit memory guidance and tool calling support in the family, and fits smaller machines when quantised). citeturn11view0turn11view1  

**Signals used for routing (hybrid approach):**  
- Hard constraints: `offline_only`, VRAM budget, required context length, tool-calling requirement. citeturn11view1turn11view0  
- Task features: code-heavy vs prose-heavy vs math-heavy.  
- Confidence gates:  
  - Router confidence (RouteLLM threshold-calibrated) for “easy vs hard” queries. citeturn4search14turn4search10  
  - Model self-confidence tokens or uncertainty estimators where available, but treat as weak signal unless validated. citeturn4search2turn4search5  
  - External verification signals: tests passing, lints clean, schema-valid tool calls (strongest signals). citeturn5search1turn15search1  

**Fallback strategy (local-first cascade):**  
1) Try baseline (Gemma 4 E4B) for quick plan/summary.  
2) If confidence low or verification fails, escalate to stronger local model (Gemma 4 26B/31B or coder specialist) using FrugalGPT-style cascade logic. citeturn4search0turn11view0  
3) If long-context required, route to 256K-capable model or use hierarchical synthesis to avoid OOM. citeturn11view1turn16view0  
4) Only if explicitly enabled by user/org policy: escalate to remote API provider; label outputs as remote-sourced.

## Implementation plan

### MVP phase

**Milestones**  
- Local baseline agent loop + ToolGateway + basic UI.  
- Run local Gemma 4 (E4B) through a local server.  
- Repo tools: read/search/diff, git status/diff, run tests.  
- Research tools: PDF ingest (GROBID), basic citation store, Markdown output.

**Key tasks (spec-driven)**  
- Implement Run Registry (JSONL + blob store) with trace IDs.  
- Implement ModelProvider adapter for vLLM OpenAI-compatible server and one “local desktop” server (Ollama or LM Studio). citeturn9search5turn9search2turn9search3  
- Implement minimal Router: rule-based (task_type + context) + manual override.  
- Implement ToolGateway:  
  - Tools: `read_file`, `list_files`, `search_repo`, `git_diff`, `run_tests`, `apply_patch`.  
  - Policy: default allow read, ask for write/exec, deny network.  
- Sandbox: start with container-based runner; define “no network” profile; plan gVisor/nsjail as optional hardened backends. citeturn1search8turn5search3turn5search18  
- Research ingest: integrate GROBID pipeline to extract metadata + references; store TEI/XML and extracted BibTeX/CSL JSON. citeturn7search6turn7search10  
- Writing pipeline: implement `pandoc_build` and `latexmk_build` tools in sandbox. citeturn7search1turn8search2  

**Deliverables**  
- Architectural Decision Records (ADRs): “local-first policy”, “tool permission model”, “model serving runtime”, “citation provenance format”.  
- Unit tests for: tool schema validation, policy enforcement, run replay determinism (same tool outputs given same inputs).  
- Minimal docs: install, local model setup, threat model.

**Evaluation plan**  
- Offline regression: run on a small suite of synthetic repo tasks + tool schema conformance.  
- Performance smoke tests: measure router overhead, sandbox start time, tokens/sec for baseline model.

**Definition of done**  
- Can complete a repo task end-to-end (plan → patch → tests green) with logs and replay.  
- Can ingest a PDF and produce a cited Markdown summary with extracted references.

### Beta phase

**Milestones**  
- Multi-model routing v1 (cascades + calibration), MCP integration, richer UI (diff viewer, approvals, citations panel).  
- Add SWE-bench Verified harness integration (or an “inspect-native” harness) for evaluation. citeturn1search0turn1search28  

**Key tasks**  
- Add Router calibration pipeline (RouteLLM-style threshold fitting). citeturn4search14turn4search18  
- Add evaluation harness runner using containerised SWE-bench tasks. citeturn1search8turn1search0  
- MCP client built into ToolGateway; support bringing in external/local MCP servers. citeturn5search20turn5search0  
- Add more tool sandboxes:  
  - “python-notebook”  
  - “node-build”  
  - “latex-build”  
  - “no-net” vs “domain-allowlist” network mode (opt-in)  
- Add provenance UI: show “sources read”, tool outputs, excerpts, citation links.

**Deliverables**  
- Router benchmarks report; SWE-bench baseline on Gemma 4 and at least one coder specialist.  
- Threat model doc aligned to OWASP LLM Top 10 categories applied to tool execution. citeturn6search0turn6search4  

**Definition of done**  
- SWE-bench Verified runs reproducibly locally; regression tracking works.  
- MCP tools can be added/removed via config with clear permission prompts.

### Production phase

**Milestones**  
- Hardened sandbox backends (gVisor/nsjail), robust observability, model/eval regression discipline, plugin ecosystem.  
- Optional enterprise integration: shared run registry, multi-user RBAC (still local-first; can be self-hosted).

**Key tasks**  
- Harden sandbox: gVisor option for container runs; nsjail for process isolation on Linux; document platform limitations. citeturn5search18turn5search3  
- Full OpenTelemetry instrumentation and trace viewer integration. citeturn6search1turn6search19  
- Deterministic pipelines for CI: use containerised workflows (Dagger-style) so local runs match CI runs. citeturn6search2turn6search6  
- Add MLflow integration for experiment tracking (optional module). citeturn6search3  
- Add policy pack system for tool allowlists and network egress restrictions.

**Definition of done**  
- Reproducible, auditable runs with hardened sandbox in default configuration.  
- Model/routing regressions detected automatically and rollbacks supported.  
- Research-writing pipeline produces publication-ready outputs with verifiable citations.

### Repository structure (monorepo layout)

Proposed layout (example):

- `/apps/desktop-ui` (Tauri/Electron or similar)  
- `/apps/web-ui` (optional hosted-only UI; can still connect locally)  
- `/apps/ide-plugin` (VS Code / JetBrains plugin wrappers)  
- `/packages/orchestrator` (agent manager, router, run registry)  
- `/packages/tool-gateway` (tools, sandbox runner, MCP client)  
- `/packages/model-runtime` (providers: vLLM, Ollama, LM Studio, llama.cpp)  
- `/packages/retrieval` (repo index, paper ingest, embeddings adapters)  
- `/packages/evals` (SWE-bench harness + regression suites)  
- `/packages/writing` (Pandoc/LaTeX/citations pipelines)  
- `/docs` (ADRs, threat model, ops docs)

### CI/CD and model/eval regression strategy

- CI gates: unit + integration tests; tool schema validation; sandbox policy tests; golden-file replay tests.  
- Nightly: eval suite including SWE-bench subset + internal tasks; compute diff vs baseline. citeturn1search8  
- Reproducibility: containerise eval runners; Dagger-like approach can unify local and CI environments. citeturn6search2turn6search6  

## Tech stack options with trade-offs

### Backend language choice

**Python-first backend**  
- Pros: best ecosystem for ML/LLM experimentation, evaluation harnesses, PDF tooling, MLflow integration. citeturn6search3turn7search6  
- Cons: shipping desktop-grade long-running services requires care (packaging, performance, concurrency).

**TypeScript-first backend**  
- Pros: aligns with AI SDK ecosystem and OpenCode’s provider abstractions (AI SDK, models.dev usage). citeturn10search8turn10search1turn10search2  
- Cons: ML research workflows (notebooks, PDF extraction, MLflow) are less native.

**Hybrid (recommended default)**  
- Orchestrator + research pipeline in Python; UI + plugin layer and provider/routing metadata in TypeScript; communicate via local RPC (gRPC/HTTP).  
- Trade-off: more moving parts, but cleaner separation of concerns and better long-term extensibility.

### UI target choice

**Desktop app (recommended default)**  
- Pros: local-first is natural; direct filesystem integration; easier secure approvals; can still expose a local web UI.  
- Cons: packaging complexity across OS; IDE integration still needed.

**Web app**  
- Pros: fastest iteration; can run locally in browser.  
- Cons: filesystem access is harder and riskier; sandboxing and process control require a local daemon anyway.

**IDE plugin**  
- Pros: best developer workflow adoption.  
- Cons: plugin APIs differ; debugging and security constraints; still need a local backend service.

### Local model serving options

- vLLM: high throughput; OpenAI-compatible; explicit tool calling flags/parsers; best for GPU servers. citeturn9search1turn9search5turn11view3  
  - Trade-offs: operational complexity; model-specific parser issues; needs CUDA/ROCm driver alignment.  
- Ollama: simple local model server with documented local API. citeturn9search2turn9search24turn9search34  
  - Trade-offs: tool calling behaviour varies by model and “OpenAI compatibility” may not cover all features. citeturn9search34  
- LM Studio: desktop local server with OpenAI-compatible endpoints; designed for local workflows. citeturn9search3turn9search6  
  - Trade-offs: desktop-app dependency; headless/server automation depends on product direction.

### Sandbox options

- Containers (Docker/Podman): easiest reproducibility; aligns to SWE-bench containerised harness. citeturn1search8turn6search2  
  - Trade-offs: by itself shares host kernel; needs policy restrictions and/or stronger runtime. citeturn5search26  
- gVisor: extra sandbox layer for containers to reduce host kernel exposure. citeturn5search18turn5search14  
  - Trade-offs: performance overhead; not all syscalls supported. citeturn5search6  
- nsjail: lightweight isolation via namespaces/cgroups/seccomp. citeturn5search3  
  - Trade-offs: Linux-first; requires careful policy tuning.

### Retrieval and writing pipeline

- Paper parsing: GROBID locally. citeturn7search6turn7search10  
- Citation management: Zotero + Better BibTeX auto-export into repo. citeturn7search8turn7search0  
- Document builds: Pandoc + citeproc/CSL; LaTeX compilation via latexmk. citeturn7search1turn8search2  
- Metadata enrichment (optional): Semantic Scholar API / OpenAlex / arXiv (permissioned network tools). citeturn7search3turn8search0turn8search1  

## Tooling checklist

### Agentic dev must-haves

- Git: status/diff/commit/branch tools (with policy gating).  
- Test runner integrations (pytest, cargo test, go test, npm test, etc.).  
- Linters/formatters: ESLint/Prettier, Ruff/Black, gofmt, rustfmt, etc.  
- Static analysis + type checks: mypy/pyright, tsc, clang-tidy (optional).  
- Patch application tool with rollback + snapshot ability (inspired by existing agent tooling semantics). citeturn18view0  

### ML/LLM experimentation must-haves

- Prompt/versioning: run registry + prompt hashes, dataset versions.  
- Evaluation harness: SWE-bench Verified integration; local regression suites. citeturn1search0turn1search8  
- Experiment tracking: MLflow local tracking (optional but recommended for researcher persona). citeturn6search3turn6search13  
- Model serving + cache management: vLLM + one local desktop server; quantisation management (GGUF). citeturn9search7turn9search18turn9search1  

### Deep research & scientific writing must-haves

- PDF ingestion: GROBID TEI/XML + reference extraction. citeturn7search6turn7search10  
- Citation manager: Zotero + Better BibTeX keep-updated export. citeturn7search0turn7search8  
- Build pipeline: Pandoc + citeproc + latexmk. citeturn7search1turn8search2  
- Provenance UI: show “what was read” (file/PDF excerpts) and prevent uncited claims by policy.  
- Optional metadata tools: Semantic Scholar/OpenAlex/arXiv. citeturn7search3turn8search0turn8search1  

### Observability must-haves

- Structured logs with run_id/trace_id correlation.  
- OpenTelemetry spans for model calls and tool calls with export options. citeturn6search1turn6search19  
- Audit log: append-only tool execution ledger, including approvals/denials.  
- Replay tooling: rerun a historical run with pinned models/tool outputs.

## Key sources and URLs for major claims

```text
OpenCode docs (providers/agents/permissions/snapshots/MCP):
- https://opencode.ai/docs/
- https://opencode.ai/docs/providers/
- https://opencode.ai/docs/agents/
- https://opencode.ai/docs/config/

Gemma 4 official docs (context, licence, memory requirements, function calling):
- https://ai.google.dev/gemma/docs/core
- https://ai.google.dev/gemma/docs/core/model_card_4
- https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/

vLLM tool calling + Gemma 4 recipe:
- https://docs.vllm.ai/en/latest/features/tool_calling/
- https://docs.vllm.ai/projects/recipes/en/latest/Google/Gemma4.html

MCP specification (tools):
- https://modelcontextprotocol.io/specification/2025-03-26
- https://modelcontextprotocol.io/specification/2025-06-18/server/tools

SWE-bench and SWE-bench Verified:
- https://www.swebench.com/
- https://www.swebench.com/verified.html
- https://github.com/swe-bench/SWE-bench

SWE-agent (Docker sandbox workflow reference):
- https://swe-agent.com/latest/usage/hello_world/

Routing references:
- https://arxiv.org/abs/2305.05176 (FrugalGPT)
- https://arxiv.org/abs/2406.18665 (RouteLLM)
- https://github.com/lm-sys/routellm

Sandboxing references:
- https://gvisor.dev/docs/
- https://github.com/google/nsjail
- https://owasp.org/www-project-top-10-for-large-language-model-applications/

Research-writing workflow references:
- https://grobid.readthedocs.io/en/latest/Introduction/
- https://retorque.re/zotero-better-bibtex/exporting/auto/
- https://pandoc.org/MANUAL.html
- https://ctan.org/pkg/latexmk?lang=en
```