# F-04C Offline-Public Archive Repair

## Purpose

This document records `F-04C`: repair the offline-public archive manifest and package paths after `F-04B` validation found packaging issues.

## Result

Status: `[x] complete`

The archive candidate was repaired and validation now passes for the archive input gate.

## Repaired Issues

| Issue from F-04B | Repair |
| --- | --- |
| Package `sourceUrl` values were empty | Filled every package `sourceUrl` with the corresponding public npm tarball URL. |
| Manifest used `packages/*.tgz`, but zip entries were at archive root | Rebuilt the zip so every tarball is stored under `packages/`. |
| Archive checksum changed after rebuild | Recomputed archive SHA256 and updated `checksums.sha256` and manifest archive checksum. |

## Validation Result After Repair

| Check | Result |
| --- | --- |
| Zip entries | 24 |
| Manifest packages | 24 |
| Missing manifest archive paths in zip | 0 |
| Empty package `sourceUrl` values | 0 |
| Forbidden package `sourceUrl` values | 0 |
| `node_modules` entries in archive | 0 |
| Archive checksum match | passed |
| Lane coverage | lanes 1, 2, 3 and minimum lane 4 |

Archive SHA256 after repair:

```text
5e9a3d35138f826dc155b61352dcfbb0a937bedb6e2ab1df47cfee646569e506
```

## Current Archive Input

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive.zip
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-manifest.json
tmp/offline-public-archive-staging/inbox/checksums.sha256
```

## Import Readiness

The archive input is now valid enough for the next controlled restore attempt.

Important: this does not mean the dependency graph is restored yet. The archive includes the minimum first direct packages for build/Storybook diagnostics. The restore step may still discover missing transitive packages.

## Not Done

- no archive import;
- no dependency install;
- no `node_modules` copy;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

## Decision

`F-04C` is complete.

The next package group can move from archive preparation/validation to dependency graph restoration.

## Next Step

Proceed to:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```
