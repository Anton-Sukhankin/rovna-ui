# F-22: S-Tracker React Adapter

Status: `[x]` - minimal product integration passed.

Date: 2026-07-22

## Goal

Connect the verified Tend UI package chain to the real `S-Tracker` candidate without moving the existing vanilla application into React and without requesting any closed corporate registry or source.

## Implemented Boundary

S-Tracker now contains a reversible adapter boundary:

| Area | Result |
| --- | --- |
| Local package payload | `vendor/tend-ui/` contains `15` Tend UI tarballs plus `3` reviewed runtime compensation tarballs. |
| Package manifest | Every `@10d/*` dependency resolves from `file:vendor/tend-ui/*.tgz`. |
| React ownership | Limited to `src/integrations/tend-ui/create-task-button.jsx`. |
| Vanilla mount point | `index.html` contains `tend-ui-create-task-root`. |
| Existing lifecycle | `src/main.js` mounts the adapter and keeps all previous vanilla initialization. |
| Migrated UI | Existing `Создать задачу` action is rendered by `@10d/tend-ui/primitives/Button` inside `TendUI`. |
| Existing selector | `.js-btn-create-task` is preserved for the current toolbar visibility logic. |

No task data, domain rules, filters, navigation, drawers or list rendering moved into React.

## Dependency Installation

The install used:

```powershell
npm.cmd install --ignore-scripts --registry=https://registry.npmjs.org --cache=.npm-cache
```

Results:

- `179` packages added;
- all `15` `@10d/*` lock entries resolve from local tarballs;
- `classnames`, `lodash` and `uuid` resolve from reviewed local compensation tarballs;
- every network-resolved package in `package-lock.json` points to `https://registry.npmjs.org`;
- no corporate registry or closed source was contacted.

This is registry-free for the Tend UI package chain. Open-source transitive packages continue to use public npmjs.

After the public cache was populated and the live Vite process was stopped, a clean reinstall also passed:

```powershell
npm.cmd ci --ignore-scripts --offline --cache=.npm-cache
```

It restored `194` packages without network access. Build, adapter verification and browser runtime were then repeated successfully.

## Build And Static Verification

```powershell
npm.cmd run build
npm.cmd run verify:tend-ui
```

Passed results:

- Vite production build: `718` transformed modules;
- JavaScript bundle: approximately `722.8 kB`, `224.3 kB` gzip;
- local tarballs: `18/18`;
- local `@10d/*` packages: `15/15`;
- clean npm reinstall: passed with `--offline` after cache preparation;
- adapter imports and production bundle marker verified;
- package-source policy: local tarballs plus public npmjs only.

The current all-in-one bundle exceeds Vite's default `500 kB` warning threshold. This is a performance follow-up, not a build or runtime failure.

## Browser Runtime Verification

Verified on `http://127.0.0.1:5173/`:

| Check | Result |
| --- | --- |
| Button count | Exactly `1` by `data-testid="tend-ui-create-task-button"`. |
| Element | Native `BUTTON`. |
| Text | `Создать задачу`. |
| Tend UI classes | Present, including primary/medium variant classes. |
| Rendered size | `140 x 32`. |
| Visibility | Visible in the ordinary task-list context. |
| Click behavior | No dialog, navigation or visible state change, matching the previous prototype contract. |
| Browser console | `0` errors. |

## Advisory Review

`npm audit --omit=dev` reports `2` moderate and `1` high advisory by package name/version:

- local `lodash@4.17.21` is flagged for upstream `template`, `unset` and deep-path `omit` issues;
- local `uuid@10.0.0` is flagged for upstream v3/v5/v6 buffer handling;
- `@10d/tend-ui` inherits the uuid signal.

These are not the upstream package implementations:

- the reviewed local lodash replacement does not expose `template` or `unset`; its `omit` removes direct own keys only;
- the reviewed local uuid replacement exports only `v4` and has no buffer-argument API;
- the adapter source map contains the local lodash helper module and no uuid module.

No automatic `npm audit fix` was applied. A dedicated hardening step should preserve this evidence in an explicit local-compensation advisory policy instead of changing package mechanics blindly.

## Documentation Sync

Updated in S-Tracker:

- `docs/tend-ui-integration.md`;
- `docs/project-structure.md`;
- `docs/component-code-map.md`.

The toolbar behavior specification and user flow did not change, so their behavioral contracts remain untouched.

## Not Performed

- no corporate registry, GitLab, Nexus or private source access;
- no package publication;
- no Docker work;
- no Git staging, commit, remote or push;
- no broad React rewrite of S-Tracker;
- no automatic vulnerability fix.

## Decision

`F-22` is complete with status `[x]`. S-Tracker now proves a real product-level Tend UI connection through a small React adapter while preserving the vanilla application boundary.

## Next Group

```text
F-23: harden the S-Tracker consumer boundary by formalizing local-compensation advisory checks, evaluating bundle splitting and defining the next safe component migration.
```
