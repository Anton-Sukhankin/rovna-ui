# Migration Recipe: Complex Table

## Evidence

- [Main Table passport](../component-passports/generated/rovna-ui-main-primitives-table.md)
- [Feature Table passport](../component-passports/generated/rovna-ui-table-table.md)
- [ControlPanel passport](../component-passports/generated/rovna-ui-table-controlpanel.md)
- [ContextMenu passport](../component-passports/generated/rovna-ui-table-contextmenu.md)
- [Header passport](../component-passports/generated/rovna-ui-table-header.md)

## Boundary

Main primitive Table входит в поддерживаемый `@rovna-ui/components` artifact. Feature package `@rovna-ui/table` остается `source-only`; сложная миграция требует отдельного artifact/consumer proof.

## Sequence

1. Составьте контракт колонок, row keys, sorting, filters, pagination, selection, actions и persisted settings.
2. Начните с read-only render и empty/loading/error states.
3. Подключайте механику по одной: sorting, filtering, pagination, selection, row actions, columns settings.
4. Для controlled state назначьте одного owner и исключите двойное состояние Table/consumer.
5. Проверьте keyboard navigation, headers/scope, selected state и accessible action names.
6. Подтвердите horizontal overflow, sticky regions, portals и long Russian content на mobile/desktop.
7. Выполните large-data/virtualization test и сравните с текущим performance baseline.
8. Только после этого собирайте feature package и проверяйте tarball consumer.

## Stop Conditions

- row key нестабилен;
- sorting/filtering contract не совпадает с backend adapter;
- feature package не имеет подтвержденного artifact;
- выбор строк, pagination или column state теряется при rerender;
- virtualized rows нарушают keyboard/a11y semantics.

## Acceptance

- все применимые data states и действия имеют evidence;
- empty/loading/error не меняют layout непредсказуемо;
- selection/sorting/filtering сохраняют controlled state;
- bundle/performance budgets не превышены;
- consumer proof выполнен для выбранного package boundary.
