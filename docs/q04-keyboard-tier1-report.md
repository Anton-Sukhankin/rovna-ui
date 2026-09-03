# Q-04.6: Keyboard-only проверка Tier 1

Дата проверки: 5 августа 2026 года.

## Итог

Проверка выполнена в локальной статической сборке Storybook через Codex in-app Chromium без использования мыши для пользовательских действий.

| Результат | Количество |
| --- | ---: |
| Проверено компонентов | 10 |
| Успешно | 4 |
| С дефектами | 6 |

`Q-04.6` имеет статус `[!]`: проверка завершена, но критерий приемки не выполнен.

## Матрица

| Компонент | Story | Статус | Проверенное поведение |
| --- | --- | --- | --- |
| Button | `tend-ui-primitives-button--primary` | passed | Tab, видимый focus, Enter |
| Input | `tend-ui-primitives-input--play` | passed | Tab, ввод текста, focus wrapper |
| Select | `tend-ui-main-primitives-select--large` | passed | открыть, выбрать, закрыть с клавиатуры |
| Modal | `tend-ui-main-primitives-modal--medium` | failed | focus выходит из открытого modal; Escape работает |
| Form | `tend-ui-form-form--default-values` | failed | checkbox не переключается по Space |
| Table | `tend-ui-table-table--default` | failed | кнопка «Фильтры» не выполняет действие по Enter |
| Filters | `tend-ui-filters-filters--default` | failed | focus выходит из drawer; Escape не закрывает drawer |
| Tree | `tend-ui-tree-tree--default` | failed | Space/Enter не меняют checkbox/expanded state |
| UploadArea | `tend-ui-upload-uploadarea--default` | failed | Enter/Space не открывают выбор файла |
| Header | `tend-ui-header-samoletheader--not-authenticated` | passed | auth links, ArrowRight в menu, видимый focus |

## Дефекты

| ID | Severity | Область | Результат |
| --- | --- | --- | --- |
| `QBUG-046-01` | P2 | Modal | После Cancel следующий Tab переводит focus на кнопку открытия за пределами modal. |
| `QBUG-046-02` | P1 | Form | Checkbox получает focus, но Space не меняет checked state. |
| `QBUG-046-03` | P2 | Table story | Кнопка «Фильтры» получает focus, но Enter не открывает панель. |
| `QBUG-046-04` | P1 | Filters | Drawer не удерживает focus и не закрывается по Escape. |
| `QBUG-046-05` | P1 | Tree | Node checkbox и expand button не выполняют действия по Space/Enter. |
| `QBUG-046-06` | P1 | UploadArea | Элемент `role=button` не открывает file chooser по Enter или Space. |

## Ограничение stories

`Default` stories для Form, Table, Tree и UploadArea содержат автоматические `play`-функции. Они изменяют состояние и focus до ручной проверки, поэтому для воспроизводимого quality gate нужны отдельные нейтральные keyboard stories без autoplay. Для Form дополнительно проверена story `DefaultValues`, где подтвержден дефект checkbox.

Машиночитаемый отчет: `docs/q04-keyboard-tier1-report.json`.

## Решение

Общий `Q-04` остается `[!]`. Следующая по порядку проверка: `Q-04.7` — focus return для Modal, Drawer и Popover. Найденные дефекты при этом должны быть исправлены отдельным remediation-блоком и затем перепроверены повторным запуском `Q-04.6`.
