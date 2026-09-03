# F-09 Clean Package Entrypoints And Exports

## Purpose

`F-09` fixes the main blocker left after `F-08`: `@10d/tend-ui` could be used in a diagnostic Vite sandbox, but not as a clean built package because root entrypoints and production `exports` were incomplete.

This step stays local and offline. No registry publication, dependency installation, Docker build, GitHub push or closed corporate access was performed.

## Changes

| Area | Change |
| --- | --- |
| Root Tend UI entry | Added `app/packages/tend-ui/src/index.ts`. |
| Tokens export | Added `app/packages/tend-ui/src/tokens/index.ts` because `./tokens` was listed in source exports. |
| Built package metadata | Added `app/packages/tend-ui/scripts/prepare-package-json.js`. |
| Main package copy step | Changed `@10d/tend-ui` `copy` script to generate production `dist/package.json`. |
| Type-only exports | Build script now creates tiny runtime stubs for type-only export targets that only emit `.d.ts`. |
| Local `classnames` compensation | Added ESM entry and package `exports`. |
| Local `lodash` compensation | Added ESM helper entries and package `exports` for implemented subpath helpers. |
| Consumer example | Added `examples/consumer-clean-package/`. |

## Built Package Result

After `F-09`, `app/packages/tend-ui/dist/package.json` has:

- `main: cjs/index.js`;
- `module: index.js`;
- `types: index.d.ts`;
- root export `"."`;
- `40` export entries;
- built targets for `./theme`, `./primitives/Button`, `./tokens` and type-only `./components/ColumnsSettings/types`.

Representative existence checks passed:

| Target | Result |
| --- | --- |
| `dist/index.js` | exists |
| `dist/cjs/index.js` | exists |
| `dist/index.d.ts` | exists |
| `exports["./theme"].import` | exists |
| `exports["./primitives/Button"].import` | exists |
| `exports["./tokens"].import` | exists |

## Verification

Main package build:

```powershell
Set-Location app
$env:PATH = (Resolve-Path '..\tmp\build-runner-shim').Path + ';' + $env:PATH
corepack yarn build:main
```

Result:

- passed;
- `tsc`, `rollup`, import validator and `prepare-package-json.js` completed;
- Rollup warnings were limited to generated empty chunks and sourcemap notice.

Clean package consumer build:

```powershell
Set-Location app
corepack yarn vite build --config ../examples/consumer-clean-package/vite.config.mjs
```

Result:

- passed;
- `705` modules transformed;
- one chunk-size warning was reported;
- generated `examples/consumer-clean-package/dist` was removed after verification.

Built DOM verification:

```text
bodyTextIncludesSmokeButton: true
buttonCount: 1
text: F-09 Clean Package Button
```

## What Is Now Better Than F-07

`F-07` required explicit diagnostic aliases for many internal Tend UI subpaths, for example `@10d/tend-ui-icons/*`, `@10d/tend-ui-utils/*`, `@10d/tend-ui-locale/*` and helper shims.

`F-09` verifies a cleaner route:

- consumer imports use public `@10d/tend-ui/*` exports;
- `@10d/tend-ui` built package metadata contains production `exports`;
- local workspace packages are mapped at package level only;
- `classnames` and `lodash` local compensations expose ESM-compatible entries.

## Remaining Limit

This is still not a registry install.

The consumer example simulates installed packages by mapping local workspace package names to local built outputs. That is enough to validate package entrypoints and exports, but not enough to claim npm/GitHub Packages publication.

## Next Group

```text
F-10: package artifact dry-run and publication readiness check.
```

The next step should inspect what would actually go into a package artifact before any publication attempt.

