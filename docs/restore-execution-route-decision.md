# E-20: Restore Execution Route Decision

Date: 2026-07-06

## Purpose

Choose the next execution route after `E-19` produced the offline-public dependency manifest.

This step does not install dependencies, build packages, launch Storybook, run Docker, publish packages or change source code.

## Inputs

| Input | Source |
| --- | --- |
| Dependency manifest | `docs/offline-public-dependency-package-manifest.md` |
| Public-only restore runbook | `docs/public-only-dependency-restore-executable-runbook.md` |
| Current-shell restore blocker | `docs/history/workflows/e18-public-restore-attempt.md` |
| Offline cache checklist | `docs/offline-public-package-cache-checklist.md` |
| Dependency strategy | `docs/dependency-graph-restoration-strategy.md` |

## Current Facts

| Fact | Status |
| --- | --- |
| `app/node_modules` | absent |
| `app/packages/tend-ui/dist` | absent |
| Storybook binary | absent |
| Current shell network | restricted |
| Closed corporate sources | forbidden |
| Direct dependencies in manifest | 118 |
| Local workspace/local compensation dependencies | 32 |
| External public/offline-public candidates | 86 |
| `app/yarn.lock` package URLs | closed corporate registry only |

## Routes Considered

| Route | Decision | Why |
| --- | --- | --- |
| Public-enabled install in this Codex shell | Rejected for current step | The current shell has restricted network access, and E-18 already recorded that repeating the current-shell public npm attempt without environment change is not useful. |
| Public-enabled install in a different allowed environment | Kept as possible external execution route | This can work if a local terminal/environment has public npm access and follows the E-17 runbook, but it cannot be executed from the current shell. |
| Offline-public package archive/cache | Selected as primary route for the current workflow | It fits the current network restriction, keeps closed corporate sources out of scope, and can be prepared/reviewed before import. |
| Targeted local compensation lane | Selected only as fallback/parallel lane | Good for corporate-only services or narrow helpers, but not for foundational runtime/build tooling or complex UI mechanics. |
| Fake foundational stubs | Rejected | React, React DOM, styled-components, TypeScript, Rollup, Storybook, AntD primitives, dnd and TanStack mechanics must not be faked. |
| Closed corporate registry/GitLab/Nexus/Figma/CI artifacts | Rejected | These sources are out of scope and access will not be requested. |

## Selected Route

Primary route:

```text
Prepare an offline-public package archive/cache from the E-19 manifest, with provenance, then import it into the project only after review.
```

Secondary route:

```text
If the user runs the E-17 public-only restore command in a separate public-network local environment, record the result and import only reviewed artifacts.
```

Fallback route:

```text
Continue targeted local compensation only for packages whose missing mechanics are narrow, known and safe to replace locally.
```

## Execution Boundary

The selected route must not:

- use `packages.samoletgroup.ru` as a package source;
- use internal registry, corporate GitLab, Nexus, Figma, CI/CD or private service artifacts;
- overwrite `app/package.json`, `app/yarn.lock` or `app/.yarnrc` without a separate step;
- copy an unverified `node_modules` tree into the project;
- fake foundational build/runtime packages.

## Next Manifest Artifact

The next step should create a concrete acquisition plan, not run an install yet.

The plan must split packages into:

1. foundational minimum for build and Storybook;
2. React runtime minimum;
3. complex UI mechanic packages;
4. service/runtime utilities;
5. dev/test/release packages;
6. already local or already compensated packages.

For each package group, record:

- package name;
- requested spec;
- route;
- priority;
- expected source type;
- blocker if not available;
- whether local compensation is allowed.

## Decision

`E-20` is complete as a route decision step.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

Do not rerun build or Storybook until dependencies are restored or an approved subset is imported.
