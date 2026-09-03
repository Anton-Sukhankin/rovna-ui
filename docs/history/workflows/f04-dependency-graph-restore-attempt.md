# F-04 Dependency Graph Restore Attempt

## Purpose

This document records `F-04`: restore the dependency graph through the selected approved path.

The selected path from `F-03` is:

```text
reviewed offline-public package archive/cache -> staging validation -> import only if validation passes
```

## Result

Status: `[!] blocked input`

No dependency graph was restored because no reviewed offline-public archive input is present in the staging inbox.

## Checked Staging State

Expected inbox:

```text
tmp/offline-public-archive-staging/inbox/
```

Required files:

| Required file | Present |
| --- | --- |
| `offline-public-package-archive.zip` or another accepted archive format | no |
| `offline-public-package-archive-manifest.json` | no |
| `checksums.sha256` | no |

Existing staging folders:

| Folder | Present |
| --- | --- |
| `tmp/offline-public-archive-staging/inbox/` | yes |
| `tmp/offline-public-archive-staging/extracted/` | yes |

## Checked Project State

| Check | Result |
| --- | --- |
| `app/node_modules` | missing |
| `app/node_modules/react` | missing |
| `app/node_modules/react-dom` | missing |
| `app/packages/tend-ui/dist` | missing |
| `app/packages/tend-ui-primitives/dist` | missing |
| `app/packages/tend-ui-theme/dist` | missing |

## Why Restore Was Not Run

The import runbook requires an archive, manifest and checksum file before any extraction or import.

Because the inbox is empty, running an import would either fail immediately or require inventing unverified dependency content. That would violate the route selected in `F-03`.

## Required Input To Continue

Place these files in:

```text
tmp/offline-public-archive-staging/inbox/
```

Required:

```text
offline-public-package-archive.zip
offline-public-package-archive-manifest.json
checksums.sha256
```

Accepted archive formats:

```text
.zip
.tgz
.tar.gz
```

The manifest must follow:

```text
docs/offline-public-archive-manifest-template.md
```

The import process must follow:

```text
docs/offline-public-import-staging-runbook.md
```

## Not Done

- no archive extraction;
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

`F-04` is complete as a blocked input step.

The dependency graph remains unavailable until a reviewed offline-public archive is provided or a public-enabled environment performs the approved restore route.

## Next Step

Proceed to:

```text
F-04E: expand the offline-public archive to include required transitive packages from the lockfile closure.
```

## Follow-up Status After F-04D

The archive input is no longer absent. `F-04A` prepared it, `F-04C` repaired it, and `F-04D` attempted a controlled offline restore.

Current result:

| Check | Result |
| --- | --- |
| Archive input | present and validated |
| Restore attempt | executed |
| Dependency graph | not restored |
| `app/node_modules` | missing |
| First missing public transitive package | `csstype@3.1.3` |

Details:

```text
docs/history/workflows/f04d-dependency-graph-restore-from-archive.md
```
