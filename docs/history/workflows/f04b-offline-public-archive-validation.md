# F-04B Offline-Public Archive Validation

## Purpose

This document records `F-04B`: validate the prepared offline-public archive input before any dependency import.

The validation follows the boundary from:

```text
docs/offline-public-import-staging-runbook.md
```

## Result

Status: `[!] blocked validation`

The archive input exists, but it is not ready for import.

## Validation Summary

| Check | Status | Notes |
| --- | --- | --- |
| Archive exists | passed | `offline-public-package-archive.zip` is present. |
| Manifest exists | passed | `offline-public-package-archive-manifest.json` is present and parses as JSON. |
| Checksum file exists | passed | `checksums.sha256` is present. |
| Archive checksum | passed | SHA256 matches `checksums.sha256`. |
| Package count | passed | Manifest contains 24 packages. |
| Lane coverage | passed | Lanes 1, 2, 3 and minimum lane 4 are covered. |
| Closed source in package `sourceUrl` | passed | 0 package `sourceUrl` values point to forbidden sources. |
| `node_modules` in archive | passed | Archive contains tarballs only, no `node_modules` tree. |
| Required package `sourceUrl` | failed | All 24 package entries have empty `sourceUrl` values. |
| Manifest `archivePath` matches zip entries | failed | 24 manifest paths are `packages/*.tgz`, but zip entries are at archive root. |
| Import recommendation | blocked | Do not import until manifest/package paths are repaired and validation passes. |

## Exact Blockers

### Empty `sourceUrl`

All package entries are public npm packages, but the manifest does not preserve the public tarball URL in `sourceUrl`.

Required fix:

```text
Fill every package sourceUrl with the corresponding public npm tarball URL.
```

### Archive Path Mismatch

Manifest entries use:

```text
packages/<name-version>.tgz
```

The zip currently contains tarballs at the archive root:

```text
<name-version>.tgz
```

Required fix:

```text
Rebuild the archive so tarballs are stored under packages/, or update manifest/checksum paths to match the archive root.
```

Preferred fix:

```text
Rebuild the archive with packages/*.tgz paths.
```

This matches the existing manifest and import runbook.

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

`F-04B` is complete as a blocked validation step.

The archive candidate must be repaired before dependency restore can continue.

## Next Step

Proceed to:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
