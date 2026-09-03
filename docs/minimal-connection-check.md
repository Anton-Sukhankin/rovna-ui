# Minimal Connection Check

## Purpose

This document records `D-08`: the minimal Rovna UI connection check outside Storybook.

The check is a blocked diagnostic. No consumer project files were changed, no dependencies were installed, no package was built, and no smoke render was executed.

## Minimal Target

The intended minimal smoke target is:

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RovnaUI } from '@rovna-ui/components/theme';
import { Button } from '@rovna-ui/components/primitives';

RovnaUI.init();

function SmokeTest() {
  return (
    <RovnaUI>
      <Button>Smoke test</Button>
    </RovnaUI>
  );
}

createRoot(document.getElementById('root')!).render(<SmokeTest />);
```

This target is not executable in the current project state.

## Current Blockers

| Area | Blocker | Effect |
| --- | --- | --- |
| Rovna UI dependency graph | `app/node_modules` is missing | Runtime dependencies, build tools and Storybook binary are unavailable. |
| Rovna UI build output | `app/packages/tend-ui/dist` is missing | The main package cannot be consumed as a built package. |
| Rovna UI theme/primitives output | `app/packages/tend-ui-theme/dist` and `app/packages/tend-ui-primitives/dist` are missing | Theme/provider and primitive imports are not verified as built artifacts. |
| Storybook | blocked | Component behavior and visual states are not verified. |
| Component runtime | blocked / unverified | Button runtime behavior is not confirmed. |
| Candidate project | `S-Tracker` is documented as vanilla/Vite without React dependencies | React smoke render needs React infrastructure before Rovna UI can render there. |

## Checked Local State

| Check | Result |
| --- | --- |
| `app/node_modules` | missing |
| `app/packages/tend-ui/dist` | missing |
| `app/packages/tend-ui-theme/dist` | missing |
| `app/packages/tend-ui-primitives/dist` | missing |
| `app/storybook-static` | missing |

## D-08 Decision

`D-08` is complete as a blocked minimal-connection diagnostic.

The project should not claim that Rovna UI can be imported and rendered in a consumer app yet. The static import contract is documented, but runtime import resolution and rendering are not verified.

## Next Step

The next checklist step is `D-09`: return to the main workflow and update old blocked statuses based on the D-branch facts.

`D-09` should not mark build, Storybook, component runtime or consumer connection as solved. It should synchronize the main workflow with the confirmed blocked state and point to the required future unblock path.

## E-32 Isolated React Consumer Update

Checked on: 2026-07-06.

`E-32` repeated the minimal connection question at the end of the E-branch and confirmed that the isolated React smoke render still cannot be executed.

Diagnostic details are recorded in:

```text
docs/history/workflows/e32-isolated-react-consumer-smoke-check.md
```

Additional checked blockers:

| Check | Result |
| --- | --- |
| `app/node_modules/react` | missing |
| `app/node_modules/react-dom` | missing |
| `app/packages/tend-ui/dist` | missing |
| `app/packages/tend-ui-primitives/dist` | missing |
| `app/packages/tend-ui-theme/dist` | missing |

The static import contract remains useful for documentation and future consumer setup, but it is still not a verified runtime integration.
