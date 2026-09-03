# Storybook Runbook

## Current Authoritative Status

Updated: 2026-08-10 after R-11 final acceptance.

- The authoritative stable local route is static Storybook through `node scripts/serve-storybook-static.js --port=3000` at `http://127.0.0.1:3000/`.
- The Vite dev launcher remains optional: on the current OneDrive workspace a cold dependency optimization can fail after startup with transient module-resolution errors. Use the verified static route for review and interaction; rebuild after source changes.
- The current static catalog contains `1223` entries: `1008` stories and `215` docs.
- The active build is `storybook-static`; a replacement is staged, verified and promoted without deleting the active build first.
- The server keeps `storybook-static-previous` as a fallback for hashed chunks requested by tabs opened before a rebuild.
- Browser tests pass `1008/1008` through Storybook Vitest + Playwright; final failures, retries and new flakes are `0`.
- Axe passes `1008/1008` with violations `0`; Chromium full `1008/1008`, WebKit/Firefox risk suites `249/249` each.
- Visual, responsive and input gates pass `88/88`, `85/85` and `20/20`.
- Storybook startup prepares complete local favicon/profile/fallback assets and active runtime requests to closed corporate services are `0`.
- R-09 maps `118` Storybook groups to `125` generated passports and a machine-readable catalog.
- R-11 passed `49/49` execution steps and `24/24` final checks with blocking failures `0`; final evidence is in `docs/r-final-quality-report.md` and `.json`.
- Docker runtime remains optional and environment-blocked because Docker CLI is unavailable.

The blocked P/D/E records below are retained as dated diagnostic history. Statements that `node_modules`, Storybook or `storybook-static` are missing do not describe the current project state.

## Current Verification Commands

Run from `app/`:

```powershell
npm.cmd run test:storybook:ci
npm.cmd run storybook:runtime:audit
npm.cmd run storybook:a11y:audit
npm.cmd run storybook:a11y:baseline
npm.cmd run storybook:visual:audit
npm.cmd run storybook:performance:audit
npm.cmd run docs:r09:generate
npm.cmd run quality:r09
npm.cmd run quality:ds-only
npm.cmd run quality:r11
```

`quality:r11` is the final acceptance and report-drift gate. `quality:ds-only` remains the compact local aggregate gate. Browser/runtime, full axe, visual and performance audits are intentionally separate long-running commands and should be rerun when their corresponding source surface changes.

## Purpose

This runbook records the Storybook launch procedure and the current diagnostic status for `DS Tend UI`.

The project is handled in offline/self-contained mode. Internal registry, GitLab, Figma, Nexus and corporate services are not used or requested during this step.

## Static Chunk Integrity

Run the static reference audit from `app/` after every Storybook build:

```sh
npm run storybook:static:check
```

The check validates every indexed story/docs entry and follows the reachable JavaScript, CSS and HTML dependency graph. Missing local modules fail the command and are recorded in `tmp/storybook-static-asset-audit.json`.

`build-storybook-local.js` no longer deletes the active build before a replacement is ready. It builds into a staging directory, verifies required endpoints, preserves the previous generation and then promotes the new directory. `serve-storybook-static.js` serves a missing hashed asset from the preserved generation and returns a real `404` for an unknown file instead of returning `index.html` with an invalid JavaScript MIME type.

## Current Storybook Configuration

Storybook configuration is present in:

```text
app/.storybook/
  main.ts
  preview.tsx
  decorators.tsx
  manager.ts
  middleware.js
  10d.ts
```

`app/.storybook/main.ts` declares:

- framework: `@storybook/react-vite`;
- addons: `@storybook/addon-docs`;
- stories glob:

```text
../packages/**/*.mdx
../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)
```

`app/.storybook/preview.tsx` initializes the design-system theme:

```text
TendUI.init()
```

It also declares toolbar globals:

- `theme`: `samolet` / `global`;
- `locale`: `ru` / `en`.

`app/.storybook/decorators.tsx` wraps stories with:

- `TendUI`;
- `MuseoSansCyrl`;
- global code styling from `styled-components`.

`app/.storybook/middleware.js` declares an `/api` proxy to:

```text
https://pro-stage.samoletgroup.ru
```

In offline mode this proxy must be treated as an unavailable corporate dependency. Stories that require it need mocks or fixtures.

## Declared Command

The root `app/package.json` declares:

```sh
yarn storybook
```

The script expands to:

```sh
storybook dev -p 3000
```

Expected local URL:

```text
http://localhost:3000
```

## Preflight Status

Checked on: 2026-07-03.

| Check | Result |
| --- | --- |
| Node | `v22.19.0` |
| npm | `10.9.3` |
| corepack | `0.34.0` |
| `yarn` command | Not found |
| `app/node_modules` | Missing |
| `app/.yarn` | Missing |
| `app/storybook-static` | Missing |
| `app/.npmrc` | Exists: `package-lock=false` |
| `app/.yarnrc` | Exists: registry points to `https://packages.samoletgroup.ru/repository/npm-all` |
| `app/Dockerfile` | Missing |
| root `Dockerfile` | Missing |
| `app/docker-compose.yml` | Missing |
| root `docker-compose.yml` | Missing |
| `.dockerignore` | Missing |

## Diagnostic Launch Attempt

Command executed from `app/`:

```sh
yarn storybook
```

Result:

```text
Blocked
```

Exact error:

```text
yarn : Имя "yarn" не распознано как имя командлета, функции, файла сценария или выполняемой программы.
Проверьте правильность написания имени, а также наличие и правильность пути, после чего повторите попытку.
FullyQualifiedErrorId : CommandNotFoundException
```

## D-05 Storybook Diagnostic Update

Checked on: 2026-07-05.

`D-05` re-ran the launch diagnostic after `D-01` confirmed that Yarn can be called through Corepack.

### D-05 Preflight

| Check | Result |
| --- | --- |
| `app/.storybook/main.ts` | present |
| `app/.storybook/preview.tsx` | present |
| `app/node_modules` | missing |
| `app/node_modules/.bin/storybook` | missing |
| `app/storybook-static` | missing |
| port `3000` | not occupied by Storybook during the check |

### D-05 Diagnostic Launch Attempt

Command executed from `app/`:

```sh
corepack yarn storybook
```

Result:

```text
Blocked
```

Exact blocker:

```text
'storybook' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

Yarn also reported:

```text
warning Cannot find a suitable global folder. Tried these: "C:\Users\armad\AppData\Local\Yarn, C:\Users\armad\.yarn"
```

### D-05 Decision

The Storybook configuration exists, but Storybook cannot be opened in the current environment.

The current blocker is no longer only "plain `yarn` is missing". Through Corepack the root script starts, but `storybook` itself is not available because `app/node_modules` is missing and `app/node_modules/.bin/storybook` does not exist.

Stories were not visually checked. Toolbar theme/locale, decorators and runtime component behavior remain unverified.

Next practical step:

```text
D-06 can only be a blocked component-check diagnostic unless dependency graph restoration is handled first.
```

## D-06 Component Check Diagnostic Update

Checked on: 2026-07-05.

`D-06` did not perform visual Storybook verification, because `D-05` confirmed that Storybook cannot start without `app/node_modules`.

Static component map was recorded in:

```text
docs/component-runtime-check.md
```

First checked component set:

| Component | Static Storybook story | Runtime status |
| --- | --- | --- |
| Button | `app/packages/tend-ui-primitives/src/Button/Button.stories.tsx` | blocked / runtime unverified |
| Input | `app/packages/tend-ui-primitives/src/Input/Input.stories.tsx` | blocked / runtime unverified |
| Select | `app/packages/tend-ui/src/primitives/Select/Select.stories.tsx` | blocked / runtime unverified |
| Modal | `app/packages/tend-ui/src/primitives/Modal/Modal.stories.tsx` | blocked / runtime unverified |
| Table | `app/packages/tend-ui/src/primitives/Table/Table.stories.tsx`; `app/packages/tend-ui-table/src/Table/Table.stories.tsx` | blocked / runtime unverified |

Decision:

```text
Do not mark component runtime states as verified until Storybook opens.
```

The launch did not reach dependency resolution, Vite, Storybook runtime, stories rendering or port binding. The first blocker is that `yarn` is not available as a command in the current environment.

## Current Blockers

| Blocker | Impact | Current decision |
| --- | --- | --- |
| `yarn` command is not available | `yarn storybook` cannot start | Record as environment blocker. Do not enable corepack or install Yarn in `P-05`. |
| `app/node_modules` is missing | Even with Yarn, Storybook dependencies are not installed | Record as dependency blocker. Do not run `yarn install` in `P-05`. |
| `.yarnrc` points to internal registry | Dependency installation would likely require unavailable internal registry access | Keep as fact from local config. Do not request access. |
| Storybook `/api` proxy targets corporate host | API-backed stories may fail offline | Mock or disable service scenarios later. |
| Dockerfile/compose are missing | Container Storybook cannot be launched from current project files | Record container launch as blocked until a container recipe is created. |

## Stories Verification Status

Stories were not verified visually because Storybook did not start.

Known story source configuration exists and points to local packages:

```text
app/packages/**/*.mdx
app/packages/**/*.stories.@(js|jsx|mjs|ts|tsx)
```

The next Storybook verification pass must check:

- sidebar/navigation is visible;
- core sections open;
- base components render;
- theme toolbar works;
- locale toolbar works;
- no critical runtime errors block component browsing.

## Container Storybook Status

Container launch is blocked in the current project state.

Reason:

- no `Dockerfile` found in root or `app/`;
- no `docker-compose.yml` found in root or `app/`;
- no `.dockerignore` found;
- dependency installation strategy is unresolved because `.yarnrc` points to an internal registry.

Current decision:

```text
No container command is available in P-05.
```

Container Storybook requires a separate future task: define a Dockerfile/build context, dependency source strategy, port mapping and offline/mock strategy for corporate services.

## P-05 Result

`P-05` is blocked, but diagnostically complete for the current environment.

Completed:

- Storybook configuration was identified;
- declared command and port were recorded;
- preflight environment was recorded;
- diagnostic launch attempt was executed;
- exact launch blocker was recorded;
- container launch status was recorded.

Not completed:

- Storybook did not open locally;
- working launch command was not confirmed;
- stories were not visually verified;
- container launch was not confirmed.

Next practical step:

```text
P-06 can continue as build diagnostics, but Storybook remains blocked until the project gets an approved local dependency strategy.
```

## E-30 Storybook Diagnostic After Lodash Compensation

`E-30` was run after local lodash compensation slices `LC-07A`, `LC-07B` and `LC-07C`.

Detailed report:

```text
docs/history/workflows/e30-storybook-after-lodash-diagnostics.md
```

Diagnostic command:

```text
corepack yarn storybook
```

Result:

```text
'storybook' is not recognized as an internal or external command,
operable program or batch file.
```

Current blocker:

```text
app/node_modules is absent, so app/node_modules/.bin/storybook is absent.
```

Storybook remains blocked. No stories were visually verified.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-06 Storybook Verification Update

`F-06` was run after the dependency graph and main/key builds were restored.

Detailed report:

```text
docs/history/workflows/f06-storybook-verification.md
```

Result:

- `app/node_modules/.bin/storybook.cmd` is present;
- preview-only Storybook smoke-test passes;
- live preview-only Storybook responds on `http://localhost:3000`;
- `http://localhost:3000/index.json` returns `200`;
- `http://localhost:3000/iframe.html` returns `200`;
- `http://localhost:3000/project.json` returns `200`;
- the Storybook index contains `938` story entries and `215` docs entries.

Remaining blocker:

```text
Full Storybook manager UI does not stay open yet.
The live non-preview server fails while resolving manager bundles from app/node_modules/.cache/storybook/.../sb-manager/*.
```

Current decision:

```text
Use preview-only Storybook as verified diagnostic evidence, but do not mark the full Storybook UI as completely restored until F-06A resolves or accepts the manager limitation.
```

## F-06A Full Manager Runtime Update

`F-06A` resolved the remaining full manager runtime check.

Detailed report:

```text
docs/history/workflows/f06a-storybook-manager-runtime.md
```

Working local command:

```text
corepack yarn storybook --ci --no-open --disable-telemetry --no-version-updates -c storybook-f06
```

Working local URL:

```text
http://localhost:3000/
```

Verified:

- root manager URL returns `200`;
- `index.json` returns `200`;
- `iframe.html` returns `200`;
- `project.json` returns `200`;
- Storybook index contains `938` stories and `215` docs entries.

Current decision:

```text
Full local Storybook runtime is verified through the diagnostic storybook-f06 config.
```

## F-20 Container Route Update

F-20 adds a reproducible static Storybook container route:

```text
Dockerfile.storybook
compose.storybook.yml
docker/storybook-nginx.conf
```

Static validation command:

```powershell
node app/scripts/validate-storybook-container.js
```

Static validation passes and reports `0` closed corporate endpoint findings. The container uses public `node:22-bookworm-slim` and `nginx:1.27-alpine` images, public npmjs dependencies, Yarn `1.22.15`, the `storybook-f06` config and nginx on container port `8080`.

Expected runtime URL:

```text
http://localhost:3001/
```

Runtime commands and the post-launch index checker are documented in `docs/history/workflows/f20-containerized-storybook.md`.

Current runtime blocker:

```text
Docker CLI is not installed or available in PATH on this machine.
```

`DS-05.5` therefore remains `[!]`: the recipe is prepared, but container build/start/health cannot be honestly verified yet.
