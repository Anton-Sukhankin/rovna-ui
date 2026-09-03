# Offline Public Package Cache Checklist

Date: 2026-07-06

## Purpose

This checklist defines how to prepare a dependency cache/archive without using closed corporate sources.

It follows `E-18`, where the public-only restore attempt could not be executed in the current network-restricted shell.

## Allowed Sources

Allowed:

- public npm registry;
- public GitHub repositories;
- package archives downloaded from public sources with recorded provenance;
- local project files already present in this repository.

Forbidden:

- internal registry;
- corporate GitLab;
- Nexus;
- private Figma files;
- corporate CI/CD artifacts;
- any package source that requires closed corporate access.

## Required Manifest

Before importing any archive into this project, create a manifest with:

| Field | Meaning |
| --- | --- |
| package | Package name. |
| version | Exact requested version or range. |
| source | Public source URL or local workspace path. |
| route | `public npm`, `public GitHub`, `local workspace`, `local compensation`, or `defer`. |
| reason | What mechanic/tooling this package provides. |
| provenance | URL, checksum, archive name, or note explaining where it came from. |
| status | `needed`, `available`, `blocked`, `compensated`, or `deferred`. |

## Package Groups To Cover

| Group | Examples | Expected route |
| --- | --- | --- |
| Foundational runtime | `react`, `react-dom`, `styled-components` | public/offline-public, not fake stubs |
| Build tooling | `typescript`, `tsc-alias`, Rollup packages | public/offline-public, not fake stubs |
| Storybook tooling | `@storybook/*`, `storybook` binary dependencies | public/offline-public |
| Public UI mechanics | `@tanstack/*`, `@dnd-kit/*`, `rc-*` if used | public/offline-public or separate compensation task |
| Local Rovna UI packages | `@rovna-ui/components-*` present under `app/packages` | local workspace |
| Corporate-only/service flows | auth, realtime, private service packages | mock/disable/compensate locally |
| Small helpers | `lodash`, `classnames`, `uuid`, `query-string` | public/offline-public or narrow local compensation after usage audit |

## Import Rules

Do not copy a random `node_modules` tree without provenance.

Acceptable offline inputs:

- a package tarball set with a manifest;
- a Yarn cache archive with provenance;
- a generated dependency manifest that can be reviewed before import.

Any imported archive must be extracted only into an approved temporary/cache folder first.

Protected files:

- `app/package.json`;
- `app/yarn.lock`;
- `app/.yarnrc`;
- component source files;
- Storybook config;
- generated `dist` output.

## Stop Conditions

Stop and record a blocker if:

- a package is available only from a closed corporate source;
- provenance is missing;
- a package name/version cannot be matched to local `package.json` or `yarn.lock`;
- import would overwrite protected files;
- the archive contains source code that cannot be identified as public or local.

## Next Step

Recommended next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

The manifest should be generated from local metadata only and must not perform network requests.
