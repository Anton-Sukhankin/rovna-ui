# Public-Only Dependency Restore Executable Runbook

## Purpose

This document records `E-17`: an executable runbook for restoring the dependency graph and build tooling through allowed public/offline-public sources.

This is not an install result. It is the controlled procedure to run when a suitable public-network or prepared offline-public environment is available.

## Starting Point

Current local state:

| Area | Status |
| --- | --- |
| `app/node_modules` | Missing |
| TypeScript CLI `tsc` | Missing |
| `tsc-alias` | Missing |
| Rollup | Missing |
| Storybook binary | Missing |
| `dist` artifacts | Missing |
| Temporary `yarn.cmd` shim | Present in `tmp/build-runner-shim/yarn.cmd` |
| Public npm attempt in current Codex shell | Previously blocked by `AggregateError [EACCES]` |

Reason for this runbook:

```text
E-15 proved that the build runner shim works, but build tooling is absent because app/node_modules is absent.
```

## Hard Boundary

Allowed:

- public npm registry: `https://registry.npmjs.org/`;
- public GitHub/open-source package sources only when explicitly visible in package metadata;
- local workspace packages under `app/packages`;
- project-local cache folders created for this restore attempt;
- `app/node_modules` creation during the restore attempt.

Forbidden:

- `packages.samoletgroup.ru`;
- internal registry mirrors;
- corporate GitLab;
- Nexus;
- Figma;
- corporate CI/CD;
- authentication prompts;
- `git+ssh` private package URLs;
- requesting access to any closed corporate system.

## Protected Files

Do not edit these files in `E-17`:

```text
app/package.json
app/yarn.lock
app/.yarnrc
app/.npmrc
app/packages/**/package.json
app/packages/**/src/**
```

If a later step needs to change package manifests, lockfile or registry config, create a separate plan first.

## Allowed New Or Changed Paths

Only these paths may be created/changed by the future restore attempt:

```text
app/node_modules/
.cache/yarn-public/
docs/dependency-unblock-log.md
docs/dependency-diagnostics.md
docs/build-diagnostics.md
```

For `E-17` itself, only documentation is changed.

## Required Preflight

Run these checks before any restore attempt:

```powershell
cd "<repo>\app"
node --version
npm.cmd --version
corepack --version
corepack yarn --version
Test-Path .\node_modules
Test-Path ..\.cache\yarn-public
Get-Content .\.yarnrc
```

Expected:

```text
node works
npm.cmd works
corepack works
corepack yarn returns 1.22.15
node_modules is missing or intentionally removed
.yarnrc may still mention the old internal registry, but the restore command must override it
```

## Scenario A: Public-Network Local Terminal

Use this if a terminal/environment can access public npm.

Working directory:

```text
<repo>\app
```

Command:

```powershell
New-Item -ItemType Directory -Force ..\.cache\yarn-public
$env:YARN_CACHE_FOLDER = (Resolve-Path ..\.cache\yarn-public).Path
$env:npm_config_registry = "https://registry.npmjs.org/"
$env:YARN_REGISTRY = "https://registry.npmjs.org/"
corepack yarn install --non-interactive --ignore-scripts --no-lockfile --registry https://registry.npmjs.org --network-timeout 600000
```

Why these flags:

| Flag / env | Purpose |
| --- | --- |
| `YARN_CACHE_FOLDER` | Keeps cache inside the project for review and cleanup. |
| `npm_config_registry` | Forces npm-compatible tooling toward public npm. |
| `YARN_REGISTRY` | Adds an explicit public registry hint for Yarn. |
| `--registry https://registry.npmjs.org` | Makes the command-level registry explicit. |
| `--no-lockfile` | Avoids old internal `resolved` tarball URLs from `app/yarn.lock`. |
| `--ignore-scripts` | Prevents lifecycle scripts during the first restore probe. |
| `--non-interactive` | Prevents prompts. |

## Scenario B: Offline Public Cache / Package Archive

Use this if public npm access is not available in the current workspace, but packages can be prepared elsewhere from public sources.

Required archive contents:

```text
public package cache or package archive
provenance file with package names, versions and source registry
restore instructions
```

Minimum provenance fields:

| Field | Required value |
| --- | --- |
| Source registry | `https://registry.npmjs.org/` or explicit public GitHub URL |
| Package name | Exact npm package name |
| Version | Exact version |
| Integrity/hash | Required when available |
| Collection date | Required |
| Prepared by | Required |

Do not use a cache/archive if provenance mentions closed corporate infrastructure.

## Stop Conditions

Stop immediately and record the first blocker if any of these occur:

- output references `packages.samoletgroup.ru`;
- output references corporate GitLab/Nexus/Figma/CI/CD/private hosts;
- Yarn asks for authentication;
- Yarn attempts `git+ssh`;
- a package resolves only from a private/corporate source;
- install scripts are required before dependency graph can be inspected;
- protected files change;
- the command tries to modify `app/yarn.lock` or package manifests;
- public npm access fails again with network/permission errors.

## Success Criteria

The restore attempt is considered successful only if:

- `app/node_modules` exists;
- `app/node_modules/.bin/tsc.cmd` exists;
- `app/node_modules/.bin/rollup.cmd` exists;
- Storybook binary exists in `app/node_modules/.bin` or can be resolved by Yarn;
- no closed corporate source was used;
- no protected file changed;
- exact command, environment and outcome are recorded.

## Verification After Successful Restore

Run these checks after restore:

```powershell
Test-Path .\node_modules
Test-Path .\node_modules\.bin\tsc.cmd
Test-Path .\node_modules\.bin\rollup.cmd
Test-Path .\node_modules\.bin\storybook.cmd
corepack yarn --version
corepack yarn workspaces info --silent
```

Then run narrow diagnostics:

```powershell
$env:PATH = (Resolve-Path ..\tmp\build-runner-shim).Path + ';' + $env:PATH
corepack yarn build:tokens
corepack yarn build:main
```

If both reach later stages, continue:

```powershell
corepack yarn build:upload
corepack yarn build:filters
corepack yarn storybook
```

## Rollback / Cleanup

Rollback only artifacts created by the restore attempt.

Before deleting, verify paths resolve inside the project:

```powershell
Resolve-Path .\node_modules
Resolve-Path ..\.cache\yarn-public
```

Allowed cleanup targets:

```text
<repo>\app\node_modules
<repo>\.cache\yarn-public
```

Cleanup command:

```powershell
Remove-Item -LiteralPath (Resolve-Path .\node_modules).Path -Recurse -Force
Remove-Item -LiteralPath (Resolve-Path ..\.cache\yarn-public).Path -Recurse -Force
```

Do not delete anything if the resolved path is outside:

```text
<repository-root>
```

## Result Recording Template

After the restore attempt, append this to `docs/dependency-unblock-log.md`:

```md
## E-18: Public-Only Dependency Restore Attempt

Date:
Environment:
Command:
Registry:
Cache folder:
Result:
First blocker, if failed:
Created paths:
Changed files:
Protected files changed: yes/no
Closed corporate source referenced: yes/no
Next step:
```

## Next Step

Original recommended next step:

```text
E-18: execute public-only dependency restore attempt in an allowed environment, or record why it cannot be executed.
```

If public-network execution is not available, `E-18` should create an offline package cache preparation checklist instead of retrying the blocked current shell.

## Status

`E-17` is complete as a runbook step.

No dependency install, build, Storybook launch, Docker build, package publication, source edit or registry access was performed in `E-17`.

## E-18 Follow-Up Status

`E-18` was completed as a blocked execution check in `docs/history/workflows/e18-public-restore-attempt.md`.

The public-only restore command was not executed in the current shell because the environment has restricted network access and this runbook forbids repeating the current-shell public npm attempt without environment change.

Offline-public cache preparation is now tracked in:

```text
docs/offline-public-package-cache-checklist.md
```

Current next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
