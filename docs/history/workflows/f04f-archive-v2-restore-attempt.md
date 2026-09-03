# F-04F Archive V2 Restore Attempt

## Purpose

This document records `F-04F`: retry dependency graph restoration from offline-public archive v2 and diagnose local workspace resolution blockers.

## Result

Status: `[!] blocked`

The restore attempt was executed, but `app/node_modules` was not created.

The public npm archive v2 is no longer the immediate blocker. The restore now stops on local `@10d/*` workspace range/version mismatches.

## Inputs

Archive v2:

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-v2.zip
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-v2-manifest.json
tmp/offline-public-archive-staging/inbox/checksums-v2.sha256
```

Archive checksum:

```text
aeaef96358e62c0f9078b2adac09aaaa1fa07e107a1edf963b754a0e52147c42
```

## Mirror Preparation

Archive v2 was extracted into a temporary user `%TEMP%` path and converted into a Yarn v1 offline mirror candidate.

Initial mirror preparation by tarball basename produced 1558 files and 2 basename collisions:

| Mirror file | Packages |
| --- | --- |
| `expect-29.7.0.tgz` | `@jest/expect@29.7.0`, `expect@29.7.0` |
| `parse-path-7.1.0.tgz` | `@types/parse-path@7.1.0`, `parse-path@7.1.0` |

First restore attempt then failed because Yarn v1 expected scoped package mirror names, for example:

```text
@types-react-17.0.67.tgz
```

The mirror was rebuilt by adding Yarn v1 scoped mirror filenames for all scoped packages. After that, mirror file count was:

```text
2031
```

## Restore Command

Command executed from `app/`:

```text
corepack yarn --use-yarnrc <TEMP>\ds-tend-ui-f04f-restore-attempt\f04f.yarnrc install --offline --frozen-lockfile --ignore-scripts --non-interactive --cache-folder <TEMP>\ds-tend-ui-f04f-restore-attempt\yarn-cache
```

No closed corporate registry access was requested or used.

## Attempt Results

### Attempt 1

Blocked on scoped mirror naming:

```text
error Can't make a request in offline mode ("https://packages.samoletgroup.ru/repository/npm-all/@types/react/-/react-17.0.67.tgz")
```

Interpretation: `@types/react@17.0.67` was present in archive v2, but the temporary mirror needed Yarn v1 scoped filenames.

### Attempt 2

After adding scoped mirror names, Yarn advanced past the previous public package blocker and stopped on an internal workspace package:

```text
error Can't make a request in offline mode ("https://packages.samoletgroup.ru/repository/npm-all/@10d/tend-ui-icons/-/tend-ui-icons-0.3.1.tgz")
```

Interpretation: `@10d/tend-ui-icons` exists as a local workspace, but some local package dependency ranges request older `0.x` versions that the current local workspace version does not satisfy.

## Local Workspace Range Diagnosis

Static package.json analysis found:

| Check | Result |
| --- | --- |
| Local workspaces inspected | 46 |
| Internal `@10d/*` references | 151 |
| Unsatisfied internal workspace references | 37 |

Unsatisfied local workspace targets:

| Target workspace | Local version | Unsatisfied refs | Requested ranges |
| --- | --- | --- | --- |
| `@10d/tend-ui-api` | `2.0.0` | 3 | `^1`, `^1.2.1`, `^1.3.0` |
| `@10d/tend-ui-factories` | `1.2.0` | 1 | `1.0.0` |
| `@10d/tend-ui-filters` | `0.9.0` | 1 | `^0.7.6` |
| `@10d/tend-ui-grid` | `0.1.1` | 1 | `^0` |
| `@10d/tend-ui-hooks` | `0.11.1` | 4 | `^0.10.0`, `^0.5.0`, `^0.8.0`, `^0.9.0` |
| `@10d/tend-ui-icons` | `0.7.0` | 9 | `^0`, `^0.3.1`, `^0.5.1`, `^0.6.0` |
| `@10d/tend-ui-primitives` | `0.23.7` | 5 | `^0`, `^0.19.0`, `^0.21.0`, `^0.22.0`, `^0.6.1` |
| `@10d/tend-ui-types` | `1.0.0` | 9 | `^0`, `^0.17.0`, `^0.18.0`, `^0.3.0`, `^0.4.0` |
| `@10d/tend-ui-typography` | `0.0.5` | 2 | `^0` |
| `@10d/tend-ui-upload` | `2.0.0` | 2 | `^0.1.0`, `^0.7.3` |

## Project State After Attempt

| Check | Result |
| --- | --- |
| `app/node_modules` | missing |
| `app/node_modules/react` | missing |
| `app/node_modules/@10d/tend-ui-icons` | missing |
| `app/packages/tend-ui/dist` | missing |

## Interpretation

Archive v2 successfully removes the public transitive package blocker found in `F-04D`.

The next blocker is local monorepo consistency: several local `@10d/*` packages depend on older ranges of other local `@10d/*` packages, so Yarn tries to fetch those old versions from the lockfile's internal registry URL. That is forbidden in this workflow and must be handled locally.

## Not Done

- no successful dependency restore;
- no `app/node_modules`;
- no package.json range edits;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no edits inside `S-Tracker`;
- no closed corporate source access.

## Decision

`F-04F` is complete as a blocked diagnostic restore attempt.

The next step should align local workspace dependency ranges so Yarn can resolve local `@10d/*` packages from `app/packages` instead of trying to fetch old internal-registry tarballs.

## Next Step

Proceed to:

```text
F-04G: align local @10d workspace dependency ranges for offline restore.
```

## Follow-up Status After F-04G

`F-04G` aligned local workspace ranges and reran the offline restore from archive v2.

Result:

```text
app/node_modules exists
```

Details:

```text
docs/history/workflows/f04g-local-workspace-range-alignment.md
```
