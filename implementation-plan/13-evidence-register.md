# Evidence register, current developments and research path

[Index](README.md) · Research snapshot: 17–18 September 2026 · Owner: Research Lead

This is a curated primary-source register, not an exhaustive literature review or a claim that every linked technology has been tested. Publication date, page update and access date are different. “Living” means no fixed publication date is relied upon. An unavailable page is explicitly marked. Recheck mutable documentation, pricing and law at adoption. Local-source inventory is in [traceability](02-source-traceability.md).

## Networking, agent access and business

| ID | Source / publisher | Publication or update; accessed | Type and supported use | Limitation / project action |
|---|---|---|---|---|
| E01 | [How NetBird works — NetBird](https://docs.netbird.io/about-netbird/how-netbird-works) | Updated 2026-08-21; 2026-09-18 | Official architecture; client/control/data-plane explanation | Contains old/new relay context; use release-matched deployment docs |
| E02 | [Routing peers — NetBird](https://docs.netbird.io/manage/networks/how-routing-peers-work) | Living; 2026-09-17 | Official forwarding/NAT design | Overlay protection does not describe the entire LAN path; test routing |
| E03 | [Self-hosted enterprise — NetBird](https://docs.netbird.io/selfhosted/enterprise) | Updated 2026-09-16; 2026-09-18 | Official feature, isolation and operating constraints | Commercial terms require confirmation for intended customer model |
| E04 | [Repository licence — NetBird](https://github.com/netbirdio/netbird/blob/main/LICENSE) | Living main branch; 2026-09-17 | Primary licence text | Pin release and inspect all distributed components |
| E05 | [Cloud pricing — NetBird](https://netbird.io/pricing) | Living; 2026-09-18 | Vendor pricing snapshot | Cloud EUR values are not self-hosted quotes; no resale assumption |
| E06 | [Agent Network overview — NetBird](https://docs.netbird.io/agent-network) | June 2026 page; 2026-09-17 | Official beta/product status | Internal experiment, not first-release dependency |
| E07 | [Agent Network architecture — NetBird](https://docs.netbird.io/agent-network/how-it-works) | Living; 2026-09-17 | Official proxy/direct-resource distinction | Application/tool permission still required |
| E08 | [Agent Network quickstart — NetBird](https://docs.netbird.io/agent-network/quickstart) | Updated 2026-06-30; 2026-09-17 | Official release-candidate setup | Do not apply beta defaults to client production |
| E09 | [Pricing — Tailscale](https://tailscale.com/pricing) | Living; 2026-09-18 | Vendor packaging comparison | Billing and free-use restrictions change; refresh before quote |
| E10 | [Pricing — Firezone](https://www.firezone.dev/pricing) | Living; 2026-09-18 | Vendor free/team/enterprise comparison | Does not by itself establish repository licence rights |
| E11 | [Cloud — Wazuh](https://wazuh.com/cloud/) | Living; 2026-09-18 | Managed open-source security offering | Compare service scope and operating cost, not price alone |

## Recent news and use cases

Selected developments available at research time; “recent” does not mean a complete worldwide news feed.

| ID / date | Source | What it changes for AegisAI |
|---|---|---|
| N01 · 2026-09-04 | [NetBird Control Center Draft Mode](https://netbird.io/knowledge-hub/control-center-draft-mode) | Vendor product update: reviewable configuration changes are a useful UX reference. AegisAI should bind approvals to durable proposed changes and execution evidence. |
| N02 · 2026-08-03 | [NetBird / Norsk Helsenett case](https://netbird.io/knowledge-hub/norsk-helsenett) | Vendor case: provisioning, identity and operational simplicity matter in organisational adoption. It does not validate our future healthcare readiness. |
| N03 · 2026-07-30 | [NetBird client-daemon security advisory](https://netbird.io/knowledge-hub/security-advisory-daemon-ipc-local-privilege-escalation) | Primary vendor advisory: include local privileged-service attack surfaces and patch management in the edge threat model. Select a currently supported patched release at adoption. |
| N04 · 2026-04-23 | [Tailscale Aperture beta](https://tailscale.com/blog/aperture-public-beta) | Vendor announcement: networking companies are expanding into AI access governance; validate task-level control differentiation. |
| N05 · 2026-02-24 | [KnowBe4 AIDA orchestration launch](https://www.knowbe4.com/press/knowbe4-launches-aida-orchestration-as-the-first-fully-autonomous-agent-for-human-risk-management) | Vendor announcement: autonomous training orchestration is an established competitive claim, not our unique novelty. |
| N06 · Date not relied upon | [Wazuh / DigiFors MSSP case](https://wazuh.com/resources/case-studies/digifors-mssp-services/) | Vendor case: services and supported integrations can form a business around an open platform. Validate our own margins. |
| N07 · Updated 2026-09-11 | [Commission CRA reporting guidance](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) | Official update: relevant reporting provisions are now in application; assess product/manufacturer scope early. |

All N01–N07 links were opened on 2026-09-18. These entries are not evidence of independent outcome audits or guaranteed future availability.

## Research and frontier agents

| ID | Source | Date / access | Evidence and decision |
|---|---|---|---|
| R01 | [Understanding the Efficacy of Phishing Training in Practice — Ho et al.](https://www.sysnet.ucsd.edu/~voelker/pubs/phishtrain-oakland25.pdf) | IEEE S&P 2025; 2026-09-18 | Primary field study; limited benefits in its setting. Use control comparisons and delayed outcomes, not assumed efficacy. |
| R02 | [AgentLAB](https://arxiv.org/abs/2602.16901) | 2026-02 preprint; 2026-09-18 | Long-horizon agent attacks; informs R6 adversarial task design. Benchmark transfer remains unproven. |
| R03 | [AMA-Bench](https://arxiv.org/abs/2602.22769) | 2026-02 preprint; 2026-09-18 | Memory evaluation; compare explicit state/retrieval before increasing memory complexity. |
| R04 | [AgentFlow](https://arxiv.org/abs/2608.22868) | 2026-08 preprint; 2026-09-18 | Policy/data-flow enforcement; test independent authorisation and evidence provenance. Research results are not universal safety guarantees. |
| R05 | [Demystifying evals for AI agents — Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 2026-01; 2026-09-18 | First-party engineering guidance; evaluate complete workflows, repeated runs and failure recovery. |
| R06 | [Building a C compiler — Anthropic](https://www.anthropic.com/engineering/building-c-compiler) | 2026-02-05; 2026-09-18 | First-party multi-agent engineering account; useful as a scale/cost caution, not a lean-team requirement. |
| R07 | [Privacy attacks in federated learning — NIST](https://www.nist.gov/blogs/cybersecurity-insights/privacy-attacks-federated-learning) | 2024-01-24; 2026-09-18 | Official research discussion: updates and trained models can leak data. Design and evaluate privacy protections rather than assuming federation is sufficient. |
| R08 | [OpenHands security architecture](https://docs.openhands.dev/sdk/arch/security) | Living; 2026-09-18 | Official runtime controls; benchmark independently and enforce deterministic boundaries outside model judgement. |

Prioritised research path: R0 evidence repair → R1 human outcomes + R6 internal agent baseline → R2/R3 operational detection/explanation → R4/R5 local validation → external R6 product evaluation and conditional federation/OT. Follow citations into primary methods and datasets; do not treat AI-generated local notes as authoritative references. Record model, dataset and benchmark revisions at every experimental run.

## Security operations, validation and industrial foundations

| ID | Source | Date / access | Use and limitation |
|---|---|---|---|
| T01 | [CycloneDX specification overview](https://cyclonedx.org/specification/overview/) | Living; 2026-09-18 | SBOM contract reference; implementation must declare supported schema version |
| T02 | [OSV](https://osv.dev/) | Living; 2026-09-18 | Advisory source/API ecosystem; missing match does not prove absence of exposure |
| T03 | [Apache Caldera repository](https://github.com/apache/caldera) | Living; 2026-09-18 | Original MITRE URL redirected here during review; validate current release/licence before reuse |
| T04 | [ATT&CK for ICS tactics — MITRE](https://attack.mitre.org/tactics/ics/) | Living; 2026-09-18 | Threat taxonomy; not an active-test authorisation |
| T05 | [ATT&CK for ICS mitigations — MITRE](https://attack.mitre.org/mitigations/ics/) | Living; 2026-09-18 | Industrial control/safety context; validate techniques in representative lab first |

## Market, law and governance

| ID | Source | Date / access | Claim supported / limit |
|---|---|---|---|
| G01 | [NIS Investments 2025 — ENISA](https://www.enisa.europa.eu/publications/nis-investments-2025) | 2025-12-08; 2026-09-18 | Official survey with predominantly large organisations; not representative SME pricing evidence |
| G02 | [NIS360 maturity update — ENISA](https://www.enisa.europa.eu/news/nis360-the-bigger-picture-on-maturity-and-criticality-of-nis-critical-sectors) | 2026-05-28; 2026-09-17 | Sector maturity context; local buyer discovery remains necessary |
| G03 | [Portuguese regime notice — CNCS](https://dyn.cncs.gov.pt/pt/detalhe/art/135998/novo-regime-juridico-da-ciberseguranca-entra-em-vigor) | 2026-04-06; read 2026-09-17, refresh failed 2026-09-18 | Official notice; redirect loop on refresh. Obtain authoritative decree/current regulations before scope advice |
| G04 | [GDPR — EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj/) | Regulation 2016/679; searched 2026-09-18 | Primary legislation: data purpose, rights, processor roles, DPIA; apply to actual processing |
| G05 | [AI Act — EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) | Regulation 2024/1689; searched 2026-09-18 | Primary legislation; feature/intended-use classification, including workplace emotion restrictions |
| G06 | [AI regulatory framework — Commission](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) | Living; 2026-09-18 | Current implementation context; check amended/consolidated law before legal deadlines are promised |
| G07 | [CRA legislative summary — Commission](https://digital-strategy.ec.europa.eu/en/policies/cra-summary) | Living; 2026-09-18 | General and phased applicability; determine software/appliance scope and responsible role |
| G08 | [Cyber AI Profile — NIST NCCoE](https://www.nccoe.nist.gov/projects/cyber-ai-profile) | Living; 2026-09-18 | Development/status reference; draft guidance is not certification |
| G09 | [NIST IR 8596 initial preliminary draft](https://www.nccoe.nist.gov/publications/csf-profile/nist-ir-8596-ipd-cybersecurity-framework-profile-artificial-intelligence) | Preliminary draft; 2026-09-18 | Status of source framework; track next version rather than implying final standard |

## Evidence gaps and maintenance

Open items: actual customer willingness to pay, named pilot partners, hosting/licence quotations, per-product legal applicability, model hardware benchmarks, reproducible legacy result mapping and independent product security tests. None is silently filled with vendor claims or invented numbers.

RL reviews literature quarterly and before a research promotion; PL refreshes competitors/pricing before packaging decisions; PS checks upstream releases/advisories before adoption and during the future operating lifecycle. This pack does not create a scheduled monitor. New entries must identify source type, publication/update date if known, access status, precise supported claim, limitation and affected decision.
