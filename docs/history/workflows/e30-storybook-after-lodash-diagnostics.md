# E-30: Storybook Diagnostic After Lodash Compensation

Date: 2026-07-06

## Purpose

Re-run Storybook diagnostics after `LC-07A`, `LC-07B` and `LC-07C` local lodash compensation.

This step checks whether local helper compensation changed the Storybook blocker.

## Boundary

Allowed in this step:

- read local project files;
- check Storybook configuration and declared command;
- run a short diagnostic `corepack yarn storybook` attempt;
- record the exact blocker.

Not allowed in this step:

- dependency install;
- network dependency restoration;
- build;
- Docker build;
- package publication;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- component source edits;
- access to closed corporate sources.

## Preflight

| Check | Result |
| --- | --- |
| `app/.storybook/main.ts` | present |
| `app/.storybook/preview.tsx` | present |
| `app/package.json` script | `storybook dev -p 3000` |
| `app/node_modules` | absent |
| `app/node_modules/.bin/storybook.cmd` | absent |
| `app/packages/tend-ui/dist` | absent |
| `app/yarn-error.log` | absent |

## Diagnostic Attempt

Command:

```text
corepack yarn storybook
```

Working directory:

```text
app/
```

Result:

```text
yarn run v1.22.15
$ storybook dev -p 3000
'storybook' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

Yarn also reported cache/global-folder warnings, but the decisive blocker is the missing `storybook` binary.

## Decision

`E-30` is complete as a blocked diagnostic.

Storybook still cannot open locally.

The blocker did not move after local lodash compensation:

```text
app/node_modules is absent, so app/node_modules/.bin/storybook is absent.
```

## What This Means

The local lodash work reduces helper dependency surface, but it does not restore foundational Storybook/runtime tooling.

Storybook remains blocked until the dependency graph is restored through an approved public/offline-public route or a reviewed local package archive is imported.

## Not Performed

- no dependency install;
- no build;
- no Docker build;
- no package publication;
- no component source edits;
- no closed corporate source access.

## Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```
