# F-06A Storybook Manager Runtime

## Purpose

Recheck the remaining `F-06` blocker: full Storybook manager UI.

`F-06` proved that the preview layer worked, but left the manager UI marked as blocked. `F-06A` verifies whether the full Storybook shell can stay open locally.

## Scope

The check used only local files and the already restored dependency graph in `app/node_modules`.

No dependency installation, package publication, Docker build, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

## Runtime Config

The successful local command uses the diagnostic Storybook config:

```text
app/storybook-f06/main.ts
app/storybook-f06/preview.tsx
app/storybook-f06/vite.config.mjs
```

Launcher:

```text
tmp/start-storybook-f06-full.cmd
```

Command:

```text
corepack yarn storybook --ci --no-open --disable-telemetry --no-version-updates -c storybook-f06
```

## Result

Full Storybook manager is running locally:

```text
http://localhost:3000/
```

Verified endpoints:

| URL | Status |
| --- | --- |
| `http://localhost:3000/` | `200` |
| `http://localhost:3000/index.json` | `200` |
| `http://localhost:3000/iframe.html` | `200` |
| `http://localhost:3000/project.json` | `200` |

Story index:

| Metric | Value |
| --- | ---: |
| Stories | 938 |
| Docs entries | 215 |
| Total entries | 1153 |

First checked story iframe:

```text
http://localhost:3000/iframe.html?id=tend-ui-columns-settings-drawercolumnssettings--default&viewMode=story
```

The iframe returned `200`.

Detailed check output:

```text
tmp/storybook-f06a-manager-check.json
```

## Decision

`F-06A` is complete.

The full Storybook runtime is verified locally through the diagnostic `storybook-f06` config. The original source `.storybook` config remains present, but the stable local launch route for this repository is now the `storybook-f06` config until the root Vite/Storybook path issue is cleaned up.

## Next Group

```text
F-07: run isolated React sandbox consumer smoke test.
```
