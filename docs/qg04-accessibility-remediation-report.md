# QG-04: Accessibility remediation

## Итог

Группа `QG-04` завершена 8 августа 2026 года. Все зарегистрированные runtime-дефекты `QBUG-046-*`, `QBUG-047-*` и `QBUG-048-*` исправлены и повторно проверены. Storybook продолжает работать с блокирующей политикой `a11y.test = 'error'`.

Единственное принятое ограничение — `Q048-ENV-01`: автоматический контур не может получить детерминированный речевой transcript Windows Narrator. Это ограничение инструмента приемки, а не известный дефект компонента. Семантическое дерево role/name/state и live-region contracts проверены в Chromium.

## Закрытые дефекты

| ID | Исправление | Проверка |
| --- | --- | --- |
| `QBUG-046-01` | Modal удерживает фокус; keyboard story проверяет Escape и возврат фокуса | Playwright story interaction |
| `QBUG-046-02` | Form/Checkbox переключается по Space | Playwright story interaction |
| `QBUG-046-03` | Кнопка «Фильтры» в Table открывает панель по Enter | Playwright story interaction |
| `QBUG-046-04` | Filters удерживает фокус, закрывается по Escape и возвращает фокус | Playwright story interaction |
| `QBUG-046-05` | Tree поддерживает tree/treeitem semantics, Space для checkbox и Enter/Space для раскрытия | Story interaction и unit tests |
| `QBUG-046-06` | UploadArea открывает file chooser по Enter/Space и исключается из tab order в disabled-состоянии | Story interaction и unit tests |
| `QBUG-047-01` | Popover получил focusable trigger, controlled open, Escape close и focus return | Story interaction и unit tests |
| `QBUG-048-01` | Filters dialog получил доступное имя | Axe и role/name assertions |
| `QBUG-048-02` | Tree передает уровень, expanded state, позицию и доступные имена узлов | Axe, story interaction и unit tests |
| `QBUG-048-03` | Alert, Counter, Form Message и Upload error используют точечные `alert`/`status` semantics | Axe и unit tests |

Drawer дополнительно получает доступное имя, корректный close-button label, начальный фокус и возврат фокуса после закрытия.

## Результаты повторных прогонов

| Проверка | Результат |
| --- | --- |
| Специализированные keyboard/focus stories | `7/7` passed |
| Полный Chromium Storybook suite | `112/112` suites, `949/949` tests, `0` failures |
| Полный axe-аудит | `949/949` stories, `0` violations, `0` critical/serious, `0` affected nodes |
| Целевые unit suites | `10/10` tests passed |
| Статическая сборка | `1164` entries: `949` stories и `215` docs |

Основные машинные доказательства: `docs/accessibility-full-report.json` и `tmp/q02-story-render-report.json`.

## Принятое ограничение reader

`Q-04.8` остается отмеченным `[!]` только в части реального речевого вывода. Для окончательной аудиторской приемки с речью нужен ручной прогон Narrator с сохраняемым журналом или внешний speech-viewer. Это не блокирует локальную работу Storybook и подключение пакетов, но должно быть повторено перед заявлением о сертифицированной поддержке конкретного screen reader.

## Решение

`QG-04 -> [x]`. Accessibility runtime gate зеленый; открытых P1/P2-дефектов из первоначального remediation backlog нет.
