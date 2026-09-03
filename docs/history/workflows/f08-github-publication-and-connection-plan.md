# F-08 GitHub Publication And Consumer Connection Plan

## Purpose

`F-08` turns the verified local facts from `F-04G`-`F-07` into a GitHub publication and consumer connection plan.

This step does not publish packages, push to GitHub, change package entrypoints, install dependencies or contact closed corporate systems. It records what is safe to publish now and what must be fixed before Tend UI can be consumed as a clean package.

## Current Verified State

| Area | Status | Evidence |
| --- | --- | --- |
| Local Git repository | Ready locally | `git status` works on branch `main`; no remote is configured yet. |
| Dependency graph | Restored locally | `app/node_modules` exists after offline-public archive v2 plus local workspace range alignment. |
| Main/key builds | Passed locally | `F-05A` confirms main/key package builds and `dist` outputs. |
| Storybook | Passed locally | `F-06A` confirms full Storybook manager at `http://localhost:3000/`. |
| Storybook content | Indexed | `938` stories and `215` docs entries are visible through Storybook index. |
| Consumer smoke | Passed in isolated sandbox | `F-07` confirms Vite build and DOM render for `TendUI + Button`. |
| GitHub remote | Not configured | Publication target must be added by the user later. |
| Clean npm/package consumption | Not ready yet | The F-07 sandbox required diagnostic aliases and ESM shims. |

## Repository Publication Boundary

Safe to commit and publish to GitHub:

- `app/` source files;
- `app/yarn.lock`;
- local compensation packages created inside `app/packages/`;
- `docs/`;
- `source-docs/`;
- `examples/consumer-smoke/`;
- root `README.md`;
- root `.gitignore`.

Do not commit or publish:

- `app/node_modules/`;
- any `node_modules/`;
- `app/**/dist/`;
- `dist/`;
- `storybook-static/`;
- `tmp/`;
- local logs and caches.

Reason: GitHub should store source, docs, examples and reproducible instructions. Generated dependency and build artifacts should stay out of the repository unless a separate release-artifact strategy is chosen later.

## GitHub Publication Route

Recommended route after this step:

1. Review `git status --short`.
2. Commit source, docs and examples.
3. Create an empty GitHub repository.
4. Add the remote manually, for example:

```powershell
git remote add origin https://github.com/<owner>/<repo>.git
```

5. Push the current branch:

```powershell
git push -u origin main
```

6. Keep GitHub repository access public or private according to project policy. Do not add closed corporate registry credentials, tokens, `.npmrc` secrets or internal service links.

## Consumer Connection Plan

There are three different connection levels. They should not be mixed.

| Level | Status | Meaning |
| --- | --- | --- |
| Diagnostic sandbox | Passed | `examples/consumer-smoke/` documents the F-07 style alias-based Vite route. |
| Clean local package consumption | Passed in `F-09` | A consumer imports from built package entries through `examples/consumer-clean-package`. |
| Registry/GitHub Packages publication | Pending | `F-13` proves local tarball consumption; a real registry target, compensation boundary and publication/install verification are still required. |

## Tracked Consumer Smoke Example

The tracked example lives in:

```text
examples/consumer-smoke/
```

It is intentionally a diagnostic example. It mirrors the proven F-07 route and keeps the alias/shim details visible, because these are the exact gaps that must be removed before production consumption.

Verification on 2026-07-14:

```powershell
Set-Location app
corepack yarn vite build --config ../examples/consumer-smoke/vite.config.mjs
```

Result:

- build passed;
- `704` modules transformed;
- one chunk-size warning was reported;
- generated `examples/consumer-smoke/dist` was removed after verification because build artifacts are not tracked.

Expected imports:

```tsx
import { TendUI } from '@10d/tend-ui/theme';
import { Button } from '@10d/tend-ui/primitives/Button';
```

Expected rendering target:

```text
TendUI provider + one Button
```

## Clean Package Blockers

| Blocker | Why it matters | Resolution task |
| --- | --- | --- |
| `app/packages/tend-ui/dist/package.json` points to `cjs/index.js`, but `dist/cjs/index.js` is absent | Resolved in `F-09` | Root package build now creates `dist/cjs/index.js`. |
| `app/packages/tend-ui/dist/index.js` is absent | Resolved in `F-09` | Root package build now creates `dist/index.js`. |
| `exports` are deleted from `dist/package.json` by the `copy` script | Resolved in `F-09` | `prepare-package-json.js` writes production `exports`. |
| Internal `@10d/*` subpath imports need dist routing | Improved in `F-09` | Clean example maps local workspaces at package level; artifact dry-run remains next. |
| Local helper replacements are CommonJS-first | Resolved for checked helpers in `F-09` | `classnames` and `lodash` local packages now expose ESM entries. |
| `S-Tracker` is still vanilla/Vite without React layer | Candidate project cannot host Tend UI directly yet | Add a separate React adapter layer only after clean package route is defined. |

## Publication Decision

`F-08` closes GitHub repository publication planning.

It does not close npm/GitHub Packages publication readiness. That should be a follow-up group focused on package entrypoints and clean consumer consumption without aliases.

Recommended next group:

```text
F-09: clean package entrypoints and exports for consumer consumption.
```

## Verification

`F-08` is complete when:

- this document exists;
- root `README.md` reflects current F-branch status;
- `examples/consumer-smoke/` exists as a tracked diagnostic consumer example;
- tracked consumer example build passes with the documented command;
- `docs/dependency-unblock-workflow.md` marks `F-08` as `[x]`;
- related quality and connection docs point to `F-09` as the next practical group.

## F-10 Publication Readiness Addendum

`F-10` confirms that the main `@10d/tend-ui@4.82.0` artifact is structurally packable and clean of source, tests and `node_modules`.

Publication remains blocked because:

- the main package has fourteen declared internal dependencies;
- thirteen internal artifacts pass dry-run;
- `@10d/tend-ui-logos` is a real runtime import but has no `dist` package;
- package metadata still references the original closed corporate repository.

The repository source/docs/examples publication boundary remains unchanged. Package registry publication must wait for `F-11` and subsequent metadata/release-order cleanup.

## F-11 Artifact Chain Addendum

`F-11` resolves the missing logos artifact:

- `@10d/tend-ui-logos` builds locally;
- its root and documented subpath exports are valid;
- the complete main/internal artifact chain passes `15/15` dry-runs;
- a clean consumer renders the packaged `SMaterials` SVG.

The source/docs/examples GitHub boundary remains ready. Registry publication now waits only for public metadata cleanup, dependency-safe release order and an explicit publication/install step.

## F-12 Public Metadata Addendum

`F-12` completes public metadata and release-order preparation for the first fifteen-package wave:

- closed package registry routing is removed from active Yarn configuration and lockfile;
- release manifests are marked public and stripped of corporate metadata;
- seven dependency-safe publication levels are documented;
- post-cleanup package dry-run remains `15/15 PASS`.

The GitHub source publication boundary remains ready. No package was uploaded. The next publication safeguard is an isolated local tarball-install rehearsal in `F-13`.

## F-13 Tarball Rehearsal Addendum

`F-13` passed the local package-publication simulation:

- all fifteen release packages were packed in the seven-level order;
- an isolated consumer installed them with Yarn offline;
- no monorepo source aliases were used;
- Vite build and DOM smoke passed;
- five local helper compensations were required as a separate auxiliary tarball layer.

The GitHub repository boundary remains ready, but no source or package remote was contacted. Before real registry publication, `F-14` must define whether each helper compensation is replaced by its public upstream package, distributed as an offline-only artifact, or moved to a non-conflicting package identity.

## F-14 Distribution Boundary Addendum

`F-14` resolves the compensation ambiguity:

- the public release remains exactly fifteen `@10d/*` packages;
- local `classnames`, `lodash` and `uuid` packages are private offline runtime aids only;
- local `@types/lodash` and `@types/uuid` packages are private build-time aids and are excluded from consumer artifacts;
- real public-registry consumers must use the public upstream packages;
- a machine-readable policy and validation gates prevent offline-only packages from entering the public release;
- the isolated consumer passes with no actionable warnings.

No repository remote or package registry was contacted. The next safeguard is `F-15`: create a registry-agnostic release bundle and publication manifest without upload.

## F-15 Release Bundle Addendum

`F-15` creates the package-release payload while preserving the GitHub source boundary:

- source-controlled code contains the reproducible bundle generator and policy;
- generated package binaries live under ignored `release/`;
- the outer release archive can later be attached to a GitHub Release without committing binaries;
- all fifteen package artifacts have manifest entries and SHA-256 values;
- no offline-only package is present;
- no GitHub remote, registry or credential was contacted.

The next decision is not a code repair. `F-16` must select a public package registry and confirm whether the `@10d` scope is available and controlled, or whether a deliberate scope migration is required.

## F-16 Registry And Scope Addendum

`F-16` keeps the GitHub and package-registry responsibilities separate:

- GitHub is selected for source and release archive hosting;
- npmjs is selected for public package distribution;
- GitHub Packages remains a non-selected fallback;
- `@10d` ownership is unverified, so package upload is disabled;
- Git `origin` remains unconfigured;
- no credential or authenticated config was added.

This does not block preparing the source repository. `F-17` will audit the local GitHub-ready source snapshot without adding a remote or pushing.

## F-17 Source Snapshot Audit Addendum

`F-17` prepared the local GitHub handoff boundary without changing Git state:

- raw `source-docs` and generated/local artifacts are excluded;
- `.gitattributes`, snapshot policy and explicit initial-commit allowlist are ready;
- `5929` candidate files are below size limits;
- no high-confidence secret or local-only leak was found;
- nothing is staged and no remote exists.

Public GitHub readiness is not yet approved. Active source still contains 22 corporate endpoint files, 69 historical/reference files require review, and the project lacks a confirmed root license/right-to-publish statement. F-18 addresses the technical reference cleanup; the license remains an owner/legal decision.

## F-18 Source Sanitization Addendum

F-18 completed the technical cleanup described above:

- active source/config references: `0`;
- unreviewed historical references: `0`;
- stale allowlist entries: `0`;
- exact reviewed historical files: `49`;
- Storybook manager and first iframe: `200`, with `938` stories and `215` docs entries.

Public staging remains blocked only by the root license/right-to-publish confirmation. Release artifacts must be regenerated after the F-18 source/API changes in F-19.
