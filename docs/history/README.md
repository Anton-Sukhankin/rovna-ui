# Rovna UI History

This directory preserves completed workflows and external-project reports for audit and provenance. Historical files do not define current package scope, project status, component behavior or remaining work.

## Routes

- [Completed Workflow History](workflows/README.md): recovery, dependency, Storybook, package and quality execution records that have been completed or superseded.
- [External Project History](external-projects/README.md): consumer-project records outside the DS-only repository boundary.

## Reading Rule

Do not include this directory in a default agent or subagent context. Read an exact historical file only when investigating provenance, an earlier decision or a regression timeline. Resolve current facts through `docs/current-project-status.md`, `docs/governance/fact-ownership.md` and generated evidence.

Historical metrics and blockers are intentionally preserved and may differ from current values.

Historical references to Tend UI, `@10d/*` and `TendUI` describe the pre-migration source state. They are provenance records, not active names, imports or API contracts.
