# Classnames Helper Replacement

## Purpose

This document records `E-11 / LC-04`: a local offline replacement for the `classnames` helper.

The goal is narrow compensation, not a UI rewrite. Rovna UI components use `classnames` to compose CSS class strings from strings, arrays, and conditional objects.

## Current Status

Status: implemented as a local workspace package.

Created package:

```text
app/packages/classnames
```

Package name:

```text
classnames
```

This satisfies package dependencies that declare:

```text
"classnames": "^2"
```

## Actual Usage Found

Static scan found `classnames` imports in these local packages:

| Package | Example components / files | Mechanic |
| --- | --- | --- |
| `tend-ui-primitives` | Button, ButtonGroup, Form, Drawer, Tag, Spinner, ToggleButton, Dot, Counter, Chips | Conditional and merged `className` strings. |
| `tend-ui-typography` | Title, Strong, Quote, Paragraph, Link, Em | Base typography class plus optional external class. |
| `tend-ui-upload` | DndArea | Upload drop-area state classes. |
| `tend-ui-header` | Logo, TenantLogo | Header/logo root classes. |
| `tend-ui-tree` | TreeNode | Tree node state classes. |
| `tend-ui` | Primitive Table wrapper | Table root state classes. |

## Covered API

The local helper supports the usage pattern found in the archive:

```ts
cn('base', className)
cn(['base', className])
cn('base', { active: isActive, disabled: isDisabled })
cn(['base', className], { active: isActive })
```

Supported inputs:

| Input type | Result |
| --- | --- |
| `string` | Added as a class. |
| `number` | Added as a class when truthy. |
| `array` | Recursively flattened. |
| `object` | Adds keys with truthy values. |
| `false`, `null`, `undefined`, `0`, empty string | Ignored. |

## Boundaries

This replacement is intentionally small. It does not attempt to reproduce undocumented edge cases outside the usage found in Rovna UI sources.

No component source files were changed.

No package registry, corporate source, internal GitLab, Nexus or Figma access was used.

## Verification

Performed checks:

```text
node require check for app/packages/classnames
corepack yarn workspaces info --silent
Test-Path app/node_modules
Test-Path app/packages/tend-ui/dist
```

Expected status after `E-11`:

```text
app/packages/classnames is recognized as a workspace package.
app/node_modules is still absent.
dist is still absent.
Build and Storybook are still blocked until dependency graph/bootstrap is solved.
```

## Remaining Risk

Visual behavior still needs runtime verification after Storybook or a consumer smoke test becomes runnable.

The current replacement only confirms that the helper behavior is covered statically and with a direct Node check.

## Next Step

Recommended next step:

```text
E-12, E-13, E-14, E-15, E-16, E-17, E-18, E-19, E-20, E-21, E-22, E-23, E-24, E-25, E-26, E-27, E-28 and E-29 are completed; current next step is F-04C: repair the offline-public archive manifest and package paths.
```

Reason:

```text
Build and Storybook are still blocked by missing dependency graph and nested plain yarn calls, but classnames and uuid are now recognized as local workspace packages.
```
