# GitHub Initial Commit Plan

Status: local initial commit completed in G-15; MIT is selected, while remote configuration, push and public execution remain owner actions.

## Intended Source Boundary

Include:

```text
.gitattributes
.gitignore
.dockerignore
README.md
Dockerfile.storybook
compose.storybook.yml
docker/
github-snapshot-policy.json
github-internal-reference-allowlist.json
app/
docs/
examples/
```

Exclude and keep local:

```text
source-docs/
tmp/
release/
app/node_modules/
all dist/build/Storybook outputs
.agents/
.codex/
.cache/
local environment and credential files
```

`source-docs/` contains the unmodified documentation and infrastructure references from the supplied archive. It remains available locally but is not part of the GitHub source snapshot.

## Required Gates Before Public Push Or Publication

```powershell
Set-Location app
corepack yarn release:prepare-public --check
corepack yarn release:validate-target
corepack yarn release:audit-github-snapshot
node ./scripts/audit-github-source-snapshot.js --require-ready
```

The last command must pass before public push or publication. The root MIT license is present; source-publication rights and the target remote remain owner decisions.

## Local Baseline Result

G-15 staged the exact source boundary listed above and created one intentional root commit on `main`.

- candidate files: `6028`;
- candidate size: `25,596,762` bytes;
- secrets: `0`;
- active internal references: `0`;
- unreviewed internal references: `0`;
- generated/local-only path leakage: `0`;
- configured remotes: `0`;
- push operations: `0`.

This local baseline is a rollback and review point. It does not assert that public redistribution is authorized.

## Current Blockers

- public-distribution rights have not been recorded as an owner decision;
- Git `origin` is intentionally not configured; it will be added only as a separate explicit delivery step after owner approval.

F-18 closed the technical reference gate: active, unreviewed and stale internal-reference counts are all `0`. The remaining `49` inert historical files are reviewed by exact path in `github-internal-reference-allowlist.json`.

## Future Public Restaging Command

Run only after the blockers are closed and after explicit review:

```powershell
git add -- .gitattributes .gitignore .dockerignore README.md Dockerfile.storybook compose.storybook.yml docker github-internal-reference-allowlist.json github-snapshot-policy.json app docs examples
git diff --cached --stat
git diff --cached --name-only
```

Do not use `git add .` for the first public snapshot. The explicit allowlist makes the intended boundary reviewable.

## Commit Handoff

Candidate commit message after successful review:

```text
chore: prepare Rovna UI design system repository
```

G-15 created the local commit. It did not add a remote or push any file.
