# F-17: GitHub Source Snapshot Audit

Status: `[!]` - audit completed, public-source readiness is blocked.

Date: 2026-07-15

## Goal

Prepare and audit the exact local source boundary for a future GitHub repository without staging, committing, adding a remote or pushing.

## Implemented Repository Boundary

Added:

- `.gitattributes` with stable text and binary handling;
- extended `.gitignore` for local archives, generated output, agent/cache folders, environment files and key files;
- `github-snapshot-policy.json` as the machine-readable source boundary;
- `app/scripts/audit-github-source-snapshot.js`;
- root command `release:audit-github-snapshot`;
- `docs/github-initial-commit-plan.md` with an explicit future staging allowlist.

The following directories remain available locally but are excluded from Git:

```text
source-docs/
tmp/
release/
app/node_modules/
build and dist outputs
.agents/
.codex/
.cache/
```

`source-docs/` is excluded because it contains the unmodified source documentation and original GitLab/Kubernetes/Docker configuration from the supplied archive, including closed corporate endpoints and old authentication commands. No file was deleted.

## Audit Command

```powershell
Set-Location app
corepack yarn release:audit-github-snapshot
```

Readiness gate:

```powershell
node ./scripts/audit-github-source-snapshot.js --require-ready
```

The normal command records a complete audit even when the snapshot is blocked. The readiness command must fail while any public-source blocker remains.

## Verified Snapshot

| Check | Result |
| --- | --- |
| Candidate files | `5929` |
| Total candidate size | `24671008` bytes, approximately `24.67 MB` |
| Maximum single file | approximately `3.15 MB` |
| Files over 100 MB policy | `0` |
| High-confidence secret findings | `0` |
| Local-only files leaking into candidates | `0` |
| Files outside the allowed roots | `0` |
| Staged files | `0` |
| Git origin | Not configured |
| Root license file | Missing |
| Files with closed corporate references | `91` |
| Active source/config files with such references | `22` |
| Documentation/story/changelog reference files | `69` |

Machine-readable result:

```text
tmp/f17-github-snapshot-audit.json
```

The report stores only file names, line numbers and finding types. It does not reproduce credential values.

## Secret Audit Result

The final scan found no high-confidence private keys, npm/GitHub/AWS/Slack tokens or non-placeholder npm auth token assignments.

Environment and credential file patterns are now ignored proactively. Inactive publication templates continue to use environment-variable placeholders only.

## Public-Readiness Blockers

### 1. Corporate Runtime Endpoints

Twenty-two active source/config files contain hard-coded closed corporate domains. The main groups are:

- Storybook and Vite proxy targets;
- header navigation, profile, support, analytics and application links;
- notifications and search service URLs;
- test/playground e-mail data embedded in active source modules;
- internal issue/documentation links in source comments.

These are not credentials, but they are inappropriate defaults for a reusable public design system and can make runtime behavior point to unavailable services.

### 2. Historical Reference Files

Sixty-nine docs, stories, raw examples and changelog files contain old corporate URLs or e-mail references. They need either redaction or an explicit reviewed historical-reference allowlist before public staging.

### 3. License And Distribution Rights

All fifteen F-15 release manifests declare `ISC`, but the repository has no root `LICENSE` text and no confirmed copyright-holder statement. A license must not be invented automatically.

Before public GitHub or npm distribution, the project owner must confirm the right to redistribute the archive-derived source and provide the correct license/copyright identity. This does not block a private local or private GitHub repository.

### 4. Git Destination

Git `origin` is not configured. This is expected for F-17 and does not affect the local audit, but it remains required before an eventual push.

## Initial Commit Handoff

The intended future staging allowlist is:

```text
.gitattributes
.gitignore
README.md
github-snapshot-policy.json
app/
docs/
examples/
```

The exact commands and review sequence are in `docs/github-initial-commit-plan.md`. No staging command was executed in F-17.

## Not Performed

- no file deletion;
- no source endpoint replacement;
- no license creation;
- no Git staging or commit;
- no Git remote creation;
- no GitHub authentication or push;
- no package publication;
- no closed corporate source access.

## Decision

`F-17` is diagnostically complete with status `[!]`.

The repository boundary and initial-commit handoff are prepared, but public-source readiness is blocked by active corporate endpoints, unreviewed historical references and the missing license/right-to-publish confirmation.

## Next Group

```text
F-18: externalize or replace closed corporate endpoints in active source/config files and define the redaction/allowlist policy for historical references, while keeping the license decision as an explicit owner/legal input.
```

## F-18 Follow-Up

F-18 closed the technical findings recorded here: active, unreviewed and stale reference counts are now `0`, while `49` inert historical files are reviewed by exact path. The current audit is blocked only by `root-license-missing`. See `docs/history/workflows/f18-public-source-endpoint-sanitization.md`.
