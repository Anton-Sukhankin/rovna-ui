# Rovna UI Documentation Instructions

## Scope

These instructions apply to `docs/`. Root `AGENTS.md` defines the repository and DS-only boundary.

## Documentation Classes

| Class | Meaning | Edit policy | Default agent read |
|---|---|---|---|
| Active | Current guide, runbook, index or status | Edit the exact owner | By task route |
| Generated | Catalog, generated passport or generated summary | Change generator/source only | Exact entry only |
| Evidence | Current JSON/Markdown output from a quality gate | Regenerate through owner | Targeted query only |
| History | Completed workflow, superseded plan or chronology | Preserve facts; update links only | No |
| Temporary | Execution checklist with explicit retirement | Update while executing, then delete | Only while active |

## Fact Ownership

Consult `docs/governance/fact-ownership.md` before changing counts, statuses, package scope, API totals or quality claims. Manual active documents must link to the owner instead of copying volatile numbers unless an automated check compares those numbers structurally.

## Generated Documentation

The R-09 generator owns:

- `docs/agent-context/ds-catalog.json`;
- `docs/agent-context/ds-catalog.md`;
- `docs/agent-context/component-passports/README.md`;
- `docs/agent-context/component-passports/generated/*.md`.

Use from `app/`:

```text
corepack yarn docs:r09:generate
corepack yarn docs:r09:check
corepack yarn quality:r09
```

Do not edit generated output directly.

## Active Documentation Route

Start from `docs/documentation-index.md`, then read one role or task route. For agent work use `docs/agent-context/README.md`, one passport and one migration recipe. For current status use `docs/current-project-status.md` and its machine owners.

## Evidence And History

- Large evidence JSON is not narrative context. Read exact keys required by the task.
- Historical reports do not define current status, supported scope or remaining work.
- S-Tracker history is outside DS-only tasks and must not be loaded as design-system context.
- A moved historical file keeps its factual content; only paths and classification labels may change.
- Temporary plans must not be linked as permanent documentation and must be removed after their post-deletion gate.

## Link And Quality Rules

- Use repository-relative Markdown links.
- Keep active indexes short and route-oriented.
- Avoid duplicated chronology, volatile metrics and full machine output in prose.
- After moves or generation run the documentation link check, R-09 and agent-governance gate.
- A documentation change is incomplete while generated drift, stale active facts or broken links remain.
