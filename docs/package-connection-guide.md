# Package Connection Guide

## Purpose

This guide defines the current supported ways to connect Rovna UI to another React project. Historical recovery, candidate-project and publication experiments are preserved in [Package Connection Guide Before Governance](./history/workflows/package-connection-guide-pre-governance.md).

## Current Contract

- Package scope remains `@rovna-ui/*`.
- The public release set and order are owned by `app/release-boundary.json`.
- Exported paths are owned by package manifests and `app/public-api-baseline.json`.
- The main package declares React 17 peer dependencies. Check `docs/react-compatibility.json` before integrating with another React major.
- Registry-free tarball consumers are the locally verified connection route.
- npm publication has not been performed and requires ownership of the `@rovna-ui` scope plus publication authorization; the MIT license is already selected.

Exact package, artifact and consumer counts belong to their machine reports and are intentionally not copied here.

## Recommended Route

Before connecting a consumer, validate the design-system artifacts from `app/`:

```powershell
corepack yarn packages:scope:build
corepack yarn release:prepare-public
corepack yarn release:rehearse-tarballs
corepack yarn consumers:ds-only
```

Use the tarballs produced by the release rehearsal or bundle command. Do not point a consumer at package `src/` directories or workspace internals.

To prepare a registry-agnostic handoff bundle:

```powershell
corepack yarn release:create-bundle
```

Generated release directories are local-only artifacts and are not committed.

Для чистого CI-runner без локального offline-public archive разрешен эквивалентный сетевой rehearsal:

```powershell
npm run release:ds-only -- --public-registry
```

Флаг разрешает загрузку только внешних public dependencies из `https://registry.npmjs.org`. Пакеты Rovna UI и локальная компенсация по-прежнему проверяются как локальные tarball; публикация и закрытые registry не используются.

## Consumer Requirements

The consumer must provide compatible `react` and `react-dom` versions. Install the main Rovna UI tarball and every transitive tarball resolved by the generated release manifest. Keep one version of React across the consumer graph.

Initialize the theme once near the application root:

```tsx
import { RovnaUI } from '@rovna-ui/components/theme';

RovnaUI.init();

export function AppRoot() {
  return (
    <RovnaUI>
      <App />
    </RovnaUI>
  );
}
```

Prefer documented public subpaths:

```tsx
import { Button, Input, Select } from '@rovna-ui/components/primitives';
import { Box, Flex, Row, Col } from '@rovna-ui/components/grid';
import { Text, Title, Link } from '@rovna-ui/components/typography';
import { Add, Search } from '@rovna-ui/components/icons';
```

Confirm every exact subpath against the package manifest or generated component passport. Do not import from `dist` internals or unpublished source aliases.

## Connection Options

| Route | Status | Use |
|---|---|---|
| Local tarballs | Verified local route | Development, isolated integration and release rehearsal |
| Registry-agnostic release bundle | Prepared local route | Transfer to an authorized publication or consumer environment |
| Public npm registry | Owner action, not performed | Only after `@rovna-ui` scope ownership and publication authorization are confirmed |
| GitHub Packages | Future owner-selected target | Requires repository, authentication and package metadata decisions |
| Workspace/link/source import | Unsupported consumer shortcut | Do not use as proof of distributable package behavior |

## Service And Network Boundaries

Core UI components are usable without closed corporate systems. Authentication, realtime, notifications, search-assistant and data-service flows must use public/local adapters or explicit mocks. A successful UI render does not prove a real service integration.

## Acceptance In A Consumer

At minimum verify:

1. Installation completes without a private registry request.
2. The app has one React runtime.
3. `RovnaUI` initializes and wraps the rendered tree.
4. A basic component renders and responds to keyboard and pointer input.
5. Styles and icons load in development and production builds.
6. TypeScript resolves the documented public import.
7. The production bundle does not import source-only workspace paths.

The maintained consumer checks and final package acceptance are available through:

```powershell
corepack yarn release:ds-only
corepack yarn consumers:ds-only
corepack yarn quality:r11
```

## Ownership

- [Import Rules](./agent-context/import-rules.md)
- [Public API Versioning Policy](./public-api-versioning-policy.md)
- [Maintainer Guide](./maintainer-guide.md)
- [Public Delivery Readiness](./public-delivery-readiness.md)
- [Current Project Status](./current-project-status.md)
