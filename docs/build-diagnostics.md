# Build Diagnostics

## Current Authoritative Status

Updated: 2026-07-29 after `G-07` and `G-11`.

- `app/node_modules` and the local Yarn 1.22.15 dependency graph are present.
- All 21 core/extended packages pass fresh ESM, CJS, types and exports validation.
- The current 15-package public release wave has valid `dist` artifacts and passes registry-free tarball consumption.
- The machine reports are `tmp/g07-supported-package-gate.json` and `tmp/g11-ds-only-release-rehearsal.json`.

The missing-tooling and missing-`dist` entries below are retained as historical P/D/E diagnostics. They are superseded and must not be used as current blockers.

## Purpose

This document records the build diagnostics for `P-06`.

`P-06` checks whether the main Rovna UI package and key packages can be built as connectable libraries. In the current offline/self-contained mode, the goal is to capture exact commands, current environment, build output status and blockers without installing dependencies or changing project configuration.

## Build Preflight

Checked on: 2026-07-03.

| Check | Result |
| --- | --- |
| Node | `v22.19.0` |
| npm | `10.9.3` |
| corepack | `0.34.0` |
| `yarn` command | Not found |
| `app/node_modules` | Missing |
| `app/.npmrc` | Exists: `package-lock=false` |
| `app/.yarnrc` | Exists: registry points to `https://packages.samoletgroup.ru/repository/npm-all` |

## Declared Build Commands

The root `app/package.json` declares these relevant commands:

```sh
yarn build:main
yarn build:tokens
yarn build:theme
yarn build:icons
yarn build:primitives
```

They map to:

```text
yarn workspace @rovna-ui/components build
yarn workspace @rovna-ui/tokens build
yarn workspace @rovna-ui/theme build
yarn workspace @rovna-ui/icons build
yarn workspace @rovna-ui/primitives build
```

## Package Build Model

The main and key packages use the same build pattern:

```sh
yarn build:types && yarn build:js && yarn validate:imports && yarn copy
```

Meaning:

- `build:types` runs TypeScript declaration generation for ESM and CJS configs;
- `build:js` runs Rollup with `rollup.config.js`;
- `validate:imports` checks generated imports where enabled;
- `copy` copies `package.json` into `dist` and removes package-only scripts/exports where configured.

Because `yarn` is not available, diagnostics did not reach TypeScript, Rollup, import validation or copy stages.

## Build Output Status

| Package | Folder | Version | Expected entry | Expected types | `dist` status |
| --- | --- | --- | --- | --- | --- |
| `@rovna-ui/components` | `app/packages/tend-ui` | `4.82.0` | `cjs/index.js` | `index.d.ts` | Missing |
| `@rovna-ui/tokens` | `app/packages/tend-ui-tokens` | `1.1.0` | `cjs/index.js` | `index.d.ts` | Missing |
| `@rovna-ui/theme` | `app/packages/tend-ui-theme` | `0.2.5` | `cjs/index.js` | `index.d.ts` | Missing |
| `@rovna-ui/icons` | `app/packages/tend-ui-icons` | `0.7.0` | `cjs/index.js` | `index.d.ts` | Missing |
| `@rovna-ui/primitives` | `app/packages/tend-ui-primitives` | `0.23.7` | `cjs/index.js` | `index.d.ts` | Missing |

## Diagnostic Attempts

Commands were executed from `app/`.

| Command | Result | Exact blocker |
| --- | --- | --- |
| `yarn build:main` | Blocked | `yarn` is not recognized as a command. `FullyQualifiedErrorId : CommandNotFoundException` |
| `yarn build:tokens` | Blocked | `yarn` is not recognized as a command. `FullyQualifiedErrorId : CommandNotFoundException` |
| `yarn build:theme` | Blocked | `yarn` is not recognized as a command. `FullyQualifiedErrorId : CommandNotFoundException` |
| `yarn build:icons` | Blocked | `yarn` is not recognized as a command. `FullyQualifiedErrorId : CommandNotFoundException` |
| `yarn build:primitives` | Blocked | `yarn` is not recognized as a command. `FullyQualifiedErrorId : CommandNotFoundException` |

Original error text:

```text
yarn : Имя "yarn" не распознано как имя командлета, функции, файла сценария или выполняемой программы.
Проверьте правильность написания имени, а также наличие и правильность пути, после чего повторите попытку.
FullyQualifiedErrorId : CommandNotFoundException
```

## Blockers

| Blocker | Impact | Current decision |
| --- | --- | --- |
| `yarn` command is not available | No build script can start | Record as environment blocker. Do not enable corepack or install Yarn in `P-06`. |
| `app/node_modules` is missing | Even with Yarn, build tools and package dependencies are not installed | Record as dependency blocker. Do not run `yarn install` in `P-06`. |
| `.yarnrc` points to internal registry | Dependency installation would likely require unavailable internal registry access | Keep as fact from local config. Do not request access. |
| No `dist` folders exist for checked packages | Packages are not currently connectable as built artifacts | Build remains blocked until dependency strategy is resolved. |

## P-06 Result

`P-06` is blocked, but diagnostically complete for the current environment.

Completed:

- build commands were identified;
- package build model was documented;
- preflight environment was recorded;
- diagnostic build attempts were executed;
- exact build blocker was recorded;
- `dist` status for the main and key packages was recorded.

Not completed:

- `@rovna-ui/components` was not built;
- `@rovna-ui/tokens`, `@rovna-ui/theme`, `@rovna-ui/icons`, `@rovna-ui/primitives` were not built;
- TypeScript, Rollup, import validation and copy stages were not reached.

Next practical step:

```text
P-07 can document package connection options, but actual built-package consumption remains blocked until the project gets an approved local dependency strategy.
```

## D-04 Build Diagnostic Update

Checked on: 2026-07-05.

`D-04` re-ran the key build checks after `D-01` confirmed that Yarn can be called through Corepack.

### D-04 Preflight

| Check | Result |
| --- | --- |
| `corepack yarn --version` | `1.22.15` |
| plain `yarn` command | missing |
| `app/node_modules` | missing |
| `app/packages/tend-ui-tokens/dist` | missing |
| `app/packages/tend-ui-theme/dist` | missing |
| `app/packages/tend-ui-icons/dist` | missing |
| `app/packages/tend-ui-primitives/dist` | missing |
| `app/packages/tend-ui/dist` | missing |

### D-04 Diagnostic Attempts

Commands were executed from `app/`.

| Command | Result | Exact blocker |
| --- | --- | --- |
| `corepack yarn build:tokens` | Blocked | Root script starts, then runs `yarn workspace @rovna-ui/tokens build`; plain `yarn` is not recognized. |
| `corepack yarn build:theme` | Blocked | Root script starts, then runs `yarn workspace @rovna-ui/theme build`; plain `yarn` is not recognized. |
| `corepack yarn build:icons` | Blocked | Root script starts, then runs `yarn workspace @rovna-ui/icons build`; plain `yarn` is not recognized. |
| `corepack yarn build:primitives` | Blocked | Root script starts, then runs `yarn workspace @rovna-ui/primitives build`; plain `yarn` is not recognized. |
| `corepack yarn build:main` | Blocked | Root script starts, then runs `yarn workspace @rovna-ui/components build`; plain `yarn` is not recognized. |

Common error text:

```text
'yarn' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

Yarn also reported:

```text
warning Cannot find a suitable global folder. Tried these: "C:\Users\armad\AppData\Local\Yarn, C:\Users\armad\.yarn"
```

### D-04 Package Script Model

The checked packages share the same internal build shape:

```sh
yarn build:types && yarn build:js && yarn validate:imports && yarn copy
```

The next build layers would require:

- `tsc`;
- `tsc-alias`;
- `rollup`;
- package runtime and peer dependencies;
- working workspace dependency resolution.

Because `app/node_modules` is missing, creating a plain `yarn` shim alone would not make the build complete. It would only move the failure to missing build tools and dependencies.

### D-04 Result

`D-04` is diagnostically complete and blocked.

No `dist` artifacts were created for:

- `@rovna-ui/tokens`;
- `@rovna-ui/theme`;
- `@rovna-ui/icons`;
- `@rovna-ui/primitives`;
- `@rovna-ui/components`.

Next practical step:

```text
D-05 can only be a blocked Storybook diagnostic unless dependency graph restoration is handled first.
```

## E-08 Build Diagnostic After LC-03

Checked on: 2026-07-06.

Detailed result:

```text
docs/history/workflows/e08-build-after-lc03-diagnostics.md
```

### What Changed Since D-04

`E-07 / LC-03` added local workspace packages:

```text
@rovna-ui/eslint-config -> app/packages/eslint-config
@rovna-ui/prettier-config -> app/packages/prettier-config
```

`corepack yarn workspaces info --silent` confirms that both are now recognized as workspaces.

### E-08 Diagnostic Attempts

Commands were executed from `app/`.

| Command | Result | Exact blocker |
| --- | --- | --- |
| `corepack yarn build:tokens` | Blocked | Root script starts, then runs `yarn workspace @rovna-ui/tokens build`; plain `yarn` is not recognized. |
| `corepack yarn build:main` | Blocked | Root script starts, then runs `yarn workspace @rovna-ui/components build`; plain `yarn` is not recognized. |

Common error:

```text
'yarn' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

### E-08 Result

`E-08` is diagnostically complete and blocked.

LC-03 successfully addressed the local config package names, but build remains blocked before TypeScript/Rollup stages because:

- package scripts call plain `yarn`;
- `app/node_modules` is missing;
- build tooling and runtime dependencies are not installed.

## E-13 Build Diagnostic After LC-04 and LC-06

`E-13` re-ran the key build checks after local helper compensation for:

```text
LC-04 classnames helper
LC-06 uuid helper
```

Detailed result:

```text
docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md
```

### E-13 Preflight

| Check | Result |
| --- | --- |
| Node | `v22.19.0` |
| npm through `npm.cmd` | `10.9.3` |
| plain `npm` in PowerShell | blocked by PowerShell execution policy for `npm.ps1` |
| Corepack | `0.34.0` |
| `corepack yarn --version` | `1.22.15` |
| `app/node_modules` | missing |
| checked `dist` folders | missing |

### E-13 Diagnostic Attempts

| Command | Result | Notes |
| --- | --- | --- |
| `corepack yarn build:tokens` | blocked | Root script starts, then runs plain `yarn workspace @rovna-ui/tokens build`; plain `yarn` is not recognized. |
| `corepack yarn build:main` | blocked | Root script starts, then runs plain `yarn workspace @rovna-ui/components build`; plain `yarn` is not recognized. |
| `corepack yarn build:upload` | blocked | Root script starts, then runs plain `yarn workspace @rovna-ui/upload build`; plain `yarn` is not recognized. |
| `corepack yarn build:filters` | blocked | Root script starts, then runs plain `yarn workspace @rovna-ui/filters build`; plain `yarn` is not recognized. |

Common error:

```text
'yarn' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

### E-13 Result

`E-13` is diagnostically complete and blocked.

Local helper compensation packages are recognized by Yarn workspaces, but build still stops before TypeScript/Rollup stages. The active blocker remains nested plain `yarn` plus missing `app/node_modules`.

## E-14 Build Runner Strategy

`E-14` defines the local strategy for the nested plain `yarn` blocker.

Detailed result:

```text
docs/history/workflows/e14-build-runner-strategy.md
```

Selected route:

```text
Use a temporary local yarn.cmd shim for the next diagnostic shell.
```

Reason:

- plain `yarn` appears across many package scripts, not one isolated script;
- editing all package scripts would be broad churn;
- installing global Yarn or running `corepack enable` changes machine/tooling state;
- a temporary shim is reversible and should reveal the next exact build blocker.

Next diagnostic target:

```text
E-15: create temporary local yarn.cmd shim and run narrow build diagnostics.
```

## E-15 Shimmed Build Diagnostics

`E-15` tested the temporary local `yarn.cmd` shim selected in `E-14`.

Detailed result:

```text
docs/history/workflows/e15-shimmed-build-diagnostics.md
```

### E-15 Diagnostic Attempts

| Command | Result | New blocker |
| --- | --- | --- |
| `corepack yarn build:tokens` | blocked later than E-13 | `tsc` is not recognized |
| `corepack yarn build:main` | blocked later than E-13 | `tsc` is not recognized |
| `corepack yarn build:upload` | blocked later than E-13 | `tsc` is not recognized |
| `corepack yarn build:filters` | blocked later than E-13 | `tsc` is not recognized |

Common path reached:

```text
yarn workspace <package> build
yarn build:types && yarn build:js && yarn validate:imports && yarn copy
yarn build:types:es && yarn build:types:cjs
tsc -d --project tsconfig.build.json && tsc-alias -p tsconfig.build.json
```

Common error:

```text
'tsc' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

### E-15 Result

`E-15` is diagnostically complete and blocked.

The temporary shim works: build no longer stops on nested plain `yarn`.

The active blocker moved to missing build tooling:

```text
app/node_modules is missing, so tsc, tsc-alias, rollup and storybook binaries are unavailable.
```

## E-16 Dependency Graph And Build Tooling Strategy

`E-16` defines the dependency graph and build tooling restoration strategy after the shimmed build diagnostic.

Detailed result:

```text
docs/dependency-graph-restoration-strategy.md
```

Decision:

```text
Do not fake tsc, Rollup, Storybook, React or styled-components. Restore foundational tools through a public/offline-public dependency route.
```

Next target:

```text
E-17: prepare executable public-only dependency restore runbook.
```

## E-17 Public-Only Restore Runbook

`E-17` prepares the executable dependency restore procedure required before build tooling can be restored.

Detailed result:

```text
docs/public-only-dependency-restore-executable-runbook.md
```

No install/build was run in `E-17`.

Next target:

```text
E-19: build offline-public dependency package manifest from local package files and yarn.lock.
```

## E-19 Offline-Public Dependency Manifest

`E-19` is complete as a manifest step.

Created:

```text
docs/offline-public-dependency-package-manifest.md
```

Build remains blocked. The manifest identifies the missing direct dependency groups, but `app/node_modules`, `typescript`/`tsc`, Rollup tooling and `dist` are still absent.

Next step:

```text
E-20: choose the restore execution route from the E-19 manifest.
```

## E-20 Restore Execution Route Decision

`E-20` is complete as a route decision step.

Created:

```text
docs/restore-execution-route-decision.md
```

Selected route:

```text
offline-public package archive/cache with provenance
```

Build remains blocked because the route has been selected but dependencies are not restored yet.

Next step:

```text
E-21: prepare offline-public package acquisition plan from the E-19 manifest.
```

## E-21 Offline-Public Package Acquisition Plan

`E-21` is complete as an acquisition planning step.

Created:

```text
docs/offline-public-package-acquisition-plan.md
```

Build remains blocked because acquisition is planned but no package archive has been imported and `app/node_modules` is still absent.

Next step:

```text
E-22: prepare offline-public archive manifest template and import staging runbook.
```

## E-22 Archive Manifest And Staging Runbook

`E-22` is complete as an archive/import preparation step.

Created:

```text
docs/offline-public-archive-manifest-template.md
docs/offline-public-import-staging-runbook.md
```

Build remains blocked because no reviewed archive has been imported and `app/node_modules` is still absent.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.

## E-31 Complex Runtime Mechanics Tasks

`E-31` does not change build readiness.

Created:

```text
docs/complex-runtime-mechanics-tasks.md
```

Build remains blocked because `app/node_modules`, Storybook/build tooling and `dist` are still absent.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-05 Package Build Verification

Date: 2026-07-14

Status: `[!] partially blocked`

After `F-04G`, `app/node_modules` exists and the package build scripts can run with a temporary local build-runner shim:

```text
tmp/build-runner-shim/yarn.cmd
tmp/build-runner-shim/cp.cmd
```

Results:

| Command | Result | Output |
| --- | --- | --- |
| `corepack yarn build:tokens` | passed | `app/packages/tend-ui-tokens/dist` exists |
| `corepack yarn build:theme` | blocked | unresolved `@rovna-internal/hooks/useCallbackRef`, `lodash/debounce`, plus a narrow TypeScript strictness error |
| `corepack yarn build:icons` | blocked | unresolved hooks and `@rovna-internal/styling/core/*` imports |
| `corepack yarn build:primitives` | blocked | unresolved hooks, icons, styling and `lodash/merge` imports |
| `corepack yarn build:main` | blocked | large unresolved local alias set across icons/primitives/styling/hooks plus `lodash/*` subpath imports |

Current `dist` state:

| Package | `dist` |
| --- | --- |
| `tend-ui-tokens` | present |
| `tend-ui-theme` | absent |
| `tend-ui-icons` | absent |
| `tend-ui-primitives` | absent |
| `tend-ui` | absent |

This replaces the earlier blocker class "missing dependency graph". The current blocker class is now:

```text
local build graph: internal alias/build-order resolution + lodash subpath TypeScript compatibility + narrow TS fixes
```

Detailed report:

```text
docs/history/workflows/f05-package-build-verification.md
```

Next step:

```text
F-05A: fix local build graph blockers before Storybook verification.
```

## F-05A Local Build Graph Fixes

Date: 2026-07-14

Status: `[x] passed for main/key package build gate`

`F-05A` resolved the build graph blockers recorded in `F-05`.

Changes:

- added local `lodash/debounce`;
- added local `lodash/merge`;
- added local `lodash/isEqual`;
- broadened local `pick` / `omit` type declarations for generic object-like values;
- added a portable local type wrapper for `ErrorStepIcon`.

Build results:

| Command | Result |
| --- | --- |
| `corepack yarn build:utils` | passed |
| `corepack yarn build:types` | passed |
| `corepack yarn build:hooks` | passed |
| `corepack yarn build:styling` | passed |
| `corepack yarn build:icons` | passed |
| `corepack yarn build:theme` | passed |
| `corepack yarn build:primitives` | passed |
| `corepack yarn build:main` | passed |

Current `dist` state:

| Package | `dist` |
| --- | --- |
| `tend-ui-utils` | present |
| `tend-ui-types` | present |
| `tend-ui-hooks` | present |
| `tend-ui-styling` | present |
| `tend-ui-icons` | present |
| `tend-ui-theme` | present |
| `tend-ui-primitives` | present |
| `tend-ui-tokens` | present |
| `tend-ui` | present |

Detailed report:

```text
docs/history/workflows/f05a-local-build-graph-fixes.md
```

Next step:

```text
F-06: run Storybook verification.
```
```

## E-29 LC-07C Lodash Object Filtering Helper Replacement

`E-29` does not change build readiness.

Updated:

```text
app/packages/lodash/
docs/lodash-lc07c-helper-replacement.md
```

The local lodash package now also covers:

```text
pickBy, omitBy, isEmpty, uniqBy
```

Build status remains blocked until the dependency graph and build tooling are available. Some lodash helpers are still intentionally deferred.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-28 LC-07B Lodash Collection Helper Replacement

`E-28` does not change build readiness.

Updated:

```text
app/packages/lodash/
docs/lodash-lc07b-helper-replacement.md
```

The local lodash package now also covers:

```text
chunk, uniq, groupBy, mapValues
```

Build status remains blocked until the dependency graph and build tooling are available. Additional lodash helpers are still unimplemented.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-27 LC-07A Lodash Object Helper Replacement

`E-27` does not change build readiness.

Created:

```text
app/packages/lodash/
app/packages/types-lodash/
docs/lodash-lc07a-helper-replacement.md
```

The local lodash package is intentionally partial and covers only:

```text
omit, pick, identity, isNil, isString
```

Build status remains blocked until the dependency graph and build tooling are available. Additional lodash helpers are still unimplemented.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-25 Local Compensation Lane Decision

`E-25` is complete as a lane decision step.

Created:

```text
docs/local-compensation-lane-decision.md
```

Build remains blocked because no dependencies were installed and no build tooling is available. The selected lodash lane is for local compensation planning only.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-24 Archive Preparation Request

`E-24` is complete as a blocked input step.

Created:

```text
docs/offline-public-archive-preparation-request.md
```

Build remains blocked because no reviewed archive is available and `app/node_modules` is still absent.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-23 Archive Staging Validation

`E-23` is complete as a blocked validation check.

Created:

```text
docs/offline-public-archive-validation-report.md
```

Build remains blocked because no archive was present in staging and `app/node_modules` is still absent.

Next step:

```text
E-24: provide or create a reviewed offline-public archive, then rerun staging validation.
```

## E-18 Public-Only Restore Attempt

`E-18` is complete as a blocked execution check.

Recorded in:

```text
docs/history/workflows/e18-public-restore-attempt.md
docs/offline-public-package-cache-checklist.md
```

No dependency install, build, Storybook launch or package source edit was performed.

Build remains blocked because `app/node_modules`, `typescript`/`tsc`, Rollup tooling and `dist` are still absent.

Next step:

```text
E-19: build offline-public dependency package manifest from local package files and yarn.lock.
```

No `dist` artifacts were created.

Recommended next step:

```text
E-09: implement LC-01 service auth mock boundary.
```

## E-26 Lodash Helper Usage Audit

`E-26` does not change build readiness.

Created:

```text
docs/lodash-helper-audit.md
```

The audit selected `LC-07A` as the next local compensation slice, but no local lodash implementation or source edits were made.

Build status remains blocked until the dependency graph and build tooling are available.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
