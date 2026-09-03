# E-21: Offline-Public Package Acquisition Plan

Date: 2026-07-06

## Purpose

Prepare the package acquisition plan for the selected `E-20` route:

```text
offline-public package archive/cache with provenance
```

This step does not install dependencies, build packages, launch Storybook, run Docker, publish packages, edit source code or access any external registry.

## Inputs

| Input | Source |
| --- | --- |
| Direct dependency manifest | `docs/offline-public-dependency-package-manifest.md` |
| Route decision | `docs/restore-execution-route-decision.md` |
| Offline cache checklist | `docs/offline-public-package-cache-checklist.md` |
| Public-only runbook | `docs/public-only-dependency-restore-executable-runbook.md` |

## Current Status

| Area | Status |
| --- | --- |
| `app/node_modules` | absent |
| `app/packages/tend-ui/dist` | absent |
| Storybook binary | absent |
| Direct dependencies identified | 118 |
| Local workspace/local compensation dependencies | 32 |
| External public/offline-public candidates | 86 |
| Current lockfile URLs | closed corporate registry only |

## Acquisition Rules

Allowed source types:

- public npm package tarballs;
- public GitHub releases or source archives when the package is publicly distributed that way;
- package cache/archive prepared in a separate public-enabled environment;
- local workspace packages already present under `app/packages`;
- local compensation packages already created in this project.

Forbidden source types:

- internal registry;
- corporate GitLab;
- Nexus;
- Figma;
- CI/CD artifacts;
- private service infrastructure;
- unverified `node_modules` copy;
- package archive without provenance.

Protected files:

- `app/package.json`;
- `app/yarn.lock`;
- `app/.yarnrc`;
- component source files;
- Storybook config;
- generated `dist` output.

## Required Archive Manifest Format

Any offline-public archive must include a manifest with these fields:

| Field | Required | Meaning |
| --- | --- | --- |
| package | yes | Package name. |
| requestedSpec | yes | Spec from local `package.json`. |
| resolvedVersion | yes | Exact version included in the archive. |
| sourceType | yes | `public npm`, `public GitHub`, `local workspace`, `local compensation`, or `deferred`. |
| sourceUrl | yes for public packages | URL used to acquire the package. |
| archivePath | yes | Path/name inside the offline archive. |
| integrityOrChecksum | yes | Integrity from public source or checksum computed for archive. |
| license | preferred | License if known from package metadata. |
| priorityLane | yes | Lane from this plan. |
| compensationAllowed | yes | `yes`, `no`, or `separate task only`. |

## Priority Lanes

### Lane 1. Build Tooling Minimum

Goal: make package build commands reach real TypeScript/Rollup tooling instead of failing on missing `tsc`.

Compensation rule: no fake stubs.

| Package | Requested spec | Source type | Compensation |
| --- | --- | --- | --- |
| `typescript` | `^5.5.2` | public/offline-public | no |
| `tsc-alias` | `^1.8.16` | public/offline-public | no |
| `rollup` | `^4.52.5` | public/offline-public | no |
| `@rollup/plugin-commonjs` | `^28.0.9` | public/offline-public | no |
| `@rollup/plugin-node-resolve` | `^16.0.3` | public/offline-public | no |
| `@rollup/plugin-typescript` | `^12.3.0` | public/offline-public | no |
| `rollup-plugin-copy` | `^3.5.0` | public/offline-public | no |
| `rollup-plugin-dts` | `^6.2.3` | public/offline-public | no |
| `rollup-plugin-import-css` | `^4.1.0` | public/offline-public | no |
| `rollup-plugin-postcss` | `^4.0.2` | public/offline-public | no |
| `turbo` | `^2.5.8` | public/offline-public | no |

### Lane 2. Storybook And Vite Runtime

Goal: make `corepack yarn storybook` reach the real Storybook binary and Vite React builder.

Compensation rule: no fake Storybook.

| Package | Requested spec | Source type | Compensation |
| --- | --- | --- | --- |
| `storybook` | `^10.1.10` | public/offline-public | no |
| `@storybook/react-vite` | `^10.1.11` | public/offline-public | no |
| `@storybook/addon-docs` | `^10.0.1` | public/offline-public | no |
| `@storybook/addon-designs` | `^11.0.1` | public/offline-public | no |
| `vite` | `^7.1.12` | public/offline-public | no |
| `@vitejs/plugin-react` | `^5.1.0` | public/offline-public | no |
| `vite-plugin-markdown` | `^2.2.0` | public/offline-public | defer if Storybook does not require it |

### Lane 3. Foundational React Runtime

Goal: make components render with the same major runtime contract declared by local packages.

Compensation rule: no fake React/styled-components.

| Package | Requested spec | Used by packages | Source type | Compensation |
| --- | --- | ---: | --- | --- |
| `react` | `^17.0.2` | 25 | public/offline-public | no |
| `react-dom` | `^17.0.2` | 20 | public/offline-public | no |
| `styled-components` | `>=5`, `^5` | 20 | public/offline-public | no |

### Lane 4. Type Packages Needed For Build

Goal: reduce TypeScript failures after Lane 1-3 are available.

| Package | Requested spec | Source type | Compensation |
| --- | --- | --- | --- |
| `@types/react` | `^17.0.2` | public/offline-public | no |
| `@types/react-dom` | `^17.0.2` | public/offline-public | no |
| `@types/styled-components` | `^5` | public/offline-public | no |
| `@types/lodash` | `^4` | public/offline-public | yes only with lodash compensation |
| `@types/path-to-regexp` | `^1.7.0` | public/offline-public | defer if not in build path |
| `@types/react-helmet` | `^6.1.11` | public/offline-public | defer if favicons/header excluded |
| `@types/use-sync-external-store` | `^0.0.6` | public/offline-public | defer if form package excluded |

### Lane 5. Complex UI Mechanics

Goal: restore actual behavior for table/tree/drag/drop/drawer/virtualization.

Compensation rule: separate task only. Do not rewrite these broadly without component-level verification criteria.

| Package | Requested spec | Mechanic | Compensation |
| --- | --- | --- | --- |
| `antd-core` | `npm:antd@5.12.5` | Ant Design primitives and interaction behavior | separate task only |
| `@dnd-kit/core` | `^6` | drag-and-drop foundation | separate task only |
| `@dnd-kit/sortable` | `^8` | sorting mechanics | separate task only |
| `@dnd-kit/utilities` | `^3` | dnd transforms/utilities | separate task only |
| `@tanstack/react-query` | `^4.36.1` | async query state | separate task only |
| `@tanstack/react-table` | `^8` | table model | separate task only |
| `@tanstack/react-virtual` | `^3` | virtualization | separate task only |
| `rc-drawer` | `~6.5.2` | drawer mechanics | separate task only |
| `rc-overflow` | `^1.3.1` | overflow measurement | separate task only |

### Lane 6. Runtime Utilities And Service Support

Goal: support non-core runtime behavior after the first build/Storybook path is available.

| Package | Requested spec | Route | Compensation |
| --- | --- | --- | --- |
| `axios` | `^1.13.1` | public/offline-public | mock only for service stories |
| `dayjs` | `^1.11.1` | public/offline-public | no unless exact usage is tiny |
| `lodash` | `^4` | public/offline-public preferred | yes, helper-by-helper only |
| `js-sha1` | `^0.7.0` | public/offline-public | yes if exact hash usage is known |
| `react-helmet` | `^6.1.0` | public/offline-public | defer if favicons/header excluded |
| `zustand` | `^4.4.7`, `^4.5.2` | public/offline-public | separate task only |
| `storeon` | `^3.1.5` | public/offline-public | separate task only |
| `use-sync-external-store` | `^1.4.0` | public/offline-public | no if required by state packages |
| `centrifuge` | `^5.1.1` | public/offline-public or disabled service flow | yes, mock/disable realtime |

### Lane 7. Dev/Test/Release Tooling

Goal: support tests, release scripts and auxiliary local development after runtime/build is unblocked.

These are lower priority for first Storybook/build verification:

```text
@commitlint/cli
@commitlint/config-conventional
@faker-js/faker
@react-docgen/cli
@release-it/conventional-changelog
@testing-library/jest-dom
@testing-library/react
@testing-library/react-hooks
autoprefixer
eslint-import-resolver-typescript
eslint-plugin-import
express
http-proxy-middleware
husky
identity-obj-proxy
jest
jest-environment-jsdom
jest-styled-components
nock
nodemon
png-to-ico
react-docgen
react-router-dom
react-test-renderer
release-it
sharp
typed-css-modules
vite-bundle-visualizer
yarn-deduplicate
```

## Already Local Or Compensated

These packages should not be acquired from external sources in the current route:

```text
@rovna-ui/components-*
@rovna-ui/eslint-config
@rovna-ui/prettier-config
classnames
query-string
samolet-oauth2
uuid
@types/uuid
```

## Recommended Acquisition Order

1. Prepare Lane 1, Lane 2, Lane 3 and the minimum Lane 4 type packages first.
2. Import into a staging/cache folder, not directly over the project.
3. Verify archive manifest, checksums and source provenance.
4. Only after review, run an explicit restore/import step.
5. Run a narrow build diagnostic before Storybook.
6. Run Storybook only after the build tooling and runtime packages are visible.
7. Add Lane 5 packages before visual verification of table/tree/dnd/virtualized scenarios.
8. Add Lane 6 and Lane 7 as needed by the next observed blocker.

## Stop Conditions

Stop before import if:

- a package source points to `packages.samoletgroup.ru`;
- a package source requires closed corporate access;
- archive provenance is missing;
- checksums are missing;
- package versions do not match requested specs or recorded decision;
- the archive would overwrite protected files;
- the archive contains an unreviewed `node_modules` tree.

## E-21 Decision

`E-21` is complete as an acquisition planning step.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

Do not rerun build or Storybook until dependencies are restored or an approved subset is imported.
