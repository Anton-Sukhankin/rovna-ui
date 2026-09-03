# Query String Replacement

## Purpose

This document records `E-10 / LC-05`: a narrow local replacement for `query-string`.

The goal is to support the exact service-layer usage found in Rovna UI source code without installing the public package in the current restricted environment.

## Current Status

Checked on: 2026-07-06.

Created local workspace package:

```text
app/packages/query-string/package.json
app/packages/query-string/index.js
app/packages/query-string/index.d.ts
```

Package identity:

| Package | Version | Purpose |
| --- | --- | --- |
| `query-string` | `8.2.0` | Local narrow query serializer for offline Rovna UI work. |

The version satisfies the existing `^8.2.0` references in:

- `app/packages/tend-ui-notifications/package.json`
- `app/packages/tend-ui-search-assistant/package.json`

## Covered Local API

Static imports showed only this usage:

```ts
queryString.stringify(params, { arrayFormat: 'comma' })
```

Files:

```text
app/packages/tend-ui-notifications/src/shared/api/methods.ts
app/packages/tend-ui-search-assistant/src/shared/api/methods.ts
```

The local stub supports:

- `stringify(input, options)`;
- `arrayFormat: 'comma'`;
- default import shape with `.stringify`;
- named `stringify` export shape;
- skipping `null` and `undefined` values.

## Example

```ts
stringify({ a: [1, 2], b: 'x y', c: null }, { arrayFormat: 'comma' });
```

Result:

```text
a=1,2&b=x%20y
```

## Verification Performed

Performed without dependency installation:

- `app/packages/query-string/package.json` parses as JSON.
- local Node `require('./app/packages/query-string')` exposes `stringify`.
- local Node `require('./app/packages/query-string')` exposes `default.stringify`.
- `stringify({ a: [1, 2] }, { arrayFormat: 'comma' })` returns `a=1,2`.
- `corepack yarn workspaces info --silent` recognizes `query-string`.
- `@rovna-ui/notifications` lists `query-string` as a workspace dependency.
- `@rovna-ui/search-assistant` lists `query-string` as a workspace dependency.

## Scope

Included:

- local package identity for `query-string`;
- narrow query serializer used by service API clients;
- TypeScript declarations for the locally used API.

Excluded:

- full public `query-string` feature parity;
- parsing query strings;
- advanced array formats;
- sorting options;
- URL fragment handling;
- dependency install;
- build;
- Storybook launch;
- source service file changes.

## Remaining Risk

This replacement is intentionally narrow. If later code uses additional `query-string` features, the stub should be expanded only after the exact usage is known.

## Next Step

Recommended next practical step:

```text
E-11, E-12, E-13, E-14, E-15, E-16, E-17, E-18, E-19, E-20, E-21, E-22, E-23, E-24, E-25, E-26, E-27, E-28 and E-29 are completed; current next step is F-04C: repair the offline-public archive manifest and package paths.
```

If the goal is to continue local compensation after the build checkpoint, the next likely candidate is:

- `LC-07` focused lodash helpers, split helper-by-helper.
