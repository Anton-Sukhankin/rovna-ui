# F-11 Tend UI Logos Artifact And Internal Package Chain

## Purpose

`F-11` closes the package artifact blocker found in `F-10`: `@10d/tend-ui-logos` was imported by the built main package but had no distributable `dist` output.

The work stays local. No dependency installation, network access, package publication or closed corporate source was used.

## Build

The package was built from `app/` with the existing local build-runner shim:

```powershell
$env:PATH = (Resolve-Path '..\tmp\build-runner-shim').Path + ';' + $env:PATH
corepack yarn build:logos
```

Result:

- TypeScript declarations for ESM and CommonJS passed;
- Rollup ESM and CommonJS builds passed;
- build validation passed;
- `app/packages/tend-ui-logos/dist` was created;
- Rollup reported only its existing sourcemap configuration warning.

## Package Metadata Fix

The original `copy` script deleted `exports` from the built `package.json`. That would have removed the documented public subpaths after publication.

Changed:

- `app/packages/tend-ui-logos/package.json` now runs `scripts/prepare-package-json.js`;
- the new script converts source exports to built ESM, CommonJS and type targets;
- the script validates that every target exists before writing `dist/package.json`.

Verified production exports:

| Export | Types | ESM | CommonJS |
| --- | --- | --- | --- |
| `.` | `index.d.ts` | `index.js` | `cjs/index.js` |
| `./utils` | `utils/index.d.ts` | `utils/index.js` | `cjs/utils/index.js` |
| `./SMaterials` | `SMaterials/index.d.ts` | `SMaterials/index.js` | `cjs/SMaterials/index.js` |

All nine targets exist.

## Logos Artifact Result

| Item | Result |
| --- | --- |
| Package | `@10d/tend-ui-logos@1.17.3` |
| Dry-run | Passed |
| Files | `661` |
| Packed size | `76067` bytes |
| Unpacked size | `498384` bytes |
| Root ESM/CommonJS/types | Present |
| Production exports | 3, all valid |

No `.tgz` file was retained.

## Full Internal Artifact Chain

The main package and all fourteen declared internal package dependencies were checked with:

```powershell
npm.cmd pack --ignore-scripts --dry-run --json
```

Final result:

```text
15/15 PASS
```

This includes:

- `@10d/tend-ui@4.82.0`;
- all fourteen declared internal `@10d/tend-ui-*` dependency artifacts;
- the newly built `@10d/tend-ui-logos@1.17.3` artifact.

## Consumer Runtime Verification

The existing `examples/consumer-clean-package` route was extended to resolve the built logos package and render:

```tsx
import { SMaterials } from '@10d/tend-ui-logos/SMaterials';
```

The Vite production build passed with `708` transformed modules. The existing chunk-size warning remains non-blocking.

Built DOM verification:

```text
buttonCount: 1
logoCount: 1
logoSvgCount: 1
bodyTextIncludesSmokeButton: true
```

Generated example `dist` output was removed after verification.

## Decision

| Boundary | Status |
| --- | --- |
| `@10d/tend-ui-logos` build | Passed |
| Logos production exports | Passed |
| Logos package dry-run | Passed |
| Full main/internal artifact chain | Passed: `15/15` |
| Clean consumer logo render | Passed |
| Registry/GitHub Packages publication | Not performed |

`F-11` is complete with status `[x]`.

## Next Group

```text
F-12: sanitize public package metadata and define the internal package publication order.
```

This next step should replace closed corporate repository metadata, decide which scripts belong in published manifests, and produce an explicit dependency-safe release order without publishing anything yet.

## Resolution In F-12

`F-12` completed public metadata preparation and defined a seven-level dependency-safe publication order.

The complete artifact chain still passes `15/15` after cleanup. See `docs/history/workflows/f12-public-metadata-and-release-order.md`.
