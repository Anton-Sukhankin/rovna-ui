# Agent And Documentation Readiness

Status: `passed`

Evidence date: 2026-09-01.

## Decision

The Rovna UI repository has a complete DS-only information architecture for maintainers, agents and subagents. Current instructions, generated facts, machine evidence and history have separate routes. The temporary execution artifact has been retired and the permanent routes passed post-retirement verification.

This document is a fixed acceptance record. Live component, Storybook, package and quality metrics remain owned by the sources in [Fact Ownership](./fact-ownership.md).

## Authority And Boundary

- Root `AGENTS.md` defines the repository-wide DS-only boundary and authority order.
- `app/AGENTS.md` routes source, Storybook, test, build and release work.
- `docs/AGENTS.md` routes active, generated, evidence, history and temporary documentation.
- [Documentation Index](../documentation-index.md) is the human entrypoint.
- [Agent Context](../agent-context/README.md) and the context resolver provide focused task packets.
- S-Tracker and every other consumer repository are outside the active boundary.
- Closed corporate GitLab, Nexus, registry, Figma and service sources are prohibited and were not used.

## Zero-State Acceptance

All values are derived from `docs/agent-governance-report.json` and the completed retirement verification.

| ID | Invariant | Value |
|---|---|---:|
| ZS-01 | Missing mandatory routes | `0` |
| ZS-02 | Stale volatile facts in active manual documents | `0` |
| ZS-03 | Ownerless or duplicate fact domains | `0` |
| ZS-04 | Active routes mixing current guidance and history | `0` |
| ZS-05 | Unclassified tracked or untracked artifacts | `0` |
| ZS-06 | Broken Markdown links | `0` |
| ZS-07 | Generated documentation drift | `0` |
| ZS-08 | Operational S-Tracker routes | `0` |
| ZS-09 | Invalid or oversized default context packets | `0` |
| ZS-10 | Invalid subagent scopes | `0` |
| ZS-11 | Agent-governance check failures | `0` |
| ZS-12 | Temporary execution artifacts or mandatory retirement actions remaining | `0` |

## Context Contract

An ordinary agent starts with root and nearest scoped `AGENTS.md`, then reads one task route, one fact owner and exact target files. Repository-wide or docs-wide reading requires an explicit audit reason.

The default resolver contract is:

- maximum output size: 50 KB;
- maximum primary routes: 12;
- no large evidence payloads;
- no history or external-project context by default;
- ambiguous component names return candidates instead of an inferred choice.

Use from `app/`:

```text
corepack yarn agent:context --component Button
corepack yarn agent:context --story tend-ui-primitives-button--default
corepack yarn agent:context --package @rovna-ui/primitives
corepack yarn agent:context --task storybook
corepack yarn agent:context:check
```

## Documentation And Artifact Contract

- Active documentation contains current guidance and links to changing fact owners.
- Generated catalogs and passports are changed through the R-09 generator.
- Evidence is queried by exact report and key; it is not default narrative context.
- History is preserved under `docs/history/` and cannot override current status.
- Every current tracked, untracked and ignored path is classified by `artifact-policy.json`.
- Visual baselines and snapshots are versioned regression evidence and are read only for their test task.
- Local build, Storybook, release and temporary outputs remain ignored according to policy.

## Subagent Contract

Every delegated task must contain an objective, current and target state, fact owner, exact read and write scopes, prohibited paths, generated-file rules, acceptance commands, report format and escalation condition. The maintained template is [Subagent Task Passport](../agent-context/subagent-task-template.md).

## Acceptance Evidence

The full acceptance completed successfully:

- documentation generation and drift: current;
- agent context contract: passed;
- artifact inventory: passed with zero unmatched paths;
- agent governance: passed with zero failed checks;
- R-09 documentation gate: passed;
- R-10 GitHub-ready gate and local CI equivalent: passed with owner actions;
- R-11 execution suite: all planned steps passed;
- R-11 final-quality checker: passed with owner actions.
- post-retirement documentation drift, context, artifact, governance and link checks: passed.

Machine owners:

- `docs/agent-governance-report.json`
- `docs/governance/artifact-inventory.json`
- `docs/r09-documentation-gate.json`
- `docs/r10-github-ready-gate.json`
- `docs/r11-execution.json`
- `docs/r-final-quality-report.json`

## Owner Actions Outside Local Readiness

These actions do not block local Storybook, package builds or registry-free tarball consumers:

1. Confirm GitHub visibility and source-publication rights; MIT is already selected.
2. Create and authenticate the GitHub remote, then perform the first push and remote CI run.
3. Confirm `@rovna-ui` scope ownership and publication target before npm publication.
4. Perform optional Docker runtime and real screen-reader acceptance when those delivery modes are required.

## Maintenance

Run from `app/` after changing documentation routes, governance, fact ownership or artifact policy:

```text
corepack yarn docs:r09:check
corepack yarn agent:context:check
corepack yarn artifacts:inventory
corepack yarn quality:agent-governance
corepack yarn quality:r09
```

Use `corepack yarn quality:r10` for GitHub handoff changes and `corepack yarn quality:r11` for final accepted-quality drift.
