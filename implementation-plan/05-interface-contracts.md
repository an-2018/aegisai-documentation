# Interface contracts: implementation design baseline

[Index](README.md) · Owner: Platform/Security Lead · Status: proposed v1 contracts, not an implemented API

## Common rules

Use `/api/v1` REST endpoints documented with OpenAPI in the product repository. Derive organisation scope from the authenticated principal; validate any supplied organisation identifier against it. Every object lookup enforces organisation ownership, including references nested inside request bodies. Cursor pagination applies to lists. Timestamps are UTC; retain event occurrence and receipt separately. Changes use optimistic concurrency where a stale state could invalidate an approval.

Mutating requests accept an idempotency key scoped to principal, organisation and operation. Reuse with a different payload returns a conflict. Validation errors are explicit; unsupported schema versions are quarantined or rejected, never silently reinterpreted. Credential material is returned only at creation and excluded from logs.

## Resources and minimum operations

| Resource group | Minimum fields/relationships | Initial operations |
|---|---|---|
| Organisation and identity | Organisation ID, identity type, external subject, role bindings, state | Read configuration; invite/revoke member; inspect own permissions |
| Asset and software component | Asset ID, source identity, last seen, owner; component package identifier/version, SBOM reference | Import/upsert inventory; list assets; attach validated SBOM |
| Learning | Content version, assignment, pseudonymous learner reference, outcome and feedback | Assign; fetch content; submit outcome; report aggregate progress |
| Observation | Producer/event ID, occurrence/receipt time, category, schema version, classified payload, evidence reference | Ingest batch; query authorised records |
| Finding | Evidence references, severity, confidence/limitations, rule/model version, state, assignee | Create; triage; annotate; close with resolution evidence |
| Proposed action | Target, operation, parameter digest, preconditions, expiry, justification, approver, execution state | Propose; approve/reject; execute; reconcile; record recovery |
| Collector | Device identity, configuration version, health, software version, credential state | Enrol; heartbeat; fetch signed configuration; rotate/revoke |
| Validation plan | Explicit targets, allowed techniques, time window, resource limits, authoriser, abort/cleanup policy | Validate scope; approve; run; abort; retrieve findings |
| Agent run | Workload/task identity, policy version, tool scopes, budget, evidence trace, checkpoint | Start; inspect; pause/cancel; revoke capability; export audit |

Product endpoints must not expose internal provider-specific identifiers as the only stable identity. All evidence references include a content hash, storage location accessible through authorisation, provenance and retention class.

## Event envelope example

```json
{
  "schema_version": "1.0",
  "event_id": "producer-generated-unique-id",
  "producer_id": "enrolled-collector-id",
  "occurred_at": "2026-09-18T10:00:00Z",
  "category": "asset.observed",
  "classification": "operational-metadata",
  "asset_ref": "asset-id",
  "payload": {"source": "inventory-import"}
}
```

The authenticated service supplies organisation context server-side. This example contains no customer data and illustrates the envelope only; category-specific schemas are delivered with their connector. Deduplicate on organisation + producer + event ID. Store receipt time on ingestion. Acknowledgement means durable persistence, not completion of all downstream analysis.

## Asynchronous jobs and action approval

Long-running imports, reports, simulations and model tasks return `202 Accepted` with a job reference. States: queued, running, awaiting approval, succeeded, failed, cancelled, or needs reconciliation. Record attempt history and retry policy. Pure ingestion/report work can retry; irreversible external operations require an idempotent target API or explicit reconciliation before retry.

Approval binds the exact operation, target, parameter digest, policy version and expiry. A changed target state or request invalidates approval. The executor rechecks authorisation immediately before acting. The proposer cannot approve their own high-impact production action. Cancellation is best-effort for in-flight operations and must disclose partial effects. Audit replay reconstructs evidence; it never re-executes side effects by default.

## Adapter contracts

| Adapter | Responsibilities | Must not do |
|---|---|---|
| ConnectivityProvider | Enrol/inspect/revoke transport identity; propose/apply approved reachability changes; report capabilities | Imply network reachability grants application permission |
| ObservationSource | Validate source, normalise records, preserve provenance/freshness and loss counters | Invent labels or suppress ingestion failure |
| ModelProvider | Report model/revision, classify permitted inputs, enforce timeout/budget, record usage | Silently send restricted data to a cloud fallback |
| ToolExecutor | Validate typed input, task capability and approval; isolate execution; return bounded evidence | Accept a model-generated permission claim as authority |
| ValidationRunner | Enforce signed scope, limits, abort and cleanup; collect results | Expand targets from discovered assets without new approval |

## Contract acceptance tests

Test cross-organisation IDs, revoked principals, malformed and oversized payloads, duplicate and out-of-order events, unsupported schema versions, expired approval, changed parameter digest, lost response after successful side effect, cancellation during execution, and unauthorised evidence export. A connector must pass the shared conformance suite before joining a supported release. Additive v1 fields remain optional; breaking changes require a new version and a migration/deprecation plan.
