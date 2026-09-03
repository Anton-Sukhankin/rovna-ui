# Rovna UI Import Rules For Agents

## Current Import Status

Import examples are based on local package exports, the public API baseline and the R-09 machine catalog. Verify the current supported package boundary and exact subpath in those machine owners instead of copying counters into migration instructions.

Do not infer that every component interaction is verified from a successful render. The registry-free release consumer has current machine evidence; use `ds-catalog.json`, generated passports and focused quality reports for the exact behavioral boundary.

## Required Wrapper Pattern

Use Rovna UI theme initialization and provider when rendering UI examples:

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

This pattern is used by the current Storybook runtime. Confirm current consumer and React compatibility in their owned reports before making a compatibility claim.

## React Compatibility

The main package declares:

```text
react: ^17.0.2
react-dom: ^17.0.2
```

Agents must check the consumer project's React version before proposing direct migration.

## Preferred Product Imports

Prefer main package imports for future product migration:

```tsx
import { Button, Input, Select } from '@rovna-ui/components/primitives';
import { Modal, Table } from '@rovna-ui/components/primitives';
import { Box, Flex, Row, Col } from '@rovna-ui/components/grid';
import { Text, Title, Link } from '@rovna-ui/components/typography';
import { Add, Search } from '@rovna-ui/components/icons';
```

Use direct imports only when there is a reason to keep a task focused:

```tsx
import { Button } from '@rovna-ui/components/primitives/Button';
import { Segmented } from '@rovna-ui/components/primitives/Segmented';
```

Do not rewrite package names or change the `@rovna-ui/*` scope.

## Service And Feature Components

Treat these as not ready for offline runtime use unless mocks are prepared:

- notifications;
- search assistant;
- API/auth flows;
- realtime;
- upload with real requests;
- data-driven widgets that require corporate services.

Use static fixtures, mocks or disable these scenarios in Storybook-oriented work.

## Dependency Rules

Before replacing a missing dependency, classify it:

| Dependency | Rule |
| --- | --- |
| `react`, `react-dom` | Mandatory runtime. Do not replace. |
| `styled-components` | Mandatory for current styling/theme model. |
| `antd-core` | Mandatory for many primitives until a focused replacement task exists. |
| `@dnd-kit/*` | Separate compensation task for drag/sort mechanics. |
| `@tanstack/*` | Separate compensation task for table/tree/virtual/query mechanics. |
| `samolet-oauth2` | Local mock boundary exists; keep real corporate authentication disabled. |
| `centrifuge` | Keep realtime scenarios mocked or disabled unless a public/local fixture is explicitly prepared. |
| `lodash`, `classnames`, `uuid`, `query-string` | Narrow local compensation packages exist; extend only after a real imported helper/mechanic is identified. |

## Agent Output Rule

When generating migration instructions, include the narrow current status, for example:

```text
Artifact verified; Storybook render and accessibility evidence are current; focused behavior cites play or story evidence IDs; consumer status comes from the current release report.
```

For behavior not named in an interaction/visual/performance report, say `catalog render verified / behavior task-specific` until a focused check passes.
