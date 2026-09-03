# H-ветка: Stabilization and Release Readiness

Updated: 2026-07-29.

## Назначение

Этот документ является активным планом корректирующих работ после завершения локальной DS-only G-ветки. G-ветка подтвердила, что Tend UI и Storybook работают локально; H-ветка повышает качество взаимодействий, полноту поставки пакетов и готовность к подключению и публичной публикации.

H-ветка не отменяет результаты `G-00`-`G-18` и не возвращает проект к старым блокерам зависимостей. Она закрывает остаточный backlog, выявленный финальным аудитом.

## Рабочая граница

- Работа ведется только в репозитории `DS Tend UI`.
- `S-Tracker` и другие внешние проекты не читаются, не изменяются и не используются как критерий завершения.
- Закрытые корпоративные registry, GitLab, Nexus, Figma и сервисные среды не используются и не запрашиваются.
- Допустимы локальные артефакты и общедоступные npm/GitHub-источники. Любая новая публичная зависимость должна быть обоснована, зафиксирована lockfile и проверена локальным gate.
- Публикация не выполняется до отдельного подтверждения владельца, лицензии и package scope.

## Легенда

- `[x]` - задача выполнена и подтверждена исполняемой проверкой.
- `[ ]` - задача не начата.
- `[~]` - задача выполняется или частично подтверждена.
- `[!]` - техническая часть выполнена, но завершение требует решения владельца или отсутствующего инструмента среды.

## Исходное состояние

| Область | Подтвержденный факт | Остаточная задача |
| --- | --- | --- |
| Storybook | 938 stories и 215 docs; live/static runtime работает | Убрать системные диалоги и расширить автоматизацию взаимодействий |
| Stories | 112 story-файлов | Только один файл содержит `play`; 48 `alert()` в 13 файлах |
| Coverage | 969 public visual exports классифицированы | 39 direct-story gaps и отдельные пробелы состояний |
| Tests | 6543/6603 tests passed; функциональных блокеров нет | Проверить 29 visual snapshot differences |
| Packages | 21 core/extended artifacts собираются | Release bundle содержит только 15 core-пакетов |
| Experimental | 7 source-only пакетов видны в Storybook | Для каждого требуется отдельное решение о поддержке |
| Tooling | Основные build/test/gate команды работают | Lint не является рабочим quality gate |
| Accessibility | Ручной runtime smoke выполнен | Автоматический a11y gate отсутствует |
| Compatibility | Текущий локальный контракт основан на React 17 | React 18/19 не проверены |
| Publication | Локальный Git baseline создан | Нет root LICENSE, remote/CI и подтвержденного владения `@10d` |

## Главный чек-лист H-ветки

| ID | Статус | Задача | Критерий завершения |
| --- | --- | --- | --- |
| H-01 | [x] | Очистить Storybook-взаимодействия. | 112 story-файлов проверены: системных диалогов/`window.open` нет; SamoletHeader не выполняет demo navigation. |
| H-02 | [x] | Восстановить lint и переносимые локальные команды. | Node-runner проверил 474 файла: 0 errors, 127 legacy warnings; глобальный Yarn не нужен. |
| H-03 | [x] | Добавить автоматические interaction-сценарии. | 11 story-файлов имеют `play`; 10/10 обязательных областей и 11/11 runtime stories прошли. |
| H-04 | [x] | Добавить accessibility gate. | `addon-a11y` активен; 10/10 stories проверены, legacy violations записаны в контролируемый temporary baseline. |
| H-05 | [x] | Разобрать visual snapshot differences. | 29 Jest snapshot-расхождений подтверждены как ожидаемая сериализация стилей, baseline обновлен; `22/22` пакета прошли, `6572/6603` теста passed, `31` pending, snapshot drift отсутствует. |
| H-06 | [x] | Закрыть документированные story/state gaps. | У девяти ключевых компонентов нет пропущенных состояний; 39 non-story API exports классифицированы явными исключениями. |
| H-07 | [x] | Расширить проверенный release bundle. | Все 6 extended-пакетов включены: `21/21` tarballs, offline install, Vite build и DOM smoke прошли. |
| H-08 | [x] | Проверить React compatibility. | React 17.0.2, 18.3.1 и 19.2.0 прошли install/build/DOM smoke; официальным peer contract пока остается React 17. |
| H-09 | [x] | Принять решение по experimental packages. | Четыре сложных UI-пакета получили `defer`, три сервисных feature-пакета — `exclude`; основания зафиксированы. |
| H-10 | [!] | Подготовить public delivery. | GitHub Actions quality-маршрут готов; license, redistribution rights, remote и владение `@10d` остаются явными owner-blocked решениями. |
| H-11 | [x] | Выполнить итоговый stabilization/release gate. | Итог: 16 passed, 1 owner warning, 0 blockers; Storybook, lint, tests, a11y config, artifacts, tarballs и consumers проверены. |

## H-01. Storybook Interaction Cleanup

### Действия

1. Сформировать точный реестр `alert()`, внешней навигации, `window.open` и интерактивных заглушек в stories.
2. Заменить story-only callbacks на Storybook spies/actions, не меняя публичное поведение компонентов.
3. Предотвратить переходы из canvas там, где ссылка нужна только для демонстрации callback.
4. При необходимости заменить недоступные demo assets локальными нейтральными fixtures.
5. Проверить Header, Form, Upload, Select, Tree и другие затронутые stories в браузере.

### Definition of Done

- системные `alert/confirm/prompt` не используются как основной механизм stories;
- клики не уводят пользователя из Storybook без явной цели;
- callback payload виден в Storybook-инструментах или в локальном story-state;
- компоненты не получают несовместимых изменений публичного API.

## H-02. Lint And Portable Commands

### Действия

1. Зафиксировать текущую причину сбоя lint: nested plain `yarn` и неполный ESLint toolchain.
2. Выбрать переносимый runner через Corepack/Node и привести root scripts к одному способу запуска.
3. Восстановить минимальный публичный ESLint/TypeScript stack без закрытых конфигураций.
4. Выполнить lint, классифицировать legacy violations и определить допустимый baseline.
5. Добавить lint в исполняемый DS-only gate.

### Definition of Done

- команда lint воспроизводима без глобально установленного Yarn;
- отсутствуют зависимости от закрытого `@10d/eslint-config`;
- новые ошибки блокируют gate, а допустимый legacy baseline явно документирован.

## H-03. Storybook Interaction Tests

### Минимальная матрица

- Button: click, disabled, loading;
- Input: ввод, очистка, validation, disabled;
- Select: open, select, clear, keyboard, multiple;
- Modal/Drawer: open, focus, close, Escape;
- Header: signin/signup/menu callbacks без навигации;
- Form: submit/validation без browser alert;
- Table/Tree/Filters/Upload: основные изменения состояния.

### Definition of Done

- критические сценарии выполняются через `play` и assertions;
- тесты не требуют сети и корпоративных сервисов;
- нестабильные таймеры и произвольные задержки отсутствуют;
- interaction suite включен в итоговый gate.

## H-04. Accessibility Gate

### Действия

1. Добавить совместимый публичный a11y-инструмент для Storybook либо эквивалентный локальный axe-runner.
2. Проверить семантику, accessible names, контрастность и ARIA критических stories.
3. Отдельно проверить keyboard/focus lifecycle Modal, Drawer, Select, Menu, Table и Header.
4. Зафиксировать baseline нарушений и уровень, который блокирует gate.

### Definition of Done

- автоматическая a11y-проверка запускается локально;
- критические нарушения отсутствуют либо имеют временное документированное исключение;
- keyboard/focus матрица содержит воспроизводимые результаты.

## H-05. Visual Snapshot Review

### Действия

1. Воспроизвести 29 расхождений в `tend-ui`, `tend-ui-table` и `tend-ui-tree`.
2. Сопоставить actual/reference изображения и классифицировать каждое расхождение.
3. Исправить реальную регрессию либо обновить baseline только после визуальной проверки.
4. Повторить test suite и сохранить отчет без необъясненных drift failures.

### Definition of Done

- ни один snapshot не обновлен вслепую;
- для каждого изменения есть решение `bug fixed` или `expected baseline update`;
- visual suite проходит либо содержит только утвержденные исключения.

## H-06. Story And State Coverage

### Приоритет

1. Input: dedicated disabled и validation stories.
2. Select: source-level interaction story.
3. Table: empty и loading stories.
4. Filters: stateful checkbox/apply/reset scenario.
5. Остальные 39 direct-story gaps из coverage matrix.

### Definition of Done

- coverage matrix пересобрана;
- direct-story gaps равны нулю либо каждый остаток имеет обоснованное исключение;
- обязательные состояния проверяются story и runtime/assertion.

## H-07. Extended Release Promotion

### Область

- `@10d/tend-ui-base`;
- `@10d/tend-ui-favicons`;
- `@10d/tend-ui-fonts`;
- `@10d/tend-ui-form`;
- `@10d/tend-ui-upload`;
- `@10d/tend-ui-header`.

### Действия и Definition of Done

1. Проверить public manifests, exports, types, assets и peer dependencies каждого пакета.
2. Добавить выбранные пакеты в release order, manifest и checksum chain.
3. Создать tarballs и установить их в чистый isolated consumer без registry.
4. Выполнить build и DOM smoke, включая `SamoletHeader` и Upload/Form-компоненты.
5. Получить ожидаемый release scope `21` пакетов либо документировать исключения.

## H-08. React Compatibility Matrix

### Действия

1. Зафиксировать React 17 как текущую подтвержденную baseline-конфигурацию.
2. Создать отдельные минимальные consumers для React 18 и React 19.
3. Проверить install, TypeScript, Vite build, provider и основные компоненты.
4. Проверить StrictMode, root API и peer dependency warnings.
5. Обновить peer ranges только по фактическим результатам.

### Definition of Done

- для каждой версии есть статус `supported`, `conditional` или `unsupported`;
- документация подключения соответствует package manifests;
- неподтвержденные версии не заявлены как поддерживаемые.

## H-09. Experimental Package Decisions

### Пакеты

`ai-chat`, `columns-settings`, `filters`, `notifications`, `search-assistant`, `table`, `tree`.

### Порядок

1. Сначала UI-механики: columns-settings, filters, table, tree.
2. Затем service packages: notifications, search-assistant, ai-chat.
3. Для service packages использовать локальные adapters/mocks; корпоративные endpoint и auth не восстанавливать.

### Definition of Done

Для каждого пакета записаны runtime dependencies, Storybook behavior, build/artifact status, consumer test и итоговое решение `promote`, `defer` или `exclude`.

## H-10. Public Delivery Readiness

### Техническая часть

- подготовить GitHub Actions для lint, tests, Storybook build/smoke, package gate и consumer rehearsal;
- добавить версию Node/Yarn для воспроизводимого окружения;
- подготовить release notes, integrity checks, SBOM и public dependency/license audit;
- проверить отсутствие секретов, активных внутренних URL и приватных registry;
- проверить container runtime, если Docker CLI доступен.

### Решения владельца

- выбрать и добавить root LICENSE;
- подтвердить право распространять код, шрифты, иконки, логотипы и другие assets;
- подтвердить владение `@10d` либо выбрать новый npm/GitHub Packages scope;
- выбрать публичный репозиторий и публикационный канал.

Owner-only решения могут иметь статус `[!]`, не блокируя локальный H-01-H-09.

## H-11. Final Stabilization And Release Gate

Итоговый gate должен проверить:

1. Storybook manager и static build.
2. Отсутствие непредусмотренных browser dialogs/navigation.
3. Lint, unit, interaction, accessibility и visual tests.
4. Component/story coverage matrix.
5. Core и promoted package artifacts.
6. Tarball manifest, checksums и release order.
7. Isolated consumer install/build/DOM smoke без registry.
8. React compatibility matrix.
9. Source policy и документацию.
10. Отдельный public-owner verdict, не смешанный с local technical verdict.

## Группы выполнения

| Группа | Этапы | Результат |
| --- | --- | --- |
| H-A | `H-01 + H-02` | Чистые Storybook-взаимодействия и рабочий lint/tooling baseline |
| H-B | `H-03 + H-04` | Автоматические interaction и accessibility проверки |
| H-C | `H-05 + H-06` | Проверенные visual baselines и закрытые story/state gaps |
| H-D | `H-07` | Расширенный проверенный release bundle |
| H-E | `H-08 + H-09` | Compatibility matrix и решения по experimental packages |
| H-F | `H-10` | Техническая подготовка публичной поставки и owner gates |
| H-G | `H-11` | Итоговый stabilization/release verdict |

Группы выполняются последовательно. Внутри группы дополнительное подтверждение между пунктами не требуется, если работа не выходит за указанную границу и не требует публикации или закрытого доступа.

## Правило обновления статуса

После каждой группы необходимо:

1. обновить статусы H-пунктов в этом документе;
2. создать краткий отчет с командами, результатами и оставшимися рисками;
3. обновить исполняемый quality gate, если добавлена новая обязательная проверка;
4. синхронизировать `docs/history/workflows/design-system-workflow.md`, README и agent context при изменении публичного контракта;
5. назвать следующую группу до завершения ответа пользователю.

Пункт получает `[x]` только при наличии воспроизводимого доказательства. Документирование проблемы без исправления дает `[~]` или `[!]`, но не `[x]`.

## Рекомендуемый старт

Группы `H-A`-`H-G` завершены. Технических блокеров нет; H-10 сохраняет `[!]` только из-за owner gates лицензии, npm scope, GitHub remote и разрешения на публикацию.

Итог H-ветки записан в `docs/history/workflows/h-g-final-stabilization-release-gate.md`.
