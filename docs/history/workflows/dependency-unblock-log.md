# Dependency Unblock Log

## Purpose

This log records technical checks from `docs/dependency-unblock-workflow.md`.

The project is still handled in a local/offline-aware mode: internal services are not requested, and any registry-related findings are recorded as configuration facts, not as a request for access.

## F-04G Local Workspace Range Alignment

Date: 2026-07-14

Working directory:

```text
app/
```

### Result

Status: `[x] complete`

Local `@10d/*` workspace dependency ranges were aligned, and offline restore from archive v2 completed successfully.

Created:

```text
docs/history/workflows/f04g-local-workspace-range-alignment.md
```

### Summary

| Check | Result |
| --- | --- |
| Updated package manifests | 16 |
| Updated local `@10d/*` dependency ranges | 37 |
| Unsatisfied internal `@10d/*` references after update | 0 |
| Offline restore from archive v2 | passed |
| `app/node_modules` created | yes |
| `app/node_modules/react` | present |
| `app/node_modules/react-dom` | present |
| `app/node_modules/styled-components` | present |
| `app/node_modules/.bin/storybook.cmd` | present |
| `app/node_modules/.bin/tsc.cmd` | present |
| `app/node_modules/.bin/rollup.cmd` | present |
| `app/node_modules/.bin/turbo.cmd` | present |

Resolved package versions:

```text
react@17.0.2
react-dom@17.0.2
styled-components@5.3.11
typescript@5.5.2
storybook@10.1.11
rollup@4.52.5
turbo@2.5.8
```

### Warnings

The install completed with warnings about optional platform packages, ignored scripts and peer dependencies. These warnings are carried into build verification.

### Next Step

```text
F-05: run package build verification.
```

## F-04F Archive V2 Restore Attempt

Date: 2026-07-14

Working directory:

```text
app/
```

### Result

Status: `[!] blocked`

Archive v2 was used for a controlled offline restore attempt.

Created:

```text
docs/history/workflows/f04f-archive-v2-restore-attempt.md
```

### Summary

| Check | Result |
| --- | --- |
| Archive v2 restore attempted | yes |
| Yarn v1 scoped mirror naming issue found | yes |
| Scoped mirror filenames added | 473 |
| Public package blocker from `F-04D` | cleared as immediate blocker |
| First local workspace blocker | `@10d/tend-ui-icons@0.3.1` |
| Local workspaces inspected | 46 |
| Internal `@10d/*` references | 151 |
| Unsatisfied internal `@10d/*` references | 37 |
| `app/node_modules` created | no |

Exact blocker after mirror fix:

```text
error Can't make a request in offline mode ("https://packages.samoletgroup.ru/repository/npm-all/@10d/tend-ui-icons/-/tend-ui-icons-0.3.1.tgz")
```

### Decision

`F-04F` is complete as a blocked diagnostic restore attempt.

The public archive path is now past the transitive public package blocker. The next blocker is local monorepo workspace range alignment.

### Next Step

```text
F-04G: align local @10d workspace dependency ranges for offline restore.
```

## F-04E Offline-Public Archive V2

Date: 2026-07-14

### Result

Status: `[x] complete`

Archive v2 was prepared from the public npm lockfile closure and validated.

Created:

```text
docs/history/workflows/f04e-offline-public-archive-v2.md
```

Archive files:

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-v2.zip
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-v2-manifest.json
tmp/offline-public-archive-staging/inbox/checksums-v2.sha256
```

### Summary

| Check | Result |
| --- | --- |
| Lockfile unique tarball URLs | 1592 |
| Public npm tarballs downloaded | 1560 |
| Failed downloads | 0 |
| Local workspace entries excluded | 32 |
| Zip entries | 1560 |
| Manifest packages | 1560 |
| Bad package `sourceUrl` values | 0 |
| Forbidden package `sourceUrl` values | 0 |
| `node_modules` entries in archive | 0 |
| Archive checksum match | passed |

Archive checksum:

```text
aeaef96358e62c0f9078b2adac09aaaa1fa07e107a1edf963b754a0e52147c42
```

### Not Done

- no dependency restore from archive v2;
- no `app/node_modules`;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no closed corporate source access.

### Next Step

```text
F-04F: restore dependency graph from offline-public archive v2 and diagnose local workspace resolution blockers.
```

## F-04D Offline Archive Restore Attempt

Date: 2026-07-14

Working directory:

```text
app/
```

### Result

Status: `[!] blocked`

The validated offline-public archive was used for a controlled Yarn offline restore attempt.

Created:

```text
docs/history/workflows/f04d-dependency-graph-restore-from-archive.md
```

Command shape:

```text
corepack yarn --use-yarnrc <TEMP>\ds-tend-ui-f04d-restore-attempt\f04d.yarnrc install --offline --frozen-lockfile --ignore-scripts --non-interactive --cache-folder <TEMP>\ds-tend-ui-f04d-restore-attempt\yarn-cache
```

### Observations

| Check | Result |
| --- | --- |
| Archive manifest packages | 24 |
| Unique Yarn mirror tarball basenames | 22 |
| Duplicate basename collisions | 2 |
| Restore command reached fetch stage | yes |
| Closed corporate registry access requested | no |
| `app/node_modules` created | no |
| First missing public transitive package | `csstype@3.1.3` |

Exact blocker:

```text
error Can't make a request in offline mode ("https://packages.samoletgroup.ru/repository/npm-all/csstype/-/csstype-3.1.3.tgz")
```

### Decision

`F-04D` is complete as a diagnostic restore attempt.

The dependency graph is still not restored. Build, Storybook and package connection remain blocked.

### Next Step

```text
F-04E: expand the offline-public archive to include required transitive packages from the lockfile closure.
```

## D-01 Local Tooling Preflight

Date: 2026-07-05

Working directory:

```text
app/
```

### Results

| Check | Result | Meaning |
| --- | --- | --- |
| Node | `v22.19.0` | Node is available locally. |
| npm via `npm.cmd` | `10.9.3` | npm is available when called through `npm.cmd`. |
| Corepack | `0.34.0` | Corepack is available locally. |
| Yarn via Corepack | `1.22.15` | The project can call Yarn 1 through Corepack. |
| `app/.yarnrc` | `"registry" "https://packages.samoletgroup.ru/repository/npm-all"` | The project is configured to use an internal registry. |
| Active Yarn registry | `https://packages.samoletgroup.ru/repository/npm-all` | Yarn reads the same internal registry from local config. |
| `app/.npmrc` | `package-lock=false` | npm lockfile generation is disabled. |
| `app/yarn.lock` | present | The dependency graph is declared by the archive. |
| `app/node_modules` | missing | Dependencies are not installed yet. |
| `app/packages/tend-ui/dist` | missing | The main package is not built yet. |

Additional local observation:

```text
Yarn warned that C:\Users\armad\AppData\Local\Yarn\Cache is not writable and selected C:\Users\armad\AppData\Local\Temp\.yarn-cache.
```

This warning did not block the version/config checks. It may matter during the actual install step if cache writes fail or become inconsistent.

## D-01 Decision

`D-01` is complete as a local preflight step.

The package manager strategy is:

```sh
corepack yarn <command>
```

The next executable step is `D-02`: a controlled diagnostic dependency install attempt from `app/`.

Important: the current registry points to an internal address. That is a local config fact. It does not mean we will request access to the internal registry. If `D-02` fails because that registry is unavailable, the failure should be recorded and then classified in `D-03`.

## Not Run

The following actions were intentionally not performed during `D-01`:

- dependency install;
- Storybook launch;
- package build;
- Docker build or container launch;
- package publication;
- changes to `package.json`, lockfiles, registry config, or source code.

## D-02 Offline Dependency Install Diagnostic

Date: 2026-07-05

Working directory:

```text
app/
```

### Command

The normal candidate command from the workflow would be:

```sh
corepack yarn install --frozen-lockfile
```

To respect the local/offline boundary and avoid requesting the internal registry, the diagnostic attempt was run in offline mode:

```sh
corepack yarn install --frozen-lockfile --offline --ignore-scripts --non-interactive
```

`--ignore-scripts` was used to avoid running package lifecycle scripts during the diagnostic attempt.

### Result

Status: blocked.

`app/node_modules` was not created.

Yarn stopped during package fetching:

```text
error Can't make a request in offline mode ("http://packages.samoletgroup.ru/repository/npm-all/cross-spawn/-/cross-spawn-7.0.5.tgz")
```

No `app/yarn-error.log` file was created.

### Lockfile Signal

The first blocking package reported by Yarn is `cross-spawn@7.0.5`.

Static lockfile scan shows that this is not an isolated issue:

| Check | Result |
| --- | --- |
| `yarn.lock` entries resolved through `packages.samoletgroup.ru` | `1593` |
| unique package names resolved through `packages.samoletgroup.ru` | `1399` |

Examples from the lockfile include:

- `@10d/eslint-config`
- `@10d/prettier-config`
- `@10d/tend-ui-api`
- `@10d/tend-ui-factories`
- `@10d/tend-ui-filters`
- `@10d/tend-ui-hooks`
- `@10d/tend-ui-icons`
- `@10d/tend-ui-primitives`
- `@ant-design/icons`
- `@babel/core`
- `cross-spawn`

### D-02 Decision

`D-02` is complete as a diagnostic attempt, but dependency installation remains blocked.

The block is not a Yarn/Corepack problem. Yarn runs locally. The practical blocker is that the lockfile points package tarballs to an internal registry, while the local cache does not contain at least the first required tarball.

The next executable step is `D-03`: classify installation blockers and decide which dependencies can be handled by public registry override, local workspace packages, local replacement, mocking, or deferral.

## D-02 Not Run

The following actions were intentionally not performed during `D-02`:

- online dependency install;
- public registry override;
- internal registry access request;
- Storybook launch;
- package build;
- Docker build or container launch;
- package publication;
- changes to `package.json`, `yarn.lock`, `.yarnrc`, `.npmrc`, or source code.

## D-03 Install Blocker Classification

Date: 2026-07-05

### Inputs

Used local files only:

- `app/package.json`;
- `app/packages/*/package.json`;
- `app/yarn.lock`;
- `docs/dependency-diagnostics.md`;
- `docs/dependency-unblock-workflow.md`.

No install, build, Storybook launch, Docker command, registry access, or network request was performed.

### Classification Summary

| Group | Evidence | Decision |
| --- | --- | --- |
| Local workspace packages | `37` packages exist in `app/packages`. | Treat local `@10d/tend-ui-*` source as source of truth. |
| Missing internal config packages | `@10d/eslint-config` and `@10d/prettier-config` are referenced but are not present as local workspaces. | Treat as tooling/config blockers, not runtime UI blockers. |
| Public-like packages through internal mirror | `1388` public-like package names in `yarn.lock` resolve through `packages.samoletgroup.ru`. | Requires a controlled dependency strategy before build/Storybook can run. |
| First concrete offline blocker | `cross-spawn-7.0.5.tgz` was missing from local cache. | Example of lockfile tarball resolution blocked by offline mode. |
| Mandatory runtime dependencies | `react`, `react-dom`, `styled-components`, significant `antd-core` usage. | Preserve; do not replace manually as the first unblock strategy. |
| Complex UI mechanics | `@dnd-kit/*`, `@tanstack/*`, `rc-drawer`, `rc-overflow`. | Keep if possible; compensate only after Storybook/build identifies exact broken behavior. |
| Service/API/realtime | `axios`, `samolet-oauth2`, `centrifuge`, service React Query flows. | Mock or disable in Storybook; do not request corporate service access. |
| Local helper candidates | parts of `lodash`, `classnames`, `uuid`, `query-string`. | Potential later replacement, not a D-03 code change. |

### Decision

`D-03` is complete as a classification step.

The project should not move straight into manual component rewrites. The next practical step is a narrow dependency graph strategy before `D-04` build diagnostics.

Recommended inserted step:

```text
D-03A: choose and execute a controlled dependency graph strategy.
```

`D-04` remains unavailable as a real build check until `app/node_modules` exists or until a build attempt is explicitly run as a blocked diagnostic.

### D-03 Not Run

The following actions were intentionally not performed during `D-03`:

- dependency install;
- public registry override;
- internal registry access request;
- Storybook launch;
- package build;
- Docker build or container launch;
- package publication;
- source code changes;
- changes to `package.json`, `yarn.lock`, `.yarnrc`, or `.npmrc`.

## D-03A Dependency Graph Strategy

Date: 2026-07-05

### Local Checks

| Check | Result |
| --- | --- |
| `app/node_modules` | missing |
| `app/yarn.lock` | present |
| `app/.yarnrc` | present |
| `app/packages/tend-ui/dist` | missing |
| Active Yarn registry | `https://packages.samoletgroup.ru/repository/npm-all` |
| Active Yarn cache dir | `C:\Users\armad\AppData\Local\Temp\.yarn-cache\v6` |
| Top-level entries in active Yarn cache `v6` | `9` |
| Cached entries matching `cross-spawn` | `1`, but it appears incomplete |
| Cached entries matching `styled-components`, `storybook`, `antd` | `0` |

The `cross-spawn` cache entry exists as a directory:

```text
npm-cross-spawn-7.0.5-910aac880ff5243da96b728bc6521a5f6c2f2f82-integrity
```

However, the previous offline install still failed on `cross-spawn-7.0.5.tgz`, so the local cache cannot be treated as a valid dependency graph source.

### Strategy Decision

`D-03A` is complete as a strategy decision, but dependency graph restoration remains blocked.

Chosen current strategy:

1. Do not request access to the internal registry.
2. Do not rewrite `.yarnrc`, `.npmrc`, `package.json`, or `yarn.lock` during this step.
3. Do not start manual replacement of UI mechanics before build/Storybook identifies exact broken behavior.
4. Treat `D-04` as a blocked diagnostic step unless a separate dependency install route is explicitly enabled.

The viable future routes are:

- public registry install strategy for public packages, if network access and project policy allow it later;
- prefilled local Yarn cache or local package mirror;
- local stub/replacement only for missing tooling config packages such as `@10d/eslint-config` and `@10d/prettier-config`;
- workspace-based local packages for existing `@10d/tend-ui-*` packages.

### D-03A Result

`app/node_modules` was not created.

The next checklist step can proceed only as:

```text
D-04: blocked build diagnostic
```

unless the dependency graph is restored first through a separately approved install/cache strategy.

### D-03A Not Run

The following actions were intentionally not performed during `D-03A`:

- dependency install;
- online public registry override;
- internal registry access request;
- lockfile rewrite;
- package config changes;
- Storybook launch;
- package build;
- Docker build or container launch;
- source code changes.

## D-04 Key Package Build Diagnostic

Date: 2026-07-05

### Commands

Executed from `app/`:

```sh
corepack yarn build:tokens
corepack yarn build:theme
corepack yarn build:icons
corepack yarn build:primitives
corepack yarn build:main
```

### Result

Status: blocked diagnostic.

All five commands failed with the same blocker: the outer command can start through Corepack, but the root package scripts call plain `yarn workspace ...`, and plain `yarn` is not available in PATH.

Common error:

```text
'yarn' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

Additional warning:

```text
warning Cannot find a suitable global folder. Tried these: "C:\Users\armad\AppData\Local\Yarn, C:\Users\armad\.yarn"
```

### Dist Status

| Package | `dist` |
| --- | --- |
| `@10d/tend-ui-tokens` | missing |
| `@10d/tend-ui-theme` | missing |
| `@10d/tend-ui-icons` | missing |
| `@10d/tend-ui-primitives` | missing |
| `@10d/tend-ui` | missing |

### D-04 Decision

`D-04` is complete as a blocked build diagnostic.

The next blocker is not only the missing plain `yarn` command. The package build scripts also require `tsc`, `tsc-alias`, `rollup` and the full dependency graph from `app/node_modules`, which is still missing.

`D-05` can proceed only as a blocked Storybook diagnostic unless dependency graph restoration is handled first.

### D-04 Not Run

The following actions were intentionally not performed during `D-04`:

- dependency install;
- public registry override;
- internal registry access request;
- global Yarn install;
- Corepack enable/config mutation;
- Storybook launch;
- Docker build or container launch;
- source code or config changes.

## D-05 Storybook Launch Diagnostic

Date: 2026-07-05

### Command

Executed from `app/`:

```sh
corepack yarn storybook
```

### Result

Status: blocked diagnostic.

The root script starts through Corepack:

```text
yarn run v1.22.15
$ storybook dev -p 3000
```

Then it fails because the Storybook binary is not installed:

```text
'storybook' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

### Local State After Attempt

| Check | Result |
| --- | --- |
| `app/node_modules` | missing |
| `app/node_modules/.bin/storybook` | missing |
| `app/storybook-static` | missing |
| port `3000` | not occupied by Storybook during the check |

### D-05 Decision

`D-05` is complete as a blocked Storybook diagnostic.

Storybook configuration is present, but Storybook cannot be opened until the dependency graph is restored enough to provide the `storybook` binary and its runtime dependencies.

The next checklist step, `D-06`, can only be a blocked component-check diagnostic in the current environment.

### D-05 Not Run

The following actions were intentionally not performed during `D-05`:

- dependency install;
- public registry override;
- internal registry access request;
- Storybook build;
- Docker build or container launch;
- source code or config changes;
- visual component verification.

## D-06 Base Component Check Diagnostic

Date: 2026-07-05

### Scope

First component set:

- Button;
- Input;
- Select;
- Modal;
- Table.

### Result

Status: blocked diagnostic.

Storybook is not running, so component states were not visually or interactively checked.

Static source/story/docs map was recorded in:

```text
docs/component-runtime-check.md
```

### Static Findings

| Component | Story found | Runtime status |
| --- | --- | --- |
| Button | `app/packages/tend-ui-primitives/src/Button/Button.stories.tsx` | blocked / runtime unverified |
| Input | `app/packages/tend-ui-primitives/src/Input/Input.stories.tsx` | blocked / runtime unverified |
| Select | `app/packages/tend-ui/src/primitives/Select/Select.stories.tsx` | blocked / runtime unverified |
| Modal | `app/packages/tend-ui/src/primitives/Modal/Modal.stories.tsx` | blocked / runtime unverified |
| Table | `app/packages/tend-ui/src/primitives/Table/Table.stories.tsx`; `app/packages/tend-ui-table/src/Table/Table.stories.tsx` | blocked / runtime unverified |

### D-06 Decision

`D-06` is complete as a blocked component-check diagnostic.

The components have static source and Storybook story coverage, but they must remain marked as runtime unverified until Storybook opens and the required states are checked.

### D-06 Not Run

The following actions were intentionally not performed during `D-06`:

- dependency install;
- Storybook launch beyond the already blocked `D-05` diagnostic;
- visual component verification;
- interaction checks;
- screenshot checks;
- source code or config changes.

## D-07 Connection Strategy

Date: 2026-07-05

### Inputs

Used local files only:

- `docs/package-connection-guide.md`;
- `docs/history/external-projects/s-tracker/candidate-project-check.md`;
- `S-Tracker/package.json`;
- `S-Tracker/src/main.js`;
- local Tend UI build/runtime status from `D-04`-`D-06`.

No files in `S-Tracker` were changed.

### Current Candidate State

| Area | Result |
| --- | --- |
| Candidate project | `S-Tracker` |
| Candidate framework | Vite, vanilla JavaScript |
| Candidate React dependencies | missing |
| Candidate React adapter layer | missing |
| Tend UI built package | missing |
| Tend UI Storybook | blocked |
| Tend UI component runtime verification | blocked / unverified |

### Strategy Decision

`D-07` is complete as a strategy step.

Selected route:

1. Do not connect Tend UI directly to `S-Tracker` now.
2. Restore Tend UI dependency graph first.
3. Build Tend UI key packages.
4. Verify Storybook and base component states.
5. Test a minimal Tend UI render in an isolated React sandbox consumer.
6. Only after that, design and implement a React adapter layer in `S-Tracker`.

### D-07 Not Run

The following actions were intentionally not performed during `D-07`:

- dependency install;
- package build;
- Storybook launch;
- package publication;
- changes inside `S-Tracker`;
- consumer-project integration;
- React adapter implementation.

## D-08 Minimal Connection Diagnostic

Date: 2026-07-05

### Scope

Minimal target:

```tsx
import { TendUI } from '@10d/tend-ui/theme';
import { Button } from '@10d/tend-ui/primitives';
```

### Result

Status: blocked diagnostic.

The minimal render was not executed.

Details were recorded in:

```text
docs/minimal-connection-check.md
```

### Blockers

| Blocker | Effect |
| --- | --- |
| `app/node_modules` is missing | Tend UI runtime dependencies are unavailable. |
| `app/packages/tend-ui/dist` is missing | Main package cannot be consumed as built package. |
| `app/packages/tend-ui-theme/dist` is missing | Theme/provider build artifact is missing. |
| `app/packages/tend-ui-primitives/dist` is missing | Primitive build artifact is missing. |
| Storybook is blocked | Button runtime behavior is unverified. |
| Candidate React layer is unavailable | `S-Tracker` cannot render Tend UI React components yet. |

### D-08 Decision

`D-08` is complete as a blocked minimal-connection diagnostic.

The static import contract remains documented, but consumer import/render is not verified.

### D-08 Not Run

The following actions were intentionally not performed during `D-08`:

- dependency install;
- package build;
- Storybook launch;
- package publication;
- consumer project modification;
- React adapter implementation;
- smoke render execution.

## D-09 Main Workflow Sync

Date: 2026-07-05

### Scope

Synchronized the main workflow after the `D-*` diagnostic branch.

Updated documents:

- `docs/history/workflows/design-system-workflow.md`;
- `docs/dependency-unblock-workflow.md`;
- `docs/quality-gate.md`;
- `docs/dependency-unblock-log.md`.

### Result

`D-09` is complete.

The main workflow now reflects the actual facts from `D-01`-`D-08`:

- Yarn is available through Corepack, but plain `yarn` is still unavailable inside package scripts;
- `app/node_modules` is missing;
- Storybook does not open because the `storybook` binary is not installed;
- package build does not produce `dist`;
- Button, Input, Select, Modal and Table have static source/story coverage but runtime states remain unverified;
- minimal consumer import/render was not executed;
- `S-Tracker` remains a candidate only after Tend UI build, Storybook and isolated React smoke test are restored.

### Decision

The D-branch is diagnostically complete.

At the end of `D-09`, the next practical step was not another consumer integration attempt. It was a controlled dependency graph restoration decision:

```text
E-01 / DEC-01: choose a route to restore dependency graph before build, Storybook and consumer smoke test.
```

### D-09 Not Run

The following actions were intentionally not performed during `D-09`:

- dependency install;
- package build;
- Storybook launch;
- Docker build;
- package publication;
- consumer project modification;
- source code changes.

## E-01 / DEC-01 Dependency Restoration Decision

Date: 2026-07-05

### Scope

Selected the route for restoring the Tend UI dependency graph after the `D-*` diagnostics.

Created:

```text
docs/dependency-restoration-decision.md
```

Updated:

- `docs/dependency-unblock-workflow.md`;
- `docs/history/workflows/design-system-workflow.md`;
- `docs/quality-gate.md`;
- `docs/dependency-unblock-log.md`.

### Decision

`E-01 / DEC-01` is complete.

Selected route:

1. Keep the original archive source as the baseline.
2. Use local workspaces for available `@10d/tend-ui-*` sources.
3. Do not use public registry, internal registry or any external package source.
4. Build a local missing-dependency mechanics map from `package.json`, `yarn.lock`, imports, stories and configs.
5. Use targeted stubs only for tooling/config packages and only after the exact blocker is known.
6. Use mocks or disabled scenarios for unavailable service/API/realtime flows.
7. Use local helper replacements only after the exact usage is known.
8. Create separate component-level implementation tasks for complex runtime UI mechanics.
9. Return to build, Storybook and consumer smoke test only after local compensation is implemented enough to run them.

### Next Step

```text
E-02: build a missing-dependency mechanics map.
```

### E-01 Not Run

The following actions were intentionally not performed during `E-01`:

- dependency install;
- network call;
- build;
- Storybook launch;
- Docker build;
- package publication;
- edits to `app/.yarnrc`, `app/package.json`, `app/yarn.lock` or component source;
- changes inside `S-Tracker`.

## E-01 Update: Strict Local Boundary

Date: 2026-07-05

### Reason

The project boundary was clarified: external installs and external requests are not allowed.

The only source material for building, connecting and documenting the design system is:

- the provided archive already unpacked into the project;
- local files in the current project;
- context and documents created inside this project.

### Updated Decision

The `E-01 / DEC-01` route is updated to strict local compensation.

Rejected:

- public registry install;
- internal registry access;
- external network requests;
- external package sources.

Selected:

- local workspaces for available `@10d/tend-ui-*` sources;
- a missing-dependency mechanics map;
- local stubs for tooling/config blockers;
- local mocks or disabled scenarios for service/API/realtime blockers;
- local helper replacements where safe;
- separate implementation tasks for complex runtime UI mechanics.

### Updated Next Step

```text
E-02: build a missing-dependency mechanics map.
```

### Not Run

The following actions were intentionally not performed:

- dependency install;
- network call;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source code changes.

## E-01 Update: Public Sources Allowed, Corporate Sources Forbidden

Date: 2026-07-05

### Reason

The project boundary was clarified again.

The phrase "external installs" means closed corporate development spaces, not public package ecosystems.

Forbidden:

- internal corporate registry;
- corporate GitLab;
- Nexus;
- corporate Figma;
- corporate CI/CD;
- any closed company-specific development environment.

Allowed as explicit controlled steps:

- public npm packages;
- GitHub repositories;
- other public/open codebases.

### Updated Decision

The `E-01 / DEC-01` route is updated from strict local compensation to public/local with a hard corporate boundary.

Selected:

- local workspaces for available `@10d/tend-ui-*` sources;
- public npm/GitHub route for packages that are genuinely public;
- local stubs, mocks, helper replacements or implementations for corporate-only or unavailable mechanics;
- no access requests to closed corporate environments.

### Updated Next Step

```text
E-02: build a dependency source and mechanics map.
```

The E-02 map must classify each dependency as:

- local workspace;
- public npm/GitHub;
- corporate-only/unavailable;
- local compensation candidate.

### Not Run

The following actions were intentionally not performed:

- dependency install;
- network call;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source code changes.

## E-02: Dependency Source And Mechanics Map

Date: 2026-07-05

### Purpose

Classify Tend UI dependencies by source route and by the mechanics they provide before any build, Storybook or consumer smoke test is retried.

### Result

`E-02` is complete.

Created:

```text
docs/dependency-source-map.md
```

The map records:

- local workspace packages from `app/packages`;
- public npm/GitHub candidates;
- corporate-only or unavailable dependencies;
- affected packages and components;
- dependency mechanics;
- compensation or restoration route.

### Key Findings

- 37 local `@10d/tend-ui-*` packages are present in `app/packages` and should be treated as local workspaces.
- `react`, `react-dom`, `styled-components`, Storybook and build tooling are public-source candidates and core blockers for runtime verification.
- `antd-core`, `rc-*`, TanStack and DnD Kit packages are public-source candidates but represent complex UI mechanics.
- `samolet-oauth2` is corporate-specific and must not trigger access requests; related service flows should be mocked or disabled locally.
- Small helpers such as `classnames`, parts of `lodash`, `uuid` and `query-string` may be local compensation candidates only after exact usage is reviewed.

### Not Run

The following actions were intentionally not performed:

- dependency install;
- network call;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source code changes;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- changes inside `S-Tracker`.

### Next Step

```text
E-03: prepare a controlled public-only dependency restoration step.
```

`E-03` must define the exact command, registry boundary, allowed file changes and rollback rule before any public package install is attempted.

## E-03: Public Dependency Restoration Runbook

Date: 2026-07-05

### Purpose

Prepare a controlled public-only dependency restoration step before executing any install.

### Result

`E-03` is complete.

Created:

```text
docs/public-dependency-restoration-runbook.md
```

The runbook records:

- the exact candidate command for the future public-only diagnostic attempt;
- the public registry boundary;
- forbidden corporate sources;
- allowed file changes;
- forbidden file changes;
- stop conditions;
- rollback rule;
- result classification and success criteria.

### Key Decision

The first future diagnostic attempt should avoid the existing `app/yarn.lock`, because it contains many resolved URLs pointing to `packages.samoletgroup.ru`.

The runbook therefore defines a no-lockfile public registry probe as the first candidate command. This is not a final reproducible package strategy; it is a controlled diagnostic route to discover which dependencies can be restored publicly and which blockers require local compensation.

### Not Run

The following actions were intentionally not performed:

- dependency install;
- network call;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source code changes;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- changes inside `S-Tracker`.

### Next Step

```text
E-04: execute the controlled public-only dependency restoration diagnostic, or stop before execution if public installs are not being run yet.
```

## E-04: Controlled Public-Only Dependency Restoration Diagnostic

Date: 2026-07-05

### Purpose

Run the controlled public-only install diagnostic from `docs/public-dependency-restoration-runbook.md`.

### Command

Working directory:

```text
app/
```

Command:

```powershell
New-Item -ItemType Directory -Force ..\.cache\yarn-public
$env:YARN_CACHE_FOLDER = (Resolve-Path ..\.cache\yarn-public).Path
corepack yarn install --non-interactive --ignore-scripts --no-lockfile --registry https://registry.npmjs.org --network-timeout 600000
```

### Result

`E-04` is complete as a blocked diagnostic.

Yarn started and reached:

```text
[1/4] Resolving packages...
```

Then it stopped with:

```text
error An unexpected error occurred: "https://registry.npmjs.org/@types%2freact: "
Trace: AggregateError [EACCES]
```

### Classification

This is a public npm access blocker in the current execution environment.

It is not evidence that `@types/react` is missing from public npm, and it is not evidence that the Tend UI dependency graph is impossible to restore from public sources.

### Corporate Boundary

The command used:

```text
--registry https://registry.npmjs.org
--no-lockfile
```

The generated `yarn-error.log` included a diagnostic dump of the old `app/yarn.lock`, which contains many `packages.samoletgroup.ru` references. That log was removed as a temporary diagnostic artifact.

No closed corporate registry was selected as the target registry for the command.

### State After Attempt

| Item | State |
| --- | --- |
| `app/node_modules` | Not created. |
| `.cache/yarn-public/` | Empty directory residue remains; shell deletion was blocked by the environment policy. |
| `app/yarn-error.log` | Removed. |
| `app/package.json` | Not intentionally edited. |
| `app/yarn.lock` | Not intentionally edited. |
| `app/.yarnrc` | Not intentionally edited. |
| Source files | Not edited. |

### Next Step

```text
E-05: choose a public dependency acquisition route under the current network restriction.
```

Candidate routes for `E-05`:

- run the same public-only command in a local terminal/environment with public npm access;
- prepare an offline public npm cache or package archive without corporate sources;
- use another network-enabled public-only environment;
- only after dependency acquisition is solved, return to build and Storybook diagnostics.

## E-05: Dependency Acquisition And Compensation Strategy

Date: 2026-07-05

### Purpose

Choose the dependency route after `E-04` proved that the current Codex execution environment cannot reach public npm.

### Result

`E-05` is complete as a strategy step.

Created:

```text
docs/dependency-acquisition-and-compensation-strategy.md
```

### Decision

Use a mixed public/local strategy:

- acquire foundational public dependencies through public/offline-public routes when possible;
- do not use or request closed corporate sources;
- do not manually rewrite `react`, `react-dom`, `styled-components`, Storybook stack or build tooling as a near-term unblock path;
- mock, disable or stub corporate-only service flows;
- replace small helpers locally only after exact import usage is known;
- turn complex unavailable UI mechanics into separate component-level tasks with acceptance criteria.

### Not Run

- no dependency install;
- no network call;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source-code edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no changes inside `S-Tracker`.

### Next Step

```text
E-06: prepare the local compensation backlog and first implementation candidates.
```

## E-06: Local Compensation Backlog

Date: 2026-07-06

### Purpose

Prepare the local compensation backlog after `E-05`, without implementing replacements yet.

### Result

`E-06` is complete as a backlog step.

Created:

```text
docs/local-compensation-backlog.md
```

### Backlog Summary

First safe implementation candidates:

- `LC-03` tooling config stubs for `@10d/eslint-config` and `@10d/prettier-config`;
- `LC-01` service auth mock boundary for `samolet-oauth2`;
- `LC-05` narrow query serialization helper;
- `LC-04` class name helper.

Deferred complex mechanics:

- `antd-core` and `rc-*`;
- `@dnd-kit/*`;
- `@tanstack/*`;
- broad `lodash` replacement;
- broad date behavior replacement.

Protected dependencies:

- `react`;
- `react-dom`;
- `styled-components`;
- Storybook stack;
- build tooling.

### Not Run

- no dependency install;
- no network call;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source-code edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no changes inside `S-Tracker`.

### Next Step

```text
E-07: choose and implement the first low-risk local compensation slice.
```

## E-07: Tooling Config Stubs

Date: 2026-07-06

### Purpose

Implement the first low-risk local compensation slice from `docs/local-compensation-backlog.md`.

Selected slice:

```text
LC-03 tooling config stubs
```

### Result

`E-07` is complete.

Created local workspace packages:

```text
app/packages/eslint-config/package.json
app/packages/eslint-config/index.js
app/packages/prettier-config/package.json
app/packages/prettier-config/index.js
```

Created documentation:

```text
docs/tooling-config-stubs.md
```

### Verification

Performed without dependency installation:

- package manifests parse as JSON;
- local Node `require` can load both config modules;
- `app/node_modules` is still absent;
- `app/yarn-error.log` is absent.

### Not Run

- no dependency install;
- no network call;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no changes inside `S-Tracker`.

### Next Step

```text
E-08: re-run build diagnostics after LC-03 or continue with LC-01 service auth mock boundary.
```

## E-08: Build Diagnostic After LC-03

Date: 2026-07-06

### Purpose

Re-run a short build diagnostic after `E-07 / LC-03` added local tooling config stubs.

### Preflight Result

`corepack yarn workspaces info --silent` recognizes:

```text
@10d/eslint-config -> packages/eslint-config
@10d/prettier-config -> packages/prettier-config
```

State before build attempts:

| Item | State |
| --- | --- |
| `app/node_modules` | Missing. |
| `app/yarn-error.log` | Missing. |
| `app/packages/tend-ui/dist` | Missing. |
| `app/packages/tend-ui-tokens/dist` | Missing. |

### Diagnostic Attempts

Commands were run from `app/`.

| Command | Result |
| --- | --- |
| `corepack yarn build:tokens` | Blocked on nested plain `yarn`. |
| `corepack yarn build:main` | Blocked on nested plain `yarn`. |

Common error:

```text
'yarn' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

### Result

`E-08` is complete as a blocked diagnostic.

LC-03 successfully added local config package identities, but build is still blocked before TypeScript/Rollup stages because:

- package scripts call plain `yarn`;
- `app/node_modules` is missing;
- build tooling and runtime dependencies are not installed.

### Not Run

- no dependency install;
- no network call;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source component edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-09: implement LC-01 service auth mock boundary.
```

## E-09: Service Auth Mock Boundary

Date: 2026-07-06

### Purpose

Implement `LC-01` from `docs/local-compensation-backlog.md`: replace the unavailable corporate `samolet-oauth2` package with a local offline stub.

### Result

`E-09` is complete.

Created:

```text
app/packages/samolet-oauth2/package.json
app/packages/samolet-oauth2/index.js
app/packages/samolet-oauth2/index.d.ts
docs/service-auth-mock-boundary.md
```

### Covered API

The local stub covers the exports actually used by local source files:

- `setAxiosAuthInterceptor`;
- `authStorage.getJwtAuthParams`.

It also includes local mock helpers:

- `authStorage.setJwtAuthParams`;
- `authStorage.clearJwtAuthParams`.

### Verification

Performed without dependency installation:

- package manifest parses as JSON;
- local Node `require` can load the stub;
- local Node `require` exposes `setAxiosAuthInterceptor`;
- local Node `require` exposes `authStorage.getJwtAuthParams`;
- `corepack yarn workspaces info --silent` recognizes `samolet-oauth2`;
- `@10d/tend-ui-notifications` sees `samolet-oauth2` as a workspace dependency;
- `@10d/tend-ui-search-assistant` sees `samolet-oauth2` as a workspace dependency;
- `app/node_modules` is still absent;
- `app/yarn-error.log` is absent.

### Not Run

- no dependency install;
- no network call;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-10: implement LC-05 narrow query-string replacement.
```

## E-10: Query String Replacement

Date: 2026-07-06

### Purpose

Implement `LC-05` from `docs/local-compensation-backlog.md`: replace the narrow service-layer use of `query-string`.

### Result

`E-10` is complete.

Created:

```text
app/packages/query-string/package.json
app/packages/query-string/index.js
app/packages/query-string/index.d.ts
docs/query-string-replacement.md
```

### Covered API

The local stub covers the exact local usage:

```text
queryString.stringify(params, { arrayFormat: 'comma' })
```

### Verification

Performed without dependency installation:

- package manifest parses as JSON;
- local Node `require` can load the stub;
- local Node `require` exposes `stringify`;
- local Node `require` exposes `default.stringify`;
- `stringify({ a: [1, 2] }, { arrayFormat: 'comma' })` returns `a=1,2`;
- `corepack yarn workspaces info --silent` recognizes `query-string`;
- `@10d/tend-ui-notifications` sees `query-string` as a workspace dependency;
- `@10d/tend-ui-search-assistant` sees `query-string` as a workspace dependency;
- `app/node_modules` is still absent;
- `app/yarn-error.log` is absent.

### Not Run

- no dependency install;
- no network call;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no service source file edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-11: implement LC-04 class name helper.
```

## E-11: Class Name Helper Replacement

Date: 2026-07-06

### Purpose

Implement `LC-04` from `docs/local-compensation-backlog.md`: replace the low-risk `classnames` helper with a local workspace package.

### Result

`E-11` is complete.

Created:

```text
app/packages/classnames/package.json
app/packages/classnames/index.js
app/packages/classnames/index.d.ts
docs/classnames-helper-replacement.md
```

### Covered API

The local stub covers the actual local class composition usage:

```text
cn('base', className)
cn(['base', className])
cn('base', { active: isActive, disabled: isDisabled })
cn(['base', className], { active: isActive })
```

### Verification

Performed without dependency installation:

- local Node `require` can load the stub;
- `cn('a', { b: true, c: false }, ['d', 0, null, 'e'])` returns `a b d e`;
- default-compatible runtime export works;
- `corepack yarn workspaces info --silent` recognizes `classnames`;
- primitives, typography, upload, header, table and tree packages list `classnames` as a workspace dependency;
- `app/node_modules` is still absent;
- `app/packages/tend-ui/dist` is still absent;
- `app/yarn-error.log` is absent.

### Not Run

- no dependency install;
- no network call;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source file edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-12: scope and implement LC-06 uuid helper.
```

## E-12: UUID Helper Replacement

Date: 2026-07-06

### Purpose

Implement `LC-06` from `docs/local-compensation-backlog.md`: replace the narrow local use of `uuid` with local workspace packages.

### Result

`E-12` is complete.

Created:

```text
app/packages/uuid/package.json
app/packages/uuid/index.js
app/packages/uuid/index.d.ts
app/packages/types-uuid/package.json
app/packages/types-uuid/index.d.ts
docs/uuid-helper-replacement.md
```

### Covered API

The local stub covers the actual local runtime usage:

```text
import { v4 as uuidv4 } from 'uuid';
uuidv4();
```

### Verification

Performed without dependency installation:

- local Node `require` can load the stub;
- generated IDs match UUID v4 string shape;
- 100 generated IDs passed a uniqueness smoke check;
- `corepack yarn workspaces info --silent` recognizes `uuid`;
- `corepack yarn workspaces info --silent` recognizes `@types/uuid`;
- upload, filters and columns-settings packages list `uuid` / `@types/uuid` as workspace dependencies;
- `app/node_modules` is still absent;
- `app/packages/tend-ui/dist` is still absent;
- `app/yarn-error.log` is absent.

### Not Run

- no dependency install;
- no network call;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source file edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-13: re-run build diagnostics after LC-04/LC-06.
```

## E-13: Build Diagnostic After LC-04 and LC-06

Date: 2026-07-06

### Purpose

Run a build diagnostic checkpoint after local helper compensation for `classnames`, `uuid` and `@types/uuid`.

### Result

`E-13` is diagnostically complete and blocked.

Created:

```text
docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md
```

Updated:

```text
docs/build-diagnostics.md
```

### Diagnostic Attempts

Performed without dependency installation:

- `corepack yarn build:tokens`;
- `corepack yarn build:main`;
- `corepack yarn build:upload`;
- `corepack yarn build:filters`.

All attempts stopped on:

```text
'yarn' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

### Verification

- local compensation packages are recognized by Yarn workspaces;
- `app/node_modules` is still absent;
- checked `dist` folders are still absent;
- `app/yarn-error.log` is absent.

### Not Run

- no dependency install;
- no Storybook launch;
- no Docker build;
- no package publication;
- no package source edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-14: define local build-runner strategy for nested plain yarn calls.
```

## E-14: Build Runner Strategy

Date: 2026-07-06

### Purpose

Define a local strategy for nested plain `yarn` calls after `E-13` confirmed that build scripts stop before TypeScript/Rollup stages.

### Result

`E-14` is complete as a strategy step.

Created:

```text
docs/history/workflows/e14-build-runner-strategy.md
```

Selected:

```text
temporary local yarn.cmd shim for diagnostic shell
```

### Decision

Rejected for now:

- broad edits to `app/package.json` and `app/packages/*/package.json`;
- global Yarn installation;
- `corepack enable`;
- repeating the same unshimmed build diagnostic;
- starting broader `LC-07` lodash compensation before clarifying the build-runner blocker.

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no package source edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-15: create temporary local yarn.cmd shim and run narrow build diagnostics.
```

## E-15: Shimmed Build Diagnostics

Date: 2026-07-06

### Purpose

Create the temporary local `yarn.cmd` shim selected in `E-14` and run narrow build diagnostics.

### Result

`E-15` is diagnostically complete and blocked.

Created:

```text
tmp/build-runner-shim/yarn.cmd
docs/history/workflows/e15-shimmed-build-diagnostics.md
```

### Diagnostic Attempts

Performed without dependency installation:

- `corepack yarn build:tokens`;
- `corepack yarn build:main`;
- `corepack yarn build:upload`;
- `corepack yarn build:filters`.

The shim worked and all attempts moved past nested plain `yarn`.

All attempts stopped on:

```text
'tsc' is not recognized as an internal or external command,
operable program or batch file.
```

### Verification

- `yarn --version` through the shim returns `1.22.15`;
- `app/node_modules` is still absent;
- checked `dist` folders are still absent;
- `app/yarn-error.log` is absent.

### Not Run

- no dependency install;
- no Storybook launch;
- no Docker build;
- no package publication;
- no package source edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-16: define dependency graph and build tooling restoration strategy.
```

## E-16: Dependency Graph And Build Tooling Restoration Strategy

Date: 2026-07-06

### Purpose

Define how to restore `app/node_modules`, TypeScript, tsc-alias, Rollup, Storybook and foundational runtime/build dependencies after `E-15`.

### Result

`E-16` is complete as a strategy step.

Created:

```text
docs/dependency-graph-restoration-strategy.md
```

### Decision

Selected:

```text
primary: public npm install in a network-enabled local terminal/environment
fallback: prepared offline public package cache/archive with provenance
diagnostic-only fallback: prepared node_modules tree for local verification only
```

Rejected:

- fake `tsc`;
- fake Rollup;
- fake Storybook;
- fake React / React DOM;
- fake styled-components;
- closed corporate registry/GitLab/Nexus/Figma/CI routes.

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-17: prepare executable public-only dependency restore runbook.
```

## E-17: Public-Only Dependency Restore Executable Runbook

Date: 2026-07-06

### Purpose

Prepare the executable runbook for restoring dependency graph and build tooling through allowed public/offline-public sources.

### Result

`E-17` is complete as a runbook step.

Created:

```text
docs/public-only-dependency-restore-executable-runbook.md
```

### Covered

- public-only source boundary;
- protected files;
- allowed changed paths;
- preflight checks;
- Scenario A: public-network local terminal;
- Scenario B: offline public cache/package archive;
- stop conditions;
- rollback/cleanup;
- verification after restore;
- result recording template.

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

### Next Step

```text
E-19: build offline-public dependency package manifest from local package files and yarn.lock.
```

## E-32: Isolated React Consumer Smoke Check

Date: 2026-07-06

### Purpose

Check whether an isolated React consumer smoke render can be executed outside Storybook after the E-branch local compensation work.

### Result

Status: `[!] blocked diagnostic`

Created:

```text
docs/history/workflows/e32-isolated-react-consumer-smoke-check.md
```

### Checked Local State

```text
app/node_modules: absent
app/node_modules/react: absent
app/node_modules/react-dom: absent
app/packages/tend-ui/dist: absent
app/packages/tend-ui-primitives/dist: absent
app/packages/tend-ui-theme/dist: absent
app/packages/lodash/package.json: present
app/yarn-error.log: absent
```

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits to `app/package.json`, `app/yarn.lock` or registry settings;
- no edits inside `S-Tracker`;
- no closed corporate source access.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-04C: Offline-Public Archive Repair

Date: 2026-07-14

### Purpose

Repair the offline-public archive candidate so validation can pass before any dependency import.

### Result

Status: `[x] complete`

Created:

```text
docs/history/workflows/f04c-offline-public-archive-repair.md
```

### Repairs

```text
filled all package sourceUrl values with public npm tarball URLs
rebuilt zip entries as packages/*.tgz
recomputed archive checksum
updated checksums.sha256
updated offline-public-package-archive-manifest.json
```

### Validation After Repair

```text
zip entries: 24
manifest packages: 24
missing archive paths: 0
empty sourceUrl values: 0
forbidden sourceUrl values: 0
node_modules entries: 0
archive checksum match: true
```

### Not Run

- no archive import;
- no dependency install;
- no `node_modules` copy;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

### Next Step

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

## F-04B: Offline-Public Archive Validation

Date: 2026-07-14

### Purpose

Validate the prepared offline-public archive input before any dependency import.

### Result

Status: `[!] blocked validation`

Created:

```text
docs/history/workflows/f04b-offline-public-archive-validation.md
```

### Validation Findings

Passed:

```text
archive exists
manifest parses as JSON
checksums.sha256 exists
archive checksum matches
manifest contains 24 packages
package lanes cover lanes 1, 2, 3 and minimum lane 4
no package sourceUrl points to forbidden sources
archive contains no node_modules tree
```

Blocked:

```text
all 24 package sourceUrl values are empty
all 24 manifest archivePath values use packages/*.tgz while zip entries are at archive root
```

### Not Run

- no archive import;
- no dependency install;
- no `node_modules` copy;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-04A: Offline-Public Archive Input

Date: 2026-07-14

### Purpose

Prepare or provide the reviewed offline-public dependency archive input for the archive-gated restore route.

### Result

Status: `[x] complete as archive input preparation`

Created:

```text
docs/history/workflows/f04a-offline-public-archive-input.md
tmp/offline-public-archive-staging/inbox/offline-public-package-archive.zip
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-manifest.json
tmp/offline-public-archive-staging/inbox/checksums.sha256
```

### Source

The archive candidate was built from public npm package tarballs after explicit approval for public npm access outside the sandbox.

No closed corporate source was used.

### Scope

Package count:

```text
24
```

Covered:

```text
Lane 1. Build Tooling Minimum
Lane 2. Storybook And Vite Runtime
Lane 3. Foundational React Runtime
Minimum Lane 4. React/styled-components type packages
```

### Not Run

- no archive import;
- no dependency install;
- no `node_modules` copy;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-04: Dependency Graph Restore Attempt

Date: 2026-07-06

### Purpose

Restore the dependency graph through the selected approved archive-gated path, or record the exact blocker.

### Result

Status: `[!] blocked input`

Created:

```text
docs/history/workflows/f04-dependency-graph-restore-attempt.md
```

### Checked State

Missing required inbox files:

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive.*
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-manifest.json
tmp/offline-public-archive-staging/inbox/checksums.sha256
```

Still absent:

```text
app/node_modules
app/node_modules/react
app/node_modules/react-dom
app/packages/tend-ui/dist
```

### Not Run

- no archive extraction;
- no archive import;
- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-03: Dependency Graph Acquisition Path

Date: 2026-07-06

### Purpose

Finalize the route for restoring `app/node_modules` without closed corporate sources and without fake foundational dependency stubs.

### Result

Status: `[x] complete`

Created:

```text
docs/history/workflows/f03-dependency-graph-acquisition-path.md
```

### Decision

Selected route:

```text
reviewed offline-public package archive/cache
```

Allowed alternate route:

```text
public-enabled local terminal/environment using public npm/GitHub sources
```

Local compensation remains allowed only for narrow helpers/mocks and not for foundational runtime/build dependencies.

### Not Run

- no dependency install;
- no archive import;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-02: Git Repository Repair

Date: 2026-07-06

### Purpose

Repair or initialize the local Git repository state so the project can later be prepared for GitHub publication.

### Result

Status: `[x] complete`

Created:

```text
.gitignore
docs/history/workflows/f02-git-repository-repair.md
```

### Action

The invalid `.git` reparse point was moved aside:

```text
.git.broken-reparsepoint-20260706-173419
```

A new repository was initialized:

```text
git init -b main
```

`git status --short` now works.

### Not Run

- no commit;
- no remote add;
- no push to GitHub;
- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no closed corporate source access.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-01: Final Unblock Route

Date: 2026-07-06

### Purpose

Define the final route for dependency graph, build, Storybook verification, consumer connection and GitHub-ready repository state.

### Result

Status: `[x] complete`

Created:

```text
docs/history/workflows/f01-final-unblock-route.md
```

### Decision

Selected staged route:

```text
F-02 -> F-03 -> F-04 -> F-05 -> F-06 -> F-07 -> F-08 -> F-09
```

Repository readiness and runtime readiness are tracked separately.

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-26: Lodash Helper Usage Audit

Date: 2026-07-06

Result:

```text
docs/lodash-helper-audit.md
```

The audit found direct lodash usage in 84 source/script files and split replacement work into slices.

Selected next implementation slice:

```text
LC-07A: omit, pick, identity, isNil, isString
```

Deferred high-risk helpers:

- `isEqual`;
- `merge`;
- `debounce`.

Not performed:

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- component source edits;
- local lodash implementation.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.

## E-31: Complex Runtime Mechanics Tasks

Date: 2026-07-06

Created:

```text
docs/complex-runtime-mechanics-tasks.md
```

Defined future task areas:

- `antd-core` primitives and theme behavior;
- `rc-drawer` and `rc-overflow`;
- `@dnd-kit/*` drag/sort interactions;
- `@tanstack/react-table` tree model;
- `@tanstack/react-virtual` virtualized search lists;
- `@tanstack/react-query` service query cache flows;
- high-risk lodash helpers: `isEqual`, `merge`, `debounce`;
- build-time `kebabCase` generation helper.

Not performed:

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source implementation for complex mechanics;
- access to closed corporate sources.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
```

## E-30: Storybook Diagnostic After Lodash Compensation

Date: 2026-07-06

Recorded in:

```text
docs/history/workflows/e30-storybook-after-lodash-diagnostics.md
```

Diagnostic command:

```text
corepack yarn storybook
```

Result:

```text
'storybook' is not recognized as an internal or external command,
operable program or batch file.
```

Current blocker:

```text
app/node_modules is absent, so app/node_modules/.bin/storybook is absent.
```

Not performed:

- dependency install;
- build;
- Docker build;
- package publication;
- component source edits;
- access to closed corporate sources.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-29: LC-07C Lodash Object Filtering Helper Replacement

Date: 2026-07-06

Updated:

```text
app/packages/lodash/
docs/lodash-lc07c-helper-replacement.md
```

Covered helpers:

```text
pickBy, omitBy, isEmpty, uniqBy
```

Verification:

```text
LC-07C helper check passed
```

Not performed:

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- component source edits;
- access to closed corporate sources.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-28: LC-07B Lodash Collection Helper Replacement

Date: 2026-07-06

Updated:

```text
app/packages/lodash/
docs/lodash-lc07b-helper-replacement.md
```

Covered helpers:

```text
chunk, uniq, groupBy, mapValues
```

Verification:

```text
LC-07B helper check passed
```

Not performed:

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- component source edits;
- access to closed corporate sources.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-27: LC-07A Lodash Object Helper Replacement

Date: 2026-07-06

Created:

```text
app/packages/lodash/
app/packages/types-lodash/
docs/lodash-lc07a-helper-replacement.md
```

Covered helpers:

```text
omit, pick, identity, isNil, isString
```

Verification:

```text
LC-07A helper check passed
```

Not performed:

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- component source edits;
- access to closed corporate sources.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-19: Offline-Public Dependency Package Manifest

Date: 2026-07-06

### Purpose

Build a direct dependency manifest from local package metadata and `yarn.lock`.

### Result

Status: `[x] complete as manifest step`

Created:

```text
docs/offline-public-dependency-package-manifest.md
```

### Facts

```text
Package files scanned: 45
Workspace package files: 44
Unique direct dependencies: 118
Local workspace/local compensation dependencies: 32
External public/offline-public candidates: 86
yarn.lock resolved entries: 1593
yarn.lock resolved domain: packages.samoletgroup.ru only
```

### Decision

The current lockfile is useful as version evidence, but not as an allowed source because its tarball URLs point to a closed corporate registry.

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no closed corporate source access.

### Next Step

```text
E-20: choose the restore execution route from the E-19 manifest.
```

## E-20: Restore Execution Route Decision

Date: 2026-07-06

### Purpose

Choose the restore execution route after the E-19 manifest.

### Result

Status: `[x] complete as route decision step`

Created:

```text
docs/restore-execution-route-decision.md
```

### Decision

Selected primary route:

```text
Prepare an offline-public package archive/cache from the E-19 manifest, with provenance, then import it into the project only after review.
```

Kept as secondary route:

```text
Public-enabled install in a separate allowed environment using the E-17 runbook.
```

Kept as fallback route:

```text
Targeted local compensation only for narrow known mechanics.
```

Rejected:

- current-shell public install retry without environment change;
- fake foundational stubs;
- closed corporate registry/GitLab/Nexus/Figma/CI artifacts;
- unverified `node_modules` copy.

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no closed corporate source access.

### Next Step

```text
E-21: prepare offline-public package acquisition plan from the E-19 manifest.
```

## E-21: Offline-Public Package Acquisition Plan

Date: 2026-07-06

### Purpose

Prepare a concrete acquisition plan for the selected offline-public route.

### Result

Status: `[x] complete as acquisition planning step`

Created:

```text
docs/offline-public-package-acquisition-plan.md
```

### Package Lanes

- Lane 1: Build Tooling Minimum.
- Lane 2: Storybook And Vite Runtime.
- Lane 3: Foundational React Runtime.
- Lane 4: Type Packages Needed For Build.
- Lane 5: Complex UI Mechanics.
- Lane 6: Runtime Utilities And Service Support.
- Lane 7: Dev/Test/Release Tooling.

### Decision

Build/Storybook/React foundation packages must be acquired through public/offline-public package sources, not fake-stubbed.

Local compensation remains allowed only for narrow known mechanics, service mocks or helper-level replacements.

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no closed corporate source access.

### Next Step

```text
E-22: prepare offline-public archive manifest template and import staging runbook.
```

## E-22: Offline-Public Archive Manifest Template And Import Staging Runbook

Date: 2026-07-06

### Purpose

Prepare the archive manifest template and staging runbook for future offline-public package archive validation.

### Result

Status: `[x] complete as archive/import preparation step`

Created:

```text
docs/offline-public-archive-manifest-template.md
docs/offline-public-import-staging-runbook.md
```

### Covered

- manifest schema;
- allowed and forbidden source types;
- source provenance requirements;
- checksum requirements;
- staging folder;
- protected files;
- validation report requirement;
- stop conditions before import.

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no archive import;
- no closed corporate source access.

### Next Step

```text
E-23: wait for or prepare a reviewed offline-public archive, then validate it in staging.
```

## E-23: Offline-Public Archive Staging Validation

Date: 2026-07-06

### Purpose

Validate a reviewed offline-public archive in staging before any dependency import/install.

### Result

Status: `[!] blocked`

Created:

```text
docs/offline-public-archive-validation-report.md
```

Created staging folders:

```text
tmp/offline-public-archive-staging/
tmp/offline-public-archive-staging/inbox/
tmp/offline-public-archive-staging/extracted/
```

### Blocker

The staging inbox is empty. Required inputs are missing:

```text
offline-public-package-archive.*
offline-public-package-archive-manifest.json
checksums.sha256
```

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no archive import;
- no closed corporate source access.

### Next Step

```text
E-24: provide or create a reviewed offline-public archive, then rerun staging validation.
```

## E-24: Offline-Public Archive Preparation Request

Date: 2026-07-06

### Purpose

Provide or create a reviewed offline-public archive, then rerun staging validation.

### Result

Status: `[!] blocked`

Created:

```text
docs/offline-public-archive-preparation-request.md
```

### Blocker

The current environment cannot create the archive because public network access is restricted, and no archive input was provided.

Missing inbox files:

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive.*
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-manifest.json
tmp/offline-public-archive-staging/inbox/checksums.sha256
```

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no archive import;
- no closed corporate source access.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-25: Local Compensation Lane Decision

Date: 2026-07-06

### Purpose

Choose the next narrow local compensation lane while the offline-public archive is unavailable.

### Result

Status: `[x] complete as lane decision step`

Created:

```text
docs/local-compensation-lane-decision.md
```

### Selected Lane

```text
LC-07: focused lodash helper audit
```

This is an audit lane, not an implementation lane.

### Static Signal

Detected lodash helper usage includes:

```text
omit, groupBy, pick, isEqual, debounce, identity, isEmpty, mapValues,
pickBy, uniqBy, chunk, isNil, kebabCase, merge, omitBy, uniq, isString
```

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no lodash replacement;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no closed corporate source access.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-18: Public-Only Dependency Restore Attempt

Date: 2026-07-06

### Purpose

Execute the public-only dependency restore attempt from the E-17 runbook or record why it cannot be executed.

### Result

Status: `[!] blocked`

The restore command was not executed in the current Codex shell.

Created:

```text
docs/history/workflows/e18-public-restore-attempt.md
docs/offline-public-package-cache-checklist.md
```

### Reason

- current execution environment has restricted network access;
- previous controlled public npm attempt failed with `AggregateError [EACCES]`;
- E-17 says not to repeat the current-shell public npm attempt without environment change.

### Local State

```text
Node: v22.19.0
npm: 10.9.3
Corepack: 0.34.0
plain yarn: not found
app/node_modules: absent
app/packages/tend-ui/dist: absent
app/yarn-error.log: absent
```

### Not Run

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no closed corporate source access.

### Next Step

```text
E-19: build offline-public dependency package manifest from local package files and yarn.lock.
```

## F-05: Package Build Verification

Date: 2026-07-14

### Purpose

Run package build verification after `F-04G` restored `app/node_modules`.

### Result

Status: `[!] partially blocked`

Created:

```text
docs/history/workflows/f05-package-build-verification.md
```

Commands checked:

```text
corepack yarn build:tokens
corepack yarn build:theme
corepack yarn build:icons
corepack yarn build:primitives
corepack yarn build:main
```

Outcome:

```text
build:tokens passed
build:theme blocked
build:icons blocked
build:primitives blocked
build:main blocked
```

`app/packages/tend-ui-tokens/dist` was created. Other checked `dist` outputs remain absent.

### Main Blocker

Build now reaches TypeScript/Rollup territory, but stops on local build graph blockers:

```text
@tend-ui-hooks/* aliases
@tend-ui-styling/* aliases
@tend-ui-icons/* aliases
lodash/debounce
lodash/merge
lodash/isEqual
small TypeScript strictness errors
```

### Not Run

- no dependency install;
- no Storybook launch;
- no Docker build;
- no package publication;
- no consumer project connection;
- no access to closed corporate sources.

### Next Step

```text
F-05A: fix local build graph blockers for hooks, styling, icons and lodash subpath imports.
```

## F-05A: Local Build Graph Fixes

Date: 2026-07-14

### Purpose

Resolve the local build graph blockers found in `F-05` and rerun main/key package builds.

### Result

Status: `[x] complete`

Created:

```text
docs/history/workflows/f05a-local-build-graph-fixes.md
```

Implemented local fixes:

```text
lodash/debounce
lodash/merge
lodash/isEqual
pick/omit type fallback
StepsHistoryApproval ErrorStepIcon portable type wrapper
```

Builds passed:

```text
corepack yarn build:utils
corepack yarn build:types
corepack yarn build:hooks
corepack yarn build:styling
corepack yarn build:icons
corepack yarn build:theme
corepack yarn build:primitives
corepack yarn build:main
```

Confirmed:

```text
app/packages/tend-ui/dist exists
app/packages/tend-ui-theme/dist exists
app/packages/tend-ui-icons/dist exists
app/packages/tend-ui-primitives/dist exists
app/packages/tend-ui-tokens/dist exists
```

### Not Run

- no Storybook launch;
- no Docker build;
- no package publication;
- no consumer project connection;
- no access to closed corporate sources.

### Next Step

```text
F-06: run Storybook verification.

## F-06: Storybook Verification

`F-06` was run after `F-05A` restored the main/key package build graph.

Actions performed:

- added diagnostic Storybook config in `app/storybook-f06/`;
- ran preview-only Storybook smoke-test;
- ran full Storybook startup smoke-test;
- started preview-only Storybook server locally;
- checked `http://localhost:3000/index.json`, `/iframe.html` and `/project.json`;
- saved index check evidence to `tmp/storybook-f06-index-check.json`;
- created `docs/history/workflows/f06-storybook-verification.md`.

Result:

- Storybook binary exists;
- preview-only Storybook works;
- Storybook index contains `938` stories and `215` docs entries;
- first story iframe returns `200`;
- full Storybook manager UI remains blocked by manager bundle resolution under `app/node_modules/.cache/storybook/.../sb-manager/*`.

No dependency installation, package publication, Docker build, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

Next group:

```text
F-06A: repair full Storybook manager runtime or define an accepted preview-only verification route.
```

## F-06A: Storybook Manager Runtime

`F-06A` was run after `F-06` left the full Storybook manager UI as the remaining runtime concern.

Actions performed:

- added `tmp/start-storybook-f06-full.cmd`;
- started full Storybook through `app/storybook-f06`;
- checked `http://localhost:3000/`;
- checked `index.json`, `iframe.html` and `project.json`;
- saved detailed evidence to `tmp/storybook-f06a-manager-check.json`;
- created `docs/history/workflows/f06a-storybook-manager-runtime.md`.

Result:

- full Storybook manager is running locally on `http://localhost:3000/`;
- root manager URL returns `200`;
- `index.json`, `iframe.html` and `project.json` return `200`;
- Storybook index contains `938` stories and `215` docs entries;
- first story iframe returns `200`.

No dependency installation, package publication, Docker build, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

Next group:

```text
F-07: run isolated React sandbox consumer smoke test.
```

## F-07: Isolated React Consumer Smoke Test

`F-07` was run after Storybook manager runtime was verified in `F-06A`.

Actions performed:

- created `tmp/f07-consumer-smoke`;
- built additional transitive internal packages: factories, locale, api, grid and typography;
- created a Vite consumer sandbox importing `@10d/tend-ui/theme` and `@10d/tend-ui/primitives/Button`;
- added diagnostic dist aliases and ESM shims for browser bundling;
- ran Vite production build;
- started sandbox dev server on `http://127.0.0.1:3100/`;
- ran built DOM verification in jsdom;
- created `docs/history/workflows/f07-isolated-react-consumer-smoke.md`.

Result:

- Vite build passed;
- dev server root returned `200`;
- built DOM verification passed;
- rendered DOM contains one Button and text `F-07 Smoke Button`.

Important limitation:

- this is a verified isolated sandbox route, not yet a clean package publication/consumption route.

No dependency installation, package publication, Docker build, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

Next group:

```text
F-08: prepare GitHub publication and verified consumer connection plan.
```

## F-08: GitHub Publication And Consumer Connection Plan

`F-08` was run after `F-07` verified isolated consumer rendering.

Actions performed:

- created `docs/history/workflows/f08-github-publication-and-connection-plan.md`;
- created tracked diagnostic consumer example in `examples/consumer-smoke`;
- updated root `README.md` with current F-branch status, Storybook command and consumer smoke command;
- updated publication boundary for GitHub: source/docs/examples are publishable, generated dependency/build artifacts are not;
- recorded clean package-consumption blockers for `@10d/tend-ui` root entrypoints and subpath exports.
- verified the tracked consumer example with `corepack yarn vite build --config ../examples/consumer-smoke/vite.config.mjs`.

Result:

- GitHub repository publication plan is ready;
- tracked consumer example build passes with `704` modules transformed and one chunk-size warning;
- repository can be prepared for a normal source/docs/examples push after user provides a GitHub remote;
- clean npm/GitHub Packages consumption is not marked ready;
- next technical group is `F-09`: clean package entrypoints and exports for consumer consumption.

No dependency installation, package publication, Docker build, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

Next group:

```text
F-09: clean package entrypoints and exports for consumer consumption.
```

## F-09: Clean Package Entrypoints And Exports

`F-09` was run after `F-08` documented that clean package consumption was still blocked by root entrypoints and production exports.

Actions performed:

- added root `app/packages/tend-ui/src/index.ts`;
- added `app/packages/tend-ui/src/tokens/index.ts`;
- added `app/packages/tend-ui/scripts/prepare-package-json.js`;
- changed the `@10d/tend-ui` copy script to generate production `dist/package.json`;
- added type-only runtime stubs during package metadata preparation;
- added ESM entries and package exports for local `classnames`;
- added ESM entries and package exports for local `lodash` helper subpaths;
- created `docs/history/workflows/f09-clean-package-entrypoints.md`;
- created `examples/consumer-clean-package`.

Verification performed:

- `corepack yarn build:main` with local build-runner shim passed;
- `app/packages/tend-ui/dist/package.json` contains root `.` export and `40` export entries;
- root `main`, `module` and `types` built targets exist;
- `corepack yarn vite build --config ../examples/consumer-clean-package/vite.config.mjs` passed;
- clean-package consumer build transformed `705` modules;
- built DOM verification found one button and text `F-09 Clean Package Button`.

Result:

- clean local package consumption is verified;
- registry/GitHub Packages publication is not performed;
- next technical group is `F-10`: package artifact dry-run and publication readiness check.

No dependency installation, package publication, Docker build, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

Next group:

```text
F-10: package artifact dry-run and publication readiness check.
```

## F-10: Package Artifact Dry-Run And Publication Readiness

`F-10` was run after `F-09` verified clean local consumption through built package exports.

Actions performed:

- executed local `npm.cmd pack --dry-run --json` from `app/packages/tend-ui/dist`;
- checked package contents, root entries, dependency metadata and artifact hygiene;
- executed `npm.cmd pack --ignore-scripts --dry-run --json` for all available declared internal package artifacts;
- audited whether the missing internal artifact is used by built runtime code;
- created `docs/history/workflows/f10-package-artifact-dry-run.md`;
- synchronized workflow, quality, connection and publication documents.

Verification result:

- `@10d/tend-ui@4.82.0` dry-run passed;
- candidate artifact: `10d-tend-ui-4.82.0.tgz`;
- packed size: `383358` bytes; unpacked size: `2014122` bytes;
- file count: `5507`;
- root ESM, CommonJS and type entries are present;
- no `src`, `node_modules`, tests, stories or source maps are included;
- dry-run retained no tarball;
- `13/14` internal dependency artifacts passed;
- `@10d/tend-ui-logos@1.17.3` is blocked because `dist/package.json` does not exist;
- the built Layout Apps widget imports `@10d/tend-ui-logos` at runtime.

Result:

- main package artifact structure is ready;
- complete publication readiness remains blocked;
- `F-10` status is `[!]` with the exact remaining internal package blocker recorded;
- next group is `F-11`.

No dependency installation, package publication, Docker action, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

Next group:

```text
F-11: build and package @10d/tend-ui-logos, then repeat the internal artifact-chain dry-run.
```

## F-11: Tend UI Logos Artifact And Internal Package Chain

`F-11` was run after `F-10` identified `@10d/tend-ui-logos` as the only missing declared internal package artifact.

Actions performed:

- ran `corepack yarn build:logos` through the local build-runner shim;
- replaced the logos package copy command with `scripts/prepare-package-json.js`;
- generated and validated production exports for `.`, `./utils` and `./SMaterials`;
- repeated dry-run for the main package and all fourteen declared internal package dependencies;
- added a packaged `SMaterials` import to `examples/consumer-clean-package`;
- ran the clean-package Vite production build and built DOM verification;
- removed generated consumer `dist` after verification;
- created `docs/history/workflows/f11-tend-ui-logos-artifact.md` and synchronized workflow documents.

Verification result:

- `@10d/tend-ui-logos@1.17.3` build passed;
- logos artifact contains `661` files;
- packed size: `76067` bytes; unpacked size: `498384` bytes;
- logos root ESM, CommonJS and type entries exist;
- all three production exports resolve to existing targets;
- main plus internal dependency artifact dry-runs: `15/15 PASS`;
- clean-package Vite build passed with `708` transformed modules;
- built DOM contains one Button, one packaged logo wrapper and one SVG.

Result:

- `F-11` status is `[x]`;
- the internal artifact-chain blocker is closed;
- registry publication was not performed;
- next group is `F-12`.

No dependency installation, network request, package publication, Docker action, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

Next group:

```text
F-12: sanitize public package metadata and define the internal package publication order.
```

## F-12: Public Package Metadata And Release Order

`F-12` was run after `F-11` verified the complete fifteen-package artifact chain.

Actions performed:

- added `app/scripts/prepare-public-release.js`;
- added root command `release:prepare-public`;
- removed closed corporate repository/contact metadata from active package manifests;
- added public access metadata to the fifteen-package release closure;
- removed build/test/release scripts and tooling fields from built package manifests;
- changed `app/.yarnrc` from the closed proxy to public npm;
- mechanically replaced the closed proxy host in `app/yarn.lock`;
- computed a seven-level topological release order;
- repeated local package dry-run for all fifteen artifacts;
- created `docs/history/workflows/f12-public-metadata-and-release-order.md` and synchronized workflow documents.

Verification result:

- metadata check mode reports `Files changed: 0` after preparation;
- source manifests with public access: `15/15`;
- built manifests with public access: `15/15`;
- corporate URL/email fields in active package metadata: `0`;
- closed registry entries in `.yarnrc` and `yarn.lock`: `0`;
- public npm registry entries in lockfile: `1593`;
- dependency closure: `15` packages, `7` release levels, no cycle;
- post-cleanup package dry-run: `15/15 PASS`.

Result:

- `F-12` status is `[x]`;
- public metadata and release-order preparation are complete;
- no registry authentication or publication was performed;
- next group is `F-13`.

No dependency installation, network request, package publication, Docker action, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

Next group:

```text
F-13: create local package tarballs in release order and verify an isolated consumer installation without a registry.
```

## F-13 Local Tarball Install Rehearsal

Date: 2026-07-15

Actions:

- added `app/scripts/rehearse-local-tarball-install.js` and root script `release:rehearse-tarballs`;
- added tracked no-alias consumer template in `examples/consumer-tarball/`;
- verified archive v2 checksum and all `1560` archived public package checksums;
- converted archive entries to Yarn v1 mirror names, including scoped packages and npm aliases;
- packed fifteen Tend UI artifacts in the seven-level release order;
- packed five local helper compensations separately: `@types/lodash`, `@types/uuid`, `classnames`, `lodash`, `uuid`;
- installed a clean consumer with Yarn `--offline`;
- built the consumer with Vite and ran the DOM smoke check.

Verification result:

- release tarballs: `15/15`;
- compensation tarballs: `5/5`;
- offline-public mirror entries: `1560`;
- install: passed;
- Vite build: passed, `708` modules;
- DOM smoke: passed for `TendUI`, `Button`, `SMaterials`;
- source aliases: none;
- registry publication: not performed;
- closed corporate source access: not performed.

Result:

- `F-13` status is `[x]`;
- exact local tarball consumption is verified;
- next group is `F-14`.

Next group:

```text
F-14: resolve package-consumer warnings and define the distributable boundary for local compensation packages before registry publication.
```

## F-14 Consumer Boundary And Warning Cleanup

Date: 2026-07-15

Actions:

- added machine-readable distribution policy `app/release-boundary.json`;
- made public release preparation verify the exact fifteen-package closure;
- kept all five local compensation workspaces private and without `publishConfig`;
- moved `@types/lodash` and `@types/uuid` out of runtime dependencies;
- added the required `react-is` runtime contract to styled-components consumers;
- reduced the offline consumer compensation layer to `classnames`, `lodash` and `uuid`;
- hardened the rehearsal against duplicate tarball cache destinations and unexpected peer warnings;
- repeated the complete registry-free install, build and DOM smoke.

Verification result:

- release packages: `15`;
- offline runtime compensation packages: `3`;
- build-only type compensation packages in consumer layer: `0`;
- offline mirror entries: `1560`;
- actionable consumer warnings: `0`;
- Vite build: passed, `709` modules;
- DOM smoke: passed for `TendUI` provider and `Button`;
- registry/network/publication: not performed.

Result:

- `F-14` status is `[x]`;
- the public and offline-only package boundaries are explicit and enforced;
- next group is `F-15`.

Next group:

```text
F-15: create a registry-agnostic release bundle and publication manifest for the validated fifteen-package wave, without uploading it.
```

## F-15 Registry-Agnostic Release Bundle

Date: 2026-07-15

Actions:

- added `app/scripts/create-release-bundle.js` and `release:create-bundle`;
- added ignored generated boundary `release/`;
- checked public release metadata before packing;
- packed all fifteen public artifacts in seven dependency levels;
- generated `publication-manifest.json`, `PUBLICATION.md`, `README.md` and `SHA256SUMS`;
- created an outer `.tgz` release archive and checksum sidecar;
- independently compared manifest names, sizes and hashes to generated files;
- checked that no offline-only compensation artifact entered the bundle.

Verification result:

- release packages: `15`;
- release levels: `7`;
- manifest errors: `0`;
- forbidden compensation artifacts: `0`;
- archive tarballs: `15`;
- archive checksum: matched;
- publication performed: no;
- registry contacted: no.

Result:

- `F-15` status is `[x]`;
- a registry-neutral release payload is reproducible locally;
- next group is `F-16`.

Next group:

```text
F-16: choose the public package registry and package-scope strategy, then prepare credential-free publication configuration and verification guidance without uploading packages.
```

## F-16 Public Registry And Scope Strategy

Date: 2026-07-15

Actions:

- inspected the current Git remote, Yarn/npm config, fifteen release package names and publish metadata;
- reviewed official npm and GitHub Packages scope/authentication requirements;
- selected npmjs for public package distribution and GitHub for source/release hosting;
- added `app/publication-target.json` with `publicationAllowed=false`;
- added inactive credential-free npmjs and GitHub Packages templates;
- added the complete fifteen-package atomic scope migration plan;
- added `release:validate-target` and its readiness gate;
- ran the policy validator without authentication or network publication.

Verification result:

- selected registry: npmjs;
- public packages covered: `15`;
- current scope: `@10d`;
- scope ownership: unverified;
- Git origin: not configured;
- repository credentials: none;
- publication allowed: no;
- policy validation: passed;
- readiness validation: blocked by design.

Result:

- `F-16` status is `[x]` as a decision/configuration group;
- real package publication remains blocked by external identity inputs;
- next group is `F-17`.

Next group:

```text
F-17: prepare a GitHub-ready source snapshot and repository handoff through local secret, tracked/ignored-boundary and initial-commit audits, without adding a remote or pushing.
```

## F-17 GitHub Source Snapshot Audit

Date: 2026-07-15

Actions:

- added `.gitattributes` and expanded the local/generated/credential ignore boundary;
- excluded raw `source-docs` from the public candidate set without deleting it;
- added `github-snapshot-policy.json`;
- added `release:audit-github-snapshot` and the machine-readable audit report;
- added `docs/github-initial-commit-plan.md` with explicit future staging paths;
- scanned candidate files for size, high-confidence secrets, local-only leaks and corporate references;
- verified that the Git index remained empty.

Verification result:

- candidate files: `5929`;
- candidate bytes: `24671008`;
- oversized files: `0`;
- high-confidence secrets: `0`;
- local-only leaks: `0`;
- unexpected roots: `0`;
- staged files: `0`;
- corporate-reference files: `91`;
- active source/config files among them: `22`;
- root license: missing;
- Git origin: not configured.

Result:

- `F-17` status is `[!]` after a completed diagnostic audit;
- no Git mutation or publication action occurred;
- next group is `F-18`.

Next group:

```text
F-18: externalize or replace closed corporate endpoints in active source/config files and define the redaction/allowlist policy for historical references, while keeping the license decision as explicit owner/legal input.
```

## F-18 Public Source Endpoint Sanitization

Date: 2026-07-15

Actions:

- replaced closed runtime defaults with explicit component props, `configureSamoletHeader`, same-origin behavior or optional environment variables;
- removed closed-network targets from executable Storybook stories, tests, snapshots and raw examples;
- added `docs/public-runtime-configuration.md`;
- added exact-file `github-internal-reference-allowlist.json` and made new, active and stale references blocking findings;
- extended the local lodash replacement for all Storybook builder candidate subpaths after a fresh optimization pass exposed missing exports;
- rebuilt the changed package chain and restarted the full diagnostic Storybook manager;
- repeated the GitHub source snapshot audit.

Verification result:

- active source/config references: `0`;
- reviewed inert historical files: `49`;
- unreviewed references: `0`;
- stale allowlist entries: `0`;
- high-confidence secrets: `0`;
- oversized files: `0`;
- local-only leaks: `0`;
- full package builds passed for utils, typography, fonts, favicons, form, upload, main and header;
- notifications TypeScript and search-assistant `build:js` passed;
- Storybook manager/index/first iframe return `200`;
- Storybook index remains `938` stories plus `215` docs entries;
- remaining snapshot blocker: `root-license-missing` only.

Result:

- `F-18` status is `[x]`;
- no dependency installation, corporate access, Git mutation or publication occurred;
- the F-15 release bundle is stale relative to F-18 source/API changes;
- next group is `F-19`.

Next group:

```text
F-19: rebuild the fifteen-package release chain after F-18, recreate the registry-agnostic bundle and repeat isolated tarball-consumer verification without publication.
```

## F-19 Release Chain Refresh

Date: 2026-07-15

Actions:

- rebuilt all fifteen public packages in seven dependency levels;
- reapplied public metadata sanitization to generated `dist` manifests and confirmed zero pending changes;
- repacked all release tarballs and three offline-only runtime compensation tarballs;
- repeated isolated Yarn `--offline` install, Vite production build and provider/Button DOM smoke;
- recreated the registry-agnostic fifteen-package bundle and checksum sidecar;
- rechecked Storybook, GitHub source findings and Git staging state.

Verification result:

- package builds: `15/15` passed;
- isolated install: passed offline;
- Vite build: `709` modules;
- DOM smoke: passed;
- actionable consumer warnings: `0`;
- bundle tarballs: `15` in `7` levels;
- archive SHA-256: `a878f3dfc5ca0d26e09a02d72fdd3ee331596e6679be6e9dc8faeb5d2183374c`;
- Storybook: root `200`, `938` stories and `215` docs;
- publication/registry contact: none;
- staged files: `0`.

Result:

- `F-19` status is `[x]`;
- stale-artifact and refreshed-consumer blockers are closed;
- public release remains blocked only by owner/license and package-scope decisions;
- next group is `F-20`.

Next group:

```text
F-20: prepare a reproducible containerized Storybook route and verify it locally when Docker is available, without corporate services or package publication.
```

## F-20 Containerized Storybook

Date: 2026-07-15

Actions:

- created a multi-stage static Storybook Dockerfile;
- created Compose routing on host port `3001` and nginx serving on port `8080`;
- added `/healthz`, source-route fallback and a runtime Storybook index checker;
- added `.dockerignore` and expanded the GitHub source candidate boundary;
- added a static container policy validator;
- attempted local static Storybook builds to distinguish Windows path behavior from the container route.

Verification result:

- container configuration validation: passed;
- closed corporate endpoint findings: `0`;
- public dependency registry: `https://registry.npmjs.org`;
- host volume dependency: none;
- local Storybook: still `938` stories and `215` docs;
- local static build: blocked by the known Windows/OneDrive esbuild root-read boundary;
- Docker CLI: unavailable (`ENOENT`);
- image build/start/runtime check: not run;
- package publication and Git mutation: none.

Result:

- `F-20` is diagnostically complete with status `[!]`;
- the missing Dockerfile/Compose blocker is closed;
- `DS-05.5` remains blocked only until a compatible Docker runtime is available;
- next group is `F-21`.

Next group:

```text
F-21: reconcile the main workflow after the F-branch, close superseded historical blockers and separate the remaining Docker, license/scope and S-Tracker environment gates.
```

## F-21 Workflow Reconciliation

Date: 2026-07-15

Actions:

- compared the main DS checklist, P-order and F-branch against live evidence;
- rechecked S-Tracker package and entrypoint state;
- created `docs/current-project-status.md` as the authoritative current snapshot;
- closed superseded P-06, P-07, P-09 and DS-10.1 statuses;
- kept P-05 blocked only for Docker runtime and P-10 partial for S-Tracker integration;
- separated local correctness from LICENSE, npm scope, Git origin and product adapter gates.

Result:

- `F-21` status is `[x]`;
- minimum local quality gate is passed;
- historical diagnostics remain available but no longer define current state;
- no install, build, publication, Git mutation or S-Tracker source change occurred;
- next group is `F-22`.

Next group:

```text
F-22: prepare a minimal React adapter boundary for S-Tracker and connect a Tend UI Button through the verified local tarball route without a registry.
```

## F-22 S-Tracker React Adapter

Date: 2026-07-22

Actions:

- copied the complete local consumer payload into `S-Tracker/vendor/tend-ui/`;
- added React 17 and a narrow `src/integrations/tend-ui/` mount boundary;
- replaced only the existing `Создать задачу` HTML implementation with Tend UI `Button`;
- preserved the vanilla application lifecycle, selector contract and no-op click behavior;
- added a reproducible `npm run verify:tend-ui` source/package/bundle check;
- synchronized S-Tracker structure and component-code documentation;
- performed build, browser runtime and advisory diagnostics.

Verification result:

- local tarballs: `18/18`;
- local `@10d/*` packages: `15/15`;
- clean reinstall: `npm ci --offline` passed after stopping Vite and preparing the public cache;
- Vite build: passed, `718` transformed modules;
- adapter verification: passed;
- browser: one visible Tend UI button, zero console errors;
- package sources: local tarballs plus public npmjs only;
- corporate source access: none;
- npm advisories: classified as version-based signals on narrow local compensation implementations; no automatic fix applied.

Result:

- `F-22` is `[x]`;
- `P-10` is `[x]`;
- S-Tracker product integration is no longer blocked;
- bundle/advisory hardening remains a follow-up;
- next group is `F-23`.

Next group:

```text
F-23: harden the S-Tracker consumer boundary by formalizing local-compensation advisory checks, evaluating bundle splitting and defining the next safe component migration.
```

## F-23 S-Tracker Consumer Boundary Hardening

Date: 2026-07-22

Actions:

- added a machine-readable policy for the three local compensation tarballs;
- added checksum, local-source, private-metadata, API allowlist and security-behavior tests;
- added a reproducible bundle boundary and byte-limit gate;
- evaluated code splitting against the required direct `file://` artifact and retained one self-contained chunk;
- selected global task search as the next isolated Tend UI `Input` migration.

Verification result:

- `npm run verify:tend-ui:all`: passed;
- Vite build: `718` transformed modules;
- compensation checks: `3/3` passed;
- bundle: `722,783` bytes raw, `222,473` bytes gzip;
- browser regression: one visible Tend UI Button, native search retained, zero console errors;
- corporate source access: none.

Result:

- `F-23` is `[x]`;
- the F-22 consumer is guarded against local compensation and bundle drift;
- the next group is `F-24`.

Next group:

```text
F-24: migrate the S-Tracker global task search field to Tend UI Input through a second isolated React adapter while preserving native search behavior and direct-file compatibility.
```

## F-24 S-Tracker Global Search Input

Date: 2026-07-22

Actions:

- added a second isolated Tend UI mount for global task search;
- moved common provider/theme initialization into a shared runtime;
- preserved the native input id and vanilla filter-state ownership;
- made interface initialization robust before or after `DOMContentLoaded`;
- extended static and production bundle checks for both primitives;
- synchronized S-Tracker implementation documentation and code map.

Verification result:

- `npm run verify:tend-ui:all`: passed;
- Vite build: `721` transformed modules;
- card search: `20 -> 4 -> 20`;
- table search: `20 -> 4 -> 20`;
- desktop geometry: `430 x 36`;
- mobile geometry: no horizontal document overflow;
- bundle: `723,251` bytes raw, `223,055` bytes gzip;
- browser console errors: `0`;
- corporate source access: none.

Result:

- `F-24` is `[x]`;
- S-Tracker has two verified primitives behind one shared boundary;
- the next group is `F-25`.

Next group:

```text
F-25: migrate the functional S-Tracker print toolbar action to Tend UI Button while preserving its existing toast behavior, icon-only layout and consumer gates.
```

## F-25 S-Tracker Print Toolbar Action

Date: 2026-07-22

Actions:

- replaced the raw print button/SVG with an isolated Tend UI Button and packaged Print icon;
- preserved `#js-print-btn` so the existing vanilla toast handler remains authoritative;
- moved the React mount node, rather than React-owned children, for custom-group navigation;
- extended static and production bundle gates for the print control;
- synchronized S-Tracker integration documentation and the DS workflow.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `723` transformed modules;
- card, table and custom-group views: passed;
- geometry: `40 x 40`;
- toast: `Подготовка к печати...`;
- bundle: `724,984` bytes raw, `223,608` bytes gzip;
- corporate source access: none.

Result:

- `F-25` is `[x]`;
- S-Tracker has three verified Tend UI controls behind one shared runtime;
- the next group is `F-26`.

Next group:

```text
F-26: migrate the S-Tracker Filters toolbar trigger to Tend UI Button while preserving drawer opening, active-count/reset indication and vanilla filter ownership.
```

## F-26 S-Tracker Toolbar Filter Trigger

Date: 2026-07-22

Actions:

- replaced the main raw toolbar filter button with an isolated Tend UI Button and packaged FilterAlt/Close icons;
- preserved all vanilla open, count, active-class and independent-reset selectors;
- kept the system-overlay filter trigger unchanged on the same drawer contract;
- fixed the toolbar control at `120 x 36` to avoid state-driven layout shift;
- extended static and production bundle gates;
- synchronized S-Tracker and DS workflow documentation.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed before final documentation sync;
- Vite build: `725` transformed modules;
- drawer/overlay open: passed;
- active filter/count/reset: `0 -> 1 -> 0` passed;
- card, table and custom-group routes: passed;
- bundle: `726,560` bytes raw, `224,017` bytes gzip;
- corporate source access: none.

Result:

- `F-26` is `[x]`;
- S-Tracker has four verified Tend UI controls behind one shared runtime;
- the next group is `F-27`.

Next group:

```text
F-27: migrate the S-Tracker column-settings toolbar action to Tend UI Button/Icon while preserving drawer behavior and custom-view placement.
```

## F-27 S-Tracker Column Settings Action

Date: 2026-07-22

Actions:

- replaced the main raw settings button with an isolated Tend UI Button and packaged Settings icon;
- preserved id, drawer selector, card/table visibility and vanilla column-state ownership;
- moved the complete React mount in custom navigation;
- found and fixed the shared return anchor from React-owned create-button child to its direct mount node;
- extended static and production bundle gates;
- synchronized S-Tracker and DS workflow documentation.

Verification result:

- final `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `727` transformed modules;
- card/table visibility and `40 x 40` geometry: passed;
- columns drawer/overlay open: passed;
- custom header transfer and toolbar return: passed;
- bundle: `729,759` bytes raw, `225,170` bytes gzip;
- corporate source access: none.

Result:

- `F-27` is `[x]`;
- S-Tracker has five verified Tend UI controls behind one shared runtime;
- the custom-view mount return route is corrected;
- the next group is `F-28`.

Next group:

```text
F-28: migrate the S-Tracker download toolbar action to Tend UI Button/Icon while preserving table visibility, custom-view placement and the current no-op contract.
```

## F-28 S-Tracker Download Toolbar Action

Date: 2026-07-22

Actions:

- replaced the raw download button with an isolated Tend UI Button and packaged Download icon;
- preserved the stable id, card/table visibility and `40 x 40` geometry;
- kept vanilla view switching and custom-view navigation as behavior owners;
- preserved the documented no-op click contract and added static rejection of invented mechanics;
- extended adapter and production bundle gates;
- synchronized S-Tracker and DS workflow documentation.

Verification result:

- final `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `729` transformed modules;
- card/table and custom-group visibility: passed;
- custom header transfer and toolbar return: passed;
- click no-op: URL, drawers, filters and toast unchanged;
- bundle: `731,238` bytes raw, `225,488` bytes gzip;
- corporate source access: none.

Result:

- `F-28` is `[x]`;
- S-Tracker has six verified Tend UI controls behind one shared runtime;
- no speculative download feature was introduced;
- the next group is `F-29`.

Next group:

```text
F-29: migrate the S-Tracker card/table view switcher to a Tend UI segmented control while preserving vanilla view ownership, dependent-action visibility and custom-view movement.
```

## F-29 S-Tracker View Switcher

Date: 2026-07-22

Actions:

- replaced the raw card/table buttons with Tend UI `Segmented`, `CardView` and `TableView`;
- preserved vanilla ownership through request/confirmation custom events;
- preserved dependent columns/download visibility and custom-view movement/return;
- added the missing narrow `@10d/tend-ui/primitives/Segmented` ESM/CJS/types export;
- rebuilt and repacked `@10d/tend-ui@4.82.0` locally;
- refreshed the 15-package registry-neutral release bundle;
- extended static and production bundle gates;
- synchronized S-Tracker and DS workflow documentation.

Verification result:

- final `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `741` transformed modules;
- card/table and custom-group routes: passed;
- accessible radio names and `105 x 40` geometry: passed;
- bundle: `747,476` bytes raw, `230,190` bytes gzip;
- main tarball SHA-256: `c4bf2d67a4dad9bce3cf7fba6b22af6dabe46c20ae94e43e876f2ccf9abc12fa`;
- release bundle SHA-256: `2dbdaf482ccff4494b40a069b2f2b00087cf50651d6d85a440c4c9079f6ebfda`;
- corporate source access: none;
- publication: none.

Result:

- `F-29` is `[x]`;
- S-Tracker has seven verified Tend UI controls behind one shared runtime;
- the release bundle is current after the new public export;
- the next group is `F-30`.

Next group:

```text
F-30: migrate the S-Tracker queue/status selector to Tend UI Tabs while preserving queue counts, task filtering, rerendering and custom-view hiding.
```

## F-30 S-Tracker Queue Tabs

Date: 2026-07-22

Actions:

- replaced six raw queue buttons with Tend UI `Tabs`;
- centralized active queue state and removed direct `.is-active` DOM reads from all consumers;
- preserved vanilla ownership of counts, filtering, pagination and rerendering;
- added and packed the narrow `@10d/tend-ui/primitives/Tabs` export;
- refreshed the main tarball and 15-package release bundle;
- extended static, build, security and browser gates.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `814` transformed modules;
- all six queues and dynamic counts: passed;
- card/table persistence and custom-view hide/return: passed;
- bundle: `809,677` bytes raw, `249,892` bytes gzip;
- corporate source access: none;
- publication: none.

Result:

- `F-30` is `[x]`;
- S-Tracker has eight verified Tend UI controls behind one shared runtime;
- the next group is `F-31`.

Next group:

```text
F-31: migrate S-Tracker pagination to Tend UI Pagination while preserving current page, total-page calculation, task counts and card/table behavior.
```

## F-31 S-Tracker Pagination

Date: 2026-07-23

Actions:

- replaced generated page buttons with Tend UI `Pagination`;
- preserved vanilla page state, validation, task slicing and rerendering;
- added and packed the narrow `@10d/tend-ui/primitives/Pagination` export;
- fixed pagination overlap with the active bulk-action bar;
- introduced an executable F-30-baseline plus bounded F-31 bundle budget;
- refreshed the main tarball and 15-package release bundle.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `906` transformed modules;
- page numbers, arrows, resets and card/table persistence: passed;
- cross-page selection and bulk-action clearance: passed;
- bundle: `913,695` bytes raw, `282,112` bytes gzip;
- corporate source access: none;
- publication: none.

Result:

- `F-31` is `[x]`;
- S-Tracker has nine verified Tend UI controls behind one shared runtime;
- the next group is `F-32`.

Next group:

```text
F-32: migrate S-Tracker task-selection controls to Tend UI Checkbox while preserving row selection, select-all, cross-page state and bulk actions.
```

## F-32 S-Tracker Task Selection

Date: 2026-07-24

Actions:

- replaced card, table and select-all SVG controls with Tend UI `Checkbox` portals;
- preserved vanilla selected IDs, page-visible selection and bulk actions;
- added and packed the narrow `@10d/tend-ui/primitives/Checkbox` export;
- added executable ownership, artifact and bundle gates;
- refreshed the main tarball and 15-package release bundle.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `923` transformed modules;
- single, synchronized, indeterminate, select-all, cross-page and clear scenarios: passed;
- dynamic Checkbox instances: `41/41`; legacy controls: `0`;
- bundle: `928,233` bytes raw, `286,643` bytes gzip;
- corporate source access: none;
- publication: none.

Result:

- `F-32` is `[x]`;
- S-Tracker has ten verified Tend UI integration areas behind one shared runtime;
- the next group is `F-33`.

Next group:

```text
F-33: migrate the S-Tracker bulk-action bar controls to Tend UI Button while preserving queue-dependent visibility, status actions, group movement and selection clearing.
```

## F-33 S-Tracker Bulk Actions

Date: 2026-07-24

Actions:

- replaced seven static bulk-action buttons with Tend UI `Button` controls;
- preserved stable `.js-fab-*` hooks and vanilla ownership of every product action;
- preserved contextual visibility, move/create/remove group and clear-selection behavior;
- added executable source, ownership and bundle gates;
- reused existing Button and icon exports, so package tarballs and the release bundle remained unchanged.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `930` transformed modules;
- browser scenarios for status no-op, move, remove and clear: passed;
- controls: `7` Tend UI, `0` legacy;
- bundle: `936,175` bytes raw, `288,864` bytes gzip;
- corporate source access: none;
- publication: none.

Result:

- `F-33` is `[x]`;
- S-Tracker has eleven verified Tend UI integration areas behind one shared runtime;
- the next group is `F-34`.

Next group:

```text
F-34: migrate the move-to-group dialog form controls to Tend UI Input and Button while preserving native dialog lifecycle, group creation, fallback naming, toast and selection clearing.
```

## F-34 S-Tracker Move Dialog

Date: 2026-07-26

Actions:

- replaced the legacy move-dialog field and three actions with Tend UI Input/Button controls;
- retained the native dialog and all stable vanilla hooks;
- preserved open reset, close/cancel, fallback naming, group creation, toast and selection clearing;
- added executable ownership, accessibility, artifact and bundle gates;
- reused existing exports, so package tarballs and the release bundle remained unchanged.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `931` transformed modules;
- browser close, cancel, fallback and custom-name scenarios: passed;
- controls: `4` Tend UI, `0` legacy;
- bundle: `937,481` bytes raw, `289,178` bytes gzip;
- browser errors: `0`;
- corporate source access: none;
- publication: none.

Result:

- `F-34` is `[x]`;
- S-Tracker has twelve verified Tend UI integration areas behind one shared runtime;
- the next group is `F-35`.

Next group:

```text
F-35: migrate the preset-save dialog controls to Tend UI Input and Button while preserving empty-name validation, trimmed names, draft capture, dropdown refresh and close/cancel behavior.
```

## F-35 S-Tracker Preset Dialog

Date: 2026-07-26

Actions:

- replaced the legacy preset-dialog field and three actions with Tend UI Input/Button controls;
- retained the native dialog and all stable vanilla hooks;
- preserved whitespace validation, trimming, draft capture, preset storage, dropdown refresh and close/cancel;
- added controlled reset events for both preset and move dialog inputs to prevent stale React values;
- added executable ownership, accessibility and bundle gates;
- reused existing exports, so package tarballs and the release bundle remained unchanged.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `932` transformed modules;
- browser validation, close, cancel, trimmed save and base/saved replay scenarios: passed;
- controls: `4` Tend UI, `0` legacy;
- bundle: `939,361` bytes raw, `289,710` bytes gzip;
- corporate source access: none;
- publication: none.

Result:

- `F-35` is `[x]`;
- S-Tracker has thirteen verified Tend UI integration areas behind one shared runtime;
- the next group is `F-36`.

Next group:

```text
F-36: migrate the column-settings preset trigger and Save action to Tend UI Button while preserving dropdown selection/deletion, active preset, draft dirty-state and disabled behavior.
```

## F-36 S-Tracker Preset Toolbar

Date: 2026-07-26

Actions:

- replaced the legacy preset trigger and Save action with Tend UI Button controls;
- used packaged ChevronDown and retained stable vanilla hooks;
- added a narrow label/expanded/disabled synchronization event;
- preserved dropdown, preset data, dirty comparison, replay, deletion and dialog opening;
- changed the existing delete control to an accessible semantic button with stable hover geometry;
- added executable ownership, accessibility and bundle gates;
- reused existing exports, so package tarballs and the release bundle remained unchanged.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `933` transformed modules;
- browser initial/dirty/create/replay/delete scenarios: passed;
- toolbar controls: `2` Tend UI, `0` legacy;
- bundle: `940,702` bytes raw, `290,034` bytes gzip;
- browser errors: `0`;
- corporate source access: none;
- publication: none.

Result:

- `F-36` is `[x]`;
- S-Tracker has fourteen verified Tend UI integration areas behind one shared runtime;
- the next group is `F-37`.

Next group:

```text
F-37: migrate the column-settings footer actions to Tend UI Button while preserving attribute-library expansion, default reset, draft commit and Apply disabled behavior.
```

## F-37 S-Tracker Column-Settings Footer

Date: 2026-07-26

Actions:

- replaced four legacy footer controls with Tend UI Button controls;
- used packaged Book and Refresh icons and retained stable vanilla hooks;
- added a narrow library-open/reset-disabled synchronization event;
- preserved expansion, library-only reset, default draft reset, Apply commit and table rerender;
- preserved Apply as always enabled because no disabled contract existed;
- added executable ownership, accessibility and bundle gates;
- reused existing exports, so package tarballs and the release bundle remained unchanged.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `936` transformed modules;
- browser library toggle/reset, draft isolation, Apply and default-reset scenarios: passed;
- footer controls: `4` Tend UI, `0` legacy;
- bundle: `945,839` bytes raw, `291,773` bytes gzip;
- browser errors: `0`;
- corporate source access: none;
- publication: none.

Result:

- `F-37` is `[x]`;
- S-Tracker has fifteen verified Tend UI integration areas behind one shared runtime;
- the next group is `F-38`.

Next group:

```text
F-38: migrate the column-settings header close action and attribute-library search field to Tend UI Button/Input while preserving discard-on-close, library collapse, search filtering and query lifecycle.
```

## F-38 S-Tracker Column-Settings Drawer Controls

Date: 2026-07-26

Actions:

- replaced the legacy header close control with Tend UI Button/Close;
- replaced the legacy attribute-library search with Tend UI Input/Search;
- retained `.js-columns-close` and `.js-library-search` as stable vanilla hooks;
- preserved close, library collapse, filtering, query lifecycle and draft reconstruction;
- added executable ownership, source, build-marker and bundle gates;
- reused existing exports, so package tarballs and the release bundle remained unchanged.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `938` transformed modules;
- browser filtering, empty state, persistence and discard-on-close scenarios: passed;
- controls: `2` Tend UI, `0` legacy;
- bundle: `947,513` bytes raw, `292,047` bytes gzip;
- browser errors: `0`;
- corporate source access: none;
- publication: none.

Result:

- `F-38` is `[x]`;
- S-Tracker has sixteen verified Tend UI integration areas behind one shared runtime;
- the next group is `F-39`.

Next group:

```text
F-39: migrate attribute-library row actions to Tend UI Button/icons while preserving add/return semantics, current search filtering, draft isolation and library reset behavior.
```

## F-39 S-Tracker Attribute-Library Row Actions

Date: 2026-07-26

Actions:

- replaced generated legacy row buttons and inline SVGs with Tend UI Button portals;
- used packaged Add and ArrowBack icons;
- retained `.js-library-item-action`, `data-key` and `data-added` for the delegated vanilla handler;
- added a presentation-only refresh event after dynamic library rendering;
- preserved filtering, draft membership, library reset, Apply and table rerender;
- added executable ownership, source, build-marker and bundle gates;
- reused existing exports, so package tarballs and the release bundle remained unchanged.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `940` transformed modules;
- browser add, return, reset, draft isolation and Apply/reverse-Apply scenarios: passed;
- filtered row actions: `1` Tend UI, `0` legacy;
- bundle: `949,073` bytes raw, `292,401` bytes gzip;
- browser errors: `0`;
- corporate source access: none;
- publication: none.

Result:

- `F-39` is `[x]`;
- S-Tracker has seventeen verified Tend UI integration areas behind one shared runtime;
- the next group is `F-40`.

Next group:

```text
F-40: migrate main column-row visibility and return controls to Tend UI Checkbox/Button/icons while preserving drag order, draft visibility, library membership and Apply behavior.
```

## F-40 S-Tracker Main Column-Row Controls

Date: 2026-07-26

Actions:

- replaced generated main-row visibility markup with Tend UI Checkbox portals;
- replaced the main-row inline return SVG with Tend UI Button/ArrowBack;
- retained `.js-col-cb` and `.js-return-to-library` as vanilla hooks;
- changed dynamic control listeners to delegated list events;
- removed the legacy `.ds-checkbox` wrapper class that hid Tend UI input semantics;
- preserved DOM-order collection, dragstart/dragover/dragend, draft state, return and Apply;
- reused existing exports, so package tarballs and the release bundle remained unchanged.

Verification result:

- `npm.cmd run verify:tend-ui:all`: passed;
- Vite build: `941` transformed modules;
- browser visibility hide/restore, accessible Checkbox and main-row return scenarios: passed;
- main-row controls: `18` Tend UI Checkboxes, `0` legacy checkbox blocks;
- drag contract: executable source gate passed; pointer drag unavailable in the browser driver;
- bundle: `950,466` bytes raw, `293,468` bytes gzip;
- corporate source access: none;
- publication: none.

Result:

- `F-40` is `[x]`;
- S-Tracker has eighteen verified Tend UI integration areas behind one shared runtime;
- the next group is `F-41`.

Next group:

```text
F-41: migrate remaining column-row drag-handle and preset-delete icons/actions to Tend UI while preserving native drag ordering, preset deletion and active-preset fallback.
```
