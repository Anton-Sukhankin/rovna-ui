# Storybook Runbook

## Purpose

This is the current operational route for opening, rebuilding and checking Rovna UI Storybook. Historical launch diagnostics are preserved in [Storybook Runbook Before Governance](./history/workflows/storybook-runbook-pre-governance.md) and do not define the current state.

## Current Status

Local and static Storybook are supported project workflows. Exact catalog size and accepted browser-quality result belong to:

- `app/storybook-static/index.json` for the current static index;
- `docs/agent-context/ds-catalog.json` for component and story classification;
- `docs/r11-execution.json` and `docs/r-final-quality-report.json` for final acceptance.

Do not copy their counters into this runbook. Regenerate or rerun the owning check when the source changes.

## Prerequisites

1. Use the Node version declared by root `.nvmrc`.
2. Run commands from `app/`.
3. Use the existing Yarn workspace and lockfile through Corepack.
4. Do not request closed corporate registry access. The restored local dependency graph and public dependencies are the supported boundary.

Quick preflight:

```powershell
node --version
corepack yarn --version
corepack yarn storybook:quality:check
```

## Open Storybook

Start the maintained local launcher:

```powershell
cd app
corepack yarn storybook:local
```

Open `http://127.0.0.1:3000/`. The direct package script `corepack yarn storybook` is available, but `storybook:local` is preferred because it applies the repository launcher checks.

Stop the process with `Ctrl+C` in the terminal that owns it.

## Static Storybook

Build and verify the static catalog:

```powershell
cd app
corepack yarn storybook:local:build
corepack yarn storybook:static:check
corepack yarn storybook:static:serve
```

The static server uses the same local URL unless its launcher reports another available port.

## Configuration Contract

- Main config: `app/.storybook/main.ts`.
- Preview and global toolbar: `app/.storybook/preview.tsx`.
- Decorators: `app/.storybook/decorators.tsx`.
- Story discovery: package MDX files and `*.stories.*` below `app/packages/`.
- Global wrapper: `RovnaUI` initialization and decorator.
- Default locale: Russian; English remains an explicit toolbar variant.
- Addons: docs, accessibility and Vitest.
- Static assets: `tend-ui-assets` source assets and built favicons.

## Component Verification

For a focused component change, resolve the smallest context first:

```powershell
corepack yarn agent:context --component Button
```

Then check the target story, focused tests and relevant quality layer. The main checks are:

```powershell
corepack yarn storybook:static:check
corepack yarn storybook:interactions:check
corepack yarn storybook:a11y:audit
corepack yarn storybook:visual:audit
corepack yarn storybook:responsive:audit
corepack yarn storybook:cross-browser
corepack yarn storybook:language:check
```

Use `corepack yarn quality:r11:suite` only for full final acceptance because it runs the complete repository matrix.

## Troubleshooting

### Dynamic Import Or Missing Chunk

This usually means the browser still references a previous static build. Stop the server, rebuild with `storybook:local:build`, restart `storybook:static:serve`, then reload the page without cache. Do not repair a stale chunk by editing component imports until the fresh static check fails too.

### Component Render Error

Read the exact story and its direct fixtures. Confirm the `RovnaUI` decorator, locale, mocked network boundary and required provider. Service, authentication and realtime scenarios must use local mocks or remain disabled.

### Port Is Busy

Stop the process that owns port 3000 or use the URL reported by the maintained launcher. Do not start multiple hidden Storybook processes for the same workspace.

## Container Route

Container support is optional and separate from the default local workflow:

```powershell
corepack yarn storybook:container:validate
corepack yarn storybook:container:check
```

Lack of a Docker runtime does not block local Storybook, package builds or registry-free consumers.

## Evidence And Ownership

- [Current Project Status](./current-project-status.md)
- [Rovna UI Catalog](./agent-context/ds-catalog.md)
- [Final Quality Report](./r-final-quality-report.md)
- [Fact Ownership](./governance/fact-ownership.md)
