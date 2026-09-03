# Component-to-Story Coverage

Updated: 2026-09-01.

## Status

- Audit: `passed`.
- Packages classified: `29`.
- Story entries: `1022`.
- Docs entries: `216`.
- Story groups: `119`.
- Public visual exports discovered through TypeScript AST: `953`.
- Reviewed type-only exports: `416`.
- Unclassified Storybook groups: `0`.

The full per-component and per-story matrix is stored in [component-story-coverage.json](component-story-coverage.json).

## Coverage Rules

- `direct-story`: a public visual export has a matching Storybook title.
- `cross-package-story`: a compatibility re-export is linked to the originating package story.
- `provider-contract`: a non-visual provider is verified by the shared Storybook/consumer wrapper.
- `composition-story`: an internal or contextual export is exercised by its public composition story.
- `alias-story`: a compatibility or unstable export is covered under its catalog name.
- `source-only-boundary`: an experimental application is outside the supported release and moves to the mock backlog.
- `package-collection`: icons, logos, tokens or type collections are intentionally covered by package-level catalogs.
- `documented-gap`: the public visual export has no directly matching title and remains an explicit review item.
- `source-only`: Storybook documents an experimental package that is outside the supported artifact contract.

## Package Summary

| Package | Classification | Public exports | Visual exports | Story groups | Stories | Docs |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `@rovna-ui/factories` | core | 3 | 0 | 0 | 0 | 0 |
| `@rovna-ui/tokens` | core | 2 | 0 | 0 | 0 | 0 |
| `@rovna-ui/types` | core | 24 | 0 | 0 | 0 | 0 |
| `@rovna-ui/utils` | core | 38 | 0 | 1 | 4 | 1 |
| `@rovna-ui/hooks` | core | 26 | 0 | 4 | 5 | 3 |
| `@rovna-ui/locale` | core | 4 | 1 | 0 | 0 | 0 |
| `@rovna-ui/styling` | core | 52 | 0 | 0 | 0 | 0 |
| `@rovna-ui/api` | core | 13 | 1 | 0 | 0 | 0 |
| `@rovna-ui/theme` | core | 5 | 2 | 0 | 0 | 0 |
| `@rovna-ui/grid` | core | 12 | 4 | 6 | 42 | 4 |
| `@rovna-ui/icons` | core | 390 | 388 | 1 | 1 | 0 |
| `@rovna-ui/logos` | core | 81 | 81 | 1 | 4 | 1 |
| `@rovna-ui/typography` | core | 25 | 8 | 7 | 77 | 7 |
| `@rovna-ui/primitives` | core | 79 | 20 | 19 | 217 | 19 |
| `@rovna-ui/components` | core | 678 | 432 | 60 | 473 | 55 |
| `@rovna-ui/base` | extended | 5 | 2 | 0 | 0 | 0 |
| `@rovna-ui/favicons` | extended | 2 | 1 | 1 | 16 | 1 |
| `@rovna-ui/fonts` | extended | 1 | 0 | 0 | 0 | 0 |
| `@rovna-ui/form` | extended | 18 | 2 | 1 | 14 | 1 |
| `@rovna-ui/upload` | extended | 11 | 2 | 2 | 43 | 2 |
| `@rovna-ui/header` | extended | 22 | 2 | 6 | 33 | 6 |
| `@rovna-ui/ai-chat` | experimental/source-only | 0 | 0 | 0 | 0 | 0 |
| `@rovna-ui/columns-settings` | experimental/source-only | 15 | 1 | 2 | 12 | 2 |
| `@rovna-ui/filters` | experimental/source-only | 13 | 3 | 2 | 22 | 1 |
| `@rovna-ui/notifications` | experimental/source-only | 1 | 1 | 0 | 0 | 0 |
| `@rovna-ui/search-assistant` | experimental/source-only | 1 | 1 | 0 | 0 | 0 |
| `@rovna-ui/table` | experimental/source-only | 1 | 0 | 5 | 14 | 5 |
| `@rovna-ui/tree` | experimental/source-only | 13 | 1 | 1 | 45 | 1 |
| `@rovna-ui/assets` | excluded | 0 | 0 | 0 | 0 | 0 |

## Key Component States

| Component | Stories | Covered state evidence | Missing state evidence |
| --- | ---: | --- | --- |
| Button | 49 | default, loading, disabled, interaction | - |
| Input | 17 | default, disabled, validation, interaction | - |
| Select | 11 | default, loading, multiple, interaction | - |
| Modal | 11 | default, open, close, scroll | - |
| Table | 7 | default, customization, emptyOrLoading, interaction | - |
| DrawerColumnsSettings | 10 | default, controlled, disabled, persistence | - |
| Filters | 21 | default, loading, dependency, apply | - |
| Tree | 45 | default, selection, drag, async | - |
| UploadArea | 29 | default, disabled, multiple, actions | - |

Missing state evidence is not silently treated as implemented. It becomes an explicit G-09 runtime check or a future story requirement.

## Documented Exceptions

| Package | Collection-covered exports | Direct-story gaps |
| --- | ---: | ---: |
| `@rovna-ui/icons` | 375 | 0 |
| `@rovna-ui/logos` | 80 | 0 |
| `@rovna-ui/components` | 349 | 0 |

Every public visual export is present in the JSON matrix with either direct coverage or an explicit exception.

## Command

From `app/`:

```powershell
node scripts/audit-component-story-coverage.js
```

## Next Runtime Check

R-01 binds every public visual export to a direct story or an evidence-backed boundary. R-02 continues the source-only service/mock cases.
