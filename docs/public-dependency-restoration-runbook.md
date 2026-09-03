# Public Dependency Restoration Runbook

## Purpose

This document closes `E-03`: it defines how a future public-only dependency restoration attempt must be performed.

No install is executed in `E-03`. This runbook exists so that the next executable step can be controlled, reversible and limited to public sources.

## Current Starting Point

Checked on: 2026-07-05.

| Area | Status |
| --- | --- |
| Local Rovna UI source | Present in `app/`. |
| Workspaces | Present in `app/package.json`. |
| Local packages | 37 `@rovna-ui/components-*` packages exist in `app/packages`. |
| `app/node_modules` | Missing. |
| `app/yarn.lock` | Present, but contains 1593 references to `packages.samoletgroup.ru`. |
| `app/.yarnrc` | Points to `https://packages.samoletgroup.ru/repository/npm-all`. |
| Storybook | Config exists, runtime blocked without installed dependencies. |
| Build output | `dist` is missing. |

## Boundary

Allowed:

- public npm registry;
- public GitHub or other open codebases, only if explicitly reviewed;
- local workspace packages already present in `app/packages`;
- a project-local temporary Yarn cache;
- creation of `app/node_modules` during the future executable step.

Forbidden:

- internal corporate registry;
- corporate GitLab;
- Nexus;
- corporate Figma;
- corporate CI/CD;
- company-specific service environments;
- requesting access to closed corporate systems;
- silent edits to `app/.yarnrc`, `app/package.json`, `app/yarn.lock` or component source.

## Why The First Attempt Must Avoid The Existing Lockfile

The existing `app/yarn.lock` contains many resolved tarball URLs pointing to the old internal registry.

Therefore the first public-only attempt must not use `--frozen-lockfile` and must not rely on the internal `resolved` URLs from the lockfile.

For the first diagnostic attempt, the safer candidate is a no-lockfile install from public registry metadata. This is not the final reproducible package strategy; it is a controlled way to discover which dependencies are truly public and which still block installation.

## Candidate Command For The Next Executable Step

Working directory:

```text
app/
```

PowerShell command candidate:

```powershell
New-Item -ItemType Directory -Force ..\.cache\yarn-public
$env:YARN_CACHE_FOLDER = (Resolve-Path ..\.cache\yarn-public).Path
corepack yarn install --non-interactive --ignore-scripts --no-lockfile --registry https://registry.npmjs.org --network-timeout 600000
```

Meaning:

- `corepack yarn` uses the local Corepack/Yarn route already confirmed in diagnostics;
- `--registry https://registry.npmjs.org` limits the package source to the public npm registry;
- `--no-lockfile` avoids using internal tarball URLs from `app/yarn.lock`;
- `--ignore-scripts` prevents package install scripts from running during the first dependency graph probe;
- `YARN_CACHE_FOLDER` keeps the cache inside the project boundary for easier cleanup;
- `--non-interactive` avoids prompts.

## Allowed Changes During The Future Attempt

Only these changes are allowed during the future executable step:

```text
app/node_modules/
.cache/yarn-public/
docs/dependency-unblock-log.md
docs/dependency-diagnostics.md
```

The docs may be updated only after the attempt to record the exact result.

## Forbidden Changes During The Future Attempt

The future attempt must stop and be treated as failed if it changes or requires changes to:

```text
app/.yarnrc
app/.npmrc
app/package.json
app/yarn.lock
app/packages/**/package.json
app/packages/**/src/**
S-Tracker/**
```

If a later step decides that `package.json` or `yarn.lock` must be changed, that must be a separate planned step with its own rollback rule.

## Stop Conditions

Stop the attempt and record the blocker if any of these appear:

- output references `packages.samoletgroup.ru`;
- output references a corporate GitLab, Nexus, Figma, CI/CD or private service host;
- the command asks for authentication;
- the command attempts `git+ssh` or a private repository URL;
- Yarn reports a package that does not exist on the public registry;
- a corporate-only package such as `samolet-oauth2` blocks installation;
- package scripts are required before dependency graph can be inspected;
- `app/package.json`, `app/yarn.lock`, `.yarnrc` or source files are modified.

## Rollback Rule

If the future attempt fails, rollback is limited to artifacts created by that attempt.

Rollback targets:

```text
app/node_modules/
.cache/yarn-public/
```

PowerShell rollback candidate:

```powershell
Resolve-Path .\node_modules
Remove-Item -LiteralPath .\node_modules -Recurse -Force
Resolve-Path ..\.cache\yarn-public
Remove-Item -LiteralPath ..\.cache\yarn-public -Recurse -Force
```

Before deleting, the resolved paths must be checked and must stay inside the current project:

```text
<repository-root>\app\node_modules
<repository-root>\.cache\yarn-public
```

## Result Classification

| Result | Meaning | Next action |
| --- | --- | --- |
| `app/node_modules` is created and no forbidden source is used | Public dependency graph is restored enough for diagnostics. | Move to build and Storybook diagnostics. |
| Public package missing | The dependency is not restorable from public npm as-is. | Add it to local compensation backlog. |
| Corporate package missing | The dependency must not be fetched. | Mock, disable, stub or isolate the affected flow. |
| Internal registry URL appears | The attempt violated the boundary. | Stop, rollback, update blocker log. |
| Install scripts are required | The first no-script probe is insufficient. | Create a separate plan for allowing scripts selectively. |
| Lockfile/package changes are required | Reproducible public lock strategy is needed. | Create a separate lockfile rewrite plan. |

## Success Criteria For The Future Attempt

The future executable step can be considered successful only if:

- `app/node_modules` exists;
- no closed corporate source was used;
- no forbidden file changed;
- the exact command and output summary are recorded in `docs/dependency-unblock-log.md`;
- remaining missing packages are classified in `docs/dependency-diagnostics.md`;
- build and Storybook are still treated as unverified until separately run.

## E-03 Decision

`E-03` is complete as a planning and safety step.

No dependency install, network call, build, Storybook launch, Docker build, package publication or source-code change was performed.

Updated result after `E-04`:

```text
E-04 executed and stopped on public npm access blocker: AggregateError [EACCES] for https://registry.npmjs.org/@types%2freact.
```

`app/node_modules` was not created. The next step is `E-05`: choose a public dependency acquisition route under the current network restriction.
