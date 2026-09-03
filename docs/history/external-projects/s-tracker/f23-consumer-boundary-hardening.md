# F-23: S-Tracker Consumer Boundary Hardening

Status: `[x]` - security, bundle and next-migration decisions are executable and verified.

Date: 2026-07-22

## Goal

Turn the F-22 product integration follow-ups into reproducible gates without accessing closed corporate sources, changing package artifacts or expanding React ownership across S-Tracker.

## Local Compensation Policy

S-Tracker now contains `vendor/tend-ui/compensation-policy.json` and the executable gate `scripts/audit-tend-ui-local-compensations.mjs`.

The policy covers all three local runtime compensations:

| Package | Enforced evidence | Advisory decision |
| --- | --- | --- |
| `classnames@2.5.1` | Exact tarball SHA-256, local file reference, private metadata and export surface. | Retained as a reviewed compatibility helper. |
| `lodash@4.17.21` | Exact tarball SHA-256, API allowlist, missing `template`/`unset`, direct-key-only `omit` behavior and prototype-safety test. | Upstream version signal does not describe the local implementation; gate must pass after every change. |
| `uuid@10.0.0` | Exact tarball SHA-256, only `v4`/default exports, valid v4 string and no caller-buffer mutation. | Upstream v3/v5/v6 buffer signal does not describe the local implementation; gate must pass after every change. |

The result is a documented, machine-checked disposition rather than a blanket ignore. Automatic `npm audit fix` remains prohibited for these local packages.

## Bundle Splitting Decision

The F-22 bundle was measured again:

| Metric | Result | F-23 limit |
| --- | --- | --- |
| JavaScript chunks | `1` | `1` while direct `file://` use is required |
| Raw JavaScript | `722,783` bytes | at most `800 KiB` |
| Gzip JavaScript | `222,473` bytes | at most `250 KiB` |

Splitting was evaluated but not enabled. S-Tracker's Vite plugin deliberately converts the production module script into a classic deferred script so `dist/index.html` can be opened directly. Standard Vite dynamic chunks would restore an ES-module/runtime loading requirement and risk breaking that verified delivery route.

`scripts/report-tend-ui-bundle.mjs` now enforces the current compatibility boundary and byte limits. Code splitting can be reconsidered only after a product decision to require HTTP hosting instead of direct-file operation.

## Next Migration Candidate

F-24 will migrate the global task search field to Tend UI `Input` through a second isolated adapter.

Selection evidence:

- stable DOM identity: `#js-global-search`;
- narrow input event contract;
- local Tend UI source, export and Storybook stories exist;
- React can remain limited to one additional mount;
- table, Select, modal and column-setting mechanics have broader state contracts and remain later work.

The preservation and browser-check contract is recorded in `S-Tracker/docs/tend-ui-next-migration.md`.

## Verification

```powershell
npm.cmd run verify:tend-ui:all
```

Passed on 2026-07-22:

- Vite build: `718` transformed modules;
- local adapter/package verification: passed;
- local compensation security verification: `3/3` passed;
- bundle boundary and size verification: passed;
- browser runtime: one visible `140 x 32` Tend UI Button, one existing native search Input and zero console errors;
- package sources remain local tarballs plus public npmjs only;
- no closed corporate source was contacted.

## Not Performed

- no dependency installation or tarball replacement;
- no corporate registry, GitLab, Nexus or private source request;
- no package publication;
- no Docker work;
- no Git staging, commit or push;
- no S-Tracker search-field migration yet.

## Decision

`F-23` is complete with status `[x]`. The S-Tracker consumer boundary now has executable security and bundle gates, and F-24 has a bounded migration target.

## Next Group

```text
F-24: migrate the S-Tracker global task search field to Tend UI Input through a second isolated React adapter while preserving native search behavior and direct-file compatibility.
```
