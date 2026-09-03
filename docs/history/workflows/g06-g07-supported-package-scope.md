# G-06 + G-07: Supported Package Scope

Updated: 2026-07-29.

## Status

- `G-06`: `[x]` all 29 public `@10d/tend-ui*` packages are classified.
- `G-07`: `[x]` all 21 supported packages pass fresh build and artifact validation.
- S-Tracker and other external projects were not used.
- Network installation and closed corporate sources were not used.

The executable source of truth is `app/ds-package-scope.json`.

## Scope Summary

| Classification | Count | Build contract |
| --- | ---: | --- |
| `core` | 15 | Built, validated and present in the existing release chain. |
| `extended` | 6 | Built and validated locally; G-11 intentionally kept them outside the current 15-package public release boundary. |
| `experimental/source-only` | 7 | Available to Storybook from source; not a supported package artifact. |
| `excluded` | 1 | Outside the current runtime package contract. |

## Core Packages

1. `@10d/tend-ui-factories`
2. `@10d/tend-ui-tokens`
3. `@10d/tend-ui-types`
4. `@10d/tend-ui-utils`
5. `@10d/tend-ui-hooks`
6. `@10d/tend-ui-locale`
7. `@10d/tend-ui-styling`
8. `@10d/tend-ui-api`
9. `@10d/tend-ui-theme`
10. `@10d/tend-ui-grid`
11. `@10d/tend-ui-icons`
12. `@10d/tend-ui-logos`
13. `@10d/tend-ui-typography`
14. `@10d/tend-ui-primitives`
15. `@10d/tend-ui`

## Extended Packages

| Package | Reason |
| --- | --- |
| `@10d/tend-ui-base` | Base inputs/buttons required by Upload. |
| `@10d/tend-ui-favicons` | Self-contained favicon helper. |
| `@10d/tend-ui-fonts` | Shared font declarations for optional feature packages. |
| `@10d/tend-ui-form` | Reusable form state and field layer. |
| `@10d/tend-ui-upload` | Reusable upload UI with its base/core dependency closure. |
| `@10d/tend-ui-header` | Product header built on core, Form and Upload. |

## Experimental Or Source-only Packages

| Package | Reason |
| --- | --- |
| `@10d/tend-ui-ai-chat` | Feature package with query/store integrations and no verified artifact. |
| `@10d/tend-ui-columns-settings` | Standalone DnD package is not yet in the supported artifact chain. The equivalent root-package components remain visible in Storybook. |
| `@10d/tend-ui-filters` | Standalone package is not yet in the supported artifact chain. The root package retains its current filters API. |
| `@10d/tend-ui-notifications` | Service feature depends on auth, realtime and query infrastructure. |
| `@10d/tend-ui-search-assistant` | Service feature depends on auth-shaped API flows and state services. |
| `@10d/tend-ui-table` | Standalone package depends on source-only Filters and Columns Settings. |
| `@10d/tend-ui-tree` | Complex tree/table/DnD package needs a dedicated runtime and artifact gate. |

`@10d/tend-ui-assets` is excluded because it is an asset-generation workspace without JavaScript runtime entrypoints or public exports.

## Build And Artifact Gate

From `app/`:

```powershell
node scripts/run-supported-package-gate.js
```

Fast artifact-only recheck:

```powershell
node scripts/run-supported-package-gate.js --check-only
```

Equivalent package scripts:

```powershell
corepack yarn packages:scope:build
corepack yarn packages:scope:check
```

The gate performs the following checks:

1. scope contains every public `@10d/tend-ui*` package exactly once;
2. supported internal dependencies remain inside the selected scope;
3. packages build in dependency order with network installation disabled;
4. `dist/package.json` matches package name and version;
5. root ESM, CJS and TypeScript entrypoints exist;
6. conditional exports resolve to generated files;
7. type-only subpaths expose declarations without inventing JavaScript entrypoints.

## Windows Packaging Compensation

The original package scripts used Unix `cp`, so compilation succeeded on Windows but metadata copy failed. Supported packages now call:

```text
node ../../scripts/copy-package-metadata.js
```

The helper copies metadata and generates built conditional exports from the source export map. It preserves ESM, CJS and declaration contracts and supports declaration-only subpaths.

## Verification Result

Full fresh build:

- selected packages: `21`;
- passed after final validation: `21`;
- failed: `0`;
- external installation: disabled;
- unresolved internal dependencies outside supported scope: `0`.

The first validation correctly exposed declaration-only exports in `@10d/tend-ui-types` and `@10d/tend-ui-theme`. The helper and gate were corrected, those two packages were rebuilt, and all 21 artifacts then passed.

Machine-readable report: `tmp/g07-supported-package-gate.json`.

Full build log: `tmp/g07-supported-package-build.log`.

## Non-blocking Warnings

Several Rollup builds report that sourcemaps are not enabled, and type-only modules may produce empty runtime chunks. These warnings do not affect build exit codes, runtime entrypoints or declaration exports.

## Release Boundary

G-07 validates local package artifacts but does not silently publish or alter the existing 15-package release bundle. G-11/G-12 later passed the offline consumer rehearsal and intentionally retained the 15-package public boundary; the six extended artifacts require a separate explicit publication decision.

## Next Group

```text
G-08 + G-09: build component-to-story coverage and verify key component runtime/interaction states.
```
