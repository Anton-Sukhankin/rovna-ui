# F-04E Offline-Public Archive V2

## Purpose

This document records `F-04E`: expand the offline-public archive from a small direct-package candidate into a public npm tarball archive based on the `app/yarn.lock` transitive closure.

## Result

Status: `[x] complete`

Archive v2 was prepared and validated.

This does not mean the dependency graph is restored yet. `app/node_modules` was not created in this step, and build/Storybook were not run.

## Lockfile Closure Analysis

Source:

```text
app/yarn.lock
```

| Check | Result |
| --- | --- |
| Lockfile tarball entries | 1592 |
| Unique tarball URLs | 1592 |
| Archive v1 packages | 24 |
| Archive v1 exact lockfile coverage | 21 |
| Archive v1 entries not matching lockfile versions | 3 |
| Local workspace entries excluded from public archive | 32 |
| Public npm archive candidates | 1560 |

Archive v1 version mismatches:

| Package | Archive v1 version | Lockfile version |
| --- | --- | --- |
| `storybook` | `10.1.10` | `10.1.11` |
| `@types/react` | `17.0.2` | `17.0.67` |
| `@types/react-dom` | `17.0.2` | `17.0.21` |

## Local Workspace Boundary

The archive v2 intentionally excludes 32 lockfile entries whose package names exist as local workspaces in `app/packages/`.

This includes Tend UI workspaces and local compensation workspaces. They must be resolved locally, not fetched from closed corporate infrastructure.

Important follow-up risk: several `@10d/*` lockfile entries point to older versions than the local workspace versions. The next restore attempt may expose this as a workspace resolution blocker.

## Public Archive V2

Created in staging inbox:

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-v2.zip
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-v2-manifest.json
tmp/offline-public-archive-staging/inbox/checksums-v2.sha256
```

Archive checksum:

```text
aeaef96358e62c0f9078b2adac09aaaa1fa07e107a1edf963b754a0e52147c42
```

Archive size:

```text
515775345 bytes
```

Download result:

| Check | Result |
| --- | --- |
| Public npm tarballs requested | 1560 |
| Downloaded | 1560 |
| Failed | 0 |
| Closed corporate sources used | no |

## Validation

| Check | Result |
| --- | --- |
| Zip entries | 1560 |
| Manifest packages | 1560 |
| Missing manifest archive paths in zip | 0 |
| Bad package `sourceUrl` values | 0 |
| Forbidden package `sourceUrl` values | 0 |
| `node_modules` entries in archive | 0 |
| Manifest failures | 0 |
| Excluded local workspace entries | 32 |
| Archive checksum match | passed |

## Not Done

- no dependency restore from archive v2;
- no `app/node_modules`;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

## Decision

`F-04E` is complete.

The public npm tarball closure is now available as archive v2. The next step should retry dependency graph restoration using archive v2 and record the next blocker, if any.

## Next Step

Proceed to:

```text
F-04F: restore dependency graph from offline-public archive v2 and diagnose local workspace resolution blockers.
```

## Follow-up Status After F-04F

`F-04F` used archive v2 for a controlled offline restore attempt.

Result: archive v2 removed the public transitive package blocker as the immediate blocker, but restore stopped on local `@10d/*` workspace dependency ranges.

Details:

```text
docs/history/workflows/f04f-archive-v2-restore-attempt.md
```
