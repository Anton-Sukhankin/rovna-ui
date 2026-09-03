# F-46 S-Tracker Multi-Select Audit

Status: `[x]`.

Checked on: 2026-07-26.

## Scope

F-46 audits all eight custom filter multi-select controls before any React migration.

No product UI, package export or release artifact changes in this group.

## Executable Audit

S-Tracker adds:

```text
scripts/audit-multi-select-migration.mjs
```

The script is included in `verify:tend-ui:all` and verifies the current DOM inventory, vanilla ownership contracts and the installed Tend UI Select candidate.

## Inventory

| Group | Filter keys |
| --- | --- |
| Always visible | `id`, `title` |
| ECM | `docType`, `contractor` |
| Tracker | `unit`, `sla` |
| Control | `object`, `criticality` |

Totals:

- eight trigger surfaces;
- eight clear actions;
- eight suffix arrows;
- 16 static inline SVG elements;
- one dynamic tag-remove SVG;
- zero search inputs;
- zero keyboard handlers;
- zero explicit combobox/listbox roles.

## Current Ownership

Vanilla code owns dynamic option derivation from task data and related filter drafts, one-open-at-a-time behavior, outside-click close, multi-value selection, one visible tag plus `+N`, tag removal, clear and draft count updates.

Selection changes do not update the task list until Apply. Reset changes the draft but does not change the applied list until Apply.

## Tend UI Fit

The installed `@10d/tend-ui/primitives/Select` export supports:

- `mode="multiple"`;
- `allowClear`;
- `maxTagCount`;
- removable tags;
- selected-option checkbox indication;
- controlled values/options;
- optional search.

It is a valid migration candidate. The risk is state/lifecycle transfer, not a missing dependency.

## Browser Baseline

The local S-Tracker runtime confirms:

- eight controls in the all-tasks context;
- 134 current ID options and 31 current title options;
- one-open-at-a-time and outside-click close;
- two selected values render as one tag plus `+1`;
- the DOM generates `+1`, but the current custom trigger can visually clip it after a long first label;
- tag removal and per-filter clear work;
- one filter key counts as one draft setting regardless of selected-value count;
- the queue remains `134` before Apply;
- applying `Аудит безопасности объекта` changes `134 -> 4`;
- Reset plus Apply restores `4 -> 134`;
- browser application errors are zero.

## F-47 Decision

The first implementation wave is limited to `id` and `title` because they are always visible and do not depend on domain-section show/hide lifecycle.

F-47 must use a request/snapshot bridge:

- React renders Tend UI Select presentation;
- vanilla code derives options and owns `window.activeFilters`;
- React emits selection requests;
- vanilla code updates state and emits snapshots;
- Reset, drawer reopen and related-filter changes resynchronize the controls;
- six domain-scoped controls remain unchanged;
- current no-search behavior remains unchanged in the first wave.
- long first-tag text must truncate without hiding the `+N` summary.

## Build Status

```text
Vite transformed modules: 945
JavaScript bundle raw: 954,359 bytes
JavaScript bundle gzip: 294,319 bytes
```

## Source Policy

No closed corporate registry, GitLab, Nexus, Figma or internal service was accessed or requested.

## Next Group

```text
F-47: migrate the always-visible id/title filters to Tend UI Select through a vanilla-owned request/snapshot bridge.
```
