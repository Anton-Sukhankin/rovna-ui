# Dependency Diagnostics

## Назначение документа

Этот документ фиксирует карту зависимостей Rovna UI в offline/self-contained режиме.

Цель `P-03` - не установить зависимости, а понять:

- какие внешние зависимости указаны в локальных `package.json`;
- какую ценность они дают компонентам и Storybook;
- какие пользовательские механики могут сломаться при их отсутствии;
- какие доработки понадобятся, если зависимость недоступна и ее нужно компенсировать локально.

## Источники анализа

Использовались только локальные файлы проекта:

- `app/package.json`;
- `app/packages/*/package.json`;
- `docs/component-inventory.md`;
- `docs/history/workflows/design-system-workflow.md`.

Внешние registry, GitLab, Figma, Nexus и корпоративные сервисы не использовались и не запрашивались.

## Offline Rule

Зависимости, которых нет внутри архива, не считаются автоматически доступными. На этом этапе мы не выполняем установку зависимостей и не проверяем сетевой доступ к registry.

Если зависимость недоступна, дальнейшая работа строится так:

1. определить, какую роль она выполняет;
2. понять, влияет ли она на вид, поведение, сборку, Storybook или тесты;
3. выбрать стратегию: сохранить как обязательную, заменить локальным аналогом, локализовать, временно отключить или реализовать недостающую механику самостоятельно;
4. вынести компенсацию в отдельную будущую задачу.

## Dependency Groups

### Local Workspace Dependencies

Это пакеты `@rovna-ui/components-*`, которые присутствуют внутри `app/packages/`.

Их роль: собственный код дизайн-системы, компоненты, токены, тема, иконки, типографика, утилиты, Storybook-примеры и служебные конфиги.

Стратегия: считать их основным источником правды. Если пакет находится в `app/packages/`, не заменять его внешним источником.

### External Runtime Dependencies

Это внешние пакеты, которые нужны компонентам во время работы интерфейса: React, styled-components, Ant Design alias, TanStack, dnd-kit, axios, dayjs, lodash и другие.

Стратегия: для каждого такого пакета понимать, какая механика за ним стоит. Runtime-зависимости нельзя удалять вслепую, потому что они могут отвечать за выпадающие списки, таблицы, drag-and-drop, тему, сетевые состояния и доступность.

### External UI Mechanics

Это зависимости, которые дают готовое интерактивное поведение: раскрытие меню, позиционирование, таблицы, виртуальные списки, перетаскивание, drawer, overflow.

Стратегия: если зависимость недоступна, компенсация становится отдельной задачей по восстановлению механики, а не простой заменой импорта.

### Styling, Theme, Tokens

Это `styled-components`, локальные пакеты темы, токенов, типографики и стилей.

Стратегия: сохранить текущую модель темы до отдельного решения о миграции. Самостоятельная замена стилей допустима только после проверки Storybook-состояний: default, hover, active, focus, disabled, error, loading.

### Dev, Build, Test, Documentation

Это Storybook, Vite, Rollup, TypeScript, Jest, Loki, release-it, eslint/prettier configs и генераторы документации.

Стратегия: такие зависимости могут блокировать запуск Storybook или сборку, но не всегда означают, что runtime-компонент неполный. Их нужно классифицировать отдельно от пользовательской механики.

## Missing / External Dependencies Matrix

| Dependency / group | Used by | Role | Risk if missing | Compensation strategy | Follow-up work |
| --- | --- | --- | --- | --- | --- |
| `react`, `react-dom` | Многие runtime-пакеты как peer dependencies | Базовый движок отрисовки компонентов | Критический: компоненты не смогут работать как React-компоненты | Считать обязательной базой. Полная замена нецелесообразна | Зафиксировать поддерживаемую версию React при подготовке подключения к проектам |
| `styled-components` | Основные UI-пакеты, тема, стили | CSS-in-JS, темы, динамические состояния, styled wrappers | Критический: может сломаться внешний вид, темы и state styles | Сохранять как обязательную runtime-зависимость или планировать отдельную миграцию стилей | Проверить тему и styled API на этапе Storybook/build |
| `antd-core` (`npm:antd@5.12.5`) | Несколько UI-пакетов | Готовые UI-механики Ant Design под alias | Высокий: могут пострадать select, form, date/time, overlay, feedback-компоненты | Разобрать фактические импорты; заменить только точечно | В `P-04` составить список компонентов, завязанных на `antd-core` |
| `rc-drawer`, `rc-overflow` | `@rovna-ui/primitives` | Drawer/overlay и overflow-механики | Высокий: может сломаться боковая панель, скрытие лишних элементов, меню | Локальная реализация возможна, но требует проверки клавиатуры, focus и overflow | Выделить механики drawer/overflow в отдельные задачи компенсации |
| `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | `@rovna-ui/components`, columns/settings-related packages | Drag-and-drop и сортировка | Высокий: сломается перетаскивание, сортировка колонок или списков | Временно отключить DnD или реализовать локальный drag-and-drop | Определить все компоненты, где есть drag/sort поведение |
| `@tanstack/react-table` | `@rovna-ui/tree` | Табличная/древовидная модель данных | Высокий: может сломаться сортировка, раскрытие, структура строк | Сохранять зависимость либо проектировать собственную модель таблицы | Проверить Tree/Table stories и публичные API |
| `@tanstack/react-virtual` | `@rovna-ui/components` | Виртуализация длинных списков | Средний/высокий: большие списки могут стать медленными | Временно заменить обычным списком или реализовать виртуализацию позже | Найти компоненты с virtual scroll |
| `@tanstack/react-query` | Feature/service packages | Загрузка данных, cache, request state | Средний: может сломаться не базовый UI, а data-driven компоненты | Изолировать feature-компоненты от базовых primitives | Разделить UI-only и service-aware компоненты |
| `axios` | API/feature packages, dev server | HTTP-клиент и запросы | Средний: влияет на сервисные компоненты, мок-серверы и интеграции | Заменить локальным fetch-адаптером или оставить как внешнюю зависимость | Понять, какие компоненты реально ходят в сеть |
| `samolet-oauth2` | Notifications/API-related packages | Корпоративная авторизация | Высокий для внутренних сервисных компонентов, низкий для базового UI | Не пытаться получать доступ; локально мокировать или отключать сервисные сценарии | Отделить корпоративные сервисные сценарии от UI-каталога |
| `centrifuge` | Notifications package | Realtime-события | Средний: влияет на live notifications | Использовать mock/replay или отключить realtime в Storybook | Создать Storybook mock для уведомлений |
| `storeon`, `zustand` | Search assistant / AI chat packages | Локальное состояние feature-компонентов | Средний: ломает сложные виджеты, но не базовые primitives | Сохранить зависимость или переписать state layer точечно | Классифицировать feature packages отдельно от core UI |
| `dayjs` | Основные UI-пакеты | Даты, форматирование, локализация | Средний/высокий: влияет на date/time-компоненты и отображение дат | Сохранить или заменить единым локальным date utility | Найти компоненты с датами и форматами |
| `lodash`, `classnames`, `uuid`, `js-sha1`, `query-string`, `use-sync-external-store` | Разные runtime-пакеты | Утилиты, классы, id, hash, query params, store sync | Обычно средний/низкий: часто заменяемо локальными helper-функциями | Заменять точечно после анализа импортов | В `P-04` выделить быстро заменяемые utilities |
| `react-helmet` | Favicons package | Управление head/meta | Низкий/средний: влияет на favicon/meta сценарии | Локализовать или заменить платформенным способом проекта | Проверить, нужен ли пакет для Storybook |
| `sharp`, `png-to-ico` | Assets/favicons tooling | Генерация assets и favicons | Низкий для runtime, средний для сборки assets | Считать dev/build tooling; можно отложить | Проверить только при сборке assets |
| `storybook`, `@storybook/*` | Root Storybook | Просмотр компонентов и документации | Высокий для просмотра Storybook, но не равен поломке runtime | Сохранять как tooling; запускать только после диагностики зависимостей | Этап `P-05`: runbook и запуск |
| `vite`, `rollup`, `typescript`, `turbo`, `tsc-alias` | Build tooling | Сборка, типы, workspace orchestration | Высокий для подготовки пакета к подключению | Сохранять как build tooling; ошибки классифицировать отдельно | Этап `P-06`: сборка пакетов |
| `jest`, testing-library, Loki | Test tooling | Unit, visual и screenshot-тесты | Не блокирует первичный анализ, но важно для качества | Отложить до quality gate | Вернуться после запуска Storybook/build |
| `@rovna-ui/eslint-config`, `@rovna-ui/prettier-config` | Root dev config | Корпоративные правила форматирования и lint | Низкий для runtime, может блокировать lint/install | Заменить локальными правилами, если недоступны | В `P-04` решить, оставлять ссылку или локализовать config |

## High-Risk Mechanics

### Select / Dropdown / Overlay

Вероятные источники механики: `antd-core`, `rc-overflow`, `styled-components`, React portal/focus logic.

Что проверять позже:

- открытие и закрытие меню;
- hover и active states;
- keyboard navigation;
- focus trap / focus return;
- disabled options;
- длинные списки;
- позиционирование относительно viewport.

### Table / Tree / Virtual Lists

Вероятные источники механики: `@tanstack/react-table`, `@tanstack/react-virtual`, локальные table/tree packages, styled-components.

Что проверять позже:

- сортировка;
- раскрытие строк;
- sticky header/columns;
- virtual scroll;
- empty/loading/error states;
- большие наборы данных.

### Drag and Drop

Вероятные источники механики: `@dnd-kit/*`.

Что проверять позже:

- перетаскивание мышью;
- keyboard drag behavior, если заявлено компонентом;
- drop target states;
- сортировка колонок или элементов;
- поведение disabled элементов.

### Date / Time

Вероятные источники механики: `dayjs`, `antd-core`, locale packages.

Что проверять позже:

- форматирование даты;
- локаль;
- выбор даты;
- disabled dates;
- time zone assumptions.

### Theme / Tokens / Styled States

Вероятные источники механики: `styled-components`, `@rovna-ui/theme`, `@rovna-ui/tokens`, `@rovna-ui/styling`.

Что проверять позже:

- `RovnaUI.init()`;
- theme provider;
- dark/light or branded themes, если они есть в Storybook;
- hover/focus/error/disabled colors;
- typography and spacing tokens.

### API / Auth / Realtime

Вероятные источники механики: `axios`, `samolet-oauth2`, `centrifuge`, `@tanstack/react-query`.

Что проверять позже:

- можно ли показывать компонент на mock-данных;
- не требуется ли корпоративная авторизация для Storybook;
- можно ли отключить live-сценарии;
- где UI-компонент смешан с сервисной логикой.

## P-04 Static Import Audit

Этот раздел закрывает `DS-04.1`: рискованные зависимости классифицированы по фактическим импортам в локальном исходном коде.

Проверка выполнялась статически по `app/packages` без установки зависимостей, запуска Storybook, сборки или тестов.

### Package Classification

| Package group | Packages | Role | P-04 decision |
| --- | --- | --- | --- |
| Core UI | `tend-ui`, `tend-ui-primitives`, `tend-ui-grid`, `tend-ui-typography`, `tend-ui-theme` | Базовые компоненты, тема, типографика, сетка, primitives | Не удалять зависимости вслепую; `styled-components` и значительная часть `antd-core` считаются обязательными runtime-зависимостями. |
| Complex UI mechanics | `tend-ui-table`, `tend-ui-tree`, `tend-ui-columns-settings`, `tend-ui-filters`, `tend-ui-upload` | Таблицы, дерево, настройки колонок, фильтры, upload, drag/sort, date/time | Компенсация возможна только отдельными задачами после проверки Storybook-сценариев. |
| Service / feature | `tend-ui-api`, `tend-ui-notifications`, `tend-ui-search-assistant` | API-клиенты, авторизация, realtime, query cache, feature widgets | Для Storybook нужны mock/disable стратегии; не запрашивать доступ к внутреннему контуру. |
| Tooling / config | `tend-ui-rollup-config`, `tend-ui-jest-config`, root lint/prettier configs | Сборка, тесты, alias, линтинг, публикация | Классифицировать отдельно от runtime; локализовать конфиги при недоступности. |

### Static Import Matrix

| Dependency | Files | Packages | Related components / mechanics | Risk level | Local compensation strategy |
| --- | ---: | --- | --- | --- | --- |
| `react`, `react-dom` | peer | many packages | React renderer and component runtime | Critical | Mandatory runtime. Do not replace; document React compatibility for consumer projects. |
| `styled-components` | 276 | `tend-ui`, `tend-ui-primitives`, `tend-ui-grid`, `tend-ui-theme`, `tend-ui-table`, `tend-ui-tree`, `tend-ui-upload`, feature packages | Theme, dynamic styles, state styles, global fonts, styled wrappers | Critical | Mandatory runtime for now. Migration to another styling model is a separate large task. |
| `antd-core` | 128 | `tend-ui`, `tend-ui-grid`, `tend-ui-primitives`, `tend-ui-table`, `tend-ui-theme`, `tend-ui-typography`, `tend-ui-locale` | Select, Table, DatePicker, RangePicker, Modal, Drawer/Dialog-like overlays, Grid, Typography, Form-like controls, Menu, Steps, Pagination | Critical/high | Treat as mandatory for core UI until Storybook proves a smaller replacement scope. Complex AntD wrappers are not quick helper replacements. |
| `rc-drawer` | 1 | `tend-ui-primitives` | Drawer root behavior | High | Can be compensated only with a focused Drawer implementation covering focus, close behavior, overlay and keyboard expectations. |
| `rc-overflow` | 1 | `tend-ui-primitives` | Overflow menu/list behavior | High | Can be compensated by a local overflow component, but only after visual and keyboard behavior is specified. |
| `@dnd-kit/core` | 3 | `tend-ui`, `tend-ui-columns-settings`, `tend-ui-tree` | Drag context for column settings and tree | High | Do not remove silently. If unavailable, temporarily disable drag/sort or implement a dedicated DnD replacement. |
| `@dnd-kit/sortable` | 8 | `tend-ui`, `tend-ui-columns-settings`, `tend-ui-tree` | Sortable columns and tree rows | High | Compensation must preserve reorder state, drag handles and disabled cases. |
| `@dnd-kit/utilities` | 3 | `tend-ui`, `tend-ui-columns-settings`, `tend-ui-tree` | Transform utilities for sortable UI | Medium/high | Replace only together with the DnD strategy. |
| `@tanstack/react-table` | 14 | `tend-ui-tree` | Tree/table model, row state, filtering/expansion logic | High | Keep as required for tree/table. Reimplementation is a separate table-engine task. |
| `@tanstack/react-virtual` | 2 | `tend-ui` | Virtualized CheckboxGroupSearch and RadioGroupSearch lists | Medium/high | Can fall back to non-virtual list for small data; large-list behavior needs separate implementation. |
| `@tanstack/react-query` | 21 | `tend-ui-notifications`, `tend-ui-search-assistant` | Query cache, mutations, infinite queries, service widgets | Medium/high | Mock or disable service scenarios in Storybook; keep separate from core UI readiness. |
| `axios` | 30 | `tend-ui`, `tend-ui-api`, `tend-ui-notifications`, `tend-ui-search-assistant`, `tend-ui-theme`, `tend-ui-tree`, `tend-ui-upload` | HTTP client, API hooks, upload story requests, request cancellation | Medium | Use mocks for Storybook. A fetch adapter is possible, but should be designed after identifying public API contracts. |
| `samolet-oauth2` | 4 | `tend-ui-notifications`, `tend-ui-search-assistant` | Corporate auth token/client integration | High for service packages | Do not request access. Use mock auth or disable authenticated scenarios in Storybook. |
| `centrifuge` | 5 | `tend-ui-notifications` | Realtime notifications transport | Medium/high | Mock realtime events or use static notification fixtures in Storybook. |
| `zustand` | 1 | `tend-ui-notifications` | Notifications local store | Medium | Keep for feature package or replace with local store only if service package becomes a target. |
| `storeon` | 5 | `tend-ui-search-assistant` | Search assistant local store | Medium | Keep for feature package; do not block core UI on it. |
| `dayjs` | 20 | `tend-ui`, `tend-ui-filters`, `tend-ui-notifications`, `tend-ui-table` | Date formatting, date filters, table examples, locale/date-picker behavior | Medium/high | Keep as date utility for now. Replacement needs date format and locale acceptance checks. |
| `lodash` | 85 | `tend-ui`, `tend-ui-columns-settings`, `tend-ui-filters`, `tend-ui-header`, `tend-ui-hooks`, `tend-ui-table`, `tend-ui-upload` | Grouping, omit/pick, equality checks, map helpers, utility transforms | Medium | Candidate for gradual local helper replacement, but not before Storybook/build prove the real failure points. |
| `classnames` | 32 | `tend-ui`, `tend-ui-header`, `tend-ui-primitives`, `tend-ui-tree`, `tend-ui-typography`, `tend-ui-upload` | Conditional className composition | Low/medium | Easy local helper candidate if unavailable. |
| `uuid` | 19 | `tend-ui`, `tend-ui-columns-settings`, `tend-ui-filters`, `tend-ui-table`, `tend-ui-upload` | Preset IDs, upload file IDs, example/story IDs | Low/medium | Can be replaced with local id generator where cryptographic uniqueness is not required. |
| `query-string` | 2 | `tend-ui-notifications`, `tend-ui-search-assistant` | Service API query serialization | Low/medium | Replace with URLSearchParams or local serializer if needed. |
| `use-sync-external-store` | 3 | `tend-ui-form`, `tend-ui-rollup-config` | React 17 compatible external store subscription hooks | Medium | Keep for React 17 compatibility unless form hooks are redesigned. |
| `react-helmet` | 1 | `tend-ui-favicons` | Head/favicon provider | Low/medium | Can be localized or replaced by project-level head management. |

### Compensation Decisions

| Decision | Dependencies | Meaning for implementation |
| --- | --- | --- |
| Mandatory runtime | `react`, `react-dom`, `styled-components`, significant `antd-core` usage | These are part of the current design-system runtime. We document and preserve them before attempting replacements. |
| Separate compensation task | `@dnd-kit/*`, `@tanstack/react-table`, `@tanstack/react-virtual`, `rc-drawer`, `rc-overflow`, complex AntD primitives | Missing mechanics must be rebuilt as focused tasks with Storybook acceptance checks. |
| Mock or disable in Storybook | `samolet-oauth2`, `centrifuge`, service API flows, `@tanstack/react-query` service flows | Corporate services are not available offline, so stories should use fixtures/mocks. |
| Local helper replacement candidate | parts of `lodash`, `classnames`, `uuid`, `query-string` | These are the safest candidates for local replacement if installation fails. |
| Keep as tooling-only or defer | Jest/Loki/build/release/lint configs, asset generation tools | Tooling failures should not be treated as missing runtime mechanics. |

## Follow-up Backlog

Эти задачи используются как очередь после `P-04`.

| ID | Status | Task | Reason | Target step |
| --- | --- | --- | --- | --- |
| DEP-01 | [x] | Найти фактические импорты `antd-core`, `rc-*`, `@dnd-kit/*`, `@tanstack/*` по исходникам | Фактическая карта импортов добавлена в `P-04 Static Import Audit` | `P-04` |
| DEP-02 | [x] | Разделить core UI, feature/service packages и tooling packages | Package classification добавлена в `P-04 Static Import Audit` | `P-04` |
| DEP-03 | [x] | Составить список компонентов, для которых нужна компенсация механики | Рискованные механики и стратегии компенсации зафиксированы по группам зависимостей | `P-04` |
| DEP-04 | [ ] | Подготовить Storybook mocks для auth/API/realtime сценариев | Без доступа к внутреннему контуру такие сценарии надо показывать автономно | `P-05` |
| DEP-05 | [ ] | Проверить запуск Storybook только после фиксации dependency runbook | Запуск должен дать диагностируемый результат, а не хаотичный список ошибок | `P-05` |
| DEP-06 | [ ] | Проверить сборку основного пакета и типы | Нужно понять, какие зависимости реально блокируют подключение к другим проектам | `P-06` |
| DEP-07 | [~] | Решить судьбу `@rovna-ui/eslint-config` и `@rovna-ui/prettier-config` | Предварительное решение: это tooling/config, не runtime; окончательно проверить при сборке/lint | `P-06` |

## P-03 Result

`P-03` считается выполненным, потому что:

- создана карта внешних зависимостей;
- зависимости сгруппированы по роли;
- зафиксированы риски отсутствия зависимостей;
- определены стратегии компенсации;
- установка зависимостей, запуск Storybook и сборка пакетов на этом этапе не выполнялись.

## P-04 Result

`P-04` считается выполненным, потому что:

- добавлен статический аудит фактических импортов рискованных зависимостей;
- пакеты разделены на core UI, complex UI mechanics, service/feature и tooling/config;
- для каждой рискованной группы указаны связанные механики, уровень риска и стратегия локальной компенсации;
- установка зависимостей, запуск Storybook, сборка и тесты на этом этапе не выполнялись.

Следующий шаг - `P-05`: создать Storybook runbook и подготовить диагностируемую попытку запуска Storybook в offline/self-contained режиме.

## D-03 Dependency Unblock Classification

`D-03` фиксирует результат после offline-диагностики `D-02`.

Цель этого раздела - не заменить все зависимости вручную, а разделить блокеры установки на группы и выбрать маршрут для каждой группы.

### Local Facts

| Check | Result | Meaning |
| --- | ---: | --- |
| Local workspace packages in `app/packages` | `37` | Основная часть `@rovna-ui/components-*` присутствует в архиве как исходники. |
| Root `@rovna-ui/*` dependencies/devDependencies | `21` | Корневой `package.json` ожидает локальные и config-пакеты `@rovna-ui/*`. |
| Root `@rovna-ui/*` dependencies missing from `app/packages` | `2` | Отсутствуют `@rovna-ui/eslint-config` и `@rovna-ui/prettier-config`. |
| Unique package names resolved through `packages.samoletgroup.ru` in `yarn.lock` | `1399` | Lockfile массово указывает на внутренний registry. |
| Public-like package names resolved through internal registry | `1388` | Даже публичные пакеты в lockfile зафиксированы через внутренний registry mirror. |
| Unique `@rovna-ui/*` package names in lockfile | `11` | В lockfile есть и локальные `@rovna-ui/components-*`, и отсутствующие config-пакеты. |
| `@rovna-ui/*` package names in lockfile missing from local workspaces | `2` | Те же `@rovna-ui/eslint-config` и `@rovna-ui/prettier-config`. |

### First Install Blocker

`D-02` остановился на первом отсутствующем tarball в локальном кэше:

```text
cross-spawn-7.0.5.tgz
```

Ошибка:

```text
Can't make a request in offline mode ("http://packages.samoletgroup.ru/repository/npm-all/cross-spawn/-/cross-spawn-7.0.5.tgz")
```

Это означает: Yarn работает локально, но dependency graph не может быть восстановлен только из локального кэша.

### Classification Matrix

| Group | Examples / evidence | Risk | Route |
| --- | --- | --- | --- |
| Public dependencies pinned to internal registry mirror | `cross-spawn`, `@babel/*`, Storybook, Rollup, Vite, React, `styled-components`, many transitive packages | Critical for install/build/Storybook | Public npm/GitHub restoration is allowed as a controlled step. Do not use internal registry or corporate sources. If a dependency is unavailable from public/local sources, map the missing mechanic and choose local compensation. |
| Local workspace `@rovna-ui/components-*` packages | `37` packages in `app/packages`, including core, primitives, tokens, theme, icons, table, tree, upload, notifications | Critical but source is present | Treat local source as source of truth. Do not download these packages from registry if workspace resolution can be used. |
| Missing internal config packages | `@rovna-ui/eslint-config`, `@rovna-ui/prettier-config` | Low for runtime, medium for lint/prettier/install if Yarn requires them | Tooling/config only. Do not block component mechanics on them. Later options: replace with local config, stub config, or defer lint/prettier. |
| Mandatory runtime | `react`, `react-dom`, `styled-components`, significant `antd-core` usage | Critical | Preserve as required dependencies. Manual replacement is not a near-term unblock path. |
| Complex UI mechanics | `@dnd-kit/*`, `@tanstack/react-table`, `@tanstack/react-virtual`, `rc-drawer`, `rc-overflow`, complex AntD primitives | High | Keep dependency if possible. If unavailable after Storybook checks, create focused compensation tasks with component-level acceptance criteria. |
| Service/API/realtime | `axios`, `samolet-oauth2`, `centrifuge`, `@tanstack/react-query` service flows | Medium/high for feature packages, lower for core UI Storybook | Mock or disable service scenarios in Storybook. Do not request corporate service access. |
| Local helper candidates | parts of `lodash`, `classnames`, `uuid`, `query-string` | Low/medium | Replace only after real build/Storybook blockers prove the dependency is a problem. |
| Tooling/build/test/docs | Storybook, Vite, Rollup, TypeScript, Jest, Loki, release-it, lint/prettier configs | Critical for build and Storybook, not necessarily runtime | Unblock enough for build and Storybook first. Defer lint/test/release issues if they are not required for runtime verification. |

### Direct Dependency Hotspots

Static package manifest scan shows the most common external runtime dependencies:

| Dependency | Manifest references | Primary role |
| --- | ---: | --- |
| `react` | `24` | React peer/runtime baseline. |
| `styled-components` | `21` | Theme, styling, state styles. |
| `react-dom` | `19` | React DOM rendering. |
| `classnames` | `8` | Conditional class names. |
| `axios` | `6` | API and service flows. |
| `lodash` | `6` | Utility helpers. |
| `antd-core` | `6` | Ant Design alias for UI primitives/mechanics. |
| `dayjs` | `5` | Date formatting and date-related controls. |
| `samolet-oauth2` | `4` | Corporate auth integration. |
| `uuid` | `4` | IDs for presets, uploads, examples. |

### Decision Before D-04

`D-03` can be closed as a classification step, but it shows that `D-04` cannot be honestly executed as a build step while `app/node_modules` is missing.

Before `D-04`, add a narrow dependency strategy step:

```text
D-03A: choose and execute a controlled dependency graph strategy.
```

Possible routes for `D-03A`:

- public npm/GitHub route for public packages, without corporate sources;
- local compensation for packages that are absent from the archive and unavailable from public/local sources;
- local workspace resolution for `@rovna-ui/components-*`;
- local replacement/stub only for missing tooling config packages;
- no manual UI mechanics compensation until Storybook or build proves the exact broken behavior.

### D-03 Result

`D-03` is complete when this classification is reflected in `docs/dependency-unblock-workflow.md` and `docs/dependency-unblock-log.md`.

Current conclusion: do not move directly to manual component rewrites. First solve dependency graph restoration enough to run build and Storybook diagnostics.

## D-03A Dependency Graph Strategy Result

`D-03A` проверяет, есть ли в текущих локальных условиях реалистичный способ восстановить `app/node_modules` перед сборкой.

### Local Strategy Facts

| Fact | Value |
| --- | --- |
| Active Yarn registry | `https://packages.samoletgroup.ru/repository/npm-all` |
| Active Yarn cache dir | `C:\Users\armad\AppData\Local\Temp\.yarn-cache\v6` |
| Active Yarn cache top-level entries | `9` |
| `app/node_modules` | missing |
| `app/packages/tend-ui/dist` | missing |
| `styled-components`, `storybook`, `antd` in active cache | not found |

The current local cache is not enough to restore the dependency graph. Even though an incomplete `cross-spawn` cache directory exists, the offline install already failed on `cross-spawn-7.0.5.tgz`.

### Chosen Route

Current route:

- do not request internal registry access;
- do not rewrite registry configuration or lockfile during `D-03A`;
- do not start manual UI mechanics compensation yet;
- treat the next build step as a blocked diagnostic unless dependency source routing or local compensation is implemented enough to run build checks.

### D-03A Decision

`D-03A` is completed as a strategy decision, but dependency graph restoration is blocked.

`D-04` can proceed only as a blocked build diagnostic in the current environment.

## E-04 Public NPM Diagnostic Result

`E-04` attempted the controlled public-only dependency restoration command from `docs/public-dependency-restoration-runbook.md`.

Result:

```text
error An unexpected error occurred: "https://registry.npmjs.org/@types%2freact: "
Trace: AggregateError [EACCES]
```

Classification:

- public npm was selected explicitly through `--registry https://registry.npmjs.org`;
- the attempt did not create `app/node_modules`;
- the blocker is public npm network access in the current execution environment;
- this does not prove that the public packages are missing;
- build, Storybook and consumer checks remain blocked.

Next dependency decision:

```text
E-05: choose a public dependency acquisition route under the current network restriction.
```

## E-05 Dependency Acquisition And Compensation Strategy

`E-05` is complete as a strategy step.

The detailed decision is recorded in:

```text
docs/dependency-acquisition-and-compensation-strategy.md
```

Summary:

- closed corporate sources remain forbidden and are not requested;
- public npm/GitHub remain valid in principle, but the current Codex environment stopped on `AggregateError [EACCES]`;
- foundational dependencies such as `react`, `react-dom`, `styled-components`, Storybook stack and build tooling should be acquired from public/offline-public sources, not reimplemented manually;
- corporate service flows such as auth-bound scenarios should be mocked, disabled or stubbed;
- small helpers may be replaced locally only after exact import usage is known;
- complex UI mechanics such as AntD primitives, overlays, drag-and-drop, tables, trees and virtualization require separate component-level tasks if they cannot be acquired publicly.

Next dependency step:

```text
E-06: prepare the local compensation backlog and first implementation candidates.
```

## E-06 Local Compensation Backlog

`E-06` is complete as a backlog step.

The detailed backlog is recorded in:

```text
docs/local-compensation-backlog.md
```

Summary:

- first implementation candidates are limited to low-risk areas: tooling config stubs, service auth mock boundary, narrow query serialization helper and class name helper;
- corporate auth/service integrations stay mocked, disabled or stubbed instead of using closed corporate sources;
- helper replacements are allowed only after exact import usage is known;
- `antd-core`, `@dnd-kit/*`, `@tanstack/*`, `rc-*` and date behavior remain deferred to component-level tasks;
- React, React DOM, `styled-components`, Storybook stack and build tooling remain protected public/offline-public dependencies and are not manually reimplemented.

Next dependency step:

```text
E-07: choose and implement the first low-risk local compensation slice.
```

## E-07 Tooling Config Stubs

`E-07` is complete as the first low-risk local compensation slice.

Implemented:

```text
LC-03 tooling config stubs
```

Created local workspace packages:

```text
app/packages/eslint-config
app/packages/prettier-config
```

Recorded in:

```text
docs/tooling-config-stubs.md
```

Result:

- `@rovna-ui/eslint-config@1.0.0` now exists locally as a workspace package;
- `@rovna-ui/prettier-config@1.0.0` now exists locally as a workspace package;
- these packages are tooling-only and do not change runtime UI components;
- package manifests and module exports were checked without installing dependencies.

Not verified:

- dependency install;
- package build;
- Storybook launch;
- lint output parity with the original corporate config.

Next dependency step:

```text
E-08: re-run build diagnostics after LC-03 or continue with LC-01 service auth mock boundary.
```

## E-08 Build Diagnostic After LC-03

`E-08` is complete as a blocked build diagnostic.

Detailed result:

```text
docs/history/workflows/e08-build-after-lc03-diagnostics.md
```

Summary:

- local `@rovna-ui/eslint-config` and `@rovna-ui/prettier-config` stubs are recognized by Yarn workspaces;
- `corepack yarn build:tokens` and `corepack yarn build:main` still stop on nested plain `yarn`;
- `app/node_modules` is still missing;
- no `dist` artifacts were created;
- TypeScript and Rollup stages were not reached.

Next dependency step:

```text
E-09: implement LC-01 service auth mock boundary.
```

## E-09 Service Auth Mock Boundary

`E-09` is complete as a low-risk local compensation slice.

Detailed result:

```text
docs/service-auth-mock-boundary.md
```

Implemented:

- local workspace package `samolet-oauth2@1.2.25`;
- `setAxiosAuthInterceptor` stub;
- `authStorage.getJwtAuthParams` stub;
- TypeScript declarations for the locally used API.

Verification:

- local Node `require` can load the stub;
- Yarn workspaces recognize `samolet-oauth2`;
- `@rovna-ui/notifications` lists `samolet-oauth2` as a workspace dependency;
- `@rovna-ui/search-assistant` lists `samolet-oauth2` as a workspace dependency.

Next dependency step:

```text
E-10: implement LC-05 narrow query-string replacement.
```

## E-10 Query String Replacement

`E-10` is complete as a low-risk service-layer helper compensation slice.

Detailed result:

```text
docs/query-string-replacement.md
```

Implemented:

- local workspace package `query-string@8.2.0`;
- narrow `stringify` helper;
- `arrayFormat: 'comma'` support;
- TypeScript declarations for the locally used API.

Verification:

- local Node `require` can load the stub;
- `stringify({ a: [1, 2] }, { arrayFormat: 'comma' })` returns `a=1,2`;
- Yarn workspaces recognize `query-string`;
- `@rovna-ui/notifications` lists `query-string` as a workspace dependency;
- `@rovna-ui/search-assistant` lists `query-string` as a workspace dependency.

Next dependency step:

```text
E-11: implement LC-04 class name helper.
```

## E-11 Class Name Helper Replacement

`E-11` is complete as a low-risk visual helper compensation slice.

Detailed result:

```text
docs/classnames-helper-replacement.md
```

Implemented:

- local workspace package `classnames@2.5.1`;
- support for string, number, array and conditional object inputs;
- CommonJS runtime export plus default-compatible runtime property;
- TypeScript declarations for the locally used API.

Verification:

- local Node `require` can load the stub;
- `cn('a', { b: true, c: false }, ['d', 0, null, 'e'])` returns `a b d e`;
- Yarn workspaces recognize `classnames`;
- primitives, typography, upload, header, table and tree packages list `classnames` as a workspace dependency.

Next dependency step:

```text
E-12: scope and implement LC-06 uuid helper.
```

## E-12 UUID Helper Replacement

`E-12` is complete as a low-risk local ID helper compensation slice.

Detailed result:

```text
docs/uuid-helper-replacement.md
```

Implemented:

- local workspace package `uuid@10.0.0`;
- local workspace package `@types/uuid@10.0.0`;
- narrow `v4()` helper;
- TypeScript declarations for the locally used API.

Verification:

- local Node `require` can load the stub;
- generated IDs match UUID v4 string shape;
- 100 generated IDs passed a uniqueness smoke check;
- Yarn workspaces recognize `uuid`;
- Yarn workspaces recognize `@types/uuid`;
- upload, filters and columns-settings packages list `uuid` / `@types/uuid` as workspace dependencies.

Next dependency step:

```text
E-13: re-run build diagnostics after LC-04/LC-06.
```

## E-13 Build Diagnostic After LC-04 and LC-06

`E-13` is complete as a blocked build diagnostic checkpoint.

Detailed result:

```text
docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md
```

Diagnostic attempts:

- `corepack yarn build:tokens`;
- `corepack yarn build:main`;
- `corepack yarn build:upload`;
- `corepack yarn build:filters`.

Result:

- all attempts started through Corepack Yarn;
- all attempts stopped when root scripts called nested plain `yarn`;
- TypeScript/Rollup stages were not reached;
- no `dist` output was created;
- `app/node_modules` is still absent.

Current active blocker:

```text
nested plain yarn calls are unavailable in the current Corepack-only local environment.
```

Next dependency step:

```text
E-14: define local build-runner strategy for nested plain yarn calls.
```

## E-14 Build Runner Strategy

`E-14` is complete as a strategy step.

Detailed result:

```text
docs/history/workflows/e14-build-runner-strategy.md
```

Selected route:

```text
temporary local yarn.cmd shim for diagnostic shell
```

Decision summary:

- do not edit package scripts across the monorepo yet;
- do not install global Yarn;
- do not run `corepack enable`;
- do not install dependencies;
- use a temporary PATH-scoped shim in the next diagnostic step.

Next dependency step:

```text
E-15: create temporary local yarn.cmd shim and run narrow build diagnostics.
```

## E-15 Shimmed Build Diagnostics

`E-15` is complete as a blocked diagnostic.

Detailed result:

```text
docs/history/workflows/e15-shimmed-build-diagnostics.md
```

Result:

- temporary `yarn.cmd` shim works;
- build commands move past nested plain `yarn`;
- all checked packages stop at missing `tsc`;
- `app/node_modules` is still absent;
- no `dist` output is created.

Current active blocker:

```text
missing dependency graph / missing build tooling
```

Next dependency step:

```text
E-16: define dependency graph and build tooling restoration strategy.
```

## E-16 Dependency Graph And Build Tooling Strategy

`E-16` is complete as a strategy step.

Detailed result:

```text
docs/dependency-graph-restoration-strategy.md
```

Decision:

- do not fake foundational build/runtime tools;
- do not use closed corporate sources;
- use a public/offline-public route for dependency graph and build tooling;
- prepare a dedicated executable restore runbook before any install attempt.

Next dependency step:

```text
E-17: prepare executable public-only dependency restore runbook.
```

## E-17 Public-Only Dependency Restore Runbook

`E-17` is complete as a runbook step.

Detailed result:

```text
docs/public-only-dependency-restore-executable-runbook.md
```

The runbook defines:

- public-only source boundary;
- forbidden closed corporate sources;
- protected files;
- allowed changed paths;
- Scenario A: public-network local terminal;
- Scenario B: offline public cache/package archive;
- stop conditions;
- rollback/cleanup;
- verification after restore.

Next dependency step:

```text
E-19: build offline-public dependency package manifest from local package files and yarn.lock.
```

## E-26 Lodash Helper Usage Audit

Audit source:

```text
docs/lodash-helper-audit.md
```

Direct lodash usage is present in 84 files across runtime packages and generation scripts.

The audit confirms that `lodash` can be handled only helper-by-helper. It is not approved for wholesale replacement.

Selected next slice:

```text
LC-07A: omit, pick, identity, isNil, isString
```

Deferred helpers:

```text
isEqual, merge, debounce
```

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.

## E-31 Complex Runtime Mechanics Tasks

Created:

```text
docs/complex-runtime-mechanics-tasks.md
```

The remaining complex runtime mechanics are not approved for global local replacement.

Task boundaries were defined for:

- `antd-core`;
- `rc-drawer` and `rc-overflow`;
- `@dnd-kit/*`;
- `@tanstack/react-table`;
- `@tanstack/react-virtual`;
- `@tanstack/react-query`;
- high-risk lodash helpers;
- build-time `kebabCase` generation.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
```

## E-29 LC-07C Lodash Object Filtering Helper Replacement

Updated local workspace package:

```text
app/packages/lodash/
```

Implementation record:

```text
docs/lodash-lc07c-helper-replacement.md
```

Covered helpers:

```text
pickBy, omitBy, isEmpty, uniqBy
```

Deferred helpers:

```text
kebabCase, isEqual, merge, debounce
```

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-28 LC-07B Lodash Collection Helper Replacement

Updated local workspace package:

```text
app/packages/lodash/
```

Implementation record:

```text
docs/lodash-lc07b-helper-replacement.md
```

Covered helpers:

```text
chunk, uniq, groupBy, mapValues
```

Deferred helpers:

```text
pickBy, omitBy, isEmpty, uniqBy, kebabCase, isEqual, merge, debounce
```

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-27 LC-07A Lodash Object Helper Replacement

Created local workspace packages:

```text
app/packages/lodash/
app/packages/types-lodash/
```

Implementation record:

```text
docs/lodash-lc07a-helper-replacement.md
```

Covered helpers:

```text
omit, pick, identity, isNil, isString
```

Deferred helpers:

```text
groupBy, mapValues, pickBy, omitBy, isEmpty, uniqBy, uniq, chunk, kebabCase, isEqual, merge, debounce
```

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-19 Offline-Public Dependency Manifest

`E-19` is complete as a manifest step.

Created:

```text
docs/offline-public-dependency-package-manifest.md
```

Summary:

| Area | Count |
| --- | ---: |
| Package files scanned | 45 |
| Workspace package files | 44 |
| Unique direct dependencies | 118 |
| Local workspace/local compensation dependencies | 32 |
| External public/offline-public candidates | 86 |
| `yarn.lock` resolved entries | 1593 |

All lockfile resolved URLs point to `packages.samoletgroup.ru`; the lockfile is not an allowed package source.

Next step:

```text
E-20: choose the restore execution route from the E-19 manifest.
```

## E-20 Restore Execution Route Decision

`E-20` is complete as a route decision step.

Created:

```text
docs/restore-execution-route-decision.md
```

Decision:

| Route | Status |
| --- | --- |
| Offline-public package archive/cache with provenance | Selected primary route |
| Public-enabled install in a separate allowed environment | Kept as secondary route |
| Targeted local compensation | Kept as fallback for narrow known mechanics |
| Current-shell public npm retry | Rejected without environment change |
| Closed corporate sources | Rejected |
| Fake foundational stubs | Rejected |

Next step:

```text
E-21: prepare offline-public package acquisition plan from the E-19 manifest.
```

## E-21 Offline-Public Package Acquisition Plan

`E-21` is complete as an acquisition planning step.

Created:

```text
docs/offline-public-package-acquisition-plan.md
```

The plan splits packages into lanes for build tooling, Storybook/Vite, React runtime, type packages, complex UI mechanics, runtime utilities and dev/test/release tooling.

Dependency graph remains unresolved:

| Area | Status |
| --- | --- |
| `app/node_modules` | absent |
| package archive/cache | not imported |
| build | still blocked |
| Storybook | still blocked |

Next step:

```text
E-22: prepare offline-public archive manifest template and import staging runbook.
```

## E-22 Archive Manifest And Staging Runbook

`E-22` is complete as an archive/import preparation step.

Created:

```text
docs/offline-public-archive-manifest-template.md
docs/offline-public-import-staging-runbook.md
```

The dependency graph remains unresolved until a reviewed archive is validated and an explicit restore/import step is approved.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-25 Local Compensation Lane Decision

`E-25` is complete as a lane decision step.

Created:

```text
docs/local-compensation-lane-decision.md
```

Selected lane:

```text
LC-07: focused lodash helper audit
```

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-24 Archive Preparation Request

`E-24` is complete as a blocked input step.

Created:

```text
docs/offline-public-archive-preparation-request.md
```

Archive route remains blocked until a reviewed archive, manifest and checksum file are available in staging.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-23 Archive Staging Validation

`E-23` is complete as a blocked validation check.

Created:

```text
docs/offline-public-archive-validation-report.md
```

Validation is blocked because staging inbox has no archive, manifest or checksum file.

Next step:

```text
E-24: provide or create a reviewed offline-public archive, then rerun staging validation.
```

## E-18 Public-Only Restore Attempt

`E-18` is complete as a blocked execution check.

The public-only restore command from `docs/public-only-dependency-restore-executable-runbook.md` was not executed in the current shell because the environment has restricted network access and E-17 forbids repeating the current-shell public npm attempt without environment change.

Created:

```text
docs/history/workflows/e18-public-restore-attempt.md
docs/offline-public-package-cache-checklist.md
```

Dependency graph remains unresolved:

| Area | Status |
| --- | --- |
| `app/node_modules` | absent |
| `app/packages/tend-ui/dist` | absent |
| Storybook binary | absent |
| build tooling | absent from project dependencies |

Next step:

```text
E-19: build offline-public dependency package manifest from local package files and yarn.lock.
```
## F-05 Build-Time Dependency Findings

Date: 2026-07-14

`F-05` confirms that the dependency graph is now present enough for build commands to execute, but the build graph is still blocked.

New facts:

- `@rovna-ui/tokens` builds successfully and produces `dist`;
- `@rovna-ui/theme`, `@rovna-ui/icons`, `@rovna-ui/primitives` and `@rovna-ui/components` fail during TypeScript declaration build;
- the failure class is local build graph/module resolution, not closed corporate registry access.

Build-time blocker groups:

| Group | Examples | Interpretation | Next action |
| --- | --- | --- | --- |
| Internal alias/build-order | `@rovna-internal/hooks/useCallbackRef`, `@rovna-internal/styling/core/styling`, `@rovna-internal/icons/Icon` | Package configs often point aliases to sibling package `dist` folders that do not exist until those packages build first. | Audit foundational package order and decide whether to build hooks/styling/icons first or adjust local build-time path mapping. |
| Lodash subpath imports | `lodash/debounce`, `lodash/merge`, `lodash/isEqual` | `lodash` exists, but build-time subpath type/module resolution still fails in checked packages. | Extend/fix local lodash compatibility only for actually imported helpers. |
| Narrow TypeScript errors | implicit `any`, indexed access, overload mismatch | Build reaches real source typing issues after module resolution progresses. | Fix after alias/lodash blockers reduce the noisy error surface. |

Recommended compensation group:

```text
F-05A: local build graph blockers for hooks, styling, icons and lodash subpath imports.
```

## F-05A Build-Time Dependency Findings

Date: 2026-07-14

`F-05A` resolved the `F-05` local build graph blockers for the main/key package build gate.

Resolved:

| Blocker | Resolution |
| --- | --- |
| `lodash/debounce` | Added local partial subpath module and declarations. |
| `lodash/merge` | Added local partial subpath module and declarations. |
| `lodash/isEqual` | Added local partial subpath module and declarations. |
| generic `pick` typing | Added broader fallback overload for generic object-like values. |
| generic `omit` typing | Added broader fallback overload for consistency. |
| internal `@rovna-internal/hooks/*` alias | Built `@rovna-ui/hooks`. |
| internal `@rovna-internal/styling/*` alias | Built `@rovna-ui/styling`. |
| internal `@rovna-internal/icons/*` alias | Built `@rovna-ui/icons`. |
| main package declaration portability | Added local typed wrapper for `ErrorStepIcon`. |

Builds passing after this step:

```text
utils, types, hooks, styling, icons, theme, primitives, tokens, tend-ui
```

Remaining dependency/runtime focus:

```text
Storybook runtime verification and consumer smoke test.
```
