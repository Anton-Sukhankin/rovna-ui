# H-A + H-B: Storybook, Tooling, Interaction And Accessibility

Updated: 2026-07-30.

## Result

- `H-01`: `[x]` - 48 browser `alert()` calls in 13 story files were replaced with Storybook Actions; SamoletHeader callbacks prevent demo navigation.
- `H-02`: `[x]` - local ESLint is restored through a Node runner and public packages; no global Yarn is required.
- `H-03`: `[x]` - 11 story files now contain `play`; ten required component areas are protected by a static gate and browser runtime audit.
- `H-04`: `[x]` - official Storybook a11y automation is active; the current full-catalog audit has zero violations and no explicit baseline exceptions.

## Verification

| Check | Result |
| --- | --- |
| Story files scanned for browser dialogs | `112` |
| Forbidden `alert/confirm/prompt/window.open` | `0` |
| ESLint files | `474` |
| ESLint errors | `0` |
| Legacy unused warnings | `127` |
| Required interaction files | `10/10` |
| Total story files with `play` | `11` |
| Browser runtime interaction stories | `11/11` loaded without visible error or JS dialog |
| A11y stories audited | `10/10` |
| Static Storybook | `940` stories, `215` docs, four required endpoints returned `200` |

## Accessibility Baseline

The addon is configured in both Storybook configurations. The current full-catalog result is stored in `docs/accessibility-baseline.json`; the explicit-exceptions audit is stored in `docs/q04-baseline-exceptions-audit.json`.

The catalog currently has zero axe violations and zero explicit baseline exceptions. Q-04.10 moved the shared Storybook preview to the blocking `test: 'error'` mode. The policy is:

1. no new critical violation may be added;
2. rule suppressions and broad story-level exceptions are forbidden;
3. any future temporary exception must be narrow, documented and time-bounded;
4. the static quality gate rejects any regression from `error` back to `todo`.

## Dependency Source

All new packages came only from `https://registry.npmjs.org`:

- `eslint@8.57.1`;
- `@typescript-eslint/parser@7.18.0`;
- `@typescript-eslint/eslint-plugin@7.18.0`;
- `eslint-plugin-react-hooks@4.6.2`;
- `@storybook/addon-a11y@10.1.11`.

No corporate registry or external consumer was used.

## Next Group

`H-C`: `H-05 + H-06` - visual snapshot review and story/state coverage.
