# R-04: Accessibility hardening

Дата завершения: 2026-08-09.

Статус: `[x]` выполнено.

Следующий пакет: `R-05` - visual, responsive и cross-browser hardening.

## 1. Результат

Полный актуальный каталог Storybook проверен axe, браузерными сценариями клавиатуры и фокуса, семантическими DOM-проверками, режимами reduced motion/forced colors и масштабом 200-400%. Критических и серьезных нарушений нет. Все неполные результаты axe классифицированы; неизвестных или заблокированных записей нет.

| Метрика | Результат |
| --- | ---: |
| Storybook entries | 1223 |
| Stories / docs | 1008 / 215 |
| Axe stories | 1008/1008 |
| Failed axe audits | 0 |
| Violations / violation nodes | 0 / 0 |
| Critical/serious violations | 0 |
| Incomplete entries / nodes | 39 / 324 |
| Reviewed / blocked / unclassified incomplete | 39 / 0 / 0 |
| Assistive, semantics, keyboard, focus и zoom checks | 16/16 |
| Browser story tests | 1008/1008 |
| Unit/integration tests | 6652/6652 |
| Static Storybook missing assets | 0 |

## 2. Исправления

- Уточнены accessible names, roles, labels и связи ARIA для форм, Select/TimeSelect, RangePicker, Header navigation, Drawer, Table и Tree.
- Для Select синхронизированы `aria-expanded`, `aria-controls` и active descendant с фактическим controlled open-state, включая закрытие после выбора.
- Подтверждены focus trap и focus return для Modal, Drawer и Filters; story interactions устойчивы к portal/motion дублям.
- Для таблиц добавлена осмысленная scroll-region/table семантика; для Tree подтверждена структура `tree/treeitem`.
- Добавлены общие стили `prefers-reduced-motion` и `forced-colors` без изменения публичного API компонентов.
- Storybook-аудит теперь считает assertion errors из browser console реальными interaction failures.
- Сценарий сортировки таблицы использует штатное повторное нажатие на trigger для закрытия dropdown.

## 3. Разбор incomplete

Из 39 записей 38 относятся к `color-contrast`, где axe не может вычислить итоговый фон перекрывающихся слоев либо определить контраст слишком короткого содержимого. Фактические вычисленные значения ниже порога не принимаются этой политикой. Эти записи связаны с visual/forced-colors доказательствами.

Одна запись `th-has-data-cells` относится к известной архитектуре виртуализированной таблицы, где header и body разделены DOM-контейнерами. Она проверена отдельным семантическим сценарием. Непроверенных классификаций нет.

## 4. Ручная граница

Фактическое качество речевых объявлений не может быть доказано браузерной автоматикой. Для Narrator и дополнительной NVDA-проверки создан `docs/screen-reader-verification-protocol.md`: 12 точных сценариев, ожидаемые объявления, критерии pass/fail, owner и форма транскрипции.

R-04 закрыт как инженерный пакет, потому что протокол является его заявленным результатом. Живое прослушивание остается ручной приемочной операцией и не представлено как уже выполненное.

## 5. Доказательства

- `docs/accessibility-full-report.json`
- `docs/r04-accessibility-manual-review.json`
- `docs/r04-assistive-modes-report.json`
- `docs/accessibility-warning-baseline.json`
- `docs/screen-reader-verification-protocol.md`
- `tmp/q03-storybook-browser-tests.json`
- `tmp/g10-ds-only-tests/report.json`
- `tmp/g05-storybook-static-build.json`
- `tmp/storybook-static-asset-audit.json`

## 6. Команды приемки

```powershell
Set-Location app
npm.cmd run quality:r04
npm.cmd run test:storybook
npm.cmd run test:ds-only
npm.cmd run storybook:local:build
npm.cmd run storybook:static:check
```

Все перечисленные команды завершились успешно. Локальный Storybook доступен по адресу `http://127.0.0.1:3000`.
