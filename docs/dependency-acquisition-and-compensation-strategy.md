# Dependency Acquisition And Compensation Strategy

## Purpose

This document records the `E-05` decision after the controlled public npm diagnostic stopped on a network access error in the current execution environment.

The goal is to define how Rovna UI dependencies should be acquired or compensated without using closed corporate sources.

## Current Status

Checked on: 2026-07-05.

`E-04` ran a controlled public-only diagnostic install using:

```text
--registry https://registry.npmjs.org
--no-lockfile
```

The attempt stopped during package resolution:

```text
Trace: AggregateError [EACCES]
```

The first visible URL was:

```text
https://registry.npmjs.org/@types%2freact
```

Result:

- public npm was the selected target source;
- `app/node_modules` was not created;
- no build or Storybook verification became possible;
- closed corporate sources were not used;
- the result proves a network/access limitation in this Codex environment, not absence of the public package.

## Hard Boundaries

- Do not use or request access to closed corporate sources: internal registry, corporate GitLab, Nexus, Figma, CI/CD, service environments or company-only package mirrors.
- Do not treat `packages.samoletgroup.ru` entries in `app/yarn.lock` as available package sources.
- Do not blindly retry installs in this Codex environment after the public npm `EACCES` result.
- Do not rewrite foundational runtime/build dependencies manually as a shortcut.
- Do not mark Storybook, build or consumer connection as verified until they actually run.

## Selected Strategy

Use a mixed public/local strategy:

1. Use the local archive and `app/packages` as the source of truth for all present `@rovna-ui/components-*` packages.
2. Acquire foundational public dependencies from public/offline-public sources, not from corporate sources.
3. Mock, disable or stub corporate-only service flows.
4. Replace small helper dependencies locally only after exact import usage is reviewed.
5. Convert complex unavailable UI mechanics into separate component-level implementation tasks with acceptance criteria.

## Allowed Acquisition Routes

| Route | When to use | Output | Notes |
| --- | --- | --- | --- |
| Public npm from a network-enabled local terminal | When the user can run the public-only command outside the current restricted Codex shell. | `app/node_modules` or a new diagnostic error. | Must use public npm only and avoid corporate registry. |
| Prepared offline public package cache/archive | When public packages can be collected elsewhere from public npm/GitHub and brought into this project. | Reusable offline cache/package archive with provenance. | Provenance must state public source and package versions. |
| Another public-only network-enabled environment | When a clean environment can access public npm/GitHub without corporate sources. | Install/build diagnostic result. | Must not rely on closed company infrastructure. |
| Local compensation | When a dependency is corporate-only, unavailable, or small enough to replace safely. | Stub, mock, local helper or component-level task. | Requires exact affected files/components and expected behavior. |

## Dependency Decision Matrix

| Dependency group | Route | Local replacement allowed? | Notes |
| --- | --- | --- | --- |
| `react`, `react-dom` | Acquire from public/offline-public source. | No, unless the project is intentionally rewritten away from React. | Foundational runtime for the whole design system. |
| `styled-components` | Acquire from public/offline-public source. | No for the current plan. | Too central to theme, variants and visual states. |
| Storybook stack | Acquire from public/offline-public source. | No practical replacement in this workflow. | Needed to view and verify stories. |
| TypeScript/Rollup/Vite/Turbo/build tooling | Acquire from public/offline-public source. | No, except tiny local config stubs. | Needed to produce `dist` and verify package output. |
| Local `@rovna-ui/components-*` packages | Use local workspace source. | Not applicable. | These are present in `app/packages`; do not fetch them from a closed registry. |
| `@rovna-ui/eslint-config`, `@rovna-ui/prettier-config` | Local stub/config or defer. | Yes, because they are tooling/config only. | Do not block runtime UI on these packages. |
| `samolet-oauth2` and auth-bound flows | Mock/disable/stub. | Yes, as service mocks only. | Do not request corporate auth/service access. |
| `axios`, `centrifuge`, service query flows | Public route first or mock/disable for Storybook. | Limited. | Core UI Storybook should not depend on live services. |
| `classnames` | Public route first; local helper acceptable if needed. | Yes. | Low-risk helper if usage is simple. |
| Specific `lodash` helpers | Public route first; local helper only by exact import. | Yes, selectively. | Do not rewrite lodash wholesale. |
| `query-string` | Public route first; local helper if usage is narrow. | Yes, selectively. | Only after exact query behavior is known. |
| `uuid` | Public route first. | Only if deterministic/simple ID behavior is enough. | Must not break stable IDs where uniqueness matters. |
| `dayjs` | Public route first. | Avoid unless a very narrow usage is proven. | Date formatting/locale behavior is easy to break. |
| `antd-core` and complex AntD primitives | Public route first. | Only as separate component-level tasks. | Important for select, date/time, overlays, forms and other primitives. |
| `rc-drawer`, `rc-overflow` | Public route first. | Only as focused primitive tasks. | Overlay/measurement behavior needs visual/runtime checks. |
| `@dnd-kit/*` | Public route first. | Only as separate complex mechanics tasks. | Drag-and-drop needs pointer, keyboard and reorder verification. |
| `@tanstack/*` | Public route first. | Only as separate complex mechanics tasks. | Table/tree/query/virtualization behavior is non-trivial. |

## Local Compensation Rules

Local compensation is allowed only when all of these are true:

1. The missing dependency and exact import sites are known.
2. The affected package/component/story is known.
3. The expected behavior is described from local source, stories or docs.
4. The compensation can be verified with a build, Storybook story, unit test, or focused runtime check once dependencies allow execution.
5. The compensation does not silently change public imports or package names.

Local compensation is not a blanket rewrite of the design system. It is a set of small, reviewable tasks.

## Compensation Task Template

```md
# Compensation Task: <dependency> / <component>

## Dependency

<package name and version/range if known>

## Affected Package Or Component

<local package, component, story and public import>

## Source Evidence

- <source file>
- <story file>
- <docs/passport if available>

## Missing Behavior

<what the dependency provided: hover/focus state, overlay, keyboard interaction, drag-and-drop, table model, date formatting, API mock, etc.>

## Replacement Strategy

<public dependency, local helper, stub, mock, disabled scenario, or component-level implementation>

## Required States And Interactions

<states/interactions that must be preserved>

## Verification

- <build command or focused check>
- <Storybook story>
- <consumer smoke check if relevant>

## Risk

<low / medium / high and reason>

## Status

<planned / in progress / blocked / done>
```

## Not Done In E-05

- No dependency install.
- No network call.
- No build.
- No Storybook launch.
- No Docker build.
- No package publication.
- No source-code edits.
- No edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`.
- No changes inside `S-Tracker`.

## Decision

`E-05` is complete as a strategy decision.

The chosen path is:

```text
Acquire foundational public dependencies through public/offline-public routes when possible; compensate locally only for corporate-only, unavailable, or narrow helper/mechanic cases after exact usage is known.
```

## E-06 Follow-Up

`E-06` is complete.

The local compensation backlog is recorded in:

```text
docs/local-compensation-backlog.md
```

It separates first safe candidates from deferred complex mechanics and protected dependencies.

`E-07` is also complete for the first low-risk slice:

```text
LC-03 tooling config stubs
```

Details are recorded in:

```text
docs/tooling-config-stubs.md
```

`E-08` is complete as a blocked build diagnostic after LC-03. Details are recorded in:

```text
docs/history/workflows/e08-build-after-lc03-diagnostics.md
```

The diagnostic confirms that config stubs are recognized by Yarn workspaces, but build still stops on nested plain `yarn` and missing `app/node_modules`.

`E-09` is complete for the next low-risk slice:

```text
LC-01 service auth mock boundary
```

Details are recorded in:

```text
docs/service-auth-mock-boundary.md
```

`E-10` is complete for the next low-risk slice:

```text
LC-05 narrow query-string replacement
```

Details are recorded in:

```text
docs/query-string-replacement.md
```

`E-11` is complete for the next low-risk slice:

```text
LC-04 class name helper
```

Details are recorded in:

```text
docs/classnames-helper-replacement.md
```

`E-12` is complete for the next low-risk slice:

```text
LC-06 uuid helper
```

Details are recorded in:

```text
docs/uuid-helper-replacement.md
```

`E-13` is complete as a blocked build diagnostic checkpoint after LC-04 and LC-06.

Details are recorded in:

```text
docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md
```

`E-14` is complete as a build-runner strategy step.

Details are recorded in:

```text
docs/history/workflows/e14-build-runner-strategy.md
```

`E-15` is complete as a blocked shimmed build diagnostic.

Details are recorded in:

```text
docs/history/workflows/e15-shimmed-build-diagnostics.md
```

`E-16` is complete as a dependency graph and build tooling restoration strategy step.

Details are recorded in:

```text
docs/dependency-graph-restoration-strategy.md
```

`E-17` is complete as an executable public-only dependency restore runbook step.

Details are recorded in:

```text
docs/public-only-dependency-restore-executable-runbook.md
```

## Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

The next step should not start broad component rewrites. Foundational build tools such as TypeScript, tsc-alias, Rollup and Storybook should not be replaced with local stubs.
