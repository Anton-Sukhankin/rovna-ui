# Q-04.9: аудит исключений accessibility baseline

Дата проверки: 6 августа 2026 года.

## Итог

Проверка завершена со статусом `passed`: явных accessibility-исключений в Storybook, исходниках stories, axe-аудиторе и baseline-отчетах не осталось.

| Тип исключения | Найдено |
| --- | ---: |
| Story-level `a11y` exceptions | 0 |
| Отключенные правила axe | 0 |
| Исключенные DOM-селекторы | 0 |
| Allowlist в скрипте аудита | 0 |
| Записи baseline exceptions | 0 |
| Глобальные suppressions правил | 0 |

## Проверенный scope

- `app/.storybook/`;
- все `app/packages/**/*.stories.*`;
- `app/scripts/audit-storybook-accessibility.js`;
- `docs/accessibility-baseline.json`;
- `docs/accessibility-full-report.json`.

Статический поиск проверял story-level параметры `a11y`, отключение правил, selector excludes, suppress/ignore-конструкции и allowlist-механизмы. Полный отчет axe дополнительно подтверждает `942/942` успешных аудитов, `0` stories с нарушениями и `0` затронутых violation-узлов.

## Что не является исключением

В полном axe-отчете есть `216` результатов `incomplete` на `518` DOM-узлах в `139` stories. Это вывод axe категории `needs review`: инструмент не смог автоматически вынести окончательное решение. Эти записи не отключают правила, не скрывают violations и не приняты как допустимые нарушения.

| Правило | Срабатывания | Узлы |
| --- | ---: | ---: |
| `aria-prohibited-attr` | 90 | 105 |
| `aria-valid-attr-value` | 64 | 65 |
| `color-contrast` | 50 | 335 |
| `form-field-multiple-labels` | 10 | 11 |
| `th-has-data-cells` | 1 | 1 |
| `duplicate-id-aria` | 1 | 1 |

Ручные keyboard, focus-return и semantics-проверки ведутся отдельно в `Q-04.6`-`Q-04.8`; `incomplete` не переводятся в исключения автоматически.

## Граница с Q-04.10

В рамках Q-04.9 глобальная настройка Storybook `a11y.test = 'todo'` была сохранена, поскольку это режим quality gate, а не правило-исключение или allowlist. Следующая проверка Q-04.10 успешно перевела очищенный каталог в `error`.

Машиночитаемый отчет: `docs/q04-baseline-exceptions-audit.json`.
