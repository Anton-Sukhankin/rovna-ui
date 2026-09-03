# Q-04.10: блокирующий accessibility gate

Дата проверки: 6 августа 2026 года.

## Изменение

Общий Storybook preview переведен из `a11y.test = 'todo'` в `a11y.test = 'error'`. Этот preview используется основной конфигурацией `.storybook` и стабильной локальной конфигурацией `storybook-f06`, поэтому политика действует для обоих маршрутов.

## Защита от отката

Скрипт `app/scripts/check-storybook-quality-config.js` теперь принимает только режим `error`. Возврат к `todo` приведет к падению `storybook:quality:check` и общего DS-only quality gate.

## Фактический результат

| Проверка | Результат |
| --- | --- |
| Storybook quality config | `passed`, `a11yMode: error` |
| Статическая сборка | `1157` entries: `942` stories и `215` docs; `4/4` endpoints вернули `200` |
| Повтор проблемной story | `SamoletHeader/Default`: `5/5`, violations `0` |
| Полный axe-аудит | `942/942`, failed audits `0`, violations `0`, violation nodes `0` |
| Сетевые установки | Отключены |

## Исправление, найденное блокирующим gate

Первый полный прогон обнаружил serious `color-contrast` в `SamoletHeader/Default`: во время CSS transition ссылка «Меню 3» кратковременно имела контраст `4.44:1` вместо требуемых `4.5:1`. Selected navigation label и вложенная ссылка теперь явно сохраняют active text color на всем переходе. Suppression или исключение axe не добавлялись.

После исправления проблемная story прошла пять последовательных прогонов, а повторный полный аудит завершился с нулем нарушений.

## Блокирующее поведение

Скрипт полного аудита исправлен так, чтобы возвращать ненулевой exit code при любом violation, а не только при ошибке загрузки story. Машиночитаемый результат находится в `docs/q04-error-gate-report.json`, полный каталоговый отчет в `docs/accessibility-full-report.json`.
