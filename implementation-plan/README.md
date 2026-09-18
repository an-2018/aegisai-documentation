# AegisAI implementation and research handbook

Version 1.0 · Prepared 18 September 2026 · Owner: Product Lead

**Status: approved direction translated into implementation specifications. Product development, customer validation, security testing, and legal applicability reviews remain future work.** Nothing in this pack certifies an existing production deployment.

AegisAI will build four independently usable products on a shared platform: Human Firewall in months 3–6, Security Operations in months 10–12, Defense Box and Validation in months 16–18, and Agent Security in months 22–24. Months run from an explicitly recorded future kickoff, not from the date of this document. Release gates control progression.

NetBird is an architectural and commercial reference and an optional upstream connectivity provider. AegisAI owns its product experience, evidence model, integrations, intelligence, and lifecycle. Training is not a prerequisite for the other products.

## Reading order

| Document | Decisions and practical use |
|---|---|
| [Portfolio strategy](01-portfolio-strategy.md) | Customers, product sequence, ownership, scope and assumptions |
| [Source assessment and traceability](02-source-traceability.md) | Original blueprint, WP1–7, all 13 layers and five squad products; retained and revised ambitions |
| [Shared architecture](03-shared-architecture.md) | Trust boundaries, deployment, data flows and build/reuse choices |
| [NetBird study](04-netbird-study.md) | How it works, limitations, component reuse, integration and business lessons |
| [Interface contracts](05-interface-contracts.md) | Versioned API design, event envelope, jobs, approvals and adapter boundaries |
| [Human Firewall](products/01-human-firewall.md) | Months 1–6 specification, backlog and release acceptance |
| [Security Operations](products/02-security-operations.md) | Months 7–12 specification, backlog and release acceptance |
| [Defense Box and Validation](products/03-defense-box.md) | Months 13–18 specification, backlog and release acceptance |
| [Agent Security](products/04-agent-security.md) | Months 19–24 specification, backlog and release acceptance |
| [Research programme](06-research-programme.md) | Experiments, baselines, evaluation protocols and promotion rules |
| [Internal agent workspace](07-internal-agent-workspace.md) | Early research/engineering tooling, model evaluation and containment |
| [Roadmap and first 90 days](08-roadmap-backlog.md) | Milestones, dependencies, ownership and capacity rules |
| [Work packages](09-work-packages.md) | WP1–10 deliverables, acceptance and responsibilities |
| [Market and commercial model](10-market-business-model.md) | Competitors, discovery, pricing hypotheses, costs, open-core boundary |
| [Security, privacy and regulation](11-security-privacy-regulation.md) | Threat model, data handling, legal applicability and risk register |
| [Production and pilot handbook](12-production-handbook.md) | Release gates, runbooks, customer lifecycle and support |
| [Evidence and current developments](13-evidence-register.md) | Primary sources, dated news, use cases and limitations |
| [Decision register](14-decisions.md) | Accepted defaults, revisit triggers and outstanding external validations |

## How to use this pack

1. Assign actual people to the owner roles and record kickoff in the [roadmap](08-roadmap-backlog.md).
2. Import only the first-90-day backlog into the chosen issue tracker; preserve task IDs and acceptance evidence.
3. Store implementation and test artefacts against their task and release gate. A checkbox without evidence does not close a gate.
4. Review scope every two weeks, customer value monthly, and portfolio progression at each release gate.
5. Update source dates and legal/pricing checks before a customer commitment. Evidence is a dated snapshot, not a monitoring service.

## Evidence conventions

- **Local:** a project source or inspected prototype; does not establish external validity.
- **Primary research:** authors' paper or original study; preprints are labelled and findings remain bounded by evaluation conditions.
- **Official documentation:** upstream functionality or standards information; verify the pinned version during implementation.
- **Vendor claim/case:** vendor-reported positioning or outcome, not independent proof.
- **Design decision / hypothesis:** an AegisAI choice or proposed experiment, not a finding.

Existing source files, [the approved plan](../plan.md), and the separate documentation portal are preserved. Relative links and ordinary Markdown keep this pack suitable for later Docusaurus import. This delivery creates documentation only; no product application, cloud deployment, vendor purchase, or customer communication is represented as completed.
