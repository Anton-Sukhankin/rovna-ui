# Q-12: performance и resilience

Дата проверки: 2026-08-08.

Статус: `[x]` диагностический browser audit прошел, findings `0`.

## Покрытие

| Область | Результат |
| --- | --- |
| Render | `8/8`, по три запуска, агрегирование median |
| Interaction | `4/4` |
| Repeated mount/unmount | `4/4` компонентов, по `5` remount |
| ResizeObserver/portal | `3/3` |
| Partial data | `3/3` |
| Empty/error fallbacks | `7/7` |
| External requests | blocked |
| Findings | `0` |

Scale evidence включает Table с `5000` строками и CheckboxGroupSearch/RadioGroupSearch с `1000` элементами. Median render находился в диапазоне `1461-2091 ms`; search/sort/filter interactions заняли `75-87 ms`. Проверены Table, Tree, Select, Filters, Upload, virtual lists, Modal и Drawer.

Проверка lifecycle не обнаружила неконтролируемого роста timers, global listeners или observed nodes после пяти remount. Portal/measurement warnings, blocking main-thread findings, превышения CLS-budget и ошибки partial/empty/error states отсутствуют.

## Исправленные дефекты

AsyncCheckbox и AsyncSelect показывали корректный fallback, но оставляли внутренний rejected promise необработанным. Внутренняя promise-цепочка теперь потребляет rejection, а debounce отменяется при unmount. Адресные тесты прошли: `2` suites, `42` passed, `1` ранее классифицированный skip.

## Политика бюджета

Бюджеты сохранены как диагностические ориентиры. Они не являются жестким microbenchmark CI gate, пока нет стабильного выделенного CI runner; функциональные зависания, errors, resource growth и broken fallbacks остаются блокирующими.

Машинное доказательство: `docs/q12-performance-report.json`.
