# Research programme and promotion rules

[Index](README.md) · Owner: Research Lead · All experiments below are planned, not completed

## Shared method

Every experiment has a question, baseline, dataset licence/provenance, preregistered split and metrics, resource budget, versioned configuration and reproducible artefact. Record negative and inconclusive results. Keep synthetic, public benchmark and customer evidence separate. Missing labels fail evaluation; they must never trigger random ground truth. Models and rules used in production require versioned release records and rollback.

Use a fixed exploratory/evaluation split, prevent subject/time leakage, and reserve the final test set before tuning. Report confidence intervals and operational costs, not single accuracy figures. Research participation and product use have separate purposes and permissions. Customer data is not automatically available for model training.

## R0 — Reproducibility and evidence repair, months 1–3

Question: which claims in the local paper and reports can be reproduced from identified inputs?

Inventory the CERT/mock-CERT loaders, fusion experiments, drift experiments and synthetic affective/phishing work. For each reported number record dataset/version, real or generated labels, preprocessing, split, seed, code commit, dependencies, model artefact and output. Trace placeholder-label paths explicitly. Compare paper/report differences without assuming misconduct or equivalence.

Deliver a claim ledger: reproduced, partly reproduced, blocked by missing artefact, or synthetic demonstration. Acceptance: every reused claim has a ledger entry; one clean-environment rerun is independently reviewed. Unresolved claims stay out of marketing and production acceptance.

## R1 — Human factors and adaptation, months 1–6; follow-up thereafter

Hypothesis: transparent skill/feedback-based sequencing improves delayed retention or reporting usefulness without increasing burden. Baseline: fixed role-relevant content. Treatment: same content pool with rule-based adaptation. Hold content quality and assessment difficulty as constant as practical.

Use a preregistered comparison with randomisation at a level that limits contamination; document whether individual or team assignment is feasible before recruitment. Primary endpoint: four-week delayed knowledge score. Secondary: reporting appropriateness/time, completion, perceived relevance, accessibility and burden. Record attrition and missing outcomes. A small 3–5-organisation pilot establishes feasibility and effect-size estimates; it is not automatically a powered causal trial. Compute a subsequent sample requirement from observed variance, clustering and a declared minimum useful effect.

Contextual bandits/RL start in offline or simulated evaluation and may proceed only after a stable baseline. No biometric emotion inference or employee personality risk scores. Treat voluntary feedback as a response, not ground truth about hidden emotional state. Evidence caution: a large field study found limited value from common phishing-training formats. [Primary study](https://www.sysnet.ucsd.edu/~voelker/pubs/phishtrain-oakland25.pdf).

## R2 — Detection, drift and graph correlation, months 2–12

Compare rules, Isolation Forest and the existing clustering/fusion approach on documented public data and later authorised shadow-mode customer observations. Split by time and, where applicable, user/site; fit transforms only on training data. Test source ablations and label quality. Graph features require a documented security purpose and cannot become employee social profiling.

Metrics: precision-recall, false alerts per investigator-day, detection delay, calibration, alert-review time and performance across sites/time periods. Report base rates. Promotion requires improvement over the operational baseline at the customer's agreed alert budget, a reviewed explanation, and a shadow-mode rollback plan. Do not replace this with an arbitrary historical 85% accuracy target.

## R3 — Evidence and explainability, months 3–12

Compare evidence tables/rule explanations, feature attribution and generated summaries. Test faithfulness by perturbing/removing evidence and checking that claims change appropriately. Evaluate analyst correctness and triage time using blinded tasks; clarity ratings alone are insufficient. Generated narratives must cite accessible evidence and distinguish observation from inference. Hidden model reasoning is not an audit source.

Promotion: unsupported material claims are detected in the review suite, evidence references resolve, and the richer explanation improves or preserves decision quality. Publish failures and limitations.

## R4 — Adversarial validation, months 7–18

Compare deterministic emulation with generated scenario selection; evaluate GANs only where they have a plausible advantage. Use isolated targets and fixed allowed techniques. Measure coverage, reproducibility, resource overhead, false findings, scope violations, cleanup success and remediation retest correctness. Freeze test definitions for comparative evaluation. Promotion requires passing scope/abort/cleanup tests and useful customer validation evidence, not a target volume of novel payloads.

## R5 — Local and federated intelligence, months 3–24

First measure rules/local models against an approved hosted baseline using public or permitted data. Include hardware, quantisation, latency, peak memory, energy/resource proxies and full failure costs. Verify offline mode with network observations rather than architecture assertions.

Federation starts only after useful local models, suitable participants and explicit permitted use exist. Compare local-only, lawful pooled reference where possible, and federated training across non-IID partitions. Test membership leakage, poisoning and update integrity. Define privacy accounting before claiming differential privacy; sharing gradients is not proof of confidentiality. Homomorphic encryption and secure aggregation remain evaluated options rather than universal requirements. [NIST discussion of federated-learning privacy attacks](https://www.nist.gov/blogs/cybersecurity-insights/privacy-attacks-federated-learning).

## R6 — Agent reliability and control, months 1–24

Begin with 20 representative internal tasks: source retrieval/citation checking, bounded repository changes, experiment execution and report drafting. Compare manual/template workflow, one agent, and later delegated workers on the same tasks and budgets. Run at least three repeats per task/configuration as an initial reliability screen; enlarge the suite before external claims.

Measure completion correctness, citation support, side-effect correctness, clean-task success, injection success, authority violations, recovery behaviour, latency and cost. Add malicious instructions to documents, repository files, tool results and memory in an isolated benchmark. Distinguish weak capability from effective enforcement. Use AgentLAB, AMA-Bench and AgentFlow as research inputs; benchmark results do not generalise automatically to customer workloads. [Evidence register](13-evidence-register.md).

## Outputs and publication

| Window | Intended artefact | Product decision informed |
|---|---|---|
| M1–3 | Reproduction ledger, baseline code/configuration and internal agent benchmark | Which legacy results and tooling to reuse |
| M4–6 | Training feasibility report and anonymised/synthetic public evaluation package | Adaptation and customer claims |
| M7–12 | Detection/explanation study and connector evaluation | Security Operations promotion |
| M13–18 | Safe-validation and local-runtime benchmark | Defense Box release |
| M19–24 | Agent enforcement/recovery evaluation; conditional federation/OT findings | Agent Security and next portfolio cycle |

Publication venue and submission timing follow completed evidence, not promised acceptance dates. Release code, schemas and permitted artefacts; document withheld data and reproducibility limits. Each production promotion needs RL evidence review, PS security/operations review and PL value/scope approval.
