# Dependency Graph And Build Tooling Restoration Strategy

## Purpose

This document records `E-16`: the strategy for restoring the dependency graph and build tooling after `E-15`.

`E-15` proved that the temporary `yarn.cmd` shim works. Build commands now move past nested plain `yarn` calls and stop on missing build tooling:

```text
'tsc' is not recognized as an internal or external command,
operable program or batch file.
```

That means the active blocker is no longer the build runner. The active blocker is the missing dependency graph:

```text
app/node_modules is absent.
```

## Current State

| Area | Status |
| --- | --- |
| Source archive | Present under `app/`. |
| Local Rovna UI workspaces | Present under `app/packages`. |
| Local compensation helpers | Present for config stubs, auth mock, `query-string`, `classnames`, `uuid`, `@types/uuid`. |
| Temporary build-runner shim | Present under `tmp/build-runner-shim/yarn.cmd`. |
| `app/node_modules` | Missing. |
| `dist` artifacts | Missing. |
| TypeScript CLI `tsc` | Missing. |
| `tsc-alias` | Missing. |
| Rollup CLI | Missing. |
| Storybook binary | Missing. |

## Hard Boundary

Closed corporate sources remain out of scope.

Do not use or request access to:

- internal registry;
- corporate GitLab;
- Nexus;
- Figma;
- corporate CI/CD;
- corporate package mirrors;
- internal documentation portals.

Do not route dependency restoration through the old registry configured in `app/.yarnrc`:

```text
https://packages.samoletgroup.ru/repository/npm-all
```

The old registry can remain recorded as a fact from the archive, but it is not an allowed source.

## Do Not Locally Stub Foundational Tools

These packages and binaries must not be replaced with fake local stubs:

| Area | Examples | Decision |
| --- | --- | --- |
| TypeScript/build compiler | `typescript`, `tsc` | Public/offline-public dependency route only. |
| Build/bundle tooling | `rollup`, `@rollup/*`, Rollup plugins, `tsc-alias` | Public/offline-public dependency route only. |
| Storybook runtime | `storybook`, `@storybook/react-vite`, addon packages | Public/offline-public dependency route only. |
| React runtime | `react`, `react-dom`, `react-test-renderer` | Public/offline-public dependency route only. |
| Styling runtime | `styled-components` | Public/offline-public dependency route only. |
| Complex UI mechanics | `antd-core`, `rc-*`, `@tanstack/*`, `@dnd-kit/*` | Public/offline-public first; local compensation only as later component-level tasks if still impossible. |

Reason:

```text
These packages define the compiler, bundler, runtime, Storybook runtime, or complex component mechanics. Fake stubs would create false-positive readiness and hide real integration failures.
```

## What Can Still Be Locally Compensated

Local compensation remains valid for narrow or unavailable mechanics only after exact usage is known.

Already done:

| Slice | Result |
| --- | --- |
| `LC-03` tooling config stubs | `@rovna-ui/eslint-config`, `@rovna-ui/prettier-config`. |
| `LC-01` auth mock boundary | `samolet-oauth2`. |
| `LC-05` query serialization helper | `query-string`. |
| `LC-04` class name helper | `classnames`. |
| `LC-06` UUID helper | `uuid`, `@types/uuid`. |

Possible later, but not before dependency graph strategy:

| Slice | Condition |
| --- | --- |
| `LC-07` focused lodash helpers | Only helper-by-helper after build tooling strategy is defined. |
| Service/realtime mocks | Only for Storybook scenarios that should not call live services. |
| Component-level mechanics | Only with separate acceptance criteria and visual/runtime checks. |

## Strategy Options

| Option | Description | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| A. Direct public npm install in current Codex shell | Run public-only install from this environment. | Simple if network works. | Already failed with `AggregateError [EACCES]`; repeating without environment change is low-value. | Not selected now. |
| B. Public npm install in a network-enabled local terminal | Run the controlled public-only command outside this restricted shell, with registry forced to public npm. | Uses public packages, can produce real `node_modules`. | Requires a terminal/environment with public npm access. | Selected primary route. |
| C. Prepared offline public package cache/archive | Build an offline package cache elsewhere from public npm/GitHub, then bring it into the project. | Works without live network in this workspace; repeatable if archived. | Requires provenance and careful package/version capture. | Selected fallback route. |
| D. Commit or archive `node_modules` as the project state | Bring a prepared dependency tree into the workspace. | Fast for local diagnostics. | Heavy, platform-sensitive, not ideal for Git. | Diagnostic-only fallback, not a clean repository strategy. |
| E. Keep adding local stubs | Continue compensating missing packages manually. | Useful for narrow helpers. | Wrong for TypeScript/Rollup/Storybook/React; creates false readiness. | Rejected for foundational tools. |

## Selected Route

Primary route:

```text
Public npm install in a network-enabled local terminal or environment, with the registry forced to https://registry.npmjs.org/.
```

Fallback route:

```text
Prepared offline public package cache/archive with package provenance.
```

Diagnostic-only fallback:

```text
Bring a prepared node_modules tree for local verification only, without treating it as a repository-ready solution.
```

## Required Public-Only Install Boundary

Any dependency restoration attempt must satisfy these rules:

1. Use public npm/GitHub sources only.
2. Do not use `packages.samoletgroup.ru`.
3. Do not request closed corporate access.
4. Keep local `@rovna-ui/components-*` packages resolved from `app/packages` where source exists.
5. Preserve the current local compensation packages unless a real public package intentionally replaces them.
6. Record exact command, environment, outcome and file changes.
7. If the attempt fails, stop and record the first exact blocker.

Candidate command shape for a public-enabled environment:

```powershell
cd "<repo>\app"
$env:npm_config_registry="https://registry.npmjs.org/"
$env:YARN_REGISTRY="https://registry.npmjs.org/"
corepack yarn install --registry https://registry.npmjs.org/ --ignore-scripts
```

Notes:

- `--ignore-scripts` is recommended for the first diagnostic restore to avoid arbitrary package lifecycle scripts.
- If the install succeeds, a separate step should decide whether scripts are safe to run.
- If Yarn still reads `app/.yarnrc`, a later controlled step may need a temporary public-only `.yarnrc` override or command-level registry override. Do not make that change silently.

## Expected Next Diagnostic After Restore

If `app/node_modules` appears, the next checks should be:

```text
corepack yarn build:tokens
corepack yarn build:main
corepack yarn storybook
```

Expected possible outcomes:

| Outcome | Meaning |
| --- | --- |
| Build reaches TypeScript errors | Dependency graph is present; source/type issues become next focus. |
| Build reaches missing package import | Add or compensate exact missing dependency. |
| Build reaches Rollup errors | Build config/dependency stage is now active. |
| Storybook binary starts but stories fail | Move to component/story runtime diagnostics. |
| Storybook opens | Start visual/component verification. |

## Why E-16 Does Not Install Anything

`E-16` is a decision step, not an install step.

It exists because the next action may change a large part of the workspace:

- `app/node_modules`;
- Yarn cache;
- possibly lockfile metadata;
- diagnostic logs;
- build artifacts if a later build succeeds.

That work should happen as an explicit next step with clear boundaries.

## Next Step

Recommended next step:

```text
E-17: prepare a public-only dependency restore runbook for the selected route.
```

`E-17` should produce an executable checklist with:

- exact command;
- allowed environment;
- allowed file changes;
- public registry proof;
- stop conditions;
- rollback/cleanup rule;
- expected verification after install.

## Status

`E-16` is complete as a strategy step.

Decision:

```text
Do not fake foundational build tooling. Restore dependency graph and build tooling through a public/offline-public route.
```
