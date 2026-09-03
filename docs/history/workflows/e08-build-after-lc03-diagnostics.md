# E-08 Build Diagnostics After LC-03

## Purpose

This document records `E-08`: a short build diagnostic after `E-07 / LC-03` added local tooling config stubs.

The goal is to check whether local workspace stubs for `@10d/eslint-config` and `@10d/prettier-config` changed the build blocker.

## Current Status

Checked on: 2026-07-06.

`E-07` created:

```text
app/packages/eslint-config
app/packages/prettier-config
```

No dependency installation was performed before this diagnostic.

## Preflight

Commands were run from:

```text
app/
```

| Check | Result |
| --- | --- |
| `corepack yarn --version` | `1.22.15` |
| `app/node_modules` | Missing |
| `app/yarn-error.log` | Missing |
| `app/packages/tend-ui/dist` | Missing |
| `app/packages/tend-ui-tokens/dist` | Missing |

## Workspace Recognition

`corepack yarn workspaces info --silent` now recognizes the local config stubs:

| Workspace | Location | Result |
| --- | --- | --- |
| `@10d/eslint-config` | `packages/eslint-config` | Recognized. |
| `@10d/prettier-config` | `packages/prettier-config` | Recognized. |

This confirms that `LC-03` changed the local workspace graph as intended.

## Diagnostic Build Attempts

| Command | Result | Exact blocker |
| --- | --- | --- |
| `corepack yarn build:tokens` | Blocked | Root script starts, then runs `yarn workspace @10d/tend-ui-tokens build`; plain `yarn` is not recognized. |
| `corepack yarn build:main` | Blocked | Root script starts, then runs `yarn workspace @10d/tend-ui build`; plain `yarn` is not recognized. |

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

`E-08` is diagnostically complete and blocked.

What improved:

- `@10d/eslint-config` is now a local workspace package.
- `@10d/prettier-config` is now a local workspace package.
- The old exact-name config gap from `LC-03` is addressed locally.

What remains blocked:

- build scripts still call plain `yarn` inside package scripts;
- `app/node_modules` is still missing;
- TypeScript, Rollup, package dependencies and actual `dist` generation were not reached.

## Not Done In E-08

- No dependency install.
- No network call.
- No Storybook launch.
- No Docker build.
- No package publication.
- No source component edits.
- No edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`.
- No changes inside a consumer project.

## Next Step

Recommended next practical step:

```text
E-09: implement LC-01 service auth mock boundary.
```

Reason:

- build remains blocked by environment/dependency graph issues;
- another build retry would likely repeat the same plain `yarn` blocker;
- `LC-01` is the next low-risk local compensation slice and does not require closed corporate sources.
