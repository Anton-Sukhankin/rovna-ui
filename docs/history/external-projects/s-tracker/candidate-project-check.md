# Candidate Project Check

## Purpose

This document records the first candidate-project check for connecting Tend UI to another project.

The check is diagnostic. It does not modify the candidate project, install dependencies, create React files, run builds, publish packages or start Storybook.

## Candidate Project

| Item | Value |
| --- | --- |
| Candidate | `S-Tracker` |
| Path | `C:\Users\armad\OneDrive\Документы\Проект в разработке\S-Tracker` |
| Reason for selection | Local project available in the same working area and already identified as a future Tend UI migration candidate. |
| Check date | 2026-07-03 |

## Candidate Project Structure

Observed top-level project signals:

- `package.json`
- `package-lock.json`
- `vite.config.js`
- `index.html`
- `src/`
- `docs/`
- `node_modules/`
- `dist/`

Observed `src/` structure:

- `src/main.js`
- `src/data/`
- `src/domain/`
- `src/features/`
- `src/styles/`
- `src/ui/`

## React Compatibility

`S-Tracker/package.json` currently declares:

```json
{
  "name": "s-tracker-prototype",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "vite build",
    "preview": "vite preview --host 127.0.0.1"
  },
  "devDependencies": {
    "vite": "latest"
  }
}
```

Current compatibility result:

| Check | Result |
| --- | --- |
| Vite project | Yes |
| React dependency | Missing |
| React DOM dependency | Missing |
| React entrypoint | Missing |
| Tend UI dependency | Missing |
| React adapter layer | Missing |
| Current app entrypoint | `src/main.js` |

`S-Tracker` is currently a vanilla/Vite application. Its `src/main.js` imports CSS, data/domain modules and plain JavaScript UI initializers.

## Minimal Connection Target

The future minimal target should be:

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { TendUI } from '@10d/tend-ui/theme';
import { Button } from '@10d/tend-ui/primitives';

TendUI.init();

function TendUiSmokeTest() {
  return (
    <TendUI>
      <Button>Smoke test</Button>
    </TendUI>
  );
}

createRoot(document.getElementById('react-root')!).render(<TendUiSmokeTest />);
```

This is a target shape only. It is not executable in the current state.

## Why The Minimal Connection Was Not Run

The connection was not attempted because it would require changing the candidate project and resolving blocked Tend UI runtime/build conditions.

Known blockers:

| Blocker | Project | Effect |
| --- | --- | --- |
| `react` is not declared | `S-Tracker` | A React component cannot render. |
| `react-dom` is not declared | `S-Tracker` | There is no React DOM renderer. |
| React adapter layer is missing | `S-Tracker` | There is no safe integration boundary such as `src/react/ds/`. |
| `@10d/tend-ui` is not declared | `S-Tracker` | Tend UI cannot be imported as a package. |
| `@10d/tend-ui` is not built | `DS Tend UI` | No verified built package artifact exists. |
| `dist` output is missing | `DS Tend UI` | Local link/registry consumption cannot be confirmed. |
| Dependency graph is not installed for Tend UI | `DS Tend UI` | Runtime dependencies are unavailable. |
| Internal registry is unavailable | `DS Tend UI` | Normal install/publish path is blocked. |

## Decision

`S-Tracker` is selected as the first project candidate.

## D-07 Strategy Update

Checked on: 2026-07-05.

`D-07` keeps `S-Tracker` as the first candidate, but does not recommend direct implementation yet.

Current verified facts:

| Check | Result |
| --- | --- |
| `S-Tracker/package.json` | Vite-only, no `react`, no `react-dom` |
| `S-Tracker/src/main.js` | Vanilla JavaScript entrypoint |
| Tend UI `app/node_modules` | missing |
| Tend UI key package `dist` outputs | missing |
| Tend UI Storybook | blocked |
| Tend UI component runtime checks | blocked / unverified |

Decision:

```text
Do not add Tend UI directly to S-Tracker yet.
```

Recommended route:

1. Restore Tend UI dependency graph.
2. Build Tend UI key packages.
3. Verify Storybook/component states.
4. Test Tend UI in an isolated React sandbox consumer.
5. Only after that, design a React adapter layer for `S-Tracker`.

## D-08 Minimal Connection Update

Checked on: 2026-07-05.

`D-08` did not execute a Tend UI smoke render in `S-Tracker`.

Reason:

| Blocker | Effect |
| --- | --- |
| Tend UI is not built | No verified package artifact can be consumed. |
| Tend UI dependency graph is missing | Runtime dependencies are unavailable. |
| Storybook is blocked | Component behavior is not verified. |
| `S-Tracker` has no React layer | No safe render target exists for a React component. |

Decision:

```text
Keep S-Tracker unchanged. Minimal connection remains blocked.
```

Details:

```text
docs/minimal-connection-check.md
```

Status decision:

```text
DS-12.1 = [x]
DS-12.2 = [!]
DS-12.3 = [x]
P-10 = [!]
```

Meaning:

- candidate selection is complete;
- minimal Tend UI component render is not verified;
- blockers are documented;
- no files in `S-Tracker` were changed.

## Next Practical Step

Before a real consumer connection can be checked, choose one of these workstreams:

1. Dependency strategy for `DS Tend UI`: make dependencies available locally and restore package build output.
2. React adapter strategy for `S-Tracker`: add React/React DOM and a small isolated adapter layer.

Recommended order:

```text
First solve DS Tend UI dependency/build strategy, then prepare the S-Tracker React adapter layer.
```

Reason:

```text
Adding a React layer to S-Tracker before Tend UI can be consumed would still leave the minimal Button render blocked.
```

## F-21 Current Candidate Reconciliation

Checked on: 2026-07-15 against the live S-Tracker files.

The old Tend UI blockers in this document are superseded:

- dependency graph exists;
- all fifteen public packages build;
- Storybook is live with `938` stories and `215` docs;
- isolated tarball install/build/DOM smoke passes;
- registry-free package consumption is verified.

S-Tracker itself remains a vanilla/Vite application:

```text
react: absent
react-dom: absent
React entrypoint: absent
Tend UI dependency: absent
React adapter: absent
```

Current status decision:

```text
DS-12.1 = [x]
DS-12.2 = [x] for the verified minimal clean consumer
P-10 = [~] until the same render is implemented inside S-Tracker
```

The remaining S-Tracker work is a product integration task, not a Tend UI dependency/build blocker. The recommended next group is F-22: create a small reversible React adapter and connect the verified local tarball route without a registry.

## F-22 Product Integration Result

Checked on: 2026-07-22.

The product-level candidate check now passes:

- S-Tracker contains an isolated React adapter rather than a React rewrite;
- all fifteen `@10d/*` packages resolve from local tarballs;
- the existing `Создать задачу` action is rendered by Tend UI `Button` inside the `TendUI` provider;
- the Vite production build passes with `718` transformed modules;
- `npm run verify:tend-ui` confirms `18` local tarballs, `15` local Tend UI packages and the production bundle marker;
- browser verification confirms one visible native button and zero console errors;
- the previous no-op click contract is preserved.

Current status decision:

```text
DS-12.1 = [x]
DS-12.2 = [x]
DS-12.3 = [x]
P-10 = [x]
```

Detailed evidence: `docs/history/external-projects/s-tracker/f22-s-tracker-react-adapter.md`.

## F-23 Hardening Result

Checked on: 2026-07-22.

The candidate connection now has executable drift controls:

- all three local compensation tarballs are pinned by SHA-256 and local lock source;
- lodash/uuid advisory-relevant API behavior is tested against the actual local implementations;
- the direct-file single-bundle contract is measured and limited;
- `npm run verify:tend-ui:all` rebuilds and verifies the complete S-Tracker boundary;
- the next isolated candidate is global task search via Tend UI `Input`.

Detailed evidence: `docs/history/external-projects/s-tracker/f23-consumer-boundary-hardening.md`.

## F-24 Second Primitive Result

Checked on: 2026-07-22.

- global search now renders through Tend UI `Input` inside a second isolated mount;
- the create-task Button and search Input share one runtime/provider implementation;
- existing vanilla card/table filtering and clear behavior pass;
- all package, compensation and bundle gates remain green;
- React still does not own task data or filter state.

Detailed evidence: `docs/history/external-projects/s-tracker/f24-s-tracker-search-input.md`.

## F-25 Functional Action Result

Checked on: 2026-07-22.

- the print control now renders through Tend UI `Button` and the packaged `Print` icon;
- `#js-print-btn` remains stable, so the existing vanilla handler still owns the action;
- exact toast text `Подготовка к печати...` is preserved;
- card and table toolbar placement passes;
- a temporary custom group confirms that the complete mount moves safely to `#js-header-actions`;
- the `40 x 40` icon-only geometry is unchanged;
- all package, compensation and bundle gates remain green.

Detailed evidence: `docs/history/external-projects/s-tracker/f25-s-tracker-print-button.md`.

## F-26 Filter Trigger Result

Checked on: 2026-07-22.

- the main toolbar filter trigger now renders through Tend UI `Button`, `FilterAlt` and `Close`;
- stable vanilla selectors for opening, count and reset are preserved;
- the existing drawer and overlay open from card, table and custom-group views;
- one active money-range filter produces count `1` and the independent indicator reset returns it to `0`;
- fixed `120 x 36` geometry prevents toolbar shift between inactive and active states;
- React does not own `activeFilters`, `applyFilters`, drawer state or rerendering;
- all package, compensation and bundle gates remain green.

Detailed evidence: `docs/history/external-projects/s-tracker/f26-s-tracker-filter-trigger.md`.

## F-27 Column Settings Result

Checked on: 2026-07-22.

- the main column-settings action now renders through Tend UI `Button` and `Settings`;
- card/table visibility and `40 x 40` geometry are preserved;
- the existing columns overlay/drawer opens unchanged;
- custom-group card/table behavior and transfer to `#js-header-actions` pass;
- runtime verification found and fixed the stale React-child return anchor;
- the mount now returns to `.app-toolbar__actions` when leaving a custom group;
- React does not own column drafts, presets, library state or table rerendering.

Detailed evidence: `docs/history/external-projects/s-tracker/f27-s-tracker-columns-action.md`.

## F-28 Download Action Result

Checked on: 2026-07-22.

- the download control now renders through Tend UI `Button` and `Download`;
- `#js-download-btn` remains stable and vanilla view logic still owns visibility;
- card view remains hidden and table view remains `40 x 40`;
- custom-group card/table placement and return to the main toolbar pass;
- click remains an explicit no-op with no URL, drawer, filter or toast changes;
- static gates reject invented React handlers, requests, navigation and synthetic download behavior;
- all package, compensation and bundle gates remain green.

Detailed evidence: `docs/history/external-projects/s-tracker/f28-s-tracker-download-action.md`.

## F-29 View Switcher Result

Checked on: 2026-07-22.

- the card/table selector now renders through Tend UI `Segmented`, `CardView` and `TableView`;
- vanilla code remains the owner of visible task layout and dependent action visibility;
- the selected mode remains synchronized through explicit request/confirmation events;
- card, table, custom-group card/table and main-toolbar return scenarios pass;
- both segments have accessible radio names and stable geometry;
- the missing narrow package export was added and verified through the refreshed local tarball;
- all package, compensation and bundle gates remain green.

Detailed evidence: `docs/history/external-projects/s-tracker/f29-s-tracker-view-switcher.md`.

## F-30 Queue Tabs Result

Checked on: 2026-07-22.

- six raw queue buttons were replaced by Tend UI `Tabs`;
- active queue state is centralized in `src/domain/queue-state.js`;
- React emits queue requests and receives computed queue summaries without owning task data;
- all six queues rerender correctly and counted queues preserve `134`, `121` and `117` totals;
- selected queue survives card/table changes and custom-group hide/return;
- the narrow Tabs package export, local tarball, build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f30-s-tracker-queue-tabs.md`.

## F-31 Pagination Result

Checked on: 2026-07-23.

- generated vanilla page buttons were replaced by Tend UI `Pagination`;
- page state, validation and task slicing remain in S-Tracker vanilla modules;
- direct page selection, arrows, disabled edges and partial last page pass;
- queue/search resets and card/table page persistence pass;
- cross-page selection is preserved, and pagination clears the active bulk-action bar geometrically;
- the narrow Pagination export, local tarball, build, security and reviewed bundle-budget gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f31-s-tracker-pagination.md`.

## F-32 Task Selection Result

Checked on: 2026-07-24.

- card, table and select-all controls render through Tend UI `Checkbox` portals;
- selected IDs, visible-page selection and bulk actions remain vanilla-owned;
- single, indeterminate, select-all, cross-page and clear-selection scenarios pass;
- all `41` dynamic mounts contain Checkbox inputs and legacy controls are absent;
- the narrow Checkbox export, local tarball, build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f32-s-tracker-task-selection.md`.

## F-33 Bulk Actions Result

Checked on: 2026-07-24.

- seven legacy bulk controls were replaced by Tend UI `Button` controls;
- React owns presentation only; vanilla code owns selected IDs, visibility, dialogs and groups;
- initial hidden state, todo contextual visibility and explicit clear pass;
- move-to-group, custom-group creation and remove-from-group pass;
- status and other previously unimplemented actions remain explicit presentation-only controls;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f33-s-tracker-bulk-actions.md`.

## F-34 Move Dialog Result

Checked on: 2026-07-26.

- the native move dialog now renders one Tend UI Input and three Tend UI Buttons;
- React owns presentation only; vanilla code owns reset, lifecycle, fallback naming, groups, toast and selection;
- close, cancel, fallback `Группа` and custom-name scenarios pass;
- confirmation closes the dialog, clears selection and refreshes the product state;
- four Tend UI controls are present and legacy move controls are absent;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f34-s-tracker-move-dialog.md`.

## F-35 Preset Dialog Result

Checked on: 2026-07-26.

- the native preset-save dialog renders one Tend UI Input and three Tend UI Buttons;
- React owns presentation and controlled reset only;
- vanilla code owns empty-name validation, trimming, draft capture, preset storage and dropdown refresh;
- close, cancel, reset-on-open and trimmed-name scenarios pass;
- switching base -> saved preset confirms captured column-state replay;
- four Tend UI controls are present and legacy preset-dialog controls are absent;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f35-s-tracker-preset-dialog.md`.

## F-36 Preset Toolbar Result

Checked on: 2026-07-26.

- the preset trigger and Save action render through Tend UI Button/ChevronDown;
- React owns presentation and confirmed label/expanded/disabled state only;
- vanilla code owns dropdown visibility, preset data, dirty comparison, replay and deletion;
- initial disabled, dirty enabled, create, base/saved replay and active deletion scenarios pass;
- the dropdown is linked as a listbox and delete is an accessible semantic button;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f36-s-tracker-preset-toolbar.md`.

## F-37 Column-Settings Footer Result

Checked on: 2026-07-26.

- four footer actions render through Tend UI Button with Book/Refresh icons;
- React owns presentation and confirmed library-open/reset-disabled state only;
- vanilla code owns drawer expansion, library membership, draft reset, commit and table rerender;
- library open/close, add/reset, add/Apply and default/Apply scenarios pass;
- Apply retains its existing always-available contract;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f37-s-tracker-columns-footer.md`.

## F-38 Column-Settings Drawer Controls Result

Checked on: 2026-07-26.

- the header close action and attribute-library search render through Tend UI `Button`/`Input`;
- React owns presentation and stable DOM hooks only;
- vanilla code owns closing, library collapse, filtering, query lifecycle and draft reconstruction;
- exact filtering, empty state and query persistence scenarios pass;
- an uncommitted `internal_id` draft is discarded after close and the table remains unchanged;
- two Tend UI controls are present and legacy close/search controls are absent;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f38-s-tracker-columns-drawer-controls.md`.

## F-39 Attribute-Library Row Actions Result

Checked on: 2026-07-26.

- dynamic library rows render Tend UI `Button`, `Add` and `ArrowBack` through portals;
- React owns presentation, icon choice and accessible names only;
- vanilla code owns filtering, draft membership, reset, Apply and table rerender;
- add/return transitions, reset, draft isolation and Apply/reverse-Apply pass;
- filtered output contains one Tend UI action and no legacy row button;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f39-s-tracker-library-item-actions.md`.

## F-40 Main Column-Row Controls Result

Checked on: 2026-07-26.

- all 18 main rows render Tend UI Checkbox controls through portals;
- library-derived main rows also render Tend UI Button/ArrowBack return controls;
- React owns presentation and accessible naming only;
- vanilla code owns DOM-order collection, drag listeners, draft visibility, return and Apply;
- visibility hide/restore, return-to-library and draft-isolation scenarios pass;
- source gates retain dragstart/dragover/dragend and DOM-order contracts;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f40-s-tracker-column-row-controls.md`.

## F-41 Column Chrome Controls Result

Checked on: 2026-07-26.

- `18/18` main rows render packaged Tend UI `DragIndicator` icons;
- dynamic user presets render Tend UI `Button`/`Delete` actions;
- React owns presentation and accessible naming only;
- vanilla code owns drag order, DOM-order draft collection, deletion and active/draft fallback;
- deleting the active test preset selects `Базовое отображение`, restores the base draft and disables Save;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f41-s-tracker-column-chrome-controls.md`.

## F-42 Column-Settings Completion Result

Checked on: 2026-07-26.

- no native control or inline SVG remains in static/dynamic column-settings templates;
- a dedicated executable gate verifies 11 mounts, seven adapters and 19 built markers;
- discard, Apply/default, library add/return/reset and preset create/replay/delete pass together;
- visual layout remains aligned and browser application errors are zero;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f42-s-tracker-column-settings-completion.md`.

## F-43 Remaining Controls Audit Result

Checked on: 2026-07-26.

- remaining controls outside column settings are now counted by an executable audit;
- filter drawer is the largest remaining area: six buttons, four inputs, eight multi-select widgets and 18 inline SVG;
- Close/Reset/Apply are isolated as the low-risk F-44 wave;
- close-without-apply, apply and reset/apply baseline scenarios pass;
- selected queue count changes `134 -> 27 -> 134` across apply and reset/apply;
- aggregate build, security and bundle gates pass.

Detailed evidence: `docs/history/external-projects/s-tracker/f43-s-tracker-remaining-controls-audit.md`.

## F-44 Filter Drawer Actions Result

Checked on: 2026-07-26.

- Close, Reset All and Apply render through Tend UI `Button`;
- the Close action uses the packaged Tend UI `Close` icon;
- delegated vanilla selectors and handlers remain unchanged;
- Close preserves an uncommitted draft, Apply changes the selected queue `134 -> 27`, and Reset plus Apply restores `27 -> 134`;
- the adapter owns no filter state or product side effects;
- aggregate build, security and bundle gates pass at `944` modules and `953,065` raw / `293,999` gzip bytes.

Detailed evidence: `docs/history/external-projects/s-tracker/f44-s-tracker-filter-drawer-actions.md`.

## F-45 Money Range Controls Result

Checked on: 2026-07-26.

- lower and upper fields render through Tend UI `Input`;
- three presets render through Tend UI `Button`;
- vanilla code retains parsing, formatting, `10,000` rounding, clamping, crossed-boundary resolution, track fill, native thumbs, count, Reset and Apply;
- `1 млн - 5 млн`, manual thumb movement, Close, Apply and Reset/Apply scenarios pass;
- the selected queue changes `134 -> 27 -> 134` across Apply and Reset/Apply;
- aggregate build, security and bundle gates pass at `945` modules and `954,359` raw / `294,319` gzip bytes.

Detailed evidence: `docs/history/external-projects/s-tracker/f45-s-tracker-money-range-controls.md`.

## F-46 Multi-Select Audit Result

Checked on: 2026-07-26.

- an executable audit covers all eight custom multi-select controls;
- two controls are always visible and six are domain-scoped;
- current behavior includes dynamic options, multiple selection, one tag plus `+N`, remove, clear and outside-click close;
- current custom controls have no search, keyboard handlers or explicit combobox/listbox roles;
- installed Tend UI Select supports multiple mode, clear, tag limits and option checkboxes;
- browser baseline confirms 134 ID options, 31 title options and Apply/Reset `134 -> 4 -> 134`;
- F-47 is bounded to `id` and `title` through a vanilla-owned request/snapshot bridge.

Detailed evidence: `docs/history/external-projects/s-tracker/f46-s-tracker-multi-select-audit.md`.
