# **Local-First Agentic Architecture for Integrated Software Development and Scientific Research**

## **Executive Summary**

The following report details the comprehensive design for a sovereign, local-first agentic environment tailored for dual-use in software engineering and machine learning research. By leveraging the frontier-level capabilities of the Gemma 4 model family, this architecture reconciles the need for high-performance cognitive assistance with the absolute necessity of data privacy and offline operational continuity.

* The system is built upon a "Traceability-First" philosophy, where every change in code or claim in research is linked back to a verified business intent or scientific source.1  
* Primary inference is handled locally by the Gemma 4 31B Dense model, which provides state-of-the-art reasoning and coding performance on consumer workstations.2  
* A multi-model orchestration layer enables dynamic task routing, utilizing specialized experts like the 26B Mixture-of-Experts (MoE) for efficiency and the E4B variant for low-latency edge tasks.5  
* Autonomous tool execution is secured through hardware-virtualized microVM sandboxes, mitigating the risk of recursive file deletion or unauthorized network egress.7  
* Scientific workflows are deeply integrated via the Model Context Protocol (MCP), allowing agents to interact directly with Zotero libraries and local LaTeX toolchains.9  
* Research provenance is maintained through a grounded extraction paradigm, ensuring that citations are not hallucinated but retrieved and verified against PDF content parsed via GROBID.12  
* The system utilizes an event-sourced state model, enabling deterministic replay of agent reasoning loops for debugging and auditability.14  
* Adaptive context engineering manages the 256K token window of Gemma 4, employing compaction and staged summarization to preserve long-horizon reasoning.2  
* The architecture supports local-first RAG (Retrieval-Augmented Generation) across entire repositories through semantic dependency analysis and vector indexing.18  
* An integrated evaluation harness monitors model performance on tasks like SWE-bench and GPQA Diamond, providing a feedback loop for continuous system refinement.20  
* Model routing incorporates confidence-based gating, escalating ambiguous or high-complexity tasks from smaller edge models to dense workstation models.22  
* The user interface provides a unified "Work-Research-Write" flow, bridging the gap between the terminal-centric development world and the document-centric research world.24  
* Licensing is strictly Apache 2.0 for the core framework and models, ensuring commercial freedom and preventing vendor lock-in.5  
* The primary implementation risk—VRAM saturation—is mitigated through 4-bit and 8-bit dynamic quantization and hybrid RAM/VRAM offloading.4  
* The system is designed to scale from a single laptop to a distributed local cluster, supporting collaborative multi-agent "swarms" for complex architectural projects.26

## **Spec-Driven System Specification**

The fundamental problem addressed by this architecture is the "context fragmentation" inherent in modern technical work. A machine learning engineer often operates in three distinct silos: the IDE for implementation, the browser for literature review, and a separate editor for scientific reporting. Cloud-based AI assistants further exacerbate this by introducing latency and privacy risks. This system, internally codenamed "Aether-Core," unifies these workflows into a single agentic environment that prioritizes local data sovereignty.

### **Problem Statement and Non-Goals**

Modern technical roles require an agent that can reason across broad contexts—entire codebases, thousands of research papers, and complex project plans. While cloud-based models offer scale, they fail on privacy and consistency for local files. Aether-Core provides a local-first alternative that operates on-device, preserving intellectual property while offering frontier-level intelligence.2

Non-goals for the system include:

1. Providing a general-purpose consumer chatbot; the focus remains strictly on technical and scientific domains.  
2. Replacing the human researcher; the system is designed to act as a "Co-Engineer" and "Research Assistant," requiring human-in-the-loop validation for high-stakes decisions.1  
3. Operating as a cloud-native SaaS by default; while remote APIs are supported as optional extensions, the core logic must function entirely offline.6

### **Primary Personas and Requirements**

The system's architecture must satisfy the distinct needs of three core personas, often embodied by the same individual in an ML research context.

| Persona | Domain | Critical Interaction Pattern | Key Success Metric |
| :---- | :---- | :---- | :---- |
| **Local Developer** | System implementation and testing. | Terminal-based TUI, git hooks, and repo-level code modification.24 | Success rate on unit tests and linting compliance.27 |
| **ML/LLM Researcher** | Experimentation and evaluation. | Jupyter notebook integration, dataset curation, and model benchmarking.2 | Fidelity of extracted performance metrics across trials.31 |
| **Scientific Writer** | Manuscript production and citation. | LaTeX/BibTeX synchronization and claim-evidence grounding.12 | 100% validity of generated citations and lack of factual hallucinations.12 |

### **User Stories and Acceptance Criteria**

To drive the spec-driven development, twelve core user stories have been identified, spanning the development and research spectrum.

1. **Repo-Level Refactoring:** As a developer, I want the agent to refactor a monolithic Python module into a clean, service-oriented structure across multiple files. *Acceptance:* The agent identifies all dependencies, proposes a plan, executes the split, and ensures all tests pass.1  
2. **Autonomous Debugging:** As a developer, I want to provide a failing test output and have the agent identify the root cause and propose a fix. *Acceptance:* The agent uses the "Thinking Mode" to hypothesize, verifies the fix in a sandbox, and submits a local git commit.3  
3. **Literature Synthesis:** As a researcher, I want to provide 20 PDF papers on "Sparse Attention" and receive a structured summary comparing their methodologies. *Acceptance:* The agent parses the PDFs, extracts key metrics into a Markdown table, and cites every claim.12  
4. **Citation Grounding:** As a writer, I want to highlight a claim in my LaTeX draft and have the agent find a supporting reference in my local Zotero library. *Acceptance:* The agent segments the claim, queries the Zotero MCP server, and inserts the correct \\cite{} tag.9  
5. **Environment Setup:** As a researcher, I want the agent to configure a new Conda environment based on a research paper's requirements.txt and verify GPU access. *Acceptance:* The agent executes bash commands in the sandbox, installs dependencies, and runs a sanity check script.7  
6. **Code-to-Doc Sync:** As a developer, I want my system documentation to be automatically updated whenever the API schema changes. *Acceptance:* The agent monitors file changes, identifies discrepancies, and reconciles the Markdown docs with the implementation.1  
7. **Dataset Evaluation:** As an ML engineer, I want the agent to run a standard benchmark (like MMLU) on a quantized model and plot the results. *Acceptance:* The agent interacts with the eval harness, processes logs, and generates a visualization in the UI.2  
8. **Vulnerability Patching:** As a security-conscious developer, I want the agent to scan my project for known CVEs and propose version updates. *Acceptance:* The agent runs static analysis tools and opens a local PR with the necessary fixes.29  
9. **Automated Peer Review:** As a researcher, I want the agent to critique my draft for logical consistency and adherence to conference guidelines. *Acceptance:* The agent applies a multi-step "Self-Critique" loop and provides specific feedback on section headers and transitions.17  
10. **Scientific Figure Generation:** As a writer, I want to describe a performance trend and have the agent generate a TikZ or Mermaid diagram for my LaTeX paper. *Acceptance:* The agent generates the code, renders it for preview, and saves the asset in the project directory.24  
11. **Provenance Verification:** As a writer, I want to verify that a quote in my draft actually appears in the source PDF. *Acceptance:* The agent uses GROBID to find the exact paragraph and page number in the local library.12  
12. **Context Compression:** As a long-term user, I want the agent to "remember" my previous design decisions without blowing the token budget. *Acceptance:* The system applies adaptive context compaction and experience-driven memory retrieval.14

### **Functional and Non-Functional Requirements**

The functional requirements (FR) define the "what," while non-functional requirements (NFR) define the "how" of system performance.

#### **Functional Requirements (FR)**

* **FR-1: Multi-Model Orchestration.** The system must support the simultaneous loading of at least two model variants (e.g., 31B and E4B) to balance reasoning depth and speed.6  
* **FR-2: Tool System.** The agent must have access to a terminal, file system, git, python interpreter, and external MCP servers (Zotero, Browser).9  
* **FR-3: Structured Planning.** Every complex task must be preceded by an explicit "Implementation Plan" document that is reviewable by the user.1  
* **FR-4: Scientific Engine.** Inclusion of PDF parsing (GROBID), BibTeX management, and LaTeX synthesis modules.12  
* **FR-5: Sandbox Execution.** All shell and code actions must be isolated by default, with configurable network and filesystem permissions.7

#### **Non-Functional Requirements (NFR)**

* **NFR-1: Local-First.** 100% of core data processing must occur on the host machine. Remote APIs are allowed only as a secondary fallback with explicit user consent.14  
* **NFR-2: Reproducibility.** The system must use an event-sourced log to ensure any agent state can be replayed and inspected.15  
* **NFR-3: Performance.** Token generation for the primary model (31B) must exceed 10 tokens/sec on target hardware to remain usable for interactive tasks.4  
* **NFR-4: Latency.** Tool-call latency (overhead from the orchestrator) must be under 200ms, excluding model inference time.8  
* **NFR-5: Quantization Support.** The system must support 4-bit (GGUF/AWQ) and 8-bit precision levels to accommodate different VRAM budgets.4

### **Component Contracts and Interfaces**

A modular architecture requires strict interface definitions to ensure that models, tools, and UI components can be swapped without systemic failure.

* **ModelProvider Interface:**  
  Python  
  class ModelProvider:  
      def generate(self, prompt: str, schema: JSONSchema \= None) \-\> GenerationResponse:  
          """Generates text or structured tool calls based on input."""  
      def list\_capabilities(self) \-\> List\[Capability\]:  
          """Returns context window, quantization, and multimodal support."""

  This interface abstracts the underlying runtime (vLLM vs. llama.cpp) and handles the "Thinking Mode" toggles.4  
* **Router Interface:**  
  Python  
  class Router:  
      def route(self, query: str, context: AgentState) \-\> ModelMetadata:  
          """Determines the best model based on semantic intent and confidence."""  
      def handle\_fallback(self, error: Exception) \-\> ModelMetadata:  
          """Provides a path to a safer or larger model in case of failure."""

  The router uses intent inference to distinguish between "repo-wide search" (high context) and "inline debugging" (high reasoning).22  
* **ToolGateway Interface:**  
  Python  
  class ToolGateway:  
      def execute(self, action: ToolAction, policy: SecurityPolicy) \-\> Observation:  
          """Validates and executes an action within the isolated sandbox."""  
      def audit\_log(self) \-\> List\[AuditEvent\]:  
          """Returns an immutable history of all executed commands."""

  This gateway acts as the firewall between the model's "thinking" and the machine's "acting".38  
* **AgentLoop Interface:**  
  Python  
  class AgentLoop:  
      def step(self) \-\> LoopState:  
          """Orchestrates the Plan \-\> Act \-\> Observe \-\> Evaluate \-\> Reflect cycle."""

  This manages the state machine, ensuring that "Instruction Fade-out" is mitigated by injecting system reminders during long-running sessions.14

## **Reference Architecture**

The Aether-Core architecture is designed as a series of decoupled layers, ensuring that the heavy compute of the LLM does not block the responsiveness of the user interface.

### **Text-Based System Diagram**

\<-------------------\>

| (REST/WebSocket) (Traces, Logs, Replay)

v

\<-----\>

| (Short-term, Long-term, RAG)

|

\+-----\>

| |

| \+-----\>

| | (Gemma 4 31B, 26B MoE, E4B)

| |

| \+-----\>

| (vLLM / llama.cpp)

|

\+-----\>

|

\+-----\>

| (Risk Level Scoring: LOW, MED, HIGH)

|

\+-----\>

(Docker / microVM / WASM)

### **Layer Descriptions and Rationale**

The **UI Layer** is the primary interaction point, providing a split-pane view for chat, the current file explorer, and a "Citation Pane" for research work. It communicates via WebSockets to provide real-time updates as the agent modifies the codebase.24

The **Orchestrator** acts as the central coordinator, implementing the "Supervisor-Worker" pattern. It decomposes high-level user goals into a graph of sub-tasks, ensuring that each task is assigned to a specialized sub-agent (e.g., Coder, Reviewer, Researcher).23

The **Router** optimizes resource utilization. Instead of sending every request to the VRAM-heavy 31B model, it uses a lightweight classifier to determine if a task can be handled by the 26B MoE or even the E4B variant. This "Dynamic Task Decomposition" reduces latency and preserves compute for the most difficult reasoning phases.22

The **Model Runtime** layer manages the lifecycle of the local models. It handles the loading of quantized weights and the allocation of KV caches. For Gemma 4, it leverages the hybrid attention mechanism, which interleaves global and sliding window attention to optimize memory during long-context tasks.2

The **Tool Gateway** is the system's security sentinel. It implements the "ConfirmRisky" policy, where any action with a "HIGH" risk score (e.g., deleting files, installing new packages) pauses the agent and requires a human click-to-proceed.43

The **Memory and Retrieval Pipeline** provides the agent with its "local awareness." It includes a vector store for semantic search across the repository and a structured index for Zotero metadata. For long-running projects, it employs "Experience-Driven Memory," which accumulates project-specific knowledge over time.17

## **Multi-Model Strategy**

The core of the system's intelligence is the Gemma 4 family, which provides a unified multimodal architecture across diverse sizes.

### **Model Capability Matrix**

| Feature | Gemma 4 31B | Gemma 4 26B MoE | Gemma 4 E4B | Llama 4 Scout |
| :---- | :---- | :---- | :---- | :---- |
| **Total Params** | 30.7B | 25.2B | 4.5B | 17B (Active) |
| **Active Params** | 30.7B (Dense) | 3.8B | 4.5B | 17B |
| **Context Window** | 256K | 256K | 128K | 10M |
| **VRAM (4-bit)** | 17–20 GB | 16–18 GB | 5.5–6 GB | 80 GB+ |
| **Best For** | Reasoning, Code | High-speed Agents | Mobile/Edge, Audio | Whole-repo RAG |
| **License** | Apache 2.0 | Apache 2.0 | Apache 2.0 | Custom |
| **Citations** | 5 | 4 | 6 | 4 |

### **Scenario-Based Routing Policy**

The Router employs a "Confidence-First" strategy. Tasks start with the smallest capable model and escalate only when necessary.

| Scenario | Recommended Model | Rationale | Fallback |
| :---- | :---- | :---- | :---- |
| **Repo-level code changes** | Gemma 4 31B | Highest instruction fidelity and 80% score on LiveCodeBench.20 | Qwen 3.5 27B |
| **Debugging failing tests** | Gemma 4 31B (Thinking) | "Thinking Mode" allows for complex hypothesis generation before action.3 | DeepSeek-R1 |
| **Multi-step refactors** | Gemma 4 26B MoE | High throughput for large text blocks; maintains 97% of 31B quality.5 | Gemma 4 31B |
| **Mathematical reasoning** | Gemma 4 31B | 89.2% on AIME 2026; dominates its size class.20 | MiniMax-M1 |
| **Summarizing papers** | Gemma 4 E4B | Fast inference for single-document ingestion; supports 128K context.5 | Gemma 4 26B MoE |
| **Drafting with citations** | Gemma 4 31B | Exceptional structured output and logic-heavy grounding.12 | Qwen 3.5 27B |
| **Long-context synthesis** | Llama 4 Scout | 10M token window for extremely large cross-repo analysis.4 | Gemma 4 31B |

### **Routing and Fallback Mechanism**

The routing policy is implemented as a semantic classifier. When a user input is received, a small language model (SLM) like Gemma 4 E2B classifies the query intent.

1. **Direct Routing:** If the intent matches "Code Generation" or "Logical Proof," the request is routed directly to the 31B Dense model.  
2. **Sequential Routing (Speculation):** For routine tasks like "List files" or "Write a summary," the E4B model attempts the task first.  
3. **Verification Gating:** The output of the smaller model is checked for malformed JSON or "UNKNOWN" risk tags. If found, the task is re-run by the 31B model.23  
4. **Confidence-Based Escalation:** If the model's self-assessment score (Logits/Confidence) falls below a threshold (![][image1]), the orchestrator triggers a "Reflection" step using a more powerful model.23

## **Implementation Plan**

The project follows a phased rollout, transitioning from a basic developer tool to a comprehensive research workstation.

### **Phase 1: Minimal Viable Product (MVP) \- "The Foundation"**

The focus is on establishing the core agentic loop and local inference stability.

* **Milestones:**  
  * M1.1: Local inference server supporting GGUF/AWQ formats for Gemma 4\.4  
  * M1.2: Basic TUI supporting file edits and bash command execution.24  
  * M1.3: Implementation of the "ConfirmRisky" security policy.43  
* **Tasks:**  
  * Integrate llama.cpp as the primary backend for Windows/Linux/macOS support.6  
  * Develop the "Plan-Writer" sub-agent using the Gemma 4 31B reasoning template.1  
  * Implement an event-sourced log using SQLite for session persistence.15  
* **Deliverables:** A CLI tool that can refactor local Python files and answer repo-specific questions.  
* **Definition of Done:** Agent successfully fixes 5 distinct bugs in a local "test-harness" repository without human intervention.

### **Phase 2: Beta \- "The Research Workstation"**

This phase introduces scientific research capabilities and multi-model routing.

* **Milestones:**  
  * M2.1: Zotero MCP server integration for library management.9  
  * M2.2: PDF ingestion pipeline using GROBID for structured parsing.12  
  * M2.3: Multi-model router that switches between 31B and 26B MoE variants.22  
* **Tasks:**  
  * Build the "Citation-Grounded" drafting loop for LaTeX.12  
  * Implement a vector RAG pipeline using ChromaDB or Milvus for codebase-wide awareness.19  
  * Integrate a browser-tool using Playwright or Firecrawl for documentation search.38  
* **Deliverables:** A unified GUI/TUI environment that supports BibTeX synchronization and claim-evidence verification.  
* **Definition of Done:** Agent produces a 2-page research summary with 10+ verified, non-hallucinated citations.12

### **Phase 3: Production \- "The Autonomous Engineer"**

The final phase focuses on scaling, observability, and collaborative swarms.

* **Milestones:**  
  * M3.1: Support for agent "swarms" (Architect-Led Teams).26  
  * M3.2: Full-trace observability suite with run replay functionality.40  
  * M3.3: Hardware-virtualized microVM sandboxing for all tool calls.7  
* **Tasks:**  
  * Develop the "Self-Healing" documentation pipeline that reacts to code changes.24  
  * Integrate evaluation benchmarks (SWE-bench) into the CI/CD pipeline.14  
  * Optimize context management via "Context Condensation" and priority-ordered system reminders.14  
* **Deliverables:** A production-ready, local-first platform for enterprise-grade software and research automation.  
* **Definition of Done:** System achieves parity with leading cloud-based agents on SWE-bench and GAIA benchmarks while running entirely offline.14

### **Repository Structure (Monorepo Layout)**

The project utilizes a monorepo structure to ensure that agent prompts, tool schemas, and core logic remain in sync.

/aether-core

/apps

/cli \# Rust/Python terminal interface

/gui \# React-based desktop application

/packages

/sdk \# Core agent reasoning and state machine

/inference \# Drivers for vLLM, llama.cpp, and local GPU

/tools \# Standard tool library (git, bash, linter)

/mcp-servers \# Specialized connectors (Zotero, Browser, Notebook)

/sandbox \# Container and microVM orchestration

/research \# Scientific writing and citation logic

/agents \# System prompt templates and agent manifests (.md/.json)

/evals \# Local benchmark harness and regression suites

/docs \# System architecture and ADRs

## **Tech Stack Options and Trade-offs**

Selecting the right stack for a local-first environment requires balancing the flexibility of rapid development with the raw performance needed for on-device inference.

### **Programming Languages: Python vs. TypeScript**

A hybrid approach is selected as the optimal architecture.

* **Python (Core Logic):** Python is used for the agent's "brain" and ML integrations. It offers native access to the rich ecosystem of research tools (PyTorch, scikit-learn) and is the standard for LLM development.30  
* **TypeScript (UI and Gateway):** TypeScript is used for the user interface and high-concurrency gateway services. Its strong typing is invaluable for orchestrating complex, asynchronous agent workflows and sharing types between the frontend and backend.30

**Trade-off:** Using a hybrid stack increases the complexity of the development environment (requiring two runtimes), but it avoids the "jack-of-all-trades" trap where one language is forced into an unnatural role.50

### **User Interface: Desktop App vs. IDE Plugin**

The system will prioritize a **Standalone Desktop App** (via Electron or Tauri) that can optionally act as an **IDE Plugin**.

* **Rationale:** A standalone app allows for a richer multi-document research view that is not constrained by the IDE's layout. It can manage multiple projects and papers simultaneously while remaining deeply integrated with the terminal.24  
* **Trade-off:** Standalone apps require more system resources than a lightweight plugin, but they provide the "Cognitive Command Center" experience necessary for scientific research.

### **Model Serving: vLLM vs. llama.cpp**

The system will support both through a unified abstraction layer.

* **vLLM:** Used for high-throughput scenarios and workstations with large VRAM (e.g., dual 4090s). It offers better batching performance through PagedAttention.2  
* **llama.cpp:** Used for consumer laptops and devices with limited VRAM. It is the gold standard for GGUF quantization and hybrid CPU/GPU execution.6

**Trade-off:** llama.cpp has lower throughput but significantly higher portability and memory efficiency, which is critical for local-first users.6

### **Sandboxing: Containers vs. MicroVMs**

* **Decision:** **Docker Sandboxes (MicroVMs)** for high-risk autonomous work; **Unprivileged Containers** for routine read-only tasks.7  
* **Rationale:** Standard containers share the host kernel, which is insufficient for running untrusted, agent-generated code. MicroVMs (like Firecracker) provide a hardware-enforced boundary with sub-second boot times (\~125ms).8  
* **Trade-off:** MicroVMs introduce slightly more overhead and complexity in volume mounting but provide the "Gold Standard" for security.8

### **Writing Pipeline: Markdown/LaTeX and Zotero**

* **Decision:** **Pandoc \+ BetterBibTeX \+ Zotero Integration.**  
* **Rationale:** Pandoc allows the agent to draft in Markdown while exporting to high-quality LaTeX. Zotero with the BetterBibTeX plugin ensures that citekeys are consistent across all manuscripts.34  
* **Trade-off:** Markdown lacks the fine-grained control of native LaTeX for complex tables and equations, but it is a much more efficient format for LLM generation.

## **Tooling Checklist**

To be fully functional, the environment must include a pre-vetted suite of tools accessible via the Tool Gateway.

### **Agentic Development Tools**

* **Git:** Core for version control and change management.44  
* **Pytest / Jest:** Standard runners for implementation verification.27  
* **Ruff / Prettier:** Fast linting and formatting to maintain style consistency.52  
* **Semgrep:** Static analysis to identify security vulnerabilities before they are committed.33

### **ML/LLM Experimentation Tools**

* **Jupyter Notebook Executor:** For interactive data analysis and visualization.30  
* **Evaluation Harness:** Support for MMLU, GPQA, and SWE-bench.20  
* **Weights & Biases (Local Mode):** For tracking experiment metrics offline.  
* **Model Quantizers:** Tools like AutoAWQ and llama.cpp-quantize for optimizing local weights.4

### **Research and Scientific Writing Tools**

* **Zotero Connector:** Bi-directional sync for references and metadata.9  
* **GROBID:** For parsing scholarly PDFs into structured XML.12  
* **Pandoc:** For converting between Markdown, LaTeX, and PDF.34  
* **TeX Live:** The complete LaTeX toolchain for document compilation.

### **Observability and Safety Tools**

* **Trace Viewer:** A web interface to inspect the agent's DAG of thoughts and actions.24  
* **Run Registry:** A database to store, replay, and compare different agent trajectories.24  
* **Security Analyzer:** An LLM-based tool to evaluate the risk score of shell commands.43  
* **Audit Log Explorer:** For reviewing all interactions with the filesystem and network.38

## **Security and Observability**

Aether-Core implements a "Defense-in-Depth" strategy, assuming that even the most capable models can occasionally generate harmful or unintended code.

### **Security Analyzer and Permission Model**

The **LLMSecurityAnalyzer** is the default implementation, leveraging the understanding of context to flag dangerous operations.

1. **Risk Scoring:** Every tool call is assigned a risk level: **LOW** (read-only), **MEDIUM** (local file writes), or **HIGH** (system changes, network egress).43  
2. **Confirmation Policy:** The **ConfirmRisky** policy ensures that any "HIGH" risk action halts execution and triggers a UI notification. The user must manually approve the command or provide feedback to the agent to try a safer alternative.14  
3. **Credential Management:** API keys (if used) and Zotero tokens are stored in a local secret registry, never shared with the agent's context. The system provides "proxy" tools that perform the authorized action without exposing the raw secret.38

### **Observability and Determinism**

The system treats "Context Management" as a first-class concern. Every action is event-sourced, allowing for:

* **Deterministic Replay:** If an agent fails a task, the researcher can "rewind" the event log to the point of failure and adjust the prompt or tool parameters to see how it changes the outcome.15  
* **Tracing:** Visualizing the relationship between a user's intent, the agent's plan, and the resulting code changes ensures that the system is not a "black box".1  
* **Adaptive Context Compaction:** To handle the 256K window effectively, the system periodically summarizes "finished" sub-tasks, moving them to long-term memory while keeping only the active "Plan" and immediate "Observations" in the KV cache.2

## **Success Metrics**

The performance of the Aether-Core environment is measured across three primary dimensions.

### **1\. Offline Evaluation Metrics (Benchmark Parity)**

* **Task Success Rate:** Performance on SWE-bench Verified, with a target of 60%+ using local models.14  
* **Reasoning Accuracy:** Scores on GPQA Diamond (target 80%+) and AIME 2026 (target 85%+).20  
* **Citation Correctness:** 100% validity of bibliographical references and 90%+ alignment between claims and source text.12

### **2\. User Productivity Metrics**

* **Time-to-Solution:** Reduction in the time taken to implement a new feature or fix a bug compared to manual coding.  
* **Iteration Count:** Number of agent loops required to reach a "passing" state for a given task (lower is better).  
* **Writing Speed:** Number of grounded scientific paragraphs produced per hour of researcher effort.

### **3\. System Health Metrics**

* **Inference Latency:** Maintaining \>10 tokens/sec for the 31B model.4  
* **VRAM Utilization:** Ensuring the 31B model operates within 20GB of VRAM via quantization.4  
* **Recovery Rate:** The percentage of times the agent can autonomously fix a test failure or linter error it introduced.

## **Final Synthesis and Strategic Outlook**

The design of the Aether-Core environment establishes a new standard for local-first, agentic workstations. By combining the multimodal reasoning power of Gemma 4 with a strictly sandboxed tool system and a deep integration into the scientific research lifecycle, we provide a platform that is more than the sum of its parts.

The strategic advantage of this architecture lies in its **sovereignty**. As proprietary models continue to fluctuate in capability and policy, a local-first system using Apache 2.0 licensed models ensures that the researcher's tools are as permanent and private as the books on their shelf. The event-sourced state model and grounded citation extraction provide the necessary guardrails to ensure that AI assistance enhances, rather than compromises, scientific and engineering rigor. As hardware continues to advance, this local environment will only become more capable, eventually supporting entire "swarms" of expert agents working in concert to solve the most pressing challenges in computer science.

#### **Works cited**

1. agentic-delivery-os/doc/guides/opencode-agents-and-commands ..., accessed April 10, 2026, [https://github.com/juliusz-cwiakalski/agentic-delivery-os/blob/main/doc/guides/opencode-agents-and-commands-guide.md](https://github.com/juliusz-cwiakalski/agentic-delivery-os/blob/main/doc/guides/opencode-agents-and-commands-guide.md)  
2. gemma-4-31b-it Model by Google \- NVIDIA Build, accessed April 10, 2026, [https://build.nvidia.com/google/gemma-4-31b-it/modelcard](https://build.nvidia.com/google/gemma-4-31b-it/modelcard)  
3. What Is Google Gemma 4 in 2026? Complete Guide to Open-Source AI Models \- Distk, accessed April 10, 2026, [https://distk.in/blog/what-is-google-gemma-4-open-source-ai-2026.html](https://distk.in/blog/what-is-google-gemma-4-open-source-ai-2026.html)  
4. Deploy Google Gemma 4 on GPU Cloud: MoE and Dense Model Guide (2026) \- Spheron, accessed April 10, 2026, [https://www.spheron.network/blog/deploy-gemma-4-gpu-cloud/](https://www.spheron.network/blog/deploy-gemma-4-gpu-cloud/)  
5. Gemma 4 vs Qwen 3.5: Which Open-Weight Model Should You Use for Local AI Workflows?, accessed April 10, 2026, [https://www.mindstudio.ai/blog/gemma-4-vs-qwen-3-5-open-weight-comparison](https://www.mindstudio.ai/blog/gemma-4-vs-qwen-3-5-open-weight-comparison)  
6. Gemma 4 \- How to Run Locally | Unsloth Documentation, accessed April 10, 2026, [https://unsloth.ai/docs/models/gemma-4](https://unsloth.ai/docs/models/gemma-4)  
7. Building AI Teams with Docker Sandboxes & Docker Agent, accessed April 10, 2026, [https://www.docker.com/blog/building-ai-teams-docker-sandboxes-agent/](https://www.docker.com/blog/building-ai-teams-docker-sandboxes-agent/)  
8. How to sandbox AI agents in 2026: Firecracker, gVisor, runtimes & isolation strategies, accessed April 10, 2026, [https://substack.com/home/post/p-187330720](https://substack.com/home/post/p-187330720)  
9. MCP for Zotero — connect your library to Claude, ChatGPT, and other AI assistants, accessed April 10, 2026, [https://forums.zotero.org/discussion/130133/mcp-for-zotero-connect-your-library-to-claude-chatgpt-and-other-ai-assistants](https://forums.zotero.org/discussion/130133/mcp-for-zotero-connect-your-library-to-claude-chatgpt-and-other-ai-assistants)  
10. Zotero AI Integration: Search, Add & Cite Papers \- MCP Market, accessed April 10, 2026, [https://mcpmarket.com/server/zotero-7](https://mcpmarket.com/server/zotero-7)  
11. Feature Request: Agents Support / PaperQA2 Integration \- Zotero ..., accessed April 10, 2026, [https://forums.zotero.org/discussion/130424/feature-request-agents-support-paperqa2-integration](https://forums.zotero.org/discussion/130424/feature-request-agents-support-paperqa2-integration)  
12. CiteLLM: An Agentic Platform for Trustworthy Scientific ... \- arXiv, accessed April 10, 2026, [https://arxiv.org/abs/2602.23075](https://arxiv.org/abs/2602.23075)  
13. Grounded Knowledge Graph Extraction via LLMs: An Anchor-Constrained Framework with Provenance Tracking \- MDPI, accessed April 10, 2026, [https://www.mdpi.com/2073-431X/15/3/178](https://www.mdpi.com/2073-431X/15/3/178)  
14. The OpenHands Software Agent SDK: A Composable and Extensible Foundation for Production Agents \- arXiv, accessed April 10, 2026, [https://arxiv.org/html/2511.03690v1](https://arxiv.org/html/2511.03690v1)  
15. Event Sourcing Pattern \- Azure Architecture Center | Microsoft Learn, accessed April 10, 2026, [https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)  
16. Event-Driven Architecture for AI Agents: Patterns and Benefits \- Atlan, accessed April 10, 2026, [https://atlan.com/know/event-driven-architecture-for-ai-agents/](https://atlan.com/know/event-driven-architecture-for-ai-agents/)  
17. Building AI Coding Agents for the Terminal: Scaffolding, Harness, Context Engineering, and Lessons Learned \- arXiv, accessed April 10, 2026, [https://arxiv.org/html/2603.05344v1](https://arxiv.org/html/2603.05344v1)  
18. Advanced RAG Techniques for High-Performance LLM Applications \- Neo4j, accessed April 10, 2026, [https://neo4j.com/blog/genai/advanced-rag-techniques/](https://neo4j.com/blog/genai/advanced-rag-techniques/)  
19. 5 Best Agentic Development Environments for Enterprise Teams in 2026 | Augment Code, accessed April 10, 2026, [https://www.augmentcode.com/tools/best-agentic-development-environments](https://www.augmentcode.com/tools/best-agentic-development-environments)  
20. unsloth/gemma-4-26B-A4B-it-GGUF \- Hugging Face, accessed April 10, 2026, [https://huggingface.co/unsloth/gemma-4-26B-A4B-it-GGUF](https://huggingface.co/unsloth/gemma-4-26B-A4B-it-GGUF)  
21. Gemma 4 vs Qwen 3.5 vs Llama 4: Updated Benchmarks, New Leader \- ai.rs, accessed April 10, 2026, [https://ai.rs/ai-developer/gemma-4-vs-qwen-3-5-vs-llama-4-compared](https://ai.rs/ai-developer/gemma-4-vs-qwen-3-5-vs-llama-4-compared)  
22. Efficient and Interpretable Multi-Agent LLM Routing via Ant Colony Optimization \- arXiv, accessed April 10, 2026, [https://arxiv.org/html/2603.12933v1](https://arxiv.org/html/2603.12933v1)  
23. Router-Based Agents: The Architecture Pattern That Makes AI Systems Scale \- Towards AI, accessed April 10, 2026, [https://pub.towardsai.net/router-based-agents-the-architecture-pattern-that-makes-ai-systems-scale-a9cbe3148482](https://pub.towardsai.net/router-based-agents-the-architecture-pattern-that-makes-ai-systems-scale-a9cbe3148482)  
24. OpenCode Agents: Another Path to Self-Healing Documentation Pipelines \- Medium, accessed April 10, 2026, [https://medium.com/@richardhightower/opencode-agents-another-path-to-self-healing-documentation-pipelines-51cd74580fc7](https://medium.com/@richardhightower/opencode-agents-another-path-to-self-healing-documentation-pipelines-51cd74580fc7)  
25. Software Architecture That Agents Actually Like \- Micheál Reilly, accessed April 10, 2026, [https://actuallymaybe.com/blog/agent-friendly-architecture/](https://actuallymaybe.com/blog/agent-friendly-architecture/)  
26. The Best Open-Source LLMs in 2026 \- BentoML, accessed April 10, 2026, [https://www.bentoml.com/blog/navigating-the-world-of-open-source-large-language-models](https://www.bentoml.com/blog/navigating-the-world-of-open-source-large-language-models)  
27. Architect-centric agentic swarm plugin for OpenCode. Hub-and-spoke orchestration with SME consultation, code generation, and QA review. \- GitHub, accessed April 10, 2026, [https://github.com/zaxbysauce/opencode-swarm](https://github.com/zaxbysauce/opencode-swarm)  
28. Overview \- OpenHands Docs, accessed April 10, 2026, [https://docs.openhands.dev/sdk/arch/overview](https://docs.openhands.dev/sdk/arch/overview)  
29. Best Agentic AI Platforms for OpenCode \- SourceForge, accessed April 10, 2026, [https://sourceforge.net/software/agentic-ai/integrates-with-opencode/](https://sourceforge.net/software/agentic-ai/integrates-with-opencode/)  
30. Building AI Agents with TypeScript: My Journey Into Agentic AI | by Eva Matova \- Medium, accessed April 10, 2026, [https://medium.com/@eva.matova6/building-ai-agents-with-typescript-my-journey-into-agentic-ai-14c9f749b503](https://medium.com/@eva.matova6/building-ai-agents-with-typescript-my-journey-into-agentic-ai-14c9f749b503)  
31. Operationalizing Large Language Models for Clinical Research Data Extraction: Methods, Quality Control, and Governance \- PMC, accessed April 10, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12932350/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12932350/)  
32. CiteLLM: An Agentic Platform for Trustworthy Scientific Reference Discovery \- arXiv, accessed April 10, 2026, [https://arxiv.org/html/2602.23075v1](https://arxiv.org/html/2602.23075v1)  
33. OpenHands | The Open Platform for Cloud Coding Agents, accessed April 10, 2026, [https://openhands.dev/](https://openhands.dev/)  
34. scientific-writing-guide | Skills Ma... \- LobeHub, accessed April 10, 2026, [https://lobehub.com/skills/wentorai-research-plugins-scientific-writing-guide](https://lobehub.com/skills/wentorai-research-plugins-scientific-writing-guide)  
35. Beaver: Zotero AI plugin to chat with your library, organize, discover research, and read papers, accessed April 10, 2026, [https://forums.zotero.org/discussion/126573/beaver-zotero-ai-plugin-to-chat-with-your-library-organize-discover-research-and-read-papers](https://forums.zotero.org/discussion/126573/beaver-zotero-ai-plugin-to-chat-with-your-library-organize-discover-research-and-read-papers)  
36. Multi-Model Routing: Optimize AI Tasks Efficiently \- TrueFoundry, accessed April 10, 2026, [https://www.truefoundry.com/blog/multi-model-routing](https://www.truefoundry.com/blog/multi-model-routing)  
37. AI-Assisted Tools for Scientific Review Writing: Opportunities and Cautions \- PMC, accessed April 10, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12400276/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12400276/)  
38. AI Agent Sandbox: How to Safely Run Autonomous Agents in 2026 \- Firecrawl, accessed April 10, 2026, [https://www.firecrawl.dev/blog/ai-agent-sandbox](https://www.firecrawl.dev/blog/ai-agent-sandbox)  
39. Agentic Platform Engineering: How to Build an Agent Infrastructure That Scales From Your Laptop to the Enterprise \- DEV Community, accessed April 10, 2026, [https://dev.to/sarony11/agentic-platform-engineering-how-to-build-an-agent-infrastructure-that-scales-from-your-laptop-to-11np](https://dev.to/sarony11/agentic-platform-engineering-how-to-build-an-agent-infrastructure-that-scales-from-your-laptop-to-11np)  
40. Event sourcing pattern \- AWS Prescriptive Guidance, accessed April 10, 2026, [https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/event-sourcing.html](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/event-sourcing.html)  
41. Gemma 4 vs Qwen 3.5 Benchmark Comparison : r/LocalLLaMA \- Reddit, accessed April 10, 2026, [https://www.reddit.com/r/LocalLLaMA/comments/1sbp8ny/gemma\_4\_vs\_qwen\_35\_benchmark\_comparison/](https://www.reddit.com/r/LocalLLaMA/comments/1sbp8ny/gemma_4_vs_qwen_35_benchmark_comparison/)  
42. Top 5 LLM Routing Techniques \- Maxim AI, accessed April 10, 2026, [https://www.getmaxim.ai/articles/top-5-llm-routing-techniques/](https://www.getmaxim.ai/articles/top-5-llm-routing-techniques/)  
43. Security \- OpenHands Docs, accessed April 10, 2026, [https://docs.openhands.dev/sdk/arch/security](https://docs.openhands.dev/sdk/arch/security)  
44. OpenHands/OpenHands: OpenHands: AI-Driven ... \- GitHub, accessed April 10, 2026, [https://github.com/OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)  
45. Gemma 4 model card | Google AI for Developers, accessed April 10, 2026, [https://ai.google.dev/gemma/docs/core/model\_card\_4](https://ai.google.dev/gemma/docs/core/model_card_4)  
46. Security & Action Confirmation \- OpenHands Docs, accessed April 10, 2026, [https://docs.openhands.dev/sdk/guides/security](https://docs.openhands.dev/sdk/guides/security)  
47. Gemma 4 31B vs Qwen 3.5: Which Open-Weight Model Should You Use for Agentic Workflows? | MindStudio, accessed April 10, 2026, [https://www.mindstudio.ai/blog/gemma-4-31b-vs-qwen-3-5-comparison](https://www.mindstudio.ai/blog/gemma-4-31b-vs-qwen-3-5-comparison)  
48. The Ultimate Guide to Event-Driven Architecture Patterns \- Solace, accessed April 10, 2026, [https://solace.com/event-driven-architecture-patterns/](https://solace.com/event-driven-architecture-patterns/)  
49. 15 Best Open-Source RAG Frameworks in 2026 \- Firecrawl, accessed April 10, 2026, [https://www.firecrawl.dev/blog/best-open-source-rag-frameworks](https://www.firecrawl.dev/blog/best-open-source-rag-frameworks)  
50. Would you recommend starting new agentic projects with Typescript instead of Python?, accessed April 10, 2026, [https://www.reddit.com/r/datascience/comments/1o6tquy/would\_you\_recommend\_starting\_new\_agentic\_projects/](https://www.reddit.com/r/datascience/comments/1o6tquy/would_you_recommend_starting_new_agentic_projects/)  
51. An Updated Academic Workflow: Zotero & Obsidian | by Alexandra Phelan \- Medium, accessed April 10, 2026, [https://medium.com/@alexandraphelan/an-updated-academic-workflow-zotero-obsidian-cffef080addd](https://medium.com/@alexandraphelan/an-updated-academic-workflow-zotero-obsidian-cffef080addd)  
52. The best way to do agentic development in 2026 \- DEV Community, accessed April 10, 2026, [https://dev.to/chand1012/the-best-way-to-do-agentic-development-in-2026-14mn](https://dev.to/chand1012/the-best-way-to-do-agentic-development-in-2026-14mn)  
53. How to Use Zotero with Word: Bibliography and AI Integrations \- The Effortless Academic, accessed April 10, 2026, [https://effortlessacademic.com/how-to-use-zotero-with-word-bibliography-and-ai-integrations/](https://effortlessacademic.com/how-to-use-zotero-with-word-bibliography-and-ai-integrations/)  
54. Ultimate Guide \- The Best Open Source LLMs for Reasoning in 2026 \- SiliconFlow, accessed April 10, 2026, [https://www.siliconflow.com/articles/en/best-open-source-LLMs-for-reasoning](https://www.siliconflow.com/articles/en/best-open-source-LLMs-for-reasoning)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAYCAYAAACldpB6AAACSklEQVR4Xu2XPUsdQRSGT1BBQeMnSjBgYqFYiYiKICj5gFikCQkErNVSFMTKSvwDYiEiiliIIjaCpEiRIkUgIKQQISAYCYQUSSFaCer7Ojve2bk7617FvQrzwIN3z93lzpmdOXMU8Xg8nmxewH14mNBX6rFUeQxH4DychE/CX0dSCpfgAHwq6hnTCn3jIzgL1+Cz4JoswDP4JrgugL3wAHYEsbRogD/gICyG/fAn7DRvioCJ/oLnDmf0jXVwHdbqAKiE30UlXG/EObMromY1LQpFvZCN4LNmGn6CJUbMph3uiFo9pltwV9TkXsKlPaovAlrhkWT/MCeHs1dmxO6aRvgHTljxd/BEVKIu3sJhK1YE5+BrM/gBNpkBUXuIy8X+4Wo4JJktkwZ8SdyW9liYIMfIsbpokfBKJpyUcUmQA5ffKeyxv8gDOlnXJNjxONrgJiy3v7Bx1YMkVInap/ZpEicrfRxMMirZXCeB24DF/6P9RRTcY9xrdj3IF2MSnWyuk9At6sVyi1yLqx7kC1eyrngUug3gCudKj4U3L8nN6wGfZ/G0m5I4rxoWBxwHx2MnqyeBp8R11Ig6Er+IOuZjuU09INx3L+H7HOy6fNINx3EgRmMTwCr/T8LLmz0PX4KN68iP5L7VA8LVNQW/Saaqc7LZ4K1KZpzN8C/8DZ8HMY0+Zpet+BXsEdhV/ZdwS3kM9yS+GUkLJr8tqrqzZV6EXyXcufIzW+vPkn0E8hnm5JyEhwL/d+EL4RbiX14nhSunT1QN8ng8Ho8nARdsdIY161vXegAAAABJRU5ErkJggg==>