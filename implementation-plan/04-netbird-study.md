# NetBird: technical foundation study and reuse boundary

[Index](README.md) · Checked 18 September 2026 · Owner: Platform/Security Lead

## What to learn

NetBird coordinates authenticated peers using Management, Signal, Relay and device clients. Clients generate WireGuard keys; private keys remain on-device. Management distributes authorised peer/network state. Signal exchanges connection candidates; direct tunnels carry application traffic when possible. Relay provides an encrypted fallback when direct connectivity fails. Policy and DNS handling are applied by clients. The architecture page describes both historical TURN/Coturn and newer relay behaviour, so deployment instructions must match a pinned release rather than combine generations. [Architecture](https://docs.netbird.io/about-netbird/how-netbird-works).

A routing peer forwards overlay traffic to non-client resources. The overlay terminates there; application encryption and LAN segmentation remain separate requirements. NAT/masquerading and return routing affect attribution and reachability. [Routing documentation](https://docs.netbird.io/manage/networks/how-routing-peers-work).

## AegisAI component decisions

| Upstream concept | AegisAI use | Own responsibility |
|---|---|---|
| Peer enrolment | Optional connectivity for edge collectors and internal workers | Asset identity, enrolment approval, revocation workflow |
| Network policy | Transport reachability for approved service paths | Application permissions, tool capabilities and human approvals |
| Management API | Adapter for inventory and proposed configuration changes | Stable product contract, reconciliation and audit |
| Signal/NAT traversal | Upstream implementation where selected | Connectivity diagnostics and support boundary |
| Relay | Fallback for supported edge topology | Capacity, egress cost, availability tests |
| Routing peer | Explicitly scoped access to legacy resources | LAN trust boundary, minimal routes and customer approval |
| Upstream dashboard | Administrator troubleshooting where needed | AegisAI product experience; no rebranding claim of upstream authorship |

Use upstream unmodified binaries initially. Products depend on an AegisAI connectivity interface, not NetBird peer/group IDs. Store provider mappings in the adapter. An HTTPS-only deployment remains possible when overlay connectivity adds no value. A fork requires an ADR documenting gap, upstream contribution attempt, maintenance owner, licensing and upgrade/security burden.

## Operational and commercial limits

Self-hosted NetBird is currently single-account. For isolated customers use separate deployments; groups alone are not a tenant boundary. Commercial self-hosted features include control-plane HA, SCIM and traffic-flow streaming. Cloud prices do not price those licences. Confirm terms for each customer entity before sale.

Direct sessions can survive management downtime, but enrolment and policy updates cannot. A combined-server restart also affects its relay; separating relay changes that failure domain. Enterprise licence validation sends installation metadata/counters, which belongs in the subprocessors/data-flow assessment. These constraints are important to cost and service design. [Enterprise documentation, updated 16 September 2026](https://docs.netbird.io/selfhosted/enterprise).

The repository applies BSD-3-Clause by default with AGPL-covered server directories including management, signal, relay and combined. Inspect all shipped repositories and the exact release, not only the top-level label. API separation is an engineering boundary, not a legal conclusion about derived works. Track notices, modifications, source-offer obligations and any commercial agreement. [Repository licence](https://github.com/netbirdio/netbird/blob/main/LICENSE).

## Agent Network: optional evaluation

NetBird Agent Network distinguishes proxied model calls from direct resource connections. Its proxy can inject provider credentials and apply model/usage policy; direct network connections do not automatically receive request/token accounting. It is beta and the quickstart uses release candidates. [Architecture](https://docs.netbird.io/agent-network/how-it-works), [beta status](https://docs.netbird.io/agent-network), [quickstart](https://docs.netbird.io/agent-network/quickstart).

AegisAI must additionally enforce tool semantics, workload isolation, task-scoped approval and execution evidence. A device identity does not distinguish every process on a shared machine. Separate worker identities and execution boundaries are required. Evaluate Agent Network internally against an independent gateway baseline; it is not a first-product dependency.

## Lab checklist and acceptance

| Test | Evidence required |
|---|---|
| Enrol approved collector; attempt unauthorised enrolment | Allowed/denied identity records, no administrator key on worker |
| Direct connection and forced relay fallback | Packet path, latency, throughput and egress measurement |
| Denied route and DNS behaviour | Negative reachability tests and resolver configuration |
| Revoke peer while online/offline | Measured propagation time and documented stale-state behaviour |
| Restart management and relay independently | Session and onboarding behaviour; maintenance procedure |
| Overlapping customer address ranges | Separate-stack isolation and no accidental routing overlap |
| Rotate credentials and upgrade pinned release | Rollback and retained authorised configuration |
| Attempt agent tool misuse through allowed network route | Application policy still denies the operation |

## Business lesson

NetBird combines a free adoption route with paid operation, organisational features, support and enterprise arrangements. AegisAI should apply the underlying pattern to its own products: useful community components, operationally valuable paid services, and clearly scoped enterprise work. It should not base its margin on an assumed right to resell commercial NetBird functionality. Pricing comparisons and own-product economics are in the [business model](10-market-business-model.md).
