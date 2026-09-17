# AegisAI: 24-month product portfolio and research programme

## 1. Revised direction

Build **our own modular cybersecurity products**, with a shared platform, reusable components, and an open-source research foundation.

Gamification and adaptive training become the **first product, delivered within 3–6 months**. The subsequent implementation priorities are:

1. **Security operations:** asset and software visibility, explainable detection, and guided response.
2. **Defense box and adversarial testing:** local monitoring and controlled security validation.
3. **Agent security platform:** identities, permissions, local-model access, and auditable agent workflows.

The internal research and engineering agent workspace starts early, but commercialising it follows the other priorities.

NetBird becomes an **architectural, engineering, and business-model reference**, with selective reuse of appropriate open-source components. AegisAI’s value will come from its own workflows, intelligence, integrations, user experience, and operational capabilities.

Use a fresh 24-month horizon measured from kickoff. Previous dates and unvalidated performance targets are superseded. With 2–4 core contributors, maintain **one primary product-development stream**, alongside limited research and maintenance; subsequent products advance as earlier releases stabilise.

## 2. Product portfolio and shared architecture

### Products and release boundaries

Working labels below describe capabilities, not final branding.

| Product | Initial customer outcome | First-release boundary | Later extension |
|---|---|---|---|
| **Human Firewall** | Improve cybersecurity learning and reporting behaviour | Portuguese training, scenarios, supportive gamification, performance-based adaptation, administrator reporting | Broader content, integrations, validated adaptive methods |
| **Security Operations** | Understand exposure and investigate actionable findings | Asset inventory, SBOM/SCA ingestion, vulnerability prioritisation, selected identity/security events, evidence-backed alerts, guided response | Validated UEBA, cross-source correlation, approved containment |
| **Defense Box and Validation** | Monitor a local environment and verify selected defenses | Software appliance, passive telemetry, local analysis, controlled attack-emulation tests, findings and remediation verification | Dedicated hardware packaging, broader validation, industrial pilots |
| **Agent Security** | Control which resources and tools agents can use | Agent identities, scoped tool permissions, isolated execution, model access policies, budgets, audit and replay | Enterprise integrations, policy administration, evaluated multi-agent workflows |

Each product must function independently while sharing identity, evidence, deployment, and integration capabilities. Customers should not need to purchase training to use security operations.

### Restore the wider blueprint

Carry forward the original ambitions with explicit delivery status:

- **Asset discovery and SCA:** production capabilities in Security Operations.
- **UEBA and graph analytics:** research from the outset; production promotion requires useful precision and acceptable alert burden.
- **Explainable AI:** evidence, contributing signals, uncertainty, and recommended actions across products. Generated reasoning text alone is not a validated explanation.
- **Adversarial simulation:** controlled validation product; compare scripted techniques, generative approaches, and GANs rather than assuming GANs are necessary.
- **Local models and desktop integration:** reusable edge capabilities; begin with a service and web interface, adding a desktop shell when installation or offline workflows justify it.
- **Response and recovery:** guided playbooks, approved actions, remediation verification, recovery exercises, and evidence collection.
- **Federated intelligence:** staged research, conditional on useful local models and participating organisations.
- **IoT/OT:** later passive-monitoring research and a controlled industrial pilot.
- **Insurance and national frameworks:** evidence-export and partnership discovery; no promised premium reductions or automatic compliance.
- **International expansion:** market research after Portuguese customer validation, including the original Lusophone-market ambition.

### Shared platform built from the beginning

Bring foundational work forward from the architecture document’s later phases. Authentication, data contracts, observability, deployment automation, and testing must exist before the first customer release.

Use five functional areas:

1. **Customer applications:** learning, security findings, investigations, validation, and agent administration.
2. **Platform services:** organisation configuration, identity, permissions, policies, approvals, subscriptions, and audit.
3. **Evidence and intelligence:** asset records, normalised events, findings, model evaluation, provenance, and reports.
4. **Edge and execution:** collectors, local inference, isolated test runners, and controlled action execution.
5. **Delivery infrastructure:** packaging, updates, secrets, monitoring, backups, and recovery.

These are logical boundaries, not a requirement for five separately deployed services. Start with a modular application, workers, PostgreSQL, object storage, and isolated edge components. Introduce additional infrastructure only when measured requirements justify it.

Preserve raw sensitive telemetry locally where practical. Centrally store only the permitted evidence and aggregates needed for customer workflows. Resolve the earlier central-data-lake versus local-processing conflict through explicit data classifications and per-event handling rules.

### NetBird: learn, reuse, and retain ownership

Study NetBird’s separation of management and traffic paths, peer enrolment, identity integration, policy distribution, NAT traversal, relays, and operational packaging. These are useful reference patterns for connecting AegisAI edge components. [NetBird architecture](https://docs.netbird.io/about-netbird/how-netbird-works).

The initial decision is:

- Use upstream NetBird optionally for development and customer-edge connectivity.
- Put connectivity behind an AegisAI adapter so product features do not depend on NetBird-specific objects.
- Own AegisAI’s customer console, evidence model, policy workflows, analytics, product APIs, and deployment lifecycle.
- Reuse mature networking rather than designing new cryptography.
- Avoid an initial fork; assess a fork only against a documented product requirement and maintenance cost.
- Keep agent network access separate from sandboxing and tool-level authorisation.

NetBird’s mixed licensing and commercial-only capabilities must be evaluated component by component. If self-hosted NetBird is used, its current single-account boundary requires separate customer stacks for tenant isolation. [Licence](https://github.com/netbirdio/netbird/blob/main/LICENSE), [enterprise deployment constraints](https://docs.netbird.io/selfhosted/enterprise).

### Interfaces to specify

Publish versioned contracts for:

- Organisations, identities, assets, software components, and permissions.
- Learning events, security observations, findings, and supporting evidence.
- Proposed actions, approvals, execution results, and rollback status.
- Collector enrolment, health, configuration, and updates.
- Simulation scope, execution limits, results, and cleanup.
- Agent identities, tool capabilities, budgets, and execution traces.

Use REST/OpenAPI and asynchronous jobs initially. Adapters translate upstream tools into these contracts. Human-learning profiles and operational security findings remain separate datasets with explicit rules for any permitted connection.

## 3. Implementation roadmap

| Period | Primary delivery | Parallel research and preparation | Exit gate |
|---|---|---|---|
| **Months 1–3** | Human Firewall pilot-ready product and minimum shared platform | Reproduce existing experiments; security-operations discovery; internal agent-workspace baseline | Complete training journey, isolation, reporting, deployment, backup restoration, and pilot protocol |
| **Months 4–6** | Paid Human Firewall pilots and production release | Security Operations architecture and connector proof of concept; evaluate adaptation | Operable training product with measured customer value, documented support, and passed security checks |
| **Months 7–9** | Security Operations pilot: asset/SCA visibility, findings, evidence, guided response | UEBA evaluation; passive Defense Box lab prototype | Useful findings from real pilot data and acceptable investigation effort |
| **Months 10–12** | Security Operations production release | Local analysis, controlled validation harness, connector SDK | Reliable ingestion, explainable findings, approved actions, restore/upgrade tests |
| **Months 13–15** | Defense Box and Validation pilot | Detection robustness, adversarial evaluation, local inference optimisation | Safe execution boundaries, reproducible tests, measured appliance overhead |
| **Months 16–18** | Defense Box and Validation production release | Agent Security customer discovery; federated-learning feasibility; passive OT lab | Supported appliance deployment, rollback, scoped validation, and customer acceptance |
| **Months 19–21** | Agent Security external pilot | Agent attack benchmarks, memory integrity, policy enforcement, controlled multi-agent research | Enforced tool boundaries, isolation, revocation, cost controls, and auditable recovery |
| **Months 22–24** | Agent Security production release and portfolio integration | Conditional OT pilot; insurance/MSP partnerships; next-market assessment | Independently usable products, tested shared services, sustainable operating costs |

These are target release windows with explicit gates. If a gate fails, reduce release breadth or move the dependent milestone; do not classify a prototype as production-ready to preserve the calendar.

### First 90 days

- **Weeks 1–2:** source-to-roadmap traceability, product requirements, customer interviews, data classification, architecture decisions.
- **Weeks 3–4:** deployment pipeline, authentication, organisation isolation, audit, first training scenarios, experiment reproducibility.
- **Weeks 5–8:** complete training journeys, transparent adaptation rules, administrator reports, content review, monitoring.
- **Weeks 9–10:** restore and upgrade exercises, privacy workflows, accessibility and user testing, pilot pricing.
- **Weeks 11–13:** release candidate, security review, onboarding preparation, and Security Operations requirements.

The 3–6-month boundary covers the first training-product delivery. Maintenance and evidence-based improvements continue afterward, with a capped allocation so they do not absorb the broader roadmap.

## 4. Research, work packages, and business model

### Retain and broaden all seven work packages

| Original work package | Revised portfolio-wide responsibility |
|---|---|
| **WP1 — AI experiments** | Reproducibility, training adaptation, UEBA, explainability, local models, adversarial and agent evaluation |
| **WP2 — Data modelling** | Shared schemas, provenance, asset relationships, event contracts, privacy boundaries |
| **WP3 — Gamification UX** | First-product delivery within 3–6 months; reusable design system and later product usability research |
| **WP4 — Edge architecture** | Collectors, local inference, Defense Box, secure connectivity, optional federated experiments |
| **WP5 — Governance** | Threat modelling, AI governance, regulatory applicability, controlled testing, publication review |
| **WP6 — SME integration** | Discovery, connectors, onboarding, operational workflows, support, partnerships |
| **WP7 — Data lifecycle** | Classification, quality, retention, rights, deletion, lineage, research access |

Add three delivery work packages: **Product and Commercialisation**, **Platform Engineering and Reliability**, and **Validation and Release Assurance**.

Every work package will have an owner role, deliverables, dependencies, acceptance evidence, and links to product milestones.

### Research programme

Retain the original research breadth while prioritising experiments that can influence product decisions:

- **Human factors:** adaptive versus static learning, delayed retention, reporting behaviour, accessibility, and voluntary feedback.
- **UEBA and correlation:** temporal generalisation, ground-truth quality, concept drift, false-alert burden, and cross-source utility.
- **Explainability:** evidence faithfulness, uncertainty communication, analyst comprehension, and decision quality.
- **Adversarial validation:** coverage, reproducibility, safe execution, and measurable improvement after remediation.
- **Local and federated intelligence:** resource use, model quality, privacy leakage, poisoning resilience, and non-IID data.
- **Agent systems:** task reliability, memory integrity, prompt injection, tool permissions, recovery, and cost.

Retain empathic interaction as supportive UX research. Biometric workplace emotion inference and personality-based employee risk scoring remain outside client products.

Extend the existing literature and news register for each product family. Recent agent work—including [AgentLAB](https://arxiv.org/abs/2602.16901), [AMA-Bench](https://arxiv.org/abs/2602.22769), and [AgentFlow](https://arxiv.org/abs/2608.22868)—will inform specific evaluations rather than become mandatory platform dependencies.

### Own-product commercial model

Maintain a useful community edition and research ecosystem. Monetise managed operation, enterprise administration, maintained integrations, support, and customer-specific implementation.

Define separate packages for training, security operations, validation appliances, and agent governance, with optional bundles. Cost each against its actual operating drivers: learners, assets, telemetry, appliance support, or agent execution.

Use NetBird’s community/managed/enterprise structure as one reference, alongside [Wazuh’s managed offering](https://wazuh.com/cloud/) and [Tailscale’s commercial tiers](https://tailscale.com/pricing). Preserve clear distinctions between free access, open-source licensing, proprietary extensions, and paid service.

Custom work requires a defined scope and a decision about whether it becomes a maintained product capability. Customer data and bespoke configurations remain private.

## 5. Documentation and production acceptance

Create the indexed Markdown pack in the current folder, preserving source documents. Organise it around:

- Portfolio strategy and source-to-roadmap mapping.
- Shared architecture and build/reuse decisions.
- Four product specifications and release backlogs.
- Research programme and work-package ownership.
- 24-month roadmap and detailed first-90-day plan.
- Market, packaging, open-source, and cost model.
- Security, privacy, regulatory analysis, and production handbook.
- Linked evidence register covering research, news, and use cases.

The traceability matrix must account for **every major blueprint capability, all seven work packages, the thirteen architecture layers, and the five original integrated “squad products.”** Each receives a disposition: retained, combined, revised, research-only, or deferred—with a reason and destination milestone.

Apply release checks to every product:

- Isolation, least privilege, auditability, privacy workflows, dependency inventory, and vulnerability handling.
- Reproducible deployment, monitoring, backup restoration, upgrades, rollback, and support ownership.
- Product-specific operational evaluation using representative customer conditions.
- Independent security review before general availability.
- Clear separation between research results and supported product claims.

Additional checks include ingestion loss and duplication for Security Operations; resource overhead, scope enforcement, abort and cleanup for the Defense Box; and prompt-injection resistance, tool denial, credential protection, and revocation for Agent Security.

Production readiness is assessed at **each product release**, starting with Human Firewall within months 3–6. Integration, security, and operational reliability will not be postponed until the end of the portfolio roadmap.
