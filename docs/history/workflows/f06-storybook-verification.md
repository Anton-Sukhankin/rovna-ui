# F-06 Storybook Verification

## Purpose

Verify the current Storybook runtime after `F-05A` restored the local build graph and main/key package outputs.

## Scope

This check used only local project files and the already restored `app/node_modules`.

No dependency installation, package publication, Docker build, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

## Commands

The original Storybook command is declared in `app/package.json`:

```text
corepack yarn storybook
```

Because the default `.storybook`/root `vite.config.ts` path failed under the current Windows/OneDrive/sandbox path, a diagnostic config was added:

```text
app/storybook-f06/main.ts
app/storybook-f06/preview.tsx
app/storybook-f06/vite.config.mjs
```

Smoke commands:

```text
corepack yarn storybook --ci --no-open --disable-telemetry --no-version-updates --preview-only --smoke-test -c storybook-f06
corepack yarn storybook --ci --no-open --disable-telemetry --no-version-updates --smoke-test -c storybook-f06
```

Preview server command:

```text
corepack yarn storybook --ci --no-open --disable-telemetry --no-version-updates --preview-only -c storybook-f06
```

## Results

| Check | Result | Evidence |
| --- | --- | --- |
| Storybook binary | Passed | `app/node_modules/.bin/storybook.cmd` exists and `corepack yarn storybook` starts. |
| Preview-only smoke-test | Passed | Command exited with code `0`. |
| Full Storybook smoke-test | Passed as startup smoke | Command exited with code `0`, but live manager server still needs a separate fix. |
| Preview-only live server | Passed | `http://localhost:3000/index.json`, `/iframe.html` and `/project.json` returned `200`. |
| Stories index | Passed | `index.json` contains `938` story entries and `215` docs entries. |
| First iframe request | Passed | First story iframe returned `200`; diagnostic data saved to `tmp/storybook-f06-index-check.json`. |
| Full Storybook manager UI | Blocked | Live non-preview server fails while resolving manager bundles from `app/node_modules/.cache/storybook/.../sb-manager/*`. |

## Confirmed Preview URLs

```text
http://localhost:3000/index.json
http://localhost:3000/iframe.html
http://localhost:3000/project.json
```

First checked story:

```text
http://localhost:3000/iframe.html?id=tend-ui-columns-settings-drawercolumnssettings--default&viewMode=story
```

## Current Blocker

The remaining blocker is not the absence of Storybook or `node_modules`.

The remaining blocker is the full Storybook manager bundle resolution:

```text
Cannot read directory "../../../../..": Access is denied.
Could not resolve "...app\node_modules\.cache\storybook\...\sb-manager\storybook-2\manager-bundle.js"
Could not resolve "...app\node_modules\.cache\storybook\...\sb-manager\storybook-core-server-presets-0\common-manager-bundle.js"
Could not resolve "...app\node_modules\.cache\storybook\...\sb-manager\docs-1\manager-bundle.js"
```

The manager bundle files are present on disk, but esbuild/Storybook cannot resolve them reliably in the current path/runtime mode.

## Decision

`F-06` is complete as a partial Storybook verification:

- component stories are indexed;
- preview iframe layer is reachable locally;
- full Storybook manager UI is still blocked;
- component visual verification should continue in the next Storybook-focused fix group before calling `DS-05.2` and `DS-05.4` fully passed.

## Next Group

```text
F-06A: repair full Storybook manager runtime or define an accepted preview-only verification route.
```

## F-06A Follow-Up

`F-06A` resolved the remaining manager runtime check.

The full Storybook manager now runs locally through the diagnostic config:

```text
corepack yarn storybook --ci --no-open --disable-telemetry --no-version-updates -c storybook-f06
```

Verified URL:

```text
http://localhost:3000/
```

Details:

```text
docs/history/workflows/f06a-storybook-manager-runtime.md
```
