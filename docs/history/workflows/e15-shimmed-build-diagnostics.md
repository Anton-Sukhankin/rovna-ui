# E-15 Shimmed Build Diagnostics

## Purpose

This document records `E-15`: a narrow build diagnostic using the temporary local `yarn.cmd` shim selected in `E-14`.

Goal:

```text
Confirm whether the blocker moves from nested plain yarn calls to the next build dependency/tooling blocker.
```

## Boundary

No dependency installation, Storybook launch, Docker build, package publication or package script changes were performed.

No closed corporate registry, GitLab, Nexus, Figma or CI/CD access was used or requested.

## Temporary Shim

Created local diagnostic shim:

```text
tmp/build-runner-shim/yarn.cmd
```

Content:

```cmd
@echo off
corepack yarn %*
```

The shim was used only by prepending this directory to `PATH` inside each diagnostic shell session:

```powershell
$env:PATH = (Resolve-Path '..\tmp\build-runner-shim').Path + ';' + $env:PATH
```

Verification:

```text
yarn --version -> 1.22.15
```

This confirms that plain `yarn` resolves to the local shim during the diagnostic session.

## Diagnostic Attempts

| Command | Result | New blocker |
| --- | --- | --- |
| `corepack yarn build:tokens` | blocked later than E-13 | `tsc` is not recognized |
| `corepack yarn build:main` | blocked later than E-13 | `tsc` is not recognized |
| `corepack yarn build:upload` | blocked later than E-13 | `tsc` is not recognized |
| `corepack yarn build:filters` | blocked later than E-13 | `tsc` is not recognized |

Common command path reached:

```text
yarn workspace <package> build
yarn build:types && yarn build:js && yarn validate:imports && yarn copy
yarn build:types:es && yarn build:types:cjs
tsc -d --project tsconfig.build.json && tsc-alias -p tsconfig.build.json
```

Common error:

```text
'tsc' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

## Build Binary Status

The following commands are not available in the current shell:

```text
tsc
tsc-alias
rollup
storybook
```

The following local package binaries are also absent:

```text
app/node_modules/.bin/tsc.cmd
app/node_modules/.bin/rollup.cmd
app/node_modules/.bin/storybook.cmd
```

Reason:

```text
app/node_modules is still absent.
```

## Output Status

| Path | Status |
| --- | --- |
| `app/node_modules` | missing |
| `app/packages/tend-ui/dist` | missing |
| `app/packages/tend-ui-tokens/dist` | missing |
| `app/packages/tend-ui-upload/dist` | missing |
| `app/packages/tend-ui-filters/dist` | missing |
| `app/yarn-error.log` | missing |

## Result

`E-15` is diagnostically complete and blocked.

What improved:

```text
The temporary shim works. The blocker moved beyond nested plain yarn calls.
```

Current active blocker:

```text
Build tooling is missing because the dependency graph is not installed.
```

The first missing build binary reached by the diagnostic is:

```text
tsc
```

## Interpretation

This result confirms that local helper compensation and the build-runner shim are not enough to build Tend UI.

The project now needs a dependency graph/build tooling strategy, not another blind local helper replacement.

Do not implement a fake `tsc`, fake Rollup or fake Storybook. These are foundational build/runtime tools and should come from an approved public/offline-public dependency route.

## Not Run

- no `yarn install`;
- no `npm install`;
- no `corepack enable`;
- no Storybook launch;
- no Docker build;
- no package publication;
- no source package edits;
- no edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- no consumer project changes.

## Next Step

Recommended next step:

```text
E-16, E-17, E-18, E-19, E-20, E-21, E-22, E-23, E-24, E-25, E-26, E-27, E-28 and E-29 are complete; current next step is F-04C: repair the offline-public archive manifest and package paths.
```

Reason:

```text
The active blocker is now missing foundational build tooling such as TypeScript, tsc-alias and Rollup. These should not be locally stubbed.
```
