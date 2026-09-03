# F-12 Public Package Metadata And Release Order

## Purpose

`F-12` prepares the first Tend UI package wave for a public registry without publishing anything.

The release wave is the complete runtime dependency closure of `@10d/tend-ui`: the main package plus fourteen internal `@10d/*` dependencies.

## Public Metadata Preparation

Added reusable command:

```powershell
Set-Location app
corepack yarn release:prepare-public
```

Direct check-only command:

```powershell
node scripts/prepare-public-release.js --check
```

The command performs local file operations only. It does not install, upload or contact a registry.

### Source Manifests

For the fifteen release packages:

- `publishConfig.access` is set to `public`;
- closed corporate repository metadata and corporate email fields are removed;
- existing package names, versions, descriptions, licenses, dependencies and peer dependencies are preserved.

The same closed repository/contact cleanup is applied to other workspace package manifests, but packages outside the first release wave are not marked publication-ready.

No replacement repository URL was invented. A real public GitHub repository URL should be added only after the remote exists.

### Built Manifests

For all fifteen `dist/package.json` files:

- `publishConfig.access` is `public`;
- corporate URL/contact metadata is absent;
- build, test and release scripts are removed;
- package-level tooling fields such as `prettier` are removed;
- runtime dependencies, peer dependencies, entrypoints and exports are preserved.

The preparation command must run after package builds and before any package dry-run or publication.

### Registry Routing

`app/.yarnrc` now points to:

```text
https://registry.npmjs.org
```

The closed proxy host was mechanically replaced in `app/yarn.lock`:

- closed registry occurrences: `0`;
- public npm registry occurrences: `1593`.

This changes routing only. No dependency installation was performed. Internal `@10d/*` packages will become resolvable from a registry only after they are actually published there.

Historical links inside `CHANGELOG.md` files remain archival text. They are not package metadata and are not contacted by build, install or publication commands.

## Release Closure

The runtime dependency closure contains exactly fifteen packages:

```text
@10d/tend-ui + 14 internal runtime dependencies
```

Additional feature packages such as header, notifications, search assistant, table, tree and upload are not part of this first release wave. They require their own build and publication work later.

## Dependency-Safe Release Order

Packages inside the same level can be published independently. Every level must be available before moving to the next one.

### Level 0

```text
@10d/tend-ui-factories@1.2.0
@10d/tend-ui-tokens@1.1.0
@10d/tend-ui-types@1.0.0
@10d/tend-ui-utils@1.16.2
```

### Level 1

```text
@10d/tend-ui-hooks@0.11.1
@10d/tend-ui-locale@1.4.6
@10d/tend-ui-styling@2.9.0
```

### Level 2

```text
@10d/tend-ui-api@2.0.0
```

### Level 3

```text
@10d/tend-ui-theme@0.2.5
```

### Level 4

```text
@10d/tend-ui-grid@0.1.1
@10d/tend-ui-icons@0.7.0
@10d/tend-ui-logos@1.17.3
@10d/tend-ui-typography@0.0.5
```

### Level 5

```text
@10d/tend-ui-primitives@0.23.7
```

### Level 6

```text
@10d/tend-ui@4.82.0
```

The preparation script computes this order from local `dependencies` and fails if it detects a missing local package or a cycle.

## Verification

Idempotence check:

```text
Public release metadata checked.
Release package count: 15
Files changed: 0
```

Static metadata result:

- source manifests with public access: `15/15`;
- built manifests with public access: `15/15`;
- corporate URL/email fields in release manifests: `0`;
- closed registry entries in `.yarnrc` and lockfile: `0`.

Post-cleanup package dry-run:

```text
15/15 PASS
```

No `.tgz` files were retained.

## Boundary

Passed:

- public package metadata preparation;
- dependency-safe release order;
- registry routing cleanup;
- post-cleanup artifact dry-run.

Not performed:

- package publication;
- registry authentication;
- installation from a real registry;
- full monorepo public installation;
- publication of feature packages outside the first release wave.

The root monorepo still references additional `@10d/*` feature packages that are not in this fifteen-package wave. This does not block consumers of the main `@10d/tend-ui` package, but it means a fresh public install of the entire source monorepo is not yet proven.

## Decision

`F-12` is complete with status `[x]`.

## Next Group

```text
F-13: create local package tarballs in release order and verify an isolated consumer installation without a registry.
```

This next step should simulate registry consumption locally before any real upload.

## F-13 Follow-Up

`F-13` executed the seven release levels and created all fifteen local package tarballs.

The isolated consumer installed successfully with Yarn `--offline`, built `708` modules and rendered the expected provider, Button and logo. Five local helper compensation tarballs were required outside the fifteen-package release order.

Report:

```text
docs/history/workflows/f13-local-tarball-install-rehearsal.md
```
