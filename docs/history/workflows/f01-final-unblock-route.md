# F-01 Final Unblock Route

## Purpose

This document defines the final route after `E-32`.

The project is documented and partially locally compensated. After `F-05A`, the dependency graph and main/key package builds are restored. After `F-06A`, the full Storybook manager runtime is verified locally.

## Current State

| Area | Status | Evidence |
| --- | --- | --- |
| Design-system source | present | `app/packages/` exists |
| Storybook config | present | `app/.storybook/` exists |
| Local helper compensation | partially done | local `lodash`, `classnames`, `uuid`, `query-string`, `samolet-oauth2`, config stubs |
| `app/node_modules` | present | dependency graph restored in `F-04G` |
| React / ReactDOM in `app/node_modules` | present | React runtime is installed, but consumer smoke test is not run yet |
| `dist` artifacts | present for main/key packages | `F-05A` confirms `dist` for main, tokens, theme, icons, primitives and foundational packages |
| Storybook runtime | verified locally | `F-06A` confirms full manager on `http://localhost:3000/`, plus `index.json`, `iframe.html` and `project.json` |
| Consumer connection | verified in isolated sandbox | `F-07` verifies Vite build and DOM render outside Storybook with diagnostic aliases |
| GitHub publication plan | ready | `F-08` documents repository publication boundary and adds tracked consumer smoke example |
| Clean package consumption | verified locally | `F-09` fixes entrypoints/exports and verifies clean-package consumer build plus DOM smoke |
| Exact tarball consumption | verified offline | `F-13` installs 15 release plus 5 compensation tarballs in an isolated no-alias consumer; build and DOM smoke pass |
| Git repository state | repaired locally | `git status` works on branch `main`; see `docs/history/workflows/f02-git-repository-repair.md` |

## Decision

Use a staged closure route:

```text
F-02 -> F-03 -> F-04 -> F-05 -> F-06 -> F-07 -> F-08 -> F-09 -> F-10 -> F-11 -> F-12 -> F-13 -> F-14
```

The route separates repository readiness from runtime readiness.

Repository readiness can be solved locally. Runtime readiness cannot be honestly solved only by documentation, because React, Storybook, TypeScript, Rollup, styled-components and related build/runtime packages are foundational dependencies.

## Route

| Step | Status | Goal | Expected Output |
| --- | --- | --- | --- |
| F-02 | [x] | Repair or initialize the local Git repository state. | `git status` works on branch `main`; details in `docs/history/workflows/f02-git-repository-repair.md`. |
| F-03 | [x] | Finalize the dependency graph acquisition path. | Selected archive-gated restore; details in `docs/history/workflows/f03-dependency-graph-acquisition-path.md`. |
| F-04 | [x] | Restore dependency graph through the selected approved path. | Completed through archive v2 restore and local workspace range alignment; `app/node_modules` exists. |
| F-04A | [x] | Prepare or provide the reviewed offline-public dependency archive input. | Minimum public npm archive candidate prepared; details in `docs/history/workflows/f04a-offline-public-archive-input.md`. |
| F-04B | [!] | Validate the prepared offline-public archive input. | Blocked validation recorded in `docs/history/workflows/f04b-offline-public-archive-validation.md`; archive paths and source URLs need repair. |
| F-04C | [x] | Repair the offline-public archive manifest and package paths. | Archive input validation now passes; details in `docs/history/workflows/f04c-offline-public-archive-repair.md`. |
| F-04D | [!] | Restore dependency graph from the validated offline-public archive. | Restore attempt ran; blocked on missing public transitive package `csstype@3.1.3`; details in `docs/history/workflows/f04d-dependency-graph-restore-from-archive.md`. |
| F-04E | [x] | Expand the offline-public archive to include required transitive packages from the lockfile closure. | Archive v2 prepared and validated; details in `docs/history/workflows/f04e-offline-public-archive-v2.md`. |
| F-04F | [!] | Restore dependency graph from offline-public archive v2 and diagnose local workspace resolution blockers. | Restore attempt ran; blocked on local `@10d/*` workspace range mismatch; details in `docs/history/workflows/f04f-archive-v2-restore-attempt.md`. |
| F-04G | [x] | Align local `@10d` workspace dependency ranges for offline restore. | Local range mismatches fixed; details in `docs/history/workflows/f04g-local-workspace-range-alignment.md`. |
| F-05 | [!] | Run package build verification. | Diagnostic complete; `@10d/tend-ui-tokens` builds, theme/icons/primitives/main are blocked by local alias/build-order and lodash subpath TypeScript errors. Details in `docs/history/workflows/f05-package-build-verification.md`. |
| F-05A | [x] | Fix local build graph blockers and rerun package builds. | Main and key package builds pass; details in `docs/history/workflows/f05a-local-build-graph-fixes.md`. |
| F-06 | [!] | Run Storybook verification. | Preview-only Storybook worked and indexed 938 stories; follow-up handled in `F-06A`. |
| F-06A | [x] | Repair full Storybook manager runtime or define accepted preview-only verification route. | Full Storybook manager opens locally; details in `docs/history/workflows/f06a-storybook-manager-runtime.md`. |
| F-07 | [x] | Run isolated React sandbox consumer smoke test. | `TendUI` provider and `Button` render outside Storybook in `tmp/f07-consumer-smoke`; details in `docs/history/workflows/f07-isolated-react-consumer-smoke.md`. |
| F-08 | [x] | Prepare GitHub publication and consumer connection plan. | Repository publication boundary is documented; tracked diagnostic consumer example exists in `examples/consumer-smoke`. |
| F-09 | [x] | Clean package entrypoints and exports for consumer consumption. | `@10d/tend-ui` built package has root entries and production exports; clean-package consumer build passes. |
| F-10 | [!] | Run package artifact dry-run and publication readiness check. | Main package and 13 internal artifacts pass; `@10d/tend-ui-logos` has no `dist`, so publication is not ready. |
| F-11 | [x] | Build and package `@10d/tend-ui-logos`, then repeat the internal artifact-chain dry-run. | Logos artifact and exports pass; full main/internal chain is `15/15 PASS`. |
| F-12 | [x] | Sanitize public package metadata and define the internal package publication order. | 15 source/artifact manifests are clean and public; release order has seven dependency levels. |
| F-13 | [x] | Create local package tarballs in release order and verify an isolated consumer installation without a registry. | Offline install, build and DOM smoke pass from exact tarball artifacts. |
| F-14 | [ ] | Resolve package-consumer warnings and define the distributable compensation boundary. | Prepare an unambiguous package contract before real registry publication. |

## Dependency Strategy

Allowed:

- local source and documents already inside this project;
- local compensation for small helpers or clearly understood service mocks;
- public npm/GitHub sources as a separate controlled step;
- a reviewed offline-public package archive/cache.

Forbidden:

- closed corporate registry as a source;
- closed GitLab/Nexus/Figma/corporate CI/CD access;
- pretending foundational tools are implemented by fake stubs;
- marking Storybook, build or package connection as verified without running them.

## What We Should Not Reimplement Locally

These are foundational dependencies and should be restored from public/offline-public sources, not handwritten as local replacements:

| Dependency Area | Reason |
| --- | --- |
| React / ReactDOM | Core rendering runtime. Reimplementing it would be a new framework. |
| Storybook | Documentation/runtime platform for component stories. |
| TypeScript / `tsc` / `tsc-alias` | Build and type pipeline. |
| Rollup and plugins | Package bundling pipeline. |
| styled-components | Main styling runtime used widely across the design system. |
| complex AntD primitives | Large UI behavior surface; replace only component-by-component if absolutely required. |
| `@tanstack/*` / `@dnd-kit/*` mechanics | Complex table/tree/drag/virtual behavior; implement only as separate scoped component tasks. |

## What Can Be Compensated Locally

| Area | Rule |
| --- | --- |
| small utilities | Allowed after static usage audit and narrow helper implementation. |
| service auth/realtime/API flows | Mock or disable in Storybook until real integration is available. |
| corporate-only tooling config | Stub locally if it does not alter runtime UI behavior. |
| component-specific mechanics | Implement only after story/source audit defines expected behavior and states. |

## Recommended Next Step

Proceed to:

```text
F-14: resolve package-consumer warnings and define the distributable boundary for local compensation packages before registry publication.
```

Reason: `F-12` cleaned public metadata and defined release sequencing; the next risk is whether a consumer can install the exact packed artifacts without workspace aliases.

## F-05 Result Addendum

`F-05` was run after `F-04G`.

Result:

- `app/node_modules` exists;
- `corepack yarn build:tokens` passed with the local build-runner shims;
- `app/packages/tend-ui-tokens/dist` exists;
- `build:theme`, `build:icons`, `build:primitives` and `build:main` are blocked by local alias/build-order and lodash subpath TypeScript errors;
- no dependency install, Storybook launch, Docker build, package publication or consumer connection was performed.

Report:

```text
docs/history/workflows/f05-package-build-verification.md
```

## F-05A Result Addendum

`F-05A` fixed the local build graph blockers found in `F-05`.

Result:

- local lodash subpaths `debounce`, `merge` and `isEqual` exist;
- `build:utils`, `build:types`, `build:hooks`, `build:styling`, `build:icons`, `build:theme`, `build:primitives` and `build:main` passed;
- `app/packages/tend-ui/dist` exists;
- no Storybook launch, Docker build, package publication or consumer connection was performed.

Report:

```text
docs/history/workflows/f05a-local-build-graph-fixes.md
```

## F-06 Result Addendum

`F-06` verified Storybook after `F-05A`.

Result:

- preview-only smoke-test passed;
- full startup smoke-test passed as a startup check;
- live preview-only server responds on `http://localhost:3000`;
- `index.json` contains `938` stories and `215` docs entries;
- first story iframe returned `200`;
- full Storybook manager UI is still blocked by manager bundle resolution under `app/node_modules/.cache/storybook/.../sb-manager/*`.

Report:

```text
docs/history/workflows/f06-storybook-verification.md
```

## F-06A Result Addendum

`F-06A` verified the full Storybook manager runtime.

Result:

- `http://localhost:3000/` returns `200` and contains Storybook manager content;
- `index.json`, `iframe.html` and `project.json` return `200`;
- Storybook index contains `938` stories and `215` docs entries;
- first story iframe returns `200`;
- stable local launch route uses `app/storybook-f06` config.

Report:

```text
docs/history/workflows/f06a-storybook-manager-runtime.md
```

## F-07 Result Addendum

`F-07` verified an isolated React consumer scenario.

Result:

- additional transitive package builds passed: factories, locale, api, grid, typography;
- Vite sandbox imports `@10d/tend-ui/theme` and `@10d/tend-ui/primitives/Button`;
- Vite production build passed;
- dev server responds on `http://127.0.0.1:3100/`;
- built bundle DOM verification passed in jsdom;
- DOM contains one rendered Button with text `F-07 Smoke Button`.

Limit:

- the sandbox uses diagnostic aliases and ESM shims, so `F-08` records the publication boundary and `F-09` must turn this into a clean package-consumption route.

Report:

```text
docs/history/workflows/f07-isolated-react-consumer-smoke.md
```

## F-08 Result Addendum

`F-08` prepared the GitHub publication and consumer connection plan.

Result:

- GitHub publication boundary is documented in `docs/history/workflows/f08-github-publication-and-connection-plan.md`;
- root `README.md` reflects the current F-branch status;
- tracked diagnostic consumer example exists in `examples/consumer-smoke`;
- source/docs/examples are safe to publish, while `node_modules`, `dist`, `tmp`, logs and caches remain excluded;
- clean package consumption is intentionally not marked complete because `@10d/tend-ui` built root entries and subpath exports still need correction.

Report:

```text
docs/history/workflows/f08-github-publication-and-connection-plan.md
```

## F-09 Result Addendum

`F-09` fixed clean package entrypoints and exports.

Result:

- `app/packages/tend-ui/src/index.ts` creates root ESM/CJS/types outputs;
- `app/packages/tend-ui/scripts/prepare-package-json.js` generates production `dist/package.json`;
- `dist/package.json` now includes root `.` export and `40` subpath exports;
- local `classnames` and `lodash` compensation packages now expose ESM-compatible entries;
- `examples/consumer-clean-package` builds and renders one Tend UI Button through built package exports.

Report:

```text
docs/history/workflows/f09-clean-package-entrypoints.md
```

## F-10 Result Addendum

`F-10` executed the package artifact dry-run and publication readiness audit.

Result:

- `@10d/tend-ui@4.82.0` passes `npm pack --dry-run`;
- the candidate package contains `5507` files, with root ESM, CommonJS and type entries;
- no `src`, `node_modules`, test or story files are included;
- `13/14` declared internal dependency artifacts pass local dry-runs;
- `@10d/tend-ui-logos` is imported at runtime but has no `dist/package.json`;
- public registry publication remains blocked until the logos artifact and publication metadata are prepared.

Report:

```text
docs/history/workflows/f10-package-artifact-dry-run.md
```

## F-11 Result Addendum

`F-11` built and prepared the missing logos artifact.

Result:

- `corepack yarn build:logos` passes through the local build-runner shim;
- `@10d/tend-ui-logos@1.17.3` has ESM, CommonJS and type outputs;
- production exports for `.`, `./utils` and `./SMaterials` are generated and validated;
- logos package dry-run passes with `661` files;
- the main package and all fourteen internal dependency artifacts pass: `15/15`;
- the clean-package consumer build renders one packaged `SMaterials` SVG and one Button.

Report:

```text
docs/history/workflows/f11-tend-ui-logos-artifact.md
```

## F-12 Result Addendum

`F-12` prepared the first public release wave without publishing it.

Result:

- reusable `app/scripts/prepare-public-release.js` added;
- all fifteen release source/artifact manifests have `publishConfig.access=public`;
- closed corporate URL/contact metadata is removed from active package manifests;
- built manifests no longer contain build/test/release scripts or tooling metadata;
- `.yarnrc` and `yarn.lock` route to public npm instead of the closed proxy;
- seven dependency-safe publication levels are defined;
- post-cleanup dry-run remains `15/15 PASS`.

Report:

```text
docs/history/workflows/f12-public-metadata-and-release-order.md
```

## Verification For F-01

`F-01` is complete when:

- this route document exists;
- `docs/dependency-unblock-workflow.md` marks `F-01` as `[x]`;
- next step is `F-02`;
- no install/build/Storybook/Docker/publication action was executed.

## F-13 Result Addendum

`F-13` completed the local tarball-consumption rehearsal.

Result:

- all fifteen Tend UI release artifacts were packed across the seven dependency levels;
- five local helper compensations were packed as a separate auxiliary layer;
- the isolated consumer installed successfully with Yarn `--offline`;
- no aliases to monorepo sources or `app/node_modules` were used;
- Vite built `708` modules;
- DOM smoke rendered `TendUI`, `Button` and `SMaterials`;
- no package was published.

Report:

```text
docs/history/workflows/f13-local-tarball-install-rehearsal.md
```

## F-14 Result Addendum

`F-14` defined and enforced the package distribution boundary.

Result:

- `app/release-boundary.json` identifies exactly fifteen public Tend UI packages;
- five local compensation workspaces remain private and have no publication metadata;
- only three runtime helper compensations enter the offline consumer layer;
- two type compensations are build-only;
- package manifests declare the required `react-is` runtime contract;
- the isolated offline consumer has zero actionable warnings, builds `709` modules and passes the provider/Button DOM smoke;
- no registry, upload or closed corporate source was used.

Report:

```text
docs/history/workflows/f14-consumer-boundary-and-warning-cleanup.md
```

Next group:

```text
F-15: create a registry-agnostic release bundle and publication manifest for the validated fifteen-package wave, without uploading it.
```

## F-15 Result Addendum

`F-15` produced and verified the registry-neutral release payload.

Result:

- `release:create-bundle` is reproducible from the current built artifacts;
- the bundle contains exactly fifteen public package tarballs in seven levels;
- package sizes and SHA-256 values match the publication manifest;
- the outer archive and checksum sidecar match;
- private compensation packages are excluded;
- no registry, credential or upload was used.

Report:

```text
docs/history/workflows/f15-registry-agnostic-release-bundle.md
```

Next group:

```text
F-16: choose the public package registry and package-scope strategy, then prepare credential-free publication configuration and verification guidance without uploading packages.
```

## F-16 Result Addendum

`F-16` selected and guarded the publication target.

Result:

- npmjs is the preferred public package registry;
- GitHub remains the source and release archive destination;
- all fifteen packages remain under `@10d` pending ownership confirmation;
- an atomic migration plan exists if another controlled scope is required;
- configuration templates contain no credentials;
- the validator passes policy consistency and blocks publication readiness;
- no authentication, remote creation or upload occurred.

Report:

```text
docs/history/workflows/f16-public-registry-and-scope-strategy.md
```

Next group:

```text
F-17: prepare a GitHub-ready source snapshot and repository handoff through local secret, tracked/ignored-boundary and initial-commit audits, without adding a remote or pushing.
```

## F-17 Result Addendum

`F-17` defined and audited the future GitHub source snapshot.

Result:

- explicit source and local-only boundaries are machine-readable;
- raw archive docs and generated/local outputs remain local;
- `5929` candidate files total approximately `24.67 MB`;
- oversized files, secret findings, local-only leaks and staged files are all `0`;
- `91` files still contain corporate references, including `22` active source/config files;
- root license/right-to-publish confirmation is missing;
- no stage, commit, remote or push occurred.

Report:

```text
docs/history/workflows/f17-github-source-snapshot-audit.md
```

Next group:

```text
F-18: externalize or replace closed corporate endpoints in active source/config files and define the redaction/allowlist policy for historical references, while keeping the license decision as explicit owner/legal input.
```

## F-18 Result Addendum

F-18 removed the technical public-source endpoint blocker:

- active source/config references: `0`;
- unreviewed and stale reference files: `0`;
- `49` inert changelog/diagnostic files are reviewed by exact path;
- Storybook manager/index/first iframe return `200` with `938` stories and `215` docs entries;
- the sole GitHub snapshot blocker is `root-license-missing`.

No corporate access, dependency installation, Git mutation or publication occurred.

Next group:

```text
F-19: rebuild the fifteen-package release chain after F-18, recreate the registry-agnostic bundle and repeat isolated tarball-consumer verification without publication.
```
