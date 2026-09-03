# F-15: Registry-Agnostic Release Bundle

Status: `[x]`

Date: 2026-07-15

## Goal

Create a durable local publication payload for the validated fifteen-package Tend UI release wave without selecting or contacting a registry and without uploading packages.

## Implementation

Added:

- `app/scripts/create-release-bundle.js`;
- root Yarn command `release:create-bundle`;
- ignored generated output boundary `release/`;
- publication manifest, checksums and registry-neutral publication instructions inside each generated bundle.

The script first runs `prepare-public-release.js --check`, recomputes the package closure from `@10d/tend-ui`, verifies it against `app/release-boundary.json`, and validates every built package manifest before packing.

## Generated Bundle

Command:

```powershell
Set-Location app
corepack yarn release:create-bundle
```

Generated local outputs:

```text
release/tend-ui-4.82.0/
release/tend-ui-4.82.0-release-bundle.tgz
release/tend-ui-4.82.0-release-bundle.tgz.sha256
release/f15-result.json
```

Bundle directory:

```text
tend-ui-4.82.0/
  packages/                     # 15 public Tend UI tarballs
  publication-manifest.json     # machine-readable package graph and requirements
  PUBLICATION.md                # ordered registry-neutral commands
  README.md                     # bundle identity and boundary
  SHA256SUMS                    # package and metadata checksums
```

The generated `release/` directory is intentionally ignored by Git. The reproducible script and documentation are source-controlled; binary package artifacts should be attached to a release or sent to a registry, not committed to repository history.

## Publication Manifest

`publication-manifest.json` records:

- root package and version;
- all 15 package names, versions, files, sizes and SHA-256 values;
- seven dependency-safe publication levels;
- internal package dependencies;
- external runtime and peer requirements;
- five explicitly excluded offline-only packages;
- `registryAgnostic: true`;
- `publicationPerformed: false`.

No registry URL, token, account or credential is embedded.

## Distribution Boundary

Included:

- exactly the 15 public `@10d/*` package artifacts defined by `app/release-boundary.json`;
- metadata needed to inspect, verify and publish those artifacts.

Excluded:

- local `classnames`, `lodash` and `uuid` runtime compensations;
- local `@types/lodash` and `@types/uuid` build compensations;
- offline public dependency mirror;
- registry credentials;
- repository source, `node_modules`, Storybook output and temporary diagnostics.

The bundle is a publication payload, not a standalone mirror of all public npm dependencies. The full registry-free consumer proof remains the F-14 rehearsal.

## Verification

Final result:

- public metadata check: passed;
- pending metadata changes: `0`;
- package tarballs: `15`;
- publication levels: `7`;
- manifest/file size mismatches: `0`;
- manifest/file hash mismatches: `0`;
- offline-only artifacts found in bundle: `0`;
- tarballs found in outer archive: `15`;
- outer archive checksum sidecar: matched;
- publication performed: no;
- registry contacted: no.

Generated archive:

```text
tend-ui-4.82.0-release-bundle.tgz
```

SHA-256 for this run:

```text
58b058b1e082d20b9c8f2083b3c506e2be788c6aeb7e4e1a9b5463b137e1b9b7
```

The checksum changes when package artifacts or bundle metadata change; the `.sha256` sidecar is the source of truth for each generated run.

## Safety Model

- generation is local and performs no install;
- `npm pack` reads existing package `dist` directories only;
- no publish command is executed by the script;
- publication instructions require an explicit `TEND_UI_REGISTRY` value;
- packages are ordered by dependency level and should be verified after each level;
- the script refuses a release-boundary mismatch, private release artifact, build-only metadata, corporate metadata or offline-only package leak.

## Decision

`F-15` is complete with status `[x]`.

The project now has a reproducible, integrity-checked package publication payload. Real publication remains intentionally blocked until the public registry target and legal/available package scope are selected.

## Next Group

```text
F-16: choose the public package registry and package-scope strategy, then prepare a credential-free publication configuration and verification plan without uploading packages.
```

## F-16 Follow-Up

`F-16` selected npmjs as the preferred package registry while preserving the registry-neutral F-15 bundle. Real upload remains disabled until the `@10d` scope is confirmed or all fifteen packages are migrated atomically to a controlled scope. See `docs/history/workflows/f16-public-registry-and-scope-strategy.md`.

## F-19 Refresh

After the F-18 source/API sanitization, F-19 rebuilt all fifteen public packages and recreated this bundle. The refreshed isolated tarball consumer passed offline install, a 709-module production build and provider/Button DOM smoke.

Current archive SHA-256:

```text
a878f3dfc5ca0d26e09a02d72fdd3ee331596e6679be6e9dc8faeb5d2183374c
```

See `docs/history/workflows/f19-release-chain-refresh.md` for the complete refreshed verification record.
