# Component Runtime Check

## Purpose

This document records the `D-06` component check for the first Rovna UI component set:

- Button;
- Input;
- Select;
- Modal;
- Table.

The current check is a blocked diagnostic. Storybook is not running, so runtime behavior and visual states are not verified.

## Current Blocker

`D-05` showed that Storybook cannot start:

```text
'storybook' is not recognized as an internal or external command,
operable program or batch file.
```

Current local state:

| Check | Result |
| --- | --- |
| `app/node_modules` | missing |
| `app/node_modules/.bin/storybook` | missing |
| `app/storybook-static` | missing |

## Static Component Map

| Component | Static source | Storybook story | Docs | Runtime status |
| --- | --- | --- | --- | --- |
| Button | `app/packages/tend-ui-primitives/src/Button/Button.tsx` | `app/packages/tend-ui-primitives/src/Button/Button.stories.tsx` | `app/packages/tend-ui-primitives/src/Button/Button.mdx` | blocked / runtime unverified |
| Input | `app/packages/tend-ui-primitives/src/Input/Input.tsx` | `app/packages/tend-ui-primitives/src/Input/Input.stories.tsx` | `app/packages/tend-ui-primitives/src/Input/Input.mdx` | blocked / runtime unverified |
| Select | `app/packages/tend-ui/src/primitives/Select/Select.tsx` | `app/packages/tend-ui/src/primitives/Select/Select.stories.tsx` | `app/packages/tend-ui/src/primitives/Select/Select.mdx` | blocked / runtime unverified |
| Modal | `app/packages/tend-ui/src/primitives/Modal/Modal.tsx` | `app/packages/tend-ui/src/primitives/Modal/Modal.stories.tsx` | `app/packages/tend-ui/src/primitives/Modal/Modal.mdx` | blocked / runtime unverified |
| Table | `app/packages/tend-ui/src/primitives/Table/Table.tsx`; `app/packages/tend-ui-table/src/Table/Table.stories.tsx` for feature table coverage | `app/packages/tend-ui/src/primitives/Table/Table.stories.tsx`; `app/packages/tend-ui-table/src/Table/Table.stories.tsx` | `app/packages/tend-ui/src/primitives/Table/Table.mdx`; `app/packages/tend-ui-table/src/Table/Table.mdx` | blocked / runtime unverified |

## Story Titles Found

| Component | Story title |
| --- | --- |
| Button | `tend-ui-primitives/Button` |
| Input | `tend-ui-primitives/Input` |
| Select | `tend-ui (main)/Primitives/Select` |
| Modal | `tend-ui (main)/Primitives/Modal` |
| Table | `tend-ui (main)/Primitives/Table`; `tend-ui-table/Table` |

## Required Runtime Checks

These states remain unverified until Storybook runs:

| Component | Required checks |
| --- | --- |
| Button | default, hover, focus, active/pressed, disabled, loading, icon before/after if supported |
| Input | default, hover, focus, disabled, clearable state, error/invalid through form context if supported |
| Select | default, hover, focus, open/closed dropdown, selected value, disabled, loading, empty/options state |
| Modal | closed/open, focus inside modal, close by icon/button, cancel, confirm, scroll/long content |
| Table | default data, empty data, loading, wide columns, row selection if used, sorting/filtering if the story supports it |

## D-06 Decision

`D-06` is complete as a blocked component-check diagnostic.

Static source files, stories and docs exist for the first component set, but component runtime behavior is not verified.

The components must not be marked as functioning until Storybook opens and the required states are checked visually and interactively.

## Next Step

The next checklist step is `D-07`: prepare the connection strategy with the current limitation that no built package and no verified Storybook runtime exist yet.
