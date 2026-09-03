# QG-09: Unit/integration reliability

## Итог

Статус: `[!] diagnostically passed with classified test-harness warnings`.

Полный локальный DS-only gate прошел: `22/22` пакета, `216/216` suites, `6 637` активных тестов, `0` failures и `0` snapshot drift. Из `6 649` зарегистрированных тестов остаются `7 skip` и `5 todo`; все 12 классифицированы в `docs/pending-tests-decisions.json`.

## Выполненные Исправления

- Удалены два `describe.only`; обе Table-копии снова участвуют в полном прогоне.
- Исправлены не-awaited Table assertions и обязательный callback prop.
- Восстановлены 2 SamoletHeader, 2 Form tooltip, 3 Select и 2 useInputTitle теста.
- AsyncSelect стабилизирован на локальных nock API; Select сохраняет запрос открытия во время loading.
- TreeRow отменяет delayed single click при unmount; регрессионные fake-timer тесты проходят.
- `useDebouncedCallback` вызывает lodash `cancel()` при unmount; добавлен fake-timer regression test.
- Story UploadArea снимает временный file-input listener в `finally`.
- Все измененные snapshots просмотрены как ожидаемые изменения темы, ARIA и визуальных контрактов.

## Pending Tests

Исходный baseline содержал 26 pending: 10 из-за `describe.only` и 16 явных skip. В QG-09 закрыто 19: все 10 focus-excluded тестов и 9 явных skip. Текущий остаток состоит из 7 skip и 5 todo; для каждого указаны решение `deferred/obsolete`, причина и следующее действие. Неклассифицированных pending-тестов нет.

## Async И Cleanup

Статический аудит просмотрел 4 542 файла в 44 пакетах: 148 кандидатов, `23 cleanup present`, `0 cleanup missing`, `125 requires-review`. Последняя группа является эвристическим inventory, а не подтвержденными утечками.

В логах полного Jest gate классифицированы три legacy-класса предупреждений: 32 overlapping `act`, 49 mismatched `act` от смешения react-test-renderer snapshots с DOM tests и 2 teardown warnings внутри `rc-overflow/rc-select/rc-menu`. Jest не сообщил open handles и завершил все 22 процесса. Эти warnings остаются техническим долгом тестового harness, но неклассифицированных async warnings нет.

## Контракты Надежности

- Controlled/uncontrolled transitions: активные тесты `useControllableState` и V2 проходят.
- Debounce cleanup: default/custom/immediate/unmount cases проходят.
- Portal cleanup: Form tooltip, Select/AsyncSelect и Table interactions проходят; внешние rc teardown warnings классифицированы.
- Error boundaries: Tend UI не объявляет собственный boundary как публичный компонент; восстановление runtime exception остается обязанностью Storybook или проекта-потребителя. Ложный recovery contract не заявляется.
- Critical coverage собрано отдельно для UI, hooks, Table и Tree cleanup; общий процент не используется как единственный gate.

## Покрытие Критических Зон

| Зона | Statements | Branches | Functions | Lines |
| --- | ---: | ---: | ---: | ---: |
| Tend UI critical UI | 38.74% | 14.74% | 14.13% | 40.09% |
| Controlled state/debounce hooks | 24.58% | 11.17% | 17.69% | 26.70% |
| Table behavior | 37.90% | 15.31% | 15.22% | 39.37% |
| TreeRow cleanup | 11.68% | 1.07% | 4.73% | 12.82% |

Машинные доказательства: `docs/q09-unit-reliability-report.json`, `docs/async-cleanup-risk-inventory.json`, `docs/pending-tests-decisions.json` и `tmp/g10-ds-only-tests/report.json`.
