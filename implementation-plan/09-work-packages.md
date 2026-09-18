# Work-package ownership and deliverables

[Index](README.md) · Owner: Product Lead

Owner roles: PL = Product Lead; PS = Platform/Security Lead; AE = Application Engineer; RL = Research Lead. Assign people at kickoff. Work packages are responsibilities across one product stream, not ten simultaneous teams.

| WP | Owner | Deliverables | Dependencies | Acceptance and milestones |
|---|---|---|---|---|
| WP1 AI experiments and modelling | RL | R0 ledger; R1–R6 protocols; dataset/model cards; evaluation artefacts; promotion reports | WP2/7 data rights and quality | Reproducible inputs/outputs and baseline comparison; each relevant gate |
| WP2 Data model and Human Boundary Ecosystem | PS/RL | Data dictionary; classification; event/evidence/identity contracts; learning/security separation | WP5 purpose and threat model | Schema fixtures, tenant reference checks and provenance; CORE-02 before G1 |
| WP3 Gamification and UX | AE | Learner/admin journeys; content taxonomy; Portuguese scenarios; accessible design system; later product usability | WP1 baseline, WP2 outcomes | Principal journeys and reviewed content; G1/G2, then capped maintenance |
| WP4 Edge and privacy infrastructure | PS | Collector identity; local buffering/inference; connectivity adapter; appliance packaging; federation lab | WP2/5/7; CORE-03 | Offline/loss/rotation/upgrade tests; G3–G6; federation conditional |
| WP5 Regulatory and governance alignment | PL with PS | Applicability records; threat model; customer terms/DPA input; AI oversight; authorised-test scope | Product intended use and WP7 inventory | Qualified review for relevant obligations; gate-specific sign-off and limitations |
| WP6 SME operational integration | PL/AE | Discovery; onboarding; supported connectors; customer workflows; training/reporting cycles; offboarding | WP3/4/8/9 | Customer walkthrough, connector conformance and support documentation; all gates |
| WP7 Data lifecycle and rights | PS | Catalogue; metadata/lineage; quality checks; retention/deletion; rights workflow; research export controls | WP2 schemas and WP5 purpose | Export/delete/restore-time deletion tests and quality dashboard; before G1, extended each product |
| WP8 Product and commercialisation | PL | Product requirements; packaging; price/cost hypotheses; pilot agreements; community boundary; partner strategy | Customer evidence and WP5/9 costs | Buyer validation, support economics and coherent offer; quarterly checkpoints |
| WP9 Platform engineering and reliability | PS | Identity; CI/CD; IaC; secrets; observability; jobs; backups; upgrade/rollback; dependency inventory | WP2/5; implementation backlog | CORE-01–05 evidence and runbooks; before first customer release |
| WP10 Validation and release assurance | PS; independent reviewer | Test matrix; adversarial checks; security assessment; release manifest; gate record | Product and WP1/5/9 evidence | No unresolved critical/high security findings at GA; operational and product acceptance demonstrated |

## Cross-package handoffs

WP1 supplies a research candidate plus limitations, never an implicit production approval. WP2/7 supply permitted data and provenance. WP4/9 package the candidate behind a reversible feature flag. WP10 validates representative behaviour and failure handling. WP8 confirms a customer reason to support it. PS and PL jointly accept production promotion; RL approves scientific claims.

## Minimum recurring cadence

Two-week product review: completed evidence, defects, support load and next bounded sprint. Monthly research/commercial review: hypotheses, negative results, spend, discovery and product implications. Release review: WP10 gate record signed by the accountable owner and second reviewer. Quarterly portfolio review: sequencing, capacity and deferred initiatives, including federation/OT/insurance/international scope.

## Deliverable conventions

Each deliverable records version, owner, status, supporting artefact links and review date. A research report can be complete with a negative result. A production gate cannot pass on a roadmap statement, vendor benchmark or unexecuted test plan. Source changes are tracked in [traceability](02-source-traceability.md); implementation decisions in the [decision register](14-decisions.md).
