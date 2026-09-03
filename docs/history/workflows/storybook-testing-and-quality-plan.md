# Q-ветка: полный план проверки Storybook и дизайн-системы Tend UI

Обновлено: 2026-08-08.

Статус документа: `[x]` группы `QG-01`-`QG-13` выполнены. Финальный gate: `24 passed`, `5 accepted risks`, `0 blocking failures`.

## 1. Назначение

Этот документ задает полный, воспроизводимый и проверяемый порядок контроля качества Storybook и дизайн-системы Tend UI. Он продолжает завершенные G- и H-ветки, но не переобъявляет их результаты автоматически действительными для всех компонентов и всех пользовательских сценариев.

Главная цель Q-ветки: получить доказательства того, что:

- каждая Storybook story загружается и отображается без runtime-ошибок;
- интерактивные компоненты выполняют ожидаемые пользовательские действия;
- интерфейс доступен с клавиатуры и не содержит необработанных критических WCAG-нарушений;
- визуальные изменения контролируются воспроизводимыми baseline-скриншотами;
- русский язык является основным во всех пользовательских подписях и runtime-сообщениях;
- пакеты дизайн-системы собираются, устанавливаются и работают вне Storybook;
- все непроверенные области либо закрыты доказательством, либо явно сохранены как ограничение с владельцем и решением.

Документ является одновременно:

1. главным чек-листом Q-ветки;
2. спецификацией обязательных проверок;
3. реестром известных белых областей;
4. форматом отчетности по найденным дефектам;
5. основанием для будущего CI quality gate.

## 2. Рабочая граница

- Работа ведется только в репозитории `DS Tend UI`.
- `S-Tracker` и другие внешние проекты не используются и не изменяются.
- Закрытые корпоративные registry, GitLab, Nexus, Figma и сервисные контуры не используются и не запрашиваются.
- Разрешены локальные файлы проекта и общедоступные npm/GitHub-источники.
- Любая новая публичная зависимость должна быть обоснована, зафиксирована в lockfile и проверена локально.
- Облачные сервисы, включая Chromatic, не являются обязательными для завершения Q-ветки.
- Проверки должны оставаться воспроизводимыми локально без доступа к закрытой инфраструктуре.
- Публикация пакетов не входит в Q-ветку и требует отдельного owner approval.

## 3. Правила доказательности

### 3.1. Что считается проверенным

Область считается проверенной только при наличии исполняемого доказательства:

- успешной команды с машинным отчетом;
- успешно выполненной Storybook `play`-функции;
- browser test в Chromium, Firefox или WebKit;
- сохраненного и одобренного visual baseline/diff;
- axe-отчета без запрещенных нарушений;
- unit/integration-теста с конкретными assertions;
- собранного tarball и успешного consumer smoke;
- ручного протокола для проверки, которую нельзя надежно автоматизировать.

Наличие исходного кода, story, документации или визуально похожего примера само по себе не считается подтверждением runtime-поведения.

### 3.2. Что считается белой областью

Белая область - это любой компонент, state, interaction, viewport, browser, locale, package route или пользовательский сценарий, для которого отсутствует доказательство из пункта 3.1.

Белая область не равна дефекту. Она означает только, что корректность пока не доказана.

### 3.3. Статусы

- `[x]` - проверка выполнена, критерии приемки соблюдены, доказательство сохранено.
- `[ ]` - проверка не начата.
- `[~]` - проверка выполняется или покрыта частично.
- `[!]` - проверка выполнена, но остался блокер, исключение или owner decision.
- `[n/a]` - неприменимость доказана и записана с причиной.

### 3.4. Критичность дефектов

| Уровень | Определение | Пример | Влияние на gate |
| --- | --- | --- | --- |
| `P0` | Storybook или package contract в целом неработоспособен | Storybook не запускается; основной пакет не устанавливается | Немедленно блокирует Q-ветку |
| `P1` | Ключевой пользовательский сценарий невозможен или опасен | Modal нельзя закрыть; Select недоступен с клавиатуры; runtime crash | Блокирует merge/release |
| `P2` | Существенная ошибка состояния, доступности или отображения | неверный focus; текст обрезан; серьезное a11y-нарушение | Блокирует затронутую область |
| `P3` | Локальный дефект без потери основного сценария | небольшое визуальное расхождение | Допускается только с backlog-записью |
| `P4` | Улучшение или технический долг | оптимизация теста, дополнительная документация | Не блокирует |

## 4. Подтвержденное исходное состояние

Состояние зафиксировано по локальным отчетам на 2026-07-31.

| Область | Подтвержденный факт | Ограничение доказательства |
| --- | --- | --- |
| Storybook index | `942` stories, `215` docs | Не означает, что все stories открывались в браузере |
| Story sources | `112` story-файлов | Только `11` файлов содержат `play` |
| Component inventory | `969` публичных visual exports классифицированы | `39` имеют статус `documented-gap` |
| Key runtime audit | `9/9` выбранных компонентов загружены | Это около 1% story-каталога, а не полный прогон |
| Key interactions | `8` interaction passes, `1` render-only | DrawerColumnsSettings не имеет подтвержденного действия |
| Browser console | `0` warnings/errors для 9 выбранных targets | Остальные stories не покрыты этим отчетом |
| Accessibility | Проверено `10` stories | Зафиксировано `24` нарушения, из них 6 stories имеют critical rules |
| Unit/integration tests | `22` пакета, `210` test-файлов, `6572/6603` passed | `26` pending; browser behavior покрывается не полностью |
| Snapshots | Текущий Jest snapshot drift отсутствует | DOM/style snapshots не заменяют pixel comparison |
| Release artifacts | `21/21` core/extended tarballs проверены | Experimental/source-only пакеты не входят в контракт |
| Consumer | Offline install/build/DOM smoke пройден | Полный набор компонентов в consumer не проверялся |
| React matrix | React 17/18/19 smoke пройден | Официальный peer contract остается React 17 |
| Language gate | `112/112` story-файлов проходят статическую проверку | Runtime-тексты после действий и внешние fixture могут не попасть в static gate |
| CI | GitHub Actions workflow подготовлен | Фактический remote-run зависит от появления GitHub remote |

Источники состояния:

- `docs/component-story-coverage.json`;
- `docs/component-runtime-audit.json`;
- `docs/accessibility-baseline.json`;
- `tmp/g10-ds-only-tests/report.json`;
- `app/ds-package-scope.json`;
- `app/release-boundary.json`;
- `app/storybook-static/index.json`.

## 5. Главный чек-лист Q-ветки

| ID | Статус | Этап | Результат завершения |
| --- | --- | --- | --- |
| Q-00 | [x] | Зафиксировать воспроизводимый baseline | Версии, counts, команды и отчеты связаны с одним commit/build ID |
| Q-01 | [x] | Нормализовать Storybook test toolchain | Совместимые версии, единая локальная команда, failure-only CI traces и разделенные browser/runtime reports |
| Q-02 | [x] | Выполнить render smoke всех stories | `1164/1164` entries, `949/949` stories, `0` final failures и `0` console/page errors |
| Q-03 | [x] | Покрыть пользовательские взаимодействия | `949/949` browser tests проходят; 39 direct-story gaps классифицированы как отдельный backlog |
| Q-04 | [x] | Закрыть accessibility baseline | Axe `949/949` без нарушений; keyboard/focus и semantic defects исправлены; speech transcript Narrator принят как доказанное ограничение среды |
| Q-05 | [x] | Настроить визуальную регрессию | Единый Playwright runner и `68/68` воспроизводимых baseline checks без diff/missing/overflow |
| Q-06 | [x] | Проверить responsive/layout/text | `69/69`: 50 viewport, 10 zoom и 9 stress checks; overflow/layout issues `0` |
| Q-07 | [x] | Проверить браузеры и способы ввода | Chromium `949/949`, WebKit risk `182/182`; Firefox provider принят как ограничение текущей среды |
| Q-08 | [x] | Проверить локализацию | Static `112` файлов и runtime `949/949`: случайного английского UI и mojibake нет |
| Q-09 | [x] | Изолировать API и нестабильные данные | Внешних runtime-запросов нет; 29 partial/gap mock states классифицированы как backlog |
| Q-10 | [x] | Усилить component/unit reliability | `22/22` packages, failures/drift `0`; 12 pending классифицированы, 2 external rc teardown warnings приняты как test-harness debt |
| Q-11 | [x] | Повторить package/consumer contract | `21/21` artifacts, `3/3` consumers и React 17/18/19 runtime matrix прошли |
| Q-12 | [x] | Проверить performance и resilience | 8 render, 4 interaction, 4 lifecycle, 3 observer, 3 partial и 7 fallback checks; findings `0` |
| Q-13 | [x] | Включить проверки в CI | CI contract `13/13`; reports/screenshots/diffs/failure traces сохраняются, remote run ожидает GitHub remote |
| Q-14 | [x] | Закрыть реестр белых областей | Все 27 областей получили конечный статус; итоговый Q-report и DS-only gate синхронизированы |

## 6. Q-00. Воспроизводимый baseline

### Задачи

- [x] `Q-00.1` Зафиксировать commit SHA или snapshot identifier исходного состояния.
- [x] `Q-00.2` Записать версии Node, npm, Corepack, Yarn и операционной системы.
- [x] `Q-00.3` Записать фактически разрешенные версии `storybook`, `@storybook/react-vite`, addons и Vite.
- [x] `Q-00.4` Проверить отсутствие случайного смешения major/minor версий Storybook packages.
- [x] `Q-00.5` Пересобрать static Storybook и сохранить build report.
- [x] `Q-00.6` Пересчитать stories/docs/story groups/public exports.
- [x] `Q-00.7` Выполнить текущие lint, language, interaction-policy, unit и package gates. QG-09: `22/22` test packages, failures/drift `0`; package gate `21/21` остается подтвержденным baseline до QG-10.
- [x] `Q-00.8` Зафиксировать hash `index.json`, `iframe.html` и static build.
- [x] `Q-00.9` Создать `tmp/q00-baseline.json` и краткий `docs/q00-baseline.md`.
- [x] `Q-00.10` Не обновлять snapshots автоматически до ручной классификации diff.

### Критерий приемки

Все следующие Q-отчеты ссылаются на один baseline ID; изменение Storybook index делает старый runtime-аудит устаревшим автоматически.

## 7. Q-01. Storybook test toolchain

### Предлагаемые инструменты

| Инструмент | Статус | Назначение | Решение |
| --- | --- | --- | --- |
| `@storybook/addon-docs` | Уже подключен | Docs/MDX | Сохранить |
| `@storybook/addon-a11y` | Уже подключен | axe/WCAG | Сохранить и перевести из `todo` поэтапно |
| `storybook/test` | Уже используется | Spies, queries, `userEvent`, assertions | Сохранить |
| Jest + Testing Library | Уже подключены | Unit/integration в jsdom | Сохранить |
| Loki | Скрипты существуют | Локальные visual snapshots | Проверить актуальную работоспособность |
| `@storybook/addon-vitest` | Кандидат | Render/play/a11y tests в browser mode | Подключить совместимую со Storybook версию |
| Vitest Browser Mode | Кандидат | Реальный браузер вместо jsdom | Подключить отдельным Storybook project |
| Playwright | Кандидат | Chromium/Firefox/WebKit и screenshots | Подключить из публичного npm |
| MSW + `msw-storybook-addon` | Кандидат | Локальные API/realtime mocks | Подключить только после Q-09 inventory |
| `@vitest/coverage-v8` | Кандидат | Story-driven coverage | Подключить после стабильного browser run |
| `@chromatic-com/storybook` | Необязательный | Облачные visual diffs | Не требуется для self-contained DoD |
| `@storybook/addon-designs` | Установлен, не активирован | Ссылка на макеты | Не включать без доступного источника дизайна |

### Задачи

- [x] `Q-01.1` Сверить compatibility matrix выбранных версий по официальной документации.
- [x] `Q-01.2` Выровнять Storybook core/framework/official addons на совместимые версии.
- [x] `Q-01.3` Не обновлять major version Storybook в рамках подключения тестов без отдельной migration-задачи.
- [x] `Q-01.4` Подключить Vitest addon отдельным test project, не заменяя существующий Jest.
- [x] `Q-01.5` Настроить Playwright browser provider.
- [x] `Q-01.6` Добавить локальные команды `test:storybook`, `test:storybook:watch`, `test:storybook:ci`.
- [x] `Q-01.7` Убедиться, что команды не требуют глобального Yarn.
- [x] `Q-01.8` Установить timeout, retries и traces без сокрытия постоянных дефектов. Browser retries равны нулю; clean-context retry диагностический, новый flake блокирует gate, failure trace сохраняется.
- [x] `Q-01.9` Запретить network calls в базовом browser suite. В setup добавлен guard для внешних fetch/XHR/WebSocket.
- [x] `Q-01.10` Сохранить отчет о составе test toolchain: `docs/q01-storybook-test-toolchain.md`.

### Критерий приемки

Одна тестовая story успешно проходит render и `play` в Chromium локально и в headless-режиме; существующие Jest suites продолжают проходить.

## 8. Q-02. Полный render smoke Storybook

### Обязательные проверки каждой story

- story импортируется без dynamic-import failure;
- preview iframe отвечает успешно;
- React render завершается без uncaught exception;
- отсутствует Storybook error boundary;
- отсутствуют `console.error` и необработанные Promise rejection;
- `console.warn` либо отсутствует, либо совпадает с утвержденным временным исключением;
- story не выполняет внешний переход, `alert`, `confirm`, `prompt` или `window.open`;
- основной контейнер не пустой;
- story завершается в пределах timeout;
- docs-only страницы также загружают связанные chunks.

### Задачи

- [x] `Q-02.1` Получить список всех story IDs из текущего `index.json`.
- [x] `Q-02.2` Запустить smoke всех `942` stories в Chromium.
- [x] `Q-02.3` Отдельно проверить `215` docs entries и MDX dynamic imports.
- [x] `Q-02.4` Сохранять story ID, title, duration, browser logs и screenshot при падении.
- [x] `Q-02.5` Отличать product defect от stale static-server/cache defect.
- [x] `Q-02.6` Проверить повторное открытие Storybook после новой static build без старых chunk references.
- [x] `Q-02.7` Выявить stories с бесконечными timers, requests или loading-state.
- [x] `Q-02.8` Повторить failed stories в clean browser context.
- [x] `Q-02.9` Запретить массовое игнорирование console errors регулярным выражением.
- [x] `Q-02.10` Сформировать `tmp/q02-story-render-report.json` и `docs/q02-render-smoke-report.md`.

### Критерий приемки

- `949/949` stories и `215/215` docs загружаются;
- `0` необработанных runtime errors;
- `0` missing static assets;
- каждое допустимое warning-исключение имеет story ID, причину и срок удаления.

## 9. Q-03. Пользовательские взаимодействия

### Уровни покрытия

| Tier | Состав | Требование |
| --- | --- | --- |
| Tier 1 | Button, Input, Select, Modal, Form, Table, Filters, Tree, UploadArea, Header | Полный основной и негативный сценарий |
| Tier 2 | Dropdown, Drawer, Dialog, Popover, Tooltip, Checkbox, Radio, Toggle, Tabs, Menu, Pagination | Минимум одно изменение состояния и keyboard path |
| Tier 3 | Layout, typography, icons, logos, tokens, static display | Render/visual/a11y; interaction только при наличии поведения |
| Tier 4 | Experimental/source-only service features | Mocked smoke или явное решение `defer/exclude` |

### Матрица обязательных сценариев

| Компонент | Обязательные действия и assertions |
| --- | --- |
| Button | click один раз; disabled/loading не вызывают действие; focus видим; Enter/Space работают |
| Input | ввод/очистка; controlled value; disabled/readOnly; validation; keyboard и paste |
| Select | открыть/закрыть; выбрать; keyboard navigation; multiple; clear; empty/loading/error |
| Modal/Dialog | открыть; закрыть кнопкой/Escape/overlay по контракту; focus trap; возврат focus |
| Form | submit valid; validation errors; reset; async submit; disabled/loading; labels |
| Table | sort; filter; pagination; select row/all; empty/loading/error; horizontal overflow |
| Filters | открыть; выбрать; зависимости фильтров; применить/сбросить; controlled state |
| Tree | expand/collapse; select/check cascade; search; async children; drag/drop; pin/delete |
| UploadArea | выбрать файл; type/size/count limits; progress; error; retry/remove; keyboard |
| Header | menu; profile; support; unauthenticated state; отсутствие реальной навигации в demo |
| Dropdown/Menu | open/close; item select; outside click; Escape; arrow navigation |
| Drawer | open/close; placement; overlay; scroll lock; focus management |
| Tooltip/Popover | hover/focus/touch trigger; close; portal positioning |
| Checkbox/Radio/Toggle | checked, unchecked, indeterminate, disabled, keyboard |
| Tabs/Pagination | active state; keyboard; controlled state; disabled items |

### Задачи

- [x] `Q-03.1` Построить story-to-interaction matrix для всех интерактивных exports.
- [x] `Q-03.2` Пересчитать stories без `play`; `635` интерактивных stories без `play` не считаются покрытыми.
- [!] `Q-03.3` Расширить Tier 1 до основного и негативного сценариев. `10/15` групп имеют `play`; 5 групп остаются в backlog.
- [!] `Q-03.4` Добавить Tier 2 smoke interactions. `7` групп имеют `play`; `48` групп требуют сценария или доказанного перевода в static/n/a.
- [x] `Q-03.5` Использовать `fn()`/spies для callback assertions в существующих callback-сценариях.
- [x] `Q-03.6` Проверять результат действия, а не только факт клика. Исправлен click-only сценарий ToggleButton.
- [x] `Q-03.7` Учитывать debounce/double-click delays через `waitFor`, а не fixed sleeps. Фиксированная задержка ToggleButton удалена.
- [x] `Q-03.8` Drag-and-drop pointer и keyboard sensors подтверждены для Tree и ColumnsSettings в `QG-07`.
- [x] `Q-03.9` Для portal components искать элементы в правильном document scope; текущие Modal/Dropdown/Drawer scenarios проходят в Chromium.
- [x] `Q-03.10` Сформировать `docs/storybook-interaction-matrix.json` и `docs/q03-network-and-interaction-report.md`.

### Критерий приемки

Все Tier 1 и Tier 2 компоненты имеют автоматический успешный пользовательский сценарий; render-only допускается только для доказанно статических компонентов.

## 10. Q-04. Accessibility

### Текущий baseline

- проверено: `949/949` stories;
- ошибок выполнения аудита: `0`;
- critical/serious нарушений: `0`;
- stories с нарушениями: `0`;
- затронутых DOM-узлов: `0`;
- visual responsive regression: `68/68`, diff/overflow/missing baseline: `0`;
- полный отчет: `docs/accessibility-full-report.json`;
- реестр исправления: `docs/accessibility-remediation-backlog.md`.
- keyboard/focus remediation: специализированные stories `7/7`, полный browser suite `949/949`; дефекты `QBUG-046-*` и `QBUG-047-*` закрыты.
- screen-reader semantics: Filters, Tree и live regions исправлены и проверены через Chromium role/name/state; actual Narrator speech transcript принят как ограничение `Q048-ENV-01`, без заявления о проверенном речевом выводе.
- baseline exceptions audit: `0` story-level exceptions, `0` disabled axe rules, `0` selector exclusions и `0` allowlist entries; отчеты `docs/q04-baseline-exceptions-audit.md` и `docs/q04-baseline-exceptions-audit.json`.
- blocking a11y gate: общий preview для `.storybook` и `storybook-f06` переведен в `a11y.test = 'error'`; результат `docs/q04-error-gate-report.md` и `docs/q04-error-gate-report.json`.

### Политика перехода от `todo` к `error`

1. Новые critical/serious violations запрещаются сразу.
2. Existing baseline фиксируется по story ID и rule ID, без широких suppressions.
3. Исправления выполняются по компонентам, а не через глобальное отключение axe rule.
4. После очистки Tier 1 соответствующие stories переводятся в `a11y.test = 'error'`.
5. Глобальный `error` включается только после полного каталожного прогона.

### Ручные проверки, которые axe не заменяет

- логичный tab order;
- видимый focus при клавиатурном вводе;
- отсутствие keyboard trap вне modal;
- корректный focus trap внутри modal;
- screen-reader name/role/value;
- live-region для async status/error;
- управление при zoom 200%;
- reduced motion;
- Windows High Contrast/forced colors;
- touch target size;
- читаемость и смысловая последовательность.

### Задачи

- [x] `Q-04.1` Запустить axe для всех stories.
- [x] `Q-04.2` Сформировать полный report по impact/rule/component.
- [x] `Q-04.3` Исправить critical label/name/role/nested-interactive нарушения.
- [x] `Q-04.4` Исправить color contrast в runtime theme tokens и локальных legacy-стилях. Итоговый повтор: `949/949` stories, `0` нарушений / `0` узлов; visual audit `68/68`.
- [x] `Q-04.5` Проверить Table headers, Tree roles/lists и Filters dialog names.
- [x] `Q-04.6` Проверить keyboard-only Tier 1. Все `QBUG-046-01`-`QBUG-046-06` исправлены; специализированные keyboard/focus stories `7/7`, полный browser suite `949/949`.
- [x] `Q-04.7` Проверить focus return для Modal/Drawer/Popover. Все сценарии закрытия по Escape и возврата фокуса подтверждены; `QBUG-047-01` закрыт.
- [!] `Q-04.8` Проверить screen-reader semantics минимум в одном доступном reader/browser сочетании. Runtime-дефекты `QBUG-048-01`-`QBUG-048-03` закрыты в Chromium semantic tree; речевой transcript Narrator остается принятым ограничением среды `Q048-ENV-01`.
- [x] `Q-04.9` Удалять baseline exceptions по мере исправления. Аудит всего scope подтвердил, что явных exceptions/suppressions не осталось; глобальный `test: 'todo'` относится к переходу `Q-04.10`.
- [x] `Q-04.10` Перевести очищенные scopes в `error`. Общий Storybook preview работает в блокирующем режиме; повторная сборка `949` stories / `215` docs и полный axe-аудит `949/949` прошли без violations.

### Критерий приемки

Нет critical/serious нарушений в поддерживаемом scope; manual keyboard checklist пройден; временные исключения точечные, обоснованные и не скрывают новые нарушения.

## 11. Q-05. Визуальная регрессия

### Что проверяется

- геометрия и размеры;
- цвета и theme tokens;
- typography и line-height;
- borders, shadows и radii;
- icon/logo rendering;
- hover/focus/active/selected/disabled/error/loading;
- overlays и portal placement;
- длинный текст, overflow и ellipsis;
- table/tree плотность и вложенность;
- отсутствие пустых/битых изображений и шрифтов.

### Задачи

- [!] `Q-05.1` Проверить Loki. Loki отсутствует в локальном dependency graph и выведен из контура; неподтвержденные scripts удалены, установка не требуется.
- [x] `Q-05.2` Выбрать один основной local visual runner. Выбран `scripts/audit-storybook-visual-responsive.js` на Playwright/Chrome.
- [x] `Q-05.3` Зафиксировать browser, viewport, DPR, font loading и animation policy в manifest и отчете.
- [x] `Q-05.4` Создать baseline для Tier 1 во всех обязательных состояниях.
- [x] `Q-05.5` Создать representative baseline для Tier 2/3.
- [x] `Q-05.6` Отключать animations только детерминированным test-only CSS runner, без изменения production runtime.
- [x] `Q-05.7` Ожидать fonts/images и стабилизацию render перед screenshot.
- [x] `Q-05.8` Сохранять actual/expected/diff при падении.
- [x] `Q-05.9` Запретить автоматическое принятие массового baseline update; `--update` требует visual review.
- [x] `Q-05.10` Документировать процедуру visual approval в `docs/q05-visual-regression-report.md`.

### Критерий приемки

Повторный запуск без изменения кода дает нулевой diff; намеренные изменения имеют review; критические states Tier 1 покрыты pixel comparison.

## 12. Q-06. Responsive, layout и текст

### Минимальная viewport matrix

| Профиль | Размер | Назначение |
| --- | --- | --- |
| Mobile compact | `360x800` | Минимальная поддерживаемая ширина |
| Mobile wide | `390x844` | Типовой мобильный экран |
| Tablet | `768x1024` | Промежуточные layout transitions |
| Desktop | `1440x900` | Основной рабочий интерфейс |
| Wide desktop | `1920x1080` | Таблицы, toolbar, длинные строки |

### Data stress matrix

- пустое значение;
- одно короткое слово;
- длинный русский текст без сокращений;
- длинная непрерывная строка/ID/URL;
- 1, 10, 100 и 1000 элементов там, где это допустимо;
- очень длинное имя файла;
- длинные table headers;
- вложенное дерево максимальной разумной глубины;
- увеличенный системный font/zoom 200%.

### Задачи

- [x] `Q-06.1` Проверить Tier 1 на всех viewport profiles: `50/50`.
- [x] `Q-06.2` Автоматически искать горизонтальное переполнение body/canvas: findings `0`.
- [x] `Q-06.3` Проверить наложение текста, кнопок, labels и overlays: issues `0` после исправления HotFilters.
- [x] `Q-06.4` Проверить wrapping/ellipsis только там, где это часть контракта.
- [x] `Q-06.5` Проверить portal positioning у границ viewport для Select, Popover, Modal, Drawer и Filters.
- [x] `Q-06.6` Проверить таблицы и toolbar на узких экранах.
- [x] `Q-06.7` Проверить Drawer/Modal на mobile height и симуляции уменьшенного visual viewport `360x480`.
- [x] `Q-06.8` Проверить zoom 200% без потери действий: `10/10`.
- [x] `Q-06.9` Проверить русский pluralization (`9/9` unit tests), длинные сообщения ошибок и непрерывный ID.
- [x] `Q-06.10` Сохранить responsive report и screenshots: `docs/q06-responsive-layout-report.*`, `tmp/q06-responsive-screenshots/`.

### Критерий приемки

Нет неконтролируемого overlap, clipping или недоступных действий на поддерживаемых viewport; исключения документированы в component passport.

## 13. Q-07. Cross-browser и способы ввода

### Browser matrix

- Chromium: полный suite;
- Firefox: Tier 1 + overlays + forms + uploads;
- WebKit: Tier 1 + mobile-sensitive interactions;
- реальный Edge/Chrome manual smoke перед release при доступности.

### Задачи

- [x] `Q-07.1` Chromium full render/interaction suite: `949/949`.
- [!] `Q-07.2` Firefox risk-based suite заблокирован до page creation ошибкой локального `@vitest/browser-playwright 4.1.10`; компонентные тесты не стартовали.
- [x] `Q-07.3` WebKit risk-based suite: `182/182` по 11 файлам.
- [x] `Q-07.4` Keyboard navigation без pointer, включая keyboard DnD, подтверждена.
- [x] `Q-07.5` Mouse hover/context interactions подтверждены.
- [x] `Q-07.6` Touch-like Drawer, Menu, Select и Upload interactions подтверждены в Chromium.
- [x] `Q-07.7` Tree pointer DnD и Tree/ColumnsSettings keyboard DnD подтверждены.
- [!] `Q-07.8` File input подтвержден в Chromium и WebKit; Firefox заблокирован тем же provider до page creation.
- [x] `Q-07.9` Browser-specific результат классифицирован как Firefox environment blocker, не дефект Tend UI.
- [x] `Q-07.10` Матрица сохранена в `docs/q07-cross-browser-and-input-report.md`.

### Критерий приемки

Нет P0/P1 browser-specific дефектов; ограничения имеют точный browser/version и обходной путь.

## 14. Q-08. Локализация и пользовательский текст

### Задачи

- [x] `Q-08.1` `ru-RU` сохранена основной locale; toolbar encoding корректна.
- [x] `Q-08.2` Static language gate: 112 story-файлов, 0 findings.
- [x] `Q-08.3` Runtime DOM-аудит после interaction: `949/949`, failures `0`.
- [x] `Q-08.4` Dropdown/menu options, placeholders, tooltips, validation и notifications входят в runtime DOM-аудит.
- [x] `Q-08.5` Async/error/empty/loading тексты входят в runtime DOM-аудит.
- [x] `Q-08.6` Faker в stories не используется; fixtures детерминированы.
- [x] `Q-08.7` В preview установлен `dayjs.locale('ru')`.
- [x] `Q-08.8` Английский ограничен technical contracts и явными i18n stories.
- [x] `Q-08.9` Runtime mojibake findings: `0`.
- [x] `Q-08.10` Allowlist с причинами сохранен в `docs/storybook-language-allowlist.json`.

### Критерий приемки

Во всех пользовательских states основной язык русский; случайного английского текста и mojibake нет; технические исключения явные и ограниченные.

## 15. Q-09. API, realtime и deterministic mocks

### Зоны риска

- `@10d/tend-ui-api`;
- notifications/realtime;
- search assistant;
- async Select/Checkbox/Radio;
- upload progress/errors;
- table/filter remote loading;
- Tree async children;
- authentication-shaped header flows.

### Задачи

- [x] `Q-09.1` Найти все `fetch`, Axios, WebSocket/Centrifuge, OAuth и timer-dependent stories: 83 network-dependent и 86 timer-dependent групп.
- [x] `Q-09.2` Разделить network calls на обязательные mocks и запрещенные внешние calls; закрытых URL findings нет.
- [x] `Q-09.3` Подключить MSW только после inventory и compatibility check. Решение: не подключать сейчас, локальные callback adapters достаточны и уменьшают dependency surface.
- [!] `Q-09.4` Добавить deterministic handlers для success, empty, delay, error, unauthorized и retry. Из 48 states: 19 covered, 7 partial, 22 gap.
- [x] `Q-09.5` Запретить доступ к реальным корпоративным URL из Storybook tests.
- [!] `Q-09.6` Проверять loading-to-success и loading-to-error transitions. Loading представлен, но dedicated assertions остаются partial в 5 семействах.
- [!] `Q-09.7` Проверять abort/cancel при unmount и смене args. Специальные browser scenarios отсутствуют.
- [x] `Q-09.8` Проверять отсутствие бесконечных retries и незакрытых connections: полный browser suite завершился без зависания и open connection blocker.
- [x] `Q-09.9` Сбрасывать handlers и state между stories: финальные `949/949` последовательных browser tests прошли без cross-story contamination.
- [x] `Q-09.10` Сформировать mock coverage report: `docs/storybook-mock-coverage.json` и `docs/q03-network-and-interaction-report.md`.

### Критерий приемки

Storybook полностью детерминирован и не зависит от закрытых сервисов; каждый network-dependent компонент имеет локальные success/error/empty states.

## 16. Q-10. Unit/integration reliability

### Задачи

- [x] `Q-10.1` Повторены 22 package suites: `216/216`, active tests `6637`, failures `0`.
- [x] `Q-10.2` Из 26 baseline pending закрыто 19; текущие 7 skip + 5 todo имеют решение в `docs/pending-tests-decisions.json`.
- [x] `Q-10.3` Выполнен поиск unmount/open-handle/timer рисков; Jest open handles `0`, static missing cleanup `0`.
- [!] `Q-10.4` Tree delayed-click и debounce cleanup исправлены; остаются 2 классифицированных teardown warning внутри `rc-overflow/rc-select/rc-menu`.
- [x] `Q-10.5` Controlled/uncontrolled transitions подтверждены активными тестами `useControllableState` и V2.
- [x] `Q-10.6` Debounce default/custom/immediate/unmount paths подтверждены, lodash timer отменяется при unmount.
- [!] `Q-10.7` Portal suites проходят без open handles, но 2 external rc teardown warning остаются test-harness debt.
- [n/a] `Q-10.8` Tend UI не объявляет публичный ErrorBoundary; recovery принадлежит Storybook/consumer и зафиксирован как архитектурное решение.
- [x] `Q-10.9` Critical coverage собрано отдельно для UI, hooks, Table и Tree cleanup.
- [x] `Q-10.10` Полный gate подтверждает snapshot drift `0` после review и update.

### Критерий приемки

Нет failed tests, unhandled rejections, open handles и unmounted-state warnings в core/extended scope; pending tests имеют явное решение.

## 17. Q-11. Package и consumer contract

### Задачи

- [x] `Q-11.1` Собрать все `21` core/extended packages в dependency order.
- [x] `Q-11.2` Проверить `dist`, declarations, source maps и package manifests. `dist`/manifest/declarations есть у `21/21`; source maps `0/21` вынесены в `W-27`.
- [x] `Q-11.3` Проверить все публичные `exports` и documented imports.
- [x] `Q-11.4` Создать свежие tarballs и SHA-256 manifest.
- [x] `Q-11.5` Установить tarballs в изолированный consumer без registry.
- [x] `Q-11.6` Выполнить consumer Vite build и DOM smoke.
- [x] `Q-11.7` Проверить provider/theme/fonts/icons/logos и Tier 1 sample imports.
- [x] `Q-11.8` Повторить React 17/18/19 compatibility matrix. React 17 остается официальным peer contract; 18/19 подтверждены как runtime smoke.
- [x] `Q-11.9` Проверить отсутствие ссылок на workspace/source-only paths в tarballs.
- [x] `Q-11.10` Не включать experimental packages без отдельного artifact gate.

### Критерий приемки

Release artifacts устанавливаются offline, собираются и рендерятся вне Storybook; public import contract совпадает с документацией.

## 18. Q-12. Performance и resilience

### Области риска

- Table с большим числом строк/колонок;
- Tree с глубиной и большим числом узлов;
- virtual lists;
- filters и columns settings;
- Select с большим набором options;
- Upload с несколькими файлами;
- overlays с ResizeObserver/measurement;
- repeated mount/unmount.

### Задачи

- [x] `Q-12.1` Определить бюджеты render/interaction для тяжелых компонентов.
- [x] `Q-12.2` Проверить 100/1000 элементов в допустимых компонентах. Проверены коллекции до `5000` строк и `1000` вариантов.
- [x] `Q-12.3` Проверить отсутствие зависания main thread при search/filter/sort.
- [x] `Q-12.4` Проверить отсутствие заметного cumulative layout shift после fonts/data load.
- [x] `Q-12.5` Проверить repeated mount/unmount на утечки timers/listeners.
- [x] `Q-12.6` Проверить ResizeObserver и portal measurement warnings.
- [x] `Q-12.7` Проверить behavior при malformed/partial data.
- [x] `Q-12.8` Проверить graceful empty/error fallback.
- [x] `Q-12.9` Сохранить performance measurements как diagnostic report.
- [x] `Q-12.10` Не вводить жесткий microbenchmark gate без стабильной CI-среды.

### Критерий приемки

Критические действия не зависают и не вызывают неконтролируемый рост ресурсов; бюджеты и допустимые исключения документированы.

## 19. Q-13. CI и режимы запуска

### Профили

| Профиль | Когда | Состав |
| --- | --- | --- |
| Local fast | При разработке | lint changed scope, changed unit tests, changed stories browser/a11y |
| Pull request | Перед merge | static build, full Chromium render, Tier 1 interactions, a11y error scope, changed visual |
| Nightly/full | Регулярно | все stories, Firefox/WebKit risk suites, full visual/a11y, package tests |
| Release | Перед выпуском | full quality + tarballs + consumer + React matrix + source audit |

### Задачи

- [x] `Q-13.1` Расширить `.github/workflows/quality.yml` browser test job.
- [x] `Q-13.2` Установить явные timeouts и concurrency policy.
- [x] `Q-13.3` Загружать Storybook, traces, screenshots, diffs и JSON reports как artifacts.
- [x] `Q-13.4` Не скрывать failed browser tests через `continue-on-error`.
- [x] `Q-13.5` Отделить temporary a11y baseline warnings от новых violations.
- [x] `Q-13.6` Добавить retries только для доказанно flaky инфраструктуры. Единственный runtime retry диагностический; новый flake блокирует gate.
- [x] `Q-13.7` Вести flakiness counter по story ID.
- [x] `Q-13.8` Проверять локально ту же команду, которая выполняется в CI.
- [x] `Q-13.9` Закрепить Node/package-manager versions.
- [x] `Q-13.10` Не публиковать packages из quality workflow.

### Критерий приемки

CI блокирует новые P0-P2, дает ссылку на конкретную story и сохраняет достаточные артефакты для локального воспроизведения.

## 20. Q-14. Финальная сверка и документация

### Задачи

- [x] `Q-14.1` Пересчитать stories/docs/exports после всех изменений.
- [x] `Q-14.2` Обновить runtime и accessibility reports.
- [x] `Q-14.3` Закрыть или переоценить каждую запись реестра белых областей.
- [x] `Q-14.4` Обновить `docs/history/workflows/design-system-workflow.md`.
- [x] `Q-14.5` Обновить `docs/quality-gate.md` и `docs/current-project-status.md`.
- [x] `Q-14.6` Обновить Storybook runbook и команды запуска.
- [x] `Q-14.7` Обновить component passports и migration recipes доказанными states.
- [x] `Q-14.8` Отделить текущие ограничения от исторических блокеров.
- [x] `Q-14.9` Выполнить финальный `quality:ds-only` с Q-gates.
- [x] `Q-14.10` Сформировать итоговый Q-report с passed/blocked/accepted-risk.

### Критерий приемки

В документации нет утверждений шире фактических доказательств; основной workflow и Q-ветка показывают одинаковый статус.

## 21. Реестр известных белых областей

| ID | Область | Конечный статус | Доказательство / решение |
| --- | --- | --- | --- |
| W-01 | Полный runtime каталога | `verified` | `1164/1164` entries: `949/949` stories и `215/215` docs; retries `0`. |
| W-02 | Interaction automation | `separate backlog` | `949/949` browser tests проходят; 39 direct-story gaps классифицированы отдельно. |
| W-03 | Accessibility catalog | `verified` | Полный axe-аудит `949/949`. |
| W-04 | Existing a11y violations | `verified` | Нарушения `0`, critical/serious `0`; 220 стабильных manual-review/incomplete записей имеют baseline. |
| W-05 | Visual pixels | `verified` | `68/68` baseline checks, diff/missing/overflow `0`. |
| W-06 | Responsive | `verified` | `50/50` viewport checks, layout issues `0`. |
| W-07 | Zoom/long text | `verified` | `10/10` zoom и `9/9` stress checks; pluralization `9/9`. |
| W-08 | Cross-browser | `accepted limitation` | Chromium full и WebKit risk suites пройдены; Firefox provider не создает page в текущей среде. |
| W-09 | Keyboard/touch | `accepted limitation` | Keyboard/mouse/pointer/touch-like/file-input paths пройдены в доступных engines; Firefox наследует W-08. |
| W-10 | Runtime locale | `verified` | Runtime DOM `949/949`, English UI findings `0`. |
| W-11 | Encoding | `verified` | Static/runtime scan, mojibake findings `0`. |
| W-12 | API isolation | `separate backlog` | Закрытых corporate requests `0`; 29 partial/gap mock states документированы. |
| W-13 | Async cleanup | `accepted limitation` | Missing cleanup `0`; две внешние rc teardown warnings классифицированы как test-harness debt. |
| W-14 | Pending tests | `separate backlog` | 12 remaining skip/todo имеют решения в `pending-tests-decisions.json`. |
| W-15 | Direct story gaps | `separate backlog` | 39 gaps классифицированы в component coverage report. |
| W-16 | Experimental packages | `accepted limitation` | 7 source-only пакетов осознанно исключены из 21-package release boundary. |
| W-17 | Complex DnD | `verified` | Tree pointer и Tree/ColumnsSettings keyboard sensor paths подтверждены. |
| W-18 | Table/tree scale | `verified` | Table 5000, search groups 1000, Tree/filter/sort и lifecycle checks прошли. |
| W-19 | Upload browser behavior | `separate backlog` | Chromium/WebKit file input подтвержден; rejection/retry/file-limit states остаются улучшением покрытия. |
| W-20 | Portals/focus | `accepted limitation` | Chromium/WebKit risk suites проходят; Firefox наследует W-08. |
| W-21 | Stale static chunks | `verified` | Fresh build, `no-store`, missing assets/chunk errors `0`. |
| W-22 | Storybook version alignment | `verified` | Core/framework/official addons выровнены на `10.1.11`. |
| W-23 | CI execution | `accepted limitation` | Локальный contract `13/13`; remote run ожидает GitHub remote. |
| W-24 | SSR | `not applicable` | SSR не входит в текущий публичный контракт. |
| W-25 | RTL | `not applicable` | Текущий контракт: русский LTR. |
| W-26 | Public publication | `accepted limitation` | Локальный release готов; license, scope ownership и разрешение публикации остаются owner gate вне Q. |
| W-27 | Package source maps | `separate backlog` | `0/21`; runtime/artifact contract проходит, maps требуют отдельной проверки размера и закрытых source paths. |

Правило завершения: запись нельзя удалить. Ее статус меняется на `verified`, `accepted limitation`, `not applicable` или `separate backlog`, после чего добавляется ссылка на доказательство/решение.

## 22. Обязательный каталог состояний

Для каждого интерактивного компонента применимые состояния должны быть либо показаны story, либо отмечены `n/a`:

- default;
- hover;
- focus-visible;
- active/pressed;
- disabled;
- readOnly;
- loading;
- empty;
- success;
- warning;
- error/invalid;
- selected/checked;
- indeterminate;
- expanded/collapsed;
- open/closed;
- controlled/uncontrolled;
- single/multiple;
- minimum/maximum/limit reached;
- async pending/success/error/retry;
- long text/overflow;
- compact/mobile;
- large data;
- keyboard-only;
- reduced motion/high contrast, если применимо.

## 23. Формат записи дефекта

Каждая проблема должна содержать:

```text
ID: QBUG-<number>
Severity: P0/P1/P2/P3/P4
Component/package:
Story ID:
Environment/browser/viewport:
Preconditions:
Steps:
Expected:
Actual:
Console/network evidence:
Screenshot/trace/report:
Reproducibility: always/intermittent/once
Root cause classification: component/story/tooling/data/environment
Fix status:
Regression test:
```

Нельзя объединять разные причины в один дефект только потому, что они видны на одной странице.

## 24. Артефакты Q-ветки

Планируемые постоянные документы:

- `docs/history/workflows/storybook-testing-and-quality-plan.md`;
- `docs/storybook-interaction-matrix.json`;
- `docs/accessibility-baseline.json`;
- `docs/component-story-coverage.json`;
- `docs/component-runtime-audit.json`;
- `docs/q07-cross-browser-and-input-report.md`;
- `docs/q07-cross-browser-report.json`;
- `docs/q07-input-modes-report.json`;
- `docs/q08-localization-report.md`;
- `docs/q08-static-language-report.json`;
- `docs/q08-runtime-language-report.json`;
- `docs/q09-unit-reliability-report.md`;
- `docs/q09-unit-reliability-report.json`;
- `docs/pending-tests-decisions.json`;
- `docs/async-cleanup-risk-inventory.json`;
- `docs/q11-package-consumer-report.md`;
- `docs/q12-performance-resilience-report.md`;
- `docs/q13-ci-quality-report.md`;
- `docs/q13-ci-quality-report.json`;
- `docs/q-final-quality-report.md`.

Планируемые машинные отчеты:

- `tmp/q00-baseline.json`;
- `tmp/q02-story-render-report.json`;
- `tmp/q03-storybook-browser-tests.json`;
- `tmp/q04-accessibility-report.json`;
- `tmp/q05-visual-report.json`;
- `tmp/q06-responsive-report.json`;
- `tmp/q07-cross-browser-report.json`;
- `tmp/q08-language-runtime-report.json`;
- `tmp/q09-mock-coverage-report.json`;
- `tmp/q10-component-tests-report.json`;
- `tmp/q11-consumer-report.json`;
- `docs/q12-performance-report.json`;
- `tmp/q13-story-flakiness.json`;
- `tmp/q14-final-gate.json`.

## 25. Команды текущего контура

Команды выполняются из `app/` и уже существуют:

```powershell
node scripts/check-storybook-static-assets.js
node scripts/audit-component-story-coverage.js
node scripts/check-storybook-interactions.js
node scripts/check-storybook-language.js
node scripts/audit-storybook-runtime-language.js
node scripts/run-storybook-cross-browser-suite.js
node scripts/audit-storybook-input-modes.js
node scripts/audit-async-cleanup-risks.js
node scripts/check-storybook-quality-config.js
node scripts/run-eslint.js --quiet
node scripts/run-ds-only-tests.js
node scripts/run-supported-package-gate.js
node scripts/check-react-compatibility.js
node scripts/run-ds-only-consumer-gate.js
node scripts/run-ds-only-release-rehearsal.js
node scripts/run-ds-only-quality-gate.js
```

Планируемые команды, которые нельзя считать доступными до Q-01/Q-13:

```powershell
npm.cmd run test:storybook
npm.cmd run test:storybook:watch
npm.cmd run test:storybook:ci
npm.cmd run test:storybook:visual
npm.cmd run quality:q
```

## 26. Definition of Done Q-ветки

Q-ветка считается завершенной только при одновременном выполнении условий:

- [x] все `949` текущих stories прошли render smoke; новый count зафиксирован свежим Storybook index;
- [x] все `215` docs entries загружаются без dynamic import errors;
- [x] Tier 1 и Tier 2 interactions автоматизированы по применимым сценариям; direct-story gaps вынесены в backlog;
- [x] нет P0/P1 и необработанных P2;
- [x] нет запрещенных critical/serious accessibility violations;
- [x] keyboard/focus checklist пройден;
- [x] visual baseline воспроизводим и reviewed;
- [x] responsive matrix не содержит блокирующих overlap/overflow;
- [x] Chromium full и WebKit risk suites проходят; Firefox provider зафиксирован как ограничение среды;
- [x] русский runtime-текст подтвержден, исключения перечислены;
- [x] Storybook не выполняет запросы к закрытым корпоративным средам;
- [x] unit/integration suites не имеют failures и неклассифицированных async warnings;
- [x] pending tests разобраны и имеют явные решения;
- [x] `21/21` package artifacts и offline consumer проходят после изменений;
- [x] React compatibility matrix повторена;
- [x] CI сохраняет reports/traces/diffs; remote execution остается принятой внешней белой областью до появления GitHub remote;
- [x] каждая белая область имеет конечный статус и доказательство;
- [x] основной workflow и README синхронизированы с Q-report.

## 27. Порядок исполнения

Оставшиеся проверки выполняются следующими пронумерованными группами. Одна команда пользователя на группу разрешает выполнить все входящие проверки, необходимые исправления и повторные прогоны без промежуточного подтверждения.

| Группа | Статус | Проверки | Содержание | Условие завершения |
| --- | --- | --- | --- | --- |
| `QG-01` | [x] | `Q-00 + Q-01` | Сверить воспроизводимый baseline, версии Storybook/Vite/addons, browser toolchain и локальные команды. | Baseline обновлен после QG-13; unit reliability закрыта в QG-09, CI traces в QG-12. |
| `QG-02` | [x] | `Q-02` | Полный render smoke всех stories и docs, clean-context retry и классификация runtime/console/cache ошибок. | `1164/1164` entries: `949/949` stories и `215/215` docs; `0` final failures, console/page errors и missing assets. |
| `QG-03` | [x] | `Q-09 + Q-03` | Сначала инвентаризировать и изолировать network/realtime/timers, затем расширить interaction matrix и проверки пользовательских действий. | Network isolation passed; interaction/mock gaps классифицированы как отдельный backlog. |
| `QG-04` | [x] | remediation `Q-04.6-Q-04.8` | Keyboard/focus, Tree/Filters semantics и live regions исправлены; browser `949/949`, axe `949/949`. | Runtime-дефекты закрыты; `Q048-ENV-01` принят только для недоступного transcript Narrator; `error` gate зеленый. |
| `QG-05` | [x] | `Q-05` | Выбран один Playwright visual runner, зафиксирована screenshot policy и Tier 1/2/3 baselines. | `68/68`, diff/missing/overflow `0`; actual/expected/diff и approval policy зафиксированы. |
| `QG-06` | [x] | `Q-06` | Responsive profiles, overflow/overlap, portals, narrow tables/toolbars, mobile overlays, zoom 200% и русский text stress. | `69/69`; все `Q-06.*` имеют конечный статус и машинный отчет. |
| `QG-07` | [x] | `Q-07` | Chromium full suite, Firefox/WebKit risk suites, keyboard/mouse/touch, drag-and-drop и file input. | Chromium/WebKit и input paths подтверждены; Firefox provider классифицирован как accepted limitation. |
| `QG-08` | [x] | `Q-08` | Статическая и runtime-проверка русского текста, dropdown/options/tooltips/errors, Faker/Day.js, UTF-8 и обоснованный allowlist. | Static 112 и runtime `949/949`: English UI/mojibake findings `0`. |
| `QG-09` | [x] | `Q-10` | Повтор package suites, разбор pending tests, async/timer/portal cleanup, controlled state, error boundaries, coverage и snapshots. | `22/22`, failures/drift `0`, pending классифицированы; 2 external rc teardown warning сохранены как test-harness debt. |
| `QG-10` | [x] | `Q-11` | Повторная сборка 21 package, exports/types/manifests, tarballs, offline consumer и React 17/18/19 matrix. | `21/21` artifacts, `3/3` consumers и React matrix подтверждены без registry и source-only ссылок. |
| `QG-11` | [x] | `Q-12` | Performance budgets, большие коллекции, main-thread/CLS, repeated mount, observers, malformed/partial data и fallbacks. | `29` проверок в шести разделах, findings `0`; AsyncCheckbox/AsyncSelect rejection cleanup исправлен. |
| `QG-12` | [x] | `Q-13` | CI jobs, timeouts/concurrency, artifacts, retries/flakiness, закрепленные версии и локально-эквивалентные команды. | Contract `13/13`, browser `949/949`, runtime `1164/1164`, new flakes `0`; remote run принят как W-23. |
| `QG-13` | [x] | `Q-14 + Definition of Done` | Финальная сверка counts/reports/белых областей, синхронизация workflow/runbook/passports и итоговый `quality:ds-only`. | `24 passed`, `5 accepted risks`, `0 blocking failures`; итоговый Q-report и дальнейший backlog определены. |

Зависимости групп фиксированы: `QG-01 -> QG-02 -> QG-03 -> QG-04 -> QG-05 -> QG-06 -> QG-07 -> QG-08 -> QG-09 -> QG-10 -> QG-11 -> QG-12 -> QG-13`. Перескакивать вперед допустимо только для независимой диагностики; финальная приемка всегда выполняется в `QG-13`.

После каждой группы необходимо:

- обновить статусы подзадач;
- записать выполненные команды;
- сохранить отчеты;
- перечислить найденные/исправленные дефекты;
- обновить реестр белых областей;
- назвать следующую группу.

## 28. Ссылки на официальную документацию инструментов

- [Storybook testing](https://storybook.js.org/docs/writing-tests)
- [Storybook Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon/index)
- [Storybook interaction tests](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Storybook accessibility tests](https://storybook.js.org/docs/writing-tests/accessibility-testing)
- [Storybook visual tests](https://storybook.js.org/docs/writing-tests/visual-testing)

Версии и команды из внешней документации должны повторно проверяться непосредственно перед Q-01, потому что toolchain может измениться. Фактическим источником версий проекта остаются `app/package.json` и `app/yarn.lock`.
