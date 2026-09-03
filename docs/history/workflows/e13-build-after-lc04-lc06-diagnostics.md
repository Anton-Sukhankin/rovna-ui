# E-13 Build Diagnostic After LC-04 and LC-06

## Purpose

This document records `E-13`: a build diagnostic checkpoint after local helper compensation for:

```text
LC-04 classnames helper
LC-06 uuid helper
```

The goal is not to make the build pass. The goal is to verify whether the blocker changed after the new local workspace packages were added.

## Scope

No dependency installation, Storybook launch, Docker build, package publication or dependency graph restoration was performed.

Commands were limited to local diagnostics and short build attempts through:

```text
corepack yarn ...
```

## Preflight

| Check | Result |
| --- | --- |
| Node | `v22.19.0` |
| npm through `npm.cmd` | `10.9.3` |
| npm through plain `npm` in PowerShell | Blocked by PowerShell execution policy for `npm.ps1` |
| Corepack | `0.34.0` |
| Yarn through Corepack | `1.22.15` |
| `app/node_modules` | Missing |
| `app/yarn-error.log` | Missing |
| `app/packages/tend-ui/dist` | Missing |
| `app/packages/tend-ui-tokens/dist` | Missing |
| `app/packages/tend-ui-upload/dist` | Missing |
| `app/packages/tend-ui-filters/dist` | Missing |

## Workspace Recognition

`corepack yarn workspaces info --silent` recognizes the local compensation packages:

| Workspace | Location | Result |
| --- | --- | --- |
| `@10d/eslint-config` | `packages/eslint-config` | recognized |
| `@10d/prettier-config` | `packages/prettier-config` | recognized |
| `samolet-oauth2` | `packages/samolet-oauth2` | recognized |
| `query-string` | `packages/query-string` | recognized |
| `classnames` | `packages/classnames` | recognized |
| `uuid` | `packages/uuid` | recognized |
| `@types/uuid` | `packages/types-uuid` | recognized |

## Diagnostic Attempts

| Command | Result | Notes |
| --- | --- | --- |
| `corepack yarn build:tokens` | blocked | Root script starts, then runs `yarn workspace @10d/tend-ui-tokens build`; plain `yarn` is not recognized. |
| `corepack yarn build:main` | blocked | Root script starts, then runs `yarn workspace @10d/tend-ui build`; plain `yarn` is not recognized. |
| `corepack yarn build:upload` | blocked | Root script starts, then runs `yarn workspace @10d/tend-ui-upload build`; plain `yarn` is not recognized. |
| `corepack yarn build:filters` | blocked | Root script starts, then runs `yarn workspace @10d/tend-ui-filters build`; plain `yarn` is not recognized. |

Common error:

```text
'yarn' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

Yarn also reported:

```text
warning Cannot find a suitable global folder. Tried these: "C:\Users\armad\AppData\Local\Yarn, C:\Users\armad\.yarn"
```

## Result

`E-13` is diagnostically complete and blocked.

What improved before this checkpoint:

- `classnames` is now a local workspace package;
- `uuid` is now a local workspace package;
- `@types/uuid` is now a local workspace package;
- all previous local compensation packages remain recognized by Yarn workspaces.

What did not change:

- build still stops before package-level TypeScript/Rollup stages;
- component source and helper replacement behavior are not exercised by build;
- no `dist` output is created;
- `app/node_modules` is still missing.

## Interpretation

The current build blocker is not `classnames` or `uuid`.

The active blocker is still the build runner path:

```text
root scripts are started with corepack yarn, but nested scripts call plain yarn, and plain yarn is not available in this environment.
```

Even if the plain `yarn` command is made available later, `app/node_modules` is still missing, so the next likely blocker would be missing build tools and runtime dependencies.

## Not Run

- no `yarn install`;
- no `npm install`;
- no `corepack enable`;
- no Storybook launch;
- no Docker build;
- no package publication;
- no package source edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no changes inside a consumer project.

## Next Step

Recommended next step:

```text
E-14: define a local build-runner unblock strategy for nested plain yarn calls.
```

Reason:

```text
Before starting broader LC-07 lodash work or repeating Storybook diagnostics, the project needs a decision on how to handle package scripts that call plain yarn inside the current Corepack-only environment.
```
