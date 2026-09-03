# G-04 + G-05: Live And Static Storybook

Updated: 2026-07-29.

## Status

- `G-04`: `[x]` live Storybook manager verified over HTTP.
- `G-05`: `[x]` fresh static Storybook built and verified over HTTP.
- S-Tracker and other external consumer projects were not used.
- Closed corporate registries and services were not contacted.

## Commands

Run from `app/`.

Live manager verification:

```powershell
node scripts/check-storybook-live.js
```

Fresh static build and verification:

```powershell
node scripts/build-storybook-local.js
```

Interactive Storybook remains:

```powershell
node scripts/run-storybook-local.js
```

Expected interactive URL: `http://localhost:3000/`.

## G-04 Result

The live verification script:

1. maps `app/` to a temporary short `subst` drive on Windows;
2. starts Storybook with `storybook-f06` and network installation disabled;
3. waits for the manager;
4. checks the required HTTP endpoints;
5. parses `/index.json`;
6. stops the spawned process tree and releases the drive.

Verified result:

| Endpoint | Status | Response bytes |
| --- | ---: | ---: |
| `/` | 200 | 3145 |
| `/index.json` | 200 | 420361 |
| `/iframe.html` | 200 | 18459 |
| `/project.json` | 200 | 982 |

Current Storybook index:

- total entries: `1153`;
- stories: `938`;
- docs: `215`.

Machine-readable report: `tmp/g04-storybook-live-check.json`.

## G-05 Result

The static build script removes only the validated `app/storybook-static` target, builds a fresh artifact through the same short-path route, then serves it with a temporary local Node HTTP server.

Verified result:

| Endpoint | Status | Response bytes |
| --- | ---: | ---: |
| `/` | 200 | 2938 |
| `/index.json` | 200 | 420361 |
| `/iframe.html` | 200 | 18208 |
| `/project.json` | 200 | 982 |

Static artifact:

- output: `app/storybook-static/`;
- generated files and directories: `604`;
- total entries: `1153`;
- stories: `938`;
- docs: `215`;
- build exit code: `0`.

The generated directory is intentionally ignored by Git and can be recreated with the documented command.

Machine-readable report: `tmp/g05-storybook-static-build.json`.

## Non-blocking Warnings

- live Vite startup reports that optional prebundle dependency `markdown-to-jsx` cannot be resolved;
- the static build reports several JavaScript chunks larger than 500 kB;
- `baseline-browser-mapping` data is older than two months.

These warnings do not change the manager/build exit codes, endpoint status or catalog counts. They remain optimization and maintenance tasks; no external installation is performed in this group.

## Local Dependency Compensation

The first real static build found that the local offline `uuid` replacement exposed `v4` only through CommonJS. Rollup requires the named ESM export used by Tend UI source files.

The local package now keeps both contracts:

- CommonJS: `packages/uuid/index.js`;
- ESM: `packages/uuid/index.mjs`;
- conditional exports and types: `packages/uuid/package.json`, `index.d.ts`.

Both entrypoints generate valid UUID v4 values. No registry request was needed.

## Decision

The Storybook delivery group `G-B` (`G-03`-`G-05`) is complete:

- interactive manager has a reproducible local command;
- live manager endpoints and catalog counts are verified;
- a fresh static Storybook can be generated and opened locally;
- temporary processes and drive mappings are cleaned automatically.

Component-by-component visual and interaction verification remains a separate `G-08`/`G-09` activity.

## Next Group

```text
G-06 + G-07: define the supported package scope and close builds/exports for that scope.
```
