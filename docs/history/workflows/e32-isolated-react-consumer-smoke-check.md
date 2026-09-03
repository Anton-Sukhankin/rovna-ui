# E-32 Isolated React Consumer Smoke Check

## Purpose

This document records `E-32`: an isolated React consumer smoke check outside Storybook.

The goal was to verify whether Tend UI can be imported and rendered in a minimal React consumer without changing `S-Tracker`, without installing dependencies, and without using closed corporate sources.

## Result

Status: `[!] blocked diagnostic`

The smoke render was not executed because the local project still has no runnable React/package environment.

## Intended Smoke Target

The minimal target remains:

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { TendUI } from '@10d/tend-ui/theme';
import { Button } from '@10d/tend-ui/primitives';

TendUI.init();

function SmokeTest() {
  return (
    <TendUI>
      <Button>Smoke test</Button>
    </TendUI>
  );
}

createRoot(document.getElementById('root')!).render(<SmokeTest />);
```

This target is a contract candidate only. It is not runtime-verified.

## Checked Local State

| Check | Result |
| --- | --- |
| `app/node_modules` | missing |
| `app/node_modules/react` | missing |
| `app/node_modules/react-dom` | missing |
| `app/packages/tend-ui/dist` | missing |
| `app/packages/tend-ui-primitives/dist` | missing |
| `app/packages/tend-ui-theme/dist` | missing |
| `app/packages/lodash/package.json` | present |
| `app/yarn-error.log` | missing |

## Why The Smoke Test Was Not Run

| Blocker | Effect |
| --- | --- |
| `react` is not installed in `app/node_modules` | A React test app cannot import React from the current dependency graph. |
| `react-dom` is not installed in `app/node_modules` | There is no local DOM renderer for the smoke target. |
| Tend UI `dist` output is missing | Built package consumption cannot be verified. |
| Storybook remains blocked | Component runtime behavior and visual states are still unverified. |
| Package connection remains unverified | A consumer cannot honestly rely on the static import examples yet. |

## Not Done

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no edits to `app/package.json`, `app/yarn.lock` or registry settings;
- no edits to component source;
- no edits inside `S-Tracker`;
- no access to closed corporate sources.

## Decision

`E-32` is complete as a blocked diagnostic.

The project still cannot claim a verified React consumer import/render. Local helper compensation has improved part of the dependency picture, but the foundational runtime/build graph is still missing.

## Next Practical Step

Start a new closure branch focused on the remaining foundation blockers:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

That branch should choose between:

- importing a reviewed offline-public dependency archive;
- using a public-enabled environment for dependency restoration;
- continuing only narrow local compensation where the missing dependency is small and well understood;
- preparing repository/GitHub publication separately from runtime readiness.
