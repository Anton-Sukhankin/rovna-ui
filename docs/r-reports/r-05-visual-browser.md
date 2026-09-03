# R-05: visual, responsive и cross-browser hardening

Обновлено: 2026-08-09.

Статус: `[x]` пакет завершен, блокирующих visual/browser дефектов нет.

## Результат

R-05 расширил проверяемую матрицу состояниями из R-01/R-03, повторно привязал baseline к текущей статической сборке и подтвердил работу Storybook в Chromium, WebKit и Firefox. Все проверки выполнялись локально, с запретом внешней сети и без `S-Tracker`.

| Проверка | Результат |
| --- | --- |
| Static Storybook | `1223` entries: `1008` stories, `215` docs; missing assets `0` |
| Visual regression | `88/88`; diffs `0`; missing/stale baselines `0`; overflow `0` |
| Responsive/layout | `85/85`; viewport `50`, zoom `10`, text/state stress `25` |
| Portal/overlap | portal checks `6`; overlap `0`; clipped portals `0` |
| Chromium | full catalog: `1008/1008` tests, `118/118` suites |
| WebKit | risk suite: `249/249` tests, `18/18` story files |
| Firefox | risk suite: `249/249` tests, `18/18` story files |
| Input modes | `20/20`; failed `0`; blocked `0` |
| Unit/integration regression | `22/22` packages, `216/216` files, `6652/6652` tests |
| R-05 quality gate | `28/28` |

## Расширение Матрицы

В visual matrix добавлены R-01/R-03 сценарии для Grid Row/Col, Typography, ErrorOverlay, EmptyOverlay, ComponentPicker, AsyncCheckbox, AsyncSelect, Table, Upload и мобильного Header. Отдельно проверены пять Global-theme состояний для Button, Input, открытого Select, открытого Modal и Table. Матрица покрывает desktop/mobile, длинный русский текст, loading/error/empty, overlays и открытые интерактивные состояния.

Responsive audit дополнен теми же риск-зонами и анализом видимых portal-слоев, пересечений интерактивных элементов, clipping и горизонтального overflow. Итог: `85/85`, геометрических findings нет.

## Исправленные Проблемы

1. В `AsyncSelect` сценарии API retry/loading создавали 10 px горизонтального overflow на ширине 390 px. Story layout переведен на `Space wrap`, после чего оба сценария и полный responsive audit прошли.
2. Скрытые элементы rc-overflow в Header ошибочно считались видимыми и создавали ложное пересечение. Детектор теперь исключает элементы внутри `[aria-hidden="true"]` и подтверждает видимость hit-test проверкой.
3. Firefox в управляемой Windows-среде не мог создать tab subprocess. Для локального headless test process применены `MOZ_DISABLE_CONTENT_SANDBOX=1`, `MOZ_DISABLE_GMP_SANDBOX=1` и `MOZ_DISABLE_RDD_SANDBOX=1`. Настройка ограничена тестовым дочерним процессом; внешняя сеть остается запрещенной. Firefox после этого прошел risk suite и input audit.
4. Firefox сообщает диагностические ошибки о kerning-таблице WOFF Museo Sans и единичный native AbortError после Select interaction. Диагностики сохраняются в input report; корректность рендера и `play` подтверждена отдельным Firefox Vitest risk suite `249/249`.
5. Cross-browser orchestrator больше не читает старые `q07-*.json`: перед запуском файлы удаляются, а результат принимается только при свежем timestamp текущего процесса.

## Baseline Review

Перед обновлением baseline были просмотрены actual/expected/diff для изменившихся Form, Input и Tooltip, а также новые изображения ComponentPicker, AsyncSelect recovery, theme Select/Modal, длинного Row/Typography, constrained overlays, Table loading и mobile Header. Изменения соответствовали текущим stories и предыдущим пакетам R-01/R-03. После review выполнен update, затем независимый check-mode подтвердил `88/88` и `0` отличий.

Текущий SHA-256 `app/storybook-static/index.json`:

```text
360f9a2283e63648e9fb71262a9bb094aa537c7d84dbb68dad26774cc3b755bc
```

Этот же hash записан в `docs/q05-visual-baseline-manifest.json`, visual report и `docs/r05-visual-browser-gate.json`.

## Воспроизведение

Из `app/`:

```powershell
npm.cmd run storybook:visual:audit
npm.cmd run storybook:responsive:audit
npm.cmd run storybook:input:audit
npm.cmd run storybook:cross-browser
npm.cmd run test:ds-only
npm.cmd run storybook:static:check
npm.cmd run quality:r05
```

Полный Vitest browser run в текущем OneDrive-пути требует локального разрешения чтения родительской файловой иерархии. Это файловая граница тестовой среды, а не обращение к сети или корпоративным источникам.

## Артефакты

- `docs/q05-visual-baseline-manifest.json`;
- `tmp/q05-visual-responsive-report.json`;
- `tmp/q06-responsive-report.json`;
- `docs/q07-cross-browser-report.json`;
- `docs/q07-input-modes-report.json`;
- `tmp/storybook-static-asset-audit.json`;
- `tmp/g10-ds-only-tests/report.json`;
- `docs/r05-visual-browser-gate.json`.

## Следующий Пакет

`R-06`: public API, types, exports и compatibility.
