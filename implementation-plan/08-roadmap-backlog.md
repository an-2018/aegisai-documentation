# Roadmap, dependencies and first 90 days

[Index](README.md) · Owner: Product Lead · Kickoff: not yet assigned

All months are relative to recorded kickoff. Gates are targets, not evidence of completion. The first training release is constrained to months 3–6; continuing maintenance does not extend its primary development window. Gate definitions are in the [production handbook](12-production-handbook.md).

## 24-month delivery sequence

| Window | Primary stream / gate | Research and preparation | Dependency / accountable role |
|---|---|---|---|
| M1–3 | Human Firewall pilot, G1 | R0; R1 protocol; internal workspace; operations interviews | Foundation controls; PL |
| M4–6 | Human Firewall production, G2 | R1 field feasibility; operations connector samples | G1 and customer/support evidence; PL |
| M7–9 | Security Operations pilot, G3 | R2/R3; passive appliance lab | G2 stable operation and own standalone product identity; PS |
| M10–12 | Security Operations production, G4 | R4 harness; local-model comparison | G3 ingestion/finding utility; PS |
| M13–15 | Defense Box pilot, G5 | R4/R5; agent customer discovery | G4 evidence/adapters; PS |
| M16–18 | Defense Box production, G6 | Conditional federation and passive OT lab | G5 scope, abort, cleanup and supportability; PS |
| M19–21 | Agent Security pilot, G7 | R6 long-horizon attacks and recovery | Internal tooling evidence and distinct external need; PS |
| M22–24 | Agent Security production, G8 | Conditional OT pilot, insurer/MSP and Lusophone discovery | G7 and portfolio operating capacity; PL/PS |

Each subsequent stream requires sufficient stability/capacity, not purchase of the previous product by its customers. A failed gate moves dependent work or reduces breadth. Research can continue within its allocation without silently opening a second production programme.

## Foundation backlog

| ID | Deliverable | Owner | Dependency | Done evidence |
|---|---|---|---|---|
| CORE-01 | Organisation isolation, OIDC and role enforcement | PS | Data/role design | Cross-organisation and revoked-user denial tests |
| CORE-02 | Event/evidence contracts, schema validation and data lifecycle | PS/RL | Classification review | Valid/invalid fixtures, provenance, deletion and dedup tests |
| CORE-03 | Reproducible deploy, secrets, CI and dependency inventory | PS | Supported stack choice | Clean staging deployment with pinned images and secret scans |
| CORE-04 | Audit, persisted jobs and action approvals | PS | CORE-01/02 | Approval replay denial; restart/uncertain-side-effect reconciliation |
| CORE-05 | Monitoring, backup, restore and rollback | PS | CORE-03 | Timed restore; failing-release rollback and alert exercise |
| CORE-06 | Optional NetBird lab and provider adapter design | PS | CORE-01; isolated lab | Connectivity test matrix; licence/component record |
| DISC-01 | Ten customer interviews and product/pricing synthesis | PL | Interview guide | Documented needs, alternatives, buyer authority and objections |
| RES-01 | Legacy claim ledger and one independent rerun | RL | Source/data inventory | R0 report with reproduced/blocked distinctions |
| AG-01 | Internal agent workflow baseline | RL/PS | Sandbox and tool policy | R6 benchmark, cost and violation report |

## First 90 days: ordered sprint plan

| Period | Tasks and output | Acceptance / review |
|---|---|---|
| Weeks 1–2 | Assign role owners; record kickoff; DISC-01 starts; HF-01; CORE-01/02 design; RES-01 inventory | Requirements, data-purpose matrix, three scenarios, source traceability and threat model reviewed |
| Weeks 3–4 | CORE-01/03; HF-02/03 vertical slice; CORE-06 bounded lab; first R0 rerun | Administrator assigns a versioned scenario; learner completes it in isolated staging |
| Weeks 5–6 | HF-04/05; CORE-02/04; AG-01 baseline | Explained recommendation, authorised report, audit and durable event ingestion |
| Weeks 7–8 | HF-06; CORE-05; R1 protocol; finish DISC-01 | Twelve reviewed scenarios; monitoring; pilot criteria and research endpoints fixed |
| Weeks 9–10 | Restore/rollback, accessibility, rights/export/deletion; cost model; HF-07 starts | Timed exercises and defects triaged; draft pilot agreement and measured support assumptions |
| Weeks 11–13 | Independent pilot release review; onboarding rehearsal; operations samples/specification | G1 evidence signed, unresolved risks disclosed, next sprint backlog limited to G2 priorities |

These are sequencing buckets, not an assertion that every item fits regardless of staffing. During planning, split tasks into reviewable issues of a few days each and preserve parent IDs. PS owns security-sensitive sequencing; research work cannot delay basic training journeys except for a genuine safety/data blocker.

## Capacity and commercial checkpoints

Three-FTE baseline: 1.8 product, 0.6 research/discovery, 0.6 support/operations. Review actual hours every sprint. A fourth contributor first reduces integration/reliability risk. At two contributors postpone optional connectors, generated content and custom integrations; do not remove isolation or recovery work.

At M3 assess recruitment and willingness to pay; M6 assess training support economics and renewal signals; M12 assess operations alert workload and partner demand; M18 assess appliance deployment/support cost; M24 assess agent-policy value and portfolio sustainability. The target of 3–5 paid training pilots is unconfirmed until contracts exist. Customer count alone does not justify expansion.

## Tracking and change control

Issue fields: ID, product/WP, owner, dependency, estimate, acceptance evidence, security/data impact, status, blocked reason. Initial state for all implementation tasks is **not started / not verified by this documentation exercise**. Gates can be pending, passed with evidence, or failed. Scope changes require a decision-register entry and updates to the affected product, contract, research protocol and release gate.
