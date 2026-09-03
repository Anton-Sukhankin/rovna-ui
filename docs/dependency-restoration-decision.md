# Dependency Restoration Decision

## Purpose

This document records the `E-01 / DEC-01` decision after the diagnostic `D-*` branch.

The goal is to choose a controlled route for handling missing dependencies before build, Storybook, component runtime checks and consumer smoke tests.

## Current Facts

Checked on: 2026-07-05. Updated on: 2026-07-14 after `F-04G`.

| Area | Fact |
| --- | --- |
| Package manager | Root `app/package.json` declares `packageManager: yarn@1.22.15`. |
| Yarn availability | Yarn can be executed through `corepack yarn`; package scripts may still call plain `yarn`, to be verified during build. |
| Workspaces | `app/package.json` declares `packages/*` workspaces. |
| Local source packages | Local `@rovna-ui/components-*` package sources exist in `app/packages`. |
| Installed dependencies | `app/node_modules` exists after `F-04G`. |
| Build output | `dist` output is missing for the main and key packages. |
| Registry config | `app/.yarnrc` points to `https://packages.samoletgroup.ru/repository/npm-all`. |
| Lockfile | `app/yarn.lock` massively resolves packages through `packages.samoletgroup.ru`. |
| Offline cache/archive | Archive v2 plus local workspace range alignment restored dependencies in `F-04G`. |
| Storybook | Config exists and Storybook binary is installed; runtime launch has not been rerun after `F-04G`. |

## Constraints

- Do not access closed corporate environments: internal registry, corporate GitLab, Figma, Nexus, CI/CD or service infrastructure.
- Public sources such as public npm, GitHub and open codebases may be used only as explicit controlled steps.
- Do not treat internal links in lockfiles as available sources.
- Treat the archive and local project context as the source of truth for Rovna UI code.
- Do not rewrite `app/.yarnrc`, `app/package.json` or `app/yarn.lock` without a separate implementation step.
- Identify missing dependency mechanics before implementing local compensation.
- Do not connect Rovna UI to `S-Tracker` until build, Storybook and an isolated React smoke test are restored.

## Routes Considered

| Route | Decision | Reason |
| --- | --- | --- |
| Use internal registry | Rejected | It is not available and access will not be requested. |
| Fully offline install from current local cache | Rejected as a solution | The cache is incomplete and already fails on a missing tarball. |
| Public registry dependency restoration | Allowed as controlled route | Public packages may be restored from public npm/GitHub if the step is explicit and does not use corporate sources. |
| Blind rewrite to remove dependencies | Rejected | This would be high risk before mapping which mechanics each missing dependency provides. |
| Directly connect Rovna UI to `S-Tracker` | Rejected | Rovna UI is not built and `S-Tracker` has no React adapter layer. |
| Local workspace resolution for `@rovna-ui/components-*` | Selected | Source packages are present in `app/packages` and should not be downloaded from the old internal registry where local source exists. |
| Local compensation for corporate-only or unavailable mechanics | Selected as fallback | Missing mechanics must be identified from local imports, stories, docs and source code, then implemented, stubbed, mocked or disabled locally. |
| Targeted stubs for missing tooling/config packages | Selected as fallback | Only acceptable for non-runtime config packages, after the exact blocker is known. |

## Selected Route

Use a staged public/local route with a hard corporate boundary:

1. Keep the original archive source as the baseline.
2. Use local workspaces for available `@rovna-ui/components-*` packages.
3. Do not use internal registry, corporate GitLab, Nexus, Figma, CI/CD or any closed corporate source.
4. Public npm/GitHub sources may be used only in explicit controlled steps.
5. Build a dependency source and mechanics map from `package.json`, `yarn.lock`, imports, stories and configs.
6. For each missing dependency, identify its source route: local workspace, public source, corporate-only/unavailable, or local compensation.
7. For tooling/config dependencies, create minimal local config or stub packages when needed.
8. For service/API/realtime dependencies tied to corporate systems, mock or disable the scenario for Storybook.
9. For small helpers, prefer public package restoration when safe; use local utilities only after the exact usage is known.
10. For complex runtime UI mechanics, prefer public package restoration when the package is public; otherwise create component-level implementation tasks with verification criteria.
11. Return to build, Storybook and consumer smoke test only after the dependency graph or local compensation is implemented enough to run them.

## Execution Sequence

| Step | Status | Purpose | Output |
| --- | --- | --- | --- |
| E-01 / DEC-01 | [x] | Choose public/local route with corporate boundary. | This document. |
| E-02 | [x] | Build a dependency source and mechanics map. | Created `docs/dependency-source-map.md`. |
| E-03 | [x] | Prepare a controlled public-only dependency restoration step. | Created `docs/public-dependency-restoration-runbook.md`. |
| E-04 | [!] | Execute controlled public-only dependency restoration diagnostic. | Attempt stopped on public npm access blocker: `AggregateError [EACCES]` for `https://registry.npmjs.org/@types%2freact`; `app/node_modules` was not created. |
| E-05 | [x] | Choose public dependency acquisition route under current network restriction. | Created `docs/dependency-acquisition-and-compensation-strategy.md`; foundational public dependencies must be acquired from public/offline-public sources, while local compensation is limited to corporate-only, unavailable or narrow helper/mechanic cases. |
| E-06 | [x] | Prepare local compensation backlog and first implementation candidates. | Created `docs/local-compensation-backlog.md` with prioritized candidates and protected dependency areas. |
| E-07 | [x] | Choose and implement the first low-risk local compensation slice. | Implemented `LC-03`: local workspace stubs for `@rovna-ui/eslint-config` and `@rovna-ui/prettier-config`; recorded in `docs/tooling-config-stubs.md`. |
| E-08 | [!] | Re-run build diagnostics after LC-03. | Build diagnostic recorded in `docs/history/workflows/e08-build-after-lc03-diagnostics.md`; LC-03 workspaces are recognized, but build remains blocked by plain `yarn` and missing `app/node_modules`. |
| E-09 | [x] | Implement `LC-01` service auth mock boundary. | Created local workspace stub `samolet-oauth2`; notifications and search-assistant resolve it as a workspace dependency; recorded in `docs/service-auth-mock-boundary.md`. |
| E-10 | [x] | Implement `LC-05` narrow query-string replacement. | Created local workspace stub `query-string`; notifications and search-assistant resolve it as a workspace dependency; recorded in `docs/query-string-replacement.md`. |
| E-11 | [x] | Implement `LC-04` class name helper. | Created local workspace stub `classnames`; UI packages resolve it as a workspace dependency; recorded in `docs/classnames-helper-replacement.md`. |
| E-12 | [x] | Scope and implement `LC-06` uuid helper. | Created local workspace stubs `uuid` and `@types/uuid`; local `v4()` usage is covered; recorded in `docs/uuid-helper-replacement.md`. |
| E-13 | [!] | Re-run build diagnostics after LC-04/LC-06. | Diagnostic recorded in `docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md`; blocker remains nested plain `yarn` plus missing `app/node_modules`. |
| E-14 | [x] | Define local build-runner strategy for nested plain `yarn` calls. | Selected temporary local `yarn.cmd` shim for diagnostic shell; recorded in `docs/history/workflows/e14-build-runner-strategy.md`. |
| E-15 | [!] | Create temporary local `yarn.cmd` shim and run narrow build diagnostics. | Diagnostic recorded in `docs/history/workflows/e15-shimmed-build-diagnostics.md`; shim works, blocker moved to missing `tsc` / missing `app/node_modules`. |
| E-16 | [x] | Define dependency graph and build tooling restoration strategy. | Strategy recorded in `docs/dependency-graph-restoration-strategy.md`; selected public/offline-public route and rejected fake foundational stubs. |
| E-17 | [x] | Prepare executable public-only dependency restore runbook. | Runbook recorded in `docs/public-only-dependency-restore-executable-runbook.md`; no install/build was run. |
| E-18 | [!] | Execute public-only dependency restore attempt in an allowed environment or record execution blocker. | Current shell execution is blocked by network restrictions; recorded in `docs/history/workflows/e18-public-restore-attempt.md`. Offline-public checklist created in `docs/offline-public-package-cache-checklist.md`. |
| E-19 | [x] | Build offline-public dependency package manifest from local package files and `yarn.lock`. | Created `docs/offline-public-dependency-package-manifest.md`; direct dependencies classified into local, public/offline-public and compensation routes. |
| E-20 | [x] | Choose restore execution route from the E-19 manifest. | Created `docs/restore-execution-route-decision.md`; selected offline-public package archive/cache as primary route for current workflow. |
| E-21 | [x] | Prepare offline-public package acquisition plan from the E-19 manifest. | Created `docs/offline-public-package-acquisition-plan.md`; packages split into priority lanes, source types and compensation rules. |
| E-22 | [x] | Prepare offline-public archive manifest template and import staging runbook. | Created `docs/offline-public-archive-manifest-template.md` and `docs/offline-public-import-staging-runbook.md`; import boundary defined. |
| E-23 | [!] | Wait for or prepare a reviewed offline-public archive, then validate it in staging. | Staging folders and `docs/offline-public-archive-validation-report.md` created; validation blocked because no archive/manifest/checksum input is present. |
| E-24 | [!] | Provide or create a reviewed offline-public archive, then rerun staging validation. | Created `docs/offline-public-archive-preparation-request.md`; blocked because no archive input is present and current shell has no public network access. |
| E-25 | [x] | Choose next local compensation lane while waiting for the offline-public archive. | Created `docs/local-compensation-lane-decision.md`; selected `LC-07` focused lodash helper audit. |
| E-26 | [x] | Audit lodash helper usage and define replacement slices. | Created `docs/lodash-helper-audit.md`; selected `LC-07A` as the first implementation slice. |
| E-27 | [x] | Implement `LC-07A` lodash object helper base. | Created local workspace packages `lodash` and `@types/lodash`; covered only `omit`, `pick`, `identity`, `isNil` and `isString`. |
| E-28 | [x] | Implement `LC-07B` lodash collection helper base. | Covered `chunk`, `uniq`, `groupBy` and `mapValues` in the local lodash workspace package. |
| E-29 | [x] | Implement `LC-07C` lodash object filtering helper base. | Covered `pickBy`, `omitBy`, `isEmpty` and `uniqBy` in the local lodash workspace package. |
| E-30 | [!] | Re-run Storybook diagnostics after dependency/build tooling strategy is handled. | Diagnostic recorded in `docs/history/workflows/e30-storybook-after-lodash-diagnostics.md`; Storybook remains blocked because `app/node_modules/.bin/storybook` is absent. |
| E-31 | [x] | Define complex runtime mechanic tasks if still needed. | Created `docs/complex-runtime-mechanics-tasks.md`; complex mechanics are split into component/mechanic tasks. |
| E-32 | [!] | Run isolated React consumer smoke test when possible. | Blocked diagnostic recorded in `docs/history/workflows/e32-isolated-react-consumer-smoke-check.md`; import/render remains unverified because `app/node_modules`, React/ReactDOM and `dist` are missing. |

## Not Done In E-01

- No dependency install.
- No network call.
- No build.
- No Storybook launch.
- No Docker build.
- No package publication.
- No edits to `app/.yarnrc`, `app/package.json`, `app/yarn.lock` or component source.
- No changes inside `S-Tracker`.

## Decision

`E-01 / DEC-01` is complete.

Next practical step after F-04C:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

Current result after F-04D:

```text
F-04D is complete as a blocked diagnostic; next practical step is F-04E.
```

Current result after F-04E:

```text
F-04E is complete; next practical step is F-04F.
```

Current result after F-04F:

```text
F-04F is complete as a blocked diagnostic; next practical step is F-04G.
```

Current result after F-04G:

```text
F-04G is complete; dependency graph restored, next practical step is F-05.
```

## F-01 Route Decision

`F-01` is complete as a route-definition step.

Created:

```text
docs/history/workflows/f01-final-unblock-route.md
```

Decision:

- fix local Git repository readiness first, because it is local and required for GitHub publication;
- then return to dependency graph restoration through an approved public/offline-public route;
- do not fake foundational dependencies such as React, TypeScript, Rollup, Storybook or styled-components;
- keep consumer connection blocked until build, Storybook and isolated React render are verified.

## F-02 Git Repair Decision

`F-02` is complete.

Created:

```text
docs/history/workflows/f02-git-repository-repair.md
```

Decision:

- preserve the invalid `.git` reparse point as `.git.broken-reparsepoint-20260706-173419`;
- initialize a clean local Git repository on branch `main`;
- add root `.gitignore` for temporary folders, dependency folders, build outputs and logs;
- do not create a commit or connect a remote until GitHub publication is planned explicitly.

## F-03 Dependency Graph Acquisition Decision

`F-03` is complete as a route decision step.

Created:

```text
docs/history/workflows/f03-dependency-graph-acquisition-path.md
```

Decision:

- selected archive-gated restore through a reviewed offline-public package archive/cache;
- kept public-enabled install in a separate local environment as an allowed alternate route;
- kept targeted local compensation only for narrow helpers/mocks;
- rejected fake stubs for React, ReactDOM, styled-components, TypeScript, Rollup and Storybook.

## F-04 Restore Attempt Decision

`F-04` is complete as a blocked input step.

Created:

```text
docs/history/workflows/f04-dependency-graph-restore-attempt.md
```

Decision:

- do not import dependencies because the staging inbox has no reviewed archive;
- required inputs remain `offline-public-package-archive.*`, `offline-public-package-archive-manifest.json` and `checksums.sha256`;
- keep build, Storybook and consumer checks blocked until dependency graph restoration succeeds.

## F-04A Archive Input Decision

`F-04A` is complete as an archive input preparation step.

Created:

```text
docs/history/workflows/f04a-offline-public-archive-input.md
```

Prepared in staging inbox:

```text
offline-public-package-archive.zip
offline-public-package-archive-manifest.json
checksums.sha256
```

Decision:

- archive candidate was built from public npm package tarballs only;
- no closed corporate source was used;
- archive contains 24 direct minimum packages for lanes 1-4;
- no dependency import/install is performed until `F-04B` validates the archive.

## F-04B Archive Validation Decision

`F-04B` is complete as a blocked validation step.

Created:

```text
docs/history/workflows/f04b-offline-public-archive-validation.md
```

Decision:

- do not import dependencies yet;
- repair empty package `sourceUrl` values;
- repair archive path mismatch between manifest `packages/*.tgz` entries and zip root entries;
- rerun validation after repair.

## F-04C Archive Repair Decision

`F-04C` is complete.

Created:

```text
docs/history/workflows/f04c-offline-public-archive-repair.md
```

Decision:

- archive paths now match manifest `packages/*.tgz` entries;
- every package has a public npm `sourceUrl`;
- archive checksum was recomputed;
- validation gate now passes for the prepared archive input;
- do not claim dependency graph readiness until the next restore/import step creates `app/node_modules`.

## F-04D Restore Attempt Decision

`F-04D` is complete as a diagnostic restore attempt with status `[!]`.

Created:

```text
docs/history/workflows/f04d-dependency-graph-restore-from-archive.md
```

Decision:

- the validated archive input was used;
- Yarn was run in offline mode with a temporary mirror/cache;
- no closed corporate registry access was requested or used;
- restore stopped on missing public transitive package `csstype@3.1.3`;
- `app/node_modules` was not created;
- build and Storybook remain blocked.

Next practical step:

```text
F-04E: expand the offline-public archive to include required transitive packages from the lockfile closure.
```

## F-04E Archive V2 Decision

`F-04E` is complete.

Created:

```text
docs/history/workflows/f04e-offline-public-archive-v2.md
```

Decision:

- `app/yarn.lock` contains 1592 unique tarball URLs;
- archive v1 exactly covered only 21 lockfile entries;
- archive v2 contains 1560 public npm tarballs;
- 32 local workspace entries were intentionally excluded from the public archive;
- archive v2 validation passed;
- `app/node_modules` was not created in this step.

Next practical step:

```text
F-04F: restore dependency graph from offline-public archive v2 and diagnose local workspace resolution blockers.
```

## F-04F Restore Attempt Decision

`F-04F` is complete as a diagnostic restore attempt with status `[!]`.

Created:

```text
docs/history/workflows/f04f-archive-v2-restore-attempt.md
```

Decision:

- archive v2 was used for an offline restore attempt;
- public transitive dependency blocker from `F-04D` is no longer the immediate blocker;
- Yarn stopped on local `@rovna-ui/icons@0.3.1`, which exists as a local workspace but does not satisfy old internal dependency ranges;
- static analysis found 37 unsatisfied internal `@rovna-ui/*` references;
- `app/node_modules` was not created;
- build and Storybook remain blocked.

Next practical step:

```text
F-04G: align local @10d workspace dependency ranges for offline restore.
```

## F-04G Workspace Range Alignment Decision

`F-04G` is complete.

Created:

```text
docs/history/workflows/f04g-local-workspace-range-alignment.md
```

Decision:

- 37 unsatisfied internal `@rovna-ui/*` references were aligned to local workspace versions;
- 16 local package manifests were updated;
- unsatisfied internal workspace references are now `0`;
- offline restore from archive v2 completed successfully;
- `app/node_modules` now exists;
- build and Storybook still need separate verification.

Next practical step:

```text
F-05: run package build verification.
```
