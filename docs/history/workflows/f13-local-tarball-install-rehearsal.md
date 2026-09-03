# F-13 Local Tarball Install Rehearsal

## Purpose

`F-13` verifies that the first Tend UI release wave can be packed in dependency-safe order and consumed by a clean React project without a registry or aliases to monorepo sources.

## Result

Status: `[x] complete`

The complete local rehearsal passed:

- public release metadata check passed with zero pending changes;
- offline-public archive v2 checksum matched;
- `15` Tend UI release packages were packed across all seven release levels;
- `5` local helper compensation packages were packed as a separate auxiliary layer;
- Yarn installed the isolated consumer with `--offline`;
- Vite production build transformed `708` modules;
- DOM smoke rendered `TendUI`, one `Button` and one `SMaterials` SVG.

No package was uploaded or downloaded during the successful run.

## Reusable Command

From `app/`:

```powershell
corepack yarn release:rehearse-tarballs
```

The command runs `app/scripts/rehearse-local-tarball-install.js`.

## Release Tarballs

The script computes the release graph from local package manifests and packs the same seven levels defined in `F-12`.

| Level | Packages |
| --- | --- |
| 0 | factories, tokens, types, utils |
| 1 | hooks, locale, styling |
| 2 | api |
| 3 | theme |
| 4 | grid, icons, logos, typography |
| 5 | primitives |
| 6 | `@10d/tend-ui` |

Result:

```text
15/15 Tend UI tarballs created
```

Generated tarballs and SHA-256 checksums are recorded in:

```text
tmp/f13-local-tarball-rehearsal/result.json
```

The generated files remain under ignored `tmp/` and are not repository source files.

## Local Compensation Layer

Archive v2 intentionally excluded packages represented by local workspaces. Static runtime-closure inspection found five such packages required by the fifteen release artifacts:

```text
@types/lodash@4.17.21
@types/uuid@10.0.0
classnames@2.5.1
lodash@4.17.21
uuid@10.0.0
```

They were packed separately from the public Tend UI release order. This is a rehearsal-only distribution layer and does not silently classify these private local helper manifests as public Tend UI packages.

## Offline Public Mirror

Input:

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-v2.zip
```

Verified checksum:

```text
aeaef96358e62c0f9078b2adac09aaaa1fa07e107a1edf963b754a0e52147c42
```

The script validates all archived package checksums and converts `1560` entries to Yarn v1 mirror filenames. Scoped packages and npm aliases such as `antd-core -> antd` are named from their public source URLs.

## Isolated Consumer

Tracked source template:

```text
examples/consumer-tarball/
```

Generated consumer:

```text
%TEMP%/ds-tend-ui-f13-isolated-consumer
```

The consumer:

- has its own `package.json`, lockfile and `node_modules`;
- installs all Tend UI artifacts from `file:` tarball references;
- has no aliases to `app/packages`, `app/node_modules` or package `dist` folders;
- obtains public dependencies only from the reviewed local mirror;
- pins `packageManager` to `yarn@1.22.15`;
- builds with `vite build --configLoader runner` to avoid a sandbox-only Windows root scan while loading Vite config.

Runtime proof:

```text
F-13 DOM smoke passed: provider, Button and SMaterials rendered.
```

## Diagnostic Attempts

Before the successful route was finalized:

- Corepack attempted to determine the latest Yarn version from public npm when the generated consumer had no `packageManager`; the sandbox blocked the request and no data was received;
- the final route uses the already cached Yarn `1.22.15` runtime directly and performs no version lookup;
- no closed corporate endpoint was requested or contacted in any attempt.

## Warnings

The successful install reports non-blocking warnings:

- Yarn warns that direct `file:` dependencies and matching `resolutions` share cache destinations;
- `styled-components` reports an unmet `react-is` peer warning;
- package-level styling reports a `styled-components` peer warning despite the main runtime dependency;
- install scripts are intentionally ignored;
- Vite reports a bundle-size warning for the `609.51 kB` JavaScript chunk.

These warnings do not invalidate the install/build/render proof, but should be reviewed before registry publication.

## Boundary

Passed:

- exact local package packing;
- dependency-safe release order execution;
- isolated offline install;
- clean package import without source aliases;
- production build;
- DOM render.

Not performed:

- package registry publication;
- authentication or secrets;
- installation from GitHub Packages or npm;
- `S-Tracker` integration;
- containerized Storybook;
- publication of additional feature packages outside the first release wave.

## Decision

`F-13` is complete with status `[x]`.

The first Tend UI release wave is locally consumable as packed artifacts without a registry.

## Next Group

```text
F-14: resolve the remaining package-consumer warnings and define the distributable boundary for local compensation packages before real registry publication.
```

## F-14 Follow-Up

`F-14` hardened this rehearsal without changing its offline boundary:

- the consumer compensation layer was reduced from five packages to three runtime helpers;
- `@types/lodash` and `@types/uuid` are now build-only and are not packed for consumers;
- direct/resolution cache collisions were removed;
- required `styled-components` and `react-is` contracts were made explicit;
- the warning gate reports zero actionable warnings;
- the final build passes with `709` transformed modules and the provider/Button DOM smoke passes.

Current evidence: `docs/history/workflows/f14-consumer-boundary-and-warning-cleanup.md`.
