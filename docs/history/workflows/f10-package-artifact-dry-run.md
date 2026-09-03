# F-10 Package Artifact Dry-Run And Publication Readiness

## Purpose

`F-10` checks what would be included in the `@10d/tend-ui` package and whether its local internal dependency chain is ready for publication.

This is a local dry-run only. No tarball was retained, no package was published, no dependency was installed, and no closed corporate source was contacted.

## Commands

The main artifact was checked from `app/packages/tend-ui/dist`:

```powershell
npm.cmd pack --dry-run --json
```

The internal dependency artifacts were checked with scripts disabled:

```powershell
npm.cmd pack --ignore-scripts --dry-run --json
```

The first sandbox attempt could not write to the system npm cache. The same local-only command was repeated outside the filesystem sandbox. This was an environment permission issue, not a package error.

## Main Package Result

| Item | Result |
| --- | --- |
| Package | `@10d/tend-ui@4.82.0` |
| Dry-run | Passed |
| Candidate filename | `10d-tend-ui-4.82.0.tgz` |
| Packed size | `383358` bytes |
| Unpacked size | `2014122` bytes |
| Files | `5507` |
| Root ESM entry | `index.js` present |
| Root CommonJS entry | `cjs/index.js` present |
| Root types entry | `index.d.ts` present |
| Export entries | `40` |
| Runtime dependencies | `27`: `14` internal `@10d/*`, `13` public |
| Peer dependencies | `react`, `react-dom` |

Package hygiene checks:

- no `src/` files are included;
- no `node_modules/` files are included;
- no test or story files are included;
- no source maps are included;
- dry-run did not leave a `.tgz` file in `dist`.

The main package artifact is structurally valid for local packaging.

## Internal Package Chain

The main package declares fourteen internal runtime dependencies. Local source exists for all fourteen.

| Package | Local version | Dry-run result | Files | Packed bytes |
| --- | ---: | --- | ---: | ---: |
| `@10d/tend-ui-api` | `2.0.0` | Passed | 79 | 7392 |
| `@10d/tend-ui-factories` | `1.2.0` | Passed | 29 | 2599 |
| `@10d/tend-ui-grid` | `0.1.1` | Passed | 63 | 5474 |
| `@10d/tend-ui-hooks` | `0.11.1` | Passed | 171 | 11844 |
| `@10d/tend-ui-icons` | `0.7.0` | Passed | 3123 | 220147 |
| `@10d/tend-ui-locale` | `1.4.6` | Passed | 43 | 4963 |
| `@10d/tend-ui-logos` | `1.17.3` | Blocked: no `dist/package.json` | - | - |
| `@10d/tend-ui-primitives` | `0.23.7` | Passed | 721 | 161045 |
| `@10d/tend-ui-styling` | `2.9.0` | Passed | 251 | 12698 |
| `@10d/tend-ui-theme` | `0.2.5` | Passed | 35 | 6281 |
| `@10d/tend-ui-tokens` | `1.1.0` | Passed | 23 | 4493 |
| `@10d/tend-ui-types` | `1.0.0` | Passed | 23 | 4699 |
| `@10d/tend-ui-typography` | `0.0.5` | Passed | 113 | 8778 |
| `@10d/tend-ui-utils` | `1.16.2` | Passed | 163 | 11604 |

Summary: `13/14` internal dependency artifacts pass a local dry-run.

## Active Blocker

`@10d/tend-ui-logos` is not optional metadata. The built Tend UI package imports it at runtime from:

```text
widgets/Layout/components/Header/components/Apps/Apps.js
widgets/Layout/components/Header/components/Apps/hooks/useApps.js
```

The `F-09` Button smoke test passed because that route does not load the Layout Apps widget. A published main package would still be incomplete for consumers using that widget until the logos package is built and distributable.

The logos source package has a declared build pipeline and a root `build:logos` command in `app/package.json`, but its `dist` output has not yet been created or checked.

## Publication Metadata Warnings

The package artifact still contains metadata inherited from the original corporate project:

- the `repository.url` points to a closed corporate Git server;
- build, test and release scripts remain in the published `package.json`;
- all required internal `@10d/*` packages must be available from the chosen public registry before consumers can install the main package.

These warnings do not invalidate the local dry-run. They must be resolved before a public npm or GitHub Packages release.

## Decision

| Boundary | Status |
| --- | --- |
| Main `@10d/tend-ui` artifact structure | Passed |
| Main package content hygiene | Passed |
| Internal package artifact chain | Blocked at `@10d/tend-ui-logos` |
| Registry/GitHub Packages publication | Not ready |
| Closed corporate access | Not used and not requested |

`F-10` is diagnostically complete with status `[!]`: the check was executed, but publication readiness is blocked by one real internal runtime package and remaining public metadata cleanup.

## Next Group

```text
F-11: build and package @10d/tend-ui-logos, then repeat the internal artifact-chain dry-run.
```

After `F-11`, the publication metadata and release order can be finalized as a separate group.

## Resolution In F-11

The missing `@10d/tend-ui-logos` artifact was built and prepared in `F-11`.

Current result:

- logos build and package dry-run pass;
- production exports for `.`, `./utils` and `./SMaterials` are valid;
- the complete main/internal artifact chain is `15/15 PASS`;
- the next remaining task is public metadata and publication-order preparation in `F-12`.

See `docs/history/workflows/f11-tend-ui-logos-artifact.md`.
