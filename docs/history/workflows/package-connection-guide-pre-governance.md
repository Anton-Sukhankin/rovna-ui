# Package Connection Guide

## Purpose

This document describes how Tend UI can be connected to other projects based on the local archive unpacked into this repository.

The guide started in offline/self-contained diagnostic mode. R-11 reconciles it with the final 21-package release, public API, security and documentation evidence.

Current instructions are defined by `Current Status`, `Connection Options`, `Recommended Route` and `R-09 Current Integration Contract` near the top of this document. Later D/E/F sections preserve dated diagnostics; their missing-build or blocked-runtime statements are superseded historical evidence.

## Current Status

Checked on: 2026-07-03. Updated on: 2026-08-10 after `R-11`.

| Item | Status |
| --- | --- |
| Design-system source | Present in `app/` |
| Main package | `@10d/tend-ui@4.82.0` |
| Package manager declared by source project | `yarn@1.22.15` |
| Storybook | Static catalog `1223` entries: `1008` stories and `215` docs; opens on `http://127.0.0.1:3000/` |
| Build | Passed for main/key packages after `F-05A` |
| Built package output | Present for `tend-ui`, `tend-ui-tokens`, `tend-ui-theme`, `tend-ui-icons`, `tend-ui-primitives`, plus foundational `utils/types/hooks/styling` |
| Registry | `.yarnrc` uses public npmjs; publication is disabled until LICENSE and `@10d` scope ownership are confirmed |
| Verified consumer connection | Passed in isolated Vite sandbox with diagnostic aliases in `F-07`; cleaner built package route passed in `F-09` |
| GitHub publication plan | Ready in `docs/history/workflows/f08-github-publication-and-connection-plan.md` |
| Clean package entrypoints/exports | Passed locally in `F-09` |
| Main package artifact dry-run | Passed in `F-10`: `5507` files, root ESM/CJS/types present |
| Supported artifact chain | Passed through R-11: all core and extended packages, `21/21` |
| Public package metadata | Passed in `H-07`: 21 source/artifact manifests prepared |
| Release order | Nine dependency levels documented; no publication performed |
| Offline tarball consumer | Passed: offline install, Vite build, DOM smoke and checksum verification |
| Internal consumer matrix | Passed: diagnostic aliases, clean exports and isolated tarballs `3/3` |
| Public API | `643` subpaths and `2551` symbol bindings; drift/type failures `0` |
| React compatibility | React `17.0.2`, `18.3.1`, `19.2.8` install/build/DOM smoke passed; peer contract remains `^17.0.2` |
| Current release bundle | `tend-ui-4.82.0-release-bundle.tgz`, SHA-256 `1bb7be0790d047842f0d2ee4795c2420f40c52cd0bf4c902745a481375a1c9c2` |
| Final acceptance | R-11 execution `49/49`; final gate `24/24`; blocking failures `0` |
| Security | Public production/full audits `0/0`; invalid lock sources and blocking findings `0` |

Important consequence:

```text
Tend UI has local build outputs, verified Storybook runtime, a complete `21/21` supported package chain, clean public manifests and a dependency-safe registry-free release. Public registry publication remains owner-blocked by license, scope and authorization decisions.
```

## Offline Constraints

- Only local project materials are used: `app/`, `source-docs/`, `README.md`, `docs/`.
- Internal registry, GitLab, Figma, Nexus and corporate services are not used or requested.
- Package names and scope `@10d/*` are not changed.
- No package publication is performed at this stage.
- Public dependency restoration is allowed only through controlled public npm or reviewed offline-public cache; lifecycle scripts require separate review.

## Connection Options

| Option | Intended use | Current status | Why |
| --- | --- | --- | --- |
| Registry install | Target production/team distribution | Owner/account gate | Artifact chain is ready; real upload requires LICENSE, controlled scope and explicit credentials. |
| Local link | Developer testing after local build | Cleaner route verified locally | F-09 verifies built package exports through `examples/consumer-clean-package`. |
| `file:` tarball dependency | Offline experiment and migration verification | Passed in isolated consumer | F-19 proves exact package artifacts without source aliases or a registry. |
| New registry, for example GitHub Packages or another npm scope | Future distribution strategy | Technically prepared, not authenticated or tested | G-12 confirms registry-free package consumption; real publication still requires explicit owner/license/scope decisions. |

## Recommended Route

Current recommended route:

1. Use the verified 21-package local tarball bundle for registry-free integration and migration checks.
2. Install the exact tarballs in an isolated React consumer and wrap the UI in `TendUI`.
3. Start with `Button` or another supported package component and run build plus DOM/browser smoke.
4. Keep source-only packages outside the consumer until their artifact and tarball route is proven separately.
5. Use the R-09 catalog/passport evidence to select imports, states, interactions and risks.
6. Treat npm or GitHub Packages distribution only as a future owner-authorized transport; it is not required for local integration.
7. Do not publish until root license, rights, scope ownership and credentials are explicitly decided.

## R-09 Current Integration Contract

- package source and built artifacts exist locally;
- all `21/21` supported package tarballs install without registry access;
- Vite 7, Webpack 5 and React 17/18/19 consumers pass;
- `643` public subpaths resolve with type/API drift `0`;
- machine catalog records the exact import candidates and `supported/source-only` boundary for every Storybook group;
- Storybook, package connection and generated passports use one current baseline;
- no closed corporate source is needed for this route.

## F-21 Current Connection Decision

Local package connection is verified and must no longer be reported as blocked by missing build output or dependencies.

Current boundaries:

- registry-free tarball consumption: passed;
- source-alias diagnostic consumer: passed;
- public registry installation: not run because packages are not published;
- external product integrations are outside the active DS-only workflow.

See `docs/current-project-status.md` for the authoritative residual-gate matrix.

## F-07 Consumer Smoke Update

`F-07` created `tmp/f07-consumer-smoke` and verified a minimal React/Vite consumer outside Storybook.

Passed:

- `TendUI` and `Button` import in a Vite consumer app;
- production Vite build;
- local dev server on `http://127.0.0.1:3100/`;
- built DOM verification through jsdom.

Not clean yet:

- package root `dist/package.json` and missing `dist/cjs/index.js` need publication cleanup;
- public subpath exports need a final strategy;
- local helper replacements need ESM/browser-compatible packaging, not only CommonJS compatibility.

The first practical consumer test should be a sandbox project with one simple component, for example `Button`, wrapped in the Tend UI theme provider. If that test fails, the failure should be classified against `docs/dependency-diagnostics.md`.

## F-08 Publication Update

`F-08` created `docs/history/workflows/f08-github-publication-and-connection-plan.md` and moved the verified sandbox example into tracked source:

```text
examples/consumer-smoke/
```

Current decision:

- GitHub source/docs/examples publication can proceed after a remote is configured.
- Package registry publication should not proceed yet.
- Clean local consumer connection is verified in `F-09`.

## F-09 Clean Package Update

`F-09` created `docs/history/workflows/f09-clean-package-entrypoints.md` and added:

```text
examples/consumer-clean-package/
```

Passed:

- `@10d/tend-ui` root `main`, `module`, `types` targets exist;
- `dist/package.json` contains production exports;
- clean-package Vite build passed;
- built DOM smoke found one Button with text `F-09 Clean Package Button`.

Still pending:

- package artifact dry-run;
- registry or GitHub Packages publication;
- `S-Tracker` React adapter layer.

## F-10 Package Artifact Update

`F-10` created `docs/history/workflows/f10-package-artifact-dry-run.md`.

Passed:

- `@10d/tend-ui@4.82.0` passes `npm pack --dry-run`;
- the artifact includes root ESM, CommonJS and type entries;
- no source, dependency, test or story files leak into the artifact;
- `13` declared internal package artifacts pass their own dry-runs.

Blocked:

- `@10d/tend-ui-logos` is imported by the built Layout Apps widget but has no `dist` package;
- package metadata still references the original closed corporate repository;
- registry/GitHub Packages publication and install are therefore not yet verified.

Next connection prerequisite:

```text
F-11: build and package @10d/tend-ui-logos, then repeat the internal artifact-chain dry-run.
```

## F-11 Logos And Artifact Chain Update

`F-11` created `docs/history/workflows/f11-tend-ui-logos-artifact.md`.

Passed:

- `corepack yarn build:logos`;
- production exports for `.`, `./utils` and `./SMaterials`;
- `@10d/tend-ui-logos@1.17.3` package dry-run;
- complete main/internal artifact chain: `15/15`;
- clean-package Vite build with packaged `SMaterials` import;
- built DOM render with one SVG logo and one Button.

Still pending:

- public package metadata cleanup;
- dependency-safe publication order;
- registry or GitHub Packages publication/install verification;
- `S-Tracker` React adapter layer.

Next connection prerequisite:

```text
F-12: sanitize public package metadata and define the internal package publication order.
```

## F-12 Public Metadata And Release Order Update

`F-12` created `docs/history/workflows/f12-public-metadata-and-release-order.md` and added:

```text
app/scripts/prepare-public-release.js
```

Passed:

- fifteen release source manifests have public access metadata;
- fifteen built manifests are stripped of release/build/test scripts and closed corporate metadata;
- `.yarnrc` and `yarn.lock` no longer route to the closed corporate registry;
- dependency closure contains exactly fifteen packages;
- release order is split into seven topological levels;
- post-cleanup package dry-run remains `15/15 PASS`.

Still pending:

- exact tarball installation in an isolated consumer;
- registry/GitHub Packages authentication, publication and install verification;
- publication work for feature packages outside the first release wave;
- `S-Tracker` React adapter layer.

Next connection prerequisite:

```text
F-13: create local package tarballs in release order and verify an isolated consumer installation without a registry.
```

## Minimum Consumer Requirements

The main package declares React as peer dependency:

```text
react: ^17.0.2
react-dom: ^17.0.2
```

The current design-system implementation also relies on important runtime dependencies documented in `docs/dependency-diagnostics.md`:

| Dependency group | Role |
| --- | --- |
| `styled-components` | Theme, dynamic styles, state styles, styled wrappers |
| `antd-core` | Ant Design mechanics under alias: select, date/time, overlays, form-like controls, grid and other primitives |
| `@dnd-kit/*` | Drag-and-drop and sortable UI for columns/tree mechanics |
| `@tanstack/*` | Table/tree models, virtualization and service query flows |
| `axios`, `samolet-oauth2`, `centrifuge` | Service/API/auth/realtime flows; should be mocked or disabled for offline Storybook and basic UI checks |
| `lodash`, `classnames`, `uuid`, `query-string` | Utility helpers; some may be replaced locally later if needed |

## Static Public Import Contract

These imports are present in the verified public artifact contract. The exact component and behavior still need passport-level verification in the target consumer.

| Need | Candidate import |
| --- | --- |
| Theme provider / initialization | `import { TendUI } from '@10d/tend-ui/theme';` |
| Main primitives barrel | `import { Button, Input, Select } from '@10d/tend-ui/primitives';` |
| Direct primitive path | `import { Button } from '@10d/tend-ui/primitives/Button';` |
| Direct segmented path | `import { Segmented } from '@10d/tend-ui/primitives/Segmented';` |
| Main components barrel | `import { AsyncSelect, ColumnsSettings, Filters } from '@10d/tend-ui/components';` |
| Direct component path | `import { ColumnsSettings } from '@10d/tend-ui/components/ColumnsSettings';` |
| Grid | `import { Box, Flex, Row, Col } from '@10d/tend-ui/grid';` |
| Typography | `import { Text, Title, Link } from '@10d/tend-ui/typography';` |
| Icons | `import { Add, Search } from '@10d/tend-ui/icons';` |
| Tokens | `import ... from '@10d/tend-ui/tokens';` |

## Minimal Consumer Setup Candidate

This is a candidate shape only. It is based on local Storybook configuration and static exports, not on a verified consumer build.

```tsx
import React from 'react';
import { TendUI } from '@10d/tend-ui/theme';
import { Button } from '@10d/tend-ui/primitives';

import { App } from './App';

TendUI.init();

export function AppRoot() {
  return (
    <TendUI>
      <App />
      <Button>Action</Button>
    </TendUI>
  );
}
```

Verification required later:

- the provider renders without runtime errors;
- global fonts/theme styles are applied;
- `Button` default, hover, active, focus, disabled and loading states render correctly;
- imports resolve from the consumer bundler;
- no service dependency is required for primitive UI rendering.

## Variant A: Registry Install

Target shape:

```sh
yarn add @10d/tend-ui
```

This is the preferred long-term strategy for multiple projects because it supports normal versioning, repeatable installation and team distribution.

Current blockers:

- `.yarnrc` points to unavailable internal registry;
- local packages are not built;
- publication target is not defined for this offline project;
- dependency source strategy is unresolved.

Current decision:

```text
Registry install is the target strategy, but not available now.
```

## Variant B: Local Link

Target shape after build is restored:

```sh
cd app
yarn build:main
cd packages/tend-ui/dist
yarn link
```

Consumer project:

```sh
yarn link @10d/tend-ui
```

Current blockers:

- `yarn` command is not available;
- `node_modules` is missing;
- `dist` is missing;
- build commands are blocked before TypeScript/Rollup stages.

Current decision:

```text
Local link is blocked until build output exists.
```

## Variant C: File Dependency

Possible sandbox shape:

```json
{
  "dependencies": {
    "@10d/tend-ui": "file:../DS Tend UI/app/packages/tend-ui"
  }
}
```

This is the only offline candidate because it can point at local files without registry access.

Known risks:

- `@10d/tend-ui` package entry fields point to built files such as `cjs/index.js`, while `dist` is missing;
- local workspace dependencies such as `@10d/tend-ui-primitives`, `@10d/tend-ui-theme`, `@10d/tend-ui-icons` may not resolve automatically from a consumer project;
- the consumer bundler may need to compile TypeScript source from `app/packages`;
- peer/runtime dependencies may still be missing;
- machine-specific paths are not suitable for stable team development.

Current decision:

```text
File dependency is allowed only as a future sandbox experiment and cannot be called a verified connection method yet.
```

## Variant D: Separate Registry Or Package Scope

Future target:

- build packages locally;
- choose publication target;
- decide whether package names stay under `@10d/*` or move to another scope;
- publish built artifacts;
- document consumer installation and update rules.

Current decision:

```text
This is a future distribution task after build and dependency strategy are solved.
```

## Migration Guidance For Consumer Projects

Start with low-risk UI primitives:

- `Button`
- `Input`
- `Select`
- `Checkbox`
- `Radio`
- `Tooltip`
- `Modal`
- `Grid`
- `Typography`
- `Icons`

Defer service-heavy or complex mechanics until Storybook/build diagnostics are solved:

- notifications;
- search assistant;
- API/auth flows;
- realtime;
- table/tree advanced scenarios;
- drag-and-drop column settings;
- upload with real network requests.

## Blockers

| Blocker | Effect | Next decision |
| --- | --- | --- |
| `yarn` command is not available | Build, Storybook and link flow cannot start | Decide later whether to enable/package Yarn locally without using unavailable registry. |
| `app/node_modules` is missing | Runtime and build dependencies are not present | Define local dependency strategy before build verification. |
| Internal registry is unavailable | Normal dependency install and package publication cannot be used as-is | Do not request access; document or replace unavailable dependencies. |
| `dist` output is missing | Packages cannot be consumed as built libraries | Restore build before registry/link production path. |
| Runtime imports are not verified | Public import examples are static only | Verify in Storybook or a sandbox consumer later. |

## P-07 Result

Completed:

- connection guide created;
- connection variants documented;
- recommended route documented;
- static public import contract documented;
- current blockers documented.

Not completed:

- no working consumer connection is verified;
- no package is installed into a consumer project;
- no package is built or published.

Status decision:

```text
DS-07.1 = [x]
DS-07.2 = [!]
P-07 = [!]
```

Next practical step:

```text
P-08: prepare agent context and component passports using the documented static import contract, while marking runtime imports as unverified.
```

## D-07 Connection Strategy Update

Checked on: 2026-07-05.

`D-07` updates the connection strategy after the D-branch diagnostics:

- `D-04` confirmed that key packages are not built;
- `D-05` confirmed that Storybook cannot start;
- `D-06` confirmed that Button, Input, Select, Modal and Table remain runtime unverified;
- `S-Tracker` is still a vanilla/Vite project with `src/main.js` and no React dependencies.

### Current State

| Area | Status | Effect |
| --- | --- | --- |
| Tend UI dependency graph | blocked | No reliable package install/build/runtime check. |
| Tend UI `dist` artifacts | missing | Built-package consumption is not available. |
| Storybook | blocked | No visual/runtime confirmation of components. |
| Component runtime state | unverified | Static stories exist, but interactions are not checked. |
| `S-Tracker` React layer | missing | Tend UI React components cannot render inside the current app yet. |

### Selected Route

The selected realistic route is staged, not direct.

| Stage | Goal | Status |
| --- | --- | --- |
| 1. Map dependency sources and mechanics | Identify local workspace, public npm/GitHub, corporate-only and compensation routes. | done in `docs/dependency-source-map.md` |
| 2. Prepare controlled public-only dependency restoration | Define exact command, registry boundary, allowed file changes and rollback rule. | done in `docs/public-dependency-restoration-runbook.md` |
| 3. Execute controlled public-only dependency restoration diagnostic | Create `app/node_modules` or record exact public/corporate blockers without using closed sources. | blocked: public npm access stopped with `AggregateError [EACCES]` |
| 4. Choose public dependency acquisition route under network restriction | Decide between external local install, offline public cache/package mirror, another network-enabled public-only environment and local compensation rules. | done in `docs/dependency-acquisition-and-compensation-strategy.md` |
| 5. Prepare local compensation backlog | Prioritize service mocks, tooling/config stubs, small helper replacements and complex mechanics tasks. | done in `docs/local-compensation-backlog.md` |
| 6. Choose and implement first low-risk compensation slice | Start with tooling config stubs or service auth mock boundary; avoid broad core UI rewrites. | done for `LC-03` in `docs/tooling-config-stubs.md` |
| 7. Re-run build diagnostics after LC-03 | Check whether LC-03 changes the build blocker. | blocked diagnostic in `docs/history/workflows/e08-build-after-lc03-diagnostics.md` |
| 8. Implement next low-risk compensation slice | Proceed to `LC-01` service auth mock boundary without closed corporate sources. | done in `docs/service-auth-mock-boundary.md` |
| 9. Implement next service-layer helper slice | Proceed to `LC-05` narrow query-string replacement. | done in `docs/query-string-replacement.md` |
| 10. Implement class name helper compensation | Proceed to `LC-04` class name helper. | done in `docs/classnames-helper-replacement.md` |
| 11. Implement uuid helper compensation | Scope and proceed to `LC-06` uuid helper if usage remains narrow. | done in `docs/uuid-helper-replacement.md` |
| 12. Build diagnostic checkpoint | Re-run build diagnostics after LC-04/LC-06 without installing dependencies. | blocked diagnostic in `docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md` |
| 13. Define build-runner strategy | Decide how to handle nested plain `yarn` calls in a Corepack-only local environment. | done in `docs/history/workflows/e14-build-runner-strategy.md` |
| 14. Run shimmed build diagnostic | Create temporary local `yarn.cmd` shim and re-run narrow build diagnostics. | blocked diagnostic in `docs/history/workflows/e15-shimmed-build-diagnostics.md` |
| 15. Define dependency graph/build tooling strategy | Choose approved public/offline-public route for TypeScript, Rollup, Storybook and related tooling. | done in `docs/dependency-graph-restoration-strategy.md` |
| 16. Prepare public-only dependency restore runbook | Define exact command, registry boundary, allowed changes, stop conditions and verification. | done in `docs/public-only-dependency-restore-executable-runbook.md` |
| 17. Execute dependency restore attempt | Run public-only restore in an allowed environment or record execution blocker. | blocked execution recorded in `docs/history/workflows/e18-public-restore-attempt.md` |
| 18. Build offline-public package manifest | Generate exact public/local/compensation package list from local files. | done in `docs/offline-public-dependency-package-manifest.md` |
| 19. Choose restore execution route | Decide between public-enabled install, offline-public package archive, or targeted compensation lane. | done in `docs/restore-execution-route-decision.md` |
| 20. Prepare offline-public acquisition plan | Split required packages by priority, source type and compensation allowance. | done in `docs/offline-public-package-acquisition-plan.md` |
| 21. Prepare archive manifest/import runbook | Define archive manifest schema, staging folder and validation boundary. | done in `docs/offline-public-archive-manifest-template.md` and `docs/offline-public-import-staging-runbook.md` |
| 22. Validate reviewed offline-public archive | Place archive in staging, verify provenance/checksums, create validation report. | blocked in `docs/offline-public-archive-validation-report.md`; archive input absent |
| 23. Provide/create reviewed archive | Put archive, manifest and checksum file into staging inbox, then rerun validation. | blocked in `docs/offline-public-archive-preparation-request.md`; archive input absent |
| 24. Choose local compensation lane | Continue with a narrow local compensation lane while archive route waits for input. | done in `docs/local-compensation-lane-decision.md` |
| 25. Audit lodash helper usage | Produce helper-by-helper audit before implementing local lodash compensation. | done in `docs/lodash-helper-audit.md` |
| 26. Implement `LC-07A` lodash object helpers | Add the first narrow local lodash helper slice without touching high-risk helpers. | done in `docs/lodash-lc07a-helper-replacement.md` |
| 27. Implement `LC-07B` lodash collection helpers | Add the next local lodash helper slice for deterministic collection transforms. | done in `docs/lodash-lc07b-helper-replacement.md` |
| 28. Implement `LC-07C` lodash object filtering helpers | Add the next local lodash helper slice for preset/table filtering helpers. | done in `docs/lodash-lc07c-helper-replacement.md` |
| 29. Re-run Storybook diagnostics | Re-check Storybook status after local compensation progress. | blocked diagnostic in `docs/history/workflows/e30-storybook-after-lodash-diagnostics.md` |
| 30. Define complex runtime mechanic tasks | Decide which runtime mechanics remain as explicit future tasks. | done in `docs/complex-runtime-mechanics-tasks.md` |
| 31. Run isolated React consumer smoke test | Verify import/render outside Storybook if dependency graph and build output are available. | blocked diagnostic in `docs/history/workflows/e32-isolated-react-consumer-smoke-check.md` |
| 26. Restore or compensate dependencies | Use local workspaces, public sources, stubs, mocks, helper replacements or component-level implementations. | blocked until stage 23 or scoped by stage 25 |
| 27. Build Tend UI packages | Produce `dist` for tokens, theme, icons, primitives and main package. | blocked until stage 26 |
| 28. Open Storybook | Verify component stories and required states. | blocked until stage 26 |
| 29. Create isolated React sandbox consumer | Test `TendUI` provider and one simple component without touching `S-Tracker`. | future recommended first consumer test |
| 30. Prepare `S-Tracker` React adapter layer | Add a controlled React island/adapter only after package and sandbox checks. | future task |
| 31. Migrate product UI gradually | Replace components by passport and recipe, starting from Button/Input. | future task |

### Rejected For Now

| Option | Reason |
| --- | --- |
| Direct registry install into `S-Tracker` | No usable registry/package build is available. |
| Direct `file:` dependency from `S-Tracker` to Tend UI source | Package entry fields and workspace dependencies are not verified; `dist` is missing. |
| `yarn link` | Requires built packages and working dependency graph. |
| Copying Tend UI source into `S-Tracker/src` | Breaks repository/library boundary and does not solve dependencies. |
| Adding React adapter directly to `S-Tracker` now | Candidate app lacks React dependencies and Tend UI package is not verified. |

### D-07 Decision

`D-07` is complete as a strategy step.

The project should not attempt direct S-Tracker integration yet. The next practical connection check should be a separate React sandbox after dependency graph and build blockers are addressed.

After `E-32`, this remains unchanged: the React sandbox smoke test is still blocked because `app/node_modules`, React/ReactDOM and Tend UI `dist` outputs are absent.

After `F-01`, the connection route is:

```text
Git readiness -> dependency graph -> package build -> Storybook -> isolated React sandbox -> S-Tracker adapter.
```

No direct consumer connection should be attempted before build output and isolated React render are verified.

After `F-03`, the dependency graph route is selected but not executed:

```text
reviewed offline-public archive/cache -> validate in staging -> import only if validation passes
```

Until `F-04` succeeds, package connection remains unverified.

After `F-04`, package connection is still blocked because the reviewed offline-public archive input is absent and `app/node_modules` was not restored.

After `F-04A`, archive input exists, but package connection remains blocked until `F-04B` validates the archive and a later restore/import creates a usable dependency graph.

After `F-04B`, package connection is still blocked because archive validation failed. The candidate archive must be repaired before dependency restore can continue.

After `F-04C`, the archive input is repaired and validation passes, but package connection remains blocked until dependency restore creates `app/node_modules` and build/runtime checks pass.

After `F-04D`, dependency restore has been attempted from the validated archive, but package connection remains blocked. The restore stopped on missing public transitive package `csstype@3.1.3`, and `app/node_modules` was not created. Do not treat Tend UI as connectable to another project until archive v2 restores the dependency graph and the build/smoke checks pass.

After `F-04E`, archive v2 contains the public npm lockfile closure and passes validation, but package connection remains blocked. The next required proof is restore from archive v2, followed by package build and consumer smoke checks.

After `F-04F`, package connection remains blocked. The public dependency archive is sufficient for the next attempt, but local `@10d/*` workspace dependency ranges must be aligned before `app/node_modules`, package build and consumer smoke checks can be verified.

After `F-04G`, `app/node_modules` exists and the dependency graph is restored enough to continue verification. Package connection remains unverified until build outputs exist and a consumer smoke check passes.

`D-08` can proceed only as a blocked minimal-connection diagnostic in the current environment.

## D-08 Minimal Connection Diagnostic

Checked on: 2026-07-05.

`D-08` confirms that the minimal consumer render cannot be executed in the current environment.

Diagnostic details are recorded in:

```text
docs/minimal-connection-check.md
```

### Result

| Check | Status |
| --- | --- |
| Static import target exists in documentation | yes |
| Built `@10d/tend-ui` package | missing |
| Built theme/primitives artifacts | missing |
| Tend UI dependency graph | missing |
| Storybook runtime verification | blocked |
| Candidate React render environment | missing |
| Minimal smoke render | not executed |

### D-08 Decision

Do not claim verified consumer connection yet.

The connection guide remains a map of candidate routes and static contracts, not proof that Tend UI can currently be consumed by another project.

## E-11 Connection Impact

`E-11` does not make Tend UI consumable yet, but it reduces one helper dependency blocker.

Result:

```text
classnames is now a local workspace package.
```

Connection status remains unchanged:

```text
No verified package connection until dependency graph, build output and runtime smoke test are available.

## F-05 Connection Impact

`F-05` confirms that package connection is closer, but still not verified.

Improved:

- `app/node_modules` exists;
- build scripts can execute with temporary local build-runner shims;
- `@10d/tend-ui-tokens` now has `dist`.

Still blocking package connection:

- `@10d/tend-ui` main package does not build;
- `@10d/tend-ui-theme`, `@10d/tend-ui-icons` and `@10d/tend-ui-primitives` do not build;
- public imports remain runtime-unverified;
- Storybook has not been rechecked after build graph repair.

Connection decision:

```text
Do not connect Tend UI to S-Tracker or another consumer project yet.
```

Next connection prerequisite:

```text
F-05A: repair local build graph blockers, then rerun package build verification.
```

## F-05A Connection Impact

`F-05A` makes Tend UI closer to a connectable package, but connection is still not verified.

Improved:

- `@10d/tend-ui` main package has `dist`;
- key packages `tokens`, `theme`, `icons` and `primitives` have `dist`;
- foundational packages `utils`, `types`, `hooks` and `styling` have `dist`;
- local lodash subpath blockers are compensated.

Still blocking verified package connection:

- Storybook has not been opened after the build fix;
- no isolated consumer render has been executed;
- package publication and registry route are not configured.

Connection decision:

```text
Do not connect Tend UI to S-Tracker yet.
```

Next prerequisite:

```text
F-06: run Storybook verification.
```
```

## E-29 Connection Impact

`E-29` extends the local partial `lodash` workspace package, but Tend UI is still not consumable as a verified package.

Result:

```text
docs/lodash-lc07c-helper-replacement.md
```

Covered helpers:

```text
pickBy, omitBy, isEmpty, uniqBy
```

Connection status remains unchanged:

```text
No verified package connection until dependency graph, build output and runtime smoke test are available.
```

## F-15 Release Bundle Connection Update

The validated package wave can now be generated as a registry-neutral payload:

```powershell
Set-Location app
corepack yarn release:create-bundle
```

The generated bundle contains the fifteen public Tend UI tarballs, publication order, external dependency requirements and checksums. It intentionally excludes local helper compensations and does not embed a registry.

Important distinction:

- use `release:rehearse-tarballs` for the full registry-free consumer proof with the reviewed offline mirror;
- use `release:create-bundle` to prepare artifacts for a future selected public registry;
- do not expect the F-15 bundle alone to replace all public upstream dependencies.

After publication, a clean consumer should install the root package together with React 17, ReactDOM 17, react-is 17 and styled-components 5 from the selected public registry. That route is not marked verified until the registry and package scope are selected and an actual clean install passes.

Next group: `F-16`, public registry and package-scope strategy without upload.

## F-16 Registry Selection Update

Preferred package route:

```text
GitHub: source repository and release archive
npmjs: public package registry
```

npmjs is selected because the intended consumers are multiple independent projects and public npm packages do not require GitHub package authentication. GitHub Packages remains a fallback that requires a controlled GitHub namespace and authentication.

Current package imports remain `@10d/*`. They may be published under that scope only after npm ownership/write permission is confirmed. If the scope is not controlled, all fifteen package names and internal imports must migrate together to a controlled scope before a real registry connection can be tested.

Credential-free policy check:

```powershell
Set-Location app
corepack yarn release:validate-target
```

This command validates the selected blocked policy; it does not authenticate or publish.

Source: `app/publication-target.json`. Detailed decision: `docs/history/workflows/f16-public-registry-and-scope-strategy.md`.

## F-14 Consumer Contract Update

The registry-free tarball route is now verified without actionable package-consumer warnings.

Direct consumer dependencies:

```json
{
  "@10d/tend-ui": "<published version or validated local tarball>",
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-is": "^17.0.2",
  "styled-components": "^5"
}
```

For the local offline rehearsal, internal `@10d/*` packages and public upstream dependencies are supplied by exact local resolutions. In a real public-registry installation they must resolve normally from that registry.

Do not publish the local compensation workspaces under the public package names `classnames`, `lodash`, `uuid`, `@types/lodash` or `@types/uuid`. They remain private verification aids. The authoritative boundary is `app/release-boundary.json`.

Verified local command:

```powershell
Set-Location app
corepack yarn release:rehearse-tarballs
```

Result: 15 Tend UI tarballs, 3 offline runtime compensation tarballs, offline install, Vite build and provider/Button DOM smoke all pass. Registry installation remains a later environment-specific verification.

## E-28 Connection Impact

`E-28` extends the local partial `lodash` workspace package, but Tend UI is still not consumable as a verified package.

Result:

```text
docs/lodash-lc07b-helper-replacement.md
```

Covered helpers:

```text
chunk, uniq, groupBy, mapValues
```

Connection status remains unchanged:

```text
No verified package connection until dependency graph, build output and runtime smoke test are available.
```

## E-27 Connection Impact

`E-27` adds a local partial `lodash` workspace package, but Tend UI is still not consumable as a verified package.

Result:

```text
app/packages/lodash/
app/packages/types-lodash/
docs/lodash-lc07a-helper-replacement.md
```

Covered helpers:

```text
omit, pick, identity, isNil, isString
```

Connection status remains unchanged:

```text
No verified package connection until dependency graph, build output and runtime smoke test are available.
```

## E-26 Connection Impact

`E-26` does not make Tend UI consumable yet, but it prepares the next local compensation step.

Result:

```text
docs/lodash-helper-audit.md
```

Next local compensation slice:

```text
LC-07A: omit, pick, identity, isNil, isString
```

Connection status remains unchanged:

```text
No verified package connection until dependency graph, build output and runtime smoke test are available.
```

## E-17 Connection Impact

`E-17` does not make Tend UI consumable yet, but it defines the executable restore procedure required before package connection can be verified.

Result:

```text
Public-only dependency restore runbook is ready.
```

Connection status remains unchanged:

```text
No verified package connection until dependency graph, build output and runtime smoke test are available.
```

## E-16 Connection Impact

`E-16` does not make Tend UI consumable yet, but it defines the only acceptable route for foundational dependencies.

Result:

```text
Restore dependency graph and build tooling through public/offline-public sources; do not fake tsc, Rollup, Storybook, React or styled-components.
```

Connection status remains unchanged:

```text
No verified package connection until dependency graph, build output and runtime smoke test are available.
```

## E-13 Connection Impact

`E-13` confirms that Tend UI is still not consumable as a package.

Result:

```text
Build remains blocked by nested plain yarn calls and missing app/node_modules.
```

Connection status remains unchanged:

```text
No verified package connection until build output and runtime smoke test are available.
```

## F-22 Real Candidate Connection

S-Tracker now proves the product-level connection route:

- local `file:vendor/tend-ui/*.tgz` references cover all fifteen `@10d/*` packages;
- open-source transitive dependencies resolve only from public npmjs;
- an isolated React adapter mounts `TendUI + Button` without converting the vanilla application shell;
- production build, static boundary verification and browser runtime checks pass.

This supersedes the old candidate-project blocker. Registry publication is optional for future distribution and is not required for the verified local integration.

## F-13 Tarball Connection Update

`F-13` adds the first verified installation route that does not depend on workspace aliases or a registry.

Passed:

- fifteen Tend UI release artifacts packed as `.tgz` files;
- five local helper compensation artifacts packed separately;
- isolated Yarn installation completed with `--offline`;
- consumer imports `@10d/tend-ui/theme`, `@10d/tend-ui/primitives/Button` and `@10d/tend-ui-logos/SMaterials` from installed packages;
- Vite production build passed with `708` transformed modules;
- DOM smoke rendered the provider, Button and logo.

Reusable command:

```powershell
Set-Location app
corepack yarn release:rehearse-tarballs
```

This proves the local tarball route. It does not yet prove installation from npm or GitHub Packages, and it does not resolve how private local helper compensations should be distributed in a public release.

Next connection step:

```text
F-14: resolve package-consumer warnings and define the distributable compensation boundary before registry publication.
```

## E-15 Connection Impact

`E-15` confirms that the build runner shim works, but Tend UI is still not consumable as a package.

Result:

```text
Build now reaches tsc, then stops because build tooling is missing.
```

Connection status remains unchanged:

```text
No verified package connection until dependency graph, build output and runtime smoke test are available.
```

## E-14 Connection Impact

`E-14` does not make Tend UI consumable yet, but it defines the next local build diagnostic route.

Result:

```text
Use a temporary local yarn.cmd shim for the next diagnostic shell.
```

Connection status remains unchanged:

```text
No verified package connection until build output and runtime smoke test are available.
```

## E-12 Connection Impact

`E-12` does not make Tend UI consumable yet, but it reduces another helper dependency blocker.

Result:

```text
uuid and @types/uuid are now local workspace packages.
```

Connection status remains unchanged:

```text
No verified package connection until dependency graph, build output and runtime smoke test are available.
```
