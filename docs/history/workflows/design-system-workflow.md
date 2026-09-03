# Workflow: запуск Tend UI, Storybook и подготовка дизайн-системы к подключению

## Назначение документа

Этот документ фиксирует рабочий маршрут проекта `DS Tend UI`.

Цель маршрута - пройти от предоставленного архива `tend-ui-main.zip` до состояния, в котором:

- дизайн-система развернута в текущем проекте;
- Storybook можно открыть локально и просматривать компоненты;
- понятно, какие пакеты входят в дизайн-систему;
- понятно, какие зависимости нужны для работы компонентов;
- есть проверенный способ подключать дизайн-систему к другим проектам;
- есть агентский контекст для будущей миграции интерфейсов на компоненты дизайн-системы.

Документ нужен как основной план реализации. Все последующие действия по проекту должны сверяться с этим маршрутом.

## Статус реализации

### Легенда

- `[x]` - пункт уже выполнен и проверен.
- `[ ]` - пункт еще не выполнен.
- `[~]` - пункт начат, но требует продолжения или проверки.
- `[!]` - пункт заблокирован внешним фактором: доступом, registry, сетью, несовместимостью или отсутствующей зависимостью.

### Главный чек-лист

| ID | Статус | Пункт | Связанный этап | Результат / проверка |
| --- | --- | --- | --- | --- |
| DS-00.1 | [x] | Создать папку `docs`. | Этап 0 | Папка `docs/` существует. |
| DS-00.2 | [x] | Создать основной workflow-документ. | Этап 0 | Есть `docs/history/workflows/design-system-workflow.md`. |
| DS-00.3 | [x] | Провести первичную аналитику архива `tend-ui-main.zip`. | Этап 0 | Подтверждены React-дизайн-система, Storybook, workspaces и пакеты `@10d/tend-ui-*`. |
| DS-01.1 | [x] | Распаковать `tend-ui-main.zip` без потери исходной структуры. | Этап 1 | Архив распакован во временную папку, рабочая структура перенесена в проект. |
| DS-01.2 | [x] | Проверить рабочую структуру после распаковки. | Этап 1 | Есть `app/package.json`, `app/yarn.lock`, `app/.storybook`, `app/packages`. |
| DS-01.3 | [x] | Создать корневой `README.md` проекта `DS Tend UI`. | Этап 1 | Есть корневой `README.md` с назначением проекта и быстрым стартом. |
| DS-02.1 | [x] | Создать `docs/component-inventory.md`. | Этап 2 | Файл инвентаризации создан. |
| DS-02.2 | [x] | Составить список пакетов дизайн-системы. | Этап 2 | Зафиксированы runtime-пакеты, служебные пакеты и версии. |
| DS-02.3 | [x] | Составить список ключевых компонентов и публичных импортов. | Этап 2 | Для ключевых компонентов указаны пакет, story и публичные импорты, где они статически видны. |
| DS-03.1 | [x] | Создать `docs/dependency-diagnostics.md`. | Этап 3, Этап 4, Этап 11 | Файл диагностики зависимостей создан. |
| DS-03.2 | [x] | Составить карту внешних зависимостей и их роли. | Этап 3 | Для ключевых внешних зависимостей указано, какую механику они дают проекту. |
| DS-03.3 | [x] | Зафиксировать стратегии локальной компенсации отсутствующих зависимостей. | Этап 3 | В диагностике есть риски, стратегии компенсации и backlog дальнейших доработок. |
| DS-04.1 | [x] | Классифицировать рискованные и проблемные зависимости по фактическим импортам. | Этап 4, Этап 11 | Для каждой рискованной зависимости определены связанные компоненты, роль и локальное решение. |
| DS-05.1 | [x] | Создать `docs/storybook-runbook.md`. | Этап 5 | Файл runbook создан. |
| DS-05.2 | [x] | Запустить Storybook локально. | Этап 5 | `G-04`: live manager запущен через short `subst` path; четыре обязательных endpoint вернули `200`. |
| DS-05.3 | [x] | Зафиксировать рабочую команду запуска Storybook и порт. | Этап 5 | `G-03`: `node scripts/run-storybook-local.js` из `app/`, порт `3000`, временный short `subst` path. |
| DS-05.4 | [x] | Проверить, что основные stories открываются. | Этап 5, Этап 10 | `R-05`: статическая сборка содержит `1238` entries; Chromium `1022/1022`, WebKit/Firefox по `249/249`, input `20/20`, visual `88/88`, responsive `85/85`. |
| DS-05.5 | [!] | Проверить возможность контейнерного запуска Storybook. | Этап 5 | `F-20` подготовил и статически проверил Dockerfile/Compose/nginx route без корпоративных endpoint'ов. Runtime build/up/check не подтверждены, потому что Docker CLI в текущем окружении отсутствует. |
| DS-06.1 | [x] | Проверить сборку главного пакета `@10d/tend-ui`. | Этап 6 | `G-07` свежей сборкой подтвердил главный пакет, ESM/CJS/types и conditional exports. |
| DS-06.2 | [x] | Проверить сборку ключевых пакетов: tokens, theme, icons, primitives. | Этап 6 | `G-07` подтвердил весь поддерживаемый scope: 21/21 core/extended пакетов. |
| DS-07.1 | [x] | Создать `docs/package-connection-guide.md`. | Этап 7, Этап 8 | Файл инструкции подключения создан. |
| DS-07.2 | [x] | Описать рабочий способ подключения дизайн-системы к другому проекту. | Этап 7, Этап 8 | H-07 подтвердил полный release-контракт: `21/21` tarballs, offline install, Vite build и DOM smoke; registry publication остается owner-approved шагом. |
| DS-09.1 | [x] | Создать `docs/agent-context/README.md`. | Этап 9 | Файл агентского контекста создан. |
| DS-09.2 | [x] | Подготовить компонентные паспорта для агентов и субагентов. | Этап 9 | Созданы правила импортов, компактный каталог и паспорта стартовых компонентов: Button, Input, Select, Modal, Table. |
| DS-10.1 | [x] | Пройти минимальный quality gate проекта. | Этап 10 | Актуальный DS-only gate - 25 passed, 4 accepted risks и 0 blocking failures; R-11 final gate - 24/24, blocking failures 0. |
| DS-12.1 | [x] | Выбрать первый проект-кандидат для подключения дизайн-системы. | Этап 12 | Активные DS-only кандидаты находятся внутри `examples/`: `consumer-smoke`, `consumer-clean-package`, `consumer-tarball`. |
| DS-12.2 | [x] | Проверить подключение дизайн-системы на минимальном примере. | Этап 12 | H-07: полный набор из 21 release tarball установлен offline; Vite build и DOM smoke `TendUI + Button` подтверждены без registry. |
| DS-12.3 | [x] | Зафиксировать все известные блокеры и решения в документации. | Этап 12 | Актуальный список и DS-only решения записаны в `docs/history/workflows/ds-only-completion-checklist.md`. |

### Правило синхронизации

Главный чек-лист является основным местом, где фиксируется общий статус работ. Рабочий порядок планирования дополнительно показывает статус каждого исполняемого шага `P-*`. Подробные этапы ниже объясняют, как выполнить соответствующие пункты. Когда пункт или шаг закрывается, нужно обновить:

1. статус пункта в главном чек-листе;
2. связанный артефакт, если он указан;
3. `### Текущий статус`, если изменилось общее состояние проекта;
4. статус соответствующего шага `P-*` в разделе `Рабочий порядок планирования`;
5. раздел `Рекомендуемый порядок ближайших действий`, если пункт был в ближайшем списке.

### Текущий статус

Рабочий порядок `P-01`-`P-10` и F/G/H-ветки сохранены как история восстановления и стабилизации. Q-ветка `QG-01`-`QG-13` и пакеты `R-00`-`R-11` завершены без взаимодействия с внешними проектами и закрытыми корпоративными источниками. Storybook содержит 1022 stories и 216 docs: Chromium прошел `1022/1022`, WebKit и Firefox по `249/249`, input modes `20/20`, visual `88/88`, responsive `85/85`; failures, diffs, overflow, overlap, clipped portals, missing story IDs и snapshot drift `0`. R-04 axe-аудит прошел `1022/1022` с 0 violations; 39/39 incomplete записей классифицированы, blocked/unclassified `0`, assistive/keyboard/focus/zoom проверки прошли `16/16`. Для фактического прослушивания создан отдельный screen-reader protocol. Основной locale - русский; static scan охватывает 119 story-файлов, последний полный runtime-language report прошел `1022/1022`; English UI/mojibake/Faker findings равны 0. Mock coverage содержит 56 состояний: 50 covered, 6 доказанных `n/a`, partial/gap `0`. Coverage-аудит классифицирует 953 public visual export и 416 type-only exports; `documented-gap = 0`, unclassified story groups `0`. R-03 классифицировал все 71 интерактивную группу, добавил 61 `play` function и подтвердил 15/15 обязательных типов взаимодействий. Во всех 22 тестируемых пакетах выполнено 217/217 test files: 6662/6662 теста passed, pending/todo, failures и snapshot drift отсутствуют. R-06 проверил 21/21 package artifacts, 645 публичных subpath, 2568 экспортируемых привязок, Vite 7, Webpack 5 и React 17.0.2/18.3.1/19.2.8; API drift и type resolution failures равны 0, gate `29/29`. R-07 подтвердил JS/maps `5136/5136`, 11/11 tree-shaking scenarios, 0 budget violations и full consumer bundle `372335` bytes; gate `27/27`. R-08 подтвердил public npm audits `0/0`, CycloneDX SBOM из 204 компонентов, inventory 1364 license records и gate `18` passed, `2` accepted owner risks, `0` failed. R-09 синхронизировал 953 visual и 416 type-only exports, 119 groups, 126 passports и четыре role-based documentation routes; uncovered/unclassified groups равны 0. R-10 подготовил community files, трехэтапный GitHub Actions workflow, repository-settings runbook и локальные gates: CI contract `16/16`, readiness audit `21/21`, итоговый gate `9/9`, CI-equivalent `13/13`; DS-only aggregate дает `25` passed, `4` accepted risks, `0` blocking failures. R-11 завершил финальную полную приемку: execution `49/49`, final gate `24/24`, blocking failures `0`, build/hash baseline и итоговые Markdown/JSON отчеты зафиксированы. Официальным peer contract остается React/ReactDOM `^17.0.2`. License/right-to-publish, GitHub remote/npm scope и optional Docker runtime являются owner/environment ограничениями и не блокируют локальные Storybook и tarball-интеграцию.

### DS-only G-ветка

Новая завершающая ветка находится в `docs/history/workflows/ds-only-completion-checklist.md`.

- единственный рабочий проект - `DS Tend UI`;
- потребительские проверки выполняются только в `examples/` этого репозитория;
- закрытые корпоративные источники не используются;
- `G-00`-`G-15` закрыты актуальным аудитом, Storybook, package artifacts, component coverage, runtime, tests, release, consumers, документацией и локальным Git baseline;
- `G-18` завершил локальную сверку; `G-16` и `G-17` остаются отдельными owner/environment gates и не блокируют локальную эксплуатацию.

### Stabilization H-ветка

План `docs/history/workflows/stabilization-release-readiness-plan.md` выполнен. H-ветка закрыла Storybook interactions, lint, accessibility baseline, visual snapshots, обязательные story states, расширение release bundle, React compatibility, решения по experimental packages и техническую public delivery readiness.

Следующего обязательного технического шага Q-ветки нет. Отдельного решения владельца или среды требуют license, npm scope, GitHub remote/публикация и optional Docker runtime; документированный backlog покрытия выполняется отдельными улучшениями.

### R-ветка максимизации качества

После завершения QG-13 создан отдельный мастер-план `docs/history/workflows/r-quality-maximization-plan.md`. Он выполнен пакетами `R-00`-`R-11` без взаимодействия с `S-Tracker`, закрытыми корпоративными источниками или npm publication. Финальная полная приемка пройдена; следующего обязательного технического пакета нет.

### Статус после E-05

`E-05` выполнен как стратегический шаг. Создан `docs/dependency-acquisition-and-compensation-strategy.md`: базовые публичные зависимости нужно получать через public/offline-public маршруты, закрытые корпоративные источники не используются, локальная компенсация применяется только для corporate-only, unavailable или узких helper/mechanic случаев после точного анализа импортов.

Следующий практический фокус:

```text
E-06: подготовить backlog локальной компенсации и первые кандидаты на реализацию.
```

### Статус после E-06

`E-06` выполнен как backlog-шаг. Создан `docs/local-compensation-backlog.md`: первые safe candidates отделены от сложных UI-механик и protected dependencies.

Следующий практический фокус:

```text
E-07: выбрать и реализовать первый low-risk срез локальной компенсации.
```

### Статус после E-07

`E-07` выполнен: реализован `LC-03` tooling config stubs. Созданы локальные workspace-пакеты `@10d/eslint-config` и `@10d/prettier-config`, результат записан в `docs/tooling-config-stubs.md`.

Следующий практический фокус:

```text
E-08: перепроверить build diagnostic после LC-03 или продолжить следующим low-risk срезом LC-01.
```

### Статус после E-08

`E-08` выполнен как blocked build diagnostic. `corepack yarn workspaces info --silent` распознает новые локальные config stubs, но `corepack yarn build:tokens` и `corepack yarn build:main` по-прежнему останавливаются на вложенном вызове plain `yarn`; `app/node_modules` и `dist` не созданы. Результат записан в `docs/history/workflows/e08-build-after-lc03-diagnostics.md`.

Следующий практический фокус:

```text
E-09: реализовать LC-01 service auth mock boundary.
```

### Статус после E-09

`E-09` выполнен: реализован `LC-01` service auth mock boundary. Создан локальный workspace-пакет `samolet-oauth2`, который покрывает фактически используемые `setAxiosAuthInterceptor` и `authStorage.getJwtAuthParams`; результат записан в `docs/service-auth-mock-boundary.md`.

Следующий практический фокус:

```text
E-10: реализовать LC-05 narrow query-string replacement.
```

### Статус после E-10

`E-10` выполнен: реализован `LC-05` narrow query-string replacement. Создан локальный workspace-пакет `query-string`, который покрывает фактический сценарий `queryString.stringify(params, { arrayFormat: 'comma' })`; результат записан в `docs/query-string-replacement.md`.

Следующий практический фокус:

```text
E-11: реализовать LC-04 class name helper.
```

### Статус после E-11

`E-11` выполнен: реализован `LC-04` class name helper. Создан локальный workspace-пакет `classnames`, который покрывает фактические сценарии composition для строк, массивов и conditional object; результат записан в `docs/classnames-helper-replacement.md`.

Следующий практический фокус:

```text
E-12: выполнить scope check и реализовать LC-06 uuid helper.
```

### Статус после E-12

`E-12` выполнен: реализован `LC-06` uuid helper. Созданы локальные workspace-пакеты `uuid` и `@types/uuid`, которые покрывают фактический сценарий `import { v4 as uuidv4 } from 'uuid'; uuidv4()`; результат записан в `docs/uuid-helper-replacement.md`.

Следующий практический фокус:

```text
E-13: выполнить build diagnostic checkpoint после LC-04 и LC-06.
```

### Статус после E-13

`E-13` выполнен как blocked build diagnostic checkpoint. Создан `docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md`, обновлен `docs/build-diagnostics.md`. Проверка подтвердила: локальные helper-пакеты `classnames`, `uuid` и `@types/uuid` распознаются, но сборка снова останавливается на nested plain `yarn`; `app/node_modules` и `dist` отсутствуют.

Следующий практический фокус:

```text
E-14: определить локальную build-runner стратегию для nested plain yarn calls.
```

### Статус после E-14

`E-14` выполнен как strategy step. Создан `docs/history/workflows/e14-build-runner-strategy.md`; выбран временный локальный `yarn.cmd` shim для diagnostic shell. Этот подход не меняет package scripts, не устанавливает зависимости и нужен только для следующей диагностики, чтобы понять, какой блокер идет после plain `yarn`.

Следующий практический фокус:

```text
E-15: создать temporary local yarn.cmd shim и выполнить узкий build diagnostic checkpoint.
```

### Статус после E-15

`E-15` выполнен как blocked diagnostic. Создан `docs/history/workflows/e15-shimmed-build-diagnostics.md`; временный `tmp/build-runner-shim/yarn.cmd` подтвердил выбранную стратегию и позволил пройти дальше nested plain `yarn`. Сборка остановилась на отсутствующем `tsc`, что подтверждает следующий активный блокер: `app/node_modules` и build tooling отсутствуют.

Следующий практический фокус:

```text
E-16: определить стратегию восстановления dependency graph и build tooling.
```

### Статус после E-16

`E-16` выполнен как strategy step. Создан `docs/dependency-graph-restoration-strategy.md`; зафиксировано, что foundational tools (`typescript`/`tsc`, `tsc-alias`, Rollup, Storybook, React, styled-components) нельзя заменять fake-stub'ами. Выбран маршрут восстановления через public/offline-public dependency graph: основной вариант - public npm install в среде с доступом к публичному npm, fallback - подготовленный offline public package cache/archive.

Следующий практический фокус:

```text
E-17: подготовить executable public-only dependency restore runbook.
```

### Статус после E-17

`E-17` выполнен как runbook step. Создан `docs/public-only-dependency-restore-executable-runbook.md`; в нем зафиксированы точная public-only команда, registry boundary, protected files, allowed changes, stop conditions, rollback/cleanup и проверки после restore. Установка зависимостей, build и Storybook не выполнялись.

Следующий практический фокус:

```text
E-18: выполнить public-only dependency restore attempt в допустимой среде или зафиксировать блокер выполнения.
```

### Статус после E-18

`E-18` выполнен как blocked execution check. Public-only dependency restore command из `docs/public-only-dependency-restore-executable-runbook.md` не запускалась в текущей Codex-среде, потому что среда ограничена по сети, а повтор current-shell public npm attempt без изменения среды уже запрещен результатами E-17.

Созданы:

```text
docs/history/workflows/e18-public-restore-attempt.md
docs/offline-public-package-cache-checklist.md
```

`app/node_modules`, `dist` и `app/yarn-error.log` не созданы. Storybook, build и package connection остаются заблокированы до восстановления dependency graph или точечной локальной компенсации.

Следующий практический фокус:

```text
E-19: build offline-public dependency package manifest from local package files and yarn.lock.
```

### Статус после E-19

`E-19` выполнен как manifest step. Создан `docs/offline-public-dependency-package-manifest.md`.

Manifest построен только из локальных файлов:

- `app/package.json`;
- `app/packages/*/package.json`;
- `app/yarn.lock`.

Подтверждено:

- 45 package files scanned;
- 44 workspace package files;
- 118 unique direct dependencies;
- 32 dependencies resolve through local workspace/local compensation route;
- 86 dependencies remain public/offline-public candidates;
- all 1593 resolved entries in `app/yarn.lock` point to `packages.samoletgroup.ru`, so lockfile URLs cannot be used as allowed sources.

`app/node_modules`, `dist` и `app/yarn-error.log` не созданы. Storybook, build и package connection остаются заблокированы до восстановления dependency graph.

Следующий практический фокус:

```text
E-20: choose the restore execution route from the E-19 manifest.
```

### Статус после E-20

`E-20` выполнен как route decision step. Создан `docs/restore-execution-route-decision.md`.

Выбранный маршрут для текущей среды:

```text
primary: prepare offline-public package archive/cache from the E-19 manifest
secondary: public-enabled install only in a separate allowed environment
fallback: targeted local compensation only for narrow known mechanics
```

Foundation-пакеты (`react`, `react-dom`, `styled-components`, TypeScript/Rollup/Storybook tooling, `antd-core`, `@dnd-kit/*`, `@tanstack/*`, `rc-*`) не заменяются fake-stub'ами. Закрытые корпоративные источники остаются вне маршрута.

`app/node_modules`, `dist` и `app/yarn-error.log` не созданы. Storybook, build и package connection остаются заблокированы до восстановления dependency graph.

Следующий практический фокус:

```text
E-21: prepare offline-public package acquisition plan from the E-19 manifest.
```

### Статус после E-21

`E-21` выполнен как acquisition planning step. Создан `docs/offline-public-package-acquisition-plan.md`.

План разделяет пакеты на priority lanes:

- build tooling minimum;
- Storybook and Vite runtime;
- foundational React runtime;
- type packages needed for build;
- complex UI mechanics;
- runtime utilities and service support;
- dev/test/release tooling.

Для каждой группы зафиксированы source type и compensation rule. Foundation-пакеты и сложные UI-механики не заменяются fake-stub'ами; локальная компенсация разрешена только для узких известных механик.

`app/node_modules`, `dist` и `app/yarn-error.log` не созданы. Storybook, build и package connection остаются заблокированы до восстановления dependency graph.

Следующий практический фокус:

```text
E-22: prepare offline-public archive manifest template and import staging runbook.
```

### Статус после E-22

`E-22` выполнен как archive/import preparation step.

Созданы:

```text
docs/offline-public-archive-manifest-template.md
docs/offline-public-import-staging-runbook.md
```

Зафиксированы required manifest schema, allowed/forbidden source types, checksum/provenance requirements, staging path, protected files, validation report и stop conditions before import.

`app/node_modules`, `dist` и `app/yarn-error.log` не созданы. Archive import, install, build и Storybook не выполнялись.

Следующий практический фокус:

```text
E-23: wait for or prepare a reviewed offline-public archive, then validate it in staging.
```

### Статус после E-23

`E-23` выполнен как blocked validation check.

Создан:

```text
docs/offline-public-archive-validation-report.md
```

Созданы staging folders:

```text
tmp/offline-public-archive-staging/
tmp/offline-public-archive-staging/inbox/
tmp/offline-public-archive-staging/extracted/
```

Validation заблокирована, потому что в staging inbox нет обязательных входов:

```text
offline-public-package-archive.*
offline-public-package-archive-manifest.json
checksums.sha256
```

`app/node_modules`, `dist` и `app/yarn-error.log` не созданы. Archive import, install, build и Storybook не выполнялись.

Следующий практический фокус:

```text
E-24: provide or create a reviewed offline-public archive, then rerun staging validation.
```

### Статус после E-24

`E-24` выполнен как blocked input step.

Создан:

```text
docs/offline-public-archive-preparation-request.md
```

Archive route остается заблокирован, потому что `tmp/offline-public-archive-staging/inbox/` пустой, а текущая среда не имеет public network access для создания reviewed archive.

`app/node_modules`, `dist` и `app/yarn-error.log` не созданы. Archive import, install, build и Storybook не выполнялись.

Следующий практический фокус:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

### Статус после E-25

`E-25` выполнен как local compensation lane decision.

Создан:

```text
docs/local-compensation-lane-decision.md
```

Выбрана lane:

```text
LC-07: focused lodash helper audit
```

Это audit lane, не implementation lane. Замена lodash wholesale не выполнялась; source files не менялись.

Следующий практический фокус:

```text
F-04D: restore dependency graph from the validated offline-public archive.

### Статус после E-32

`E-32` выполнен как blocked diagnostic.

Создан:

```text
docs/history/workflows/e32-isolated-react-consumer-smoke-check.md
```

Изолированный React import/render не выполнялся: `app/node_modules`, `app/node_modules/react`, `app/node_modules/react-dom` и ключевые `dist`-артефакты отсутствуют.

Следующий практический фокус:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

### Статус после F-01

`F-01` выполнен как route-definition step.

Создан:

```text
docs/history/workflows/f01-final-unblock-route.md
```

Финальный маршрут разделен на этапы `F-02`-`F-13`: сначала восстановить локальную Git-готовность для будущей публикации, затем вернуться к dependency graph, сборке, Storybook, sandbox smoke test, GitHub publication plan, clean package consumption, package artifact dry-run, закрытие internal artifact chain, подготовку public metadata/release order и локальную tarball-install rehearsal.

Следующий практический фокус:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

### Статус после F-04

`F-04` выполнен как blocked input step.

Создан:

```text
docs/history/workflows/f04-dependency-graph-restore-attempt.md
```

Staging inbox проверен: reviewed offline-public archive, manifest и checksum отсутствуют. `app/node_modules`, React/ReactDOM и `dist` не появились. Restore/import не выполнялся.

Следующий практический фокус:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

### Статус после F-04A

`F-04A` выполнен как archive input preparation step.

Создан:

```text
docs/history/workflows/f04a-offline-public-archive-input.md
```

В staging inbox подготовлены `offline-public-package-archive.zip`, `offline-public-package-archive-manifest.json` и `checksums.sha256`. Архив-кандидат содержит 24 public npm tarballs для минимальных lanes 1-4. Import/install/build/Storybook не выполнялись.

Следующий практический фокус:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

### Статус после F-04B

`F-04B` выполнен как blocked validation step.

Создан:

```text
docs/history/workflows/f04b-offline-public-archive-validation.md
```

Валидация остановлена до импорта: у всех 24 package entries пустой `sourceUrl`, а manifest ожидает `packages/*.tgz`, хотя zip содержит tarball-ы в корне архива. `app/node_modules`, build и Storybook не трогались.

Следующий практический фокус:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

### Статус после F-04G

`F-04G` выполнен.

Создан:

```text
docs/history/workflows/f04g-local-workspace-range-alignment.md
```

37 локальных `@10d/*` range mismatch исправлены в 16 `package.json`. После этого offline restore из archive v2 завершился успешно.

Проверено:

| Проверка | Результат |
| --- | --- |
| Unsatisfied internal `@10d/*` references | 0 |
| `app/node_modules` | present |
| `react` | `17.0.2` |
| `react-dom` | `17.0.2` |
| `styled-components` | `5.3.11` |
| `storybook` | `10.1.11` |
| `typescript` | `5.5.2` |

`dist` пока отсутствует, build/Storybook/package connection еще не проверены.

Следующий практический фокус:

```text
F-05: run package build verification.
```

### Status after F-05

`F-05` is complete as a diagnostic package build gate and remains `[!]` as a technical readiness gate.

Created:

```text
docs/history/workflows/f05-package-build-verification.md
```

Verified:

| Check | Result |
| --- | --- |
| `app/node_modules` | present |
| `corepack yarn build:tokens` | passed |
| `app/packages/tend-ui-tokens/dist` | present |
| `corepack yarn build:theme` | blocked |
| `corepack yarn build:icons` | blocked |
| `corepack yarn build:primitives` | blocked |
| `corepack yarn build:main` | blocked |

Current blocker changed from missing dependency graph to local build graph readiness:

```text
internal alias/build-order resolution + lodash subpath TypeScript compatibility + narrow TypeScript fixes
```

Main workflow implications:

```text
DS-06.1 remains [!]: main package build is not verified.
DS-06.2 remains [!]: key package build is only partial.
DS-05.* remains [!]: Storybook should wait until build graph blockers are reduced.
DS-07.2 was [!] at this historical checkpoint: package connection was not verified then. Superseded by F-09.
```

Next practical focus:

```text
F-05A: fix local build graph blockers for hooks, styling, icons and lodash subpath imports.
```

### Status after F-05A

`F-05A` is complete.

Created:

```text
docs/history/workflows/f05a-local-build-graph-fixes.md
```

Build gate result:

| Check | Result |
| --- | --- |
| `corepack yarn build:utils` | passed |
| `corepack yarn build:types` | passed |
| `corepack yarn build:hooks` | passed |
| `corepack yarn build:styling` | passed |
| `corepack yarn build:icons` | passed |
| `corepack yarn build:theme` | passed |
| `corepack yarn build:primitives` | passed |
| `corepack yarn build:main` | passed |

Main workflow implications:

```text
DS-06.1 is now [x]: main package build verified.
DS-06.2 is now [x]: key package build verified.
DS-05.* remains [!]: Storybook runtime is not verified yet.
DS-07.2 was [!] at this historical checkpoint: consumer package connection was not verified yet. Superseded by F-09.
```

Next practical focus:

```text
F-06: run Storybook verification.
```

### Статус после F-04F

`F-04F` выполнен как диагностическая restore-попытка из archive v2.

Создан:

```text
docs/history/workflows/f04f-archive-v2-restore-attempt.md
```

Archive v2 использован, scoped mirror naming исправлен, public package blocker снят. Restore остановился на локальном workspace/range blocker:

```text
@10d/tend-ui-icons@0.3.1
```

Статический анализ показал 37 unsatisfied internal `@10d/*` references. `app/node_modules` не создан, `dist` отсутствует, build/Storybook/package connection остаются заблокированы.

Следующий практический фокус:

```text
F-04G: align local @10d workspace dependency ranges for offline restore.
```

### Статус после F-04E

`F-04E` выполнен.

Создан:

```text
docs/history/workflows/f04e-offline-public-archive-v2.md
```

Archive v2 подготовлен из public npm lockfile closure:

| Проверка | Результат |
| --- | --- |
| Public npm tarballs | 1560 |
| Failed downloads | 0 |
| Excluded local workspace entries | 32 |
| Validation | passed |
| Archive checksum | `aeaef96358e62c0f9078b2adac09aaaa1fa07e107a1edf963b754a0e52147c42` |

`app/node_modules` не создан, `dist` отсутствует, build/Storybook/package connection остаются заблокированы до restore-попытки из archive v2.

Следующий практический фокус:

```text
F-04F: restore dependency graph from offline-public archive v2 and diagnose local workspace resolution blockers.
```

### Статус после F-04D

`F-04D` выполнен как диагностическая попытка восстановления dependency graph.

Создан:

```text
docs/history/workflows/f04d-dependency-graph-restore-from-archive.md
```

Validated archive input был использован. `corepack yarn install --offline` дошел до fetch stage, но остановился на первом недостающем public transitive package:

```text
csstype@3.1.3
```

`app/node_modules` не создан, `dist` отсутствует, build/Storybook/package connection остаются заблокированы.

Следующий практический фокус:

```text
F-04E: expand the offline-public archive to include required transitive packages from the lockfile closure.
```

### Статус после F-04C

`F-04C` выполнен.

Создан:

```text
docs/history/workflows/f04c-offline-public-archive-repair.md
```

Manifest и zip приведены к одному формату: все tarball-ы лежат как `packages/*.tgz`, `sourceUrl` заполнены public npm URL, checksum пересчитан. Повторная validation прошла. Import/install/build/Storybook не выполнялись.

Следующий практический фокус:

```text
F-04D: restore dependency graph from the validated offline-public archive.
```

### Статус после F-03

`F-03` выполнен как route decision step.

Создан:

```text
docs/history/workflows/f03-dependency-graph-acquisition-path.md
```

Выбран следующий исполнимый маршрут: archive-gated restore через reviewed offline-public package archive/cache. Public-enabled install остается допустимым альтернативным маршрутом вне текущей restricted shell. Локальная компенсация остается только для узких helpers/mocks, не для React, Storybook, TypeScript, Rollup или styled-components.

Следующий практический фокус:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

### Статус после F-02

`F-02` выполнен.

Создан:

```text
docs/history/workflows/f02-git-repository-repair.md
```

Локальный Git-репозиторий восстановлен: старый нерабочий `.git` reparse point сохранен резервно, новый репозиторий создан на ветке `main`, `git status` работает. Коммит и remote не создавались.

Следующий практический фокус:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
```

## Режим offline/self-contained

Единственный источник данных по дизайн-системе - локальные материалы проекта:

- `app/`
- `source-docs/`
- `README.md`
- `docs/`

Внутренний registry, GitLab, Figma, Nexus, Rocket.Chat, корпоративные CI/CD-среды и любые другие внутренние ссылки считаются недоступными. Мы не запрашиваем к ним доступ и не строим реализацию на предположении, что доступ появится.

Если зависимость или сервис недоступны, это не считается поводом останавливать проект. Правильная стратегия:

1. классифицировать, что именно отсутствует;
2. понять роль отсутствующей части: runtime, dev-only, tooling/config, theme/tokens/icons, Storybook/build;
3. проверить, есть ли локальный исходник внутри `app/packages`;
4. заменить, отключить, локализовать или реализовать недостающую механику самостоятельно;
5. зафиксировать решение и последствия в документации.

Registry в этом проекте рассматривается как факт из локальных конфигов, а не как автоматически доступный источник пакетов. Закрытые корпоративные источники не используются и доступ к ним не запрашивается. Публичные npm/GitHub-источники могут использоваться только как отдельный контролируемый шаг; зависимости, недоступные через локальные или публичные источники, переводятся в локальную карту компенсации.

## Режим планирования реализации

Этот раздел задает рабочий порядок выполнения задач. Он нужен, чтобы после каждого шага было видно:

- какой пункт `DS-*` был выполнен;
- какой этап workflow был затронут;
- какой артефакт появился или обновился;
- можно ли переходить к следующему шагу;
- что заблокировано и почему.

### Принцип работы

1. Перед началом шага выбирается один ближайший пункт или связанная группа пунктов из главного чек-листа.
2. Для выбранного пункта фиксируется ожидаемый результат.
3. Выполняется только работа, необходимая для закрытия этого пункта.
4. После выполнения обновляются чек-лист, статус шага `P-*`, связанные документы и текущий статус.
5. Если пункт не может быть закрыт, он получает статус `[!]`, а причина записывается в соответствующий диагностический документ.
6. Переход к следующему шагу выполняется только после понятного статуса текущего шага: `[x]` выполнено, `[!]` заблокировано, `[~]` частично выполнено и требует продолжения.

### Рабочий порядок планирования

| Шаг | Статус | Пункты | Что планируем сделать | Что должно появиться / измениться | Условие перехода дальше |
| --- | --- | --- | --- | --- | --- |
| P-00 | [x] | `DS-00.1`-`DS-00.3` | Подтвердить, что стартовая документация и аналитика есть. | Главный workflow и текущий статус. | Уже выполнено. |
| P-01 | [x] | `DS-01.1`-`DS-01.3` | Безопасно распаковать архив, проверить структуру, создать корневой README. | `app/`, исходные docs, `README.md`. | Есть рабочая структура `app/` или точный блокер распаковки. |
| P-02 | [x] | `DS-02.1`-`DS-02.3` | Провести инвентаризацию пакетов, компонентов и stories. | `docs/component-inventory.md`. | Понятен состав дизайн-системы и публичные импорты ключевых компонентов. |
| P-03 | [x] | `DS-03.1`-`DS-03.3` | Составить карту внешних зависимостей, их роли и стратегий компенсации. | `docs/dependency-diagnostics.md`. | Понятно, какие зависимости отвечают за runtime, UI-механику, тему, Storybook, сборку и тесты. |
| P-04 | [x] | `DS-04.1`, `DS-03.*` | Разобрать рискованные зависимости, registry и внутренние пакеты по фактическим импортам. | Обновленный `docs/dependency-diagnostics.md`. | Для каждого блокера понятно, что делать локально: заменить, отключить, локализовать или реализовать. |
| P-05 | [~] | `DS-05.1`-`DS-05.5` | Запустить Storybook локально, проверить stories, отдельно оценить контейнерный запуск. | `docs/storybook-runbook.md`, `docs/history/workflows/f20-containerized-storybook.md`, `docs/history/workflows/ds-only-completion-checklist.md`. | Исторический запуск подтвержден; fresh runtime требует `G-03`-`G-05`. Docker остается отдельным optional gate. |
| P-06 | [x] | `DS-06.1`, `DS-06.2` | Проверить сборку главного и ключевых пакетов дизайн-системы. | `docs/build-diagnostics.md`, `docs/history/workflows/f19-release-chain-refresh.md`. | Главный, ключевые и вся 15-package release chain собираются. |
| P-07 | [x] | `DS-07.1`, `DS-07.2` | Описать подключение дизайн-системы к другим проектам. | `docs/package-connection-guide.md`, `docs/history/workflows/f19-release-chain-refresh.md`. | Clean-package и isolated offline tarball consumer routes подтверждены. |
| P-08 | [x] | `DS-09.1`, `DS-09.2` | Подготовить агентский контекст и паспорта компонентов. | `docs/agent-context/README.md`, каталог, правила импортов, паспорта и migration recipes. | Агент может понять, какие компоненты использовать, откуда импортировать и какие runtime-ограничения учитывать. |
| P-09 | [x] | `DS-10.1` | Пройти минимальный quality gate. | `docs/quality-gate.md`, `docs/current-project-status.md`, `docs/history/workflows/ds-only-completion-checklist.md`. | G-18 завершил финальную сверку: 14 passed, 1 non-blocking owner warning и 0 blocking failures. |
| P-10 | [x] | `DS-12.1`-`DS-12.3` | Проверить минимальное подключение в DS-only consumer. | `examples/consumer-smoke`, `examples/consumer-clean-package`, `examples/consumer-tarball`. | G-12 подтвердил все три tracked routes, включая offline tarball install/build/DOM smoke. |

### Формат отчета после каждого шага

После выполнения каждого шага в ответе и/или в документации фиксируется:

```text
Выполненный шаг:
Статус шага:
Закрытые пункты:
Обновленные файлы:
Проверка результата:
Блокеры:
Следующий шаг:
```

### Правило обновления статусов

Если задача выполнена, соответствующий пункт в главном чек-листе переводится в `[x]`.

Если задача начата, но не завершена, пункт переводится в `[~]`.

Если продолжение невозможно без внешнего действия, пункт переводится в `[!]`, а причина фиксируется в диагностике или runbook.

Если пункт зависит от будущего решения, он остается `[ ]`, но в текущем статусе указывается, почему к нему еще не перешли.

## Исходное понимание

Архив `tend-ui-main.zip` содержит не просто документацию, а React-дизайн-систему с Storybook.

Внутри архива ожидается структура:

```text
tend-ui-main/
  app/
    package.json
    yarn.lock
    .storybook/
    packages/
      tend-ui/
      tend-ui-primitives/
      tend-ui-tokens/
      tend-ui-theme/
      tend-ui-icons/
      ...
  docs/
  README.md
```

Важные признаки дизайн-системы:

- есть монорепозиторий с `workspaces`;
- есть пакеты `@10d/tend-ui-*`;
- есть исходники React-компонентов;
- есть токены, темы, иконки и утилиты;
- есть `.stories.tsx` и конфигурация Storybook;
- есть инструкции по установке, миграции, публикации и локальной разработке.

## Главные ограничения

### 1. Registry

В проекте указан внутренний npm registry:

```text
https://packages.samoletgroup.ru/repository/npm-all
```

Registry - это хранилище npm-пакетов. Оно нужно, чтобы скачивать зависимости и публиковать собранные версии дизайн-системы.

Если доступа к этому registry нет, могут возникнуть ошибки установки. В этом случае задача не считается проваленной: нужно определить, какая именно зависимость недоступна и какую роль она выполняет.

### 2. React

Дизайн-система рассчитана на React. По найденным пакетам целевая версия React - `^17.0.2`.

Проекты без React нельзя мигрировать на эту дизайн-систему простым подключением пакета. Для них сначала нужен React-слой или отдельный план перехода.

### 3. Внутренние ссылки и инфраструктура

В архиве могут быть ссылки на внутренние GitLab, Nexus, Rocket.Chat, Figma и корпоративные CI/CD-сценарии.

Для локального запуска Storybook они не всегда критичны. Для публикации и полноценной интеграции в другие проекты они могут быть критичны.

## Этап 0. Подготовка проекта

Закрывает пункты: `DS-00.1`, `DS-00.2`, `DS-00.3`.

### Цель

Подготовить текущую папку `DS Tend UI` как рабочее место для дизайн-системы.

### Действия

1. Проверить, пустая ли текущая папка проекта.
2. Проверить, является ли папка Git-репозиторием.
3. Если Git-репозитория нет, инициализировать его перед массовыми изменениями.
4. Создать базовую структуру документации:

```text
docs/
  design-system-workflow.md
  dependency-diagnostics.md
  storybook-runbook.md
  package-connection-guide.md
  agent-context/
```

### Проверка результата

- есть папка `docs`;
- есть главный workflow-документ;
- понятно, где будут храниться результаты диагностики.

## Этап 1. Распаковка архива

Закрывает пункты: `DS-01.1`, `DS-01.2`, `DS-01.3`.

### Цель

Разместить содержимое `tend-ui-main.zip` в текущем проекте без потери структуры.

### Правильный подход

Не нужно вручную перемешивать файлы. На первом шаге важно сохранить исходную структуру, потому что пути внутри проекта могут быть связаны между собой.

Рекомендуемая целевая структура:

```text
DS Tend UI/
  app/
  docs/
  source-docs/
  README.md
```

Если архив распаковывается как `tend-ui-main/app`, то после проверки можно аккуратно поднять `app` на уровень корня проекта.

### Действия

1. Распаковать архив во временную папку.
2. Проверить, что внутри есть `tend-ui-main/app/package.json`.
3. Проверить, что внутри есть `tend-ui-main/app/.storybook`.
4. Проверить, что внутри есть `tend-ui-main/app/packages`.
5. Перенести рабочие файлы в текущий проект.
6. Не переносить временные, системные и явно лишние артефакты без необходимости.

### Проверка результата

В проекте должны быть:

```text
app/package.json
app/yarn.lock
app/.storybook/main.ts
app/.storybook/preview.tsx
app/packages/
```

## Этап 2. Инвентаризация дизайн-системы

Закрывает пункты: `DS-02.1`, `DS-02.2`, `DS-02.3`.

### Цель

Понять, какие пакеты, компоненты и Storybook-разделы реально есть в архиве.

### Действия

1. Прочитать `app/package.json`.
2. Составить список всех пакетов из `app/packages/*/package.json`.
3. Отдельно выделить runtime-пакеты:

```text
@10d/tend-ui
@10d/tend-ui-primitives
@10d/tend-ui-tokens
@10d/tend-ui-theme
@10d/tend-ui-icons
@10d/tend-ui-typography
@10d/tend-ui-grid
@10d/tend-ui-hooks
@10d/tend-ui-utils
```

4. Отдельно выделить служебные пакеты:

```text
@10d/tend-ui-eslint-config
@10d/tend-ui-jest-config
@10d/tend-ui-rollup-config
@10d/tend-ui-release-it-config
@10d/tend-ui-ts-config
```

5. Посчитать количество `.stories.tsx` и `.mdx`.
6. Составить первичный индекс компонентов.

### Артефакт этапа

Создать документ:

```text
docs/component-inventory.md
```

В нем для каждого компонента желательно фиксировать:

- название;
- пакет;
- путь к исходнику;
- путь к story;
- публичный импорт;
- краткое назначение;
- обязательные зависимости;
- состояние проверки.

## Этап 3. Карта зависимостей и компенсаций

Закрывает пункты: `DS-03.1`, `DS-03.2`, `DS-03.3`.

### Цель

Понять, какие внешние зависимости нужны дизайн-системе, какую ценность они дают и какие локальные доработки потребуются, если зависимость недоступна.

На этом этапе зависимости не устанавливаются. Работа выполняется только по локальным `package.json`, исходникам и уже созданной инвентаризации.

### Что фиксировать

- группы зависимостей: local workspace, runtime, UI mechanics, theme/styling, dev/build/test/documentation;
- ключевые внешние зависимости;
- какие компоненты или механики могут зависеть от них;
- риск при отсутствии зависимости;
- стратегию компенсации: сохранить как обязательную, заменить, отключить, локализовать или реализовать самостоятельно;
- будущий backlog доработок.

### Артефакт этапа

Создать документ:

```text
docs/dependency-diagnostics.md
```

В нем должны быть:

- offline rule;
- dependency groups;
- missing / external dependencies matrix;
- high-risk mechanics;
- follow-up backlog;
- результат `P-03`.

## Этап 4. Диагностика зависимостей

Закрывает пункты: `DS-04.1`. Может уточнять `DS-03.1`, `DS-03.3`.

### Цель

Не просто увидеть имя зависимости, а понять, какая часть механики зависит от нее и что именно придется компенсировать, если пакет недоступен.

### Классификация зависимостей

#### Runtime-зависимости

Нужны компонентам во время работы приложения.

Примеры:

```text
react
react-dom
styled-components
antd-core
dayjs
lodash
classnames
@dnd-kit/core
@tanstack/react-virtual
```

Если ломается runtime-зависимость, может сломаться сам компонент: селект, таблица, календарь, модальное окно, тема или стили.

#### Design-system-зависимости

Это внутренние пакеты самой дизайн-системы.

Примеры:

```text
@10d/tend-ui-tokens
@10d/tend-ui-theme
@10d/tend-ui-icons
@10d/tend-ui-utils
```

Если они недоступны из registry, но их исходники есть в `app/packages`, нужно настроить сборку так, чтобы проект использовал локальные workspace-пакеты.

#### Dev-зависимости

Нужны для разработки, тестов, линтинга, сборки и публикации.

Примеры:

```text
eslint
jest
storybook
rollup
typescript
turbo
release-it
```

Если ломается dev-зависимость, Storybook или сборка могут не запускаться, но это не всегда означает, что runtime-компоненты неполные.

#### Внутренние конфиги

Примеры:

```text
@10d/eslint-config
@10d/prettier-config
```

Если они недоступны, их обычно можно заменить локальными настройками. Это не должно блокировать восстановление UI-компонентов.

### Правило принятия решения

Для каждой рискованной или проблемной зависимости нужно ответить:

1. Где она используется?
2. Нужна ли она для Storybook?
3. Нужна ли она для runtime-компонентов?
4. Можно ли заменить ее локальным аналогом или собственной реализацией?
5. Есть ли ее исходник внутри `app/packages`?
6. Можно ли временно отключить ее без потери пользовательской механики?
7. Нужно ли реализовать недостающую механику самостоятельно?

## Этап 5. Запуск Storybook

Закрывает пункты: `DS-05.1`, `DS-05.2`, `DS-05.3`, `DS-05.4`, `DS-05.5`.

### Цель

Получить локально открываемый Storybook, в котором можно просматривать компоненты.

### Базовая команда

```sh
cd app
yarn storybook
```

Ожидаемый порт:

```text
http://localhost:3000
```

### Проверка результата

Storybook считается поднятым, если:

- локальная страница открывается;
- видна навигация по stories;
- есть разделы компонентов;
- базовые компоненты отрисовываются;
- переключатели темы и языка не ломают страницу;
- в консоли нет критических ошибок, которые мешают просмотру.

### Что делать при ошибке

Если Storybook не запускается:

1. Зафиксировать текст ошибки.
2. Определить тип ошибки:
   - зависимость не найдена;
   - TypeScript-ошибка;
   - ошибка Vite;
   - ошибка Storybook;
   - ошибка внутреннего API/proxy;
   - ошибка темы или decorator.
3. Проверить, нужна ли проблемная часть для просмотра компонентов.
4. Если проблема связана с внешними API, отключить или замокать внешний вызов.
5. Если проблема связана с темой, проверить `TendUI.init()` и Storybook decorators.
6. Если проблема связана с приватной зависимостью, перейти к этапу диагностики зависимостей.

### Контейнерный запуск

Контейнерный запуск Storybook проверяется отдельно от локального запуска.

Цель контейнерного сценария - понять, можно ли открыть Storybook в воспроизводимом окружении, не зависящем от локальной настройки машины.

Порядок проверки:

1. Проверить, есть ли в проекте Dockerfile или CI-сценарий для Storybook.
2. Проверить, можно ли собрать контейнер без доступа к внутренним секретам.
3. Проверить, как контейнер получает зависимости: публичный npm, внутренний registry, lockfile, build cache.
4. Если контейнерный запуск возможен, записать команду в `docs/storybook-runbook.md`.
5. Если контейнерный запуск невозможен, записать точный блокер: нет Docker, нет Dockerfile, нет доступа к registry, не хватает зависимостей, конфликт портов или ошибка сборки.

Контейнерный сценарий не заменяет локальный запуск Storybook. Он нужен как отдельный воспроизводимый способ просмотра витрины компонентов.

### Артефакт этапа

Создать документ:

```text
docs/storybook-runbook.md
```

В нем должны быть:

- команда запуска;
- порт;
- локальный или контейнерный режим запуска;
- известные ошибки;
- решения;
- дата последней успешной проверки.

## Этап 6. Сборка дизайн-системы

Закрывает пункты: `DS-06.1`, `DS-06.2`.

### Цель

Проверить, что пакеты дизайн-системы можно собрать как подключаемые библиотеки.

### Базовые команды

Сборка всех пакетов:

```sh
cd app
yarn build
```

Сборка главного пакета:

```sh
cd app
yarn build:main
```

Сборка отдельных важных пакетов:

```sh
cd app
yarn build:tokens
yarn build:theme
yarn build:icons
yarn build:primitives
```

### Проверка результата

Сборка считается успешной, если:

- появляются `dist`-папки у пакетов;
- у пакетов есть `index.js`, `cjs/index.js`, `index.d.ts`;
- `package.json` пакета корректно копируется в `dist`;
- TypeScript-типы генерируются без критических ошибок.

## Этап 7. Подготовка подключения к другим проектам

Закрывает пункты: `DS-07.1`, `DS-07.2`.

### Цель

Зафиксировать рабочие способы подключать дизайн-систему к другим проектам.

### Вариант A. Через registry

Это целевой промышленный вариант.

Пример:

```sh
yarn add @10d/tend-ui
```

Плюсы:

- удобно для многих проектов;
- версии контролируются;
- подключение стандартное.

Минусы:

- нужен доступ к registry;
- нужна публикация пакетов;
- нужно решить, где будет жить registry.

### Вариант B. Через локальный link

Подходит для разработки и тестовой миграции.

Пример из исходной документации:

```sh
cd app
yarn build:watch
cd dist
yarn link
```

В проекте-потребителе:

```sh
yarn link @10d/tend-ui
```

Плюсы:

- можно проверять изменения быстро;
- не нужна публикация в registry.

Минусы:

- неудобно для команды;
- легко получить расхождение окружений;
- не подходит как финальный способ распространения.

### Вариант C. Через file-зависимость

Подходит для локальной проверки.

Пример:

```json
{
  "dependencies": {
    "@10d/tend-ui": "file:../DS Tend UI/app/packages/tend-ui"
  }
}
```

Плюсы:

- не нужен registry;
- удобно для эксперимента.

Минусы:

- не всегда корректно работает с монорепозиториями и внутренними зависимостями;
- путь зависит от конкретной машины;
- плохо подходит для стабильной командной разработки.

### Вариант D. Через отдельный GitHub Packages или npm scope

Подходит, если нужно отвязаться от внутреннего registry.

Для этого потребуется:

- решить новый scope пакетов;
- обновить package names, если нужно;
- настроить публикацию;
- проверить все внутренние зависимости;
- обновить инструкции установки.

## Этап 8. Инструкция миграции проекта на дизайн-систему

Уточняет пункты: `DS-07.1`, `DS-07.2`. Готовит основу для `DS-12.1`, `DS-12.2`.

### Цель

Создать понятный маршрут для проектов, которые будут переходить на компоненты Tend UI.

### Базовая последовательность

1. Проверить, что проект использует React.
2. Проверить версию React.
3. Подключить пакет дизайн-системы.
4. Подключить тему:

```jsx
import { TendUI } from '@10d/tend-ui/theme';

TendUI.init();
```

5. Обернуть приложение в provider:

```jsx
<TendUI>
  <App />
</TendUI>
```

6. Заменять компоненты постепенно, а не все сразу.
7. Начать с простых компонентов:
   - Button;
   - Input;
   - Checkbox;
   - Radio;
   - Select;
   - Modal/Dialog;
   - Tabs;
   - Table.
8. После каждой замены проверять:
   - внешний вид;
   - hover;
   - disabled;
   - focus;
   - ошибки;
   - клавиатурную навигацию;
   - поведение при длинных данных.

### Артефакт этапа

Создать документ:

```text
docs/package-connection-guide.md
```

В нем должны быть:

- варианты установки;
- пример минимального подключения;
- правила импортов;
- список обязательных peer dependencies;
- известные ограничения;
- checklist проверки после миграции компонента.

## Этап 9. Агентский контекст

Закрывает пункты: `DS-09.1`, `DS-09.2`.

### Цель

Подготовить дизайн-систему так, чтобы агенты и субагенты могли использовать ее правильно, не загружая весь репозиторий в контекст.

### Почему это важно

Для агента нельзя просто сказать: "используй дизайн-систему".

Ему нужно дать компактный и точный контекст:

- какие компоненты существуют;
- откуда их импортировать;
- когда использовать каждый компонент;
- какие props важны;
- какие состояния обязательны;
- какие компоненты нельзя заменять самодельной версткой;
- где смотреть Storybook-пример.

### Рекомендуемая структура

```text
docs/agent-context/
  README.md
  ds-catalog.md
  import-rules.md
  component-passports/
    button.md
    input.md
    select.md
    modal.md
    table.md
  migration-recipes/
    replace-button.md
    replace-select.md
    replace-table.md
```

### Паспорт компонента

Для каждого важного компонента нужен короткий паспорт:

```text
Component: Button
Package: @10d/tend-ui/primitives
Import:
  import { Button } from '@10d/tend-ui/primitives';
Use when:
  ...
Avoid when:
  ...
Required states:
  default, hover, active, disabled, loading
Storybook:
  ...
Related components:
  ...
Migration notes:
  ...
```

### Правило компактности

Нельзя вставлять всю дизайн-систему в каждый компонентный spec.

Правильный подход:

- общий каталог дизайн-системы хранится отдельно;
- в задачу агента передается только нужный срез;
- для сложных компонентов добавляется ссылка на Storybook и паспорт компонента.

## Этап 10. Проверка качества

Закрывает пункт: `DS-10.1`. Проверяет результаты `DS-05.4`, `DS-06.1`, `DS-06.2`, `DS-07.2`.

### Цель

Убедиться, что результат не только "запустился", но и пригоден для дальнейшей работы.

### Минимальный quality gate

Проект считается подготовленным, если:

- архив распакован;
- структура понятна;
- есть карта зависимостей, рисков и компенсаций, а проблемы установки или отсутствия пакетов классифицируются отдельно;
- Storybook запускается или есть точный список блокеров;
- главный пакет дизайн-системы собирается или есть точный список блокеров;
- есть инструкция подключения к проектам;
- есть первичный индекс компонентов;
- есть агентский контекст;
- известны ограничения по registry и React-версии.

### Storybook quality gate

Storybook считается пригодным, если:

- открывается локально;
- основные stories доступны;
- базовые компоненты визуально отображаются;
- переключение темы не ломает просмотр;
- переключение языка не ломает просмотр;
- нет критических runtime-ошибок.

### Package quality gate

Пакет считается пригодным к подключению, если:

- сборка пакета проходит;
- сгенерированы JS и TypeScript-типы;
- публичные импорты работают;
- peer dependencies описаны;
- минимальный тестовый React-проект может импортировать компонент и отрисовать его.

## Этап 11. Работа с проблемами зависимостей

Уточняет пункты: `DS-03.1`, `DS-04.1`, `DS-12.3`.

### Общая логика

Если отсутствует зависимость, нельзя сразу переписывать компонент.

Сначала нужно понять:

- зависимость нужна для внешнего вида;
- зависимость нужна для поведения;
- зависимость нужна для сборки;
- зависимость нужна только для тестов;
- зависимость нужна только для публикации.

### Когда можно заменить зависимость

Заменять можно, если:

- зависимость служебная;
- она не влияет на пользовательскую механику;
- есть понятный локальный аналог или простая собственная реализация;
- замена не ломает API компонентов.

### Когда нужно реализовать механику самостоятельно

Это допустимо, если:

- зависимость недоступна;
- без нее ломается важный компонент;
- ее роль понятна;
- объем реализации разумный;
- можно проверить результат в Storybook.

Примеры:

- если нет пакета с токенами, можно восстановить цвета и размеры;
- если нет иконок, можно заменить набор иконок;
- если нет сложной механики Select, DatePicker или Table, переписывание будет отдельной крупной задачей;
- если нет внутреннего eslint-config, его можно заменить локальным конфигом.

## Этап 12. Финальный результат

Закрывает пункты: `DS-12.1`, `DS-12.2`, `DS-12.3`.

### Что должно получиться

В идеальном финальном состоянии проект содержит:

```text
DS Tend UI/
  app/
    package.json
    .storybook/
    packages/
  docs/
    design-system-workflow.md
    component-inventory.md
    dependency-diagnostics.md
    storybook-runbook.md
    package-connection-guide.md
    agent-context/
  README.md
```

### Definition of Done

Работа считается завершенной, когда:

1. Storybook можно открыть локально.
2. Есть понятная команда запуска Storybook.
3. Есть список пакетов дизайн-системы.
4. Есть список ключевых компонентов.
5. Есть диагностика зависимостей и registry.
6. Есть проверенный способ сборки.
7. Есть инструкция подключения к другому проекту.
8. Есть правила для агентов и субагентов.
9. Есть понимание, какие проекты можно мигрировать сразу, а каким сначала нужен React-слой.
10. Все известные блокеры записаны в документацию, а не остаются в устной договоренности.

## Рекомендуемый порядок ближайших действий

- [x] `DS-01.1` Распаковать `tend-ui-main.zip` во временную папку.
- [x] `DS-01.2` Перенести `app/` и исходные docs в текущий проект, затем проверить рабочую структуру.
- [x] `DS-01.3` Создать `README.md` проекта `DS Tend UI`.
- [x] `DS-02.1` Создать `docs/component-inventory.md`.
- [x] `DS-02.2` Составить список пакетов дизайн-системы.
- [x] `DS-02.3` Составить список ключевых компонентов и публичных импортов.
- [x] `DS-03.1` Создать `docs/dependency-diagnostics.md`.
- [x] `DS-03.2` Составить карту внешних зависимостей и их роли.
- [x] `DS-03.3` Зафиксировать стратегии локальной компенсации отсутствующих зависимостей.
- [x] `DS-04.1` Классифицировать рискованные и проблемные зависимости по фактическим импортам.
- [x] `DS-05.1` Создать `docs/storybook-runbook.md`.
- [~] `DS-05.2` Повторно запустить Storybook через безопасный local staging/cache route (`G-03`-`G-04`).
- [x] `DS-05.3` Зафиксировать воспроизводимую команду запуска и порт (`G-03`).
- [x] `DS-05.4` Основные stories и актуальные counts подтверждены в `G-08/G-09`.
- [!] `DS-05.5` Контейнерный маршрут подготовлен F-20; runtime-проверка ожидает доступный Docker CLI.
- [x] `DS-06.1` Проверить сборку главного пакета `@10d/tend-ui`.
- [x] `DS-06.2` Проверить сборку ключевых пакетов: tokens, theme, icons, primitives.
- [x] `DS-07.1` Подготовить `docs/package-connection-guide.md`.
- [x] `DS-07.2` Описать рабочий способ подключения дизайн-системы к другому проекту.
- [x] `DS-09.1` Подготовить `docs/agent-context/README.md`.
- [x] `DS-09.2` Подготовить компонентные паспорта для агентов и субагентов.
- [x] `DS-10.1` Создать и пройти актуальный DS-only quality gate (`G-02`; финально подтвержден `G-18`).
- [x] `DS-12.1` Использовать только внутренние consumer-примеры из `examples/`.
- [x] `DS-12.2` Проверить минимальное подключение и все internal examples на свежем release (`G-11`-`G-12`).
- [x] `DS-12.3` Зафиксировать все известные блокеры и решения в документации.

