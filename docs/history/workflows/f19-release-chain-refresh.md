# F-19: Release Chain Refresh

Status: `[x]` - rebuilt, repacked and verified without publication.

Date: 2026-07-15

## Goal

Refresh every public Tend UI artifact after the F-18 runtime/API sanitization, recreate the registry-agnostic release bundle and prove that the new tarballs still work in an isolated consumer without contacting a registry.

## Build Result

All `15` public packages were rebuilt successfully in `7` dependency levels:

| Level | Packages | Result |
| ---: | --- | --- |
| 0 | factories, tokens, types, utils | Passed: `4/4` |
| 1 | hooks, locale, styling | Passed: `3/3` |
| 2 | api | Passed: `1/1` |
| 3 | theme | Passed: `1/1` |
| 4 | grid, icons, logos, typography | Passed: `4/4` |
| 5 | primitives | Passed: `1/1` |
| 6 | `@10d/tend-ui` | Passed: `1/1` |

The build recreated source-oriented `dist/package.json` files. The existing public-release preparation script then sanitized all `15` generated manifests. A repeated `--check` reported `0` pending metadata changes.

## Isolated Tarball Consumer

`app/scripts/rehearse-local-tarball-install.js` passed against the refreshed artifacts:

- `15` Tend UI tarballs packed in release order;
- `3` private runtime compensation tarballs used only by the offline rehearsal;
- `1560` public dependency tarballs verified from the reviewed offline mirror;
- Yarn install passed with `--offline`;
- Vite production build passed with `709` transformed modules;
- provider and Button DOM smoke passed from `@10d/tend-ui`;
- actionable consumer warnings: `0`.

The accepted Windows platform exclusions, ignored install scripts, optional Babel peer and bundle-size warning remain unchanged and do not invalidate package consumption.

## Refreshed Release Bundle

Generated locally:

```text
release/tend-ui-4.82.0/
release/tend-ui-4.82.0-release-bundle.tgz
release/tend-ui-4.82.0-release-bundle.tgz.sha256
release/f15-result.json
```

Verification:

| Check | Result |
| --- | --- |
| Public package tarballs | `15` |
| Release levels | `7` |
| Offline-only artifacts in public bundle | `0` |
| Outer archive tarball count | `15` |
| Checksum sidecar | Matched |
| Publication performed | No |
| Registry contacted | No |

Refreshed archive SHA-256:

```text
a878f3dfc5ca0d26e09a02d72fdd3ee331596e6679be6e9dc8faeb5d2183374c
```

## Runtime And Source Recheck

- Storybook root remains `200` at `http://localhost:3000/`;
- index remains `938` stories plus `215` docs entries;
- GitHub source audit still reports `0` active/unreviewed corporate references, `0` secrets, `0` oversized files, `0` local-only leaks and `0` staged files;
- the only source-publication blocker remains the missing owner-approved root license/right-to-publish confirmation.

## Not Performed

- no dependency installation;
- no registry or package publication;
- no access to closed corporate sources;
- no Git staging, commit, remote or push;
- no license generation.

## Decision

`F-19` is complete with status `[x]`. The package build, tarball consumption and registry-neutral bundle are fresh after F-18. The remaining license and package-scope ownership gates are external publication decisions, not failures of the local design-system runtime.

## Next Group

```text
F-20: prepare a reproducible containerized Storybook route and verify it locally when Docker is available, without corporate services or package publication.
```
