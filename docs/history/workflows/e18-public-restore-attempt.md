# E-18: Public-Only Dependency Restore Attempt

Date: 2026-07-06

## Purpose

Record the result of `E-18`: execute the public-only dependency restore attempt from `docs/public-only-dependency-restore-executable-runbook.md`, or record why it cannot be executed in the current environment.

## Result

Status: `[!] blocked`

The restore command was not executed in the current Codex shell.

Reason:

- the current execution environment has restricted network access;
- a previous controlled public npm attempt already failed with `AggregateError [EACCES]`;
- `E-17` explicitly says not to repeat the current-shell public npm attempt without an environment change;
- retrying the same command here would not produce a useful new signal and could create noisy partial artifacts.

## Local Preflight

| Check | Result |
| --- | --- |
| Node | `v22.19.0` |
| npm | `10.9.3` |
| Corepack | `0.34.0` |
| Plain `yarn` command | not found |
| `app/node_modules` | absent |
| `app/packages/tend-ui/dist` | absent |
| `app/yarn-error.log` | absent |

## Command Not Run

The following command from the E-17 runbook was intentionally not run in this shell:

```powershell
corepack yarn install --non-interactive --ignore-scripts --no-lockfile --registry https://registry.npmjs.org --network-timeout 600000
```

## Closed Corporate Sources

No closed corporate source was used or requested.

Forbidden sources remain out of scope:

- internal registry;
- corporate GitLab;
- Nexus;
- Figma;
- CI/CD or service infrastructure;
- any private corporate package source.

## Decision

`E-18` is complete as a blocked execution check.

The project still needs a dependency graph before build, Storybook and consumer checks can be verified.

The next useful step is to prepare an offline-public dependency package manifest from local files. That manifest should list which public packages/tarballs are needed, which packages are already local workspaces, and which dependencies remain candidates for local compensation.

## Next Step

Recommended next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

Do not move to Storybook/build reruns until one of these is true:

- public-only restore succeeds in an allowed environment;
- an offline-public package cache/archive is prepared and imported;
- enough local compensation is implemented to replace the specific missing mechanics.
