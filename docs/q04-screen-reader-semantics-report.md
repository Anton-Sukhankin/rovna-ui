# Q-04.8: screen-reader semantics

Дата проверки: 5 августа 2026 года.

## Итог

Проведен воспроизводимый аудит role/name/value/state в Chromium для всех 10 Tier 1 компонентов и трех error/status stories.

| Результат | Количество |
| --- | ---: |
| Tier 1 passed | 7 |
| Passed с предупреждением | 1 |
| Failed | 2 |
| Error/status stories с live semantics | 0 из 3 |

`Q-04.8` имеет статус `[!]`. Chromium semantic tree проверен, но речевой вывод реального screen reader не подтвержден.

## Tier 1

| Компонент | Статус | Результат |
| --- | --- | --- |
| Button | passed | `button`, имя «Кнопка». |
| Input | passed | `textbox`, имя «Поле для проверки ввода». |
| Select | passed | `combobox`, имя, expanded/controls/autocomplete states. |
| Modal | passed | Именованный modal dialog через `aria-labelledby`. |
| Form | passed with warning | Все 15 полей имеют вычисляемое имя; «Конечная дата» использует только placeholder. |
| Table | passed | Table/columnheader/checkbox semantics присутствуют. Имя `Select all` требует русификации в Q-08. |
| Filters | failed | Modal dialog не имеет accessible name. |
| Tree | failed | Нет tree/treeitem и подтвержденного hierarchical expanded state. |
| UploadArea | passed | Именованные upload/remove buttons. |
| Header | passed | Banner, menu/menuitem и auth links распознаются. |

## Дефекты

| ID | Severity | Область | Проблема |
| --- | --- | --- | --- |
| `QBUG-048-01` | P2 | Filters | `role=dialog` и `aria-modal=true` есть, но заголовок «Фильтрация таблицы» не связан с dialog. |
| `QBUG-048-02` | P2 | Tree | Узлы имеют отдельные имена, но иерархия не передается как tree/treeitem; `aria-expanded` не меняется. |
| `QBUG-048-03` | P2 | Live regions | Alert error, Counter error и UploadArea limit не содержат `alert`, `status` или `aria-live`. |

Статический source scan подтверждает отсутствие явных `aria-live`, `role=alert` и `role=status` во всех TSX-файлах `app/packages`.

## Ограничение reader/browser

Windows Narrator установлен локально. NVDA и JAWS отсутствуют. Narrator не предоставляет этому автоматизированному запуску проверяемый текстовый transcript речевого вывода, поэтому я не считаю его фактически прослушанным или подтвержденным.

Для окончательной приемки нужен один ручной протокол:

1. Windows Narrator + Edge/Chromium либо NVDA + Chrome/Firefox;
2. пройти Button, Input, Select, Modal, Form error, Filters, Tree и UploadArea;
3. записать фактически произнесенные name/role/state и порядок чтения;
4. подтвердить объявления ошибок, загрузки и изменения состояния;
5. приложить transcript или screen-reader speech-viewer log.

Машиночитаемый отчет: `docs/q04-screen-reader-semantics-report.json`.

Следующая проверка: `Q-04.9` — аудит и удаление baseline exceptions по мере исправления.
