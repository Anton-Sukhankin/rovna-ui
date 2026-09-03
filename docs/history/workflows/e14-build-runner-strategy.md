# E-14 Build Runner Strategy For Nested Plain Yarn Calls

## Purpose

This document records `E-14`: the selected local strategy for the build-runner blocker found in `E-13`.

Current blocker:

```text
root scripts start through corepack yarn, but nested package scripts call plain yarn.
plain yarn is not available in the current PowerShell environment.
```

## Boundary

This step is strategy-only. It does not install dependencies and does not change package scripts.

Not allowed in this step:

- no `yarn install`;
- no `npm install`;
- no `corepack enable`;
- no closed corporate registry, GitLab, Nexus, Figma or CI/CD access;
- no edits to `app/package.json`, package `package.json` files, `app/yarn.lock` or `app/.yarnrc`;
- no Storybook launch;
- no package publication;
- no consumer project changes.

## Evidence

`E-13` confirmed that build attempts still stop on:

```text
'yarn' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

The blocker appears before TypeScript, Rollup, import validation or copy stages.

`rg` also confirms that plain `yarn` is a repository-wide script pattern, not a single isolated command. Examples:

```text
app/package.json
app/packages/*/package.json
app/scripts/menu.sh
app/scripts/link.sh
```

Typical package build model:

```text
"build": "yarn build:types && yarn build:js && yarn validate:imports && yarn copy"
"build:types": "yarn build:types:es && yarn build:types:cjs"
```

## Options Considered

| Option | Decision | Why |
| --- | --- | --- |
| Edit all package scripts from `yarn` to `corepack yarn` | Reject for now | Large repo-wide script churn; may create cross-platform changes and does not solve missing `node_modules`. |
| Install global Yarn / run `corepack enable` | Reject for now | Changes machine/tooling state and is outside the current local diagnostic boundary. |
| Re-run the same build commands without changes | Reject | `E-13` already proved the failure repeats before package build stages. |
| Use direct `corepack yarn workspace ... build` only | Insufficient | Package-level `build` scripts still call nested plain `yarn`. |
| Temporary local `yarn.cmd` shim in a diagnostic shell | Selected | No manifest changes, no dependency install, reversible, enough to move diagnostics past the current runner blocker. |

## Selected Strategy

Use a temporary local Windows command shim only for the next diagnostic shell:

```text
tmp/build-runner-shim/yarn.cmd
```

The shim delegates plain `yarn` to Corepack:

```cmd
@echo off
corepack yarn %*
```

The shim directory should be prepended to `PATH` only for the diagnostic command session.

Example next-step command shape:

```powershell
$env:PATH = "<repo>\\tmp\\build-runner-shim;$env:PATH"
corepack yarn build:tokens
```

This means:

- root command still starts with `corepack yarn`;
- nested `yarn ...` calls resolve to the temporary local shim;
- no source package scripts are edited;
- no permanent machine-level Yarn installation is required.

## Expected Next Blocker

Even if the shim works, build is not expected to pass yet.

Reason:

```text
app/node_modules is still absent.
```

Likely next failures:

- missing `tsc`;
- missing `rollup`;
- missing `tsc-alias`;
- missing `storybook`;
- missing runtime/build dependencies from the unresolved dependency graph.

That is acceptable for the next diagnostic step. The goal is to reveal the next exact blocker, not to force a successful build.

## Recommended Next Step

```text
E-15 completed the temporary local yarn.cmd diagnostic shim, E-16 defined the dependency graph/build tooling restoration strategy, E-17 prepared the executable public-only dependency restore runbook, E-18 recorded the current-shell execution blocker, E-19 created the dependency manifest, E-20 selected the restore execution route, E-21 created the acquisition plan, E-22 prepared the archive manifest/import runbook, E-23 recorded the missing archive blocker, E-24 prepared the archive request, E-25 selected the local compensation lane, E-26 completed the lodash helper audit, E-27 implemented LC-07A, E-28 implemented LC-07B, and E-29 implemented LC-07C. Current next step is F-04C: repair the offline-public archive manifest and package paths.
```

Commands used in `E-15`:

```text
corepack yarn build:tokens
corepack yarn build:main
```

Additional commands used after the first two reached package-level tooling:

```text
corepack yarn build:upload
corepack yarn build:filters
```

## E-15 Outcome

`E-15` recorded this outcome:

| Outcome | Meaning |
| --- | --- |
| Build moves to missing `tsc` | Shim works; active blocker becomes missing dependency graph/build tooling. |

## Status

`E-14` is complete as a strategy step.

Decision:

```text
Use a temporary local yarn.cmd shim for the next diagnostic run.
```

Follow-up status:

```text
E-15 confirmed that the shim works and the active blocker moved to missing tsc / missing app/node_modules.
E-16 selected the public/offline-public dependency graph restoration route.
E-17 prepared the executable public-only dependency restore runbook.
Current next step is F-04C: repair the offline-public archive manifest and package paths.
```
