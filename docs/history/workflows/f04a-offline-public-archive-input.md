# F-04A Offline-Public Archive Input

## Purpose

This document records `F-04A`: prepare or provide the reviewed offline-public dependency archive input.

The goal was to make the required staging inbox files available for the archive-gated dependency restore route selected in `F-03`.

## Result

Status: `[x] complete as archive input preparation`

Created in:

```text
tmp/offline-public-archive-staging/inbox/
```

Required input files now present:

```text
offline-public-package-archive.zip
offline-public-package-archive-manifest.json
checksums.sha256
```

## Source Route

The archive candidate was prepared from public npm only.

The initial public npm check timed out inside the sandbox. The same public npm read succeeded outside the sandbox after explicit approval, and the archive was then created with public npm package tarballs.

No closed corporate source was used.

## Archive Scope

This is a minimum first archive candidate for build and Storybook unblock diagnostics.

Covered lanes:

| Lane | Included |
| --- | --- |
| Lane 1. Build Tooling Minimum | yes |
| Lane 2. Storybook And Vite Runtime | yes |
| Lane 3. Foundational React Runtime | yes |
| Minimum Lane 4. React/styled-components type packages | yes |

Package count:

```text
24
```

## Included Packages

```text
typescript
tsc-alias
rollup
@rollup/plugin-commonjs
@rollup/plugin-node-resolve
@rollup/plugin-typescript
rollup-plugin-copy
rollup-plugin-dts
rollup-plugin-import-css
rollup-plugin-postcss
turbo
storybook
@storybook/react-vite
@storybook/addon-docs
@storybook/addon-designs
vite
@vitejs/plugin-react
vite-plugin-markdown
react
react-dom
styled-components
@types/react
@types/react-dom
@types/styled-components
```

## Prepared Files

| File | Status |
| --- | --- |
| `offline-public-package-archive.zip` | present |
| `offline-public-package-archive-manifest.json` | present |
| `checksums.sha256` | present |

Archive SHA256:

```text
3020726a8efec1c1f368571d8c8cae1e071ed08977afb5bad6a73e827472ab28
```

## Quick Verification

| Check | Result |
| --- | --- |
| Manifest parses as JSON | passed |
| Package count is 24 | passed |
| Archive exists | passed |
| Checksums file exists | passed |
| Zip entry count is 24 | passed |
| Package `sourceUrl` closed-source scan | passed, 0 package source URLs point to forbidden sources |
| `node_modules` included | no |

Note: the manifest contains forbidden source names only inside the `sourcePolicy.forbiddenSources` list. Actual package `sourceUrl` values point to public npm.

## Important Boundary

This step prepares archive input only.

It does not prove that the dependency graph can already be restored. The archive contains the minimum first direct package set for build/Storybook diagnostics. `F-04B` must validate the archive and decide whether it is enough for an import/restore attempt or whether additional transitive packages/cache content are required.

## Not Done

- no archive import;
- no dependency install;
- no `node_modules` copy;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no edits inside `S-Tracker`;
- no closed corporate source access.

## Decision

`F-04A` is complete.

The staging inbox now has the required archive input files.

## Next Step

Proceed to:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
