# Market, packaging and open-core business model

[Index](README.md) · Owner: Product Lead · Evidence snapshot: 18 September 2026

## Market thesis and limits

Hypothesis: Portuguese SMEs will pay for supported, understandable security workflows that reduce administration and make evidence usable. Validate this with buyers, not broad cyber-loss statistics. ENISA's NIS Investments 2025 survey covers 1,080 organisations and is 83% large enterprises; its budget figures cannot be treated as a representative Portuguese SME spending baseline. [ENISA report](https://www.enisa.europa.eu/publications/nis-investments-2025).

Start discovery with 20–200-person professional-services and technology-enabled businesses, then IT service providers. Interview the actual budget holder and operator. Later appliances need customers with accessible local infrastructure; Agent Security needs a separate engineering/security buyer. Do not assume the training buyer will buy all subsequent products.

## Competitive references

Prices are page observations, not quotes, converted currencies, or an AegisAI price recommendation. Recheck billing basis, taxes, region and scope before comparison.

| Reference | Observed model and positioning | Lesson / competitive implication |
|---|---|---|
| [NetBird](https://netbird.io/pricing) | Cloud Free up to 5 users; Team EUR 6 and Business EUR 12 per active user/month on the accessed page; enterprise custom; self-hosted terms separate | Free adoption can coexist with paid operation, support and organisational capabilities |
| [Tailscale](https://tailscale.com/pricing) | Personal entry tier; Standard/Premium and enterprise tiers; current pricing separates organisational usage from free personal use | Free is not synonymous with open-source server availability; agent governance is an adjacent competitive area |
| [Firezone](https://www.firezone.dev/pricing) | Free, Team and Enterprise access offerings | Clear tier boundaries and enterprise support are alternatives to charging for every core capability |
| [Wazuh Cloud](https://wazuh.com/cloud/) | Managed deployment of an open-source security platform | Integration, reliability and operations can support revenue around an open foundation |
| [KnowBe4 AIDA](https://www.knowbe4.com/press/knowbe4-launches-aida-orchestration-as-the-first-fully-autonomous-agent-for-human-risk-management) | Vendor announced autonomous training orchestration in February 2026 | Adaptive/AI training alone is not distinctive; prove local fit, privacy and customer outcomes |

For Security Operations, compare the customer's existing Wazuh/SIEM/endpoint workflows against AegisAI's evidence-to-remediation experience. For Defense Box, compare managed sensors and existing validation tools; do not sell an upstream scanner with only a new logo. For Agent Security, compare network/provider governance with task-level tool authority and safe execution. [Tailscale Aperture announcement](https://tailscale.com/blog/aperture-public-beta).

## Vendor use cases and what they establish

- NetBird's August 2026 Norsk Helsenett case describes identity-aware access and simpler administration in healthcare IT. It supports investigation of enrolment/support needs; it does not demonstrate AegisAI suitability for regulated healthcare. [Case](https://netbird.io/knowledge-hub/norsk-helsenett).
- Wazuh's DigiFors case illustrates an MSSP combining an open platform with maintained customer services. It motivates a later partner model; its reported outcomes are vendor/customer claims, not audited AegisAI unit economics. [Case](https://wazuh.com/resources/case-studies/digifors-mssp-services/).

## Product packaging

| Package | Included value | Cost/billing driver | Separate commercial work |
|---|---|---|---|
| Human Firewall | Managed training, reviewed content, reporting, business-hours support | Organisation base + active learner band | Bespoke content and integrations |
| Security Operations | Supported ingestion, asset/SCA findings, investigations and guided playbooks | Organisation base + asset/event-volume band | Additional sources, long retention, advanced response integration |
| Defense Box | Supported software appliance, updates, diagnostics and scoped validation | Site/appliance + supported validation allowance | Installation, hardware, industrial assessment |
| Agent Security | Workload policy, gateway, audit and execution controls | Organisation/workload tier + measured execution usage | Private deployment, enterprise connectors, dedicated support |

Bundle discounts must not obscure per-product costs. Publish inclusions, usage limits, overage handling and support hours. No unlimited telemetry, agent compute or bespoke support by default. No product is priced or sold in this documentation exercise.

## Cost model and illustrative sensitivity

Monthly direct service cost per customer:

`C = compute + database/storage/backup + network/relay egress + upstream licences + model usage + support hours × loaded hourly cost + monitoring/security allocation`

At desired gross margin `g`, the minimum recurring price before sales/R&D overhead is `P = C / (1 - g)`. Onboarding is priced separately from recurring operations. Include engineering, sales, tax and working-capital costs in company planning; gross margin is not profit.

Illustration only: EUR 60 infrastructure + EUR 15 backup/monitoring + EUR 10 model use + 2 support hours at EUR 40 = EUR 165 direct monthly cost, excluding any paid upstream licence. At a hypothetical 60% gross margin the price floor is EUR 412.50. Four support hours make cost EUR 245 and the same floor EUR 612.50. These are invented scenario inputs to expose support sensitivity, not measured costs or a proposed market price.

Discovery must test whether customers value an offer above its measured cost floor. If not, reduce onboarding/support friction, change the segment or stop expansion; do not infer profitability from free upstream software. Track paid conversion, renewal, support hours, gross margin, acquisition effort and cash collection separately.

## Open-source and enterprise boundary

Default licence proposal for original community code: Apache-2.0, after contributor/IP and upstream compatibility review. This document does not license existing source or override dependencies. Keep a useful community core: schemas, selected collectors/adapters, basic workflows, evaluation harnesses and permitted research artefacts. Community users retain export and self-hosting paths.

Paid value: managed EU operation, fleet administration, enterprise integrations, maintained deployment options, support agreements and scoped implementation. Proprietary extensions, if adopted, have documented API boundaries and separate terms; legal review decides compatibility. Do not hold fixes for shared security flaws behind a paid gate. Establish SECURITY.md, contribution guidance, release policy, issue triage and maintenance ownership before public launch.

Custom-client work requires a statement of work, acceptance, recurring maintenance price, IP boundary and a reuse decision. Prefer configuration or maintained adapters; decline divergent customer forks without funded support. NetBird commercial resale/hosting permissions and pricing remain external validations, not assumed rights.

## Discovery protocol and expansion gates

Ten initial interviews: current workflow, recent incident/administration pain, incumbent tools, buying authority, budget process, data constraints, procurement, support expectations and willingness to pilot. Record alternatives and disconfirming evidence. Target 3–5 paid training pilots after readiness; no customers are claimed to exist.

Before each later product, interview at least five relevant buyers/operators and obtain scoped pilot interest. Expand through MSPs after repeatable direct onboarding. Insurance evidence exchange and Lusophone expansion remain M22–24 discovery: confirm buyer, data permissions, distribution partner and economics before adding delivery commitments. No numerical TAM or revenue forecast is justified by the reviewed evidence; build a bottom-up segment model only from sourced firm counts and measured conversion assumptions.
