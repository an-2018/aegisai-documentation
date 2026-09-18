# Production, pilot and release handbook

[Index](README.md) · Owner: Platform/Security Lead · All gates initially pending

## Gate evidence

| Gate | Target | Product-specific evidence, in addition to common controls |
|---|---|---|
| G1 | M3 Human Firewall pilot | Complete admin/learner journey, three interactive scenarios, reviewed programme, pilot protocol and onboarding rehearsal |
| G2 | M4–6 Human Firewall GA | Twelve reviewed scenarios, usable reports, operational support and customer value assessment; no unsupported efficacy claim |
| G3 | M7–9 Operations pilot | Asset/SBOM → finding → investigation → remediation evidence; source freshness/loss visible |
| G4 | M10–12 Operations GA | Measured alert workload, supported connectors, approval tests, 48-hour soak at agreed volume |
| G5 | M13–15 Defense Box pilot | Stable passive collection, approved validation, measured resource use and successful abort/cleanup |
| G6 | M16–18 Defense Box GA | Supported installation profile, upgrade/rollback, five checks and remediation retest evidence |
| G7 | M19–21 Agent Security pilot | Two customer workflows under enforced tool/identity/budget policies |
| G8 | M22–24 Agent Security GA | Isolation, revocation, injection/recovery evaluations, compatibility and cost accounting |

Common pilot controls: access/isolation tests, secrets inventory, monitoring, restore evidence, documented data purpose/retention, scoped agreement, support contact and rollback. Common GA controls: independent security assessment of the changed surface; all critical/high findings remediated and retested; load/capacity evidence; dependency/licence inventory; vulnerability process; runbooks; customer acceptance and release sign-off. No gate is marked passed by this document.

## Service objectives and support boundary

Engineering target: 99.9% monthly application availability, measured at the customer-facing service boundary with a declared measurement method. Client ISP/device downtime and upstream dependencies must be explained, not silently excluded from customer impact reports. A target becomes an SLA only after architecture, monitoring, staffing and contract review support it.

Pilot recovery targets: RPO 24 hours and RTO four hours. GA: RPO one hour and RTO four hours for managed application data, demonstrated by restore tests. These do not promise zero loss of unacknowledged edge buffers or restoration of the customer's own infrastructure. Implement point-in-time recovery or equivalent before claiming the tighter RPO.

Initial staffed support: Portuguese business hours, with named incident escalation arrangements in each pilot agreement. Automated monitoring may run continuously; this does not imply 24/7 staffed response. No numerical response SLA is sold before staffing is costed.

## Runbook: customer onboarding

1. PL confirms product scope, supported sources, buyer/operator, support hours and pilot outcomes.
2. PS records architecture, region, data purpose/retention, identity integration and permitted routes; legal/privacy review covers affected processing.
3. Deploy isolated stack from pinned manifests; rotate bootstrap secrets; verify backup and health.
4. Enrol only approved collectors/users; run positive and negative access tests.
5. Rehearse the principal customer journey and export evidence; document known limits and emergency contact.
6. Record baseline usage/cost and acceptance. Enable only purchased/approved modules.

## Runbook: release, upgrade and rollback

Build signed/versioned artefacts with dependency inventory and migration notes. Test in staging against a representative prior-version backup. Record irreversible migration risks and recovery path. Review release diff and permissions, take a verified backup, communicate the agreed maintenance window, deploy to a canary customer/test stack, and observe errors, job lag and data correctness before expansion. Roll back application/configuration only when schema compatibility permits; otherwise use the tested restore/forward-fix procedure. Never assume downgrade is safe after migration.

## Runbook: incident and credential compromise

Detect and classify affected customers/components; preserve necessary evidence and open an incident record. Restrict compromised credentials/workloads and isolate the affected execution boundary. Stop unsafe automation; inspect pending approvals and uncertain side effects. Restore known-good operation, verify integrity and reconcile jobs. PL coordinates contractual/regulatory communications after applicability review; this handbook does not send any notifications. Record timeline, root cause, customer impact and corrective tests.

If control-plane connectivity is lost, do not assume a policy revocation reached the edge. Use the documented local enforcement/emergency path and record confirmation. Restoration includes verification that stale credentials and rules are not re-enabled.

## Runbook: backup restoration and data rights

Restore to an isolated environment, verify integrity and timestamps, measure actual RPO/RTO, replay deletion tombstones, rotate credentials where exposure is possible, and test application/connector behaviour before making the restored environment active. Retain a signed exercise record with backup identity, operator, duration and discrepancies. Perform before each GA and after material storage changes; schedule periodic operational drills after launch.

Rights/offboarding: verify requester authority, export permitted records, revoke users/collectors/provider mappings, remove routes, disable jobs, purge active data under agreed policy and expire backups on schedule. Document retained legal evidence and deletion timing. Ensure the customer can uninstall the edge component without residual trust.

## Runbook: validation and agent execution

Validate target/task scope, authority, expiry, resource limits and cleanup before starting. Monitor heartbeats and budget. Abort on out-of-scope access, safety trigger, loss of required control, or operator request. Preserve partial results and cleanup status. Reconcile external effects before retries. Agent audit replay must not execute tools. Rotate task credentials after completion or suspected compromise.

## Release record template

Record: product/version; gate; owner/reviewer; deployment and schema versions; source/model versions; supported capacity; test artefacts; security assessment/retests; restore/rollback evidence; customer acceptance; cost/support profile; unresolved low/medium risks and owners; final go/no-go decision. A failed material criterion results in no-go or reduced scope, not an undocumented exception.
