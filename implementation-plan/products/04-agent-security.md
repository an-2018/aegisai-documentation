# Product 4: Agent Security

[Index](../README.md) · Owner: Platform/Security Lead; research: Research Lead · Target: external pilot months 19–21, production months 22–24

## Product purpose

Give engineering and security teams enforceable control over an agent's identity, tools, resources, model use and execution evidence. Productise lessons from the internal workspace only after separate customer discovery. This is a governance/execution product, not a promise to build a frontier foundation model or a general autonomous employee.

An administrator registers an agent workload, assigns a task-scoped policy and budget, runs an approved workflow, inspects evidence, and revokes authority when necessary. Developers integrate through documented APIs and a small SDK; existing agent runtimes remain usable.

## Authority boundaries

- Human identity, workload identity, execution instance and network peer are distinct records.
- Typed tool policies restrict operation, target and parameters. Network access alone never authorises a tool call.
- Untrusted retrieved content and tool outputs cannot grant permissions or rewrite policy.
- A deterministic gateway checks capabilities independently of model-generated risk assessments.
- Provider keys remain in the gateway/secret store; workers receive short-lived, scoped credentials where possible.
- Sandboxes use dedicated worker VMs with unprivileged task containers and controlled egress; no host socket or production secret mounts.
- Budget exhaustion stops new calls; interrupted runs retain evidence and require reconciliation for uncertain side effects.
- Replay is read-only reconstruction by default, not repeated execution.

## Initial supported workflows

Support one sandboxed repository-maintenance workflow and one evidence-retrieval/report-drafting workflow. Permit read-only source access and reviewed patch export; deployment and external publication are separate approved actions. Native computer/browser automation remains an optional isolated tool, not an unrestricted desktop session.

## Implementation backlog

| ID | Deliverable | Dependency | Acceptance evidence |
|---|---|---|---|
| AS-01 | Workload identity and policy service | CORE-01/04; internal workspace | Scoped issue/revoke, task binding and denied cross-workload access |
| AS-02 | Tool gateway and SDK | AS-01; interface contracts | Parameter validation, capability denial, approval binding and conformance tests |
| AS-03 | Sandboxed execution and egress | AS-02; DB packaging lessons | No host/secret escape in test suite; blocked unapproved destinations |
| AS-04 | Model access and cost controls | Workspace benchmarks | Provider routing respects data class, model allowlist, hard budget and timeout |
| AS-05 | Audit/checkpoint/recovery | AS-02–04 | Reconstruct decisions and partial effects; no duplicated actions after restart |
| AS-06 | Customer integrations and release | AS-01–05; R6 | Two supported workflows, independent assessment, G8 evidence and support guide |

## Research-to-product gate

Evaluate clean-task success alongside policy-violation rate, attempted exfiltration success, injection persistence, memory poisoning, revocation delay, latency and cost. Test attacks in retrieved pages, repository files, tool output and stored memory. Report denominator, task distribution, model/runtime revisions and residual failures; a zero count in a finite benchmark is not proof of universal safety.

AgentLAB informs long-horizon adversarial evaluation; AMA-Bench informs memory experiments; AgentFlow informs data-flow enforcement hypotheses. They do not establish production readiness of AegisAI. [AgentLAB](https://arxiv.org/abs/2602.16901), [AMA-Bench](https://arxiv.org/abs/2602.22769), [AgentFlow](https://arxiv.org/abs/2608.22868).

G7 requires external users to complete supported workflows under enforced policy. G8 requires no unresolved critical/high assessment findings, tested isolation and revocation, recovery and cost accounting, and a documented compatibility matrix. Multiple collaborating agents are a later supported configuration only after outperforming the simpler baseline at acceptable cost and containment.
