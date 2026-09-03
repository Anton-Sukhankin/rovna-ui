# R-01: Component/Story Coverage

Дата завершения: 2026-08-09.

Статус: `[x]` выполнено.

Следующий пакет: `R-02` - автономные mocks и network isolation.

## 1. Цель и границы

Пакет закрывает 39 исходных `documented-gap` из component/story coverage без обращения к `S-Tracker`, закрытым registry, GitLab, Nexus, Figma API или другим корпоративным источникам. Работа выполнена по локальным исходникам, статическому Storybook и уже установленному публичному toolchain.

## 2. Разбор исходных 39 gaps

| Решение | Количество | Результат |
| --- | ---: | --- |
| Ошибочно классифицированные type-only exports | 18 | Исключены из visual coverage через TypeScript AST, сохранены в `reviewedTypeOnlyExports`. |
| Provider/runtime contracts | 5 | Получили машиночитаемый статус `provider-contract`. |
| Новые direct story groups | 6 | Добавлены 25 CSF stories. |
| Compatibility re-exports | 2 | `Row` и `Col` главного пакета связаны с исходными grid stories как `cross-package-story`. |
| Composition coverage | 5 | Связаны с публичными композиционными stories как `composition-story`. |
| Alias coverage | 1 | `UNSTABLE_InputNumber` связан с `InputNumber` как `alias-story`. |
| Source-only service boundary | 2 | `Notifications` и `SearchAssistant` явно отложены в `R-02`; статус `source-only-boundary`. |
| **Итого** | **39** | `documented-gap = 0`. |

Type-only группа: `ButtonPreset`, `CheckboxChangeEvent`, `RadioChangeEvent`, `RadioChangeEventTarget`, `TagPreset`, `RowSelection`, `RowClassName`, `DataNode`, `DropdownItem`, `CounterPreset`, `DotPreset`, `FormInstance`, `FormRuleObject`, `FormValidator`, `FormComponent`, `FormRule`, `FormRuleRender`, `ColumnPosition`.

Provider/runtime группа: `Language`, `ApiClient`, `Theme`, `TendUI` из theme и `TendUI` из главного пакета.

Composition/alias группа: `INTERNAL_TypographyBase`, `ButtonGroup`, `FilterPicker`, form `Field`, `INTERNAL_FilterPicker`, `UNSTABLE_InputNumber`.

## 3. Новые stories

| Story group | Stories | Проверяемые состояния |
| --- | ---: | --- |
| `tend-ui-grid/Row` | 4 | default, gutter, alignment, long text |
| `tend-ui-grid/Col` | 4 | default, offset, responsive, long text |
| `tend-ui (main)/Typography` | 3 | default, long text, semantic group |
| `tend-ui (main)/ErrorOverlay` | 2 | default, constrained container |
| `tend-ui (main)/EmptyOverlay` | 2 | default, constrained container |
| `tend-ui (main)/ComponentPicker` | 10 | input, disabled, select, checkbox, checkbox group, radio, radio group, toggle, date picker, range picker |
| **Итого** | **25** | Русские подписи и детерминированные fixtures. |

## 4. Машинный coverage contract

`app/scripts/audit-component-story-coverage.js` теперь:

- отличает TypeScript type aliases/interfaces и `export type` от визуальных exports;
- публикует `reviewedTypeOnlyExports` в JSON;
- поддерживает `provider-contract`, `composition-story`, `alias-story` и `source-only-boundary`;
- связывает compatibility re-exports с исходными stories;
- возвращает `passed`, только когда не осталось `documented-gap`.

Актуальная сводка:

```text
story groups: 118
public visual exports: 951
reviewed type-only exports: 409
provider-contract: 5
direct-story: 98
package-collection: 804
cross-package-story: 36
composition-story: 5
alias-story: 1
source-only-boundary: 2
documented-gap: 0
unclassified story groups: 0
key components with missing state evidence: 0
```

## 5. Надежность browser runner

Полный Vitest browser run дважды обнаружил инфраструктурную потерю тестов: suites отмечались как passed, но часть файлов содержала `0` собранных stories. Компонентных failures при этом не было.

Runner `app/scripts/run-storybook-browser-tests.js` усилен:

- полный каталог запускается пакетами по 12 story-файлов в свежих browser sessions;
- batch-отчеты объединяются в один JSON;
- проверяются ожидаемые, фактические, пропущенные, повторные и неожиданные story ID;
- неполный отчет больше не может завершиться как passed;
- targeted, watch и diagnostic режимы сохранены.

Финальный результат: 10 batches, 118/118 suites, 974/974 уникальных browser tests, missing/duplicates `0`.

## 6. Accessibility review

Полный axe-аудит прошел 974/974 stories без violations. Четыре новые `incomplete/manual-review` записи повторяют уже известную внутреннюю разметку базовых primitives:

- `ComponentPicker/Select`: `aria-prohibited-attr`, `aria-valid-attr-value`, `color-contrast`;
- `ComponentPicker/RangePicker`: `aria-prohibited-attr` на separator.

Это не новые классы дефектов. После сравнения правил, impacts и DOM targets записи добавлены в reviewed warning baseline; исправление первопричины в `Select`/`RangePicker` относится к `R-04`. Текущий baseline: 224/224, added/changed/resolved `0`.

## 7. Проверки

| Проверка | Результат |
| --- | --- |
| Targeted ESLint новых stories и измененных scripts | Passed |
| Static Storybook build | 1,189 entries: 974 stories + 215 docs |
| Static asset integrity | Passed; missing `0`, invalid entries `0` |
| Component coverage | Passed; `documented-gap = 0` |
| Language policy | 118 files и runtime 974/974; English UI, mojibake и Faker findings `0` |
| Browser tests | 974/974 passed; failures/missing/duplicates `0` |
| Full runtime | 1189/1189 passed; failures/retries `0` |
| Flakiness gate | Passed; new flakes `0` |
| Axe | 974/974 passed; violations `0` |
| Accessibility warning baseline | 224/224; added/changed/resolved `0` |
| DS-only quality gate | 24 passed; 5 accepted risks; blocking failures `0` |

Targeted ESLint измененных файлов и общий repository lint gate проходят.

## 8. Передача в R-02

`R-02` должен начать со следующих доказанных границ:

1. `Notifications` и `SearchAssistant` имеют `source-only-boundary` и требуют автономных service mocks.
2. Реестр mock coverage содержит 29 partial/gap states.
3. Runtime фиксирует девять внешних Figma embed URL только на docs-страницах; их нужно локализовать, блокировать или заменить автономным placeholder без обращения к закрытому Figma.
4. Закрытые корпоративные endpoints остаются запрещенными; npm/GitHub разрешены только как публичные источники.

## 9. Решение

Все критерии `R-01` выполнены. Пакет закрыт со статусом `[x]`; следующий пакет - `R-02`.
