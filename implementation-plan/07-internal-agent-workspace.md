# Internal research and engineering workspace

[Index](README.md) · Owner: Research Lead with Platform/Security Lead

## Purpose and limited early scope

Support literature review, citation verification, bounded code changes, experiment execution and technical writing. This is an internal productivity capability in months 1–3, not a competing commercial release or an attempt to implement every component in the supplied frontier-agent notes.

Begin with OpenHands as the engineering-runtime candidate, one bounded worker per task, an approved model adapter and a controlled tool gateway. Use the runtime's security features as integration aids; deterministic permissions and sandbox boundaries remain independent. [OpenHands security architecture](https://docs.openhands.dev/sdk/arch/security).

## Minimal workflow

1. A researcher defines a task, permitted sources/files, budget and expected artefact.
2. Retrieval saves source URL, author/publisher, date, access date, document version and supporting passage location.
3. The worker proposes a bounded action. The gateway validates scope and any required approval.
4. A dedicated worker VM executes an unprivileged task container with a task workspace and no host socket or production secrets.
5. Checkpoints persist task state and evidence, not unrestricted model-generated instructions.
6. A reviewer checks citations, code diff or experiment output before promotion or publication.

Maintain a reference library and machine-readable bibliography alongside experiment manifests. GROBID/Pandoc or equivalent tools may be added when input/output needs justify them; a custom research browser and custom IDE are not initial deliverables.

## Model and memory decisions

Evaluate one local open-weight model supported by available hardware against one approved hosted model using R6 tasks. Gemma and other families named in the notes are candidates, not locked model/version/hardware requirements. Verify licence and actual resource use at selection. Sensitive data cannot be silently routed to the hosted option on local failure.

Start with explicit task state, artefact storage and PostgreSQL-backed retrieval. Separate curated knowledge, task history and untrusted retrieved text. Every memory item has source, scope, timestamp, retention and deletion support. Do not introduce a graph database, shared autonomous memory or fine-tuning before showing a baseline deficiency.

Tools begin with read-only retrieval, workspace file access and isolated tests. Network destinations are allowlisted. Shell operations, browser actions and external writes have separate capabilities. Limit run time, calls, concurrency and spend; do not rely on a natural-language instruction as the limit.

## Adoption schedule

| Window | Deliverable | Acceptance |
|---|---|---|
| M1 | Fixed task suite, model/tool policy and disposable sandbox | No production credentials; cost and action logs available |
| M2 | Retrieval/citation and experiment workflows | Human review finds traceable sources; restart does not duplicate external actions |
| M3 | Measured internal comparison | Correctness/cost report and decision to retain, simplify or replace components |
| M4–12 | Incremental use and adversarial tests | Measurable benefit within research allocation; isolation preserved |
| M13–18 | Extract reusable identity/gateway/execution contracts | Independent of runtime-specific objects; external discovery started |
| M19–24 | Productise validated capabilities | Agent Security release gates, not internal-use status alone |

## Supplied-note decisions

Retain model routing, tool contracts, scientific provenance, durable state and explicit authority from all four research notes. Defer full multi-agent swarms, RL training infrastructure, many databases, Kafka/Ray/Kubernetes and unrestricted computer use. Introduce Temporal only when workflow durability requirements exceed the simpler job/checkpoint design. Trial NetBird Agent Network separately as described in the [NetBird study](04-netbird-study.md).

Internal acceptance includes injected-source tests, blocked secret export, denied network targets, read-only replay, cancellation, corrupted checkpoint recovery and an audit record of every authorised side effect. Frontier research informs these evaluations; it does not confer production maturity.
