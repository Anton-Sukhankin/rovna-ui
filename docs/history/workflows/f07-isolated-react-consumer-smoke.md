# F-07 Isolated React Consumer Smoke Test

## Purpose

Verify that Tend UI can be imported and rendered outside Storybook in an isolated React consumer scenario.

## Scope

This check used only local files:

- restored `app/node_modules`;
- built Tend UI package outputs under `app/packages/*/dist`;
- local smoke sandbox in `tmp/f07-consumer-smoke`.

No dependency installation, package publication, Docker build, closed registry access, GitLab/Nexus/Figma access, or corporate service access was performed.

## Additional Package Builds

The first consumer attempt showed that the main/key package builds from `F-05A` were not enough for a consumer bundle. A simple Button import through Tend UI also needs transitive internal packages.

The following local builds were run and passed:

```text
corepack yarn build:factories
corepack yarn build:locale
corepack yarn build:api
corepack yarn build:grid
corepack yarn build:typography
```

## Sandbox

Created:

```text
tmp/f07-consumer-smoke/index.html
tmp/f07-consumer-smoke/src/main.jsx
tmp/f07-consumer-smoke/vite.config.mjs
tmp/f07-consumer-smoke/start-dev.cmd
tmp/f07-consumer-smoke/verify-built-dom.cjs
```

The sandbox imports:

```text
@10d/tend-ui/theme
@10d/tend-ui/primitives/Button
```

and renders:

```text
<TendUI lang="ru" theme="samolet">
  <Button variant="primary" size="medium">F-07 Smoke Button</Button>
</TendUI>
```

## Build Result

Command:

```text
node app/node_modules/vite/bin/vite.js build --config tmp/f07-consumer-smoke/vite.config.mjs
```

Result:

```text
704 modules transformed.
dist/index.html
dist/assets/index-BPeGoxfu.js
built in 5.71s
```

The only warning was bundle size:

```text
Some chunks are larger than 500 kB after minification.
```

## Runtime Result

Dev server:

```text
http://127.0.0.1:3100/
```

HTTP checks:

| URL | Status |
| --- | --- |
| `http://127.0.0.1:3100/` | `200` |
| `http://127.0.0.1:3100/src/main.jsx` | `200` |

DOM verification used the built Vite bundle in jsdom:

```text
node tmp/f07-consumer-smoke/verify-built-dom.cjs
```

Result:

```json
{
  "bodyTextIncludesSmokeButton": true,
  "rootHtmlLength": 237,
  "buttonCount": 1
}
```

Detailed evidence:

```text
tmp/f07-consumer-smoke/verify-built-dom-result.json
```

## Important Packaging Findings

The isolated consumer test passed, but it required a diagnostic Vite alias map.

Findings to carry into `F-08`:

1. `app/packages/tend-ui/dist/package.json` points `main` to `cjs/index.js`, but `app/packages/tend-ui/dist/cjs/index.js` is absent.
2. The copied `dist/package.json` removes `exports`, so public subpath imports need a publication/export strategy before clean package consumption.
3. `@10d/tend-ui/primitives/Button` currently re-exports `Button` through `@10d/tend-ui-primitives` root, which causes the consumer bundle to traverse many primitive modules.
4. Some internal subpath imports require explicit dist routing, for example `@10d/tend-ui-icons/Close`, `@10d/tend-ui-icons/Icon`, `@10d/tend-ui-locale/hooks/useTranslation` and `@10d/tend-ui-utils/isUndefined`.
5. The local CommonJS replacements for `classnames` and lodash subpaths are enough for package builds, but browser bundling needed ESM shims in the sandbox.
6. Direct Node SSR with `TendUI` remains blocked by `antd-core/es` extensionless imports under Node 22. The browser/Vite consumer scenario is verified; Node SSR is a separate compatibility task.

## Decision

`F-07` is complete.

Tend UI is verified outside Storybook in an isolated Vite React sandbox with diagnostic aliases and local ESM shims.

This is not yet a clean production package-consumption route. `F-08` should convert these findings into a GitHub/package publication and consumer connection plan.

## Next Group

```text
F-08: prepare GitHub publication and verified consumer connection plan.
```
