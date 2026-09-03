# F-16: Public Registry And Package Scope Strategy

Status: `[x]` as a target decision and credential-free configuration step.

Publication status: blocked by identity confirmation; no upload was performed.

Date: 2026-07-15

## Goal

Choose the preferred public package registry, define the package-scope rule, and prepare credential-free configuration and validation without authenticating or publishing.

## Local Findings

- all 15 release packages use the `@10d` scope;
- every release package has `publishConfig.access=public`;
- package manifests remain registry-agnostic and contain no registry URL;
- `app/.yarnrc` uses `https://registry.npmjs.org`;
- Git branch is `main`;
- Git `origin` is not configured;
- local files do not prove ownership or publish permission for the npm scope `@10d`.

No authentication attempt was made. Scope ownership cannot be inferred from a package name or from an unused public package name.

## Selected Architecture

| Concern | Decision | Status |
| --- | --- | --- |
| Source repository | GitHub | Selected, remote not configured. |
| Release archive | GitHub Release asset or equivalent file delivery | Prepared locally by F-15. |
| Public package registry | npmjs | Selected, publication blocked pending scope confirmation. |
| Package scope | Keep `@10d` only when ownership/write permission is confirmed | Unverified. |
| Fallback registry | GitHub Packages | Not selected; requires a controlled GitHub namespace and authentication. |

## Why npmjs Is Preferred

The design system is intended for repeated connection to different projects. Public npm packages can be downloaded by everyone, while publishing a scoped public package requires a user or organization account that controls the scope and uses `--access public`.

GitHub Packages remains a valid fallback, but its npm registry requires authentication for publishing and installation, including public packages, and package scope must identify a controlled GitHub user or organization. This creates more consumer setup than the selected npmjs route.

Official references:

- [npm: Creating and publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/)
- [npm: Package scope, access level, and visibility](https://docs.npmjs.com/package-scope-access-level-and-visibility/)
- [GitHub: Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
- [GitHub: Permissions for GitHub Packages](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages)

## Scope Strategy

### Route A: `@10d` Is Controlled

Keep all current package names and imports. Before publication, record the confirmed npm user or organization and verify write permission outside the repository. No package rename is needed.

### Route B: `@10d` Is Not Controlled

Do not publish any package under `@10d`. Select a scope owned by the project maintainer and migrate all fifteen public packages atomically.

The migration must update:

- all public package names;
- all internal dependency declarations;
- source imports and exports;
- TypeScript paths and Storybook aliases;
- consumer examples;
- release policy, package documentation and agent context.

A partial migration is forbidden because it would split the internal dependency graph across two namespaces.

The exact boundary is stored in `app/publication/scope-migration-plan.json`.

## Added Artifacts

```text
app/publication-target.json
app/publication/README.md
app/publication/npmjs.npmrc.example
app/publication/github-packages.npmrc.example
app/publication/scope-migration-plan.json
app/scripts/validate-publication-target.js
```

Root command:

```powershell
Set-Location app
corepack yarn release:validate-target
```

The `.npmrc` files are inactive templates. Tokens are environment-variable placeholders only. No authenticated `.npmrc`, token or account identifier is stored in the repository.

## Validation Result

```text
Publication target policy checked.
Selected registry: npmjs (https://registry.npmjs.org/)
Public packages: 15
Current scope: @10d
Scope ownership: unverified
Git origin configured: no
Repository credentials stored: no
Publication allowed: no
```

The normal validator exits successfully because the selected blocked policy is internally consistent.

The readiness gate remains intentionally negative:

```powershell
node ./scripts/validate-publication-target.js --require-ready
```

It must fail until all three conditions are explicit:

- scope ownership is confirmed;
- Git `origin` is configured;
- `publicationAllowed` is deliberately enabled after review.

## Criticality

The scope blocker is critical only for real package publication. It does not invalidate:

- local package builds;
- Storybook runtime;
- F-14 offline consumer verification;
- F-15 release bundle integrity;
- GitHub publication of source code and documentation.

## Not Performed

- no npm or GitHub authentication;
- no scope availability or ownership claim;
- no package rename;
- no active `.npmrc` replacement;
- no token creation or storage;
- no Git remote creation;
- no package upload;
- no closed corporate source access.

## Decision

`F-16` is complete with status `[x]` as a registry and scope policy step.

The selected registry is npmjs, but real publication remains blocked until the owner of a usable public scope is explicitly known. GitHub Packages is retained only as a documented fallback.

## Next Group

```text
F-17: prepare a GitHub-ready source snapshot and repository handoff through local secret, tracked/ignored-boundary and initial-commit audits, without adding a remote or pushing.
```

## F-17 Follow-Up

`F-17` confirms that registry credentials are not present in the candidate source snapshot and that generated package artifacts remain outside Git. Public source staging is still blocked by corporate runtime/reference URLs and the missing root license/right-to-publish confirmation. See `docs/history/workflows/f17-github-source-snapshot-audit.md`.

## F-18 Follow-Up

F-18 removed the runtime/reference technical blocker: active, unreviewed and stale reference counts are `0`; `49` inert historical files are covered by an exact reviewed allowlist. The only source-publication blocker is now the root license/right-to-publish confirmation. See `docs/history/workflows/f18-public-source-endpoint-sanitization.md`.
