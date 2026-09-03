# Rovna UI Catalog

Этот документ сгенерирован из актуальных R-09 evidence. Машинная версия: [ds-catalog.json](ds-catalog.json).

## Current Baseline

- Public visual exports: `953`.
- Reviewed type-only exports: `416`.
- Storybook groups: `119`.
- Stories/docs: `1022` / `216`.
- Generated passports: `126`.
- Unclassified groups and uncovered visual exports: `0 / 0`.

## Status Legend

- `supported`: пакет входит в проверенную `21`-package release boundary.
- `source-only`: исходники/stories доступны, но registry-free artifact contract не заявлен.
- `Storybook render verified`: story открыта в полном runtime/browser gate.
- `focused interaction evidence`: у группы есть исполняемая play story; это не означает 100% покрытия всех states.

## Package Inventory

| Package | Artifact | Visual exports | Groups | Stories | Docs |
| --- | --- | ---: | ---: | ---: | ---: |
| `@rovna-ui/factories` | `supported` | 0 | 0 | 0 | 0 |
| `@rovna-ui/tokens` | `supported` | 0 | 0 | 0 | 0 |
| `@rovna-ui/types` | `supported` | 0 | 0 | 0 | 0 |
| `@rovna-ui/utils` | `supported` | 0 | 1 | 4 | 1 |
| `@rovna-ui/hooks` | `supported` | 0 | 4 | 5 | 3 |
| `@rovna-ui/locale` | `supported` | 1 | 0 | 0 | 0 |
| `@rovna-ui/styling` | `supported` | 0 | 0 | 0 | 0 |
| `@rovna-ui/api` | `supported` | 1 | 0 | 0 | 0 |
| `@rovna-ui/theme` | `supported` | 2 | 0 | 0 | 0 |
| `@rovna-ui/grid` | `supported` | 4 | 6 | 42 | 4 |
| `@rovna-ui/icons` | `supported` | 388 | 1 | 1 | 0 |
| `@rovna-ui/logos` | `supported` | 81 | 1 | 4 | 1 |
| `@rovna-ui/typography` | `supported` | 8 | 7 | 77 | 7 |
| `@rovna-ui/primitives` | `supported` | 20 | 19 | 217 | 19 |
| `@rovna-ui/components` | `supported` | 432 | 60 | 473 | 55 |
| `@rovna-ui/base` | `supported` | 2 | 0 | 0 | 0 |
| `@rovna-ui/favicons` | `supported` | 1 | 1 | 16 | 1 |
| `@rovna-ui/fonts` | `supported` | 0 | 0 | 0 | 0 |
| `@rovna-ui/form` | `supported` | 2 | 1 | 14 | 1 |
| `@rovna-ui/upload` | `supported` | 2 | 2 | 43 | 2 |
| `@rovna-ui/header` | `supported` | 2 | 6 | 33 | 6 |
| `@rovna-ui/ai-chat` | `source-only` | 0 | 0 | 0 | 0 |
| `@rovna-ui/columns-settings` | `source-only` | 1 | 2 | 12 | 2 |
| `@rovna-ui/filters` | `source-only` | 3 | 2 | 22 | 1 |
| `@rovna-ui/notifications` | `source-only` | 1 | 0 | 0 | 0 |
| `@rovna-ui/search-assistant` | `source-only` | 1 | 0 | 0 | 0 |
| `@rovna-ui/table` | `source-only` | 0 | 5 | 14 | 5 |
| `@rovna-ui/tree` | `source-only` | 1 | 1 | 45 | 1 |
| `@rovna-ui/assets` | `source-only` | 0 | 0 | 0 | 0 |

## Component Group Passports

| Group | Package | Preferred import | Stories | Play | Artifact |
| --- | --- | --- | ---: | ---: | --- |
| [DrawerColumnsSettings](component-passports/generated/rovna-ui-columns-settings-drawercolumnssettings.md) | `@rovna-ui/columns-settings` | `@rovna-ui/columns-settings` | 10 | 1 | `source-only` |
| [useColumns](component-passports/generated/rovna-ui-columns-settings-usecolumns.md) | `@rovna-ui/columns-settings` | `@rovna-ui/columns-settings` | 2 | 0 | `source-only` |
| [FaviconProvider](component-passports/generated/rovna-ui-favicons-faviconprovider.md) | `@rovna-ui/favicons` | `@rovna-ui/favicons` | 16 | 0 | `supported` |
| [Filters](component-passports/generated/rovna-ui-filters-filters.md) | `@rovna-ui/filters` | `@rovna-ui/filters` | 21 | 3 | `source-only` |
| [HotFilters](component-passports/generated/rovna-ui-filters-hotfilters.md) | `@rovna-ui/filters` | `@rovna-ui/filters` | 1 | 1 | `source-only` |
| [Form](component-passports/generated/rovna-ui-form-form.md) | `@rovna-ui/form` | `@rovna-ui/form` | 14 | 3 | `supported` |
| [Box](component-passports/generated/rovna-ui-grid-box.md) | `@rovna-ui/grid` | `@rovna-ui/grid` | 14 | 0 | `supported` |
| [Col](component-passports/generated/rovna-ui-grid-col.md) | `@rovna-ui/grid` | `@rovna-ui/grid` | 4 | 0 | `supported` |
| [Flex](component-passports/generated/rovna-ui-grid-flex.md) | `@rovna-ui/grid` | `@rovna-ui/grid` | 8 | 0 | `supported` |
| [Grid](component-passports/generated/rovna-ui-grid-grid.md) | `@rovna-ui/grid` | `@rovna-ui/grid` | 7 | 0 | `supported` |
| [Row](component-passports/generated/rovna-ui-grid-row.md) | `@rovna-ui/grid` | `@rovna-ui/grid` | 4 | 0 | `supported` |
| [Space](component-passports/generated/rovna-ui-grid-space.md) | `@rovna-ui/grid` | `@rovna-ui/grid` | 5 | 0 | `supported` |
| [BurgerMenu](component-passports/generated/rovna-ui-header-core-burgermenu.md) | `@rovna-ui/header` | `@rovna-ui/header` | 4 | 1 | `supported` |
| [DrawerBurgerMenu](component-passports/generated/rovna-ui-header-core-drawerburgermenu.md) | `@rovna-ui/header` | `@rovna-ui/header` | 3 | 1 | `supported` |
| [DrawerProfile](component-passports/generated/rovna-ui-header-core-drawerprofile.md) | `@rovna-ui/header` | `@rovna-ui/header` | 1 | 0 | `supported` |
| [Header](component-passports/generated/rovna-ui-header-header.md) | `@rovna-ui/header` | `@rovna-ui/header` | 8 | 0 | `supported` |
| [useSupportModal](component-passports/generated/rovna-ui-header-hooks-usesupportmodal.md) | `@rovna-ui/header` | `@rovna-ui/header` | 1 | 1 | `supported` |
| [SamoletHeader](component-passports/generated/rovna-ui-header-samoletheader.md) | `@rovna-ui/header` | `@rovna-ui/header` | 16 | 2 | `supported` |
| [NumberFormatter](component-passports/generated/rovna-ui-hooks-numberformatter.md) | `@rovna-ui/utils` | `@rovna-ui/utils` | 4 | 0 | `supported` |
| [UNSTABLE_useControllableStateV2](component-passports/generated/rovna-ui-hooks-unstable-usecontrollablestatev2.md) | `@rovna-ui/hooks` | `@rovna-ui/hooks` | 1 | 0 | `supported` |
| [useBoolean](component-passports/generated/rovna-ui-hooks-useboolean.md) | `@rovna-ui/hooks` | `@rovna-ui/hooks` | 1 | 0 | `supported` |
| [useDebouncedCallback](component-passports/generated/rovna-ui-hooks-usedebouncedcallback.md) | `@rovna-ui/hooks` | `@rovna-ui/hooks` | 2 | 0 | `supported` |
| [useHover](component-passports/generated/rovna-ui-hooks-usehover.md) | `@rovna-ui/hooks` | `@rovna-ui/hooks` | 1 | 0 | `supported` |
| [All](component-passports/generated/rovna-ui-icons-all.md) | `@rovna-ui/icons` | `@rovna-ui/icons` | 1 | 0 | `supported` |
| [All](component-passports/generated/rovna-ui-logos-all.md) | `@rovna-ui/logos` | `@rovna-ui/logos` | 4 | 0 | `supported` |
| [ActionsButton](component-passports/generated/rovna-ui-main-components-actionsbutton.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 5 | 0 | `supported` |
| [AsyncCheckbox](component-passports/generated/rovna-ui-main-components-asynccheckbox.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 13 | 1 | `supported` |
| [AsyncRadio](component-passports/generated/rovna-ui-main-components-asyncradio.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 13 | 1 | `supported` |
| [AsyncSelect](component-passports/generated/rovna-ui-main-components-asyncselect.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 20 | 1 | `supported` |
| [BurgerMenu](component-passports/generated/rovna-ui-main-components-burgermenu.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 7 | 1 | `supported` |
| [CheckboxGroupSearch](component-passports/generated/rovna-ui-main-components-checkboxgroupsearch.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 10 | 0 | `supported` |
| [ColumnsSettings](component-passports/generated/rovna-ui-main-components-columnssettings.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 10 | 0 | `supported` |
| [ComponentPicker](component-passports/generated/rovna-ui-main-components-componentpicker.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 10 | 0 | `supported` |
| [DetachedTabs](component-passports/generated/rovna-ui-main-components-detachedtabs.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 1 | 1 | `supported` |
| [Form](component-passports/generated/rovna-ui-main-components-form.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 6 | 1 | `supported` |
| [Logo](component-passports/generated/rovna-ui-main-components-logo.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 4 | 0 | `supported` |
| [Profile](component-passports/generated/rovna-ui-main-components-profile.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 4 | 0 | `supported` |
| [RadioGroupSearch](component-passports/generated/rovna-ui-main-components-radiogroupsearch.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 10 | 0 | `supported` |
| [Search](component-passports/generated/rovna-ui-main-components-search.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 5 | 0 | `supported` |
| [Stand](component-passports/generated/rovna-ui-main-components-stand.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 3 | 0 | `supported` |
| [Status](component-passports/generated/rovna-ui-main-components-status.md) | `@rovna-ui/components` | `@rovna-ui/components/components` | 9 | 0 | `supported` |
| [Divider](component-passports/generated/rovna-ui-main-grid-divider.md) | `@rovna-ui/components` | `@rovna-ui/components/grid` | 6 | 0 | `supported` |
| [useBoolean](component-passports/generated/rovna-ui-main-hooks-useboolean.md) | `@rovna-ui/components` | `@rovna-ui/components/hooks` | 1 | 0 | `supported` |
| [Accordion](component-passports/generated/rovna-ui-main-primitives-accordion.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 3 | 0 | `supported` |
| [Actions](component-passports/generated/rovna-ui-main-primitives-actions.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 4 | 0 | `supported` |
| [Alert](component-passports/generated/rovna-ui-main-primitives-alert.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 13 | 0 | `supported` |
| [Avatar](component-passports/generated/rovna-ui-main-primitives-avatar.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 18 | 0 | `supported` |
| [Badge](component-passports/generated/rovna-ui-main-primitives-badge.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 43 | 0 | `supported` |
| [Card](component-passports/generated/rovna-ui-main-primitives-card.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 1 | 0 | `supported` |
| [Checkbox](component-passports/generated/rovna-ui-main-primitives-checkbox.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 12 | 1 | `supported` |
| [Chips](component-passports/generated/rovna-ui-main-primitives-chips.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 4 | 0 | `supported` |
| [DatePicker](component-passports/generated/rovna-ui-main-primitives-datepicker.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 14 | 0 | `supported` |
| [Dialog](component-passports/generated/rovna-ui-main-primitives-dialog.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 9 | 0 | `supported` |
| [Drawer](component-passports/generated/rovna-ui-main-primitives-drawer.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 14 | 0 | `supported` |
| [Dropdown](component-passports/generated/rovna-ui-main-primitives-dropdown.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 6 | 1 | `supported` |
| [InputNumber](component-passports/generated/rovna-ui-main-primitives-inputnumber.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 6 | 0 | `supported` |
| [Modal](component-passports/generated/rovna-ui-main-primitives-modal.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 11 | 3 | `supported` |
| [Pagination](component-passports/generated/rovna-ui-main-primitives-pagination.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 1 | 0 | `supported` |
| [Password](component-passports/generated/rovna-ui-main-primitives-password.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 5 | 0 | `supported` |
| [Popover](component-passports/generated/rovna-ui-main-primitives-popover.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 5 | 1 | `supported` |
| [Progress](component-passports/generated/rovna-ui-main-primitives-progress.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 5 | 0 | `supported` |
| [Radio](component-passports/generated/rovna-ui-main-primitives-radio.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 14 | 1 | `supported` |
| [RangePicker](component-passports/generated/rovna-ui-main-primitives-rangepicker.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 8 | 0 | `supported` |
| [Search](component-passports/generated/rovna-ui-main-primitives-search.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 11 | 0 | `supported` |
| [Segmented](component-passports/generated/rovna-ui-main-primitives-segmented.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 6 | 0 | `supported` |
| [Select](component-passports/generated/rovna-ui-main-primitives-select.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 11 | 2 | `supported` |
| [SimpleTable](component-passports/generated/rovna-ui-main-primitives-simpletable.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 5 | 0 | `supported` |
| [Steps](component-passports/generated/rovna-ui-main-primitives-steps.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 15 | 0 | `supported` |
| [StepsHistoryApproval](component-passports/generated/rovna-ui-main-primitives-stepshistoryapproval.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 1 | 0 | `supported` |
| [Table](component-passports/generated/rovna-ui-main-primitives-table.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 17 | 1 | `supported` |
| [Tabs](component-passports/generated/rovna-ui-main-primitives-tabs.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 2 | 1 | `supported` |
| [TextArea](component-passports/generated/rovna-ui-main-primitives-textarea.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 7 | 0 | `supported` |
| [TimePicker](component-passports/generated/rovna-ui-main-primitives-timepicker.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 6 | 0 | `supported` |
| [TimeSelect](component-passports/generated/rovna-ui-main-primitives-timeselect.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 3 | 0 | `supported` |
| [Toast](component-passports/generated/rovna-ui-main-primitives-toast.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 8 | 1 | `supported` |
| [Toggle](component-passports/generated/rovna-ui-main-primitives-toggle.md) | `@rovna-ui/components` | `@rovna-ui/components/primitives` | 13 | 1 | `supported` |
| [Typography](component-passports/generated/rovna-ui-main-typography-typography.md) | `@rovna-ui/components` | `@rovna-ui/components/typography` | 3 | 0 | `supported` |
| [Collapse](component-passports/generated/rovna-ui-main-ui-collapse.md) | `@rovna-ui/components` | `@rovna-ui/components/ui` | 4 | 0 | `supported` |
| [Divider](component-passports/generated/rovna-ui-main-ui-divider.md) | `@rovna-ui/components` | `@rovna-ui/components/ui` | 3 | 0 | `supported` |
| [EmptyOverlay](component-passports/generated/rovna-ui-main-ui-emptyoverlay.md) | `@rovna-ui/components` | `@rovna-ui/components/ui` | 2 | 0 | `supported` |
| [ErrorOverlay](component-passports/generated/rovna-ui-main-ui-erroroverlay.md) | `@rovna-ui/components` | `@rovna-ui/components/ui` | 2 | 0 | `supported` |
| [Image](component-passports/generated/rovna-ui-main-ui-image.md) | `@rovna-ui/components` | `@rovna-ui/components/ui` | 1 | 0 | `supported` |
| [List](component-passports/generated/rovna-ui-main-ui-list.md) | `@rovna-ui/components` | `@rovna-ui/components/ui` | 9 | 0 | `supported` |
| [Scrollable](component-passports/generated/rovna-ui-main-ui-scrollable.md) | `@rovna-ui/components` | `@rovna-ui/components/ui` | 2 | 0 | `supported` |
| [Skeleton](component-passports/generated/rovna-ui-main-ui-skeleton.md) | `@rovna-ui/components` | `@rovna-ui/components/ui` | 9 | 0 | `supported` |
| [Breadcrumbs](component-passports/generated/rovna-ui-primitives-breadcrumbs.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 14 | 3 | `supported` |
| [Button](component-passports/generated/rovna-ui-primitives-button.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 49 | 2 | `supported` |
| [Chips](component-passports/generated/rovna-ui-primitives-chips.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 4 | 1 | `supported` |
| [Counter](component-passports/generated/rovna-ui-primitives-counter.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 12 | 0 | `supported` |
| [Dot](component-passports/generated/rovna-ui-primitives-dot.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 11 | 0 | `supported` |
| [Drawer](component-passports/generated/rovna-ui-primitives-drawer.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 2 | 1 | `supported` |
| [Empty](component-passports/generated/rovna-ui-primitives-empty.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 21 | 0 | `supported` |
| [Form](component-passports/generated/rovna-ui-primitives-form.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 9 | 1 | `supported` |
| [Input](component-passports/generated/rovna-ui-primitives-input.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 17 | 2 | `supported` |
| [InputNumber](component-passports/generated/rovna-ui-primitives-inputnumber.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 8 | 0 | `supported` |
| [Layout](component-passports/generated/rovna-ui-primitives-layout.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 4 | 0 | `supported` |
| [Overflow](component-passports/generated/rovna-ui-primitives-overflow.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 1 | 0 | `supported` |
| [RangeInput](component-passports/generated/rovna-ui-primitives-rangeinput.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 8 | 0 | `supported` |
| [Spinner](component-passports/generated/rovna-ui-primitives-spinner.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 9 | 0 | `supported` |
| [StackNavigation](component-passports/generated/rovna-ui-primitives-stacknavigation.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 1 | 0 | `supported` |
| [Tag](component-passports/generated/rovna-ui-primitives-tag.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 36 | 0 | `supported` |
| [ToggleButton](component-passports/generated/rovna-ui-primitives-togglebutton.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 5 | 1 | `supported` |
| [Tooltip](component-passports/generated/rovna-ui-primitives-tooltip.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 2 | 1 | `supported` |
| [Whale](component-passports/generated/rovna-ui-primitives-whale.md) | `@rovna-ui/primitives` | `@rovna-ui/primitives` | 4 | 0 | `supported` |
| [ContextMenu](component-passports/generated/rovna-ui-table-contextmenu.md) | `@rovna-ui/table` | `@rovna-ui/table` | 3 | 0 | `source-only` |
| [ControlPanel](component-passports/generated/rovna-ui-table-controlpanel.md) | `@rovna-ui/table` | `@rovna-ui/table` | 2 | 0 | `source-only` |
| [Header](component-passports/generated/rovna-ui-table-header.md) | `@rovna-ui/table` | `@rovna-ui/table` | 1 | 0 | `source-only` |
| [Root](component-passports/generated/rovna-ui-table-root.md) | `@rovna-ui/table` | `@rovna-ui/table` | 1 | 0 | `source-only` |
| [Table](component-passports/generated/rovna-ui-table-table.md) | `@rovna-ui/table` | `@rovna-ui/table` | 7 | 4 | `source-only` |
| [Tree](component-passports/generated/rovna-ui-tree-tree.md) | `@rovna-ui/tree` | `@rovna-ui/tree` | 45 | 4 | `source-only` |
| [Em](component-passports/generated/rovna-ui-typography-em.md) | `@rovna-ui/typography` | `@rovna-ui/typography` | 1 | 0 | `supported` |
| [Link](component-passports/generated/rovna-ui-typography-link.md) | `@rovna-ui/typography` | `@rovna-ui/typography` | 16 | 0 | `supported` |
| [Paragraph](component-passports/generated/rovna-ui-typography-paragraph.md) | `@rovna-ui/typography` | `@rovna-ui/typography` | 21 | 0 | `supported` |
| [Quote](component-passports/generated/rovna-ui-typography-quote.md) | `@rovna-ui/typography` | `@rovna-ui/typography` | 1 | 0 | `supported` |
| [Strong](component-passports/generated/rovna-ui-typography-strong.md) | `@rovna-ui/typography` | `@rovna-ui/typography` | 1 | 0 | `supported` |
| [Text](component-passports/generated/rovna-ui-typography-text.md) | `@rovna-ui/typography` | `@rovna-ui/typography` | 19 | 0 | `supported` |
| [Title](component-passports/generated/rovna-ui-typography-title.md) | `@rovna-ui/typography` | `@rovna-ui/typography` | 18 | 0 | `supported` |
| [UploadArea](component-passports/generated/rovna-ui-upload-uploadarea.md) | `@rovna-ui/upload` | `@rovna-ui/upload` | 29 | 8 | `supported` |
| [UploadButton](component-passports/generated/rovna-ui-upload-uploadbutton.md) | `@rovna-ui/upload` | `@rovna-ui/upload` | 14 | 1 | `supported` |

## Boundary Passports

- [ApiClient](component-passports/generated/boundary-rovna-ui-api-apiclient.md): `provider-contract`.
- [RovnaUI](component-passports/generated/boundary-rovna-ui-components-rovnaui.md): `provider-contract`.
- [Language](component-passports/generated/boundary-rovna-ui-locale-language.md): `provider-contract`.
- [Notifications](component-passports/generated/boundary-rovna-ui-notifications-notifications.md): `source-only-boundary`.
- [SearchAssistant](component-passports/generated/boundary-rovna-ui-search-assistant-searchassistant.md): `source-only-boundary`.
- [RovnaUI](component-passports/generated/boundary-rovna-ui-theme-rovnaui.md): `provider-contract`.
- [Theme](component-passports/generated/boundary-rovna-ui-theme-theme.md): `provider-contract`.

## Evidence

- [Component/story coverage](../component-story-coverage.json)
- [Interaction matrix](../storybook-interaction-matrix.json)
- [Accessibility report](../accessibility-full-report.json)
- [R-07 artifacts](../r07-package-artifacts.json)
- [R-06 API policy](../public-api-versioning-policy.md)
