# UUID Helper Replacement

## Purpose

This document records `E-12 / LC-06`: a local offline replacement for the `uuid` helper.

The goal is narrow compensation. Rovna UI sources import only `v4` from `uuid` and call it without arguments to create internal string identifiers.

## Current Status

Status: implemented as local workspace packages.

Created runtime package:

```text
app/packages/uuid
```

Created type package:

```text
app/packages/types-uuid
```

Package names:

```text
uuid
@types/uuid
```

These satisfy package dependencies that declare:

```text
"uuid": "^10"
"uuid": "^10.0.0"
"@types/uuid": "^10"
"@types/uuid": "^10.0.0"
```

## Actual Usage Found

Runtime imports found in local source:

| Package | File | Usage |
| --- | --- | --- |
| `tend-ui-upload` | `src/core/utils/mapFileToAttachment.ts` | `uuidv4()` for attachment `uuid`. |
| `tend-ui-columns-settings` | `src/components/DrawerColumnsSettings/components/SavePresetButton/SavePresetButton.tsx` | `uuidv4()` for saved preset `id`. |
| `tend-ui-filters` | `src/components/SaveButton/SaveButton.tsx` | `uuidv4()` for saved filter preset `id`. |
| `tend-ui` | `src/components/Filters/components/SaveButton/SaveButton.tsx` | `uuidv4()` for saved filter preset `id`. |
| `tend-ui` | `src/components/ColumnsSettings/components/SavePresetButton/SavePresetButton.tsx` | `uuidv4()` for saved columns preset `id`. |

Other `uuid` mentions in stories and docs are field names, fixture values or `faker.string.uuid()` calls, not imports from `uuid`.

## Covered API

The local helper supports:

```ts
import { v4 as uuidv4 } from 'uuid';

uuidv4();
```

The generated value follows the UUID v4 string shape:

```text
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```

Randomness source:

1. `globalThis.crypto.randomUUID()` when available;
2. `globalThis.crypto.getRandomValues()` when available;
3. `Math.random()` fallback for constrained diagnostic environments.

## Boundaries

The replacement does not implement the full public `uuid` package API.

Not covered:

- `v1`, `v3`, `v5`, `v6`, `v7`;
- parse/stringify helpers;
- validation helpers;
- namespace helpers;
- buffer/options overloads for `v4`.

No component source files were changed.

No package registry, corporate source, internal GitLab, Nexus or Figma access was used.

## Verification

Performed checks:

```text
node require check for app/packages/uuid
UUID v4 shape check
uniqueness smoke check across 100 generated ids
corepack yarn workspaces info --silent
Test-Path app/node_modules
Test-Path app/packages/tend-ui/dist
```

Expected status after `E-12`:

```text
uuid is recognized as a workspace package.
@types/uuid is recognized as a workspace package.
app/node_modules is still absent.
dist is still absent.
Build and Storybook are still blocked until dependency graph/bootstrap is solved.
```

## Remaining Risk

Runtime behavior still needs Storybook or consumer smoke verification after dependency graph and build bootstrap are available.

The local helper is enough for the exact static usage found in the archive, but it is not a complete replacement for every possible `uuid` API.

## Next Step

Recommended next step:

```text
E-13, E-14, E-15, E-16, E-17, E-18, E-19, E-20, E-21, E-22, E-23, E-24, E-25, E-26, E-27, E-28 and E-29 are completed; current next step is F-04C: repair the offline-public archive manifest and package paths.
```

Reason:

```text
LC-07 is broader than previous helpers and must be split helper-by-helper; E-13 confirmed that the current active blocker is still nested plain yarn plus missing dependency graph.
```
