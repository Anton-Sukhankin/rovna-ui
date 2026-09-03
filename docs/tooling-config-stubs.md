# Tooling Config Stubs

## Purpose

This document records `E-07 / LC-03`: the first low-risk local compensation slice.

The goal is to provide local workspace packages for config dependencies that previously pointed to unavailable corporate packages:

- `@rovna-ui/eslint-config`
- `@rovna-ui/prettier-config`

These packages are tooling-only. They are not runtime UI components and do not affect Rovna UI visual behavior directly.

## Current Status

Checked on: 2026-07-06.

Created local workspace packages:

```text
app/packages/eslint-config/package.json
app/packages/eslint-config/index.js
app/packages/prettier-config/package.json
app/packages/prettier-config/index.js
```

Package names and versions:

| Package | Version | Purpose |
| --- | --- | --- |
| `@rovna-ui/eslint-config` | `1.0.0` | Local ESLint config stub. |
| `@rovna-ui/prettier-config` | `1.0.0` | Local Prettier config stub. |

The versions match the existing references in `app/package.json`.

## Why This Slice Was First

`LC-03` was chosen because:

- it is tooling-only;
- it does not rewrite React components;
- it does not touch Storybook runtime;
- it avoids closed corporate registry access;
- it can reduce future install/build blockers if Yarn resolves these names from local workspaces.

## Scope

Included:

- local workspace package for `@rovna-ui/eslint-config`;
- local workspace package for `@rovna-ui/prettier-config`;
- minimal neutral config exports.

Excluded:

- full recreation of the original corporate lint/prettier rules;
- dependency install;
- build;
- Storybook launch;
- source component changes;
- changes to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`.

## Verification Performed

The created package manifests and config modules were checked locally without installing dependencies.

`E-08` then re-ran a short build diagnostic:

- `corepack yarn workspaces info --silent` recognizes both local config stubs;
- `corepack yarn build:tokens` still stops on nested plain `yarn`;
- `corepack yarn build:main` still stops on nested plain `yarn`.

Runtime/build completion is still not possible because:

- `app/node_modules` is missing;
- public npm access in the current Codex environment previously stopped on `AggregateError [EACCES]`;
- Storybook and build tooling packages are still not installed.

## Remaining Risk

These stubs are intentionally minimal. They are enough to provide local package identities, but they do not guarantee that future lint output will match the original corporate config.

If lint becomes part of the required quality gate later, the stub should be expanded only after the desired lint rules are defined locally.

## Next Step

```text
E-08: re-run build diagnostics or perform the next low-risk compensation slice, depending on whether dependency installation is still blocked.
```

`E-08` is complete as a blocked diagnostic. Recommended practical next slice:

```text
E-09 / LC-01: service auth mock boundary.
```
