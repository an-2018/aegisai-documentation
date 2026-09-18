# Security, privacy and regulatory applicability

[Index](README.md) · Owner: Platform/Security Lead with Product Lead · Design controls, not a compliance certification

## Threat model and controls

| Threat | Required control | Verification |
|---|---|---|
| Cross-customer access | Separate stacks/credentials plus application object checks | Cross-organisation API/evidence/export tests |
| Compromised collector | Revocable workload identity, minimum routes, bounded configuration | Credential theft/revocation exercise |
| Prompt injection or poisoned memory | Untrusted-data separation, deterministic tool policy, isolated runtime | R6 adversarial suite and denied-action audit |
| Destructive or repeated automation | Parameter-bound approval, precondition checks, idempotency/reconciliation | Lost-response, retry and expired-approval tests |
| Software supply-chain compromise | Pinned dependencies, SBOM, scanning, signed release provenance, update policy | Build inventory and tampered-update rejection |
| Employee surveillance/purpose expansion | Separate learning/security stores and purposes; access restrictions | Data-flow/role review and privacy tests |
| Unsafe active validation | Exact scope, isolated runner, expiry, abort and cleanup | Out-of-scope and disconnect tests |
| Telemetry/log data leakage | Local minimisation, redaction, limited retention, secret isolation | Payload/log inspection and deletion exercise |
| Operating outage or stale policy | Health/freshness indicators, backup/restore and emergency procedure | Controlled failure and restore drills |

## Data handling defaults

| Data | Default location and retention | Access/purpose |
|---|---|---|
| Identity/role mapping | Customer stack, active account plus documented offboarding period | Authentication/administration; restricted operator access |
| Learning outcome | Customer stack, 180 days | Assignment and learning evaluation; no employment risk score |
| Voluntary feedback | Customer stack, minimise free text; 180 days maximum default | Learning improvement; aggregate reporting where possible |
| Raw packet payload | Disabled | Separate specific approval and purpose if ever enabled |
| Local metadata buffer | Edge, seven-day maximum and size cap | Reliable delivery/diagnosis; visible loss on overflow |
| Operational observation | Customer stack, 30 days | Security investigation; source and freshness preserved |
| Findings and audit | Customer stack, 180 days | Evidence, change history and accountability |
| Research export | Separate research environment, explicit project retention | Purpose-limited pseudonymised or approved data only |
| Backup | Separate encrypted backup, 30-day rolling expiry | Recovery; restore access restricted |

These are product defaults, not statutory periods. Before onboarding, document customer purpose, lawful basis, controller/processor roles, retention, subprocessors and international transfers. Adjust through configuration and approved policy. Pseudonymous events remain potentially personal data. Rights workflows must locate related records, export/correct/delete where applicable, propagate deletion to indexes and derived stores, and replay deletion tombstones after backup restoration. Immutable evidence needs a documented lawful retention exception rather than a blanket refusal to delete.

## Applicability matrix

| Framework | Relevant question | Required project action |
|---|---|---|
| GDPR | What personal data/purpose, roles and lawful basis apply? Is a DPIA required? | Processing inventory, minimisation, customer terms, rights process and risk assessment before pilot |
| EU AI Act | What is each feature's intended use and provider/deployer role? | Feature-level classification and oversight; no automatic assumption that all cybersecurity AI is high-risk |
| Portuguese cybersecurity regime/NIS2 | Is AegisAI or the customer in scope, and for which service? | Entity/service assessment and review of current implementing requirements |
| Cyber Resilience Act | Is a shipped software/appliance product in scope, and who is manufacturer/steward? | Product classification, vulnerability handling, update/support period and reporting readiness |
| NIST CSF/Cyber AI Profile | Which controls and AI-related risks are relevant? | Map Govern, Identify, Protect, Detect, Respond, Recover to evidence; label draft guidance accurately |

Sources: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj/), [AI Act text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj), [current Commission AI guidance](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai), [CRA summary](https://digital-strategy.ec.europa.eu/en/policies/cra-summary), [NIST profile](https://www.nccoe.nist.gov/projects/cyber-ai-profile).

Workplace emotion recognition is subject to specific AI Act prohibitions and narrow exceptions; client products exclude biometric emotion inference. Consent is not treated as a universal workaround. Voluntary feedback and supportive UX remain possible design choices subject to ordinary data-purpose review.

CRA Article 14 reporting applies from 11 September 2026 for covered manufacturers; the Commission states general applicability from 11 December 2027. Those are external legal dates and do not move with project kickoff. Determine scope rather than assuming every SaaS function is automatically covered. [CRA reporting](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting).

The CNCS notice previously reviewed reports the new Portuguese regime under Decree-Law 125/2025. Its linked notice produced a redirect loop in the 18 September refresh; obtain the authoritative text and current regulations during the applicability review before relying on detailed scope/deadlines. Do not reuse the old local legal memo as current authority. [CNCS notice](https://dyn.cncs.gov.pt/pt/detalhe/art/135998/novo-regime-juridico-da-ciberseguranca-entra-em-vigor).

## Risk register and accountable response

| Risk | Owner | Trigger / response |
|---|---|---|
| Portfolio exceeds lean-team capacity | PL | Support >20% for two sprints: pause expansion and fix operating burden |
| Legacy results cannot reproduce | RL | Keep claim excluded; publish limitation and rerun protocol |
| Training offers weak customer value | PL | Revisit content/package; do not claim efficacy from engagement |
| Upstream licence/enterprise cost changes | PS/PL | Recheck pinned bill of materials and quote; adjust adapter or package |
| Unacceptable false-alert burden | RL/PS | Keep model in shadow mode or remove it; use baseline |
| Agent authority bypass | PS | Block affected release, revoke capability and investigate |
| Industrial process impact | PS/customer operator | Keep passive-only; no active pilot without process-safety approval |
| Legal role or data purpose unclear | PL | Block affected processing, continue independent work, obtain scoped advice |

Legal review is targeted to actual intended use and customer commitments. Product documentation must describe supported evidence and controls without asserting certification, full compliance or insurer acceptance that has not been established.
