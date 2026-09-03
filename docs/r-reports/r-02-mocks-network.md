# R-02: Автономные mocks и network isolation

Дата завершения: 2026-08-09.

Статус: `[x]` выполнено.

Следующий пакет: `R-03` - interactions, async reliability и pending tests.

## 1. Результат

Исходные 29 `partial/gap` состояний закрыты. Матрица расширена с 48 до 56
состояний, включая отдельный `timeout` для каждой семьи:

| Статус | Количество | Значение |
| --- | ---: | --- |
| `covered` | 50 | Существует детерминированная локальная story и проверяемое доказательство. |
| `n/a` | 6 | Исходный код подтверждает, что состояние принадлежит consumer data adapter, а не публичному контракту компонента. |
| `partial/gap` | 0 | Незакрытых состояний нет. |

Шесть `n/a`: `Table` error/unauthorized/retry/timeout и Header Project
unauthorized/retry. `Table` не владеет запросом данных, а Project не имеет
authorization-specific UI или публичного retry action.

## 2. Локальные сценарии

Добавлены 33 stories:

| Семья | Новые stories | Проверяемые состояния |
| --- | ---: | --- |
| AsyncSelect | 4 | loading, unauthorized, timeout, retry |
| AsyncCheckbox | 4 | loading, unauthorized, timeout, retry |
| AsyncRadio | 4 | loading, unauthorized, timeout, retry |
| Filters async options | 7 | success, empty, error, loading, unauthorized, timeout, retry |
| Tree async children | 5 | empty, loading, unauthorized, timeout, retry |
| UploadArea | 5 | rejected, loading, unauthorized, timeout, retry |
| Header Project | 4 | empty, error, loading, timeout |

Общий модуль `app/packages/tend-ui/src/stories/asyncFixtures.ts` предоставляет
локальные `resolve`, `reject`, `pending`, `timeout`, `unauthorized` и `retry`
fixtures. Целевые stories не используют Faker, `Date.now()`, `Math.random`,
реальные таймеры или случайные UUID в исходных данных.

## 3. Service boundaries

Машинный отчет фиксирует пять изолированных границ:

- API: локальные callbacks и same-origin `mockData`; unmatched external request запрещен;
- auth: локальный workspace stub `samolet-oauth2`, без реального OAuth/token refresh;
- realtime: source-only Notifications, same-origin WebSocket по умолчанию;
- upload: локальные `File` и callback adapters;
- search: локальные async fixtures; Search Assistant остается source-only.

Browser guard блокирует внешний `fetch`, XHR, WebSocket и EventSource. Runtime
network policy больше не имеет исключения для Figma или других публичных hosts:
ожидается абсолютный ноль внешних запросов.

## 4. Design references

Удалены все 15 runtime Figma iframe из MDX. Storybook показывает автономное
пояснение, а исходные ссылки сохранены только как данные в
`docs/source-design-references.json` с `runtimeEnabled: false`. Они не открываются
и не запрашиваются во время сборки, просмотра или тестов.

## 5. Исправленные runtime-дефекты

- AsyncRadio перехватывает ожидаемый request rejection и очищает debounce при unmount.
- Header Project перехватывает rejection, показывает `ErrorOverlay` и корректно обновляет selected keys.
- TreeNode не выбрасывает повторно ожидаемую ошибку загрузки и очищает error перед retry.
- UploadArea Progress получил доступное имя с названием файла.
- UploadArea stories используют явный `onChange: fn()` и проходят правила Storybook interactions.

## 6. Проверки

| Проверка | Результат |
| --- | --- |
| Targeted ESLint | Passed; ошибок `0` |
| Mock coverage | 56 states: 50 covered, 6 `n/a`, partial/gap `0` |
| Static Storybook build | 1222 entries: 1007 stories + 215 docs |
| Static assets | Missing `0`, invalid entries `0` |
| Runtime + network | 1222/1222 passed; failures/retries/external requests `0` |
| Browser tests | 1007/1007 passed; missing/duplicates/unexpected `0` |
| Component coverage | `documented-gap = 0`, missing key states `0` |
| Static/runtime language | 118 files и 1007/1007; English UI/mojibake/Faker `0` |
| Axe | 1007/1007; violations `0` |
| Reviewed a11y warning baseline | 222/222; added/changed/resolved `0` |
| Main package tests | 88 suites; 1374 passed, 4 skipped, 1 todo |
| Header tests | 2 suites; 5 passed |
| Tree tests | 4 suites; 35 passed, 2 skipped, 2 todo |
| Flakiness gate | Initial failures/new flakes/unresolved `0` |
| DS-only quality gate | 24 passed, 5 accepted risks, blocking failures `0` |

## 7. Решение

Все критерии `R-02` выполнены. Закрытые корпоративные источники и `S-Tracker`
не использовались. Пакет закрыт со статусом `[x]`; следующий пакет - `R-03`.
