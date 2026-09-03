# Dependency Source And Mechanics Map

## Purpose

This document closes `E-02`: it maps Rovna UI dependencies by source route and by the mechanics they provide.

The goal is not to install anything yet. The goal is to understand what can be restored from local or public sources, what is corporate-only or unavailable, and what may need local compensation.

## Boundary

Current rule:

- local Rovna UI source code in `app/` is the source of truth for the design system;
- local workspace packages `@rovna-ui/components-*` must be resolved from `app/packages`, not from a closed registry;
- public npm, GitHub and other open codebases may be used only as explicit controlled steps;
- closed corporate sources are forbidden: internal registry, corporate GitLab, Nexus, Figma, CI/CD and company-specific service environments;
- this step does not run install, build, Storybook, Docker or package publication;
- this step does not edit `app/package.json`, `app/yarn.lock`, `.yarnrc`, source code or consumer projects.

## Source Route Legend

| Route | Meaning | Current action |
| --- | --- | --- |
| Local workspace | Source package exists in `app/packages`. | Keep local and wire through workspaces/build. |
| Public npm/GitHub | Package is normally available from public package/code sources. | Candidate for `E-03`, only as a controlled public-source step. |
| Corporate-only/unavailable | Package or service appears tied to closed corporate infrastructure. | Do not request access; mock, disable, stub or replace locally. |
| Local compensation candidate | The dependency can potentially be replaced by small local code or a focused implementation. | Create a separate task only after exact usage is known. |
| Runtime unverified | Static imports exist, but behavior is not verified because build/Storybook are blocked. | Verify after dependency route is handled. |

## Evidence Summary

| Item | Evidence |
| --- | --- |
| Local packages | 37 packages exist in `app/packages`. |
| Package manager | Root package declares `packageManager: yarn@1.22.15`. |
| Workspace model | Root `app/package.json` uses `workspaces: ["packages/*"]`. |
| Storybook command | Root script is `storybook dev -p 3000`. |
| Registry config | `app/.yarnrc` points to `https://packages.samoletgroup.ru/repository/npm-all`. |
| Installed graph | `app/node_modules` is absent. |
| Build output | `dist` is absent for main/key packages from previous diagnostics. |
| Config mismatch | Resolved as `E-07 / LC-03`: local stub packages now exist for exact names `@rovna-ui/eslint-config` and `@rovna-ui/prettier-config`. |

## Local Workspace Packages

The following source packages are present locally and should be treated as local workspace packages:

```text
@rovna-ui/components
@rovna-ui/ai-chat
@rovna-ui/api
@rovna-ui/assets
@rovna-ui/babel-config
@rovna-ui/base
@rovna-ui/columns-settings
@rovna-ui/eslint-config-legacy
@rovna-ui/eslint-local-config
@rovna-ui/factories
@rovna-ui/favicons
@rovna-ui/filters
@rovna-ui/fonts
@rovna-ui/form
@rovna-ui/grid
@rovna-ui/header
@rovna-ui/hooks
@rovna-ui/icons
@rovna-ui/jest-config
@rovna-ui/locale
@rovna-ui/logos
@rovna-ui/notifications
@rovna-ui/primitives
@rovna-ui/release-it-config
@rovna-ui/rollup-config
@rovna-ui/search-assistant
@rovna-ui/styling
@rovna-ui/table
@rovna-ui/theme
@rovna-ui/tokens
@rovna-ui/tools
@rovna-ui/tree
@rovna-ui/ts-config
@rovna-ui/types
@rovna-ui/typography
@rovna-ui/upload
@rovna-ui/utils
```

## Dependency Source Matrix

| Dependency / group | Source route | Static evidence | Affected packages / components | Mechanics provided | Route / next action |
| --- | --- | --- | --- | --- | --- |
| `@rovna-ui/components-*` workspace packages | Local workspace | 37 local packages in `app/packages`; root dependencies use `*`. | All design-system packages. | Design-system source: theme, tokens, primitives, components, utilities, services and tooling packages. | Keep local. Do not fetch these packages from a closed corporate registry while source exists locally. |
| `@rovna-ui/eslint-config`, `@rovna-ui/prettier-config` | Local workspace stubs | Declared in root `devDependencies` / `prettier`; local stubs added in `app/packages/eslint-config` and `app/packages/prettier-config`. | Tooling only. | Lint and formatting presets. | `E-07 / LC-03` complete; does not verify install/build by itself. |
| `react`, `react-dom` | Public npm/GitHub | `react` appears in 1625 TS/TSX files; `react-dom` in 10 files. | Whole React runtime, Storybook, portals and render checks. | Component rendering, hooks, context, portals and Storybook runtime. | Mandatory public dependency route. Do not reimplement. Restore only in a controlled public-source step. |
| `styled-components` | Public npm/GitHub | 277 TS/TSX files. | Theme, primitives, visual components, layout and styling packages. | Runtime CSS-in-JS, themed styles, variants and visual states. | Mandatory public dependency route. Local replacement would be high risk and should not be first choice. |
| Storybook stack: `storybook`, `@storybook/react-vite`, `@storybook/addon-docs`, `@storybook/addon-designs` | Public npm/GitHub | Declared in root dev dependencies; `.storybook` config exists. | Storybook preview, docs and design references. | Component catalog, visual review, stories runtime. | Restore via controlled public-source step before verifying Storybook. |
| Build stack: `typescript`, `rollup`, Rollup plugins, `vite`, `turbo`, Babel packages, `tsc-alias` | Public npm/GitHub | Declared in root dev dependencies and package scripts. | Package build pipeline and `dist` generation. | Type generation, bundling, CSS handling, workspace builds and Vite preview. | Restore via controlled public-source step before build verification. |
| `antd-core` | Public npm/GitHub candidate through alias | 126 TS/TSX files; dependency diagnostics identified it as a major UI primitive dependency. | `@rovna-ui/components`, primitives, grid, table, theme, typography-related code. | Base UI primitives, form/select/date/overlay/table-like behavior, theme integration. | Prefer public restoration if alias resolves to public Ant Design. If not, split into component-level compensation tasks. |
| `rc-drawer`, `rc-overflow` | Public npm/GitHub | 1 TS/TSX file each. | Drawer and overflow primitives. | Drawer overlay behavior, overflow measurement/layout. | Public route first; local compensation possible only as focused primitive task. |
| `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | Public npm/GitHub | 3, 8 and 3 TS/TSX files. | Columns settings and tree row interactions. | Drag-and-drop sensors, sortable ordering, transforms. | Public route first. Local compensation is a separate complex mechanics task. |
| `@tanstack/react-table`, `@tanstack/react-virtual`, `@tanstack/react-query` | Public npm/GitHub | 14, 2 and 21 TS/TSX files. | Tree/table logic, virtual lists, notifications/search assistant data flows. | Table/tree state logic, virtualization and async query/cache behavior. | Public route first. Local compensation only after Storybook/build shows exact broken scenarios. |
| `axios` | Public npm/GitHub | 30 TS/TSX files. | `@rovna-ui/api`, notifications, search assistant and service flows. | HTTP client and request/response handling. | Public route or limited local wrapper only if service scenarios are mocked. |
| `samolet-oauth2` | Corporate-only/unavailable | 4 TS/TSX files. | Notifications and search assistant service packages. | Corporate auth/client credentials flow. | Do not access corporate source. Mock or disable service flows in Storybook; isolate from core UI build where possible. |
| `centrifuge` | Public npm/GitHub, service/realtime | 5 TS/TSX files. | Notifications realtime features. | Realtime subscription/client mechanics. | Public route possible, but Storybook can mock/disable realtime scenarios first. |
| `query-string`, `zustand`, `storeon` | Public npm/GitHub | 2, 1 and 5 TS/TSX files. | Notifications/search assistant state and API helpers. | Query serialization, local state stores and feature state flow. | Public route first; local compensation possible for small usage if needed. |
| `lodash` | Public npm/GitHub / local helper candidate | 82 TS/TSX files. | Columns settings, filters, table/tree/components and utilities. | Collection helpers, object helpers, debounce/throttle-like helpers depending on usage. | Public route first. Replace locally only by exact imported helpers, not wholesale guessing. |
| `classnames` | Local workspace replacement after `E-11` | 32 TS/TSX files. | Header, upload, primitives and visual components. | Class name composition for visual states. | Local replacement implemented in `docs/classnames-helper-replacement.md`; runtime visual verification still pending. |
| `uuid` | Local workspace replacement after `E-12` | Runtime imports use only `v4()`; other mentions are stories/docs/field names. | Upload attachments, columns settings presets, filters presets. | Stable internal IDs for uploaded files and saved presets. | Local replacement implemented in `docs/uuid-helper-replacement.md`; runtime verification still pending. |
| `dayjs` | Public npm/GitHub | 21 TS/TSX files. | Storybook locale setup, filters, date/time components and stories. | Date parsing, formatting, locale and date calculations. | Public route first. Local replacement is risky for date behavior. |
| `js-sha1`, `use-sync-external-store` | Public npm/GitHub / small helper candidate | Manifest/import evidence from diagnostics; `use-sync-external-store` in 2 TS/TSX files. | Form hooks and service/helper flows. | Hashing and React external-store compatibility behavior. | Public route first; local compensation only after exact use is reviewed. |
| `sharp`, `png-to-ico`, `react-helmet` | Public npm/GitHub | 1 TS/TSX/script file each in static scan. | Assets/favicons tooling and favicon provider. | Image processing, icon generation and document head integration. | Defer unless asset build/favicons become part of the verified path. |

## Priority Map

| Priority | Group | Why it matters |
| --- | --- | --- |
| P0 | React, React DOM, styled-components, Storybook stack, build stack | Without these, no meaningful runtime, build or Storybook verification is possible. |
| P1 | `antd-core`, `rc-*`, TanStack, DnD Kit | These drive complex UI mechanics: primitives, overlays, table/tree logic, drag-and-drop and virtual lists. |
| P2 | `axios`, `samolet-oauth2`, `centrifuge`, state/query service packages | These affect feature/service flows and can often be mocked or disabled for Storybook. |
| P3 | Helper packages and asset/tooling packages | Useful for completeness, but many can be restored later or compensated locally after exact usage review. |

## Compensation Strategy

Use this order:

1. Prefer local workspace packages for all available `@rovna-ui/components-*` packages.
2. Prefer public npm/GitHub restoration for public runtime packages in a controlled step.
3. Do not request or use closed corporate sources.
4. Mock or disable corporate service flows, especially auth/realtime/API scenarios.
5. Create local stubs only for tooling/config packages when they block build but do not affect runtime UI.
6. Replace small helpers locally only after exact imports and behavior are known.
7. Create separate implementation tasks for complex UI mechanics such as overlays, select behavior, table/tree logic, drag-and-drop and virtualization.

## E-02 Decision

`E-02` is complete as a documentation and static-analysis step.

No install, network call, build, Storybook launch, Docker build, publication or source-code change was performed.

Updated next step after `E-06`:

```text
E-07: choose and implement the first low-risk local compensation slice.
```

Build, Storybook and consumer checks remain unverified because `E-04` did not create `app/node_modules`; the public npm attempt stopped with `AggregateError [EACCES]`.

`E-05` is recorded in `docs/dependency-acquisition-and-compensation-strategy.md`. The selected strategy is to acquire foundational public dependencies from public/offline-public routes where possible, and to use local compensation only for corporate-only, unavailable or narrow helper/mechanic cases after exact import usage is known.

`E-06` is recorded in `docs/local-compensation-backlog.md`. The first safe candidates are tooling config stubs, service auth mock boundary, narrow query serialization helper and class name helper. Complex UI mechanics remain deferred to separate component-level tasks.

`E-07` implemented `LC-03` tooling config stubs and is recorded in `docs/tooling-config-stubs.md`.

`E-08` confirmed that the config stubs are recognized by Yarn workspaces, but build remains blocked by nested plain `yarn` and missing `app/node_modules`. The result is recorded in `docs/history/workflows/e08-build-after-lc03-diagnostics.md`.

`E-09` implemented `LC-01` service auth mock boundary. The local package `samolet-oauth2` is now recognized by Yarn workspaces and used as a workspace dependency by notifications/search-assistant. The result is recorded in `docs/service-auth-mock-boundary.md`.

`E-10` implemented `LC-05` narrow query-string replacement. The local package `query-string` is now recognized by Yarn workspaces and used as a workspace dependency by notifications/search-assistant. The result is recorded in `docs/query-string-replacement.md`.

`E-11` implemented `LC-04` class name helper. The local package `classnames` is now recognized by Yarn workspaces and used as a workspace dependency by primitives, typography, upload, header, table and tree packages. The result is recorded in `docs/classnames-helper-replacement.md`.

`E-12` implemented `LC-06` uuid helper. The local packages `uuid` and `@types/uuid` are now recognized by Yarn workspaces; local `v4()` usage is covered. The result is recorded in `docs/uuid-helper-replacement.md`.

`E-13` re-ran build diagnostics after LC-04/LC-06. The result is recorded in `docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md`; the active blocker remains nested plain `yarn` plus missing `app/node_modules`.

`E-14` defined the build-runner strategy for nested plain `yarn` calls. The result is recorded in `docs/history/workflows/e14-build-runner-strategy.md`; the selected route is a temporary local `yarn.cmd` shim for the next diagnostic shell.

`E-15` tested the temporary shim. The result is recorded in `docs/history/workflows/e15-shimmed-build-diagnostics.md`; the build now reaches `tsc`, then stops because build tooling is missing and `app/node_modules` is absent.

`E-16` defined the dependency graph and build tooling restoration strategy. The result is recorded in `docs/dependency-graph-restoration-strategy.md`; foundational tools must come from public/offline-public sources, not fake local stubs.

`E-17` prepared the executable public-only dependency restore runbook. The result is recorded in `docs/public-only-dependency-restore-executable-runbook.md`; no install was run.

Updated next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
