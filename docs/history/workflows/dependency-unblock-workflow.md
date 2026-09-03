# Dependency / Build / Storybook Unblock Workflow

## Current F-Branch Status

Latest executed group: `F-46`.

Result:

- `docs/history/workflows/f05a-local-build-graph-fixes.md` created;
- local `lodash` now covers `debounce`, `merge` and `isEqual` subpath imports;
- `@10d/tend-ui-utils`, `@10d/tend-ui-types`, `@10d/tend-ui-hooks`, `@10d/tend-ui-styling`, `@10d/tend-ui-icons`, `@10d/tend-ui-theme`, `@10d/tend-ui-primitives`, `@10d/tend-ui-tokens` and `@10d/tend-ui` build successfully;
- main and key package `dist` outputs exist;
- full Storybook manager runtime is verified locally on `http://localhost:3000/` through the diagnostic `storybook-f06` config;
- Storybook index contains `938` stories plus `215` docs entries;
- `index.json`, `iframe.html` and `project.json` return `200`.
- isolated React consumer smoke test passed through `tmp/f07-consumer-smoke`;
- Vite consumer build and jsdom DOM render confirm `TendUI + Button` outside Storybook;
- GitHub publication and consumer connection plan is documented in `docs/history/workflows/f08-github-publication-and-connection-plan.md`;
- tracked diagnostic consumer example exists in `examples/consumer-smoke/`;
- root `README.md` reflects the current F-branch status;
- clean package entrypoints and exports are fixed in `F-09`;
- `examples/consumer-clean-package` verifies a cleaner consumer route without old diagnostic subpath aliases.
- the main `@10d/tend-ui@4.82.0` artifact passes `npm pack --dry-run` with `5507` files;
- `@10d/tend-ui-logos` now builds with validated root, `./utils` and `./SMaterials` production exports;
- the main package and all fourteen declared internal dependency artifacts pass dry-run: `15/15 PASS`;
- the clean-package consumer build renders one packaged `SMaterials` SVG logo and one Tend UI Button.
- all fifteen source and built release manifests are prepared for public access;
- closed corporate registry routing is removed from `.yarnrc` and `yarn.lock`;
- a seven-level dependency-safe publication order is documented and computed by a reusable local script.
- all fifteen release artifacts were packed in that order and installed into an isolated consumer with Yarn offline;
- five required local helper compensations were packed as a separate auxiliary layer;
- the tarball consumer Vite build and DOM smoke passed without aliases to monorepo sources.
- `app/release-boundary.json` now defines and enforces the public/offline-only distribution boundary;
- the consumer rehearsal now uses fifteen public release tarballs and only three offline runtime compensation tarballs;
- build-only type compensations are excluded from consumer artifacts;
- duplicate cache destinations and actionable runtime peer warnings are resolved;
- the hardened offline consumer build passes with `709` transformed modules and a successful provider/Button DOM smoke.
- reproducible `release:create-bundle` tooling creates the registry-agnostic publication payload;
- the generated bundle contains exactly fifteen public tarballs, a machine-readable manifest, `SHA256SUMS` and ordered publication guidance;
- the outer release archive and checksum sidecar pass integrity verification;
- no offline-only package, registry URL, credential or publication action enters the bundle.
- npmjs is selected as the preferred public package registry, with GitHub used for source and release archive hosting;
- `app/publication-target.json` records the decision without credentials;
- inactive npmjs and GitHub Packages configuration templates are separated from active project config;
- all fifteen packages are covered by an atomic scope-migration plan if `@10d` is not controlled;
- the target validator passes the blocked policy and keeps the readiness gate closed until scope ownership and Git origin are confirmed.
- the intended GitHub source boundary is defined by `github-snapshot-policy.json` and `.gitignore`;
- raw `source-docs`, generated outputs, credentials, local agents and caches are excluded without deletion;
- the snapshot audit covers `5929` files / approximately `24.67 MB`, with no oversized files, secret findings, local-only leaks or staged files;
- active corporate endpoints are removed from runtime/config source and rendered Storybook fixtures;
- the exact historical-reference allowlist contains `49` inert changelog/diagnostic files, with `0` unreviewed and `0` stale entries;
- the GitHub snapshot audit has `0` active reference files, `0` secret findings and `0` local-only leaks;
- the full Storybook manager is running locally with `938` stories and `215` docs entries after extending the local lodash compensation for Storybook subpaths;
- all fifteen public packages were rebuilt successfully across seven dependency levels after F-18;
- refreshed tarballs pass isolated Yarn `--offline` install, a `709`-module Vite build and provider/Button DOM smoke;
- the registry-agnostic bundle was recreated with `15` public tarballs and SHA-256 `a878f3dfc5ca0d26e09a02d72fdd3ee331596e6679be6e9dc8faeb5d2183374c`;
- a multi-stage static Storybook Dockerfile, Compose route, nginx health endpoint and runtime checker are prepared;
- container configuration validation passes with `0` corporate endpoint findings, but Docker CLI is unavailable on this machine;
- the main DS/P/F statuses are reconciled in `docs/current-project-status.md`;
- minimum local quality is closed, while Docker, publication ownership and S-Tracker implementation remain separate gates;
- S-Tracker now contains an isolated React adapter and renders one packaged Tend UI Button;
- all fifteen `@10d/*` dependencies resolve from local tarballs in the real candidate project;
- S-Tracker build, package-boundary verification and browser runtime checks pass;
- a clean S-Tracker `npm ci --offline` reinstall passes after the public cache is prepared;
- S-Tracker global search renders through Tend UI `Input` while native card/table filtering remains intact;
- the functional print action renders through Tend UI `Button` and `Print`, preserving its `40 x 40` geometry, toast and custom-view movement;
- the main filter trigger renders through Tend UI `Button`, `FilterAlt` and `Close`, preserving drawer, count and independent reset behavior;
- the column-settings action renders through Tend UI `Button` and `Settings`, preserving card/table visibility, drawer behavior and custom-view movement/return;
- the download action renders through Tend UI `Button` and `Download`, preserving card/table visibility, `40 x 40` geometry, custom-view movement/return and the documented no-op click contract;
- the card/table mode selector renders through Tend UI `Segmented`, while vanilla code remains the owner of view state and dependent action visibility;
- the narrow `@10d/tend-ui/primitives/Segmented` ESM/CJS/types export is built, packed and consumed by S-Tracker;
- the registry-neutral 15-package bundle was refreshed with SHA-256 `2dbdaf482ccff4494b40a069b2f2b00087cf50651d6d85a440c4c9079f6ebfda`;
- the queue/status selector renders through Tend UI `Tabs`, while queue state, counts and task filtering remain vanilla-owned;
- all six queues, dynamic counts, card/table independence and custom-view hiding/return pass in the browser;
- the narrow `@10d/tend-ui/primitives/Tabs` ESM/CJS/types export is built, packed and consumed by S-Tracker;
- the registry-neutral 15-package bundle was refreshed after F-30 with SHA-256 `b1496f19ef12dcfb31986fe18df6813c6ef591de50a8467c3bff6ddfbd1d052d`;
- pagination renders through Tend UI `Pagination`, while page state, slicing and rerendering remain vanilla-owned;
- direct pages, arrows, queue/search resets, card/table persistence and cross-page task selection pass in the browser;
- the bulk-action bar no longer covers pagination when task selection is active;
- the narrow `@10d/tend-ui/primitives/Pagination` ESM/CJS/types export is built, packed and consumed by S-Tracker;
- the registry-neutral bundle was refreshed after F-31 with SHA-256 `975408ffcf907c7cfa850da792feea5f229d33986b47962813030d124e8c2774`;
- card, table and select-all controls now render through Tend UI `Checkbox` portals while selected IDs and bulk actions remain vanilla-owned;
- single, partial, page-wide, cross-page and clear-selection scenarios pass with `41/41` rendered Checkbox instances and no legacy controls;
- the narrow `@10d/tend-ui/primitives/Checkbox` ESM/CJS/types export is built, packed and consumed by S-Tracker;
- the registry-neutral bundle was refreshed after F-32 with SHA-256 `6413e8be2a5c1611720a4b521967c53d15bbc566982e5c4627874da48045f1be`;
- public-source readiness remains blocked only by the missing root license/right-to-publish confirmation.

The eight custom multi-select controls now have an executable migration audit. It records two always-visible and six domain-scoped controls, 16 static plus one dynamic inline SVG, dynamic option derivation, one-tag-plus-summary behavior, clear/remove and Apply separation. The installed Tend UI Select export supports the required multiple, clear and tag-limit presentation. F-47 is bounded to `id`/`title`; the remaining six controls stay unchanged. The S-Tracker aggregate baseline remains `945` modules and a `954,359` raw / `294,319` gzip bundle.

Next practical group:

```text
F-47: migrate the always-visible id/title filters to Tend UI Select through a vanilla-owned request/snapshot bridge.
```

## Назначение

Этот документ фиксирует новую техническую ветку работ после диагностического workflow `P-01`-`P-10`.

Главный workflow уже показал, что проект разобран и документально подготовлен, но реальное функционирование заблокировано:

- Storybook не запускается;
- пакеты не собираются;
- `dist`-артефакты отсутствуют;
- подключение к внешнему проекту не подтверждено;
- `S-Tracker` выбран как кандидат, но пока не имеет React-слоя.

Цель этой ветки - последовательно снять технические блокеры и затем вернуться в `docs/history/workflows/design-system-workflow.md`, чтобы обновить старые статусы `[!]` по фактическому результату.

## Легенда статусов

- `[x]` - шаг выполнен и результат проверен.
- `[ ]` - шаг еще не выполнен.
- `[~]` - шаг начат, но требует продолжения.
- `[!]` - шаг заблокирован, точная причина записана.

## Текущий статус

Новая техническая ветка `D-*` создана, `D-01` выполнен как локальная предустановочная проверка, `D-02` выполнен как offline-диагностика установки, `D-03` выполнен как классификация install-блокеров, `D-03A` выполнен как выбор стратегии dependency graph, `D-04` выполнен как blocked build diagnostic, `D-05` выполнен как blocked Storybook diagnostic, `D-06` выполнен как blocked component-check diagnostic, `D-07` выполнен как стратегия подключения, `D-08` выполнен как blocked minimal-connection diagnostic.

Подтверждено: Node, npm, Corepack и Yarn через Corepack доступны локально; активный Yarn registry берется из `app/.yarnrc` и указывает на внутренний адрес, но закрытый registry не используется как источник. После `F-04G` dependency graph восстановлен из archive v2 и локальных workspaces: `app/node_modules` создан, React/ReactDOM/Storybook/TypeScript/Rollup/Turbo доступны. `app/packages/tend-ui/dist` пока отсутствует. Предыдущие диагностические шаги `D-*` и `E-*` остаются историей блокеров до archive v2 и local workspace range alignment. `D-06` подтвердил: source/story/docs для Button, Input, Select, Modal, Table найдены, но runtime-состояния остаются непроверенными. `D-07` выбрал staged route: не подключать Tend UI напрямую к `S-Tracker`, пока нет build, Storybook и sandbox smoke test.

Предыдущий workflow `P-01`-`P-10` завершен диагностически. D-ветка также завершена диагностически: `D-09` синхронизировал основной workflow с фактами `D-01`-`D-08`.

Следующий практический фокус после D-ветки:

```text
F-04G выполнен: создан `docs/history/workflows/f04g-local-workspace-range-alignment.md`; 37 локальных `@10d/*` range mismatch исправлены в 16 `package.json`, повторная offline restore из archive v2 прошла успешно, `app/node_modules` создан. Следующий практический фокус - `F-05`: run package build verification.
```

Public-only попытка восстановления зависимостей выполнялась в `E-04`, но остановилась на `AggregateError [EACCES]` при обращении к public npm; `app/node_modules` не создан. Обращение к закрытому registry как целевому источнику не выполнялось. Результаты `D-01`, `D-02`, `D-03`, `D-03A`, `D-04`, `D-05`, `D-06`, `D-07`, `D-08`, `D-09` и `E-01`-`E-04` записаны в `docs/dependency-unblock-log.md`; детальная классификация добавлена в `docs/dependency-diagnostics.md`, build-результат добавлен в `docs/build-diagnostics.md`, Storybook-результат добавлен в `docs/storybook-runbook.md`, компонентный статус добавлен в `docs/component-runtime-check.md`, стратегия подключения обновлена в `docs/package-connection-guide.md` и `docs/history/external-projects/s-tracker/candidate-project-check.md`, минимальное подключение записано в `docs/minimal-connection-check.md`.

## Правило работы

Эта ветка является отдельным живым чек-листом. После каждого шага нужно обновлять:

1. статус шага `D-*` в этом документе;
2. диагностический лог, если шаг выполнял команды;
3. связанные документы старого workflow, если блокер снят;
4. список ближайших действий внизу документа.

Если шаг меняет окружение, устанавливает зависимости, запускает сборку или Storybook, результат обязательно фиксируется в `docs/dependency-unblock-log.md`.

## Нужен ли режим планирования перед каждым шагом

Отдельный режим планирования перед каждым пунктом не обязателен.

Используем такой порядок:

- если следующий шаг уже описан в этом документе, можно давать команду `PLEASE IMPLEMENT THIS PLAN` и выполнять его сразу;
- если шаг может пойти несколькими путями, например менять registry, заменять зависимости, добавлять mocks или править исходники, сначала нужен короткий план;
- если шаг требует доступа к закрытому корпоративному контуру, он не выполняется; публичные npm/GitHub-источники допустимы только как отдельный контролируемый шаг;
- если команда может изменить большой объем файлов, сначала фиксируем ожидаемый результат и границы.

Практически: для `D-01`, `D-02`, `D-03` лучше идти поэтапно. Для каждого шага достаточно отдельного `PLEASE IMPLEMENT THIS PLAN`, а не большой режим планирования заново.

## Главный чек-лист D-ветки

| ID | Статус | Пункт | Результат / проверка |
| --- | --- | --- | --- |
| D-00 | [x] | Создать отдельный workflow разблокировки зависимостей, сборки и Storybook. | Есть `docs/dependency-unblock-workflow.md`. |
| D-01 | [x] | Проверить Yarn/Corepack и зафиксировать стратегию установки зависимостей. | Используем `corepack yarn`; активный registry и состояние `app/` записаны в `docs/dependency-unblock-log.md`. |
| D-02 | [!] | Выполнить первую диагностическую установку зависимостей. | Offline-диагностика выполнена; `app/node_modules` не создан, первый блокер: отсутствует `cross-spawn-7.0.5.tgz` из внутреннего registry. |
| D-03 | [x] | Классифицировать ошибки установки и отсутствующие пакеты. | Ошибки разделены на группы, для каждой группы выбран маршрут: установить, подключить локально, замокать, заменить, отложить или реализовать компенсацию. |
| D-03A | [!] | Выбрать и выполнить контролируемую стратегию восстановления dependency graph. | Стратегия выбрана; `app/node_modules` не создан, локальный Yarn cache неполный, `D-04` остается blocked diagnostic без отдельного install/cache маршрута. |
| D-04 | [!] | Собрать ключевые пакеты дизайн-системы. | Проверены `build:tokens`, `build:theme`, `build:icons`, `build:primitives`, `build:main`; все заблокированы plain `yarn` в scripts и отсутствующим `app/node_modules`, `dist` не создан. |
| D-05 | [!] | Запустить Storybook локально. | `corepack yarn storybook` выполнен; Storybook не открыт, blocker: binary `storybook` отсутствует из-за отсутствующего `app/node_modules`. |
| D-06 | [!] | Проверить базовые компоненты в Storybook. | Button, Input, Select, Modal, Table найдены статически, но Storybook не открыт; runtime-состояния записаны как unverified в `docs/component-runtime-check.md`. |
| D-07 | [x] | Подготовить стратегию подключения к проекту-кандидату. | Выбран staged route: dependency graph -> build -> Storybook -> isolated React sandbox -> S-Tracker React adapter; прямое подключение сейчас отклонено. |
| D-08 | [!] | Проверить минимальное подключение к проекту-кандидату или sandbox. | Smoke render не выполнен; причина невозможности записана в `docs/minimal-connection-check.md`. |
| D-09 | [x] | Вернуться в основной workflow и обновить старые `[!]`. | `docs/history/workflows/design-system-workflow.md` отражает новые факты по Storybook/build/package connection; D-ветка завершена диагностически. |
| E-01 / DEC-01 | [x] | Выбрать маршрут работы с зависимостями. | Выбран public/local route с жесткой корпоративной границей: локальные workspaces для `@10d/tend-ui-*`, публичные npm/GitHub-источники отдельным контролируемым шагом, закрытые корпоративные источники не используются; решение записано в `docs/dependency-restoration-decision.md`. |
| E-02 | [x] | Составить карту источников зависимостей и механик. | Создан `docs/dependency-source-map.md`: dependency, source route, local usage, affected package/component, mechanic и compensation route зафиксированы. |
| E-03 | [x] | Подготовить контролируемый public-only шаг восстановления зависимостей. | Создан `docs/public-dependency-restoration-runbook.md`: точная команда-кандидат, registry boundary, разрешенные изменения файлов и rollback rule зафиксированы. |
| E-04 | [!] | Выполнить контролируемую public-only диагностическую попытку восстановления зависимостей. | Команда из runbook запущена; остановка на public npm access blocker `AggregateError [EACCES]` для `https://registry.npmjs.org/@types%2freact`; `app/node_modules` не создан. |
| E-05 | [x] | Выбрать способ получения публичных зависимостей при сетевом ограничении текущей среды. | Стратегия записана в `docs/dependency-acquisition-and-compensation-strategy.md`: публичные/offline-public источники для базовых зависимостей, локальная компенсация только для corporate-only, unavailable или узких helper/mechanic случаев. |
| E-06 | [x] | Подготовить backlog локальной компенсации и первые кандидаты на реализацию. | Создан `docs/local-compensation-backlog.md`: service mocks, tooling/config stubs, small helper candidates, complex mechanics tasks и protected dependencies разделены по приоритетам. |
| E-07 | [x] | Выбрать и реализовать первый low-risk срез локальной компенсации. | Реализован `LC-03`: созданы local workspace stubs `@10d/eslint-config` и `@10d/prettier-config`; подробности в `docs/tooling-config-stubs.md`. |
| E-08 | [!] | Перепроверить build diagnostic после LC-03 или выбрать следующий low-risk срез. | Build diagnostic выполнен и записан в `docs/history/workflows/e08-build-after-lc03-diagnostics.md`; LC-03 workspaces распознаны, но build остается заблокирован plain `yarn` и отсутствующим `app/node_modules`. |
| E-09 | [x] | Реализовать следующий low-risk срез `LC-01`: service auth mock boundary. | Создан local workspace stub `samolet-oauth2`; `notifications` и `search-assistant` видят его как workspace dependency; подробности в `docs/service-auth-mock-boundary.md`. |
| E-10 | [x] | Реализовать следующий low-risk service-layer срез `LC-05`: narrow query-string replacement. | Создан local workspace stub `query-string`; notifications и search-assistant видят его как workspace dependency; подробности в `docs/query-string-replacement.md`. |
| E-11 | [x] | Реализовать следующий low-risk helper-срез `LC-04`: class name helper. | Создан local workspace stub `classnames`; affected UI packages видят его как workspace dependency; подробности в `docs/classnames-helper-replacement.md`. |
| E-12 | [x] | Выполнить scope check и реализовать `LC-06`: uuid helper. | Созданы local workspace stubs `uuid` и `@types/uuid`; фактическое использование `v4()` покрыто; подробности в `docs/uuid-helper-replacement.md`. |
| E-13 | [!] | Выполнить build diagnostic checkpoint после `LC-04` и `LC-06`. | Диагностика записана в `docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md`; блокер не изменился: nested plain `yarn`, missing `app/node_modules`, no `dist`. |
| E-14 | [x] | Определить локальную build-runner стратегию для nested plain `yarn` calls. | Выбран temporary local `yarn.cmd` shim для diagnostic shell; подробности в `docs/history/workflows/e14-build-runner-strategy.md`. |
| E-15 | [!] | Создать temporary local `yarn.cmd` shim и выполнить узкий build diagnostic checkpoint. | Диагностика записана в `docs/history/workflows/e15-shimmed-build-diagnostics.md`; shim сработал, новый блокер - missing `tsc` / missing `app/node_modules`. |
| E-16 | [x] | Определить стратегию восстановления dependency graph и build tooling. | Стратегия записана в `docs/dependency-graph-restoration-strategy.md`: foundational tools не stubbing, selected route - public/offline-public restore. |
| E-17 | [x] | Подготовить executable public-only dependency restore runbook. | Runbook записан в `docs/public-only-dependency-restore-executable-runbook.md`; install/build/Storybook не выполнялись. |
| E-18 | [!] | Выполнить public-only dependency restore attempt в допустимой среде или зафиксировать блокер выполнения. | Current shell execution blocked by network restrictions; result recorded in `docs/history/workflows/e18-public-restore-attempt.md`; offline checklist created in `docs/offline-public-package-cache-checklist.md`. |
| E-19 | [x] | Build offline-public dependency package manifest from local package files and `yarn.lock`. | Created `docs/offline-public-dependency-package-manifest.md`; direct dependencies classified by route. |
| E-20 | [x] | Choose restore execution route from the E-19 manifest. | Created `docs/restore-execution-route-decision.md`; selected offline-public package archive/cache as primary route for current workflow. |
| E-21 | [x] | Prepare offline-public package acquisition plan from the E-19 manifest. | Created `docs/offline-public-package-acquisition-plan.md`; package lanes, source types and compensation rules recorded. |
| E-22 | [x] | Prepare offline-public archive manifest template and import staging runbook. | Created `docs/offline-public-archive-manifest-template.md` and `docs/offline-public-import-staging-runbook.md`; validation/import boundary recorded. |
| E-23 | [!] | Wait for or prepare a reviewed offline-public archive, then validate it in staging. | Staging folders and `docs/offline-public-archive-validation-report.md` created; blocked because archive/manifest/checksum input is absent. |
| E-24 | [!] | Provide or create a reviewed offline-public archive, then rerun staging validation. | Created `docs/offline-public-archive-preparation-request.md`; blocked because archive input is absent and current shell cannot create public archive. |
| E-25 | [x] | Choose next local compensation lane while waiting for the offline-public archive. | Created `docs/local-compensation-lane-decision.md`; selected `LC-07` focused lodash helper audit. |
| E-26 | [x] | Audit lodash helper usage and define replacement slices. | Created `docs/lodash-helper-audit.md`; selected `LC-07A` as the first implementation slice. |
| E-27 | [x] | Implement `LC-07A` lodash object helper base. | Created local workspace packages `lodash` and `@types/lodash`; covered only `omit`, `pick`, `identity`, `isNil` and `isString`. |
| E-28 | [x] | Implement `LC-07B` lodash collection helper base. | Covered `chunk`, `uniq`, `groupBy` and `mapValues` in the local lodash workspace package. |
| E-29 | [x] | Implement `LC-07C` lodash object filtering helper base. | Covered `pickBy`, `omitBy`, `isEmpty` and `uniqBy` in the local lodash workspace package. |
| E-30 | [!] | Re-run Storybook diagnostics after dependency/build tooling strategy is handled. | Diagnostic recorded in `docs/history/workflows/e30-storybook-after-lodash-diagnostics.md`; Storybook remains blocked because `app/node_modules/.bin/storybook` is absent. |
| E-31 | [x] | Define complex runtime mechanic tasks if still needed. | Created `docs/complex-runtime-mechanics-tasks.md`; complex mechanics are split into component/mechanic tasks. |
| E-32 | [!] | Run isolated React consumer smoke test when possible. | Blocked diagnostic recorded in `docs/history/workflows/e32-isolated-react-consumer-smoke-check.md`; import/render remains unverified because `app/node_modules`, React/ReactDOM and `dist` are missing. |
| F-01 | [x] | Define the final unblock route for dependency graph, build, Storybook verification and GitHub-ready repository state. | Created `docs/history/workflows/f01-final-unblock-route.md`; selected staged route F-02 -> F-09. |
| F-02 | [x] | Repair or initialize the local Git repository state. | Created `docs/history/workflows/f02-git-repository-repair.md`; `git status` works on branch `main`; root `.gitignore` added. |
| F-03 | [x] | Finalize the dependency graph acquisition path. | Created `docs/history/workflows/f03-dependency-graph-acquisition-path.md`; selected archive-gated restore through reviewed offline-public package archive/cache. |
| F-04 | [x] | Restore dependency graph through the selected approved path. | Completed through `F-04A`-`F-04G`; `app/node_modules` now exists after archive v2 restore and local workspace range alignment. |
| F-04A | [x] | Prepare or provide the reviewed offline-public dependency archive input. | Created `docs/history/workflows/f04a-offline-public-archive-input.md`; minimum public npm archive candidate is present in staging inbox. |
| F-04B | [!] | Validate the prepared offline-public archive input. | Created `docs/history/workflows/f04b-offline-public-archive-validation.md`; blocked because `sourceUrl` is empty and archive paths do not match zip entries. |
| F-04C | [x] | Repair the offline-public archive manifest and package paths. | Created `docs/history/workflows/f04c-offline-public-archive-repair.md`; archive input validation now passes. |
| F-04D | [!] | Restore dependency graph from the validated offline-public archive. | Created `docs/history/workflows/f04d-dependency-graph-restore-from-archive.md`; restore attempt stopped on missing public transitive package `csstype@3.1.3`; `app/node_modules` was not created. |
| F-04E | [x] | Expand the offline-public archive to include required transitive packages from the lockfile closure. | Created `docs/history/workflows/f04e-offline-public-archive-v2.md`; archive v2 contains 1560 public npm tarballs and passed validation. |
| F-04F | [!] | Restore dependency graph from offline-public archive v2 and diagnose local workspace resolution blockers. | Created `docs/history/workflows/f04f-archive-v2-restore-attempt.md`; restore stopped on local `@10d/*` workspace range mismatch; `app/node_modules` was not created. |
| F-04G | [x] | Align local `@10d` workspace dependency ranges for offline restore. | Created `docs/history/workflows/f04g-local-workspace-range-alignment.md`; local workspace ranges were aligned and `app/node_modules` was restored from archive v2. |
| F-05 | [!] | Run package build verification. | Created `docs/history/workflows/f05-package-build-verification.md`; `@10d/tend-ui-tokens` builds, but theme/icons/primitives/main are blocked by local alias/build-order and lodash subpath TypeScript errors. |
| F-05A | [x] | Fix local build graph blockers and rerun package builds. | Created `docs/history/workflows/f05a-local-build-graph-fixes.md`; main and key package builds pass and `dist` outputs exist. |
| F-06 | [!] | Run Storybook verification. | Created `docs/history/workflows/f06-storybook-verification.md`; preview-only Storybook worked and identified the full manager follow-up handled in `F-06A`. |
| F-06A | [x] | Repair full Storybook manager runtime or define accepted preview-only verification route. | Created `docs/history/workflows/f06a-storybook-manager-runtime.md`; full Storybook manager runs locally on `http://localhost:3000/`. |
| F-07 | [x] | Run isolated React sandbox consumer smoke test. | Created `docs/history/workflows/f07-isolated-react-consumer-smoke.md`; Vite sandbox build passed and built DOM contains one Tend UI button outside Storybook. |
| F-08 | [x] | Prepare GitHub publication and verified consumer connection plan. | Created `docs/history/workflows/f08-github-publication-and-connection-plan.md`; root README updated; tracked diagnostic consumer example added in `examples/consumer-smoke/`. |
| F-09 | [x] | Clean package entrypoints and exports for consumer consumption. | Created `docs/history/workflows/f09-clean-package-entrypoints.md`; `@10d/tend-ui` root entries and production exports are generated; clean-package consumer build and DOM smoke pass. |
| F-10 | [!] | Run package artifact dry-run and publication readiness check. | Main artifact and 13 internal artifacts pass; publication readiness is blocked by missing `@10d/tend-ui-logos/dist`. See `docs/history/workflows/f10-package-artifact-dry-run.md`. |
| F-11 | [x] | Build and package `@10d/tend-ui-logos`, then repeat the internal artifact-chain dry-run. | Logos build/exports/dry-run and consumer SVG render pass; complete artifact chain is `15/15 PASS`. See `docs/history/workflows/f11-tend-ui-logos-artifact.md`. |
| F-12 | [x] | Sanitize public package metadata and define the internal package publication order. | Public metadata and registry routing are clean; 15 artifacts pass; seven-level release order is documented in `docs/history/workflows/f12-public-metadata-and-release-order.md`. |
| F-13 | [x] | Create local package tarballs in release order and verify an isolated consumer installation without a registry. | `15` release tarballs plus `5` compensation tarballs install offline; Vite build and DOM render pass. See `docs/history/workflows/f13-local-tarball-install-rehearsal.md`. |
| F-14 | [x] | Resolve package-consumer warnings and define the distributable boundary for local compensation packages. | Policy is enforced by `app/release-boundary.json`; the hardened consumer uses `15` release plus `3` offline runtime compensation tarballs, has no actionable warnings, and passes build/DOM checks. See `docs/history/workflows/f14-consumer-boundary-and-warning-cleanup.md`. |
| F-15 | [x] | Create a registry-agnostic release bundle and publication manifest without uploading it. | `release:create-bundle` produces 15 package tarballs, seven release levels, manifest, checksums, guide and outer archive; integrity checks pass and no publication occurs. See `docs/history/workflows/f15-registry-agnostic-release-bundle.md`. |
| F-16 | [x] | Choose the public registry and package-scope strategy without uploading packages. | npmjs is selected; source remains GitHub; credential-free templates and validator are ready; publication stays blocked until `@10d` ownership and Git origin are confirmed. See `docs/history/workflows/f16-public-registry-and-scope-strategy.md`. |
| F-17 | [!] | Prepare a GitHub-ready source snapshot and repository handoff without remote or push. | Boundary, audit tooling and commit plan are ready; no secrets/oversized/local-only leaks found, but public readiness is blocked by 91 corporate-reference files and missing license/right-to-publish confirmation. See `docs/history/workflows/f17-github-source-snapshot-audit.md`. |
| F-18 | [x] | Sanitize the public source/reference boundary without changing unavailable corporate services into working assumptions. | Active references `0`; reviewed historical files `49`; unreviewed/stale `0`; Storybook `938 + 215` is live. Public staging is blocked only by the owner/license decision. See `docs/history/workflows/f18-public-source-endpoint-sanitization.md`. |
| F-19 | [x] | Refresh all release artifacts after the F-18 source/API changes. | All 15 packages rebuilt; refreshed tarballs pass offline install, 709-module Vite build and DOM smoke; the 15-package bundle and checksum were recreated without publication. See `docs/history/workflows/f19-release-chain-refresh.md`. |
| F-20 | [!] | Prepare and verify a containerized Storybook route. | Dockerfile/Compose/nginx and validation scripts are ready; static policy validation passes with 0 corporate endpoints. Runtime build/up/check are blocked because Docker CLI is unavailable. See `docs/history/workflows/f20-containerized-storybook.md`. |
| F-21 | [x] | Reconcile all workflow statuses after the F-branch. | Current status is authoritative, P-06/P-07/P-09 and DS-10.1 are closed, and residual Docker/publication/S-Tracker gates are separated. See `docs/history/workflows/f21-workflow-reconciliation.md`. |
| F-22 | [x] | Integrate the verified package route into S-Tracker through a minimal React adapter. | Vanilla lifecycle preserved; one real Tend UI Button renders from the local 15-package tarball chain. See `docs/history/external-projects/s-tracker/f22-s-tracker-react-adapter.md`. |
| F-23 | [x] | Harden the S-Tracker consumer boundary and prepare the next migration candidate. | Local compensation checksums/API behavior and bundle limits are executable; global search `Input` is selected for F-24. See `docs/history/external-projects/s-tracker/f23-consumer-boundary-hardening.md`. |
| F-24 | [x] | Migrate the next isolated S-Tracker primitive. | Tend UI `Input` preserves `#js-global-search`, card/table filtering, clear, focus and responsive geometry through the shared runtime. See `docs/history/external-projects/s-tracker/f24-s-tracker-search-input.md`. |
| F-25 | [x] | Migrate the first functional S-Tracker toolbar action. | Tend UI `Button` and `Print` preserve `#js-print-btn`, `40 x 40` geometry, exact toast and safe card/table/custom-view placement. See `docs/history/external-projects/s-tracker/f25-s-tracker-print-button.md`. |
| F-26 | [x] | Migrate the S-Tracker Filters toolbar trigger. | Tend UI `Button`, `FilterAlt` and `Close` preserve `120 x 36` geometry, drawer opening, `0 -> 1 -> 0` count/reset and vanilla filter ownership. See `docs/history/external-projects/s-tracker/f26-s-tracker-filter-trigger.md`. |
| F-27 | [x] | Migrate the S-Tracker column-settings toolbar action. | Tend UI `Button` and `Settings` preserve card/table visibility, `40 x 40` geometry, drawer opening and custom-view transfer/return. See `docs/history/external-projects/s-tracker/f27-s-tracker-columns-action.md`. |
| F-28 | [x] | Migrate the S-Tracker download toolbar action. | Tend UI `Button` and `Download` preserve card/table visibility, `40 x 40` geometry, custom-view transfer/return and the explicit no-op contract. See `docs/history/external-projects/s-tracker/f28-s-tracker-download-action.md`. |
| F-29 | [x] | Migrate the S-Tracker card/table view switcher. | Tend UI `Segmented`, `CardView` and `TableView` preserve vanilla view ownership, dependent action visibility and custom-view movement. See `docs/history/external-projects/s-tracker/f29-s-tracker-view-switcher.md`. |
| F-30 | [x] | Migrate the S-Tracker queue/status selector. | Tend UI `Tabs` preserves six queues, counts, filtering, rerendering, card/table independence and custom-view hiding. See `docs/history/external-projects/s-tracker/f30-s-tracker-queue-tabs.md`. |
| F-31 | [x] | Migrate S-Tracker pagination. | Tend UI `Pagination` preserves page state, resets, card/table behavior, cross-page selection and bulk-action clearance. See `docs/history/external-projects/s-tracker/f31-s-tracker-pagination.md`. |
| F-32 | [x] | Migrate S-Tracker task-selection controls. | Tend UI `Checkbox` portals preserve row selection, select-all, indeterminate state, cross-page state and bulk actions. See `docs/history/external-projects/s-tracker/f32-s-tracker-task-selection.md`. |
| F-33 | [x] | Migrate S-Tracker bulk-action bar controls. | Seven Tend UI `Button` controls preserve contextual visibility, group movement/removal, no-op actions and clearing. See `docs/history/external-projects/s-tracker/f33-s-tracker-bulk-actions.md`. |
| F-34 | [x] | Migrate move-to-group dialog controls. | Tend UI `Input` and `Button` preserve native lifecycle, reset, fallback naming, group creation, toast and selection clearing. See `docs/history/external-projects/s-tracker/f34-s-tracker-move-dialog.md`. |
| F-35 | [x] | Migrate preset-save dialog controls. | Tend UI `Input` and `Button` preserve empty-name validation, trimming, draft capture/replay, dropdown refresh and close/cancel behavior. See `docs/history/external-projects/s-tracker/f35-s-tracker-preset-dialog.md`. |
| F-36 | [x] | Migrate the preset trigger and Save action. | Tend UI `Button` and `ChevronDown` preserve dropdown selection/deletion, active preset, dirty-state and disabled behavior. See `docs/history/external-projects/s-tracker/f36-s-tracker-preset-toolbar.md`. |
| F-37 | [x] | Migrate column-settings footer actions. | Four Tend UI `Button` controls preserve library expansion/reset, default draft reset, always-available Apply and commit behavior. See `docs/history/external-projects/s-tracker/f37-s-tracker-columns-footer.md`. |
| F-38 | [x] | Migrate column-settings close and library search. | Tend UI `Button`/`Input` preserve discard-on-close, library collapse, filtering and query lifecycle. See `docs/history/external-projects/s-tracker/f38-s-tracker-columns-drawer-controls.md`. |
| F-39 | [x] | Migrate attribute-library row actions. | Tend UI `Button`/icons preserve add/return semantics, filtering, draft isolation, library reset and Apply. See `docs/history/external-projects/s-tracker/f39-s-tracker-library-item-actions.md`. |
| F-40 | [x] | Migrate main column-row visibility and return controls. | Tend UI `Checkbox`/`Button` preserve DOM-order collection, drag mechanics, draft visibility, library return and Apply. See `docs/history/external-projects/s-tracker/f40-s-tracker-column-row-controls.md`. |
| F-41 | [x] | Migrate remaining drag-handle and preset-delete icons/actions. | Tend UI `DragIndicator` and Button/Delete portals preserve native drag ordering, preset deletion and active/draft fallback to base. See `docs/history/external-projects/s-tracker/f41-s-tracker-column-chrome-controls.md`. |
| F-42 | [x] | Audit completion of the column-settings migration. | No safe legacy control remains; an executable gate covers 11 mounts, seven adapters, 19 markers and the full drawer lifecycle. See `docs/history/external-projects/s-tracker/f42-s-tracker-column-settings-completion.md`. |
| F-43 | [x] | Audit remaining legacy controls outside column settings. | Executable inventory classifies filter drawer, system overlay, task actions and bookmarks; F-44 is bounded to three filter actions. See `docs/history/external-projects/s-tracker/f43-s-tracker-remaining-controls-audit.md`. |
| F-44 | [x] | Migrate filter-drawer Close, Reset All and Apply actions. | Tend UI Button/Close presentation preserves delegated vanilla drawer, draft, count, reset, commit and rerender ownership. See `docs/history/external-projects/s-tracker/f44-s-tracker-filter-drawer-actions.md`. |
| F-45 | [x] | Migrate filter money-range text fields and preset actions. | Tend UI Input/Button preserve vanilla formatting, clamping, active preset, intentional native dual thumbs, reset and Apply. See `docs/history/external-projects/s-tracker/f45-s-tracker-money-range-controls.md`. |
| F-46 | [x] | Audit filter multi-select triggers, option controls and inline icons. | Executable audit verifies eight controls, current gaps, Tend UI Select fit and the bounded F-47 bridge. See `docs/history/external-projects/s-tracker/f46-s-tracker-multi-select-audit.md`. |
| F-47 | [ ] | Migrate always-visible `id`/`title` filters to Tend UI Select. | Preserve vanilla option derivation, draft ownership, one-tag summary, clear/remove, Reset and Apply through a request/snapshot bridge. |

## D-01. Yarn/Corepack и стратегия зависимостей

### Цель

Подтвердить, что Yarn 1.22.15 можно использовать через Corepack, и понять, какие настройки registry мешают установке.

### Что проверить

- `node --version`
- `npm.cmd --version`
- `corepack --version`
- `corepack yarn --version`
- `app/.yarnrc`
- `app/.npmrc`
- `app/yarn.lock`
- наличие `app/node_modules`

### Ожидаемый результат

Создать или обновить:

```text
docs/dependency-unblock-log.md
```

В нем зафиксировать:

- версии Node/npm/Corepack/Yarn;
- активный registry;
- решение, какой командой выполнять установку;
- какие зависимости недоступны и какую локальную компенсацию нужно подготовить;
- какие действия не выполнялись.

## D-02. Диагностическая установка зависимостей

### Цель

Попробовать установить dependency graph и получить либо `app/node_modules`, либо точный список недоступных зависимостей.

### Базовый подход

Работать из папки:

```text
app/
```

Кандидатная команда:

```sh
corepack yarn install --frozen-lockfile
```

Если установка идет в недоступный внутренний registry, зафиксировать ошибку и перевести зависимость в локальную карту компенсации. Публичный registry override не используется.

### Важно

На этом шаге не правим исходный код компонентов. Только классифицируем ошибки установки и отсутствующие механики; внешние установки не выполняются.

## D-03. Классификация ошибок установки

### Цель

Понять, какие ошибки можно устранить локально, а какие требуют компенсации.

### Группы

- public dependency missing;
- internal `@10d/*` dependency missing but source exists in `app/packages`;
- internal config package missing;
- runtime dependency missing;
- Storybook/build tooling missing;
- service-only dependency missing.

### Карта решений

`D-03` должен завершаться не только списком ошибок, но и решением по каждой группе зависимостей.

| Группа | Базовое решение | Когда применять | Где фиксировать |
| --- | --- | --- | --- |
| Public dependency | Не устанавливать извне; классифицировать роль и выбрать локальную компенсацию. | Если пакет отсутствует в архиве, но нужен для build, Storybook или runtime. | `docs/dependency-unblock-log.md`, при необходимости `docs/dependency-diagnostics.md`. |
| Internal `@10d/*`, исходники есть в `app/packages` | Подключать как локальные workspace-пакеты, не скачивать извне. | Если пакет присутствует в архиве и может быть собран локально. | `docs/dependency-unblock-log.md`. |
| Internal `@10d/*`, исходников нет в архиве | Классифицировать как реальный пробел архива. | Если пакет нужен runtime/Storybook/build, но его исходников нет локально. | `docs/dependency-diagnostics.md`, backlog компенсации. |
| Runtime UI mechanics | Сначала пытаться сохранить зависимость, затем рассматривать замену. | Если пакет отвечает за поведение компонента: table, select, drag-and-drop, virtual list, overlay, focus/keyboard logic. | `docs/dependency-diagnostics.md`, паспорта компонентов при необходимости. |
| Service/API/realtime | Mock/disable для Storybook, не восстанавливать полноценную интеграцию без необходимости. | Если зависимость нужна для авторизации, API, realtime, notifications, search assistant или корпоративных сервисов. | `docs/storybook-runbook.md`, `docs/dependency-diagnostics.md`. |
| Tooling/config | Чинить только в объеме, нужном для install/build/Storybook. | Если пакет нужен Rollup, TypeScript, Storybook, tests, lint или release tooling. | `docs/build-diagnostics.md`, `docs/dependency-unblock-log.md`. |
| Local helper candidate | Заменять локальной утилитой только после оценки риска. | Если зависимость мелкая и легко воспроизводимая: часть lodash helpers, classnames-like helper, query-string-like helper. | `docs/dependency-diagnostics.md`, отдельная задача перед правкой кода. |

### Последовательность после D-03

После `D-03` не переходим сразу к ручной реализации недостающей механики.

Правильный порядок:

1. Сначала получить карту зависимостей и решений.
2. Затем выполнить `D-04`: проверить сборку ключевых пакетов.
3. Затем выполнить `D-05`: запустить Storybook или записать точный runtime-блокер.
4. Затем выполнить `D-06`: проверить базовые компоненты в Storybook.
5. Только после этого создавать отдельные компенсационные задачи, если видно, какая именно механика компонента отсутствует или сломана.

Компенсационная задача создается только при наличии трех фактов:

- какая зависимость отсутствует;
- какой компонент или сценарий от нее зависит;
- какое поведение нужно восстановить: визуальное состояние, hover/focus, keyboard interaction, overlay, table logic, drag-and-drop, virtual scroll, API mock или другое.

Если зависимость отсутствует, но ее отсутствие не мешает сборке, Storybook или проверяемым компонентам, она остается в backlog и не блокирует следующие шаги.

### Результат

Обновить:

- `docs/dependency-unblock-log.md`
- при необходимости `docs/dependency-diagnostics.md`

В результате `D-03` должен появиться один из двух выводов:

- можно продолжать к `D-04` без правки исходного кода;
- перед `D-04` нужен отдельный план по конкретному блокеру установки.

### Итог D-03

Классификация выполнена и зафиксирована в `docs/dependency-diagnostics.md`.

Вывод по состоянию на 2026-07-05: перед `D-04` нужен отдельный узкий шаг `D-03A`, потому что `app/node_modules` отсутствует, а `yarn.lock` массово указывает на внутренний registry mirror. Ручную компенсацию UI-механики пока не начинаем: сначала нужно восстановить dependency graph настолько, чтобы проверить сборку и Storybook.

## D-03A. Стратегия восстановления dependency graph

### Цель

Выбрать и выполнить контролируемый способ получить `app/node_modules` или честно зафиксировать, что `D-04` можно выполнять только как blocked diagnostic.

### Возможные маршруты

- локальная компенсация публичных пакетов, отсутствующих в архиве;
- локальная workspace-resolution стратегия для `@10d/tend-ui-*`;
- локальная замена или stub только для отсутствующих tooling/config пакетов `@10d/eslint-config` и `@10d/prettier-config`;
- отказ от ручной компенсации сложной UI-механики до проверки Storybook/build.

### Результат

Один из двух результатов:

- `app/node_modules` появился, можно идти в `D-04`;
- `app/node_modules` не появился, но причина и следующий блокер записаны, а `D-04` заранее считается диагностическим blocked-шагом.

### Итог D-03A

`D-03A` выполнен как выбор стратегии, но получил статус `[!]`: восстановить `app/node_modules` в текущих локальных условиях нельзя.

Выбранный маршрут:

- не запрашивать доступ к внутреннему registry;
- не переписывать `.yarnrc`, `.npmrc`, `package.json` и `yarn.lock` без отдельного плана;
- не начинать ручную компенсацию UI-механики до build/Storybook-проверки;
- переходить к `D-04` только как к blocked diagnostic, если перед ним не будет отдельно включен install/cache маршрут.

## D-04. Сборка ключевых пакетов

### Цель

Проверить, появились ли build-артефакты для подключения дизайн-системы.

### Команды

```sh
corepack yarn build:tokens
corepack yarn build:theme
corepack yarn build:icons
corepack yarn build:primitives
corepack yarn build:main
```

### Проверка

Проверить наличие `dist` у:

- `app/packages/tend-ui-tokens`
- `app/packages/tend-ui-theme`
- `app/packages/tend-ui-icons`
- `app/packages/tend-ui-primitives`
- `app/packages/tend-ui`

### Итог D-04

`D-04` выполнен как blocked diagnostic.

Все команды вида `corepack yarn build:*` стартуют, но затем корневые scripts вызывают plain `yarn workspace ...`, а plain `yarn` отсутствует в PATH. Даже после решения этого слоя сборка все равно потребует `app/node_modules`, потому что package scripts используют `tsc`, `tsc-alias`, `rollup` и зависимости пакетов.

`dist` не создан ни у одного ключевого пакета.

## D-05. Запуск Storybook

### Цель

Запустить Storybook и открыть каталог компонентов.

### Команда

```sh
corepack yarn storybook
```

Ожидаемый URL:

```text
http://localhost:3000
```

### Проверка

- Storybook открывается;
- sidebar виден;
- stories загружены;
- toolbar theme/locale работает;
- критических runtime-ошибок нет.

### Итог D-05

`D-05` выполнен как blocked diagnostic.

Команда `corepack yarn storybook` стартует root script, но `storybook dev -p 3000` не запускается, потому что binary `storybook` отсутствует без `app/node_modules`.

Storybook не открыт, stories и toolbar theme/locale визуально не проверены.

## D-06. Проверка базовых компонентов

### Цель

Проверить не только запуск Storybook, но и реальную работу компонентов.

### Первый набор

- Button
- Input
- Select
- Modal
- Table

### Состояния

- default;
- hover;
- focus;
- active;
- disabled;
- loading, если поддерживается;
- error/empty, если применимо.

### Итог D-06

`D-06` выполнен как blocked diagnostic.

Статически найдены source/story/docs для Button, Input, Select, Modal и Table. Runtime-проверка не выполнена, потому что Storybook не запущен. Детали записаны в `docs/component-runtime-check.md`.

## D-07. Стратегия подключения к проекту-кандидату

### Цель

Выбрать реальный способ подключения после сборки.

### Возможные варианты

- built local package;
- `yarn link`;
- `file:` dependency;
- отдельный sandbox-проект;
- React adapter layer в `S-Tracker`.

### Итог D-07

`D-07` выполнен.

Выбран реалистичный staged route: сначала восстановить dependency graph и сборку Tend UI, затем проверить Storybook и isolated React sandbox, и только после этого проектировать React adapter layer для `S-Tracker`.

Прямое подключение Tend UI к `S-Tracker` сейчас отклонено, потому что в Tend UI нет `dist` и runtime verification, а в `S-Tracker` нет React/React DOM и adapter layer.

## D-08. Минимальное подключение

### Цель

Подтвердить, что компонент дизайн-системы можно импортировать и отрисовать вне Storybook.

### Минимальный target

```tsx
import { TendUI } from '@10d/tend-ui/theme';
import { Button } from '@10d/tend-ui/primitives';

TendUI.init();

export function SmokeTest() {
  return (
    <TendUI>
      <Button>Smoke test</Button>
    </TendUI>
  );
}
```

### Итог D-08

`D-08` выполнен как blocked diagnostic.

Минимальный import/render не выполнен: нет `app/node_modules`, нет `dist` у основного пакета, theme и primitives, Storybook заблокирован, Button runtime не проверен, а проект-кандидат не имеет React adapter layer. Детали записаны в `docs/minimal-connection-check.md`.

## D-09. Возврат в основной workflow

### Цель

После фактической разблокировки обновить старые пункты:

- `DS-05.2`
- `DS-05.3`
- `DS-05.4`
- `DS-05.5`, если появится контейнерный сценарий;
- `DS-06.1`
- `DS-06.2`
- `DS-07.2`
- `DS-10.1`
- `DS-12.2`

## E-01 / DEC-01. Решение по восстановлению dependency graph

### Цель

Выбрать контролируемый маршрут, который даст шанс получить `app/node_modules` без обращения к закрытому внутреннему registry и без преждевременной ручной компенсации UI-механики.

### Решение

`E-01 / DEC-01` выполнен.

Подробное решение записано в:

```text
docs/dependency-restoration-decision.md
```

Выбран staged route:

1. сначала составить карту отсутствующих зависимостей и механик;
2. использовать локальные workspaces для доступных `@10d/tend-ui-*` исходников;
3. не использовать внутренний registry, корпоративный GitLab, Nexus, Figma, CI/CD или любой закрытый корпоративный источник;
4. публичные npm/GitHub-источники использовать только отдельным контролируемым шагом;
5. составить карту источников зависимостей и механик по локальным `package.json`, `yarn.lock`, imports, stories и configs;
6. не менять `app/.yarnrc`, `app/package.json` и `app/yarn.lock` без отдельного шага;
7. создавать stubs, mocks, локальные replacements или полноценные implementations только после понимания роли зависимости;
8. вернуться к build, Storybook и consumer smoke test только после восстановления публичных/локальных зависимостей или локальной компенсации ключевых блокеров.

### Следующий шаг

```text
E-04: выполнить контролируемую public-only диагностическую попытку восстановления зависимостей.
```

## E-02. Карта источников зависимостей и механик

### Цель

Понять, какие зависимости можно брать из локальных workspaces, какие являются публичными кандидатами на контролируемое восстановление, какие относятся к закрытому корпоративному контуру, а какие можно компенсировать локально.

### Результат

`E-02` выполнен.

Создан документ:

```text
docs/dependency-source-map.md
```

В нем зафиксированы:

- локальные workspace-пакеты `@10d/tend-ui-*`;
- публичные npm/GitHub кандидаты;
- корпоративно-специфичные или недоступные зависимости;
- связанные пакеты и компоненты;
- механики, которые дают зависимости;
- стратегия восстановления или локальной компенсации.

### Важно

Во время `E-02` не выполнялись:

- установка зависимостей;
- сетевые запросы;
- build;
- запуск Storybook;
- Docker;
- публикация пакетов;
- изменения исходного кода, `package.json`, `yarn.lock`, `.yarnrc` или проекта-кандидата.

### Следующий шаг

```text
E-03: подготовить контролируемый public-only шаг восстановления зависимостей.
```

## E-03. Runbook public-only восстановления зависимостей

### Цель

Подготовить безопасный сценарий будущей публичной установки зависимостей до того, как выполнять саму установку.

### Результат

`E-03` выполнен.

Создан документ:

```text
docs/public-dependency-restoration-runbook.md
```

В нем зафиксированы:

- точная команда-кандидат для следующего исполняемого шага;
- граница registry: только public npm, без закрытого корпоративного registry;
- запрет на GitLab, Nexus, Figma, CI/CD и другие закрытые корпоративные источники;
- список разрешенных изменений;
- список запрещенных изменений;
- stop conditions;
- rollback rule;
- критерии успеха и классификация возможных результатов.

### Важно

Во время `E-03` не выполнялись:

- установка зависимостей;
- сетевые запросы;
- build;
- запуск Storybook;
- Docker;
- публикация пакетов;
- изменения исходного кода, `package.json`, `yarn.lock`, `.yarnrc` или проекта-кандидата.

### Следующий шаг

```text
E-04: выполнить контролируемую public-only диагностическую попытку восстановления зависимостей.
```

## E-04. Public-only диагностическая попытка восстановления зависимостей

### Цель

Проверить, можно ли восстановить dependency graph из публичного npm без обращения к закрытому корпоративному registry.

### Команда

Команда была выполнена из `app/` по runbook:

```powershell
New-Item -ItemType Directory -Force ..\.cache\yarn-public
$env:YARN_CACHE_FOLDER = (Resolve-Path ..\.cache\yarn-public).Path
corepack yarn install --non-interactive --ignore-scripts --no-lockfile --registry https://registry.npmjs.org --network-timeout 600000
```

### Результат

`E-04` выполнен как blocked diagnostic.

Yarn стартовал и начал этап `Resolving packages`, но остановился на публичном registry:

```text
error An unexpected error occurred: "https://registry.npmjs.org/@types%2freact: "
Trace: AggregateError [EACCES]
```

### Вывод

`app/node_modules` не создан.

Это не доказательство отсутствия публичных пакетов и не проблема конкретного пакета `@types/react`. Текущий результат означает, что среда выполнения не имеет доступа к public npm registry.

Закрытые корпоративные источники не использовались как целевой registry. Сгенерированный `yarn-error.log` содержал дамп старого `app/yarn.lock` со ссылками на `packages.samoletgroup.ru`, поэтому лог был удален как временный артефакт диагностики.

### Rollback

- `app/node_modules` не появился.
- `app/yarn-error.log` удален.
- Временная папка `.cache/yarn-public/` осталась как пустой технический остаток: автоматическое удаление через shell было заблокировано политикой среды.

### Следующий шаг

```text
E-05: выбрать способ получения публичных зависимостей при сетевом ограничении текущей среды.
```

## E-05. Стратегия получения и локальной компенсации зависимостей

### Цель

Зафиксировать, как действовать после того, как controlled public-only install из `E-04` остановился на `AggregateError [EACCES]` в текущей среде.

### Результат

`E-05` выполнен как стратегический шаг.

Создан документ:

```text
docs/dependency-acquisition-and-compensation-strategy.md
```

В нем зафиксированы:

- закрытые корпоративные источники не используются и доступ к ним не запрашивается;
- public npm/GitHub остаются допустимыми источниками, но только как отдельный контролируемый маршрут;
- базовые зависимости `react`, `react-dom`, `styled-components`, Storybook stack и build tooling не переписываются вручную в рамках текущего плана;
- corporate-only service flows мокируются, отключаются или заменяются stub-сценариями;
- мелкие helper-зависимости можно заменять локально только после точного анализа импортов;
- сложные UI-механики переводятся в отдельные component-level задачи с критериями приемки.

### Не выполнялось

- установка зависимостей;
- сетевые запросы;
- build;
- запуск Storybook;
- Docker;
- публикация пакетов;
- правки исходного кода, `package.json`, `yarn.lock` или `.yarnrc`;
- изменения в проекте-кандидате.

### Следующий шаг

```text
E-06: подготовить backlog локальной компенсации и первые кандидаты на реализацию.
```

## E-06. Backlog локальной компенсации

### Цель

Подготовить упорядоченный список локальных компенсационных задач после `E-05`, не начиная широкую ручную переработку дизайн-системы.

### Результат

`E-06` выполнен.

Создан документ:

```text
docs/local-compensation-backlog.md
```

В нем зафиксированы:

- первые безопасные кандидаты: `LC-03` tooling config stubs, `LC-01` auth mock boundary, `LC-05` query serialization helper, `LC-04` class name helper;
- service/API/realtime зоны, которые нужно мокировать или отключать для Storybook;
- helper-зависимости, которые можно заменять только после точного анализа импортов;
- сложные UI-механики, которые нельзя переписывать как общий блок: `antd-core`, `@dnd-kit/*`, `@tanstack/*`, `rc-*`;
- protected dependencies, которые не переписываются в текущем workflow: React, React DOM, `styled-components`, Storybook/build stack.

### Не выполнялось

- установка зависимостей;
- сетевые запросы;
- build;
- запуск Storybook;
- Docker;
- публикация пакетов;
- правки исходного кода, `package.json`, `yarn.lock` или `.yarnrc`;
- изменения в проекте-кандидате.

### Следующий шаг

```text
E-07: выбрать и реализовать первый low-risk срез локальной компенсации.
```

Рекомендуемые кандидаты на первый срез:

- `LC-03` tooling config stubs;
- `LC-01` service auth mock boundary.

## E-07. Первый low-risk срез локальной компенсации

### Цель

Реализовать первый безопасный срез из backlog без обращения к закрытым корпоративным источникам и без переписывания runtime UI.

### Выбранный срез

Выбран `LC-03`:

```text
tooling config stubs
```

Причина выбора:

- это tooling-only зона;
- она не меняет компоненты;
- она не затрагивает Storybook runtime;
- она закрывает локальные package names, которые раньше указывали на недоступные `@10d/eslint-config` и `@10d/prettier-config`.

### Результат

Созданы локальные workspace-пакеты:

```text
app/packages/eslint-config/package.json
app/packages/eslint-config/index.js
app/packages/prettier-config/package.json
app/packages/prettier-config/index.js
```

Создан документ:

```text
docs/tooling-config-stubs.md
```

### Проверка

Проверено без установки зависимостей:

- package manifests валидны как JSON;
- оба config-модуля подключаются через локальный Node `require`;
- `app/node_modules` не создан;
- `app/yarn-error.log` отсутствует.

### Не выполнялось

- установка зависимостей;
- сетевые запросы;
- build;
- запуск Storybook;
- Docker;
- публикация пакетов;
- изменения в `app/package.json`, `app/yarn.lock` или `app/.yarnrc`;
- изменения в проекте-кандидате.

### Следующий шаг

```text
E-08: перепроверить build diagnostic после LC-03 или продолжить следующим low-risk срезом LC-01.
```

## E-08. Build diagnostic после LC-03

### Цель

Проверить, изменился ли build-блокер после добавления локальных workspace-stubs `@10d/eslint-config` и `@10d/prettier-config`.

### Результат

`E-08` выполнен как blocked diagnostic.

Создан документ:

```text
docs/history/workflows/e08-build-after-lc03-diagnostics.md
```

Подтверждено:

- `corepack yarn workspaces info --silent` видит `@10d/eslint-config` в `packages/eslint-config`;
- `corepack yarn workspaces info --silent` видит `@10d/prettier-config` в `packages/prettier-config`;
- `corepack yarn build:tokens` стартует, но останавливается на вложенном вызове plain `yarn`;
- `corepack yarn build:main` стартует, но останавливается на вложенном вызове plain `yarn`;
- `app/node_modules` не создан;
- `dist` для `@10d/tend-ui` и `@10d/tend-ui-tokens` не создан.

### Итог

`LC-03` успешно закрыл локальный config-name слой, но сборка остается заблокированной раньше TypeScript/Rollup стадий.

Текущий blocker:

```text
plain yarn command is not recognized inside package scripts; app/node_modules is missing.
```

### Следующий шаг

```text
E-09: реализовать LC-01 service auth mock boundary.
```

## E-09. Service auth mock boundary

### Цель

Изолировать корпоративно-зависимый `samolet-oauth2` без обращения к закрытому auth/source и без изменения service package source files.

### Результат

`E-09` выполнен.

Создан local workspace package:

```text
app/packages/samolet-oauth2/package.json
app/packages/samolet-oauth2/index.js
app/packages/samolet-oauth2/index.d.ts
```

Создан документ:

```text
docs/service-auth-mock-boundary.md
```

Stub покрывает только фактически найденные локальные API:

- `setAxiosAuthInterceptor`;
- `authStorage.getJwtAuthParams`;
- дополнительные mock helpers `authStorage.setJwtAuthParams` и `authStorage.clearJwtAuthParams`.

### Проверка

Проверено без установки зависимостей:

- package manifest валиден как JSON;
- local Node `require` видит `setAxiosAuthInterceptor`;
- local Node `require` видит `authStorage.getJwtAuthParams`;
- `corepack yarn workspaces info --silent` распознает `samolet-oauth2`;
- `@10d/tend-ui-notifications` видит `samolet-oauth2` как workspace dependency;
- `@10d/tend-ui-search-assistant` видит `samolet-oauth2` как workspace dependency;
- `app/node_modules` не создан;
- `app/yarn-error.log` отсутствует.

### Не выполнялось

- установка зависимостей;
- сетевые запросы;
- build;
- запуск Storybook;
- Docker;
- публикация пакетов;
- правки `app/package.json`, `app/yarn.lock` или `app/.yarnrc`;
- изменения в проекте-кандидате.

### Следующий шаг

```text
E-10: реализовать LC-05 narrow query-string replacement или выбрать повторную диагностику.
```

## E-10. Narrow query-string replacement

### Цель

Заменить узкое использование `query-string` в service-layer пакетах без изменения runtime UI и без установки публичного пакета в текущей ограниченной среде.

### Результат

`E-10` выполнен.

Создан local workspace package:

```text
app/packages/query-string/package.json
app/packages/query-string/index.js
app/packages/query-string/index.d.ts
```

Создан документ:

```text
docs/query-string-replacement.md
```

Stub покрывает фактически найденный локальный сценарий:

```ts
queryString.stringify(params, { arrayFormat: 'comma' })
```

### Проверка

Проверено без установки зависимостей:

- package manifest валиден как JSON;
- local Node `require` видит `stringify`;
- local Node `require` видит `default.stringify`;
- `stringify({ a: [1, 2] }, { arrayFormat: 'comma' })` возвращает `a=1,2`;
- `corepack yarn workspaces info --silent` распознает `query-string`;
- `@10d/tend-ui-notifications` видит `query-string` как workspace dependency;
- `@10d/tend-ui-search-assistant` видит `query-string` как workspace dependency;
- `app/node_modules` не создан;
- `app/yarn-error.log` отсутствует.

### Не выполнялось

- установка зависимостей;
- сетевые запросы;
- build;
- запуск Storybook;
- Docker;
- публикация пакетов;
- правки service source files;
- правки `app/package.json`, `app/yarn.lock` или `app/.yarnrc`;
- изменения в проекте-кандидате.

### Следующий шаг

```text
E-11: реализовать LC-04 class name helper.
```

## E-11. Class name helper replacement

### Цель

Заменить узкое использование `classnames` локальным workspace-пакетом без установки зависимостей, без правок компонентов и без обращения к закрытым корпоративным источникам.

### Результат

`E-11` выполнен.

Создан local workspace package:

```text
app/packages/classnames/package.json
app/packages/classnames/index.js
app/packages/classnames/index.d.ts
```

Создан документ:

```text
docs/classnames-helper-replacement.md
```

Stub покрывает фактически найденные локальные сценарии:

```ts
cn('base', className)
cn(['base', className])
cn('base', { active: isActive, disabled: isDisabled })
cn(['base', className], { active: isActive })
```

### Проверка

Проверено без установки зависимостей:

- local Node `require` видит `classnames`;
- helper корректно обрабатывает строки, массивы и conditional object;
- `corepack yarn workspaces info --silent` распознает `classnames`;
- `@10d/tend-ui-primitives`, `@10d/tend-ui-typography`, `@10d/tend-ui-upload`, `@10d/tend-ui-header`, `@10d/tend-ui-table`, `@10d/tend-ui-tree` видят `classnames` как workspace dependency;
- `app/node_modules` не создан;
- `app/packages/tend-ui/dist` не создан;
- `app/yarn-error.log` отсутствует.

### Не выполнялось

- установка зависимостей;
- сетевые запросы;
- build;
- запуск Storybook;
- Docker;
- публикация пакетов;
- правки component source files;
- правки `app/package.json`, `app/yarn.lock` или `app/.yarnrc`;
- изменения в проекте-кандидате.

### Следующий шаг

```text
E-12: выполнить scope check и реализовать LC-06 uuid helper.
```

## E-12. UUID helper replacement

### Цель

Проверить фактическое использование `uuid` и заменить только узкий сценарий `v4()` локальным workspace-пакетом без установки зависимостей и без обращения к закрытым корпоративным источникам.

### Результат

`E-12` выполнен.

Созданы local workspace packages:

```text
app/packages/uuid/package.json
app/packages/uuid/index.js
app/packages/uuid/index.d.ts
app/packages/types-uuid/package.json
app/packages/types-uuid/index.d.ts
```

Создан документ:

```text
docs/uuid-helper-replacement.md
```

Stub покрывает фактически найденный runtime-сценарий:

```ts
import { v4 as uuidv4 } from 'uuid';

uuidv4();
```

### Проверка

Проверено без установки зависимостей:

- local Node `require` видит `uuid.v4`;
- generated ids match UUID v4 string shape;
- 100 generated ids passed a uniqueness smoke check;
- `corepack yarn workspaces info --silent` распознает `uuid`;
- `corepack yarn workspaces info --silent` распознает `@types/uuid`;
- `@10d/tend-ui-upload`, `@10d/tend-ui-filters`, `@10d/tend-ui-columns-settings` видят `uuid` и `@types/uuid` как workspace dependencies;
- `app/node_modules` не создан;
- `app/packages/tend-ui/dist` не создан;
- `app/yarn-error.log` отсутствует.

### Не выполнялось

- установка зависимостей;
- сетевые запросы;
- build;
- запуск Storybook;
- Docker;
- публикация пакетов;
- правки component source files;
- правки `app/package.json`, `app/yarn.lock` или `app/.yarnrc`.

### Следующий шаг

```text
E-13: выполнить build diagnostic checkpoint после LC-04 и LC-06.
```

## E-13. Build diagnostic checkpoint после LC-04 и LC-06

### Цель

Проверить, изменился ли build-блокер после добавления локальных workspace-пакетов `classnames`, `uuid` и `@types/uuid`.

### Результат

`E-13` выполнен как blocked diagnostic.

Создан документ:

```text
docs/history/workflows/e13-build-after-lc04-lc06-diagnostics.md
```

Обновлен общий build-документ:

```text
docs/build-diagnostics.md
```

### Проверка

Выполнены короткие diagnostic attempts без установки зависимостей:

```text
corepack yarn build:tokens
corepack yarn build:main
corepack yarn build:upload
corepack yarn build:filters
```

Все четыре команды остановились на одном блокере:

```text
'yarn' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
```

### Итог

Блокер не изменился.

Что подтверждено:

- `classnames`, `uuid`, `@types/uuid` распознаются как workspace packages;
- build не доходит до TypeScript/Rollup;
- build не проверяет runtime-поведение helper replacements;
- `app/node_modules` не создан;
- `dist` не создан;
- `app/yarn-error.log` отсутствует.

### Не выполнялось

- установка зависимостей;
- запуск Storybook;
- Docker;
- публикация пакетов;
- правки `app/package.json`, `app/yarn.lock`, `app/.yarnrc`;
- правки source packages.

### Следующий шаг

```text
E-14: определить локальную build-runner стратегию для nested plain yarn calls.
```

## E-14. Build-runner strategy для nested plain yarn calls

### Цель

Выбрать безопасную локальную стратегию для build-блокера, где root-команда запускается через `corepack yarn`, но package scripts внутри монорепо вызывают plain `yarn`.

### Результат

`E-14` выполнен как strategy step.

Создан документ:

```text
docs/history/workflows/e14-build-runner-strategy.md
```

Выбранный маршрут:

```text
temporary local yarn.cmd shim for diagnostic shell
```

### Рассмотренные варианты

| Вариант | Решение | Причина |
| --- | --- | --- |
| Массово заменить `yarn` на `corepack yarn` в package scripts | Отклонено сейчас | Слишком широкий churn по монорепо и не решает отсутствие `app/node_modules`. |
| Установить Yarn глобально или выполнить `corepack enable` | Отклонено сейчас | Меняет состояние машины/tooling и выходит за границу текущей диагностики. |
| Повторять build без изменений | Отклонено | `E-13` уже подтвердил тот же ранний блокер. |
| Временный локальный `yarn.cmd` shim | Выбрано | Не меняет manifest/scripts, обратимо, позволяет проверить следующий фактический блокер. |

### Следующий шаг

```text
E-15: создать temporary local yarn.cmd shim и выполнить узкий build diagnostic checkpoint.
```

## E-15. Shimmed build diagnostic

### Цель

Проверить выбранную в `E-14` стратегию temporary local `yarn.cmd` shim и понять, какой блокер появляется после nested plain `yarn`.

### Результат

`E-15` выполнен как blocked diagnostic.

Создан документ:

```text
docs/history/workflows/e15-shimmed-build-diagnostics.md
```

Создан временный shim:

```text
tmp/build-runner-shim/yarn.cmd
```

### Проверка

Shim подтвержден:

```text
yarn --version -> 1.22.15
```

Выполнены узкие diagnostic attempts:

```text
corepack yarn build:tokens
corepack yarn build:main
corepack yarn build:upload
corepack yarn build:filters
```

Все команды прошли дальше nested plain `yarn` и остановились на:

```text
'tsc' is not recognized as an internal or external command,
operable program or batch file.
```

### Итог

Текущий активный блокер:

```text
missing dependency graph / missing build tooling
```

Не нужно создавать fake `tsc`, fake Rollup или fake Storybook. Это foundational build/runtime tools, их нужно получать через допустимый public/offline-public dependency route.

### Следующий шаг

```text
E-16: определить стратегию восстановления dependency graph и build tooling.
```

## E-16. Dependency graph and build tooling restoration strategy

### Цель

Определить, как восстанавливать `app/node_modules`, `tsc`, `tsc-alias`, Rollup, Storybook и runtime/build dependencies без закрытых корпоративных источников.

### Результат

`E-16` выполнен как strategy step.

Создан документ:

```text
docs/dependency-graph-restoration-strategy.md
```

Выбранный маршрут:

```text
primary: public npm install in a network-enabled local terminal/environment
fallback: prepared offline public package cache/archive with provenance
diagnostic-only fallback: prepared node_modules tree for local verification only
```

### Ключевое решение

Не подменять локальными fake-stubs:

- `typescript` / `tsc`;
- `tsc-alias`;
- Rollup и Rollup plugins;
- Storybook packages;
- `react`, `react-dom`;
- `styled-components`;
- complex UI mechanics вроде `antd-core`, `rc-*`, `@tanstack/*`, `@dnd-kit/*`.

### Следующий шаг

```text
E-17: подготовить executable public-only dependency restore runbook.
```

## E-17. Executable public-only dependency restore runbook

### Цель

Подготовить исполняемый runbook для восстановления `app/node_modules`, `tsc`, Rollup, Storybook и foundational runtime/build dependencies через допустимый public/offline-public route.

### Результат

`E-17` выполнен как runbook step.

Создан документ:

```text
docs/public-only-dependency-restore-executable-runbook.md
```

Runbook фиксирует:

- allowed public-only sources;
- forbidden closed corporate sources;
- protected files;
- allowed changed paths;
- preflight checks;
- Scenario A: public-network local terminal;
- Scenario B: offline public cache/package archive;
- stop conditions;
- rollback/cleanup;
- verification after restore;
- result recording template.

### Не выполнялось

- dependency install;
- build;
- Storybook;
- Docker;
- package publication;
- source edits;
- registry access.

### Следующий шаг

```text
E-18: выполнить public-only dependency restore attempt в допустимой среде или зафиксировать блокер выполнения.
```

## E-18. Public-only dependency restore attempt blocker

### Цель

Выполнить public-only restore по `docs/public-only-dependency-restore-executable-runbook.md` в допустимой среде или зафиксировать, почему это нельзя сделать сейчас.

### Результат

`E-18` выполнен как blocked execution check.

Созданы документы:

```text
docs/history/workflows/e18-public-restore-attempt.md
docs/offline-public-package-cache-checklist.md
```

### Что подтверждено

- Current Codex shell has restricted network access.
- Previous controlled public npm attempt already failed with `AggregateError [EACCES]`.
- E-17 explicitly says not to repeat current-shell public npm attempt without environment change.
- `app/node_modules` is still absent.
- `app/packages/tend-ui/dist` is still absent.
- `app/yarn-error.log` was not created.

### Не выполнялось

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source edits;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- access to closed corporate sources.

### Следующий шаг

```text
E-19: build offline-public dependency package manifest from local package files and yarn.lock.
```

## E-19. Offline-public dependency package manifest

### Цель

Собрать manifest прямых зависимостей из локальных `package.json` и `yarn.lock`, без установки, build, Storybook и сетевых запросов.

### Результат

`E-19` выполнен как manifest step.

Создан документ:

```text
docs/offline-public-dependency-package-manifest.md
```

### Что подтверждено

- scanned package files: 45 total, including root `app/package.json`;
- workspace package files: 44;
- unique direct dependencies: 118;
- local workspace/local compensation dependencies: 32;
- external public/offline-public candidates: 86;
- `app/yarn.lock` contains 1593 resolved entries and all point to `packages.samoletgroup.ru`;
- current lockfile URLs are not allowed as package sources.

### Не выполнялось

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source edits;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- access to closed corporate sources.

### Следующий шаг

```text
E-20: choose the restore execution route from the E-19 manifest.
```

## E-20. Restore execution route decision

### Цель

Выбрать, как именно двигаться после E-19 manifest: public-enabled install, offline-public package archive/cache или targeted compensation lane.

### Результат

`E-20` выполнен как route decision step.

Создан документ:

```text
docs/restore-execution-route-decision.md
```

### Выбранный маршрут

Primary route:

```text
Prepare an offline-public package archive/cache from the E-19 manifest, with provenance, then import it into the project only after review.
```

Secondary route:

```text
If the user runs the E-17 public-only restore command in a separate public-network local environment, record the result and import only reviewed artifacts.
```

Fallback route:

```text
Continue targeted local compensation only for packages whose missing mechanics are narrow, known and safe to replace locally.
```

### Не выполнялось

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source edits;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- access to closed corporate sources.

### Следующий шаг

```text
E-21: prepare offline-public package acquisition plan from the E-19 manifest.
```

## E-21. Offline-public package acquisition plan

### Цель

Подготовить конкретный acquisition plan для выбранного E-20 маршрута: offline-public package archive/cache with provenance.

### Результат

`E-21` выполнен как acquisition planning step.

Создан документ:

```text
docs/offline-public-package-acquisition-plan.md
```

### Что зафиксировано

Пакеты разделены на priority lanes:

- Lane 1: Build Tooling Minimum;
- Lane 2: Storybook And Vite Runtime;
- Lane 3: Foundational React Runtime;
- Lane 4: Type Packages Needed For Build;
- Lane 5: Complex UI Mechanics;
- Lane 6: Runtime Utilities And Service Support;
- Lane 7: Dev/Test/Release Tooling.

Для каждой группы зафиксированы source type и compensation rule.

### Не выполнялось

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source edits;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- access to closed corporate sources.

### Следующий шаг

```text
E-22: prepare offline-public archive manifest template and import staging runbook.
```

## E-22. Offline-public archive manifest template and import staging runbook

### Цель

Подготовить точный шаблон manifest для offline-public archive/cache и runbook безопасной приемки через staging.

### Результат

`E-22` выполнен как archive/import preparation step.

Созданы документы:

```text
docs/offline-public-archive-manifest-template.md
docs/offline-public-import-staging-runbook.md
```

### Что зафиксировано

- required archive manifest schema;
- allowed and forbidden source types;
- package checksum/provenance requirements;
- staging path `tmp/offline-public-archive-staging/`;
- protected files;
- validation report requirement;
- stop conditions before import.

### Не выполнялось

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source edits;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- archive import;
- access to closed corporate sources.

### Следующий шаг

```text
E-23: wait for or prepare a reviewed offline-public archive, then validate it in staging.
```

## E-23. Offline-public archive staging validation

### Цель

Проверить reviewed offline-public archive в staging перед любым import/install.

### Результат

`E-23` выполнен как blocked validation check.

Создан документ:

```text
docs/offline-public-archive-validation-report.md
```

Созданы staging folders:

```text
tmp/offline-public-archive-staging/
tmp/offline-public-archive-staging/inbox/
tmp/offline-public-archive-staging/extracted/
```

### Блокер

В `tmp/offline-public-archive-staging/inbox/` нет обязательных входов:

```text
offline-public-package-archive.*
offline-public-package-archive-manifest.json
checksums.sha256
```

### Не выполнялось

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source edits;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- archive import;
- access to closed corporate sources.

### Следующий шаг

```text
E-24: provide or create a reviewed offline-public archive, then rerun staging validation.
```

## E-24. Offline-public archive preparation request

### Цель

Предоставить или создать reviewed offline-public archive и повторить staging validation.

### Результат

`E-24` выполнен как blocked input step.

Создан документ:

```text
docs/offline-public-archive-preparation-request.md
```

### Блокер

Archive route остается заблокирован:

- `tmp/offline-public-archive-staging/inbox/` пустой;
- отсутствует `offline-public-package-archive.*`;
- отсутствует `offline-public-package-archive-manifest.json`;
- отсутствует `checksums.sha256`;
- текущая среда не имеет public network access для создания архива.

### Не выполнялось

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source edits;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- archive import;
- access to closed corporate sources.

### Следующий шаг

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-25. Local compensation lane decision

### Цель

Выбрать следующую узкую локальную компенсацию, пока offline-public archive route ожидает входные файлы.

### Результат

`E-25` выполнен как local compensation lane decision.

Создан документ:

```text
docs/local-compensation-lane-decision.md
```

### Выбранная lane

```text
LC-07: focused lodash helper audit
```

Это audit lane, не implementation lane.

### Почему выбрана

- lodash используется helper-by-helper;
- найден широкий, но структурированный набор импортов;
- замена возможна только после точного аудита поведения;
- foundation dependencies не затрагиваются.

### Не выполнялось

- dependency install;
- build;
- Storybook launch;
- Docker build;
- package publication;
- source edits;
- edits to `app/package.json`, `app/yarn.lock` or `app/.yarnrc`;
- lodash replacement;
- access to closed corporate sources.

### Следующий шаг

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## Ближайшие действия

- [x] `D-00` Создать отдельный workflow разблокировки.
- [x] `D-01` Проверить Yarn/Corepack и стратегию установки зависимостей.
- [!] `D-02` Выполнить первую диагностическую установку зависимостей.
- [x] `D-03` Классифицировать ошибки установки и выбрать маршрут для каждой группы зависимостей.
- [!] `D-03A` Выбрать и выполнить контролируемую стратегию восстановления dependency graph.
- [!] `D-04` Собрать ключевые пакеты.
- [!] `D-05` Запустить Storybook.
- [!] `D-06` Проверить базовые компоненты.
- [x] `D-07` Выбрать стратегию подключения к проекту-кандидату.
- [!] `D-08` Проверить минимальное подключение.
- [x] `D-09` Обновить основной workflow.

Следующий практический шаг после D-ветки:

- [x] `E-01 / DEC-01` Выбрать public/local route с запретом закрытых корпоративных источников.
- [x] `E-02` Составить карту источников зависимостей и механик: dependency, source route, local usage, affected package/component, missing mechanic, compensation route.
- [x] `E-03` Подготовить контролируемый public-only шаг восстановления зависимостей: exact command, registry boundary, allowed file changes, rollback rule.
- [!] `E-04` Выполнить контролируемую public-only диагностическую попытку восстановления зависимостей или остановиться до запуска, если публичные установки пока не выполняем.
- [x] `E-05` Выбрать способ получения публичных зависимостей при сетевом ограничении текущей среды.
- [x] `E-06` Подготовить backlog локальной компенсации и первые кандидаты на реализацию.
- [x] `E-07` Выбрать и реализовать первый low-risk срез локальной компенсации.
- [!] `E-08` Перепроверить build diagnostic после LC-03 или продолжить следующим low-risk срезом `LC-01`.
- [x] `E-09` Реализовать `LC-01` service auth mock boundary.
- [x] `E-10` Реализовать `LC-05` narrow query-string replacement или выбрать повторную диагностику.
- [x] `E-11` Реализовать `LC-04` class name helper.
- [x] `E-12` Выполнить scope check и реализовать `LC-06` uuid helper.
- [!] `E-13` Выполнить build diagnostic checkpoint после `LC-04` и `LC-06`.
- [x] `E-14` Определить локальную build-runner стратегию для nested plain `yarn` calls.
- [!] `E-15` Создать temporary local `yarn.cmd` shim и выполнить узкий build diagnostic checkpoint.
- [x] `E-16` Определить стратегию восстановления dependency graph и build tooling.
- [x] `E-17` Подготовить executable public-only dependency restore runbook.
- [!] `E-18` Выполнить public-only dependency restore attempt в допустимой среде или зафиксировать блокер выполнения.
- [x] `E-19` Build offline-public dependency package manifest from local package files and `yarn.lock`.
- [x] `E-20` Choose the restore execution route from the E-19 manifest.
- [x] `E-21` Prepare offline-public package acquisition plan from the E-19 manifest.
- [x] `E-22` Prepare offline-public archive manifest template and import staging runbook.
- [!] `E-23` Wait for or prepare a reviewed offline-public archive, then validate it in staging.
- [!] `E-24` Provide or create a reviewed offline-public archive, then rerun staging validation.
- [x] `E-25` Choose next local compensation lane while waiting for the offline-public archive.
- [x] `E-26` Audit lodash helper usage and define replacement slices.
- [x] `E-27` Implement `LC-07A` lodash object helper base.
- [x] `E-28` Implement `LC-07B` lodash collection helper base.
- [x] `E-29` Implement `LC-07C` lodash object filtering helper base.
- [!] `E-30` Re-run Storybook diagnostics after dependency/build tooling strategy is handled.
- [x] `E-31` Define complex runtime mechanic tasks if still needed.
- [!] `E-32` Run isolated React consumer smoke test when possible.
- [x] `F-01` Define the final unblock route for dependency graph, build, Storybook verification and GitHub-ready repository state.
- [x] `F-02` Repair or initialize the local Git repository state.
- [x] `F-03` Finalize the dependency graph acquisition path.
- [x] `F-04` Restore dependency graph through the selected approved path.
- [x] `F-04A` Prepare or provide the reviewed offline-public dependency archive input.
- [!] `F-04B` Validate the prepared offline-public archive input.
- [x] `F-04C` Repair the offline-public archive manifest and package paths.
- [!] `F-04D` Restore dependency graph from the validated offline-public archive.
- [x] `F-04E` Expand the offline-public archive to include required transitive packages from the lockfile closure.
- [!] `F-04F` Restore dependency graph from offline-public archive v2 and diagnose local workspace resolution blockers.
- [x] `F-04G` Align local `@10d` workspace dependency ranges for offline restore.
- [!] `F-05` Run package build verification.
- [x] `F-05A` Fix local build graph blockers and rerun package builds.

## E-26. Lodash helper usage audit

### Goal

Audit actual `lodash` usage before any local replacement implementation.

### Result

`E-26` is complete as a documentation/audit step.

Created:

```text
docs/lodash-helper-audit.md
```

Static scan found direct lodash usage in 84 files.

First implementation slice:

```text
LC-07A: omit, pick, identity, isNil, isString
```

High-risk helpers remain deferred:

- `isEqual`;
- `merge`;
- `debounce`.

### Not Done

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no local `lodash` implementation yet;
- no access to closed corporate sources.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-28. LC-07B lodash collection helper replacement

### Goal

Implement the second narrow local lodash helper slice.

### Result

`E-28` is complete.

Updated:

```text
app/packages/lodash/
docs/lodash-lc07b-helper-replacement.md
```

Covered helpers:

```text
chunk, uniq, groupBy, mapValues
```

Deferred helpers include `pickBy`, `omitBy`, `isEmpty`, `uniqBy`, `isEqual`, `merge` and `debounce`.

### Verification

Direct local Node helper check passed.

### Not Done

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no access to closed corporate sources.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## E-27. LC-07A lodash object helper replacement

### Goal

Implement only the first safe local lodash helper slice.

### Result

`E-27` is complete.

Created:

```text
app/packages/lodash/
app/packages/types-lodash/
docs/lodash-lc07a-helper-replacement.md
```

Covered helpers:

```text
omit, pick, identity, isNil, isString
```

Deferred helpers include `groupBy`, `mapValues`, `isEqual`, `merge` and `debounce`.

### Verification

Direct local Node helper check passed.

### Not Done

- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no component source edits;
- no access to closed corporate sources.

### Next Step

```text
F-04C: repair the offline-public archive manifest and package paths.
```

## F-05. Package build verification

### Goal

Run package build verification after dependency graph restoration and record whether the design-system packages produce usable `dist` output.

### Result

`F-05` is complete as a diagnostic build gate and has status `[!]`.

Created:

```text
docs/history/workflows/f05-package-build-verification.md
```

Build result:

```text
@10d/tend-ui-tokens: passed
@10d/tend-ui-theme: blocked
@10d/tend-ui-icons: blocked
@10d/tend-ui-primitives: blocked
@10d/tend-ui: blocked
```

`app/packages/tend-ui-tokens/dist` now exists. The other checked package `dist` folders are still absent.

### Main Blockers

- internal aliases in package `tsconfig.base.json` point to sibling package `dist` folders that do not exist yet;
- `lodash/debounce`, `lodash/merge` and `lodash/isEqual` subpath imports still fail TypeScript resolution in build context;
- after module resolution gets further, several narrow TypeScript strictness errors appear.

### Not Done

- no dependency install;
- no Storybook launch;
- no Docker build;
- no package publication;
- no consumer project connection;
- no access to closed corporate sources.

### Next Step

```text
F-05A: fix local build graph blockers for hooks, styling, icons and lodash subpath imports, then rerun package build verification.
```

## F-05A. Local build graph fixes

### Goal

Fix the local build graph blockers found in `F-05` and rerun the main/key package builds.

### Result

`F-05A` is complete and has status `[x]`.

Created:

```text
docs/history/workflows/f05a-local-build-graph-fixes.md
```

Implemented:

- local `lodash/debounce`;
- local `lodash/merge`;
- local `lodash/isEqual`;
- broader local `pick` and `omit` type overloads for generic object-like values;
- portable typed wrapper for `ErrorStepIcon` declaration build.

Builds passed:

```text
corepack yarn build:utils
corepack yarn build:types
corepack yarn build:hooks
corepack yarn build:styling
corepack yarn build:icons
corepack yarn build:theme
corepack yarn build:primitives
corepack yarn build:main
```

Confirmed `dist` outputs:

```text
app/packages/tend-ui-utils/dist
app/packages/tend-ui-types/dist
app/packages/tend-ui-hooks/dist
app/packages/tend-ui-styling/dist
app/packages/tend-ui-icons/dist
app/packages/tend-ui-theme/dist
app/packages/tend-ui-primitives/dist
app/packages/tend-ui-tokens/dist
app/packages/tend-ui/dist
```

### Not Done

- no Storybook launch;
- no Docker build;
- no package publication;
- no consumer project connection;
- no access to closed corporate sources.

### Next Step

```text
F-06: run Storybook verification.
```
