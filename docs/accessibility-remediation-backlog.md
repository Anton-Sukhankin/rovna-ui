# Accessibility Remediation Backlog

## Текущий результат

Финальная регрессия `QG-04` завершена 8 августа 2026 года по стабилизированному DOM всех `949` Storybook stories из актуальной статической сборки.

- `949/949` stories успешно загружены и проверены;
- ошибок выполнения аудита: `0`;
- stories с accessibility-нарушениями: `0`;
- critical/serious нарушений: `0`;
- затронутых DOM-узлов: `0`;
- глобальных отключений правил axe и baseline-исключений: `0`;
- visual responsive regression: `68/68`, diff/missing/overflow: `0`.

Машиночитаемый источник: `docs/accessibility-full-report.json`. Визуальный baseline: `docs/q05-visual-baseline-manifest.json`.

## Исходный блокер

До исправления единственным оставшимся правилом было `color-contrast`: `400` stories и `1198` DOM-узлов. Основные причины: старый брендовый синий для текста, светлые neutral/status colors, унаследованные цвета Ant Design и пользовательские цвета в демонстрационных stories.

## Реализованные изменения

### Runtime-палитра

Исходные архивные токены `@rovna-ui/tokens` не переписаны. Публичные темы `SamoletTheme` и `GlobalTheme` получают доступную runtime-палитру через `packages/tend-ui-theme/src/accessibleColors.ts`.

Ключевые runtime-значения:

| Группа | Значения |
| --- | --- |
| Samolet blue | `blue500 #006AD6`, `blue600 #0062C9`, `blue700 #004A97` |
| Neutral text | `gray400 #686E78`, `gray500 #686E78`, `gray650 #646A74` |
| Cyan | `cyan500 #087E84`, `cyan600 #006D75`, `cyan700 #005C63`, `cyan800 #004F55` |
| Red | `red500 #C03C54`, `red600 #B4384D`, `red700 #902D3F` |
| Gold | `gold600 #925800`, `gold700 #875200`, `gold800 #805000` |
| Green | `green500 #3D825A`, `green600 #34744F`, `green700 #2D6846` |
| Purple | `purple500 #722ED1`, `purple600 #6324B8`, `purple700 #531DAB` |
| Volcano | `volcano500 #C4320B`, `volcano600 #B72A07`, `volcano700 #A42505` |

### Legacy-компоненты

- Ant Design semantic text и placeholder tokens связаны с runtime-палитрой Rovna UI;
- Select placeholder, TextArea counter и Steps wait/disabled text получили явные доступные цвета;
- ссылки Navigation наследуют цвет пункта меню;
- Support и Analytics в хедере используют непрозрачный белый текст на брендовой заливке;
- Spinner при загрузке блокирует pointer-взаимодействие, но больше не снижает контраст всего дочернего содержимого через `opacity`;
- демонстрационные custom-color stories используют контрастные сочетания.

## Проверка

1. ESLint измененных theme/runtime/story файлов: без ошибок.
2. Theme unit tests: `146/146`.
3. Целевые runtime unit tests: `48` passed, `3` skipped по существующим условиям; затем `22/22` после финальной корректировки Spinner/Steps.
4. Статическая сборка Storybook: `1164` entries, `949` stories, `215` docs; ключевые маршруты `200`.
5. Полный axe-аудит: `949/949`, failed audits `0`, violations `0`, nodes `0`.
6. Visual responsive audit после ручного review baseline: `68/68`, diff/missing/overflow `0`.
7. Специализированные keyboard/focus stories: `7/7`; полный Chromium browser suite: `949/949`.

## История результата

| Этап | Stories с нарушениями | Узлы | Комментарий |
| --- | ---: | ---: | --- |
| Исходный baseline | 400 | 1198 | Только `color-contrast` после исправления семантики |
| После runtime-палитры | 25 | 90 | Остались legacy-стили и custom stories |
| Промежуточная semantic-попытка | 26 | 93 | `aria-hidden-focus` показал недопустимость скрытия focusable loading-content |
| Финальный полный аудит | 0 | 0 | Без suppressions и исключений |

## Политика дальнейших изменений

- изменение runtime-цветов требует полного axe-аудита и visual review;
- исходные token-пакеты меняются только отдельным осознанным решением;
- нельзя глобально отключать `color-contrast` или иные WCAG-правила;
- допустимое исключение должно быть точечным, документированным по story и selector;
- `Q-04` считается закрытым по runtime-критериям. Для фактического речевого вывода Narrator принято ограничение среды `Q048-ENV-01`; сертификация конкретного reader требует отдельного ручного прогона.

## Q-04.6: keyboard-only Tier 1

Первичная проверка 5 августа 2026 года зарегистрировала следующие дефекты. Remediation и повторный прогон 8 августа закрыли каждый из них:

| ID | Severity | Область | Конечный статус |
| --- | --- | --- | --- |
| `QBUG-046-01` | P2 | Modal | Закрыт: focus trap, Escape и focus return проверены. |
| `QBUG-046-02` | P1 | Form/Checkbox | Закрыт: Space изменяет checked state. |
| `QBUG-046-03` | P2 | Table story | Закрыт: Enter открывает «Фильтры». |
| `QBUG-046-04` | P1 | Filters drawer | Закрыт: focus trap, Escape и focus return проверены. |
| `QBUG-046-05` | P1 | Tree | Закрыт: keyboard actions и tree semantics проверены. |
| `QBUG-046-06` | P1 | UploadArea | Закрыт: Enter/Space и disabled tab behavior проверены. |

Добавлены нейтральные keyboard stories для Modal, Form, Table, Filters, Tree и UploadArea. Итоговые доказательства находятся в `docs/qg04-accessibility-remediation-report.md` и `docs/qg04-accessibility-remediation-report.json`; старые `q04-*` reports сохранены как первичный baseline.

## Q-04.7: focus return

Modal, обе реализации Drawer, Filters и Popover корректно возвращают focus на кнопку открытия после закрытия по Escape и завершения transition.

| ID | Severity | Область | Конечный статус |
| --- | --- | --- | --- |
| `QBUG-047-01` | P2 | Popover stories | Закрыт: focusable Button trigger, controlled open, Escape close и focus return проверены. |

Добавлена отдельная Popover keyboard story. Итоговые доказательства находятся в `docs/qg04-accessibility-remediation-report.md` и `.json`.

## Q-04.8: screen-reader semantics

Chromium semantic audit и remediation выполнены для Tier 1. Доступные role/name/state дополнены именем Filters dialog, tree/treeitem-контрактом и точечными live regions.

| ID | Severity | Область | Конечный статус |
| --- | --- | --- | --- |
| `QBUG-048-01` | P2 | Filters | Закрыт: dialog имеет доступное имя. |
| `QBUG-048-02` | P2 | Tree | Закрыт: hierarchy, level, position и expanded state передаются семантически. |
| `QBUG-048-03` | P2 | Error/status semantics | Закрыт: Alert, Counter, Form Message и Upload error имеют `alert`/`status` semantics. |

`Q048-ENV-01`: Windows Narrator доступен, но автоматический speech transcript отсутствует. Ограничение принято для текущего автоматизированного контура; никакого заявления о проверенном речевом выводе не делается. Сертификация reader требует ручного reader/browser прогона с сохраняемым transcript или speech-viewer log.

## Q-04.9: очистка baseline exceptions

Проверка 6 августа 2026 года подтвердила отсутствие явных story-level accessibility exceptions, отключенных правил axe, selector exclusions, allowlist-записей и глобальных rule suppressions. Удалять записи из baseline не потребовалось: их количество уже равно `0`.

Результаты axe со статусом `incomplete` не считаются исключениями или принятыми нарушениями: это отдельные случаи `needs review`. Глобальный режим Storybook `a11y.test = 'todo'` также не является baseline exception; его переключение принадлежит `Q-04.10`.

Доказательства: `docs/q04-baseline-exceptions-audit.md` и `docs/q04-baseline-exceptions-audit.json`.

## Q-04.10: переход в блокирующий режим

Общий preview основной конфигурации и `storybook-f06` переведен в `a11y.test = 'error'`. Статический quality gate теперь принимает только `error`, поэтому возврат к `todo` будет обнаружен автоматически.

Первый полный прогон в режиме `error` выявил кратковременный contrast `4.44:1` у выбранной ссылки Navigation в `SamoletHeader/Default`. Причина устранена явным active text color у selected label и ссылки, без suppression. Story прошла `5/5` целевых повторов, повторная сборка содержит `942` stories / `215` docs, итоговый axe-аудит прошел `942/942` с `0` violations.

Первичный переход зафиксирован в `docs/q04-error-gate-report.md` и `.json`. Финальная регрессия `QG-04` содержит `949/949` browser tests и `949/949` axe audits; общий Q-04 закрыт по runtime-критериям, а `Q048-ENV-01` принят как ограничение среды.
