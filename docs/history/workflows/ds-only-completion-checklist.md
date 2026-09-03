# DS-only Completion Checklist

Updated: 2026-07-29.

## Назначение

Эта ветка завершает Tend UI как самостоятельную дизайн-систему. Она не читает, не изменяет и не использует S-Tracker или любой другой внешний проект-потребитель.

Единственные рабочие границы ветки:

- `app/` - исходники, workspaces, зависимости, сборка и Storybook;
- `examples/` - изолированные потребители внутри текущего репозитория;
- `release/` - локальные release-артефакты;
- `docs/` и корневой `README.md` - актуальная документация;
- `docker/`, `Dockerfile.storybook`, `compose.storybook.yml` - воспроизводимый контейнерный маршрут;
- `tmp/` - удаляемые диагностические и staging-артефакты.

Закрытые корпоративные registry, GitLab, Nexus, Figma, CI/CD и сервисные среды не используются и не запрашиваются. Разрешены локальные файлы, публичные npm/GitHub-источники и проверенный offline-public cache.

## Легенда

- `[x]` - выполнено и подтверждено актуальной проверкой;
- `[ ]` - не выполнено;
- `[~]` - есть предыдущий результат или часть артефактов, но требуется актуальная повторная проверка;
- `[!]` - выполнение сейчас блокируется средой или решением владельца.

## Снимок состояния

Проверка 2026-07-29 дала следующие факты:

| Область | Факт | Статус |
| --- | --- | --- |
| Исходная структура | `app/package.json`, `.storybook`, `.storybook-f06`, `packages` присутствуют | `[x]` |
| Workspaces | 46 каталогов пакетов | `[x]` |
| Документация компонентов | 112 story-файлов и 215 MDX-файлов | `[x]` |
| Тестовая база | 210 `test/spec`-файлов выполнены: 6572/6603 passed, 31 pending, snapshot drift 0, blocking failures 0 | `[x]` |
| Dependency graph | `app/node_modules` присутствует; Yarn 1.22.15 запускается из `app/` | `[x]` |
| Core build scope | 15 release-пакетов имеют `dist` | `[x]` |
| Поддерживаемый runtime scope | 29 пакетов классифицированы; 15 core + 6 extended проходят ESM/CJS/types/exports gate | `[x]` |
| Release bundle | 21 tarball, manifest и SHA256SUMS; checksum failures: 0 | `[x]` |
| Актуальная tarball rehearsal | 21/21 artifacts собраны; 21 tarball установлен offline; consumer build и DOM smoke прошли | `[x]` |
| Внутренние consumer-примеры | diagnostic aliases, clean package exports и isolated tarballs: 3/3 build/DOM routes прошли | `[x]` |
| Storybook dependencies | локальный Storybook 10.1.11 и launcher присутствуют | `[x]` |
| Storybook runtime | live manager проверен: 4 обязательных endpoint возвращают `200`, каталог содержит 938 stories и 215 docs | `[x]` |
| Static Storybook | свежий `app/storybook-static` собран: 604 файла, 4 обязательных endpoint возвращают `200` | `[x]` |
| Component coverage | 969 публичных visual exports классифицированы; 930 покрыты story/collection mapping, 39 direct-story gaps документированы | `[x]` |
| Component runtime | 9/9 ключевых stories открылись; выбранные interactions прошли; clean browser console: 0 warnings/errors | `[x]` |
| Source policy | secrets: 0; active/unreviewed internal references: 0 | `[x]` |
| Git baseline | ветка `main` содержит локальный initial commit; origin не настроен | `[x]` |
| Public authorization | корневой `LICENSE` отсутствует; владение `@10d` не подтверждено | `[!]` |
| Container runtime | recipe валиден статически; Docker CLI недоступен | `[!]` |

## Поддерживаемый package scope

Все 29 публичных пакетов классифицированы в `app/ds-package-scope.json`:

- 15 `core` пакетов текущей release-цепочки;
- 6 `extended`: base, favicons, fonts, form, upload, header;
- 7 `experimental/source-only`: ai-chat, columns-settings, filters, notifications, search-assistant, table, tree;
- 1 `excluded`: assets workspace без runtime entrypoints.

Все 21 core/extended пакета прошли свежую сборку и проверку ESM, CJS, types, conditional exports и замкнутости внутренних зависимостей. Experimental/source-only пакеты остаются доступны исходному Storybook, но не входят в подтвержденный package contract.

## Главный чек-лист G-ветки

| ID | Статус | Задача | Результат / критерий завершения |
| --- | --- | --- | --- |
| G-00 | [x] | Зафиксировать DS-only границу. | S-Tracker и другие внешние проекты исключены из active workflow. |
| G-01 | [x] | Провести актуальный аудит проекта. | Снимок структуры, Storybook, packages, release, Git и owner gates записан в этом документе. |
| G-02 | [x] | Создать единый исполняемый DS-only quality gate. | После G-18 gate прошел: 14 passed, 1 warning, 0 blocking failures; tests, release, all-consumer и Git baseline checks включены. |
| G-03 | [x] | Устранить зависимость Storybook от проблемного OneDrive/reparse-пути. | Manager/preview smoke проходят через временный `subst` drive; mapping очищается, сеть не используется. |
| G-04 | [x] | Повторно запустить полный Storybook manager. | `/`, `/index.json`, `/iframe.html`, `/project.json` вернули `200`; подтверждены 938 stories и 215 docs. |
| G-05 | [x] | Собрать статический Storybook. | Свежий `storybook-static` содержит 604 файла; обязательные endpoint открываются локально и каталог совпадает с live manager. |
| G-06 | [x] | Определить поддерживаемый package scope. | Все 29 пакетов классифицированы: 15 core, 6 extended, 7 experimental/source-only, 1 excluded. |
| G-07 | [x] | Закрыть сборку выбранного package scope. | Gate прошел для 21/21 core/extended пакетов: ESM, CJS, types и conditional exports валидны; зависимости замкнуты. |
| G-08 | [x] | Построить component-to-story coverage matrix. | Классифицированы 969 public visual exports и 112 story groups; 39 direct-story gaps документированы, unclassified groups: 0. |
| G-09 | [x] | Проверить runtime компонентов в Storybook. | 9/9 ключевых groups открылись; Input/Select/Modal/Table/Drawer/Tree/Upload interactions подтверждены, Filters note классифицирован, clean console: 0 warnings/errors. |
| G-10 | [x] | Выполнить и классифицировать тесты. | Выполнены 210 файлов в 22 пакетах: 6543/6603 tests passed, 29 snapshot-only расхождений классифицированы, blocking failures: 0. |
| G-11 | [x] | Пересобрать release chain и повторить tarball rehearsal. | 21/21 artifacts собраны; 15-package release offline установлен в consumer, Vite build и DOM smoke прошли; SHA-256 подтвержден. |
| G-12 | [x] | Повторно проверить изолированных потребителей внутри `examples/`. | `consumer-smoke`, `consumer-clean-package` и `consumer-tarball` прошли свежие build/DOM checks; tarball route установлен offline. |
| G-13 | [x] | Подтвердить source-policy границу. | Secrets, active closed endpoints и unreviewed internal references равны нулю. |
| G-14 | [x] | Синхронизировать документацию и agent context. | Current status/workflow/README, runbooks, connection guide, catalog, import rules, пять паспортов и три recipes согласованы с G-04-G-12. |
| G-15 | [x] | Подготовить локальный Git baseline. | Проверены ignore rules и source boundary; создан осмысленный local initial commit. Remote не настроен, push не выполнялся. |
| G-16 | [!] | Закрыть owner/publication gates. | Владелец предоставляет лицензионное решение, подтверждает права и стратегию scope/registry. |
| G-17 | [!] | Проверить контейнерный runtime. | При доступном Docker `build`, `up`, health/index check проходят на `http://localhost:3001/`. Не блокирует local DoD. |
| G-18 | [x] | Пройти финальный DS-only quality gate. | Финальный gate: 14 passed, 1 non-blocking owner warning, 0 blocking failures; Local Definition of Done закрыт. |

## Группы выполнения

### G-A. Управление и gate

`G-00` - `G-02`.

Результат: единая DS-only граница и команда, которая не позволяет документации расходиться с фактическим состоянием.

### G-B. Storybook

`G-03` - `G-05`.

Результат: повторяемый manager runtime и свежий статический Storybook, открываемый локально.

### G-C. Компоненты и пакеты

`G-06` - `G-10`.

Результат: определен полный поддерживаемый scope, собраны пакеты, проверены stories, состояния и тесты.

### G-D. Release и потребители

`G-11` - `G-13`.

Результат: registry-free tarballs и внутренние isolated consumers подтверждают подключение без S-Tracker.

### G-E. Документация и репозиторий

`G-14` - `G-16`.

Результат: актуальные документы, Git baseline и отдельные owner/publication решения.

### G-F. Контейнер и финал

`G-17` - `G-18`.

Результат: optional container proof и окончательное согласование главного workflow.

## Local Definition of Done

Локальная дизайн-система считается завершенной без Docker и публикации, если закрыты `G-02` - `G-15` и `G-18`, кроме owner-only части `G-16`.

Обязательные результаты:

1. Storybook запускается одной документированной командой.
2. Статический Storybook открывается локально.
3. Публичный package scope определен и собран.
4. Каждый публичный компонент имеет проверяемую связь с story/docs либо явное исключение.
5. Ключевые состояния компонентов проверены в runtime.
6. Release tarballs устанавливаются в изолированный consumer внутри текущего репозитория.
7. Нет зависимости от закрытых корпоративных источников.
8. Главный workflow, status и agent context отражают один и тот же фактический результат.

## Внешние, но не локальные блокеры

Следующие пункты не делают локальную работу бессмысленной и не блокируют Storybook:

- Docker CLI;
- право на публичное распространение исходного кода;
- выбор/владение npm scope;
- GitHub remote и push credentials.

Они блокируют только соответствующий способ доставки или публикации.

## Итог G-ветки

Обязательный локальный маршрут завершен: закрыты `G-02`-`G-15` и `G-18`.

`G-16` остается отдельным owner/publication gate, а `G-17` - optional environment gate до появления Docker CLI. Они не блокируют локальную работу с дизайн-системой и Storybook.

## Следующая ветка

Локальный G-чек-лист и последующая [H-ветка Stabilization and Release Readiness](./stabilization-release-readiness-plan.md) завершены. После добавления обязательного Storybook language gate актуальный результат имеет 17 passed, 1 owner warning и 0 blockers.
