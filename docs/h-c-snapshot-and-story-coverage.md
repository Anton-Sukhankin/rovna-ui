# H-C: Snapshot And Story Coverage

Updated: 2026-07-30.

## Result

- `H-05`: passed.
- `H-06`: passed with explicit non-story exceptions.
- Storybook static build: `942` stories, `215` docs, `1157` total entries.
- Jest: `22/22` packages passed, `210` test files, `6572/6603` tests passed, `31` pending, `0` failed.
- Snapshot drift: `0` after review and baseline update.
- Required state gaps for the nine key components: `0`.

## Snapshot Review

The previous `29` failures were Jest textual styled-component snapshots, not image screenshots:

| Package | Updated snapshots | Decision |
| --- | ---: | --- |
| `@10d/tend-ui` | 16 | Expected baseline update. Public Ant Design icon styles are now present in the restored local dependency graph. |
| `@10d/tend-ui-table` | 1 | Expected baseline update for the same icon-style serialization. |
| `@10d/tend-ui-tree` | 12 | Expected baseline update. Icon styles and deterministic styled-component ordering changed; browser runtime and assertions remained valid. |

The baseline was accepted only after the affected suites passed and the critical stories loaded without runtime errors. The complete DS-only Jest pass then confirmed that no functional failure was hidden by the update.

## Required Story States

- `Input`: separate `Disabled` and `Validation` stories;
- `Select`: executable selection interaction in `play`;
- `Table`: separate `Empty` and `Loading` stories plus the existing selection interaction;
- `Filters`: controlled value update and executable filter-selection interaction;
- Button, Modal, DrawerColumnsSettings, Tree and UploadArea already had the required state coverage.

## Documented Non-Story Exceptions

The remaining `39` static audit gaps were reviewed as API-shape exceptions, not missing user-facing states:

| Category | Count | Decision |
| --- | ---: | --- |
| Providers and non-visual runtime contexts | 5 | Covered by decorators and consuming stories; a standalone visual story would not represent a user-visible state. |
| Type-only exports and presets | 18 | No runtime UI exists to render; retain in API documentation and type tests. |
| Internal/composition exports | 13 | Covered through parent component stories; do not expose duplicate standalone stories. |
| Explicit unstable API | 1 | `UNSTABLE_InputNumber` remains documented as unstable and is not promoted by H-06. |
| Service/source-only features | 2 | Notifications and SearchAssistant remain outside the supported visual release boundary pending the H-09 decision. |

The detailed per-export classification remains in `docs/component-story-coverage.json`.

## Verification Commands

From `app/`:

```powershell
node scripts/run-ds-only-tests.js
node scripts/build-storybook-local.js
node scripts/audit-component-story-coverage.js
node scripts/check-storybook-interactions.js
node scripts/check-storybook-quality-config.js
node scripts/run-eslint.js --quiet
```

## Next Group

`H-D / H-07`: extend the registry-free release bundle from the 15 core packages to all 21 supported core and extended packages, then repeat tarball and isolated-consumer verification.
