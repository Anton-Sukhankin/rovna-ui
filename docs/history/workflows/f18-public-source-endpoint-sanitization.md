# F-18: Public Source Endpoint Sanitization

Status: `[x]` - technical sanitization and runtime verification completed.

Date: 2026-07-15

## Goal

Remove unavailable corporate runtime defaults from the GitHub source candidate, prevent Storybook examples from contacting closed services and define an exact reviewed boundary for inert historical references.

## Implemented Changes

### Active Runtime And Tooling

- Storybook branding and middleware proxy URLs now come from optional environment variables.
- Vite registers notification, search and service proxies only when a matching environment variable is present.
- `SamoletHeader` service, account, analytics, support, profile, avatar and icon URLs are supplied through `configureSamoletHeader` or the optional runtime object.
- Legacy Layout Header actions accept explicit URL props and remain non-navigating when a URL is absent.
- Notifications and search use same-origin API paths unless public consumer configuration is provided.
- Fonts and favicons use configurable, same-origin asset paths.
- Source comments, playground data and fallback redirects no longer contain unavailable hosts.
- Storybook stories, tests, snapshots and raw examples were converted to local paths and neutral email values, so rendering them cannot initiate a closed-network request.

The consumer contract is documented in `docs/public-runtime-configuration.md`.

### Historical Reference Policy

Added `github-internal-reference-allowlist.json`.

The allowlist contains exact file paths only, grouped as:

- historical package changelogs;
- completed dependency-recovery diagnostics.

Active source files can never be allowlisted. The audit blocks new unreviewed references and stale allowlist entries.

### Local Dependency Compensation

A fresh Storybook optimization pass exposed missing lodash subpaths used by `@storybook/builder-vite`. The local lodash workspace now includes and resolves the complete Storybook candidate set, including `.js` subpaths. A direct resolver check passed for `38/38` candidate imports.

## Build Verification

Passed full package builds:

- `@10d/tend-ui-utils`;
- `@10d/tend-ui-typography`;
- `@10d/tend-ui-fonts`;
- `@10d/tend-ui-favicons`;
- `@10d/tend-ui-form`;
- `@10d/tend-ui-upload`;
- `@10d/tend-ui`;
- `@10d/tend-ui-header`.

Service package compilation:

- `@10d/tend-ui-notifications` TypeScript build passed; its aggregate package script then stopped in the existing Windows `cp *.md` shim.
- `@10d/tend-ui-search-assistant` `build:js` passed.

The copy-shim issue is packaging orchestration, not a TypeScript or runtime failure in the changed endpoint code.

## Storybook Verification

The full diagnostic Storybook manager is running locally:

```text
http://localhost:3000/
```

Verified:

| Check | Result |
| --- | --- |
| Manager root | `200` |
| `index.json` | `200` |
| First story iframe | `200` |
| Stories | `938` |
| Docs entries | `215` |
| Total entries | `1153` |

The first verified story remains `tend-ui-columns-settings-drawercolumnssettings--default`.

## Final Source Audit

| Check | Result |
| --- | ---: |
| Active source/config files with closed references | `0` |
| Reviewed inert historical-reference files | `49` |
| Unreviewed reference files | `0` |
| Stale allowlist entries | `0` |
| High-confidence secret findings | `0` |
| Oversized files | `0` |
| Local-only leaks | `0` |
| Staged files | `0` |

The sole remaining public-readiness blocker is `root-license-missing`.

## External Owner Decision

F-18 does not invent a license or copyright-holder identity. Public GitHub/npm distribution still requires the owner to confirm redistribution rights and provide the correct root license text. Private local work remains technically available.

## Not Performed

- no dependency installation;
- no access to a closed corporate registry, Git host, API or CDN;
- no Git staging, commit, remote or push;
- no package publication;
- no license generation.

## Decision

`F-18` is complete with status `[x]`.

The source and runtime endpoint boundary is technically clean. Public staging remains blocked only by the external license/right-to-publish decision, and existing release artifacts are now stale relative to the F-18 source changes.

## Next Group

```text
F-19: rebuild the fifteen-package release chain after F-18, recreate the registry-agnostic bundle and repeat isolated tarball-consumer verification without publication.
```
