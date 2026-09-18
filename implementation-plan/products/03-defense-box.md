# Product 3: Defense Box and Validation

[Index](../README.md) · Owner: Platform/Security Lead · Target: pilot months 13–15, production months 16–18

## Purpose and deployment

A software appliance observes approved network metadata locally, reports evidence-backed findings, and runs separately authorised validation exercises in a controlled environment. Start with a supported Linux virtual machine/container deployment on customer-provided infrastructure. Custom hardware manufacturing and a universal endpoint-protection agent are outside the first release.

Keep passive collection and active validation in distinct execution boundaries. Passive sensor connectivity must not automatically grant an active runner access to the same targets. Local storage is encrypted and bounded; packet payload collection is disabled by default. A customer chooses the interface, observation scope and retention before enabling collection.

## Components and own-product work

Evaluate Zeek metadata and Suricata alerts using fixed replay datasets. Reuse maintained sensors; build the AegisAI deployment management, normalisation, evidence correlation, health diagnostics, reporting and remediation-verification workflow. Test a maintained adversary-emulation runner in the lab through an adapter; the current historical MITRE Caldera repository redirects to Apache Caldera, so pin its actual repository and licence at adoption. [Current repository](https://github.com/apache/caldera).

The first validation library contains five benign, reproducible checks: sensor/alert pipeline verification, approved service reachability, denied-route verification, known test-file detection in an isolated endpoint, and backup-restore exercise evidence. Expand only through reviewed test definitions. No live malware creation, broad autonomous exploitation, or unbounded discovered-target expansion is required for the product.

## Execution contract

Each plan names an authorising customer, exact targets, allowed techniques, time window, rate/resource limits, expected side effects, abort mechanism and cleanup procedure. The runner validates scope before each step and blocks changed/out-of-scope targets. A lost control connection stops new active steps. Report partial execution and cleanup failure explicitly. A model may draft a test plan; it cannot authorise one.

## Implementation backlog

| ID | Deliverable | Dependency | Acceptance evidence |
|---|---|---|---|
| DB-01 | Appliance packaging and health | CORE-03/05; SO contracts | Install, enrol, observe health, revoke and uninstall without residual access |
| DB-02 | Passive sensor adapters and local buffer | DB-01 | Loss counts, bounded disk use, no payload export by default |
| DB-03 | Scoped validation runner | CORE-04; isolated lab | Reject out-of-scope targets, expire approval, abort and clean up |
| DB-04 | Five-check library and reports | DB-02/03; R4 | Reproducible expected result and verified remediation retest |
| DB-05 | Local inference comparison | R5; DB-02 | Quality/resource benchmark; rule-only operation when model unavailable |
| DB-06 | Release and support package | DB-01–05 | G6 gates, hardware/VM support matrix and operator recovery exercise |

## Acceptance and industrial path

Measure CPU, memory, disk, packet loss and processing delay on the published reference profile. Test disk exhaustion, sensor crash, clock skew, revoked enrolment, interrupted update, traffic spikes and tampered configuration. Publish measured throughput rather than borrowing upstream maximum claims.

G5 requires stable passive collection and fully scoped execution in an agreed pilot. G6 requires independent assessment, safe abort/cleanup, repeatable installation/rollback and supportable overhead. A failed abort or scope-enforcement test blocks release.

OT begins with lab traces and passive inventory mappings. An industrial pilot needs an operator sponsor, approved topology, process-safety review and change window. No active scanning or inline enforcement on industrial controllers by default. ATT&CK for ICS provides threat/asset vocabulary, not permission to run techniques. [ICS tactics](https://attack.mitre.org/tactics/ics/), [ICS mitigations](https://attack.mitre.org/mitigations/ics/).
