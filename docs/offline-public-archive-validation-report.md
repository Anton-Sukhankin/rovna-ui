# E-23: Offline-Public Archive Validation Report

Date: 2026-07-06

## Purpose

Validate a reviewed offline-public package archive in staging before any dependency import/install step.

## Result

Status: `[!] blocked`

No offline-public package archive is currently available in the staging inbox, so package validation cannot be performed yet.

## Staging Paths

Prepared:

```text
tmp/offline-public-archive-staging/
tmp/offline-public-archive-staging/inbox/
tmp/offline-public-archive-staging/extracted/
```

Current inbox status:

```text
empty
```

## Required Missing Inputs

The next validation attempt requires:

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive.*
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-manifest.json
tmp/offline-public-archive-staging/inbox/checksums.sha256
```

The manifest must follow:

```text
docs/offline-public-archive-manifest-template.md
```

The validation procedure must follow:

```text
docs/offline-public-import-staging-runbook.md
```

## Validation Matrix

| Check | Status | Notes |
| --- | --- | --- |
| Staging folder exists | passed | `tmp/offline-public-archive-staging/` created. |
| Inbox folder exists | passed | `tmp/offline-public-archive-staging/inbox/` created. |
| Extracted folder exists | passed | `tmp/offline-public-archive-staging/extracted/` created. |
| Archive present | blocked | No archive in inbox. |
| Archive manifest present | blocked | No manifest in inbox. |
| Checksum file present | blocked | No checksum file in inbox. |
| Forbidden source scan | not run | Requires archive/manifest. |
| Checksum verification | not run | Requires archive/manifest/checksum file. |
| Package lane verification | not run | Requires archive manifest. |
| Import recommendation | blocked | Import is not allowed until validation passes. |

## Stop Conditions Active

Do not import or install anything until:

- an archive is present;
- manifest is present;
- checksum file is present;
- no package source points to `packages.samoletgroup.ru`;
- no package source requires closed corporate access;
- package checksums are verified;
- package lanes match `docs/offline-public-package-acquisition-plan.md`;
- the archive does not contain an unreviewed `node_modules` tree.

## Not Performed

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no archive import;
- no closed corporate source access.

## Decision

`E-23` is complete as a blocked validation check.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-04C Validation Update

Date: 2026-07-14

Status: `[x] passed for archive input`

The archive candidate was repaired and revalidated.

| Check | Status | Notes |
| --- | --- | --- |
| Archive present | passed | Archive exists in staging inbox. |
| Manifest present | passed | Manifest parses as JSON. |
| Checksum file present | passed | `checksums.sha256` exists. |
| Archive checksum | passed | Archive SHA256 matches checksum file. |
| Package count | passed | Manifest contains 24 packages. |
| Source URL forbidden scan | passed | No package `sourceUrl` points to forbidden sources. |
| Package `sourceUrl` present | passed | All 24 package entries have public npm `sourceUrl`. |
| Manifest path to zip entry match | passed | All 24 `packages/*.tgz` paths exist in the zip. |
| `node_modules` tree | passed | Archive contains no `node_modules` entries. |
| Import recommendation | allowed for next controlled restore step | The archive input is valid; dependency restore may still reveal missing transitive packages. |

Archive SHA256:

```text
5e9a3d35138f826dc155b61352dcfbb0a937bedb6e2ab1df47cfee646569e506
```

Next step:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

## F-04D Restore Attempt Update

Status: `[!] blocked after controlled restore attempt`

The validated archive input was used for an offline Yarn restore attempt. The attempt reached fetch stage and stopped on the first missing public transitive package:

```text
csstype@3.1.3
```

Exact Yarn blocker:

```text
error Can't make a request in offline mode ("https://packages.samoletgroup.ru/repository/npm-all/csstype/-/csstype-3.1.3.tgz")
```

Result:

| Check | Result |
| --- | --- |
| Controlled offline restore attempted | yes |
| Closed corporate registry access requested | no |
| `app/node_modules` created | no |
| First missing public transitive package | `csstype@3.1.3` |

Next step:

```text
F-04E: expand the offline-public archive to include required transitive packages from the lockfile closure.
```

## F-04E Archive V2 Validation Update

Status: `[x] passed for archive v2 input`

Archive v2 files:

```text
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-v2.zip
tmp/offline-public-archive-staging/inbox/offline-public-package-archive-v2-manifest.json
tmp/offline-public-archive-staging/inbox/checksums-v2.sha256
```

Validation result:

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

Archive checksum:

```text
aeaef96358e62c0f9078b2adac09aaaa1fa07e107a1edf963b754a0e52147c42
```

Next step:

```text
F-04F: restore dependency graph from offline-public archive v2 and diagnose local workspace resolution blockers.
```

## F-04F Restore Attempt Update

Status: `[!] blocked after archive v2 restore attempt`

Archive v2 was used for a controlled offline restore attempt. After adding Yarn v1 scoped mirror filenames, the public package blocker was cleared as the immediate blocker.

The restore then stopped on a local workspace package:

```text
error Can't make a request in offline mode ("https://packages.samoletgroup.ru/repository/npm-all/@rovna-ui/icons/-/tend-ui-icons-0.3.1.tgz")
```

Result:

| Check | Result |
| --- | --- |
| Controlled offline restore from archive v2 attempted | yes |
| Closed corporate registry access requested | no |
| `app/node_modules` created | no |
| First local workspace blocker | `@rovna-ui/icons@0.3.1` |
| Unsatisfied internal `@rovna-ui/*` references | 37 |

Next step:

```text
F-04G: align local @10d workspace dependency ranges for offline restore.
```

## F-04G Restore Success Update

Status: `[x] dependency graph restored`

After local `@rovna-ui/*` workspace ranges were aligned, offline restore from archive v2 completed successfully.

Result:

| Check | Result |
| --- | --- |
| Unsatisfied internal `@rovna-ui/*` references | 0 |
| `app/node_modules` | present |
| `app/node_modules/react` | present |
| `app/node_modules/react-dom` | present |
| `app/node_modules/.bin/storybook.cmd` | present |
| `app/node_modules/.bin/tsc.cmd` | present |
| `app/node_modules/.bin/rollup.cmd` | present |
| `app/node_modules/.bin/turbo.cmd` | present |

Next step:

```text
F-05: run package build verification.
```

Do not proceed to dependency restore, build or Storybook until validation passes.

## F-04B Validation Update

Date: 2026-07-14

Status: `[!] blocked validation`

The staging inbox now contains:

```text
offline-public-package-archive.zip
offline-public-package-archive-manifest.json
checksums.sha256
```

Validation result:

| Check | Status | Notes |
| --- | --- | --- |
| Archive present | passed | Archive exists in staging inbox. |
| Manifest present | passed | Manifest parses as JSON. |
| Checksum file present | passed | `checksums.sha256` exists. |
| Archive checksum | passed | Archive SHA256 matches checksum file. |
| Package count | passed | Manifest contains 24 packages. |
| Source URL forbidden scan | passed | No package `sourceUrl` points to forbidden sources. |
| Package `sourceUrl` present | failed | All 24 package entries have empty `sourceUrl`. |
| Manifest path to zip entry match | failed | Manifest uses `packages/*.tgz`; zip entries are at archive root. |
| Import recommendation | blocked | Repair archive/manifest before import. |

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
