# Product 2: Security Operations

[Index](../README.md) · Owner: Platform/Security Lead · Target: pilot months 7–9, production months 10–12

## Purpose and first workflow

Help a small IT team connect exposure to action: import assets and an SBOM, enrich software vulnerabilities, inspect evidence and uncertainty, prioritise a finding, assign remediation, and verify closure. The product works without the training module. It is not a replacement promise for a staffed 24/7 SOC.

## First-release boundaries

Start with customer inventory import, CycloneDX JSON SBOM ingestion, OSV advisory enrichment and one supported security-event connector. Default connector implementation is Wazuh JSON alert ingestion; use exported sample records before requesting live access. If the pilot cannot provide this source, use documented file ingestion rather than building several new connectors simultaneously.

Asset discovery begins with imports and observed metadata. Active discovery is a separately scoped action. Maintain source/last-seen/confidence fields and resolve conflicting asset identities through review rather than silently merging unrelated devices.

Prioritisation uses transparent rules: asset criticality, exposure evidence, advisory severity and available exploitation context. Unknown reachability remains unknown. Show feed freshness and the evidence behind a recommendation; do not assume a package is exploitable solely because it appears in an SBOM. [CycloneDX](https://cyclonedx.org/specification/overview/), [OSV](https://osv.dev/).

Support finding triage, investigator notes, case linkage, remediation assignments, and three guided playbooks: suspicious authentication review, vulnerable dependency remediation, and suspected phishing response. Initial execution produces a reviewed action plan or export; automated account/endpoint changes require the shared approval executor and a tested target integration.

## Implementation backlog

| ID | Deliverable | Dependency | Acceptance evidence |
|---|---|---|---|
| SO-01 | Asset and SBOM ingestion | CORE-02; customer samples | Versioned validation, malformed input rejection, deduplication, provenance |
| SO-02 | Advisory enrichment and prioritisation | SO-01 | Known fixture findings, stale-feed warning, unknown-reachability handling |
| SO-03 | Wazuh alert/file connector | CORE-02; connector access | Normalisation, last-seen, loss/duplicate accounting and scoped credentials |
| SO-04 | Finding/evidence UI and investigation workflow | SO-01–03 | Evidence lineage, access controls, assignment and closure history |
| SO-05 | Three guided response playbooks | SO-04; CORE-04 | Parameter-bound approval where actions execute; no automatic production containment |
| SO-06 | Evaluated correlation/rule baseline | R2 baseline; SO-03 | Precision and alerts/day measured with labelled cases; no synthetic-label fallback |
| SO-07 | Product operations and release | SO-01–06 | G4 security/load/recovery gates and supported-source documentation |

## Tests and commercial gate

Test duplicate/out-of-order observations, collector clock skew, malformed SBOMs, feed outages, asset identity collision, unauthorised evidence references, stale approved actions, partial remediation and repeated execution after a lost response. Customer trials must report useful findings and false alerts per investigator-day, not accuracy alone.

G3 requires a customer to complete the exposure-to-remediation journey with evidence. G4 requires a documented alert workload the customer's named operator can handle, reliable ingestion at twice the agreed pilot peak, a 48-hour soak run, independent security assessment and tested recovery. Volume limits are measured and published for the supported deployment; do not copy the old 10,000-user target without demand.

## Later capabilities

UEBA, graphs and multimodal fusion remain shadow-mode research until they improve operational utility. Approved containment, repository remediation proposals, ticketing integrations and richer identity sources are extensions after the initial workflows prove useful. Research inference must not leak learning-profile data into employee risk rankings.
