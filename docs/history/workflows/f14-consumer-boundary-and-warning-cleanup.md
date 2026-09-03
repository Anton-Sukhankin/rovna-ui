# F-14: Consumer Boundary And Warning Cleanup

Status: `[x]`

Date: 2026-07-15

## Goal

Remove actionable warnings from the isolated tarball consumer and define which packages belong to the public Tend UI release, which local packages exist only for offline verification, and which dependencies must be resolved from public upstream packages during a real publication.

No package was uploaded and no registry or closed corporate endpoint was contacted.

## Machine-Readable Boundary

The distribution policy is stored in `app/release-boundary.json` and is enforced by:

- `app/scripts/prepare-public-release.js`;
- `app/scripts/rehearse-local-tarball-install.js`.

The scripts fail when the computed public package closure differs from the policy, when an offline-only package becomes publishable, or when an unexpected consumer warning appears.

## Distribution Boundary

| Layer | Packages | Distribution rule |
| --- | --- | --- |
| Public Tend UI release | 15 packages rooted at `@10d/tend-ui` | Publish in the seven-level order defined by the release preparation script. |
| Offline runtime compensation | `classnames`, `lodash`, `uuid` | Private local artifacts used only by the registry-free rehearsal. Never publish them under these public upstream names. |
| Build-time type compensation | `@types/lodash`, `@types/uuid` | Private workspace packages. Not included in the consumer tarball layer. |
| Public upstream dependencies | React, ReactDOM, styled-components, react-is, lodash, classnames, uuid and other public dependencies | Resolve from the selected public registry during a real consumer installation. |

All five compensation packages must remain `private: true` and must not declare `publishConfig`.

## Manifest Corrections

- `@types/uuid` is a development dependency of `@10d/tend-ui`, not a runtime dependency.
- `@types/lodash` is a development dependency of `@10d/tend-ui-hooks`, not a runtime dependency.
- packages that directly use `styled-components` now declare `react-is@^17.0.2` as a runtime dependency: main, grid, icons, logos, primitives, theme and typography.
- prepared `dist/package.json` files do not contain `devDependencies`, build scripts or release tooling metadata.

## Consumer Contract

The tarball consumer installs only `@10d/tend-ui` as a direct Tend UI package. Internal Tend UI packages are supplied by resolutions during the offline rehearsal and will be resolved normally from the selected public registry after publication.

The consumer peer set used by the verified local route is:

```json
{
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-is": "^17.0.2",
  "styled-components": "^5"
}
```

## Warning Resolution

| Warning | F-14 result |
| --- | --- |
| Multiple `file:` packages trying to unpack into the same cache destination | Resolved by keeping only the main Tend UI package direct and routing the rest through one resolution path. |
| `styled-components` missing `react-is` | Resolved by the package and consumer contracts. |
| `@10d/tend-ui-styling` missing `styled-components` | Resolved by the explicit consumer peer set. |
| Babel JSX syntax plugin missing `@babel/core` | Accepted as non-runtime tooling noise inherited through styled-components; no Babel transform is used by the consumer. |
| Optional native packages excluded on Windows | Accepted platform behavior. |
| Install scripts ignored | Accepted and intentional for the offline rehearsal. |
| Vite chunk larger than 500 kB | Accepted for the all-in-one smoke; retained as a later bundle-optimization task. |

The warning gate records no actionable warnings.

## Verification

Command:

```powershell
Set-Location app
corepack yarn release:rehearse-tarballs
```

Final result:

- public release metadata check: passed, `15` packages and `0` pending changes;
- public Tend UI tarballs: `15`;
- offline runtime compensation tarballs: `3`;
- offline public mirror entries: `1560`;
- Yarn installation: passed with `--offline`;
- duplicate tarball-cache warnings: `0`;
- actionable peer warnings: `0`;
- Vite production build: passed, `709` transformed modules;
- DOM smoke: `TendUI` provider and `Button` rendered from installed `@10d/tend-ui`;
- source aliases: none;
- package upload, registry authentication and network access: not performed.

Machine-readable evidence is generated at `tmp/f13-local-tarball-rehearsal/result.json` and remains a disposable local artifact.

## Decision

`F-14` is complete with status `[x]`.

The local consumer contract is clean enough for a registry-independent release bundle. Local compensation packages are explicitly outside the public release boundary.

## Next Group

```text
F-15: create a registry-agnostic release bundle and publication manifest for the validated fifteen-package wave, without uploading it.
```

## F-15 Follow-Up

`F-15` converted the clean F-14 package boundary into a reproducible publication payload. The generated bundle contains all fifteen public Tend UI artifacts and excludes all five offline-only packages. See `docs/history/workflows/f15-registry-agnostic-release-bundle.md`.
