# R-10: GitHub-Ready Repository And CI

Updated: 2026-09-01.

Status: passed with owner actions.

## Result

The repository is prepared as a DS-only source project for an intentional GitHub handoff. Community files, a blocking CI workflow, source-boundary audit and repository-settings runbook are present. No remote, commit, push or package publication was performed.

Volatile totals are not repeated here. Current owners are:

- `docs/r10-github-readiness.json` for source and workflow readiness;
- `docs/r10-github-ready-gate.json` for the aggregate R-10 gate;
- `docs/r10-local-ci-equivalent.json` for the local CI-equivalent execution;
- `docs/q13-ci-quality-report.json` for CI contract validation;
- `docs/r10-commit-boundary.json` for the current review boundary.

## Repository Boundary

The source policy excludes dependency directories, static Storybook builds, release scratch, browser artifacts, caches, environment files and keys. Historical corporate references are reviewed by exact file and cannot be allowlisted in active source.

The root and scoped `AGENTS.md` files are part of the GitHub source snapshot. S-Tracker and closed corporate sources are outside the active DS-only route.

## CI Contract

`.github/workflows/quality.yml` contains sequential quality, browser-quality and release-rehearsal jobs. It uses read-only repository permission, bounded timeouts, dependency caching, failure artifacts and no publication command or secret reference.

The local equivalent now includes the agent-governance gate alongside documentation, Storybook, package, security, API, artifact and GitHub-readiness checks.

## Verification

From `app/`:

```powershell
corepack yarn quality:ci:check
corepack yarn github:r10:audit
corepack yarn quality:r10
corepack yarn ci:r10:local
```

The latest local execution passed every declared command. Exact command and check totals remain in the machine reports above.

## Owner Actions

Before a public handoff, the owner must:

1. Confirm the right to place the source on GitHub.
2. Choose repository visibility.
3. Choose a root license or intentionally keep the project without an open-source license.
4. Configure an authorized remote and perform the first reviewed push.
5. Enable branch protection after the first successful GitHub Actions run.

These actions do not block local Storybook, package builds or registry-free tarball integration.
