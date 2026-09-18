# Architecture and product decision register

[Index](README.md) · Baseline established 18 September 2026

“Accepted” means the planning direction is selected; it does not mean implemented or legally validated. Product names are working labels. Actual staffing, customer contracts and infrastructure purchases are not established by this pack.

| ADR | Decision / status | Rationale | Revisit trigger / owner |
|---|---|---|---|
| ADR-01 | Accepted: own four-product portfolio, one primary stream | Preserve breadth with lean-team execution | Capacity/customer evidence; PL |
| ADR-02 | Accepted: training delivered in M3–6 | First commercial learning cycle; prevent indefinite gamification focus | Gate failure changes breadth, not silent quality reduction; PL |
| ADR-03 | Accepted: Operations → Defense Box → Agent Security | User-selected priority order | Explicit portfolio review/user direction; PL |
| ADR-04 | Accepted: relative 24-month roadmap | Discard old project dates | Record kickoff and capacity changes; PL |
| ADR-05 | Accepted: NetBird reference/optional adapter, no initial fork | Own product/IP while reusing mature connectivity | Documented unmet requirement and funded maintenance; PS |
| ADR-06 | Accepted: isolated EU-managed customer stacks | Simple initial trust and operational boundary | Measured fleet cost and funded multi-tenancy security work; PS |
| ADR-07 | Accepted: modular API/workers/PostgreSQL | Minimise early infrastructure overhead | Measured throughput/durability need; PS |
| ADR-08 | Accepted: web-first, software appliance before hardware | Reduce supported surface and inventory risk | Offline/install requirements or partner-funded hardware need; PL/PS |
| ADR-09 | Accepted: local raw telemetry/minimised central evidence | Resolve data-lake versus privacy conflict | Purpose-based customer review; PS |
| ADR-10 | Accepted: learning/security purpose separation | Avoid employee ranking and unintended access consequences | No automatic expansion; PL/legal reviewer |
| ADR-11 | Accepted: deterministic approval/tool policy outside models | Model output is not authority | Stronger verified policy mechanism; PS |
| ADR-12 | Accepted: internal agent workspace first | Learn from bounded real tasks before commercialisation | R6/customer evidence; RL |
| ADR-13 | Accepted: research baseline before feature promotion | Prevent synthetic metrics becoming production claims | R0–R6 promotion evidence; RL/PS |
| ADR-14 | Default: Apache-2.0 for original community components | Useful adoption and research reuse | IP/upstream compatibility review before publication; PL |
| ADR-15 | Accepted: GA assessed at every product release | Production maturity cannot wait for final integration | No waiver of critical controls; PS |
| ADR-16 | Accepted: source documents and portal preserved | Maintain history and avoid unrequested migration | Separate authorised portal import; PL |

## External validations, with safe defaults

| Item | Owner and deadline | Default until resolved |
|---|---|---|
| Named team and kickoff | PL, before first sprint | Relative schedule; no claims about current capacity |
| Pilot identity provider and event access | PS/PL, before customer integration | OIDC-capable staging IdP and synthetic/exported fixtures; no live access assumed |
| EU host, region, processing terms and cost | PS, before provisioning | No provider purchase; specified isolated architecture |
| NetBird commercial terms where needed | PL, before paid upstream capability is sold | Community lab only; no HA/SCIM/traffic-streaming promise |
| DPIA/legal role and product applicability | PL, before affected processing/shipment | Minimise data and exclude uncertain high-impact feature |
| Model licence/hardware | RL, before adoption | Benchmark candidates on permitted data; no GPU purchase |
| Community/proprietary licence boundary | PL, before publication | Keep original ownership/notices; publish nothing automatically |
| Independent assessment provider | PS, before GA | Gate remains pending until assessment/retests complete |

## Updating decisions

A change records the problem, evidence, considered alternatives, selected approach, owner, date, consequences, migration plan and affected contracts/gates. Preserve superseded entries. Changes in framework fashion or model rankings alone do not justify a platform migration.
