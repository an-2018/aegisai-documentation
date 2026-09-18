# Product 1: Human Firewall

[Index](../README.md) · Owner: Application Engineer; accountable: Product Lead · Target: pilot by month 3, production in months 4–6

## Purpose and customer journey

An SME administrator invites learners, selects a role-relevant programme, reviews aggregate progress and exports evidence. A learner completes a short scenario, receives an explanation, optionally reports difficulty or relevance, and receives a transparent next recommendation. The product remains usable when model services are unavailable.

Initial content covers phishing/reporting, MFA and account protection, safe information handling, and incident reporting. Deliver at least 12 reviewed Portuguese scenarios, including three interactive scenarios in the pilot baseline. Use a responsive web interface with keyboard navigation, readable feedback, resumable progress and no mandatory 3D/native application.

## Release scope

- Organisation roles: administrator, content reviewer and learner; scoped service-operator support access.
- Versioned content and assignments, progress, knowledge checks, completion records and report export.
- Supportive achievements and personal progress; no public individual risk leaderboard, punitive streak or personality scoring.
- Rule-based recommendation from demonstrated skills and explicit feedback, with a visible reason and manual reassignment.
- Aggregate reporting and individual assignment completion for authorised administrators; detailed feedback restricted by purpose.
- Pilot assessment and optional benign phishing exercises only under a separate agreed scope; ordinary training is the default.

Training outcomes never automatically change network access. Models may draft content, but a reviewer approves it before publication. No unrestricted live-generated lessons or instructions are sent to employees.

## Implementation backlog

| ID | Deliverable | Dependency | Acceptance evidence |
|---|---|---|---|
| HF-01 | Content taxonomy and first three scenarios | PL interviews, WP3 | Reviewed Portuguese content; clear learning objective and answer rationale |
| HF-02 | Learner/admin journeys and accessible UI | CORE-01, HF-01 | End-to-end assign → learn → feedback → report test |
| HF-03 | Content/assignment versioning and outcome schema | CORE-02 | Historical completion remains linked to the content actually seen |
| HF-04 | Transparent recommendation rules | HF-03, R1 protocol | Same valid inputs produce an explained recommendation; missing data falls back to baseline |
| HF-05 | Reporting/export and privacy controls | CORE-01/02 | Tenant isolation, authorised completion view, small-group disclosure review |
| HF-06 | Twelve-scenario programme and pilot onboarding | HF-01/02 | Content/security review and administrator walkthrough |
| HF-07 | Production hardening and evidence pack | HF-02–06, CORE-03–05 | G2 criteria and customer support runbooks passed |

## Evaluation and release

Pilot with 3–5 recruited organisations as a target, not an assumption of existing customers. Use R1 to compare static versus adapted recommendations. Primary learning endpoint is delayed knowledge retention; operational measures include reporting behaviour, completion and administrator effort. Record missing follow-up and participant burden. Do not infer causal efficacy from a small uncontrolled pilot.

G1: complete journeys, correct assignment isolation, usable content, recoverable database, monitoring and pilot privacy terms. G2: independent security review, critical/high findings resolved, restore/upgrade evidence, accessible principal workflows, all scenarios reviewed, and support ownership. Pricing/renewal evidence is assessed separately from technical readiness.

After G2, allocate maintenance/content updates within the portfolio support allowance; do not extend the primary development stream indefinitely. New adaptive ML requires the same evidence gate as other research features.

## Research context

Large field evidence finds limited benefit from some common training formats, supporting measured comparison rather than an assumed risk-reduction percentage. [Original phishing-training study](https://www.sysnet.ucsd.edu/~voelker/pubs/phishtrain-oakland25.pdf). The product's initial promise is usable learning and reporting workflows; demonstrated efficacy is a research outcome to establish.
