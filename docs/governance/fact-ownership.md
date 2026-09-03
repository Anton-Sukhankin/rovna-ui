# Rovna UI Fact Ownership

## Purpose

This document defines one authoritative owner for each changing project fact. Active manual documentation links to these owners and does not maintain independent counters.

## Authority Rules

1. A source fact is changed only in its owner or owner generator.
2. A generated representation is never a second owner.
3. A human summary may repeat a value only when an automated check compares it with the owner.
4. Historical values remain valid as history but cannot override a current owner.
5. When owners disagree, generation stops and the upstream evidence is repaired before prose is changed.

## Ownership Matrix

| Fact domain | Authoritative owner | Inputs or generator | Consumers | Required check |
|---|---|---|---|---|
| Workspace commands and dependencies | `app/package.json` | Manual manifest changes and Yarn lock resolution | README, runbooks, AGENTS, CI | Package JSON parse and declared-script checks |
| Product identity, package namespace and license | `app/brand.json` plus root `LICENSE` | Maintained identity decision | Manifests, Storybook, release tooling, guides and CI | `corepack yarn quality:branding` |
| Component, story, docs and passport totals | `docs/agent-context/ds-catalog.json` | `app/scripts/generate-r09-documentation.js` | Catalog MD, passports, agent context, current status | `corepack yarn docs:r09:check` |
| Component-to-story classification | `docs/component-story-coverage.json` | `app/scripts/audit-component-story-coverage.js` | R-09 catalog generator | `corepack yarn components:coverage` |
| Interaction coverage | `docs/storybook-interaction-matrix.json` | `app/scripts/generate-q-interaction-matrix.js` | Catalog and R-03 reports | `corepack yarn quality:r03` |
| Accessibility result | `docs/accessibility-full-report.json` | Storybook accessibility audit | Catalog, current status, final quality | `corepack yarn quality:r04` |
| Final accepted quality | `docs/r-final-quality-report.json` | R-11 suite and final checker | Current project status and GitHub readiness | `corepack yarn quality:r11` |
| Supported package artifact scope | `docs/r07-package-artifacts.json` plus `app/release-boundary.json` | Artifact audit and maintained release boundary | Package guide, release scripts, R-10/R-11 | `corepack yarn quality:r07` |
| Public API surface | `app/public-api-baseline.json` | `app/scripts/audit-public-api.js` | Import rules, consumer checks, R-06 | `corepack yarn quality:r06` |
| React compatibility | `docs/react-compatibility.json` | Compatibility checker | Guides and final quality | `corepack yarn compatibility:react` |
| Security and dependency inventory | `docs/r08-security-supply-chain.json`, SBOM and license inventory | R-08 audit scripts | Security guide, GitHub readiness | `corepack yarn quality:r08` |
| Storybook runtime index | `app/storybook-static/index.json` | Storybook static build | Runtime audits and catalog generation | `corepack yarn storybook:static:check` |
| Primary language result | `docs/q08-static-language-report.json` and `docs/q08-runtime-language-report.json` | Static and runtime language audits | Current status and quality report | `corepack yarn storybook:language:check` |
| DS-only boundary and prohibited areas | Root `AGENTS.md` | Maintained governance decision | Scoped AGENTS and active guides | `corepack yarn quality:agent-governance` |
| Agent routing and zero-state acceptance | `docs/agent-governance-report.json` | `app/scripts/check-agent-governance.js` | `docs/governance/agent-readiness.md`, current status and CI | `corepack yarn quality:agent-governance` |
| Documentation class and artifact tracking | `docs/governance/artifact-policy.json` | Maintained policy plus inventory script | Gitignore, indexes, governance gate | `corepack yarn quality:agent-governance` |

## Human Status

`docs/current-project-status.md` is the human-readable current status, not the machine owner of its metrics. Its assertions must be generated from, or structurally checked against, the owners above.

## Prohibited Duplicate Ownership

The following files may describe use but must not maintain independent volatile counters:

- root `README.md`;
- `docs/documentation-index.md`;
- `docs/agent-context/README.md`;
- `docs/agent-context/import-rules.md`;
- contributor, maintainer and user guides.
