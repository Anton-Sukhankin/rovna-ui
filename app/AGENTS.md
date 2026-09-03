# Rovna UI Application Instructions

## Scope

These instructions apply to `app/`, including packages, Storybook configuration, scripts, build, tests and release tooling. Root `AGENTS.md` remains authoritative for repository boundaries.

## Focused Source Route

For a component task read in this order:

1. `packages/<package>/package.json` and its `exports`.
2. The exact component entrypoint and implementation.
3. The exact `*.stories.*` or MDX file.
4. The exact test and snapshot only when relevant.
5. The component passport selected through the agent context catalog.

Do not scan every package or every story when the component and package are known.

## Package And API Rules

- Preserve the existing React 17, TypeScript, styled-components and workspace conventions unless the task explicitly changes compatibility.
- Prefer existing public barrels and package exports. Do not create undocumented deep imports.
- Treat `app/public-api-baseline.json`, `app/release-boundary.json` and current artifact reports as machine owners for public API and supported package scope.
- Keep source-only packages out of the supported release boundary unless a dedicated task promotes and verifies them.
- Do not add dependencies merely to simplify a local implementation. Explain and verify every dependency change.

## Storybook Route

Read `docs/storybook-runbook.md`, `.storybook/main.ts`, `.storybook/preview.tsx`, the target story and its direct fixtures. Avoid loading the full static Storybook index into context; query a target story ID instead.

Common focused commands:

```text
corepack yarn storybook:local
corepack yarn storybook:local:build
corepack yarn test:storybook
corepack yarn storybook:runtime:audit
```

## Test And Build Rules

- Start with the target package or target test. Expand to DS-only and final gates according to blast radius.
- Update snapshots only after confirming the rendered change is intended.
- `node_modules/`, `dist/`, `build/`, `storybook-static/`, `release/` and `tmp/` are generated or local outputs, not editable source.
- Generated icon, logo, metadata and documentation files must be changed through their owning scripts.
- Do not modify lockfiles unless the task intentionally changes dependencies or package resolution.

## Script Rules

- New repository scripts must use Node.js standard APIs where practical and must work with Windows paths and CI-relative paths.
- Audit and check scripts must be deterministic, avoid network access unless explicitly documented, produce a nonzero exit code on failure and identify their report path.
- A check command must not silently rewrite source. Separate generate/update commands from `--check` commands.

## Release Route

Before changing package metadata or tarballs, read `docs/maintainer-guide.md`, `docs/package-connection-guide.md`, `app/release-boundary.json` and the target package manifest. Validate public API, artifacts, tree-shaking and consumer checks through existing package scripts.

## Verification Selection

| Change | Minimum verification |
|---|---|
| Component source | Focused test, focused story/browser evidence, lint |
| Story only | Storybook interaction/runtime check for the story, language and a11y where relevant |
| Public export | API audit, type consumer, package build |
| Build/release metadata | Supported-package gate, artifact gate, tarball rehearsal |
| Script or CI | Direct script check, local CI-equivalent when affected |
| Documentation generator | Generate, `--check`, R-09 and agent-governance gate |
