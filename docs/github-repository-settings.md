# GitHub Repository Settings

Updated: 2026-08-10 after R-10.

## Purpose

This runbook describes the owner-controlled GitHub handoff for Rovna UI. R-10 prepares files and CI locally; it does not create a remote, push source or publish packages. The repository license is MIT.

## Owner Decisions Before Handoff

1. Confirm the right to place the source on GitHub.
2. Choose private or public repository visibility.
3. Confirm that MIT remains the intended license for the selected repository visibility.
4. Confirm repository owner/organization and administrator roles.
5. Decide whether npm package publication will ever be enabled. It is outside this workflow.

## Initial Repository Setup

Recommended settings:

| Setting | Value |
| --- | --- |
| Default branch | `main` |
| Actions permissions | Read repository contents only by workflow default |
| Fork pull request workflows | Require owner approval when the repository policy needs it |
| Secret scanning | Enable when available |
| Push protection | Enable when available |
| Dependabot alerts | Enable |
| Dependabot security updates | Enable |
| Actions from third parties | Allow only actions used by `.github/workflows/quality.yml`, or pin them according to organization policy |

No npm token, registry token or corporate credential is required by the quality workflow.

## Branch Protection

After the first successful GitHub Actions run, protect `main` and select the exact check names shown by GitHub. Expected jobs are:

- `Rovna UI quality / quality`;
- `Rovna UI quality / browser-quality`;
- `Rovna UI quality / release-rehearsal`.

Recommended branch rule:

- require a pull request before merge;
- require at least one approving review;
- dismiss stale approvals after new commits;
- require conversation resolution;
- require the three quality jobs above;
- require branches to be up to date before merge;
- block force pushes and branch deletion;
- apply the rule to administrators unless emergency policy requires otherwise.

Do not configure required check names before their first remote run because GitHub only exposes checks that have executed.

## Merge And Release Policy

- Use squash or rebase merge to keep a readable history; choose one convention at repository creation.
- Keep package publication disabled. Current Actions perform build and release rehearsal only.
- Keep generated `release/`, `tmp/`, `storybook-static/` and dependency directories outside source control.
- Retain CI reports for diagnosis; current workflow uses 14-day artifact retention.
- Treat changes to `exports`, peer dependencies, tokens and component behavior as review-sensitive.

## Local Pre-Push Boundary

From `app/`:

```powershell
npm run ci:r10:local
```

From the repository root:

```powershell
git status --short
git diff --check
git diff --cached --name-only
```

The last command must be empty before intentional staging. Review `docs/r10-commit-boundary.json` before creating the first commit.

## Remote Handoff

Only the authenticated owner performs these actions after the decisions above. The repository URL is intentionally not guessed.

```powershell
git remote add origin <github-repository-url>
git push -u origin main
```

After the push:

1. Wait for all three workflow jobs.
2. Confirm artifacts are available and contain no secrets.
3. Apply branch protection using the actual check names.
4. Enable security features appropriate to repository visibility.
5. Record the selected visibility, MIT license confirmation and source-publication authorization.

## Current Owner Actions

- `[ ]` Confirm rights for GitHub source placement.
- `[ ]` Choose private/public visibility.
- `[x]` Choose and add the root MIT license.
- `[ ]` Create and authenticate the GitHub remote.
- `[ ]` Run Actions once and apply branch protection.

These actions do not block local Storybook, package builds or registry-free tarball consumption.
