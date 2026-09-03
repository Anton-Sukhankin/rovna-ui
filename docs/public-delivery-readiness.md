# Public Delivery Readiness

Updated: 2026-09-01 after the Rovna UI identity migration.

## Technical Route

The repository contains `.github/workflows/quality.yml`. On pushes to `main`, pull requests and manual dispatch it uses public GitHub Actions and the public npm registry to install the locked graph, run blocking quality gates, build the supported package boundary and Storybook, execute tests and browser checks, rehearse registry-free consumers, and upload machine-readable evidence.

R-10 validates generated documentation, the GitHub source boundary and repository metadata. Community files, issue/PR templates, Dependabot configuration and the branch-protection runbook are present. Run `corepack yarn ci:r10:local` from `app/`; the current result is owned by `docs/r10-local-ci-equivalent.json`.

No publish command, npm token or write permission is present in this workflow.

## Local Public-Source Check

```powershell
Set-Location app
corepack prepare yarn@1.22.15 --activate
yarn install --frozen-lockfile --registry https://registry.npmjs.org
node scripts/run-eslint.js --quiet
node scripts/run-supported-package-gate.js
node scripts/run-ds-only-tests.js
node scripts/build-storybook-local.js
```

## Owner Gates

| Gate | Status | Required decision |
| --- | --- | --- |
| Source license | resolved | The repository and supported packages declare MIT; the root `LICENSE` is included in package artifacts. |
| npm scope `@rovna-ui` ownership | owner-blocked | Confirm that the selected npm account or organization controls the scope before publication. |
| GitHub remote and organization | owner-blocked | Select the target repository and configure `origin`; no remote is assumed by the codebase. |
| Package publication authorization | owner-blocked | Explicit approval and protected CI credentials are required; current tooling always keeps publication disabled. |
| Docker runtime proof | environment-optional | Docker configuration is statically validated, but Docker CLI is not required for local Storybook or tarball consumption. |

## Publication Rule

The MIT license and local namespace migration are complete. Namespace ownership and remote publication are still external owner actions; until they are resolved, the permitted distribution artifacts are local release files and the static Storybook.

## Source Boundary

Closed corporate registry, GitLab, Nexus, Figma and service environments remain prohibited and are not fallback sources. Public npm and GitHub are the only network sources allowed by the delivery route.
