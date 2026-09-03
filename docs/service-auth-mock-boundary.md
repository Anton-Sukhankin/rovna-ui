# Service Auth Mock Boundary

## Purpose

This document records `E-09 / LC-01`: a local mock boundary for the unavailable `samolet-oauth2` dependency.

The goal is to prevent service packages from depending on a closed corporate auth package while keeping the locally visible API surface used by Rovna UI source code.

## Current Status

Checked on: 2026-07-06.

Created local workspace package:

```text
app/packages/samolet-oauth2/package.json
app/packages/samolet-oauth2/index.js
app/packages/samolet-oauth2/index.d.ts
```

Package identity:

| Package | Version | Purpose |
| --- | --- | --- |
| `samolet-oauth2` | `1.2.25` | Local auth mock/stub for offline Rovna UI work. |

The version satisfies the existing `^1.2.25` references in:

- `app/packages/tend-ui-notifications/package.json`
- `app/packages/tend-ui-search-assistant/package.json`

## Covered Local API

Static imports showed only two used exports:

| Export | Used by | Stub behavior |
| --- | --- | --- |
| `setAxiosAuthInterceptor` | Notifications and search-assistant API clients. | Adds an Axios request interceptor when possible; if no token exists, returns the request config unchanged. |
| `authStorage.getJwtAuthParams` | Notifications Centrifuge client and search-assistant avatar. | Reads local mock auth params from browser `localStorage` when available; otherwise returns `undefined`. |

The stub also exposes:

- `authStorage.setJwtAuthParams`
- `authStorage.clearJwtAuthParams`

These helpers are for local/mock scenarios only.

## Source Evidence

Imports found in:

```text
app/packages/tend-ui-notifications/src/shared/api/client.ts
app/packages/tend-ui-notifications/src/shared/api/centrifuge.ts
app/packages/tend-ui-search-assistant/src/shared/api/client.ts
app/packages/tend-ui-search-assistant/src/entities/user/ui/avatar/ui/UserAvatar.tsx
```

## Verification Performed

Performed without dependency installation:

- `app/packages/samolet-oauth2/package.json` parses as JSON.
- local Node `require('./app/packages/samolet-oauth2')` exposes `setAxiosAuthInterceptor`.
- local Node `require('./app/packages/samolet-oauth2')` exposes `authStorage.getJwtAuthParams`.
- `corepack yarn workspaces info --silent` recognizes `samolet-oauth2`.
- `@rovna-ui/notifications` lists `samolet-oauth2` as a workspace dependency.
- `@rovna-ui/search-assistant` lists `samolet-oauth2` as a workspace dependency.

## Scope

Included:

- local package identity for `samolet-oauth2`;
- safe auth storage stub;
- safe Axios interceptor stub;
- TypeScript declarations for the locally used API.

Excluded:

- real OAuth flow;
- real corporate token refresh;
- real corporate auth storage compatibility;
- corporate service access;
- dependency install;
- build;
- Storybook launch;
- changes to service package source files.

## Remaining Risk

This stub is enough for offline/local service isolation, but it is not a production auth implementation.

Future Storybook or runtime service scenarios should treat auth-dependent flows as mocked unless a public/local non-corporate auth strategy is explicitly designed.

## Next Step

Recommended next practical step:

```text
E-10: implement LC-05 narrow query-string replacement or re-run dependency/build diagnostics.
```

If we continue local compensation, `LC-05` is the next low-risk service-layer candidate.
