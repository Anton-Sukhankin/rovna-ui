# R-03: Interactions, async reliability и pending tests

Дата завершения: 2026-08-09.

Статус: `[x]` выполнено.

Следующий пакет: `R-04` - accessibility hardening.

## 1. Результат

Интерактивная часть Storybook и асинхронные контракты проверены в локальной
DS-only границе. Все 70 интерактивных component groups получили конечное
решение: 66 имеют executable evidence, 4 являются проверенными passive
контрактами. Неклассифицированных групп и async lifecycle findings нет.

| Метрика | Результат |
| --- | ---: |
| Storybook stories | 1008 |
| Storybook docs | 215 |
| Интерактивные группы | 70/70 |
| Stories с `play` | 58 |
| Обязательные типы операций | 15/15 |
| Unit/integration tests | 6651/6651 |
| Browser tests | 1008/1008 |
| Pending/todo tests | 0 |
| Test failures / snapshot drift | 0 / 0 |

## 2. Interaction matrix

Автоматизированы или подтверждены компонентными тестами: click, type, select,
open/close, submit, sort, filter, drag, upload, clear/reset, controlled state и
error recovery. Отдельные recovery stories проверяют AsyncCheckbox, AsyncRadio,
AsyncSelect и Upload после ошибки и повторного действия.

Матрица содержит 681 variant-level записи без собственного `play`. Это не
непроверенные component groups: дублировать одинаковое действие во всех
визуальных вариантах не требуется. Group-level gate связывает каждый применимый
контракт с canonical story play, component test или проверенным passive решением.

Машинное доказательство: `docs/r03-interaction-reliability.json` и
`docs/storybook-interaction-matrix.json`.

## 3. Исправления

- Реализованы все 7 skipped и 5 todo решений: 10 тестов активированы, один
  устаревший hook-сценарий удален как неприменимый, один контракт объединен с
  действующим тестом.
- `useUpload` защищен от публикации async-обновлений после unmount; проверены
  progress, rejection, removal во время pending upload и отсутствие handler.
- Добавлены проверки pin для Tree, preset apply для Filters, DatePicker change,
  AsyncSelect blur, ColumnsSettings unpin и forwarding базового Input.
- Для интерактивных stories добавлены сценарии формы, таблицы, меню, tabs,
  toast, tooltip, chips и async retry.
- Исправлен семантический дефект Chips: скрытый checkbox теперь отражает
  controlled `checked` state.
- В desktop BurgerMenu hook формирования dropdown перенесен выше условного
  выхода; порядок React hooks теперь стабилен при смене доступности services URL.
- В Header raw fixtures удалены `alert()`-вызовы, которые открывали системное
  окно подтверждения во время просмотра Storybook.

## 4. Async lifecycle

Статический аудит нашел 117 async/lifecycle кандидатов в 4549 файлах:

| Решение | Количество |
| --- | ---: |
| Явный cleanup | 22 |
| Deterministic harness | 14 |
| Promise, подтвержденный regression tests | 59 |
| Lifecycle внешнего owner API | 12 |
| Timer, подтвержденный regression tests | 10 |
| Неклассифицировано | 0 |

Категории включают timers, promises/async state, event listeners, observers и
subscriptions. Подтвержденных project-owned cleanup defects не осталось.
Машинное решение: `docs/r03-async-lifecycle-decisions.json`.

## 5. Проверки

| Проверка | Результат |
| --- | --- |
| Targeted ESLint для файлов R-03 | Passed; errors `0`, legacy warnings `27` |
| Repository-wide ESLint | Existing debt: 23 errors, 127 warnings; новых R-03 errors `0` |
| R-03 interaction/reliability gate | Passed; 15/15 operations, unclassified `0` |
| Static Storybook build | Passed; 1223 entries, 1008 stories, 215 docs |
| Static asset integrity | Passed; missing/invalid entries `0` |
| Forbidden browser dialogs | Passed; `alert/confirm/prompt` findings `0` |
| Browser tests | Passed; 1008/1008 |
| Unit/integration tests | Passed; 22/22 packages, 216/216 suites, 6651/6651 tests |
| Pending/todo/snapshot drift | `0/0/0` |

Полный unit gate сохранил только классифицированные предупреждения legacy React
17 test harness и внешних `rc-*` portal teardown. Они не сопровождаются failed
assertions, open handles или отсутствующим project-owned cleanup.

## 6. Решение

Критерии R-03 выполнены: применимые Tier 1/2 interactions имеют executable
evidence, pending/todo отсутствуют, browser и unit regression полностью зеленые.
Закрытые корпоративные источники и `S-Tracker` не использовались.

Общепроектный lint debt не создан R-03 и остается явно зафиксирован для
сквозного repository quality gate. Следующий пакет - `R-04`, accessibility
hardening полного каталога из 1008 stories.
