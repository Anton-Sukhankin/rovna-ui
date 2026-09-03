# QG-03 Network, Mocks And Interactions

Проверено: 2026-08-07. Статус: диагностически завершено, требуется дальнейшее расширение сценариев.

## Network Isolation

| Показатель | Результат |
| --- | ---: |
| Story source files | `112` |
| Network-dependent groups | `83` |
| Timer-dependent groups | `86` |
| Закрытые корпоративные URL | `0` |
| Запрещенные runtime requests | `0` |
| Заблокированные reference embeds | `5` |

Stories используют локальные callbacks, repository fixtures и относительные mock URLs. `msw` и `msw-storybook-addon` не добавлены: существующий контур уже изолирован, а новый dependency не устранит отсутствующие продуктовые states автоматически. Решение пересматривается только при появлении нескольких общих HTTP-контрактов, которые нельзя надежно выразить локальными adapters.

## Mock Coverage

Инвентаризированы 8 семейств и 48 состояний: `19 covered`, `7 partial`, `22 gap`. Всего `29` состояний требуют отдельного решения. Основные пробелы: unauthorized/retry для async controls, error/retry для Filters/Table/Upload/Header, empty async children Tree и явные loading-transition assertions.

Отсутствие unauthorized/retry не компенсируется искусственным Storybook UI: сначала соответствующий компонент должен иметь публичный контракт для этого состояния. До этого запись остается backlog или получает `n/a` только после review контракта.

## Interaction Coverage

| Показатель | Результат |
| --- | ---: |
| Browser suites | `112/112` passed |
| Browser tests | `942/942` passed |
| Play functions | `27` |
| Interactive groups | `70` |
| Interactive stories | `662` |
| Tier 1 groups without play | `5` |
| Tier 2 groups without play | `48` |
| Explicit matrix gaps | `689` |

Классификатор исправлен: `AsyncSelect` больше не считается обычным `Select`, `UploadButton` не считается основной Button, `SimpleTable` не считается основной Table. Матрица хранится в `docs/storybook-interaction-matrix.json`.

Существующие `play` scenarios используют browser assertions и проходят полностью. `ToggleButton` исправлен: удалена фиксированная задержка, добавлена проверка `aria-pressed`. В Input тестовая строка переведена на русский.

## Открытый Backlog

- Добавить primary/negative scenarios для 5 Tier 1 групп без `play`.
- Добавить минимум один state-changing и keyboard smoke для 48 Tier 2 групп без `play`, предварительно исключив доказанно статические группы.
- Добавить pointer и keyboard DnD acceptance для Tree/Columns Settings в `QG-07`.
- Добавить применимые loading/error/retry/abort assertions для 29 mock-state gaps.
- Наблюдать исторический clean-context retry `useSupportModal`; на финальной сборке он не повторился.

Текущий результат доказывает работоспособность имеющихся stories и interactions, но не доказывает полноту пользовательского покрытия.
