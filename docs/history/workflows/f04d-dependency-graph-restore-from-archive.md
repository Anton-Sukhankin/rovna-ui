# F-04D Dependency Graph Restore From Archive

## Purpose

This document records `F-04D`: attempt to restore the dependency graph from the validated offline-public archive prepared in `F-04A` and repaired in `F-04C`.

## Result

Status: `[!] blocked`

The restore attempt was executed, but the dependency graph was not restored.

`app/node_modules` was not created, React/ReactDOM are still absent from `app/node_modules`, and `dist` outputs are still absent.

## Inputs

Validated archive input:

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive.zip
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-manifest.json
tmp/offline-public-archive-staging/inbox/checksums.sha256
```

Archive checksum:

```text
5e9a3d35138f826dc155b61352dcfbb0a937bedb6e2ab1df47cfee646569e506
```

## Staging Preparation

The archive was unpacked into a temporary staging area and converted into a Yarn offline mirror candidate.

The first staging path inside the OneDrive workspace exposed a Windows/Yarn path issue:

```text
EINVAL: invalid argument, mkdir 'C:\Users\armad\OneDrive\?????????\?????? ? ??????????\DS Tend UI\tmp\offline-public-archive-staging\f04d-restore-attempt\yarn-offline-mirror'
```

To avoid treating this as a dependency blocker, the temporary mirror/cache were recreated under the user `%TEMP%` path:

```text
C:\Users\armad\AppData\Local\Temp\ds-tend-ui-f04d-restore-attempt
```

Prepared mirror result:

| Check | Result |
| --- | --- |
| Manifest packages | 24 |
| Unique Yarn mirror tarball basenames | 22 |
| Duplicate basename collisions | 2 |

The basename collisions are caused by npm tarball names that overlap between runtime packages and `@types/*` packages, for example `react-17.0.2.tgz` and `@types/react`'s tarball basename.

## Restore Attempt

Command executed from `app/`:

```text
corepack yarn --use-yarnrc <TEMP>\ds-tend-ui-f04d-restore-attempt\f04d.yarnrc install --offline --frozen-lockfile --ignore-scripts --non-interactive --cache-folder <TEMP>\ds-tend-ui-f04d-restore-attempt\yarn-cache
```

Temporary Yarn config used public npm as metadata identity and the local offline mirror as the only package source:

```text
registry "https://registry.npmjs.org"
yarn-offline-mirror "<TEMP>/ds-tend-ui-f04d-restore-attempt/yarn-offline-mirror"
yarn-offline-mirror-pruning false
```

No closed corporate registry access was requested or used.

## Error

Yarn reached the fetch stage and stopped in offline mode on the first missing transitive package:

```text
error Can't make a request in offline mode ("https://packages.samoletgroup.ru/repository/npm-all/csstype/-/csstype-3.1.3.tgz")
```

Related lockfile entry:

```text
csstype@^3.0.2, csstype@^3.1.3:
  version "3.1.3"
  resolved "https://packages.samoletgroup.ru/repository/npm-all/csstype/-/csstype-3.1.3.tgz#d80ff294d114fb0e6ac500fbf85b60137d7eff81"
```

`csstype` is a public npm transitive dependency. It is pulled by type packages such as `@types/react` and `@types/styled-components`, but it is not included in the archive v1.

## Project State After Attempt

| Check | Result |
| --- | --- |
| `app/node_modules` | missing |
| `app/node_modules/react` | missing |
| `app/node_modules/react-dom` | missing |
| `app/packages/tend-ui/dist` | missing |

## Interpretation

The `F-04C` archive is structurally valid, but it is not a complete dependency graph archive.

The next restore input must include at least the first missing public transitive package:

```text
csstype@3.1.3
```

More transitive blockers are likely after `csstype`; the correct next step is to build a missing-package closure from `app/yarn.lock`, not to fix packages one by one blindly.

## Not Done

- no successful dependency restore;
- no `app/node_modules`;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

## Decision

`F-04D` is complete as a diagnostic restore attempt with status `[!]`.

Proceed to a corrective archive step before build or Storybook verification.

## Next Step

Proceed to:

```text
F-04E: expand the offline-public archive to include required transitive packages from the lockfile closure.
```

## Follow-up Status After F-04E

`F-04E` completed the public archive expansion.

Archive v2 now contains 1560 public npm tarballs from the lockfile closure and passed validation.

Details:

```text
docs/history/workflows/f04e-offline-public-archive-v2.md
```

The next restore attempt should use archive v2.
