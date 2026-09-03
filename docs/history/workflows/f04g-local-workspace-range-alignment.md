# F-04G Local Workspace Range Alignment

## Purpose

This document records `F-04G`: align local `@10d/*` workspace dependency ranges so Yarn can restore the dependency graph offline from archive v2 without trying to fetch old internal-registry package versions.

## Result

Status: `[x] complete`

The local workspace range blocker found in `F-04F` was resolved, and the dependency graph was restored.

`app/node_modules` now exists.

## Scope

Only local `package.json` dependency ranges were changed.

No component source code, build config, Storybook config, `S-Tracker`, Docker config or publication settings were changed.

## Range Alignment Strategy

For local `@10d/*` dependencies whose requested range did not satisfy the local workspace package version, the range was updated to:

```text
^<local-workspace-version>
```

Example:

```text
@10d/tend-ui-icons: ^0.3.1 -> ^0.7.0
```

This keeps Yarn resolving the package from `app/packages/*` instead of trying to fetch the old lockfile tarball from the internal registry URL.

## Updated Files

| File |
| --- |
| `app/packages/tend-ui/package.json` |
| `app/packages/tend-ui-ai-chat/package.json` |
| `app/packages/tend-ui-api/package.json` |
| `app/packages/tend-ui-filters/package.json` |
| `app/packages/tend-ui-form/package.json` |
| `app/packages/tend-ui-grid/package.json` |
| `app/packages/tend-ui-header/package.json` |
| `app/packages/tend-ui-hooks/package.json` |
| `app/packages/tend-ui-icons/package.json` |
| `app/packages/tend-ui-primitives/package.json` |
| `app/packages/tend-ui-search-assistant/package.json` |
| `app/packages/tend-ui-table/package.json` |
| `app/packages/tend-ui-theme/package.json` |
| `app/packages/tend-ui-tree/package.json` |
| `app/packages/tend-ui-typography/package.json` |
| `app/packages/tend-ui-upload/package.json` |

## Verification Before Restore

After the range updates:

| Check | Result |
| --- | --- |
| Local workspaces inspected | 46 |
| Internal `@10d/*` references | 151 |
| Unsatisfied internal workspace references | 0 |

## Restore Attempt

Command executed from `app/`:

```text
corepack yarn --use-yarnrc <TEMP>\ds-tend-ui-f04f-restore-attempt\f04f.yarnrc install --offline --frozen-lockfile --ignore-scripts --non-interactive --cache-folder <TEMP>\ds-tend-ui-f04f-restore-attempt\yarn-cache
```

Result:

```text
Done
```

No closed corporate registry access was requested or used.

## Restored Dependency Markers

| Check | Result |
| --- | --- |
| `app/node_modules` | present |
| `app/node_modules/react` | present |
| `app/node_modules/react-dom` | present |
| `app/node_modules/styled-components` | present |
| `app/node_modules/.bin/storybook.cmd` | present |
| `app/node_modules/.bin/tsc.cmd` | present |
| `app/node_modules/.bin/rollup.cmd` | present |
| `app/node_modules/.bin/turbo.cmd` | present |
| `app/node_modules/@10d/tend-ui-icons` | junction to local workspace |

Resolved package versions:

| Package | Version |
| --- | --- |
| `react` | `17.0.2` |
| `react-dom` | `17.0.2` |
| `styled-components` | `5.3.11` |
| `typescript` | `5.5.2` |
| `storybook` | `10.1.11` |
| `rollup` | `4.52.5` |
| `turbo` | `2.5.8` |

## Warnings

The install completed with warnings:

- optional platform-specific packages were skipped for Windows/x64;
- scripts were ignored because `--ignore-scripts` was used intentionally;
- peer dependency warnings remain, including Babel/PostCSS/ESLint-related warnings.

These warnings do not block the dependency graph restoration gate, but they may matter during build and Storybook verification.

## Not Done

- no package build;
- no Storybook launch;
- no component runtime visual verification;
- no Docker build;
- no package publication;
- no edits inside `S-Tracker`;
- no closed corporate source access.

## Decision

`F-04G` is complete.

The dependency graph is restored enough to proceed to package build verification.

## Next Step

Proceed to:

```text
F-05: run package build verification.
```
