# Source assessment and traceability

[Index](README.md) · Owner: Product Lead and Research Lead

## Source inventory and interpretation

| ID | Local source | Retained context | Revision needed |
|---|---|---|---|
| L01 | [AegisAI Project Blueprint](../AegisAI%20Project%20Blueprint.pdf) | Integrated SME security; human and technical protection; SCA, UEBA, simulations, recovery, future OT and partnerships | Remove old dates, blanket efficacy/compliance claims, and assumption that every function ships together |
| L02 | [Work packages](../workpackages.pdf) | WP1–7, Human Boundary Ecosystem, local processing, data rights and SME operation | Extend beyond training; retain governance throughout all products |
| L03 | [Platform architecture](../platform-architecture-doc.md) | Thirteen layers; five integrated squad products; packaging, federation and five research areas | Bring operational foundations forward; use one product stream; replace framework/version prescriptions with evaluated choices |
| L04 | [Research paper](../aegisai_icsa_2026_latest.pdf) | Existing experimental hypotheses and results | Reconcile dataset versions, real/synthetic labels, splits and reported metrics before reuse |
| L05 | [Regulatory analysis](../AEGISAE_EU_Portugal_Regulatory_Analysis.docx) | Portuguese/EU market and governance questions | Recheck current law and intended-use applicability; remove generic high-risk-AI classification and automatic-compliance implications |
| L06 | [NIST Cyber AI document](../cybersecurity-framework-for-ai.pdf) | Secure, Defend and Thwart perspectives across cybersecurity governance | Keep preliminary-draft status visible; use current publication status from evidence register |
| L07 | [Perplexity note](../perplexity-deepsearch.md) | Model/tool contracts, provenance, scientific writing, local routing | Validate citations and model/hardware claims; use as design input |
| L08 | [GPT note](../gpt-deepsearch.md) | Agent engineering and research environment ideas | Compare against bounded workflow baseline; no automatic adoption of every framework |
| L09 | [Gemini note](../gemini-deepsearch.md) | Local agent workspace and reusable infrastructure | Proposed names and technology stacks are suggestions, not accepted branding or proven requirements |
| L10 | [Deep research report (4)](../deep-research-report%20(4).md) | Persistent state, memory, capability controls, browser tools, long-duration agents, evaluation and agent training | Replace the full frontier-platform-in-90-days proposal with staged internal validation and later Agent Security commercialisation |
| L11 | [Approved portfolio plan](../plan.md) | Latest user-approved sequence and 24-month direction | Expanded by this pack; preserve original as decision history |

Read-only inspection also found a Docusaurus portal under the parent source tree and Python experiments under the parent research tree. This pack does not modify those assets. The inspected research reports and code are prototypes, not evidence of an operating client product.

### Reproducibility issues to resolve

The inspected fusion report describes Mock-CERT results that differ from the paper's reported metrics. Some code paths contain placeholder or generated labels when ground truth is absent. Separate real-data loader paths also exist; do not infer that every result uses the fallback. R0 must map each published result to its exact execution path and dataset. Synthetic phishing/emotion outputs demonstrate a simulated mechanism, not effectiveness with employees. Preserve the historical results and label their scope rather than rewriting them to imply stronger evidence.

## Blueprint capability mapping

| ID | Original capability | Disposition and reason | Destination |
|---|---|---|---|
| B01 | Asset discovery and inventory | Retained; imported/passive evidence first, explicit scope for active discovery | Security Operations, G3–G4 |
| B02 | Software composition and dependencies | Retained; SBOM/advisory ingestion and remediation tracking | Security Operations, G3–G4 |
| B03 | Gamification and role-based training | Retained; supportive mechanics and validated content | Human Firewall, G1–G2 |
| B04 | User/entity baselines and drift | Revised; alert utility instead of personal risk rankings | R2; Security Operations after validation |
| B05 | Relationship/social graph analytics | Research-only initially; no social surveillance by default | R2, months 7–12 |
| B06 | Cross-domain event correlation | Retained with limited initial connectors | Security Operations, G3–G4 |
| B07 | 24/7 AI hunting | Revised to continuous collection/rules with explicit service hours; no 24/7 human SOC promise | Security Operations |
| B08 | Access recommendations | Retained as evidence-backed proposals; no training-score denial | Security Operations; shared approvals |
| B09 | Automated containment | Revised to approved, scoped actions; deterministic pre-authorised automation considered later | G4 onward |
| B10 | Guided remediation | Retained with execution/verification evidence | Security Operations |
| B11 | Adversarial simulation/GANs | Revised; safe scripted baseline before generative methods | Defense Box, R4 |
| B12 | Explainable alerts | Revised; provenance, features and uncertainty rather than claimed faithful chain-of-thought | All products, R3 |
| B13 | Local lightweight models | Retained where measured quality and resource use justify them | Workspace, edge, R5 |
| B14 | Central Synaptic Data Lake | Revised to classified evidence storage and local raw telemetry; no universal raw-data centralisation | Shared architecture |
| B15 | Federated intelligence/privacy | Research-only until local utility, permissions and privacy threat model exist | R5, months 16–24 |
| B16 | Integrity monitoring | Retained via selected collector integration | Security Operations/Defense Box |
| B17 | Recovery and resilience drills | Retained; runbooks and restore evidence precede simulations | Every gate; Defense Box |
| B18 | Compliance/national frameworks | Retained as traceable evidence mapping, not certification | WP5 and reports |
| B19 | IoT/OT monitoring | Deferred customer deployment; passive lab before scoped pilot | Months 16–24, conditional |
| B20 | Cyber-insurance integration | Deferred partnership discovery and evidence export | Months 22–24; no discount promise |
| B21 | MSP channel and enterprise integration | Retained after direct SME validation | WP6/WP8; G4 onward |
| B22 | Angola/Lusophone expansion | Deferred market validation after Portuguese retention and support economics | Months 22–24 strategy |

## All thirteen architecture layers

| Layer | Disposition | Implementation destination |
|---|---|---|
| 1 Training/dynamic testing UI | Retained; defer immersive 3D until evidence of value | Human Firewall |
| 2 Multi-agent orchestration | Revised; bounded single workflows first | Internal workspace, R6, Agent Security |
| 3 LLM/classical ML | Retained; benchmark before selection/fine-tuning | Research/model adapter |
| 4 Local SLM | Retained; no assumed zero leakage or fixed latency | Edge/workspace, R5 |
| 5 SNA/UEBA | Revised; operational findings and controlled graph research | Security Operations, R2 |
| 6 XAI/AI UX | Revised to evidence-grounded explanation | Shared evidence UI, R3 |
| 7 GAN/adversarial components | Revised; GAN is experimental candidate, not dependency | Defense Box, R4 |
| 8 Workflow automation | Retained; persistent jobs and approvals before multiple workflow engines | Shared platform |
| 9 Monitoring/traceability | Retained and brought into month 1 | WP9, all gates |
| 10 Security/privacy | Retained; advanced cryptography conditional on threat model | WP5/WP7; R5 |
| 11 Integration | Retained; small connector set and versioned contracts | WP6, API/SDK |
| 12 Defense Box | Retained as software appliance before custom hardware | G5–G6 |
| 13 Desktop integration | Revised; edge service first, desktop shell if offline/install needs warrant | Defense Box/Agent Security |

Packaging/deployment appears outside the numbered layers in the source diagram. It is retained as WP9 from month 1, rather than delayed until portfolio integration.

## Five original integrated squad products

| Original squad | Disposition | Destination |
|---|---|---|
| Intelligent Training System | Retained; decouple from UEBA risk scoring | Human Firewall, G1–G2 |
| Adversarial Testing Platform | Retained; safe emulation and retest evidence | Defense Box and Validation, G5–G6 |
| Privacy-First Analytics | Combined with local detection; federation remains conditional research | Security Operations + R5 |
| Enterprise Integration Hub | Combined into shared adapters, approvals and response workflows | Security Operations, later enterprise packaging |
| Desktop Security Assistant | Combined into edge/local AI capabilities; standalone endpoint protection claims deferred | Defense Box + Agent Security |

WP1–7 are all preserved and expanded in the [work-package register](09-work-packages.md). Research continuity is specified in [R0–R6](06-research-programme.md), including human factors, explainability, federation and empathic UX. Old promises such as zero false positives, fixed detection percentages, or improvements for every federation participant become hypotheses with baselines and confidence intervals.
