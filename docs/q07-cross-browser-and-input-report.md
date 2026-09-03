# QG-07: Cross-browser и способы ввода

## Итог

Статус: `[!] passed with accepted environment blocker`.

Доступные браузерные контуры прошли без дефектов компонентов. Полная поддержка Firefox не заявляется: локальный provider `@vitest/browser-playwright 4.1.10` блокируется до создания страницы с ошибкой `browserContext.newPage: Cannot read properties of undefined (reading '_page')`.

## Browser Matrix

| Браузер | Объем | Результат | Статус поддержки |
| --- | ---: | ---: | --- |
| Chromium | весь каталог | `949/949` | подтвержден локально |
| WebKit | 11 risk-файлов | `182/182` | подтвержден risk-based набором |
| Firefox | 11 risk-файлов + file input | тесты не стартовали | не подтвержден; environment blocker |

Firefox blocker воспроизводится до загрузки Storybook и поэтому классифицирован как ограничение локального browser provider, а не дефект Tend UI.

## Способы Ввода

Проверены mouse hover/click, context menu, pointer drag-and-drop Tree, touch-like Drawer/Menu/Select/Upload, keyboard navigation, keyboard drag-and-drop Tree/ColumnsSettings и file input в Chromium/WebKit. Итог дополнительной матрицы: `8 passed`, `0 failed`, `12 blocked`, причем все blocked-проверки относятся только к Firefox environment blocker.

Для Tree добавлены `KeyboardSensor` и `sortableKeyboardCoordinates`; sortable-row передает ARIA attributes. Storybook-сценарии Tree и DrawerColumnsSettings подтверждают keyboard DnD через `Space`, `ArrowDown`, `Space`.

## Решение

- Chromium является основным полностью проверенным браузером.
- WebKit имеет подтвержденный risk-based контракт для критических интеракций.
- Firefox остается явной непроверенной областью и не блокирует локальную DS-only готовность, но блокирует заявление полной трехбраузерной поддержки.
- Корпоративные registry или сервисы не использовались.

Машинные доказательства: `docs/q07-cross-browser-report.json` и `docs/q07-input-modes-report.json`.
