# H-D: Extended Release Bundle

Updated: 2026-07-30.

## Result

- `H-07`: passed.
- Supported artifacts: `21/21`.
- Public release tarballs: `21` in `9` dependency levels.
- Offline compensation tarballs: `3` (`classnames`, `lodash`, `uuid`).
- Isolated Yarn install: passed without registry access.
- Isolated Vite consumer build: passed.
- Consumer DOM smoke: passed with `TendUI` and `Button` rendered from `@10d/tend-ui`.
- Publication performed: no.
- Registry contacted: no.

## Extended Packages Added

| Package | Release level |
| --- | ---: |
| `@10d/tend-ui-favicons` | 0 |
| `@10d/tend-ui-fonts` | 0 |
| `@10d/tend-ui-base` | 4 |
| `@10d/tend-ui-form` | 6 |
| `@10d/tend-ui-upload` | 7 |
| `@10d/tend-ui-header` | 8 |

## Corrections Made

- release tooling now supports multiple release roots declared in `app/release-boundary.json`;
- tarball rehearsal and bundle creation use the same 21-package boundary;
- `@types/uuid` was moved from upload runtime dependencies to development dependencies;
- the isolated consumer resolves direct and transitive internal references to the same checksummed local tarballs;
- the known Yarn 1 root-tarball path-normalization warning is accepted only for the exact root package tarball; other duplicate-cache warnings remain blocking.

## Artifact

- directory: `release/tend-ui-4.82.0`;
- archive: `release/tend-ui-4.82.0-release-bundle.tgz`;
- SHA-256: `a402b12ccd349ee63edb629a91401bf53450139de796d908cfda6ee767d26ad9`.

## Next Group

`H-E / H-08 + H-09`: verify React 17/18/19 compatibility and record a promote/defer/exclude decision for each experimental package.
