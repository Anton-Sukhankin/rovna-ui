# Q-02 Storybook Render Smoke

Проверено: 2026-08-07. Отчет: `tmp/q02-story-render-report.json`.

## Итог

| Проверка | Результат |
| --- | ---: |
| Все entries | `1157/1157` passed |
| Stories | `942/942` passed |
| Docs/MDX | `215/215` passed |
| Final failures | `0` |
| Console error entries | `0` |
| Page error entries | `0` |
| Missing static assets | `0` |
| Clean-context retries | `0` |

Аудит выполнялся в установленном Chrome. Разрешались только текущий локальный origin, `data:` и `blob:`; остальные запросы блокировались. Сервер отдавал файлы с `cache-control: no-store`.

## Исправления

- Добавлена воспроизводимая локальная генерация `14` наборов favicon: SVG, ICO, PNG 16/32/48 и Apple Touch.
- Добавлен локальный нейтральный avatar для Profile, Avatar, Image и Header docs.
- Добавлена самостоятельная страница `stats.html` вместо отсутствующего bundle-analyzer artifact из исходного архива.
- Runtime gate усилен: `console.error`, локальный HTTP error и failed request теперь считаются падением.
- Отчет сохраняет первичное падение и screenshot до clean-context retry.

## Повторная проверка

В промежуточном прогоне `tend-ui-header-hooks-usesupportmodal--default` один раз вернул пустой root и прошел в clean context. На финальной сборке отклонение не повторилось: `0` retries и пустой `initialFailures`. Запись остается наблюдаемым историческим сигналом, но не активным дефектом.

Пять справочных Figma embeds из docs блокируются политикой и не являются runtime-зависимостью компонентов.
