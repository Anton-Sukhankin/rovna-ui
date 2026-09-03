# QG-05: Визуальная регрессия

## Итог

Группа `QG-05` завершена 8 августа 2026 года. Основным локальным visual runner выбран собственный Playwright-контур `scripts/audit-storybook-visual-responsive.js`. Loki отсутствует в локальном dependency graph, поэтому его неподтвержденные команды удалены; второй конкурирующий baseline не поддерживается.

## Зафиксированная политика

- браузер: установленный Chrome `151.0.7922.77`;
- DPR: `1`;
- профили: `360x800`, `390x844`, `768x1024`, `1440x900`, `1920x1080`;
- перед снимком ожидаются Storybook render, `document.fonts.ready`, изображения и стабилизация layout;
- animations/transitions отключаются только test-only CSS, внедряемым runner, без изменения production runtime;
- внешний network заблокирован;
- при падении сохраняются expected, actual и diff;
- массовое автоматическое принятие baseline запрещено: `--update` применяется только после просмотра намеренного изменения.

## Покрытие

Baseline содержит `68` PNG-файлов:

- Tier 1 на обязательных viewport-профилях;
- representative Tier 2/3;
- интерактивные состояния hover, focus, disabled, error/loading и открытые overlays;
- Modal, Drawer, Select, Popover, Filters и Tree в открытом состоянии;
- контроль horizontal overflow и ошибок загрузки ресурсов.

Manifest: `docs/q05-visual-baseline-manifest.json`. Baseline: `app/.q-visual-baseline/`.

## Результат

| Метрика | Значение |
| --- | ---: |
| Проверки | `68` |
| Passed | `68` |
| Failed | `0` |
| Visual diffs | `0` |
| Missing baselines | `0` |
| Overflow findings | `0` |

Полный машинный отчет: `docs/q05-visual-regression-report.json`.

## Процедура approval

1. Запустить `corepack yarn storybook:visual:audit` в `app/`.
2. При падении просмотреть expected/actual/diff из `tmp/q05-visual-failures/`.
3. Убедиться, что изменение намеренное и не скрывает clipping, overflow или ошибочный overlay.
4. Обновлять только проверенный scope через фильтры runner; полный `--update` допустим лишь после просмотра всех изменений.
5. Повторно запустить check-режим и требовать `0` diff.

## Решение

`Q-05 -> [x]`, `QG-05 -> [x]`. Loki не является блокером, потому что выбран и подтвержден один локальный runner с полным набором артефактов сравнения.
